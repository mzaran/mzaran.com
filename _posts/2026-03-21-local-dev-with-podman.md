---
layout: post
title: "Local development environment with Podman"
date: 2026-03-21
description: Containerized Jekyll dev environment — rootless Podman, SELinux volume labels, and local CI with act.
tags: [podman, jekyll, dev-environment, fedora]
---

Started daily driving Fedora Atomic Sway. Podman is already there. Docker would mean installing a root daemon I don't want. That's the whole decision — everything else follows from it.

## The container

The `Containerfile` starts from `ruby:3.4-slim` rather than Alpine. The reason matters: Jekyll's `sass-embedded` and `google-protobuf` gems ship pre-built native binaries. Those binaries are compiled against glibc. Alpine uses musl libc — they won't load, and compiling from source means dragging in a full C toolchain and fighting through build flags. `slim` is Debian-based, glibc, and the gems just work.

```dockerfile
FROM docker.io/library/ruby:3.4-slim

RUN apt-get update && apt-get install -y \
    gcc \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

COPY Gemfile Gemfile.lock ./
RUN bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
```

The image bundles the gems at build time. The site source is mounted at runtime, so I'm not rebuilding the image every time I change a post.

## The `:Z` volume flag

This is the part that trips people up on Fedora. When Podman mounts a host directory into a container, SELinux still enforces its labels. The container's process runs under a different SELinux context than the host files, so reads fail — not with a permission denied you'd recognize, but with file-not-found behavior that makes Jekyll serve an empty site.

The fix is `:Z` on the volume mount:

```
-v "$REPO_ROOT:/site:Z"
```

`:Z` tells Podman to relabel the mounted directory with the container's SELinux context. The host files get a new label that the container process is allowed to read. It's a one-character fix with a non-obvious reason, which is exactly why it belongs in documentation.

## Why Podman over Docker

Docker requires `dockerd` — a persistent root daemon running as a system service. Every container you start is a child of that daemon. If it crashes or gets compromised, everything it owns is affected.

Podman is daemonless. When I run `podman run`, the container is a direct child process of my shell, running as my user, with no intermediary. Rootless by default. The attack surface is smaller by design, and on Fedora it integrates cleanly with systemd and SELinux without special configuration.

The practical upside: I can run `podman ps` without `sudo`, kill a container with `kill`, and the whole thing disappears when I log out. It behaves like a normal process because it is one.

## Local CI with `act`

Production CI runs on GitHub Actions using `actions/jekyll-build-pages@v1` — a managed builder that pins its own Ruby version, plugin set, and environment. "It builds locally" means nothing if the CI environment differs.

`act` runs the actual `.github/workflows/` YAML in a local container, using the same action runner images GitHub uses. My `bin/ci` script starts the Podman socket, points `DOCKER_HOST` at it (since `act` speaks the Docker API), and runs:

```
act push --container-architecture linux/amd64
```

The deploy step fails — no token, expected. The build step completes. If that passes, I know the CI will pass. That's the only thing that matters.

## The workflow

```bash
bin/dev     # build image if needed, start detached container, serve on :4000
bin/ci      # run the full GitHub Actions workflow locally via act
```

`bin/dev` checks whether the `mzaran-dev` container is already running before doing anything. If the image doesn't exist yet, it builds it. Otherwise, it starts a detached container, mounts the repo root, and maps both the Jekyll port and the livereload port.

The result: I edit files locally, the browser reloads automatically, and I can validate CI behavior before pushing. No Docker daemon, no root, no surprises.

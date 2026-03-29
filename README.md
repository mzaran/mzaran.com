# mzaran.com

Personal site and blog, built with [Jekyll](https://jekyllrb.com) and hosted on [GitHub Pages](https://pages.github.com).

E-ink terminal aesthetic with a tree-style post listing, IBM Plex Mono typography, and scroll-aware navigation.

## Local development

Requires [Podman](https://podman.io) (installed by default on Fedora):

```bash
./bin/dev          # build image if needed, serve at localhost:4000
./bin/dev --build  # force rebuild (after Gemfile changes)
podman stop mzaran-dev  # stop dev server
```

To validate CI locally before pushing (requires [act](https://github.com/nektos/act)):

```bash
./bin/ci
```

Or natively with Ruby 3.4+ and Bundler:

```bash
bundle install
bundle exec jekyll serve
```

## Writing posts

Create `_posts/YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
description: One-line summary shown in the post tree listing.
tags: [tag1, tag2]
---
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/jekyll-gh-pages.yml`), which builds and deploys to GitHub Pages at [mzaran.com](https://mzaran.com).

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

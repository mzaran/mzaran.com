# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Jekyll static site/blog for `mzaran.com`, hosted on GitHub Pages. Custom layouts with no third-party theme — e-ink terminal aesthetic (warm paper background, IBM Plex Mono font, grayscale accents, tree-style home page, scroll-hiding header).

## Commands

```bash
# Containerized dev (Podman)
./bin/dev          # Build image if needed, start dev server at localhost:4000
./bin/dev --build  # Force rebuild container (after Gemfile changes)
./bin/ci           # Run GitHub Actions workflow locally via act (requires act)
podman stop mzaran-dev  # Stop dev server

# Or run natively (requires Ruby 3.4 + bundler)
bundle install              # install dependencies
bundle exec jekyll serve    # serve locally at localhost:4000
bundle exec jekyll build    # build to _site/
```

## Structure

- `_config.yml` — site settings (title, author, URL, plugins, exclude list)
- `_layouts/` — custom layouts: `default.html`, `home.html`, `post.html`
- `assets/css/style.scss` — all styles (front matter required for Jekyll SCSS processing)
- `assets/js/scroll.js` — header hide/show on scroll direction
- `_posts/` — blog posts, named `YYYY-MM-DD-slug.md` with `layout: post`
- `index.md` — home page (`layout: home`, lists all posts)
- `about.md` — about page (`layout: default`)
- `Containerfile` — Podman image: Ruby 3.4-slim, bundled gems (rootless Podman provides host-user isolation)
- `.containerignore` — excludes build artifacts and meta files from image context
- `bin/dev` — start/rebuild the Podman dev container
- `bin/ci` — run GitHub Actions workflow locally via `act`
- `.github/workflows/jekyll-gh-pages.yml` — CI/CD: builds and deploys to GitHub Pages on push to `main`

## Writing posts

Create `_posts/YYYY-MM-DD-title.md` with this front matter:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
description: One-line summary shown in post list.
tags: [tag1, tag2]
---
```

## Design notes

- Colors defined as CSS variables in `style.scss` (`:root` block) — edit there to retheme
- `--accent` / `--accent-hi` control all accent colors (grayscale)
- `--paper: #f4efe6` / `--paper-dark: #eae4d9` control warm e-ink background tones
- Home page uses a tree-style listing (CSS border-drawn lines, no card grid)
- `scroll.js` hides header on scroll-down, shows on scroll-up (via `.header-hidden` class)
- The blinking cursor after `.prompt` lines is a pure CSS animation
- Code blocks: warm tinted background (`--code-bg`) with dark text (`--code-fg`), left border accent
- All pages share the same container width (`--max-w: 860px`) — no per-page max-width overrides

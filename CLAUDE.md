# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Jekyll static site/blog for `mzaran.com`, hosted on GitHub Pages. Custom layouts with no third-party theme — dark terminal aesthetic (dark background, IBM Plex Mono font, bright green accents, card-grid home page, scroll-hiding header).

## Commands

```bash
bundle install              # install dependencies
bundle exec jekyll serve    # serve locally at localhost:4000
bundle exec jekyll build    # build to _site/
```

## Structure

- `_config.yml` — site settings (title, author, URL, plugins)
- `_layouts/` — custom layouts: `default.html`, `home.html`, `post.html`
- `assets/css/style.scss` — all styles (front matter required for Jekyll SCSS processing)
- `assets/js/scroll.js` — header hide/show on scroll direction
- `_posts/` — blog posts, named `YYYY-MM-DD-slug.md` with `layout: post`
- `index.md` — home page (`layout: home`, lists all posts)
- `about.md` — about page (`layout: default`)

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
- `--green` / `--green-hi` control all accent colors (bright terminal green)
- `--paper: #1a1d23` / `--paper-dark: #22262e` control dark background tones
- Home page uses a 2-column card grid (`.post-card`), falls back to single column at 640px
- `scroll.js` hides header on scroll-down, shows on scroll-up (via `.header-hidden` class)
- The blinking cursor after `.prompt` lines is a pure CSS animation
- Code blocks: dark background (`--code-bg`) with green text (`--code-fg`), left border accent

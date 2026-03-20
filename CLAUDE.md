# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Jekyll static site/blog for `mzaran.com`, hosted on GitHub Pages. Custom layouts with no third-party theme — paper + terminal aesthetic (warm off-white background, IBM Plex Mono font, terminal-green accents).

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
- `--green` / `--green-hi` control all accent colors
- `--paper` / `--paper-dark` control background tones
- The blinking cursor after `.prompt` lines is a pure CSS animation
- Code blocks: dark background (`--code-bg`) with green text (`--code-fg`), left border accent

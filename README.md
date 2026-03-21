# mzaran.com

Personal site and blog, built with [Jekyll](https://jekyllrb.com) and hosted on [GitHub Pages](https://pages.github.com).

Dark terminal aesthetic with a card-grid layout, IBM Plex Mono typography, and scroll-aware navigation.

## Local development

```bash
bundle install              # install dependencies
bundle exec jekyll serve    # serve at localhost:4000
bundle exec jekyll build    # build to _site/
```

Requires Ruby 3.4+ and Bundler.

## Writing posts

Create `_posts/YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
description: One-line summary shown on the home page card.
tags: [tag1, tag2]
---
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/jekyll-gh-pages.yml`), which builds and deploys to GitHub Pages at [mzaran.com](https://mzaran.com).

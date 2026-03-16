# cone-scroll

`cone-scroll` is a blog theme for Zola. Initially inspired by [anemone](https://github.com/Speyll/anemone) and [granda](https://granda.org), it has since evolved into a distinctly different theme and is now released as a standalone project.

It doesn't aim to turn a blog into a product landing page, nor does it try to mimic a terminal. A closer analogy might be a carefully typeset index page: a warm paper-like background, a narrower content column, a quiet but functional table of contents, and a not-too-noisy ASCII header.

If you prefer cards, hero sections, gradient glows, and a homepage that shows all features at a glance, this theme might not be for you. It leans more toward "sit down and read for a while."

![Cone Scroll light and dark screenshot](./screenshot.svg)

If you're more concerned with the article page, take a look at this one. Light theme on the left, dark theme on the right, with the TOC, metadata, and content column all appearing together.

![Cone Scroll post screenshot](./screenshot-post.svg)

## What it offers

- Warm paper/ink color scheme with both light and dark themes
- Narrowed reading width, suitable for long articles to scroll through
- Index-style homepage, archive page, and tags page—no card-based layout
- Text-based theme toggle, RSS, tags, and TOC rail
- Built-in `blog-page.html`, regular pages, tag pages, shortcodes, and a small amount of native JavaScript

## Installation

The easiest way is to place the entire directory into your site's `themes/` folder:

```bash
mkdir -p themes
cp -R path/to/cone-scroll themes/cone-scroll
```

Then enable it in your site's `config.toml`:

```toml
theme = "cone-scroll"

title = "Your Blog"
description = "Write what you want to write"
default_language = "zh"
generate_feeds = true

taxonomies = [{ name = "tags", feed = true }]

[extra]
author = "Your Name"
display_author = true
favicon = "favicon.ico"
default_theme = "light"
twitter_card = true

header_nav = [
  { url = "/blog", name_zh = "|Blog|" },
  { url = "/diary", name_zh = "|Diary|" },
  { url = "/about", name_zh = "|About|" },
]
```

If you have multiple languages enabled, navigation items should follow the existing template convention as `name_<lang>`, e.g., `name_zh`, `name_en`.

## Page conventions

If you want both blog posts and diary entries to use the theme's article template, you can write the following in the corresponding section:

```toml
+++
title = "Blog Archive"
sort_by = "date"
page_template = "blog-page.html"
+++
```

Long articles will display a TOC by default when heading levels are present. If you want to disable it manually, add this to the page's front matter:

```toml
[extra]
toc = false
```

## Opinionated Defaults

This is not a theme that aims to "cover all blog styles out of the box." It has some clear preferences:

- Default shell text leans toward a Chinese context, making it suitable for Chinese sites to start directly
- The homepage, archive, and tags pages emphasize an "index feel," not a wall of summary cards
- `blog-page.html` includes a giscus mounting snippet; if you don't use it, delete or replace it with your own configuration
- The theme itself does not provide a favicon. Please place your site's own `favicon.ico` in the root `static/` directory and point to it in `config.extra.favicon`

## Directory structure

The theme itself is simple:

```text
cone-scroll/
├── theme.toml
├── README.md
├── screenshot.svg
├── templates/
└── static/
```

No build chain, no extra packaging steps. Most things are in the templates, CSS, and a small `script.js`.

## License

MIT.
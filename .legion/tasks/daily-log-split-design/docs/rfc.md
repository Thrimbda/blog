# RFC: Split Daily Logs Into Atomic Pages With Progressive Archive Browsing

## Decision

Approved for implementation.

## Frontend Contract

The final presentation is a daily archive feed:

- Each daily entry has its own permanent page.
- Archive pages show full entry content in chronological feed form, preserving the feel of the old aggregate pages.
- Pagination is rendered statically by Zola.
- JavaScript enhances the real next-page link into infinite loading.
- A date jump control lets mobile readers open a specific day's document without scrolling through a giant table of contents.

## Architecture

Use Zola sections:

```text
content/
  diary/
    _index.md
    2020/
      _index.md
      2020-04-13.md
    2026/
      _index.md
      2026-01-22.md
  gcores-talks/
    _index.md
    2025-07-23-01.md
```

Gcores entries need sequence suffixes when duplicate dates exist.

## Fallback

The archive must work without JavaScript through normal links and paginator navigation. Infinite loading only appends the next static page.

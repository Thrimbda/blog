# Daily Log Split Design

## Status

Implemented on 2026-06-08 in worktree `.worktrees/daily-log-split-implementation`.

## Current Truth

Long daily-log content is now published as atomic Zola pages with archive feed fronts:

- `/gcores-talks/`
- `/diary/2020/`
- `/diary/2026/`

The archive frontend renders full entries inline and keeps a real paginator. JavaScript enhances the paginator into infinite loading.

## Mobile Date Access

Each archive has a native date select and `[打开]` link. This is the primary way to reach a specific date on mobile without scrolling through the whole feed.

## Duplicate Dates

Gcores duplicate dates use sequence slugs, for example:

- `/gcores-talks/2025-07-23-01/`
- `/gcores-talks/2025-07-23-02/`

## Implementation Pattern

- `scripts/daily-sources/`: migration source aggregates
- `scripts/split-daily-logs.mjs`: reproducible splitter
- `data/daily-index.json`: full archive date index
- `daily-archive.html`: feed and controls
- `daily-entry.html`: standalone entry page

## Validation

`zola build`, Playwright 3x3 viewport checks, infinite-load interaction, mobile date jump, and Computer Use visual checks all passed.

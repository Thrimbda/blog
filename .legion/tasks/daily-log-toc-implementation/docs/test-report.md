# Test Report: Daily Log TOC Implementation

## Summary

Status: PASS

The production daily archive pages now render a document-style date TOC instead of a select-based date picker. Static entry links work without JavaScript, and the existing infinite-list enhancement still has a normal paginator fallback.

## Commands

- `git diff --check`
- `nix-shell --run 'zola build'`
- `nix-shell --run 'zola serve --interface 127.0.0.1 --port 1111'`
- `rg -n "日期目录|daily-outline|<select|2025-07-23|daily-outline-seq|继续加载" public/diary/2026/index.html public/diary/2020/index.html public/gcores-talks/index.html`
- `playwright screenshot --browser chromium --viewport-size 393,852 --wait-for-selector .daily-outline ...`
- `playwright screenshot --browser chromium --viewport-size 1440,900 --wait-for-selector .daily-outline ...`
- `playwright screenshot --browser chromium --viewport-size 2560,1440 --wait-for-selector .daily-outline ...`

## Build Evidence

`zola build` completed successfully with Zola 0.21.0 from `shell.nix`.

Output summary:

- Created 257 pages and 9 sections.
- Internal anchor check completed.
- No build errors.

## Static HTML Checks

Rendered production HTML confirms:

- No `<select>` remains on daily archive pages.
- `日期目录` and `.daily-outline` render on `diary/2026`, `diary/2020`, and `gcores-talks`.
- Existing `继续加载` pagination link remains for progressive infinite loading.
- Gcores duplicate date `2025-07-23` renders as a date node with `01` and `02` sequence links.

## Viewport Matrix

Temporary screenshots were generated for each page at each required size and visually inspected:

| Page | 393x852 mobile | 1440x900 13-inch | 2560x1440 27-inch |
| --- | --- | --- | --- |
| `/gcores-talks/` | PASS | PASS | PASS |
| `/diary/2020/` | PASS | PASS | PASS |
| `/diary/2026/` | PASS | PASS | PASS |

Findings:

- Mobile: the TOC appears in-flow before the feed, matching document outline behavior and keeping specific dates reachable as plain links.
- 13-inch: the date TOC appears as a left rail with a thin divider, and feed content remains readable without overlap.
- 27-inch: the archive remains centered and bounded; the left rail does not stretch into a wide empty layout.
- Gcores: duplicate same-day entries are grouped under a single date with sequence labels.

## Computer Use

Computer Use was loaded and used to inspect the active Zen browser state. The active browser was on an unrelated page, so no business controls were operated. Visual validation of the local implementation was performed through Playwright-rendered browser screenshots against `http://127.0.0.1:1111`.

## Residual Risk

- The full Gcores TOC is long on mobile. This is acceptable for the current static-first design because it prioritizes direct date access, but a future enhancement could add a small in-TOC filter or year collapse if it feels too long in real use.
- `scripts/split-daily-logs.mjs` cannot be fully re-run in this worktree because `scripts/daily-sources/*` is absent. The new `data/daily-toc.json` was generated mechanically from existing `data/daily-index.json`, and the script was updated so future full regenerations also emit the TOC data.

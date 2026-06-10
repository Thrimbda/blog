# Report Walkthrough: Daily Log TOC Implementation

Mode: implementation

## What Changed

- Replaced the daily archive date picker with a document-style date TOC.
- Reused the existing `.page-outline` visual language for the archive rail.
- Added `data/daily-toc.json` so the template can render grouped dates without doing grouping logic in Tera.
- Updated `scripts/split-daily-logs.mjs` so future full regenerations emit the same TOC data.
- Removed the unused select-jump JavaScript binding while keeping the existing infinite-list enhancement.

## User-Facing Behavior

- Diary archives show month groups with date links.
- Gcores archives show year groups, and duplicate dates render as one date with `01`, `02`, etc.
- Mobile users get the date TOC in normal document flow before the feed.
- Desktop users get a sticky left rail with a thin divider.
- Every entry remains a plain link and pagination still works without JavaScript.

## Evidence

- Build and viewport evidence: `docs/test-report.md`
- Review decision: `docs/review-change.md`
- Design source: `.legion/tasks/daily-log-split-design/docs/rfc.md`

## Residual Risk

- Gcores has a long mobile TOC. This is acceptable for direct date access, but year collapse or a local filter may be worth adding if real usage feels heavy.
- The split script update could not be executed end-to-end because `scripts/daily-sources/*` is absent in this worktree. The committed TOC data was generated from the existing `daily-index.json` and validated through Zola build.

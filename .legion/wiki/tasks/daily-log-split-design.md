# Task Note: Daily Log Split Design

## Status

Completed on 2026-06-08.

## Decision

Use atomic Zola pages for daily entries and keep archive browsing static-first.

Recommended future layout:

```text
content/
  diary/
    2020/
      _index.md
      2020-04-13.md
  gcores-talks/
    2025/
      07/
        2025-07-23-01.md
```

Diary entries can use date-only filenames for inspected years. Gcores entries cannot use date-only filenames because duplicate dates exist; use stable source ids if available, otherwise deterministic sequence suffixes.

## Browsing Rule

Build normal paginated Zola archive sections first. Infinite loading may fetch and append the next static page, but must not replace real pagination or non-JS access.

## UI Rule

Preserve the existing terminal-paper theme:

- text rows rather than cards
- constrained article width
- warm paper/dark ink palette
- bracketed/text controls
- thin rules and quiet metadata

Validated hardening:

- mobile outlines default collapsed when no stored user state exists
- article/home links wrap with `overflow-wrap: anywhere`
- viewport meta allows browser zoom

## Evidence

- Task RFC: `.legion/tasks/daily-log-split-design/docs/rfc.md`
- Test report: `.legion/tasks/daily-log-split-design/docs/test-report.md`
- Review: `.legion/tasks/daily-log-split-design/docs/review-change.md`

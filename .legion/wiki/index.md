# Legion Wiki

## Current Durable Notes

- `tasks/daily-log-split-design.md`: Daily log split architecture and viewport validation decisions.
- `tasks/daily-log-toc-implementation.md`: Daily archive TOC implementation and duplicate-date sequence rule.
- `tasks/daily-toc-desktop-layout-fix.md`: Daily archive TOC breakpoint correction after production/demo mismatch.
- `patterns.md`: Reusable theme and archive implementation conventions.
- `maintenance.md`: Follow-up implementation backlog.

## Current Truth

The blog is a Zola static archive with a deliberate terminal-paper visual language. Long daily-log pages should be split into atomic Markdown pages through static sections and pagination. Daily archive navigation should look like a document TOC, with infinite loading used only as progressive enhancement.

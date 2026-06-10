# Task Note: Daily Log TOC Implementation

## Status

Implemented and reviewed on 2026-06-10.

## Decision

Daily archive navigation should use the same visual language as a normal document TOC, not a form-style date picker.

Effective rule:

- Use a sticky left rail on desktop.
- Use an in-flow `<details>` outline on mobile.
- Keep all dates as plain links.
- Preserve static pagination and use infinite loading only as enhancement.

## Duplicate-Date Rule

For sources that can contain multiple entries on the same date, group entries under the date and render deterministic sequence labels:

```text
2025-07-23
  01 topic
  02 topic
```

The committed implementation uses `data/daily-toc.json` to represent this grouping and renders sequence labels in `themes/cone-scroll/templates/daily-archive.html`.

## Evidence

- Implementation report: `.legion/tasks/daily-log-toc-implementation/docs/report-walkthrough.md`
- Test report: `.legion/tasks/daily-log-toc-implementation/docs/test-report.md`
- Review: `.legion/tasks/daily-log-toc-implementation/docs/review-change.md`

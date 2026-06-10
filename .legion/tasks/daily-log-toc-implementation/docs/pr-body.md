## Summary

- Replace the daily archive select picker with a document-style date TOC.
- Add grouped TOC data for diary and Gcores archives, including same-day sequence entries.
- Keep the existing static paginator and infinite-loading enhancement.

## Validation

- `git diff --check`
- `nix-shell --run 'zola build'`
- Playwright screenshots for `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` at `393x852`, `1440x900`, and `2560x1440`

## Notes

- `scripts/split-daily-logs.mjs` was updated for future regeneration, but the full script cannot be run in this worktree because `scripts/daily-sources/*` is absent.

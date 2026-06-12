## Summary

- Implement Version D daily archive TOC behavior: date links scroll within the aggregate archive.
- Add inline `+` links for opening standalone daily pages, including same-day sequence rows.
- Extend infinite loading so TOC clicks can resolve dates that are not loaded yet.

## Validation

- `git diff --check`
- `node --check themes/cone-scroll/static/js/script.js`
- `nix-shell --run 'zola build'`
- Playwright viewport and interaction assertions for `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` at:
  - `393x852`
  - `1440x900`
  - `2560x1440`
- Computer Use inspection in Zen at `http://127.0.0.1:1117/gcores-talks/`

## Notes

The split source files are not present in this worktree, so `data/daily-toc.json` was updated mechanically from existing `path` values. `scripts/split-daily-logs.mjs` now emits the same `anchor` field for future full regenerations.

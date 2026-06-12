# Test Report: Daily TOC Anchor Plus

## Summary

Status: PASS

Version D is implemented on `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/`: the primary TOC link targets the aggregate page entry, while the inline `+` opens the standalone daily page.

## Commands

- `git diff --check`
- `node --check themes/cone-scroll/static/js/script.js`
- `nix-shell --run 'zola build'`
- `nix-shell --run 'zola serve --interface 127.0.0.1 --port 1117 --base-url 127.0.0.1'`
- Playwright assertions against `http://127.0.0.1:1117` for all three archive pages at `393x852`, `1440x900`, and `2560x1440`

## Build Evidence

`zola build` completed successfully with Zola 0.21.0 from `shell.nix`.

Output summary:

- Created 257 pages and 9 sections.
- Internal anchor check completed.
- No build errors.

## Browser Matrix

| Page | 393x852 iPhone | 1440x900 13-inch | 2560x1440 27-inch |
| --- | --- | --- | --- |
| `/gcores-talks/` | PASS | PASS | PASS |
| `/diary/2020/` | PASS | PASS | PASS |
| `/diary/2026/` | PASS | PASS | PASS |

Assertions covered:

- Primary TOC links start with `#` and use the aggregate entry anchor.
- Inline `+` links keep the standalone daily URL.
- Desktop layout uses left rail plus right feed with sticky TOC.
- Desktop `+` opacity is `0` before hover and `1` after hover.
- Mobile layout remains in-flow, and `+` is visible without hover.
- Clicking a loaded TOC date updates the hash and focuses the matching entry.
- Clicking an unloaded TOC date loads later pages and then updates the hash to the target.

## Computer Use

Computer Use inspected the Zen browser on `http://127.0.0.1:1117/gcores-talks/`. The real browser window showed the production archive with the expected left TOC rail and right feed. Interaction assertions were handled through Playwright for repeatability.

## Visual Evidence

Temporary screenshots were generated under `/tmp/daily-toc-anchor-plus-screens` and visually inspected:

- `iphone17.png`: mobile TOC is in normal flow and `+` is visible.
- `13-inch.png`: left rail and right feed match the approved Version D behavior.
- `27-inch.png`: archive remains bounded on wide desktop and does not stretch into empty space.

Screenshots are not committed.

## Residual Risk

- `scripts/daily-sources/*` is not present in this worktree, so the split script could not be fully re-run from raw daily sources. The durable generator was updated, and current `data/daily-toc.json` was updated mechanically from existing `path` values.
- The full Gcores TOC remains long on mobile. This is consistent with the static-first archive design and can be revisited as a separate filter or collapse enhancement.

# daily-toc-anchor-plus Context

## 2026-06-12

- User selected Version D from the HTML demos and requested production implementation using LegionMind.
- Restored design context: site is a terminal-paper static archive; implementation must preserve text-first TOC styling.
- Created worktree `legion/daily-toc-anchor-plus` from latest `origin/master` at `076bb47`.
- Contract decision: primary TOC date links must scroll in the aggregate archive, while inline `+` links open standalone daily pages. Because the archive is paginated/infinite-loaded, implementation must resolve anchors that are not yet loaded.
- Inspection found the existing production TOC links point directly to `item.path`, while aggregate entries already use stable `entry.slug` ids. The production change can stay narrow: add TOC anchor metadata, render primary `#slug` links plus a secondary `+`, and extend the existing infinite loader to resolve missing anchors.
- Implemented Version D in production:
  - `scripts/split-daily-logs.mjs` now emits `anchor` from each standalone path.
  - `data/daily-toc.json` was updated mechanically with 202 anchors and no missing anchor values.
  - `daily-archive.html` renders primary `#anchor` links and inline standalone `+` links, including duplicate same-day sequence rows.
  - `style.css` keeps the terminal-paper TOC style, hides `+` until hover/focus on desktop, and shows it on mobile/touch.
  - `script.js` reuses the existing infinite loader to load missing TOC targets before scrolling.
- Verification passed:
  - `git diff --check`
  - `node --check themes/cone-scroll/static/js/script.js`
  - `nix-shell --run 'zola build'`
  - Playwright assertions for `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` at `393x852`, `1440x900`, and `2560x1440`
  - Computer Use inspected Zen on the local `/gcores-talks/` page and confirmed the real desktop layout.
- Wrote test report, change review, walkthrough, PR body, and wiki task summary.

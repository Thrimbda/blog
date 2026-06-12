# Review Change: Daily TOC Anchor Plus

## Decision

PASS

## Scope Review

In scope:

- Added durable TOC anchor metadata in `scripts/split-daily-logs.mjs` and `data/daily-toc.json`.
- Updated `daily-archive.html` so primary TOC links point to aggregate article ids.
- Added inline `+` standalone links for single-entry dates and same-day sequence rows.
- Extended the existing infinite loader so TOC clicks can resolve entries that are not loaded yet.
- Kept the terminal-paper TOC visual style.

No out-of-scope redesign, URL migration, or article TOC behavior change was introduced.

## Correctness Review

No blocking findings.

Evidence:

- `git diff --check` passed.
- `node --check themes/cone-scroll/static/js/script.js` passed.
- `zola build` passed.
- Playwright verified three archive pages at iPhone, 13-inch, and 27-inch viewports.
- Playwright verified loaded-anchor scroll, unloaded-anchor lazy load, desktop hover `+`, and mobile visible `+`.

## Maintainability Review

No blocking findings.

The anchor value is stored in the generated TOC data rather than recomputed in the template. This keeps the template presentational and makes future split regeneration deterministic.

## Accessibility And Fallback Review

No blocking findings.

- Date entries remain plain links.
- The `+` link has an `aria-label` that identifies the standalone daily page action.
- Touch and narrow layouts do not depend on hover to expose standalone pages.
- Entry articles are focusable after scripted navigation.
- Existing pagination remains available without JavaScript.

## Security Review

No security trigger was introduced. This change does not touch authentication, secrets, permissions, sessions, or privileged data paths.

## Non-Blocking Notes

- The real browser visual check used Computer Use in Zen. Exact interaction assertions use Playwright because it can reliably control viewport and wait for lazy-loaded targets.

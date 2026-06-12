# daily-toc-anchor-plus

## Goal

Implement the approved Version D daily archive TOC interaction in production: clicking a TOC date stays on the aggregate archive and scrolls to the matching entry; the small `+` affordance opens the standalone daily page.

## Problem

The current daily archive TOC uses date links as direct links to standalone daily documents. That makes the TOC behave like a jump menu rather than a document outline. The requested Version D interaction splits the two intents:

- primary date link: locate the entry in the current aggregate archive
- auxiliary `+` link: open the standalone daily document

The production archive is paginated and progressively enhanced with infinite loading, so a robust implementation must also handle TOC targets that are not yet present in the loaded page.

## Acceptance

- `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` use Version D semantics.
- Primary TOC date links point to in-page daily entry anchors.
- A small `+` link appears on hover/focus beside each TOC row on desktop and opens the standalone daily page.
- On touch/mobile widths, the `+` link remains visible so standalone pages are not hover-only.
- If the target entry is already loaded, clicking the date scrolls to it.
- If the target entry is on a later paginated archive page, JavaScript progressively loads subsequent pages until the target appears, then scrolls to it.
- Without JavaScript, the primary date link still has an anchor href and existing pagination remains available.
- Existing infinite loading behavior and `继续加载` remain intact.
- The implementation preserves the terminal-paper style: text links, thin rules, no cards, no filled buttons.
- Build and browser verification pass on iPhone-sized, 13-inch, and 27-inch viewports.

## Scope

- `themes/cone-scroll/templates/daily-archive.html`
- `themes/cone-scroll/static/css/style.css`
- `themes/cone-scroll/static/js/script.js`
- `scripts/split-daily-logs.mjs` and generated daily TOC data only if anchor metadata needs to be made durable.
- `.legion/tasks/daily-toc-anchor-plus/**` and relevant wiki writeback.

## Non-goals

- Do not redesign the daily archive beyond Version D.
- Do not change the date grouping model.
- Do not change standalone daily page URLs.
- Do not replace pagination with a client-only feed.
- Do not alter normal article TOC behavior.

## Assumptions

- Version D is chosen over the right-gutter and day-group variants.
- The per-entry article `id` remains the stable anchor target for aggregate archive scrolling.
- The standalone page URL remains available from the existing TOC item `path`.
- Progressive loading can reuse the existing infinite-loading pagination mechanism instead of inventing a separate fetch path.

## Risks

- TOC links for unloaded entries can fail if JavaScript only changes hrefs without loading later pages.
- Hover-only `+` can make standalone pages hard to access on touch devices if mobile visibility is not handled.
- Duplicated same-day entries need per-entry `+` links, because Version D attaches `+` to each visible row rather than grouping by day.

## Design Summary

Implement a quiet inline `+` affordance next to each date/sequence TOC link. The date text remains the document-outline action and scrolls within the aggregate page. The `+` link is a secondary action to the standalone daily document. For targets not yet loaded, an intercepting script should progressively load archive pages using the existing paginator and then scroll to the target once appended.

## Phases

1. Inspect current daily archive template, TOC data, and infinite-loading script.
2. Implement Version D markup and styling.
3. Extend the infinite-loading script for TOC anchor resolution.
4. Build and verify the three daily archive pages across iPhone, 13-inch, and 27-inch viewports.
5. Review, report, wiki writeback, commit, push PR, follow checks/merge, cleanup.

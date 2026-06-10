# Daily Log TOC Implementation

## Task Contract

- **name**: Daily log TOC browsing implementation
- **taskId**: `daily-log-toc-implementation`
- **goal**: Replace the awkward daily archive date picker with a document-TOC style browsing surface for split daily-log archive pages, preserving the current terminal-paper visual system and keeping static navigation functional without JavaScript.
- **problem**: The current archive jump UI reads like a form control rather than a document outline. It is especially awkward for mobile readers and cannot represent same-day multiple Gcores entries cleanly. The approved direction is to use the normal page-outline language as the base, with duplicate same-day entries represented as grouped sequence items.

## Acceptance

1. Implement a production archive TOC that uses the approved A+C design: document-style date outline as the base, with same-day sequence handling for multi-entry sources.
2. Remove or replace the current `select`-based date jump surface on daily archive pages.
3. Keep every archive entry reachable as a plain link without JavaScript; progressive infinite loading may remain a future enhancement unless existing infrastructure supports it cleanly.
4. Preserve the existing site visual identity: paper background, mono typography, thin rules, bracketed links, no cards, no gradients, no pill controls.
5. Support mobile, 13-inch laptop, and 27-inch desktop layouts without text overlap or layout overflow.
6. Build the site successfully and capture responsive/browser evidence in task docs.
7. Record implementation, verification, review, walkthrough, and wiki updates under Legion.

## Scope

- `themes/cone-scroll/templates/daily-archive.html`
- `themes/cone-scroll/static/css/style.css`
- Any existing archive data preparation code required to expose grouped date/sequence metadata to the template.
- Task docs under `.legion/tasks/daily-log-toc-implementation/**`
- Reusable notes under `.legion/wiki/**`

## Non-goals

- Do not split all legacy Markdown content in this task.
- Do not redesign the global theme or page layout outside archive TOC needs.
- Do not introduce a JavaScript-only archive or client-rendered app.
- Do not add broad infinite-scroll infrastructure unless it is already present and can be wired safely within scope.
- Do not change archive routes or entry content unless required for stable anchors.

## Assumptions

- The previous `daily-log-split-design` RFC remains the design source for static-first browsing.
- The user approved the combined recommendation: A as the base TOC style, C for duplicate same-day Gcores entries.
- Daily diary entries are date-unique within a year, while Gcores-like sources may contain multiple entries with the same date.
- Zola remains the static site generator and current template/context shape should be preserved where possible.

## Constraints

- The implementation branch is developed in `.worktrees/daily-log-toc-implementation` from `origin/master`.
- The UI must stay close to the existing `.page-outline` and article list style.
- Links and controls must remain usable when JavaScript is disabled.
- Mobile output must not rely on fixed-width controls.

## Risks

- Template context may not expose enough metadata to distinguish duplicate same-day entries without adjusting the generator.
- Static archive pages may be paginated, so TOC scope needs to match the entries currently rendered on the page unless broader index data is already available.
- Over-styling the TOC could drift away from the site’s existing document style.
- Browser verification may depend on local Zola/Nix availability.

## Design Summary

Use one archive navigation component:

- Desktop: sticky left document rail with thin right divider, visually aligned with the existing page outline.
- Mobile: in-flow outline before the feed, using native `<details>` so it can collapse without JavaScript.
- Date grouping: month groups for normal diary pages; duplicate-date sources render the date once with sequence entries below it.
- Entry links: every TOC item points to a real entry anchor or entry permalink. Same-day duplicates get stable sequence labels such as `01`, `02`.
- Infinite scroll: keep the static paginator/next link as the reliable base. The TOC implementation must not block future progressive enhancement.

## Phases

1. Contract: materialize this implementation task and restore design sources.
2. Engineer: inspect current template/data/CSS, then implement the TOC component and styling.
3. Verify: build and inspect relevant pages at mobile, 13-inch, and 27-inch viewport sizes.
4. Review: check scope, accessibility, fallback, and design consistency.
5. Close: write walkthrough, wiki notes, commit, rebase, push, and open/update PR.

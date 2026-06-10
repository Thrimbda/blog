# daily-toc-desktop-layout-fix

## Goal

Make the shipped daily archive TOC match the approved dummy behavior: desktop and laptop widths use a left date TOC rail with the feed on the right, while phone widths keep the TOC in document flow above the feed.

## Problem

The implementation merged in PR #7 validates that the daily TOC is readable, but the production CSS only switches `.daily-layout` to a two-column grid at `960px`. The dummy design switches at `880px`. In real browser chrome or side-pane contexts, a 13-inch screen can leave less than `960px` of page viewport, so the production page falls back to an unintended top/bottom layout even though the approved dummy is already two-column.

## Acceptance

- `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` render as left TOC rail plus right feed at 13-inch and 27-inch desktop viewports.
- The same pages render as top TOC plus feed on an iPhone-sized viewport without horizontal scrolling.
- The fix keeps the existing document TOC style: plain text, thin rule, no cards, no select picker, no decorative UI.
- Infinite loading remains intact.
- Zola build passes.

## Scope

- Adjust the daily archive layout CSS only.
- Keep the existing `daily-archive.html` structure unless verification proves a template change is required.
- Record verification evidence for the three requested page sizes.

## Non-goals

- Do not redesign the daily archive again.
- Do not change normal article outline behavior.
- Do not change URL structure, pagination, or daily log splitting.

## Assumptions

- The approved dummy breakpoint is the intended desktop/laptop behavior.
- Phone-sized screens should not use a two-column rail because it would reduce reading width and tap target quality.
- A slightly fluid rail/gap is acceptable if it preserves the same visual language.

## Risks

- Moving the breakpoint earlier can make the feed too narrow near the threshold if the rail and gap remain fixed.
- A CSS-only fix can pass build but still fail real visual expectations, so screenshot assertions are required.

## Design Summary

Use the dummy's `880px` daily breakpoint, but make the daily rail and gap responsive so the layout still breathes on 13-inch windows and stays stable on 27-inch monitors. Keep mobile under the breakpoint as an in-flow outline.

## Phases

1. Diagnose CSS and dummy mismatch.
2. Patch daily-only layout CSS.
3. Build and run visual verification at iPhone, 13-inch, and 27-inch sizes.
4. Review, document, push PR, and follow merge lifecycle.

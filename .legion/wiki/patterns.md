# Patterns

## Archive-First Daily Logs

When splitting aggregate daily logs, prefer static Zola sections and pages over client-rendered feeds. A page must remain reachable and browseable without JavaScript before any infinite-loading enhancement is added.

Required migration checks:

- dry-run manifest with before/after entry counts
- duplicate-date handling before file writes
- old URL compatibility plan
- `zola build`
- viewport checks on mobile, laptop, and wide desktop

## Infinite Loading

Infinite loading is a progressive enhancement over real pagination:

- keep a real paginator in the HTML
- append only from a known list container
- preserve keyboard/focus behavior
- announce appended content with a polite live region
- stop cleanly when there is no next page

## Daily Archive TOC

For daily archive navigation, prefer document-outline navigation over form controls:

- use the existing `.page-outline` visual language
- render dates as plain links, not select options
- group duplicate-date sources under the date with stable sequence labels
- keep mobile access in normal document flow with native `<details>`
- keep desktop access as a sticky left rail with a thin divider

## Terminal-Paper UI Preservation

Theme changes should keep the current blog identity:

- do not convert archive rows into cards
- do not add decorative gradients, badges, or heavy panels
- keep long reading columns constrained on wide screens
- prefer text/bracket controls over product-dashboard controls
- improve resilience through wrapping, spacing, focus, and static fallbacks

## Mobile Outline Default

For article outline rails, mobile can default to collapsed when no stored user state exists. A stored per-page reader preference should override viewport defaults.

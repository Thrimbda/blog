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

## Terminal-Paper UI Preservation

Theme changes should keep the current blog identity:

- do not convert archive rows into cards
- do not add decorative gradients, badges, or heavy panels
- keep long reading columns constrained on wide screens
- prefer text/bracket controls over product-dashboard controls
- improve resilience through wrapping, spacing, focus, and static fallbacks

## Mobile Outline Default

For article outline rails, mobile can default to collapsed when no stored user state exists. A stored per-page reader preference should override viewport defaults.

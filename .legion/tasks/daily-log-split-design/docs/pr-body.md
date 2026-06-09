# PR Body Draft

## Summary

- Split long daily-log pages into per-entry Zola pages.
- Add daily archive feed pages with full inline entries, date jump controls, and progressive infinite loading.
- Preserve static pagination and standalone daily entry URLs.

## Validation

- `zola build`
- Playwright viewport checks for iPhone-class, 13-inch, and 27-inch sizes
- Playwright interaction checks for date jump, duplicate-date Gcores entry, infinite loading, and standalone daily page
- Computer Use visual inspection in Chrome for the same three size classes

## Notes

- Original aggregate Markdown sources moved to `scripts/daily-sources/` for reproducible migration.
- `data/daily-index.json` powers complete date jump controls on paginated archive pages.

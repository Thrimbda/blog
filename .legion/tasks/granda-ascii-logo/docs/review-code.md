# Code Review: granda-ascii-logo

## Overall Assessment

No blocking issues found in the current code state. The Giscus theme-sync regression is resolved, and the TOC plus ASCII logo changes meet the task goals without introducing an obvious functional break in the reviewed files.

## Findings

- [non-blocking] `static/js/script.js:62` - `ensureGiscusThemeSync()` installs a `MutationObserver` on every page when the iframe is absent. On non-blog pages, that observer never disconnects because Giscus is never rendered. This is unnecessary long-lived work, but not a correctness bug.
- [non-blocking] `templates/page.html:3` - The TOC block is duplicated almost verbatim in `templates/blog-page.html:3`. This increases drift risk if the outline markup changes again.
- [non-blocking] `templates/header.html:27` - The theme-toggle labels are Chinese while surrounding UI copy is mostly English. This is functionally fine, but the UI language is now mixed.

## Positive Notes

- `static/js/script.js:18` - Theme application now actively syncs Giscus after theme resolution, which addresses the earlier first-load mismatch.
- `templates/blog-page.html:65` - Giscus bootstrap remains simple while synchronization lives in site JS, which keeps concerns separated.
- `templates/page.html:3` and `templates/blog-page.html:3` - The TOC is still conditional on both `page.toc` and `page.extra.toc`, so opt-out behavior remains intact.
- `static/css/style.css:181` - The desktop two-column layout and sticky outline rail stay restrained and consistent with the minimalist Granda direction.
- `templates/header.html:9` - The updated ASCII logo is more legible and clearly reads `0xc1`.

## Final Recommendation

Approve after optional cleanup. There are no blocking issues; the remaining items are maintainability and consistency improvements only.

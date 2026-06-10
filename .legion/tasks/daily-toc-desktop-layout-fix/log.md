# Log

## 2026-06-10

- User reported that the shipped TOC appears as top/bottom rather than the left/right dummy layout.
- Diagnosis: production `.daily-layout` grid is gated behind `@media (min-width: 960px)`, while the approved dummy uses `880px`; real browser chrome/sidebars can put a 13-inch use case below 960px.
- Created isolated worktree `daily-toc-desktop-layout-fix` from `origin/master`.
- Patched daily-only CSS to use an `880px` grid breakpoint with fluid rail/gap sizing.
- Verified with Zola build, computed layout assertions across three daily archive pages and four viewport sizes, visual screenshots, and an infinite loading smoke test.

# What

This PR is a low-risk Granda visual refinement pass focused on overall aesthetic cohesion, not just isolated TOC tweaks. It strengthens the `0xc1` logo, warms the paper/ink palette, tightens spacing rhythm, and turns the article TOC into a structural left rail on desktop while keeping mobile behavior natural.

# Why

The current Granda direction was already close, but key details still felt disconnected: the logo was too light, the TOC read as a boxed widget, and several spacing and color choices were not yet fully aligned. This pass makes the site feel more deliberate, comfortable, and architecturally consistent without changing its minimalist identity.

# How

The change extracts shared TOC markup into `templates/partials/page-outline.html`, updates page and blog templates to use that partial, and refines `static/css/style.css` to support the new rail layout and broader visual polish. Native TOC show/hide behavior is preserved, and the desktop TOC now uses a sticky inner disclosure block within a page-height left rail.

# Testing

See `docs/test-report.md`.

- `zola build` passed.
- Playwright screenshot artifacts reviewed:
  - `docs/playwright-home-desktop.png`
  - `docs/playwright-article-desktop.png`
  - `docs/playwright-article-mobile.png`
  - `docs/playwright-article-dark.png`

# Risk / Rollback

Risk is low and limited to reversible template/CSS refinements. Rollback is a clean revert of the TOC partial extraction, desktop rail layout, logo update, and palette/spacing adjustments.

# Links

- Task brief: `docs/task-brief.md`
- Code review: `docs/review-code.md` (no blocking findings)
- Walkthrough: `docs/report-walkthrough.md`

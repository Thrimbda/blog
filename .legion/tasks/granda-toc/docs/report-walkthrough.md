# Walkthrough

## Goal and Scope

This iteration tightens the overall Granda visual system, not just the TOC in isolation. The goal is to make the site feel more cohesive, deliberate, and comfortable while preserving the current minimalist direction.

Scope:
- `templates/header.html`
- `templates/page.html`
- `templates/blog-page.html`
- `templates/partials/page-outline.html`
- `static/css/style.css`

## Design Summary

This is a low-risk design-lite pass guided by `docs/task-brief.md`, with no RFC required. The core direction was to improve aesthetic cohesion through a warmer paper/ink palette, tighter spacing rhythm, a stronger `0xc1` logo treatment, and a TOC that reads as part of the page architecture rather than a boxed widget.

## Change List

### Header and identity

- Replaced the previous header logo treatment with a stronger ASCII `0xc1` mark.
- Kept the logo compact and quiet, but made it read more clearly and feel more intentional.

### TOC structure

- Extracted shared TOC markup into `templates/partials/page-outline.html` so page and blog templates use the same outline structure.
- Preserved native show/hide behavior instead of introducing custom interaction logic.

### Article layout

- Reworked the article TOC from a bordered box into a page-height left rail on desktop.
- Used a sticky inner disclosure block so the TOC remains available during reading without feeling like a floating card.
- Kept the mobile presentation natural and safe for narrow screens.

### Global visual refinement

- Warmed the palette toward paper/ink tones instead of stark black-on-white.
- Tightened spacing, rhythm, and line treatment to make the overall UI feel more crafted.
- Improved the relationship between typography, metadata, and structural rules so the full page feels more unified.

## How to Verify

Reference: `docs/test-report.md`

Commands / checks:
- `zola build`
- Playwright screenshot check: homepage desktop
- Playwright screenshot check: article desktop
- Playwright screenshot check: article mobile
- Playwright screenshot check: article dark mode

Expected results:
- Build completes successfully.
- Header logo reads clearly as `0xc1` and is no longer visually boxed.
- Desktop article pages show the TOC as a left rail that visually extends through the page.
- Mobile article layout does not overflow horizontally and keeps TOC behavior natural.
- Dark mode remains readable and visually consistent.

Screenshot artifacts:
- `docs/playwright-home-desktop.png`
- `docs/playwright-article-desktop.png`
- `docs/playwright-article-mobile.png`
- `docs/playwright-article-dark.png`

## Review Status

Reference: `docs/review-code.md`

- No blocking review findings.
- Code review result is `PASS`.
- Follow-up notes are non-blocking maintainability polish items only.

## Risk and Rollback

Risk is low because the work is limited to reversible template and CSS refinements. There are no content-model, API, or data changes.

Rollback is straightforward:
- Revert the TOC partial extraction and restore inline page/blog TOC markup.
- Revert the desktop rail layout back to the previous boxed TOC treatment.
- Revert the palette, spacing, and logo refinements in templates and CSS.

## Open Items and Next Steps

- If this direction is accepted, the next cleanup pass can convert TOC rendering to a recursive macro for deeper heading support.
- The `[Edit]` link styling can be moved out of template inline styles and unified globally.
- Layout constants such as TOC width, content max width, and page gap can be promoted to CSS variables if more visual tuning follows.

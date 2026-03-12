# Task Brief

## Task

- taskId: `granda-ascii-logo`
- tags: `continue`, `design-lite`
- risk: `Low`
- epic: `false`

## Problem Definition

The Granda-style theme refresh is already in place, but article navigation is still missing a theme-consistent outline. Readers need a left-side table of contents they can show or hide without adding visual noise. The current ASCII masthead is also unclear and reads like `0YAL`; it should explicitly say `0xc1` in a new ASCII treatment that matches the terminal-like aesthetic.

## Acceptance Criteria

1. Article pages with headings render a left-side outline on desktop and a non-breaking version on smaller screens.
2. The outline can be shown and hidden by the reader.
3. The outline styling matches the current minimalist Granda-inspired theme.
4. The site header logo clearly reads `0xc1` and uses a new ASCII style.
5. Theme toggle and existing article features continue to work.
6. `zola serve`/`zola build` succeed for local verification.

## Assumptions

- TOC is needed on content pages rendered by `templates/page.html` and `templates/blog-page.html`.
- Reusing Zola's built-in `page.toc` structure is sufficient; no client-side heading parsing is needed.
- A lightweight native interaction pattern is preferred over a heavier JavaScript sidebar system.

## Design Lite

- Use a two-column article layout on wide screens: sticky TOC rail on the left, content on the right.
- Render the outline via native `<details>` / `<summary>` so readers can show or hide it without extra JS complexity.
- Keep the TOC hidden entirely when no headings are present.
- Update the header ASCII block to a more legible `0xc1` composition while preserving the monochrome terminal feel.

## Risk Assessment

This is a `Low` risk UI-only change. It is local to templates, CSS, and lightweight behavior, does not change content data or public APIs, and can be reverted cleanly.

## Verification Plan

- Run `zola build` to catch template or style regressions.
- Run `zola serve` briefly to confirm the new layout starts correctly in local preview.
- Review generated article pages for desktop/mobile-safe TOC behavior.

# Task Brief

## Task

- taskId: `granda-toc`
- tags: `continue`, `design-lite`
- risk: `Low`
- epic: `false`

## Problem Definition

The current Granda-inspired refresh has the right overall tone, but the visual details are not yet cohesive enough. The ASCII logo still feels too light, the TOC reads as a boxed widget rather than part of the page architecture, and several small spacing and color decisions can be refined so the site feels more deliberate, comfortable, and memorable.

This iteration should optimize for overall aesthetic coherence first, then individual details.

## Aesthetic Direction

- Keep the current restrained, terminal-adjacent minimalism.
- Make the site feel more crafted than generic by refining proportion, rhythm, and line treatment rather than adding decoration.
- Prefer a softer paper-and-ink palette over stark pure black-on-white where it improves comfort.
- Make the TOC feel architectural: a reading rail, not a floating card.
- Make the logo feel harder-edged and more intentional while remaining compact and quiet.

## Acceptance Criteria

1. The header logo clearly reads `0xc1` and looks more solid and intentional than the current version.
2. Desktop article pages present the TOC as a left-side rail that visually extends through the page rather than a bordered box.
3. The TOC still supports show/hide behavior and remains natural on mobile.
4. Global refinements improve comfort and polish without losing the current minimalist identity.
5. Desktop and mobile screenshots confirm the site remains clean, readable, and visually balanced.

## Assumptions

- This remains a UI-only refinement task with no content-model or API changes.
- Subtle global CSS adjustments are acceptable if they preserve the current tone.
- A template partial may be introduced to reduce duplicated TOC markup.

## Design Lite

- Introduce a shared page-outline partial so TOC structure stays consistent.
- Convert the desktop TOC from a bordered box into a full-height rail with a sticky inner disclosure block.
- Slightly warm the palette and soften rule colors to improve long-form reading comfort.
- Increase typographic clarity with small adjustments to body size, line height, spacing, and metadata rhythm.
- Replace the logo with a stronger ASCII treatment that is still compact enough for the current header.

## Risk Assessment

Risk is `Low`. The work is limited to reversible template and CSS refinements, with optional small structural cleanup through a partial include.

## Verification Plan

- Run `zola build`.
- Run `zola serve` for local preview, sequentially rather than in parallel with build.
- Use Playwright screenshots for homepage desktop, article desktop, article mobile, and one dark-mode spot check.

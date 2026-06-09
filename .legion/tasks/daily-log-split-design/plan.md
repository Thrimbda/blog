# Daily Log Split Implementation

## Task Contract

- **taskId**: `daily-log-split-design`
- **mode**: approved-design continuation
- **goal**: Execute the approved RFC by splitting aggregate daily logs into atomic pages and shipping a frontend archive experience with static fallback, infinite loading, and mobile date access.

## Acceptance

1. `gcores-talks`, `diary-2020`, and `diary-2026` entries are available as per-entry Zola pages.
2. Archive pages present entries as a continuous daily feed, not just a thin link list.
3. Infinite loading appends additional static archive pages when JavaScript is available.
4. Non-JS users can still browse through real pagination links.
5. Mobile users have a clear touch-friendly way to open a specific date's page.
6. The UI preserves the existing terminal-paper style.
7. The implementation is verified at iPhone-class, 13-inch, and 27-inch viewport sizes.

## Scope

- Content migration for:
  - `content/gcores-talks.md`
  - `content/diary/diary-2020.md`
  - `content/diary/diary-2026.md`
- New daily archive and daily entry templates.
- Theme CSS/JS needed for archive feed, infinite loading, date jump, mobile resilience, and accessibility.
- Configuration/navigation updates required by the route changes.
- Legion docs, Impeccable context docs, validation screenshots, and wiki notes.

## Non-goals

- Do not redesign the whole blog.
- Do not add a frontend framework.
- Do not make infinite loading the only navigation path.
- Do not change unrelated blog posts or multilingual generation.
- Do not add comments to every daily entry in this pass.

## Design Source

`docs/rfc.md` plus the user's clarification on 2026-06-08:

- file organization is less important than frontend presentation
- infinite loading must be real
- mobile access to a specific date must be designed and verified

## Risks

- Gcores duplicate dates can create slug collisions if the migration uses date-only filenames.
- Very large inline archive pages can become heavy if pagination batches are too large.
- Infinite scroll can break keyboard and non-JS access if it replaces real pagination.
- Long links, code blocks, and image groups can create mobile overflow.

## Verification

- `zola build`
- Local browser smoke tests for archive routes and entry routes
- Playwright viewport metrics for iPhone-class, 13-inch, and 27-inch sizes
- Computer Use visual inspection for the same three size classes

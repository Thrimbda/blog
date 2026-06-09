# Daily Log Split Design

## Task Contract

- **name**: Daily log split and browsing design
- **taskId**: `daily-log-split-design`
- **goal**: Design a maintainable way to split `gcores-talks`, `diary-2020`, and `diary-2026` daily entries into one file per day or per atomic entry while keeping archive browsing smooth.
- **problem**: The current long Markdown pages mix many daily entries into single files. This keeps authoring simple but makes rebuilds, URL targeting, browsing performance, table of contents length, and future automation brittle as the archive grows.

## Acceptance

1. Inspect the current `content/gcores-talks.md`, `content/diary/diary-2020.md`, and `content/diary/diary-2026.md` structures and identify constraints that affect splitting.
2. Produce a design that covers file layout, URL strategy, front matter, duplicate-date handling, generated indexes, lazy or infinite browsing, non-JS fallback, migration, rollback, and verification.
3. Preserve the current visual language of the site while identifying UI improvements that fit the existing terminal-paper style.
4. Create `PRODUCT.md` and `DESIGN.md` required by the `impeccable` skill so future UI work has project context.
5. Use Computer Use to inspect/debug the relevant pages at three viewport classes: iPhone 17-sized mobile, 13-inch laptop, and 27-inch desktop.
6. Record design review, viewport evidence, and residual risks in task docs.

## Scope

- `PRODUCT.md`
- `DESIGN.md`
- `.impeccable/design.json`
- `.legion/tasks/daily-log-split-design/**`
- Read-only inspection of current content files, templates, CSS, and browser behavior
- Design proposal for future implementation of content splitting and browsing enhancements
- Limited UI hardening that preserves the current theme style and is required by viewport validation:
  - mobile outline default state
  - long-link wrapping inside article/home markdown surfaces
  - removal of `user-scalable=no` from the viewport meta tag

## Non-goals

- Do not split the production Markdown content in this task.
- Do not rewrite the site visual identity.
- Do not introduce a client-rendered app or JavaScript-only archive.
- Do not change navigation, routes, or daily-log content.
- Do not add broad theme rewrites beyond the limited UI hardening listed in scope.
- Do not solve all multilingual content migration questions beyond defining the boundary and follow-up checks.

## Assumptions

- Zola remains the static site generator.
- The archive should keep working without JavaScript.
- Smooth browsing can be achieved with static paginated index pages plus optional JavaScript progressive enhancement.
- Daily diary entries have unique dates inside a year, but Gcores talks can contain multiple entries on the same date and therefore need an entry sequence or source id.
- The current terminal-paper design is intentional and should be preserved.

## Constraints

- Existing content uses mixed front matter styles (`---` YAML and `+++` TOML) across the repository.
- Existing `gcores-talks.md` contains imported images and duplicate dates.
- Current theme already has post lists, page outlines, Embla grouping for consecutive images, dark mode, language switch, and responsive rules.
- The local PATH does not include `zola`; validation uses a temporary Nix-provided `zola 0.21.0`.

## Risks

- Splitting Gcores by date alone can overwrite duplicate-date entries or produce unstable slugs.
- Infinite scroll can harm accessibility, history navigation, and non-JS access if it replaces static pagination.
- Preserving old URLs may require redirects or legacy aggregate pages.
- Zola taxonomy/feed behavior may change if every daily entry becomes a page without careful filtering.
- Imported images and long code/log content can cause mobile overflow if daily entries are surfaced in a denser feed.

## Design Summary

Recommended direction: split daily-log content into regular Zola section pages, keep year/source archive pages as static paginated indexes, and add optional infinite loading as progressive enhancement over real pagination.

The future implementation should create source-specific sections:

- `content/gcores-talks/_index.md`
- `content/gcores-talks/YYYY/MM/DD[-NN].md`
- `content/diary/YYYY/_index.md`
- `content/diary/YYYY/YYYY-MM-DD.md`

The first implementation should migrate one source at a time, starting with diary because diary dates are unique and less image-heavy. Gcores migration should preserve duplicate-date entries with sequence suffixes such as `2025-07-23-01.md` and `2025-07-23-02.md`, or with stable source ids if the importer can provide them.

Browsing should remain static-first:

1. Section index renders a normal Zola paginated list.
2. Each page has a permanent daily-entry URL.
3. JavaScript enhances the paginator by fetching the next static page and appending list items when a sentinel enters the viewport.
4. If JavaScript fails, users still use the existing previous/next pagination links.

## Phases

1. Contract and design context: create `PRODUCT.md`, `DESIGN.md`, and task contract docs.
2. Research and RFC: inspect existing content/template constraints and write the recommended design.
3. RFC review: check design for implementability, verification, rollback, and scope risk.
4. Browser validation: run local site and inspect/debug three viewport classes with Computer Use.
5. Closing: write walkthrough and reusable wiki notes.

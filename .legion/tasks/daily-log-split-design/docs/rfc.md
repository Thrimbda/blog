# RFC: Split Daily Logs Into Atomic Pages With Progressive Archive Browsing

## Status

Proposed for future implementation. This task records the design only.

## Context

Three pages currently act as aggregate daily-log files:

- `content/gcores-talks.md`
- `content/diary/diary-2020.md`
- `content/diary/diary-2026.md`

They are easy to author but increasingly expensive to browse and maintain. The desired end state is one daily or atomic entry per file, with smooth chronological browsing.

## Goals

1. Make each daily entry linkable, searchable, and independently maintainable.
2. Keep archive browsing continuous and low-friction.
3. Preserve the existing visual style.
4. Keep static fallback behavior when JavaScript fails.
5. Give future implementation a migration and rollback path.

## Recommended Architecture

Use Zola sections as the source of truth for atomic daily entries.

```text
content/
  diary/
    _index.md
    2020/
      _index.md
      2020-04-13.md
      2020-04-14.md
    2026/
      _index.md
      2026-01-22.md
      2026-01-23.md
  gcores-talks/
    _index.md
    2026/
      01/
        2026-01-01.md
    2025/
      07/
        2025-07-23-01.md
        2025-07-23-02.md
```

Diary entries can use date-only filenames because the inspected years have unique dates. Gcores entries must use a stable disambiguator because duplicate dates exist. Prefer a source id from Gcores if the API/importer exposes one; otherwise use deterministic sequence suffixes based on source order for that date.

## Front Matter Contract

Each atomic entry should have enough metadata to render archive rows and reconstruct aggregates if needed.

```yaml
---
title: "2026-01-22"
date: 2026-01-22
template: "daily-entry.html"
extra:
  source: "diary"
  archive_year: 2026
  entry_kind: "work-log"
---
```

For Gcores:

```yaml
---
title: "2025-07-23"
date: 2025-07-23
template: "daily-entry.html"
extra:
  source: "gcores"
  source_url: "https://www.gcores.com/users/464460/talks"
  source_id: "optional-stable-id"
  sequence: 2
  topic: "出去走走"
---
```

Use `description` or summary content only when it is useful for list previews. Avoid duplicating whole entries into front matter.

## URL Strategy

Recommended final URLs:

- `/diary/2020/2020-04-13/`
- `/diary/2026/2026-01-22/`
- `/gcores-talks/2025/07/2025-07-23-02/`

Keep `/diary/diary-2020/`, `/diary/diary-2026/`, and `/gcores-talks/` as compatibility surfaces for at least one release:

- Option A: leave aggregate pages in place as legacy pages that link to the new archive.
- Option B: replace aggregate pages with year/source archive pages that preserve title and explanatory copy.
- Option C: generate redirect pages if the deployment target supports redirects or static meta refresh.

Recommendation: start with Option A during migration, then move to Option B after confidence is high. Avoid redirect-only behavior until link-checking and feed behavior are verified.

## Browsing Model

### Static Baseline

Use Zola pagination for archive sections:

- Diary year sections paginate daily entries in reverse chronological order.
- A top diary index links years and may show the latest entries across years.
- Gcores section paginates atomic talk entries in reverse chronological order.
- Existing `post_list` macro style is reused so the archive stays text-row based.

### Progressive Infinite Loading

Add a small enhancement script only after static pagination works:

1. Render normal paginator links with `rel`-compatible next/previous URLs.
2. Add a sentinel after the list.
3. When the sentinel intersects, fetch the next static page.
4. Parse the returned HTML and append only the list items from a known container such as `[data-infinite-list]`.
5. Update the next URL and `history.replaceState` or a small progress marker.
6. Stop when no next page exists.

Accessibility requirements:

- Keep the paginator visible or provide a "load more" button when reduced motion or assistive modes are detected.
- Announce appended entries through a polite live region.
- Preserve focus and keyboard access.
- Never hide entries from non-JS users.

## Template Changes For Future Implementation

Add or adapt templates:

- `daily-entry.html`: a variant of `blog-page.html` with back links to the source/year archive and without unnecessary article chrome changes.
- `daily-section.html`: archive list template with `data-infinite-list`, `data-next-page`, and a real paginator fallback.
- Optional `daily-year-index.html`: year-level diary grouping and summary.

Keep CSS additions minimal:

- Reuse `.post-list-index`, `.post-date`, `.post-note`, `.post-nav`.
- Add only state styles for loading, end-of-list, and duplicate-date sequence labels.
- Do not add cards, rounded panels, or new color accents.

## Migration Plan

1. Build a parser script that reads aggregate Markdown and emits a dry-run manifest before writing files.
2. Migrate `diary-2020` first because it has unique dates and simpler content.
3. Migrate `diary-2026` next and preserve month grouping as generated archive headings or metadata.
4. Extend `scripts/get-gcores-talk.ts` so future imports write atomic files directly.
5. Migrate historical `gcores-talks.md` with duplicate-date disambiguation.
6. Keep old aggregate pages as legacy/compatibility pages for one release.
7. Verify build, internal links, feeds, archive pagination, and three viewport classes.

## Rollback

Rollback is file-level:

- Keep original aggregate Markdown files unchanged until the new archive builds and visual checks pass.
- Generate new atomic files into new directories.
- If feeds or links break, remove new directories and revert navigation/template references.
- If infinite loading fails, keep static pagination and disable the enhancement script.

## Verification Plan

- `zola build` with temporary Nix-provided Zola.
- Link checker warnings reviewed for old and new routes.
- Manifest check: entry count before/after matches per source, duplicate Gcores dates are preserved with unique slugs.
- Browser checks at mobile, laptop, and wide desktop widths.
- JavaScript disabled or simulated fallback check for archive pagination.
- Reduced-motion check for any loading/transition behavior.

## Alternatives Considered

### Keep Aggregate Files And Add Anchors

Pros: smallest migration. Cons: does not solve file size, rebuild granularity, or independent entry URLs. Rejected as insufficient.

### Client-render A JSON Feed

Pros: flexible infinite scroll. Cons: weak static fallback, more runtime complexity, worse SEO/link durability. Rejected because it violates archive-first constraints.

### Split By Month Only

Pros: fewer files. Cons: still leaves long pages and does not give daily entries permanent pages. Acceptable only as an intermediate migration step, not the target.

## Open Questions For Implementation

- Does Gcores importer expose stable source ids for each talk entry?
- Should daily entries appear in the global Atom feed, or should feeds stay curated to blog posts plus aggregate pages?
- Should Giscus comments appear on every daily entry or only on aggregate/year pages?
- Should old aggregate pages stay permanently as human-readable yearly compilations?

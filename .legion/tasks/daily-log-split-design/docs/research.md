# Research: Daily Log Split Design

## Source Inventory

| Source | Current file | Size | Lines | Entry pattern | Entry count | Duplicate dates |
|---|---:|---:|---:|---|---:|---|
| Gcores talks | `content/gcores-talks.md` | 144K | 2890 | `## YYYY-M-D` | 128 | yes |
| Diary 2020 | `content/diary/diary-2020.md` | 32K | 619 | `### YYYY-MM-DD` | 61 | no |
| Diary 2026 | `content/diary/diary-2026.md` | 52K | 490 | `### YYYY-MM-DD` plus month headings | 13 | no |

Examples of duplicate Gcores dates include `2025-7-23`, `2024-12-18`, `2024-12-2`, `2024-11-28`, and `2024-11-19`. Date-only filenames are therefore unsafe for Gcores unless the importer adds sequence suffixes or source ids.

## Current Content Shape

- `gcores-talks.md` is a single page with one root front matter block, an original-source link, and repeated `## date` entries separated by two horizontal-rule markers.
- `diary-2020.md` is a single page with YAML front matter and `### date` entries.
- `diary-2026.md` is a single page with YAML front matter, a top `# 2026` heading, month group headings, and `### date` entries.
- `content/diary/_index.md` is already a Zola section with `paginate_by = 15`, `sort_by = "date"`, and `page_template = "blog-page.html"`.

## Current Theme Capabilities

- `section.html` already renders paginated post lists when Zola provides a paginator.
- `macros/post_list.html` renders title, date, leader rule, and optional summary/tags.
- `blog-page.html` renders page metadata, back links, article content, tags, outline rail, and Giscus.
- `page.html` renders standalone pages such as `gcores-talks.md`.
- `script.js` already handles theme persistence, Giscus theme sync, page outline state, task-list styling, highlight.js, and Embla image grouping.
- `style.css` already has responsive behavior for post lists, outline rails, header controls, and image carousels.

## UI Style Findings Through Impeccable Lens

The current UI is coherent: a warm paper background, dark ink, monospace/serif fallback, ASCII logo, bracketed controls, thin rules, and text-first archive lists. This is a deliberate brand register, not a generic product UI.

Optimizations should preserve identity:

- Keep archive entries as text rows, not cards.
- Improve long archive browsing through list density, sticky year/source context, and static pagination.
- Add infinite loading only as progressive enhancement over real pages.
- Improve mobile resilience around long URLs, code blocks, image groups, and duplicate-date entry labels.
- Keep focus states visible and avoid JavaScript-only navigation.

## Build/Validation Environment

The machine PATH did not have `zola`. A temporary Nix shell provided `zola 0.21.0`, which is suitable for local serve/build validation without modifying repository dependencies.

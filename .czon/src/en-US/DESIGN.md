---
name: "c1 blog"
description: "A durable terminal-paper personal archive for essays, diary logs, and imported talk fragments."
colors:
  paper-bg: "#f6f1e8"
  paper-elevated: "#fbf8f2"
  ink: "#171411"
  muted: "#6c655c"
  muted-strong: "#555047"
  link-blue: "#1f4d8f"
  visited-violet: "#6a537d"
  rule: "#d4ccbf"
  code-bg: "#ebe5db"
  dark-bg: "#171311"
  dark-elevated: "#221b17"
  dark-ink: "#efe2d2"
  dark-rule: "#4a4038"
typography:
  display:
    fontFamily: "Dashes, monospace"
    fontSize: "1.52em"
    fontWeight: 700
    lineHeight: 1.72
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Dashes, monospace"
    fontSize: "1.24em"
    fontWeight: 700
    lineHeight: 1.72
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Dashes, monospace"
    fontSize: "1.1em"
    fontWeight: 700
    lineHeight: 1.72
  body:
    fontFamily: "Dashes, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "Dashes, monospace"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  xs: "0.35rem"
  sm: "0.65rem"
  md: "1.1rem"
  lg: "2.25rem"
components:
  link:
    textColor: "{colors.link-blue}"
  button-ghost:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.muted-strong}"
    rounded: "{rounded.none}"
    padding: "0.08rem 0.2rem"
  article:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.ink}"
    width: "70ch"
---

# Design System: c1 blog

## 1. Overview

**Creative North Star: "Terminal Paper Archive"**

The visual system combines warm paper colors with terminal-like monospace rhythm. It is intentionally quiet: the content, chronology, and plain navigation are the interface. The design should feel maintained and personal, not polished into a generic publication product.

The current site rejects decorative surfaces. Rules, brackets, ASCII marks, text links, and narrow reading columns carry the identity. Future work should keep that language and improve reading continuity, responsive fit, and state clarity without introducing card-heavy layouts or marketing-page composition.

**Key Characteristics:**
- Text-first, low ornament, high continuity.
- Warm paper in light mode and brown-black paper in dark mode.
- Monospace serif fallback through the custom `Dashes` face.
- Thin rules and bracketed controls instead of filled widgets.
- Static-first behavior with JavaScript as progressive enhancement.

## 2. Colors

The palette is a warm archival paper system with one restrained blue link accent and a violet visited state.

### Primary
- **Link Blue** (`#1f4d8f`): The only strong interactive accent in light mode. Use for inline links and important navigation affordances.
- **Visited Violet** (`#6a537d`): Preserves browser-like visited semantics without becoming decorative.

### Neutral
- **Paper Background** (`#f6f1e8`): Default page background and the dominant surface.
- **Elevated Paper** (`#fbf8f2`): Dropdown and small elevated UI surface.
- **Ink** (`#171411`): Body text and primary headings.
- **Muted Ink** (`#6c655c`): Secondary metadata, list marks, and low-emphasis affordances.
- **Strong Muted Ink** (`#555047`): Navigation, controls, and metadata that must remain readable.
- **Rule** (`#d4ccbf`): Dividers, borders, focus outlines, and post-list leader rules.
- **Dark Paper** (`#171311`): Dark-mode page background.
- **Dark Elevated Paper** (`#221b17`): Dark-mode elevated surface.
- **Dark Ink** (`#efe2d2`): Dark-mode body text.
- **Dark Rule** (`#4a4038`): Dark-mode dividers and borders.

### Named Rules

**The One Accent Rule.** Blue is for links and core interactive affordances only. Do not add decorative accent colors to long-reading pages.

**The Paper Stays Paper Rule.** Keep the warm paper identity, but verify contrast whenever muted text or controls sit on tinted backgrounds.

## 3. Typography

**Display Font:** `Dashes` with local Georgia, Times New Roman, DejaVu Serif, Liberation Serif, Nimbus Roman fallbacks.
**Body Font:** `Dashes`, `monospace`.
**Label/Mono Font:** Same family as body.

**Character:** The type is deliberately mechanical and literary at once. It should read like a durable text console printed on paper, not like a modern SaaS interface.

### Hierarchy
- **Display** (700, `1.52em`, line-height inherited from body): Page titles and major article headings.
- **Headline** (700, `1.24em`): Section headings inside pages and long posts.
- **Title** (700, `1.1em`): Lower-level headings and compact section titles.
- **Body** (400, `15px`, `1.72`): Long-form reading. Keep article width around `69ch` to `70ch`.
- **Label** (600, `0.8rem`, `0.08em` letter spacing): Sparse controls such as outline summaries. Do not multiply label styles across sections.

### Named Rules

**The Reading Column Rule.** Body content should stay within roughly `65ch` to `75ch`; long log indexes can be wider only when the date/list structure benefits from it.

## 4. Elevation

The system is flat by default. Depth is expressed with thin rules, tonal surfaces, spacing, and source order. Shadows are rare and should be structural, not decorative; the language switch dropdown is the current exception because it floats above the header flow.

### Shadow Vocabulary
- **Dropdown Lift** (`box-shadow: 0 0.45rem 1rem rgba(23, 20, 17, 0.08)`): Use only for small floating controls that must visually detach from the page.

### Named Rules

**The Flat Archive Rule.** Articles, log entries, and lists do not get card shadows. Use headings, dates, rules, and whitespace for structure.

## 5. Components

### Buttons
- **Shape:** Square text controls with no radius (`0`).
- **Primary:** There is no filled primary button pattern. Use text links or bracketed ghost buttons.
- **Hover / Focus:** Underline on hover/focus; `1px` rule-colored focus outline with a small offset.
- **Ghost:** Theme toggle uses bracket pseudo-elements and muted text on the page background.

### Chips
- **Style:** Tags are text links rendered as `/tag/`, not pills.
- **State:** No selected-chip style exists today; keep future filters text-based unless a stronger state is required.

### Cards / Containers
- **Corner Style:** No card radius.
- **Background:** Articles sit directly on the body background.
- **Shadow Strategy:** No shadows for content containers.
- **Border:** Thin rules separate header, footer, outline rail, code blocks, tables, and list leader lines.
- **Internal Padding:** Content relies on page padding and line rhythm instead of boxed padding.

### Inputs / Fields
- **Style:** Native form controls inherit the monospace family and use `1px` rule borders.
- **Focus:** Prefer visible rule-colored outlines.
- **Error / Disabled:** Not currently established; future forms should keep states text-first and high contrast.

### Navigation
- **Style:** Header and footer navigation are inline text links under an ASCII logo. Controls use bracketed text. Navigation wraps rather than collapsing into a hamburger on small screens.
- **Mobile Treatment:** Body padding compresses, post lists switch from leader-line rows to two-column/date-under-title rows, and dropdowns become in-flow panels.

### Page Outline

The outline rail is a signature component for long posts. On desktop it becomes a sticky left rail with a thin divider; on smaller screens it remains in the document flow. Collapsed state should persist per path and must never hide the article itself.

### Embla Image Groups

Consecutive images are progressively grouped into an Embla carousel. The carousel should keep images inspectable, capped by viewport height, and should not alter single-image posts.

## 6. Do's and Don'ts

### Do:
- **Do** preserve the `--bg`, `--fg`, `--muted`, `--link`, and `--border` token vocabulary when adding new UI.
- **Do** keep long-form article width near `70ch` and list/archive pages around the existing `84ch` shell.
- **Do** use thin `1px` rules, bracketed controls, and text links before adding panels.
- **Do** provide non-JS fallback for lazy-loaded or infinite browsing surfaces.
- **Do** test mobile, laptop, and wide desktop reading for overflow, tap targets, and line length.

### Don't:
- **Don't** introduce card-heavy archive grids, glossy gradients, glass panels, or hero sections.
- **Don't** add `border-left` or `border-right` accent stripes greater than `1px`.
- **Don't** use large rounded cards, pill tags, or filled CTA buttons for ordinary archive navigation.
- **Don't** hide daily log entries behind JavaScript-only rendering.
- **Don't** let imported images, long URLs, code blocks, or diary headings create horizontal scrolling on mobile.

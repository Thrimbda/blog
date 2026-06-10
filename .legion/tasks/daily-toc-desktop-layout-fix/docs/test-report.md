# Test Report

## Result

PASS.

## Commands

```bash
nix-shell --run 'zola build'
```

Result: PASS. Zola 0.21.0 built 257 pages and 9 sections.

```bash
NODE_PATH=/Users/c1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
  /Users/c1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node <playwright-layout-assertions>
```

Result: PASS using local Chrome channel.

Checked pages:

- `/gcores-talks/`
- `/diary/2020/`
- `/diary/2026/`

Checked viewports:

- iPhone-sized: `393x852`, expected `.daily-layout` display `block`
- Narrow desktop threshold: `900x900`, expected `.daily-layout` display `grid`
- 13-inch laptop: `1440x900`, expected `.daily-layout` display `grid`
- 27-inch desktop: `2560x1440`, expected `.daily-layout` display `grid`

All page/viewport pairs passed:

- expected layout mode matched computed style
- TOC and feed positions matched the expected top/bottom or left/right relationship
- no horizontal overflow
- `[data-infinite-next]` remained present

```bash
NODE_PATH=/Users/c1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
  /Users/c1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node <playwright-infinite-load-smoke>
```

Result: PASS. On `/gcores-talks/` at `1440x900`, entry cards increased from 8 to 16 after clicking `继续加载`.

## Visual Check

Representative screenshots were inspected for:

- `900x900` Gcores: left date TOC rail plus right feed
- `1440x900` Gcores: left/right layout with readable feed width
- `2560x1440` Gcores: centered shell, left/right layout preserved
- `393x852` Gcores: TOC remains in flow above the feed

Screenshots were used as local verification artifacts and are not intended as committed deliverables.

## Why These Checks

The bug was a responsive behavior mismatch, so computed layout assertions are stronger than a generic build. The extra `900x900` viewport specifically covers the range where the dummy already used a rail but production previously fell back to top/bottom.

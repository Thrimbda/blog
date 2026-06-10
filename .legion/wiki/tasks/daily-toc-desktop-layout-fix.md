# daily-toc-desktop-layout-fix

## Status

Implemented and verified; pending PR lifecycle at time of writeback.

## Problem

The daily archive TOC implementation used `960px` as the grid breakpoint, while the approved dummy used `880px`. This made some desktop-like browser contexts, especially 13-inch or sidebar-constrained windows, render the TOC above the feed instead of as a left rail.

## Decision

Daily archive pages use a daily-specific `880px` grid breakpoint. The rail width and gap are fluid near the threshold and settle back to the original desktop proportions on wider screens.

Normal article outline breakpoint remains unchanged.

## Verification

- `zola build` passed.
- `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` passed layout assertions at `393x852`, `900x900`, `1440x900`, and `2560x1440`.
- `393x852` intentionally remains top/bottom.
- `900x900`, `1440x900`, and `2560x1440` are left/right.
- Infinite loading smoke test passed.

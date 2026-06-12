# daily-toc-anchor-plus

## Status

Implemented and verified; pending PR lifecycle at time of writeback.

## Problem

The daily archive TOC linked directly to standalone daily pages. The approved Version D interaction separates the two actions:

- click the date/title to locate the entry in the aggregate archive
- hover/focus the row and use `+` to open the standalone daily page

This needed to work with existing pagination and infinite loading because many TOC targets are not present in the first rendered page.

## Decision

Daily TOC data now includes a stable `anchor` derived from the standalone URL slug. Templates render date and sequence labels as `#anchor` links and render `+` as the standalone URL.

The existing infinite loader is reused by TOC navigation. If a clicked anchor is missing, the script loads subsequent pages until the target article appears, then scrolls and focuses it.

## Verification

- `git diff --check` passed.
- `node --check themes/cone-scroll/static/js/script.js` passed.
- `zola build` passed.
- `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` passed Playwright checks at `393x852`, `1440x900`, and `2560x1440`.
- Computer Use inspected the local Zen browser on `/gcores-talks/`.

## Durable Notes

- Mobile and touch layouts must show the standalone `+` link without hover.
- Desktop should keep the `+` visually quiet until hover or focus.
- Same-day duplicate entries need per-entry `+` links, not one date-level link.
- TOC anchor resolution should reuse real pagination, not introduce a client-only data path.

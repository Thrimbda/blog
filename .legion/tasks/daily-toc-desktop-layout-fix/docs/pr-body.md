## Summary

- Fix the daily archive TOC breakpoint mismatch with the approved dummy.
- Make daily archive pages switch to left TOC rail + right feed at `880px`.
- Keep iPhone-sized screens as top TOC + feed and leave normal article outline behavior unchanged.

## Validation

- `nix-shell --run 'zola build'`
- Playwright computed layout assertions for `/gcores-talks/`, `/diary/2020/`, and `/diary/2026/` at:
  - `393x852`: expected top/bottom
  - `900x900`: expected left/right
  - `1440x900`: expected left/right
  - `2560x1440`: expected left/right
- Playwright infinite loading smoke test on `/gcores-talks/`: `8 -> 16` entries after clicking `继续加载`

## Notes

The previous implementation was readable at tested sizes, but it did not assert the actual layout mode. This PR adds the missing responsive behavior and records that desktop/laptop checks must verify left/right TOC placement, not just absence of overlap.

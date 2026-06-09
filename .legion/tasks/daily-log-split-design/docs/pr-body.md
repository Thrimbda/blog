# PR Body Draft

## Summary

- Add product/design context docs required by `impeccable`.
- Add a Legion RFC for splitting aggregate daily-log pages into atomic Zola entries with static-first browsing and optional infinite loading.
- Apply small responsive/accessibility hardening while preserving the existing terminal-paper UI style.

## UI Changes

- Allow browser zoom by removing `user-scalable=no`.
- Wrap long links inside article and home markdown content.
- Collapse the article outline by default on small viewports when no saved user preference exists.

## Validation

- `zola build` via Nix-provided Zola `0.21.0`
- Playwright metrics for `gcores-talks`, `diary-2020`, and `diary-2026` across:
  - iPhone-class `402x874`
  - 13-inch `1440x900`
  - 27-inch `2560x1440`
- Computer Use visual inspection across the same three size classes

## Notes

This does not split production daily-log content yet. The split is documented as a follow-up implementation plan.

# Test Report: Daily Log Split Design

## Result

PASS.

The task is a design/RFC task with limited UI hardening. Production daily-log content was not split. The current pages now pass the viewport checks needed for the design handoff.

## Build

Command:

```sh
nix --extra-experimental-features 'nix-command flakes' shell nixpkgs#zola -c zola build
```

Result:

- PASS
- Zola version: `0.21.0`
- Latest observed build completed with 285 pages and 14 sections.

## Automated Viewport Metrics

Local target: `http://127.0.0.1:1111`

Measured pages:

- `/gcores-talks/`
- `/diary/diary-2020/`
- `/diary/diary-2026/`

Measured viewport classes:

- `iphone17`: `402x874`
- `13in`: `1440x900`
- `27in`: `2560x1440`

Summary:

| Viewport | Page | Horizontal overflow | Article width | Outline state |
|---|---|---:|---:|---|
| iphone17 | gcores-talks | no | 365px | collapsed |
| iphone17 | diary-2020 | no | 365px | collapsed |
| iphone17 | diary-2026 | no | 365px | collapsed |
| 13in | gcores-talks | no | 621px | expanded |
| 13in | diary-2020 | no | 621px | expanded |
| 13in | diary-2026 | no | 621px | expanded |
| 27in | gcores-talks | no | 621px | expanded |
| 27in | diary-2020 | no | 621px | expanded |
| 27in | diary-2026 | no | 621px | expanded |

Raw metrics are recorded in `docs/viewport-metrics.json`. Screenshots are recorded in `docs/screenshots/`.

Notes:

- Element-level overflow entries remain for Embla off-screen slides and horizontally scrollable code content, but page-level `scrollWidth` equals the viewport width in all nine measured cases.
- Mobile outline default collapse is intentionally conditional: if a reader has an existing per-page localStorage preference, that preference still wins.

## Computer Use Inspection

Used Computer Use with Google Chrome to inspect and debug the pages at three size classes:

- iPhone-class narrow window: verified header, collapsed outline, article start, and long-link wrapping on `gcores-talks` and `diary-2020`.
- 13-inch laptop window: verified `diary-2026` with left outline rail and readable article column.
- 27-inch desktop window: verified `diary-2026` remains centered/constrained and does not stretch into an unreadable measure.

Chrome window bounds used for manual inspection:

- narrow/mobile class: approximately `520x900` including browser chrome
- 13-inch class: `1440x900`
- 27-inch class: `2560x1440`

## UI Hardening Verified

- `themes/cone-scroll/templates/head.html`: removed `user-scalable=no` so browser zoom is allowed.
- `themes/cone-scroll/static/css/style.css`: added article/home markdown link wrapping with `overflow-wrap: anywhere`.
- `themes/cone-scroll/static/js/script.js`: default collapsed page outline on viewports up to 600px when no stored state exists.

## Residual Risk

- The actual daily-log split still needs a future migration with entry-count manifest checks.
- Gcores duplicate dates require stable source ids or deterministic sequence suffixes before content can be split safely.
- Infinite loading should be implemented only after static paginated archive pages exist.

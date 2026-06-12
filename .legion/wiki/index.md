# Legion Wiki

## Current Durable Notes

- `tasks/daily-log-split-design.md`: Daily log split architecture and viewport validation decisions.
- `tasks/const-cloudflare-access.md`: `/const` route and Cloudflare Access Terraform scaffold.
- `tasks/const-access-sops-apply.md`: SOPS-backed Cloudflare Access apply and encrypted Terraform state handling.
- `tasks/daily-log-toc-implementation.md`: Daily archive TOC implementation and duplicate-date sequence rule.
- `tasks/daily-toc-desktop-layout-fix.md`: Daily archive TOC breakpoint correction after production/demo mismatch.
- `tasks/daily-toc-anchor-plus.md`: Version D TOC behavior, date links locate aggregate entries and `+` opens standalone pages.
- `patterns.md`: Reusable theme and archive implementation conventions.
- `maintenance.md`: Follow-up implementation backlog.

## Current Truth

The blog is a Zola static archive with a deliberate terminal-paper visual language. Long daily-log pages should be split into atomic Markdown pages through static sections and pagination. Daily archive navigation should look like a document TOC: primary date links locate aggregate entries, while inline `+` links open standalone daily pages. Infinite loading is only progressive enhancement. The `/const` path is protected by Cloudflare Access through Terraform, with Cloudflare/Terraform private inputs and local state managed through SOPS encrypted files.

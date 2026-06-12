# Legion Wiki Log

## 2026-06-08
- Initialized wiki index, patterns, and task summary for `const-cloudflare-access`.
- Promoted reusable patterns for Nix/czon site verification and Cloudflare Access Terraform path protection.

## 2026-06-10
- Added task summary for `daily-log-toc-implementation`.
- Promoted the daily archive TOC pattern: document-outline navigation, plain date links, duplicate-date sequence labels, static pagination preserved.
- Updated daily-log maintenance backlog after TOC implementation.
- Added task summary for `daily-toc-desktop-layout-fix`.
- Promoted a daily archive responsive verification rule: desktop/laptop checks must assert left/right TOC placement, not just visual non-overlap.

## 2026-06-11
- Added task summary for `const-access-sops-apply`.
- Promoted the SOPS-backed Terraform apply pattern: encrypted env inputs, temporary plaintext state only during operations, encrypted JSON state as durable copy, plan scope gate, and no raw secret-bearing evidence in docs.
- Updated current truth to note `/const` is protected by Cloudflare Access with SOPS-managed private inputs/state.

## 2026-06-12
- Added task summary for `daily-toc-anchor-plus`.
- Promoted the Version D daily archive TOC rule: primary date links locate entries in the aggregate archive, while inline `+` links open standalone daily pages.
- Promoted the lazy anchor-resolution rule: unloaded TOC targets should use existing pagination/infinite loading, not a separate client-only data path.

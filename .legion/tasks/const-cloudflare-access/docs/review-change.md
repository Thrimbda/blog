# Change Review: const-cloudflare-access

> **Decision**: PASS
> **Reviewed**: 2026-06-08
> **Scope**: implementation files, current worktree diff, `plan.md`, `docs/rfc.md`, `docs/review-rfc.md`, and `docs/test-report.md`.
> **Security lens**: Applied, because the task defines a Cloudflare Access authentication boundary.

## Summary

The implementation satisfies the acceptance criteria. It adds a bounded `const` site entry and initializes a provider-v5 Cloudflare Access Terraform configuration that protects only the `const` path family. Verification evidence records a passing project-level `czon` build and passing Terraform `fmt`, `init -backend=false`, and `validate`. No blocking findings were found.

## Evidence Reviewed

- Site entry:
  - `config.toml` adds `nav_const` in all configured language translation blocks and appends `{ path = "@/const.md", label_key = "nav_const" }` to `extra.header_nav`.
  - `content/const.md` defines the default `/const/` page.
  - `.czon/meta.json` and `.czon/src/{zh-Hans,en-US,ja-JP,es-ES,de-DE}/content/const.md` include minimal multilingual `const` content.
- Terraform:
  - `infra/cloudflare-access/versions.tf` pins `cloudflare/cloudflare >= 5.8.0, < 6.0.0`.
  - `infra/cloudflare-access/main.tf` uses `cloudflare_zero_trust_access_application` and `cloudflare_zero_trust_access_policy`.
  - `infra/cloudflare-access/.terraform.lock.hcl` locks provider `5.19.1` from `terraform init -backend=false`.
  - `infra/cloudflare-access/terraform.tfvars.example` contains placeholders only.
  - `.gitignore` ignores `.terraform/`, state, plan, `terraform.tfvars`, and `*.auto.tfvars` while preserving `*.tfvars.example`.
- Verification evidence:
  - `docs/test-report.md` records PASS for `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"`.
  - `docs/test-report.md` records PASS for Terraform `fmt -check`, `init -backend=false`, and `validate` via `nix-shell -p terraform`.
  - `docs/test-report.md` explicitly states no `terraform apply` was executed.

## Findings

### PASS — Site behavior matches acceptance

The homepage navigation now has a `const` item using the existing `header_nav` mechanism, and all configured languages define `nav_const`, avoiding missing translation failures. `content/const.md` provides the target page, and the `.czon` multilingual source files are minimal placeholders consistent with the amended RFC. The recorded project-level `czon` build passed.

### PASS — Cloudflare Access boundary is precise

`infra/cloudflare-access/main.tf` constructs destinations for:

- `${site_hostname}/const`
- `${site_hostname}/const/`
- `${site_hostname}/const/*`

This covers the parent path, trailing-slash page, and descendants without broadening to the whole hostname. The application is self-hosted and const-specific; there is no `*` or apex-only destination that would protect unrelated routes.

### PASS — Policy and secrets are variableized

The policy is driven by variables (`access_policy_include`, `access_policy_require`, `access_policy_exclude`, names, decision, session duration). `account_id` and `zone_id` are sensitive variables, the provider block does not contain a token, and the example tfvars uses placeholders such as `REPLACE_WITH_CLOUDFLARE_ACCOUNT_ID` and `REPLACE_WITH_ACCESS_GROUP_ID`. Review did not find committed real Cloudflare token/account/zone/team/email/group/service-token values in the new Terraform files.

### PASS — Terraform correctness is sufficient for delivery

The configuration uses provider v5 Zero Trust resources, avoids deprecated `self_hosted_domains`, includes a provider lock file, and has passing `terraform fmt -check`, `terraform init -backend=false`, and `terraform validate` evidence. Ignored local Terraform artifacts are not listed as untracked files; only `.terraform.lock.hcl` is intentionally present for reproducibility.

### PASS — No blocker or scope violation found

Changes are limited to the planned site entry, `.czon` multilingual artifacts, Terraform initialization, ignore rules, and Legion task documents. No Terraform `apply` was executed or implied as part of this task.

## Non-blocking Notes

- Before production rollout, the environment owner still needs to provide private Terraform variables and apply outside this review flow.
- If an Access application already exists for the same hostname/path, import or coordinate rather than creating a duplicate resource.

## Decision

PASS. Proceed to `report-walkthrough`.

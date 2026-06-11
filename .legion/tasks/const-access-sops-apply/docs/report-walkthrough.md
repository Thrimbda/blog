# Report Walkthrough: Const Access SOPS Apply

**Task**: `const-access-sops-apply`  
**Mode**: implementation  
**Date**: 2026-06-11  
**Delivery status**: Ready for reviewer walkthrough. `docs/test-report.md` and `docs/review-change.md` both record PASS outcomes.

## Evidence used

- `.legion/tasks/const-access-sops-apply/docs/test-report.md`
- `.legion/tasks/const-access-sops-apply/docs/review-change.md`
- `.legion/tasks/const-access-sops-apply/docs/rfc.md`
- `.legion/tasks/const-access-sops-apply/docs/review-rfc.md`
- `.legion/tasks/const-access-sops-apply/log.md`
- Scaffold/runbook files referenced by those reports: `.sops.yaml`, `.gitignore`, `shell.nix`, `secrets/cloudflare-access.enc.env`, `secrets/cloudflare-access.tfstate.enc.json`, and `infra/cloudflare-access/`

No decrypted secret values, private identity values, raw Terraform state, plan output, apply output, Access redirect URL, or Cloudflare resource IDs are reproduced here.

## What changed for reviewers

This delivery moved the already-scaffolded Cloudflare Access Terraform stack through SOPS-backed real apply and verification for the `/const` path. The implementation remained limited to the Access application/policy workflow and its secret/state handling; it did not add DNS, Pages, Workers, whole-domain protection, Access groups, IdP groups, or service tokens.

## SOPS env and state setup

- The task added a repo SOPS setup for encrypted files under `secrets/`, including the Terraform env file and encrypted JSON state path.
- `secrets/cloudflare-access.enc.env` is the private input source for `CLOUDFLARE_API_TOKEN` and required `TF_VAR_*` values. Verification checked that it is encrypted, decryptable, and usable through `sops exec-env` without printing values.
- Terraform state is durably preserved as SOPS-encrypted JSON at `secrets/cloudflare-access.tfstate.enc.json`.
- Plaintext Terraform state, backups, plan files, and temporary apply/plan logs were removed after verification. `.gitignore` keeps plaintext Terraform artifacts ignored and allow-lists only the encrypted state file.

## Final Access include rule shape

- The final policy include boundary is one email rule using Cloudflare provider v5 object syntax.
- Shape only: `[{"email":{"email":"<private-email>"}}]` in the SOPS env / equivalent Terraform object form.
- Earlier `group.email` input was rejected by provider validation because group rules require a group id. The rule was corrected to the intended single-email boundary without printing the actual email value.

## Terraform plan and apply scope

- Terraform `fmt`, `init -backend=false`, `validate`, and plan generation passed using the SOPS-provided environment.
- Plan scope assertions showed exactly two creates:
  - `cloudflare_zero_trust_access_application.const`
  - `cloudflare_zero_trust_access_policy.const`
- Destination coverage was asserted as exactly:
  - `/const`
  - `/const/`
  - `/const/*`
- No DNS, Pages, Workers, whole-domain, or unrelated Cloudflare resources were included in the plan/apply scope.
- Apply completed successfully from the reviewed plan. Apply output was redirected to a temporary log and deleted to avoid retaining private identifiers or resource details in task evidence.

## Post-apply verification

- The encrypted state was restored temporarily for a post-apply Terraform plan.
- `terraform plan -detailed-exitcode` returned exit code `0`, recorded as a post-apply no-op plan.
- An anonymous HTTP request to `/const/` returned `302`, recorded as an Access challenge. The hostname and redirect URL were not printed.
- After verification, plaintext state and temporary logs were removed again.

## Delivery review result

`docs/review-change.md` records **PASS** with no blocking findings. The review covered secret leakage risk, SOPS env/state encryption, Terraform state cleanup, Cloudflare Access resource scope, apply evidence, post-apply no-op evidence, and the anonymous Access challenge.

## Residual notes

- Raw plan/apply/state evidence is intentionally summarized rather than embedded, because those artifacts can contain sensitive identifiers.
- The stack still uses local state with a SOPS-encrypted tracked copy; there is no remote locking, so only one operator should run this Terraform stack at a time.
- The encrypted state remains sensitive and should stay limited to intended SOPS recipients.

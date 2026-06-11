# Test Report: SOPS Apply Verification

**Task**: `const-access-sops-apply`  
**Phase**: scaffold verification plus **Phase 5 - Apply & Verification**  
**Date**: 2026-06-11  
**Result**: PASS. Terraform apply completed, encrypted state was saved, post-apply plan was no-op, and anonymous `/const/` access returned an Access challenge.

## Verification basis

Read before validation:

- `.legion/tasks/const-access-sops-apply/plan.md`
- `.legion/tasks/const-access-sops-apply/docs/rfc.md`
- `.legion/tasks/const-access-sops-apply/docs/review-rfc.md`
- current scaffold files: `.sops.yaml`, `secrets/cloudflare-access.enc.env`, `.gitignore`, `shell.nix`, `infra/cloudflare-access/README.md`, and Terraform files under `infra/cloudflare-access/`
- previous `docs/test-report.md`

The report keeps secret-bearing values out of logs and task docs. Commands that could print Cloudflare IDs, email, redirect URLs, resource IDs, or state content were redirected, summarized, or asserted via `jq` without value output.

## Checks

| Check | Command / Method | Result | Evidence / Notes |
|---|---|---|---|
| SOPS env is encrypted | `sops filestatus secrets/cloudflare-access.enc.env` | PASS | Returned `{"encrypted":true}`. The file contains SOPS `ENC[...]` values and SOPS metadata, not plaintext Cloudflare values. |
| SOPS env decrypts without printing plaintext | `sops -d secrets/cloudflare-access.enc.env >/dev/null` | PASS | Command succeeded with decrypted output redirected to `/dev/null`; no secret values were printed. |
| Required variables present via `exec-env` | `sops exec-env secrets/cloudflare-access.enc.env 'sh -eu -c "test -n required vars"'` | PASS | Checked `CLOUDFLARE_API_TOKEN`, `TF_VAR_account_id`, `TF_VAR_zone_id`, `TF_VAR_site_hostname`, and `TF_VAR_access_policy_include` for non-empty presence only; values were not printed. This proves the scaffold has all required keys, not that the user has supplied final real values. |
| `.sops.yaml` creation rule matches `.enc.env` | `sops --encrypt --filename-override secrets/cloudflare-access.enc.env --input-type dotenv --output-type dotenv /dev/stdin >/dev/null <<< 'CLOUDFLARE_API_TOKEN=PLACEHOLDER'` | PASS | Encryption succeeded using the repo `.sops.yaml` rule for `^secrets/.*\.enc\.(env|json)$`. This uses only the public recipient in config; no private key was read, copied, or printed. |
| Terraform artifact ignore rules | `git check-ignore -v --non-matching -- ...` | PASS | Plaintext state, state backups, plan files, `terraform.tfvars`, and `*.auto.tfvars` are ignored. `terraform.tfvars.example` remains unignored. `!secrets/cloudflare-access.tfstate.enc.json` allow-lists the encrypted state path. |
| README token/apply/state guidance | Manual review of `infra/cloudflare-access/README.md` | PASS | README gives least-privilege token guidance, instructs editing only through SOPS, runs Terraform through `sops exec-env`, gates apply on plan/user approval, documents encrypted state restore/save, and forbids committing plaintext state/plan/tfvars/secrets. No real token/account/zone/email/group/team values found. |
| `shell.nix` includes Terraform | Manual review of `shell.nix` | PASS | `terraform` is present in `packages`. |
| Terraform fmt/init/validate via Nix | `nix-shell --run 'terraform -chdir=infra/cloudflare-access fmt -check && terraform -chdir=infra/cloudflare-access init -backend=false && terraform -chdir=infra/cloudflare-access validate'` | PASS | Terraform initialized successfully and reported `Success! The configuration is valid.` `init` used `-backend=false`; no `plan` or `apply` was run. |
| Changed-file sensitive-value scan | Python static scan over `git diff --name-only` plus untracked files for obvious Cloudflare token/global-key/account-zone-id/email/identity UUID patterns, allow-listing SOPS `ENC[...]`, placeholders, and the SSH public recipient comment | PASS | Output: `STATIC_SECRET_SCAN=PASS`. Scanned changed files were `.gitignore`, `shell.nix`, task docs, `.sops.yaml`, `infra/cloudflare-access/README.md`, and `secrets/cloudflare-access.enc.env`. |
| User secret gate after fill | Per-variable `sops exec-env` checks | PASS | Confirmed required vars were non-empty and not placeholders. Values were not printed. Initial gate caught missing/placeholder `TF_VAR_zone_id`; after user updated it, the gate passed. |
| Include rule shape correction | `sops --decrypt --extract '["TF_VAR_access_policy_include"]' ... | jq` for key-only inspection, then `sops set --value-stdin` | PASS | Terraform provider v5 rejected the mistaken `group.email` shape because `group.id` is required. After user clarified the desired boundary is one email, the encrypted env was converted to `email.email` shape. Only key names were printed; the email value was not printed. |
| Terraform plan generation | `terraform fmt -check`; `sops exec-env ... 'terraform -chdir=infra/cloudflare-access init -backend=false'`; `validate`; `plan -out=tfplan -no-color >/dev/null` | PASS | Plan file generated locally and was not printed. |
| Plan scope gate | `terraform show -json tfplan | jq` assertions | PASS | Plan resource changes were exactly `cloudflare_zero_trust_access_application.const` create and `cloudflare_zero_trust_access_policy.const` create. Additional assertions confirmed destination coverage is exactly `/const`, `/const/`, and `/const/*`. |
| Terraform apply | `sops exec-env ... 'terraform -chdir=infra/cloudflare-access apply -auto-approve -no-color tfplan >/tmp/opencode/cloudflare-access-apply.log 2>&1'` | PASS | Apply completed. Output was redirected to a temporary log and then deleted to avoid retaining resource IDs or private details in task evidence. |
| Encrypted state save | `sops --encrypt --input-type json --output-type json --filename-override secrets/cloudflare-access.tfstate.enc.json --output <tmp> infra/cloudflare-access/terraform.tfstate`; `sops -d --input-type json --output-type json <tmp> >/dev/null`; move into `secrets/cloudflare-access.tfstate.enc.json` | PASS | Durable state copy exists only as SOPS-encrypted JSON in `secrets/cloudflare-access.tfstate.enc.json`. Plaintext state and backup were removed after verification. |
| Post-apply no-op plan | Restore encrypted state temporarily, run `sops exec-env ... 'terraform -chdir=infra/cloudflare-access plan -detailed-exitcode -no-color >/tmp/opencode/cloudflare-access-postapply-plan.log 2>&1'`, then remove plaintext state and log | PASS | Exit code `0`, recorded as `post-apply-plan-noop`. |
| Anonymous Access challenge | `sops exec-env ... curl -sS -o /dev/null -w '%{http_code}' 'https://$TF_VAR_site_hostname/const/'` | PASS | Returned `access-challenge-http-302`. Redirect URL and hostname were not printed. |

## Non-actions / gates

- Did not print or request any real Cloudflare token, account ID, zone ID, email, group ID, IdP/service-token ID, team domain, or private identity rule.
- Did not print Terraform plan content, Terraform state content, apply output, Access redirect URL, resource IDs, or decrypted secret values.
- Did not create or modify DNS, Pages, Workers, whole-domain protection, Access groups, IdP groups, or service tokens.

## Current state

Apply verification is PASS. `/const/` is protected by Cloudflare Access according to anonymous HTTP 302 challenge behavior. Terraform state has been encrypted to `secrets/cloudflare-access.tfstate.enc.json`; local plaintext state, backup, tfplan, and temporary apply/plan logs were removed.

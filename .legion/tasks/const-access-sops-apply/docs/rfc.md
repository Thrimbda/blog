# RFC: SOPS-managed Cloudflare Access Terraform inputs

**Task**: `const-access-sops-apply`  
**Status**: Proposed for `review-rfc`  
**Date**: 2026-06-11  
**Scope**: Design only. Do not run Terraform `apply` in this phase.

## 1. Context

`infra/cloudflare-access/` already contains Terraform resources for one Cloudflare Zero Trust Access policy and one self-hosted Access application. The provider is configured to read `CLOUDFLARE_API_TOKEN` from the environment, and variables such as `account_id`, `zone_id`, `site_hostname`, and `access_policy_include` are declared in Terraform.

Current repo observations:

- `shell.nix` includes `sops` and `age`; Terraform itself is not declared there.
- `secrets/api_key.enc` is already SOPS-encrypted with the SSH public recipient from `~/.ssh/id_ed25519.pub`.
- `.gitignore` already ignores plaintext Terraform state/plan/tfvars patterns (`*.tfstate`, `*.tfstate.*`, `*.tfplan*`, `terraform.tfvars`, `*.auto.tfvars`). If an encrypted state file is committed as `secrets/cloudflare-access.tfstate.enc.json`, implementation must add a specific allow-list exception for that encrypted file.

Public recipient found from `~/.ssh/id_ed25519.pub`:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKrC5k/qhfJUVkMG0Fr+RKEIf1VV9Q6eSWLcnP+NXiFR c.one@thrimbda.com
```

Only the public key was read. The private key must not be read, copied, logged, or committed.

## 2. Goals and non-goals

### Goals

- Define `.sops.yaml` creation rules for repo-local encrypted secret/state files.
- Define a SOPS-managed env file for Terraform and the Cloudflare provider.
- Tell the user how to create a least-privilege Cloudflare API token without pasting it into chat.
- Define a state strategy that survives worktree cleanup without committing plaintext state.
- Define apply gates, verification, and rollback boundaries.

### Non-goals

- No Cloudflare token, account ID, zone ID, email, group ID, IdP ID, service token ID, team domain, plaintext tfvars, plaintext state, or plan artifact should be written into chat or unencrypted files.
- Do not broaden Terraform scope beyond `infra/cloudflare-access/`.
- Do not create DNS, Pages, Workers, Access Groups, IdPs, or service tokens in this task unless a later reviewed RFC explicitly expands scope.
- Do not run `terraform apply` until the user confirms the SOPS secret is filled and the Terraform plan is acceptable.
- Do not run `terraform destroy` without explicit user confirmation.

## 3. `.sops.yaml` design

Recommended implementation:

```yaml
creation_rules:
  # New encrypted env and JSON secret/state files.
  - path_regex: ^secrets/.*\.enc\.(env|json)$
    age: >-
      ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKrC5k/qhfJUVkMG0Fr+RKEIf1VV9Q6eSWLcnP+NXiFR c.one@thrimbda.com

  # Existing repo convention, for example secrets/api_key.enc.
  - path_regex: ^secrets/.*\.enc$
    age: >-
      ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKrC5k/qhfJUVkMG0Fr+RKEIf1VV9Q6eSWLcnP+NXiFR c.one@thrimbda.com
```

Rationale:

- Uses the default local SSH public key as requested and matches the recipient already visible in existing SOPS metadata.
- Restricts automatic encryption rules to the `secrets/` namespace and `.enc.*` / `.enc` naming, so accidental plaintext files do not become silently accepted.
- Keeps public recipient material in config only; the private key remains local and outside the repo.

## 4. Secret env file design

Recommended file: `secrets/cloudflare-access.enc.env`

The user should create/edit it locally with SOPS, for example:

```sh
sops secrets/cloudflare-access.enc.env
```

Template shape, with placeholders only:

```dotenv
CLOUDFLARE_API_TOKEN=REPLACE_WITH_CLOUDFLARE_API_TOKEN

TF_VAR_account_id=REPLACE_WITH_CLOUDFLARE_ACCOUNT_ID
TF_VAR_zone_id=REPLACE_WITH_CLOUDFLARE_ZONE_ID
TF_VAR_site_hostname=REPLACE_WITH_TARGET_HOSTNAME

# Optional if keeping Terraform defaults:
TF_VAR_const_path=const
TF_VAR_application_name=const
TF_VAR_policy_name=Allow const access
TF_VAR_policy_decision=allow
TF_VAR_session_duration=24h

# Provider v5 Access rule object syntax. Use private values only.
# Example shape only; replace with the user's actual minimal identity rule.
TF_VAR_access_policy_include=[{"email":{"email":"REPLACE_WITH_EMAIL"}}]

# Omit these variables to use Terraform defaults, or set to Terraform null/list syntax if needed.
# TF_VAR_access_policy_require=null
# TF_VAR_access_policy_exclude=null
```

Required values to fill locally:

- `CLOUDFLARE_API_TOKEN`: custom Cloudflare API token, never Global API Key.
- `TF_VAR_account_id`: target Cloudflare account ID.
- `TF_VAR_zone_id`: target Cloudflare zone ID for the public site.
- `TF_VAR_site_hostname`: target hostname only, no scheme and no path.
- `TF_VAR_access_policy_include`: minimal Access identity include rule in Cloudflare provider v5 object syntax.

Optional values, only if the defaults are not acceptable:

- `TF_VAR_const_path`: expected to remain the `const` path unless deliberately changed and reviewed.
- `TF_VAR_application_name`, `TF_VAR_policy_name`, `TF_VAR_policy_decision`, `TF_VAR_session_duration`.
- `TF_VAR_access_policy_require`, `TF_VAR_access_policy_exclude`.

Identity rule guidance:

- Prefer a narrow single-email rule when the intended private access boundary is exactly one user.
- A narrow Access group or IdP group rule remains acceptable only if that is the user's intended private access boundary.
- Avoid broad rules such as everyone/all users unless explicitly reviewed.
- Do not paste actual emails, group IDs, IdP IDs, service token IDs, or team domains into chat or docs.

### Why `.enc.env` instead of JSON

Use `.enc.env` because `sops exec-env` can inject `CLOUDFLARE_API_TOKEN` and `TF_VAR_*` directly into the Terraform process. JSON would require either a conversion step, a generated `terraform.tfvars`, a shell export script, or extra parsing with `jq`/templates. Those conversions create more places for plaintext to leak and make complex variable handling harder to audit. The only structured value needed here, `TF_VAR_access_policy_include`, can still be represented as a Terraform/JSON expression string inside the env file.

## 5. Cloudflare API token design

Web check performed on 2026-06-11:

- Cloudflare's API token permissions reference lists `Access: Apps and Policies Read` and write-level names as `Access: Apps and Policies Write` / dashboard-style `Edit`, with descriptions for read/write access to Access applications and policies: <https://developers.cloudflare.com/fundamentals/api/reference/permissions/>
- Cloudflare's token creation docs state that token policies bind permission groups to scoped resources and that permission names can be cosmetic; resource scoping is account/zone specific: <https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/>
- Cloudflare API permission groups expose scopes such as account and account-zone resources: <https://developers.cloudflare.com/api/resources/user/subresources/tokens/subresources/permission_groups/>
- Terraform provider docs for `cloudflare_zero_trust_access_application` and `cloudflare_zero_trust_access_policy` confirm this config is managing Access applications/policies with account/zone identifiers: <https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_access_application> and <https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_access_policy>

Recommended user-facing token request steps:

1. Open Cloudflare Dashboard.
2. Go to **My Profile → API Tokens → Create Token → Create Custom Token**.
3. Name it narrowly, for example `terraform-const-access`.
4. Add account-scoped Access app/policy permissions for only the target account:
   - `Access: Apps and Policies Read`
   - `Access: Apps and Policies Write` or `Access: Apps and Policies Edit` if the UI uses `Edit`.
5. Add zone-scoped Access app/policy permissions for only the target zone if the UI exposes Access Apps/Policies as a zone permission:
   - `Access: Apps and Policies Read`
   - `Access: Apps and Policies Write` / `Edit`
6. Resource restrictions:
   - Account resources: include only the target account.
   - Zone resources: include only the target zone.
   - Do not use all accounts/all zones unless Cloudflare UI cannot express the target restriction; if so, stop and record the limitation before continuing.
7. Do not add unrelated permissions such as DNS Write, Zone Settings Write, Workers, Pages, or broad account admin permissions.
8. If the UI has split permissions instead of the combined name, choose the narrow equivalent read/write permissions for both Access Apps and Access Policies only.
9. Optional hardening: set token expiration and source IP restrictions if the user's operating environment supports it.
10. Copy the token once and paste it only into `sops secrets/cloudflare-access.enc.env`, never into chat.

Notes for naming drift:

- Cloudflare docs and UI may show `Write` or `Edit` for the same write-level capability. Choose the write/edit entry whose description says it grants write access to Cloudflare Access applications and policies.
- Prefer permission descriptions and resource scopes over cosmetic permission group names if the UI wording differs.
- If Terraform `plan` returns 403 with the above permissions, do not immediately broaden to full admin. First identify whether the failing endpoint is account-scoped or zone-scoped and add only the missing Access Apps/Policies read/write permission for that scope.

## 6. Terraform state strategy

Current Terraform has no backend block, so Terraform will use local state under `infra/cloudflare-access/`. Worktree cleanup would lose the only state copy unless the task preserves it.

### Option A — SOPS-encrypted local state in `secrets/` (recommended)

Store the authoritative Terraform state as `secrets/cloudflare-access.tfstate.enc.json` encrypted by SOPS. Decrypt it only into `infra/cloudflare-access/terraform.tfstate` immediately before `plan/apply`; re-encrypt immediately after; remove plaintext state and backups from the worktree before commit.

Pros:

- Fits existing repo SOPS pattern and requested SSH recipient.
- Survives worktree cleanup and PR lifecycle without committing plaintext state.
- Avoids new remote backend credentials or Terraform Cloud setup.
- Keeps reviewable operational state history as encrypted data.

Cons / mitigations:

- No remote locking; only one operator should run this Terraform stack at a time.
- Encrypted state still contains sensitive environment metadata and must be treated as secret.
- Existing `.gitignore` ignores `*.tfstate.*`; implementation must add `!secrets/*.tfstate.enc.json` if the encrypted state is meant to be committed.

Recommended command shape:

```sh
# Before plan/apply: restore state if an encrypted state already exists.
if [ -f secrets/cloudflare-access.tfstate.enc.json ]; then
  sops -d --input-type json --output-type json \
    --output infra/cloudflare-access/terraform.tfstate \
    secrets/cloudflare-access.tfstate.enc.json
  chmod 600 infra/cloudflare-access/terraform.tfstate
fi

# Run Terraform only with SOPS-provided environment.
sops exec-env secrets/cloudflare-access.enc.env \
  'terraform -chdir=infra/cloudflare-access init'
sops exec-env secrets/cloudflare-access.enc.env \
  'terraform -chdir=infra/cloudflare-access validate'
sops exec-env secrets/cloudflare-access.enc.env \
  'terraform -chdir=infra/cloudflare-access plan'

# After an accepted apply, encrypt the resulting state before cleanup/commit.
sops --encrypt --input-type json --output-type json \
  --filename-override secrets/cloudflare-access.tfstate.enc.json \
  infra/cloudflare-access/terraform.tfstate \
  > secrets/cloudflare-access.tfstate.enc.json

# Verify the encrypted state is decryptable without printing it.
sops -d --input-type json --output-type json \
  secrets/cloudflare-access.tfstate.enc.json >/dev/null

# Remove plaintext state artifacts from the worktree.
rm -f infra/cloudflare-access/terraform.tfstate \
      infra/cloudflare-access/terraform.tfstate.backup
```

During implementation, prefer exact commands that avoid writing plaintext under `secrets/` even briefly. Do not commit plaintext state, plaintext state backups, or binary plan files.

Before apply, if an encrypted state already exists, make an encrypted pre-apply copy such as `secrets/cloudflare-access.tfstate.pre-YYYYMMDDHHMMSS.enc.json` or otherwise record a recoverable encrypted checkpoint. Do not create a plaintext backup checkpoint.

### Option B — Remote backend / Terraform Cloud

Add a backend with remote state and locking.

Pros:

- Better state durability and locking.
- Avoids committing any state artifact to the repo.

Cons:

- Requires selecting and provisioning a backend, credentials, access policy, and migration plan.
- Expands task scope beyond applying the already merged Cloudflare Access config.
- Adds another secret and operational dependency before the first apply.

This is a good future hardening option but is too much coordination for this task.

### Option C — Local unencrypted state outside the repo

Keep `terraform.tfstate` only on the operator machine, possibly outside the worktree.

Pros:

- Minimal process and no backend setup.

Cons:

- Easy to lose during worktree cleanup or machine changes.
- Not reproducible for later PR lifecycle or maintenance.
- Violates the task requirement that state handling be explicit and durable.

Not recommended.

### State decision

Use **Option A: SOPS-encrypted local state in `secrets/cloudflare-access.tfstate.enc.json`**, plus a `.gitignore` exception for that encrypted file. This keeps the current no-backend Terraform config while preventing loss of the only state copy.

## 7. Apply gate and execution sequence

No `terraform apply` is allowed until all gates are true:

1. `review-rfc` passes or explicitly approves a revised design.
2. `.sops.yaml` and `secrets/cloudflare-access.enc.env` are implemented.
3. User confirms they filled the SOPS env locally. They must not paste secret values into chat.
4. `sops exec-env` can prove required variables are present without printing values.
5. Terraform `fmt`, `init`, `validate`, and `plan` succeed.
6. The plan shows only the intended Cloudflare Access application/policy changes for the target hostname and `const` path coverage.
7. User explicitly accepts the plan.

Only after those gates should apply run:

```sh
sops exec-env secrets/cloudflare-access.enc.env \
  'terraform -chdir=infra/cloudflare-access apply'
```

If using a saved plan file, it must be outside the repo or ignored, treated as sensitive, and deleted before commit. Prefer interactive review of `terraform plan` output unless a saved plan is necessary.

## 8. Verification plan

### Secret handling

- `sops -d secrets/cloudflare-access.enc.env >/dev/null` succeeds without printing decrypted values in logs.
- `sops exec-env secrets/cloudflare-access.enc.env 'sh -c "test -n \"$CLOUDFLARE_API_TOKEN\" && test -n \"$TF_VAR_account_id\" && test -n \"$TF_VAR_zone_id\" && test -n \"$TF_VAR_site_hostname\" && test -n \"$TF_VAR_access_policy_include\""'` succeeds.
- Token verification may call Cloudflare's token verify endpoint, but must not print the token.

### Terraform

- `terraform -chdir=infra/cloudflare-access fmt -check`.
- `sops exec-env ... 'terraform -chdir=infra/cloudflare-access init'`.
- `sops exec-env ... 'terraform -chdir=infra/cloudflare-access validate'`.
- `sops exec-env ... 'terraform -chdir=infra/cloudflare-access plan'`.
- Confirm the plan affects only:
  - `cloudflare_zero_trust_access_policy.const`
  - `cloudflare_zero_trust_access_application.const`
- Confirm destination coverage remains exactly the target hostname with:
  - `/const`
  - `/const/`
  - `/const/*`
- Confirm there are no DNS, Pages, Workers, whole-domain, or unrelated Cloudflare changes.

### After apply

- Terraform apply exits successfully.
- Outputs show only non-secret metadata and expected destination URIs.
- Cloudflare dashboard/API shows the Access application and policy attached as planned.
- Access path check:
  - unauthenticated request/browser visit to the protected `const` path should be intercepted by Cloudflare Access according to the selected identity policy;
  - a non-protected page on the same site should remain reachable as before;
  - a permitted identity should be able to complete Access authentication, if the user can test it.
- Encrypt the final Terraform state, verify it decrypts, then remove plaintext state and backup files.
- Check for leaks before commit:
  - no `terraform.tfstate`, `terraform.tfstate.backup`, `tfplan`, `.tfplan`, `terraform.tfvars`, or unencrypted env files in `git status`;
  - no token/account/zone/identity values in diffs, logs, docs, or helper output;
  - only encrypted secret/state files may contain sensitive values.

## 9. Rollback plan

Rollback must be bounded and state-aware.

- If Terraform fails before apply: no Cloudflare changes should exist; fix token permissions, variable syntax, or state restoration, then re-run plan.
- If plan is unacceptable: stop. Do not apply. Adjust config or secret values only after review.
- If apply succeeds but Access behavior is wrong:
  1. Preserve the post-apply state by encrypting it immediately.
  2. Prefer a corrective Terraform change/apply that narrows or fixes only the Access application/policy.
  3. If urgent user access is blocked, the user may manually disable or adjust only the affected Access application/policy in Cloudflare Dashboard; the next Terraform step must reconcile/import/update state before further applies.
  4. Do not run `terraform destroy` or delete Access resources unless the user explicitly confirms that destructive rollback is desired.
- If state is corrupted or lost: stop; do not apply. Restore from the latest encrypted state checkpoint or import the live Access resources into Terraform state, then re-plan.

## 10. Open items for review-rfc

- Confirm whether the Cloudflare UI exposes combined `Access: Apps and Policies` permissions at both account and zone scopes for this account, or split `Access: Apps` / `Access: Policies` permissions.
- Confirm whether the implementation should add Terraform to `shell.nix` or rely on an already available Terraform binary.
- Confirm `.gitignore` exception for `secrets/cloudflare-access.tfstate.enc.json` if encrypted state will be committed.
- Confirm the user's intended `access_policy_include` rule shape before apply, without exposing actual private identifiers in chat.

## 11. Decision summary

- Use `.sops.yaml` with the default SSH public recipient from `~/.ssh/id_ed25519.pub`.
- Use `secrets/cloudflare-access.enc.env` for direct `sops exec-env` injection of `CLOUDFLARE_API_TOKEN` and `TF_VAR_*`.
- Request a custom Cloudflare API token scoped to the target account/zone with only Access Apps/Policies Read and Write/Edit permissions.
- Preserve Terraform state as SOPS-encrypted JSON in `secrets/cloudflare-access.tfstate.enc.json`; never commit plaintext state or plan files.
- Gate `apply` on user-confirmed SOPS secret completion and an acceptable Terraform plan.

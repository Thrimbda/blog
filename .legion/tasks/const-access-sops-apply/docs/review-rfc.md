# RFC Review: SOPS-managed Cloudflare Access Terraform inputs

**Task**: `const-access-sops-apply`  
**Review phase**: `review-rfc`  
**Date**: 2026-06-11  
**Decision**: PASS

## Scope reviewed

- `.legion/tasks/const-access-sops-apply/plan.md`
- `.legion/tasks/const-access-sops-apply/docs/rfc.md`
- `infra/cloudflare-access/` Terraform shape
- `secrets/api_key.enc` SOPS recipient metadata
- `shell.nix`
- `.gitignore`

No private key material was read or required for this review.

## Blocking findings

None.

## Findings

1. **SOPS `.enc.env` design is safe and executable.**
   - `sops exec-env secrets/cloudflare-access.enc.env` is an appropriate way to inject `CLOUDFLARE_API_TOKEN` and `TF_VAR_*` without creating plaintext tfvars.
   - Required secret fields and no-chat-secret handling are explicit.
   - Implementation should keep scaffold values as placeholders only and avoid printing decrypted values during validation.

2. **`.sops.yaml` recipient choice is reasonable.**
   - The RFC uses the existing/default SSH public recipient already visible in `secrets/api_key.enc` metadata.
   - This stores only public recipient material in repo config and does not require reading or exposing the private key.

3. **Cloudflare token scope is least-privilege for the planned Terraform resources.**
   - The RFC limits the token to Access Apps/Policies Read + Write/Edit on the target account/zone as exposed by the Cloudflare UI.
   - It explicitly rejects Global API Key/full admin and unrelated DNS, Workers, Pages, or broad account permissions.
   - The 403 fallback is correctly bounded: identify the missing Access Apps/Policies scope rather than broadening permissions.

4. **Terraform state strategy avoids post-apply state loss without committing plaintext state.**
   - SOPS-encrypted local state under `secrets/cloudflare-access.tfstate.enc.json` is acceptable for this task and survives worktree cleanup.
   - The RFC requires `.gitignore` allow-listing for the encrypted state, encrypted pre-apply checkpoints, decryptability verification, and removal of plaintext state/backups before commit.
   - Non-blocking implementation caution: write encrypted state via a temporary output file and move it into place only after successful encryption/decrypt verification, to avoid clobbering the previous encrypted state on command failure.

5. **Apply gate is clear enough to prevent unsafe apply.**
   - `apply` is blocked until RFC review passes, scaffold exists, the user locally fills SOPS secrets, required variables are present without printing values, Terraform plan succeeds, the plan only touches intended Access app/policy resources for `/const`, and the user explicitly accepts the plan.
   - The RFC correctly instructs that users must not paste token/account/zone/identity values into chat.

## Decision

PASS. The RFC can proceed to **Scaffold Implementation**. Remaining open items are implementation/user-gate details, not design blockers.

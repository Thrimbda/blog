## Summary

- Added SOPS-backed Cloudflare Access env/state handling for the `/const` Terraform stack.
- Applied the Access application/policy with a final single-email include rule shape.
- Saved Terraform state only as encrypted SOPS JSON and removed plaintext state/plan/log artifacts.

## Verification

- SOPS env/state encryption checks passed without printing decrypted values.
- Terraform fmt/init/validate/plan/apply completed; plan scope was limited to the Access application and policy for `/const`, `/const/`, and `/const/*`.
- Post-apply plan was no-op, anonymous `/const/` returned an Access challenge HTTP 302, and review-change passed.

## Safety

- No secret values, private identifiers, raw plan/apply logs, redirect URLs, or plaintext Terraform state are included.
- No DNS, Pages, Workers, whole-domain protection, Access groups, IdP groups, or service tokens were added.

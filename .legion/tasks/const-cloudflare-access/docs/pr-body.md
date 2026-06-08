## Summary

- Add a new `const` navigation entry and `/const/` page using the existing Zola `header_nav` flow.
- Add `.czon` multilingual `const` source content/metadata for all configured languages.
- Initialize `infra/cloudflare-access/` Terraform for a Cloudflare Access self-hosted application and policy scoped to `/const`, `/const/`, and `/const/*`.

## Verification

- PASS: `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"`
- PASS: `nix-shell -p terraform --run "terraform fmt -check -recursive infra/cloudflare-access"`
- PASS: `nix-shell -p terraform --run "cd infra/cloudflare-access && terraform init -backend=false"`
- PASS: `nix-shell -p terraform --run "cd infra/cloudflare-access && terraform validate"`
- PASS: `docs/review-change.md` records delivery/security review approval.

## Security/Access Notes

- Access destinations intentionally cover only `${site_hostname}/const`, `${site_hostname}/const/`, and `${site_hostname}/const/*`.
- Terraform variables/examples avoid committing real Cloudflare tokens, account IDs, zone IDs, team domains, email allowlists, IdP/group IDs, Access group IDs, or service token IDs.
- `.gitignore` excludes Terraform state, plans, `.terraform/`, `terraform.tfvars`, and `*.auto.tfvars`; `*.tfvars.example` remains trackable.

## No Apply/Secrets Note

- No `terraform apply` was run.
- Production values must be supplied privately by the environment owner before apply.
- If a matching Access app already exists, import or coordinate instead of creating a duplicate.

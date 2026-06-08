# Patterns

## Zola / czon Build Verification

**Context**: This repository uses Zola plus `czon` multilingual generation. A bare `zola build` can fail when multilingual source content has not been generated first.

**Pattern**:
- Enter the repository Nix environment for site verification.
- Use the project command advertised by `shell.nix`: `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"`.
- Treat bare `zola build` as a lower-level diagnostic unless the generated multilingual content is already present.
- If adding a content page that must participate in multilingual builds, include the corresponding `.czon/meta.json` update and `.czon/src/*/content/<page>.md` source artifacts when the project build generates them.

**Source**: `.legion/tasks/const-cloudflare-access/docs/test-report.md`

## Cloudflare Access Terraform Path Protection

**Context**: Cloudflare Access wildcard path matching does not automatically cover the parent path.

**Pattern**:
- For a protected path like `const`, configure Access destinations for all of these equivalent scopes:
  - `${site_hostname}/const`
  - `${site_hostname}/const/`
  - `${site_hostname}/const/*`
- Keep Cloudflare API token, account id, zone id, team domain, real identity rules, tfstate, plans, and local tfvars out of the repository.
- Prefer Cloudflare provider v5 Zero Trust resources for new configuration: `cloudflare_zero_trust_access_application` and `cloudflare_zero_trust_access_policy`.
- Validate Terraform with `terraform fmt -check`, `terraform init -backend=false`, and `terraform validate`; do not run `terraform apply` in review tasks unless explicitly requested with environment details.

**Source**: `.legion/tasks/const-cloudflare-access/docs/rfc.md`, `.legion/tasks/const-cloudflare-access/docs/review-change.md`

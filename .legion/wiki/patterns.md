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

## Static-First Infinite Archives

Infinite loading should enhance a real paginator rather than replace it.

Required pieces:

- server-rendered list container
- real next page URL
- polite live status
- failure path that leaves a usable link
- throttling so image layout shifts do not trigger multiple automatic loads at one scroll position

## Date Access On Mobile

For long daily archives, mobile access to a specific date should use a native select plus a normal link. This keeps the interaction touch-friendly and avoids a giant outline.

## Paginated Section Date Indexes

When Zola pagination hides the full `section.pages` list from the template, generate a data file such as `data/daily-index.json` during migration and load it in the archive template.

## Daily Feed Width

Daily archive entries live inside CSS grid. Set `min-width: 0` on the grid item and markdown content wrappers so long code blocks scroll inside `pre` instead of widening the whole page.

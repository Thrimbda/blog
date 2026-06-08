# Report Walkthrough: const-cloudflare-access

> **Mode**: implementation
> **Result**: ready for reviewer
> **Evidence source**: `docs/test-report.md` PASS and `docs/review-change.md` PASS

## Reviewer Summary

This change adds a new `const` entry to the Zola site and initializes Terraform for protecting the `/const/` route with Cloudflare Access.

- **Site entry**: `content/const.md` defines the default `/const/` page, and `config.toml` adds `nav_const` plus a `header_nav` item using the existing navigation mechanism.
- **Multilingual source**: `.czon/meta.json` and `.czon/src/{zh-Hans,en-US,ja-JP,es-ES,de-DE}/content/const.md` add minimal translated `const` placeholder content for the repository's `czon` build flow.
- **Infrastructure**: `infra/cloudflare-access/` contains Terraform provider v5 configuration, an Access application, an Access policy, variables, outputs, example tfvars placeholders, and a provider lock file.
- **Ignore rules**: `.gitignore` now excludes Terraform local state, plan files, local tfvars, and `.terraform/`, while preserving `*.tfvars.example`.

## Access Boundary

Terraform scopes the Cloudflare Access application to the `const` path family only:

- `${site_hostname}/const`
- `${site_hostname}/const/`
- `${site_hostname}/const/*`

This preserves the RFC requirement that wildcard descendants do not replace exact parent-path coverage, and avoids protecting unrelated routes or the whole hostname.

## Security Boundary

No real Cloudflare environment values are committed. The Terraform config keeps the following variableized or placeholder-only:

- API token, expected from `CLOUDFLARE_API_TOKEN` or private secret handling.
- `account_id`, `zone_id`, `site_hostname`, and private Access policy identity rules.
- Real emails, IdP/group IDs, Access group IDs, service token IDs, team domains, tfstate, plans, and local tfvars.

`terraform.tfvars.example` contains replacement placeholders only. No `terraform apply` was executed.

## Verification Evidence

From `docs/test-report.md`:

- `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"` — **PASS**; build completed and generated `/const.html` plus language variants.
- `nix-shell -p terraform --run "terraform fmt -check -recursive infra/cloudflare-access"` — **PASS**.
- `nix-shell -p terraform --run "cd infra/cloudflare-access && terraform init -backend=false"` — **PASS**; provider `cloudflare/cloudflare v5.19.1` locked.
- `nix-shell -p terraform --run "cd infra/cloudflare-access && terraform validate"` — **PASS**.

From `docs/review-change.md`:

- Change review decision: **PASS**.
- Security lens applied; no blocking findings.
- Reviewer notes confirm precise Access destination coverage, policy/secrets variableization, and no scope violation.

## Reviewer Notes

- Production rollout still requires the environment owner to supply private Terraform variables and run apply outside this task.
- If an Access app already exists for the same hostname/path, coordinate/import instead of creating a duplicate.
- Deploying the static site before Access is applied can temporarily expose `/const/`; coordinate rollout order accordingly.

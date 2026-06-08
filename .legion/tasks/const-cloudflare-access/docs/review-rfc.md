# RFC Review: const-cloudflare-access

> **Decision**: PASS
> **Reviewed**: 2026-06-08
> **Scope**: `.legion/tasks/const-cloudflare-access/docs/rfc.md` plus plan, research notes, and local repository evidence.

## Summary

The RFC is sufficient to proceed to implementation. It identifies the Zola entry points, chooses current Cloudflare provider v5 Zero Trust resources, keeps real Cloudflare/environment values out of the repository, and defines executable verification and rollback paths without requiring a real `terraform apply`.

## Evidence Checked

- Plan acceptance/non-goals: `.legion/tasks/const-cloudflare-access/plan.md`.
- Research notes: `.legion/tasks/const-cloudflare-access/docs/research.md`.
- RFC: `.legion/tasks/const-cloudflare-access/docs/rfc.md`.
- Local site evidence:
  - `config.toml:13-190` has per-language translation blocks that need `nav_const`.
  - `config.toml:219-224` defines `extra.header_nav` as the main navigation source.
  - `themes/cone-scroll/templates/header.html:11-16` uses `get_url(path=..., lang=current_lang)` plus `trans(label_key)`.
  - `.gitignore:1-5` currently lacks Terraform local artifact ignores.
- External docs checked during review:
  - Terraform Registry confirms `cloudflare_zero_trust_access_application` supports `domain`, `type = "self_hosted"`, `zone_id`/`account_id` scope, `destinations`, and inline `policies`; `self_hosted_domains` is deprecated in favor of `destinations`.
  - Terraform Registry confirms `cloudflare_zero_trust_access_policy` provider v5 uses `account_id`, `decision`, and list/set-style `include`/`exclude`/`require` nested attributes.
  - Cloudflare Access application path docs confirm wildcard paths such as `/const/*` do not cover the parent `/const`; exact parent and descendant coverage must be explicit.

## Findings

### PASS — Access boundary is implementable and reviewable

The RFC correctly treats Cloudflare Access as the enforcement boundary and calls out the main under-protection risk: `/const/*` alone would not cover `/const`. Its target coverage of:

- `${site_hostname}/const`
- `${site_hostname}/const/`
- `${site_hostname}/const/*`

is appropriate for protecting the Zola page, trailing-slash route, and descendants without broadening to the apex domain or unrelated routes. Implementation must preserve this exact/equivalent `destinations` coverage and must not replace it with only a single wildcard.

### PASS — Provider/resource choice is credible

The chosen resources, `cloudflare_zero_trust_access_application` and `cloudflare_zero_trust_access_policy`, match current Cloudflare Terraform provider v5 documentation. The RFC also correctly avoids deprecated `self_hosted_domains` and requires `terraform init -backend=false` plus `terraform validate` to catch schema drift before delivery.

### PASS — Variables and sensitive-value boundary are adequate

The RFC forbids committing API tokens, account/zone IDs, team domains, real email lists, IdP/group IDs, state, plans, and local tfvars. That satisfies the plan’s non-goals. For implementation, prefer no real default for `site_hostname`, `account_id`, `zone_id`, or policy identity inputs; use only placeholders in `terraform.tfvars.example`.

### PASS — Verification and rollback are executable

Verification now correctly uses the repository's project build command, `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"`, plus generated route/navigation inspection, `terraform fmt`, `terraform init -backend=false`, and `terraform validate`. Rollback distinguishes site rollback, infra rollback before apply, infra rollback after apply, and secret incident response. This is enough for the engineer and does not imply a real `terraform apply` in this task.

## Post-review Amendment Review

> **Amendment decision**: PASS
> **Reviewed**: 2026-06-08
> **Amendment scope**: switch final site verification from naked `zola build` to the repository `czon` build chain, and include `.czon/meta.json` plus `.czon/src/*/content/const.md` in the site-entry scope.

### Evidence Checked for Amendment

- `shell.nix:16-20` advertises `npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE` as a project-specific command; `shell.nix:28` also defines a `czongen` alias for the same multilingual generation flow, with language order differing only between `es-ES`/`ja-JP`.
- `plan.md:36-40` now explicitly includes `.czon/meta.json` and `.czon/src/*/content/const.md` in scope.
- `rfc.md:16`, `rfc.md:91`, and `rfc.md:160-164` now treat `czon build` as the authoritative site verification path and naked `zola build` as diagnostic only.
- Current implementation evidence shows the amended scope is real and bounded:
  - `config.toml:13-18`, `51-56`, `89-94`, `127-132`, and `165-170` include `nav_const` for all configured languages.
  - `config.toml:224-230` adds `{ path = "@/const.md", label_key = "nav_const" }` to the existing header nav mechanism.
  - `content/const.md` and `.czon/src/{zh-Hans,en-US,ja-JP,es-ES,de-DE}/content/const.md` exist as minimal translated placeholder pages.
  - `.czon/meta.json:481-510` records `content/const.md` metadata and multilingual translations for the `const` source.
  - `infra/cloudflare-access/main.tf:1-9` still scopes Access destinations to exact `/const`, `/const/`, and `/const/*`; the site-build amendment did not broaden the protected path.

### PASS — Amendment is reasonable and does not require a new blocking design review

The amendment corrects a verification assumption discovered after the original review: this repository is not just a bare Zola site; its multilingual content is generated/maintained through `czon`. Replacing final site verification with the documented `nix-shell --run "npx czon build ..."` command improves verifiability rather than changing the product or security design. No new implementation-unblocking design question is introduced.

### PASS — `.czon` multilingual source scope does not violate non-goals

Adding `.czon/meta.json` and `.czon/src/*/content/const.md` is consistent with the goal of producing `/const/` without breaking existing multilingual navigation. The files are generated/source artifacts for the existing content pipeline and contain only minimal placeholder `const` content plus metadata/translations. This does not modify existing blog posts, theme visuals, Cloudflare deployment pipeline, DNS, Pages, Workers, or real private Access policy values. Therefore it is within the amended site-entry scope, not a non-goal violation.

### PASS — `czon build` is the correct final site verification

Because `shell.nix` advertises `czon build` as a project-specific multilingual command and the amendment adds `.czon` source artifacts, final verification should exercise that path. Naked `zola build` can still be useful as a low-level diagnostic, but it is insufficient as the final acceptance command for this task because it may bypass multilingual generation/state that `czon` owns.

### PASS — Cloudflare Access security design is unaffected

The amendment changes only the site-content generation and verification boundary. It does not change the Cloudflare Access resource choice, sensitive-value boundary, no-`apply` constraint, policy variable model, or destination coverage. Current Terraform evidence still targets only the `const` path family (`/const`, `/const/`, `/const/*`) and does not expose tokens, real account/zone IDs, team domains, or real identity allowlists in the reviewed files.

## Non-blocking Implementation Notes

- Keep `site_hostname` required or placeholder-only; do not encode real Cloudflare environment values as defaults.
- Policy identity rules should be variable-driven and private. A committed example may show shape/placeholders only, not real emails, domains, group IDs, service token IDs, or team domains.
- If an Access application already exists for the same hostname/path, stop and document the need to import or coordinate with the environment owner; do not blindly create a conflicting app.
- Add Terraform local artifacts to `.gitignore` while preserving `.tfvars.example`.
- Do not execute `terraform apply` unless the user explicitly provides environment details and requests it in a later phase.

## Decision

PASS. No blocking issues prevent implementation.

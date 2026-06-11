# const-cloudflare-access

## Metadata
- `task-id`: `const-cloudflare-access`
- `status`: `active`
- `risk`: `high`
- `schema-version`: `legion-wiki-current`
- `historical`: `false`
- `supersedes`: `(none)`
- `superseded-by`: `const-access-sops-apply` for production rollout/state handling

## Outcome Summary
- Added a new `const` site entry using existing Zola navigation conventions.
- Initialized `infra/cloudflare-access/` Terraform for a Cloudflare Access self-hosted application and policy protecting only the `const` path family.
- Verified the site through the repository Nix/czon build path and verified Terraform through fmt/init/validate.
- Security review passed with no blocking findings; no real Cloudflare credentials, ids, identity rules, tfstate, plans, or local tfvars were committed.

## Reusable Decisions
- Use `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"` as the project-level site verification command.
- Access path protection for `const` must cover exact, trailing slash, and wildcard descendant paths.
- Real Cloudflare environment values belong in private tfvars, environment variables, or secret management, not tracked files.

## Related Raw Sources
- `plan`: `.legion/tasks/const-cloudflare-access/plan.md`
- `log`: `.legion/tasks/const-cloudflare-access/log.md`
- `tasks`: `.legion/tasks/const-cloudflare-access/tasks.md`
- `rfc`: `.legion/tasks/const-cloudflare-access/docs/rfc.md`
- `rfc-review`: `.legion/tasks/const-cloudflare-access/docs/review-rfc.md`
- `test-report`: `.legion/tasks/const-cloudflare-access/docs/test-report.md`
- `change-review`: `.legion/tasks/const-cloudflare-access/docs/review-change.md`
- `report`: `.legion/tasks/const-cloudflare-access/docs/report-walkthrough.md`
- `pr-body`: `.legion/tasks/const-cloudflare-access/docs/pr-body.md`

## Notes
- Production rollout and state handling were completed by `const-access-sops-apply`.
- If a matching Access app already exists in future environments, import or coordinate instead of creating a duplicate.

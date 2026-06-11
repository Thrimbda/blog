# const-access-sops-apply

## Metadata
- `task-id`: `const-access-sops-apply`
- `status`: `active`
- `risk`: `high`
- `schema-version`: `legion-wiki-current`
- `historical`: `false`
- `supersedes`: `const-cloudflare-access production rollout pending note`
- `superseded-by`: `(none)`

## Outcome Summary
- Added repo SOPS creation rules for encrypted Cloudflare/Terraform env and state files under `secrets/`.
- Added a SOPS encrypted env source for `CLOUDFLARE_API_TOKEN` and required `TF_VAR_*` inputs.
- Applied the Cloudflare Access Terraform stack for `/const` after a scoped plan gate.
- Final Access include boundary is a single email rule shape in provider v5 syntax, with the actual email kept only in SOPS encrypted env.
- Saved Terraform local state as SOPS encrypted JSON at `secrets/cloudflare-access.tfstate.enc.json` and removed plaintext state, plan, and temporary logs.
- Verified post-apply plan no-op and anonymous `/const/` HTTP 302 Access challenge.

## Reusable Decisions
- For small sensitive Terraform stacks without a remote backend, keep durable state as SOPS encrypted JSON and restore plaintext state only for the duration of plan/apply/verification.
- Run Terraform with `sops exec-env` instead of generating plaintext tfvars when the private inputs can be represented as `TF_VAR_*` environment variables.
- For Cloudflare provider v5 Access policy include rules, a single-email boundary uses `email.email`; `group` rules require a group id and should not be used for email-only allowlists.
- Apply logs, raw plan output, state content, resource IDs, redirect URLs, and private identity values should stay out of task docs and PR descriptions.

## Related Raw Sources
- `plan`: `.legion/tasks/const-access-sops-apply/plan.md`
- `log`: `.legion/tasks/const-access-sops-apply/log.md`
- `tasks`: `.legion/tasks/const-access-sops-apply/tasks.md`
- `rfc`: `.legion/tasks/const-access-sops-apply/docs/rfc.md`
- `rfc-review`: `.legion/tasks/const-access-sops-apply/docs/review-rfc.md`
- `test-report`: `.legion/tasks/const-access-sops-apply/docs/test-report.md`
- `change-review`: `.legion/tasks/const-access-sops-apply/docs/review-change.md`
- `report`: `.legion/tasks/const-access-sops-apply/docs/report-walkthrough.md`
- `pr-body`: `.legion/tasks/const-access-sops-apply/docs/pr-body.md`

## Notes
- The encrypted state remains sensitive and should stay limited to intended SOPS recipients.
- The stack still has no remote locking; only one operator should run it at a time.
- If future work changes the Access policy boundary, re-run a plan scope gate and avoid printing private identity values.

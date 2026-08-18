# clarity-analytics

## Metadata
- `task-id`: `clarity-analytics`
- `status`: `active`
- `risk`: `low`
- `schema-version`: `legion-wiki-current`
- `historical`: `false`
- `supersedes`: `(none)`
- `superseded-by`: `(none)`

## Outcome Summary
- Added Microsoft Clarity to the Zola site alongside the existing Google Analytics.
- `config.toml` `[extra]` gained `clarity = "vg7b9rsa98"`.
- `themes/cone-scroll/templates/head.html` gained a `<!-- Microsoft Clarity -->` conditional block that injects the official snippet only when `config.extra.clarity` is set.
- Project id is injected via `{{ config.extra.clarity }}`, not hardcoded.
- Verified with `zola build` (0.21.0): 257 pages, no errors, snippet present with the correct id.

## Reusable Decisions
- Third-party analytics/tracking scripts are gated by `config.extra.<name>` flags and injected through conditional blocks in `head.html`, mirroring the existing `google_analytics` pattern.
- Keep the vendor snippet verbatim; only parameterize the id through the template variable.

## Related Raw Sources
- `plan`: `.legion/tasks/clarity-analytics/plan.md`
- `log`: `.legion/tasks/clarity-analytics/log.md`
- `tasks`: `.legion/tasks/clarity-analytics/tasks.md`
- `test-report`: `.legion/tasks/clarity-analytics/docs/test-report.md`
- `pr-body`: `.legion/tasks/clarity-analytics/docs/pr-body.md`

## Notes
- The snippet builds the `clarity.ms/tag/` URL at runtime (`+i`), so the literal `clarity.ms/tag/<id>` string does not appear in generated HTML; verify by grepping for the injected id instead.

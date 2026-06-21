# const-rss-exclusion

## Metadata
- `task-id`: `const-rss-exclusion`
- `status`: `active`
- `risk`: `medium`
- `schema-version`: `legion-wiki-current`
- `historical`: `false`
- `supersedes`: `(none)`
- `superseded-by`: `(none)`

## Outcome Summary
- Added a project-level `templates/atom.xml` override for Zola-generated Atom feeds.
- Feed entry rendering now skips pages whose generated `page.path` starts with `/const/`.
- This excludes the canonical exact `/const` page path and descendants under `/const/...` from root, language, and taxonomy Atom feeds.
- No content, navigation, public URLs, feed enabling, or Cloudflare Access policy changed.
- Verification passed with `zola build`, a temporary dated `/const/...` fixture, an all-feed scan, and a root-feed population check.

## Reusable Decisions
- Access-controlled path families must be excluded at feed-template level, not by editing generated output.
- For Zola Atom feeds, filter inside the feed page loop before emitting `<entry>`.
- Use generated path checks rather than source-file names when the privacy boundary is URL based.
- Verification should include a temporary feed-eligible fixture for the protected path family, then remove it before commit.
- If new feed formats are added later, replicate the same exclusion rule in those feed templates.

## Related Raw Sources
- `plan`: `.legion/tasks/const-rss-exclusion/plan.md`
- `log`: `.legion/tasks/const-rss-exclusion/log.md`
- `tasks`: `.legion/tasks/const-rss-exclusion/tasks.md`
- `test-report`: `.legion/tasks/const-rss-exclusion/docs/test-report.md`
- `change-review`: `.legion/tasks/const-rss-exclusion/docs/review-change.md`
- `report`: `.legion/tasks/const-rss-exclusion/docs/report-walkthrough.md`
- `pr-body`: `.legion/tasks/const-rss-exclusion/docs/pr-body.md`

## Notes
- The override vendors Zola's current built-in Atom template shape, so Zola upgrades should include a feed-template diff check.
- Current site feed output is Atom (`atom.xml`) even though the navigation label says `rss`.

# Patterns

## Archive-First Daily Logs

When splitting aggregate daily logs, prefer static Zola sections and pages over client-rendered feeds. A page must remain reachable and browseable without JavaScript before any infinite-loading enhancement is added.

Required migration checks:

- dry-run manifest with before/after entry counts
- duplicate-date handling before file writes
- old URL compatibility plan
- `zola build`
- viewport checks on mobile, laptop, and wide desktop

## Infinite Loading

Infinite loading is a progressive enhancement over real pagination:

- keep a real paginator in the HTML
- append only from a known list container
- preserve keyboard/focus behavior
- announce appended content with a polite live region
- stop cleanly when there is no next page

## Daily Archive TOC

For daily archive navigation, prefer document-outline navigation over form controls:

- use the existing `.page-outline` visual language
- render dates as plain in-page anchor links, not select options
- use a small inline `+` for the standalone daily page action
- keep `+` visible on mobile and touch, because hover is unavailable
- group duplicate-date sources under the date with stable sequence labels
- give each duplicate sequence row its own standalone `+` link
- keep mobile access in normal document flow with native `<details>`
- keep desktop access as a sticky left rail with a thin divider
- verify desktop/laptop archive pages by asserting left/right placement, not only by checking that screenshots have no overlap
- keep the daily archive rail breakpoint aligned with the approved dummy behavior unless a new design explicitly changes it
- when a TOC target is not loaded yet, resolve it through the existing paginator/infinite loader instead of introducing a client-only feed path

## Terminal-Paper UI Preservation

Theme changes should keep the current blog identity:

- do not convert archive rows into cards
- do not add decorative gradients, badges, or heavy panels
- keep long reading columns constrained on wide screens
- prefer text/bracket controls over product-dashboard controls
- improve resilience through wrapping, spacing, focus, and static fallbacks

## Mobile Outline Default

For article outline rails, mobile can default to collapsed when no stored user state exists. A stored per-page reader preference should override viewport defaults.

## SOPS-Backed Terraform Apply

For small sensitive Terraform stacks that do not use a remote backend:

- keep private inputs in a SOPS encrypted env file
- run Terraform through `sops exec-env` instead of writing plaintext tfvars
- restore plaintext local state only for the duration of plan/apply/verification
- save durable state as SOPS encrypted JSON
- ignore plaintext state, backups, plan files, and tfvars
- delete apply logs and plan logs if they may contain resource IDs or private identifiers
- record only scoped summaries and pass/fail evidence in task docs
- require a plan scope gate before apply

For Cloudflare Access path protection, continue to assert exact, trailing slash, and wildcard descendant coverage for the intended path family.

## Feed Privacy For Protected Paths

Access-controlled or private path families must not leak through generated feeds:

- filter at template generation time, before emitting each feed entry
- key the rule on generated URL path, not source filename
- cover the canonical exact path and descendants
- keep normal public feed entries enabled and populated
- scan every generated feed file, not just the root feed
- use a temporary feed-eligible fixture to prove future descendants are excluded
- remove the fixture before commit

For the current Zola Atom setup, `/const` is excluded by skipping pages whose `page.path` starts with `/const/` in `templates/atom.xml`.

## Third-Party Analytics Injection

Third-party analytics or tracking scripts are wired through `config.extra.<name>` flags plus a conditional block in `themes/cone-scroll/templates/head.html`, mirroring the existing `google_analytics` pattern:

- add a `config.extra.<name>` key (e.g. `clarity = "vg7b9rsa98"`) instead of hardcoding the id
- keep the vendor snippet verbatim, parameterizing only the id via `{{ config.extra.<name> }}`
- guard the whole block with `{% if config.extra.<name> %}` so the script is absent when unconfigured

The Clarity snippet builds its `clarity.ms/tag/` URL at runtime (`+i`), so generated HTML contains the id but not the literal full URL; verify by grepping the injected id rather than the assembled URL.

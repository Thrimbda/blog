# Review RFC: Daily Log Split Design

## Decision

PASS.

## Review Lenses

### Implementability

The RFC is implementable within Zola because it uses regular sections, pages, templates, and pagination rather than requiring a client-rendered application. The proposed file layout matches existing `content/diary/_index.md` section behavior.

### Scope Control

The RFC explicitly keeps this task design-only and leaves production content splitting as follow-up implementation. That avoids mixing migration with UI design and viewport validation.

### Rollback

Rollback is clear: keep original aggregate Markdown until new atomic directories build successfully, remove new directories if needed, and disable infinite loading independently from static pagination.

### Verification

Verification is concrete: entry-count manifest, `zola build`, link checks, non-JS pagination fallback, reduced-motion behavior, and three viewport classes.

## Non-blocking Suggestions

- Prefer stable Gcores source ids over sequence suffixes if the importer exposes them.
- Decide feed inclusion before implementation, because splitting every daily entry may expand feed volume.
- Decide whether comments belong on every daily entry before enabling `daily-entry.html` Giscus.

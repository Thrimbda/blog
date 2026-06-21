## Summary

- Add a project-level `templates/atom.xml` override for generated feeds.
- Skip feed entries whose `page.path` starts with `/const/`, covering `/const` and descendants.
- Keep normal public feed output enabled and populated.

## Verification

- `nix-shell --run "zola build"`
- Temporary dated `/const/...` fixture excluded from all generated Atom feeds; fixture removed.
- Final all-feed scan found no `/const` path-family URLs.
- Root feed remains populated.
- `review-change`: PASS.

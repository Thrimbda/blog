# What

This PR improves article-page usability and presentation by adding a left-side outline rail, refining the site header ASCII logo, and fixing initial Giscus theme synchronization.

It updates:
- `templates/page.html`
- `templates/blog-page.html`
- `templates/header.html`
- `static/css/style.css`
- `static/js/script.js`

# Why

Readers need better in-page navigation for longer articles, especially on desktop layouts.

This also fixes two polish issues: the header logo should clearly read `0xc1`, and Giscus should respect the persisted theme as soon as the comments iframe appears.

# How

- Added a native `<details>/<summary>` article outline in page templates.
- Styled the article shell and sticky outline rail for desktop use with mobile-safe behavior.
- Updated the ASCII header logo markup.
- Fixed comment theme initialization so persisted theme state is applied on first iframe load.

# Testing

Reference:
- `/Users/c1/Work/blog/.legion/tasks/granda-ascii-logo/docs/test-report.md`

Validated with:
- `zola build`
- brief `zola serve` startup check

Note: `zola build` and `zola serve` should be run sequentially, not in parallel.

# Risk / Rollback

Risk is low and limited to template, CSS, and client-side behavior changes.

Rollback is straightforward by reverting the touched files.

# Review

- Code review: `/Users/c1/Work/blog/.legion/tasks/granda-ascii-logo/docs/review-code.md`
- No blocking code review finding.

# Links

- Task brief: `/Users/c1/Work/blog/.legion/tasks/granda-ascii-logo/docs/task-brief.md`
- Test report: `/Users/c1/Work/blog/.legion/tasks/granda-ascii-logo/docs/test-report.md`
- Code review: `/Users/c1/Work/blog/.legion/tasks/granda-ascii-logo/docs/review-code.md`

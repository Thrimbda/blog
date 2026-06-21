# Const RSS Exclusion - Task List

## Quick Resume
**Current phase**: Phase 5 - PR Lifecycle
**Current check**: review-change PASS; walkthrough/PR body generated; wiki writeback complete; ready to commit/push/PR
**Progress**: 11/12 tasks complete

---

## Phase 1: Contract ✅ DONE
- [x] Enter Legion workflow and `git-worktree-pr` envelope | Acceptance: work occurs in `.worktrees/const-rss-exclusion`
- [x] Create stable task contract | Acceptance: `plan.md` and `tasks.md` define goal, scope, acceptance, risks, and phases

## Phase 2: Implementation ✅ DONE
- [x] Inspect current Zola feed generation behavior | Acceptance: config generates `atom.xml`; Zola built-in template is overridden by project `templates/atom.xml`
- [x] Implement `/const` feed exclusion | Acceptance: reusable rule excludes pages whose generated path starts with `/const/`

## Phase 3: Verification ✅ DONE
- [x] Run site build | Acceptance: `zola build` succeeds
- [x] Assert feed exclusion | Acceptance: generated feed files contain no `/const` entry URLs
- [x] Assert public feed remains populated | Acceptance: at least one expected public entry remains in root feed
- [x] Write test report | Acceptance: commands and results recorded without private content leakage

## Phase 4: Delivery Review ✅ DONE
- [x] Run `review-change` | Acceptance: PASS or documented blocker
- [x] Run `report-walkthrough` | Acceptance: reviewer summary and PR body generated
- [x] Run `legion-wiki` writeback | Acceptance: reusable feed privacy rule recorded

## Phase 5: PR Lifecycle ⏳ NOT STARTED
- [ ] Commit, push, PR, follow checks/review, merge, cleanup, refresh | Acceptance: PR reaches terminal state and task worktree is cleaned up

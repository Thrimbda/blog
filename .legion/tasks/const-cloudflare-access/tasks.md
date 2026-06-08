# Const Cloudflare Access - 任务清单

## 快速恢复
**当前阶段**: Complete
**当前检查项**: 准备 Git/PR lifecycle
**进度**: 14/14 任务完成

---

## 阶段 1: RFC ✅ COMPLETED
- [x] 确认现有 Zola 首页导航和 `/const/` 页面入口实现方式 | 验收: RFC 中引用现有文件证据
- [x] 确认 Cloudflare Terraform provider/resource 选择 | 验收: RFC 中说明版本、资源和替代方案
- [x] 设计 Access application、policy、变量和敏感值边界 | 验收: RFC 覆盖 domain/path/policy/secrets
- [x] 写入 `.legion/tasks/const-cloudflare-access/docs/rfc.md` | 验收: 包含 Options、Decision、Verification、Rollback

## 阶段 2: RFC Review ✅ COMPLETED
- [x] 执行 `review-rfc` | 验收: `.legion/tasks/const-cloudflare-access/docs/review-rfc.md` 记录 PASS 或阻塞问题
- [x] 如审查失败，修订 RFC 并复审 | 验收: review-rfc 最终 PASS（本次 PASS，无需修订）

## 阶段 3: Implementation ✅ COMPLETED
- [x] 进入 `git-worktree-pr` envelope | 验收: 修改在隔离 worktree 中完成
- [x] 新增 `/const/` 站点页面和主页导航入口 | 验收: Zola 生成路径和导航符合 plan
- [x] 初始化 Cloudflare Terraform 配置 | 验收: provider、变量、resources、示例变量文件和 ignore 规则完整

## 阶段 4: Verification ✅ COMPLETED
- [x] 运行 Zola 站点验证 | 验收: `docs/test-report.md` 记录 `nix-shell --run "npx czon build ..."` PASS
- [x] 运行 Terraform 格式化/验证或记录环境阻塞 | 验收: `docs/test-report.md` 记录 Terraform fmt/init/validate PASS

## 阶段 5: Delivery Review ✅ COMPLETED
- [x] 执行 `review-change`，包含安全视角 | 验收: `docs/review-change.md` PASS，无阻塞项
- [x] 执行 `report-walkthrough` | 验收: `docs/report-walkthrough.md` 和 `docs/pr-body.md` 可用于评审

## 阶段 6: Wiki Writeback ✅ COMPLETED
- [x] 执行 `legion-wiki` 收口 | 验收: `.legion/wiki` 写回当前仍有效的跨任务知识

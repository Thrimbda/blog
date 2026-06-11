# Const Access SOPS Apply - 任务清单

## 快速恢复
**当前阶段**: Phase 7 - PR Lifecycle
**当前检查项**: review-change PASS；walkthrough/PR body generated；wiki writeback complete；等待 commit/push/PR/merge/cleanup/refresh
**进度**: 17/18 任务完成

---

## 阶段 1: RFC ✅ DONE
- [x] 设计 `.sops.yaml` 和 `secrets/cloudflare-access.enc.env` 格式 | 验收: RFC 说明选择 `.enc.env` 的原因
- [x] 明确 Cloudflare API token 最小权限和申请步骤 | 验收: RFC/说明可直接给用户执行
- [x] 明确 Terraform state 策略 | 验收: RFC 不允许 apply 后丢失 state
- [x] 写入 RFC | 验收: 包含 Options、Decision、Verification、Rollback

## 阶段 2: RFC Review ✅ DONE
- [x] 执行 `review-rfc` | 验收: review-rfc PASS 后才实现或要求用户填 secret

## 阶段 3: Scaffold Implementation ✅ DONE
- [x] 进入 `git-worktree-pr` envelope | 验收: 修改在隔离 worktree 中完成
- [x] 新增 `.sops.yaml` | 验收: 使用默认 SSH recipient
- [x] 新增 SOPS encrypted env scaffold | 验收: 文件可由 `sops -d` 解密为 env 格式
- [x] 新增或更新 apply 文档/helper | 验收: 用户知道如何填 secret 和执行 plan/apply
- [x] 执行 `verify-change` scaffold 验证 | 验收: SOPS/env/.sops.yaml/.gitignore/README/Terraform fmt-init-validate/静态 secret scan 均 PASS，未 plan/apply

## 阶段 4: User Token Gate ✅ DONE
- [x] 告知用户 token 申请方式和需要填入的 secret 字段 | 验收: 用户确认 secret 已填完；后续将 include rule 从误填的 `group.email` 转换为 `email.email`

## 阶段 5: Apply & Verification ✅ DONE
- [x] 使用 SOPS env 执行 Terraform plan | 验收: plan 只影响 `cloudflare_zero_trust_access_application.const` 和 `cloudflare_zero_trust_access_policy.const`
- [x] 用户确认后执行 Terraform apply | 验收: apply 成功，state 加密保存到 `secrets/cloudflare-access.tfstate.enc.json`
- [x] 验证 Cloudflare Access 保护生效 | 验收: post-apply plan no-op；匿名 `/const/` 请求返回 Access challenge HTTP 302

## 阶段 6: Delivery Review ✅ DONE
- [x] 执行 `review-change`，包含 secrets/infra 安全视角 | 验收: review-change PASS；无 blocking findings；`terraform.tfvars.example` follow-up 已修正
- [x] 执行 `report-walkthrough` | 验收: walkthrough 和 PR body 已生成

## 阶段 7: Wiki Writeback + PR Lifecycle ⏳ IN PROGRESS
- [x] 执行 `legion-wiki` 收口 | 验收: wiki 记录 SOPS/Terraform apply 模式
- [ ] Commit/push/PR/merge/cleanup/refresh | 验收: PR 终态完成，主工作区刷新

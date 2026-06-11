# Const Access SOPS Apply

## 目标
为 `infra/cloudflare-access/` 建立 SOPS 管理的 Cloudflare/Terraform 私有变量输入，指导用户申请最小权限 Cloudflare API token，并在用户完成 secret 填写后执行 Terraform `plan/apply` 让 `/const/` 真正受 Cloudflare Access 保护，最后通过 Legion Git/PR lifecycle 提交变更。

## 问题陈述
上一任务已经合并了 `/const/` 站点入口和 Terraform Cloudflare Access 配置，但没有执行 `terraform apply`，因此线上 Cloudflare Access 尚未生效。现在需要把真实 Cloudflare token、account/zone id、hostname 和 Access policy 身份规则放入 SOPS 加密文件，并用该加密输入驱动 Terraform apply。

这项工作触及真实凭证、生产访问控制和 Terraform 状态。必须避免把明文 secret、local tfvars、tfstate 或 plan 提交进仓库；必须在 apply 前明确 token 权限、目标 zone、允许访问规则和状态处理方式。

## 验收标准
- [ ] 新增 `.sops.yaml`，使用默认 `~/.ssh/id_ed25519.pub` 对应的 SSH recipient 加密 `secrets/*.enc.*`。
- [ ] 新增 SOPS 管理的 Cloudflare Access env 文件，推荐命名为 `secrets/cloudflare-access.enc.env`，用于提供 `CLOUDFLARE_API_TOKEN` 和 `TF_VAR_*`。
- [ ] 文档或 helper 明确说明用户需要申请的 Cloudflare API token 权限、申请路径和需要填入 SOPS secret 的变量。
- [ ] 在用户填完 secret 并确认后，使用 `sops exec-env` 或等价方式运行 Terraform `plan` 和 `apply`，不落明文 secret 到仓库。
- [ ] Terraform apply 后能够确认 Cloudflare Access resources 已创建/更新，且保护范围仍是 `/const`、`/const/`、`/const/*`。
- [ ] Terraform state 处理方式被明确记录，不因 worktree cleanup 丢失唯一状态副本。
- [ ] Legion 验证、review、walkthrough、wiki writeback 和 Git/PR lifecycle 完成。

## 假设 / 约束 / 风险
- **假设**: 用户本机默认 SSH key `~/.ssh/id_ed25519.pub` 可作为 SOPS age recipient；现有 `secrets/api_key.enc.json` 已使用同一类 SSH recipient。
- **假设**: 目标 hostname 为 `0xc1.space`，目标 path 仍为 `const`。
- **假设**: 用户会在本地通过 `sops secrets/cloudflare-access.enc.env` 填入真实 token 和 Terraform 变量，而不是把明文贴到聊天或提交到仓库。
- **约束**: 不提交明文 token、account id、zone id、真实邮箱/组/IdP/service token、team domain、tfstate、tfplan 或 `terraform.tfvars`。
- **约束**: 在用户确认 secret 已填完、目标账号/zone/policy 规则无误前，不执行 `terraform apply`。
- **约束**: Terraform apply 只能针对 `infra/cloudflare-access/`，不得配置 DNS、Pages、Workers 或其他 Cloudflare 产品。
- **风险**: API token 权限过大可能扩大凭证泄露影响；权限过小会导致 apply 失败。
- **风险**: Access policy 身份规则填写错误会导致 `/const/` 无法访问、未受保护或允许范围过宽。
- **风险**: 当前 Terraform 使用 local state；若不设计 state 保存/加密策略，apply 后状态可能随 worktree 删除而丢失。

## 要点
- **Secret format**: 使用 `.enc.env`，因为 `sops exec-env` 可以直接把解密结果注入 `CLOUDFLARE_API_TOKEN` 与 `TF_VAR_*` 环境变量。
- **SOPS config**: 新增 `.sops.yaml`，让 `secrets/*.enc.env`、必要时 `secrets/*.enc.json` 走默认 SSH recipient 加密。
- **Token scope**: Cloudflare token 最小权限以 Access apps/policies write/read 为核心，并限制到目标 account/zone。
- **Apply gate**: 先交付 secret scaffold 和申请说明；用户完成 secret 后再恢复任务执行 plan/apply。
- **State**: 设计阶段必须明确 state 是否仅保留本机、SOPS 加密保存，或改用后端；不得在未记录状态策略时清理 worktree。

## 范围
- `.sops.yaml` - SOPS creation rules。
- `secrets/cloudflare-access.enc.env` - SOPS 加密的 Cloudflare/Terraform env secret。
- `infra/cloudflare-access/` - 如有必要，增加 README/helper 说明 SOPS apply 流程；Terraform resource 本体只在需要适配 secret/env 输入时修改。
- `.legion/tasks/const-access-sops-apply/**` - 本任务 contract、RFC、验证、review、walkthrough。
- `.legion/wiki/**` - 收口写回可复用的 SOPS/Terraform apply 模式。

## 非范围 (Non-goals)
- 不在聊天、日志或未加密文件中保存真实 Cloudflare token、account id、zone id 或身份规则。
- 不创建 Cloudflare DNS、Pages、Workers、IdP、Access Group 或 Service Token，除非 RFC 明确证明它们是 apply 必需项并通过 review。
- 不扩大 Access 保护范围到整个域名或其他路径。
- 不执行 `terraform destroy`，除非 apply 失败并且用户明确要求回滚。
- 不把 Terraform state 明文提交到仓库。

## 设计索引 (Design Index)
> **Design Source of Truth**: `.legion/tasks/const-access-sops-apply/docs/rfc.md`（待生成）

**摘要**:
- 核心流程: 先设计 SOPS env、Cloudflare token 权限和 Terraform state 策略；实现 secret scaffold 和说明；用户填入 secret 后恢复任务运行 plan/apply；最后完成审查、PR 和 wiki writeback。
- 验证策略: 验证 SOPS 可解密/exec-env、Terraform fmt/init/validate/plan/apply、Cloudflare Access path 和无明文 secret 泄漏。

## 阶段概览
1. **Phase 1 - RFC**: 明确 SOPS 文件格式、token 权限、secret 变量、state 策略、apply/rollback 步骤。
2. **Phase 2 - RFC Review**: 对凭证边界、state、apply 风险和 Access policy 做安全审查。
3. **Phase 3 - Scaffold Implementation**: 在 worktree 中新增 `.sops.yaml`、encrypted env scaffold 和 apply 文档/helper。
4. **Phase 4 - User Token Gate**: 告知用户 token 申请方式，等待用户用 SOPS 填入真实 secret。
5. **Phase 5 - Apply & Verification**: 用户确认后执行 Terraform plan/apply，并验证 Access 生效或记录阻塞/回滚。
6. **Phase 6 - Delivery Review**: 安全 review、walkthrough、PR body。
7. **Phase 7 - Wiki Writeback + PR Lifecycle**: 写回可复用模式并完成 commit/push/PR/merge/cleanup/refresh。

---
*Created: 2026-06-11 | Updated: 2026-06-11*

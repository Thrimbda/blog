# Cloudflare Access Terraform 操作手册

本目录仅管理用于 `/const` 路径的 Cloudflare Zero Trust Access 应用和策略。请勿将其用于 DNS、Pages、Workers 或其他不相关的 Cloudflare 资源。

## 1. 创建最小权限的 Cloudflare API 令牌

在 Cloudflare 仪表板中，打开 **我的个人资料 → API 令牌 → 创建令牌 → 创建自定义令牌**。

推荐的令牌配置：

- 名称：`terraform-const-access` 或类似的窄范围名称。
- 账户范围：仅限目标账户。
- 区域范围：仅限站点主机名对应的目标区域。
- 权限：仅限 Access 应用/策略的读取和写入/编辑权限。Cloudflare 界面中的文字可能是 `Access: Apps and Policies Read` 和 `Access: Apps and Policies Write` 或 `Edit`。
- *请勿授予* Global API Key、完全管理员权限、DNS 写入、区域设置写入、Workers、Pages 或所有账户/所有区域的访问权限。
- 可选的加固措施：如果适合操作环境，可设置令牌过期时间和来源 IP 限制。

复制令牌一次，并仅将其粘贴到下方的 SOPS 文件中。**切勿**将令牌、账户 ID、区域 ID、身份规则、团队域、组 ID 或电子邮件粘贴到聊天、文档、Shell 历史记录或未加密的文件中。

## 2. 填写 SOPS 环境变量文件

在仓库根目录编辑加密的 dotenv 模板：

```sh
sops secrets/cloudflare-access.enc.env
```

在 SOPS 编辑器中至少填写以下变量：

- `CLOUDFLARE_API_TOKEN`
- `TF_VAR_account_id`
- `TF_VAR_zone_id`
- `TF_VAR_site_hostname` — 仅主机名，不含协议和路径。
- `TF_VAR_access_policy_include` — provider v5 的 Access 包含规则语法，例如 `[{"email":{"email":"REPLACE_WITH_EMAIL"}}]`，并将 `REPLACE_WITH_EMAIL` 替换为你的私有电子邮件。

保持 `TF_VAR_const_path=const`，除非有经过审核的单独变更特意移动了受保护路径。

检查文件在解密时不打印任何值：

```sh
sops -d secrets/cloudflare-access.enc.env >/dev/null
```

## 3. 通过 `sops exec-env` 运行 Terraform

从仓库根目录执行，并通过子进程注入秘密信息来运行 Terraform：

如果 `terraform` 尚未在 `PATH` 中，请先进入 `nix-shell`；`shell.nix` 已为该工作流提供了 Terraform。

```sh
terraform -chdir=infra/cloudflare-access fmt -check
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access init'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access validate'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access plan'
```

在执行 apply 之前请检查计划。该计划必须仅涉及：

- `cloudflare_zero_trust_access_policy.const`
- `cloudflare_zero_trust_access_application.const`

目标覆盖范围必须保持为目标主机名，并精确匹配以下路径：

- `/const`
- `/const/`
- `/const/*`

如果计划中包含 DNS、Pages、Workers、全域保护、不相关资源或非预期的身份规则，请勿继续。

只有在计划可接受，并且操作员/用户明确批准 apply 许可后，才能执行：

```sh
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access apply'
```

除非明确要求将其作为独立的破坏性回滚操作，否则不要运行 `terraform destroy`。

## 4. 加密的本地状态处理

本堆栈有意使用本地 Terraform 状态，但持久化的追踪副本是经过 SOPS 加密的：

```text
secrets/cloudflare-access.tfstate.enc.json
```

在执行 plan/apply 之前，如果已存在加密的状态文件，请恢复状态：

```sh
if [ -f secrets/cloudflare-access.tfstate.enc.json ]; then
  sops -d --input-type json --output-type json \
    --output infra/cloudflare-access/terraform.tfstate \
    secrets/cloudflare-access.tfstate.enc.json
  chmod 600 infra/cloudflare-access/terraform.tfstate
fi
```

成功执行 apply 后，通过临时文件加密生成的状态文件，验证，然后将其移动到指定位置：

```sh
tmp_state="$(mktemp /tmp/cloudflare-access.tfstate.enc.json.XXXXXX)"
sops --encrypt --input-type json --output-type json \
  --filename-override secrets/cloudflare-access.tfstate.enc.json \
  --output "$tmp_state" \
  infra/cloudflare-access/terraform.tfstate
sops -d --input-type json --output-type json "$tmp_state" >/dev/null
mv "$tmp_state" secrets/cloudflare-access.tfstate.enc.json
rm -f infra/cloudflare-access/terraform.tfstate \
      infra/cloudflare-access/terraform.tfstate.backup
```

切勿提交明文 `terraform.tfstate`、状态备份、计划文件、`terraform.tfvars`、`*.auto.tfvars` 或未加密的环境变量文件。`.gitignore` 中仅允许包含上述加密状态文件。

## 5. Apply 控制条件

只有在以下所有条件都满足后，才允许执行 apply：

1. SOPS 环境变量文件已在本地填写完整，并且解密成功且不打印任何值。
2. 通过 `sops exec-env` 能获取到所需的环境变量。
3. `terraform fmt`、`init`、`validate` 和 `plan` 均成功执行。
4. 计划仅涉及预期的 Access 应用/策略和 `/const` 路径覆盖范围。
5. 操作员/用户明确接受已审核的计划。

如果任何控制条件未满足，请停止操作，在重试之前修复具体问题。未经审查，不要将 Cloudflare 令牌权限扩大到超出缺失的 Access 应用/策略范围。
# Cloudflare Access Terraform runbook

This directory manages only the Cloudflare Zero Trust Access application and policy for the `/const` path. Do not use it for DNS, Pages, Workers, or unrelated Cloudflare resources.

## 1. Create a least-privilege Cloudflare API token

In Cloudflare Dashboard, open **My Profile → API Tokens → Create Token → Create Custom Token**.

Recommended token shape:

- Name: `terraform-const-access` or similarly narrow.
- Account scope: only the target account.
- Zone scope: only the target zone for the site hostname.
- Permissions: only Access Apps/Policies read plus write/edit permissions. Cloudflare UI wording may be `Access: Apps and Policies Read` and `Access: Apps and Policies Write` or `Edit`.
- Do not grant Global API Key, full admin, DNS Write, Zone Settings Write, Workers, Pages, or all-account/all-zone access.
- Optional hardening: token expiration and source IP restrictions if they fit the operating environment.

Copy the token once and paste it only into the SOPS file below. Do **not** paste tokens, account IDs, zone IDs, identity rules, team domains, group IDs, or emails into chat, docs, shell history, or unencrypted files.

## 2. Fill the SOPS env file

Edit the encrypted dotenv scaffold from the repository root:

```sh
sops secrets/cloudflare-access.enc.env
```

Fill at least these variables inside the SOPS editor:

- `CLOUDFLARE_API_TOKEN`
- `TF_VAR_account_id`
- `TF_VAR_zone_id`
- `TF_VAR_site_hostname` — hostname only, no scheme and no path.
- `TF_VAR_access_policy_include` — provider v5 Access include rule syntax, for example `[{"email":{"email":"REPLACE_WITH_EMAIL"}}]` with your private email value.

Keep `TF_VAR_const_path=const` unless a separate reviewed change intentionally moves the protected path.

Check that the file decrypts without printing values:

```sh
sops -d secrets/cloudflare-access.enc.env >/dev/null
```

## 3. Run Terraform through `sops exec-env`

From the repository root, run Terraform with secrets injected only into the child process:

If `terraform` is not already on `PATH`, enter `nix-shell` first; `shell.nix` includes Terraform for this workflow.

```sh
terraform -chdir=infra/cloudflare-access fmt -check
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access init'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access validate'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access plan'
```

Review the plan before apply. It must touch only:

- `cloudflare_zero_trust_access_policy.const`
- `cloudflare_zero_trust_access_application.const`

The destination coverage must remain the target hostname plus exactly:

- `/const`
- `/const/`
- `/const/*`

Do not continue if the plan includes DNS, Pages, Workers, whole-domain protection, unrelated resources, or unexpected identity rules.

Only after the plan is acceptable and the operator/user explicitly approves the apply gate:

```sh
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access apply'
```

Do not run `terraform destroy` unless explicitly requested as a separate destructive rollback.

## 4. Encrypted local state handling

This stack intentionally uses local Terraform state, but the durable tracked copy is SOPS-encrypted:

```text
secrets/cloudflare-access.tfstate.enc.json
```

Before plan/apply, restore state if an encrypted state already exists:

```sh
if [ -f secrets/cloudflare-access.tfstate.enc.json ]; then
  sops -d --input-type json --output-type json \
    --output infra/cloudflare-access/terraform.tfstate \
    secrets/cloudflare-access.tfstate.enc.json
  chmod 600 infra/cloudflare-access/terraform.tfstate
fi
```

After a successful apply, encrypt the resulting state through a temporary file, verify it, then move it into place:

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

Never commit plaintext `terraform.tfstate`, state backups, plan files, `terraform.tfvars`, `*.auto.tfvars`, or unencrypted env files. The `.gitignore` allow-list is only for the encrypted state file above.

## 5. Apply gate

Applying is allowed only after all of the following are true:

1. The SOPS env file is filled locally and decrypts successfully without printing values.
2. Required env variables are present via `sops exec-env`.
3. `terraform fmt`, `init`, `validate`, and `plan` succeed.
4. The plan is limited to the intended Access application/policy and `/const` path coverage.
5. The operator/user explicitly accepts the reviewed plan.

If any gate fails, stop and fix the narrow issue before retrying. Do not broaden Cloudflare token permissions beyond the missing Access Apps/Policies scope without review.

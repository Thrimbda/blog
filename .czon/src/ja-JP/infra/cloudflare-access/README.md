# Cloudflare Access Terraform 運用マニュアル

このディレクトリは、`/const` パスに対する Cloudflare Zero Trust Access のアプリケーションとポリシーのみを管理します。DNS、Pages、Workers、またはその他無関係な Cloudflare リソースには使用しないでください。

## 1. 最小権限の Cloudflare API トークンを作成する

Cloudflare ダッシュボードで、**My Profile → API Tokens → Create Token → Create Custom Token** を開きます。

推奨されるトークンの構成：

- 名前：`terraform-const-access` または同様に限定的なもの。
- アカウントスコープ：対象アカウントのみ。
- ゾーンスコープ：サイトのホスト名に対する対象ゾーンのみ。
- 権限：Access アプリ/ポリシーの読み取りおよび書き込み/編集権限のみ。Cloudflare UI 上の表記は `Access: Apps and Policies Read` および `Access: Apps and Policies Write` または `Edit` となる場合があります。
- Global API Key、完全な管理者権限、DNS 書き込み、Zone Settings 書き込み、Workers、Pages、あるいは全アカウント/全ゾーンへのアクセスを付与しないでください。
- オプションの強化策：運用環境に適する場合、トークンの有効期限や送信元 IP 制限を設定します。

トークンは一度だけコピーし、以下の SOPS ファイルにのみ貼り付けてください。トークン、アカウント ID、ゾーン ID、識別ルール、チームドメイン、グループ ID、メールアドレスなどをチャット、ドキュメント、シェル履歴、または暗号化されていないファイルに貼り付けないでください。

## 2. SOPS env ファイルを埋める

リポジトリルートから暗号化された dotenv の雛形を編集します。

```sh
sops secrets/cloudflare-access.enc.env
```

SOPS エディタ内で、少なくとも以下の変数を埋めてください。

- `CLOUDFLARE_API_TOKEN`
- `TF_VAR_account_id`
- `TF_VAR_zone_id`
- `TF_VAR_site_hostname` — ホスト名のみ（スキームやパスを含めない）。
- `TF_VAR_access_policy_include` — プロバイダ v5 Access の include ルール構文（例：実際のメールアドレス値を使用した `[{"email":{"email":"REPLACE_WITH_EMAIL"}}]`）。

別途レビューされた変更によって保護パスを意図的に移動する場合を除き、`TF_VAR_const_path=const` を維持してください。

値を出力せずにファイルが復号できることを確認します。

```sh
sops -d secrets/cloudflare-access.enc.env >/dev/null
```

## 3. `sops exec-env` 経由で Terraform を実行する

リポジトリルートから、シークレットを子プロセスのみに注入して Terraform を実行します。

`terraform` が `PATH` にない場合は、最初に `nix-shell` に入ってください。このワークフロー用の Terraform が `shell.nix` に含まれています。

```sh
terraform -chdir=infra/cloudflare-access fmt -check
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access init'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access validate'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access plan'
```

適用前に計画をレビューしてください。計画で変更される対象は以下のものだけである必要があります。

- `cloudflare_zero_trust_access_policy.const`
- `cloudflare_zero_trust_access_application.const`

適用範囲は対象ホスト名に加え、正確に以下である必要があります。

- `/const`
- `/const/`
- `/const/*`

計画に DNS、Pages、Workers、ドメイン全体の保護、無関係なリソース、または予期しない識別ルールが含まれる場合は、続行しないでください。

計画が許容可能であり、オペレーター/ユーザーが明示的に適用のゲートを承認した後にのみ実行します。

```sh
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access apply'
```

明示的に個別の破壊的ロールバックとして要求されない限り、`terraform destroy` を実行しないでください。

## 4. 暗号化されたローカル状態の取り扱い

このスタックは意図的にローカルの Terraform 状態を使用しますが、耐久性のある追跡用コピーは SOPS で暗号化されています。

```text
secrets/cloudflare-access.tfstate.enc.json
```

plan/apply の前に、暗号化された状態が既に存在する場合は状態を復元してください。

```sh
if [ -f secrets/cloudflare-access.tfstate.enc.json ]; then
  sops -d --input-type json --output-type json \
    --output infra/cloudflare-access/terraform.tfstate \
    secrets/cloudflare-access.tfstate.enc.json
  chmod 600 infra/cloudflare-access/terraform.tfstate
fi
```

apply が成功した後、一時ファイルを介して結果の状態を暗号化し、検証してから所定の場所に移動します。

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

平文の `terraform.tfstate`、状態のバックアップ、計画ファイル、`terraform.tfvars`、`*.auto.tfvars`、または暗号化されていない env ファイルを決してコミットしないでください。`.gitignore` の許可リストは、上記の暗号化された状態ファイルのみを対象としています。

## 5. 適用ゲート

以下のすべてが満たされた場合にのみ、適用が許可されます。

1. SOPS env ファイルがローカルで埋められ、値が出力されることなく正常に復号されること。
2. 必要な env 変数が `sops exec-env` を介して存在すること。
3. `terraform fmt`、`init`、`validate`、`plan` が成功すること。
4. 計画が意図した Access アプリケーション/ポリシーと `/const` パスの範囲に限定されていること。
5. オペレーター/ユーザーがレビュー済みの計画を明示的に承認すること。

いずれかのゲートが失敗した場合は、停止し、再試行する前にその限定的な問題を修正してください。レビューなしに、不足している Access Apps/Policies スコープを超えて Cloudflare トークンの権限を拡大しないでください。
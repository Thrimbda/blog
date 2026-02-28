---
date: 2020-11-05
title: K8s シングルノードクラスタ上での Prometheus 手動構築
taxonomies:
  tags:
    - オブザーバビリティ
    - Prometheus
    - 技術
---
> この記事の対象読者は、監視システムに触れ始めたばかりの方や、Prometheus についてあまり詳しくない方（本記事を執筆した時点の筆者も含む）です。
>
>
>
> 本記事で Prometheus を構築するために使用した環境：
>
> - K8s バージョン: 1.19.3
> - Prometheus バージョン: 2.22.0
> - オペレーティングシステム: Archlinux at 2020.11
> - hosts ファイルを設定済み、Devbox のドメイン名は devbox
>
> ⚠️ ご注意ください：本記事で記載されているコマンドライン引数は、現在の環境に合わせて若干調整する必要があります（例：Prometheus バイナリパッケージのバージョンなど）。
>
>
>
> 以下に、推奨する事前読了項目をいくつか挙げます：
>
> 1. [オブザーバビリティ：概念とベストプラクティス](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md) オブザーバビリティに関する基本的な概念を紹介しています。
> 2. [Prometheus の初歩的な理解](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md) Prometheus プロジェクトを紹介しています。
> 3. [Prometheus 公式サイトの紹介](https://prometheus.io/docs/introduction/overview/)

## 目標

K8s 上で手動で Prometheus を構築するにあたり、ここでは2つの規約を設けます。

1. 意図的に Helm-Chart や Prometheus Operator などの迅速なデプロイ方法を使用しません。参考までに以下を挙げます：
   1. Prometheus コミュニティがメンテナンスする [Helm chart](https://github.com/prometheus-community/helm-charts)
   2. [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
   3. [Kube-Prometheus](https://github.com/prometheus-operator/kube-prometheus)
2. K8s 上で Prometheus を構築する、つまり K8s が Prometheus サービスの管理を担当します。上記の Prometheus Operator とは異なり、ここでは関連する各種 YAML 設定ファイルを自分で記述します。
3. 以下の監視対象を列挙します：
   1. Prometheus 自身
   2. Node exporter
   3. Kubelet
   4. Cadvisor
   5. ApiServer

それでは始めましょう！

<!--more-->

## ベアメタルでの Prometheus 概念実証

まず最初の直感は、ベアメタル上で概念実証を行い、まずは起動させてから、さらに詳細な設定を実験することです。最終的に、Prometheus の各設定項目を理解した後、K8s 上に再デプロイすることは容易なはずです。

> 手抜きを試みようとしましたが、チュートリアルブログを検索したところ、どれも不明瞭で、ほとんどがすでに古くなっていることがわかり、結局半日を無駄にして公式ドキュメントを読む羽目になりました。

### Prometheus のインストール

[ドキュメント](https://prometheus.io/docs/prometheus/2.22/getting_started/)の説明に従い、[ここ](https://prometheus.io/download/)から対応するプリコンパイル済みバイナリパッケージをダウンロードします：

```bash
curl -LO "https://github.com/prometheus/prometheus/releases/download/v2.22.0/prometheus-2.22.0.linux-amd64.tar.gz"
tar -zxvf prometheus-2.22.0.linux-amd64.tar.gz
cd prometheus-2.22.0.linux-amd64
./prometheus --version
# 期待される出力は以下のようになります：
# prometheus, version 2.22.0 (branch: HEAD, revision: 0a7fdd3b76960808c3a91d92267c3d815c1bc354)
#  build user:    root@6321101b2c50
#  build date:    20201015-12:29:59
#  go version:    go1.15.3
#  platform:     linux/amd64
```

ディレクトリを確認すると、設定ファイル prometheus.yml が付属していることがわかります：

```yaml
# my global config
global:
 scrape_interval:   15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
 evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
 # scrape_timeout is set to the global default (10s).
# Alertmanager configuration
alerting:
 alertmanagers:
 - static_configs:
  - targets:
   # - alertmanager:9093
# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
 # - "first_rules.yml"
 # - "second_rules.yml"
# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
 # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
 - job_name: 'prometheus'
  # metrics_path defaults to '/metrics'
  # scheme defaults to 'http'.
  static_configs:
  - targets: ['localhost:9090']
```

ここで、先ほどダウンロードした Prometheus を実行して、自分自身を監視し、小さな達成感のフィードバックループを得ます：

```bash
./prometheus --config.file=prometheus.yml
```

この時点で Prometheus が起動したことがわかります。http://devbox:9090 にアクセスするとそのユーザーインターフェースが表示され、ここでランダムにクリックすることで、Prometheus が提供する機能について大まかな感覚を得ることができ、Prometheus が正常に動作しているときの挙動について認識を持つことができます。

### Node exporter の実行

次に、ベアメタル上で Node Exporter を実行し、本機の各種メトリクスを観察します。

```bash
curl -LO "https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz"
tar -zxvf node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter
```

次に、設定を変更して Prometheus がそこからメトリクスを収集するようにします。

```yaml
# my global config
global:
 scrape_interval:   15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
 evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
 # scrape_timeout is set to the global default (10s).
# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
 # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
 - job_name: 'prometheus'
  # metrics_path defaults to '/metrics'
  # scheme defaults to 'http'.
  static_configs:
  - targets: ['localhost:9090']
 - job_name: 'node-exporter'
  static_configs:
  - targets: ['localhost:9100']
```

Prometheus の Web UI を開くと、`node-exporter` という名前の新しいターゲットが追加されていることが確認できます。ワークロードを確認してみましょう（すべてのコアを占有する、永遠にフィボナッチ数列を計算する[プログラム](https://github.com/Thrimbda/fiber)を実行しています）：

![img](https://0xc1.space/images/2020/11/05/node-load.png)

これで、概念実証フェーズは無事完了しました。

> 注意：概念実証の段階として、ここではベアメタルにデプロイされた Prometheus を使用して K8s クラスタを直接監視することは推奨しません。その理由は、クラスタ外部から K8s コンポーネントにアクセスするには、証明書の設定と適切なアクセス権限を持つ [ClusterRole](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/) が必要だからです（ここでは、筆者がベアメタルにデプロイした Prometheus を使用して K8s クラスタおよびその中の各種コンポーネントを監視しようと試みた際に踏んだ様々な落とし穴は省略します）。

## Prometheus による K8s クラスタの監視

次に、Prometheus を使用して K8s クラスタを監視します。

### Prometheus の設定項目

Prometheus の紹介で理解できるように、Prometheus は主に Pull ベースのデータ取得方式であるため、サービスディスカバリが必要です。つまり、Prometheus にどこからデータを取得するかを知らせ、ユーザーが確認できるようにする必要があります。

では、まず最初に解決すべき問題は、**K8s クラスタのサービスディスカバリ**です。その秘密は必ず設定の中に隠されています。

[ドキュメント](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/)には、Prometheus の設定に関する詳細な説明があります。

その中の以下の設定項目について簡単に説明します（必ずしも互いに直交しているわけではありません）：

- [`<global>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration-file)：この中の設定は他のすべての設定項目に影響し、他の設定項目のデフォルト値として機能します。
- [`<scrape_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#scrape_config)：監視タスクを定義し、Prometheus がどこからどのようにこのターゲットを監視すべきかなどの情報を記述します。
- [`<tls_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#tls_config)：TLS 設定を記述します。
- [`<*_sd_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#kubernetes_sd_config)：Prometheus はこの一連の設定項目を通じて、一連の事前定義された監視ターゲットのサービスディスカバリ設定を提供します（sd は service discovery を表します）。
- [`<static_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#static_config)：Prometheus に事前定義されていない監視ターゲット（例えば、ベアメタルに手動でデプロイされた任意のサービス）に対しては、この設定項目を使用してサービスディスカバリを行うことができます。上記で概念実証を行った際に、この設定項目を使用しました。
- [`<relabel_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#relabel_config)：監視ターゲットの各種メトリクスの取得を開始する前に、この設定項目を使用していくつかのラベルを変更することができます。Prometheus はいくつかの事前定義されたラベルルールを提供しており、relabel は複数段階で行うことができます。relabel が終了した後、`__` で始まるラベルは削除されます。

Prometheus の中核となる設定項目は `<scrape_config>` のようです。それぞれが監視タスクを定義し、namespace のような概念で、主に監視ターゲットの集約を提供します。その中で、`<*_sd_config>` または `<static_config>` を定義することで、Prometheus に具体的にどのエンドポイントからデータを取得するか、およびこれらのエンドポイントをどのようにフィルタリングするかを伝えます。

次に、実践を通じてこれらの設定項目への理解を深めましょう！

### Prometheus のデプロイ

デプロイの核心となる作業は、クラスタ内に Prometheus をデプロイするためにどのようなリソースが必要かを明確に考えることです。筆者はここで直接答えを公開します：

1. 専用の Namespace
2. node-exporter を管理するための DaemonSet
3. Node-exporter Service
4. Prometheus の設定を管理する ConfigMap
5. Prometheus 専用の ServiceAccount
6. 十分な権限を持つ ClusterRole
7. ServiceAccount と ClusterRole を結びつける ClusterRoleBinding
8. Prometheus Deployment
9. Prometheus Service

RBAC が適用された K8s クラスタでは、Prometheus にクラスタの状態や各種メトリクスを読み取るための十分な権限を持つロールを定義する必要があるため、5〜7番目の項目が必要です。

ここで、筆者が自身の構築過程で蓄積した[リソース宣言の集合](https://github.com/Thrimbda/prometheus-set-up)を提供します。上記のリソースに加えて kube-state-metrics も含まれており、順番に操作することでデプロイされた Prometheus を得ることができます。

#### Node-exporter

Node-exporter については、マシン自体の監視であるため、各 Node に1つずつ必要です。同時に K8s のライフサイクル管理の恩恵を受けたいため、DaemonSet が最適な選択です。

コンテナ内で実行されるため、設定を行わないと実際の Node メトリクスを収集できません。そのため、Node-exporter がメトリクスを収集できるように、ホスト上の特殊な場所をコンテナ内にマウントする必要があります。

```yaml
args:
- '--path.procfs=/host/proc'
- '--path.sysfs=/host/sys'
- '--path.rootfs=/host/root'
volumes:
- hostPath:
  path: /proc
 name: proc
- hostPath:
  path: /sys
 name: sys
- hostPath:
  path: /
 name: roo
```

そして、Service を通じて Prometheus が長期間アクセスできるエンドポイントを公開します。

#### Prometheus

Prometheus は Deployment を使用してデプロイします。Prometheus をデプロイする前に、必要なエンドポイントにアクセスしてメトリクスを収集できるように十分な権限を設定する必要があります。RBAC が設定された K8s クラスタでは、ClusterRole/ServiceAccount/ClusterRoleBinding を通じてこの目標を達成します。設定が完了すると、Prometheus は ServiceAccount を使用して適切な認証を行い、必要なエンドポイントにアクセスします。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
 name: prometheus
 labels:
  app.kubernetes.io/name: prometheus
rules:
 - apiGroups: [""]
  resources:
  - nodes
  - nodes/metrics
  - services
  - endpoints
  - pods
  verbs: ["get", "list", "watch"]
 - nonResourceURLs:
  - "/metrics"
  - "/metrics/cadviror"
  verbs: ["get"]
---
apiVersion: v1
kind: ServiceAccount
metadata:
 name: default
 namespace: monitoring-system
 labels:
  app.kubernetes.io/name: prometheus
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
 name: promtheus
 labels:
  app.kubernetes.io/name: prometheus
roleRef:
 apiGroup: rbac.authorization.k8s.io
 kind: ClusterRole
 name: prometheus
subjects:
- kind: ServiceAccount
 name: default
 namespace: monitoring-system
```

ここまでで、監視目標を実現するためのすべての前提条件が整いました。では、どのようにしてこの強力なエンジンである Prometheus を駆動し、整備された環境を十分に活用して監視を実現するのでしょうか？

前文での Prometheus 設定の紹介と組み合わせて、4つの監視目標を4つの `<scrape_config>` で定義します：

node-exporter の場合：

```yaml
- job_name: 'node-exporter'
 kubernetes_sd_configs:
 - role: endpoints
 relabel_configs:
 - source_labels: [__meta_kubernetes_service_name]
  regex: node-exporter
  action: keep
 - source_labels: [__meta_kubernetes_endpoint_node_name]
  target_label: node
 - source_labels: [__meta_kubernetes_pod_host_ip]
  target_label: host_ip
```

クラスタ内部であるため、追加の認証は不要で、https アクセスを有効にする必要もありません。

ここでは、node-exporter の例を通じて `<relabel_configs>` についてさらに説明します：

ラベルとは、あるエンドポイントに関する属性であり、異なるエンドポイントは同じラベルの下で異なる値を持つ可能性があります。`<relabel_config>` が行うことは、これらのラベルに対して変更やフィルタリングの操作を行い、必要なエンドポイントをフィルタリング/変更できるようにすることです。

![img](https://0xc1.space/images/2020/11/05/node-exporter-target.png)

上記の config には、3つの relabel アクションがあることがわかります。最初のアクションの意味は、K8s サービスディスカバリによって**事前定義**されたラベル `__meta_kubernetes_service_name` のすべての値から、指定された正規表現 "node-exporter" に従ってフィルタリングし、`action` に基づいて、一致したターゲットエンドポイントを保持し、同じラベルの残りの値を破棄することです。後の2つの relabel アクションは、node と host_ip という意味的なラベルを、名前を変更する方法で保持するためです。（覚えていますか？二重アンダースコアで始まるラベルは最終的にすべて削除されます）

Prometheus 自身の場合：

```yaml
- job_name: 'prometheus'
 kubernetes_sd_configs:
 - role: endpoints
 relabel_configs:
 - source_labels: [__meta_kubernetes_service_name]
  regex: prometheus
  action: kee
```

同じパターンを使用してエンドポイントをフィルタリングします。

kubelet と cadvisor の場合、状況が少し複雑になります：

```yaml
- job_name: 'kubelet'
 kubernetes_sd_configs:
 - role: node
 tls_config:
  # ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
  # cert_file: /etc/secret/cert
  # key_file: /etc/secret/key
  insecure_skip_verify: true
 bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
 scheme: https
- job_name: 'cadvisor'
 kubernetes_sd_configs:
 - role: node
 metrics_path: /metrics/cadvisor
 tls_config:
  # ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
  # cert_file: /etc/secret/cert
  # key_file: /etc/secret/key
  insecure_skip_verify: true
 bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
 scheme: https
```

role が node に変わったことに注意してください。したがって、Prometheus はデフォルトで `<node_ip>:10250/metrics` からメトリクスを収集します。ここには `bearer_token_file` 設定項目が追加されています。kubelet はデフォルトで匿名アクセスを許可していないため、ここで前に設定した ServiceAccount が使用されます。ここでは便宜上、`insecure_skip_verify: true` の方法を使用して TLS 認証をスキップします。

ApiServer の場合、また少し複雑になります：

```yaml
scrape_configs:
- job_name: 'kubernetes-apiservers'
 kubernetes_sd_configs:
 - role: endpoints
 scheme: https
 tls_config:
  ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
 bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
 relabel_configs:
 - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
  action: keep
  regex: default;kubernetes;https
```

ここでは、`<relabel_config>` を通じて ApiServer 自身のエンドポイントのフィルタリングを完了し、トークン認証を提供すると同時に、CA ファイルを追加して身元を認証します。これで、ApiServer にアクセスできるようになります。

これで、Prometheus のデプロイとターゲットエンドポイントの監視設定が完了しました。

興味のある読者は、さらに config を変更して、異なる設定下での Prometheus の挙動を観察し、理解を深めることができます。ここで小さな課題を残します：ベアメタルにデプロイされた Prometheus を使用して K8s クラスタを監視するにはどうすればよいでしょうか？

## 参考資料

1. [Prometheus Configuration](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration)
2. [Kube-prometheus manifests](https://github.com/prometheus-operator/kube-prometheus/tree/8b0eebdd08d8926649d27d2bc23acf31144c2f6b/manifests)
3. [TSDB v3 design](https://fabxc.org/tsdb/)
4. [オブザーバビリティ：概念とベストプラクティス](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
5. [Prometheus の初歩的な理解](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
6. [K8s における RBAC](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)
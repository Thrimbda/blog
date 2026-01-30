---
"title": "K8sシングルノードクラスタで手動でPrometheusを構築する"
"summary": "本稿は技術チュートリアルであり、Helm ChartやPrometheus Operatorなどの簡易ツールに依存せず、Kubernetesシングルノードクラスタ上でPrometheus監視システムを手動でデプロイする方法を読者に指導することを目的としています。記事はまず、ベアメタルでの概念実証を通じてPrometheusの基本的な動作と設定を紹介し、その後、K8s環境でのデプロイに必要なNamespace、DaemonSet、ConfigMap、ServiceAccount、ClusterRoleなどの各種リソースについて詳細に説明します。中核部分では、Prometheus自身、Node Exporter、Kubelet、cAdvisor、API Serverなど複数のターゲットを監視するために、Prometheusのサービスディスカバリ（特にkubernetes_sd_config）とリラベル設定（relabel_config）をどのように構成するかを解説しています。記事はまた、RBAC権限設定の重要性を強調し、具体的なYAML設定例を提供します。最後に、著者は実戦で蓄積したリソース宣言の集合を共有し、読者がデプロイを完了するのを支援します。"
"tags":
  - "可観測性"
  - "Prometheus"
  - "Kubernetes"
  - "監視"
  - "技術チュートリアル"
  - "サービスディスカバリ"
  - "RBAC"
"date": "2020-11-05"
---

> 本稿の対象読者は、監視システムに触れ始めたばかりで、Prometheusについてほとんど知識がない方々（本稿を執筆した時点の筆者もその一人でした）です。
>
>
>
> 本稿でPrometheusを構築するために使用した環境：
>
> - K8s バージョン: 1.19.3
> - Prometheus バージョン: 2.22.0
> - オペレーティングシステム: Archlinux at 2020.11
> - hostsを設定し、Devboxのドメイン名をdevboxとしています
>
> ⚠️ ご注意ください：本稿で列挙されているコマンドライン引数は、現在の環境（例えばPrometheusのバイナリパッケージのバージョンなど）に応じて若干調整する必要があります。
>
>
>
> 以下に、推奨される前提読書項目をいくつか挙げます：
>
> 1. [可観測性：概念とベストプラクティス](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md) 可観測性に関する様々な基本概念を紹介しています。
> 2. [Prometheusの初歩的な理解](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md) Prometheusプロジェクトを紹介しています。
> 3. [Prometheus公式サイトの紹介](https://prometheus.io/docs/introduction/overview/)

## 目標

K8s上で手動でPrometheusを構築するにあたり、ここでは2点の規約を設けます。

1. 意図的にHelm-ChartやPrometheus Operatorなどの簡易デプロイ方法を使用しないこと。参考までに以下を列挙します：
   1. Prometheusコミュニティがメンテナンスする [Helm chart](https://github.com/prometheus-community/helm-charts)
   2. [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
   3. [Kube-Prometheus](https://github.com/prometheus-operator/kube-prometheus)
2. K8s上でPrometheusを構築すること。つまり、K8sがPrometheusサービスを管理する責任を持ち、上記で言及したPrometheus Operatorとは異なり、ここでは関連する様々なYAML設定ファイルを自分で記述します。
3. 以下の監視ターゲットを列挙します：
   1. Prometheus自身
   2. Node exporter
   3. Kubelet
   4. Cadvisor
   5. ApiServer

それでは始めましょう！

<!--more-->

## ベアメタルでのPrometheus概念実証

まず最初の直感は、ベアメタル上で概念実証を行い、まずは動かしてみて、その後の設定を実験し、最終的にPrometheusの各設定項目を理解した後で、K8s上に再デプロイするのは容易であるはずだということです。

> 私は怠けようと試みましたが、チュートリアルブログを検索したところ、どれも不明瞭で、ほとんどがすでに古くなっていることがわかり、結局半日を無駄にして公式サイトのドキュメントを読むことになりました。

### Prometheusのインストール

[ドキュメント](https://prometheus.io/docs/prometheus/2.22/getting_started/)の説明に従い、直接[ここ](https://prometheus.io/download/)から対応するプリコンパイル済みバイナリパッケージをダウンロードします：

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

ディレクトリを確認すると、設定ファイルprometheus.ymlが付属していることがわかります：

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

次に、先ほどダウンロードしたPrometheusを実行して、自分自身を監視し、小さな達成感のフィードバックループを得ます：

```bash
./prometheus --config.file=prometheus.yml
```

この時点でPrometheusが起動したことがわかります。http://devbox:9090 にアクセスするとそのユーザーインターフェースが表示され、ここでランダムにクリックすることで、Prometheusが提供する機能について大まかな感覚を得ることができ、Prometheusが正常に動作しているときの挙動について認識を持つことができます。

### Node exporterの実行

次に、ベアメタルでNode Exporterを実行し、マシン自体の様々なメトリクスを観察します。

```bash
curl -LO "https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz"
tar -zxvf node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter
```

次に、Prometheusがそこからメトリクスを収集できるように設定を変更します。

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

PrometheusのWeb UIを開くと、`node-exporter`という名前の新しいターゲットが追加されていることが確認できます。ワークロードを確認してみましょう（すべてのコアを占有する、永遠にフィボナッチ数列を計算する[プログラム](https://github.com/Thrimbda/fiber)を1つ実行しています）：

![img](https://0xc1.space/images/2020/11/05/node-load.png)

これで、概念実証フェーズは無事完了しました。

> 注意：概念実証の段階として、ここではベアメタルにデプロイしたPrometheusでK8sクラスタを監視することは推奨しません。その理由は、クラスタ外からK8sコンポーネントにアクセスするには、証明書の設定と適切なアクセス権限を持つ[ClusterRole](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)が必要だからです（ここでは、筆者がどうしてもベアメタルにデプロイしたPrometheusでK8sクラスタおよびその中の様々なコンポーネントを監視しようとして踏んだ様々な落とし穴については省略します）。

## PrometheusでK8sクラスタを監視する

次に、Prometheusを通じてK8sクラスタを監視します。

### Prometheusの設定項目

Prometheusの紹介から、Prometheusは主にPullベースのデータ取得方式であることがわかります。したがって、サービスディスカバリが必要です。つまり、Prometheusにどこからデータを取得するかを知らせ、ユーザーが確認できるようにする必要があります。

では、まず最初に解決すべき問題は、**K8sクラスタのサービスディスカバリ**です。その秘密は設定の中に隠されているに違いありません。

[ドキュメント](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/)には、Prometheusの設定に関する詳細な説明があります。

その中の以下の設定項目について簡単に説明します（必ずしも互いに直交しているわけではありません）：

- [`<global>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration-file)：この中の設定は他のどの設定項目にも作用し、他の設定中の項目のデフォルト値として機能します。
- [`<scrape_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#scrape_config)：監視ジョブを定義し、Prometheusがどこから、どのようにこのターゲットを監視すべきかなどの情報を記述します。
- [`<tls_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#tls_config)：TLS設定を記述します。
- [`<*_sd_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#kubernetes_sd_config)：Prometheusはこの一連の設定項目を通じて、一連の事前定義された監視ターゲットに対するサービスディスカバリの設定を提供します（sdはservice discoveryを表します）。
- [`<static_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#static_config)：Prometheusが事前定義していない監視ターゲット（例えば、ベアメタルに手動でデプロイされた任意のサービス）に対しては、この設定項目を使用してサービスディスカバリを行うことができます。上記で概念実証を行った際に、この設定項目を使用しました。
- [`<relabel_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#relabel_config)：監視ターゲットの様々なメトリクスの取得を開始する前に、この設定項目を使用していくつかのラベルを変更することができます。Prometheusはいくつかの事前定義されたラベルルールを提供しており、relabelは複数段階で行うことができます。relabelが終了した後、`__`で始まるラベルは削除されます。

Prometheusの中核となる設定項目は`<scrape_config>`のようです。それぞれが監視ジョブを定義しており、namespaceのような概念で、主に監視ターゲットの集約を提供します。その中で、`<*_sd_config>`または`<static_config>`を定義することで、Prometheusに具体的にどのエンドポイントからデータを取得するか、およびこれらのエンドポイントをどのようにフィルタリングするかを伝えます。

次に、実戦を通じてこれらの設定項目への理解を深めましょう！

### Prometheusのデプロイ

デプロイの核心となる作業は、クラスタ内にPrometheusをデプロイするためにどのようなリソースが必要かを明確に考えることです。筆者はここで直接答えを公開します：

1. 専用のNamespace
2. node-exporterを管理するためのDaemonSet
3. Node-exporter Service
4. ConfigMapを使用したPrometheusの設定管理
5. Prometheus専用のServiceAccount
6. 十分な権限を持つClusterRole
7. ServiceAccountとClusterRoleを結びつけるClusterRoleBinding
8. Prometheus Deployment
9. Prometheus Service

RBACが適用されたK8sクラスタでは、Prometheusにクラスタの状態や様々なメトリクスを読み取るのに十分な権限を持つロールを定義する必要があります。したがって、5〜7の項目が必要です。

ここでは、筆者が自身の構築プロセスで蓄積した[リソース宣言の集合](https://github.com/Thrimbda/prometheus-set-up)を提供します。上記のリソースに加えてkube-state-metricsも含まれており、順番に操作することでデプロイされたPrometheusを得ることができます。

#### Node-exporter

Node-exporterについては、マシン自体の監視であるため、各Nodeに1つ必要です。同時にK8sのライフサイクル管理の恩恵を受けたいため、DaemonSetが最適な選択です。

コンテナ内で実行されるため、設定を行わないと実際のNodeメトリクスを収集できません。したがって、Node-exporterがメトリクスを収集できるように、ホスト上の特殊な場所をコンテナ内にマウントする必要があります。

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

そして、Serviceを通じてPrometheusが長期間アクセスできるエンドポイントを公開します。

#### Prometheus

PrometheusはDeploymentを使用してデプロイします。Prometheusをデプロイする前に、必要なエンドポイントにアクセスしてメトリクスを収集できるように十分な権限を設定する必要があります。RBACが設定されたK8sクラスタでは、ClusterRole/ServiceAccount/ClusterRoleBindingを通じてこの目標を達成します。設定が完了すると、PrometheusはServiceAccountを使用して適切な認証を行い、必要なエンドポイントにアクセスします。

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

ここまでで、監視目標を実現するためのすべての前提条件が整いました。では、どのようにしてこの強力なエンジンであるPrometheusを駆動し、整えた環境を十分に活用して監視を実現するのでしょうか？

前文でのPrometheus設定の紹介を組み合わせると、4つの監視ターゲットは4つの`<scrape_config>`で定義されます：

node-exporterの場合：

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

クラスタ内部であるため、追加の認証は不要で、httpsアクセスを有効にする必要もありません。

ここでは、node-exporterの例を通じて`<relabel_configs>`についてさらに説明します：

ラベルとは、あるエンドポイントに関する属性であり、異なるエンドポイントは同じラベルの下で異なる値を持つ可能性があります。`<relabel_config>`が行うことは、これらのラベルに対して変更やフィルタリングの操作を行い、必要なエンドポイントをフィルタリング/変更できるようにすることです。

![img](https://0xc1.space/images/2020/11/05/node-exporter-target.png)

上記のconfigには3つのrelabelアクションがあることがわかります。そのうち最初のものは、K8sサービスディスカバリで**事前定義**されたラベル`__meta_kubernetes_service_name`のすべての値から、指定された正規表現"node-exporter"に従ってフィルタリングし、`action`に基づいて一致したターゲットエンドポイントを保持し、同じラベルの残りの値を破棄するという意味です。後の2つのrelabelアクションは、nodeとhost_ipという2つの意味的ラベルを、名前を変更する方法で保持するためです。（覚えていますか？`__`で始まるラベルは最終的にすべて削除されます）

Prometheus自身の場合：

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

kubeletとcadvisorの場合、状況は少し複雑になります：

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

roleがnodeに変わったことに注意してください。したがって、Prometheusはデフォルトで`<node_ip>:10250/metrics`からメトリクスを収集します。ここには`bearer_token_file`設定項目が追加されています。kubeletはデフォルトで匿名アクセスをそのメトリクスデータに許可しないため、ここが前に設定したServiceAccountを使用する場所です。ここでは便宜上、`insecure_skip_verify: true`の方法でTLS認証をスキップします。

ApiServerの場合、再び少し複雑になります：

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

ここでは、`<relabel_config>`を通じてApiServer自身のエンドポイントのフィルタリングを完了し、トークン認証を提供すると同時に、CAファイルを追加して身元を認証します。これで、ApiServerにアクセスできるようになります。

これで、Prometheusのデプロイとターゲットエンドポイントの監視設定が完了しました。

興味のある読者は、さらにconfigを変更して、異なる設定下でのPrometheusの動作を観察し、理解を深めることができます。ここで小さな課題を残します：ベアメタルにデプロイしたPrometheusでK8sクラスタを監視するにはどうすればよいでしょうか？

## 参考資料

1. [Prometheus Configuration](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration)
2. [Kube-prometheus manifests](https://github.com/prometheus-operator/kube-prometheus/tree/8b0eebdd08d8926649d27d2bc23acf31144c2f6b/manifests)
3. [TSDB v3 design](https://fabxc.org/tsdb/)
4. [可観測性：概念とベストプラクティス](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
5. [Prometheusの初歩的な理解](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
6. [RBAC on K8s](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)
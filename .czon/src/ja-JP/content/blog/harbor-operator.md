---
"title": "ソースコードリーディング：Harbor-Operator の設計と実装分析"
"summary": "本稿では、Harbor-Operator のソースコード設計を詳細に解析します。依存関係グラフ（Dependency Graph）を活用してリソース間の依存関係を解決する方法、統一された Controller による複数の CRD のコード再利用、そして ResourceManager による設定のコード化（Configuration as Code）に焦点を当てます。Harbor-Operator は Kubernetes プラットフォーム上で、Golang 言語を用い、'Worse is Better' の理念に基づいた簡潔な設計を実践し、柔軟性を犠牲にすることで一貫性と保守性を獲得していると指摘します。著者は、HarborCluster、Dependency Graph、Controller、ResourceManager といった主要モジュールの分析を通じて、このプロジェクトの優れた設計哲学と実装の詳細を明らかにします。"
"tags":
  - "Harbor-Operator"
  - "Kubernetes"
  - "ソースコード分析"
  - "デザインパターン"
  - "依存関係グラフ"
  - "Controller"
  - "Golang"
"date": "2022-01-30"
---

<!--more-->

<a id="orgdafefdb"></a>

## 開始前の準備

<a id="org081213e"></a>

### なぜ Harbor-Operator なのか

<a id="org55a74c9"></a>

#### Worse is Better?

優れたソフトウェアとは何でしょうか？

80年代後半の有名な記事「The Rise of Worse is Better」の中で、著者は優れたソフトウェア設計は **単純性、正確性、一貫性、完全性** という4つの特質を考慮すべきだと述べています。

記事では、2つのソフトウェア設計理念（the right thing と worse is better）が紹介されています（この命名は否定的な意味ではないことを強調しておきます）。どちらの理念も上記の4つの特質を中心に展開されていますが、それらの優先順位が異なります。

---

<a id="orgbebeeee"></a>

##### The right thing

- **単純性** - 設計は単純で理解しやすいものでなければなりません。インターフェースの単純さは実装の単純さよりも重要です。
- **正確性** - 設計は正確でなければならず、この点については一切の妥協は許されません。
- **一貫性** - 一貫性は正確性と同じくらい重要です。そのため、単純性と完全性は多少犠牲にしても構いません。
- **完全性** - 設計は様々な状況を考慮しなければならず、単純さを保つために完全性を過度に犠牲にしてはいけません。

<a id="org948c614"></a>

##### Worse is better

- **単純性** - 設計は単純で理解しやすいものでなければなりません。実装の単純さはインターフェースの単純さよりも重要であり、単純性が最も重要な特質です。
- **正確性** - 設計は正確でなければなりません。ただし、正確さよりも単純さを保つことが少しだけ重要です。
- **一貫性** - 設計はあまりにも一貫性を欠いてはいけません。単純さを保つために一貫性を犠牲にすることができます。単純さを保証した上で、完全性のために一貫性を犠牲にすることもできます。
- **完全性** - 設計は様々な状況を考慮しなければなりません。設計を単純に保つために、完全性をいつでも犠牲にすることができます。

---

その後、著者は両者の多くの例を挙げ、なぜ worse-is-better が当時のソフトウェア業界を席巻しているのかを論じています。

この2つの理念に優劣はありません。今日でも私たちの身の回りに存在し、実際の状況はしばしば両者の間を行き来します。私たちは優れた、美的価値のある設計を望みますが、コストや人的要因も考慮しなければなりません。最終的には、現実世界の問題を解決するために、品質が十分で動作するソフトウェアを提供する必要があり、ソフトウェアの作成・保守コストが問題自体の価値を絶対に上回ってはならないのです。

<a id="org514ce0b"></a>

#### Golang - 言語

Golang は、ほぼ間違いなく worse is better 理念の典型例と言えるでしょう：

- Google が長年にわたって C++ で積み重ねてきた実践的知見が凝縮されています。
- 非常に単純で、複雑な機能は一切ありません。そのため、問題を解決するための基本的な構成要素（building block）はほぼ1種類しかなく、これは次のことを意味します：
  - 言語自体についてほとんど学ぶ必要なく、容易に習得できます。
  - コードが非常に読みやすいです。
- コンパイルが高速で、コンパイル速度のためにジェネリクスさえも犠牲にしました。
- goroutine を使って並行タスクを非常に簡単に実行できます。
- 例外スタックという言語機能をほぼ捨て、エラーチェックと処理を強制します。
- 一度コンパイルすれば、どこでも実行できます。

<a id="org2432232"></a>

#### Kubernetes - プラットフォーム

Kubernetes は皆さんよくご存知だと思いますので、ここでは詳しく説明しません。一言で言えば：概念的に非常にシンプルな API 設計と、サイバネティクスに基づく調和（reconcile）メカニズムを提供し、コンテナ化されたソフトウェアを自動的にデプロイ、拡張、運用できるようにします。

k8s は、この API 仕様と調和メカニズムを公開することで、開発者がその機能を拡張できるようにしています。開発者は **Operator パターン** を実装できます：ソフトウェアの設定、デプロイ（Day-1）および運用、バックアップ、フェイルオーバー（Day-2）に関する知識を、ソフトウェアを操作するためのソフトウェアとして記述し、これらの複雑でエラーが発生しやすい操作を自動化することで、信頼性を高め、コストを削減します。

---

では、Harbor Operator を選んだ理由は、優れた設計を持っているからです。優れたプラットフォーム上で、シンプルな言語特性を用い、過度な技巧に頼らず、SOLID 設計原則に適合するいくつかの重要な設計によって、実用的で美的価値のあるソフトウェアシステムを実現しており、the right thing 理念の実践者と見なすことができるでしょう。

著者のコードにはほとんどコメントがありませんが、異常に読みやすいです。これは、システム全体の設計にも依るところです。

<a id="org6815286"></a>

## 目標

問題を抽象化して単純化することは、必然的に柔軟性の犠牲を伴います。Harbor Operator は柔軟性を完全に捨て去ることで、最大限の思考負荷軽減をもたらし、Operator の開発がソフトウェア設定を宣言するようなものになるようにしています。

client-go を使って手動で operator を書くことは、Golang にジェネリクスが欠けていることもあり、まさに自虐行為です。プロジェクト全体に大量のボイラープレートコードが溢れかえることになるでしょう。実際に client-go で手書きするとしても、誰も本当にゼロから書き始めないと確信しています。

そこで **kubebuilder** が登場しました。Kubernetes Client の作成、Kubernetes API Server へのリクエストの監視、リクエストのキューイングなどの操作を、共通ライブラリである controller runtime と共通ツールである controller tools に抽象化し、開発者が API オブジェクト変更リクエストのビジネスロジック開発に集中できるように、スキャフォールディングコードを生成します。

Kubebuilder は依然としてビジネスロジックの多様性に一筋の活路を残していますが、Harbor Operator はその上でさらに極限を追求し、柔軟性を完全に犠牲にして概念の一貫性と単純性を追求しています。そして、それが直面しているビジネスは、まさにこのアプローチに非常に適しているのです。

したがって、今回のソースコードリーディングにおける主な目標は、Harbor Operator から以下を学ぶことです：

- Day-1 操作をどのように行うか
- どのようにして operator コードの冗長性をさらに削減し、同一の Controller コードで11の異なる階層の CRD の Controller を実現するか
- どのように DAG を利用してリソース間の依存関係を解決するか（著者はこのために特許を出願しているようです）

一方、以下については重点的に研究しません：

- Harbor Operator における Day-2 操作（実際、現在のバージョンではこの機能はまだ不安定です）
- Harbor 自体のソースコードと機能

<a id="org345a335"></a>

## ソースコードリーディング

<a id="org1198d5f"></a>

### 静的構造

<a id="orgb32de77"></a>

#### ディレクトリ構造

ここではディレクトリのみをリストアップします。

```
    root
    ├── apis
    │   ├── goharbor.io
    │   │   └── v1alpha3
    │   └── meta
    │       └── v1alpha1
    ├── controllers
    │   ├── controller_string.go
    │   ├── controllers.go
    │   └── goharbor
    │       ├── chartmuseum
    │       ├── controller_test.go
    │       ├── core
    │       ├── exporter
    │       ├── harbor
    │       ├── harborcluster
    │       ├── internal
    │       ├── jobservice
    │       ├── notaryserver
    │       ├── notarysigner
    │       ├── portal
    │       ├── registry
    │       ├── registryctl
    │       └── trivy
    ├── pkg
    │   ├── builder
    │   ├── cluster
    │   │   ├── controllers
    │   │   │   ├── cache
    │   │   │   ├── common
    │   │   │   ├── database
    │   │   │   │   └── api
    │   │   │   ├── harbor
    │   │   │   └── storage
    │   │   ├── gos
    │   │   ├── k8s
    │   │   └── lcm
    │   ├── config
    │   │   ├── harbor
    │   │   └── template
    │   ├── controller
    │   │   ├── errors
    │   │   ├── internal
    │   │   │   └── graph
    │   │   └── mutation
    │   ├── event-filter
    │   ├── exit
    │   ├── factories
    │   │   ├── application
    │   │   ├── logger
    │   │   └── owner
    │   ├── graph
    │   ├── harbor
    │   ├── image
    │   ├── manager
    │   ├── resources
    │   │   ├── checksum
    │   │   └── statuscheck
    │   ├── scheme
    │   ├── setup
    │   ├── status
    │   ├── template
    │   ├── tracing
    │   ├── utils
    │   │   └── strings
    │   └── version
    ...
```

<a id="orgfc0f08e"></a>

#### 主要インターフェース

![img](https://0xc1.space/images/2022/01/30/harbor-operator-class.svg)

<a id="org290c6c2"></a>

#### システムアーキテクチャ

v1.0.1 時点で、Harbor Operator は現在主に Harbor システムの Day-1 操作を担当しています。
![img](https://0xc1.space/images/2022/01/30/harbor-operator-arch.png)

<a id="org41c8944"></a>

### 大局を捉える：HarborCluster

まず、それほど重要ではない部分を除外しましょう：HarborCluster という CRD とその Controller の実装です。

なぜ特殊だと言えるのでしょうか？まず、システムアーキテクチャ内での位置を観察してください：最上位に位置し、Harbor システム自体とそれが依存するすべてのステートフルサービスを管理しています。これは、プロジェクトの歴史と、システムアーキテクチャ内での特殊な地位の両方から説明する必要があります。

システムアーキテクチャの観点から見ると、この HarborCluster CRD は定義上、Harbor CRD と非常に似通っており、コードに大量の冗長性があり、非常に見苦しいです。これは、システム全体の中で最も上（外）の層にある CRD として、ユーザーに直接向き合っているためです。ユーザーに Harbor デプロイメントに必要なすべての設定項目を宣言的に提供できなければなりません。さらに、Harbor 自体はステートレスサービスであるため、完全なデプロイメントには、HarborCluster CRD が Harbor システムが依存するすべてのステートフルサービス（Postgres、Minio、Redis など）を管理する必要があります。

Harbor システム自体に必要な情報はすでに Harbor CRD で定義されているため、HarborCluster CRD の冗長部分は、この情報を Harbor CRD に完全かつ正確に渡すことです。さらに、HarborCluster CRD は、自身の責務範囲外にあるステートフルサービスの CRD も管理する必要があるため、Harbor および Harbor のすべてのサブコンポーネントの Controller ロジックを完全に使用することはできません。

歴史的な観点から見ると、Harbor Operator は当初 OVH Cloud のプライベートプロジェクトであり、後に goharbor コミュニティに寄贈されました。したがって、git の履歴を組み合わせて観察すると、HarborCluster の CRD 定義とその Controller の実装が、システム内の他の Controller とこれほどまでに一貫性がない理由は、それがコミュニティによって寄贈された後発者であり、Harbor Operator 設計の当初は、それが担う機能が考慮されていなかったからです。

そして、HarborCluster Controller 自体の実装は、私たちが普段目にする、Controller-runtime を使用して実装された大多数の Controller と大きな違いはないため、詳細な研究は行いません。

---

HarborCluster Controller

![img](https://0xc1.space/images/2022/01/30/harbor-cluster-controller.png)

---

Harbor Core Controller

![img](https://0xc1.space/images/2022/01/30/harbor-core-controller.png)

---

<a id="orgd9c3526"></a>

### リソース間の依存関係を解決する： Dependency Graph

依存関係グラフは、プロジェクト全体の中で比較的独立したモジュールですが、実際には Harbor Operator のすべての controller の実行エンジンとしての役割を担っています。本質的には、Kubernetes 内のさまざまなリソース間に相互依存関係があることを観察したもので、一部のリソースのデプロイと調和は、他のリソースのデプロイと調和に依存しています（例えば、Deployment は Configmap に依存する可能性があります）。最終的に、これらの依存関係は依存関係グラフを構成します。実際、このグラフは DAG であるべきです。ここで必要なインターフェース定義は以下の通りです：

```go
    package graph

    type Resource interface{}

    type RunFunc func(context.Context, Resource) error

    type Manager interface {
            Run(ctx context.Context) error
            AddResource(ctx context.Context, resource Resource, blockers []Resource, run RunFunc) error
    }

    type resourceManager struct {
       resources map[Resource][]Resource
       functions map[Resource]RunFunc

       lock sync.Mutex
    }
```

- ここで、`Resource` は抽象的なリソースを定義しています。このモジュールはリソースが何を表しているかに関心がなく、言語の表現力の制限下で最大限の柔軟性を保持するために、トップ型である `interface{}` を使用しています。
- `RunFunc` は、特定の `Resource` に対してどのように操作を行うかを担当します。ここで `RunFunc` は型安全性の問題に直面します：`interface{}` はコンパイラがその型について何も知らないことを意味し、手がかりがありません。しかし、`RunFunc` はこの「何でもあり得る」型を使って何かをしなければなりません。したがって、型アサーション（強制変換）を行う必要があると考えられます。各リソースの `RunFunc` が手動で具体的な型にキャストしなければならないとしたら、非常に退屈でうんざりするものになるでしょう。後で、Harbor Operator がどのようにこの面倒な作業を一箇所に集中させるかを見てみましょう。
- `Manager` には2つのメソッドしかありません：リソースの追加と、このグラフの実行です。それぞれ研究する必要があります。
- `Manager` を実装した `resourceManager` のデータ構造の定義もシンプルです：
  - `resource -> blockers` の map
  - `resource -> runFunc` の map
  - map 操作の並行性を処理するための `lock`。ここから、著者が型安全性を失う代わりに並行安全性を保証する `Sync Map` のようなデータ構造を好まないことがわかります。これは、著者がどのようにして多数（11個のコンポーネント）の `RunFunc` を処理するのか、さらに興味深いものにしています。

グラフである以上、グラフのデータ構造とそのグラフを構築するファクトリメソッドが必要です。`resourceManager` のデータ構造は少し生硬に見え、これが本当のグラフなのかどうかは定かではありません。

<a id="org75cbb07"></a>

#### AddResource

シグネチャから、`AddResource` は追加されるリソース自体とそのすべての依存関係、および対応する `runFunc` を追加することがわかります。注目すべき点は、まず何にも依存しないリソース（つまり、出次数が0のリソース）を追加しなければならないことです。

```go
    func (rm *resourceManager) AddResource(ctx context.Context, resource Resource, blockers []Resource, run RunFunc) error {
       if resource == nil {
          return nil
       }

       if run == nil {
          return errors.Errorf("unsupported RunFunc value %v", run)
       }

       span, _ := opentracing.StartSpanFromContext(ctx, "addResource", opentracing.Tags{
          "Resource": resource,
       })
       defer span.Finish()

       nonNilBlockers := []Resource{}

       for _, blocker := range blockers {
          if blocker == nil {
             continue
          }

          nonNilBlockers = append(nonNilBlockers, blocker)

          _, ok := rm.resources[blocker]
          if !ok {
             return errors.Errorf("unknown blocker %+v", blocker)
          }
       }

       rm.lock.Lock()
       defer rm.lock.Unlock()

       _, ok := rm.resources[resource]
       if ok {
          return errors.Errorf("resource %+v already added", resource)
       }

       rm.resources[resource] = nonNilBlockers
       rm.functions[resource] = run

       return nil
    }
```

<a id="org4cb9f3a"></a>

#### Run

このパッケージのほとんどすべての重要なロジックは、`Run` というメソッドにあります。まず前半部分を見てみましょう：

```go
    func (rm *resourceManager) Run(ctx context.Context) error {
       span, ctx := opentracing.StartSpanFromContext(ctx, "walkGraph", opentracing.Tags{
          "Nodes.count": len(rm.resources),
       })
       defer span.Finish()

       g := errgroup.Group{}
       l := logger.Get(ctx)

       for _, no := range rm.getGraph(ctx) {
       ...
```

出現しました！`getGraph`。どうやらこのグラフを構築するようです。中に入ると、やはり `resourceManager` は単なるビルダーであり、本当のグラフはここに隠れていて、隣接リストで表現されていることがわかります。一見すると複雑に見えます：

```go
    type node struct {
       resource Resource
       fn       RunFunc

       parent      chan error
       parentLock  *sync.Mutex
       parentCount int

       children     []chan<- error
       childrenLock []*sync.Mutex
    }

    func (no *node) Wait(ctx context.Context) error {...}
    func (no *node) Terminates(err error) (result error) {...}
    func (no *node) AddChild(child *node) {...}
```

なぜ `Parent` と `children` が channel なのか、なぜそんなに多くの lock が必要なのか。グラフの構築過程を観察してみましょう：

```go
    func (rm *resourceManager) getGraph(ctx context.Context) []*node {
       span, _ := opentracing.StartSpanFromContext(ctx, "getGraph")
       defer span.Finish()

       rm.lock.Lock()
       defer rm.lock.Unlock()

       graph := make(map[Resource]*node, len(rm.resources))
       result := make([]*node, len(rm.resources))

       i := 0

       for resource, blockers := range rm.resources {
          blockerCount := len(blockers)

          node := &node{
             resource: resource,
             fn:       rm.functions[resource],

             parent:      make(chan error, blockerCount),
             parentLock:  &sync.Mutex{},
             parentCount: blockerCount,

             children:     []chan<- error{},
             childrenLock: []*sync.Mutex{},
          }
          graph[resource] = node
          result[i] = node

          i++

          blockers := blockers

          defer func() {
             for _, blocker := range blockers {
                graph[blocker].AddChild(node)
             }
          }()
       }

       return result
    }
```

なるほど、依存関係が逆転しています。今では、依存される側が依存する側を指しています。各リソースに対して `node` を構築し、同時にリソースの各依存関係に対して、このリソースの `parent` チャネルを依存関係の `children` に追加します。最終的なグラフは `node` の集合です。

これは確かに混乱を招きかねません。では、実行過程を観察してみましょう：

```go
    for _, no := range rm.getGraph(ctx) {
       no := no

       g.Go(func() (err error) {

          defer func() {
             err := no.Terminates(err)
             if err != nil {
                l.Error(err, "failed to terminate node when running graph")
             }
          }()

          err = no.Wait(ctx)
          if err != nil {
             return err
          }

          err = no.fn(ctx, no.resource)

          return err
       })
    }
```

非常に単純で強引です。各 `node` について、その入次数 `node` の実行が完了するのを待ってから、自身の `runFunc` を実行し、潜在的なエラーをそのチェーン後方で待機しているすべての `node` に伝播させ、早期に中止させます。

ここで、なぜトポロジカルソートを使ってこの定義が明確な古典的な問題を解決しないのか、非常に理解できません。

<a id="orgdcd001c"></a>

#### 初期化

```go
    GraphManager の初期化は、スレッドローカルなグローバル変数を使用し、初期化後に空中（ctx）に投げ込まれます。これは、さまざまな API フレームワークでよく見られる依存性注入の方法です。
    func (c *Controller) NewContext(req ctrl.Request) context.Context {
            ctx := context.TODO()
            application.SetName(&ctx, c.GetName())
            application.SetVersion(&ctx, c.GetVersion())
            application.SetGitCommit(&ctx, c.GetGitCommit())
            ctx = sgraph.WithGraph(ctx)

            logger.Set(&ctx, c.Log.WithValues("request", req))

            return ctx
    }

    func WithGraph(ctx context.Context) context.Context {
            return context.WithValue(ctx, &graphKey, graph.NewResourceManager())
    }

    func Get(ctx context.Context) graph.Manager {
            g := ctx.Value(&graphKey)
            if g == nil {
                    return nil
            }

            return g.(graph.Manager)
    }
```

<a id="org73ef8b0"></a>

### コードの再利用性を極限まで高める：Controller

以前に除外した HarborCluster Controller を除いて、Harbor Operator のすべてのコンポーネントの Controller は、この同じ Controller を直接組み合わせており、すべての Controller の共通ロジックを抽出し、同じ `Run`、同じ `Reconcile` を使用しています。どうやって実現しているのでしょうか？

- どのようなロジックが抽出されたか
- 相違点をどのように処理するか
- 何が犠牲になったか

<a id="orgbd581d5"></a>

#### データ構造

Controller のインターフェース実装は、`Reconciler` を実装している以外に特に面白い点はありません。では、まず Controller のデータ構造定義を見てみましょう：

```go
    type ResourceManager interface {
            AddResources(context.Context, resources.Resource) error
            NewEmpty(context.Context) resources.Resource
    }

    type Controller struct {
            client.Client

            BaseController controllers.Controller
            Version        string
            GitCommit      string

            ConfigStore *configstore.Store
            rm          ResourceManager
            Log         logr.Logger
            Scheme      *runtime.Scheme
    }
```

よく知らないものは、`BaseController` と `rm` だけです。

`BaseController` を追ってみると、基本的には Controller 自身の情報といくつかのラベル情報を識別するための識別子です。すると、異なる Controller 間の異なるロジックの差異点は、`ResourceManager` の中にしか存在しない可能性があります。`ResourceManager` も非常にシンプルなインターフェースに見えます。`ResourceManager` を実装しているのは、やはり各具体的な Controller です。最後に `ResourceManager` の具体例を研究します。

```go
    type Controller int

    const (
       Core                Controller = iota // core
       JobService                            // jobservice
       Portal                                // portal
       Registry                              // registry
       RegistryController                    // registryctl
       ChartMuseum                           // chartmuseum
       Exporter                              // exporter
       NotaryServer                          // notaryserver
       NotarySigner                          // notarysigner
       Trivy                                 // trivy
       Harbor                                // harbor
       HarborCluster                         // harborcluster
       HarborConfiguration                   // harborconfiguration
    )

    func (c Controller) GetFQDN() string {
       return fmt.Sprintf("%s.goharbor.io", strings.ToLower(c.String()))
    }

    func (c Controller) Label(suffix ...string) string {
       return c.LabelWithPrefix("", suffix...)
    }

    func (c Controller) LabelWithPrefix(prefix string, suffix ...string) string {
       var suffixString string
       if len(suffix) > 0 {
          suffixString = "/" + strings.Join(suffix, "-")
       }

       if prefix != "" {
          prefix = "." + prefix
       }

       return fmt.Sprintf("%s%s%s", prefix, c.GetFQDN(), suffixString)
    }
```

<a id="orgc9dc9b0"></a>

#### Reconcile ロジック

では、Controller はどのようにしてたった一つの `Reconcile` だけで、harbor ファミリーの11の CRD とそれに伴う多くのシステムリソースを reconcile できるのでしょうか？

上記ですでに知っている情報によると、各 CRD に対して `ResourceManager` を使用して、この CRD が作成および調和する必要があるさまざまなリソースを定義し、これらのリソースは依存関係グラフを通じてその依存関係を定義し、各 CRD に対して具体的な `RunFunc` を記述して最終的な調和を完了するはずです。

```go
    func (c *Controller) Reconcile(req ctrl.Request) (ctrl.Result, error) {
       ctx := c.NewContext(req)

       span, ctx := opentracing.StartSpanFromContext(ctx, "reconcile", opentracing.Tags{
          "resource.namespace": req.Namespace,
          "resource.name":      req.Name,
          "controller":         c.GetName(),
       })
       defer span.Finish()

       l := logger.Get(ctx)

       // インスタンスを取得

       object := c.rm.NewEmpty(ctx)

       ok, err := c.GetAndFilter(ctx, req.NamespacedName, object)
       if err != nil {
          // オブジェクトの読み取りエラー
          return ctrl.Result{}, err
       }

       if !ok {
          // リクエストオブジェクトが見つかりません。reconcile リクエストの後に削除された可能性があります。
          // 所有されているオブジェクトは自動的にガベージコレクションされます。追加のクリーンアップロジックにはファイナライザーを使用してください。
          l.Info("Object does not exists")

          return ctrl.Result{}, nil
       }

       if !object.GetDeletionTimestamp().IsZero() {
          logger.Get(ctx).Info("Object is being deleted")

          return ctrl.Result{}, nil
       }

       owner.Set(&ctx, object)

       if err := c.Run(ctx, object); err != nil {
          return c.HandleError(ctx, object, err)
       }

       return ctrl.Result{}, c.SetSuccessStatus(ctx, object)
    }
```

非常に典型的な Reconcile ロジックです。どうやら工夫は `c.Run` の中にあるようです：

```go
    func (c *Controller) Run(ctx context.Context, owner resources.Resource) error {
       span, ctx := opentracing.StartSpanFromContext(ctx, "run")
       defer span.Finish()

       logger.Get(ctx).V(1).Info("Reconciling object")

       if err := c.rm.AddResources(ctx, owner); err != nil {
          return errors.Wrap(err, "cannot add resources")
       }

       if err := c.PrepareStatus(ctx, owner); err != nil {
          return errors.Wrap(err, "cannot prepare owner status")
       }

       return sgraph.Get(ctx).Run(ctx)
    }
```

確かに `rm` がここに現れました。特定の Controller が必要とするリソースを追加した後、`PrepareStatus` は統一されたもののようです。このメソッドのソースコードと CRD 定義を組み合わせて見ると、すべてのコンポーネントが同じ `Status` を持っていると仮定していることがわかります。これもまた、柔軟性を犠牲にして単純さと一貫性を求めた設計です。実際、この設計は K8s が推奨する規範に従っており、CRD を設計する際の参考にすることができます。ここでは詳しく説明しません。

最後の行：`sgraph.Get(ctx).Run(ctx)`。依存関係グラフが来ました。空中（ctx）から取り出します。これでこの部分のロジックは閉じました。残っている問題は：`ResourceManager` を実装した各具象 Controller が、どのように依存関係グラフを構築し、自身の `RunFunc` を構築するかです。

<a id="orgb7ed9a6"></a>

### コード即設定：ResourceManager

最後のステップは、水が流れるように自然に進みます。

`ResourceManager` を実装したすべての Controller は、地位的に平等であるはずです。harbor core という一つの例を借りて、その実態を探ってみましょう。

具体的な K8s リソースを生成する部分を除いて、注目すべきは `ResourceManager` インターフェースを実装した部分です。

```go
    func (r *Reconciler) NewEmpty(_ context.Context) resources.Resource {
       return &goharborv1.Core{}
    }

    func (r *Reconciler) AddResources(ctx context.Context, resource resources.Resource) error {
       core, ok := resource.(*goharborv1.Core)
       if !ok {
          return serrors.UnrecoverrableError(errors.Errorf("%+v", resource), serrors.OperatorReason, "unable to add resource")
       }

       service, err := r.GetService(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get service")
       }

       _, err = r.Controller.AddServiceToManage(ctx, service)
       if err != nil {
          return errors.Wrapf(err, "cannot add service %s", service.GetName())
       }

       configMap, err := r.GetConfigMap(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get configMap")
       }

       configMapResource, err := r.Controller.AddConfigMapToManage(ctx, configMap)
       if err != nil {
          return errors.Wrapf(err, "cannot add configMap %s", configMap.GetName())
       }

       secret, err := r.GetSecret(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get secret")
       }

       secretResource, err := r.Controller.AddSecretToManage(ctx, secret)
       if err != nil {
          return errors.Wrapf(err, "cannot add secret %s", secret.GetName())
       }

       deployment, err := r.GetDeployment(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get deployment")
       }

       _, err = r.Controller.AddDeploymentToManage(ctx, deployment, configMapResource, secretResource)
       if err != nil {
          return errors.Wrapf(err, "cannot add deployment %s", deployment.GetName())
       }

       err = r.AddNetworkPolicies(ctx, core)

       return errors.Wrap(err, "network policies")
    }
```

なんということでしょう。リソースを順番に追加する必要があることを除けば、これは宣言的設計に相当します。新しい Controller を追加したい場合は、非常に簡単です：この Controller がどのリソースを調和する必要があるかさえわかればよく、具体的な Reconcile ロジックを管理する必要はありません。

待ってください、`RunFunc` は私たちが自分で実装する必要はないのでしょうか？これが今回のソースコードリーディングの最後の問題です。harbor operator
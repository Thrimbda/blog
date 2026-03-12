---
title: Legion の成長軌跡：タスク記録ツールからマルチエージェント工学オペレーティングシステムへ
date: 2026-03-08
---

## はじめに

このドキュメントは、私自身がずっと振り返って考えてきた一つの問いに答えようとするものです：Legion を、ほとんど何もないアイデアから、今日の比較的成熟したマルチエージェント工学協働システムへと、どのようにして段階的に育て上げてきたのか？

この分析は主に四種類の材料に基づいています：

- Yuan リポジトリ内の `.legion/` git 履歴
- 現在の `.legion/config.json` と `.legion/ledger.csv` の状態
- 代表的な task、review、RFC、report の成果物
- ブログ記事『[AI エージェントについての考察](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)』ですでに明示的に書いた思考フレームワーク

一言で結論を先に述べるならば、こうなります：

> Legion は、私が最初から一つの完成されたシステムとして設計したものではありません。実際のタスクのプレッシャーの中で、「コンテキスト管理、暗黙知、設計ゲート、検証コスト、報告コスト」といった問題に、少しずつ追い詰められて形作られてきたものです。その始まりは単にエージェントが忘れないようにするためでしたが、次第に複数のエージェントがどのように働くかを制約する工学システムへと進化しました。

---

## 一、まず現在を見る：Legion は今どのような姿をしているか

始まりを語る前に、今日の状態だけを見ると、Legion は明らかに散らばったノートのディレクトリではありません。

現在の Yuan リポジトリ内の `.legion` の状態から：

- 現在、合計 34 のタスクがあります。
- 状態の分布はおおよそ：9 つが `archived`、23 が `paused`、2 つが `active` です。
- `.legion/ledger.csv` にはすでに 2498 行の監査記録があります。
- 最も頻繁なアクションは `legion_update_context`、`legion_update_tasks`、`legion_get_status`、`legion_read_context`、`legion_list_reviews`、`legion_respond_review` です。
- 現在のタスク作成ポリシーは [`agent-with-approval`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json) です。つまり、複雑なタスクはデフォルトでまず提案、次に承認、そして実行となります。

これらの事実を合わせて見ると、Legion は今日、少なくとも五つの安定した能力を備えていると言えます：

1.  **タスクの永続化**：タスクの目標、コンテキスト、進捗状況が、もはやセッション内だけの存在ではなくなりました。
2.  **設計ゲート**：複雑なタスクはすぐに着手できず、まず plan、RFC、または提案が必要です。
3.  **レビューの閉ループ化**：コメントは単なるチャットではなく、状態を持つ構造化されたレビュー項目です。
4.  **証跡となる成果物**：多くのタスクが、RFC、review、test report、walkthrough、PR body を安定的に出力するようになっています。
5.  **監査とガバナンス**：システムは、いつ誰がどのような決定をし、どの段階を進め、どのレビューを閉じたかを把握しています。

これをブログで述べたパイプラインに圧縮すると、すでに非常に似通っています：

`意図 -> 計画 -> 実行 -> 検証 -> 報告 -> 記憶`

つまり、今日の Legion は「コードを書くのを補助するノートシステム」ではなく、「マルチエージェント協働のプロトコル層」なのです。

---

## 二、第一段階：まずタスクを頭の中から外に出す

Legion の出発点は実に素朴なものでした。

git の履歴を見ると、`.legion` を明示的なワークフローとしてリポジトリに持ち込んだ最初のものは、[`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) です。

この最初の重要な実装には、三つの重要な要素がありました：

- [`plan.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
- [`context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md)
- [`tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/tasks.md)

この三つのファイルは、後にほぼ Legion の骨格となりました。

### 1. `plan.md` が「何をすべきか」を解決

[`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) において、`plan.md` はもはや「すべてのベンダーに quote service を追加する」という単なる ToDo ではなく、以下のように明確に記述されていました：

- 目標
- 背景と動機
- 非目標
- 範囲
- 段階的計画
- 契約要約
- ベンダー別設計

このステップは重要です。なぜなら、Legion がスタート時点から、単なる ToDo リストではなく、軽量な設計インデックスであったことを意味するからです。

### 2. `context.md` が「何が起こったか、なぜそうしたか」を解決

[`implement-quote-service/context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md) には、後の Legion の非常に核となるいくつかの能力がすでに見て取れます：

- 重要なファイルの記録
- 重要な決定の記録
- 検証結果の記録
- 迅速な引き継ぎの提供

言い換えれば、`context.md` は最初から「私の頭の中でちょうど理解したことを置き換える」役割を担っていたのです。

### 3. `tasks.md` が「今どこまで進んだか」を解決

マルチエージェントや複数ラウンドのセッションが始まると、最初に失われるのはコードではなく、進捗状態であることが多いです。

`tasks.md` の意義は以下の点にあります：

- 段階を分割する
- 現在のタスクをマークする
- 発見された新しいタスクを追加する
- 次のラウンドの対話で現場を迅速に復元できるようにする

したがって、Legion の第一段階は、本質的に非常に現実的な問題を解決していました：

> まず忘れないこと。まずタスクを失わないこと。まずコンテキストを復元できること。まずエージェントが終わったら記憶喪失にならないこと。

これは、私がブログに書いた出発点と完全に一致しています：並行作業が増え始めると、最初に崩壊するのは人間のコンテキストスケジューリング能力なのです。

---

## 三、第二段階：タスク記録から暗黙知の外在化へ

第一段階が主に「今何をしているかを忘れない」ことを解決したとすれば、第二段階が解決したのは、私がブログで特に言及した「暗黙知の壁」です。

### 1. 複雑なタスクがレビュー機構を生み出す

2025年12月中旬から、Legion 内の plan ドキュメントに `> [REVIEW]` ブロックが大量に現れ始めました。典型的なタスクは以下の通りです：

- [`yuantsexchange-ohlcinterestrate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/yuantsexchange-ohlcinterestrate/plan.md)
- [`vendors-ingest-ohlc-interest-rate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendors-ingest-ohlcinterestrate/plan.md)
- [`task-vex-queryquotes-swr`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-queryquotes-swr/plan.md)
- [`task-vex-quote-upstream-refactor`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-quote-upstream-refactor/plan.md)
- [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)

これらのタスクには共通点があります：

- これらはもはや「既存のパターンに沿って少し修正する」だけで完了できるタスクではありません。
- これらは古い実装、進化の歴史、局所的なベストプラクティス、そして多くの自明ではない制約に関わっています。
- 結果の質を本当に決定するのは、多くの場合、モデルがコードを書けるかどうかではなく、何を継承すべきで、何を継承してはいけないかを知っているかどうかです。

例えば、[`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md) のようなタスクでは、レビューに繰り返し現れるのは、まさに典型的なプロジェクト内の暗黙知です：

- ある既存実装を参考にしてはいけない。なぜならその実装自体に問題があるから。
- 最初はある制約が不要に見えたが、後で再評価すると外せないことがわかった。
- コーディングルール、マージの意味論、スケジューリングの公平性、レート制限戦略などは、モデルがコードから自然に学べる「世界の知識」ではなく、プロジェクト自身が育んできた知識です。

これはまさに、私がブログに書いた分岐点に対応しています：

- 第1層：ユーザーが今回何を言ったか
- 第2層：プロジェクト自身の技術的決定と局所的なベストプラクティス
- エージェントを本当に転倒させやすいのは、まさに第2層なのです。

Legion がこの段階で担った役割は、第2層を強制的に書き出すことでした。

### 2. コメントが「チャット」から「インターフェース」へと変わり始める

このステップの本質は、コメントの数が増えたことではなく、コメントの性質が変わったことです。

以前のコメントは一時的な対話に近かったのですが、この段階になると、コメントは以下のような役割を担い始めました：

- 設計方向の変更
- 失敗時の意味論の追加
- 過剰設計の除去
- どの古い実装を参考にしてはいけないかの指摘
- 保持しなければならない工学的制約の記録

これらのものが `plan.md` や `context.md` に落とし込まれると、それはもはや口頭での注意喚起ではなく、タスクの真実の一部となります。

したがって、第二段階の Legion は、本質的に単なるタスクトラッカーではなく、より重要なことを行っていました：

> 暗黙知を外在化する。

これが、私が後にますます確信するようになった理由でもあります：外在化された脳は、単なる付加価値ではなく、複雑なプロジェクトにおける必需品なのです。

---

## 四、第三段階：外在化された脳から設計ゲートへ

タスクがますます複雑になるにつれ、単に「知識を書き留める」だけでは不十分になりました。新しい問題はこうです：

> もし複数のエージェントが一緒に動き始めたが、方向性自体が間違っていたらどうするか？

この時点で Legion は第三段階に入り始めました：記録システムから設計ゲートシステムへのアップグレードです。

### 1. RFC と仕様がメインプロセスに入る

典型的な転換点は、[`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md) です。

このタスクでは、Legion は明らかに「まずやってから記録する」ではなく、「まず設計、まずレビュー、まずゲートを通し、それから実行する」という形になっていました。

このタスクの下には、完全な設計と検証の成果物が現れています：

- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/rfc.md)
- [`spec-dev.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-dev.md)
- [`spec-test.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-test.md)
- [`spec-bench.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-bench.md)
- [`spec-obs.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-obs.md)

これは、Legion が複雑なタスクを安定したいくつかの階層に分解し始めたことを意味します：

1.  **RFC**：まず意図を合わせる
2.  **Dev/Test/Bench/Obs 仕様**：どのように検証するかを事前に明確にする
3.  **レビュー**：作業開始前に方向性の問題をできるだけ多く明らかにする
4.  **実装と検証**：低コストのチェックを前倒しする
5.  **報告と PR 成果物**：受け入れのためであり、「書き終わればそれでいい」ためではない

これは基本的に、私がブログで述べた「意図の整合 + 階層化された検証」です。

### 2. セキュリティとリソースの問題が、事前のブロッキング要因として現れ始める

[`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md) や [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) のようなタスクでは、レビューはもはや単なる「提案」ではなく、明示的に `blocking` が現れています。

典型的な問題は以下の通りです：

- SSRF リスク
- DoS リスク
- レスポンスボディサイズの制限がない
- 並行性とキューイングのパラメータがデフォルトで安全ではない
- 環境変数の境界が不明確

このステップは重要です。なぜなら、Legion は新しい役割を担い始めたからです：

> 「なぜそうするか」を記録するだけでなく、「なぜ今はまだできないのか、これらの条件をまず満たさない限り」を記録する。

これがまさに設計ゲートなのです。

ブログで書いたように、マルチエージェントシステムが転倒し始めると、人間は自然に、より長い RFC を書き、より厳格なレビューを行い、高コストなエラーをできるだけ前倒ししようとします。Legion はこの段階で、この本能的な反応を制度化したのです。

---

## 五、マイルストーン段階：HTTP Proxy シリーズが Legion を真に工学的なものに

前の段階がまだ「やりながら成長する」という実験的な感覚を残していたとすれば、`http-proxy` 関連のタスクは、Legion が真に成熟した最初のマイルストーンと言えるでしょう。

これは、私がブログで感じたこととも一致しています：複数のプロジェクトにまたがる `http-proxy` タスクは、私が「コーディングから大幅に手を引き、少数のレビューコメントだけを残す」ことを明らかに感じ始めた転換点でした。

### 1. それは単一のタスクではなく、タスク群である

関連するタスクは少なくとも以下を含みます：

- [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
- [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
- [`vendor-http-services-rollout`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-http-services-rollout/plan.md)
- [`http-proxy-metrics`（`rfc-metrics.md` に存在）](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/docs/rfc-metrics.md)
- [`http-services-terminalinfos-ready`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-services-terminalinfos-ready/plan.md)
- [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)

これは、Legion がこの時点でサポートしていたのは「一つの機能を完了させる」ことではなく、以下をサポートしていたことを示しています：

- まず基本ライブラリを作る
- 次にアプリケーション層を作る
- 次にロールアウトを行う
- 次に観測とメトリクスを行う
- そしてその能力をベンダー側に広げる

つまり、**タスク、パッケージ、段階をまたがる**工学的な進化をサポートし始めたのです。

### 2. レビューのサイクルは長くなったが、より安定した

特に [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) は、Legion の成熟を非常によく示しています。

このタスクで繰り返し議論されたのは、もはや「コードをどう書くか」ではなく：

- `allowedHosts` は実際にリクエスト動作に影響するのか、それともメトリクスだけに影響するのか？
- `absolute-form` は本当に唯一サポートされるパス形式なのか？
- `invalid_url`、`blocked`、`error` の境界はどのように定義すべきか？
- `target_host` / `target_path` の高カーディナリティリスクはどのように制御すべきか？

これらの問題は本質的に、コードを書く能力の問題ではなく、仕様の境界、意味論の境界、検証の境界の問題です。

Legion のここでの価値は、私がより多くのコードを書くのを助けることではなく、これらの境界を安定させるのを助けることでした。

### 3. 報告インターフェースが真に工学的になり始める

これは Legion にとって特に重要なステップでもあります。

`http-proxy` の一連のタスクでは、Legion はすでに安定して以下を生成し始めていました：

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- PR body
- spec-test / spec-bench / spec-obs

つまり、Legion はもはや「仕事を終わらせる」ことに満足せず、「仕事を明確に説明し、証拠を結び付け、リスクを述べる」ことをサポートし始めたのです。

これは、私がブログで述べた「報告インターフェースは過小評価されている工学的問題である」と完全に一致します。

本当に高くつくのはトークンではなく、手戻り、繰り返しの問い合わせ、コードの再読解、そして注意力の漏れです。報告インターフェースが工学的でない限り、人は依然として多くのコストをかけて、エージェントが実際に何をしたかを推測しなければなりません。

---

## 六、成熟段階：工学的パイプラインからガバナンスシステムへ

さらに先を見ると、Legion の成熟は「ドキュメントが増える」ことだけではなく、ガバナンス構造を備え始めたことにあります。

### 1. タスク作成はもはや即興ではなく、ポリシーによって制約される

現在の [`config.json`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json) 内の `taskCreationPolicy` はすでに `agent-with-approval` です。

このことは象徴的です。それは Legion が一つの事実を認めたことを意味します：

> すべての複雑なタスクが、エージェント自身がいつ開始し、いつ進めるかを決定すべきではない。

つまり：

- エージェントは探索、整理、提案ができる。
- しかし、複雑な作業が正式な実行段階に入る前には、依然として人間の承認が必要である。

これが制御された自律です。

### 2. レビューはもはや単なるテキストではなく、状態を持つプロトコルである

ledger の分布を見ると、`legion_list_reviews` と `legion_respond_review` はすでに高頻度のアクションです。

これは、レビューが Legion 内では付随的な能力ではなく、主要な能力の一つであることを示しています。さらに重要なのは、それが単なる「コメントを読む」ことではなく：

- 未解決項目を見つける
- 特定のレビューに対して項目ごとに応答する
- `resolved` / `wontfix` / `need-info` をマークする
- レビューが閉ループ化されたことを再確認する

このステップの意義はここにあります：

> 人間とエージェントの協働は、もはやセッションメッセージではなく、沈殿可能、追跡可能、監査可能なプロトコルアクションとなった。

### 3. それは「リスク受容」を担い始める

成熟したシステムは「すべての問題が解決された」ことを意味するのではなく、以下のことを明確に区別できることを意味します：

- どのリスクがすぐに修正されなければならないか
- どのリスクがまず記録し、後で管理できるか
- どのリスクが現在の環境仮定の下で受容可能か

[`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) や [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md) のようなタスクでは、すでに以下のことが見て取れます：

- 一部の問題はレビュー後に `wontfix` とマークされた
- 一部のセキュリティ問題は、現在の段階で受容されるリスクとして明示的に記録された
- 一部の残留リスクは忘れ去られたのではなく、正式に残された

これは、Legion がもはや単なる「バグを直すのを手伝う」ツールではなく、工学的決定の現実性を担い始めたことを示しています。

---

## 七、最高の成熟度サンプル：`heavy-rfc` から `signal-trader` へ

既存のタスクから Legion の成熟度を最もよく表すサンプルを選ぶなら、私はそれを二つの連続した段階として見ます：

- [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
- [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)

### 1. `heavy-rfc`：設計ゲートの成熟形態

[`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md) は、非常に典型的な高リスク設計タスクです。

それは最初から明確に：

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

そして、その成果物チェーンは非常に完全です：

- [`task-brief.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/task-brief.md)
- [`research.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/research.md)
- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/rfc.md)
- [`review-rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/review-rfc.md)
- [`report-walkthrough.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/report-walkthrough.md)
- [`pr-body.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/pr-body.md)

このタスクは一つのことを示しています：Legion はすでに高リスクタスクにおいて、「まず意図を合わせ、それから実行を開始する」ことを安定したプロセスにすることができるのです。

### 2. `signal-trader`：Heavy プロセスと実装の閉ループが接続された

`heavy-rfc` が設計ゲートの成熟を表すとすれば、[`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) はその継続のように見えます：

- まず heavy な設計制約がある
- 次に実装に入る
- 次にテストを実行する
- 次に code/security review を行う
- 次に walkthrough と PR body を出力する

[`signal-trader/tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/tasks.md) から、このチェーンがすでに標準的な段階に圧縮されていることがわかります：

1.  タスク定義と境界の収束
2.  Heavy 調査と RFC
3.  RFC に対する対抗審査
4.  RFC-only Draft PR 成果物
5.  コアライブラリ実装
6.  テストと検証
7.  コードとセキュリティレビュー
8.  報告と PR 成果物

このステップは私にとって特に重要です。なぜなら、Legion がここまで来て、もはや「ドキュメント体系を持っている」だけでなく、**安定して再利用可能な重量級タスクプロセステンプレート**を持っていることを示しているからです。

これはまさに、私がブログで述べたアイデンティティの変化です：実行者から、徐々に審査者、意思決定者、システム反復者へ。

---

## 八、この軌跡をブログと照らし合わせて見る

『[AI エージェントについての考察](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)』を振り返って見ると、多くの判断が、すでに Legion の歴史の中で具体化されていることがわかります。

### 1. 「スケールの甘い点を初めて味わう」

ブログに書いたのは：複数のエージェントがタスクを並行して進めることは、短期的には機械的な収穫の快感をもたらす。

Legion の歴史では、2025年12月にタスクが急速に増加し始めた時期に対応します：

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

この時点での最も核心的な目標は、確かに：まずエージェントに多くの仕事をさせることでした。

### 2. 「真のボトルネックは私自身になった」

実行作業が徐々にエージェントに委ねられると、人間の真のボトルネックは以下になります：

- コンテキスト管理
- 設計判断
- 受け入れ
- 意思決定

Legion の三つの要素は、まさにこれに対抗するために最初に使われたものです：

- `tasks.md` で進捗の喪失を減らす
- `context.md` で決定と重要なファイルを外在化する
- `plan.md` で目標と範囲を固定する

### 3. 「暗黙知の壁」

ブログで最も重要な判断の一つは、エージェントが学ぶのはしばしば可視サンプルだけで、何が現在の標準なのかを知らないということです。

Legion の対応方法は以下の通りでした：

- レビューを plan に書き込む
- 制約を context に書き込む
- 設計上の論争を構造化ドキュメントとして書く

つまり、プロジェクトの暗黙知を外在化するのです。

### 4. 「意図の整合 + 階層化された検証」

ブログのパイプラインは、`http-proxy-*` や `signal-trader` のようなタスクでは、すでにほぼそのまま具体化されています：

- 意図：目標 / 非目標 / 範囲
- 計画：段階 / RFC / 設計要約
- 実行：実装
- 検証：test / review-code / review-security / bench
- 報告：walkthrough / PR body
- 記憶：context / archived task / ledger

### 5. 「報告インターフェースは過小評価されている工学的問題である」

私はブログで、結論はできるだけ口頭での要約にとどまらず、成果物に結び付けるべきだと述べました。

Legion は今、明らかにこの方向に向かっています：

- 結論は一言ではなく、report、review、test-report、PR body に対応する
- 受け入れはすべてのコードを再読解する必要はなく、凝縮された成果物を優先的に読めばよい

まだ理想的な Citation Agent ではありませんが、方向性はすでに非常に明確です。

### 6. 「ベンチマークは必需品になるだろう」

ブログで私は、将来は異なるワークフローやモデルバージョンを比較できなければならず、「このバージョンの方が賢い」と感覚で言うだけではいけないと述べました。

この線は Legion でもすでに萌芽が見られます：

- `spec-bench.md`
- ベンチマークシナリオと閾値
- ベンチ出力と報告

これは、それがもはや単なるアイデアではなく、工学的段階に入りつつあることを示しています。

---

## 九、現在から次のステップを見る：`legion-mind` が表す最新の進化方向

Yuan リポジトリ内の `.legion/` の歴史が主に「このシステムがどのように実際のニーズによって追い詰められて生まれたか」に答えるとすれば、現在の `~/Work/legion-mind` は別の問いに答えています：

> このシステムがすでに追い詰められて生まれたのであれば、次のステップとして、それをプロジェクトの経験から汎用システムへと精錬することはできないか？

以下のエントリポイントから、Legion の最新の進化方向がはっきりと見て取れます：

- [`README.md`](https://github.com/Thrimbda/legion-mind/blob/main/README.md)
- [`docs/legionmind-usage.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/legionmind-usage.md)
- [`.legion/playbook.md`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md)
- [`/evolve`](https://github.com/Thrimbda/legion-mind/blob/main/.opencode/commands/evolve.md)
- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)

### 1. 「リポジトリ内ワークフロー」から「汎用オーケストレーションテンプレート」へ

Yuan では、Legion は具体的なタスクに沿って成長しましたが、`legion-mind` では、すでに明示的に以下のように抽象化されています：

- プライマリエージェント：`legion`
- サブエージェント：`engineer`、`spec-rfc`、`review-rfc`、`review-code`、`review-security`、`run-tests`、`report-walkthrough`
- スキル：`skills/legionmind`

これは、Legion が「経験型ワークフロー」から「役割が明確なオーケストレーションシステム」へと変わりつつあることを示しています。

### 2. ドキュメント制約からコマンド化されたエントリポイントへ

`legion-mind` で最も明らかな変化の一つは、高頻度プロセスがコマンド化されたことです：

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

これは一見、使用体験の最適化に過ぎないように見えますが、本質的にはそうではありません。これは、Legion が以前は暗黙の SOP に依存して維持されていたプロセスを、さらに明示的なエントリポイントとして固定
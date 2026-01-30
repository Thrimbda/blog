---
"title": "RBACデモ：エイアーのために"
"summary": "本稿では、著者がRBACモデルを理解するために開発した「エイアーのために」というデモプロジェクトについて詳しく説明します。このプロジェクトは、StarCraftゲームの簡略化されたシナリオを模倣し、PythonのFlaskフレームワークを用いて構築したRESTfulサービス内でRBACモデルを実装しています。記事では、主体、ロール、リソース、権限の定義、および主体-ロールとロール-権限の割り当て関係を含むデモの設計思想を解説します。同時に、データベースを使用せずにファイル設定でRBAC関係を管理し、RBACをRESTfulアーキテクチャと統合する方法について説明します。最後に、デモのビジネスロジックとコアコードの実装を紹介し、ロールを通じてゲームリソースへの操作を制御し、ゲーム目標を達成する方法を示します。"
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "Python"
  - "システム設計"
  - "アクセス制御"
  - "StarCraft"
"date": "2017-05-11"
---

---
title: RBACデモ：エイアーのために
date: 2017-05-11
taxonomies:
  tags:
    - システム設計と分析
    - RESTful
    - RBAC
---

前回のRBACに関する理解に基づき、また課題の要件もあり、RBACの実践として簡単なデモを作成することにしました。

デモを非常に大規模にする意図はなく、問題を説明することを目標としているため、やはり「小さくとも、必要な要素は全て揃っている」状態を目指します。

では、このデモの目標は何でしょうか？何ができるのでしょうか？

<!--more-->

## 分析と設計

面白さを保ちつつ問題を十分に反映させるため、このデモでは大幅に簡略化された、各ユニットが奇跡的に主体性を持ったStarCraftの戦況において、プロトスプレイヤーが直面するシナリオを模倣します。

良いデモには良い名前が必要です。そこで、このデモの名前は **「エイアーのために！」** とします（エイアーはプロトスの母星であり、各ゼアロットが戦場に転送される際に「エイアーのために戦え！」という熱い言葉を発します）。

**「エイアーのために」** では、味方チームを率いて十分な数のゼアロット戦士を生産し、破壊者エイモンを倒し、宇宙全体を救うことが目標です。ゼアロットが足りなければ、敗北し、星々は囁き、万物は消滅します。

これら全ては、PythonのFlaskフレームワークで書かれたRESTfulサービスの中で実現されます。

> 実際のシナリオでは、プレイヤーを除く各主体は作成可能であり、したがってリソースと見なすことができます。RBACを体現するために、以下の制約を追加しました：
>
> - 本デモで提供されるいくつかの主体は唯一無二で常に存在するものとし、あたかも彼らが唯一無二であるかのように、いかなる主体も再帰的に作成される可能性を排除します（例：プローブはネクサスを生産でき、ネクサスはプローブを生産できる）。
> - 実際にはゲートウェイはパイロンのエネルギー供給なしでは動作しませんが、ここではその点は表現していません。これは、我々のゲートウェイが同期軌道上にあるプロトスの伝説的な母艦「アラクの矛」からのエネルギー供給を受けているためと解釈し、パイロンは人口上限を提供するリソースとしてのみ見なすことにします。

この戦況には以下のオブジェクトが存在します：

### 主体 (Subject)

- プレイヤー （あなた） thrimbda
- プローブ （基本作業ユニット、資源を採集し、建造物を建設できる） probe
- ゲートウェイ （ゼアロットという戦闘ユニットを生産する） gateway

#### ロール (Role)

- 執政官（最高司令官、あらゆるリソースを配分する） archon
- クリスタル採掘者 （プローブのみがこの役割を担える） crystal_collector
- ゼアロット転送の拠点 （プロトス戦士のワープを支援するビーコン） portal
- パイロン建設者 （パイロンがあれば、ゼアロットを転送するための十分な人口上限を得られる） pylon_transporter

### リソース (Resource)

- 未採掘のクリスタル鉱石 （パイロン建設およびゼアロット転送に使用、初期値は不明）
- 採掘済みクリスタル鉱石 （パイロン建設およびゼアロット転送に使用、初期値0）
- 生産能力 （転送に必要なエネルギー、いわゆる人口、初期値0）
- ゼアロット （戦闘ユニット、宇宙を救うために使用する戦士たち、初期値0）

### 権限 (Permission)

> リソースに対する各操作はそれぞれ権限であるため、ここでは操作を個別に列挙せず、権限とその説明を直接示します。

- クリスタル鉱石を採掘する（1回あたり最大1000単位）
- 未採掘のクリスタル鉱石を観察する（総量を確認）
- 状況報告 （現在所有しているリソースの数量を報告）
- エイモンの戦力を偵察する（必要なゼアロットの数を計算）
- パイロンを建設する（各パイロンは10の生産能力単位と100のクリスタルを提供）
- ゼアロットを生産する（各ゼアロットは2の生産能力単位と100のクリスタルを消費）
- エイモンを攻撃する（勝利なきならば、死を！）

### SA (主体-ロール割り当て)

> 主体-ロールおよびロール-権限の多対多関係は、Pythonのタプルデータ構造で表現します。実装でも同様であり、したがって本アプリケーションではデータベースを使用しません。

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (ロール-権限割り当て)

```python
role_permission = (('archon', 'get_status'),
                   ('archon', 'for_aiur'),
                   ('archon', 'scout'),
                   ('crystal_collector', 'get_crystal'),
                   ('crystal_collector', 'crystal_status'),
                   ('pylon_transporter', 'get_status'),
                   ('pylon_transporter', 'transport_pylon'),
                   ('portal', 'transport_zealot'),
                   ('portal', 'get_status'))
```

## 実装

[リポジトリURL](https://github.com/Thrimbda/my-life-for-Aiur)

[オンラインデプロイ](https://my-life-for-aiur.herokuapp.com/)（速度が遅い）

### 概要

全体として、PythonのFlaskフレームワークを使用してRESTfulスタイルのサービスを記述しました。アプリケーション全体はフロントエンド部分を含まないため、フロントエンドをバイパスするなどのセキュリティ問題も存在しません。

まず、このデモの特徴はデータベースを使用していない点です。RBACはデータベースの使用を強制するものではなく、RBACでデータベースを使用することは直感的で自然なことです。しかし、**「エイアーのために」** ではデータベースを使用せず、ファイル形式でRBACの `主体-ロール-権限` 関係を表現します。データベース自体はファイルシステムの上に発展してきたものであり、ここでファイルを採用するのは、システムが十分に単純であり、問題を説明するためにシステムの複雑さをさらに低減するためです。具体的なファイル形式は上記のSA、PA関係の説明を参照してください。

### RESTfulについて

ここで簡単にRESTful(**Re**presentational **S**tate **T**ransfer)について触れておきます。

名前が示す通り、（リソースの）表現層状態転送です。

Webサービスにおいて、提供されるサービスはシステムのリソースであり、URIの形式で表現されます。そしてサービスの形式はリソースに対する操作（状態転送）であり、HTTP動詞の形式で表現されます。これらの概念は、RBACにおけるリソースと操作にうまく対応させることができます。したがって、私が行うべきことは、RESTにおけるリソースへの操作にRBACの権限管理を適用することです。

### RBACにおける各オブジェクト

上記2つの設定ファイルから、SAとPA以外に、S、R、Pを暗黙的に求めることができます：

```python
# 上記のタプル subject_role からS、Rリストを求める
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

そしてSEは、Webアプリケーションにおけるセッションと非常によく対応し、主体が1回のログイン中に持つ一時的なオブジェクトとして機能します：

```python
# 主体がアラクの矛戦術管理システムのAPIにログインするために使用します。ここではセッションはFlaskのグローバルオブジェクトとして、その実装の詳細は省略します。
class SpearOfAdun(Resource):
    
    def post(self):
        args = self.putparser.parse_args()
        if args['subject'] is not None:
            abortInvalideSubject(args['subject'])
        if args['role'] is not None:
            abortInvalideRole(args['role'])
        checkRole(args['subject'], args['role'], subject_role)
        session['subject'] = args['subject']
        session['role'] = args['role']
        return {'message': 'login as %s using %s' % (session['subject'], session['role'])}, 201
```

主体-ロールのモデリングは、最終的には権限を分離して割り当て、システム内のリソースが適切に使用され保護されるようにするためです。

**「エイアーのために」** では、権限をWeb APIの内部属性として扱います。例：

```python
# ゼアロットを転送するためのAPI
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # 権限
        abortIfSubjectUnauthenticated(session) # ログイン認証
        checkPermission(session['role'], permission, role_permission) # このロールにおける主体がこの権限を要求できるか確認
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

そして、上記で例として挙げた2つのAPIでは、各クラスがシステム内の1つのリソースとして存在し、提供されるHTTPメソッドはリソースに対する操作となります。

**これで、RBACにおける各種オブジェクトが揃いました。**

### ビジネスロジック

**「エイアーのために」** は実際にプレイ可能なオンラインリアルタイムストラテジーゲームのAPIであるため、そのビジネスロジックについて説明する必要があります：

プレイヤーの目標は：**資源を集め、基地を建設し、そして敵を震え上がらせる部隊を作り出し、暗黒者エイモンを打ち負かすことです。**

エイモンを倒す唯一の条件は、十分な数のゼアロット(zealot)を所有することであり、この数はシステムがランダムに生成する20から100の整数です。同時に、システムはこのデータに基づいて、ちょうどエイモンを倒すのに十分な未採掘クリスタル鉱石を生成します。

**なぜちょうど十分な量なのか？**

ゼアロットを転送するには十分な数のクリスタルエネルギーとクリスタル鉱石が必要であり、エネルギーを供給するパイロンの生産にもクリスタル鉱石の消費が必要です。したがって、もしパイロンを建てすぎると、クリスタルエネルギーは十分でも、**ゼアロットを転送するための十分なクリスタル鉱石がなくなり、宇宙全体の運命をかけたこの戦いに敗北することになります。**

そして、この一連のロジックは、戦闘全体のライフサイクルにまたがる1つのオブジェクトによって提供されます。問題を防ぐために、各操作がアトミックであることを保証するスレッドロックを追加しました。

```python
# これがゲーム全体の核であるため、私はこれをネクサス(Nexus)と呼びます。
import random
from threading import Lock


class Nexus(object):
    _lock = Lock()
    crestalInControl = None
    crestalRemain = None
    populationCap = None
    zealot = None
    status = {}
    _amond = None

    def __init__(self):
        # オブジェクトを初期化
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # クリスタル鉱石を採掘
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # ゼアロットを転送
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # パイロンを建設
        with self._lock:
            available = self.crestalInControl / 100
            amount = min(amount, available)
            self.populationCap += amount * 10
            self.crestalInControl -= amount * 100
            return amount

    def forAiur(self):
        # エイアーのために戦え！
        with self._lock:
            if self.zealot >= self._amond:
                return True
            else:
                return False

    def getStatus(self, role):
        # ステータスを取得
        if role == 'archon':
            return {
                'crestalInControl': self.crestalInControl,
                'crestalRemain': self.crestalRemain,
                'populationCap': self.populationCap,
                'zealot': self.zealot
            }
        elif role == 'pylon_transporter':
            return {
                'crestalInControl': self.crestalInControl,
                'populationCap': self.populationCap
            }
        elif role == 'portal':
            return {
                'crestalInControl': self.crestalInControl,
                'populationCap': self.populationCap,
                'zealot': self.zealot
            }
        else:
            return {}


nexus = Nexus() # オブジェクトをインスタンス化
```

## 結び

実際、StarCraft IIというゲームは、各戦局において典型的なDACモデルです：プレイヤーが全てを支配し、ゲーム内の全ての操作は、クリスタル鉱石と高エネルギー瓦斯（ここでは簡略化されています）という2つの基本リソースを状態変換し、プレイヤーが必要とするリソース（生産ユニット、戦闘ユニット）とし、敵のリソースを消費して戦局を勝利に導くものと見なすことができます。これはRESTfulサービスの思想が非常に普遍的であることを示しています。

**「エイアーのために」** という小さなゲームでは、いくつかのロールを固定化し、1つのRBACモデルを構築しました。

この実践を通じて、システムにおけるRBACの応用を理解し、さらにこの素晴らしいフレームワークであるFlaskについて学び、RESTful思想をより深く理解することができ、多くの収穫がありました。
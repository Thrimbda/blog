---
"title": "RBACデモ：我が命、エイアーに捧ぐ"
"summary": "本稿では、「我が命、エイアーに捧ぐ」と名付けられたRBAC実践デモを紹介します。このデモは、PythonのFlaskフレームワークを用いて構築されたRESTfulサービスであり、『スタークラフト』ゲーム内のリソース管理とロールベースの権限制御をシミュレートしています。本稿では、デモ内の主体、ロール、リソース、権限の設計を詳細に分析し、コード例を通じてRBACモデルにおけるSA（主体-ロール）関係とPA（ロール-権限）関係の実装方法を示します。さらに、RBACをRESTfulアーキテクチャと組み合わせる方法、およびデモのビジネスロジックと実装の詳細について説明します。最後に、この実践を通じて得られたRBAC、Flaskフレームワーク、RESTful思想に関する理解と学びをまとめています。"
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "システム設計"
  - "Python"
  - "権限管理"
  - "スタークラフト"
  - "デモ"
"date": "2017-05-11"
---

---
title: RBACデモ：我が命、エイアーに捧ぐ
date: 2017-05-11
taxonomies:
  tags:
    - システム設計と分析
    - RESTful
    - RBAC
---

前回のRBACに関する理解に基づき、また課題の要件もあり、RBACの実践として簡単なデモを作成することにしました。

デモを巨大なものにする意図はなく、問題を説明することを目的としているため、やはり「小さくとも、必要な要素は全て揃っている」状態を目指します。

では、このデモの目的は何でしょうか？ 何ができるのでしょうか？

<!--more-->

## 分析と設計

面白さを保ちつつ問題を十分に反映させるため、このデモでは大幅に簡略化された、各ユニットが奇跡的に主体性を持った『スタークラフト』の戦況において、プロトスプレイヤーが直面するシナリオをシミュレートします。

良いデモには良い名前が必要です。そこで、このデモの名前は **「我が命、エイアーに捧ぐ！」** とします（エイアーはプロトスの母星であり、各ゼアロットが戦場に転送される際に「エイアーのために戦え！」という熱い言葉を発します）。

**「我が命、エイアーに捧ぐ」** では、味方の部隊を率いて十分な数のゼアロット戦士を生産し、破壊者エイモンを倒して宇宙全体を救うことが目標です。ゼアロットが足りなければ、敗北し、星々は囁き、万物は消滅します。

これら全ては、PythonのFlaskフレームワークで書かれたRESTfulサービスの中で表現されます。

> 実際のシナリオでは、プレイヤーを除く各主体は作成可能であり、したがってリソースと見なすことができます。RBACを体現するために、以下の制約を追加しました：
>
> - 本デモで提供されるいくつかの主体は唯一無二で常に存在するものとし、あたかもそれらが唯一無二であるかのように扱います。これにより、いかなる主体も再帰的に作成される可能性を排除します（例：プローブはネクサスを建設でき、ネクサスはプローブを生産できます）。
> - 実際にはゲートウェイは水晶塔のエネルギー供給なしでは動作しませんが、ここではその点は表現していません。我々のゲートウェイは、同期軌道上に位置するプロトスの伝説の母艦「アラクの矛」からのエネルギー供給を受けていると解釈し、水晶塔は人口上限を提供するリソースとしてのみ見なすことにします。

この戦況には以下のオブジェクトが存在します：

### 主体 (Subject)

- プレイヤー （あなた） thrimbda
- プローブ （基本作業ユニット、資源を採掘・生産し、建造物を建設できる） probe
- ゲートウェイ （ゼアロットを生産する、戦闘ユニット） gateway

#### ロール (Role)

- 執政官 （最高司令官、全てのリソースを配分する） archon
- クリスタル採掘者 （プローブのみがこの役割を担える） crystal_collector
- ゼアロット転送の拠点 （プロトス戦士の転送を支援するビーコン） portal
- パイロン建設者 （パイロンがあれば、ゼアロットを転送するための十分な人口上限を得られる） pylon_transporter

### リソース (Resource)

- 未採掘のクリスタル鉱石 （パイロン建設およびゼアロット転送に使用、初期値は不明）
- 採掘済みのクリスタル鉱石 （パイロン建設およびゼアロット転送に使用、初期値0）
- 生産能力 （転送に必要なエネルギー、いわゆる人口、初期値0）
- ゼアロット （戦闘ユニット、宇宙を救うために使用する戦士たち、初期値0）

### 権限 (Permission)

> リソースに対する各操作はそれぞれ権限となるため、ここでは操作を個別に列挙せず、権限とその説明を直接示します。

- クリスタル鉱石を採掘する（1回あたり最大1000単位）
- 未採掘のクリスタル鉱石を観察する（総量を確認）
- 状況報告 （現在所有しているリソースの数量を報告）
- エイモンの戦力を偵察する（必要なゼアロットの数を計算）
- パイロンを建設する（各パイロンは10単位の生産能力と100単位のクリスタルを提供）
- ゼアロットを生産する（各ゼアロットは2単位の生産能力と100単位のクリスタルを消費）
- エイモンを攻撃する（勝利なき戦いは死を意味する！）

### SA (主体-ロール関係)

> 主体-ロールおよびロール-権限の多対多関係は、Pythonのタプルデータ構造で表現します。実装でも同様であり、したがって本アプリケーションではデータベースを使用しません。

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (ロール-権限関係)

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

[オンラインデプロイ](https://my-life-for-aiur.herokuapp.com/)（速度が遅い場合があります）

### 概要

全体として、PythonのFlaskフレームワークを使用してRESTfulスタイルのサービスを記述しました。フロントエンド部分は含まないため、フロントエンドを迂回するなどのセキュリティ問題も存在しません。

まず、このデモの特徴はデータベースを使用していない点です。RBACはデータベースの使用を強制するものではなく、RBACでデータベースを使用することは直感的で自然なことです。しかし、**「我が命、エイアーに捧ぐ」** ではデータベースを使用せず、ファイル形式でRBACの `主体-ロール-権限` 関係を表現します。データベース自体がファイルシステムの上に発展してきたものであり、ここでファイルを採用する理由は、システムが十分に単純であり、問題を説明するためにシステムの複雑さをさらに低減するためです。具体的なファイル形式は、前述のSA、PA関係の説明を参照してください。

### RESTfulについて

ここで簡単にRESTful (**Re**presentational **S**tate **T**ransfer) について触れておきます。

名前が示す通り、（リソースの）表現層状態遷移です。

Webサービスにおいて、提供されるサービスはシステムのリソースであり、URIの形式で表現されます。そして、サービスの形式はリソースに対する操作（状態遷移）であり、HTTP動詞の形式で表現されます。これらの概念は、RBACにおけるリソースと操作とよく対応するため、私が行うべきことは、RESTにおけるリソース操作にRBACの権限管理を適用することです。

### RBACにおける各オブジェクト

上記2つの設定ファイルから、SAとPA以外に、S、R、Pを暗黙的に求めることができます：

```python
# 上記のタプル subject_role からS、Rリストを求める
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

また、SEはWebアプリケーションにおけるセッションとよく対応し、主体が1回のログイン中に持つ一時的なオブジェクトとして機能します：

```python
# 主体がアラクの矛戦術管理システムのAPIにログインするために使用する。ここではセッションはFlaskのグローバルオブジェクトとしており、その実装の詳細は割愛する。
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

主体-ロールのモデリングは、最終的には権限を分離して割り当て、システム内のリソースが適切に使用・保護されるようにするためのものです。

**「我が命、エイアーに捧ぐ」** では、権限をWeb APIの内部属性として扱っています。例：

```python
# ゼアロットを転送するためのAPI
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # 権限
        abortIfSubjectUnauthenticated(session) # ログイン認証
        checkPermission(session['role'], permission, role_permission) # このロールにおける主体がこの権限をリクエストできるか確認
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

上記で例示した2つのAPIにおいて、各クラスはシステム内のリソースとして存在し、提供されるHTTPメソッドはリソースに対する操作となります。

**これで、RBACにおける各種オブジェクトが揃いました。**

### ビジネスロジック

**「我が命、エイアーに捧ぐ」** は実際に遊べるオンラインリアルタイムストラテジーゲームのAPIであるため、そのビジネスロジックについて説明する必要があります：

プレイヤーの目標は：**資源を集め、基地を建設し、そして敵を震え上がらせる部隊を作り出して、暗黒の者エイモンを打ち負かすことです。**

エイモンを倒す唯一の条件は、十分な数のゼアロットを所有することであり、この数はシステムがランダムに生成する20から100の整数です。同時に、システムはこのデータに基づいて、エイモンを倒すのにちょうど十分な量の未採掘クリスタル鉱石を生成します。

**なぜちょうど十分な量なのか？**

ゼアロットを転送するには十分な量の水晶エネルギーとクリスタル鉱石が必要であり、エネルギーを供給するパイロンの建設にもクリスタル鉱石の消費が必要です。したがって、もしパイロンを建設しすぎると、水晶エネルギーは足りていても、**ゼアロットを転送するための十分なクリスタル鉱石がなくなり、宇宙の運命をかけたこの戦いに敗北することになります。**

この一連のロジックは、戦闘全体のライフサイクルを持つオブジェクトによって提供されます。問題を防ぐため、各操作がアトミックであることを保証するスレッドロックを追加しました。

```python
# ゲーム全体の核となるため、これをネクサス (Nexus) と呼ぶ
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
        # オブジェクトの初期化
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
        # 状態を取得
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


nexus = Nexus() # オブジェクトのインスタンス化
```

## 結語

実際、『スタークラフトII』というゲームは、各戦局において典型的なDACモデルです：プレイヤーが全てを支配し、ゲーム内の全ての操作は、クリスタル鉱石と高エネルギー瓦斯（ここでは簡略化されています）という2つの基本リソースを状態変換し、プレイヤーが必要とするリソース（生産ユニット、戦闘ユニット）に変え、敵のリソースを消費して戦局を有利に進めることと見なせます。これは、RESTfulサービスの思想が非常に普遍的であることを示しています。

**「我が命、エイアーに捧ぐ」** という小さなゲームでは、いくつかのロールを固定化し、RBACモデルを構築しました。

この実践を通じて、システムにおけるRBACの応用を理解し、さらに素晴らしいフレームワークであるFlaskについて学び、RESTful思想についてより深く理解することができ、多くの収穫がありました。
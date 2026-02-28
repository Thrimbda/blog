---
title: RBACデモ：エイアーのために
date: 2017-05-11
taxonomies:
  tags:
    - システム設計と分析
    - RESTful
    - RBAC
---

前回の記事でRBACについて理解を深めたことに加え、課題の要件もあり、RBACの実践としてシンプルなデモを開発することにしました。

このデモを巨大なものにする意図はなく、問題を明確に説明することを目的としています。そのため、いわゆる「麻雀は小さいが、五臓六腑は揃っている」状態を目指します。

では、このデモの目的は何でしょうか？何ができるのでしょうか？

<!--more-->

## 分析と設計

興味深く、かつ問題を十分に反映させるために、このデモでは大幅に簡略化された、各ユニットが奇跡的に主体性を持った『スタークラフト』の戦況をシミュレートします。プレイヤーはプロトス（星霊）の指揮官として、以下のシナリオに立ち向かいます。

良いデモには良い名前が必要です。そこで、このデモの名前は **「エイアーのために！」** とします（エイアーはプロトスの母星であり、各ゼアロットが戦場に転送される際に「エイアーのために戦え！」という熱い言葉を発します）。

**「エイアーのために」** では、自軍を率いて十分な数のゼアロット戦士を生産し、破壊者エイモンを倒して宇宙を救うことが目標です。ゼアロットが足りなければ、敗北し、星々は囁き、万物は消滅します。

これらすべては、PythonのFlaskフレームワークで書かれたRESTfulサービスとして実現されます。

> 実際のゲームでは、プレイヤーを除くすべての主体（ユニット/建造物）が作成可能な「リソース」と見なせます。しかし、RBACを体現するために、以下の制約を設けました：
>
> - 本デモで提供されるいくつかの主体は唯一無二で常に存在するものとします。これにより、いかなる主体も再帰的に作成される可能性を排除します（例：プローブはネクサスを建造でき、ネクサスはプローブを生産できる、といった循環）。
> - 実際にはゲートウェイ（転送門）はパイロン（水晶塔）のエネルギー供給が必要ですが、ここではその点は表現しません。これは、我々のゲートウェイが同期軌道上に位置する伝説の母艦「アラクの矛」のエネルギー支援を受けていると解釈し、パイロンは人口上限（供給）を提供するリソースとしてのみ扱います。

この戦況には以下のオブジェクトが存在します：

### 主体 (Subject)

- プレイヤー （あなた） thrimbda
- プローブ （基本作業ユニット、資源採集や建造が可能） probe
- ゲートウェイ （ゼアロットという戦闘ユニットを生産） gateway

#### 役割 (Role)

- 執政官 （最高司令官、あらゆる資源を配分） archon
- クリスタル採掘者 （プローブのみが担当可能） crystal_collector
- ゼアロット転送ハブ （星霊戦士を転送するためのビーコン） portal
- パイロン建造者 （パイロンがあれば、ゼアロットを転送するための十分な人口上限を得られます） pylon_transporter

### リソース (Resource)

- 未採掘のクリスタル鉱床 （パイロン建造およびゼアロット転送に使用、初期値は不明）
- 採掘済みクリスタル （パイロン建造およびゼアロット転送に使用、初期値0）
- 供給 （転送に必要なエネルギー、いわゆる人口、初期値0）
- ゼアロット （戦闘ユニット、宇宙を救うために必要な戦士たち、初期値0）

### 権限 (Permission)

> リソースに対する各操作がそれぞれ権限に対応するため、ここでは操作を個別に列挙せず、権限とその説明を直接記載します。

- クリスタル採掘 （1回あたり最大1000単位まで採掘可能）
- 未採掘クリスタルの観測 （総量の確認）
- 状態報告 （現在所有しているリソースの数量を報告）
- エイモンの戦力偵察 （必要なゼアロット数を計算）
- パイロン建造 （各パイロンは10の供給単位と100のクリスタルを提供）
- ゼアロット生産 （各ゼアロットは2の供給単位と100のクリスタルを消費）
- エイモンへの攻撃 （勝利なきものは死を！）

### SA (主体-役割 割り当て)

> 主体-役割および役割-権限の多対多関係は、Pythonのタプルデータ構造で表現します。実装でも同様であり、本アプリケーションではデータベースを使用しません。

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (役割-権限 割り当て)

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

全体として、PythonのFlaskフレームワークを使用してRESTfulスタイルのサービスを開発しました。フロントエンド部分は含まないため、フロントエンドを介さないセキュリティ問題も存在しません。

このデモの特徴の一つは、データベースを使用していない点です。RBACはデータベースの使用を強制するものではなく、RBACでデータベースを使用することは直感的で自然なことです。しかし、**「エイアーのために」** ではデータベースを使用せず、ファイル形式でRBACの `主体-役割-権限` 関係を表現しています。データベース自体がファイルシステムの上に発展してきたものであり、ここでファイルを採用した理由は、システムが十分にシンプルであり、問題を説明するためにシステムの複雑さをさらに低減するためです。具体的なファイル形式は、前述のSA、PA関係の説明を参照してください。

### RESTfulについて

ここで簡単にRESTful (**Re**presentational **S**tate **T**ransfer) について触れておきます。

その名の通り、（リソースの）表現層状態遷移です。

Webサービスにおいて、提供されるサービスはシステムのリソースであり、URIの形式で表現されます。また、サービスの形式はリソースに対する操作（状態遷移）であり、HTTP動詞の形式で表現されます。これらの概念は、RBACにおけるリソースと操作と非常によく対応しています。したがって、私が行うべきことは、RBACの権限管理をRESTにおけるリソース操作に適用することです。

### RBACにおける各オブジェクト

上記2つの設定ファイルから、SAとPA以外に、S、R、Pを暗黙的に求めることができます：

```python
# 上記のタプル subject_role からS、Rリストを求める
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

また、SE (セッション) は、Webアプリケーションにおけるセッションと非常によく対応し、主体が一度のログイン中に持つ一時的なオブジェクトとして機能します：

```python
# 主体が「アラクの矛」戦術管理システムのAPIにログインするために使用します。ここでのsessionはFlaskのグローバルオブジェクトとして、その実装詳細は割愛します。
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

主体-役割のモデリングは、最終的には権限を分離して割り当て、システム内のリソースが適切に使用・保護されるようにするためです。

**「エイアーのために」** では、権限をWeb APIの内部属性として扱っています。例：

```python
# ゼアロットを転送するためのAPI
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # 権限
        abortIfSubjectUnauthenticated(session) # ログイン認証
        checkPermission(session['role'], permission, role_permission) # この役割における主体がこの権限をリクエストできるか確認
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

上記で例示した2つのAPIにおいて、各クラスはシステム内の1つのリソースとして存在し、提供されるHTTPメソッドはリソースに対する操作となります。

**これで、RBACの各種オブジェクトが揃いました。**

### ビジネスロジック

**「エイアーのために」** は実際に遊べるオンラインリアルタイムストラテジーゲームのAPIであるため、そのビジネスロジックについて説明する必要があります：

プレイヤーの目標は：**資源を集め、基地を建造し、敵を震え上がらせる部隊を作り出して、闇の者エイモンを倒すことです。**

エイモンを倒す唯一の条件は、十分な数のゼアロットを所有することです。この数はシステムがランダムに生成する20から100の整数であり、同時にシステムはこの数値に基づいて、エイモンを倒すのにちょうど十分な量の未採掘クリスタルを生成します。

**なぜ「ちょうど十分」なのか？**

ゼアロットを転送するには十分な量の水晶エネルギー（供給）とクリスタルが必要であり、エネルギーを供給するパイロンの建造にもクリスタルを消費します。したがって、もしパイロンを建造しすぎると、水晶エネルギーは足りていても、**ゼアロットを転送するためのクリスタルが不足し、宇宙の運命をかけたこの戦いに敗北することになります**。

この一連のロジックは、戦闘全体のライフサイクルを持つ1つのオブジェクトによって提供されます。問題を防ぐため、各操作がアトミックであることを保証するスレッドロックを追加しました。

```python
# これがゲームの核となるため、私はこれをネクサス (Nexus) と呼びます
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
        # クリスタル採掘
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # ゼアロット転送
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # パイロン建造
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
        # 状態の取得
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

## 結び

実際、『スタークラフトII』というゲームは、各戦闘が典型的なDAC（自主アクセス制御）モデルです：プレイヤーがすべてを支配し、ゲーム内のすべての操作は、クリスタルと高エネルギー瓦斯（ここでは簡略化されています）という2つの基本リソースを状態変換し、プレイヤーが必要とするリソース（生産ユニット、戦闘ユニット）に変え、敵のリソースを消費して戦闘に勝利するものと見なせます。これは、RESTfulサービスの思想が非常に普遍的であることを示しています。

**「エイアーのために」** という小さなゲームでは、いくつかの役割を固定化し、RBACモデルを構築しました。

この実践を通じて、システムにおけるRBACの応用を理解し、さらにFlaskという素晴らしいフレームワークについて学び、RESTfulの思想をより深く理解することができ、多くの収穫がありました。
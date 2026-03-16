# cone-scroll

`cone-scroll` は、Zola 向けのブログテーマです。当初は [anemone](https://github.com/Speyll/anemone) と [granda](https://granda.org) に触発されましたが、今日ではすっかり独自の姿へと変貌を遂げたため、独立したテーマとして切り出されました。

このテーマは、ブログをプロダクトのランディングページのように仕立てることも、ターミナルを模すことも望んでいません。より近い比喩を挙げるなら、丁寧に組版された索引ページと言えるかもしれません。温かみのある紙色の背景、少し狭めの本文カラム、静かで使いやすい目次、そしてあまり騒がしくない ASCII タイトルが特徴です。

カード、ヒーローセクション、グラデーショングロー、そしてすべての機能が一目でわかるホームページがお好みなら、このテーマはおそらく合わないでしょう。このテーマは「腰を据えて少し読む」ことに重きを置いています。

![Cone Scroll ライトテーマとダークテーマのスクリーンショット](./screenshot.svg)

記事ページが気になる方は、こちらの画像もご覧ください。左がライト、右がダークで、目次、メタ情報、本文カラムが画面に一緒に表示されます。

![Cone Scroll 記事ページのスクリーンショット](./screenshot-post.svg)

## 特徴

- 温かみのある紙/インクカラースキーム。ライトテーマとダークテーマを用意。
- 長文をゆっくり読み進めるのに適した、狭めのリーディング幅。
- カード式ではなく、索引スタイルのホームページ、アーカイブページ、タグページ。
- テキストベースのテーマ切り替え、RSS、タグ、サイドバー目次。
- `blog-page.html`、通常ページ、タグページ、ショートコード、少量のネイティブ JavaScript を内蔵。

## インストール

最も簡単な方法は、このディレクトリ全体をサイトの `themes/` フォルダにコピーすることです：

```bash
mkdir -p themes
cp -R path/to/cone-scroll themes/cone-scroll
```

次に、サイトの `config.toml` で有効にします：

```toml
theme = "cone-scroll"

title = "あなたのブログ"
description = "書きたいことを書く"
default_language = "zh"
generate_feeds = true

taxonomies = [{ name = "tags", feed = true }]

[extra]
author = "あなたの名前"
display_author = true
favicon = "favicon.ico"
default_theme = "light"
twitter_card = true

header_nav = [
  { url = "/blog", name_zh = "|ブログ|" },
  { url = "/diary", name_zh = "|日誌|" },
  { url = "/about", name_zh = "|このサイトについて|" },
]
```

多言語対応を有効にしている場合、ナビゲーション項目は既存のテンプレートの慣例に従い `name_<lang>` の形式（例：`name_zh`、`name_en`）で記述してください。

## ページの慣例

ブログ記事と日誌記事の両方にテーマ内の記事テンプレートを使用したい場合は、対応するセクションで以下のように記述します：

```toml
+++
title = "ブログアーカイブ"
sort_by = "date"
page_template = "blog-page.html"
+++
```

長文記事は、見出し階層がある場合、デフォルトで目次を表示します。手動で無効にしたい場合は、ページの front matter に以下のように記述します：

```toml
[extra]
toc = false
```

## 独自のこだわりを持つデフォルト設定

これは「そのままですべてのブログ形態に対応できる」ことを追求するテーマではなく、いくつか明確な好みがあります：

- デフォルトのシェル文言は中国語圏の文脈に寄っており、中国語サイトの立ち上げに適しています。
- ホームページ、アーカイブ、タグページは「索引感」を重視し、要約カードの壁ではありません。
- `blog-page.html` には giscus のマウントコードが含まれています。使用しない場合は、削除するか、自身の設定に置き換えてください。
- テーマ自体は favicon を提供しません。サイト独自の `favicon.ico` をルートの `static/` フォルダに配置し、`config.extra.favicon` で指定してください。

## ディレクトリ構造

テーマ本体はシンプルです：

```text
cone-scroll/
├── theme.toml
├── README.md
├── screenshot.svg
├── templates/
└── static/
```

ビルドチェーンや追加のパッケージング手順はありません。ほとんどの要素はテンプレート、CSS、そして小さな `script.js` 内にあります。

## ライセンス

MIT。
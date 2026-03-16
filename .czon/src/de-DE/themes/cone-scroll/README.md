# cone-scroll

`cone-scroll` ist ein Blog-Theme für Zola. Ursprünglich inspiriert von [anemone](https://github.com/Speyll/anemone) und [granda](https://granda.org), hat es sich heute zu einem völlig anderen Theme entwickelt und wird daher nun separat bereitgestellt.

Es möchte keinen Blog wie eine Produktlandingpage gestalten und auch nicht so tun, als wäre es ein Terminal. Eine passendere Metapher ist vielleicht eine sorgfältig gesetzte Indexseite: warmes Papierfarben-Hintergrund, eine etwas schmalere Textspalte, eine unaufdringliche aber nützliche Inhaltsübersicht und ein nicht zu lauter ASCII-Titel.

Wenn du Karten, Hero-Bereiche, Farbverläufe und eine Homepage magst, auf der man alle Funktionen auf einen Blick sieht, dann ist es wahrscheinlich nichts für dich. Es ist eher auf "Setz dich hin und lies eine Weile" ausgelegt.

![Cone Scroll light and dark screenshot](./screenshot.svg)

Wenn du dich mehr für die Artikelansicht interessierst, sieh dir dieses Bild an. Links der helle Modus, rechts der dunkle Modus. Inhaltsverzeichnis, Metadaten und Textspalte erscheinen gemeinsam im Bild.

![Cone Scroll post screenshot](./screenshot-post.svg)

## Was es bietet

- Warme Papier/Tinte-Farbpalette mit hellen und dunklen Themes
- Verengte Lesebreite, geeignet für lange Artikel, die man in Ruhe durchliest
- Index-ähnliche Homepage, Archiv- und Tag-Seiten, keine Karten-Ansicht
- Textbasierte Theme-Umschaltung, RSS, Tags, Seitenleiste für das Inhaltsverzeichnis (TOC rail)
- Enthält `blog-page.html`, normale Seiten, Tag-Seiten, Shortcodes, etwas natives JavaScript

## Installation

Der einfachste Weg ist, dieses gesamte Verzeichnis in das `themes/`-Verzeichnis deiner Site zu kopieren:

```bash
mkdir -p themes
cp -R path/to/cone-scroll themes/cone-scroll
```

Aktiviere es dann in der `config.toml` deiner Site:

```toml
theme = "cone-scroll"

title = "Dein Blog"
description = "Schreibe, worüber du schreiben möchtest"
default_language = "zh"
generate_feeds = true

taxonomies = [{ name = "tags", feed = true }]

[extra]
author = "Dein Name"
display_author = true
favicon = "favicon.ico"
default_theme = "light"
twitter_card = true

header_nav = [
  { url = "/blog", name_zh = "|Blog|" },
  { url = "/diary", name_zh = "|Tagebuch|" },
  { url = "/about", name_zh = "|Über|" },
]
```

Wenn du Mehrsprachigkeit aktiviert hast, schreibe die Navigationseinträge gemäß der Vorlagenkonvention als `name_<lang>`, z.B. `name_zh`, `name_en`.

## Seitenkonventionen

Wenn du möchtest, dass Blog-Artikel und Tagebuch-Einträge beide die Artikelvorlage des Themes verwenden, kannst du in der entsprechenden Section folgendes schreiben:

```toml
+++
title = "Blog-Archiv"
sort_by = "date"
page_template = "blog-page.html"
+++
```

Lange Artikel zeigen standardmäßig ein Inhaltsverzeichnis (TOC) an, wenn Überschriftenebenen vorhanden sind. Wenn du es manuell deaktivieren möchtest, kannst du im Front Matter der Seite schreiben:

```toml
[extra]
toc = false
```

## Standardwerte mit etwas Charakter

Dies ist kein Theme, das "sofort alle Blog-Formate abdecken" möchte. Es hat einige klare Vorlieben:

- Standardtextbausteine sind auf den chinesischen Sprachraum ausgerichtet, geeignet für chinesische Seiten zum direkten Start
- Homepage, Archiv und Tag-Seiten betonen das "Index-Gefühl", keine Kartenwand mit Zusammenfassungen
- `blog-page.html` enthält einen Code-Abschnitt zum Einbinden von giscus; wenn du es nicht verwendest, lösche ihn einfach oder ersetze ihn durch deine eigene Konfiguration
- Das Theme selbst stellt kein Favicon bereit. Bitte platziere dein eigenes `favicon.ico` im Stammverzeichnis `static/` und verweise in `config.extra.favicon` darauf

## Verzeichnisstruktur

Das Theme selbst ist einfach:

```text
cone-scroll/
├── theme.toml
├── README.md
├── screenshot.svg
├── templates/
└── static/
```

Keine Build-Chain, keine zusätzlichen Bundling-Schritte. Die meisten Dinge befinden sich in den Templates, im CSS und in einem kleinen `script.js`.

## Lizenz

MIT.
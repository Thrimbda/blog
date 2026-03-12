---
title: Die Entwicklungsbahn von Legion: Vom Aufgabenprotokoll zum Multi-Agenten-Engineering-Betriebssystem
date: 2026-03-08
---

## Einleitung

Dieses Dokument möchte eine Frage beantworten, die ich selbst ständig reflektiere: Wie habe ich es geschafft, Legion von einer fast leeren Idee Schritt für Schritt zu dem relativ ausgereiften Multi-Agenten-Engineering-Kollaborationssystem zu entwickeln, das es heute ist?

Diese Analyse basiert hauptsächlich auf vier Arten von Material:

- Die Git-Historie des `.legion/`-Verzeichnisses im Yuan-Repository
- Der aktuelle Zustand von `.legion/config.json` und `.legion/ledger.csv`
- Eine Reihe repräsentativer Artefakte von Tasks, Reviews, RFCs und Reports
- Der in meinem Blogbeitrag "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" bereits klar formulierte Denkrahmen

Wenn ich zuerst eine einzeilige Schlussfolgerung geben müsste, dann wäre es diese:

> Legion war kein von Anfang an vollständig entworfenes System, sondern wurde unter dem Druck realer Aufgaben Stück für Stück durch Probleme wie "Kontextmanagement, implizites Wissen, Design-Gates, Validierungskosten, Berichtskosten" herausgefordert. Es begann ursprünglich nur damit, dass der Agent nichts vergessen sollte, und entwickelte sich allmählich zu einem Engineering-System, das die Arbeit mehrerer Agenten regelt.

---

## 1. Zuerst der aktuelle Stand: Wie sieht Legion heute aus?

Wenn wir den Ausgangspunkt zunächst außer Acht lassen und nur den heutigen Zustand betrachten, ist Legion offensichtlich kein loses Notizverzeichnis mehr.

Vom aktuellen Zustand des `.legion`-Verzeichnisses im Yuan-Repository aus betrachtet:

- Es gibt derzeit 34 Tasks.
- Die Statusverteilung ist ungefähr: 9 `archived`, 23 `paused`, 2 `active`.
- In `.legion/ledger.csv` gibt es bereits 2498 Audit-Einträge.
- Die häufigsten Aktionen sind `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- Die aktuelle Task-Erstellungsstrategie ist [`agent-with-approval`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json), d.h. komplexe Tasks werden standardmäßig zuerst vorgeschlagen, dann genehmigt und erst dann ausgeführt.

Zusammengenommen verfügt Legion heute mindestens über fünf stabile Fähigkeiten:

1.  **Task-Persistenz**: Aufgabenziele, Kontext und Fortschritt existieren nicht mehr nur in der Sitzung.
2.  **Design-Gates**: Komplexe Tasks können nicht einfach so begonnen werden, es muss zuerst einen Plan, eine RFC oder einen Vorschlag geben.
3.  **Review-Schleife**: Kommentare sind nicht nur Chat, sondern strukturierte Review-Punkte mit Status.
4.  **Artefakte für Nachvollziehbarkeit**: Viele Tasks produzieren zuverlässig RFCs, Reviews, Test Reports, Walkthroughs, PR-Bodies.
5.  **Audit und Governance**: Das System weiß, wann wer welche Entscheidung getroffen hat, welche Phase vorangetrieben oder welches Review geschlossen wurde.

Wenn man es auf die im Blog beschriebene Pipeline komprimiert, sieht es schon sehr ähnlich aus:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Das heißt, Legion ist heute kein "Notizsystem zur Unterstützung beim Programmieren" mehr, sondern eine "Protokollschicht für die Kollaboration mehrerer Agenten".

---

## 2. Phase 1: Zuerst die Aufgaben aus dem Kopf holen

Der Ausgangspunkt von Legion war eigentlich sehr schlicht.

Aus der Git-Historie geht hervor, dass der erste explizite Workflow, der `.legion` in das Repository einführte, [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) war.

Die drei wichtigsten Bestandteile dieser ersten Phase waren:

- [`plan.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
- [`context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md)
- [`tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/tasks.md)

Diese drei Dateien wurden später fast zum Skelett von Legion.

### 1. `plan.md` löst "Was ist zu tun?"

In [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) war `plan.md` nicht mehr nur ein To-do wie "Quote-Service für alle Vendor ergänzen", sondern enthielt klar:

- Ziel
- Hintergrund und Motivation
- Nicht-Ziele
- Umfang
- Phasenplanung
- Vertragszusammenfassung
- Vendor-spezifisches Design

Dieser Schritt ist entscheidend, denn er bedeutet, dass Legion von Anfang an nicht einfach eine To-do-Liste war, sondern ein leichtgewichtiger Design-Index.

### 2. `context.md` löst "Was ist passiert, warum wurde das so gemacht?"

In [`implement-quote-service/context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md) sind bereits einige der später sehr zentralen Fähigkeiten von Legion zu erkennen:

- Wichtige Dateien protokollieren
- Wichtige Entscheidungen protokollieren
- Validierungsergebnisse protokollieren
- Schnelle Übergabe ermöglichen

Mit anderen Worten, `context.md` übernahm von Anfang an die Aufgabe, "das zu ersetzen, was ich mir gerade im Kopf zurechtgelegt hatte".

### 3. `tasks.md` löst "Wo stehen wir gerade?"

Sobald die Arbeit mit mehreren Agenten oder mehreren Sitzungsrunden beginnt, geht oft nicht zuerst der Code verloren, sondern der Fortschrittsstatus.

Die Bedeutung von `tasks.md` liegt darin:

- Phasen aufzuteilen
- Den aktuellen Task zu markieren
- Neu entdeckte Tasks hinzuzufügen
- Der nächsten Gesprächsrunde einen schnellen Wiedereinstieg zu ermöglichen

Die erste Phase von Legion löst also im Wesentlichen ein sehr praktisches Problem:

> Vergiss erstmal nichts. Lass die Tasks nicht verloren gehen, stell sicher, dass der Kontext wiederhergestellt werden kann, und sorge dafür, dass der Agent nicht nach der Ausführung alles vergisst.

Das deckt sich vollständig mit dem Ausgangspunkt, den ich im Blog beschrieben habe: Wenn parallele Arbeiten zunehmen, bricht zuerst die Fähigkeit des Menschen zum Kontextmanagement zusammen.

---

## 3. Phase 2: Vom Aufgabenprotokoll zur Externalisierung impliziten Wissens

Wenn Phase 1 hauptsächlich "Vergiss nicht, was gerade gemacht wird" löste, dann löst Phase 2 genau die "Mauer des impliziten Wissens", die ich im Blog speziell erwähnt habe.

### 1. Komplexe Aufgaben erzwingen den Review-Mechanismus

Ab Mitte/Ende Dezember 2025 tauchten in Legion-Plan-Dokumenten massenhaft `> [REVIEW]`-Blöcke auf. Typische Tasks waren:

- [`yuantsexchange-ohlcinterestrate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/yuantsexchange-ohlcinterestrate/plan.md)
- [`vendors-ingest-ohlc-interest-rate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendors-ingest-ohlc-interest-rate/plan.md)
- [`task-vex-queryquotes-swr`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-queryquotes-swr/plan.md)
- [`task-vex-quote-upstream-refactor`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-quote-upstream-refactor/plan.md)
- [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)

Diese Tasks haben etwas gemeinsam:

- Es sind keine Tasks mehr, die einfach durch "Anpassen eines bestehenden Musters" erledigt werden können.
- Sie betreffen alte Implementierungen, Entwicklungsgeschichte, lokale Best Practices und viele nicht offensichtliche Einschränkungen.
- Was die Ergebnisqualität wirklich bestimmt, ist oft nicht, ob das Modell Code schreiben kann, sondern ob es weiß, was übernommen werden muss und was nicht.

Zum Beispiel tauchen in einem Task wie [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md) in den Reviews immer wieder typische implizite Projektkenntnisse auf:

- Verweise nicht auf eine bestimmte bestehende Implementierung, weil diese selbst Probleme hat.
- Eine Einschränkung schien zunächst nicht nötig, wurde später neu bewertet und darf doch nicht entfernt werden.
- Codierungsregeln, Merge-Semantik, Scheduling-Fairness, Ratenbegrenzungsstrategien – das sind keine "Weltkenntnisse", die das Modell natürlich aus dem Code lernen kann, sondern projektintern gewachsenes Wissen.

Genau das entspricht der im Blog beschriebenen Unterscheidung:

- Ebene 1 ist, was der Nutzer diesmal gesagt hat;
- Ebene 2 sind die technischen Entscheidungen und lokalen Best Practices des Projekts selbst;
- Genau Ebene 2 ist es, die Agenten am ehesten scheitern lässt.

Die Rolle von Legion in dieser Phase bestand darin, Ebene 2 gewaltsam aufzuschreiben.

### 2. Kommentare verwandeln sich von "Chat" zu "Schnittstelle"

Das Wesentliche dieses Schritts ist nicht, dass die Anzahl der Kommentare zunimmt, sondern dass sich ihre Natur ändert.

Früher waren Kommentare eher temporäre Gespräche; in dieser Phase übernehmen Kommentare zunehmend diese Aufgaben:

- Designrichtung ändern
- Fehlersemantik ergänzen
- Over-Engineering entfernen
- Darauf hinweisen, welche alten Implementierungen nicht als Referenz dienen sollten
- Notwendige Engineering-Einschränkungen festhalten

Sobald diese Dinge in `plan.md` oder `context.md` landen, sind sie keine mündlichen Erinnerungen mehr, sondern werden Teil der Aufgabenrealität.

Die zweite Phase von Legion besteht also im Wesentlichen nicht mehr nur aus Task-Tracking, sondern tut etwas Wichtigeres:

> Implizites Wissen externalisieren.

Deshalb war ich später immer überzeugter: Ein externes Gehirn ist kein nettes Extra, sondern eine Notwendigkeit in komplexen Projekten.

---

## 4. Phase 3: Vom externen Gehirn zu Design-Gates

Als die Aufgaben immer komplexer wurden, reichte es nicht mehr, "Wissen nur aufzuschreiben". Das neue Problem wurde:

> Was, wenn mehrere Agenten zusammenarbeiten, aber die Richtung selbst falsch ist?

Hier trat Legion in die dritte Phase ein: Vom Protokollsystem zum Design-Gate-System.

### 1. RFCs und Specs werden Teil des Hauptprozesses

Ein typischer Wendepunkt war [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md).

In diesem Task war Legion offensichtlich nicht mehr "zuerst machen, dann aufschreiben", sondern "zuerst entwerfen, zuerst prüfen, zuerst das Gate passieren, dann machen".

Unter diesem Task erschienen bereits vollständige Design- und Validierungsartefakte:

- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/rfc.md)
- [`spec-dev.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-dev.md)
- [`spec-test.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-test.md)
- [`spec-bench.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-bench.md)
- [`spec-obs.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-obs.md)

Das bedeutet, Legion begann, komplexe Tasks in stabile Ebenen aufzuteilen:

1.  **RFC**: Zuerst die Absicht abgleichen
2.  **Dev/Test/Bench/Obs Spec**: Vorab klarstellen, wie validiert wird
3.  **Review**: Richtungsprobleme möglichst vor Arbeitsbeginn aufdecken
4.  **Implementierung und Validierung**: Günstige Prüfungen nach vorne verlagern
5.  **Bericht und PR-Artefakte**: Dienen der Abnahme, nicht dem "einfach Fertigstellen"

Das ist im Wesentlichen das im Blog beschriebene "Intent Alignment + Layered Verification".

### 2. Sicherheits- und Ressourcenprobleme treten als vorgelagerte Blockaden auf

In Tasks wie [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md) und [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) waren Reviews nicht mehr nur "Vorschläge", sondern enthielten explizit `blocking`.

Typische Probleme waren:

- SSRF-Risiken
- DoS-Risiken
- Nicht begrenzte Antwortkörpergröße
- Nebenläufigkeits- und Warteschlangenparameter nicht secure-by-default
- Ungenaue Grenzen von Umgebungsvariablen

Dieser Schritt ist wichtig, weil Legion eine neue Aufgabe übernahm:

> Nicht nur festhalten, "warum das so gemacht wurde", sondern auch "warum es jetzt noch nicht gemacht werden kann, es sei denn, diese Bedingungen werden zuerst erfüllt".

Das sind genau Design-Gates.

Im Blog schrieb ich, dass man bei Fehlschlägen in Multi-Agenten-Systemen instinktiv längere RFCs schreibt und strengere Reviews durchführt, um teure Fehler nach vorne zu verlagern. In dieser Phase institutionalisierte Legion genau diese instinktive Reaktion.

---

## 5. Meilenstein-Phase: Die HTTP-Proxy-Serie macht Legion wirklich engineering-tauglich

Wenn die vorherigen Phasen noch einen Hauch von "wachsend während der Arbeit" hatten, dann war die `http-proxy`-bezogene Task-Serie der erste echte Meilenstein der Reife von Legion.

Das deckt sich auch mit meinem Gefühl aus dem Blog: Die `http-proxy`-Tasks über mehrere Projekte hinweg waren der Punkt, an dem ich deutlich spürte: "Ich kann mich weitgehend aus der Codierung zurückziehen und nur wenige Review-Kommentare hinterlassen."

### 1. Es war kein Einzel-Task, sondern ein Task-Cluster

Zugehörige Tasks umfassten mindestens:

- [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
- [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
- [`vendor-http-services-rollout`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-http-services-rollout/plan.md)
- [`http-proxy-metrics` (landete in `rfc-metrics.md`)](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/docs/rfc-metrics.md)
- [`http-services-terminalinfos-ready`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-services-terminalinfos-ready/plan.md)
- [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)

Das zeigt, dass Legion zu diesem Zeitpunkt nicht mehr nur "eine Funktion fertigstellen" unterstützte, sondern:

- Zuerst eine Basisbibliothek erstellen
- Dann die Anwendungsschicht
- Dann das Rollout
- Dann Observability und Metriken
- Dann die Fähigkeiten auf die Vendor-Seite ausweiten

Es begann also, **übergreifende Engineering-Entwicklung über Tasks, Packages und Phasen hinweg** zu unterstützen.

### 2. Die Review-Schleife wurde länger, aber auch stabiler

Besonders [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) zeigt sehr gut die Reife von Legion.

In diesem Task wurde nicht mehr darüber gestritten, "wie Code geschrieben wird", sondern über:

- Beeinflusst `allowedHosts` das Anfrageverhalten oder nur die Metriken?
- Ist `absolute-form` wirklich der einzige unterstützte Pfad?
- Wie werden die Grenzen von `invalid_url`, `blocked`, `error` definiert?
- Wie kontrolliert man das High-Cardinality-Risiko von `target_host` / `target_path`?

Diese Fragen sind im Kern keine Fragen der Programmierfähigkeit, sondern Fragen der Spezifikations-, Semantik- und Validierungsgrenzen.

Der Wert von Legion lag hier nicht darin, mehr Code für mich zu schreiben, sondern mir zu helfen, diese Grenzen zu stabilisieren.

### 3. Die Berichtsschnittstelle begann wirklich engineering-tauglich zu werden

Das war auch ein besonders entscheidender Schritt für Legion.

In der `http-proxy`-Task-Serie begann Legion stabil zu erzeugen:

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- PR body
- spec-test / spec-bench / spec-obs

Das heißt, Legion begnügte sich nicht mehr damit, "die Sache zu erledigen", sondern begann zu unterstützen, "die Sache klar darzulegen, die Beweise anzufügen, die Risiken zu benennen".

Das deckt sich vollständig mit meiner Aussage im Blog: "Die Berichtsschnittstelle ist ein unterschätztes Engineering-Problem".

Was wirklich teuer ist, sind nie die Tokens, sondern Nacharbeit, wiederholtes Nachfragen, erneutes Lesen von Code und Aufmerksamkeitsverlust. Solange die Berichtsschnittstelle nicht engineering-tauglich ist, muss man immer noch viel Aufwand betreiben, um zu erraten, was der Agent wirklich getan hat.

---

## 6. Reifephase: Von der Engineering-Pipeline zum Governance-System

Wenn man weiter schaut, besteht die Reife von Legion nicht nur aus "immer mehr Dokumenten", sondern darin, dass es eine Governance-Struktur entwickelt.

### 1. Task-Erstellung ist nicht mehr einfach drauflos, sondern durch Strategien eingeschränkt

Die `taskCreationPolicy` in der aktuellen [`config.json`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json) ist bereits `agent-with-approval`.

Das ist sehr symbolträchtig. Es bedeutet, dass Legion bereits eine Tatsache anerkennt:

> Nicht alle komplexen Tasks sollten vom Agenten selbst entschieden werden, wann sie beginnen oder vorangetrieben werden.

Also:

- Agenten können erkunden, organisieren, vorschlagen;
- Aber bevor komplexe Arbeiten in die offizielle Ausführung gehen, benötigen sie immer noch menschliche Genehmigung.

Das ist kontrollierte Autonomie.

### 2. Reviews sind nicht mehr nur Text, sondern ein Protokoll mit Status

Aus der Verteilung im Ledger geht hervor, dass `legion_list_reviews` und `legion_respond_review` bereits häufige Aktionen sind.

Das zeigt, dass Reviews in Legion keine Nebenfunktion sind, sondern eine Hauptfunktion. Noch wichtiger ist, dass es nicht nur um "Kommentare lesen" geht, sondern um:

- Ungelöste Punkte finden
- Auf konkrete Reviews einzeln antworten
- `resolved` / `wontfix` / `need-info` markieren
- Sicherstellen, dass das Review abgeschlossen ist

Die Bedeutung dieses Schritts liegt darin:

> Die Zusammenarbeit zwischen Mensch und Agent ist nicht mehr nur Sitzungsnachrichten, sondern protokollierbare, nachverfolgbare, auditierbare Protokollaktionen.

### 3. Es beginnt, "Risikoakzeptanz" zu tragen

Ein reifes System bedeutet nicht, dass "alle Probleme gelöst sind", sondern dass es klar unterscheiden kann:

- Welche Risiken sofort behoben werden müssen
- Welche Risiken zuerst protokolliert und später verwaltet werden können
- Welche Risiken unter den aktuellen Umweltannahmen akzeptabel sind

In Tasks wie [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) und [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md) ist bereits zu sehen:

- Einige Probleme wurden nach Review als `wontfix` markiert
- Einige Sicherheitsprobleme wurden explizit als im aktuellen Stadium akzeptierte Risiken protokolliert
- Einige verbleibende Risiken wurden nicht vergessen, sondern formal festgehalten

Das zeigt, dass Legion nicht mehr nur ein "Hilfsmittel zum Beheben von Bugs" ist, sondern beginnt, die Realität von Engineering-Entscheidungen zu tragen.

---

## 7. Beispiele höchster Reife: Von `heavy-rfc` zu `signal-trader`

Wenn ich aus den bestehenden Tasks die Beispiele auswählen müsste, die die Reife von Legion am besten zeigen, würde ich sie in zwei aufeinanderfolgende Phasen unterteilen:

- [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
- [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)

### 1. `heavy-rfc`: Die reife Form des Design-Gates

[`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md) ist ein sehr typischer Hochrisiko-Design-Task.

Er legte von Anfang an klar fest:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Und seine Artefaktkette ist bereits sehr vollständig:

- [`task-brief.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/task-brief.md)
- [`research.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/research.md)
- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/rfc.md)
- [`review-rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/review-rfc.md)
- [`report-walkthrough.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/report-walkthrough.md)
- [`pr-body.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/pr-body.md)

Dieser Task zeigt eines: Legion kann bei Hochrisiko-Tasks bereits "zuerst die Absicht abgleichen, dann die Ausführung freigeben" als stabilen Prozess etablieren.

### 2. `signal-trader`: Der Heavy-Prozess und der Implementierungsabschluss verbinden sich

Wenn `heavy-rfc` die Reife des Design-Gates repräsentiert, dann ist [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) eher seine Fortsetzung:

- Zuerst Heavy-Design-Einschränkungen
- Dann Implementierung
- Dann Tests ausführen
- Dann Code/Security-Review
- Dann Walkthrough und PR-Body erstellen

Aus [`signal-trader/tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/tasks.md) geht hervor, dass diese Kette bereits in Standardphasen gepresst wurde:

1.  Taskdefinition und Grenzeneingrenzung
2.  Heavy-Recherche und RFC
3.  RFC-Gegenprüfung
4.  RFC-only Draft PR-Artefakte
5.  Core-Lib-Implementierung
6.  Test und Validierung
7.  Code- und Sicherheitsprüfung
8.  Bericht und PR-Artefakte

Dieser Schritt ist für mich besonders wichtig, denn er zeigt, dass Legion hier nicht mehr "ein Dokumentationssystem hat", sondern **eine stabil wiederverwendbare Vorlage für schwere Task-Prozesse** besitzt.

Genau das ist die im Blog beschriebene Identitätsveränderung: Vom Ausführenden allmählich zum Prüfer, Entscheider und Systemweiterentwickler.

---

## 8. Diese Entwicklungsbahn mit dem Blog vergleichen

Wenn man auf "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" zurückblickt, stellt man fest, dass viele Einschätzungen bereits in der Geschichte von Legion umgesetzt wurden.

### 1. "Die erste süße Frucht der Skalierung"

Im Blog stand: Das parallele Vorantreiben von Tasks durch mehrere Agenten gibt kurzfristig ein Gefühl mechanisierter Ernte.

In der Legion-Historie entspricht das dem schnellen Wachstum der Tasks ab Dezember 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

Das Kernziel zu dieser Zeit war tatsächlich: Zuerst die Agenten mehr arbeiten lassen.

### 2. "Der echte Engpass wurde ich selbst"

Als die Ausführungsarbeit allmählich an die Agenten überging, wurde der echte Engpass des Menschen:

- Kontextmanagement
- Designentscheidungen
- Abnahme
- Entscheidungsfindung

Das Trio von Legion war genau das, was ursprünglich dagegen eingesetzt wurde:

- `tasks.md` verwenden, um Fortschrittsverlust zu reduzieren
- `context.md` verwenden, um Entscheidungen und wichtige Dateien zu externalisieren
- `plan.md` verwenden, um Ziele und Umfang festzuhalten

### 3. "Die Mauer des impliziten Wissens"

Eine der wichtigsten Einschätzungen im Blog war, dass Agenten oft nur sichtbare Beispiele lernen, aber nicht wissen, was der aktuelle Standard ist.

Die Antwort von Legion darauf war:

- Reviews in den Plan schreiben
- Einschränkungen in den Kontext schreiben
- Designkontroversen als strukturierte Dokumente festhalten

Also die Externalisierung des impliziten Projektwissens.

### 4. "Intent Alignment + Layered Verification"

Die Pipeline aus dem Blog ist in Tasks wie `http-proxy-*` und `signal-trader` bereits sehr nahe an der ursprünglichen Umsetzung:

- Intent: Goal / Non-goals / Scope
- Plan: Phase / RFC / Design Summary
- Execute: Implementierung
- Verify: test / review-code / review-security / bench
- Report: walkthrough / PR body
- Memory: context / archived task / ledger

### 5. "Die Berichtsschnittstelle ist ein unterschätztes Engineering-Problem"

Im Blog sagte ich, Schlussfolgerungen sollten möglichst an Artefakte gebunden sein, nicht in mündlichen Zusammenfassungen stecken bleiben.

Legion geht heute deutlich in diese Richtung:

- Eine Schlussfolgerung ist nicht ein Satz, sondern entspricht Report, Review, Test-Report, PR-Body
- Für die Abnahme muss nicht der gesamte Code neu gelesen werden, sondern kann priorisiert die verdichteten Artefakte gelesen werden

Obwohl es noch nicht mein idealer Citation Agent ist, ist die Richtung bereits klar.

### 6. "Benchmarks werden zur Notwendigkeit"

Im Blog sagte ich, in Zukunft muss man verschiedene Workflows oder Modellversionen vergleichen können, nicht nur nach Gefühl sagen "diese Version ist schlauer".

Diese Linie hat in Legion bereits Ansätze:

- `spec-bench.md`
- Benchmark-Szenarien und Schwellenwerte
- Benchmark-Ausgabe und Berichte

Das zeigt, dass es nicht nur eine Idee ist, sondern bereits in die Engineering-Phase eintritt.

---

## 9. Vom aktuellen Stand aus den nächsten Schritt betrachten: Was `legion-mind` für die neueste Entwicklungsrichtung repräsentiert

Wenn die `.legion/`-Historie im Yuan-Repository hauptsächlich die Frage beantwortet "Wie wurde dieses Ding durch echte Anforderungen herausgefordert?", dann beantwortet das aktuelle `~/Work/legion-mind` eine andere Frage:

> Da dieses Ding bereits herausgefordert wurde, kann der nächste Schritt darin bestehen, es von Projekterfahrung zu einem generischen System zu veredeln?

An diesen Einstiegspunkten ist die neueste Entwicklungsrichtung von Legion deutlich zu erkennen:

- [`README.md`](https://github.com/Thrimbda/legion-mind/blob/main/README.md)
- [`docs/legionmind-usage.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/legionmind-usage.md)
- [`.legion/playbook.md`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md)
- [`/evolve`](https://github.com/Thrimbda/legion-mind/blob/main/.opencode/commands/evolve.md)
- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)

### 1. Vom "Workflow im Repository" zu "generischen Orchestrierungsvorlagen"

In Yuan wuchs Legion mit konkreten Tasks; in `legion-mind` wurde es bereits explizit abstrahiert zu:

- primary agent: `legion`
- subagents: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
- skill: `skills/legionmind`

Das zeigt, dass Legion sich von einem "erfahrungsbasierten Workflow" zu einem "System mit klaren Rollen und Orchestrierung" entwickelt.

### 2. Von dokumentarischen Einschränkungen zu befehlsorientierten Einstiegspunkten

Die auffälligste Veränderung in `legion-mind` ist die Befehlsorientierung häufiger Abläufe:

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

Das scheint nur eine Optimierung der Nutzererfahrung zu sein, ist es aber im Kern nicht. Es bedeutet, dass Legion die ursprünglich durch implizite SOPs aufrechterhaltenen Prozesse weiter zu expliziten Einstiegspunkten verfestigt.

### 3. Vom Task-Gedächtnis zum Organisationsgedächtnis

Das Legion in Yuan konnte bereits den Kontext einzelner Tasks persistieren; in `legion-mind` geht es noch einen Schritt weiter: Es beginnt, übergreifende Task-Erfahrungen in einem [`playbook`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md) zu sammeln.

Das ist wichtig, weil:

- `plan/context/tasks` lösen "Wie läuft dieser Task weiter?";
- `playbook` löst "Wie vermeidet man bei ähnlichen Tasks in Zukunft Umwege?".

Im Playbook sammeln sich bereits Regeln wie:

- Benchmark-Ausgaben müssen im Repository bleiben
- Benchmarks müssen zuerst ein deterministisches Profil festlegen
- Fehlende Summaries müssen als Fehler in den Nenner eingehen, nicht stillschweigend den Nenner verkleinern

Das heißt, das neueste Gedächtnismodell von Legion ist nicht mehr nur Task-Gedächtnis, sondern versucht bereits, Organisationsgedächtnis zu sein.

### 4. Von "funktionsfähig" zu "installierbar, verifizierbar, rückgängig machbar"

`legion-mind` hat noch eine besonders wichtige Richtung: Es beginnt, Verteilung und Replikationsfähigkeit zu berücksichtigen.

In der README ist bereits zu sehen:

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- managed files / backup index

Das zeigt, dass das Ziel von Legion nicht mehr nur "ich selbst nutze es bequem in diesem Repository" ist, sondern:

- Wie Assets sicher synchronisiert werden
- Wie Überschreibungen eigener Benutzeränderungen vermieden werden
- Wie der Installationsstatus verifiziert wird
- Wie bei Fehlschlägen ein Rollback durchgeführt wird

Es entwickelt sich also von einer Arbeitsmethode zu einem produktartigen Asset.

### 5. Von Erfahrungszusammenfassung zu Benchmark-gesteuerter Systemweiterentwicklung

Im Blog sagte ich, eine der wichtigsten zukünftigen Aufgaben sei, verschiedene Workflow-Versionen vergleichen zu können, nicht nur nach Gefühl zu urteilen "diese Version ist besser".

`legion-mind` beginnt bereits, dies direkt anzugehen:

- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)
- benchmark baseline-Befehl
- benchmark-runs-Verzeichnis
- preflight / smoke / full / score / report-Prozess

Das bedeutet, dass die nächste Phase von Legion nicht mehr darin besteht, weitere Prozesse zu stapeln, sondern härtere Fragen zu beantworten:

- Welcher Prozess ist wirklich
---
title: Die Entwicklungslinie von Legion: Vom Task-Recorder zum Multi-Agent-Engineering-Betriebssystem
date: 2026-03-08
---

## Einleitung

Dieses Dokument versucht, eine konkrete Frage zu beantworten: Wie sind wir von "fast nichts am Anfang" dazu gekommen, Legion zu dem relativ ausgereiften Multi-Agent-Engineering-Kollaborationssystem zu machen, das es heute ist?

Das Material hier stammt hauptsächlich aus drei Quellen:

- Die Git-Historie von `.legion/`
- Der Zustand und die Audit-Logs von `.legion/config.json` und `.legion/ledger.csv`
- Das im Blogbeitrag "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" bereits klar formulierte Denkgerüst

Wenn man diese Entwicklungslinie in einem Satz zusammenfassen müsste, dann wäre es ungefähr so:

> Am Anfang wollten wir nur, dass der Agent mehr für uns erledigt; später erkannten wir, dass es nicht um "stärkere Programmierfähigkeiten" geht, sondern um den Aufbau eines gesamten Engineering-Systems, das "Agenten weniger stört, mehr Output liefert, verifizierbar und übergabefähig" ist. Legion ist in diesem Prozess aus einem simplen Task-Recorder Schritt für Schritt zu einem Multi-Agent-Engineering-Betriebssystem herangewachsen.

---

## I. Zuerst der Status Quo: Was Legion heute ist

Beginnen wir nicht am Anfang, sondern beim aktuellen Stand.
Vom Repository-Zustand her ist Legion kein loses Dokumentensammelsurium mehr, sondern ein kontinuierlich laufendes Workflow-System:

- `.legion/config.json` enthält bereits 33 Task-Einträge.
- Die Statusverteilung ist ungefähr: 9 `archived`, 22 `paused`, 2 `active`.
- `.legion/ledger.csv` enthält kumuliert 2339 Audit-Einträge.
- Häufige Aktionen sind: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- Die aktuelle Task-Erstellungsstrategie ist `agent-with-approval`, d.h. ein Agent kann zunächst nur einen Vorschlag machen, keinen Task direkt erstellen; es muss eine explizite Genehmigung erfolgen.

Diese Fakten zusammengenommen zeigen, dass Legion heute bereits mehrere stabile Fähigkeiten besitzt:

1.  **Task-Persistenz**: Tasks, Kontext und Fortschritt werden extern gespeichert, nicht nur in der Sitzung.
2.  **Design-Gates**: Komplexe Tasks können nicht einfach losgelegt werden; es braucht zuerst Vorschlag, Plan, RFC, bevor die Ausführung beginnt.
3.  **Review-Zyklus**: Kommentare sind keine Chat-Historie, sondern strukturierte Review-Einträge mit Status.
4.  **Nachweisbare Artefakte**: Viele Tasks haben nicht nur `plan/context/tasks`, sondern generieren auch `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Audit und Governance**: Das System weiß, wer wann welche Entscheidung getroffen, welche Phase vorangetrieben oder welches Review beantwortet hat.

Das entspricht im Wesentlichen bereits der im Blog beschriebenen Pipeline:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Mit anderen Worten: Legion heute ist kein "Notizsystem zur Programmierunterstützung" mehr, sondern eine "Protokollschicht, die festlegt, wie mehrere Agenten zusammenarbeiten".

---

## II. Der Ausgangspunkt: Zuerst die Tasks aus dem Kopf holen

Der Startpunkt von Legion war sehr schlicht.

Der Git-Historie nach tauchte `.legion` erstmals umfangreich im Repository im Commit `implement-quote-service` am 15.12.2025 auf. Dieser Commit brachte gleichzeitig ein:

- `.legion/config.json`
- `.legion/ledger.csv`
- `.legion/tasks/implement-quote-service/plan.md`
- `.legion/tasks/implement-quote-service/context.md`
- `.legion/tasks/implement-quote-service/tasks.md`

Dieser Startpunkt ist entscheidend, denn er etablierte das minimale Drei-Komponenten-Set von Legion:

### 1. `plan.md`

Beantwortet die Frage "Was soll getan werden?".

In `implement-quote-service` war `plan.md` keine einfache To-do-Liste mehr, sondern enthielt relativ vollständig:

- Ziel
- Hintergrund & Motivation
- Nicht-Ziele
- Umfang
- Phasenplanung
- Vertragszusammenfassung
- Vendor-spezifisches Design

Das heißt, von Anfang an war es kein "Todo List", sondern ein leichtgewichtiges Designdokument.

### 2. `context.md`

Beantwortet die Frage "Was ist passiert, warum wurde das so gemacht?".

In dieser Phase war der offensichtlichste Wert von `context.md`:

- Wichtige Dateien festhalten
- Wichtige Entscheidungen festhalten
- Verifizierungsergebnisse festhalten
- Schnelle Übergabe ermöglichen

Im Wesentlichen ersetzte es "das, was ich mir gerade im Kopf zurechtgelegt habe".

### 3. `tasks.md`

Beantwortet die Frage "Wo stehen wir gerade?".

Dieser Schritt ist wichtig, denn sobald Multi-Agent- oder Multi-Runden-Sitzungen beginnen, verzerrt sich zuerst nicht der Code, sondern der Fortschrittsstatus.

Der Blog erwähnt, dass ein Mensch nur stabil zwei bis drei Kontexte pro Tag verwalten kann; darüber hinaus kommt es zu Planungsfehlern. Der erste Schritt von Legion bestand im Wesentlichen darin, den "Task-Status" aus dem menschlichen Gehirn auszulagern.

Die Legion der Startphase kann man also verstehen als:

> Zuerst dafür sorgen, dass Tasks nicht verloren gehen, dass der Kontext wiederhergestellt werden kann, dass Agenten nicht nach Erledigung alles vergessen.

Das entspricht vollständig der im Blog genannten Anforderung, "den Kontext aus dem Kopf auszulagern".

---

## III. Die erste Evolution: Vom Task-Recording zur Externalisierung impliziten Wissens

Wenn die erste Phase "Nicht vergessen, was gerade getan wird" löste, dann löste die zweite Phase das, was im Blog als "Mauer des impliziten Wissens" bezeichnet wurde.

### 1. Tasks wurden komplexer, Reviews tauchten massiv auf

Ab Mitte/Ende Dezember 2025 begannen in Legion-Plan-Dokumenten viele `> [REVIEW]`-Blöcke aufzutauchen.

Typische Tasks waren:

- `yuantsexchange-ohlcinterestrate`
- `vendors-ingest-ohlc-interest-rate`
- `task-vex-queryquotes-swr`
- `task-vex-quote-upstream-refactor`
- `vex-series-data-ohlcinterestrate-ohlc-v2`

Gemeinsames Merkmal dieser Tasks:

- Sie waren nicht einfach "nach einer Vorlage abzuschreiben".
- Sie betrafen alte Implementierungen, Entwicklungsgeschichte, Stilpräferenzen, lokale Best Practices.
- Über Erfolg oder Misserfolg entschied nicht die Syntaxfähigkeit, sondern "zu wissen, was übernommen werden sollte und was nicht".

Zum Beispiel zeigt sich im Review von `vex-series-data-ohlcinterestrate-ohlc-v2` ein typischer Prozess der "Explizitmachung impliziten Wissens":

- An dieser Stelle sollte nicht auf die bestehende Implementierung verwiesen werden, weil diese fehlerhaft ist.
- Zuerst dachte man, VEX bräuchte keine komplexe Ratenbegrenzung, später revidierte man das und entschied, bestimmte Ratenbegrenzungsstrategien beizubehalten.
- Die Codierungsregeln für `series_id`, Merge-Semantik, Fairness der Warteschlange usw. sind kein "Weltwissen", das das Modell natürlich aus dem Code ableiten kann, sondern lokal im Projekt evolviertes Wissen.

Das entspricht genau der im Blog beschriebenen Schichtung:

- Schicht 1 sind die aktuellen Task-Anweisungen;
- Schicht 2 sind projektinterne technische Entscheidungen und lokale Best Practices;
- Genau Schicht 2 ist es, die Agenten am ehesten zum Scheitern bringt.

Die Rolle von Legion in dieser Phase bestand darin, Schicht 2 gewaltsam aufzuschreiben.

### 2. Kommentare waren nicht mehr nur Kommentare, sondern eine Kollaborationsschnittstelle

Eine weitere entscheidende Veränderung in dieser Phase: Kommentare wurden nicht mehr zu "temporären Anmerkungen", sondern entwickelten sich allmählich zu strukturierten, in sich geschlossenen Inputs.

Zum Beispiel:

- Manche Reviews änderten direkt die Designrichtung.
- Andere forderten, Fehlersemantik zu ergänzen.
- Wieder andere forderten, Over-Engineering zu entfernen.
- Oder sie forderten, nicht auf bestehende fehlerhafte Implementierungen zu verweisen.

Wenn dieser Inhalt nur im Chat blieb, ging er in der nächsten Runde beim Agenten mit Sicherheit verloren; sobald er in `plan.md` oder `context.md` landete, wurde er vom "mündlichen Wissen" zu einem "Teil der Task-Wahrheit".

Die Legion der zweiten Phase war also im Wesentlichen nicht mehr nur ein Task-Tracker, sondern begann, die Funktion eines **externalisierten Gehirns** zu übernehmen.

Dieser Schritt ist sehr wichtig, denn er entspricht einer im Blog betonten Kernwende:

> Ein externalisiertes Gehirn ist kein "nice-to-have", sondern bei komplexen Projekten eine Notwendigkeit.

---

## IV. Die zweite Evolution: Vom externalisierten Gehirn zu Design-Gates

Als die Tasks immer komplexer wurden, reichte das bloße "Aufschreiben von Wissen" nicht mehr aus. Das neue Problem wurde:

> Was, wenn mehrere Agenten gleichzeitig loslegen, aber die Richtung selbst falsch ist?

Hier trat Legion in die dritte Phase ein: Vom "Aufzeichnungssystem" zum "Design-Gate-System".

### 1. RFCs und Specs wurden Teil des Hauptprozesses

Ein entscheidender Wendepunkt war `http-proxy-service`.

In diesem Task war Legion offensichtlich nicht mehr "zuerst machen, dann aufschreiben", sondern "zuerst designen, zuerst reviewen, zuerst das Gate passieren, dann machen".

Dieser Task enthielt:

- `docs/rfc.md`
- `docs/spec-dev.md`
- `docs/spec-test.md`
- `docs/spec-bench.md`
- `docs/spec-obs.md`
- Review-Ergebnisse
- Sicherheitsprüfungs-Blocker
- Walkthrough und PR-Body

Das bedeutet, Legion begann, einen komplexen Task in mehrere stabile Schichten zu zerlegen:

1.  **RFC**: Intent-Abgleich
2.  **Dev/Test/Bench/Obs Spec**: Vorab klarstellen, "wie wird verifiziert"
3.  **Review**: Möglichst vor Arbeitsbeginn Richtungsprobleme aufdecken
4.  **Implementierung & Verifikation**: Günstige Checks nach vorne verlagern
5.  **Bericht & PR-Artefakte**: Dem Abnahme-Prozess dienen

Das entspricht genau dem im Blog erwähnten "Intent-Abgleich + geschichtete Verifikation".

### 2. Sicherheits- und Ressourcenprobleme traten als vorgelagerte Blocker auf

In Tasks wie `http-proxy-service` und `http-proxy-app-implementation` waren Reviews nicht mehr nur Vorschläge, sondern enthielten direkt `blocking`-Einträge.

Zum Beispiel:

- SSRF-Risiko
- DoS-Risiko
- Nicht begrenzte Response-Body-Größe
- Concurrency- und Queue-Parameter nicht secure-by-default
- Unklare Grenzen der Environment-Variable-Konfiguration

Das zeigt, dass Legion begann, eine neue Verantwortung zu übernehmen:

> Nicht nur aufzeichnen, "warum das so gemacht wurde", sondern auch, "warum es jetzt nicht gemacht werden kann, es sei denn, diese Bedingungen werden zuerst erfüllt".

Das sind Design-Gates.

Der Blog sagt: Wenn Multi-Agent-Systeme anfangen zu scheitern, ist der erste menschliche Impuls oft, längere RFCs zu schreiben, strengere Reviews durchzuführen und Risiken ganz nach vorne zu verlagern. Legion institutionalisierte in dieser Phase genau diesen Instinkt.

### 3. Es begann, einer kleinen Produktionspipeline zu ähneln

In dieser Phase war die Rolle von Legion nicht mehr "helfen, sich zu erinnern", sondern "helfen, die Arbeitsabfolge zu steuern".

Entsprechend der Blog-Pipeline:

- `Intent`: Nutzerziele, Nicht-Ziele, Einschränkungen
- `Plan`: Task-Zerlegung, Meilensteine, Grenzen
- `Execute`: Implementierung
- `Verify`: build / test / benchmark / review
- `Report`: walkthrough / PR body
- `Memory`: context / decision log / archived task

Dieser Schritt ist entscheidend, denn er bedeutet:

> Legion trug nicht mehr nur den Kontext, sondern begann, den Prozess zu tragen.

---

## V. Meilenstein: Die HTTP-Proxy-Serie machte Legion wirklich engineering-tauglich

Wenn die vorherigen Phasen noch experimentellen Charakter hatten, dann war die `http-proxy`-bezogene Task-Serie im Grunde der erste echte Reifemeilenstein für Legion.

Das deckt sich mit meiner Beschreibung im Blog: Die `http-proxy`-Tasks über mehrere Projekte hinweg waren tatsächlich der Punkt, an dem ich deutlich das Gefühl bekam, "ich kann mich im Wesentlichen vom Coden zurückziehen und nur noch wenige Review-Kommentare hinterlassen".

Aus der `.legion`-Historie heraus ist diese Einschätzung gut belegt.

### 1. Es war kein einzelner Task, sondern ein Task-Cluster

Zugehörige Tasks umfassten mindestens:

- `http-proxy-service`
- `http-proxy-app-implementation`
- `vendor-http-services-rollout`
- `http-proxy-metrics`
- `http-services-terminalinfos-ready`
- `vendor-tokenbucket-proxy-ip`

Das war kein punktuelles Bedürfnis, sondern eine Reihe sich gegenseitig bedingender Engineering-Tasks:

- Zuerst die Basis-Bibliothek
- Dann die Applikationsschicht
- Dann das Rollout
- Dann die Metriken
- Dann Routing / IP-Readiness
- Schließlich die Verknüpfung mit Vendor-seitiger Ratenbegrenzungs- und Lastlogik

Mit anderen Worten: Legion begann bereits, eine echte **übergreifende, paket- und phasenübergreifende Evolution** zu unterstützen.

### 2. Der Review-Zyklus wurde deutlich länger, aber gleichzeitig stabiler

Besonders `http-proxy-app-implementation` veranschaulicht die Reife von Legion sehr gut:

- Einerseits gab es viele Reviews und viele Kontroversen;
- Andererseits blieben diese Kontroversen nicht im Chat, sondern wurden zu RFC-Updates, Review-Ergebnissen und Kontext-Entscheidungen.

In diesem Task sieht man sehr typische Engineering-Debatten:

- Beeinflusst `allowedHosts` das Request-Verhalten oder nur die Metriken?
- Muss `absolute-form` der einzig unterstützte Pfad sein?
- Wie werden die Grenzen von `invalid_url`, `blocked`, `error` definiert?
- Wie kontrolliert man das High-Cardinality-Risiko von `target_host` / `target_path`?

Das sind keine Probleme, die "Programmierfähigkeit" direkt lösen kann, sondern Fragen der **Normgrenzen, Verifizierungsgrenzen und Semantikgrenzen**.

Der Wert von Legion lag hier nicht darin, beim Coden zu helfen, sondern darin, diese Grenzen zu stabilisieren.

### 3. Es begann, echte für die Abnahme nutzbare Artefakte zu generieren

Dieser Schritt entspricht auch genau dem Blog-Punkt "Reporting-Schnittstellen sind ein unterschätztes Engineering-Problem".

In der http-proxy-Serie generierte Legion bereits stabil:

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- pr-body
- spec-test / spec-bench / spec-obs

Das zeigt, dass Legion nicht mehr damit zufrieden war, "die Dinge zu erledigen", sondern begann, "die Dinge klar darzulegen, die Beweise anzuhängen, die Risiken zu benennen" zu unterstützen.

Anders gesagt:

> Zu diesem Zeitpunkt begann Legion, wirklich "kostengünstiger Abnahme" zu dienen, nicht nur "effizienter Ausführung".

Das ist auch eine besonders wichtige Erkenntnis aus dem Blog: Das Teuerste sind nicht die Tokens, sondern Nacharbeit und Aufmerksamkeitsverlust.

Solange Reporting-Schnittstellen nicht engineering-tauglich sind, muss man immer noch viel Energie darauf verwenden, zu erraten, was der Agent eigentlich getan hat. Legion löste dieses Problem in dieser Phase offensichtlich bereits aktiv.

---

## VI. Reifephase: Von der Engineering-Pipeline zum Governance-System

Betrachtet man die weitere Entwicklung, zeigt sich die Reife von Legion nicht nur in "immer mehr Dokumenten", sondern darin, dass sich **Governance-Strukturen** zu verfestigen begannen.

### 1. Die Task-Erstellung wurde durch Genehmigungsstrategien eingeschränkt

Der aktuelle `taskCreationPolicy` in `.legion/config.json` ist bereits `agent-with-approval`.

Dieser Schritt hat große symbolische Bedeutung.

Er bedeutet, dass Legion begann, eine Tatsache anzuerkennen:

> Nicht alle komplexen Tasks sollten vom Agenten selbst entschieden werden, wann sie erstellt und vorangetrieben werden.

Dahinter steckt genau das im Blog beschriebene, tieferliegende Problem:

- Wenn Modelle immer leistungsfähiger werden, sollte der Prozess dann Macht abgeben?
- Wenn ja, wo liegen die Grenzen?
- Was muss zuerst menschliche Genehmigung durchlaufen, was kann automatisch vorangetrieben werden?

Die Antwort von Legion ist keine vollständige Autonomie, sondern **kontrollierte Autonomie**.

Also:

- Agenten können erkunden, strukturieren, vorschlagen;
- Aber komplexe Arbeiten müssen vor dem offiziellen Start noch menschlich genehmigt werden.

Das kommt den Arbeitsmechanismen in einer echten Organisation schon sehr nahe.

### 2. Reviews waren nicht mehr nur Vorschläge, sondern statusbehaftete Kollaborationsprotokolle

Den Ledger-Statistiken zufolge gab es bereits viele Einträge für `legion_list_reviews` und `legion_respond_review`.

Das zeigt, dass Reviews in Legion keine Nebenfunktion sind, sondern eine Hauptfunktion.

Noch wichtiger: Es geht nicht um "Kommentare lesen", sondern um:

- Ungelöste Punkte auflisten
- Auf ein Review antworten
- Als resolved / wontfix / need-info markieren
- Review-Abschluss bestätigen

Das unterscheidet sich stark von normalen Markdown-Kommentaren. Es verwandelt "Kommentare" von Text in eine nachverfolgbare Zustandsmaschine.

Die Bedeutung dieses Schrittes ist:

> Die Kommunikation zwischen Mensch und Agent ist nicht mehr nur Sitzungsnachrichten, sondern protokollierbare, nachverfolgbare, auditierbare Protokollaktionen.

### 3. Es begann, "Risikoakzeptanz" zu tragen, nicht nur "Problembehebung"

Ein weiteres Zeichen eines reifen Systems ist nicht, "alle Risiken sind gelöst", sondern "das System kann unterscheiden, welche Risiken jetzt gelöst werden und welche jetzt akzeptiert werden".

In Tasks wie `http-proxy-app-implementation`, `vendor-tokenbucket-proxy-ip` usw. sieht man bereits:

- Einige Sicherheitsprobleme wurden nach Review als `wontfix` markiert.
- Einige Risiken wurden explizit als vom Nutzer akzeptiert dokumentiert.
- Einige Verhaltensweisen wurden als verbleibendes Risiko (residual risk) festgehalten, nicht einfach vergessen.

Das zeigt, dass Legion nicht mehr nur ein "Werkzeug zum Bugfixen" ist, sondern begann, die Realität von Engineering-Entscheidungen zu tragen:

- Einige Probleme müssen sofort behoben werden.
- Einige Probleme werden zuerst dokumentiert, später behandelt.
- Einige Probleme werden durch aktuelle Umgebungsannahmen abgefedert.

Das ist Governance.

---

## VII. Aktuellstes Beispiel höchster Reife: `heavy-rfc`

Wenn man aus den bestehenden Tasks einen auswählen müsste, der die Reife von Legion am besten verkörpert, würde ich `heavy-rfc` wählen.

Dieser Task kann fast als vollständiges Paradigma des aktuellen Legion-Workflows betrachtet werden.

### 1. Von Anfang an gab es Risikostufen und Phasendeklarationen

Es wurde nicht einfach "live trading implementieren" geschrieben, sondern von Anfang an klar festgelegt:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Das heißt, dieser Task war nicht "zuerst implementieren, dann Dokumentation nachschieben", sondern erkannte zuerst an, dass es sich um einen Hochrisiko-Task handelt, der daher zunächst den heavy-RFC-Prozess durchlaufen muss.

### 2. Es gab bereits eine vollständige Artefaktkette

`heavy-rfc` enthielt bereits:

- `task-brief.md`
- `research.md`
- `rfc.md`
- `review-rfc.md`
- `test-report.md`
- `review-code.md`
- `review-security.md`
- `report-walkthrough.md`
- `pr-body.md`

Diese Artefaktkette allein zeigt, dass Legion bereits einen Hochrisiko-Engineering-Task in mehrere überprüfbare, verifizierbare, übergabefähige Schichten zerlegt hat.

### 3. Es verkörpert die im Blog beschriebene Arbeitsweise "zuerst Intent konsolidieren, dann Ausführung freigeben"

Im Blog gibt es eine sehr zentrale Erkenntnis:

> Autonomie bedeutet nicht nur Klugheit, sondern weniger Störung, mehr Output, Verifizierbarkeit.

`heavy-rfc` verkörpert genau das:

- Zuerst Richtung durch Designdokumente und Reviews festlegen
- Dann Implementierungsrisiken durch Tests und Reviews senken
- Schließlich Abnahmekosten durch Report / PR body senken

Das bedeutet, Legion kann mittlerweile eine neue Arbeitshaltung unterstützen:

> Der Mensch setzt hauptsächlich Ziele, Grenzen, wichtige Reviews; der Agent ist verantwortlich für Implementierung, Verifikation und Reporting innerhalb institutionalisierter Bahnen.

Genau das ist der im Blog abschließend beschriebene Rollenwechsel: Vom Ausführenden zum Prüfenden, Entscheidenden, System-Iterierenden.

---

## VIII. Reifegrad-Upgrade aus Sicht von "Ausmaß und Umfang" der Tasks

Betrachtet man alle Tasks zusammen, erkennt man, dass die Reife von Legion nicht nur in höherer Prozesskomplexität liegt, sondern auch darin, dass sich der Task-Typ selbst weiterentwickelt hat.

### 1. Frühe Phase: Punktuelle Implementierungs-Tasks

Beispiel: `implement-quote-service`

Merkmale:

- Einzelthema
- Grenzen relativ klar
- Dokumentation dient hauptsächlich dem Verständnis und der Übergabe
- Legion dient hauptsächlich als Task-Tracking

### 2. Mittlere Phase: Design-kontroverse Tasks

Beispiel: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Merkmale:

- Über mehrere Module hinweg
- Betreffen viel historischen Ballast und lokale Best Practices
- Dichte an Kommentaren / Reviews
- Legion dient hauptsächlich der Externalisierung impliziten Wissens

### 3. Meilenstein-Phase: Projektübergreifende Engineering-Tasks

Beispiel: `http-proxy-*` Serie

Merkmale:

- Paketübergreifend
- Enthalten RFC / spec / benchmark / security review
- Enthalten Rollout, Observability, Rollback, Reporting
- Legion dient hauptsächlich als vollständige Engineering-Pipeline

### 4. Aktuelle Phase: Hochrisiko-Governance-Tasks

Beispiel: `heavy-rfc`

Merkmale:

- Klare Risikostufung
- Klare Genehmigungs-Gates
- Klarer Review-Zyklus
- Vollständige Dokumentations- und Beweiskette
- Legion dient hauptsächlich der Governance und dem Lieferprotokoll

Anders gesagt: Das "Ausmaß und der Umfang" der Tasks selbst sind der Spiegel des Reifegrads von Legion.

Am Anfang behandelte es nur "eine Funktion implementieren"; später begann es, "eine Art komplexes Engineering" zu behandeln; heute behandelt es bereits "wie man Hochrisiko-Arbeiten auf kontrollierte Weise vorantreibt".

---

## IX. Wie diese Linie mit den Gedanken aus dem Blog übereinstimmt

Schaut man jetzt zurück auf "Gedanken zu AI Agents", erkennt man, dass viele der im Blog formulierten Erkenntnisse bereits in der Geschichte von Legion umgesetzt wurden.

### 1. "Erster Geschmack des Scale-Sweet-Spots"

Im Blog stand: Mehrere Agenten, die parallel Tasks vorantreiben, geben einem kurzfristig ein Gefühl mechanisierter Ernte.

In der Legion-Historie entspricht das dem schnellen Wachstum der Tasks ab Dezember 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

Das zeigt, das ursprüngliche Kernziel war tatsächlich: **Zuerst den Agenten mehr Arbeit machen lassen**.

### 2. "Der Engpass bin ich selbst"

Der Blog sagte, nachdem Ausführungsarbeit an Agenten delegiert wurde, wird der echte menschliche Engpass Kontextmanagement, Abnahme und Entscheidungsfindung.

Das frühe Drei-Komponenten-Set von Legion löste genau dieses Problem:

- `tasks.md` reduzierte Kontextverlust
- `context.md` hielt Entscheidungen und wichtige Dateien fest
- `plan.md` verhinderte, dass Task-Ziele abdriften

### 3. "Die Mauer des impliziten Wissens"

Der Blog sagte, Agenten lernen oft sichtbare Beispiele, wissen aber nicht, was der aktuelle Standard ist.

Legions Antwort war:

- Reviews in den Plan schreiben
- Einschränkungen in den Kontext schreiben
- Design-Kontroversen in strukturierte Dokumente schreiben

Also: Implizites Wissen externalisieren.

### 4. "Intent-Abgleich + geschichtete Verifikation"

Die Blog-Pipeline wurde in `http-proxy` und `heavy-rfc` fast wortwörtlich umgesetzt:

- Intent: Goal / Non-goals / Scope
- Plan: Phase / RFC / Design Summary
- Execute: Implementierung
- Verify: test / review-code / review-security / bench
- Report: walkthrough / pr-body
- Memory: context / archived task / ledger

### 5. "Reporting-Schnittstellen sind ein unterschätztes Engineering-Problem"

Der Blog betonte, Schlussfolgerungen sollten möglichst an Artefakte gebunden sein.

Legions Praxis ging bereits deutlich in diese Richtung:

- Eine Schlussfolgerung ist nicht nur ein Satz, sondern entspricht Report, Review, Test-Report, PR-Body
- Der Mensch muss nicht den gesamten Code neu lesen, sondern kann zuerst die verdichteten Artefakte lesen

Auch wenn es noch nicht der im Blog angedachte Citation Agent ist, die Richtung ist klar.

### 6. "Benchmarks werden zur Notwendigkeit"

Der Blog sagte, in Zukunft muss man verschiedene Workflows oder Modellversionen vergleichen können, nicht nach Gefühl.

In Legion gab es dazu bereits frühe Implementierungen:

- `spec-bench.md`
- Benchmark-Szenarien und Schwellenwerte
- Benchmark-Output und Berichte

Das heißt, dieser Weg ist keine Idee mehr, sondern beginnt, engineering-tauglich zu werden.

---

## X. Die wichtigste Veränderung: Legion veränderte nicht nur Agenten, sondern auch die menschliche Rolle

Oberflächlich betrachtet scheint das Wachstum von Legion zu sein:

- Mehr Dokumente
- Mehr Reviews
- Längere Prozesse

Aber die wirklich entscheidende Veränderung ist nicht das, sondern dass **die Mensch-Maschine-Arbeitsteilung neu definiert wurde**.

In früheren Zeiten war die menschliche Rolle ungefähr:

- Persönlich ausführen
- Persönlich erinnern
- Persönlich den gesamten Kontext halten

Als Legion allmählich reifte, wurde die menschliche Rolle langsam zu:

- Ziele und Einschränkungen setzen
- Design-Grenzen prüfen
- Blockierende Reviews bearbeiten
- Artefakte und Risiken abnehmen
- Das gesamte Kollaborationssystem iterieren

Das ist auch der abschließende Satz im Blog:

> Was ich heute tue, ist nicht "mit KI mehr Code schreiben", sondern "mit KI mich selbst skalieren".

Legion ist die Engineering-Umsetzung dieses Ziels.

Es verwandelte "sich selbst skalieren" von einem abstrakten Wunsch in eine umsetzbare, auditierbare, nachvollziehbare, kontinuierlich optimierbare Kollaborationsstruktur.

---

## XI. Vom heutigen Stand aus gesehen: Die neueste Entwicklungsrichtung, repräsentiert durch `~/Work/legion-mind`

Betrachtet man nur die `.legion/`-Historie im Yuan-Repository, sieht man, wie Legion in einem realen Projekt Stück für Stück erzwungen wurde; schaut man sich aber das aktuelle `~/Work/legion-mind` an, erkennt man, dass Legion bereits in die nächste Evolutionsstufe übergeht.

Dieser Schritt ist sehr wichtig, denn er zeigt, dass Legions Ziel nicht mehr nur "in einem Repository gut funktionieren" ist, sondern beginnt, diese Erfahrung in ein **installierbares, migrierbares, benchmarkfähiges, wiederverwendbares** generisches Autopilot Kit zu destillieren.

Aus `~/Work/legion-mind/README.md` und `docs/legionmind-usage.md` lassen sich mindestens fünf Merkmale der neuesten Richtung ablesen.

### 1. Vom "Repository-internen Workflow" zu "generischen Orchestrierungs-Templates"

In Yuan wuchs Legion anfangs mit konkreten Tasks; in `legion-mind` wurde es explizit zu einem Satz generischer Agent-Orchestrierungs-Templates abstrahiert:

- primary agent: `legion`
- subagents: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
- skill: `skills/legionmind`

Das zeigt, die neueste Version von Legion versteht "Multi-Agent-Kollaboration" nicht mehr als temporäres Zusammenziehen einiger Agenten, sondern beginnt, es zu modellieren als:

- Ein Orchestrator, der den Prozess vorantreibt
- Subagents mit Einzelverantwortung
- `.legion/`, das persistente Zustände und Audits verwaltet

Mit anderen Worten: Legion entwickelt sich von einem "erfahrungsbasierten Workflow" zu einem "Rollen-klaren Orchestrierungssystem".

### 2. Von manuellen Aufrufen zu kommandobasierten Einstiegspunkten

Eine der offensichtlichsten Veränderungen in `legion-mind` ist die Kommandobasierung häufiger Workflows:

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

Das scheint nur eine Optimierung der Nutzererfahrung zu sein, ist es aber im Kern nicht.

Es bedeutet, dass Legion beginnt, Vereinbarungen wie "welche Phasen, in welcher Reihenfolge, wann nur Design, wann Implementierung fortsetzen, wann Erfahrungen dokumentieren" weiter von impliziten SOPs zu expliziten Kommandos zu verfestigen.

Anders gesagt: Frühes Legion beschränkte Prozesse hauptsächlich auf Dokumentationsebene; die aktuelle Richtung schiebt den Prozess selbst eine Schicht weiter nach vorne und verfestigt ihn zu einer direkt aufrufbaren Operationsschnittstelle.

### 3. Vom Task-Gedächtnis zu übergreifenden Playbooks

Legion im Yuan-Repository konnte bereits den Kontext einzelner Tasks persistieren; `legion-mind` geht noch einen Schritt weiter: Es führt `.legion/playbook.md` und `/evolve` ein.

Das ist entscheidend, denn es löst ein Problem auf einer anderen Ebene:

- `plan/context/tasks` lösen "wie läuft dieser Task weiter";
- `playbook` löst "wie vermeidet man bei solchen Tasks in Zukunft Umwege".

Aktuell zeichnet das `playbook` bereits Muster wie diese auf:

- Benchmark-Output muss im Repository bleiben
- Benchmarks müssen zuerst ein deterministisches Profil festlegen
- Fehlende Summaries müssen als Fehler in den Nenner eingehen, nicht stillschweigend den Nenner verkleinern

Das zeigt, Legions neuestes Gedächtnismodell ist nicht mehr nur Task-Memory, sondern beginnt, **Organisationsgedächtnis (Organizational Memory)** zu werden.

Also:

> Nicht nur merken, "wo war man das letzte Mal", sondern auch "wie sollte man solche Tasks in Zukunft stabiler angehen".

### 4. Von "funktionsfähig" zu "installierbar, veröffentlichbar, migrierbar"

Eine weitere besonders bemerkenswerte Richtung in `legion-mind`: Es bietet bereits Installation, Verifikation, Rollback und Sicherheits-Überschreibungsstrategien.

Zum Beispiel enthält die README bereits:

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- managed files / backup index

Das bedeutet, Legion entwickelt sich von "meiner eigenen Arbeitsmethode" zu einem "produktisierten Asset, das andere ebenfalls installieren und nutzen können".

Dieser Schritt ist sehr bedeutend.

Denn sobald man die Installations-/Veröffentlichungsebene betritt, ist Legions Designziel nicht mehr nur, mir selbst zu dienen, sondern muss auch berücksichtigen:

- Wie Assets sicher synchronisiert werden
- Wie Überschreibungen eigener Nutzeränderungen vermieden werden
- Wie der Installationsstatus verifiziert wird
- Wie bei Fehlern zurückgerollt wird

Das zeigt, die neueste Richtung von Legion ist nicht mehr nur das Kollaborationssystem selbst, sondern die **Verteilungs- und Replikationsfähigkeit des Kollaborationssystems**.

### 5. Von Erfahrungszusammenfassung zu Benchmark-gesteuerter Systemiteration

Im Blog schrieb ich, eine der wichtigsten zukünftigen Aufgaben sei, Work
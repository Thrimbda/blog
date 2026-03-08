---
title: Die Entwicklungsbahn von Legion: Vom Aufgabenprotokollierer zum Multi-Agenten-Engineering-Betriebssystem
date: 8. März 2026
---

## Einleitung

Dieses Dokument versucht, eine konkrete Frage zu beantworten: Wie sind wir von "am Anfang fast nichts" dazu gekommen, Legion zu dem relativ ausgereiften Multi-Agenten-Engineering-Kollaborationssystem zu machen, das es heute ist?

Das Material hier stammt hauptsächlich aus drei Teilen:

- Die Git-Historie von `.legion/`
- Der Status und die Prüfprotokolle von `.legion/config.json` und `.legion/ledger.csv`
- Das in dem Blogbeitrag "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" bereits klar dargelegte Denkgerüst

Wenn man diese Entwicklung in einem Satz zusammenfassen müsste, dann wäre es ungefähr so:

> Am Anfang wollten wir nur, dass der Agent mehr für uns erledigt; später stellten wir fest, dass es nicht um den Aufbau "stärkerer Programmierfähigkeiten" geht, sondern um ein ganzes Engineering-System, das "Agenten weniger stört, mehr Output liefert, überprüfbar und übergabefähig" ist. Legion ist in diesem Prozess Schritt für Schritt von einem Aufgabenprotokollierer zu einem Multi-Agenten-Engineering-Betriebssystem herangewachsen.

---

## I. Zuerst der aktuelle Stand: Was Legion bereits ist

Beginnen wir nicht am Anfang, sondern schauen wir uns zuerst die aktuelle Form an.

Vom Zustand des Repositories aus betrachtet ist Legion kein loses Dokumentensammelsurium mehr, sondern ein laufendes Workflow-System:

- `.legion/config.json` enthält bereits 33 Aufgabeneinträge.
- Die Statusverteilung ist ungefähr: 9 `archived`, 22 `paused`, 2 `active`.
- `.legion/ledger.csv` enthält kumuliert 2339 Prüfeinträge.
- Häufige Aktionen sind: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- Die aktuelle Strategie zur Aufgabenerstellung ist `agent-with-approval`, d.h. ein Agent kann zunächst nur einen Vorschlag machen, keine Aufgabe direkt erstellen; es muss eine explizite Genehmigung erfolgen.

Diese Fakten zusammengenommen zeigen, dass Legion heute bereits mehrere stabile Fähigkeiten besitzt:

1.  **Aufgabenpersistenz**: Aufgaben, Kontext und Fortschritt werden extern gespeichert, nicht nur in der Sitzung.
2.  **Design-Gates**: Komplexe Aufgaben können nicht einfach losgelegt werden; es muss zuerst einen Vorschlag, einen Plan, ein RFC geben, bevor die Ausführung beginnt.
3.  **Review-Schleife**: Kommentare sind keine Chat-Protokolle, sondern strukturierte Review-Einträge mit Status.
4.  **Nachweisbare Artefakte**: Viele Aufgaben haben nicht nur `plan/context/tasks`, sondern generieren auch `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Prüfung und Governance**: Das System weiß, wer wann welche Entscheidung getroffen, welche Phase vorangetrieben oder auf welches Review geantwortet hat.

Dies entspricht im Wesentlichen bereits der im Blogbeitrag beschriebenen Pipeline:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Das bedeutet, Legion heute ist kein "Notizsystem zur Unterstützung beim Programmieren" mehr, sondern eine "Protokollschicht, die festlegt, wie mehrere Agenten zusammenarbeiten".

---

## II. Der Ausgangspunkt: Zuerst die Aufgaben aus dem Kopf holen

Der Ausgangspunkt von Legion war sehr schlicht.

Aus der Git-Historie geht hervor, dass `.legion` erstmals am 15.12.2025 mit `implement-quote-service` in größerem Umfang ins Repository aufgenommen wurde. Dieser Commit führte gleichzeitig ein:

- `.legion/config.json`
- `.legion/ledger.csv`
- `.legion/tasks/implement-quote-service/plan.md`
- `.legion/tasks/implement-quote-service/context.md`
- `.legion/tasks/implement-quote-service/tasks.md`

Dieser Startpunkt ist entscheidend, denn er etablierte das minimale Trio von Legion:

### 1. `plan.md`

Beantwortet die Frage "Was soll getan werden?".

In `implement-quote-service` war `plan.md` keine einfache To-Do-Liste mehr, sondern beschrieb relativ vollständig:

- Ziel
- Hintergrund und Motivation
- Nicht-Ziele
- Umfang
- Phasenplanung
- Vertragszusammenfassung
- Design pro Anbieter

Das heißt, von Anfang an war es kein "Todo-Liste", sondern ein leichtgewichtiges Designdokument.

### 2. `context.md`

Beantwortet die Frage "Was ist passiert, warum wurde das so gemacht?".

In dieser Phase war der offensichtlichste Wert von `context.md`:

- Wichtige Dateien protokollieren
- Wichtige Entscheidungen protokollieren
- Verifizierungsergebnisse protokollieren
- Schnelle Übergabe ermöglichen

Im Wesentlichen ersetzte es "das, was ich mir gerade im Kopf zurechtgelegt habe".

### 3. `tasks.md`

Beantwortet die Frage "Wo stehen wir gerade?".

Dieser Schritt ist wichtig, denn sobald Multi-Agenten- oder Mehrfachsitzungen beginnen, verzerrt sich zuerst nicht der Code, sondern der Fortschrittsstatus.

Der Blogbeitrag erwähnt, dass ein Mensch nur stabil zwei bis drei Kontexte pro Tag verwalten kann; darüber hinaus kommt es zu Planungsfehlern. Der erste Schritt von Legion bestand im Wesentlichen darin, den "Aufgabenstatus" aus dem menschlichen Gehirn auszulagern.

Die Anfangsphase von Legion kann man also verstehen als:

> Zuerst dafür sorgen, dass Aufgaben nicht verloren gehen, der Kontext wiederhergestellt werden kann und Agenten nicht nach der Ausführung alles vergessen.

Dies deckt sich vollständig mit der im Blogbeitrag genannten Anforderung, "den Kontext aus dem Kopf auszulagern".

---

## III. Die erste Evolution: Vom Aufgabenprotokoll zur Externalisierung impliziten Wissens

Wenn die erste Phase das Problem "Nicht vergessen, was gerade getan wird" löste, dann löste die zweite Phase das, was im Blogbeitrag als "Mauer des impliziten Wissens" bezeichnet wurde.

### 1. Aufgaben werden komplexer, Reviews tauchen massiv auf

Ab Mitte/Ende Dezember 2025 begannen in Legion-Plan-Dokumenten zahlreiche `> [REVIEW]`-Blöcke aufzutauchen.

Typische Aufgaben waren:

- `yuantsexchange-ohlcinterestrate`
- `vendors-ingest-ohlc-interest-rate`
- `task-vex-queryquotes-swr`
- `task-vex-quote-upstream-refactor`
- `vex-series-data-ohlcinterestrate-ohlc-v2`

Die gemeinsamen Merkmale dieser Aufgaben waren:

- Sie waren nicht einfach durch "Kopieren einer Vorlage" zu erledigen.
- Sie betrafen alte Implementierungen, Entwicklungsgeschichte, Stilpräferenzen, lokale Best Practices.
- Über Erfolg oder Misserfolg entschied nicht die Syntaxfähigkeit, sondern das "Wissen, was übernommen werden sollte und was nicht".

Zum Beispiel sieht man im Review von `vex-series-data-ohlcinterestrate-ohlc-v2` einen sehr typischen Prozess der "Explizitmachung impliziten Wissens":

- An dieser Stelle sollte nicht auf die bestehende Implementierung verwiesen werden, da diese fehlerhaft ist.
- Zunächst dachte man, VEX bräuchte keine komplexe Ratenbegrenzung, später kam man zu einer neuen Einschätzung, dass bestimmte Ratenbegrenzungsstrategien beibehalten werden sollten.
- Die Codierungsregeln für `series_id`, Merge-Semantik, Fairness der Warteschlange usw. waren kein "Weltwissen", das das Modell natürlich aus dem Code ableiten konnte, sondern lokal im Projekt evolviertes Wissen.

Dies entspricht genau der im Blogbeitrag genannten Schichtung:

- Die 1. Ebene sind die Anweisungen für die aktuelle Aufgabe.
- Die 2. Ebene sind technische Projektentscheidungen und lokale Best Practices.
- Genau diese 2. Ebene ist es, die Agenten am ehesten zum Scheitern bringt.

Die Rolle von Legion in dieser Phase bestand darin, diese 2. Ebene gewaltsam aufzuschreiben.

### 2. Kommentare sind nicht mehr nur Kommentare, sondern eine Kollaborationsschnittstelle

Eine weitere entscheidende Veränderung in dieser Phase: Kommentare wurden nicht mehr nur zu "vorübergehenden Anmerkungen", sondern entwickelten sich allmählich zu strukturierten Eingaben, die einen Abschluss ermöglichen.

Zum Beispiel:

- Einige Reviews änderten direkt die Designrichtung.
- Andere forderten, Fehlersemantik zu ergänzen.
- Wieder andere forderten, Over-Engineering zu entfernen.
- Und einige forderten, nicht auf bestehende fehlerhafte Implementierungen zu verweisen.

Wenn dieser Inhalt nur im Chat-Protokoll verbliebe, würde der nächste Agent ihn mit Sicherheit verlieren; sobald er in `plan.md` oder `context.md` landet, wird er vom "mündlichen Wissen" zu einem "Teil der Aufgabentatsache".

Daher war Legion in der zweiten Phase im Wesentlichen nicht mehr nur ein Task-Tracker, sondern begann, die Funktion eines **externen Gehirns** zu übernehmen.

Dieser Schritt ist sehr wichtig, denn er entspricht einer zentralen Wende in Ihrem Blogbeitrag:

> Ein externes Gehirn ist kein nettes Extra, sondern eine Notwendigkeit bei komplexen Projekten.

---

## IV. Die zweite Evolution: Vom externen Gehirn zum Design-Gate

Als die Aufgaben immer komplexer wurden, reichte das bloße "Aufschreiben von Wissen" nicht mehr aus. Das neue Problem wurde:

> Was passiert, wenn mehrere Agenten gleichzeitig loslegen, aber die Richtung selbst falsch ist?

Hier trat Legion in die dritte Phase ein: Vom "Protokollsystem" zum "Design-Gate-System".

### 1. RFCs und Specs werden Teil des Hauptprozesses

Ein entscheidender Wendepunkt war `http-proxy-service`.

In dieser Aufgabe war Legion eindeutig nicht mehr "zuerst machen, dann protokollieren", sondern "zuerst designen, zuerst prüfen, zuerst das Gate passieren, dann machen".

Diese Aufgabe enthielt:

- `docs/rfc.md`
- `docs/spec-dev.md`
- `docs/spec-test.md`
- `docs/spec-bench.md`
- `docs/spec-obs.md`
- Review-Ergebnisse
- Sicherheitsprüfungs-Blocker
- Walkthrough und PR-Body

Das bedeutete, dass Legion begann, eine komplexe Aufgabe in mehrere stabile Ebenen zu zerlegen:

1.  **RFC**: Absicht ausrichten
2.  **Dev/Test/Bench/Obs Spec**: Vorab klarstellen, "wie wird verifiziert?"
3.  **Review**: Richtungsprobleme möglichst vor Arbeitsbeginn aufdecken
4.  **Implementierung und Verifizierung**: Günstige Checks nach vorne verlagern
5.  **Bericht und PR-Artefakte**: Der Abnahme dienen

Dies entspricht genau der im Blogbeitrag erwähnten "Absichtsausrichtung + geschichtete Verifizierung".

### 2. Sicherheits- und Ressourcenprobleme treten als vorgelagerte Blocker auf

In Aufgaben wie `http-proxy-service` und `http-proxy-app-implementation` waren Reviews nicht mehr nur Vorschläge, sondern enthielten direkt `blocking`-Einträge.

Zum Beispiel:

- SSRF-Risiko
- DoS-Risiko
- Nicht begrenzte Antwortkörpergröße
- Nebenläufigkeits- und Warteschlangenparameter nicht secure-by-default
- Unklare Grenzen der Umgebungsvariablenkonfiguration

Dies zeigt, dass Legion begann, eine neue Verantwortung zu übernehmen:

> Nicht nur protokollieren, "warum das so gemacht wurde", sondern auch, "warum es jetzt nicht gemacht werden kann, es sei denn, diese Bedingungen werden zuerst erfüllt".

Das ist ein Design-Gate.

Der Blogbeitrag sagt, wenn Multi-Agenten-Systeme anfangen zu scheitern, ist der erste menschliche Impuls oft, längere RFCs zu schreiben, strengere Reviews durchzuführen und das Risiko ganz nach vorne zu verlagern. In dieser Phase institutionalisierte Legion genau diesen Instinkt.

### 3. Es begann, einer kleinen Produktionspipeline zu ähneln

In dieser Phase war die Rolle von Legion nicht mehr "helfen, sich zu erinnern", sondern "helfen, die Arbeitsreihenfolge einzuschränken".

Entsprechend der Pipeline im Blogbeitrag:

- `Intent`: Benutzerziele, Nicht-Ziele, Einschränkungen
- `Plan`: Aufgabenzerlegung, Meilensteine, Grenzen
- `Execute`: Implementierung
- `Verify`: Build / Test / Benchmark / Review
- `Report`: Walkthrough / PR-Body
- `Memory`: Kontext / Entscheidungsprotokoll / archivierte Aufgabe

Dieser Schritt ist entscheidend, denn er bedeutet:

> Legion trägt nicht mehr nur den Kontext, sondern beginnt, den Prozess zu tragen.

---

## V. Meilenstein: Die HTTP-Proxy-Serie macht Legion wirklich engineering-tauglich

Wenn die vorherigen Phasen noch ein experimentelles Gefühl von "wachsen während der Arbeit" hatten, dann waren die `http-proxy`-bezogenen Aufgaben im Grunde der erste echte Meilenstein der Reife von Legion.

Dies deckt sich mit der Beschreibung im Blogbeitrag: Sie erwähnen ausdrücklich, dass die `http-proxy`-Aufgabe über mehrere Projekte hinweg der Punkt war, an dem Sie das Gefühl hatten, "ich kann mich im Wesentlichen vom Programmieren lösen und nur wenige Review-Kommentare hinterlassen".

Aus der `.legion`-Historie heraus ist diese Einschätzung gut belegt.

### 1. Es war keine einzelne Aufgabe, sondern ein Aufgaben-Cluster

Zugehörige Aufgaben umfassten mindestens:

- `http-proxy-service`
- `http-proxy-app-implementation`
- `vendor-http-services-rollout`
- `http-proxy-metrics`
- `http-services-terminalinfos-ready`
- `vendor-tokenbucket-proxy-ip`

Das war kein punktueller Bedarf, sondern eine Reihe sich gegenseitig bedingender Engineering-Aufgaben:

- Zuerst die Basisbibliothek
- Dann die Anwendungsschicht
- Dann das Rollout
- Dann Metriken ergänzen
- Dann Routing / IP-Readiness ergänzen
- Dann mit anbieterseitiger Ratenbegrenzungs- und Lastlogik verknüpfen

Das heißt, Legion begann bereits, eine echte **aufgaben-, paket- und phasenübergreifende Entwicklung** zu unterstützen.

### 2. Die Review-Schleife wurde deutlich länger, aber gleichzeitig stabiler

Besonders `http-proxy-app-implementation` veranschaulicht die Reife von Legion sehr gut:

- Einerseits gab es viele Reviews und viele Streitpunkte;
- Andererseits blieben diese Streitpunkte nicht im Chat-Protokoll, sondern wurden zu RFC-Updates, Review-Ergebnissen und Kontextentscheidungen.

In dieser Aufgabe sieht man sehr typische Engineering-Debatten:

- Beeinflusst `allowedHosts` das Anfrageverhalten oder nur die Metriken?
- Muss `absolute-form` der einzig unterstützte Pfad sein?
- Wie werden die Grenzen von `invalid_url`, `blocked`, `error` definiert?
- Wie kontrolliert man das High-Cardinality-Risiko von `target_host` / `target_path`?

Das sind keine Probleme, die durch "Programmierfähigkeit" direkt gelöst werden können, sondern Probleme der **Normgrenzen, Verifizierungsgrenzen und Semantikgrenzen**.

Der Wert von Legion lag hier nicht darin, beim Programmieren zu helfen, sondern darin, diese Grenzen zu stabilisieren.

### 3. Es begann, echte für die Abnahme nutzbare Artefakte zu generieren

Dieser Schritt entspricht auch genau dem im Blogbeitrag genannten Punkt "Berichtsschnittstellen sind ein unterschätztes Engineering-Problem".

In der http-proxy-Aufgabenserie generierte Legion bereits stabil:

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- pr-body
- spec-test / spec-bench / spec-obs

Dies zeigt, dass Legion nicht mehr damit zufrieden war, "die Dinge zu erledigen", sondern begann, "die Dinge klar darzulegen, die Beweise daran zu binden und die Risiken zu benennen" zu unterstützen.

Mit anderen Worten:

> Zu diesem Zeitpunkt begann Legion, wirklich der "kostengünstigen Abnahme" zu dienen, nicht nur der "effizienten Ausführung".

Dies ist auch eine besonders wichtige Erkenntnis im Blogbeitrag: Das Teuerste sind nicht die Tokens, sondern Nacharbeit und Aufmerksamkeitsverlust.

Solange die Berichtsschnittstelle nicht engineering-tauglich ist, muss der Mensch immer noch viel Energie darauf verwenden, zu erraten, was der Agent tatsächlich getan hat. In dieser Phase löste Legion dieses Problem offensichtlich bereits aktiv.

---

## VI. Reifephase: Von der Engineering-Pipeline zum Governance-System

Betrachtet man die weitere Entwicklung, zeigt sich die Reife von Legion nicht nur in "immer mehr Dokumenten", sondern darin, dass sich **Governance-Strukturen** zu verfestigen begannen.

### 1. Die Aufgabenerstellung wird durch Genehmigungsstrategien eingeschränkt

Die aktuelle `taskCreationPolicy` in `.legion/config.json` ist bereits `agent-with-approval`.

Dieser Schritt ist sehr symbolträchtig.

Er bedeutet, dass Legion begann, eine Tatsache anzuerkennen:

> Nicht alle komplexen Aufgaben sollten vom Agenten selbst entschieden werden, wann sie erstellt und vorangetrieben werden.

Dahinter steckt genau das im Blogbeitrag beschriebene, tiefer liegende Problem:

- Wenn Modelle immer leistungsfähiger werden, sollte der Prozess dann mehr Freiheiten geben?
- Wenn ja, wo liegen die Grenzen?
- Was muss zuerst menschlich genehmigt werden, was kann automatisch vorangetrieben werden?

Die Antwort von Legion ist keine vollständige Autonomie, sondern **kontrollierte Autonomie**.

Das heißt:

- Agenten können erkunden, organisieren, vorschlagen;
- Aber bevor komplexe Arbeiten in die offizielle Ausführung gehen, muss immer noch eine menschliche Genehmigung erfolgen.

Dies kommt den Arbeitsmechanismen in einer echten Organisation bereits sehr nahe.

### 2. Reviews sind nicht mehr nur Vorschläge, sondern zustandsbehaftete Kollaborationsprotokolle

Aus der Ledger-Statistik geht hervor, dass `legion_list_reviews` und `legion_respond_review` bereits zahlreiche Einträge verzeichneten.

Dies zeigt, dass Reviews in Legion keine Nebenfunktion sind, sondern eine Hauptfunktion.

Noch wichtiger ist, dass es nicht um "Kommentare lesen" geht, sondern um:

- Unerledigte Punkte auflisten
- Auf ein bestimmtes Review antworten
- Als resolved / wontfix / need-info markieren
- Review-Abschluss bestätigen

Dies unterscheidet sich sehr von gewöhnlichen Markdown-Anmerkungen. Es verwandelt "Kommentare" von Text in eine zustandsverfolgbare Maschine.

Die Bedeutung dieses Schrittes ist:

> Die Kommunikation zwischen Mensch und Agent ist nicht mehr nur Sitzungsnachrichten, sondern protokollierbare, nachverfolgbare, prüfbare Protokollaktionen.

### 3. Es begann, "Risikoakzeptanz" zu tragen, nicht nur "Problembehebung"

Ein weiteres Zeichen eines reifen Systems ist nicht, "alle Risiken sind gelöst", sondern "das System kann unterscheiden, welche Risiken jetzt gelöst werden und welche jetzt akzeptiert werden".

In Aufgaben wie `http-proxy-app-implementation`, `vendor-tokenbucket-proxy-ip` usw. war bereits zu sehen:

- Einige Sicherheitsprobleme wurden nach Prüfung als `wontfix` markiert.
- Einige Risiken wurden explizit als vom Benutzer akzeptiert protokolliert.
- Einige Verhaltensweisen wurden als verbleibendes Risiko beibehalten, nicht vage vergessen.

Dies zeigt, dass Legion nicht mehr nur ein "Tool zum Beheben von Bugs" war, sondern begann, die Realität von Engineering-Entscheidungen zu tragen:

- Einige Probleme müssen sofort behoben werden.
- Einige Probleme werden zuerst protokolliert, später verwaltet.
- Einige Probleme werden durch aktuelle Umgebungsannahmen abgefedert.

Das ist Governance.

---

## VII. Aktuellstes Beispiel höchster Reife: `heavy-rfc`

Wenn man aus den bestehenden Aufgaben einen Repräsentanten wählen müsste, der den Reifegrad von Legion am besten verkörpert, würde ich `heavy-rfc` wählen.

Diese Aufgabe kann fast als vollständiges Paradigma des aktuellen Legion-Workflows betrachtet werden.

### 1. Von Anfang an gab es Risikostufung und Phasendeklaration

Es wurde nicht einfach "Live Trading implementieren" geschrieben, sondern von Anfang an klar festgelegt:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Das heißt, diese Aufgabe war nicht "zuerst implementieren, dann Dokumentation ergänzen", sondern sie erkannte zuerst an, dass es sich um eine Hochrisikoaufgabe handelt, daher musste zuerst der Heavy-RFC-Prozess durchlaufen werden.

### 2. Es hatte bereits eine vollständige Artefaktkette

Unter `heavy-rfc` waren bereits enthalten:

- `task-brief.md`
- `research.md`
- `rfc.md`
- `review-rfc.md`
- `test-report.md`
- `review-code.md`
- `review-security.md`
- `report-walkthrough.md`
- `pr-body.md`

Diese Artefaktkette selbst zeigt, dass Legion bereits eine Hochrisiko-Engineering-Aufgabe in mehrere prüfbare, verifizierbare, übergabefähige Ebenen zerlegt hatte.

### 3. Es verkörpert die im Blogbeitrag beschriebene Arbeitsweise "zuerst Absicht bündeln, dann Ausführung freigeben"

Der Blogbeitrag enthält eine sehr zentrale Erkenntnis:

> Autonomie bedeutet nicht, klug genug zu sein, sondern wenig zu stören, viel Output zu liefern und überprüfbar zu sein.

`heavy-rfc` verkörpert genau das:

- Zuerst die Richtung durch Designdokumente und Reviews festlegen
- Dann das Implementierungsrisiko durch Tests und Prüfungen senken
- Schließlich die Abnahmekosten durch Report / PR-Body senken

Das bedeutet, dass Legion inzwischen in der Lage ist, eine neue Arbeitshaltung zu unterstützen:

> Der Mensch setzt hauptsächlich Ziele, Grenzen, wichtige Reviews; der Agent ist verantwortlich für die Umsetzung, Verifizierung und Berichterstattung innerhalb institutionalisierter Bahnen.

Genau das ist die im Blogbeitrag am Ende beschriebene Rollenveränderung: Vom Ausführenden zum Prüfenden, Entscheidenden, Systemweiterentwickelnden.

---

## VIII. Betrachtung der Reifeentwicklung anhand des "Ausmaßes und Umfangs" von Tasks

Betrachtet man alle Tasks zusammen, erkennt man, dass die Reife von Legion nicht nur in der zunehmenden Prozesskomplexität liegt, sondern auch darin, dass sich der Aufgabentyp selbst weiterentwickelt.

### 1. Frühe Phase: Punktuelle Implementierungsaufgaben

Repräsentant: `implement-quote-service`

Merkmale:

- Einzelthema
- Grenzen relativ klar
- Dokumentation dient hauptsächlich dem Verständnis und der Übergabe
- Legion dient hauptsächlich dem Task-Tracking

### 2. Mittlere Phase: Design-kontroverse Aufgaben

Repräsentanten: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Merkmale:

- Über mehrere Module hinweg
- Betreffen viel historischen Ballast und lokale Best Practices
- Dichte an Kommentaren / Reviews
- Legion dient hauptsächlich der Externalisierung impliziten Wissens

### 3. Meilensteinphase: Projektübergreifende Engineering-Aufgaben

Repräsentanten: `http-proxy-*` Serie

Merkmale:

- Paketübergreifend
- Enthalten RFC / Spec / Benchmark / Security Review
- Enthalten Rollout, Beobachtung, Rollback, Bericht
- Legion dient hauptsächlich der vollständigen Engineering-Pipeline

### 4. Aktuelle Phase: Hochrisiko-Governance-Aufgaben

Repräsentant: `heavy-rfc`

Merkmale:

- Klare Risikostufung
- Klare Genehmigungs-Gates
- Klare Review-Schleife
- Vollständige Dokumenten- und Beweiskette
- Legion dient hauptsächlich der Governance und dem Lieferprotokoll

Mit anderen Worten, das "Ausmaß und der Umfang" der Tasks selbst sind der Spiegel des Reifegrads von Legion.

Am Anfang bearbeitete es nur "eine Funktion implementieren"; später begann es, "eine Art komplexes Engineering" zu bearbeiten; heute bearbeitet es bereits "wie man Hochrisikoarbeiten auf kontrollierte Weise vorantreibt".

---

## IX. Wie diese Entwicklung mit den Gedanken im Blogbeitrag korrespondiert

Wenn man jetzt auf "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" zurückblickt, stellt man fest, dass viele der im Blogbeitrag getroffenen Einschätzungen in der Geschichte von Legion bereits umgesetzt wurden.

### 1. "Erster Geschmack des Scale-Sweet-Spots"

Im Blogbeitrag heißt es: Mehrere Agenten, die parallel Aufgaben vorantreiben, vermitteln kurzfristig ein Gefühl mechanisierter Ernte.

In der Legion-Historie entspricht dies dem schnellen Wachstum der Tasks ab Dezember 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

Dies zeigt, dass das anfängliche Kernziel tatsächlich war: **Zuerst den Agenten mehr Arbeit machen lassen**.

### 2. "Der Engpass bin ich selbst"

Der Blogbeitrag sagt, nachdem die Ausführungsarbeit an Agenten delegiert wurde, werden die wahren menschlichen Engpässe Kontextmanagement, Abnahme und Entscheidungsfindung.

Das frühe Trio von Legion löste genau dieses Problem:

- `tasks.md` reduziert Kontextverlust
- `context.md` protokolliert Entscheidungen und wichtige Dateien
- `plan.md` verhindert, dass Aufgabenziele abdriften

### 3. "Mauer des impliziten Wissens"

Der Blogbeitrag sagt, Agenten lernen oft sichtbare Beispiele, wissen aber nicht, was der aktuelle Standard ist.

Legions Antwort war:

- Reviews in den Plan schreiben
- Einschränkungen in den Kontext schreiben
- Designkontroversen als strukturierte Dokumente schreiben

Also: Implizites Wissen externalisieren.

### 4. "Absichtsausrichtung + geschichtete Verifizierung"

Die Pipeline aus dem Blogbeitrag wurde in `http-proxy` und `heavy-rfc` fast wortwörtlich umgesetzt:

- Intent: Ziel / Nicht-Ziele / Umfang
- Plan: Phase / RFC / Design-Zusammenfassung
- Execute: Implementierung
- Verify: Test / review-code / review-security / Bench
- Report: Walkthrough / pr-body
- Memory: Kontext / archivierte Aufgabe / Ledger

### 5. "Berichtsschnittstellen sind ein unterschätztes Engineering-Problem"

Der Blogbeitrag betont, dass Schlussfolgerungen möglichst an Artefakte gebunden sein sollten.

Die Praxis von Legion geht bereits deutlich in diese Richtung:

- Eine Schlussfolgerung ist nicht nur ein Satz, sondern entspricht Report, Review, Test-Report, PR-Body
- Der Mensch muss nicht den gesamten Code neu lesen, sondern kann zuerst die verdichteten Artefakte lesen

Auch wenn es noch nicht der vorgestellte Citation Agent ist, die Richtung ist bereits klar.

### 6. "Benchmarks werden zur Notwendigkeit"

Der Blogbeitrag sagt, in Zukunft muss man verschiedene Workflows oder Modellversionen vergleichen können, nicht nach Gefühl.

In Legion gibt es dafür bereits frühe Implementierungen:

- `spec-bench.md`
- Benchmark-Szenarien und Schwellenwerte
- Bench-Output und Berichte

Das heißt, dieser Weg ist keine Idee mehr, sondern beginnt, engineering-tauglich zu werden.

---

## X. Die wichtigste Veränderung: Legion verändert nicht nur Agenten, sondern auch die Rolle des Menschen

Oberflächlich betrachtet scheint das Wachstum von Legion zu sein:

- Mehr Dokumente
- Mehr Reviews
- Längere Prozesse

Aber die wirklich entscheidende Veränderung ist nicht das, sondern dass **die Mensch-Maschine-Arbeitsteilung neu definiert wurde**.

In früheren Zeiten war die menschliche Rolle ungefähr:

- Persönlich ausführen
- Persönlich erinnern
- Persönlich den gesamten Kontext abfangen

Als Legion allmählich reifte, wurde die menschliche Rolle langsam zu:

- Ziele und Einschränkungen setzen
- Designgrenzen prüfen
- Blockierende Reviews bearbeiten
- Artefakte und Risiken abnehmen
- Das gesamte Kollaborationssystem weiterentwickeln

Das ist auch der letzte Satz der Zusammenfassung im Blogbeitrag:

> Was ich jetzt tue, ist nicht "mit KI mehr Code schreiben", sondern "mit KI mich selbst skalieren".

Legion ist die Engineering-Umsetzung dieses Ziels.

Es verwandelt "sich selbst skalieren" von einem abstrakten Wunsch in eine kollaborative Struktur, die umgesetzt, geprüft, nachbereitet und kontinuierlich optimiert werden kann.

---

## XI. Letzte Zusammenfassung: Wie Legion Schritt für Schritt gewachsen ist

Verdichtet man die gesamte Entwicklung noch einmal, erhält man eine klare Fünf-Stufen-Theorie.

### Erste Stufe: Zuerst nichts vergessen

Zuerst mit `plan/context/tasks` Aufgaben, Fortschritt und Übergabe aus dem Kopf holen.

### Zweite Stufe: Implizites Wissen aufschreiben

Durch `REVIEW`, Entscheidungsprotokolle und Kontextaufzeichnungen lokales Projektwissen externalisieren, um die Fehlerwahrscheinlichkeit von Agenten beim Anpassen alter Beispiele zu verringern.

### Dritte Stufe: Zuerst designen, dann ausführen

Durch RFC, Spec, Review Design-Gates festlegen, teure Nacharbeit nach vorne verlagern.

### Vierte Stufe: Verifizierung und Berichterstattung engineering-tauglich machen

Durch Test, Bench, Review-Code, Review-Security, Walkthrough, PR-Body Verifizierung und Abnahme kostengünstig machen.

### Fünfte Stufe: Autonomie in kontrollierte Autonomie verwandeln

Durch Vorschlag, Genehmigung, Review-Status, Ledger-Prüfung Multi-Agenten-Kollaboration von "funktioniert" zu "governance-fähig" vorantreiben.

Die endgültige Schlussfolgerung ist also nicht "Legion macht Agenten stärker", sondern:

> Legion ermöglicht es, die Fähigkeiten von Agenten erstmals auf engineering-taugliche Weise stabil zu nutzen.

Es ist kein punktuelles Effizienztool, sondern ein System, das sich allmählich um "wenig stören, viel Output liefern, überprüfbar, übergabefähig, wenig Verschleiß" herum entwickelt hat.

Deshalb kann seine Entwicklungsbahn fast direkt als Engineering-Fußnote zu diesem Blogbeitrag dienen:

- Der Blogbeitrag schreibt Prinzipien;
- Die Legion-Historie zeigt, wie diese Prinzipien zu Systemen, Dokumenten, Prozessen und Artefakten werden.

Beides zusammen ergibt die vollständige Geschichte.

---

## Anhang: Einige Aufgaben, die als Meilenstein-Beobachtungspunkte dienen können

Wenn man die Entwicklung von Legion schnell nachvollziehen möchte, würde ich mir zuerst diese Aufgaben ansehen:

1.  `implement-quote-service`
    - Ausgangsbeispiel von Legion
    - Früheste Formung des Trios

2.  `vex-series-data-ohlcinterestrate-ohlc-v2`
    - Typischste Externalisierung impliziten Wissens
    - Extrem hohe Dichte an Reviews/Kommentaren

3.  `http-proxy-service`
    - Design-Gates und Spec-Formung beginnen

4.  `http-proxy-app-implementation`
    - Sehr vollständig: Gegenprüfung, Semantikgrenzen, Risikoakzeptanz, Artefakt-Output

5.  `vendor-tokenbucket-proxy-ip`
    - Vollständige Kette: Mehrere RFC-Gegenprüfungen -> Implementierung -> Verifizierung -> PR -> externe Review-Behebung

6.  `heavy-rfc`
    - Aktuellstes Beispiel höchster Reife
    - Sehr vollständig: Risikostufung, Design-Only, Review-Schleife, Lieferartefakte

Wenn `implement-quote-service` für "Legion ist geboren" steht, dann steht `http-proxy-*` für "Legion ist erwachsen geworden", und `heavy-rfc` steht dafür, dass "Legion bereits wie ein reifes System arbeitet".
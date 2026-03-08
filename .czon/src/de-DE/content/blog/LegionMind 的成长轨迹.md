---
title: Die Entwicklungsbahn von Legion: Vom Aufgabenprotokollierer zum Multi-Agenten-Engineering-Betriebssystem
date: 2026-03-08
---

# Die Entwicklungsbahn von Legion: Vom Aufgabenprotokollierer zum Multi-Agenten-Engineering-Betriebssystem

## Einleitung

Dieses Dokument versucht, eine konkrete Frage zu beantworten: Wie sind wir von "am Anfang fast nichts" schrittweise dazu gekommen, Legion zu dem relativ ausgereiften Multi-Agenten-Engineering-Kollaborationssystem zu machen, das es heute ist?

Das Material hier stammt hauptsächlich aus drei Teilen:

-   Die Git-Historie von `.legion/`
-   Der Status und die Prüfprotokolle von `.legion/config.json` und `.legion/ledger.csv`
-   Das im Blogbeitrag "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" bereits klar dargelegte Denkgerüst

Wenn man diese Entwicklung in einem Satz zusammenfassen müsste, dann wäre es ungefähr so:

> Am Anfang wollten wir nur, dass der Agent mehr für uns erledigt; später stellten wir fest, dass es nicht um den Aufbau "stärkerer Programmierfähigkeiten" geht, sondern um ein ganzes Engineering-System, das "Agenten weniger stören, mehr produzieren, verifizierbar und übergabefähig" macht. Legion ist in diesem Prozess aus einem Aufgabenprotokollierer Schritt für Schritt zu einem Multi-Agenten-Engineering-Betriebssystem herangewachsen.

---

## I. Zuerst der aktuelle Stand: Was Legion bereits ist

Beginnen wir nicht am Anfang, sondern schauen wir uns die aktuelle Form an.
Vom Zustand des Repositories aus betrachtet ist Legion kein loses Dokumentensammelsurium mehr, sondern ein laufendes Workflow-System:

-   `.legion/config.json` enthält bereits 33 Aufgabeneinträge.
-   Die Statusverteilung ist ungefähr: 9 `archived`, 22 `paused`, 2 `active`.
-   `.legion/ledger.csv` enthält kumuliert 2339 Prüfeinträge.
-   Häufige Aktionen sind: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
-   Die aktuelle Strategie zur Aufgabenerstellung ist `agent-with-approval`, d.h. ein Agent kann zunächst nur einen Vorschlag machen, er kann keine Aufgabe direkt erstellen, sondern benötigt eine explizite Genehmigung.

Diese Fakten zusammengenommen zeigen, dass Legion heute bereits mehrere stabile Fähigkeiten besitzt:

1.  **Aufgabenpersistenz**: Aufgaben, Kontext und Fortschritt werden extern gespeichert, anstatt nur in einer Sitzung zu existieren.
2.  **Design-Gates**: Komplexe Aufgaben können nicht einfach so begonnen werden; es gibt zuerst einen Vorschlag, einen Plan, ein RFC, bevor es in die Ausführung geht.
3.  **Review-Schleife**: Kommentare sind keine Chat-Historie, sondern strukturierte Review-Einträge mit Status.
4.  **Nachweisprodukte**: Viele Aufgaben haben nicht nur `plan/context/tasks`, sondern generieren auch `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Prüfung und Governance**: Das System weiß, wer wann welche Entscheidung getroffen, welche Phase vorangetrieben oder auf welches Review geantwortet hat.

Dies entspricht tatsächlich bereits weitgehend der im Blogbeitrag beschriebenen Pipeline:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Mit anderen Worten: Legion heute ist kein "Notizsystem zur Unterstützung beim Programmieren" mehr, sondern eine "Protokollschicht, die festlegt, wie mehrere Agenten arbeiten".

---

## II. Der Ausgangspunkt: Zuerst die Aufgaben aus dem Kopf holen

Der Ausgangspunkt von Legion war sehr schlicht.

Aus der Git-Historie geht hervor, dass `.legion` erstmals umfangreich ins Repository aufgenommen wurde, und zwar mit dem Commit `implement-quote-service` am 15.12.2025. Dieser Commit führte gleichzeitig ein:

-   `.legion/config.json`
-   `.legion/ledger.csv`
-   `.legion/tasks/implement-quote-service/plan.md`
-   `.legion/tasks/implement-quote-service/context.md`
-   `.legion/tasks/implement-quote-service/tasks.md`

Dieser Startpunkt ist entscheidend, denn er etablierte das minimale Dreigestirn von Legion:

### 1. `plan.md`

Beantwortet die Frage "Was ist zu tun?".

In `implement-quote-service` war `plan.md` keine einfache To-Do-Liste mehr, sondern enthielt relativ vollständig:

-   Ziel
-   Hintergrund und Motivation
-   Nicht-Ziele
-   Umfang
-   Phasenplanung
-   Vertragszusammenfassung
-   Design pro Anbieter

Das heißt, von Anfang an war es kein "Todo-Liste", sondern ein leichtgewichtiges Designdokument.

### 2. `context.md`

Beantwortet die Frage "Was ist passiert, warum wurde das so gemacht?".

In dieser Phase war der offensichtlichste Wert von `context.md`:

-   Wichtige Dateien festhalten
-   Wichtige Entscheidungen festhalten
-   Verifizierungsergebnisse festhalten
-   Schnelle Übergabe ermöglichen

Im Wesentlichen ersetzte es "das, was ich mir gerade im Kopf zurechtgelegt habe".

### 3. `tasks.md`

Beantwortet die Frage "Wo stehen wir gerade?".

Dieser Schritt ist wichtig, denn sobald Multi-Agenten- oder Mehrfachsitzungen beginnen, verzerrt sich zuerst nicht der Code, sondern der Fortschrittsstatus.

Im Blogbeitrag wurde erwähnt, dass ein Mensch nur zwei bis drei Kontexte pro Tag stabil verwalten kann; darüber hinaus kommt es zu Planungsfehlern. Der erste Schritt von Legion bestand im Wesentlichen darin, den "Aufgabenstatus" aus dem menschlichen Gehirn auszulagern.

Die Legion der Startphase kann also verstanden werden als:

> Zuerst dafür sorgen, dass Aufgaben nicht verloren gehen, dass der Kontext wiederhergestellt werden kann und dass Agenten nicht nach der Erledigung alles vergessen.

Dies entspricht vollständig der im Blogbeitrag genannten Anforderung, "den Kontext aus dem Kopf auszulagern".

---

## III. Die erste Evolution: Vom Aufgabenprotokoll zur Externalisierung impliziten Wissens

Wenn die erste Phase das Problem "Nicht vergessen, was gerade getan wird" löste, dann löste die zweite Phase das, was im Blogbeitrag als "Mauer des impliziten Wissens" bezeichnet wurde.

### 1. Aufgaben werden komplexer, Reviews tauchen massiv auf

Ab Mitte/Ende Dezember 2025 begannen in Legion-Plan-Dokumenten massiv `> [REVIEW]`-Blöcke aufzutauchen.

Typische Aufgaben waren:

-   `yuantsexchange-ohlcinterestrate`
-   `vendors-ingest-ohlc-interest-rate`
-   `task-vex-queryquotes-swr`
-   `task-vex-quote-upstream-refactor`
-   `vex-series-data-ohlcinterestrate-ohlc-v2`

Die gemeinsamen Merkmale dieser Aufgaben waren:

-   Sie waren nicht einfach "nach einer Vorlage abzuschreiben".
-   Sie betrafen alte Implementierungen, Entwicklungsgeschichte, Stilpräferenzen, lokale Best Practices.
-   Was über Erfolg oder Misserfolg entschied, waren nicht syntaktische Fähigkeiten, sondern "zu wissen, was übernommen werden sollte und was nicht".

Zum Beispiel konnte man im Review von `vex-series-data-ohlcinterestrate-ohlc-v2` einen sehr typischen Prozess der "Explizitmachung impliziten Wissens" beobachten:

-   An dieser Stelle sollte nicht auf die bestehende Implementierung Bezug genommen werden, da diese fehlerhaft ist.
-   Zunächst dachte man, VEX bräuchte keine komplexe Ratenbegrenzung, später wurde neu bewertet, dass bestimmte Ratenbegrenzungsstrategien beibehalten werden sollten.
-   Die Codierungsregeln für `series_id`, die Merge-Semantik, die Fairness der Warteschlange usw. waren kein "Weltwissen", das das Modell natürlich aus dem Code ableiten konnte, sondern lokales Wissen, das sich innerhalb des Projekts entwickelt hatte.

Dies entspricht genau der im Blogbeitrag beschriebenen Schichtung:

-   Ebene 1 sind die Anweisungen für die aktuelle Aufgabe;
-   Ebene 2 sind technische Projektentscheidungen und lokale Best Practices;
-   Was Agenten am ehesten zum Scheitern bringt, ist genau Ebene 2.

Die Rolle von Legion in dieser Phase bestand darin, Ebene 2 gewaltsam aufzuschreiben.

### 2. Kommentare sind nicht mehr nur Kommentare, sondern eine Kollaborationsschnittstelle

Eine weitere entscheidende Veränderung in dieser Phase: Kommentare wurden nicht mehr nur zu "vorübergehenden Anmerkungen", sondern entwickelten sich allmählich zu strukturierten Eingaben, die geschlossen werden konnten.

Zum Beispiel:

-   Einige Reviews änderten direkt die Designrichtung.
-   Andere forderten, Fehlersemantik zu ergänzen.
-   Wieder andere forderten, Over-Engineering zu entfernen.
-   Und andere forderten, nicht auf bestehende fehlerhafte Implementierungen Bezug zu nehmen.

Wenn diese Inhalte nur in der Chat-Historie existierten, gingen sie in der nächsten Runde des Agenten fast sicher verloren; sobald sie in `plan.md` oder `context.md` landeten, wurden sie aus "mündlichem Wissen" zu "einem Teil der Aufgabentatsache".

Die Legion der zweiten Phase war also im Wesentlichen nicht mehr nur ein Task-Tracker, sondern begann, die Funktion eines **externen Gehirns** zu übernehmen.

Dieser Schritt ist sehr wichtig, denn er entspricht einer im Blogbeitrag betonten Kernwende:

> Ein externes Gehirn ist kein Sahnehäubchen, sondern eine Notwendigkeit bei komplexen Projekten.

---

## IV. Die zweite Evolution: Vom externen Gehirn zum Design-Gate

Als die Aufgaben immer komplexer wurden, reichte das bloße "Aufschreiben von Wissen" nicht mehr aus. Das neue Problem wurde:

> Was ist, wenn mehrere Agenten zusammenarbeiten, aber die Richtung selbst falsch ist?

Hier trat Legion in die dritte Phase ein: Vom "Protokollsystem" zum "Design-Gate-System".

### 1. RFCs und Specs werden Teil des Hauptprozesses

Ein entscheidender Wendepunkt war `http-proxy-service`.

Bei dieser Aufgabe war Legion offensichtlich nicht mehr "zuerst machen, dann protokollieren", sondern "zuerst designen, zuerst prüfen, zuerst das Gate passieren, dann machen".

Diese Aufgabe enthielt:

-   `docs/rfc.md`
-   `docs/spec-dev.md`
-   `docs/spec-test.md`
-   `docs/spec-bench.md`
-   `docs/spec-obs.md`
-   Review-Ergebnisse
-   Sicherheitsprüfungs-Blockierungen
-   Walkthrough und PR-Body

Das bedeutete, dass Legion begann, eine komplexe Aufgabe in mehrere stabile Ebenen zu zerlegen:

1.  **RFC**: Absicht abgleichen
2.  **Dev/Test/Bench/Obs Spec**: Vorab klarstellen, "wie wird verifiziert"
3.  **Review**: Richtungsprobleme möglichst vor Arbeitsbeginn aufdecken
4.  **Implementierung und Verifizierung**: Günstige Prüfungen vorziehen
5.  **Bericht und PR-Produkte**: Für die Abnahme dienen

Dies stimmt weitgehend mit dem im Blogbeitrag erwähnten "Absichtsabgleich + geschichtete Verifizierung" überein.

### 2. Sicherheits- und Ressourcenprobleme treten als vorgelagerte Blockierungen auf

Bei Aufgaben wie `http-proxy-service` und `http-proxy-app-implementation` waren Reviews nicht mehr nur Vorschläge, sondern enthielten direkt `blocking`.

Zum Beispiel:

-   SSRF-Risiko
-   DoS-Risiko
-   Nicht begrenzte Antwortkörpergröße
-   Nebenläufigkeits- und Warteschlangenparameter nicht secure-by-default
-   Unklare Grenzen der Umgebungsvariablenkonfiguration

Dies zeigte, dass Legion begann, eine neue Verantwortung zu übernehmen:

> Nicht nur protokollieren, "warum das so gemacht wurde", sondern auch "warum es jetzt nicht gemacht werden kann, es sei denn, diese Bedingungen werden zuerst erfüllt".

Das ist das Design-Gate.

Im Blogbeitrag hieß es, wenn Multi-Agenten-Systeme zu scheitern beginnen, ist die erste menschliche Reaktion oft, längere RFCs zu schreiben, strengere Reviews durchzuführen und Risiken ganz nach vorne zu verlagern. Legion institutionalisierte in dieser Phase genau diesen Instinkt.

### 3. Es begann, einer kleinen Produktionspipeline zu ähneln

In dieser Phase war die Rolle von Legion nicht mehr "helfen, sich zu erinnern", sondern "helfen, die Arbeitsreihenfolge einzuschränken".

Entsprechend der Pipeline im Blogbeitrag:

-   `Intent`: Benutzerziele, Nicht-Ziele, Einschränkungen
-   `Plan`: Aufgabenzerlegung, Meilensteine, Grenzen
-   `Execute`: Implementierung
-   `Verify`: build / test / benchmark / review
-   `Report`: walkthrough / PR body
-   `Memory`: context / decision log / archived task

Dieser Schritt ist entscheidend, denn er bedeutet:

> Legion trug nicht mehr nur den Kontext, sondern begann, den Prozess zu tragen.

---

## V. Meilenstein: Die HTTP-Proxy-Serie macht Legion wirklich engineering-tauglich

Wenn die vorherigen Phasen noch ein experimentelles Gefühl von "wachsen während der Arbeit" hatten, dann war die `http-proxy`-bezogene Aufgabe im Grunde der erste echte Meilenstein der Reife von Legion.

Dies deckt sich mit meiner Beschreibung im Blogbeitrag: Die `http-proxy`-Aufgabe über mehrere Projekte hinweg war tatsächlich ein Punkt, an dem ich deutlich das Gefühl bekam, "ich kann mich im Wesentlichen vom Programmieren lösen und nur noch wenige Review-Kommentare hinterlassen".

Aus der `.legion`-Historie heraus ist diese Einschätzung gut belegt.

### 1. Es war keine einzelne Aufgabe, sondern ein Aufgabencluster

Zugehörige Aufgaben umfassten mindestens:

-   `http-proxy-service`
-   `http-proxy-app-implementation`
-   `vendor-http-services-rollout`
-   `http-proxy-metrics`
-   `http-services-terminalinfos-ready`
-   `vendor-tokenbucket-proxy-ip`

Das war keine punktuelle Anforderung, sondern eine Reihe miteinander verbundener Engineering-Aufgaben:

-   Zuerst die Grundbibliothek
-   Dann die Anwendungsschicht
-   Dann das Rollout
-   Dann Metriken ergänzen
-   Dann Routing / IP-Bereitschaft ergänzen
-   Dann mit anbieterseitiger Ratenbegrenzungs- und Lastlogik verknüpfen

Mit anderen Worten: Legion begann bereits, eine echte **aufgaben-, paket- und phasenübergreifende Entwicklung** zu unterstützen.

### 2. Die Review-Schleife wurde deutlich länger, aber gleichzeitig stabiler

Besonders `http-proxy-app-implementation` veranschaulicht die Reife von Legion sehr gut:

-   Einerseits gab es viele Reviews und viele Streitpunkte;
-   Andererseits blieben diese Streitpunkte nicht in der Chat-Historie, sondern wurden zu RFC-Updates, Review-Ergebnissen und Kontextentscheidungen.

In dieser Aufgabe sah man sehr typische Engineering-Debatten:

-   Beeinflusst `allowedHosts` das Anfrageverhalten oder nur die Metriken?
-   Muss `absolute-form` der einzig unterstützte Pfad sein?
-   Wie werden die Grenzen von `invalid_url`, `blocked`, `error` definiert?
-   Wie kontrolliert man das High-Cardinality-Risiko von `target_host` / `target_path`?

Das waren keine Probleme, die durch "Programmierfähigkeit" direkt gelöst werden konnten, sondern Probleme der **Norm-, Verifizierungs- und Semantikgrenzen**.

Der Wert von Legion lag hier nicht darin, beim Programmieren zu helfen, sondern darin, diese Grenzen zu stabilisieren.

### 3. Es begann, echte für die Abnahme verwendbare Artefakte zu generieren

Dieser Schritt entspricht auch genau dem im Blogbeitrag erwähnten "Berichtsschnittstellen sind ein unterschätztes Engineering-Problem".

In der http-proxy-Aufgabenserie generierte Legion bereits stabil:

-   RFC
-   review-rfc
-   review-code
-   review-security
-   report-walkthrough
-   pr-body
-   spec-test / spec-bench / spec-obs

Dies zeigte, dass Legion nicht mehr damit zufrieden war, "die Dinge zu erledigen", sondern begann, "die Dinge klar darzulegen, Beweise anzufügen und Risiken zu benennen" zu unterstützen.

Anders ausgedrückt:

> Zu diesem Zeitpunkt begann Legion, wirklich "kostengünstiger Abnahme" zu dienen, nicht nur "effizienter Ausführung".

Dies ist auch eine besonders wichtige Erkenntnis im Blogbeitrag: Das Teuerste sind nicht die Tokens, sondern Nacharbeit und Aufmerksamkeitsverlust.

Solange die Berichtsschnittstelle nicht engineering-tauglich ist, muss man immer noch viel Energie darauf verwenden, zu erraten, was der Agent tatsächlich getan hat. Legion hatte in dieser Phase offensichtlich bereits begonnen, dieses Problem aktiv zu lösen.

---

## VI. Reifephase: Von der Engineering-Pipeline zum Governance-System

Betrachtet man die weitere Entwicklung, zeigt sich die Reife von Legion nicht nur in "immer mehr Dokumenten", sondern darin, dass sich eine **Governance-Struktur** zu verfestigen begann.

### 1. Die Aufgabenerstellung wurde durch Genehmigungsstrategien eingeschränkt

Die aktuelle `taskCreationPolicy` in `.legion/config.json` ist bereits `agent-with-approval`.

Dieser Schritt ist sehr symbolträchtig.

Er bedeutet, dass Legion begann, eine Tatsache anzuerkennen:

> Nicht alle komplexen Aufgaben sollten vom Agenten selbst entschieden werden, wann sie erstellt und vorangetrieben werden.

Dahinter steckt genau das im Blogbeitrag erwähnte tiefere Problem:

-   Wenn Modelle immer leistungsfähiger werden, sollte der Prozess dann mehr Befugnisse delegieren?
-   Wenn Befugnisse delegiert werden, wo liegen die Grenzen?
-   Was muss zuerst menschlich genehmigt werden, was kann automatisch vorangetrieben werden?

Die Antwort von Legion war keine vollständige Autonomie, sondern **kontrollierte Autonomie**.

Das heißt:

-   Agenten können erkunden, organisieren, vorschlagen;
-   Aber bevor komplexe Arbeiten in die formale Ausführung gehen, muss immer noch eine menschliche Genehmigung vorliegen.

Dies kommt einem echten Arbeitsmechanismus in einer Organisation bereits sehr nahe.

### 2. Reviews waren nicht mehr nur Vorschläge, sondern zustandsbehaftete Kollaborationsprotokolle

Aus der Ledger-Statistik geht hervor, dass `legion_list_reviews` und `legion_respond_review` bereits viele Einträge verzeichneten.

Dies zeigt, dass Reviews in Legion keine Nebenfunktion waren, sondern eine Hauptfunktion.

Noch wichtiger ist, dass es nicht "Kommentare lesen" war, sondern:

-   Unerledigte Punkte auflisten
-   Auf ein Review antworten
-   Als resolved / wontfix / need-info markieren
-   Review-Abschluss bestätigen

Dies unterscheidet sich sehr von gewöhnlichen Markdown-Anmerkungen. Es verwandelte "Kommentare" von Text in eine zustandsverfolgbare Zustandsmaschine.

Die Bedeutung dieses Schrittes ist:

> Die Kommunikation zwischen Mensch und Agent war nicht mehr nur Sitzungsnachrichten, sondern protokollierbare, nachverfolgbare, prüfbare Protokollaktionen.

### 3. Es begann, "Risikoakzeptanz" zu tragen, nicht nur "Problembehebung"

Ein weiteres Zeichen eines reifen Systems ist nicht, "alle Risiken sind gelöst", sondern "das System kann unterscheiden, welche Risiken jetzt gelöst werden und welche jetzt akzeptiert werden".

In Aufgaben wie `http-proxy-app-implementation`, `vendor-tokenbucket-proxy-ip` usw. war bereits zu sehen:

-   Einige Sicherheitsprobleme wurden nach Prüfung als `wontfix` markiert
-   Einige Risiken wurden explizit als vom Benutzer akzeptiert protokolliert
-   Einige Verhaltensweisen wurden als verbleibendes Risiko beibehalten, anstatt vage vergessen zu werden

Dies zeigte, dass Legion nicht mehr nur ein "Werkzeug zum Beheben von Bugs" war, sondern begann, die Realität von Engineering-Entscheidungen zu tragen:

-   Einige Probleme müssen sofort behoben werden
-   Einige Probleme werden zuerst protokolliert, später verwaltet
-   Einige Probleme werden durch aktuelle Umgebungsannahmen abgefedert

Das ist Governance.

---

## VII. Aktuellstes Beispiel höchster Reife: `heavy-rfc`

Wenn man aus den bestehenden Aufgaben ein Beispiel auswählen müsste, das den Reifegrad von Legion am besten widerspiegelt, würde ich `heavy-rfc` wählen.

Diese Aufgabe kann fast als vollständiges Paradigma des aktuellen Legion-Workflows betrachtet werden.

### 1. Von Anfang an gab es Risikostufung und Phasendeklaration

Es wurde nicht einfach "Live-Trading implementieren" geschrieben, sondern von Anfang an klar festgelegt:

-   `rfcProfile=heavy`
-   `stage=design-only`
-   `risk=high`

Das heißt, diese Aufgabe war nicht "zuerst implementieren, dann Dokumentation ergänzen", sondern sie erkannte zuerst an, dass es sich um eine Hochrisikoaufgabe handelte, die daher zunächst den heavy-RFC-Prozess durchlaufen musste.

### 2. Es hatte bereits eine vollständige Produktkette

Unter `heavy-rfc` waren bereits enthalten:

-   `task-brief.md`
-   `research.md`
-   `rfc.md`
-   `review-rfc.md`
-   `test-report.md`
-   `review-code.md`
-   `review-security.md`
-   `report-walkthrough.md`
-   `pr-body.md`

Diese Produktkette allein zeigt, dass Legion eine Hochrisiko-Engineering-Aufgabe bereits in mehrere prüfbare, verifizierbare, übergabefähige Ebenen zerlegt hatte.

### 3. Es verkörperte die im Blogbeitrag beschriebene Arbeitsweise "zuerst Absicht bündeln, dann Ausführung freigeben"

Im Blogbeitrag gibt es eine sehr zentrale Erkenntnis:

> Autonomie bedeutet nicht, klug genug zu sein, sondern weniger zu stören, mehr zu produzieren, verifizierbar zu sein.

`heavy-rfc` verkörperte genau das:

-   Zuerst die Richtung durch Designdokumente und Reviews festlegen
-   Dann das Implementierungsrisiko durch Tests und Prüfungen senken
-   Schließlich die Abnahmekosten durch report / PR body senken

Das bedeutete, dass Legion zu diesem Zeitpunkt bereits eine neue Arbeitshaltung unterstützen konnte:

> Der Mensch setzt hauptsächlich Ziele, Grenzen, wichtige Reviews; der Agent ist verantwortlich für die Implementierung, Verifizierung und Berichterstattung innerhalb institutionalisierter Bahnen.

Genau das ist der im Blogbeitrag abschließend zusammengefasste Rollenwechsel: Vom Ausführenden zum Prüfenden, Entscheidenden, Systemweiterentwickelnden.

---

## VIII. Betrachtung der Reifegradsteigerung anhand des "Ausmaßes und Umfangs" von Tasks

Betrachtet man alle Tasks zusammen, erkennt man, dass die Reife von Legion nicht nur in einer höheren Prozesskomplexität liegt, sondern sich auch in der Aufwertung der Aufgabentypen selbst zeigt.

### 1. Frühe Phase: Punktuelle Implementierungsaufgaben

Beispiel: `implement-quote-service`

Merkmale:

-   Einzelthema
-   Grenzen relativ klar
-   Dokumentation dient hauptsächlich dem Verständnis und der Übergabe
-   Legion übernimmt hauptsächlich Task-Tracking

### 2. Mittlere Phase: Design-kontroverse Aufgaben

Beispiele: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Merkmale:

-   Über mehrere Module hinweg
-   Betreffen viel historischen Ballast und lokale Best Practices
-   Dichte an Kommentaren / Reviews
-   Legion übernimmt hauptsächlich Externalisierung impliziten Wissens

### 3. Meilensteinphase: Projektübergreifende Engineering-Aufgaben

Beispiel: `http-proxy-*` Serie

Merkmale:

-   Über Pakete hinweg
-   Enthalten RFC / spec / benchmark / security review
-   Enthalten Rollout, Beobachtung, Rollback, Bericht
-   Legion übernimmt hauptsächlich vollständige Engineering-Pipeline

### 4. Aktuelle Phase: Hochrisiko-Governance-Aufgaben

Beispiel: `heavy-rfc`

Merkmale:

-   Klare Risikostufung
-   Klare Genehmigungs-Gates
-   Klare Review-Schleife
-   Vollständige Dokumenten- und Beweiskette
-   Legion übernimmt hauptsächlich Governance und Lieferprotokoll

Mit anderen Worten: Das "Ausmaß und der Umfang" der Tasks selbst sind der Spiegel des Reifegrads von Legion.

Am Anfang behandelte es nur "eine Funktion implementieren"; später begann es, "eine Art komplexes Engineering" zu behandeln; jetzt behandelt es bereits "wie man Hochrisikoarbeiten auf kontrollierte Weise vorantreibt".

---

## IX. Wie diese Entwicklung mit den Gedanken im Blogbeitrag übereinstimmt

Wenn man jetzt auf "[Gedanken zu AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)" zurückblickt, erkennt man, dass viele der im Blogbeitrag getroffenen Einschätzungen bereits in der Geschichte von Legion umgesetzt wurden.

### 1. "Erster Geschmack des Scale-Sweet-Spots"

Im Blogbeitrag hieß es: Mehrere Agenten, die parallel Aufgaben vorantreiben, vermitteln kurzfristig ein Gefühl mechanisierter Ernte.

In der Legion-Historie entspricht dies dem schnellen Wachstum der Tasks ab Dezember 2025:

-   quote service
-   quote routing
-   SWR
-   scheduler
-   OHLC / interest rate
-   token bucket

Dies zeigt, dass das ursprüngliche Kernziel tatsächlich war: **Zuerst den Agenten mehr arbeiten lassen**.

### 2. "Der Engpass bin ich selbst"

Im Blogbeitrag hieß es, nachdem die Ausführungsarbeit an Agenten delegiert wurde, werden die wirklichen menschlichen Engpässe Kontextmanagement, Abnahme und Entscheidungsfindung.

Das frühe Dreigestirn von Legion löste genau dieses Problem:

-   Mit `tasks.md` Kontextverlust reduzieren
-   Mit `context.md` Entscheidungen und wichtige Dateien protokollieren
-   Mit `plan.md` Aufgabenziele nicht abdriften lassen

### 3. "Mauer des impliziten Wissens"

Im Blogbeitrag hieß es, Agenten lernen oft sichtbare Beispiele, wissen aber nicht, was der aktuelle Standard ist.

Die Antwort von Legion war:

-   Reviews in den Plan schreiben
-   Einschränkungen in den Kontext schreiben
-   Designkontroversen als strukturierte Dokumente schreiben

Also: Implizites Wissen externalisieren.

### 4. "Absichtsabgleich + geschichtete Verifizierung"

Die Pipeline aus dem Blogbeitrag wurde in `http-proxy` und `heavy-rfc` fast originalgetreu umgesetzt:

-   Intent: Goal / Non-goals / Scope
-   Plan: Phase / RFC / Design Summary
-   Execute: Implementierung
-   Verify: test / review-code / review-security / bench
-   Report: walkthrough / pr-body
-   Memory: context / archived task / ledger

### 5. "Berichtsschnittstellen sind ein unterschätztes Engineering-Problem"

Der Blogbeitrag betonte, dass Schlussfolgerungen möglichst an Artefakte gebunden sein sollten.

Die Praxis von Legion ging bereits deutlich in diese Richtung:

-   Schlussfolgerungen sind nicht nur ein Satz, sondern entsprechen report, review, test-report, PR body
-   Menschen müssen nicht den gesamten Code neu lesen, sondern können zuerst verdichtete Artefakte lesen

Auch wenn es noch nicht mein vorgestellter Citation Agent ist, ist die Richtung bereits klar.

### 6. "Benchmark wird zur Notwendigkeit"

Im Blogbeitrag hieß es, in Zukunft müssen verschiedene Workflows oder Modellversionen verglichen werden können, nicht nach Gefühl.

In Legion gab es bereits frühe Implementierungen:

-   `spec-bench.md`
-   Benchmark-Szenarien und Schwellenwerte
-   Bench-Ausgabe und Bericht

Das heißt, dieser Weg war keine Idee mehr, sondern begann, engineering-tauglich zu werden.

---

## X. Die wichtigste Veränderung: Legion veränderte nicht nur die Agenten, sondern auch die Rolle des Menschen

Oberflächlich betrachtet könnte man meinen, das Wachstum von Legion bestehe aus:

-   Mehr Dokumenten
-   Mehr Reviews
-   Längeren Prozessen

Aber die wirklich entscheidende Veränderung war nicht das, sondern dass **die Mensch-Maschine-Arbeitsteilung neu definiert wurde**.

In früheren Zeiten war die Rolle des Menschen ungefähr:

-   Persönlich ausführen
-   Persönlich erinnern
-   Persönlich den gesamten Kontext auffangen

Als Legion allmählich reifte, wurde die Rolle des Menschen langsam zu:

-   Ziele und Einschränkungen setzen
-   Designgrenzen prüfen
-   Blockierende Reviews bearbeiten
-   Artefakte und Risiken abnehmen
-   Das gesamte Kollaborationssystem weiterentwickeln

Das ist auch der abschließende Satz im Blogbeitrag:

> Was ich jetzt tue, ist nicht "mit KI mehr Code schreiben", sondern "mit KI mich selbst skalieren".

Legion ist genau die Engineering-Umsetzung dieses Ziels.

Es verwandelte "sich selbst skalieren" von einem abstrakten Wunsch in eine umsetzbare, prüfbare, nachvollziehbare, kontinuierlich optimierbare Kollaborationsstruktur.

---

## XI. Vom aktuellen Stand aus den nächsten Schritt betrachten: Die neueste Entwicklungsrichtung, repräsentiert durch `~/Work/legion-mind`

Betrachtet man nur die `.legion/`-Historie im Yuan-Repository, sieht man, wie Legion in einem realen Projekt Stück für Stück erzwungen wurde; betrachtet man jedoch das aktuelle `~/Work/legion-mind`, erkennt man, dass Legion bereits begonnen hat, sich in die nächste Phase weiterzuentwickeln.

Dieser Schritt ist sehr wichtig, denn er zeigt, dass das Ziel von Legion nicht mehr nur "in einem Repository gut funktionieren" ist, sondern beginnt, diese Erfahrung in ein **installierbares, migrierbares, benchmarkfähiges, wiederverwendbares** generisches Autopilot Kit zu destillieren.

Aus `~/Work/legion-mind/README.md` und `docs/legionmind-usage.md` geht hervor, dass die neueste Richtung mindestens fünf Merkmale aufweist.

### 1. Vom "Workflow innerhalb eines Repositories" zum "generischen Orchestrierungstemplate"

In Yuan wuchs Legion anfangs mit konkreten Aufgaben; in `legion-mind` wurde es explizit zu einem generischen Agent-Orchestrierungstemplate abstrahiert:

-   primary agent: `legion`
-   subagents: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
-   skill: `skills/legionmind`

Dies zeigt, dass die neueste Version von Legion "Multi-Agenten-Kollaboration" nicht mehr als temporäres Zusammenziehen mehrerer Agenten versteht, sondern beginnt, es als folgendes zu modellieren:

-   Der orchestrator ist für den Prozessfortschritt verantwortlich
-   Subagenten sind für eine einzige Verantwortung zuständig
-   `.legion/` ist für persistente Zustände und Prüfungen verantwortlich

Mit anderen Worten: Legion entwickelt sich von einem "erfahrungsbasierten Workflow" zu einem "Rollen-klaren Orchestrierungssystem".

### 2. Von manuellen Aufrufen zu befehlsorientierten Einstiegspunkten

Eine der offensichtlichsten Veränderungen in `legion-mind` ist die Befehlsorientierung häufiger Workflows:

-   `/legion`
-   `/legion-impl`
-   `/legion-rfc-heavy`
-   `/legion-pr`
-   `/legion-bootstrap`
-   `/evolve`

Das scheint nur eine Optimierung der Nutzererfahrung zu sein, ist es aber im Wesentlichen nicht.

Es bedeutet, dass Legion beginnt, Vereinbarungen wie "welche Phasen, in welcher Reihenfolge, wann nur Design, wann weiter implementieren, wann Erfahrungen konsolidieren" weiter von impliziten SOPs zu expliziten Befehlen zu verfestigen.

Anders ausgedrückt: Frühes Legion beschränkte Prozesse hauptsächlich auf der Dokumentenebene; die aktuelle Richtung ist, die Prozesse selbst eine weitere Ebene nach vorne zu schieben und sie in eine direkt auslösbare Bedienoberfläche zu verfestigen.

### 3. Vom Aufgaben-Gedächtnis zum aufgabenübergreifenden Playbook

Legion im Yuan-Repository konnte bereits den Kontext einzelner Aufgaben persistieren; in `legion-mind` ging es noch einen Schritt weiter: Es begann, `.legion/playbook.md` und `/evolve` einzuführen.

Das ist entscheidend, denn es löst ein Problem auf einer anderen Ebene:

-   `plan/context/t
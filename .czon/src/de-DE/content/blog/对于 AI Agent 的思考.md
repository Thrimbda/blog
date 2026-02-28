---
title: Gedanken zu AI Agents
date: 2026-02-26
---

> Dieser Artikel wurde von mir und ChatGPT gemeinsam geschrieben. Meine Beobachtung ist: ChatGPT hat starke logische Fähigkeiten, aber sein Chinesisch-Ausdruck ist wirklich seltsam. Ich frage mich, bei wem es Chinesisch gelernt hat.

Als mich der Alarm mitten in der Nacht aus dem Bett riss, wusste ich schon, wie der Abend enden würde: **Der Alarm würde funktionieren, aber die Logs wären Müll.** Die CPU-Spitze auf dem Bildschirm stach wie eine Nadel in die Blase des "sieht-ganz-okay-aus"-Systems; und während ich auf diesen Haufen nicht-nachvollziehbarer Logs starrte, notierte ich mir mental einen weiteren Punkt – Verfügbarkeit wird nicht durch Gebete erreicht.

Von diesem Moment an war ich mir auch einer Sache noch sicherer: Was ich im Moment eigentlich mache, ist nicht "mit KI mehr Code schreiben", sondern **mich selbst mit KI skalieren**. Zuerst mich selbst aus der Position des Ausführenden herausholen und zur Person werden, die dirigiert, abnimmt und für die Iteration dieses Systems verantwortlich ist. Dann erst versuchen, mit diesem System andere zu skalieren.

Dieser Essay beginnt mit diesem Thema. Ich starte die Multi-Agents, verbrauche Tokens und spüre die Freude eines Schöpfers. Dann pralle ich sofort gegen die "implizite Wissensmauer" des Projekts und bin gezwungen, Dinge wie Evaluation, Reporting und Gedächtnis – diese "unscheinbaren Dinge" – wieder aufzunehmen. Dazwischen Erkältung, Kochen, Brettspiele, Editor-Wechsel – das sind keine Abschweifungen, es sind die echten Randbedingungen meines Systems: **Ich habe nur ein Gehirn, ein Tag hat nur 24 Stunden, und ich werde wirklich müde.**

---

## Der erste süße Geschmack von Skalierung

An diesem Tag habe ich den Multi-Agent-Modus von Opencode wirklich genutzt: Fünf Agents bearbeiteten gleichzeitig fünf Probleme. Die Erfahrung dieser zwei Stunden erinnerte mich stark daran, als ich die erste Aufgabe von 6.824 (Distributed Systems) zum Laufen brachte: Ein verteiltes MapReduce-System lokal laufen zu lassen – Logs flogen nur so über den Bildschirm, Aufgaben wurden parallel vorangetrieben, meine Produktivität wechselte von "manueller Feldarbeit" zu "mechanisierter Ernte".

Währenddessen wurde das wöchentliche Token-Limit meines Codex Plus Plans zum ersten Mal so schnell aufgebraucht.

Parallelisierung macht schnell süchtig, weil sie sich so gut anfühlt: Man muss nicht ständig danebenstehen, man kann sich kurzzeitig sogar einreden, den Engpass überwunden zu haben. Aber der Preis der Parallelisierung ist direkt: **Die Kosten sind linear, und Fehler werden verstärkt.** Wenn die anfängliche Richtung falsch ist, bedeutet Multi-Agent nicht "mehrere Wege ausprobieren", sondern "fünf Autos fahren gemeinsam in den Graben".

Meine Definition von "Autonomie" verwandelte sich daher schnell von einem Slogan in drei konkrete Ziele – ich formulierte sie wie SLIs:

- **Störe mich so wenig wie möglich** (Kosten für Unterbrechungen senken)
- **Arbeite so viel wie möglich** (Effektiven Output erhöhen)
- **Sei so zuverlässig wie möglich** (Nicht vom Kurs abkommen, nicht abstürzen, mich nicht in den Sumpf der Nacharbeit ziehen)

Diese drei Ziele tauchten später immer wieder auf und wurden zum Nordstern für alle Design-Entscheidungen von LegionMind.

---

## Der Engpass bin ich selbst

Nachdem ich die Ausführungsarbeit so weit wie möglich an die Agents delegiert hatte, wurden menschliche Rationalität und Begehren zum Engpass für den Fortschritt.

Mein Workflow sieht ungefähr so aus: Entwicklung, Tagesplanung, Denken und Output – ich kann maximal zwei bis drei Kontexte gleichzeitig im stabilen Zustand halten. Darüber hinaus versagt mein Scheduling, und Erschöpfung baut sich wie ein Speicherleck langsam auf. Das Multi-Agent-System hat dieses Problem nicht beseitigt, es hat nur die "Ausführungslast" weggenommen. Aber **Kontext-Management, Abnahme, Entscheidungsfindung** – das muss immer noch ich machen, und weil die KI die Ausführung wirklich schnell erledigt, ist die Belastung in anderen Bereichen sogar größer geworden.

Erst als ich begann, "Arbeitsprotokolle" ehrlicher zu betrachten, entstand dieses [Arbeitsjournal 2026](https://0xc1.space/diary/diary-2026/). Wie ich darin auch erwähnte, schreibe ich es nicht, um mich später an Details zu erinnern, sondern um **den Kontext aus meinem Kopf zu entladen**. Das Protokollieren selbst ist eine Sortierung der Gedankenkette, wie das Aufräumen und Zurückschreiben von Dirty Pages aus dem Arbeitsspeicher auf die Festplatte.

Ich stellte sogar fest: Wenn das Journal zu einem "ich-muss-mich-jetzt-30-Minuten-hinsetzen-und-schreiben"-Ritual wird, erzeugt es Angst; Angst führt zum Aussetzen; nach ein paar Tagen Pause häuft sich immer mehr an, und es wird immer schwerer, wieder anzufangen. So schön das Systemdesign auch sein mag, wenn es auf menschliche Gewohnheiten trifft, wird es von der Realität durchbrochen. Dazu forsche ich noch. Kommen wir jetzt aber zurück zum Thema KI.

---

## Die "implizite Wissensmauer": Was erwarten wir, wenn wir einer KI Anweisungen geben?

Als ich Agents wirklich in komplexe Projekte einbrachte – besonders in solche mit Monorepo, über mehrere Packages hinweg – passierte ein typischer Unfall sehr schnell:

Ich wies einen Agent an, sich an einer ähnlichen Implementierung (z.B. `vendor-okx`) zu orientieren, um ein neues Modul einzubinden. Das Ergebnis: Er übernahm nicht nur die korrekte Schreibweise, sondern auch **veraltete Praktiken**: In meinem konkreten Fall war das das Schreiben eines Account-Streams in einen längst nicht mehr genutzten Entrypoint. Für mich war das "längst weiterentwickeltes Projektwissen"; für einen neuen Agenten war diese Evolution unsichtbar.

In diesem Moment wurde mir klar: Das "Lernen" eines Agents ähnelt eher einer Anpassung an sichtbare Beispiele, als einem Verständnis der Geschichte aus dem Organisationsgedächtnis. **Er weiß nicht, was der "aktuelle Standard" ist.**

Damit wurde ein "externes Gehirn" von einem netten Extra zu einer Notwendigkeit. Aber ein externes Gehirn hat auch einen harten Preis: Seine Pflege selbst verbraucht Aufmerksamkeit, und Aufmerksamkeit ist genau die Ressource, die mir am meisten fehlt.

Ich versuchte einmal, mit einer Reihe von `AGENT.md`-Dateien ein Projektgedächtnis aufzubauen, stieß aber schnell auf Schwierigkeiten: Wie unterscheidet man zwischen Rauschen und Erfahrungen, die es wert sind, festgehalten zu werden? Das ist kein Problem der Dokumentation, es ist ein **Evaluationsproblem** – man muss wissen, was einen Agent zum Scheitern bringt und was seine Erfolgsrate signifikant erhöht, bevor man es ins "Gedächtnis" schreibt.

Was erwarten wir eigentlich, wenn wir einer KI Anweisungen geben? Wenn man diese Struktur in ein Blockdiagramm für "Anweisungs-/Wissensebenen" gliedert, erhält man folgendes Ergebnis:

```
┌────────────────────────────┐
│ ① Aktuelle Aufgabenanweisung (klar formulierbar) │
├────────────────────────────┤
│ ② Projekttechnische Entscheidungen / lokale Best Practices │  ← Am leichtesten "implizit", am leichtesten für Fehler
├────────────────────────────┤
│ ③ Domänenhintergrund (Worum geht es?) │
├────────────────────────────┤
│ ④ Ingenieurswissen / Stilpräferenzen / Erfahrungsschatz │
├────────────────────────────┤
│ ⑤ Allgemeinwissen / Weltwissen │
└────────────────────────────┘
```

In einem einzigen Gespräch kann man der KI wirklich nur die oberste Ebene klar vermitteln.

Die Schlussfolgerung ist: Je kleiner der Kontext, je klarer die Anweisung, je weniger historischer Ballast, desto leichter kann die KI hochwertige Arbeit leisten. Je mehr impliziter Hintergrund, desto wahrscheinlicher wird "seltsame Arbeit".

Das ist auch der Grund für die Entstehung von LegionMind. Nicht zu verlangen, dass die Person, die die Anweisung gibt, "einen perfekten Prompt schreiben kann", sondern das implizite Wissen der zweiten Ebene in etwas zu verwandeln, das geladen und wiederverwendet werden kann.

---

## Intent Alignment + Schichtweise Validierung

Die aktuelle Version von LegionMind zwingt den Agent dazu, basierend auf der Benutzeranweisung projektrelevante Informationen zu sammeln und in einem detaillierten, RFC-ähnlichen Dokument festzuhalten, um die Benutzeranforderungen von Anfang an bestmöglich abzugleichen. Der Grund ist einfach:

Wenn ein Multi-Agent-System zu scheitern beginnt, ist die erste menschliche Reaktion oft: Längere RFCs schreiben, strengere Reviews durchführen, das Risiko ganz nach vorne verlagern. Die Zusammenarbeit zwischen Mensch und KI wird in eine annähernd wasserfallartige Form zurückgedrängt: Linearer Fortschritt, geringe Flexibilität, und was fatal ist: **Es verursacht eine größere mentale Belastung für mich**.

Wie schaffen es menschliche Organisationen, dass Entscheidungsträger auf höherer Ebene nicht von Informationen überflutet werden? Wie schaffen es menschliche Entscheidungsträger, ihren Untergebenen freie Hand zu lassen? Dazu hat CZ einige [Gedanken](https://readme.zccz14.com/zh-Hans/how-to-solve-human-control-desire-controllable-trust-in-human-machine-collaboration.html).

Im Wesentlichen geht es um:

1. **Intent Alignment**: Den Agent auf Kurs halten.
2. **Schichtweise Validierung**: Fehler frühzeitig aufdecken und leicht rückgängig machen können, anstatt erst am Ende festzustellen, dass die Richtung falsch war.

Das sind keine leeren Worte. Ich habe ihm ein "Produktions-Fließband"-Flussdiagramm zur Seite gestellt, um meine Interaktion mit den Agents zu strukturieren:

```
          ┌──────────┐
          │  Intent   │  Ziel / Randbedingungen / Was nicht zu tun ist
          └────┬─────┘
               │
          ┌────▼─────┐
          │   Plan    │  Zerlegung / Meilensteine / Annahmen
          └────┬─────┘
               │
          ┌────▼─────┐
          │ Execute   │  Code schreiben / Konfig ändern / Dokumente generieren
          └────┬─────┘
               │
     ┌─────────▼─────────┐
     │     Verify         │  Schichtweise Validierung (je günstiger, desto früher)
     │  - build/lint/test │
     │  - e2e/bench       │
     │  - model eval      │
     │  - human review    │
     └─────────┬─────────┘
               │
          ┌────▼─────┐
          │  Report   │  Schlussfolgerung + Beweise + Risiken
          └────┬─────┘
               │
          ┌────▼─────┐
          │  Memory   │  "Erinnerungswürdige" Unterschiede festhalten
          └────┬─────┘
               └──(Feedback an Intent/Plan: Bildet eine Schleife)
```

Der Schlüssel dieses Prozesses ist nicht "komplexer", sondern die Validierung nach vorne zu verlagern und Feedback in eine Schleife zu verwandeln. Er bekämpft die zwei häufigsten Verluste:

- In die falsche Richtung weiter parallel voranzuschreiten (massiver Token-Blutverlust)
- Die Richtung ist richtig, aber die Details sind unzuverlässig, was zu wiederholter Nacharbeit führt (mentale Abnutzung)

---

## Zwei Sprachen der Evaluation: pass@k und pass^k

Ein [Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609) darüber, wie man die Leistung von AI Agents bewertet, war für mich sehr aufschlussreich.

Bei der Nutzung von KI zur Aufgabenerledigung gibt es im Allgemeinen zwei völlig unterschiedliche Arbeitstypen:

- **Fähigkeits-Exploration**: Es ist egal, ob es auf Anhieb klappt, man will nur wissen "ob es überhaupt möglich ist". Hier liegt der Fokus auf `pass@k` – mindestens ein Erfolg bei k Versuchen.
- **Produktions-Regression**: "Gelegentlich geht's" ist nicht akzeptabel, "jedes Mal zuverlässig" ist erforderlich. Hier liegt der Fokus auf `pass^k` – alle k Versuche müssen erfolgreich sein.

Dasselbe System sollte in verschiedenen Phasen mit unterschiedlichen Metriken sprechen. In der Explorationsphase kann man weniger vorgeben und der KI-Agentin ihr breites Weltwissen entfalten lassen; in der Regressionsphase müssen wir auf Konsistenz achten.

```
        ┌────────────────┐
        │  Human Eval     │  Mensch prüft Design / Risiken / Randbedingungen (am teuersten)
        ├────────────────┤
        │  Model Eval     │  Rubrik / Alignment / Konsistenzprüfung (mittel)
        ├────────────────┤
        │  Static / Tool  │  build / lint / unit / e2e (am günstigsten)
        └────────────────┘
```

Das Prinzip ist einfach: Was mit Tools beurteilt werden kann, sollte den kognitiven Aufwand minimieren.

---

## Die "Reporting-Schnittstelle" ist ein unterschätztes Engineering-Problem

Die vorherigen Kapitel handelten davon, "wie man Agents arbeiten lässt". Ein weiterer wichtiger Punkt ist "wie ich mit geringen Kosten abnehmen kann". Dieser Teil ist noch in Arbeit, aber ich habe einige einfache Gedanken, die ich hier erwähnen kann.

Die Kernidee ist: Das Reporting der KI darf nicht bei flachem Markdown und Code-Diffs stehen bleiben. In menschlichen Organisationen benötigen Untergebene für Berichte oft PowerPoint, manchmal sogar eine mittlere Führungsebene als "teuren Übersetzer", der komplexe Informationen in entscheidbare Schlussfolgerungen, Beweise und Risiken komprimiert.

Wie sollte also der Report einer KI aussehen?

Eine sehr konkrete Idee: **Jede Schlussfolgerung sollte mit einem Artefakt verlinkt sein.** Zum Beispiel:

- "Diese Funktion ist fertig" → Link zum e2e-Testbericht, kritischen Diffs, Reproduktionsskript.
- "Diese Wahl ist besser" → Link zum Benchmark-Vergleich, Log-Beweisen, Konfigurationsänderungen.
- "Hier gibt es ein Risiko" → Link zur Liste bekannter Unsicherheiten, Rollback-Plan.

Man könnte sogar einen speziellen Citation Agent haben: Er schreibt keinen Code, er macht nur eine Sache – Schlussfolgerungen und Beweise miteinander verknüpfen.

Erst wenn die Reporting-Schnittstelle besser wird, kann der Mensch entspannter sein und echte Autonomie entstehen. Andernfalls, egal wie gut der Agent Code schreiben kann, muss ich immer noch viel Energie darauf verwenden, "zu lesen, was er geschrieben hat, und zu erraten, was er eigentlich getan hat" – das widerspricht meinem Wunsch nach "geringerer Abnutzung".

---

## Engineering-getriebene Iteration

Im Februar wurde Chatgpt Codex 5.3 veröffentlicht, und die Erfahrung fühlte sich wirklich sehr intelligent an. Das weckte in mir eine Sorge: Wenn ich den Workflow zu streng vorgebe, verschwende ich dann vielleicht das Potenzial der KI?

Was LegionMind stets versucht hat, ist: Einen festen Rahmen und eine in der Domäne etablierte SOP (die Ebenen 3 und 4 oben) vorgeben, damit die Agents auf einer vorgegebenen Spur laufen und weniger vom Kurs abkommen. Aber wenn das Modell intelligenter wird, ist der vernünftigere Weg vielleicht – ich gebe nur Ziele, Randbedingungen und Evaluierungsmechanismen vor und lasse es den optimalen Weg selbst entwerfen.

Das bedeutet auch, dass etwas anderes passieren muss: Ich muss die Leistung verschiedener Systemversionen auf wissenschaftlichere Weise vergleichen, anstatt nach Gefühl zu sagen "diese Version ist schlauer".

Damit wurde "Benchmark" in meinem Kopf von einem Gedanken zu einem Muss: Ich brauche einen Satz von Regressionstests für komplexe Codierungsaufgaben, um mit denselben Aufgaben zu quantifizieren:

- `pass@k` (Fähigkeits-Exploration)
- `pass^k` (Produktionszuverlässigkeit)
- Kosten (Tokens / Zeit)
- Nacharbeitsrate (Anzahl menschlicher Eingriffe, Runden von Änderungen)
- Abdeckung (Stabilität über Projekte und Packages hinweg)

Nur so kann ich das System wirklich "iterieren", nicht "meine Stimmung".

In dieser Hinsicht werde ich als Nächstes zwei Dinge tun:

1.  Bestehende LLM-Coding-Benchmarks prüfen, ob etwas direkt nutzbar ist.
2.  Einen eigenen Benchmark (LLM-Interviewfragen) für unsere realen Szenarien entwerfen, um verschiedene LLM- und Legion-Versionen Aufgaben erledigen zu lassen. Vielleicht sogar eine 360°-Bewertung.

---

## 8. Meilenstein

Eines Abends schaffte ich es mit diesem LegionMind-System endlich, eine http-proxy-Aufgabe abzuschließen, die mehrere Projekte umspannte. Der Prozess war nicht elegant und stieß sogar an die Grenzen des aktuellen Systems – Subagents stürzten gelegentlich ab, der Kontext über mehrere Packages hinweg machte die Multi-Agent-Kollaboration fragil.

Aber das Ergebnis war ein Meilenstein, der mir wichtig ist: Ich konnte das Kodieren im Wesentlichen hinter mir lassen. In den meisten Fällen musste ich nur noch wenige Review-Kommentare zu Designdokumenten hinterlassen.

Diese Veränderung fühlt sich sehr angenehm an: Vom Tastatur-Ausführenden zum Prüfer, Entscheider, System-Iterierer zu werden. Das ist, was ich am Anfang meinte: Mich selbst skalieren.

Gleichzeitig bin ich auch eher bereit, ein Realitätsprinzip anzuerkennen: **Baue kein Rad, das von der nächsten Welle weggespült wird.** Wenn ich sehe, dass eine bestimmte Fähigkeitsplattform sich selbst weiterentwickelt (z.B. Opencode bereits einige Dinge tut, die ein Bridge tun könnte), halte ich lieber inne und investiere meine Energie in System-Fähigkeiten, die "mit der steigenden Flut steigen" – Evaluation, Gedächtnis, Reporting, Zuverlässigkeit.

---

## Die gegenseitige Domestizierung von mir und AI Agents

An diesem Punkt angelangt, erkenne ich, dass ich und die AI Agents in den letzten Monaten uns gegenseitig domestiziert haben:

-   Ich domestiziere sie: Mit SOPs, Validierung, Reporting-Schnittstellen, sie vom "Code-schreibenden Modell" zum "auslieferbaren System" zu führen.
-   Sie domestizieren mich: Zwingen mich, menschliche Engpässe anzuerkennen, die Wichtigkeit der Evaluation, dass Organisation und Prozess das Kernproblem sind.

Wenn ich diese Erfahrung in ein paar Sätze komprimieren müsste, glaube ich jetzt ungefähr:

1.  **Autonomie bedeutet nicht nur Klugheit, sondern wenig Störung, hohen Output, Überprüfbarkeit.**
2.  **Das Teuerste sind nicht die Tokens, sondern Nacharbeit und Aufmerksamkeits-Leaks.**
3.  **Implizites Wissen bringt Agents leichter zum Scheitern als Code. Ein externes Gehirn ist notwendig, aber es muss wartbar sein.**
4.  **Validierung muss schichtweise, Ziele phasenweise sein: Erst pass@k, dann pass^k.**
5.  **Die Reporting-Schnittstelle der KI muss engineering-mäßig sein: Schlussfolgerungen müssen Beweise mitbringen, idealerweise mit einem Klick zum Artefakt führen.**
6.  **Wenn Modelle stärker werden, muss der Prozess der KI mehr Freiheit geben; aber Voraussetzung dafür ist ein Benchmark.**

Als Nächstes werde ich wahrscheinlich zwei Dinge tun: Erstens das Benchmark-System aufbauen, damit das "Iterieren von Legion/Multi-Agent-Systemen" messbar wird; zweitens die Report/Citation/Artefakt-Kette vervollständigen, damit ich Dinge leichter und stabiler abgeben kann.

Was den einfachsten Wunsch betrifft – **"möglichst wenig Abnutzung"** – denke ich jetzt, dass es kein Wunsch ist, sondern eine nicht-funktionale Anforderung des Systems. Solange ich noch Code schreibe, noch von Alarms geweckt werde, noch Brettspiele spiele und koche, wird diese Anforderung immer bestehen.
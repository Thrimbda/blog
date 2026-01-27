---
"title": "Arbeitsprotokoll 2026"
"summary": "Dies ist das Arbeitsprotokoll für den Zeitraum vom 22. bis 24. Januar 2026. Der Autor dokumentiert detailliert seine tägliche Praxis bei der Softwareentwicklung (z.B. legionmind-github-bridge, node-unit-Verbesserungen) und Systemgestaltung (Multi-Agent-System) unter Verwendung von KI-Agenten (wie opencode, legionmind). Das Protokoll enthält konkret erledigte Aufgaben, aufgetretene Probleme (z.B. Clustersicherheit, Wissensmodellierung für Agenten), entstandene Ideen (z.B. Steigerung der Agentenautonomie, Design eines Bewertungssystems) sowie Pläne für den Folgetag. Die Kernaussage ist, dass der Autor daran arbeitet, seine persönlichen Fähigkeiten durch KI-Agenten zu erweitern (scale) und effiziente Arbeitsabläufe sowie Methoden zur Agentenbewertung zu erforschen. Die Schlussfolgerung ist, dass ein Gleichgewicht zwischen Agentenautonomie, der Bereitstellung von Kontextwissen und dem persönlichen Energiemanagement gefunden werden muss."
"tags":
  - "Arbeitsprotokoll"
  - "KI-Agent"
  - "Softwareentwicklung"
  - "Effizienzmanagement"
  - "Multi-Agent-System"
  - "Automatisierung"
  - "Persönliche Produktivität"
"date": "2026-01-01"
---

# Inhaltsverzeichnis

1.  [2026](#orgf3197da)
    1.  [2026-01 Januar](#orge03e1ca)
        1.  [2026-01-22](#org4d65f86)
            1.  [Was wurde heute gemacht:](#org1006a17)
            2.  [Welche Gedanken gab es:](#orgdb0ae87)
            3.  [Was ist für morgen geplant?](#org750daf2)
        2.  [2026-01-23](#org287b8dd)
            1.  [Was wurde heute gemacht:](#orgf838e08)
            2.  [Welche Gedanken gab es:](#org8998678)
            3.  [Was ist für morgen geplant?](#orgc688fe4)
        3.  [2026-01-24](#org2a15db2)
            1.  [Was wurde heute gemacht:](#orgab0f160)
            2.  [Welche Gedanken gab es:](#org68bf2d9)
            3.  [Was ist für morgen geplant?](#orge3ab04d)

<a id="orgf3197da"></a>

# 2026

<a id="orge03e1ca"></a>

## 2026-01 Januar

<a id="org4d65f86"></a>

### 2026-01-22

<a id="org1006a17"></a>

#### Was wurde heute gemacht:

1.  Den `opencode-feishu-notifier` refaktorisiert. Er sendet Benachrichtigungen nun auf eine festgelegte Weise an die Nutzer.
2.  Die Entwicklung von `legionmind-github-bridge` durch die KI fortgesetzt. Ich habe begonnen, den Multi-Agent-Modus von `opencode` zu nutzen. Es wurden 5 Agenten gestartet, um 5 Probleme zu bearbeiten. Das Ganze lief zwei Stunden lang und verbrauchte meine gesamten 5 Stunden Codex-Tokens.
3.  Heute ist ein Knoten im `sg`-Cluster ausgefallen. Ich habe mir die Logs angesehen und festgestellt, dass es sich um wiederholte SSH-Angriffsversuche handelte. Das ist nicht gut. Nach kurzer Überlegung gibt es mehrere mögliche Maßnahmen:
    - Passwortauthentifizierung deaktivieren
    - Den SSHd-Zugang für das gesamte Netzwerk schließen
    - Den Cluster hinter einen NAT verschieben
4.  Verschiedene Kleinigkeiten erledigt. `zl` kommt nächste Woche nach Suzhou. Ich habe etwas Zeit für die Planung aufgewendet, was nicht reibungslos verlief. Ich plane nicht, weitere Energie dafür aufzuwenden.

<a id="orgdb0ae87"></a>

#### Welche Gedanken gab es:

In meiner derzeitigen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, alltägliche Planung, Denken und Output. Überschreitet es diesen Rahmen, komme ich mit der Koordination nicht mehr hinterher und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agenten zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:

-   Für Codierungsaufgaben sollte ich den Autonomiegrad der Agenten so weit wie möglich erhöhen, mit folgenden Optimierungszielen:
    1.  Sie sollen mich möglichst selten stören.
    2.  Sie sollen möglichst viel arbeiten.
    3.  Die Zuverlässigkeit ihrer Arbeit soll möglichst gesteigert werden.
-   Auch ich selbst muss mich verbessern:
    1.  Meine mentale Energie muss ich besser managen, um nicht zu schnell erschöpft zu sein.
    2.  Meine Fähigkeit, in mehreren verschiedenen Kontexten gleichzeitig zu arbeiten, muss gesteigert werden, um nichts zu vergessen oder zu verlieren, und ich muss den Fortschritt im Blick behalten.

Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:

1.  Für `legionmind` ein Multiagent-Template entwerfen und es mit `opencode` an einer Codierungsaufgabe von `yuan` testen.
2.  Mit dem Führen des Arbeitsprotokolls fortfahren und eine Methode für das Management von mentaler Energie und Kontexten ausloten.

<a id="org750daf2"></a>

#### Was ist für morgen geplant?

1.  Wie oben erwähnt, ein Experiment mit Multiagenten durchführen.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

---

Zusammenfassend ist mein Hauptziel derzeit, mich selbst mit KI zu skalieren und dann zu versuchen, andere zu skalieren.

<a id="org287b8dd"></a>

### 2026-01-23

Ich hatte heute eine leichte Erkältung und Kopfschmerzen, die Produktivität war niedrig. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.

<a id="orgf838e08"></a>

#### Was wurde heute gemacht:

1.  Mit Hilfe der KI ein Multi-Agent-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
2.  `legionmind-github-bridge` ist wieder ein Stück vorangekommen.
3.  Das Design und die Implementierung der Preemption in `node-unit` angepasst. Bisher wurden, wenn eine `node-unit` fehlschlug, alle darunterliegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
4.  Die Prüfung für die Kontoeröffnung bei einem Futures-Broker (CFFEX) abgelegt. Es war überraschend, dass die Kamera die ganze Zeit an sein und der Bildschirm nicht minimiert oder gewechselt werden durfte. Zum Glück gab es unbegrenzte Versuche – das konnte mich nicht aufhalten. Bestanden mit 95 Punkten.

<a id="org8998678"></a>

#### Welche Gedanken gab es:

Mein Ziel ist es, Agentenautonomie mit möglichst geringem Aufwand zu erreichen. Mein aktueller Workflow sieht so aus:

1.  `legionmind` fungiert als SOP (Standard Operating Procedure) für Entwicklungsarbeit. Es ist eine Agenten-Fähigkeit (agent skill). Ich mag agent skills.
2.  `opencode` ist die Entität des Agenten. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent. Wenn ich `opencode` eines Tages ersetzen müsste, wäre dies meine Implementierungsliste.
3.  Was mir derzeit Kopfzerbrechen bereitet, ist, wie ich skills und diese Subagenten kombinieren soll.

Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich stelle fest, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten notieren und die Gedanken erst am nächsten Morgen beim Aufwachen zusammenfassen.

<a id="orgc688fe4"></a>

#### Was ist für morgen geplant?

1.  Mit diesem Multi-Agent-System etwas Sinnvolles anstellen, z.B. das Finanzkonto von `gate` anbinden.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Clustersicherheit, falls Zeit bleibt.
4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
5.  Morgen kommen Freunde von `sy` zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

<a id="org2a15db2"></a>

### 2026-01-24

Heute habe ich mich ausgeschlafen und bin erst um 11 Uhr aufgewacht. Fühle mich leicht und entspannt, so ausgiebig habe ich lange nicht mehr geschlafen.

<a id="orgab0f160"></a>

#### Was wurde heute gemacht:

1.  Die neue Version von `node-unit` in Betrieb genommen. Der Grund, warum ich sie relativ sorgenfrei deployen konnte, sind meine umfassenden End-to-End-Tests. Konkret: Ein Docker-Container startet eine TimescaleDB (PostgreSQL 17), dann werden zwei `node-unit`-Instanzen gestartet und 21 `@yuants/portal`-Deployments in die Datenbank eingefügt, um zu testen, ob sich der Zustand auf je die Hälfte pro Instanz einpendelt.

    Dieser Test deckt im Wesentlichen ab, was passiert, wenn eine Reihe herrenloser Deployments auftauchen und zwei `node-unit`-Instanzen online gehen: Man kann beobachten, wie sie abwechselnd Deployments übernehmen. Was wirklich fehlt, ist erstens eine echte CPU-/Arbeitsspeicher-Auslastung und zweitens das Szenario, in dem eine `node-unit` ausfällt.

2.  Die neue Multi-Agent-Version von `legionmind` in `Yuan` verwendet, um das Problem der Ausgabe des Kontostroms für das `vendor-gate earn`-Konto zu lösen. Ich ließ den Agenten zunächst mit `legion` Dokumentation erstellen. Insgesamt wurden folgende Dokumente erstellt:

        .legion/tasks/vendor-gate
        ├── context.md
        ├── docs
        │   ├── api-doc.md
        │   ├── pr-body.md
        │   ├── report-walkthrough.md
        │   ├── rfc.md
        │   ├── spec-bench.md
        │   ├── spec-dev.md
        │   ├── spec-obs.md
        │   └── spec-test.md
        ├── plan.md
        └── tasks.md

    Das fühlt sich nach einem vernünftigen Workflow an. Allerdings gibt es Konflikte zwischen meinem neuen Multi-Agent-System und der bestehenden Dokumentationserstellung von `legionmind`. Ich sollte die Grenzen der verschiedenen Aufgaben genau überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument zu schreiben ist, in separaten skills abgelegt werden. `legionmind` sollte dann eine Beschreibung des Arbeitsablaufs sein. Jede Art von Agent sollte in der Lage sein, einige kleinere skills zu laden, um sie bei ihrer Arbeit zu unterstützen.

    Ein weiteres Problem war, dass beim ersten Durchlauf ein Fehler gemacht wurde: Der Kontostrom wurde in `account-actions-with-credential.ts` ausgegeben. Das lag daran, dass ich verlangt hatte, sich an `vendor-okx` zu orientieren, um das Earn-Konto anzubinden. Der Grund für diese Anforderung war, dass derzeit nur das OKX-Earn-Konto ebenfalls als `account` eingebunden ist. Die KI hat jedoch auch einige veraltete Praktiken daraus übernommen. Der aktuelle Standard für den Exchange-Anschluss ist, alle Konten über `provideExchangeServices` bereitzustellen, und nicht `provideAccountActionsWithCredential` für die Kontoanbindung zu verwenden.

    Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie sollte solches Wissen modelliert werden? Wie kann ich einem KI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung stellen? Das ist eine Frage, die es wert ist, tief durchdacht zu werden. Morgen muss ich mich damit genauer befassen.

3.  Nachmittags für die Freunde von `sy` gekocht. Das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter~

<a id="org68bf2d9"></a>

#### Welche Gedanken gab es:

-   Wie oben erwähnt, muss ich genau überlegen, wie ich für KI-Agenten ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Sammlung von `AGENT.md`-Dateien beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist recht hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist ein schwieriges Problem. Derzeit scheint es, dass Erinnerungen wie andere Prompts auch sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um Erinnerungen zu aktualisieren. Das Wichtigste ist immer noch, wie man die Ergebnisse der Arbeit eines KI-Agenten bewertet.

-   Bezüglich des vorherigen Punktes habe ich einen interessanten Artikel gelesen, den ich jetzt in meinen eigenen Worten zusammenfassen möchte: Zunächst kann die Bewertung (Eval) einer einzelnen Agenten-Aufgabe in mehrere Kategorien unterteilt werden:
    1.  Statische Tool-Eval: Compiler, Linter, Unit-Tests, E2E-Tests
    2.  Model-Eval: Ein anderes LLM bewertet anhand eines von uns definierten Prompts.
    3.  Manuelle Eval: Ich bewerte selbst.

    Dann gibt es zwei Arten der systematischen Bewertung eines Agenten-Systems:
    1.  Fähigkeitsbasiert (Capability): Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann dabei niedrig sein, z.B. wenn ich `legion` verwende, um schrittweise größere, schwierigere Aufgaben auszuführen – das fühlt sich an wie die Erkundung einer neuen Grenze.
    2.  Regressionsbasiert: Kann er die Fähigkeiten, die er früher hatte, weiterhin aufrechterhalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie weiterhin stabil erledigt werden können.

    Wenn eine neue Fähigkeit eingeführt wird, sollte der Übergang von fähigkeitsbasiert zu regressionsbasiert erfolgen.

    Der Artikel erwähnt auch zwei sehr wichtige Metriken: `pass@K` und `pass^K`
    -   `pass@k`: Bei k Versuchen mindestens einmal erfolgreich. Je mehr Versuche, desto höher die Wahrscheinlichkeit, mindestens eine brauchbare Lösung zu finden. Anwendbar: Wenn es nur darum geht, "mindestens eine brauchbare Lösung zu finden".
    -   `pass^k`: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Nutzer jedes Mal zuverlässige Ergebnisse vom Agenten erwartet.

    FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   Meine Energie ist immer noch etwas gering. Nachmittags habe ich ein bisschen gearbeitet, abends gekocht, und schon fühle ich mich etwas müde. Wann werde ich wie CZ sein und nicht schlafen müssen?

<a id="orge3ab04d"></a>

#### Was ist für morgen geplant?

1.  Über das Modell dieses Eval-Agenten nachdenken und das Multi-Agent-System weiter iterieren.
2.  Das Clustersicherheitsproblem – muss erledigt werden.
3.  `legion-github-bridge`
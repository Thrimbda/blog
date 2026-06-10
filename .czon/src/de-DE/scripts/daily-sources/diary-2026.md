---
title: 2026 Arbeitsprotokoll
date: 2026-01-01
---

# 2026

## 2026-01 Januar

### 2026-01-22

1.  Was heute getan wurde:
    1.  Den opencode-feishu-notifier umstrukturiert. Er sendet jetzt Benachrichtigungen an Benutzer auf eine festgelegte Weise.
    2.  Die KI mit der Erstellung der legionmind-github-bridge fortfahren lassen. Ich habe begonnen, den Multi-Agenten-Modus von opencode zu nutzen. Er startete 5 Agenten, die an 5 Problemen arbeiteten. Ein Agent arbeitete 2 Stunden lang allein und verbrauchte dabei meine gesamten 5 Stunden Codex-Tokens.
    3.  Heute ist ein Knoten im sg-Cluster ausgefallen. Ich sah in den Logs, dass er ständig von SSH-Brute-Force-Angriffen attackiert wurde. Das ist nicht gut. Eine kurze Analyse ergab mehrere mögliche Maßnahmen:
        - Passwort-Authentifizierung deaktivieren
        - Den SSH-Dienst für das gesamte Netzwerk schließen
        - Den Cluster hinter eine NAT verschieben
    4.  Einige Erledigungen: ZL kommt nächste Woche nach Suzhou. Ich habe etwas Zeit für die Planung aufgewendet, aber es lief nicht gut. Ich werde keine weitere Mühe mehr darauf verwenden.

2.  Gedanken:

    In dieser Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, tägliche Planung, Nachdenken und Output. Wenn es mehr wird, bin ich überfordert und ermüde schnell. Das passiert, obwohl ich versuche, so viel Arbeit wie möglich an KI-Agenten zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen gibt:
    - Für Codierungsaufgaben sollte ich den Autonomiegrad der Agenten so weit wie möglich erhöhen. Einige Optimierungsziele:
      1.  Sie sollten mich so wenig wie möglich stören.
      2.  Sie sollten so viel wie möglich arbeiten.
      3.  Ihre Zuverlässigkeit sollte verbessert werden.
    - Für mich selbst brauche ich auch Verbesserungen:
      1.  Ich muss meine mentale Energie besser managen, damit ich nicht schnell erschöpft bin.
      2.  Die Fähigkeit verbessern, gleichzeitig in mehreren verschiedenen Kontexten zu arbeiten, ohne etwas zu vergessen, und mit Fortschrittsmanagement.

    Basierend auf diesen Überlegungen könnte ich morgen in zwei Richtungen experimentieren:
    1.  Ein Multiagenten-Template für legionmind entwerfen und es mit opencode an einer Codierungsaufgabe von Yuan testen.
    2.  Das Arbeitsprotokoll weiterführen und eine Methode für das Management von mentaler Energie und Kontexten entwickeln.

3.  Was ist morgen geplant?
    1.  Wie oben erwähnt, ein Multiagenten-Experiment durchführen.
    2.  Weiter an der legionmind-github-bridge arbeiten.
    3.  Wenn Zeit bleibt, mich um die Clustersicherheit kümmern.

    —

    Insgesamt ist mein Hauptfokus derzeit, mich selbst mit KI zu skalieren und dann zu versuchen, andere zu skalieren.

### 2026-01-23

Heute bin ich etwas erkältet, habe Kopfschmerzen und eine niedrige Produktivität. Aber ich bin froh, dass ich angefangen habe, tägliche Zusammenfassungen zu schreiben.

1.  Was heute getan wurde:
    1.  Mit Hilfe der KI ein Multiagenten-System entworfen. Dieses System ist noch nicht systematisch verfeinert.
    2.  Die legionmind-github-bridge ist einen Schritt weitergekommen.
    3.  Das Preemption-Design und die Implementierung von node-unit angepasst. Bisher wurden bei einem Fehler eines node-units alle darunterliegenden Deployments gelöscht. Jetzt werden sie einzeln bereinigt.
    4.  Die Prüfung für die Eröffnung eines Terminkontos bei der China Financial Futures Exchange abgelegt. Die Kamera musste die ganze Zeit eingeschaltet sein, und man durfte den Bildschirm nicht minimieren oder wechseln. Zum Glück gab es unbegrenzte Versuche. Das hat mich nicht aufgehalten, ich habe mit 95 Punkten bestanden.

2.  Gedanken:

    Mein Ziel ist es, mit möglichst wenig Reibung eine Agenten-Autonomie zu erreichen. Mein aktueller Workflow ist:
    1.  Legionmind fungiert als SOP für Entwicklungsarbeit. Es ist eine Agenten-Fertigkeit, und ich mag Agenten-Fertigkeiten.
    2.  Opencode ist die Instanz des Agenten. Ich nutze darin Fähigkeiten wie bash / tool calling / langraph / command / subagent. Wenn ich opencode eines Tages fallen lasse, sind dies meine To-Do-Liste.
    3.  Das Problem ist, wie ich diese Fertigkeiten und Unteragenten kombiniere.

    Nach einem ganzen Tag mit Kopfschmerzen wurde es mir erst am Abend klar. Ich denke, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages zu notieren. Vielleicht sollte ich nur Fakten festhalten und meine Gedanken dann morgen früh nach dem Aufwachen zusammenfassen.

3.  Was ist morgen geplant?
    1.  Das Multiagenten-System nutzen, um das Finanzkonto von gate zu integrieren.
    2.  Weiter an der legionmind-github-bridge arbeiten.
    3.  Clustersicherheit, wenn Zeit bleibt.
    4.  Wieder mit der Zeiterfassung für die Arbeit beginnen. (Wichtig)
    5.  Morgen kommen Freunde von SY zu Besuch, daher könnte meine Arbeitszeit reduziert werden.

### 2026-01-24

Heute habe ich bis 11 Uhr geschlafen und fühle mich großartig. So ausgiebig habe ich schon lange nicht mehr geschlafen.

1.  Was heute getan wurde:
    1.  Neue Version von node-unit ausgerollt. Ich habe mich getraut, das zu tun, weil ich umfassende End-to-End-Tests habe. Genauer gesagt: Ich habe einen TimescaleDB (PostgreSQL 17) per Docker gestartet, dann zwei node-units gestartet und 21 `@yuants/portal`-Instanzen in die Datenbank eingefügt, um zu testen, dass sie sich am Ende je zur Hälfte die Deployments teilen.

        Dieser Test kann grundsätzlich zeigen, was passiert, wenn eine Reihe herrenloser Deployments auftauchen und zwei node-units online gehen; sie übernehmen die Deployments abwechselnd. Was wirklich fehlt, ist eine echte CPU-/Memory-Last und das Szenario, dass ein node-unit offline geht.

    2.  Mit der neuen Multi-Agenten-Version von legionmind im Yuan das Problem mit dem Kontostrom des vendor-gate earn-Kontos gelöst. Ich ließ den Agenten zuerst mit legion Dokumente erstellen. Insgesamt wurden folgende Dokumente erstellt:

        ```text
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
        ```

        Fühlt sich nach einem soliden Workflow an. Allerdings gibt es Konflikte zwischen meinem neuen Multi-Agenten-System und der Dokumentationserstellung von legionmind. Ich sollte die Grenzen der einzelnen Dinge genau überlegen. Zum Beispiel sollten die Spezifikationen für jede Dokumentenart in separate Fertigkeiten ausgelagert werden, und legionmind sollte eine Beschreibung des Arbeitsablaufs sein. Jeder Agent sollte in der Lage sein, mehrere kleinere Fertigkeiten zu laden, die ihm bei seiner Arbeit helfen.

        Ein weiteres Problem: Beim ersten Durchlauf machte er einen Fehler und gab den Kontostrom in `account-actions-with-credential.ts` aus. Das lag daran, dass ich ihn bat, sich an vendor-okx zu orientieren, um das earn-Konto anzubinden. Der Grund dafür war, dass derzeit nur das earn-Konto von okx als Account angebunden ist. Die KI übernahm jedoch auch einige veraltete Praktiken. Der aktuelle Standard für den Austauschanschluss ist, alle Konten über `provideExchangeServices` zu veröffentlichen, nicht über `provideAccountActionsWithCredential`.

        Dieses Wissen hat ein neuer KI-Agent nicht. Wie kann man dieses Wissen modellieren? Wie kann ich einem KI-Agenten diesen Projektkontext als externes Gehirn zur Verfügung stellen? Das ist eine überlegenswerte Frage, die morgen genau durchdacht werden muss.

    3.  Nachmittags gekocht, um die Freunde von SY zu bewirten. Das hat mich ganz schön geschlaucht. Morgen geht es weiter mit der Arbeit.

2.  Gedanken:
    - Wie oben erwähnt, muss ich genau überlegen, wie ich kompakt ein externes Gehirn für KI-Agenten entwerfen kann. Am einfachsten ist es, mit einer Reihe von `AGENT.md` zu beginnen. Das habe ich schon versucht, aber der Aufwand für die Pflege dieser Dokumente ist auch nicht gering. Es ist schwer zu unterscheiden, was eine wirklich aufzeichnungswerte Erfahrung ist und was nicht. Im Moment scheint das Gedächtnis wie andere Prompts zu sein, nur dass der Agent möglicherweise eine eigene Schleife hat, um das Gedächtnis zu aktualisieren. Am wichtigsten ist, wie man die Arbeitsergebnisse des KI-Agenten misst.

    - Dazu habe ich einen interessanten Artikel gelesen. Lassen Sie mich ihn in meinen eigenen Worten zusammenfassen: Zunächst zur Bewertung der Arbeit eines Agenten in einem Schritt. Diese Bewertung kann in verschiedene Kategorien unterteilt werden:
      1.  Statische Werkzeugbewertung: Compiler, Linter, Unit-Tests, E2E-Tests
      2.  Modellbewertung: Ein anderes LLM bewertet nach einem von uns definierten Prompt.
      3.  Manuelle Bewertung: Ich bewerte.

      Die systematische Bewertung eines Agenten erfolgt in zwei Formen:
      1.  Fähigkeitsbewertung: Beantwortet die Frage, was der Agent kann. Die Erfolgsquote kann sehr niedrig sein, z. B. wenn ich legion schrittweise für größere und schwierigere Aufgaben einsetze, fühlt es sich an, als würde ich eine neue Grenze erkunden.
      2.  Regressionsbewertung: Kann der Agent noch das, was er früher konnte? Z. B. wiederholtes Testen bestimmter Aufgaben, um sicherzustellen, dass sie zuverlässig funktionieren.

      Wenn eine neue Fähigkeit eingeführt wird, sollte man von der Fähigkeitsbewertung zur Regressionsbewertung übergehen.

      Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`:
      - pass@k: Bei k Versuchen mindestens ein Erfolg. Je mehr Versuche, desto höher die Wahrscheinlichkeit mindestens eines Erfolgs. Geeignet: Szenarien, in denen Sie nur "mindestens eine brauchbare Lösung finden" wollen.
      - pass<sup>k</sup>: Bei k Versuchen müssen alle erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, die Konsistenz zu wahren. Geeignet: Produktionsagenten, von denen der Benutzer erwartet, dass sie jedes Mal zuverlässig sind.

      FYI: [Referenzartikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Meine Energie ist immer noch nicht die beste. Am Nachmittag etwas gearbeitet, abends gekocht und dann müde gefühlt. Wann werde ich wie CZ ohne Schlaf auskommen?

3.  Was ist morgen geplant?
    1.  Über das Modell des Eval-Agenten nachdenken und das Multiagenten-System weiter iterieren.
    2.  Clustersicherheit – muss gemacht werden.
    3.  legion-github-bridge

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Grund: Jige hatte zwei Terminal-IDs mit demselben Dienst gestartet, die sich gegenseitig die Arbeit wegnahmen, was zu großen Problemen führte.

1.  Was heute getan wurde:
    1.  Versucht, den Cluster hinter NAT zu verlegen. Natürlich mit der brandneuen legion. Mein Vorgehen:
        - Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt mit den Subnetzen 172.21.0.0/24 und 172.21.1.0/24. Dann eine NAT für den Datenverkehr nach außen erstellt.

          Ursprünglich wollte ich das Subnetz 10.0.x.x verwenden, aber AWS erlaubte das nicht, also habe ich zu 172.21.x.x gewechselt. Eine Falle: Man muss im Cluster-Ressourcen den Loadbalancer auf das entsprechende VPC verweisen (standardmäßig implizit, aber mit einem zusätzlichen CIDR muss man es manuell angeben).

        - Dann eine neue Instance-Gruppe erstellt, die auf das neue VPC verweist. Es gab eine kleine Panne: Die neue IG hatte keine S3-Berechtigungen. Nach manuellem Hinzufügen traten die Knoten dem Cluster bei.

        - Nächster Schritt: Manuelle Migration der Dienste zur neuen IG.

        - Zum Schluss die alte IG entfernt.

        Nach Abschluss stellte sich heraus, dass der gesamte ausgehende Datenverkehr des Clusters nur eine IP hatte. Das führte bei unseren IP-begrenzten Diensten zu Problemen, also musste ich zurücksetzen. Zuerst muss der HTTP-Proxy ausgebaut werden, bevor ich weitermachen kann.

    2.  Der Multi-Agent wurde für ein Skript zur automatischen Aktualisierung von midas-Nettowerten eingesetzt. Deepseek hat lange geschrieben, und ich bin recht zufrieden. Ein Kernproblem: Wenn ich einen frühen Designfehler nicht erkenne, wartet eine riesige Menge Token- und Zeitverschwendung auf mich, da die Agenten nicht besonders schnell arbeiten.

        Diese Coding-Agenten sind noch recht primitiv; sie stürzen oft aufgrund von Netzwerkproblemen oder ähnlichem ab. Für ernsthafte langlaufende Arbeiten sind sie in Bezug auf SLI noch nicht gut. Das könnte eine Chance sein – auf den ersten Blick erfordert es Kenntnisse in Software-Hochverfügbarkeit usw.

2.  Gedanken:

    Heute wenig Gedanken; sie sind inline in den obigen Abschnitten notiert.

3.  Was ist morgen geplant?
    1.  Yuan's HTTP-Proxy-Mechanismus entwerfen.
    2.  Nach dem Ausrollen den Cluster erneut migrieren.

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach meinem 25. Lebensjahr einen deutlichen Fortschritt im Umgang mit Emotionen gemacht habe: Neben den Emotionen ist immer ein Hauch von Vernunft als Co-Pilot präsent. Dieser Hauch von Vernunft fungiert wie ein Cadmium-Stab in einem großen Reaktor der Emotionen. Ohne diesen Stab würden Emotionen außer Kontrolle geraten, eine selbsterregte Kettenreaktion auslösen und möglicherweise unzählige irreparable Folgen haben. Mit diesem Stab wird mir klar, was ich sagen darf und was nicht, was ich tun kann und was nicht, welche Entscheidungen ich treffen kann und welche nicht. Das ist eine erfreuliche Veränderung in mir.

1.  Was heute getan wurde:
    1.  Heute mit legion das Design und die Implementierung des HTTP-Proxys für Yuan durchgeführt. Ich fand die Nutzung recht reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie man einen verfügbaren Terminal auswählt) geändert und dann den Agenten loslegen lassen. Das Ergebnis war recht gut.
    2.  Ich habe auch mit legion eine automatische Aktualisierung von midas durchgeführt. Die KI hat jedoch eine schlechte Arbeit geleistet; sie hat meine Anforderungen und die Verwendung von `@yuants/protocol` nicht richtig verstanden. Ich habe mehrere Verdachtsrichtungen: Die Intelligenz der KI reicht nicht aus (Deepseek scheint nicht besonders klug zu sein); die Überprüfung war nicht streng genug; oder die Wissensdokumentation war nicht genau genug.
    3.  Verdammt, nachts wurde ich durch einen Alarm geweckt. Ein Host ist grundlos ausgefallen. Es sah so aus, als hätte eine CPU-Spitze den Host in einen Zustand versetzt, aus dem er sich nicht selbst erholen konnte. Die Host-Logs waren ein totales Durcheinander. Mein Urteil: Alarm nützlich, Logs ein Haufen Mist. Notiert!

2.  Gedanken:
    1.  Während des Duschens dachte ich über den entscheidenden Punkt meiner Zusammenarbeit mit der KI nach. Erstens die Dienstverfügbarkeit der KI-Agenten selbst, dass sie nicht während der Arbeit abbrechen. Ralph Loop erwähnt, dass die Verfügbarkeit im Grunde durch rücksichtsloses Wiederholen verbessert wird. Zweitens, wie ich die Ausgabe der KI annehme. Selbst ein Bericht eines Untergebenen an seinen Vorgesetzten braucht eine PPT oder einen spezialisierten mittleren Manager als "teures Sprachrohr". Wie kann ein KI-Bericht nur auf flachem Markdown und Code basieren? Könnte jeder Punkt im KI-Bericht nicht mit einem Artefakt verlinkt sein? Könnte es einen Citation Agent geben, der sich darauf spezialisiert?

        Meine Nutzung der KI ist derzeit jedoch auf Codierungsaufgaben beschränkt.

    2.  Ich überlege genau, warum mein Multiagenten-System trotz seines Vorhandenseins zuverlässig in den Graben steuert. Die vorherige Vermutung erwähnte drei mögliche Ursachen:
        1.  Die Intelligenzstufe der KI selbst.
        2.  Nicht strenge genug menschliche Überprüfung.
        3.  Die Wissensbasis ist nicht detailliert genug, um der KI korrekte Informationen für einen schnellen Start zu liefern.

        Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 ist offensichtlich. Bei Punkt 2 könnte man sich auf ein immer detaillierteres RFC-Dokument stützen, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Entwicklungsweise gleicht einer **Wasserfall**-Entwicklung, die Arbeit in einem linearen Prozess abwickelt:

        ```text
        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests
        ```

        Die Ursachen liegen auf zwei Ebenen: technisch und organisatorisch/prozessual, aber die organisatorische/prozessuale Ebene ist der *Hauptfaktor*.

        Technisch gesehen gibt es natürliche Abhängigkeiten zwischen Aufgaben. Zum Beispiel muss das Frontend warten, bis das Backend die Schnittstellen bereitstellt, um mit der Entwicklung zu beginnen; das Backend muss warten, bis das CRD des Produkts fertig ist.

        Als menschliche Organisation hat das Wasserfallmodell Nachteile: geringe Effizienz, schwierig, Qualitätsrisiken aufzudecken, geringe Flexibilität, Teamkonflikte. Was meine Zusammenarbeit mit der KI betrifft, existieren Effizienz und Teamkonflikte in der KI-Welt nicht von Natur aus. Es ist, als ob ich und die KI in zwei verschiedenen Zeitdimensionen leben würden; mein Tag ist für die KI wie ein Jahr. Niedrige Effizienz könnte mehr Tokens kosten, aber das ist nicht mein Hauptproblem. Ich habe tatsächlich das Problem von Qualitätsrisiken durch Missverständnisse von Anforderungen oder Fakten, sowie geringe Flexibilität.

        Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich selbst maximal zu entlasten. Nach den Erfahrungen der menschlichen Zusammenarbeit muss ich ein Knoten auf einer höheren Ebene des Befehlsbaums werden, der Aufgaben vertrauensvoll an die KI delegieren kann, ohne dass sie vom Kurs abkommt.

        Die beiden entscheidenden Punkte:
        1.  Intentionsabgleich
        2.  Geschichtete Validierung

        Das muss ich noch tiefer durchdenken. Ich glaube, ich muss mehr ausprobieren und schmecken.

    3.  Ich muss mich vor dem Nachteil des "Hamer-Syndroms" hüten: Pfadabhängigkeit und Output größer als Verständnis.

3.  Was ist morgen geplant?

    Morgen kommt ZL. Geplant ist: Training, Essen gehen, Brettspiele spielen.

### 2026-01-27

ZL war da, viel Input, ich muss das verdauen. Wir haben Brettspiele gespielt – "Das verhängnisvolle Karussell". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen. Im letzten Szenario, als ich den antagonistischen Dramatiker spielte, habe ich endlich den Sweet Spot des Spiels gespürt. Das Spiel endete mit meinem vollständigen Sieg.

### 2026-01-31

Die letzten Tage waren intensiv, daher habe ich nichts aufgezeichnet. Aber aufhören mit dem Aufzeichnen geht nicht, also nehme ich es jetzt wieder auf und notiere alles zusammen.

Warum habe ich außer der vielen Arbeit nicht aufgezeichnet?

1.  Aus Angst, dass ich mich für die Aufzeichnung hinsetzen und mindestens 30 Minuten pro Tag dafür aufwenden müsste. Das liegt daran, dass ich mittlerweile eine gewisse Angst und Belastung mit der täglichen Aufzeichnung verbinde, was nicht gut ist.
2.  Normalerweise fange ich erst an, den Tag aufzuzeichnen, wenn er wirklich vorbei ist. Aber wenn ich genau darüber nachdenke, ist das etwas widersprüchlich, weil ich ins Bett gehe, sobald ich schlafen muss, und nicht, weil ich wirklich alles erledigt habe, was ich erledigen wollte (gibt es so etwas überhaupt?). Das führt dazu, dass ich oft keine Zeit für die Aufzeichnung habe, wenn ich sie hätte, und wenn ich sie wirklich machen sollte, muss ich schnell ins Bett. Dazu kommt Punkt 1.

Beides zusammen führt zu einem Stau.

1.  Was heute getan wurde:

    > Korrektur: Was in den letzten Tagen getan wurde
    1.  Dank SC's Empfehlung habe ich mit neovim angefangen. Warum? Ich habe gesehen, dass nvim-orgmode wirklich zu einem brauchbaren org-mode geworden ist, und ich fange an, mich über emacs zu ärgern:
        - Endlose Update-Fehler
        - Verwirrende Debugging- und Fehlermeldungen
        - Für mich unnötige Komplexität, aber nutzlose Flexibilität
        - Ich verstehe emacs-lisp nicht und will es auch nicht verstehen.

        Jahrelang habe ich das ertragen, nur um orgmode nutzen zu können, aber es gab nirgendwo anders eine gute Alternative. Jetzt scheint das nvim-Lager eine Alternative zu haben. Warum nicht ausprobieren?

        Da ich seit Jahren Vim-Benutzer bin und in emacs auch evil-mode (vim-mode) verwendet habe, ist die Nutzung von vim für mich keine große Belastung. In vscode und idea kann ich ohne vim nicht überleben, daher ist die direkte Nutzung von nvim für mich überhaupt kein Problem.

        Da das Hindernis beseitigt ist, habe ich das nvim-Ökosystem geprüft. Nvim hat das Vimscript-Erbe nicht, sondern verwendet direkt Lua als Konfigurations- und Plugins-Sprache. Das ermöglicht einen leichten Start, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von neovim jetzt von `lazy.vim` dominiert wird. Das Design von nvim für seine Plugin- und Konfigurationssysteme scheint organisiert und gezielt die alten Schmerzpunkte von vim zu verbessern. In vim und emacs gab es unzählige ähnliche Versuche, die Community zu vereinheitlichen, aber keiner war wirklich erfolgreich.

        Also habe ich lazyVim ausprobiert. Und siehe da, ich habe plötzlich ein vscode, das im Terminal läuft. Weißt du, wie geil das ist?

        Jetzt habe ich einen mächtigen alten Äon auf völlig neuer Infrastruktur, und die Konfiguration ist extrem einfach. Flexibilität und Benutzerfreundlichkeit sind perfekt ausbalanciert. Meine alten Probleme sind fast alle gelöst.

        Ich habe fast keine Zeit gebraucht, um viele meiner Workflows darauf umzustellen. Ich verwende jetzt tmux mit 5 Fenstern, in jedem Fenster öffne ich nvim in einem bestimmten Ordner. In nvim links die Dateibaum, in der Mitte der Code, rechts opencode und das Terminal.

    2.  Eine neue Version von legion veröffentlicht. Ich habe den Textumfang der legionmind-Fertigkeit stark reduziert (um 4k Zeilen). Im Moment scheint es, dass ich mich weniger darum kümmern muss – aber ich weiß nicht, ob das daran liegt, dass ich in letzter Zeit klügere Modelle verwende oder weil diese Version von legionmind wirklich intelligenter geworden ist.

    3.  Einen openclaw eingerichtet. Minimax 2.1 ist immer noch etwas dumm, aber als persönlicher Assistent finde ich openclaw ziemlich gut, weil er im Grunde ein ChatGPT mit Gedächtnis und Händen (kann meinen Computer bedienen) ist.

    4.  Yuan um eine HTTP-Proxy-Funktion erweitert, Metriken hinzugefügt usw.

2.  Gedanken

    Manchmal fühlt es sich an, als würde man mit KI Code schreiben, der dem Debuggen von Code ähnelt, den man nicht ganz versteht: Man testet ständig sein Verhalten oder druckt Logs, um zu debuggen, ändert hier und da etwas, bis man ein zufriedenstellendes Ergebnis erhält. Lassen Sie mich den Ursprung dieses Gefühls ergründen:

    Wenn man KI zum Schreiben von Code verwendet, gibt der Mensch einen Prompt mit spezifischen Anweisungen ein und hofft, dass die KI die impliziten Anweisungen und Informationen dahinter versteht und die Arbeit korrekt ausführt.

    Man kann die Anweisungen, die man der KI geben möchte, in Schichten unterteilen: Die oberste Schicht ist die Anweisung für die aktuelle Aufgabe. Darunter liegen technische Entscheidungen und bewährte Praktiken für dieses spezielle Projekt. Darunter der Hintergrund des Problembereichs, den das Projekt lösen soll. Darunter das Fachwissen des KI-Ingenieurs selbst, seine Vorlieben, technischen Präferenzen, Stil, historische Erfahrungen und Denkweise. Ganz unten liegt das allgemeine Weltwissen.

    In einem Dialog mit der KI kann man tatsächlich nur die Anweisung für die aktuelle Aufgabe klar formulieren und hoffen, dass die KI genügend Weltwissen und Hintergrundinformationen zur Lösung des Problems hat.

    Daher kann man folgern: Wenn der Kontext einer Aufgabe klein genug ist, die Anweisungen glasklar sind und es kein historisches Gepäck gibt, sollte die KI die Aufgabe leicht qualitativ hochwertig erledigen können. Wenn es viele implizite Hintergrundinformationen gibt, kann sie leicht merkwürdige Dinge tun.

    Legionmind soll es der KI ermöglichen, selbst Hintergrundwissen und bewährte Praktiken zum Projekt und zum Problembereich zu sammeln. Das erfordert, dass die KI entweder gute logische Denkfähigkeiten und ein gutes Gedächtnis (Kontextkapazität) hat oder über umfangreiches Weltwissen verfügt. Was darüber hinausgeht, kann man ihr nicht beibringen.

    —

    Und ich finde nvim einfach fantastisch; ich bereue nur, dass ich es nicht früher entdeckt habe.

3.  Was ist morgen geplant

    Morgen besuche ich SC in seiner neuen Wohnung, um Brettspiele zu spielen, und zeige SY die Wintersportausrüstung.

### 2026-02-01

Wir waren in Lengshan und haben SY Skischuhe angeschaut. Fußlänge gemessen (245) und ein bequemes Paar gefunden. Leider waren die schönen Farben in Lengshan ausverkauft, also muss SY sie online bestellen.

Mittags haben wir bei SC gegessen. Er hat ein Gerät zum langsamen Garen von Steak, das Steak war wirklich zart. SC hatte ein Room-Tour-Rätsel für uns vorbereitet. Es gab zwei Hinweise. Der erste Hinweis führte uns zu 4 Orten, wo wir 4 englische Wörter/Sätze finden mussten. Mit einer Zahlencodes konnten wir das Wort "Three" zusammensetzen. Der zweite Hinweis stammte aus einem Umgebungsrätsel und ergab die Zahl 31/13 (ich erinnere mich nicht genau), mit der wir eine Schokolade aus einer Schublade mit vielen nummerierten Schachteln holen konnten.

Leider hatte er keine Schokolade mehr, also bekamen wir einen niedlichen Aufkleber.

—

Der Brettspielteil am Nachmittag war besonders interessant. Das Highlight war natürlich "Die Leiden des jungen Werthers" (Anm.: vermutlich ein Brettspiel). Am Ende gewann die von SC gespielte Mittelschicht einen beispiellosen Sieg – zum ersten Mal, seit wir dieses Spiel spielen, hat die Mittelschicht gewonnen. PGW, der die Bourgeoisie spielte, war sauer, weil die von Xiaohaozi gespielte Regierung ihn bei zwei für PGW sehr wichtigen Abstimmungen über Politikreformen nicht unterstützt hatte. Ich spielte die Arbeiterklasse und hatte bei den meisten Themen natürlich keine gemeinsamen Interessen mit der Bourgeoisie, also konnte ich nicht helfen. Tatsächlich waren am Ende des Spiels die Punkte von uns dreien (außer PGW) sehr knapp beieinander. Nur der Kapitalist hatte verloren.

Dieses Spiel ist wirklich großartig und mein Lieblingsbrettspiel. Es hat eine beachtliche Tiefe, die Spielweisen der vier Spieler unterscheiden sich enorm, und jedes Mal, wenn man eine andere Rolle spielt, ist das Spielerlebnis völlig anders. Dieses Mal zum Beispiel gab es in der Arbeiterklasse zum ersten Mal einen Überschuss an Arbeitslosen (weil Regierung und Bourgeoisie keine neuen Firmen gründen wollten), sodass die Bedingungen für Arbeiterproteste und Aufstände erfüllt waren. Die Arbeiter gingen auf die Straße und drohten, das Land auf den Kopf zu stellen. Konkret bedeutete das, dass sie Einflusswürfel erhielten und den anderen Klassen insgesamt (Anzahl der Arbeitslosen - 2 + Anzahl der Gewerkschaften) Punkte abzogen.

Wie erwartet, mussten die Arbeiter früher die Bourgeoisie und die Regierung anbetteln, neue Firmen zu gründen, aber jetzt drängten sie sich darum, neue Firmen zu eröffnen, was das Spiel sofort belebte. Am Ende belegte ich mit 101 Punkten den zweiten Platz.

### 2026-02-02

Heute habe ich trainiert und mich dann entspannt, nichts getan.

1.  Was ist morgen geplant?
    1.  Alle HTTP-Proxy-bezogenen Dinge fertigstellen und den Cluster in Ordnung bringen.
    2.  org-mode.nvim fertigstellen.
    3.  Die Transitstation erforschen.

### 2026-02-05

Ich protokolliere meinen Tag! Heute verwende ich ein anderes Format.

1.  chatgpt pro

    Am Freitag habe ich mich entschlossen und auf Xianyu einen chatgpt pro für 1369 Yuan gekauft. Das war günstiger als 200 USD, also habe ich zugeschlagen. Am Dienstag wurde es endlich eingerichtet. Der Verkäufer gab mir eine Outlook-E-Mail-Adresse und ein daran gebundenes ChatGPT-Konto.

    Ich loggte mich in das Outlook-Konto ein und sah eine ChatGPT-Rechnung, bezahlt in philippinischen Pesos.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Steuer: ₱1070.36 |
    |                          | Gesamt: ₱9990.00 |
    | Zahlungsmethode          | Mastercard-xxxx |

    Aus
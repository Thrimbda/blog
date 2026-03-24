---
title: 2026 Arbeitsprotokoll
date: 2026-01-01
---

# 2026

## 2026-01 Januar

### 2026-01-22

1.  Was habe ich heute gemacht:
    1.  Den `opencode-feishu-notifier` refaktoriert. Er sendet Benachrichtigungen nun nach einem festgelegten Muster an die Nutzer.
    2.  Weiter an `legionmind-github-bridge` von der KI schreiben lassen. Ich habe den Multi-Agent-Modus von opencode gestartet. Es wurden 5 Agents gestartet, um 5 Issues zu bearbeiten. Das Ding lief zwei Stunden lang und hat meine 5 Stunden Codex-Tokens komplett aufgebraucht.
    3.  Heute ist ein Node im sg-Cluster ausgefallen. Ich habe mir die Logs angesehen und es stellte sich heraus, dass er durch ständige SSH-Angriffsversuche überlastet wurde. Das ist nicht gut. Nach kurzer Überlegung gibt es mehrere mögliche Ansätze:
        - Passwortauthentifizierung deaktivieren
        - Den SSH-Zugang für das gesamte Internet schließen
        - Den Cluster hinter einen NAT verschieben
    4.  Verschiedene Kleinigkeiten erledigt. ZL kommt nächste Woche nach Suzhou, ich habe etwas Zeit für die Planung aufgewendet, aber es lief nicht reibungslos. Ich plane nicht, weitere Energie darauf zu verwenden.

2.  Gedanken:

    In meiner derzeitigen Phase kann ich nur 2-3 Dinge gleichzeitig managen. Dazu gehören Entwicklungsarbeit, Alltagsplanung, Denken und Output. Wenn ich diese Grenze überschreite, komme ich nicht mehr hinterher und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agents zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:
    - Für Codierungsaufgaben sollte ich den Autonomiegrad der Agents so weit wie möglich erhöhen. Es gibt mehrere Optimierungsziele:
      1.  Sie sollen mich so wenig wie möglich stören.
      2.  Sie sollen so viel wie möglich arbeiten.
      3.  Die Zuverlässigkeit ihrer Arbeit soll so weit wie möglich gesteigert werden.
    - Auch ich selbst muss mich verbessern:
      1.  Meine mentale Energie besser managen, um nicht so schnell erschöpft zu sein.
      2.  Die Fähigkeit verbessern, gleichzeitig in verschiedenen Kontexten zu arbeiten, ohne Dinge zu vergessen oder zu übersehen, und dabei den Fortschritt im Blick zu behalten.

    Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:
    1.  Eine Multi-Agent-Vorlage für Legionmind entwerfen und mit opencode an einer Codierungsaufgabe von Yuan experimentieren.
    2.  Weiter Arbeitsprotokolle führen und eine Methode für das Management mentaler Energie und Kontexte erarbeiten.

3.  Was plane ich für morgen?
    1.  Wie oben erwähnt, ein Multi-Agent-Experiment durchführen.
    2.  Weiter an `legionmind-github-bridge` arbeiten.
    3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

    —

    Insgesamt ist meine Hauptaufgabe derzeit, mich selbst mit KI zu skalieren, um dann zu versuchen, andere zu skalieren.

### 2026-01-23

Ich habe heute eine leichte Erkältung und Kopfschmerzen, die Produktivität ist niedrig. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.

1.  Was habe ich heute gemacht:
    1.  Mit Hilfe der KI ein Multi-Agent-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
    2.  `legionmind-github-bridge` ist wieder einen Schritt vorangekommen.
    3.  Das Preemption-Design und die Implementierung von `node-unit` angepasst. Früher wurden bei einem fehlgeschlagenen `node-unit` alle darunter liegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
    4.  Die Prüfung für die Futures-Broker-Kontoeröffnung bei der CFFEX abgelegt. Man musste die ganze Zeit die Kamera anlassen, durfte das Fenster nicht minimieren oder wechseln. Zum Glück gab es unbegrenzte Versuche – das schaffe ich locker. Bestanden mit 95 Punkten.

2.  Gedanken:

    Mein Ziel ist es, Agent-Autonomie mit möglichst wenig Aufwand zu erreichen. Mein derzeitiger Workflow sieht so aus:
    1.  Legionmind als SOP für Entwicklungsarbeit. Es ist eine Agent-Skill. Ich mag Agent-Skills.
    2.  Opencode als Entität des Agents. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent. Wenn ich opencode irgendwann ersetzen müsste, wäre das meine To-Do-Liste.
    3.  Meine derzeitige Kopfschmerzquelle ist, wie ich Skills und diese Sub-Agents kombinieren soll.

    Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich merke, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten aufzeichnen und die Gedanken erst am nächsten Morgen zusammenfassen.

3.  Was plane ich für morgen?
    1.  Mit diesem Multi-Agent-System etwas Sinnvolles tun. Vielleicht das Gate-Vermögensverwaltungskonto anbinden.
    2.  Weiter an `legionmind-github-bridge` arbeiten.
    3.  Clustersicherheit, falls Zeit bleibt.
    4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
    5.  Morgen kommen SYs Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

### 2026-01-24

Heute habe ich mich ausgeschlafen und bin erst um 11 Uhr aufgewacht. Fühlt sich gut an, so lange habe ich nicht mehr so ausgiebig geschlafen.

1.  Was habe ich heute gemacht:
    1.  Die neue Version von `node-unit` live geschaltet. Der Grund, warum ich es relativ sorglos deployen konnte, sind meine umfangreichen End-to-End-Tests. Konkret: Ein Docker-Container startet eine TimescaleDB (PostgreSQL 17), dann werden zwei `node-unit`-Instanzen gestartet und 21 `@yuants/portal`-Deployments in die Datenbank eingefügt, um zu testen, ob sie sich schließlich gleichmäßig aufteilen.

        Dieser Test deckt im Wesentlichen ab, was passiert, wenn eine Reihe herrenloser Deployments auftauchen und zwei `node-unit`-Instanzen online gehen. Man kann beobachten, wie sie abwechselnd Deployments übernehmen. Was vielleicht noch fehlt, sind echte CPU-/Arbeitsspeicher-Last und das Szenario, in dem ein `node-unit` absichtlich heruntergefahren wird.

    2.  Die neue Multi-Agent-Version von Legionmind in Yuan verwendet, um das Problem der Kontostromausgabe für das `vendor-gate earn`-Konto zu lösen. Ich ließ den Agent zuerst mit Legion Dokumentation erstellen. Insgesamt wurden folgende Dokumente erstellt:

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

        Fühlt sich nach einem soliden Workflow an. Allerdings gibt es einige Konflikte zwischen meinem neuen Multi-Agent-System und der bestehenden Dokumentationserstellung von Legionmind. Ich sollte die Grenzen der verschiedenen Aufgaben genau überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument geschrieben werden soll, in separaten Skills liegen, und Legionmind sollte eine Arbeitsablaufbeschreibung sein. Jeder Agent sollte in der Lage sein, einige kleinere Skills zu laden, um seine Arbeit zu unterstützen.

        Ein weiteres Problem war, dass er beim ersten Versuch einen Fehler machte und den Kontostrom in `account-actions-with-credential.ts` ausgab. Das lag daran, dass ich ihn angewiesen hatte, sich an `vendor-okx` zu orientieren, um das Earn-Konto einzubinden. Der Grund für diese Anweisung war, dass bisher nur das OKX-Earn-Konto ebenfalls als `account` eingebunden war. Aber die KI übernahm auch einige veraltete Praktiken daraus. Der aktuelle Standard für den Börsenzugang ist, alle Konten über `provideExchangeServices` bereitzustellen, nicht `provideAccountActionsWithCredential` zu verwenden.

        Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie modelliert man solches Wissen? Wie stelle ich einem KI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung? Das ist eine Frage, die es wert ist, tief durchdacht zu werden. Morgen muss ich mich damit genauer befassen.

    3.  Nachmittags für SYs Freunde gekocht. Das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter.

2.  Gedanken:
    - Wie oben erwähnt, muss ich mir genau überlegen, wie ich für KI-Agents ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Sammlung von `AGENT.md`-Dateien beginnen. Das habe ich schon versucht, aber der Aufwand für die Pflege dieser Dokumente selbst ist recht hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist ein schwieriges Problem. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um sie zu aktualisieren. Das Wichtigste ist, wie man die Ergebnisse der Arbeit eines KI-Agents bewertet.

    - In Bezug auf den obigen Punkt habe ich einen interessanten Artikel gelesen. Lassen Sie mich ihn in meinen eigenen Worten zusammenfassen: Zunächst kann die Bewertung einer einzelnen Agentenarbeit in mehrere Kategorien unterteilt werden:
      1.  Statische Tool-Evaluation: Compiler, Linter, Unit-Tests, E2E-Tests
      2.  Model-Evaluation: Ein anderes LLM bewertet anhand eines von uns definierten Prompts.
      3.  Manuelle Evaluation: Ich bewerte.

      Dann gibt es zwei Arten der systematischen Bewertung eines Agenten:
      1.  Fähigkeitsbasiert: Beantwortet die Frage, was der Agent kann? Die Erfolgsquote kann niedrig sein, z.B. wenn ich Legion verwende, um schrittweise größere, schwierigere Aufgaben auszuführen – wie die Erkundung einer neuen Grenze.
      2.  Regressionsbasiert: Kann er frühere Fähigkeiten noch beibehalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie noch stabil implementiert werden können.

      Wenn eine neue Fähigkeit eingeführt wird, sollte sie von fähigkeitsbasiert zu regressionsbasiert übergehen.

      Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`
      - `pass@k`: Mindestens ein Erfolg bei k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit für mindestens einen Erfolg. Anwendbar: Wenn es Ihnen nur darum geht, "mindestens eine brauchbare Lösung zu finden".
      - `pass<sup>k</sup>`: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Nutzer einen zuverlässig produzierenden Agenten erwartet.

      FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Meine Energie ist immer noch etwas gering. Nachmittags habe ich ein bisschen gearbeitet, abends gekocht und fühle mich schon etwas müde. Wann werde ich wie CZ sein und nicht schlafen müssen?

3.  Was plane ich für morgen?
    1.  Über dieses Evaluierungs-Agenten-Modell nachdenken und das Multi-Agent-System weiter iterieren.
    2.  Clustersicherheit – muss gemacht werden.
    3.  `legion-github-bridge`

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass Jige zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig blockierten und große Probleme verursachten.

1.  Was habe ich heute gemacht:
    1.  Versucht, den Cluster hinter einen NAT zu migrieren – natürlich mit Hilfe des neuen Legion. Meine Vorgehensweise war:
        - Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT für den ausgehenden Traffic erstellt.

          Ursprünglich wollte ich ein Netzwerksegment mit 10.0. verwenden, aber AWS ließ das nicht zu. Also wechselte ich zu 172.21. Dabei gab es eine Falle: In der Cluster-Ressource musste der bestehende Loadbalancer manuell auf das entsprechende VPC zeigen (vorher war es implizit standardmäßig zugewiesen, jetzt mit einem zusätzlichen CIDR muss es manuell angegeben werden).

        - Dann eine neue Instance Group erstellt, die auf das neue VPC zeigt. Eine kleine Zwischenepisode: Die neue IG hatte keine S3-Berechtigungen, aus unerfindlichen Gründen. Nach manueller Hinzufügung traten die Nodes dem Cluster normal bei.

        - Als nächstes Dienste manuell in die neue IG migriert.

        - Schließlich die alte IG heruntergefahren.

        Nachdem alles erledigt war, stellte sich heraus, dass der gesamte ausgehende Cluster-Traffic nur noch eine einzige IP hatte. Das brachte unsere Dienste, die auf IP-Ratenbegrenzung angewiesen sind, etwas in Bedrängnis. Keine andere Wahl, als zurückzurollen. Das HTTP-Proxy-Feature muss zuerst implementiert werden, bevor der nächste Schritt gemacht werden kann.

    2.  Das Multi-Agent-System wurde praktisch eingesetzt, um ein Skript zur automatischen Aktualisierung der Midas-Nettowerte zu erstellen. Deepseek hat lange daran gearbeitet, und ich war eigentlich ganz zufrieden. Ein Kernproblem dabei ist: Wenn ich einen Fehler im frühen Design nicht bemerke, erwartet mich eine enorme Verschwendung von Tokens und Zeit, denn ich merke, dass Agents nicht besonders schnell arbeiten.

        Derzeit sind diese Coding-Agents noch recht primitiv. Sie brechen oft aufgrund von Netzwerkproblemen o.ä. ab. Sie für ernsthafte, lang laufende Arbeiten einzusetzen, ist noch etwas unzuverlässig (SLI ist noch niedrig). Das ist aber vielleicht auch eine Chance. Auf den ersten Blick erfordert dies Kenntnisse in Software-Engineering und Hochverfügbarkeit.

2.  Gedanken:

    Heute hatte ich weniger Gedanken, sie sind bereits in die obigen Abschnitte eingeflossen.

3.  Was plane ich für morgen?
    1.  Den HTTP-Proxy-Mechanismus für Yuan entwerfen.
    2.  Nach dem Deployment den Cluster erneut migrieren.

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach dem 25. Lebensjahr im Umgang mit Emotionen einen deutlichen Fortschritt gemacht habe: Neben den Emotionen gibt es jetzt deutlich einen Hauch von Vernunft, der als Copilot fungiert. Dieser Hauch von Vernunft setzt eine Art Kontrollstange in den gewaltigen emotionalen Reaktor. Ohne diese Stange würden die Emotionen außer Kontrolle geraten, eine sich selbst verstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieser Stange beginne ich zu verstehen, was gesagt werden kann und was nicht, was getan werden kann und was nicht, welche Entscheidungen getroffen werden können und welche nicht. Das ist eine erfreuliche Veränderung in mir.

1.  Was habe ich heute gemacht:
    1.  Heute mit Legion das Design und die Implementierung des HTTP-Proxys für Yuan erstellt. Ich finde, es läuft ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie ein verfügbares Terminal ausgewählt wird) modifiziert und dann den Agenten freie Hand gelassen. Das Ergebnis war ziemlich gut.
    2.  Ich habe auch mit Legion eine automatische Midas-Aktualisierung durchgeführt. Aber die KI hat durchweg schlechte Arbeit geleistet, hat meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (Deepseek scheint doch nicht so clever zu sein); das Review war nicht streng genug; oder die Dokumentations-Wissensbasis ist nicht streng genug.
    3.  Verdammt, nachts wurde ich von einem Alarm geweckt. Ein Host war aus unerklärlichen Gründen abgestürzt. Es sieht aus wie ein CPU-Spitzenwert, der den Host in einen Zustand versetzt hat, aus dem er sich nicht selbst erholen kann. Die Logs des Hosts sind ein Haufen Mist. Mein Urteil: Der Alarm ist nützlich, die Logs sind Schrott. Notiz gemacht!

2.  Gedanken:
    1.  Beim Duschen dachte ich über den kritischsten Punkt in der Zusammenarbeit mit KI nach. Einer ist die Serviceverfügbarkeit des KI-Agents selbst – dass er nicht mitten in der Arbeit abstürzt oder so. Übrigens, Ralph Loop erhöht die Verfügbarkeit im Grunde durch grobes ständiges Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst wenn ein Mitarbeiter seinem Vorgesetzten berichtet, braucht er eine PowerPoint oder einfach einen professionellen mittleren Manager als "teuren Sprachrohr". Wie kann die Berichterstattung der KI an den Menschen auf flache Markdown und Code beschränkt sein? Könnte der Bericht der KI jeden Punkt mit einem Artefakt verlinken? Könnte es einen "Citation Agent" geben, der speziell für diesen Teil zuständig ist?

        Allerdings ist meine derzeitige Verwendung von KI ziemlich eingeschränkt, nur auf Codierungsaufgaben konzentriert.

    2.  Überlegen wir genau, warum mein Multi-Agent-System, nachdem ich es einmal eingerichtet hatte, stabil in Richtung eines Absturzes steuerte. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
        1.  Das intellektuelle Niveau der KI selbst.
        2.  Das menschliche Review war nicht streng genug.
        3.  Die Wissensbasis war nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.

        Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss nicht weiter bedacht werden. Sich in Richtung 2 zu bemühen, würde tatsächlich auf ein immer detaillierteres RFC-Dokument angewiesen sein, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Art der Entwicklung ist, als wären wir zum **Wasserfallmodell** zurückgekehrt, Arbeit über einen linearen Prozess zu erledigen:

        ```text
        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests
        ```

        Die Gründe dafür liegen auf zwei Ebenen: der technischen Ebene und der organisatorischen/prozessualen Ebene, wobei die organisatorische/prozessuale Ebene der *Hauptfaktor* ist.

        Auf technischer Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf Backend-Schnittstellen warten, um mit der Entwicklung zu beginnen, und das Backend muss warten, bis das Produkt-CRD geschrieben ist, um zu starten.

        In menschlichen Organisationen hat das Wasserfallmodell Probleme wie: Ineffizienz, Qualitätsrisiken werden schwer aufgedeckt, geringe Flexibilität, Teamkonflikte. In der Zusammenarbeit zwischen mir und der KI existieren Ineffizienz und Teamkonflikte von Natur aus nicht in der Welt der KI. Es ist, als ob ich und die KI in zwei verschiedenen Zeitdimensionen leben würden, ein Tag für mich ist wie ein Jahr für die KI. Ineffizienz könnte mehr Tokens kosten, aber das ist derzeit nicht mein Hauptanliegen. Mein tatsächliches Problem sind Qualitätsrisiken durch Missverständnisse von Anforderungen oder Fakten, und die Flexibilität ist ebenfalls gering.

        Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich gleichzeitig maximal zu befreien. Nach den Erfahrungen der menschlichen Organisation muss ich zu einem höheren Knoten im Befehlsbaum werden, der Dinge der KI anvertrauen kann, während sie auf Kurs bleibt.

        Die beiden entscheidenden Punkte sind:
        1.  Absichtsausrichtung (Intent Alignment)
        2.  Schichtweise Validierung (Layered Verification)

        Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um es zu verstehen.

    3.  Ich muss mich vor der schlechten Seite meines Zustands hüten, mit dem Hammer nach Nägeln zu suchen: Pfadabhängigkeit, Output über Verständnis.

3.  Was plane ich für morgen?

    Morgen kommt ZL. Geplant sind Training, Essen und Brettspiele.

### 2026-01-27

ZL ist da, die Informationsmenge ist groß, ich muss sie erst verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen. Erst im letzten Szenario, in dem ich den Bösewicht-Dramatiker spielte, spürte ich den Sweet Spot des Spiels und beendete das Spiel mit meinem vollständigen Sieg.

### 2026-01-31

Die letzten Tage waren ziemlich voll, daher habe ich nichts aufgezeichnet. Aber das Aufzeichnen einzustellen geht nicht, also hole ich es jetzt nach und fasse zusammen.

Abgesehen von der vielen Arbeit – warum habe ich nicht aufgezeichnet?

1.  Weil ich Angst hatte, dass Aufzeichnen bedeutet, sich hinzusetzen und speziell 30+ Minuten für einen Tag aufzuwenden. Das liegt eigentlich an einer gewissen Angst und Belastung durch das Aufzeichnen des Alltags, was nicht gut ist.
2.  Normalerweise möchte ich erst am Ende eines Tages mit der Aufzeichnung beginnen. Aber wenn ich genau darüber nachdenke, ist das etwas unmenschlich, denn ich gehe jetzt meistens ins Bett, sobald es Zeit ist, und nicht weil ich alles, was ich tun wollte, wirklich erledigt habe (gibt es das überhaupt?). Das führt dazu, dass ich in freien Momenten nicht aufzeichne, und wenn es wirklich Zeit zum Aufzeichnen ist, muss ich schnell ins Bett. Zusammen mit Problem 1 häuft sich das immer mehr an.

1.  Was habe ich heute gemacht:

    > Korrektur: Was habe ich in den letzten Tagen gemacht?
    1.  Auf Anraten von SC begonnen, Neovim zu verwenden. Warum? Ich habe gesehen, dass `nvim-orgmode` anscheinend wirklich zu einem brauchbaren Org-Mode geworden ist, und gleichzeitig begann ich, mich an Emacs zu stören:
        - Endlose Update-Fehler
        - Verwirrendes Debugging und Fehlermeldungen
        - Flexibilität, die für mich nur zusätzliche Belastung ist und keinen Nutzen bringt
        - Ich verstehe Emacs-Lisp nicht und möchte es auch nicht verstehen

        Jahrelang habe ich das oben Genannte ertragen, um Org-Mode zu nutzen, aber nirgendwo sonst konnte ich Org-Mode gut nutzen. Jetzt scheint das Neovim-Lager eine brauchbare Alternative zu haben – warum es nicht versuchen?

        Da ich seit Jahren Vim-Nutzer bin und in Emacs auch evil-mode (vim-mode) verwendet habe, empfinde ich die Verwendung von Vim nie als große Belastung. In VSCode und IDEA kann ich ohne Vim nicht überleben, daher ist die direkte Verwendung von nvim für mich überhaupt kein Problem.

        Da das Hindernis weg ist, schaue ich mir das Neovim-Ökosystem an. Neovim hat, weil es das historische Ballast von Vimscript nicht hat, direkt Lua als Konfigurations- und Plugin-Sprache übernommen. Es kann also leicht starten, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von Neovim jetzt auch von einem System namens `lazy.vim` vereinheitlicht wurde. Das Design des Plugin- und Konfigurationssystems von nvim scheint organisiert und geplant speziell gegen die Schmerzpunkte von Vim mutige Innovationen vorgenommen zu haben. In Vim & Emacs gab es wahrscheinlich unzählige ähnliche Versuche, die alle scheiterten, weil die Community zu fragmentiert war.

        Also habe ich lazyVim direkt ausprobiert. Wow, jetzt habe ich das Gefühl, direkt einen VSCode zu besitzen, und dieser VSCode kann im Terminal laufen – wissen Sie, wie geil das ist?

        Jetzt habe ich einen mächtigen alten Herrscher auf neuer Infrastruktur, und seine Konfiguration ist extrem einfach, Flexibilität und Bequemlichkeit sind genau richtig eingeschränkt, meine alten Schmerzpunkte sind im Wesentlichen alle gelöst.

        Ich habe kaum Zeit gebraucht, um viele Workflows darauf umzustellen. Ich verwende jetzt tmux mit 5 Windows, in jedem Window öffne ich nvim in einem Ordner, in nvim links der Verzeichnisbaum, in der Mitte der Code, rechts opencode und Terminal.

    2.  Eine Version von Legion aktualisiert. Ich habe den Textumfang des Legionmind-Skills stark reduziert (von 4k Zeilen). Derzeit habe ich das Gefühl, dass ich mich um weniger kümmern muss, aber ich weiß nicht, ob es daran liegt, dass ich in letzter Zeit klügere Modelle verwende oder diese Version von Legionmind wirklich klüger geworden ist.

    3.  Ein openclaw eingerichtet. Minimax 2.1 ist immer noch etwas dumm, aber als persönlicher Assistent finde ich openclaw ziemlich gut, denn es ist im Grunde ein ChatGPT mit Gedächtnis + Händen und Füßen (kann meinen Computer bedienen).

    4.  Yuan um HTTP-Proxy-Funktionalität erweitert, Metriken hinzugefügt usw.

2.  Gedanken

    Manchmal habe ich das Gefühl, dass das Schreiben mit KI ein bisschen wie das Debuggen von Code ist, dessen Prinzipien man nicht ganz versteht – durch ständiges Testen seines Verhaltens oder Ausgeben von Logs, um beim Debuggen zu helfen, hier ein bisschen ändern, dort ein bisschen hinzufügen, bis man schließlich ein zufriedenstellendes Ergebnis erhält. Lassen Sie uns über den Ursprung dieses Gefühls nachdenken:

    Beim Schreiben von Code mit KI gibt der Mensch im Grunde einen Prompt ein, der einige spezifische Anweisungen enthält, in der Hoffnung, dass die KI die impliziten Anweisungen und Informationen dahinter versteht und die Arbeit korrekt erledigt.

    Die an die KI zu übermittelnden Anweisungen können geschichtet werden: Die oberste Ebene ist die Anweisung für die aktuelle Aufgabe. Darunter liegen einige getroffene technische Entscheidungen für das Softwareprojekt, Best Practices, die nach Abwägung von Vor- und Nachteilen für einen lokalen Teil des Projekts geeignet sind. Die nächste Ebene sind Hintergrundinformationen zur Problemdomäne, die das Projekt lösen soll. Die darunter liegende Ebene ist das professionelle Hintergrundwissen des Software-Ingenieurs, der die KI verwendet – seine persönlichen Vorlieben, technischen Präferenzen, Stilpräferenzen, historischen Erfahrungen, Denkweisen. Die unterste Ebene ist das Weltwissen.

    In einem Dialog mit der KI kann nur die Anweisung für die aktuelle Aufgabe klar und deutlich gemacht werden, in der Hoffnung, dass die KI über ausreichend Weltwissen und Hintergrundinformationen zur Problemlösung verfügt.

    Daher kann man schlussfolgern: Wenn der Kontext einer Aufgabe klein genug ist, die gegebenen Anweisungen absolut klar sind und es kein historisches Ballast gibt, sollte die KI die Aufgabe leicht in hoher Qualität erledigen können. Wenn es viele implizite Hintergrundinformationen gibt, neigt sie dazu, seltsame Dinge zu produzieren.

    Was Legionmind tun muss, ist, der KI zu helfen, selbst Hintergrundwissen und Best Practices bezüglich dieses spezifischen Projekts und der Problemdomäne anzusammeln. Das erfordert, dass die KI entweder über gute logische Denkfähigkeiten und Gedächtnis (Kontextkapazität) verfügt, oder dass die KI selbst über umfangreiches Weltwissen verfügt. Was darüber hinausgeht, kann nicht gerettet werden.

    —

    Und dann denke ich, dass nvim wirklich eine späte Liebe ist.

3.  Was plane ich für morgen?

    Morgen besuche ich SC zu Hause, um sein neues Zuhause zu besichtigen, dann spielen wir zusammen Brettspiele und schauen nebenbei SYs Skiausrüstung an.

### 2026-02-01

War bei Cold Mountain, um SY Skischuhe anzuschauen. Gemessene Fußlänge (245) und einen bequemen Schuh gefunden. Leider war die schöne Farbe bei Cold Mountain ausverkauft, also muss SY online kaufen.

Mittags bei SC zu Hause gegessen, was er gekocht hat. Er hat ein Sous-Vide-Gerät für Steaks, das wirklich zartes Fleisch produziert. SC bereitete eine Room-Tour-Rätseljagd für uns vor. Es gab zwei Hinweise. Der erste Hinweise erforderte, an 4 Stellen 4 englische Wörter/Sätze zu finden und mit einem Indexcode ein Wort zu bilden: "Three". Der zweite Hinweis kam aus einem Umweltpuzzle, am Ende erhielten wir die Zahlen 31/13 (ich erinnere mich nicht genau) und konnten aus einer Schublade mit vielen nummerierten kleinen Kästchen eine Schokolade holen.

Leider hatte er keine Schokolade mehr, wir bekamen einen süßen Aufkleber.

—

Der Nachmittag mit Brettspielen war sehr interessant. Das Hauptspiel war natürlich "John Company", und schließlich gewann SC, der die Mittelschicht spielte, einen beispiellosen Sieg – das erste Mal in unserer Spielgeschichte, dass die Mittelschicht gewann. Pgw, der die Bourgeoisie spielte, war sauer, weil der als Regierung spielende Xiaohaozhi bei zwei für Pgw entscheidenden Politikreform-Abstimmungen nicht für ihn stimmte. Ich spielte die Arbeiterklasse und hatte natürlich bei den meisten Themen keine gemeinsamen Interessen mit der Bourgeoisie, konnte also nicht helfen. Tatsächlich lagen am Spielende außer Pgw unsere drei Punkte sehr eng beieinander. Eine Welt, in der nur der Kapitalist verletzt wurde.

Dieses Spiel ist wirklich großartig und wurde zu meinem Lieblingsbrettspiel. Es hat beträchtliche Spieltiefe, die Spielweise jedes der vier Spieler ist sehr unterschiedlich, und jedes Mal, wenn man eine andere Rolle spielt, ist es eine völlig andere Erfahrung. Diesmal zum Beispiel, als ich die Arbeiterklasse spielte, gab es zum ersten Mal einen Überschuss an Arbeitslosen (weil Regierung und Bourgeoisie keine neuen Unternehmen gründen wollten), der die Bedingungen für einen Arbeiterprotest/Aufstand erfüllte. Die Arbeiterklasse ging auf die Straße und drohte, das Land umzukrempeln. Die konkrete Wirkung war, Einflusswürfel zu erhalten und den anderen Klassen insgesamt (Anzahl Arbeitslose - 2 + Anzahl Gewerkschaften) Punkte abzuziehen.

Wie erwartet, wollten Arbeiterklasse, Regierung und Bourgeoisie, die früher darum baten und bettelten, neue Unternehmen zu gründen, jetzt plötzlich alle neue Unternehmen gründen, was das Spiel sofort belebte. Am Ende erreichte ich mit 101 Punkten den zweiten Platz in diesem Spiel.

### 2026-02-02

Heute nach dem Training den Kopf freibekommen, nichts gemacht.

1.  Was plane ich für morgen?
    1.  Alles HTTP-Proxy-Zeug durchtesten, den Cluster in Ordnung bringen.
    2.  `org-mode.nvim` in Ordnung bringen.
    3.  Den Transferpunkt untersuchen.

### 2026-02-05

Zeit, meinen Tag festzuhalten! Heute mit einem anderen Format.

1.  ChatGPT Pro

    Am Freitag habe ich einen Entschluss gefasst und auf dem allmächtigen Xianyu einen ChatGPT Pro-Account gekauft, für 1369 CNY. Ich sah, das ist günstiger als 200 USD, und kaufte schnell. Es dauerte bis Dienstag, bis es fertig war. Er gab mir ein Outlook-Postfach und einen daran gebundenen ChatGPT-Account.

    Als ich mich im Outlook-Postfach anmeldete: Wow, da war eine ChatGPT-Rechnung, bezahlt in philippinischen Pesos.

    |                          |                 |
    | ------------------------ | --------------- |
    | Plan                     | Betrag          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Steuer: ₱1070.36   |
    |                          | Gesamt: ₱9990.00 |
    | Zahlungsmethode          | Mastercard-xxxx |

    Neugierig rechnete ich den Preis in CNY um: nur etwa 1174.54 CNY. Das heißt, er hat fast 200 CNY Gewinn gemacht!

    Dann recherchierte ich: Verdammt. Das Geld hat er sich verdient. Die Philippinen sind tatsächlich der weltweit günstigste Ort, an dem man den ChatGPT Pro Plan kaufen kann. Krass.

    Ich habe eine zuverlässige Kontaktperson in Thailand. Ich wollte seinen Erfolg kopieren, aber haha, Thailand ist teurer.
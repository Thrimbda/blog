---
"title": "Arbeitsprotokoll 2026"
"summary": "Dies ist das Arbeitsprotokoll für den Zeitraum vom 22. bis 24. Januar 2026. Der Autor dokumentiert detailliert seine tägliche Praxis bei der Softwareentwicklung (z.B. legionmind-github-bridge, node-unit-Verbesserungen) und Systemgestaltung (Multi-Agent-System) unter Verwendung von KI-Agenten (wie opencode, legionmind). Das Protokoll enthält konkret erledigte Aufgaben, aufgetretene Probleme (z.B. Clustersicherheit, Wissensmodellierung für Agenten), entstandene Ideen (z.B. Steigerung der Agentenautonomie, Entwurf eines Bewertungssystems) sowie Pläne für den Folgetag. Die zentrale These ist, dass der Autor daran arbeitet, seine persönlichen Fähigkeiten durch KI-Agenten zu skalieren (scale) und effiziente Arbeitsabläufe sowie Methoden zur Agentenbewertung zu erforschen. Die Schlussfolgerung ist, dass ein Gleichgewicht zwischen Agentenautonomie, Bereitstellung von Kontextwissen und persönlichem Energiemanagement gefunden werden muss."
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

1.  [2026](#org7a37329)
    1.  [2026-01 Januar](#orgdf95c10)
        1.  [2026-01-22](#org46a8ace)
            1.  [Heute erledigt:](#org4842a30)
            2.  [Gedanken:](#orgd3c2dea)
            3.  [Was ist für morgen geplant?](#orgfac9005)
        2.  [2026-01-23](#org53cf87b)
            1.  [Heute erledigt:](#org420a748)
            2.  [Gedanken:](#org003bc35)
            3.  [Was ist für morgen geplant?](#org50de801)
        3.  [2026-01-24](#org5af0a91)
            1.  [Heute erledigt:](#org69bd02c)
            2.  [Gedanken:](#org1f09dca)
            3.  [Was ist für morgen geplant?](#org8a10f91)
        4.  [2026-01-25](#org1d94cd3)
            1.  [Heute erledigt:](#org1ca275c)
            2.  [Gedanken:](#org48ae323)
            3.  [Was ist für morgen geplant?](#org7111e30)
        5.  [2026-01-26](#org43faf05)
            1.  [Heute erledigt:](#org8efa648)
            2.  [Gedanken:](#orga5425d1)
            3.  [Was ist für morgen geplant?](#orge845cbe)
        6.  [2026-01-27](#org3411989)

<a id="org7a37329"></a>

# 2026

<a id="orgdf95c10"></a>

## 2026-01 Januar

<a id="org46a8ace"></a>

### 2026-01-22

<a id="org4842a30"></a>

#### Heute erledigt:

1.  Den `opencode-feishu-notifier` refaktorisiert. Er sendet Benachrichtigungen nun nach einem festgelegten Muster an die Nutzer.
2.  Die Arbeit am `legionmind-github-bridge` durch den KI-Agenten fortgesetzt. Ich habe begonnen, den Multi-Agent-Modus von `opencode` zu nutzen. Es wurden 5 Agenten gestartet, um 5 Probleme zu bearbeiten. Das Ganze lief mühevoll zwei Stunden lang und verbrauchte meine gesamten 5 Stunden Codex-Tokens.
3.  Heute ist ein Knoten im `sg`-Cluster ausgefallen. Ein Blick in die Logs zeigte, dass es sich um wiederholte SSH-Angriffsversuche handelte – nicht gut. Eine kurze Prüfung ergab mehrere mögliche Maßnahmen:
    - Passwortauthentifizierung deaktivieren
    - Den SSH-Zugang für das gesamte Netzwerk schließen
    - Den Cluster hinter einen NAT-Router verschieben
4.  Verschiedene Kleinigkeiten erledigt. `zl` kommt nächste Woche nach Suzhou, ich habe etwas Zeit für die Planung aufgewendet, was nicht reibungslos verlief. Ich plane nicht, weitere Energie hierfür aufzuwenden.

<a id="orgd3c2dea"></a>

#### Gedanken:

In meiner derzeitigen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren: Entwicklungsarbeit, Alltagsorganisation, Denken und Output. Überschreite ich diese Grenze, komme ich mit der Koordination nicht mehr nach und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agenten zu delegieren. Daher sehe ich zwei Verbesserungsrichtungen:

-   Für Codierungsaufgaben sollte ich den Autonomiegrad der Agenten so weit wie möglich erhöhen, mit folgenden Optimierungszielen:
    1.  Sie sollen mich möglichst selten stören.
    2.  Sie sollen möglichst viel arbeiten.
    3.  Die Zuverlässigkeit ihrer Arbeit soll maximiert werden.
-   Auch ich selbst muss mich verbessern:
    1.  Meine mentale Energie besser managen, um nicht so schnell erschöpft zu sein.
    2.  Die Fähigkeit verbessern, in mehreren unterschiedlichen Kontexten gleichzeitig zu arbeiten, ohne etwas zu vergessen oder zu verlieren, und dabei den Fortschritt im Blick zu behalten.

Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:

1.  Eine Multiagent-Vorlage für `legionmind` entwerfen und mit `opencode` an einer Codierungsaufgabe in `yuan` experimentieren.
2.  Das Arbeitsprotokoll weiterführen und eine Methode für das Management mentaler Energie und Kontexte erkunden.

<a id="orgfac9005"></a>

#### Was ist für morgen geplant?

1.  Wie oben erwähnt, ein Experiment mit Multiagenten durchführen.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Falls Zeit bleibt, mich um die Clustersicherheit kümmern.

---

Zusammenfassend ist meine Hauptaufgabe derzeit, mich selbst mit KI hochzuskalieren (scale), um dann zu versuchen, andere zu skalieren.

<a id="org53cf87b"></a>

### 2026-01-23

Heute hatte ich eine leichte Erkältung mit Kopfschmerzen, die Produktivität war niedrig. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.

<a id="org420a748"></a>

#### Heute erledigt:

1.  Mit KI-Hilfe ein Multi-Agent-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
2.  `legionmind-github-bridge` ist wieder einen Schritt vorangekommen.
3.  Das Preemption-Design und die Implementierung von `node-unit` angepasst. Bisher wurden bei einem `failed`-Status eines `node-unit` alle darunterliegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
4.  Die Prüfung für die Futures-Broker-Kontoeröffnung (CFFEX) abgelegt. Überraschenderweise musste die Kamera die ganze Zeit an bleiben, Minimieren oder Wechseln des Bildschirms war nicht erlaubt. Zum Glück gab es unbegrenzte Versuche – das schaffe ich, 95 Punkte, bestanden mit Bravour.

<a id="org003bc35"></a>

#### Gedanken:

Mein Ziel ist es, Agentenautonomie mit möglichst geringem Aufwand (Abrasion) zu erreichen. Mein aktueller Workflow sieht so aus:

1.  `legionmind` als SOP (Standard Operating Procedure) für Entwicklungsarbeit. Es ist eine Agenten-Fähigkeit (agent skill). Ich mag agent skills.
2.  `opencode` als physische Instanz des Agenten. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent. Falls ich `opencode` eines Tages ersetzen müsste, wäre dies meine To-do-Liste.
3.  Meine derzeitige Kopfschmerzquelle ist, wie ich skills und diese Subagenten kombinieren soll.

Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich merke, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten notieren und die Gedanken erst am nächsten Morgen beim Aufwachen zusammenfassen.

<a id="org50de801"></a>

#### Was ist für morgen geplant?

1.  Mit diesem Multi-Agent-System etwas Sinnvolles tun, z.B. das Finanzkonto von `gate` anbinden.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Clustersicherheit, falls Zeit bleibt.
4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
5.  Morgen kommen `sy`s Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

<a id="org5af0a91"></a>

### 2026-01-24

Heute habe ich mich ausgeschlafen – bis 11 Uhr! Fühlt sich großartig an, so lange habe ich nicht mehr so ausgiebig geschlafen.

<a id="org69bd02c"></a>

#### Heute erledigt:

1.  Die neue Version von `node-unit` live geschaltet. Der Grund, warum ich sie relativ sorglos ausrollen konnte, sind meine umfangreichen End-to-End-Tests. Konkret: Ein Docker-Container startet eine TimescaleDB (PostgreSQL 17), dann werden zwei `node-unit`-Instanzen gestartet und 21 `@yuants/portal`-Deployments in die Datenbank eingefügt, um zu testen, ob sich der Zustand auf je die Hälfte pro Instanz einpendelt.

    Dieser Test deckt im Wesentlichen ab, was passiert, wenn eine Reihe herrenloser Deployments auftauchen und zwei `node-unit`-Instanzen hochfahren: Man kann beobachten, wie sie abwechselnd Deployments übernehmen. Was noch fehlt, ist eine echte CPU-/Arbeitsspeicher-Auslastung und das Szenario, in dem eine `node-unit`-Instanz unerwartet ausfällt.

2.  Die neue Multi-Agent-Version von `legionmind` in `Yuan` verwendet, um das Problem der Kontostromausgabe für das `vendor-gate` Earn-Konto zu lösen. Ich ließ den Agenten zunächst mit `legion` Dokumentation erstellen. Insgesamt wurden folgende Dokumente erstellt:

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

    Das fühlt sich nach einem soliden Workflow an. Allerdings gibt es Konflikte zwischen meinem neuen Multi-Agent-System und der bestehenden Dokumentationserstellung von `legionmind`. Ich sollte die Grenzen der einzelnen Aufgaben genau überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument geschrieben werden soll, in separaten skills abgelegt werden. `legionmind` sollte dann eine Beschreibung des Arbeitsablaufs sein. Jede Art von Agent sollte in der Lage sein, einige kleinere skills zu laden, um seine Arbeit zu unterstützen.

    Ein weiteres Problem war, dass beim ersten Versuch ein Fehler auftrat: Der Kontostrom wurde in `account-actions-with-credential.ts` ausgegeben. Das lag daran, dass ich den Agenten anwies, sich an `vendor-okx` zu orientieren, um das Earn-Konto anzubinden. Der Grund für diese Anweisung war, dass derzeit nur das OKX Earn-Konto ebenfalls als `account` eingebunden ist. Aber die KI übernahm auch einige veraltete Praktiken daraus. Der aktuelle Standard für den Börsenzugang ist, alle Konten über `provideExchangeServices` bereitzustellen, nicht über `provideAccountActionsWithCredential`.

    Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie sollte solches Wissen modelliert werden? Wie kann ich einem KI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung stellen? Das ist eine Frage, die es zu durchdenken gilt. Morgen muss ich mich damit genauer befassen.

3.  Nachmittags für `sy`s Freunde gekocht – das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter.

<a id="org1f09dca"></a>

#### Gedanken:

-   Wie oben erwähnt, muss ich genau überlegen, wie ich für einen KI-Agenten ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Sammlung von `AGENT.md`-Dateien beginnen. Das habe ich schon versucht, aber der Aufwand (Overhead) für die Pflege dieser Dokumente selbst ist recht hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist schwierig. Derzeit scheint es, dass Erinnerungen (Memory) wie andere Prompts auch sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um sie zu aktualisieren. Das Wichtigste ist, wie man die Ergebnisse der Arbeit eines KI-Agenten bewertet.

-   Bezüglich des letzten Punktes habe ich einen interessanten Artikel gelesen, den ich jetzt in meinen eigenen Worten zusammenfassen möchte: Zunächst lässt sich die Bewertung (Eval) einer einzelnen Agenten-Aufgabe in Kategorien einteilen:
    1.  Statische Tool-Eval: Compiler, Linter, Unit-Tests, E2E-Tests.
    2.  Model-Eval: Ein anderes LLM bewertet anhand eines von uns definierten Prompts.
    3.  Menschliche Eval: Ich bewerte.

    Dann gibt es zwei Arten der systematischen Bewertung eines Agenten-Systems:
    1.  Fähigkeitsorientiert (Capability): Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann hier niedrig sein, z.B. wenn ich `legion` verwende, um schrittweise größere, schwierigere Aufgaben auszuführen – wie die Erkundung einer neuen Grenze.
    2.  Regressionsorientiert: Kann er weiterhin die alten Fähigkeiten ausführen? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie stabil erledigt werden können.

    Wenn eine neue Fähigkeit eingeführt wird, sollte der Übergang von fähigkeitsorientiert zu regressionsorientiert erfolgen.

    Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`.
    -   `pass@k`: Mindestens ein Erfolg in k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit für mindestens einen Erfolg. Anwendbar: Wenn es nur darum geht, "mindestens eine brauchbare Lösung zu finden".
    -   `pass^k`: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Nutzer jedes Mal zuverlässige Ergebnisse vom Agenten erwartet.

    FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-with-getting-fooled-29f378ec2609)

-   Meine Energie ist immer noch etwas gering. Nachmittags etwas gearbeitet, abends gekocht, und schon fühle ich mich müde. Wann werde ich wie CZ sein und nicht schlafen müssen?

<a id="org8a10f91"></a>

#### Was ist für morgen geplant?

1.  Über das Modell eines Eval-Agenten nachdenken und das Multi-Agent-System weiterentwickeln.
2.  Das Clustersicherheitsproblem muss angegangen werden.
3.  `legion-github-bridge`.

<a id="org1d94cd3"></a>

### 2026-01-25

Heute war ich beim Friseur. Zurückgekommen, stellte ich fest, dass das System instabil war. Es stellte sich heraus, dass `Jige` zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig blockierten und so größere Probleme verursachten.

<a id="org1ca275c"></a>

#### Heute erledigt:

1.  Versucht, den Cluster hinter einen NAT-Router zu migrieren – natürlich mit Hilfe des brandneuen `legion`. Mein Vorgehen:
    -   Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT-Gateway für den ausgehenden Traffic erstellt.

        Ursprünglich wollte ich ein Netzwerksegment mit 10.0. verwenden, aber AWS ließ das nicht zu. Also wechselte ich zu 172.21. Hier gab es eine Falle: In der Cluster-Ressource muss der vorhandene Loadbalancer manuell auf das entsprechende VPC verweisen (ursprünglich implizit standardmäßig zugewiesen, mit einem zusätzlichen CIDR muss es manuell gesetzt werden).

    -   Dann eine neue Instance Group (IG) erstellt, die auf das neue VPC verweist. Eine kleine Zwischenepisode: Die neue IG hatte keine S3-Berechtigungen, aus unerfindlichen Gründen. Nach manueller Hinzufügung traten die Knoten dem Cluster normal bei.
    -   Nächster Schritt: Dienste manuell in die neue IG migrieren.
    -   Schließlich die alte IG herunterfahren.

    Nachdem alles erledigt war, stellte ich fest, dass der gesamte ausgehende Cluster-Traffic nur noch eine einzige IP-Adresse hatte. Das brachte unsere Dienste, die auf IP-Ratelimiting angewiesen sind, etwas in Bedrängnis. Leider musste ich einen Rollback durchführen. Bevor der nächste Schritt erfolgen kann, muss ich erst die Fähigkeit "HTTP-Proxy" implementieren.

2.  Das Multi-Agent-System wurde praktisch eingesetzt, um ein Skript zur automatischen Aktualisierung der `midas`-Nettoinventarwerte (NAV) zu erstellen. `deepseek` hat lange daran gearbeitet, und ich war ziemlich zufrieden. Ein Kernproblem dabei ist: Wenn ich einen Fehler im frühen Design nicht bemerke, erwartet mich eine enorme Verschwendung von Tokens und Zeit, denn ich merke, dass Agenten nicht besonders schnell arbeiten.

    Diese Coding-Agenten sind noch recht primitiv. Sie brechen oft ab oder stürzen ab, z.B. aufgrund von Netzwerkproblemen. Sie für ernsthafte Langzeitaufgaben (long running) einzusetzen, ist noch etwas schwierig, ihre Service Level Indicators (SLI) sind nicht optimal. Das ist vielleicht auch eine Chance. Auf den ersten Blick erfordert dies Kenntnisse in Software-Engineering und Hochverfügbarkeit.

<a id="org48ae323"></a>

#### Gedanken:

Heute hatte ich weniger Gedanken, sie sind bereits in die obigen Abschnitte eingeflossen.

<a id="org7111e30"></a>

#### Was ist für morgen geplant?

1.  Den HTTP-Proxy-Mechanismus für `Yuan` entwerfen.
2.  Nach dem Live-Gang die Cluster-Migration erneut versuchen.

<a id="org43faf05"></a>

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach dem 25. Lebensjahr im Umgang mit Emotionen einen deutlichen Fortschritt gemacht habe: Neben den Emotionen gibt es jetzt einen klaren Verstand, der als Copilot fungiert. Dieser Verstand setzt eine Art "Kadmium-Stab" in den gewaltigen Reaktor der Emotionen. Ohne diesen Stab würden die Emotionen außer Kontrolle geraten, eine sich selbst verstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieses Stabs beginne ich zu verstehen, was gesagt werden kann und was nicht, was getan werden kann und was nicht, welche Entscheidungen getroffen werden können und welche nicht. Das ist eine erfreuliche Veränderung in mir.

<a id="org8efa648"></a>

#### Heute erledigt:

1.  Heute habe ich mit `legion` das Design und die Implementierung des HTTP-Proxys für `yuan` durchgeführt. Ich finde, die Anwendung war ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie ein verfügbarer Terminal ausgewählt wird) modifiziert und dann den Agenten freie Hand gegeben. Das Ergebnis war sehr gut.
2.  Ich habe auch mit `legion` an der automatischen Aktualisierung für `midas` gearbeitet. Aber die KI hat durchweg schlechte Arbeit geleistet, hat meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (`deepseek` scheint doch nicht so clever zu sein); das Review war nicht streng genug; oder die Wissensdokumentation ist nicht streng genug.
3.  Verdammt, nachts wurde ich von einem Alarm geweckt. Ein Host war unerklärlicherweise abgestürzt. Es scheint einen CPU-Spitzenwert gegeben zu haben, der den Host in einen Zustand versetzte, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein einziges Chaos. Mein Urteil: Der Alarm ist nützlich, die Logs sind Mist. Notiert!

<a id="orga5425d1"></a>

#### Gedanken:

1.  Beim Duschen dachte ich über den kritischsten Punkt der derzeitigen Zusammenarbeit zwischen mir und der KI nach. Einerseits die Serviceverfügbarkeit des KI-Agenten selbst – dass er nicht mitten in der Arbeit abstürzt oder sich beendet. Übrigens, `ralph loop` erhöht die Verfügbarkeit im Wesentlichen auch durch grobes Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst wenn ein Mitarbeiter seinem Vorgesetzten berichtet, benötigt er eine PPT oder sogar einen professionellen mittleren Manager als "teuren Sprachrohr". Wie kann sich die Berichterstattung der KI an den Menschen auf flaches Markdown und Code beschränken? Könnte der Report der KI jedes Element mit einem Artefakt verlinken? Könnte es einen "Citation Agent" geben, der speziell für diesen Teil zuständig ist?

    Allerdings ist meine derzeitige Nutzung der KI noch recht begrenzt, hauptsächlich auf Codierungsaufgaben konzentriert.

2.  Ich denke genauer darüber nach, warum mein Multi-Agent-System, nachdem es einmal etabliert war, stabil in Richtung eines Scheiterns steuert. In den vorherigen Überlegungen wurden grob drei Möglichkeiten genannt:
    1.  Das intellektuelle Niveau der KI selbst.
    2.  Das menschliche Review war nicht streng genug.
    3.  Die Wissensbasis ist nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.

    Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss nicht weiter bedacht werden. Sich in Richtung 2 anzustrengen, würde tatsächlich von einem immer detaillierteren RFC-Dokument abhängen, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Entwicklungsmethode gleicht einer Rückkehr zum **Wasserfallmodell**, bei dem die Arbeit über einen linearen Prozess abgeschlossen wird:

        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests

    Die Gründe dafür liegen auf zwei Ebenen: der technischen Ebene und der Ebene der Organisation und Prozesse, wobei die organisatorisch-prozessuale Ebene der *Hauptfaktor* ist.

    Auf der technischen Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf die vom Backend bereitgestellten Schnittstellen warten, um mit der Entwicklung zu beginnen; das Backend muss warten, bis das Produkt-CRD geschrieben ist, um zu starten.

    In menschlichen Organisationen hat das Wasserfallmodell Probleme wie: Ineffizienz, schwer erkennbare Qualitätsrisiken, geringe Flexibilität und Teamkonflikte. In der Zusammenarbeit zwischen mir und der KI existieren Ineffizienz und Teamkonflikte von Natur aus nicht in der Welt der KI. Es ist, als ob die KI und ich in zwei verschiedenen Zeitdimensionen leben – ein Tag für mich ist wie ein Jahr für die KI. Nun, Ineffizienz könnte mehr Tokens kosten, aber das ist derzeit nicht mein Hauptproblem. Ich stehe tatsächlich vor dem Problem von Qualitätsrisiken aufgrund von Missverständnissen bei Anforderungen oder Fakten, und die Flexibilität ist gering.

    Ich muss einen Weg finden, der die Fähigkeiten der KI maximal nutzt und mich gleichzeitig maximal befreit. Nach der Erfahrung menschlicher Organisationen muss ich zu einem höheren Knoten im Befehlsbaum werden, der Dinge der KI anvertrauen kann, während er sicherstellt, dass sie nicht vom Kurs abkommt.

    Die beiden entscheidenden Punkte sind:
    1.  Absichtsausrichtung (Intent Alignment)
    2.  Schichtweise Validierung (Layered Verification)

    Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um ein Gefühl dafür zu bekommen.

3.  Ich muss mich vor der schlechten Seite meines aktuellen Zustands hüten, in dem ich mit einem Hammer nach Nägeln suche: Pfadabhängigkeit, Output größer als Verständnis.

<a id="orge845cbe"></a>

#### Was ist für morgen geplant?

Morgen kommt `zl`. Geplant sind: Training, Essen, Brettspiele spielen.

<a id="org3411989"></a>

### 2026-01-27

`zl` ist da, die Informationsmenge ist groß, ich muss das erst verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen. Erst im letzten Szenario, in dem ich den Bösewicht, den Dramatiker, spielte, spürte ich den süßen Punkt des Spiels und beendete das Spiel mit meinem vollständigen Sieg.
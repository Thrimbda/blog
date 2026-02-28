---
title: 2026 Arbeitsprotokoll
date: 2026-01-01
---

# Inhaltsverzeichnis

1.  [2026](#org91ae5f8)
    1.  [2026-01 Januar](#org14e7d23)
        1.  [2026-01-22](#org987e5de)
            1.  [Was wurde heute gemacht:](#orgb693af8)
            2.  [Welche Gedanken gab es:](#orgbbe0c52)
            3.  [Was ist für morgen geplant?](#org4c1530c)
        2.  [2026-01-23](#org9670646)
            1.  [Was wurde heute gemacht:](#org5b02719)
            2.  [Welche Gedanken gab es:](#orgcd67dde)
            3.  [Was ist für morgen geplant?](#org55c5e88)
        3.  [2026-01-24](#org93f4e20)
            1.  [Was wurde heute gemacht:](#orgabed47d)
            2.  [Welche Gedanken gab es:](#orgdb4d8bb)
            3.  [Was ist für morgen geplant?](#org1e207dc)
        4.  [2026-01-25](#org7ceb7a6)
            1.  [Was wurde heute gemacht:](#org1fc8b40)
            2.  [Welche Gedanken gab es:](#orgbbaf9e2)
            3.  [Was ist für morgen geplant?](#org3c32f7f)
        5.  [2026-01-26](#org80b755f)
            1.  [Was wurde heute gemacht:](#org80224a0)
            2.  [Welche Gedanken gab es:](#org5b61931)
            3.  [Was ist für morgen geplant?](#orga6c35c5)
        6.  [2026-01-27](#org98d2dad)
        7.  [2026-01-31](#org756539f)
            1.  [Was wurde heute gemacht:](#org57e9aa8)
            2.  [Welche Gedanken gab es](#orgcaa37f7)
            3.  [Was ist für morgen geplant](#orgf2eb618)
        8.  [2026-02-01](#org0700b38)
        9.  [2026-02-02](#org1f4b65c)
            1.  [Was ist für morgen geplant?](#org149a83d)
        10. [2026-02-05](#org6221927)
            1.  [chatgpt pro](#org68b3fdf)
            2.  [Abschluss von http-proxy](#org2f33c3f)
            3.  [Iteration von Legionmind](#org43f0ced)



<a id="org91ae5f8"></a>

# 2026




<a id="org14e7d23"></a>

## 2026-01 Januar


<a id="org987e5de"></a>

### 2026-01-22


<a id="orgb693af8"></a>

#### Was wurde heute gemacht:

1.  Habe `opencode-feishu-notifier` refaktoriert. Er sendet jetzt Benachrichtigungen an Nutzer auf eine festgelegte Weise.
2.  Habe weiterhin von der KI `legionmind-github-bridge` schreiben lassen. Ich habe den Multi-Agent-Modus von opencode verwendet. Es starteten 5 Agents, die 5 Probleme bearbeiteten. Das lief 2 Stunden lang und verbrauchte meine gesamten 5 Stunden Codex-Tokens.
3.  Heute ist ein Node im sg-Cluster ausgefallen. Ich habe die Logs angesehen und es waren ständige SSH-Angriffsversuche. Das ist nicht gut. Kurz geprüft, es gibt mehrere Ansätze:
    -   Passwortauthentifizierung deaktivieren
    -   SSH-Zugang für das gesamte Netzwerk deaktivieren
    -   Den Cluster hinter einen NAT verschieben
4.  Einige Nebensachen erledigt. Zl kommt nächste Woche nach Suzhou, habe etwas Zeit für Vorbereitungen aufgewendet, aber es lief nicht reibungslos. Ich plane nicht, weitere Energie darauf zu verwenden.


<a id="orgbbe0c52"></a>

#### Welche Gedanken gab es:

In meiner aktuellen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, Alltagsplanung, Denken und Output. Überschreite ich diese Grenze, komme ich mit der Koordination nicht mehr hinterher und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an AI-Agents zu delegieren. Daher denke ich, es gibt zwei Verbesserungsrichtungen:

-   Für Codierungsaufgaben sollte ich den Autonomiegrad der Agents so weit wie möglich erhöhen. Es gibt mehrere Optimierungsziele:
    1.  Sie sollen mich möglichst wenig stören.
    2.  Sie sollen möglichst viel arbeiten.
    3.  Die Zuverlässigkeit ihrer Arbeit soll möglichst hoch sein.
-   Auch ich selbst muss mich verbessern:
    1.  Meine mentale Energie besser managen, um nicht zu schnell erschöpft zu sein.
    2.  Die Fähigkeit verbessern, in mehreren verschiedenen Kontexten gleichzeitig zu arbeiten, ohne Dinge zu vergessen oder zu verlieren, und dabei den Fortschritt im Blick zu behalten.

Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:

1.  Für Legionmind ein Multi-Agent-Template entwerfen und mit opencode an einer Codierungsaufgabe von Yuan experimentieren.
2.  Weiterhin Arbeitsprotokolle führen und eine Methode für das Management mentaler Energie und Kontexte erkunden.


<a id="org4c1530c"></a>

#### Was ist für morgen geplant?

1.  Wie oben erwähnt, ein Multi-Agent-Experiment durchführen.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

&#x2014;

Zusammenfassend ist meine Hauptaufgabe derzeit, mich selbst mit Hilfe von KI zu skalieren, um dann zu versuchen, andere zu skalieren.


<a id="org9670646"></a>

### 2026-01-23

Heute hatte ich eine leichte Erkältung und Kopfschmerzen, die Produktivität war niedrig. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.


<a id="org5b02719"></a>

#### Was wurde heute gemacht:

1.  Mit Hilfe der KI ein Multi-Agent-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
2.  `legionmind-github-bridge` ist wieder einen Schritt vorangekommen.
3.  Das Preemption-Design und die Implementierung von `node-unit` leicht angepasst. Früher wurden bei einem fehlgeschlagenen `node-unit` alle darunterliegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
4.  Die Prüfung für die Kontoeröffnung bei einem Futures-Broker (CFFEX) abgelegt. Es musste die ganze Zeit die Kamera an sein, das Fenster durfte nicht minimiert oder gewechselt werden. Zum Glück gab es unbegrenzte Versuche, das schaffe ich. Mit 95 Punkten erfolgreich bestanden.


<a id="orgcd67dde"></a>

#### Welche Gedanken gab es:

Mein Ziel ist es, Agent-Autonomie mit möglichst geringem Aufwand zu erreichen. Mein aktueller Workflow sieht so aus:

1.  Legionmind als SOP für Entwicklungsarbeit ist ein Agent-Skill. Ich mag Agent-Skills.
2.  Opencode ist die Entität des Agents. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent usw. Wenn ich opencode eines Tages ersetzen müsste, wäre das meine To-Do-Liste.
3.  Meine aktuelle Kopfschmerzquelle ist, wie ich Skills und diese Sub-Agents kombinieren soll.

Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich merke, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten notieren und die Gedanken erst am nächsten Morgen beim Aufwachen zusammenfassen.


<a id="org55c5e88"></a>

#### Was ist für morgen geplant?

1.  Mit diesem Multi-Agent-System etwas Sinnvolles tun, z.B. das Finanzkonto von Gate anbinden.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Clustersicherheit, falls Zeit bleibt.
4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
5.  Morgen kommen Sy's Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.


<a id="org93f4e20"></a>

### 2026-01-24

Heute habe ich ausgiebig bis 11 Uhr geschlafen und fühle mich erleichtert. Lange habe ich nicht so ausschweifend geschlafen.


<a id="orgabed47d"></a>

#### Was wurde heute gemacht:

1.  Eine neue Version von `node-unit` deployed. Der Grund, warum ich es relativ sorglos deployen konnte, sind die umfangreichen End-to-End-Tests. Konkret: Ein Docker-Container mit TimescaleDB (PostgreSQL 17) wird gestartet, dann zwei `node-unit`s, und in der Datenbank werden 21 `@yuants/portal`-Instanzen eingefügt, um zu testen, ob sie sich schließlich auf zwei Knoten gleichmäßig verteilen.
    
    Dieser Test deckt grundsätzlich ab, was passiert, wenn viele herrenlose Deployments auftauchen und zwei `node-unit`s online gehen: Man kann beobachten, wie sie abwechselnd Deployments übernehmen. Was noch fehlt, ist eine echte CPU-/Arbeitsspeicher-Auslastung und das Szenario, dass ein `node-unit` absichtlich offline genommen wird.

2.  Die neue Multi-Agent-Version von Legionmind in Yuan verwendet, um das Problem der Kontostromausgabe für das `vendor-gate earn`-Konto zu lösen. Ich ließ den Agent zuerst mit Legion Dokumentation erstellen, insgesamt wurden folgende Dokumente erstellt:
    
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
    
    Es fühlt sich nach einem soliden Workflow an. Allerdings gibt es Konflikte zwischen meinem neuen Multi-Agent-System und der bestehenden Dokumentationserstellung von Legionmind. Ich sollte die Grenzen der einzelnen Aufgaben genauer überdenken, z.B. sollten Richtlinien, wie jede Art von Dokument geschrieben werden soll, in separaten Skills liegen, und Legionmind sollte eine Arbeitsablaufbeschreibung sein. Jede Art von Agent sollte in der Lage sein, einige kleinere Skills zu laden, um seine Arbeit zu unterstützen.
    
    Ein weiteres Problem war, dass es beim ersten Versuch einen Fehler machte und den Kontostrom in `account-actions-with-credential.ts` ausgab. Das lag daran, dass ich es anwies, sich an `vendor-okx` zu orientieren, um das Earn-Konto anzubinden. Der Grund für diese Anweisung war, dass bisher nur das OKX Earn-Konto als Account integriert war. Aber die KI übernahm auch einige veraltete Praktiken daraus. Der aktuelle Standard für den Börsenzugang ist, alle Konten über `provideExchangeServices` bereitzustellen, nicht über `provideAccountActionsWithCredential`.
    
    Dieses Wissen besitzt ein brandneuer AI-Agent nicht. Wie modelliert man solches Wissen? Wie stelle ich einem AI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung? Das ist eine Frage, über die ich nachdenken muss. Morgen muss ich das genauer überdenken.

3.  Nachmittags für Sy's Freunde gekocht, das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter~


<a id="orgdb4d8bb"></a>

#### Welche Gedanken gab es:

-   Wie oben erwähnt, muss ich genau überlegen, wie ich für AI-Agents ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Sammlung von AGENT.md-Dateien beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist recht hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist schwierig. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um Erinnerungen zu aktualisieren. Das Wichtigste ist, wie man die Ergebnisse der Arbeit eines AI-Agents bewertet.

-   Bezüglich des obigen Punkts habe ich einen interessanten Artikel gelesen, den ich jetzt in meinen eigenen Worten zusammenfassen möchte: Zunächst kann die Bewertung eines einzelnen Agentenschritts in mehrere Kategorien unterteilt werden:
    
    1.  Statische Tool-Eval: Compiler, Linter, Unit-Tests, E2E-Tests
    2.  Model-Eval: Ein anderes LLM bewertet nach einem von uns definierten Prompt.
    3.  Manuelle Eval: Ich bewerte.
    
    Dann gibt es zwei Arten der systematischen Bewertung eines Agentensystems:
    
    1.  Fähigkeitsbasiert: Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann niedrig sein, z.B. wenn ich Legion verwende, um schrittweise größere, schwierigere Aufgaben auszuführen, als ob man eine neue Grenze erkundet.
    2.  Regressionsbasiert: Kann er die bisherigen Fähigkeiten beibehalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie stabil implementiert werden können.
    
    Wenn also eine neue Fähigkeit eingeführt wird, sollte sie von fähigkeitsbasiert zu regressionsbasiert übergehen.
    
    Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`
    
    -   pass@k: Mindestens ein Erfolg in k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit für mindestens einen Erfolg. Anwendbar: Wenn es nur darum geht, "mindestens eine brauchbare Lösung zu finden".
    
    -   pass^k: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Nutzer zuverlässige Produktion bei jedem Mal erwartet.
    
    FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   Die Energie ist immer noch etwas gering. Nachmittags etwas gearbeitet, abends gekocht, und schon fühle ich mich müde. Wann werde ich wie CZ sein und nicht schlafen müssen?


<a id="org1e207dc"></a>

#### Was ist für morgen geplant?

1.  Über das Modell eines Eval-Agents nachdenken und das Multi-Agent-System weiter iterieren.
2.  Clustersicherheit, muss erledigt werden.
3.  `legion-github-bridge`.


<a id="org7ceb7a6"></a>

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass Jige zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig blockierten und große Probleme verursachten.


<a id="org1fc8b40"></a>

#### Was wurde heute gemacht:

1.  Versucht, den Cluster hinter einen NAT zu migrieren, natürlich mit Hilfe des brandneuen Legion. Meine Vorgehensweise war:
    
    -   Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT für den ausgehenden Traffic erstellt.
        
        Ursprünglich wollte ich ein Netzwerk mit 10.0. verwenden, aber AWS erlaubte die Erstellung solcher CIDRs nicht, also wechselte ich zu 172.21. Hier gab es eine Falle: In der Cluster-Ressource musste der bestehende Loadbalancer manuell auf das entsprechende VPC zeigen (ursprünglich war es implizit standardmäßig zugewiesen, jetzt mit einem zusätzlichen CIDR musste es manuell gesetzt werden).
    
    -   Dann eine neue Instance Group erstellt, die auf das neue VPC zeigt. Ein kleines Problem: Die neue IG hatte keine S3-Berechtigungen, weiß nicht warum. Nach manueller Hinzufügung traten die Nodes dem Cluster normal bei.
    
    -   Nächster Schritt: Dienste manuell in die neue IG migrieren.
    
    -   Schließlich die alte IG herunterfahren.
    
    Nachdem alles fertig war, stellte ich fest, dass der ausgehende Cluster-Traffic nur noch eine IP hatte, was unsere Dienste mit IP-Ratelimiting etwas durcheinanderbrachte. Leider musste ich einen Rollback durchführen. Zuerst muss die http-proxy-Fähigkeit implementiert werden, bevor der nächste Schritt gemacht werden kann.

2.  Das Multi-Agent-System wurde praktisch für ein Skript zur automatischen Aktualisierung des Midas-Nettovermögens eingesetzt. Deepseek hat lange daran gearbeitet, ich war ziemlich zufrieden. Ein Kernproblem ist: Wenn es früh im Design einen Fehler gibt, den ich nicht bemerke, erwartet mich eine riesige Verschwendung von Tokens und Zeit, denn ich merke, dass Agents nicht besonders schnell arbeiten.
    
    Diese Coding-Agents sind noch recht primitiv, sie brechen oft aufgrund von Netzwerkproblemen ab oder stürzen ab. Sie für ernsthafte Langzeitaufgaben einzusetzen, ist noch etwas schwierig, die SLI (Service Level Indicator) ist noch nicht gut genug. Das könnte auch eine Chance sein. Einfach gedacht, erfordert dies Kenntnisse in Software-Engineering und Hochverfügbarkeit, um zu funktionieren.


<a id="orgbbaf9e2"></a>

#### Welche Gedanken gab es:

Heute hatte ich weniger Gedanken, sie sind oben in den Abschnitten eingeflossen.


<a id="org3c32f7f"></a>

#### Was ist für morgen geplant?

1.  Den http-proxy-Mechanismus für Yuan entwerfen.
2.  Nach dem Deployment den Cluster erneut migrieren.


<a id="org80b755f"></a>

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe bemerkt, dass ich nach dem 25. Lebensjahr im Umgang mit Emotionen einen deutlichen Fortschritt gemacht habe: Neben den Emotionen gibt es jetzt einen klaren Verstand, der als Copilot fungiert. Dieser Verstand setzt eine Art Kontrollstange in den riesigen emotionalen Reaktor. Ohne diese Stange würden die Emotionen außer Kontrolle geraten, eine sich selbst verstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieser Stange beginne ich zu verstehen, was gesagt werden kann und was nicht, was getan werden kann und was nicht, welche Entscheidungen getroffen werden können und welche nicht. Das ist eine erfreuliche Veränderung in mir.


<a id="org80224a0"></a>

#### Was wurde heute gemacht:

1.  Heute habe ich mit Legion das Design und die Implementierung des http-proxy für Yuan durchgeführt. Ich finde, es lief ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie ein verfügbarer Terminal ausgewählt wird) modifiziert und dann den Agenten freie Hand gelassen. Das Ergebnis war ziemlich gut.
2.  Ich habe auch mit Legion eine automatische Aktualisierung für Midas durchgeführt. Aber die KI hat durchweg schlechte Arbeit geleistet, hat meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (Deepseek scheint nicht besonders klug zu sein); das Review war nicht streng genug; oder die Wissensdatenbank/Dokumentation ist nicht streng genug.
3.  Verdammt, nachts wurde ich von Alarmen geweckt, ein Host war unerklärlicherweise ausgefallen. Es schien einen CPU-Spitzenwert gegeben zu haben, der den Host in einen Zustand versetzte, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein Haufen. Mein Urteil: Alarme sind nützlich, Logs sind Mist. Notiert!


<a id="org5b61931"></a>

#### Welche Gedanken gab es:

1.  Beim Duschen dachte ich über die kritischsten Punkte der aktuellen Zusammenarbeit zwischen mir und der KI nach. Einer ist die Serviceverfügbarkeit der AI-Agents selbst – dass sie nicht mitten in der Arbeit abstürzen oder sich beenden. Übrigens, Ralph Loop erhöht die Verfügbarkeit im Grunde durch grobes Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst die Berichterstattung eines Untergebenen an einen Vorgesetzten erfordert eine PPT oder einfach einen professionellen mittleren Manager als "teuren Sprachrohr". Wie kann die Berichterstattung der KI an den Menschen auf einfaches Markdown und Code beschränkt sein? Könnte der Bericht der KI jedes Element mit einem Artefakt verlinken? Könnte es einen Citation Agent geben, der speziell für diesen Teil zuständig ist?
    
    Allerdings ist meine derzeitige Nutzung der KI recht eingeschränkt, hauptsächlich auf Codierungsaufgaben konzentriert.

2.  Genauer überlegen, warum mein Multi-Agent-System, nachdem ich es eingerichtet habe, stabil in Richtung eines Scheiterns steuert. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
    
    1.  Das intellektuelle Niveau der KI selbst.
    2.  Das menschliche Review ist nicht streng genug.
    3.  Die Wissensdatenbank ist nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.
    
    Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss nicht weiter bedacht werden. Sich in Richtung 2 anzustrengen, könnte tatsächlich auf ein immer detaillierteres RFC-Dokument setzen, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Entwicklungsmethode ist, als ob wir zum **Wasserfallmodell** zurückkehren würden, Arbeit durch einen linearen Prozess zu erledigen:
    
        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests
    
    Die Gründe dafür liegen auf zwei Ebenen: der technischen Ebene und der **Organisations- und Prozessebene**, wobei die Organisations- und Prozessebene der *Hauptfaktor* ist.
    
    Auf technischer Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf Backend-Schnittstellen warten, um mit der Entwicklung zu beginnen; das Backend muss warten, bis die Produkt-CRDs geschrieben sind, um zu starten.
    
    In menschlichen Organisationen hat das Wasserfallmodell Probleme wie: Ineffizienz, Qualitätsrisiken werden schwer erkennbar, geringe Flexibilität, Teamkonflikte. In der Zusammenarbeit zwischen mir und der KI existieren Effizienz und Teamkonflikte in der Welt der KI von Natur aus nicht. Es ist, als ob ich und die KI in zwei verschiedenen Zeitdimensionen leben, ein Tag für mich ist wie ein Jahr für die KI. Nun, Ineffizienz könnte einige zusätzliche Token kosten, aber das ist derzeit nicht mein Hauptproblem. Mein tatsächliches Problem sind Qualitätsrisiken aufgrund von Missverständnissen von Anforderungen oder Fakten, und die Flexibilität ist gering.
    
    Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich gleichzeitig maximal zu befreien. Nach den Erfahrungen menschlicher Organisationen muss ich ein Knoten auf einer höheren Ebene im Befehlsbaum werden, der Dinge der KI anvertrauen kann, während sie auf der richtigen Spur bleibt.
    
    Die beiden entscheidenden Punkte:
    
    1.  Absichtsausrichtung (Intent Alignment)
    2.  Schichtweise Validierung (Layered Validation)
    
    Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um es zu verstehen.

3.  Ich muss mich vor der schlechten Seite meines Zustands hüten, mit dem Hammer nach Nägeln zu suchen: Pfadabhängigkeit, Output größer als Verständnis.


<a id="orga6c35c5"></a>

#### Was ist für morgen geplant?

Morgen kommt Zl, geplant sind Training, Essen und Brettspiele.


<a id="org98d2dad"></a>

### 2026-01-27

Zl ist da, die Informationsmenge ist groß, ich muss sie verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen, und im letzten Szenario, in dem ich den Antagonisten, den Dramatiker, spielte, spürte ich den Höhepunkt des Spiels und beendete das Spiel mit meinem vollständigen Sieg.


<a id="org756539f"></a>

### 2026-01-31

Die letzten Tage waren recht voll, daher keine Aufzeichnungen. Aber das Aufhören mit den Aufzeichnungen geht nicht, also fasse ich jetzt zusammen und notiere alles auf einmal.

Abgesehen von der vielen Arbeit, warum habe ich nicht aufgezeichnet?

1.  Weil ich Angst hatte, dass Aufzeichnen bedeutet, sich hinzusetzen und speziell 30 Minuten oder mehr für einen Tag aufzuwenden. Das liegt an einer gewissen Angst und Belastung durch das tägliche Protokollieren, was nicht gut ist.
2.  Normalerweise möchte ich erst am Ende eines Tages mit der Aufzeichnung beginnen, aber wenn ich genau darüber nachdenke, ist das etwas unmenschlich, denn ich gehe jetzt meistens ins Bett, sobald es Zeit ist zu schlafen, und nicht, weil alles, was ich tun wollte, wirklich erledigt ist (gibt es das überhaupt?). Das führt dazu, dass ich in freien Momenten nicht aufzeichne, und wenn es wirklich Zeit zum Aufzeichnen ist, muss ich schnell ins Bett. Zusammen mit Problem 1 häuft sich das immer mehr an.


<a id="org57e9aa8"></a>

#### Was wurde heute gemacht:

> Korrektur: Was wurde in den letzten Tagen gemacht

1.  Auf Sc's Empfehlung hin mit Neovim begonnen. Warum? Ich sah, dass `nvim-orgmode` wirklich ein brauchbarer org-mode geworden zu sein scheint, und gleichzeitig begann ich, mich an Emacs zu stören:
    
    -   Endlose Update-Fehler
    -   Verwirrendes Debugging und Fehlermeldungen
    -   Flexibilität, die für mich nur Belastung ist und keinen Nutzen bringt
    -   Ich verstehe Emacs-Lisp nicht und will es auch nicht verstehen
    
    Jahrelang habe ich das oben Genannte ertragen, um org-mode zu nutzen, aber nirgendwo sonst konnte ich org-mode gut nutzen. Jetzt scheint es im nvim-Lager eine Alternative zu geben, warum nicht ausprobieren?
    
    Da ich seit Jahren Vim-Nutzer bin und in Emacs evil-mode (vim-mode) verwendet habe, empfinde ich die Nutzung von vim nie als große Belastung. In VSCode und IDEA kann ich ohne vim nicht überleben, daher ist die direkte Nutzung von nvim für mich überhaupt kein Problem.
    
    Da das Hindernis weg ist, habe ich mir das nvim-Ökosystem angesehen. Nvim hat, ohne den historischen Ballast von vimscript, direkt Lua als Konfigurations- und Plugin-Sprache übernommen. Es kann also leicht starten, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von Neovim jetzt auch von einem System namens `lazy.vim` vereinheitlicht wird. Nvims Design für sein Plugin- und Konfigurationssystem scheint organisiert und geplant speziell gegen die Schmerzpunkte des ursprünglichen vim mutige Innovationen vorgenommen zu haben. In vim & emacs gab es wahrscheinlich unzählige ähnliche Versuche, die Welt zu vereinen, aber weil die Community zu fragmentiert war, hat keiner wirklich Erfolg gehabt.
    
    Also habe ich lazyVim direkt ausprobiert. Wow, jetzt habe ich das Gefühl, direkt einen VSCode zu besitzen, und dieser VSCode kann im Terminal laufen. Weißt du, wie cool das ist?
    
    Jetzt habe ich einen mächtigen alten Herrscher auf neuer Infrastruktur, und seine Konfiguration ist extrem einfach, Flexibilität und Bequemlichkeit sind genau richtig konvergiert, meine alten Schmerzpunkte sind im Grunde alle gelöst.
    
    Ich habe kaum Zeit gebraucht, um viele Workflows darauf umzustellen. Ich verwende jetzt tmux mit 5 Windows, in jedem Window öffne ich nvim in einem Ordner, in nvim links der Verzeichnisbaum, in der Mitte der Code, rechts opencode und Terminal.

2.  Eine Version von Legion aktualisiert. Ich habe den Textumfang des Legionmind-Skills erheblich reduziert (von 4k Zeilen). Derzeit habe ich das Gefühl, dass ich mich um weniger kümmern muss, aber ich weiß nicht, ob es daran liegt, dass ich in letzter Zeit klügere Modelle verwendet habe oder diese Version von Legionmind wirklich klüger geworden ist.

3.  Ein openclaw eingerichtet. Minimax 2.1 ist immer noch etwas dumm, aber als persönlicher Assistent finde ich openclaw ziemlich gut, denn es ist im Grunde ein ChatGPT mit Gedächtnis + Hände und Füße (kann meinen Computer bedienen).

4.  Yuan die http-proxy-Funktionalität hinzugefügt, Metriken usw. hinzugefügt.


<a id="orgcaa37f7"></a>

#### Welche Gedanken gab es

Manchmal habe ich das Gefühl, mit KI zu schreiben ist ein bisschen wie das Debuggen von Code, dessen Prinzipien man nicht ganz versteht – durch ständiges Testen seines Verhaltens oder Ausgeben von Logs beim Debuggen, hier ein bisschen ändern, dort ein bisschen hinzufügen, bis man schließlich ein zufriedenstellendes Ergebnis erhält. Überlegen wir, woher dieses Gefühl kommt:

KI zum Schreiben von Code zu verwenden, im Prozess gibt der Mensch einen Prompt ein, der einige spezifische Anweisungen enthält, in der Hoffnung, dass die KI die impliziten Anweisungen und Informationen dahinter versteht und die Arbeit korrekt erledigt.

Die an die KI zu übermittelnden Anweisungen können geschichtet werden: Die oberste Ebene sind die Anweisungen für die aktuelle Aufgabe. Darunter stehen einige getroffene technische Entscheidungen für das Softwareprojekt, nach Abwägung von Vor- und Nachteilen zusammengefasste Best Practices, die für einen Teil des Projekts geeignet sind. Die nächste Ebene sind Hintergrundinformationen zur Problemdomäne, die das Projekt lösen soll. Die nächste Ebene ist das eigene Fachwissen des Software-Ingenieurs, der die KI verwendet, seine persönlichen Vorlieben, technischen Präferenzen, Stilpräferenzen, historischen Erfahrungen, Denkweisen. Die unterste Ebene ist das Weltwissen.

In einem Dialog mit der KI kann der KI klar vermittelt werden, im Grunde nur die Anweisungen für die aktuelle Aufgabe, in der Hoffnung, dass die KI genügend Weltwissen und Hintergrundinformationen zur Problemlösung besitzt.

Daher kann man schlussfolgern: Wenn der Kontext einer Aufgabe klein genug ist, die gegebenen Anweisungen absolut klar sind und es keine historischen Altlasten gibt, sollte die KI die Aufgabe leicht in hoher Qualität erledigen können. Wenn es viele implizite Hintergrundinformationen gibt, neigt sie dazu, seltsame Dinge zu produzieren.

Was Legionmind tun muss, ist, der KI zu ermöglichen, selbst Hintergrundwissen und Best Practices bezüglich dieses Projekts und der Problemdomäne zu sammeln. Das erfordert, dass die KI entweder über gute logische Denkfähigkeiten und ein gutes Gedächtnis (Kontextkapazität) verfügt oder selbst über umfangreiches Weltwissen verfügt. Was darüber hinausgeht, kann nicht gerettet werden.

&#x2014;

Und dann denke ich, nvim ist wirklich eine späte, aber große Entdeckung.


<a id="orgf2eb618"></a>

#### Was ist für morgen geplant

Morgen gehe ich zu Sc, um sein neues Zuhause zu besichtigen, dann spielen wir zusammen Brettspiele und schauen nebenbei Sy's Skiausrüstung an.


<a id="org0700b38"></a>

### 2026-02-01

War bei Cold Mountain, um Sy Skischuhe anzuschauen. Fußlänge gemessen (245) und einen bequemen Schuh anprobiert. Leider waren die schönen Farben bei Cold Mountain ausverkauft, Sy muss sie also online kaufen.

Mittags bei Sc zu Hause gegessen, was er gekocht hat. Er hat ein Sous-Vide-Gerät für Steaks, das wirklich zartes Fleisch produziert. Sc hat für uns ein Room-Tour-Rätsel vorbereitet, es gab zwei Hinweise. Der erste Hinweise führte zu 4 Orten, um 4 englische Wörter/Sätze zu finden, die mit einem Indexpasswort zu einem Wort kombiniert wurden: "Three". Der zweite Hinweis musste aus einem Umweltpuzzle gewonnen werden, am Ende erhielt man die Zahlen 31/13 (ich erinnere mich nicht genau) und konnte aus einer Schublade mit vielen nummerierten kleinen Kästchen eine Schokolade holen.

Leider hatte er keine Schokolade mehr, wir bekamen einen süßen Auf
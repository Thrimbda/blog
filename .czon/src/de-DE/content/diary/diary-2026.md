---
"title": "Arbeitsjournal 2026: Erkundung von KI-Kollaboration und persönlicher Effizienz"
"summary": "Dieser Artikel ist das Arbeitsjournal des Autors von Anfang Januar bis Anfang Februar 2026 und dokumentiert detailliert die tägliche Entwicklung, Gedanken und das Leben. Der Kern dreht sich darum, wie die Zusammenarbeit mit KI die persönliche Effizienz steigern kann, einschließlich des Designs von Multi-Agenten-Systemen (Legionmind), der Optimierung von Arbeitsabläufen (z.B. die Verwendung von Neovim) und der Lösung technischer Probleme (wie Clustersicherheit, HTTP-Proxy). Der Autor reflektiert über die Herausforderungen der KI-Kollaboration (wie Intent Alignment, Wissensdatenbank-Aufbau) und das eigene Energiemanagement und teilt Erfahrungen mit Tools (wie dem Kauf von ChatGPT Pro) und sozialen Aktivitäten. Das Journal zeigt die kontinuierliche Erkundung von technischer Iteration, Effizienzsteigerung und Lebensbalance."
"tags":
  - "Arbeitsjournal"
  - "KI-Kollaboration"
  - "Multi-Agenten-System"
  - "Effizienzsteigerung"
  - "Toolchain"
  - "Persönliches Wachstum"
  - "Technische Reflexion"
  - "Neovim"
"date": "2026-02-05"
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
            2.  [Abschluss des http-proxy](#org2f33c3f)
            3.  [Iteration von Legionmind](#org43f0ced)



<a id="org91ae5f8"></a>

# 2026




<a id="org14e7d23"></a>

## 2026-01 Januar


<a id="org987e5de"></a>

### 2026-01-22


<a id="orgb693af8"></a>

#### Was wurde heute gemacht:

1.  Das `opencode-feishu-notifier` wurde refaktoriert. Es sendet jetzt Benachrichtigungen an Nutzer auf eine festgelegte Weise.
2.  Die Arbeit am `legionmind-github-bridge` durch die KI wurde fortgesetzt. Ich habe den Multi-Agent-Modus von opencode gestartet, der 5 Agenten startete, um 5 Probleme zu bearbeiten. Es lief zwei Stunden lang und verbrauchte alle meine 5 Stunden Codex-Tokens.
3.  Heute ist ein Knoten im sg-Cluster ausgefallen. Ich habe mir die Logs angesehen und es stellte sich heraus, dass er durch ständige SSH-Angriffsversuche angegriffen wurde. Das ist nicht gut. Nach einer kurzen Prüfung gibt es mehrere mögliche Maßnahmen:
    -   Passwortauthentifizierung deaktivieren
    -   Den SSH-Zugang für das gesamte Netzwerk deaktivieren
    -   Den Cluster hinter einen NAT verschieben
4.  Einige Nebensächlichkeiten wurden erledigt. ZL kommt nächste Woche nach Suzhou, ich habe etwas Zeit für Planungen aufgewendet, aber es lief nicht reibungslos. Ich plane nicht, weitere Energie darauf zu verwenden.


<a id="orgbbe0c52"></a>

#### Welche Gedanken gab es:

In meiner aktuellen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, tägliche Planung, Denken und Output. Über diesen Bereich hinaus komme ich mit der Koordination nicht mehr hinterher und werde leicht müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agenten zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:

-   Für Codierungsaufgaben sollte ich den Autonomiegrad der Agenten so weit wie möglich erhöhen, mit mehreren Optimierungszielen:
    1.  Sie sollten mich so wenig wie möglich stören.
    2.  Sie sollten so viel wie möglich arbeiten.
    3.  Die Zuverlässigkeit ihrer Arbeit sollte so hoch wie möglich sein.
-   Auch ich selbst muss mich verbessern:
    1.  Meine mentale Energie muss gemanagt werden, um nicht zu schnell zu ermüden.
    2.  Die Fähigkeit, in mehreren verschiedenen Kontexten gleichzeitig zu arbeiten, muss verbessert werden, um nichts zu vergessen oder zu verlieren, und der Fortschritt muss gemanagt werden.

Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:

1.  Für Legionmind ein Multi-Agent-Template entwerfen und es an einer Codierungsaufgabe von Yuan mit opencode testen.
2.  Mit dem Arbeitsjournal fortfahren und eine Methode für das Management von mentaler Energie und Kontexten erkunden.


<a id="org4c1530c"></a>

#### Was ist für morgen geplant?

1.  Wie oben erwähnt, ein Multi-Agent-Experiment durchführen.
2.  Am `legionmind-github-bridge` weiterarbeiten.
3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

---

Zusammenfassend ist meine Hauptaufgabe derzeit, mich selbst mit KI zu skalieren und dann zu versuchen, andere zu skalieren.


<a id="org9670646"></a>

### 2026-01-23

Heute hatte ich eine leichte Erkältung, etwas Kopfschmerzen, die Produktivität war niedrig. Aber ich bin froh, dass ich mit den täglichen Zusammenfassungen begonnen habe.


<a id="org5b02719"></a>

#### Was wurde heute gemacht:

1.  Mit Hilfe der KI ein Multi-Agent-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
2.  Der `legionmind-github-bridge` ist wieder einen Schritt vorangekommen.
3.  Das Preemption-Design und die Implementierung von `node-unit` wurden angepasst. Früher wurden bei einem fehlgeschlagenen `node-unit` alle darunter liegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
4.  Die Prüfung für die Futures-Broker-Kontoeröffnung bei der CFFEX abgelegt. Es musste die ganze Zeit die Kamera eingeschaltet sein, ohne Minimieren oder Wechseln des Bildschirms. Zum Glück gab es unbegrenzte Versuche, das schaffe ich locker. Mit 95 Punkten erfolgreich bestanden.


<a id="orgcd67dde"></a>

#### Welche Gedanken gab es:

Mein Ziel ist es, Agentenautonomie mit möglichst wenig Aufwand zu erreichen. Mein aktueller Workflow sieht so aus:

1.  Legionmind als SOP für Entwicklungsarbeit ist ein Agent-Skill. Ich mag Agent-Skills.
2.  Opencode als Entität des Agenten. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent. Wenn ich opencode eines Tages ersetzen müsste, wäre das meine To-Do-Liste.
3.  Meine aktuelle Kopfschmerzquelle ist, wie Skills und diese Subagenten kombiniert werden sollen.

Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich finde, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten aufzeichnen und die Gedanken dann am nächsten Morgen zusammenfassen.


<a id="org55c5e88"></a>

#### Was ist für morgen geplant?

1.  Mit diesem Multi-Agent-System etwas anfangen, z.B. das Finanzkonto von Gate anschließen.
2.  Am `legionmind-github-bridge` weiterarbeiten.
3.  Clustersicherheit, falls Zeit bleibt.
4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
5.  Morgen kommen SYs Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.


<a id="org93f4e20"></a>

### 2026-01-24

Heute habe ich ausgiebig bis 11 Uhr geschlafen und fühle mich sehr entspannt. So lange habe ich schon nicht mehr so ausgiebig geschlafen.


<a id="orgabed47d"></a>

#### Was wurde heute gemacht:

1.  Eine neue Version von `node-unit` deployed. Der Grund, warum ich es relativ sorglos deployen konnte, sind meine umfassenden End-to-End-Tests. Konkret: Docker startet eine TimescaleDB (PostgreSQL 17), dann zwei `node-unit`s, und in der Datenbank werden 21 `@yuants/portal` eingefügt, um zu testen, ob sie sich schließlich auf je die Hälfte verteilen.
    
    Dieser Test kann grundsätzlich zeigen, dass, wenn eine Reihe herrenloser Deployments auftauchen und zwei `node-unit`s hochfahren, sie abwechselnd die Deployments übernehmen. Was noch fehlt, ist eine echte CPU-/Arbeitsspeicher-Auslastung und ein Szenario, in dem ein `node-unit` ausfällt.

2.  Mit der neuen Multi-Agent-Version von Legionmind in Yuan das Problem der Kontostromausgabe für das `vendor-gate earn`-Konto gelöst. Ich ließ den Agenten zuerst mit Legion Dokumente erstellen, insgesamt wurden folgende Dokumente erstellt:
    
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
    
    Es fühlt sich nach einem soliden Workflow an. Allerdings gibt es einige Konflikte zwischen meinem neuen Multi-Agent-System und der ursprünglichen Dokumentenerstellung von Legionmind. Ich sollte die Grenzen der einzelnen Aufgaben sorgfältig überdenken, z.B. sollten Spezifikationen, wie jede Art von Dokument geschrieben werden sollte, in separaten Skills abgelegt werden, und Legionmind sollte eine Beschreibung des Arbeitsablaufs sein. Jeder Agent sollte in der Lage sein, einige kleinere Skills zu laden, um seine Arbeit zu unterstützen.
    
    Ein weiteres Problem war, dass es beim ersten Versuch einen Fehler machte und den Kontostrom in `account-actions-with-credential.ts` ausgab. Das lag daran, dass ich es anwies, sich an `vendor-okx` zu orientieren, um das Earn-Konto anzuschließen, weil bisher nur das OKX Earn-Konto als Account integriert war. Aber die KI übernahm auch einige veraltete Praktiken daraus. Der aktuelle Standard für den Exchange-Anschluss ist, alle Konten über `provideExchangeServices` bereitzustellen, nicht über `provideAccountActionsWithCredential`.
    
    Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie sollte solches Wissen modelliert werden? Wie kann ich einem KI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung stellen? Das ist eine Frage, die es zu überdenken gilt, morgen muss ich genauer darüber nachdenken.

3.  Nachmittags habe ich für SYs Freunde gekocht, das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter~


<a id="orgdb4d8bb"></a>

#### Welche Gedanken gab es:

-   Wie oben erwähnt, muss ich sorgfältig überlegen, wie ich für KI-Agenten ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Reihe von AGENT.md-Dateien beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist ziemlich hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist schwierig. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um Erinnerungen zu aktualisieren. Das Wichtigste ist, wie man die Ergebnisse der KI-Agentenarbeit bewertet.

-   Bezüglich des obigen Punkts habe ich einen interessanten Artikel gesehen, den ich jetzt in meinen eigenen Worten zusammenfassen möchte: Zunächst kann die Bewertung einer einzelnen Agentenarbeit in mehrere Kategorien unterteilt werden:
    
    1.  Statische Tool-Evaluierung: Compiler, Linter, Unit-Tests, E2E-Tests
    2.  Model-Evaluierung: Ein anderes LLM bewertet anhand unserer definierten Prompts.
    3.  Manuelle Evaluierung: Ich bewerte.
    
    Dann gibt es zwei Arten der systematischen Evaluierung eines Agenten:
    
    1.  Fähigkeitsbasiert: Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann niedrig sein, z.B. wenn ich Legion verwende, um schrittweise größere, schwierigere Aufgaben auszuführen, als ob ich eine neue Grenze erkunde.
    2.  Regressionsbasiert: Kann er die bisherigen Fähigkeiten beibehalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie stabil implementiert werden können.
    
    Wenn also eine neue Fähigkeit eingeführt wird, sollte sie von fähigkeitsbasiert zu regressionsbasiert übergehen.
    
    Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`
    
    -   pass@k: Mindestens ein Erfolg in k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit, mindestens eine brauchbare Lösung zu finden. Anwendbar: Wenn es nur darum geht, "mindestens eine brauchbare Lösung" zu finden.
    
    -   pass^k: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Nutzer jedes Mal zuverlässige Agentenproduktion erwartet.
    
    FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   Die Energie ist immer noch etwas gering. Nachmittags habe ich eine Weile gearbeitet, abends gekocht und fühlte mich schon etwas müde. Wann werde ich wie CZ sein und nicht schlafen müssen?


<a id="org1e207dc"></a>

#### Was ist für morgen geplant?

1.  Über das Modell des Eval-Agenten nachdenken und das Multi-Agent-System weiter iterieren.
2.  Clustersicherheit, muss erledigt werden.
3.  `legion-github-bridge`


<a id="org7ceb7a6"></a>

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass Jige zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig blockierten und große Probleme verursachten.


<a id="org1fc8b40"></a>

#### Was wurde heute gemacht:

1.  Versucht, den Cluster hinter einen NAT zu migrieren, natürlich mit Hilfe des brandneuen Legion. Meine Vorgehensweise war:
    
    -   Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT für den ausgehenden Traffic erstellt.
        
        Ursprünglich wollte ich ein Netzwerksegment mit 10.0. verwenden, aber AWS erlaubte die Erstellung eines solchen CIDR nicht, also wechselte ich zu 172.21. Dabei gab es eine Falle: In der Cluster-Ressource musste der ursprüngliche Loadbalancer manuell auf das entsprechende VPC zeigen (ursprünglich war es implizit standardmäßig zugewiesen, jetzt mit einem zusätzlichen CIDR musste es manuell gesetzt werden).
    
    -   Dann eine neue Instance Group erstellt, die auf das neue VPC zeigt. Dabei gab es einen kleinen Zwischenfall: Die neue IG hatte keine S3-Berechtigungen, aus unerfindlichen Gründen. Nach manueller Hinzufügung traten die Knoten dem Cluster normal bei.
    
    -   Der nächste Schritt war die manuelle Migration der Dienste in die neue IG.
    
    -   Schließlich die alte IG herunterfahren.
    
    Nachdem alles erledigt war, stellte ich fest, dass der ausgehende Cluster-Traffic nur noch eine IP hatte, was unsere Dienste mit IP-Ratelimiting etwas überforderte. Leider musste ich einen Rollback durchführen. Zuerst muss die HTTP-Proxy-Fähigkeit implementiert werden, bevor es weitergehen kann.

2.  Das Multi-Agent-System wurde für ein Skript zur automatischen Aktualisierung des Midas-Nettovermögens eingesetzt. Deepseek hat lange daran gearbeitet, und ich war ziemlich zufrieden. Ein Kernproblem dabei ist: Wenn es früh im Design einen Fehler gibt, den ich nicht bemerke, erwartet mich eine riesige Verschwendung von Tokens und Zeit, denn ich habe festgestellt, dass Agenten nicht besonders schnell arbeiten.
    
    Diese Coding-Agenten sind noch ziemlich primitiv. Sie brechen oft aufgrund von Netzwerkproblemen ab oder stürzen ab. Es ist noch etwas schwierig, sie für ernsthafte Langzeitaufgaben einzusetzen, die SLI (Service Level Indicator) ist noch nicht gut genug. Das könnte auch eine Chance sein. Kurz nachgedacht: Hier ist Wissen aus der Softwareentwicklung und Hochverfügbarkeit erforderlich.


<a id="orgbbaf9e2"></a>

#### Welche Gedanken gab es:

Heute gab es weniger Gedanken, sie sind bereits in die obigen Abschnitte integriert.


<a id="org3c32f7f"></a>

#### Was ist für morgen geplant?

1.  Den HTTP-Proxy-Mechanismus für Yuan entwerfen.
2.  Nach dem Deployment den Cluster erneut migrieren.


<a id="org80b755f"></a>

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach dem 25. Lebensjahr im Umgang mit Emotionen einen deutlichen Fortschritt gemacht habe: Neben den Emotionen gibt es jetzt eine deutliche Spur von Vernunft, die als Copilot fungiert. Diese Vernunft legt wie eine Steuerstange in einem großen emotionalen Reaktor einen Dämpfer ein. Ohne diese Stange würden die Emotionen außer Kontrolle geraten, eine selbstverstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieser Stange beginne ich zu verstehen, was gesagt werden kann und was nicht, was getan werden kann und was nicht, welche Entscheidungen getroffen werden können und welche nicht. Das ist eine erfreuliche Veränderung in mir.


<a id="org80224a0"></a>

#### Was wurde heute gemacht:

1.  Heute habe ich mit Legion das Design und die Implementierung des HTTP-Proxys für Yuan durchgeführt. Ich fand es ziemlich reibungslos. Während des Prozesses habe ich sein Design überprüft, einen Punkt (wie ein verfügbares Terminal ausgewählt wird) modifiziert und dann den Agenten freie Hand gelassen. Das Ergebnis war ziemlich gut.
2.  Ich habe auch mit Legion eine automatische Aktualisierung für Midas durchgeführt, aber die KI hat durchweg schlechte Arbeit geleistet, meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (Deepseek scheint nicht klug genug zu sein); das Review war nicht streng genug; oder die Dokumentations-Wissensdatenbank ist nicht streng genug.
3.  Verdammt, nachts wurde ich von Alarmen geweckt, der Host war auf unerklärliche Weise abgestürzt. Es scheint einen CPU-Spitzenwert gegeben zu haben, der den Host in einen Zustand versetzte, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein Haufen, mein Urteil: Alarme sind nützlich, Logs sind Mist. Notiert!


<a id="org5b61931"></a>

#### Welche Gedanken gab es:

1.  Beim Duschen dachte ich über den kritischsten Punkt der aktuellen Zusammenarbeit zwischen mir und der KI nach. Einer ist die Serviceverfügbarkeit des KI-Agenten selbst – dass er nicht mitten in der Arbeit abstürzt oder sich beendet. Übrigens, Ralph Loop erhöht die Verfügbarkeit im Grunde durch grobes ständiges Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst die Berichterstattung eines Untergebenen an einen Vorgesetzten erfordert eine PowerPoint-Präsentation oder einfach einen professionellen mittleren Manager als "teuren Sprachrohr". Wie kann die Berichterstattung der KI an den Menschen auf flache Markdown-Dateien und Code beschränkt sein? Könnte jeder Punkt im KI-Report mit einem Artefakt verlinkt sein? Könnte es einen Citation Agent geben, der speziell für diesen Teil zuständig ist?
    
    Allerdings ist meine derzeitige Nutzung der KI ziemlich eingeschränkt, hauptsächlich auf Codierungsaufgaben konzentriert.

2.  Genauer überlegen, warum mein Multi-Agent-System, nachdem ich es eingerichtet habe, stabil in Richtung eines Scheiterns steuert. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
    
    1.  Das intellektuelle Niveau der KI selbst
    2.  Das menschliche Review war nicht streng genug
    3.  Die Wissensdatenbank ist nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.
    
    Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss nicht weiter bedacht werden. Sich in Richtung 2 anzustrengen, würde tatsächlich auf ein immer detaillierteres RFC-Dokument angewiesen sein, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Art der Entwicklung ist, als wären wir zum **Wasserfall**-Entwicklungsmodell zurückgekehrt, Arbeit durch einen linearen Prozess zu erledigen:
    
        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests
    
    Die Gründe dafür gibt es auf zwei Ebenen: der technischen Ebene und der Ebene der Organisation und Prozesse, wobei die organisatorische und prozessuale Ebene der *Hauptfaktor* ist.
    
    Auf der technischen Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf Backend-Schnittstellen warten, um mit der Entwicklung zu beginnen, und das Backend muss warten, bis das Produkt-CRD geschrieben ist, um zu starten.
    
    Als menschliche Organisation hat das Wasserfallmodell Probleme wie: Ineffizienz, Qualitätsrisiken, die schwer aufzudecken sind, geringe Flexibilität und Teamkonflikte. In der Zusammenarbeit zwischen mir und der KI existieren Effizienz und Teamkonflikte in der Welt der KI von Natur aus nicht. Es ist, als ob die KI und ich in zwei verschiedenen Zeitdimensionen leben, ein Tag für mich ist wie ein Jahr für die KI. Nun, Ineffizienz könnte ein paar Tokens mehr kosten, aber das ist derzeit nicht mein Hauptanliegen. Mein tatsächliches Problem sind Qualitätsrisiken durch falsches Verständnis von Anforderungen oder Fakten, und die Flexibilität ist gering.
    
    Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich gleichzeitig maximal zu befreien. Nach der Erfahrung der menschlichen Organisation muss ich ein Knoten auf einer höheren Ebene im Befehlsbaum werden, der Dinge der KI anvertrauen kann, während sie auf der richtigen Spur bleibt.
    
    Die beiden entscheidenden Punkte sind:
    
    1.  Intent Alignment (Absichtausrichtung)
    2.  Schichtweise Validierung
    
    Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um es zu verstehen.

3.  Ich muss mich vor der schlechten Seite meines Zustands hüten, in dem ich mit einem Hammer nach Nägeln suche: Pfadabhängigkeit, Output größer als Verständnis.


<a id="orga6c35c5"></a>

#### Was ist für morgen geplant?

Morgen kommt ZL, geplant sind Training, Essen und Brettspiele.


<a id="org98d2dad"></a>

### 2026-01-27

ZL ist da, die Informationsmenge ist groß, ich muss sie verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen, und schließlich, im letzten Szenario, in dem ich den Bösewicht-Dramatiker spielte, spürte ich den Sweet Spot des Spiels und beendete das Spiel mit meinem vollständigen Sieg.


<a id="org756539f"></a>

### 2026-01-31

Die letzten Tage waren ziemlich voll, daher gab es keine Aufzeichnungen. Aber das Aufhören mit der Aufzeichnung geht nicht, also fange ich jetzt wieder an und fasse zusammen.

Abgesehen von vielen Dingen, warum gab es keine Aufzeichnungen?

1.  Weil ich Angst hatte, dass Aufzeichnen bedeutet, sich hinzusetzen und speziell 30 Minuten oder mehr aufzuwenden, um einen Tag aufzuzeichnen. Das liegt an einer gewissen Angst und Belastung durch die tägliche Aufzeichnung, was nicht gut ist.
2.  Normalerweise möchte ich nur am Ende eines Tages mit der Aufzeichnung beginnen, aber wenn ich genau darüber nachdenke, ist das etwas unmenschlich, denn ich gehe jetzt meistens ins Bett, sobald es Zeit ist zu schlafen, und nicht, weil alles, was ich tun wollte, wirklich erledigt ist (gibt es das überhaupt?). Das führt dazu, dass ich in freien Momenten nicht aufzeichne, und wenn es wirklich Zeit zum Aufzeichnen ist, muss ich schnell ins Bett, plus Problem 1.

Beides zusammen häuft sich an.


<a id="org57e9aa8"></a>

#### Was wurde heute gemacht:

> Korrektur: Was wurde in den letzten Tagen gemacht

1.  Auf Anraten von SC habe ich begonnen, Neovim zu verwenden. Warum? Ich habe gesehen, dass `nvim-orgmode` wirklich ein brauchbarer org-mode geworden zu sein scheint, und gleichzeitig begann ich, mich von Emacs zu langweilen:
    
    -   Endlose Update-Fehler
    -   Verwirrendes Debugging und Fehlermeldungen
    -   Flexibilität, die für mich nur zusätzliche Belastung ist und keinen Nutzen bringt
    -   Ich verstehe Emacs-Lisp nicht und möchte es auch nicht verstehen
    
    Jahrelang habe ich das oben Genannte ertragen, um org-mode zu nutzen, aber nirgendwo sonst konnte ich org-mode gut nutzen. Jetzt scheint das Nvim-Lager eine Alternative zu haben, warum es nicht ausprobieren?
    
    Da ich seit Jahren Vim-Nutzer bin und in Emacs auch evil-mode (vim-mode) verwendet habe, habe ich nie das Gefühl, dass die Verwendung von Vim eine große Belastung für mich darstellt. In VSCode und IDEA kann ich ohne Vim nicht überleben, daher ist die direkte Verwendung von Nvim für mich überhaupt kein Problem.
    
    Da das Hindernis weg ist, werfe ich einen Blick auf die Nvim-Ökologie. Nvim, ohne das historische Ballast von Vimscript, verwendet direkt Lua als Konfigurations- und Plugin-Sprache. Es kann also leicht starten, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von Neovim jetzt auch von einem System namens `lazy.vim` vereinheitlicht wird. Das Design von Nvim für sein Plugin- und Konfigurationssystem scheint organisiert und geplant speziell gegen die Schmerzpunkte des ursprünglichen Vim mutige Innovationen durchgeführt zu haben. In Vim & Emacs gab es wahrscheinlich unzählige ähnliche Versuche, die alle vereinheitlichen wollten, aber weil die Community zu fragmentiert war, hat wahrscheinlich keiner wirklich Erfolg gehabt.
    
    Also habe ich lazyVim direkt ausprobiert, und siehe da, jetzt habe ich das Gefühl, direkt einen VSCode zu besitzen, und dieser VSCode kann im Terminal laufen. Weißt du, wie geil das ist?
    
    Jetzt habe ich einen mächtigen alten Herrscher auf einer brandneuen Infrastruktur, und seine Konfiguration ist extrem einfach, Flexibilität und Bequemlichkeit sind genau richtig konvergiert, meine alten Schmerzpunkte sind im Grunde alle gelöst.
    
    Ich habe fast keine Zeit gebraucht, um viele Workflows darauf umzustellen. Ich verwende jetzt tmux mit 5 Windows, und in jedem Window öffne ich Nvim in einem Ordner, in Nvim ist links der Verzeichnisbaum, in der Mitte der Code, rechts opencode und das Terminal.

2.  Eine Version von Legion aktualisiert. Ich habe den Textumfang des Legionmind-Skills erheblich reduziert (von 4k Zeilen). Derzeit habe ich das Gefühl, dass ich mich um weniger kümmern muss, aber ich weiß nicht, ob es daran liegt, dass ich in letzter Zeit intelligentere Modelle verwendet habe oder ob diese Version von Legionmind wirklich klüger geworden ist.

3.  Ein openclaw eingerichtet. Minimax 2.1 ist immer noch etwas dumm, aber als persönlicher Assistent finde ich openclaw ziemlich gut, denn es ist im Grunde ein ChatGPT mit Gedächtnis + Händen und Füßen (kann meinen Computer bedienen).

4.  Yuan um HTTP-Proxy-Funktionalität erweitert, Metriken hinzugefügt usw.


<a id="orgcaa37f7"></a>

#### Welche Gedanken gab es

Manchmal habe ich das Gefühl, dass das Schreiben mit KI ein bisschen wie das Debuggen von Code ist, dessen Prinzipien man nicht ganz versteht – durch ständiges Testen seines Verhaltens oder das Ausgeben von Logs, hier ein bisschen ändern, dort ein bisschen hinzufügen, bis man schließlich ein zufriedenstellendes Ergebnis erhält. Lassen Sie uns über den Ursprung dieses Gefühls nachdenken:

Bei der Verwendung von KI zum Schreiben von Code ist der Prozess im Wesentlichen, dass ein Mensch einen Prompt eingibt, der einige spezifische Anweisungen enthält, und dann hofft, dass die KI die impliziten Anweisungen und Informationen hinter diesen Anweisungen versteht und die Arbeit korrekt erledigt.

Die an die KI zu übermittelnden Anweisungen können geschichtet werden: Die oberste Ebene sind die Anweisungen für die aktuelle Aufgabe. Darunter liegen einige getroffene technische Entscheidungen für das Softwareprojekt, Best Practices, die nach Abwägung von Vor- und Nachteilen für einen lokalen Teil des Projekts geeignet sind. Die nächste Ebene sind Hintergrundinformationen zur Problemdomäne, die das Projekt lösen soll. Die darunter liegende Ebene ist das eigene Fachwissen des Softwareingenieurs, der die KI verwendet, seine persönlichen Vorlieben, technischen Präferenzen, Stilpräferenzen, historischen Erfahrungen und Denkweisen. Die unterste Ebene ist das Weltwissen.

In einem Dialog mit der KI kann nur die Anweisung für die aktuelle Aufgabe klar und deutlich vermittelt werden, und dann wird gehofft, dass die KI über ausreichend Weltwissen und Hintergrundinformationen zur Problemlösung verfügt.

Daher kann geschlussfolgert werden, dass die KI eine Aufgabe leicht und in hoher Qualität erledigen kann, wenn der Kontext einer Aufgabe klein genug ist, die gegebenen Anweisungen absolut klar sind und es keine historischen Altlasten gibt. Wenn es viele implizite Hintergrundinformationen gibt, kommt es leicht zu seltsamen Ergebnissen.

Was Legionmind tun muss, ist, der KI zu ermöglichen, selbst Hintergrundwissen und Best Practices bezüglich dieses Projekts und der Problemdomäne anzusammeln. Das erfordert, dass die KI entweder über gute logische Denkfähigkeiten und ein gutes Gedächtnis (Kontext
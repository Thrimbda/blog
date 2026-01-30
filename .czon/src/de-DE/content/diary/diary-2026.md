---
"title": "Arbeitsjournal 2026: KI-Agenten-Kollaboration und Systementwicklungspraxis"
"summary": "Dieser Artikel ist das Arbeitsjournal vom Januar 2026. Der Autor dokumentiert detailliert die täglichen Arbeitsinhalte, Gedanken und Pläne. Der Kern dreht sich darum, wie KI-Agenten (insbesondere Multi-Agenten-Systeme) genutzt werden können, um die persönliche Arbeitseffizienz und die Autonomie von Systemen zu steigern. Das Journal behandelt mehrere technische Praktiken, wie die Refaktorisierung von opencode-feishu-notifier, die Entwicklung von legionmind-github-bridge, das Design von Multi-Agenten-Templates, die Behandlung von Cluster-Sicherheitsmigrationen (z.B. NAT-Konfiguration) und die Implementierung eines HTTP-Proxy-Mechanismus für Yuan. Der Autor reflektiert über Schlüsselfragen der KI-Kollaboration, einschließlich Absichtsausrichtung, schichtweise Validierung, Wissensdatenbankaufbau und Agenten-Evaluierungsmethoden, und untersucht die Anwendbarkeit des Wasserfall-Entwicklungsmodells in der KI-Kollaboration. Das Journal enthält auch persönliche Lebensereignisse (wie Besuche von Freunden, Gesundheitsmanagement) und Gedanken zum Emotionsmanagement."
"tags":
  - "Arbeitsjournal"
  - "KI-Agent"
  - "Multi-Agenten-System"
  - "Systementwicklung"
  - "Clustersicherheit"
  - "Effizienzsteigerung"
  - "Automatisierung"
  - "Persönliches Management"
"date": "2026-01-01"
---

# Inhaltsverzeichnis

1.  [2026](#org7a37329)
    1.  [2026-01 Januar](#orgdf95c10)
        1.  [2026-01-22](#org46a8ace)
            1.  [Was habe ich heute gemacht:](#org4842a30)
            2.  [Welche Gedanken hatte ich:](#orgd3c2dea)
            3.  [Was plane ich für morgen?](#orgfac9005)
        2.  [2026-01-23](#org53cf87b)
            1.  [Was habe ich heute gemacht:](#org420a748)
            2.  [Welche Gedanken hatte ich:](#org003bc35)
            3.  [Was plane ich für morgen?](#org50de801)
        3.  [2026-01-24](#org5af0a91)
            1.  [Was habe ich heute gemacht:](#org69bd02c)
            2.  [Welche Gedanken hatte ich:](#org1f09dca)
            3.  [Was plane ich für morgen?](#org8a10f91)
        4.  [2026-01-25](#org1d94cd3)
            1.  [Was habe ich heute gemacht:](#org1ca275c)
            2.  [Welche Gedanken hatte ich:](#org48ae323)
            3.  [Was plane ich für morgen?](#org7111e30)
        5.  [2026-01-26](#org43faf05)
            1.  [Was habe ich heute gemacht:](#org8efa648)
            2.  [Welche Gedanken hatte ich:](#orga5425d1)
            3.  [Was plane ich für morgen?](#orge845cbe)
        6.  [2026-01-27](#org3411989)

<a id="org7a37329"></a>

# 2026

<a id="orgdf95c10"></a>

## 2026-01 Januar

<a id="org46a8ace"></a>

### 2026-01-22

<a id="org4842a30"></a>

#### Was habe ich heute gemacht:

1.  Habe `opencode-feishu-notifier` etwas refaktorisiert. Es sendet jetzt Benachrichtigungen an Nutzer auf eine festgelegte Weise.
2.  Habe die KI weiter an `legionmind-github-bridge` schreiben lassen. Ich habe begonnen, den Multi-Agenten-Modus von `opencode` zu nutzen. Es startete 5 Agenten, um 5 Probleme zu bearbeiten, und lief dann zwei Stunden lang alleine vor sich hin, wobei es meine 5 Stunden Codex-Tokens komplett aufbrauchte.
3.  Heute ist ein Node im `sg`-Cluster ausgefallen. Ich habe mir die Logs angesehen und es stellte sich heraus, dass er durch ständige SSH-Angriffsversuche lahmgelegt wurde. Das ist nicht gut. Nach einer kurzen Prüfung gibt es mehrere mögliche Maßnahmen:
    - Passwortauthentifizierung deaktivieren
    - Den SSHd-Zugang für das gesamte Netzwerk schließen
    - Den Cluster hinter einen NAT verschieben
4.  Habe einige Nebensächlichkeiten erledigt. ZL kommt nächste Woche nach Suzhou, ich habe etwas Zeit für Planungen aufgewendet, aber es lief nicht reibungslos. Ich plane nicht, weitere Energie darauf zu verwenden.

<a id="orgd3c2dea"></a>

#### Welche Gedanken hatte ich:

In meiner derzeitigen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, Alltagsplanung, Denken und Output. Überschreite ich diesen Rahmen, komme ich mit der Koordination nicht mehr hinterher und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agenten zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:

- Für Codierungsaufgaben sollte ich den Autonomiegrad der Agenten so weit wie möglich erhöhen. Es gibt mehrere Optimierungsziele:
  1.  Sie sollten mich so wenig wie möglich stören.
  2.  Sie sollten so viel wie möglich arbeiten.
  3.  Die Zuverlässigkeit ihrer Arbeit sollte so hoch wie möglich sein.
- Auch ich selbst muss mich verbessern:
  1.  Meine mentale Energie besser managen, um nicht zu schnell erschöpft zu sein.
  2.  Die Fähigkeit verbessern, in mehreren unterschiedlichen Kontexten gleichzeitig zu arbeiten, ohne Dinge zu vergessen oder zu verlieren, und dabei den Fortschritt im Blick zu behalten.

Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:

1.  Für `legionmind` ein Multi-Agenten-Template entwerfen und es mit `opencode` an einer Codierungsaufgabe für `yuan` testen.
2.  Mit dem Führen des Arbeitsjournals fortfahren und eine Methode für das Management mentaler Energie und Kontexte erkunden.

<a id="orgfac9005"></a>

#### Was plane ich für morgen?

1.  Wie oben erwähnt, ein Experiment mit Multi-Agenten durchführen.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Falls Zeit bleibt, mich um die Clustersicherheit kümmern.

&#x2014;

Zusammenfassend ist meine Hauptaufgabe derzeit, mich selbst mit KI zu skalieren, um dann zu versuchen, andere zu skalieren.

<a id="org53cf87b"></a>

### 2026-01-23

Ich habe heute eine leichte Erkältung, etwas Kopfschmerzen, die Produktivität ist niedrig. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.

<a id="org420a748"></a>

#### Was habe ich heute gemacht:

1.  Mit Hilfe der KI ein Multi-Agenten-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
2.  `legionmind-github-bridge` ist wieder einen Schritt vorangekommen.
3.  Das Preemption-Design und die Implementierung von `node-unit` leicht modifiziert. Früher wurden bei einem `failed`-Zustand einer `node-unit` alle darunter liegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
4.  Die Prüfung für die Kontoeröffnung bei einem Futures-Broker (CFFEX) abgelegt. Es war überraschend, dass die Kamera die ganze Zeit an sein musste, das Fenster nicht minimiert und nicht gewechselt werden durfte. Zum Glück konnte man es unendlich oft versuchen – das kriege ich hin. Stolze 95 Punkte und bestanden.

<a id="org003bc35"></a>

#### Welche Gedanken hatte ich:

Mein Ziel ist es, Agenten-Autonomie mit möglichst wenig Aufreiberei zu erreichen. Mein derzeitiger Workflow sieht so aus:

1.  `legionmind` als SOP (Standard Operating Procedure) für Entwicklungsarbeit. Es ist eine Agenten-Fähigkeit (Agent Skill). Ich mag Agent Skills.
2.  `opencode` als die physische Entität des Agenten. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent usw. Wenn ich `opencode` eines Tages ersetzen müsste, wäre das meine To-Do-Liste.
3.  Was mir derzeit Kopfzerbrechen bereitet, ist, wie man Skills und diese Sub-Agenten kombiniert.

Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer im Kopf. Ich finde, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten aufzeichnen und die Gedanken dann am nächsten Morgen nach dem Aufwachen zusammenfassen.

<a id="org50de801"></a>

#### Was plane ich für morgen?

1.  Mit diesem Multi-Agenten-System etwas anstellen, z.B. das Finanzkonto von `gate` anbinden.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Clustersicherheit, falls Zeit bleibt.
4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
5.  Morgen kommen SYs Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

<a id="org5af0a91"></a>

### 2026-01-24

Heute habe ich mich ausgeschlafen und bin erst um 11 Uhr aufgewacht. Fühle mich leicht und entspannt, schon lange nicht mehr so ausgiebig geschlafen.

<a id="org69bd02c"></a>

#### Was habe ich heute gemacht:

1.  Die neue Version von `node-unit` live geschaltet. Der Grund, warum ich mich traue, sie hochzuziehen, ist, dass ich relativ umfassende End-to-End-Tests habe. Konkret: Docker startet eine TimescaleDB (PostgreSQL 17), dann starten zwei `node-unit`s, und in der Datenbank werden 21 `@yuants/portal`-Instanzen eingefügt, um zu testen. Am Ende konvergiert es zu einem Zustand, in dem jeder die Hälfte übernimmt.

    Dieser Test kann im Grunde zeigen, dass wenn eine Reihe herrenloser Deployments auftauchen und zwei `node-unit`s online gehen, man abwechselnde Preemption der Deployments beobachten kann. Was wirklich fehlt, ist erstens eine echte CPU-/Arbeitsspeicher-Auslastung und zweitens das Szenario, dass eine `node-unit` aus irgendeinem Grund offline geht.

2.  Die neue Multi-Agenten-Version von `legionmind` in `Yuan` verwendet, um das Problem der Ausgabe des Kontostroms für das `vendor-gate` Earn-Konto zu lösen. Ich ließ den Agenten zuerst mit `legion` Dokumente erstellen. Insgesamt wurden folgende Dokumente ausgegeben:

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

    Fühlt sich an wie ein vernünftiger Workflow. Allerdings gibt es einige Konflikte zwischen meinem neuen Multi-Agenten-System und der ursprünglichen Dokumentenerstellung von `legionmind`. Ich sollte die Grenzen der verschiedenen Aufgaben sorgfältig überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument geschrieben werden sollte, in separaten Skills abgelegt werden, und `legionmind` sollte eine Beschreibung des Arbeitsablaufs sein. Jede Art von Agent sollte in der Lage sein, einige kleinere Skills zu laden, um sie bei ihrer Arbeit zu unterstützen.

    Ein weiteres Problem war, dass es beim ersten Mal einen Fehler machte und den Kontostrom in `account-actions-with-credential.ts` ausgab. Das liegt daran, dass ich verlangt habe, sich an `vendor-okx` zu orientieren, um das Earn-Konto anzubinden. Der Grund für diese Anforderung war, dass derzeit nur das OKX Earn-Konto ebenfalls als `account` eingebunden ist. Aber die KI hat dabei einige veraltete Praktiken übernommen. Der aktuelle Standard für den Exchange-Anschluss ist, alle Konten über `provideExchangeServices` zu veröffentlichen, anstatt `provideAccountActionsWithCredential` für den Kontozugang zu verwenden.

    Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie modelliert man solches Wissen? Wie stelle ich einem KI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung? Das ist eine Frage, die es wert ist, tiefgründig überdacht zu werden. Morgen muss ich mich damit genauer befassen.

3.  Nachmittags für SYs Freunde gekocht, was mich total erschöpft hat. Also morgen geht die Arbeit weiter~

<a id="org1f09dca"></a>

#### Welche Gedanken hatte ich:

- Wie oben erwähnt, muss ich sorgfältig überlegen, wie ich für KI-Agenten ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Reihe von AGENT.md-Dateien beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist ziemlich hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist ein schwieriges Problem. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um Erinnerungen zu aktualisieren. Das Wichtigste ist immer noch, wie man die Arbeitsergebnisse des KI-Agenten bewertet.

- In Bezug auf den vorherigen Punkt habe ich einen Artikel gelesen, den ich sehr interessant fand. Lassen Sie mich ihn mit meinen eigenen Worten zusammenfassen: Zunächst kann die Bewertung (Eval) einer einzelnen Agentenarbeit in mehrere Kategorien unterteilt werden:
  1.  Statische Tool-Eval: Compiler, Linter, Unit-Tests, E2E-Tests
  2.  Model-Eval: Ein anderes LLM verwendet, um nach unseren definierten Prompts zu urteilen
  3.  Manuelle Eval: Ich beurteile es selbst

  Dann gibt es zwei Arten der systematischen Bewertung eines Agenten-Systems:
  1.  Fähigkeitsbasiert (Capability): Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann niedrig sein, z.B. wenn ich `legion` verwende, um schrittweise größere, schwierigere Aufgaben auszuführen. Fühlt sich an wie die Erkundung einer neuen Grenze.
  2.  Regressionsbasiert (Regression): Kann er die Fähigkeiten, die er früher hatte, weiterhin beibehalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie weiterhin stabil implementiert werden können.

  Wenn also eine neue Fähigkeit eingeführt wird, sollte der Übergang von fähigkeitsbasiert zu regressionsbasiert erfolgen.

  Der Artikel erwähnt auch zwei sehr wichtige Metriken: `pass@K` und `pass^K`
  - pass@k: Mindestens ein Erfolg bei k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit, mindestens eine brauchbare Lösung zu finden. Anwendbar: Szenarien, in denen es nur darum geht, "mindestens eine brauchbare Lösung zu finden".
  - pass^k: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Szenarien, in denen der Nutzer jedes Mal zuverlässige Ergebnisse vom Agenten erwartet.

  FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Die Energie ist immer noch etwas gering. Nachmittags etwas gearbeitet, abends gekocht, und schon fühle ich mich etwas müde. Wann werde ich wie CZ sein und nicht schlafen müssen?

<a id="org8a10f91"></a>

#### Was plane ich für morgen?

1.  Über dieses Eval-Agenten-Modell nachdenken und das Multi-Agenten-System weiter iterieren.
2.  Clustersicherheitsproblem, muss erledigt werden.
3.  `legion-github-bridge`

<a id="org1d94cd3"></a>

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass Ji Ge zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig verdrängten und so große Probleme verursachten.

<a id="org1ca275c"></a>

#### Was habe ich heute gemacht:

1.  Versucht, den Cluster hinter einen NAT zu migrieren, natürlich mit Hilfe des brandneuen `legion`. Meine Vorgehensweise war:
    - Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT für den ausgehenden Traffic erstellt.

      Ursprünglich geplant, mit 10.0 beginnende Netzwerke zu verwenden, aber nach dem Versuch stellte sich heraus, dass AWS die Erstellung solcher CIDRs nicht erlaubt. Also auf 172.21 umgestellt. Dabei gab es eine Falle: In der Cluster-Ressource muss der ursprüngliche Loadbalancer auf das entsprechende VPC zeigen (ursprünglich implizit standardmäßig zugewiesen, jetzt mit einem zusätzlichen CIDR muss es manuell angegeben werden).

    - Dann eine neue Instance Group (IG) erstellt, die auf das neue VPC zeigt. Dabei gab es einen kleinen Zwischenfall: Die neue IG hatte keine S3-Berechtigungen, aus unerfindlichen Gründen. Nach manueller Hinzufügung traten die Nodes normal dem Cluster bei.
    - Nächster Schritt: Dienste manuell in die neue IG migrieren.
    - Schließlich die alte IG herunterfahren.

    Nachdem alles erledigt war, stellte ich fest, dass der ausgehende Cluster-Traffic nur noch eine einzige IP hatte, was unsere Dienste mit IP-Ratelimiting etwas zum Erliegen brachte. Leider musste ich einen Rollback durchführen. Ich muss zuerst den HTTP-Proxy-Skillpunkt setzen, bevor ich den nächsten Schritt gehen kann.

2.  Das Multi-Agenten-System wurde praktisch eingesetzt, um ein Skript zur automatischen Aktualisierung des Midas-Nettovermögens zu erstellen. Deepseek hat lange daran gearbeitet, und ich war eigentlich ganz zufrieden. Das Kernproblem hier ist: Wenn ich einen Fehler im frühen Design nicht entdecke, erwartet mich eine riesige Verschwendung von Tokens und Zeit, denn ich habe festgestellt, dass Agenten nicht besonders schnell arbeiten.

    Derzeit sind diese Coding-Agenten noch recht primitiv. Sie brechen oft aufgrund von Netzwerkproblemen o.ä. ab oder stürzen ab. Sie für ernsthafte, lang laufende Arbeiten einzusetzen, ist noch etwas schwierig, ihre SLI (Service Level Indicator) ist noch nicht gut genug. Das ist vielleicht auch eine Chance. Auf den ersten Blick erfordert dies Wissen aus den Bereichen Software Engineering, Hochverfügbarkeit usw., um zu funktionieren.

<a id="org48ae323"></a>

#### Welche Gedanken hatte ich:

Heute hatte ich weniger Gedanken, sie sind oben im Text eingeflossen.

<a id="org7111e30"></a>

#### Was plane ich für morgen?

1.  Den HTTP-Proxy-Mechanismus für `Yuan` entwerfen.
2.  Nach dem Live-Gang den Cluster erneut migrieren.

<a id="org43faf05"></a>

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach dem 25. Lebensjahr im Umgang mit Emotionen einen deutlichen Fortschritt gemacht habe: Neben den Emotionen gibt es deutlich einen Hauch von Vernunft, der als Copilot fungiert. Dieser Hauch von Vernunft setzt in dem gewaltigen Reaktor der Emotionen eine Steuerstange. Ohne diese Steuerstange würden die Emotionen außer Kontrolle geraten, eine sich selbst verstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieser Steuerstange beginne ich zu verstehen, was man sagen kann und was nicht, was man tun kann und was nicht, welche Entscheidungen man treffen kann und welche nicht. Das ist eine erfreuliche Veränderung, die in mir stattgefunden hat.

<a id="org8efa648"></a>

#### Was habe ich heute gemacht:

1.  Heute habe ich mit `legion` das Design und die Implementierung des HTTP-Proxys für `yuan` durchgeführt. Ich finde, es lief ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie man einen verfügbaren Terminal auswählt) modifiziert und dann den Agenten freie Hand gegeben. Das Ergebnis war ziemlich gut.
2.  Ich habe auch mit `legion` eine automatische Aktualisierung für `midas` durchgeführt. Aber die KI hat durchgehend schlechte Arbeit geleistet, hat meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (Deepseek scheint doch nicht so clever zu sein); das Review war nicht streng genug; oder die Dokumentations-Wissensdatenbank ist nicht streng genug.
3.  Verdammt, nachts wurde ich von einem Alarm geweckt. Ein Host war aus unerklärlichen Gründen abgestürzt. Es sieht so aus, als ob ein CPU-Spitzenwert den Host in einen Zustand versetzt hat, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein Haufen. Mein Urteil: Der Alarm ist nützlich, die Logs sind Mist. Notiert!

<a id="orga5425d1"></a>

#### Welche Gedanken hatte ich:

1.  Beim Duschen habe ich über die kritischsten Punkte der derzeitigen Zusammenarbeit mit der KI nachgedacht. Einer ist die Serviceverfügbarkeit des KI-Agenten selbst – dass er nicht mitten in der Arbeit abstürzt oder sich beendet. Übrigens, `ralph loop` erhöht die Verfügbarkeit im Grunde auch durch grobes ständiges Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst die Berichterstattung eines Untergebenen an einen Vorgesetzten erfordert ein PPT oder einfach einen professionellen mittleren Manager, der als "teurer Sprachrohr" fungiert. Wie kann sich die Berichterstattung der KI an den Menschen auf flaches Markdown und Code beschränken? Könnte der Report der KI jeden Punkt mit einem Artefakt verlinken? Könnte es einen "Citation Agent" geben, der speziell für diesen Teil zuständig ist?

    Allerdings ist meine derzeitige Nutzung der KI noch recht eingeschränkt, hauptsächlich auf Codierungsaufgaben konzentriert.

2.  Ich habe genau darüber nachgedacht, warum mein Multi-Agenten-System, nachdem ich es bereits eingerichtet hatte, stabil in Richtung eines Absturzes steuerte. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
    1.  Das intellektuelle Niveau der KI selbst
    2.  Das menschliche Review war nicht streng genug
    3.  Die Wissensdatenbank war nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen

    Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss man nicht weiter bedenken. Sich in Richtung 2 anzustrengen, würde tatsächlich auf ein immer detaillierteres RFC-Dokument setzen, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Art der Entwicklung ist, als wären wir zum **Wasserfall**-Entwicklungsmodell zurückgekehrt, Arbeit über einen linearen Prozess zu erledigen:

        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests

    Die Gründe dafür liegen auf zwei Ebenen: der technischen Ebene und der Ebene der Organisation und Prozesse, wobei die organisatorisch-prozessuale Ebene der *Hauptfaktor* ist.

    Auf der technischen Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf Schnittstellen vom Backend warten, um mit der Entwicklung zu beginnen; das Backend muss auf das vom Produkt geschriebene CRD warten, um zu starten.

    Als menschliche Organisation hat das Wasserfallmodell Probleme wie: Ineffizienz, schwer erkennbare Qualitätsrisiken, geringe Flexibilität, Teamkonflikte. In der Zusammenarbeit zwischen mir und der KI existieren Effizienz und Teamkonflikte von Natur aus nicht in der Welt der KI. Es ist, als ob die KI und ich in zwei verschiedenen Zeitdimensionen leben. Mein Tag ist für die KI wie ein Jahr. Nun, Ineffizienz könnte ein paar Tokens mehr kosten, aber das ist derzeit nicht mein Hauptproblem. Was ich tatsächlich erlebe, sind Qualitätsrisiken aufgrund von Missverständnissen bei Anforderungen oder Fakten, und die Flexibilität ist gering.

    Ich muss einen Weg finden, der die Fähigkeiten der KI maximal nutzt und mich gleichzeitig maximal befreit. Nach den Erfahrungen der menschlichen Organisation muss ich zu einem höheren Knoten im Befehlsbaum werden, der Dinge mit gutem Gewissen an die KI delegieren kann, ohne dass sie von der Spur abkommt.

    Die beiden entscheidenden Punkte sind:
    1.  Absichtsausrichtung (Intent Alignment)
    2.  Schichtweise Validierung (Layered Verification)

    Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um ein Gefühl dafür zu bekommen.

3.  Ich muss mich vor der schlechten Seite meines aktuellen Zustands hüten, in dem ich mit dem Hammer nach Nägeln suche: Pfadabhängigkeit, Output größer als Verständnis.

<a id="orge845cbe"></a>

#### Was plane ich für morgen?

Morgen kommt ZL. Geplant ist: etwas Sport, essen gehen, Brettspiele spielen.

<a id="org3411989"></a>

### 2026-01-27

ZL ist da, die Informationsmenge ist groß, ich muss sie erst verdauen. Brettspiele gespielt, "Tragic Looper". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen. Erst im letzten Szenario, in dem ich den bösen Dramatiker spielte, spürte ich den Sweet Spot des Spiels und beendete das Spiel mit meinem vollständigen Sieg.
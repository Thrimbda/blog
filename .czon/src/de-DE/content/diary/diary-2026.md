---
"title": "Arbeitsjournal 2026: KI-Agenten-Kollaboration und Systementwicklungspraxis"
"summary": "Dieser Artikel ist das Arbeitsjournal für Januar 2026. Der Autor dokumentiert detailliert die täglichen Arbeitsinhalte, Gedanken und Pläne. Der Kern dreht sich darum, wie KI-Agenten (insbesondere Multi-Agenten-Systeme) genutzt werden können, um die persönliche Arbeitseffizienz und die Autonomiefähigkeit von Systemen zu steigern. Das Journal behandelt mehrere technische Praktiken, wie die Refaktorisierung von opencode-feishu-notifier, die Entwicklung von legionmind-github-bridge, das Design von Multi-Agenten-Templates, die Handhabung von Cluster-Sicherheitsmigrationen (z.B. NAT-Konfiguration) und die Implementierung des HTTP-Proxy-Mechanismus für Yuan. Der Autor reflektiert über Schlüsselfragen der KI-Kollaboration, einschließlich Intent Alignment, geschichteter Validierung, Wissensdatenbank-Aufbau und Agenten-Evaluierungsmethoden, und diskutiert die Anwendbarkeit des Wasserfall-Entwicklungsmodells in der KI-Kollaboration. Das Journal enthält auch persönliche Lebensereignisse (wie Besuche von Freunden, Gesundheitsmanagement) und Gedanken zum Emotionsmanagement."
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

1.  [2026](#org5ee6b7c)
    1.  [2026-01 Januar](#org45f3c96)
        1.  [2026-01-22](#org3212356)
            1.  [Was habe ich heute gemacht:](#orgedcd975)
            2.  [Welche Gedanken habe ich:](#orgd861555)
            3.  [Was plane ich für morgen?](#org6508baf)
        2.  [2026-01-23](#orge794f8c)
            1.  [Was habe ich heute gemacht:](#org983b200)
            2.  [Welche Gedanken habe ich:](#org745e411)
            3.  [Was plane ich für morgen?](#orgd141df3)
        3.  [2026-01-24](#org9073c8a)
            1.  [Was habe ich heute gemacht:](#org1a919b7)
            2.  [Welche Gedanken habe ich:](#orga4c58b1)
            3.  [Was plane ich für morgen?](#org40d8af6)
        4.  [2026-01-25](#org8472491)
            1.  [Was habe ich heute gemacht:](#orge1fb7a5)
            2.  [Welche Gedanken habe ich:](#orgae54535)
            3.  [Was plane ich für morgen?](#orgd08b296)
        5.  [2026-01-26](#org59008a3)
            1.  [Was habe ich heute gemacht:](#org0ff4e76)
            2.  [Welche Gedanken habe ich:](#org6827fba)
            3.  [Was plane ich für morgen?](#org884441d)
        6.  [2026-01-27](#orge656d95)
        7.  [2026-01-31](#orgef7cc98)
            1.  [Was habe ich heute gemacht:](#org1c7254e)
            2.  [Welche Gedanken habe ich](#orgb6eb713)
            3.  [Was plane ich für morgen](#org896307c)
        8.  [2026-02-01](#org71706c0)
        9.  [2026-02-02](#org28106d7)
            1.  [Was plane ich für morgen?](#orgf8b0675)

<a id="org5ee6b7c"></a>

# 2026

<a id="org45f3c96"></a>

## 2026-01 Januar

<a id="org3212356"></a>

### 2026-01-22

<a id="orgedcd975"></a>

#### Was habe ich heute gemacht:

1.  Ich habe `opencode-feishu-notifier` refaktorisiert. Es sendet jetzt Benachrichtigungen an Benutzer auf eine festgelegte Weise.
2.  Ich habe die KI weiterhin `legionmind-github-bridge` schreiben lassen. Ich habe begonnen, den Multi-Agenten-Modus von opencode zu verwenden. Es startete 5 Agenten, um 5 Probleme zu bearbeiten. Es lief zwei Stunden lang und verbrauchte dabei meine gesamten 5 Stunden Codex-Tokens.
3.  Heute ist ein Node im sg-Cluster ausgefallen. Ich habe mir die Logs angesehen und es stellte sich heraus, dass er durch wiederholte SSH-Angriffsversuche angegriffen wurde. Das ist nicht gut. Nach einer kurzen Prüfung gibt es mehrere mögliche Maßnahmen:
    - Passwortauthentifizierung deaktivieren
    - Den SSHd-Kanal für das gesamte Netzwerk deaktivieren
    - Den Cluster hinter einen NAT verschieben
4.  Ich habe einige Nebensächlichkeiten erledigt. Zl kommt nächste Woche nach Suzhou. Ich habe etwas Zeit für die Planung aufgewendet, aber es lief nicht reibungslos. Ich plane nicht, weitere Energie darauf zu verwenden.

<a id="orgd861555"></a>

#### Welche Gedanken habe ich:

In dieser Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, tägliche Planung, Denken und Output. Über diesen Rahmen hinaus komme ich mit der Koordination nicht mehr nach und werde leicht müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agenten zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:

- Für Codierungsaufgaben sollte ich den Autonomiegrad der Agenten so weit wie möglich erhöhen. Es gibt mehrere Optimierungsziele:
  1.  Sie sollten mich so wenig wie möglich stören.
  2.  Sie sollten so viel wie möglich arbeiten.
  3.  Die Zuverlässigkeit ihrer Arbeit sollte so weit wie möglich gesteigert werden.
- Auch ich selbst muss mich verbessern:
  1.  Ich muss meine mentale Energie besser managen, um nicht zu schnell erschöpft zu sein.
  2.  Ich muss meine Fähigkeit verbessern, in mehreren verschiedenen Kontexten gleichzeitig zu arbeiten, ohne Dinge zu vergessen oder zu verlieren, und ich muss den Fortschritt managen.

Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:

1.  Für Legionmind ein Multi-Agenten-Template entwerfen und es mit opencode an einer Codierungsaufgabe für Yuan testen.
2.  Mit dem Führen des Arbeitsjournals fortfahren und eine Methode für das Management mentaler Energie und von Kontexten erkunden.

<a id="org6508baf"></a>

#### Was plane ich für morgen?

1.  Wie oben erwähnt, ein Experiment mit Multi-Agenten durchführen.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

---

Zusammenfassend ist meine Hauptaufgabe derzeit, mich selbst mit KI zu skalieren und dann zu versuchen, andere zu skalieren.

<a id="orge794f8c"></a>

### 2026-01-23

Ich habe heute eine leichte Erkältung, etwas Kopfschmerzen und eine geringe Produktivität. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.

<a id="org983b200"></a>

#### Was habe ich heute gemacht:

1.  Mit Hilfe der KI ein Multi-Agenten-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
2.  `legionmind-github-bridge` ist wieder einen Schritt vorangekommen.
3.  Das Preemption-Design und die Implementierung von `node-unit` leicht modifiziert. Früher wurden alle Deployments unter einer `node-unit` gelöscht, wenn diese fehlschlug. Jetzt wird nur noch eins nach dem anderen bereinigt.
4.  Die Prüfung für die Futures-Broker-Kontoeröffnung (CFFEX) abgelegt. Es war überraschend, dass die Kamera die ganze Zeit an sein musste, das Fenster nicht minimiert und der Bildschirm nicht gewechselt werden durfte. Zum Glück gab es unbegrenzte Versuche – das konnte mich nicht aufhalten. Mit 95 Punkten hochoffiziell bestanden.

<a id="org745e411"></a>

#### Welche Gedanken habe ich:

Mein Ziel ist es, Agenten-Autonomie mit möglichst geringem Aufwand zu erreichen. Mein aktueller Workflow sieht so aus:

1.  Legionmind als SOP (Standard Operating Procedure) für Entwicklungsarbeit. Es ist eine Agenten-Fähigkeit (Agent Skill). Ich mag Agent Skills.
2.  Opencode als Entität des Agenten. Ich nutze dessen Fähigkeiten wie Bash / Tool Calling / Langraph / Command / Subagent usw. Wenn ich opencode eines Tages ersetzen müsste, wäre dies meine To-Do-Liste.
3.  Was mir derzeit Kopfschmerzen bereitet, ist, wie Skills und diese Subagenten kombiniert werden sollen.

Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich finde, dass es vielleicht keine gute Methode ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten aufzeichnen und die Gedanken erst am nächsten Morgen beim Aufwachen zusammenfassen.

<a id="orgd141df3"></a>

#### Was plane ich für morgen?

1.  Mit diesem Multi-Agenten-System etwas Sinnvolles tun. Vielleicht das Finanzkonto von Gate anbinden.
2.  Weiter an `legionmind-github-bridge` arbeiten.
3.  Clustersicherheit, falls Zeit bleibt.
4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
5.  Morgen kommen Sy's Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

<a id="org9073c8a"></a>

### 2026-01-24

Heute habe ich mich ausgeschlafen und bin erst um 11 Uhr aufgewacht. Fühle mich leicht und entspannt. Lange nicht mehr so ausgiebig geschlafen.

<a id="org1a919b7"></a>

#### Was habe ich heute gemacht:

1.  Die neue Version von `node-unit` live geschaltet. Der Grund, warum ich mich traue, sie zu deployen, ist, dass ich relativ umfassende End-to-End-Tests habe. Konkret: Docker startet eine TimescaleDB (PostgreSQL 17), dann startet es zwei `node-unit`s und fügt 21 `@yuants/portal` in die Datenbank ein, um zu testen. Am Ende konvergiert es zu einem Zustand, in dem jeder die Hälfte hat.

    Dieser Test kann im Wesentlichen zeigen, dass, wenn eine Reihe herrenloser Deployments auftauchen und zwei `node-unit`s online gehen, man beobachten kann, wie sie abwechselnd Deployments übernehmen. Was wirklich fehlt, ist eine echte CPU-/Arbeitsspeicher-Auslastung und ein Szenario, in dem eine `node-unit` aus irgendeinem Grund offline geht.

2.  Die neue Multi-Agenten-Version von Legionmind in Yuan verwendet, um das Problem der Ausgabe des Kontostroms für das `vendor-gate earn`-Konto zu lösen. Ich ließ den Agenten zuerst Legion für die Dokumentenerstellung verwenden. Insgesamt wurden folgende Dokumente erstellt:

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

    Fühlt sich nach einem anständigen Workflow an. Allerdings gibt es einige Konflikte zwischen meinem neuen Multi-Agenten-System und der ursprünglichen Dokumentenerstellung von Legionmind. Ich sollte die Grenzen der verschiedenen Aufgaben sorgfältig überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument geschrieben werden sollte, in separaten Skills abgelegt werden. Legionmind sollte eine Beschreibung des Arbeitsablaufs sein. Jede Art von Agent sollte in der Lage sein, einige kleinere Skills zu laden, um sie bei ihrer Arbeit zu unterstützen.

    Ein weiteres Problem war, dass es bei der ersten Ausführung einen Fehler machte und den Kontostrom in `account-actions-with-credential.ts` ausgab. Das liegt daran, dass ich verlangt habe, dass es sich an `vendor-okx` orientiert, um den Earn-Konto-Zugang zu implementieren. Der Grund für diese Anforderung war, dass derzeit nur das OKX-Earn-Konto ebenfalls als Account integriert ist. Aber die KI hat einige veraltete Praktiken daraus übernommen. Der aktuelle Standard für den Börsenzugang ist, alle Konten über `provideExchangeServices` bereitzustellen, anstatt `provideAccountActionsWithCredential` für den Konto-Zugang zu verwenden.

    Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie sollte dieses Wissen modelliert werden? Wie kann ich dem KI-Agenten einen solchen Projektkontext als externes Gehirn zur Verfügung stellen? Das ist eine Frage, die es wert ist, tiefgründig überdacht zu werden. Morgen muss ich mich damit genauer befassen.

3.  Nachmittags für Sy's Freunde gekocht. Das hat mich ganz schön erschöpft. Also werde ich morgen einfach weiterarbeiten.

<a id="orga4c58b1"></a>

#### Welche Gedanken habe ich:

- Wie oben erwähnt, muss ich sorgfältig überlegen, wie ich ein externes Gehirn für KI-Agenten kompakt gestalten kann. Am einfachsten könnte man mit einer Reihe von AGENT.md-Dateien beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist recht hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist ein schwieriges Problem. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um Erinnerungen zu aktualisieren. Das Wichtigste ist, wie man die Ergebnisse der Arbeit des KI-Agenten bewertet.

- In Bezug auf den vorherigen Punkt habe ich einen Artikel gesehen, den ich sehr interessant fand. Lassen Sie mich ihn in meinen eigenen Worten zusammenfassen: Zunächst kann die Bewertung (Evaluation) der Arbeit eines Agenten in einem Schritt in mehrere Kategorien unterteilt werden:
  1.  Statische Tool-Evaluation: Compiler, Linter, Unit-Tests, E2E-Tests
  2.  Model-Evaluation: Verwendung eines anderen LLM, um gemäß unserem definierten Prompt zu urteilen
  3.  Manuelle Evaluation: Ich beurteile es.

  Dann gibt es zwei Arten der systematischen Evaluation eines Agenten-Systems:
  1.  Fähigkeitsbasiert: Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann niedrig sein, z.B. wenn ich Legion verwende, um schrittweise größere, schwierigere Aufgaben auszuführen. Fühlt sich an wie die Erkundung einer neuen Grenze.
  2.  Regressionsbasiert: Kann er die Fähigkeiten, die er früher hatte, weiterhin beibehalten? Z.B. wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie weiterhin stabil implementiert werden können.

  Wenn eine neue Fähigkeit eingeführt wird, sollte sie von fähigkeitsbasiert zu regressionsbasiert übergehen.

  Der Artikel erwähnt auch zwei sehr wichtige Metriken: `pass@K` und `pass^K`.
  - `pass@k`: Mindestens ein Erfolg in k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit, mindestens einen Erfolg zu haben. Anwendbar: Wenn es Ihnen nur darum geht, "mindestens eine brauchbare Lösung zu finden".
  - `pass^k`: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Benutzer jedes Mal zuverlässige Agenten erwartet.

  FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Meine Energie ist immer noch etwas gering. Nachmittags habe ich eine Weile gearbeitet, abends gekocht und fühlte mich dann etwas müde. Wann werde ich wie CZ sein und nicht schlafen müssen?

<a id="org40d8af6"></a>

#### Was plane ich für morgen?

1.  Über dieses Evaluations-Agenten-Modell nachdenken und das Multi-Agenten-System weiter iterieren.
2.  Das Clustersicherheitsproblem muss angegangen werden.
3.  `legion-github-bridge`.

<a id="org8472491"></a>

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass Jige zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig verdrängten und große Probleme verursachten.

<a id="orge1fb7a5"></a>

#### Was habe ich heute gemacht:

1.  Versucht, den Cluster hinter einen NAT zu migrieren, natürlich mit Hilfe des brandneuen Legion. Meine Vorgehensweise war:
    - Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, verwendete die Netzwerke 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT für den ausgehenden Traffic erstellt.

      Ursprünglich wollte ich ein Netzwerksegment mit 10.0 verwenden, aber nach dem Versuch stellte sich heraus, dass AWS die Erstellung solcher CIDRs nicht erlaubt. Also wechselte ich zu 172.21. Hier gab es eine Falle: In der Cluster-Ressource muss der ursprüngliche Loadbalancer auf das entsprechende VPC zeigen (ursprünglich implizit standardmäßig zugewiesen, jetzt mit einem zusätzlichen CIDR muss es manuell zugewiesen werden).

    - Dann eine neue Instance Group (IG) erstellt, die auf das neue VPC zeigt. Dabei gab es einen kleinen Zwischenfall: Die neue IG hatte keine S3-Berechtigungen, aus unerfindlichen Gründen. Nach manueller Hinzufügung traten die Nodes dem Cluster normal bei.
    - Nächster Schritt: Dienste manuell in die neue IG migrieren.
    - Schließlich die ursprüngliche IG herunterfahren.

    Nachdem alles erledigt war, stellte ich fest, dass der ausgehende Cluster-Traffic nur noch eine einzige IP hatte, was unsere Dienste mit IP-Ratelimiting etwas zum Absturz brachte. Leider musste ich einen Rollback durchführen. Ich muss zuerst den HTTP-Proxy-Skillpunkt setzen, bevor ich den nächsten Schritt machen kann.

2.  Das Multi-Agenten-System wurde praktisch eingesetzt, um ein Skript zur automatischen Aktualisierung der Midas-Nettowerte zu erstellen. Deepseek hat lange daran gearbeitet, und ich war ziemlich zufrieden. Ein Kernproblem dabei ist: Wenn ich einen Fehler im frühen Design nicht bemerke, erwartet mich eine riesige Verschwendung von Tokens und Zeit, denn ich habe festgestellt, dass Agenten nicht besonders schnell arbeiten.

    Derzeit sind diese Coding-Agenten noch ziemlich primitiv. Sie brechen oft aufgrund von Netzwerkproblemen ab oder stürzen ab. Sie für ernsthafte, lang laufende Arbeiten einzusetzen, ist noch etwas schwierig, ihre Service Level Indicators (SLIs) sind noch nicht gut genug. Das könnte auch eine Chance sein. Auf den ersten Blick erfordert dies Wissen über Software Engineering und Hochverfügbarkeit, um zu funktionieren.

<a id="orgae54535"></a>

#### Welche Gedanken habe ich:

Heute hatte ich weniger Gedanken, sie sind bereits in die obigen Abschnitte eingeflossen.

<a id="orgd08b296"></a>

#### Was plane ich für morgen?

1.  Den HTTP-Proxy-Mechanismus für Yuan entwerfen.
2.  Nach dem Live-Gang den Cluster erneut migrieren.

<a id="org59008a3"></a>

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach dem 25. Lebensjahr im Umgang mit Emotionen einen deutlichen Fortschritt gemacht habe: Neben den Emotionen gibt es deutlich einen Hauch von Vernunft, der als Copilot fungiert. Dieser Hauch von Vernunft setzt eine Art "Kadmium-Stab" in den gewaltigen Reaktor der Emotionen. Ohne diesen Stab würden die Emotionen außer Kontrolle geraten, eine sich selbst verstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieses Stabs beginne ich zu verstehen, was gesagt werden kann und was nicht, was getan werden kann und was nicht, welche Entscheidungen getroffen werden können und welche nicht. Das ist eine erfreuliche Veränderung, die in mir stattgefunden hat.

<a id="org0ff4e76"></a>

#### Was habe ich heute gemacht:

1.  Heute habe ich mit Legion das Design und die Implementierung des HTTP-Proxys für Yuan durchgeführt. Ich finde, es lief ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie man einen verfügbaren Terminal auswählt) modifiziert und dann den Agenten freie Hand gelassen. Das Ergebnis war ziemlich gut.
2.  Ich habe auch mit Legion eine automatische Aktualisierung für Midas durchgeführt. Aber die KI hat durchweg schlechte Arbeit geleistet, hat meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (Deepseek scheint immer noch nicht sehr klug zu sein); das Review war nicht streng genug; oder die Dokumentations-Wissensdatenbank ist nicht streng genug.
3.  Verdammt, nachts wurde ich von einem Alarm geweckt. Ein Host war aus unerklärlichen Gründen abgestürzt. Es sah aus wie ein CPU-Spike, der den Host in einen Zustand brachte, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein Haufen Mist. Mein Urteil: Der Alarm ist nützlich, die Logs sind Schrott. Notiz gemacht!

<a id="org6827fba"></a>

#### Welche Gedanken habe ich:

1.  Beim Duschen habe ich über die kritischsten Punkte der aktuellen Zusammenarbeit mit der KI nachgedacht. Einer ist die Serviceverfügbarkeit des KI-Agenten selbst – dass er nicht mitten in der Arbeit abstürzt oder sich beendet. Übrigens, Ralph Loop erhöht die Verfügbarkeit im Wesentlichen auch durch grobes ständiges Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst wenn Untergebene ihrem Vorgesetzten berichten, benötigen sie eine PowerPoint-Präsentation oder einfach einen professionellen mittleren Manager, der diese "teure Übermittlung" übernimmt. Wie kann sich die Berichterstattung der KI an den Menschen auf flaches Markdown und Code beschränken? Könnte der Bericht der KI jedes Mal mit einem Artefakt verlinkt sein? Könnte es einen "Citation Agent" geben, der speziell für diesen Teil verantwortlich ist?

    Allerdings ist meine derzeitige Verwendung der KI ziemlich eingeschränkt, nur auf Codierungsaufgaben konzentriert.

2.  Ich habe genau darüber nachgedacht, warum mein Multi-Agenten-System, nachdem ich es bereits eingerichtet hatte, stabil in Richtung eines Scheiterns steuert. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
    1.  Das eigene Intelligenzniveau der KI.
    2.  Das menschliche Review war nicht streng genug.
    3.  Die Wissensdatenbank war nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.

    Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss überhaupt nicht bedacht werden. Sich in Richtung 2 anzustrengen, würde tatsächlich auf ein immer detaillierteres RFC-Dokument angewiesen sein, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Art der Entwicklung ist, als wären wir zum **Wasserfall**-Entwicklungsmodell zurückgekehrt, Arbeit über einen linearen Prozess zu erledigen:

        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests

    Die Gründe dafür gibt es auf zwei Ebenen: die technische Ebene und die Ebene der Organisation und Prozesse, wobei die organisatorische und prozessuale Ebene der *Hauptfaktor* ist.

    Auf technischer Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf die vom Backend bereitgestellten Schnittstellen warten, um mit der Entwicklung zu beginnen; das Backend muss warten, bis das Produkt-CRD geschrieben ist, um zu beginnen.

    Als menschliche Organisation hat das Wasserfallmodell Probleme wie: Ineffizienz, Qualitätsrisiken, die schwer aufzudecken sind, geringe Flexibilität und Teamkonflikte. Als Zusammenarbeitsweise zwischen mir und der KI existieren Effizienz und Teamkonflikte von Natur aus nicht in der Welt der KI. Es ist, als ob die KI und ich in zwei verschiedenen Zeitdimensionen leben. Ein Tag für mich ist für die KI wie ein Jahr. Nun, Ineffizienz könnte einige zusätzliche Token kosten, aber das ist derzeit nicht mein Hauptanliegen. Mein tatsächliches Problem sind Qualitätsrisiken aufgrund von Missverständnissen bei Anforderungen oder Fakten, und die Flexibilität ist ebenfalls gering.

    Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich gleichzeitig maximal zu befreien. Nach der Erfahrung der menschlichen Organisation muss ich ein Knoten auf einer höheren Ebene im Kommandobaum werden, der Dinge der KI anvertrauen kann, während er sie auf Kurs hält.

    Die beiden entscheidendsten Punkte sind:
    1.  Intent Alignment (Absichtsausrichtung)
    2.  Geschichtete Validierung (Layered Validation)

    Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um es zu verstehen.

3.  Ich muss mich vor der schlechten Seite meines Zustands hüten, in dem ich mit einem Hammer nach Nägeln suche: Pfadabhängigkeit, Output über Verständnis.

<a id="org884441d"></a>

#### Was plane ich für morgen?

Morgen kommt Zl. Geplant ist Training, Essen und Brettspiele.

<a id="orge656d95"></a>

### 2026-01-27

Zl ist da, die Informationsmenge ist groß, ich muss sie erst verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen. Erst im letzten Szenario, in dem ich den bösen Dramatiker spielte, spürte ich den Sweet Spot des Spiels und beendete das Spiel mit meinem vollständigen Sieg.

<a id="orgef7cc98"></a>

### 2026-01-31

Die letzten Tage waren ziemlich voll, daher habe ich nichts aufgezeichnet. Aber das Aufzeichnen einzustellen, geht nicht. Also fange ich jetzt wieder an und erfasse alles zusammen.

Abgesehen von der vielen Arbeit, warum habe ich nicht aufgezeichnet?

1.  Weil ich Angst hatte, dass das Aufzeichnen bedeutet, sich hinzusetzen und speziell 30 Minuten oder mehr zu investieren, um einen Tag aufzuzeichnen. Das liegt tatsächlich an einer gewissen Angst und Belastung durch das Führen eines Tagebuchs, was nicht akzeptabel ist.
2.  Normalerweise möchte ich nur am Ende eines Tages mit der Aufzeichnung des Tages beginnen. Aber wenn ich genau darüber nachdenke, ist das etwas unmenschlich, denn ich gehe jetzt meistens ins Bett, sobald es Zeit ist zu schlafen, und nicht, weil alles, was ich tun wollte, wirklich erledigt ist (gibt es so einen Moment überhaupt?). Das führt dazu, dass ich, wenn ich Zeit habe, nicht aufzeichne, und wenn ich wirklich aufzeichnen sollte, schnell ins Bett muss, plus das Problem aus Punkt 1.

Beides zusammen führt zu einer Anhäufung.

<a id="org1c7254e"></a>

#### Was habe ich heute gemacht:

> Korrektur: Was habe ich in den letzten Tagen gemacht?

1.  Auf Anraten von Sc begonnen, Neovim zu verwenden. Warum? Ich habe gesehen, dass `nvim-orgmode` anscheinend wirklich zu einem brauchbaren Org-Mode geworden ist. Gleichzeitig begann ich, mich von Emacs zu langweilen:
    - Endlose Update-Fehler
    - Verwirrendes Debugging und Fehlermeldungen
    - Für mich zusätzliche Belastung, aber nutzlose Flexibilität
    - Ich verstehe Emacs-Lisp nicht und will es auch nicht verstehen

    Jahrelang habe ich das oben Genannte ertragen, um Org-Mode zu nutzen, aber nirgendwo sonst konnte ich Org-Mode gut nutzen. Jetzt scheint das Nvim-Lager eine brauchbare Alternative zu haben, warum es nicht versuchen?

    Da ich seit Jahren Vim-Benutzer bin und auch in Emacs evil-mode (vim-mode) verwendet habe, habe ich nie das Gefühl, dass die Verwendung von Vim eine große Belastung für mich darstellt. In VSCode und IDEA kann ich ohne Vim nicht überleben, daher ist die direkte Verwendung von Nvim für mich überhaupt kein Problem.

    Da das Hindernis weg ist, habe ich mir das Nvim-Ökosystem angesehen. Nvim hat, weil es kein Vimscript-Erbe hat, direkt Lua als Konfigurations- und Plugin-Sprache verwendet. Es kann also leicht starten, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von Neovim jetzt auch von einem System namens `lazy.vim` vereinheitlicht wird. Das Design von Nvim für sein Plugin- und Konfigurationssystem sollte organisiert und geplant sein und speziell die Schmerzpunkte des ursprünglichen Vim mutig erneuert haben. In Vim & Emacs gibt es wahrscheinlich unzählige ähnliche Versuche, die Welt zu vereinen, aber weil die Community zu fragmentiert ist, sollte keiner wirklich erfolgreich gewesen sein.

    Also habe ich lazyVim direkt ausprobiert. Wow, jetzt habe ich das Gefühl, direkt einen VSCode zu haben, und dieser VSCode kann im Terminal laufen. Wissen Sie, wie cool das ist?

    Jetzt habe ich einen mächtigen alten Herrscher auf einer brandneuen Infrastruktur, und seine Konfiguration ist extrem einfach, Flexibilität und Bequemlichkeit sind genau richtig konvergiert, meine alten Schmerzpunkte sind im Wesentlichen alle gelöst.

    Ich habe fast keine Zeit gebraucht, um bereits viele Workflows darauf umzustellen. Ich verwende jetzt tmux, öffne 5 Fenster, und in jedem Fenster öffne ich nvim in einem Ordner. In nvim ist links die Verzeichnisstruktur, in der Mitte der Code, rechts opencode und das Terminal.

2.  Eine Version von Legion aktualisiert. Ich habe den Textumfang des Legionmind-Skills erheblich reduziert (von 4k Zeilen). Derzeit habe ich das Gefühl, dass ich mich um weniger kümmern muss, aber ich weiß nicht, ob es daran liegt, dass ich in letzter Zeit intelligentere Modelle verwendet habe oder weil diese Version von Legionmind wirklich klüger geworden ist.

3.  Ein OpenClaw eingerichtet. Minimax 2.1 ist immer noch etwas dumm, aber als persönlicher Assistent finde ich OpenClaw ziemlich gut, denn es ist im Wesentlichen ein ChatGPT mit Gedächtnis + Hände und Füße (kann meinen Computer bedienen).

4.  Yuan die HTTP-Proxy-Funktionalität hinzugefügt, Metriken usw. hinzugefügt.

<a id="orgb6eb713"></a>

#### Welche Gedanken habe ich

Manchmal habe ich das Gefühl, dass das Schreiben von Dingen mit KI ein bisschen wie das Debuggen von Code ist, dessen Prinzipien man nicht ganz versteht – durch ständiges Testen seines Verhaltens oder das Ausgeben von Logs, um beim Debuggen zu helfen, hier ein bisschen ändern, dort ein bisschen hinzufügen, bis man schließlich ein zufriedenstellendes Ergebnis erhält. Lassen Sie uns der Herkunft dieses Gefühls nachgehen:

Wenn man KI zum Schreiben von Code verwendet, ist der Prozess im Wesentlichen, dass der Mensch einen Prompt eingibt, der einige spezifische Anweisungen enthält, und dann hofft, dass die KI die impliziten Anweisungen und Informationen hinter diesen Anweisungen versteht und die Arbeit korrekt erledigt.

Die Anweisungen, die man der KI vermitteln möchte, können geschichtet werden: Die oberste Ebene ist die Anweisung für die aktuelle Aufgabe. Darunter stehen einige getroffene technische Entscheidungen für dieses Softwareprojekt, Best Practices, die nach Abwägung von Vor- und Nachteilen für einen lokalen Teil des Projekts zusammengefasst wurden. Die nächste Ebene sind Hintergrundinformationen zur Problemdomäne, die das Projekt lösen soll. Die nächste Ebene ist das eigene Fachwissen des Softwareingenieurs, der die KI verwendet, seine persönlichen Vorlieben, technischen Präferenzen, Stilpräferenzen, historischen Erfahrungen und die Ansammlung seiner Denkweise. Die unterste Ebene ist das Hintergrundwissen dieser Welt.

In einem Dialog mit der KI kann der KI klar und deutlich vermittelt werden, eigentlich nur die Anweisung für die aktuelle Aufgabe. Dann hofft man, dass die KI über ausreichend Hintergrundwissen über die Welt und die zur Problemlösung benötigten Hintergrundinformationen verfügt.

Daher kann man schluss
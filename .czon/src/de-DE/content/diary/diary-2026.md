---
title: 2026 Arbeitsprotokoll
date: 2026-01-01
---

# 2026

## 2026-01 Januar

### 2026-01-22

1.  Was habe ich heute gemacht:
    1.  Den `opencode-feishu-notifier` refaktorisiert. Er sendet Benachrichtigungen nun nach einem festgelegten Schema an die Nutzer.
    2.  Weiterhin von KI den `legionmind-github-bridge` schreiben lassen. Ich habe den Multi-Agent-Modus von `opencode` gestartet. Es wurden 5 Agents gestartet, um 5 Issues zu bearbeiten. Das Ganze lief 2 Stunden lang und hat mein gesamtes 5-Stunden-Budget an Codex-Tokens aufgebraucht.
    3.  Heute ist ein Node im `sg`-Cluster ausgefallen. Ich habe die Logs überprüft und festgestellt, dass es durch ständige SSH-Angriffsversuche verursacht wurde. Das ist nicht gut. Nach kurzer Überlegung gibt es mehrere mögliche Maßnahmen:
        - Passwortauthentifizierung deaktivieren
        - Den SSH-Zugang für das gesamte Internet schließen
        - Den Cluster hinter einen NAT-Router verschieben
    4.  Verschiedene Kleinigkeiten erledigt. `zl` kommt nächste Woche nach Suzhou. Ich habe etwas Zeit für die Planung aufgewendet, aber es lief nicht reibungslos. Ich werde keine weitere Energie mehr darauf verwenden.

2.  Gedanken:

    In meiner derzeitigen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, Alltagsorganisation, Nachdenken und Output. Überschreite ich diese Grenze, komme ich mit der Koordination nicht mehr hinterher und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agents zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:
    - Für Codierungsaufgaben sollte ich den Autonomiegrad der Agents so weit wie möglich erhöhen. Es gibt mehrere Optimierungsziele:
      1.  Sie sollten mich so wenig wie möglich stören.
      2.  Sie sollten so viel wie möglich arbeiten.
      3.  Die Zuverlässigkeit ihrer Arbeit sollte maximiert werden.
    - Auch ich selbst muss mich verbessern:
      1.  Meine mentale Energie besser managen, um nicht so schnell erschöpft zu sein.
      2.  Die Fähigkeit verbessern, in mehreren unterschiedlichen Kontexten gleichzeitig zu arbeiten, ohne Dinge zu vergessen oder zu verlieren, und dabei den Fortschritt im Blick behalten.

    Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:
    1.  Für `legionmind` eine Multi-Agent-Vorlage entwerfen und mit `opencode` an einer Codierungsaufgabe von `yuan` experimentieren.
    2.  Das Arbeitsprotokoll weiterführen und eine Methode für das Management mentaler Energie und Kontexte erarbeiten.

3.  Was plane ich für morgen?
    1.  Wie oben erwähnt, ein Multi-Agent-Experiment durchführen.
    2.  Weiter am `legionmind-github-bridge` arbeiten.
    3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

    —

    Insgesamt ist mein Hauptziel derzeit, mich selbst mit Hilfe von KI zu skalieren, um dann zu versuchen, andere zu skalieren.

### 2026-01-23

Ich habe heute eine leichte Erkältung und Kopfschmerzen, die Produktivität ist niedrig. Aber ich freue mich, dass ich mit den täglichen Zusammenfassungen begonnen habe.

1.  Was habe ich heute gemacht:
    1.  Mit Hilfe der KI ein Multi-Agent-System entworfen. Dieses System ist noch nicht systematisch ausgefeilt.
    2.  Der `legionmind-github-bridge` ist wieder ein Stück vorangekommen.
    3.  Das Preemption-Design und die Implementierung von `node-unit` angepasst. Früher wurden bei einem fehlgeschlagenen `node-unit` alle darunter liegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
    4.  Die Prüfung für die Futures-Broker-Kontoeröffnung (CFFEX) abgelegt. Es war überraschend, dass die Kamera die ganze Zeit an sein musste, man das Fenster nicht minimieren und den Bildschirm nicht wechseln durfte. Zum Glück gab es unbegrenzte Versuche – das konnte mich nicht aufhalten. Bestanden mit 95 Punkten.

2.  Gedanken:

    Mein Ziel ist es, Agenten-Autonomie mit möglichst geringem Aufwand (für mich) zu erreichen. Mein aktueller Workflow sieht so aus:
    1.  `legionmind` als SOP für Entwicklungsarbeit. Es ist eine Agent-Skill. Ich mag Agent-Skills.
    2.  `opencode` als die physische Instanz des Agents. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent. Falls ich `opencode` irgendwann ersetzen müsste, wäre das meine To-Do-Liste.
    3.  Meine derzeitige Kopfschmerzquelle ist, wie ich Skills und diese Sub-Agents kombinieren soll.

    Den ganzen Tag Kopfschmerzen, erst am Abend wurde es etwas klarer. Ich habe festgestellt, dass es vielleicht keine gute Idee ist, diese Gedanken am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten notieren und die Gedanken erst am nächsten Morgen zusammenfassen.

3.  Was plane ich für morgen?
    1.  Mit diesem Multi-Agent-System etwas Sinnvolles tun. Vielleicht das Finanzkonto von `gate` anbinden.
    2.  Weiter am `legionmind-github-bridge` arbeiten.
    3.  Clustersicherheit, falls Zeit bleibt.
    4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
    5.  Morgen kommen `sy`s Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

### 2026-01-24

Heute habe ich mich ausgeschlafen – bis 11 Uhr. Fühlt sich großartig an, so lange habe ich nicht mehr so ausgiebig geschlafen.

1.  Was habe ich heute gemacht:
    1.  Eine neue Version von `node-unit` deployed. Der Grund, warum ich es relativ sorglos deployen konnte, sind meine umfangreichen End-to-End-Tests. Konkret: Ein Docker-Container startet eine TimescaleDB (PostgreSQL 17), dann werden zwei `node-unit`-Instanzen gestartet und 21 `@yuants/portal`-Deployments in die Datenbank eingefügt, um zu testen, ob sich der Zustand auf je die Hälfte pro Node einpendelt.

        Dieser Test deckt im Wesentlichen ab, was passiert, wenn viele herrenlose Deployments auftauchen und zwei `node-unit`-Instanzen hochfahren: Man kann beobachten, wie sie abwechselnd Deployments übernehmen. Was noch fehlt, sind echte CPU-/Arbeitsspeicher-lastige Workloads und das Szenario, in dem eine `node-unit`-Instanz absichtlich oder unabsichtlich heruntergefahren wird.

    2.  Die neue Multi-Agent-Version von `legionmind` in `Yuan` verwendet, um das Problem der Kontostromausgabe für das `vendor-gate earn`-Konto zu lösen. Ich ließ den Agent zuerst mit `legion` Dokumentation erstellen. Insgesamt wurden folgende Dokumente erstellt:

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

        Das fühlt sich nach einem soliden Workflow an. Allerdings gibt es Konflikte zwischen meinem neuen Multi-Agent-System und der bestehenden Dokumentationserstellung von `legionmind`. Ich sollte die Grenzen der einzelnen Aufgaben genauer überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument geschrieben werden soll, in separaten Skills liegen, und `legionmind` sollte eine Beschreibung des Arbeitsablaufs sein. Jeder Agent sollte in der Lage sein, einige kleinere Skills zu laden, um seine Arbeit zu unterstützen.

        Ein weiteres Problem war, dass beim ersten Versuch ein Fehler auftrat: Der Kontostrom wurde in `account-actions-with-credential.ts` ausgegeben. Das lag daran, dass ich verlangt hatte, sich an `vendor-okx` zu orientieren, um das Earn-Konto anzubinden. Der Grund für diese Anforderung war, dass bisher nur das OKX-Earn-Konto als `account` integriert war. Aber die KI übernahm auch einige veraltete Praktiken daraus. Der aktuelle Standard für die Integration von Börsen ist, alle Konten über `provideExchangeServices` bereitzustellen, nicht über `provideAccountActionsWithCredential`.

        Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie modelliert man solches Wissen? Wie stelle ich einem KI-Agenten solchen Projektkontext als externes Gehirn zur Verfügung? Das ist eine Frage, die es wert ist, tiefgründig überdacht zu werden. Morgen muss ich mich damit genauer befassen.

    3.  Nachmittags für `sy`s Freunde gekocht. Das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter.

2.  Gedanken:
    - Wie oben erwähnt, muss ich mir genau überlegen, wie ich für KI-Agents ein kompaktes externes Gehirn entwerfe. Am einfachsten könnte man mit einer Sammlung von `AGENT.md`-Dateien beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist ziemlich hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist ein schwieriges Problem. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent möglicherweise eine eigene Schleife hat, um Erinnerungen zu aktualisieren. Das Wichtigste ist, wie man die Ergebnisse der Arbeit eines KI-Agents bewertet.

    - Bezüglich des obigen Punkts habe ich einen interessanten Artikel gelesen. Lassen Sie mich ihn in meinen eigenen Worten zusammenfassen: Zunächst kann die Bewertung eines einzelnen Agent-Arbeitsschritts in mehrere Kategorien unterteilt werden:
      1.  Statische Tool-Evaluierung: Compiler, Linter, Unit-Tests, E2E-Tests
      2.  Model-Evaluierung: Ein anderes LLM beurteilt gemäß unserem definierten Prompt.
      3.  Manuelle Evaluierung: Ich beurteile.

      Dann gibt es zwei Arten der systematischen Evaluierung eines Agent-Systems:
      1.  Fähigkeitsbasiert: Beantwortet die Frage, was dieser Agent tun kann? Die Erfolgsquote kann niedrig sein, z.B. wenn ich `legion` verwende, um schrittweise größere, schwierigere Aufgaben auszuführen – wie die Erkundung einer neuen Grenze.
      2.  Regressionsbasiert: Kann er seine bisherigen Fähigkeiten beibehalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie weiterhin stabil erledigt werden können.

      Wenn eine neue Fähigkeit eingeführt wird, sollte der Übergang von fähigkeitsbasiert zu regressionsbasiert erfolgen.

      Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`
      - `pass@k`: Mindestens ein Erfolg in k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit für mindestens einen Erfolg. Anwendbar: Szenarien, in denen es nur darum geht, "mindestens eine brauchbare Lösung zu finden".

      - `pass<sup>k</sup>`: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Agenten, von denen der Nutzer erwartet, dass sie jedes Mal zuverlässig produzieren.

      FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Meine Energie ist immer noch etwas niedrig. Nachmittags habe ich ein bisschen gearbeitet, abends gekocht, und jetzt fühle ich mich schon müde. Wann werde ich wie CZ sein und nicht schlafen müssen?

3.  Was plane ich für morgen?
    1.  Über dieses Eval-Agent-Modell nachdenken und das Multi-Agent-System weiter iterieren.
    2.  Clustersicherheit – muss erledigt werden.
    3.  `legion-github-bridge`.

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass `鸡哥` zwei Dienste mit derselben `terminal_id` gestartet hatte, die sich gegenseitig stritten und große Probleme verursachten.

1.  Was habe ich heute gemacht:
    1.  Versucht, den Cluster hinter einen NAT-Router zu migrieren – natürlich mit Hilfe des brandneuen `legion`. Meine Vorgehensweise war:
        - Zuerst den `kops`-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken `172.21.0.0/24` und `172.21.1.0/24`. Dann einen NAT-Gateway für den ausgehenden Traffic erstellt.

          Ursprünglich wollte ich ein Netzwerksegment mit `10.0` verwenden, aber nach dem Versuch stellte ich fest, dass AWS die Erstellung solcher CIDRs nicht erlaubt. Also wechselte ich zu `172.21`. Dabei gab es eine Falle: In der Cluster-Ressource musste der vorhandene Loadbalancer manuell auf das entsprechende VPC zeigen (ursprünglich war es implizit standardmäßig zugewiesen, aber mit einem zusätzlichen CIDR muss man es manuell angeben).

        - Dann eine neue Instance Group erstellt, die auf das neue VPC zeigt. Dabei gab es einen kleinen Zwischenfall: Die neue IG hatte keine S3-Berechtigungen. Keine Ahnung, warum. Nach manueller Hinzufügung traten die Nodes dem Cluster normal bei.

        - Nächster Schritt: Dienste manuell in die neue IG migrieren.

        - Schließlich die alte IG herunterfahren.

        Nachdem alles erledigt war, stellte ich fest, dass der gesamte ausgehende Cluster-Traffic nur noch von einer einzigen IP-Adresse kam. Das brachte unsere Dienste, die auf IP-Ratenbegrenzung angewiesen sind, ziemlich durcheinander. Leider musste ich einen Rollback durchführen. Ich muss zuerst die Fähigkeit `http proxy` implementieren, bevor ich den nächsten Schritt gehen kann.

    2.  Das Multi-Agent-System wurde praktisch eingesetzt, um ein Skript zur automatischen Aktualisierung des `midas`-Nettoinventarwerts zu erstellen. `deepseek` hat lange daran gearbeitet, und ich war ziemlich zufrieden. Ein Kernproblem dabei ist: Wenn ich einen Fehler im frühen Design nicht bemerke, erwartet mich eine riesige Verschwendung von Tokens und Zeit, denn ich habe festgestellt, dass Agents nicht besonders schnell arbeiten.

        Derzeit sind diese Coding-Agents noch ziemlich primitiv. Sie brechen oft aufgrund von Netzwerkproblemen oder anderen Gründen ab. Sie für ernsthafte, lang laufende Arbeiten einzusetzen, ist noch etwas unzuverlässig (die SLI ist noch nicht gut). Das könnte aber auch eine Chance sein. Auf den ersten Blick erfordert dies Kenntnisse in Software-Engineering und Hochverfügbarkeit.

2.  Gedanken:

    Heute hatte ich weniger Gedanken, sie sind größtenteils in die obigen Abschnitte integriert.

3.  Was plane ich für morgen?
    1.  Den HTTP-Proxy-Mechanismus für `Yuan` entwerfen.
    2.  Nach dem Deployment die Cluster-Migration erneut versuchen.

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach dem 25. Lebensjahr einen deutlichen Fortschritt im Umgang mit Emotionen gemacht habe: Neben der Emotion gibt es jetzt deutlich einen Hauch von Vernunft, der als Copilot fungiert. Dieser Hauch von Vernunft legt eine Steuerstange in den gewaltigen Reaktor der Emotionen. Ohne diese Steuerstange würden die Emotionen außer Kontrolle geraten, eine sich selbst verstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieser Steuerstange beginne ich zu verstehen, was man sagen kann und was nicht, was man tun kann und was nicht, welche Entscheidungen man treffen kann und welche nicht. Das ist eine erfreuliche Veränderung in mir.

1.  Was habe ich heute gemacht:
    1.  Heute habe ich mit `legion` das Design und die Implementierung des HTTP-Proxys für `yuan` durchgeführt. Ich finde, es lief ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie man einen verfügbaren Terminal auswählt) modifiziert und dann den Agenten machen lassen. Das Ergebnis war ziemlich gut.
    2.  Ich habe auch mit `legion` eine automatische Aktualisierung für `midas` durchgeführt. Aber die KI hat es die ganze Zeit schlecht gemacht, meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt erfasst. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (`deepseek` scheint doch nicht so clever zu sein); das Review war nicht streng genug; oder die Dokumentations-Wissensbasis ist nicht streng genug.
    3.  Verdammt, nachts wurde ich durch einen Alarm geweckt. Ein Host war aus unerklärlichen Gründen abgestürzt. Es scheint einen CPU-Spitzenwert gegeben zu haben, der den Host in einen Zustand versetzt hat, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein Haufen. Mein Urteil: Der Alarm ist nützlich, die Logs sind Mist. Notiert!

2.  Gedanken:
    1.  Beim Duschen habe ich über den kritischsten Punkt der derzeitigen Zusammenarbeit zwischen mir und der KI nachgedacht. Einerseits die Serviceverfügbarkeit des KI-Agents selbst – dass er nicht mitten in der Arbeit abstürzt oder so. Übrigens, `ralph loop` erhöht die Verfügbarkeit im Wesentlichen durch grobes ständiges Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst wenn Untergebene ihrem Vorgesetzten Bericht erstatten, benötigen sie eine PowerPoint-Präsentation oder einfach einen professionellen mittleren Manager, der als "teurer Sprachrohr" fungiert. Wie kann sich die Berichterstattung der KI an den Menschen auf flaches Markdown und Code beschränken? Könnte der Report der KI jedes Element mit einem Artefakt verlinken? Könnte es einen `Citation Agent` geben, der speziell für diesen Teil zuständig ist?

        Allerdings ist meine derzeitige Verwendung der KI ziemlich eingeschränkt, hauptsächlich auf Codierungsaufgaben konzentriert.

    2.  Überlegen wir genau, warum mein Multi-Agent-System, obwohl es bereits existiert, stabil in Richtung eines Scheiterns steuert. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
        1.  Das eigene Intelligenzniveau der KI.
        2.  Das menschliche Review war nicht streng genug.
        3.  Die Wissensbasis ist nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.

        Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss nicht weiter bedacht werden. Sich in Richtung 2 anzustrengen, würde tatsächlich von einem immer detaillierteren RFC-Dokument abhängen, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Entwicklungsmethode ist, als wären wir zum **Wasserfallmodell** zurückgekehrt, Arbeit durch einen linearen Prozess zu erledigen:

        ```text
        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests
        ```

        Die Gründe dafür liegen auf zwei Ebenen: der technischen Ebene und der Ebene der Organisation und Prozesse, wobei die organisatorisch-prozessuale Ebene der *Hauptfaktor* ist.

        Auf technischer Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf die vom Backend bereitgestellten Schnittstellen warten, um mit der Entwicklung zu beginnen; das Backend muss warten, bis das Produkt-CRD geschrieben ist, um zu starten.

        In menschlichen Organisationen hat das Wasserfallmodell Probleme wie: Ineffizienz, Qualitätsrisiken, die schwer aufzudecken sind, geringe Flexibilität und Teamkonflikte. In der Zusammenarbeit zwischen mir und der KI existieren Effizienz und Teamkonflikte von Natur aus nicht in der Welt der KI. Es ist, als ob die KI und ich in zwei verschiedenen Zeitdimensionen leben würden. Ein Tag für mich ist für die KI wie ein Jahr. Nun, Ineffizienz könnte ein paar Tokens mehr kosten, aber das ist derzeit nicht mein Hauptanliegen. Mein tatsächliches Problem sind Qualitätsrisiken aufgrund von Missverständnissen bei Anforderungen oder Fakten, und die geringe Flexibilität.

        Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich gleichzeitig maximal zu befreien. Nach der Erfahrung der menschlichen Organisation muss ich zu einem höheren Knoten im Befehlsbaum werden, der Dinge der KI anvertrauen kann, während er sicherstellt, dass sie nicht vom Kurs abkommt.

        Die zwei kritischsten Punkte:
        1.  Absichtsausrichtung (Intent Alignment)
        2.  Schichtweise Validierung (Layered Validation)

        Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um es zu verstehen.

    3.  Ich muss mich vor der schlechten Seite meines Zustands hüten, in dem ich mit einem Hammer nach Nägeln suche: Pfadabhängigkeit, Output größer als Verständnis.

3.  Was plane ich für morgen?

    Morgen kommt `zl`. Geplant sind Sport, Essen und Brettspiele.

### 2026-01-27

`zl` ist da, die Informationsmenge ist groß, ich muss sie verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen. Erst im letzten Szenario, in dem ich den Bösewicht, den Dramatiker, spielte, spürte ich den süßen Punkt dieses Spiels und beendete das Spiel mit meinem vollständigen Sieg.

### 2026-01-31

Die letzten Tage waren ziemlich voll, daher habe ich nichts aufgezeichnet. Aber das Aufzeichnen einzustellen, geht nicht. Also fasse ich jetzt zusammen und zeichne alles auf.

Abgesehen von der vielen Arbeit, warum habe ich nicht aufgezeichnet?

1.  Weil ich Angst hatte, dass Aufzeichnen bedeutet, sich hinzusetzen und speziell 30 Minuten oder mehr zu investieren, um einen Tag aufzuzeichnen. Das liegt an einer gewissen Angst und Belastung durch das Aufzeichnen des Alltags, was nicht akzeptabel ist.
2.  Normalerweise möchte ich nur aufzeichnen, wenn der Tag wirklich vorbei ist. Aber wenn ich genau darüber nachdenke, ist das etwas unmenschlich, denn ich gehe jetzt meistens ins Bett, sobald es Zeit ist zu schlafen, und nicht, weil die Dinge, die ich tun wollte, wirklich alle erledigt sind (gibt es so einen Moment überhaupt?). Das führt dazu, dass ich in freien Momenten nicht aufzeichne, aber wenn es wirklich Zeit zum Aufzeichnen ist, muss ich schnell ins Bett. Zusammen mit Problem 1 häuft sich das immer mehr an.

1.  Was habe ich heute gemacht:

    > Korrektur: Was habe ich in den letzten Tagen gemacht?
    1.  Auf Anraten von `sc` begonnen, `neovim` zu verwenden. Warum? Ich habe gesehen, dass `nvim-orgmode` wirklich zu einem brauchbaren Org-Mode geworden zu sein scheint. Gleichzeitig begann ich, mich von `emacs` zu langweilen:
        - Endlose Update-Fehler
        - Verwirrendes Debugging und Fehlermeldungen
        - Flexibilität, die für mich nur zusätzliche Belastung, aber keinen Nutzen bringt
        - Ich verstehe `emacs-lisp` nicht und will es auch nicht verstehen

        Jahrelang habe ich das oben Genannte ertragen, um Org-Mode zu nutzen, aber es gab nirgendwo sonst eine gute Alternative für Org-Mode. Jetzt scheint das `nvim`-Lager eine brauchbare Alternative zu haben – warum es nicht versuchen?

        Da ich seit Jahren `vim`-Nutzer bin und in `emacs` auch `evil-mode` (`vim-mode`) verwendet habe, habe ich nie das Gefühl gehabt, dass die Verwendung von `vim` eine große Belastung darstellt. In `vscode` und `idea` kann ich ohne `vim` nicht überleben, daher ist die direkte Verwendung von `nvim` für mich überhaupt kein Problem.

        Da das Hindernis weg ist, habe ich das Ökosystem von `nvim` untersucht. `nvim` hat, weil es keine Altlasten von `vimscript` hat, direkt `lua` als Konfigurations- und Plugin-Sprache übernommen. Es kann also leicht starten, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von `neovim` jetzt auch von einem System namens `lazy.vim` vereinheitlicht wird. Das Design des Plugin- und Konfigurationssystems von `nvim` scheint organisiert und geplant speziell die Schmerzpunkte des ursprünglichen `vim` mutig erneuert zu haben. In `vim` & `emacs` gab es wahrscheinlich unzählige ähnliche Versuche, die alle vereinheitlichen wollten, aber weil die Community zu fragmentiert war, war wahrscheinlich keiner wirklich erfolgreich.

        Also habe ich `lazyVim` direkt ausprobiert. Wow, jetzt habe ich das Gefühl, direkt eine `vscode` zu besitzen, und diese `vscode` kann im Terminal laufen. Wissen Sie, wie geil das ist?

        Jetzt habe ich einen mächtigen alten Herrscher auf einer brandneuen Infrastruktur, und seine Konfiguration ist extrem einfach, Flexibilität und Bequemlichkeit sind genau richtig eingeschränkt, meine alten Schmerzpunkte sind im Wesentlichen alle gelöst.

        Ich habe kaum Zeit gebraucht, um viele Workflows darauf umzustellen. Ich verwende jetzt `tmux`, öffne 5 Fenster, und in jedem Fenster öffne ich `nvim` in einem Ordner. In `nvim` ist links der Verzeichnisbaum, in der Mitte der Code, rechts sind `opencode` und das Terminal.

    2.  Eine neue Version von `legion` aktualisiert. Ich habe den Textumfang des `legionmind`-Skills erheblich reduziert (von 4k Zeilen). Derzeit habe ich das Gefühl, dass ich mich um weniger kümmern muss, aber ich weiß nicht, ob es daran liegt, dass ich in letzter Zeit klügere Modelle verwendet habe oder diese Version von `legionmind` wirklich klüger geworden ist.

    3.  Ein `openclaw` aufgesetzt. `minimax 2.1` ist immer noch ein bisschen dumm, aber als persönlicher Assistent finde ich `openclaw` ziemlich gut, denn es ist im Wesentlichen ein `chatgpt` mit Gedächtnis + Händen und Füßen (kann meinen Computer bedienen).

    4.  `Yuan` die `http-proxy`-Funktionalität hinzugefügt, Metriken usw. hinzugefügt.

2.  Gedanken

    Manchmal habe ich das Gefühl, dass das Schreiben von Dingen mit KI ein bisschen wie das Debuggen von Code ist, dessen Prinzipien man nicht ganz versteht: Durch ständiges Testen seines Verhaltens oder das Ausgeben von Logs wird beim Debuggen geholfen, hier ein bisschen ändern, dort ein bisschen hinzufügen, bis man schließlich ein zufriedenstellendes Ergebnis erhält. Lassen Sie uns über den Ursprung dieses Gefühls nachdenken:

    Beim Schreiben von Code mit KI gibt der Mensch im Wesentlichen einen Prompt ein, der einige spezifische Anweisungen enthält, in der Hoffnung, dass die KI die impliziten Anweisungen und Informationen hinter diesen Anweisungen versteht und die Arbeit korrekt erledigt.

    Die an die KI zu übermittelnden Anweisungen können geschichtet werden: Die oberste Ebene ist die Anweisung für die aktuelle Aufgabe. Darunter liegen einige getroffene technische Entscheidungen für dieses Softwareprojekt, Best Practices, die nach Abwägung von Vor- und Nachteilen für einen Teil des Projekts zusammengefasst wurden. Die nächste Ebene sind Hintergrundinformationen zur Problemdomäne, die das Projekt lösen soll. Die nächste Ebene ist das eigene Fachwissen des Software-Ingenieurs, der die KI verwendet: seine persönlichen Vorlieben, technischen Präferenzen, Stilpräferenzen, historischen Erfahrungen, Ablagerungen der Denkweise. Die unterste Ebene ist das Hintergrundwissen der Welt.

    In einem Dialog mit der KI kann der KI nur die Anweisung für die aktuelle Aufgabe klar vermittelt werden, in der Hoffnung, dass die KI über ausreichend Hintergrundwissen über die Welt und die zur Problemlösung benötigten Hintergrundinformationen verfügt.

    Daher kann geschlussfolgert werden, dass die KI eine Aufgabe leicht und in hoher Qualität erledigen kann, wenn der Kontext einer Aufgabe ausreichend klein ist, die gegebenen Anweisungen absolut klar sind und es keine historischen Altlasten gibt. Wenn es viele implizite Hintergrundinformationen gibt, neigt sie dazu, einige seltsame Dinge zu produzieren.

    Was `Legionmind` tun muss, ist, der KI zu ermöglichen, selbst Hintergrundwissen und Best Practices bezüglich dieses Projekts und der Problemdomäne selbst zu sammeln. Das erfordert, dass die KI entweder über gute logische Denkfähigkeiten und ein gutes Gedächtnis (Kontextkapazität) verfügt, oder dass die KI selbst über umfangreiches Welt-Hintergrundwissen verfügt. Was darüber hinausgeht, kann nicht gerettet werden.

    —

    Und dann finde ich, dass `nvim` wirklich eine späte, aber willkommene Begegnung ist.

3.  Was plane ich für morgen?

    Morgen gehe ich zu `sc` nach Hause, um sein neues Zuhause zu besichtigen, dann spielen wir zusammen Brettspiele und schauen nebenbei Schneeausrüstung für `sy` an.

### 2026-02-01

Bei `冷山` habe ich für `sy` Skischuhe angeschaut. Die Fußlänge wurde gemessen (245), und ein bequemer Schuh wurde anprobiert. Leider war die schöne Farbe bei `冷山` ausverkauft, also muss `sy` online kaufen.

Mittags haben wir bei `sc` zu Hause gegessen, was er gekocht hat. Er hat ein Sous-Vide-Gerät für Steaks, das wirklich zartes Steak produziert. `sc` hat für uns ein `room tour`-Rätsel vorbereitet. Es gab zwei Hinweise. Der erste Hinweise führte zu 4 Orten, um 4 englische Wörter/Sätze zu finden, die mit einem Indexcode zu einem Wort kombiniert wurden: `Three`. Der zweite Hinweis musste aus einem Umwelt-Rätsel gewonnen werden, am Ende erhielt man die Zahlen 31 / 13 (ich erinnere mich nicht genau) und konnte aus einer Schublade mit vielen nummerierten kleinen Kästchen eine Schokolade holen.

Leider hatte er keine Schokolade mehr, wir bekamen einen süßen Aufkleber.

—

Der Nachmittag mit Brettspielen war sehr interessant. Der Höhepunkt war natürlich `领国者` (The King's Dilemma?). Am Ende errang `sc`, der die Mittelschicht spielte, einen beispiellosen Sieg – das erste Mal in unserer Spielgeschichte, dass die Mittelschicht gewann. `pgw`, der die Bourgeoisie spielte, war sauer, weil `小耗子`, der die Regierung spielte, ihn bei zwei für `pgw` entscheidenden politischen Reformabstimmungen nicht unterstützte. Ich spielte die Arbeiterklasse und hatte natürlich bei den meisten Themen keine gemeinsamen Interessen mit der Bourgeoisie, konnte also nicht helfen. Tatsächlich lagen am Ende des Spiels außer `pgw` unsere drei Punkte sehr eng beieinander. Eine Welt, in der nur der Kapitalist verletzt wurde, war erreicht.

Dieses Spiel macht wirklich viel Spaß und ist zu meinem Lieblingsbrettspiel geworden. Denn es hat beträchtliche Spieltiefe, die Spielweise jedes der vier Spieler ist sehr unterschiedlich, und jedes Mal, wenn man eine andere Rolle spielt, ist es ein völlig anderes Spielerlebnis. Diesmal zum Beispiel trat bei mir als Arbeiterklasse zum ersten Mal ein Überschuss an Arbeitslosen auf (weil Regierung und Bourgeoisie keine neuen Unternehmen gründen wollten), der die Bedingungen für einen Arbeiterprotest/Aufstand erfüllte. Die Arbeiterklasse ging auf die Straße und drohte, das Land umzukrempeln. Die konkrete Wirkung war, Einflusswürfel zu erhalten und den anderen Klassen insgesamt (`Anzahl Arbeitslose - 2 + Anzahl Gewerkschaften`) Punkte abzuziehen.

Wie erwartet, musste die Arbeiterklasse früher planen, Überredungskünstler sein und die Bourgeoisie und Regierung anflehen, neue Unternehmen zu gründen. Jetzt wollten sie alle neue Unternehmen gründen, was das Spiel sofort belebt hat. Am Ende erreichte ich mit 101 Punkten den zweiten Platz in diesem Spiel.

### 2026-
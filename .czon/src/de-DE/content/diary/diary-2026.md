---
title: 2026 Arbeitsprotokoll
date: 2026-01-01
---

# 2026

## 2026-01 Januar

### 2026-01-22

1.  Was habe ich heute gemacht:
    1.  Den `opencode-feishu-notifier` refaktorisiert. Er sendet Benachrichtigungen nun nach einem festgelegten Schema an die Nutzer.
    2.  Weiter an `legionmind-github-bridge` von der KI schreiben lassen. Ich habe den Multi-Agent-Modus von `opencode` gestartet. Es wurden 5 Agents gestartet, um 5 Issues zu bearbeiten. Das Ding lief 2 Stunden lang und hat mein gesamtes 5-Stunden-Budget an Codex-Tokens aufgebraucht.
    3.  Heute ist ein Node im `sg`-Cluster ausgefallen. Ich habe mir die Logs angesehen und es stellte sich heraus, dass er durch ständige SSH-Angriffsversuche überlastet wurde. Das ist nicht gut. Nach kurzer Überlegung gibt es mehrere mögliche Maßnahmen:
        - Passwortauthentifizierung deaktivieren
        - Den SSH-Zugang für das gesamte Internet schließen
        - Den Cluster hinter einen NAT verschieben
    4.  Verschiedene Kleinigkeiten erledigt. `zl` kommt nächste Woche nach Suzhou. Ich habe etwas Zeit für die Planung aufgewendet, aber es lief nicht reibungslos. Ich werde keine weitere Energie mehr darauf verwenden.

2.  Gedanken:

    In meiner derzeitigen Phase kann ich nur 2-3 Dinge gleichzeitig koordinieren. Dazu gehören Entwicklungsarbeit, Alltagsorganisation, Denken und Output. Wenn ich diese Grenze überschreite, komme ich mit der Koordination nicht mehr hinterher und werde schnell müde. Und das, obwohl ich bereits versuche, so viel Arbeit wie möglich an KI-Agents zu delegieren. Daher denke ich, dass es zwei Verbesserungsrichtungen geben sollte:
    - Für Codierungsaufgaben sollte ich den Autonomiegrad der Agents so weit wie möglich erhöhen. Optimierungsziele sind:
      1.  Sie sollen mich möglichst selten stören.
      2.  Sie sollen möglichst viel arbeiten.
      3.  Die Zuverlässigkeit ihrer Arbeit soll so hoch wie möglich sein.
    - Auch ich selbst muss mich verbessern:
      1.  Meine mentale Energie besser managen, um nicht so schnell erschöpft zu sein.
      2.  Die Fähigkeit verbessern, in mehreren verschiedenen Kontexten gleichzeitig zu arbeiten, ohne Dinge zu vergessen oder zu übersehen, und dabei den Fortschritt im Blick zu behalten.

    Basierend auf diesen Überlegungen denke ich, dass ich morgen in zwei Richtungen experimentieren könnte:
    1.  Eine Multi-Agent-Vorlage für `legionmind` entwerfen und mit `opencode` an einer Codierungsaufgabe in `yuan` experimentieren.
    2.  Weiter das Arbeitsprotokoll führen und eine Methode für das Management von mentaler Energie und Kontexten erkunden.

3.  Was plane ich für morgen?
    1.  Wie oben erwähnt, ein Multi-Agent-Experiment durchführen.
    2.  Weiter an `legionmind-github-bridge` arbeiten.
    3.  Falls Zeit bleibt, an der Clustersicherheit arbeiten.

    —

    Insgesamt ist meine Hauptaufgabe derzeit, mich selbst mit KI zu skalieren, um dann zu versuchen, andere zu skalieren.

### 2026-01-23

Heute hatte ich eine leichte Erkältung und Kopfschmerzen, die Produktivität war niedrig. Aber ich bin froh, dass ich mit den täglichen Zusammenfassungen begonnen habe.

1.  Was habe ich heute gemacht:
    1.  Mit KI-Hilfe ein Multi-Agent-System entworfen. Das System ist noch nicht systematisch ausgefeilt.
    2.  `legionmind-github-bridge` ist wieder ein Stück vorangekommen.
    3.  Das Preemption-Design und die Implementierung von `node-unit` angepasst. Früher wurden bei einem `failed`-Zustand eines `node-unit` alle darunter liegenden Deployments gelöscht. Jetzt wird nur noch eins nach dem anderen bereinigt.
    4.  Die Prüfung für die Futures-Broker-Kontoeröffnung (CFFEX) abgelegt. Man musste die ganze Zeit die Kamera anlassen, durfte das Fenster nicht minimieren oder wechseln. Zum Glück gab es unbegrenzte Versuche – das schaffe ich locker. Bestanden mit 95 Punkten.

2.  Gedanken:

    Mein Ziel ist es, Agent-Autonomie mit möglichst wenig Aufwand (für mich) zu erreichen. Mein aktueller Workflow sieht so aus:
    1.  `legionmind` als SOP für Entwicklungsarbeit. Es ist eine Agent-Skill. Ich mag Agent-Skills.
    2.  `opencode` als die physische Instanz des Agents. Ich nutze dessen Fähigkeiten wie bash / tool calling / langraph / command / subagent. Falls ich `opencode` irgendwann ersetzen müsste, wäre das meine To-Do-Liste.
    3.  Meine derzeitige Kopfzerbrechung ist, wie man Skills und diese Sub-Agents kombiniert.

    Den ganzen Tag Kopfschmerzen, erst am Abend wurde es klarer. Ich merke, dass es vielleicht keine gute Idee ist, diese Gedanken erst am Ende des Tages aufzuschreiben. Vielleicht sollte ich nur Fakten notieren und die Gedanken erst am nächsten Morgen zusammenfassen.

3.  Was plane ich für morgen?
    1.  Mit diesem Multi-Agent-System etwas Nützliches tun. Vielleicht das Gate-Earn-Konto anbinden.
    2.  Weiter an `legionmind-github-bridge` arbeiten.
    3.  Clustersicherheit, falls Zeit bleibt.
    4.  Wieder mit der Arbeitszeiterfassung beginnen. (Wichtig)
    5.  Morgen kommen `sy`s Freunde zu Besuch, daher wird die Arbeitszeit wahrscheinlich knapp.

### 2026-01-24

Heute habe ich mich ausgeschlafen – bis 11 Uhr! Fühlt sich großartig an, so lange habe ich nicht mehr so ausgiebig geschlafen.

1.  Was habe ich heute gemacht:
    1.  Die neue Version von `node-unit` deployed. Der Grund, warum ich es relativ sorglos deployen konnte, sind meine umfangreichen End-to-End-Tests. Konkret: Ich starte eine TimescaleDB (PostgreSQL 17) in Docker, dann zwei `node-unit`-Instanzen und füge 21 `@yuants/portal`-Deployments in die Datenbank ein, um zu testen. Am Ende konvergieren sie zu einem halb-halb Zustand.

        Dieser Test deckt im Wesentlichen ab, was passiert, wenn viele herrenlose Deployments auftauchen und zwei `node-unit`-Instanzen hochfahren: Man sieht, wie sie abwechselnd Deployments übernehmen. Was fehlt, sind echte CPU-/Memory-Arbeitslasten und das Szenario, in dem ein `node-unit` absichtlich heruntergefahren wird.

    2.  Die neue Multi-Agent-Version von `legionmind` in `Yuan` verwendet, um das Problem der Kontostromausgabe für das `vendor-gate` Earn-Konto zu lösen. Ich ließ den Agent zuerst mit `legion` Dokumentation erstellen. Insgesamt wurden folgende Dokumente erstellt:

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

        Das fühlt sich nach einem soliden Workflow an. Allerdings gibt es Konflikte zwischen meinem neuen Multi-Agent-System und der bestehenden Dokumentationserstellung von `legionmind`. Ich sollte die Grenzen der einzelnen Aufgaben genauer überdenken. Zum Beispiel sollten Spezifikationen, wie jede Art von Dokument geschrieben werden soll, in separaten Skills liegen. `legionmind` sollte eher eine Workflow-Beschreibung sein. Jeder Agent sollte in der Lage sein, einige kleinere Skills zu laden, um seine Arbeit zu unterstützen.

        Ein weiteres Problem war, dass beim ersten Versuch ein Fehler gemacht wurde: Der Kontostrom wurde in `account-actions-with-credential.ts` ausgegeben. Das lag daran, dass ich verlangt hatte, sich an `vendor-okx` für die Earn-Konto-Integration zu orientieren – weil bisher nur das OKX-Earn-Konto als `account` integriert war. Aber die KI hat auch einige veraltete Praktiken übernommen. Der aktuelle Standard für Exchange-Integrationen ist, alle Konten über `provideExchangeServices` bereitzustellen, nicht über `provideAccountActionsWithCredential`.

        Dieses Wissen besitzt ein brandneuer KI-Agent nicht. Wie modelliert man solches Wissen? Wie stelle ich einem KI-Agent solchen Projektkontext als externes Gehirn zur Verfügung? Das ist eine Frage, über die ich nachdenken muss. Morgen muss ich das genauer durchdenken.

    3.  Nachmittags für `sy`s Freunde gekocht. Das hat mich ganz schön erschöpft. Also morgen geht die Arbeit weiter.

2.  Gedanken:
    - Wie oben erwähnt, muss ich genau überlegen, wie ich einem KI-Agent ein kompaktes externes Gehirn bereitstellen kann. Am einfachsten wäre es, mit einer Sammlung von `AGENT.md`-Dateien zu beginnen. Das habe ich schon versucht, aber der Overhead für die Pflege dieser Dokumente selbst ist hoch. Müll von wirklich wertvollen Erfahrungen zu unterscheiden, ist schwierig. Derzeit scheint es, dass Erinnerungen wie andere Prompts sind, nur dass der Agent vielleicht eine eigene Schleife hat, um sie zu aktualisieren. Am wichtigsten ist, wie man die Ergebnisse der KI-Agent-Arbeit bewertet.

    - Bezüglich des vorherigen Punktes habe ich einen interessanten Artikel gelesen. Lassen Sie mich ihn in meinen eigenen Worten zusammenfassen: Zunächst kann die Bewertung einer einzelnen Agenten-Aufgabe in Kategorien unterteilt werden:
      1.  Statische Tool-Eval: Compiler, Linter, Unit-Tests, E2E-Tests.
      2.  Model-Eval: Ein anderes LLM bewertet anhand eines von uns definierten Prompts.
      3.  Menschliche Eval: Ich bewerte.

      Dann gibt es zwei Arten der systematischen Bewertung eines Agenten-Systems:
      1.  Fähigkeitsbasiert: Beantwortet die Frage, was der Agent tun kann. Die Erfolgsquote kann niedrig sein, z.B. wenn ich `legion` verwende, um größere, schwierigere Aufgaben schrittweise auszuführen – wie die Erkundung einer neuen Grenze.
      2.  Regressionsbasiert: Kann er seine bisherigen Fähigkeiten beibehalten? Z.B. durch wiederholtes Testen einiger Aufgaben, um sicherzustellen, dass sie stabil implementiert werden können.

      Wenn eine neue Fähigkeit eingeführt wird, sollte sie von "fähigkeitsbasiert" zu "regressionsbasiert" übergehen.

      Der Artikel erwähnt auch zwei wichtige Metriken: `pass@K` und `pass^K`
      - `pass@k`: Mindestens ein Erfolg in k Versuchen. Je mehr Versuche, desto höher die Wahrscheinlichkeit, mindestens eine brauchbare Lösung zu finden. Anwendbar: Wenn es nur darum geht, "mindestens eine brauchbare Lösung" zu finden.
      - `pass<sup>k</sup>`: Alle k Versuche müssen erfolgreich sein. Je mehr Versuche, desto schwieriger ist es, Konsistenz aufrechtzuerhalten. Anwendbar: Wenn der Nutzer einen zuverlässigen Produktions-Agenten erwartet.

      FYI: [Siehe diesen Artikel](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Meine Energie ist immer noch etwas niedrig. Nachmittags etwas gearbeitet, abends gekocht – und schon fühle ich mich müde. Wann werde ich wie CZ sein und keinen Schlaf brauchen?

3.  Was plane ich für morgen?
    1.  Über dieses Eval-Agent-Modell nachdenken und das Multi-Agent-System weiter iterieren.
    2.  Clustersicherheit – muss gemacht werden.
    3.  `legion-github-bridge`.

### 2026-01-25

Heute war ich beim Friseur. Als ich zurückkam, war das System instabil. Es stellte sich heraus, dass `鸡哥` zwei Dienste mit derselben `terminal<sub>id</sub>` gestartet hatte, die sich gegenseitig blockierten und große Probleme verursachten.

1.  Was habe ich heute gemacht:
    1.  Versucht, den Cluster hinter einen NAT zu migrieren – natürlich mit Hilfe des neuen `legion`. Meine Vorgehensweise:
        - Zuerst den kops-Cluster modifiziert, ein neues VPC erstellt, mit den Netzwerken 172.21.0.0/24 und 172.21.1.0/24. Dann einen NAT für den ausgehenden Traffic erstellt.

          Ursprünglich wollte ich ein 10.0.-Netzwerk verwenden, aber AWS ließ das nicht zu. Also wechselte ich zu 172.21. Hier gab es eine Falle: In der Cluster-Ressource musste der bestehende Loadbalancer manuell dem neuen VPC zugewiesen werden (vorher war es implizit das Standard-VPC, mit einem zusätzlichen CIDR muss man es explizit angeben).

        - Dann eine neue Instance Group erstellt, die auf das neue VPC zeigt. Kleine Zwischenfälle: Die neue IG hatte keine S3-Berechtigungen – keine Ahnung warum. Nach manueller Hinzufügung traten die Nodes dem Cluster normal bei.

        - Nächster Schritt: Dienste manuell in die neue IG migrieren.

        - Schließlich die alte IG herunterfahren.

        Nachdem alles fertig war, hatte der Cluster nur noch eine einzige ausgehende IP-Adresse, was unsere Dienste, die auf IP-Rate-Limiting angewiesen sind, ziemlich durcheinanderbrachte. Leider musste ich einen Rollback durchführen. Zuerst muss ich das HTTP-Proxy-Feature implementieren, bevor ich weitergehen kann.

    2.  Das Multi-Agent-System wurde praktisch eingesetzt, um ein Skript zur automatischen Aktualisierung der `midas`-Nettovermögen zu erstellen. `deepseek` hat lange daran gearbeitet, und ich war ziemlich zufrieden. Ein Kernproblem dabei ist: Wenn ich einen Fehler im frühen Design nicht bemerke, kostet mich das eine Menge Tokens und Zeit, denn die Agents arbeiten nicht gerade schnell.

        Derzeit sind diese Coding-Agents noch ziemlich primitiv. Sie brechen oft aufgrund von Netzwerkproblemen o.ä. ab. Sie für ernsthafte, lang laufende Arbeiten einzusetzen, ist noch etwas unzuverlässig (SLI ist niedrig). Das ist aber auch eine Chance. Auf den ersten Blick erfordert das Wissen aus der Softwareentwicklung über Hochverfügbarkeit etc.

2.  Gedanken:

    Heute hatte ich weniger Gedanken, die ich bereits oben eingefügt habe.

3.  Was plane ich für morgen?
    1.  Den HTTP-Proxy-Mechanismus für `Yuan` entwerfen.
    2.  Nach dem Deployment den Cluster erneut migrieren.

### 2026-01-26

Heute war ein Tag der Zurückhaltung. Ich habe festgestellt, dass ich nach meinem 25. Lebensjahr einen deutlichen Fortschritt im Umgang mit Emotionen gemacht habe: Neben der Emotion selbst gibt es jetzt einen klaren Funken Vernunft, der als Copilot fungiert. Dieser Funke setzt eine Art Kontrollstange in den riesigen emotionalen Reaktor. Ohne diese Stange würden die Emotionen außer Kontrolle geraten, eine selbstverstärkende Kettenreaktion auslösen und möglicherweise unzählige unumkehrbare Folgen haben. Unter dem Einfluss dieser Stange beginne ich zu verstehen, was man sagen kann und was nicht, was man tun kann und was nicht, welche Entscheidungen getroffen werden können und welche nicht. Das ist eine erfreuliche Veränderung in mir.

1.  Was habe ich heute gemacht:
    1.  Heute habe ich mit `legion` das Design und die Implementierung des HTTP-Proxys für `yuan` erstellt. Ich finde, es lief ziemlich reibungslos. Unterwegs habe ich sein Design überprüft, einen Punkt (wie man einen verfügbaren Terminal auswählt) modifiziert und dann den Agenten machen lassen. Das Ergebnis war ziemlich gut.
    2.  Ich habe auch mit `legion` eine automatische Aktualisierung für `midas` erstellt, aber die KI hat es ständig schlecht gemacht, meine Anforderungen nicht richtig verstanden und die Verwendung von `@yuants/protocol` nicht korrekt umgesetzt. Ich habe einige Verdachtsmomente: Die Intelligenz der KI reicht nicht aus (`deepseek` scheint nicht sehr klug zu sein); das Review war nicht streng genug; oder die Dokumentations-Wissensbasis ist nicht streng genug.
    3.  Verdammt, nachts wurde ich durch einen Alarm geweckt. Ein Host war plötzlich ausgefallen. Es scheint einen CPU-Spitzenwert gegeben zu haben, der den Host in einen Zustand versetzt hat, aus dem er sich nicht selbst erholen konnte. Die Logs des Hosts sind ein Haufen Mist. Mein Urteil: Der Alarm ist nützlich, die Logs sind Schrott. Notiert!

2.  Gedanken:
    1.  Beim Duschen habe ich über den kritischsten Punkt in der Zusammenarbeit zwischen mir und der KI nachgedacht. Einerseits die Serviceverfügbarkeit des KI-Agents selbst – dass er nicht mitten in der Arbeit abstürzt oder so. Übrigens, `ralph loop` erhöht die Verfügbarkeit im Grunde durch grobes ständiges Wiederholen. Der andere Punkt ist, wie ich die Ausgabe der KI annehme. Selbst wenn ein Mitarbeiter seinem Vorgesetzten berichtet, braucht er eine PowerPoint oder sogar einen professionellen mittleren Manager als "teuren Sprachrohr". Wie kann sich die Berichterstattung der KI an den Menschen auf flaches Markdown und Code beschränken? Könnte jeder Punkt in einem KI-Report mit einem Artefakt verlinkt sein? Könnte es einen "Citation Agent" geben, der speziell für diesen Teil zuständig ist?

        Allerdings ist meine derzeitige Verwendung der KI ziemlich eingeschränkt, hauptsächlich auf Codierungsaufgaben.

    2.  Überlegen wir genau, warum mein Multi-Agent-System, nachdem ich es aufgebaut habe, stabil in Richtung eines Scheiterns steuert. In den vorherigen Überlegungen wurden grob drei Möglichkeiten erwähnt:
        1.  Das intellektuelle Niveau der KI selbst.
        2.  Das menschliche Review war nicht streng genug.
        3.  Die Wissensbasis ist nicht detailliert genug, um korrektere Informationen für einen schnellen Start der KI bereitzustellen.

        Lassen Sie uns diese Punkte genauer betrachten. Punkt 1 muss nicht weiter bedacht werden. Sich in Richtung 2 anzustrengen, würde tatsächlich auf ein immer detaillierteres RFC-Dokument setzen, um den nachfolgenden Schritten eine ausreichend korrekte Richtung zu geben. Aber diese Art der Entwicklung ist, als wären wir zum **Wasserfallmodell** zurückgekehrt, Arbeit durch einen linearen Prozess zu erledigen:

        ```text
        Anforderungsanalyse -> Backend-Design -> Backend-Entwicklung -> Frontend-Entwicklung -> Integrationstests
        ```

        Die Gründe dafür gibt es auf zwei Ebenen: der technischen und der organisatorisch-prozessualen Ebene, wobei die organisatorisch-prozessuale Ebene der *Hauptfaktor* ist.

        Auf der technischen Ebene gibt es natürliche Abhängigkeiten zwischen Aufgaben, z.B. muss das Frontend auf Backend-Schnittstellen warten, um mit der Entwicklung zu beginnen; das Backend muss warten, bis das Produkt-CRD geschrieben ist, um zu starten.

        In menschlichen Organisationen hat das Wasserfallmodell Probleme: Ineffizienz, Qualitätsrisiken, die schwer aufzudecken sind, mangelnde Flexibilität, Teamkonflikte usw. In der Zusammenarbeit zwischen mir und der KI existieren Effizienz und Teamkonflikte von Natur aus nicht in der Welt der KI. Es ist, als ob ich und die KI in zwei verschiedenen Zeitdimensionen leben – ein Tag für mich ist wie ein Jahr für die KI. Nun, Ineffizienz könnte mehr Tokens kosten, aber das ist derzeit nicht mein Hauptproblem. Was ich tatsächlich erlebe, sind Qualitätsrisiken durch Missverständnisse von Anforderungen oder Fakten, und mangelnde Flexibilität.

        Ich muss einen Weg finden, die Fähigkeiten der KI maximal zu nutzen und mich gleichzeitig maximal zu befreien. Nach den Erfahrungen der menschlichen Organisation muss ich zu einem höheren Knoten im Befehlsbaum werden, der Dinge der KI anvertrauen kann, ohne dass sie vom Kurs abkommt.

        Die beiden entscheidenden Punkte sind:
        1.  Absichtsausrichtung (Intent Alignment)
        2.  Schichtweise Validierung (Layered Verification)

        Darüber muss ich noch tiefer nachdenken. Ich habe das Gefühl, ich muss es mehr nutzen, um ein Gefühl dafür zu bekommen.

    3.  Ich muss mich vor der schlechten Seite meines Zustands hüten, mit dem Hammer nach Nägeln zu suchen: Pfadabhängigkeit, Output über Verständnis.

3.  Was plane ich für morgen?

    Morgen kommt `zl`. Geplant sind Training, Essen und Brettspiele.

### 2026-01-27

`zl` ist da, die Informationsmenge ist groß, ich muss sie erst verdauen. Brettspiele gespielt, "Tragic Loop". Wir haben drei Stunden damit verbracht, die Regeln zu verstehen, und erst im letzten Szenario, in dem ich den bösen Dramatiker spielte, habe ich den Sweet Spot des Spiels gespürt. Das Spiel endete mit meinem vollständigen Sieg.

### 2026-01-31

Die letzten Tage waren ziemlich voll, daher habe ich nichts aufgezeichnet. Aber das Aufzeichnen einzustellen geht nicht, also hole ich es jetzt nach und fasse zusammen.

Abgesehen von der vielen Arbeit – warum habe ich nicht aufgezeichnet?

1.  Weil ich Angst hatte, dass das Aufzeichnen bedeutet, sich hinzusetzen und mindestens 30 Minuten speziell dafür aufzuwenden, einen Tag zusammenzufassen. Das liegt daran, dass ich eine gewisse Angst und Belastung gegenüber der täglichen Aufzeichnung entwickelt habe, was nicht gut ist.
2.  Normalerweise möchte ich erst am Ende eines Tages mit der Aufzeichnung beginnen, aber wenn ich genau darüber nachdenke, ist das etwas unmenschlich. Denn ich gehe jetzt meistens ins Bett, sobald es Zeit ist, schnell unter die Decke zu schlüpfen, und nicht, weil ich alles, was ich tun wollte, wirklich erledigt habe (gibt es das überhaupt?). Das führt dazu, dass ich in freien Momenten nicht aufzeichne, und wenn es wirklich Zeit zum Aufzeichnen ist, muss ich schnell ins Bett. Zusammen mit Problem 1 wird es immer mehr.

Die Kombination dieser beiden Dinge hat sich angestaut.

1.  Was habe ich heute gemacht:

    > Korrektur: Was habe ich in den letzten Tagen gemacht?
    1.  Auf Anraten von `sc` habe ich begonnen, `neovim` zu verwenden. Warum? Ich habe gesehen, dass `nvim-orgmode` anscheinend wirklich ein brauchbarer org-mode geworden ist, und gleichzeitig begann ich, mich von `emacs` zu langweilen:
        - Endlose Update-Fehler
        - Verwirrendes Debugging und Fehlermeldungen
        - Flexibilität, die für mich nur Belastung ist und keinen Nutzen bringt
        - Ich verstehe `emacs-lisp` nicht und will es auch nicht verstehen

        Jahrelang habe ich das alles ertragen, um org-mode zu nutzen, aber es gab nirgendwo sonst eine gute Alternative für org-mode. Jetzt scheint das `nvim`-Lager eine brauchbare Alternative zu haben – warum es nicht ausprobieren?

        Da ich seit Jahren ein `vim`-Nutzer bin und auch in `emacs` `evil-mode` (`vim-mode`) verwendet habe, habe ich nie das Gefühl, dass die Verwendung von `vim` eine große Belastung wäre. In `vscode` und `idea` kann ich ohne `vim` nicht überleben, daher ist die direkte Verwendung von `nvim` für mich überhaupt kein Problem.

        Da das Hindernis also weg ist, habe ich mir das `nvim`-Ökosystem angesehen. `nvim` hat, da es keine Altlasten von `vimscript` hat, direkt `lua` als Konfigurations- und Plugin-Sprache übernommen. Es kann also leicht auftreten, und die Community ist sehr aktiv. Ich sehe, dass das Plugin-System von `neovim` jetzt auch von einem System namens `lazy.vim` vereinheitlicht wurde. Das Design des Plugin- und Konfigurationssystems von `nvim` scheint organisiert und geplant speziell gegen die Schmerzpunkte von `vim` mutige Innovationen vorgenommen zu haben. In `vim` & `emacs` gab es wahrscheinlich unzählige ähnliche Versuche, die alle scheiterten, weil die Community zu fragmentiert war.

        Also habe ich direkt `lazyVim` ausprobiert. Wow, jetzt habe ich das Gefühl, direkt eine `vscode` zu besitzen, und diese `vscode` kann im Terminal laufen – weißt du, wie geil das ist?

        Jetzt habe ich einen mächtigen alten Herrscher auf einer brandneuen Infrastruktur, und seine Konfiguration ist extrem einfach, Flexibilität und Bequemlichkeit sind genau richtig konvergiert, meine alten Schmerzpunkte sind im Wesentlichen alle gelöst.

        Ich habe kaum Zeit gebraucht, um viele Workflows darauf umzustellen. Ich verwende jetzt `tmux`, öffne 5 Windows, und in jedem Window öffne ich `nvim` in einem Ordner. In `nvim` ist links der Verzeichnisbaum, in der Mitte der Code, rechts `opencode` und das Terminal.

    2.  Eine neue Version von `legion` veröffentlicht. Ich habe den Textumfang des `legionmind`-Skills erheblich reduziert (von 4k Zeilen). Derzeit habe ich das Gefühl, dass ich mich um weniger kümmern muss, aber ich weiß nicht, ob es daran liegt, dass ich in letzter Zeit klügere Modelle verwendet habe oder ob diese Version von `legionmind` wirklich klüger geworden ist.

    3.  Ein `openclaw` aufgesetzt. `minimax 2.1` ist immer noch etwas dumm, aber als persönlicher Assistent finde ich `openclaw` ziemlich gut, denn es ist im Grunde ein `chatgpt` mit Gedächtnis + Händen und Füßen (kann meinen Computer bedienen).

    4.  `Yuan` um HTTP-Proxy-Funktionalität erweitert, Metriken hinzugefügt usw.

2.  Gedanken

    Manchmal habe ich das Gefühl, dass das Schreiben von Dingen mit KI ein bisschen wie das Debuggen von Code ist, dessen Prinzipien man nicht ganz versteht – durch ständiges Testen seines Verhaltens oder das Ausgeben von Logs, um beim Debuggen zu helfen, hier ein bisschen ändern, dort ein bisschen hinzufügen, bis man schließlich ein zufriedenstellendes Ergebnis erhält. Lassen Sie uns über den Ursprung dieses Gefühls nachdenken:

    Bei der Verwendung von KI zum Schreiben von Code ist der Prozess im Wesentlichen, dass ein Mensch einen Prompt eingibt, der einige spezifische Anweisungen enthält, und dann hofft, dass die KI die impliziten Anweisungen und Informationen hinter diesen Anweisungen versteht und die Arbeit korrekt erledigt.

    Die Anweisungen, die man der KI vermitteln möchte, können geschichtet werden: Die oberste Ebene sind die Anweisungen für die aktuelle Aufgabe. Darunter stehen einige technische Entscheidungen, die für dieses Softwareprojekt getroffen wurden, Best Practices, die nach Abwägung von Vor- und Nachteilen für einen lokalen Teil des Projekts geeignet sind. Die nächste Ebene sind Hintergrundinformationen zur Problemdomäne, die das Projekt lösen soll. Die nächste Ebene ist das eigene Fachwissen des Softwareingenieurs, der die KI verwendet – seine persönlichen Vorlieben, technischen Präferenzen, Stilpräferenzen, historischen Erfahrungen, Denkweisen. Die unterste Ebene ist das Weltwissen.

    In einem Dialog mit der KI kann nur die Anweisung für die aktuelle Aufgabe klar und deutlich vermittelt werden, und dann hofft man, dass die KI über ausreichend Weltwissen und Hintergrundinformationen zur Problemlösung verfügt.

    Daraus lässt sich schließen: Wenn der Kontext einer Aufgabe klein genug ist, die gegebenen Anweisungen absolut klar sind und es keine historischen Altlasten gibt, sollte die KI die Aufgabe leicht in hoher Qualität erledigen können. Wenn es viele implizite Hintergrundinformationen gibt, kommt es leicht zu seltsamen Ergebnissen.

    Was `Legionmind` tun muss, ist, der KI zu ermöglichen, selbst Hintergrundwissen und Best Practices bezüglich dieses Projekts und der Problemdomäne zu sammeln. Das erfordert, dass die KI entweder über gute logische Denkfähigkeiten und ein gutes Gedächtnis (Kontextkapazität) verfügt oder dass die KI selbst über umfangreiches Weltwissen verfügt. Was darüber hinausgeht, kann nicht gerettet werden.

    —

    Und dann finde ich, dass `nvim` wirklich eine späte Liebe ist.

3.  Was plane ich für morgen?

    Morgen gehe ich zu `sc` nach Hause, um sein neues Zuhause zu besichtigen, dann spielen wir zusammen Brettspiele und schauen nebenbei Schneeausrüstung für `sy` an.

### 2026-02-01

Bin zu "Cold Mountain" gegangen, um `sy` Skischuhe anzuschauen. Fußlänge gemessen (245) und einen bequemen Schuh anprobiert. Leider war die schöne Farbe bei Cold Mountain ausverkauft, also muss `sy` online kaufen.

Mittags bei `sc` zu Hause gegessen, was er gekocht hat. Er hat ein Sous-Vide-Gerät für Steaks, das wirklich zartes Fleisch produziert. `sc` hat eine Room-Tour-Rätseljagd für uns vorbereitet. Es gab zwei Hinweise: Der erste Hinweise führte zu 4 Orten, um 4 englische Wörter/Sätze zu finden, die mit einem Indexcode zu einem Wort kombiniert wurden: "Three". Der zweite Hinweis kam aus einem Umweltpuzzle, am Ende erhielt man die Zahlen 31 / 13 (ich erinnere mich nicht genau) und konnte aus einer Schublade mit vielen nummerierten kleinen Kästchen eine Schokolade holen.

Leider hatte er keine Schokolade mehr, wir bekamen einen süßen Aufkleber.

—

Der Nachmittag mit Brettspielen war sehr interessant, das Hauptspiel war natürlich "Die Landesherren". Am Ende errang `sc`, der die Mittelschicht spielte, einen beispiellosen Sieg – das erste Mal in unserer Spielgeschichte, dass die Mittelschicht gewann. `pgw`, der die Bourgeoisie spielte, war sauer, weil `小耗子`, der die Regierung spielte, bei zwei für `pgw` entscheidenden Abstimmungen über politische Reformen nicht geholfen hatte. Ich spielte die Arbeiterklasse und hatte natürlich bei den meisten Themen keine gemeinsamen Interessen mit der Bourgeoisie, konnte also nicht helfen. Tatsächlich lagen am Ende des Spiels außer `pgw` unsere drei Punkte sehr eng beieinander. Eine Welt, in der nur der Kapitalist verletzt wurde.

Dieses Spiel ist wirklich großartig und wurde zu meinem Lieblingsbrettspiel. Es hat beträchtliche Spieltiefe, die Spielweise jedes der vier Spieler ist sehr unterschiedlich, und jedes Mal, wenn man eine andere Rolle spielt, ist es ein völlig anderes Spielerlebnis. Diesmal zum Beispiel, als ich die Arbeiterklasse spielte, gab es zum ersten Mal einen Überschuss an Arbeitslosen (weil Regierung und Bourgeoisie keine neuen Unternehmen gründen wollten), der die Bedingungen für einen Arbeiterprotest erreichte. Die Arbeiterklasse ging auf die Straße und drohte, das Land umzukrempeln. Die konkrete Wirkung war, Einflusswürfel zu erhalten und den anderen Klassen insgesamt (Anzahl der Arbeitslosen - 2 + Anzahl der Gewerkschaften) Punkte abzuziehen.

Wie erwartet, wollten Regierung und Bourgeoisie, die früher von der Arbeiterklasse gebeten und angefleht wurden, neue Unternehmen zu gründen, jetzt plötzlich alle neue Unternehmen gründen, was das Spiel sofort belebt hat. Am Ende belegte ich mit 101 Punkten den zweiten Platz in diesem Spiel.

### 2026-02-02

Heute nach dem Training habe ich mich entspannt und nichts gemacht.

1.  Was plane ich für morgen?
    1.  Alles HTTP-Proxy-Zeug zum Laufen bringen, den Cluster in Ordnung bringen.
    2.  `org-mode.nvim` in Ordnung bringen.
    3.  Den "Transit Point" untersuchen.

### 2026-02-05

Lasst mich meinen Tag festhalten! Heute mit einem anderen Format.

1.  chatgpt pro

    Am Freitag habe ich mich entschieden, auf dem allmächtigen "Xianyu" (闲鱼) ein `chatgpt pro` zu kaufen, für 1369 CNY. Ich sah, dass das günstiger als 200 USD war, und kaufte schnell. Es dauerte bis Dienstag, bis es fertig war. Er gab mir ein Outlook-Postfach und ein `chatgpt`-Konto, das an diese E-Mail gebunden war.

    Als ich mich im Outlook-Postfach anmeldete, sah ich eine `chatgpt`-Rechnung, bezahlt
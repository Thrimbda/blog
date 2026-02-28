---
title: 2020 Arbeitsprotokoll
date: 2020-01-01
taxonomies:
  tags:
    - Arbeitsprotokoll
    - Monatszusammenfassung
    - Technik
---

### 2020-04-13

- Leistungsbeurteilung (Self-Assessment) abgeschlossen
- Überarbeitung der Lane Center Aggregation

### 2020-04-14

- [ ] Geschwindigkeitsbegrenzungskompilierung
- [ ] Benutzerdefinierte Geschwindigkeitsbegrenzung

### 2020-04-15

- Benutzerdefinierte Geschwindigkeitsbegrenzungsstrategie festgelegt @guangcong
  1.  Verwenden eines neuen `module-dynamicEvent`, um dieses Problem zu lösen
  2.  Aktualisierung der benutzerdefinierten Geschwindigkeitsbegrenzung als neues Ereignis, das die Aktualisierung der Horizon-Daten auslöst
  3.  Ausnahmebehandlung und Speicherprobleme müssen berücksichtigt werden
      Nach der Diskussion mit Guangcong stieß dieser auf einige Probleme
- Xiaokang Review
  Java als solide Sprache hat doch einiges zu bieten
- Geschwindigkeitsbegrenzungskompilierung
  Kaum Fortschritte, Logik zur Extraktion von `RoadCenterTile` hinzugefügt
- Sectioning-Problem gelöst, EdgeLifting-Optimierungsansatz analysiert, Optimierungsalgorithmus vorgeschlagen:
  Gegeben Startpunkt der Traversierung und Konnektivitätsfunktion, wird die Traversierungsmethode angegeben
- Prinzip des selbstausführenden JARs untersucht

### 2020-04-16

- Mit Yiming die Schnittstelle für benutzerdefinierte Geschwindigkeitsbegrenzungen abgestimmt: Er garantiert, dass das eingegebene Location-Paar eindeutig eine kürzeste Route bestimmt
  Nach der Rückkehr mit Guangcong den Algorithmus zur Erzeugung benutzerdefinierter Geschwindigkeitsbegrenzungen durchgearbeitet
  1.  Gegebene Route
  2.  Bekannt: | start `DiRoadOnPath::count` - end `DiRoadOnPath::count` | ≤ 1
      Dann kann definitiv ein Paar (start `DiRoadOnPath`, end `DiRoadOnPath`) gefunden werden, das den kürzesten Abstand hat
- Xiaokang eine nutzbare Schnappschussversion des Pylon-v0.1.1-Compilers zur Verfügung gestellt
- Mit Hanteng nach unten gegangen, herumgelaufen und gequatscht
- Mit Zizhe und Yicheng die SUMO-Kartenschnittstelle abgestimmt
- SpeedLimit-Kompilierung erfolgreich, aber noch nicht verifiziert

### 2020-04-17

- SpeedLimit-Kompilierung verifiziert:
  `OSMSerializable` funktioniert nicht gut, da gebundene SpeedLimits keine Geometry haben
  Mögliches Problem: Geschwindigkeitsbegrenzungsbindung bei Auffahrten könnte Probleme verursachen
- [ ] Interpolation
- [ ] Hausdorff-Distanz
- [ ] LcInJunctionTile

#### Einige verrückte Ideen

- Direkt mit Spark anfangen?
- Was braucht der OSM-Kontext?

### 2020-04-18

Geschwindigkeitsbegrenzungen abgeschlossen

### 2020-04-20

#### Benutzerdefinierte Geschwindigkeitsbegrenzung

- Guangcong hat die Eingabe in einen Vektor umgewandelt, Tests hinzugefügt
- Ein kleines Problem: Guangcong versteht das Wirkprinzip von C++-Zeigern nicht wirklich
- [ ] Vielleicht versuchen, [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337) zu lösen?
- [ ] Die vom Onkel geteilten Dateien anonym über Resilio Sync teilen

#### RoadBorder-Reparatur

Festgestellt, dass ich eine falsche Annahme gemacht habe. Die in `rc` aufgezeichneten `lc`- und `rb`-Informationen könnten folgendes enthalten:

1.  Es gibt nur ein `lc`, daher kann nicht angenommen werden, dass es mindestens zwei `lc` gibt
2.  `rb` auf einer Seite könnte nicht existieren, daher kann nicht angenommen werden, dass `rb` immer existiert

### 2020-04-21

#### RoadBorder-Reparatur

- Migration der Testfälle abgeschlossen
- Dune und dessen ReadMe verbessert, sodass es direkt Testdaten ausgeben kann
  Mit Weiyu gesprochen, Zukunftsperspektiven besprochen, ich konzentriere mich auf das Kompilierungssystem

#### POI-Bindung für Gegenfahrbahnen

- Binding der nach `multidigitize` verarbeiteten Daten

### 2020-04-22

#### POI-Bindung für Gegenfahrbahnen

- Binding der nach `multidigitize` verarbeiteten Daten
- Testdaten konstruiert

### 2020-04-23

- POI-Bindung für Gegenfahrbahnen abgeschlossen und Debugging beendet [4]

### 2020-04-27

Heute hauptsächlich folgende Punkte:

#### Synchronisierung von mdm proto und mdm spec abgeschlossen

1.  Mit Linnan zusammen fehlerhafte Teile in der mdm spec von Ruoganchu korrigiert
2.  Einige offene Punkte hinterlassen, die Linnan und ich nicht alleine entscheiden konnten
3.  In der Morgenbesprechung am 2020-04-26 beschlossen, die schwierigsten Änderungen an `LaneSplitMerge` und `Polyline` zu verschieben
4.  Änderungen am proto abgeschlossen
5.  Änderungen am nexus abgeschlossen
6.  Änderungen am mdk abgeschlossen
7.  Nebenbei ein Problem mit Testdaten behoben (ständige Fehlermeldungen)

#### Bugfixes

Kurz vor dem 430-Release ist die Anzahl der Bugs stark angestiegen

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analysiert

- [ ] Skript zum automatischen Kopieren von Testfällen
- [ ] Apple Reminder exportieren

### 2020-04-28

Theoretische Führerscheinprüfung (Kategorie 1) hat einen halben Tag gedauert

HDMAPMDK-1130 Breitenproblem, drei Probleme:

1.  Spec legt fest, dass beim Spurwechsel keine Fahrstreifenbreite vorhanden ist
2.  Zu lange Intersection-Linien führen zu Split-Line

HDMAPMDK-1121 erneut repariert

Sehr schlechter Zustand

### 2020-04-29

#### Bugfixes

- HDMAPMDK-1143
  Problem, dass `RoadObstacle` nicht kompiliert wurde
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Mill verwenden
- `nexus-osm` verwenden

#### Brainstorming

### 2020-05-08

#### Speicherleck-Problem

- Die direkte Ursache für das Speicherleck war, dass nach dem `new` eines Wildzeigers kein `delete` erfolgte
- Nach dem `update current position` ruft das Map Kit `prepareGuidanceData` auf, um die nächstgelegenen Guidance-Daten zur aktuellen Position zu finden
- `prepareGuidanceData` ruft `NavInfoProviderImpl::getTrafficLights` & `NavInfoProviderImpl::getCarParks` auf
- Am Beispiel von `NavInfoProviderImpl::getTrafficLights`: Beim Aufruf werden Datenzeiger in `NaviEventOnPath` mit `new` erzeugt
- Es erfolgt jedoch kein `delete`
- Es wurde festgestellt, dass `DestEvent` das gleiche Problem hat

Lösung: Der Kern liegt darin, die Existenz von Wildzeigern zu verhindern. Es wurde beschlossen, `NaviEventProvider` zu refaktorisieren.

- Zuerst zwei Felder `traffic_light_events` & `car_park_events` in `NaviInfoProvider` hinzufügen
- In `NaviInfoGenerator` diese beiden Felder nach einem `route updated` aktualisieren
- Dann bei jedem `get` basierend auf der aktuellen Fahrzeugposition filtern
- Daher muss `PathReader::getAttributes` refaktorisiert werden, da die vorherige Implementierung nur den Offset relativ zum aktuellen Fahrzeug berücksichtigte. Jetzt wird eine Schnittstelle für den Offset relativ zum Pfad benötigt.

### 2020-05-09

#### PolyLine-Reparatur und Tests

Das Hauptproblem bei `PolyLine` besteht darin, dass beim Erzeugen der `PolyLine` möglicherweise doppelte Punkte hinzugefügt werden, was zu einer Reihe von Problemen bei geometriebezogenen Segmentberechnungen führt:

1.  Vektorberechnung: Zwei doppelte Punkte ergeben einen Nullvektor
2.  Längenberechnung: Segmentlänge ist 0, was leicht zu NaN-Problemen führt

Daher wird beim Konstruieren einer `PolyLine` eine Prüfung der Punkte in der `PolyLine` durchgeführt. Wenn doppelte Punkte gefunden werden, wird eine Ausnahme ausgelöst.

Folgende Probleme wurden entdeckt:

- Problem mit `getEnd` in Jts
- Jts `LinearLocation` kann ein Normalisierungsproblem haben

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // die Ausgabe ist -1
  ```

- Beim Interpolieren könnten zwei zu nahe beieinander liegende Punkte genommen werden

### 2020-05-11

- HDMAPMDK-1122
  Problem des fehlenden Straßenrandstreifens konnte nicht reproduziert werden, beschlossen, keine weitere Zeit für die Untersuchung der Ursache aufzuwenden
- Eine halbe Stunde "Metabolic Growth Theory"
- Visitor refaktorisiert, damit er Linien mit gleichem Start- und Endpunkt unterstützt
- Eine Interviewfrage vorbereitet

### 2020-05-12

- Interview: Beide Kandidaten ungeeignet, darüber nachgedacht, wie man Kandidaten schnell einschätzen kann, dauerte 3 Stunden
- Bugfix: HDMAPMDK-1211 Problem mit falsch gelöschtem Border, bei der letzten Reparatur nicht erfolgreich behoben
  Hatte eine Idee, aber nicht zu Ende geschrieben
- War zum Sport

### 2020-05-13

Bugfix: HDMAPMDK-1211 Lösungsidee gefunden

- Grundursache war eine unangemessene Aufteilung der Produktionslinie

#### Ursachenanalyse

Es ist zu sehen, dass die Aufteilung erfolgte, bevor der Spurwechsel abgeschlossen war (die Fahrstreifenmittellinie überquerte noch die Fahrstreifenlinie), und diese Aufteilung möglicherweise Rp überspannte.

Da die an den Formpunkten des `lanecenter` anhaftenden `lane border`-Beobachtungsinformationen die seitlichen Fahrstreifenlinien basierend auf der Geometrie treu mithilfe der Scan-Line-Methode aufzeichnen, ohne sie basierend auf der Semantik zu filtern, wird an der Position, an der die Fahrstreifenlinie die Fahrspur überquert, die die Fahrstreifenlinie schneidende Fahrstreifenmittellinie diese Fahrstreifenlinie gleichzeitig in den linken und rechten `lane border ref` aufzeichnen.

Gemäß der bestehenden Code-Logik schlägt die Filterung der `border ref` der sich schneidenden Fahrstreifenlinien basierend auf der Semantik fehl, wenn sie auf diese Art von Aufteilung trifft, was zu diesem Problem führt.

#### Lösung

Der Kernpunkt liegt darin, **den Trend des sich schneidenden Fahrstreifenlinienwechsels zu finden**. Da diese Art von Aufteilung Rp überspannen kann, sollte die Filterung nicht pro Rp-Einheit erfolgen.

1.  Zuerst die Fahrstreifenlinien mithilfe von `edge lifting` in einen Pfad organisieren (kann für die zukünftige Graph-Rekonstruktion in Betracht gezogen werden): `Seq[LaneCenter]`
2.  Den zu korrigierenden `LaneCenter` und den zu korrigierenden `lane border` finden (hier wird angenommen, dass dieser `LaneCenter` definitiv durch einen Spurwechsel verursacht wird)
3.  Den Spurwechseltrend dieses `LaneCenter` basierend auf dem `laneCenter`-Pfad berechnen
4.  Filterung durchführen

An Ziliang übergeben.

Ein Interview, die Person hat nicht bestanden.

### 2020-05-14

HDMAPMDK-1132 ID-Tracing für Endpunkte von Schildmast-Fahrstreifenlinien

Das Tracing-Problem für Endpunkte von Schildmast-Fahrstreifenlinien ist im Vergleich zum Tracing linearer Objekte sehr einfach, es gibt nur eine ID-Abbildung, keine Offset- und Längenabbildung.

Es sind jedoch einige Überlegungen anzustellen:

1.  Verfahren
2.  Das ID-Typisierungssystem ist ein hartnäckiges Problem, das angegangen werden muss

Im Wesentlichen liegt die Wurzel dieses Problems darin, dass wir bei der Definition von IDs durchgängig Long-IDs verwendet haben, während die MDM-Definition Int verwendet, was möglicherweise zu Überlaufproblemen führt.

### 2020-05-15

#### Bugfixes

- HDMAPMDK-1215 abgeschlossen
- HDMAPMDK-1218 erledigt

### 2020-05-18

`OSM Assembler` refaktorisiert, verwendete die vorherige `OSM serialize`, die Verständlichkeit und Schreibbarkeit des Codes haben sich verbessert

### 2020-05-19

Einen Bug im `OSM Assembler` gelöst (eigentlich kein Bug)

Heute Sprint-Planning-Meeting:
In diesem Sprint gibt es nicht viel zu tun, aber es gibt viel zu überlegen. Das ist ein gesunder Zustand.

### 2020-05-20

- [ ] Dokumentation schreiben, die den aktuellen Status von `nexus/mdk` CI und die Anforderungen beschreibt.
- [x] HDMAPMDK-1263 Bug verfolgen
  - Es handelt sich tatsächlich um ein Problem mit der Aufteilung der Produktionslinie
- [ ] Mit Yangchuan ein CI-Meeting vereinbaren
- [ ] HDMAPMDK-1262
      Nicht fertig geworden
- [x] Problem mit benutzerdefinierter Geschwindigkeitsbegrenzung

### 2020-05-21

#### TODOs

- [x] Qiaobo grüßen
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### Arbeiten

- Morgens im Arbeitsbereich von Yiming online den Hotfix von gestern debuggt, Ergebnis war ein Offset-Problem. Gestern zu hastig geschrieben und überhaupt keine Tests hinzugefügt, dieses Verhalten sollte nicht wieder vorkommen. Dachte, ich hätte viel Zeit gespart, **aber am Ende mehr Zeit verschwendet**.
- Der Grund, warum bei 1262 keine Daten abgerufen werden konnten, war, dass MDK keine Lane-Level-`road mark` (und `road obstacle`) geladen hatte.
- Bruder Du beim Kompilieren von Daten geholfen.

### 2020-05-22

Was habe ich an diesem Tag gemacht???
Was habe ich gemacht???

### 2020-05-25

Heute eine neue Aufgabe erhalten: HDMAPMDK-1249 - Untersuchung einer Methode zur Berechnung der Lane Aggregation unter Verwendung von Straßengeometrieinformationen. Dadurch sind die Aufgaben für diese Woche etwas mehr geworden. Bis jetzt habe ich noch drei Dinge zu erledigen:

1.  1249
2.  Aktueller Stand, Anforderungen und Lösungsansatz für die CI-Pipeline innerhalb der Gruppe
3.  Nexus-Graph-Rekonstruktion

Jede dieser Aufgaben erfordert sorgfältige Überlegungen und ist nicht einfach. Leider kann ich für keine der Aufgaben die Zeit genau abschätzen. Es sind nur die von Weiyu geschätzten und in den Story Points der Jira-Aufgaben festgehaltenen Schätzungen. Eines ist mir klar: **Wenn ich nicht anfange, selbst zu schätzen und zu reflektieren, werde ich es nie genau schätzen können**. Also werde ich von jetzt an genau schätzen.

Außerdem plane ich, heute mit 1249 anzufangen, da es sich um eine geschäftliche Angelegenheit handelt, die im Allgemeinen dringender ist und Weiyu mehr daran liegt. Was die Rekonstruktion betrifft, wenn ich mich nicht darum kümmere, wird es wahrscheinlich auch niemanden interessieren (weil es hart ist: Es beeinflusst nicht die Funktionalität, aber die Effizienz, und Effizienz ist am schwierigsten zu messen, selbst ich habe nur eine qualitative Analyse).

### 2020-05-26

Heute gab es viele unerwartete Vorkommnisse. Zuerst wurden zwei Bugs im Parking gemeldet, ursprünglich für heute geplant, aufgrund dieser Bugs konnte die Auslieferung nicht heute erfolgen. Wangwei hat mit den Downstream-Partnern vereinbart, die Auslieferung um zwei Tage auf übermorgen zu verschieben. Daher besteht meine Hauptarbeit in den nächsten zwei Tagen wieder darin, Bugs zu beheben. Das lässt mich über die Angemessenheit der Planung bei der Auslieferung nachdenken. Dann das Problem HDMAPMDK-1290.

Heute erledigte Dinge:

- Folge von HDMAPMDK-1290: Wenn man sich extrem nahe an der `stop line` befindet, kann der gematchte `lane offset` länger sein als die `lane length`

  > Habe den ganzen Tag damit verbracht, dieses Problem zu untersuchen und eine Lösung zu finden (aktuell 20:56 Uhr), sehr ineffizient.

  Der Grund liegt darin, dass MDK bei der Längenberechnung die Länge zwischen jeweils zwei Punkten berechnet und dann eine Koordinatentransformation durchführt. Obwohl dies genauer ist, führt es zu einer starken Unsicherheit im Ergebnis.

  Schließlich eine Art Hack-Lösung verwendet: Wenn der berechnete Offset länger als die Länge ist, wird nur die Länge genommen.

- HDMAPMDK-1297 Falsche Parkplatzbindung
  Obwohl es fast zur ursprünglich geplanten Feierabendzeit ist (21 Uhr), muss ich dieses Problem heute auf jeden Fall analysieren!
  Verdammt, geschafft. Es war ein einfaches Problem.

### 2020-05-27

Heute sollte ich, wenn nichts dazwischenkommt, die CI-Pipeline-Angelegenheit abschließen.

Es kam etwas dazwischen - -

Bugs von Yiming erhalten:

1.  Ampelbindung: Eine Ampel, die an der Wartezone hätte gebunden werden sollen, wurde an der Partition vor der Wartezone gebunden, bereits behoben (1,5h)
2.  Fehlende Ampelbindung: Konnte nicht reproduziert werden
    Update: Nach einer schwierigen Debugging-Runde endlich das Problem gefunden. Beim Kompilieren wurde für die Bindung von `rc` und `offset` nicht dieselbe Linie als Geometry verwendet, was zu einem Offset führte, der die Straßenlänge überschritt, daher konnte die Ampel nicht gefunden werden (2h)

### 2020-05-28

Morgen praktische Führerscheinprüfung (Kategorie 2), heute den ganzen Tag Fahrstunde, erst um 17 Uhr zurück. Fühlt sich gut an, hoffe, morgen zu bestehen.

Begonnen, den aktuellen Stand und die Anforderungsanalyse der CI-Pipeline zu beschreiben - -

### 2020-05-29

Habe nicht bestanden. Verdammt, das ist hart.

Morgens zur Prüfung, nachmittags ein paar Dinge erledigt:

1.  Bei Yiming eine abnormale Situation angeschaut, stellte sich als zwei Bugs heraus.
2.  Nach dem Townhall das MDK-Python-Binding besprochen.
3.  Mit Shanle und Weiyu nach unten gegangen, um ein Downstream-Problem zu lösen, schließlich ein kurzfristiges und ein langfristiges Lösungskonzept erarbeitet.

Ich habe festgestellt, dass bei unerwarteten Problemen die Lösungsmethode im Allgemeinen diesem Muster folgen sollte:
Eine kurzfristige Lösung und eine langfristige Lösung. Denn der Wert, den ein Problem offenbart, ist begrenzt und hat eine zeitliche Begrenzung. Daher zielt die kurzfristige Lösung darauf ab, die dringendsten Probleme schnell und präzise zu lösen. Braucht es dann noch eine langfristige Lösung? Im Allgemeinen ja, denn ein spezieller Fall eines Problems spiegelt einen blinden Fleck in der bisherigen Lösungsfindung wider, der nicht berücksichtigt wurde. In diesem Fall sollte die Ursache des Problems analysiert und systematisch gelöst werden, damit diese Art von Problem in Zukunft gut gelöst werden kann und die ursprüngliche Lösung vollständiger wird. Es gibt auch Fälle, in denen keine langfristige Lösung benötigt wird, nämlich wenn wir **nach gründlicher Analyse** zu dem Schluss kommen, dass der Aufwand für die systematische Lösung des Problems den Nutzen übersteigt. (Selbst in diesem Fall haben wir subjektiv oft den Drang, das Problem systematisch zu lösen. Als Ingenieur möchte doch jeder systematisch Probleme lösen? Aber das birgt auch eine Falle: Man könnte dazu verleitet werden, wichtige, aber nicht dringende oder weder wichtige noch dringende Probleme zu lösen und so wertvolle Zeit zu verschwenden, die für die Lösung anderer, wertvollerer Probleme hätte genutzt werden können.)

4.  Abends weiter an der CI-Pipeline gearbeitet.

### 2020-06-01

Heute morgen gleich zu Yiming gegangen, um ein Problem zu analysieren, den ganzen Vormittag analysiert. Ergebnis: Ein bekanntes Problem (Punktverlust durch Interpolation des alten Compilers) verursachte ein anderes Problem: Beim Routengreifen genau in der Nähe des fehlenden Segments, wodurch der `lane offset` negativ wurde.

Gearbeitet bis nach 16 Uhr, nach einer ineffizienten und qualvollen Nachtschicht (das Gefühl, dass Nachtschichten im aktuellen Zustand fast immer mit Ineffizienz einhergehen).

### 2020-06-02

Nachmittags gekommen, für Yimings Fahrt einige Bugs behoben, Yimings Abendfahrt noch erreicht.

### 2020-06-03

Heute morgen gleich zu Yiming gegangen, um das Problem zu lösen, das abends entdeckt wurde: Das Problem, dass Ampeln nicht abgerufen werden konnten.

### 2020-06-04

Heute morgen drei Dinge zu erledigen:

1.  Datenbereinigung und Upload der finalen 0605-Daten
2.  Breitenanomalie-Problem prüfen - Grund: An dieser Position gab es keine Fahrspur
3.  Problem prüfen, dass Interpolationspunkte der falschen Fahrspur zugewiesen wurden
4.  Überprüfung

### 2020-06-05

Ein aufregender Tag, HDMAPMDK-1347 und HDMAPMDK-1352 abgeschlossen, außerdem eine große Refaktorisierung durchgeführt.

Eine wertvolle Lektion gelernt: Kurz vor der Auslieferung keine riesigen Änderungen vornehmen, denn ohne ausreichende QA-Tests kann selbst die genialste Refaktorisierung Risiken bergen. Gleichzeitig, wenn nicht genug Zeit für ein Design-Review bleibt (ich meine für mich selbst, denn manchmal stellt man beim Schreiben fest, dass das Design vielleicht falsch ist – allerdings ist das Erkennen von Designproblemen während der Implementierung ein anderes Problem – nämlich zu früh mit der Implementierung zu beginnen).

Montag, Ergänzung:
Während dieser aufregenden Refaktorisierung hatte ich kaum eine Pause, nicht einmal Zeit zum Nachdenken, konnte mich nur auf Vertrautheit und Flow verlassen und mit hoher Effizienz Code schreiben. Eigentlich, wenn man das Prinzip, vor der Auslieferung keine großen Refaktorisierungen vorzunehmen, außer Acht lässt, genieße ich diesen Zustand sehr. Aber alles muss ein Ziel und einen Sinn haben, man kann nicht nur seinem eigenen Vergnügen nachgehen, sonst wird dieses Vergnügen zu einem niederen Vergnügen.

### 2020-06-08

Samstag nach Beijing gezogen, um zu arbeiten.

Die Rückkehr zur Arbeit in Beijing fühlt sich wirklich etwas ungewohnt an, alles hat sich verändert. Zuerst habe ich keinen festen Arbeitsplatz mehr (Xiuyun hat einen Praktikanten eingestellt, und damit er bequemer arbeiten kann, sitzt ihr Praktikant jetzt dort). Das ist das Unangenehmste an all den Enttäuschungen. Es ist, als wäre ich in der Oberstufe in die Klasse 1 gekommen, auf einem neuen Platz saß, niemanden kannte und auch nicht mit ihnen sprechen wollte. Die Leute hier wirken vertraut und doch fremd. Ich habe das Gefühl, hier wenige Freunde zu haben, was ich rational für eine Täuschung halte. Aber das Gefühl, nicht mit Menschen kommunizieren zu wollen, mich in eine Ecke zurückziehen zu wollen, ist real, und ich habe tatsächlich eine Ecke gefunden, neben Yuzhang. Warum will ich nicht mit Menschen kommunizieren? Ich verstehe das Problem immer noch nicht, vielleicht weil ich keinen guten Grund habe? Wenn ich gefragt werde, warum ich nach Beijing gekommen bin und wie lange ich bleibe, antworte ich ausweichend: eine Weile, ein oder zwei Monate; oder vielleicht zeigt es, dass ich im Grunde ein introvertierter Mensch bin, der keine Umstände mag und besonders darauf bedacht ist, in den Augen anderer nicht dumm zu wirken. Je mehr ich jedoch schreibe, desto mehr denke ich, dass der zweite Grund überwiegt und unnötig ist. Erstens: Dumm wirken ist besser als wirklich dumm zu sein, andere aufrichtig um Rat zu bitten, auch wenn es unbeholfen ist. Hab keine Angst, sei in jungen Jahren nicht ängstlich. Sei niemals ängstlich. Alles ist gut.

Und jetzt zur Arbeit: In dieser Zeit war die Auslieferung abgeschlossen, hauptsächlich die Refaktorisierung von TLM (Typed Lane Model). Diesmal muss ich das Ziel klar definieren, mich selbst kontrollieren, nicht impulsiv refaktorisieren, sondern strategisch vorgehen und meinen Fortschritt kontrollieren.

Außerdem habe ich meinen Desktop-Computer zum Laufen gebracht. Der Grund, warum er vorher keine Internetverbindung hatte, war, dass ich das Passwort geändert hatte. Nach einem Stromausfall war die Netzwerkverbindung komplett verloren. Also muss ich den Computer noch einrichten. Diesmal sind die Prioritäten:

1.  Produktivität
2.  Coolness
3.  Aussehen

Heute lange Wang Yins Blog gelesen - - immer noch dabei, mich zu entgiften. Ich war früher immer ein fanatischer Religionsanhänger, der die Dinge nicht in ihrem Wesen sah. Ich dachte immer, etwas sei die ultimative Lösung für alle Probleme, aber solche "ultimativen Lösungen" gibt es selten, meistens ist es nur religiöser Eifer, wie zum Beispiel:

-   Vim vs Emacs
-   OOP vs FP
-   Go vs Rust

Und so weiter... Als ich zum ersten Mal mit OOP in Berührung kam, dachte ich, OOP sei unschlagbar und könne alle Probleme lösen, aber am Ende schrieb ich nur eine riesige Klasse, die eigentlich unnötig war. Was wirklich nützlich waren, waren die einzelnen Funktionen unter dieser Klasse. In den letzten Jahren, als ich mit FP in Berührung kam, dachte ich, FP sei die eierlegende Wollmilchsau, aber nachdem ich eine Weile in Scala programmiert hatte, stellte ich fest, dass meine Produktivität nicht wirklich gestiegen war. Stattdessen verringerte sich meine Effizienz, weil ich mich mit Syntax und Immutability herumärgerte.

### 2020-06-09

Habe etwas meinen Zustand gefunden, Arch installiert, fühlt sich sogar angenehmer an als Mac?

Mit Yuzhang eine Weile Hearthstone Battlegrounds gespielt - -

### 2020-06-10

Heute geplante Aufgaben:

1.  HDMAPMDK-1199 `RoadMark` als Unterklasse, umfassendere Informationen bereitstellen
2.  HDMAPMDK-892 Erfahrungspfade bereitstellen

Wenn noch Kraft übrig ist, die Dokumentation für die Versionierung bearbeiten.

Ergebnis: 892 erledigt.

### 2020-06-11

HDMAPMDK-892 - Bereitstellung von Erfahrungspfaden reviewed.

Festgestellt, dass MDK noch keine entsprechende Anpassung vorgenommen hat, heute Nachmittag daran gearbeitet.

Anpassung abgeschlossen, bin müde.

Weiter an meinem Arch herumgebastelt, versucht, einige Schritte meiner Installation als Teil der Automatisierung zu dokumentieren.

### 2020-06-12

Heutige Aufgabe: HDMAPMDK-1199 erledigen, hatte das Problem vorher vergessen.

Ergebnis: Endlich um 20 Uhr erledigt.

### 2020-06-13

Ein sehr entspannter Tag, nach dem Test-Release die ganze Zeit an meinen Automatisierungsskripten gebastelt.

Anfangs wollte ich noch Shell verwenden, aber ich mag Shell nicht wirklich, also habe ich mit Scheme angefangen. Wirklich cool.

### 2020-06-15

Wow, es ist schon 15 Uhr und ich habe den halben Tag nur rumgesurft, verschiedene Scheme-Websites besucht und so. Das darf nicht so weitergehen.

Heute muss HDMAPMDK-1378 erledigt werden, also das, was wir immer vermeiden wollten: die sogenannte `lane mark direction` innerhalb von Kreuzungen hinzuzufügen. Aber Kreuzungen haben keine Fahrstreifenmarkierungen, wie kann es da eine `lane mark direction` geben?

Es macht mich verrückt, nach einigem Hin und Her bis spät gearbeitet.

### 2020-06-16

Heute nach dem Kommen die ganze Zeit mit Reviews verbracht, es gab viel zu ändern, dann begann ich wieder, ein wenig zu prokrastinieren. Ergebnis: Gerade so geschafft, dann hat Bruder Kuan noch ein paar Bugs gefunden.

Nachmittags erfahren, dass Bruder Xiao geht. Ich war lange schockiert.

Abends ein bisschen mit Scheme herumgespielt, das Kompilieren und Referenzieren eigener Bibliotheken hinbekommen.

### 2020-06-17

Die Hauptarbeit heute war der Abschluss der letzten Iteration, also Bugfixes.

### 2020-06-18

Bis heute haben wir endlich die Dinge der letzten Iteration abgeschlossen.

Ich fühle mich insgesamt sehr schlecht, weil die Bedeutung der Arbeit nicht offensichtlich ist. Eigentlich denke ich, dass sie kaum Bedeutung hat.

Wie definiere ich hier Bedeutung?

Die Bedeutung der aktuellen Arbeit für mich ist, von hoch nach niedrig priorisiert:

1.  Die Fähigkeit, Probleme zu identifizieren, wertvolle, sinnvolle Probleme zu erkennen
2.  Die Fähigkeit aufbauen, Probleme zu modellieren, um in Zukunft mehr Probleme verschiedener Art lösen zu können
3.  Probleme modellieren, um Lösungen zu ermöglichen, die mit einem einmaligen Aufwand eine ganze Klasse von Problemen lösen, die durch dieses Modell beschrieben werden.
4.  Durch meine Bemühungen konkrete, sinnvolle Probleme lösen können. Dabei ist es sinnvoller, mit einem Aufwand eine Klasse von Problemen zu lösen, als nur ein einzelnes Problem.
5.  Freude bewahren, die Zufriedenheit beim Problemlösen, die Interessantheit der Probleme selbst.
6.  Kommunikation und Beziehungen zu Menschen
7.  Gehalt (das ist eine Absicherung, nicht dass es unwichtig wäre, sondern dass der Rest darauf aufbauen sollte)

Das umfasst möglicherweise nicht alle meine Arbeitsmotive, spiegelt aber zumindest einen Teil der Realität wider.

Der Grund für meine heutige Niedergeschlagenheit liegt meiner Meinung hauptsächlich im Verlust der Interessantheit. Erstens ist die Bedeutung der Probleme selbst für mich nicht offensichtlich, was die Motivation mindert. Zweitens führt die ungenaue Modellierung dieser Art von Problemen dazu, dass die Lösungsansätze nicht alle Probleme lösen können (natürlich gibt es selten Modelle, die alle Probleme lösen können, da Modelle per Definition Vereinfachungen und Abstraktionen von Problemen sind. Hier sprechen wir über die Lösung von Problemen innerhalb eines akzeptablen Bereichs), was zu Wiederholungen führt. Konkret: die vielen Bugs, die von QA-Kollegen gemeldet werden. Obwohl einige auf unzureichendes Verständnis der Anforderungen oder sogar auf Testprobleme zurückzuführen sind, nimmt die Analyse der Probleme selbst den zeitaufwändigsten Teil des gesamten Lösungsprozesses ein.

Manchmal führt unzureichendes Problemverständnis zu nicht-fundamentalen Lösungen, was dazu führt, dass man Zeit mit nutzlosen Arbeiten verbringt. Im Wesentlichen werden die Punkte 3, 4 und 5 der oben genannten Bedeutung nicht erfüllt, was mich niedergeschlagen macht.

Ein weiterer zu bedenkender Punkt ist, dass ich bis jetzt nur Probleme der letzten Iteration gelöst habe und noch gar nicht mit den Aufgaben dieser Iteration begonnen habe. Das wird die Zeit für diese Iteration verkürzen und möglicherweise auch nachfolgende Iterationen beeinflussen. Das ist ein sehr unerwünschter Teufelskreis, der, wenn man noch weiter denkt, sogar zwischenmenschliche Beziehungen beeinflussen könnte, was meiner Meinung nach noch unerwünschter ist.

Daher sollte ich von morgen an, bevor ich etwas angehe, versuchen, alle Aspekte zu berücksichtigen und dann erst das Problem lösen.

Ein Rückblick auf die Arbeit der letzten zehn Tage zeigt, dass die Arbeitsfortschritte praktisch auf der Stelle traten. An dem Montag, als ich nach Beijing kam, also am 8. Juni, sagte ich bereits: `Dann zur Arbeit: In dieser Zeit war die Auslieferung abgeschlossen, haupt
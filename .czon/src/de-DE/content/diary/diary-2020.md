---
"title": "Arbeitsprotokoll 2020"
"summary": "Dieses Dokument ist das Arbeitsprotokoll des Autors für das erste Halbjahr 2020. Es dokumentiert detailliert die täglichen Entwicklungsaufgaben, einschließlich Geschwindigkeitsbegrenzungskompilierung, benutzerdefinierte Geschwindigkeitsbegrenzungen, Bugfixes, Code-Refactoring, technische Recherche (z.B. Speicherlecks, PolyLine-Reparatur), Teamarbeit (z.B. Schnittstellendiskussionen, Code-Reviews) sowie persönliche Reflexionen zum Wachstum. Das Protokoll zeigt die technischen Herausforderungen, Problemlösungsprozesse, Projektmanagement-Überlegungen (z.B. iterative Auslieferung, Refactoring-Risiken) und berufliche Einstellungsanpassungen eines Softwareingenieurs in komplexen Projekten (wie einem High-Definition-Karten-Kompilierungssystem). Kernargumente umfassen: Technische Lösungen müssen kurzfristige und langfristige Vorteile abwägen; umfangreiche Refactorings sollten vor Auslieferungen vermieden werden; Ingenieure sollten sich auf das Wesen von Problemen konzentrieren, anstatt technischen Trends blind zu folgen; Aufzeichnungen und Reflexion sind für die persönliche Entwicklung entscheidend."
"tags":
  - "Arbeitsprotokoll"
  - "Softwareentwicklung"
  - "Technische Reflexion"
  - "Projektmanagement"
  - "Bugfixing"
  - "Code-Refactoring"
  - "HD-Karten"
"date": "2020-01-01"
---

### 2020-04-13

- Leistungsbewertung (Self-Assessment) abgeschlossen
- Überarbeitung der Lane Center Aggregation

### 2020-04-14

- [ ] Geschwindigkeitsbegrenzungskompilierung
- [ ] Benutzerdefinierte Geschwindigkeitsbegrenzung

### 2020-04-15

- Benutzerdefinierte Geschwindigkeitsbegrenzungs-Lösung festgelegt @guangcong
  1.  Ein neues `module-dynamicEvent` verwenden, um dieses Problem zu lösen.
  2.  Aktualisierungen der benutzerdefinierten Geschwindigkeitsbegrenzung als neues Event veröffentlichen, um Horizon-Daten-Updates auszulösen.
  3.  Ausnahmebehandlung und Speicherprobleme müssen berücksichtigt werden.
      Nach der Diskussion mit Guangcong stieß dieser auf einige Probleme.
- Code-Review von Xiaokang
  Java als solide Sprache hat doch einiges zu bieten.
- Geschwindigkeitsbegrenzungskompilierung
  Kaum Fortschritt, Logik zum Extrahieren von RoadCenterTile hinzugefügt.
- Sectioning-Problem gelöst, EdgeLifting-Optimierungsansatz analysiert, Optimierungsalgorithmus vorgeschlagen:
  Gegeben einen Traversal-Start und eine Konnektivitätsfunktion, wird der Traversal-Weg angegeben.
- Prinzip von selbstausführenden JARs recherchiert.

### 2020-04-16

- Mit Yiming die Schnittstelle für benutzerdefinierte Geschwindigkeitsbegrenzungen geklärt: Er garantiert, dass ein eingegebenes Location-Pair eine eindeutige kürzeste Route bestimmt.
  Anschließend mit Guangcong den Algorithmus zur Generierung benutzerdefinierter Geschwindigkeitsbegrenzungen durchgearbeitet.
  1.  Gegeben eine Route.
  2.  Bekannt: | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
      Dann kann immer ein Paar (start DiRoadOnPath, end DiRoadOnPath) gefunden werden, das den kürzesten Abstand hat.
- Für Xiaokang eine nutzbare Schnappschussversion des Pylon-v0.1.1-Compilers temporär bereitgestellt.
- Mit Hanteng herumgelaufen und gequatscht.
- Mit Zizhe und Yicheng die SUMO-Kartennutzungsschnittstelle geklärt.
- SpeedLimit-Kompilierung erfolgreich, aber noch nicht verifiziert.

### 2020-04-17

- SpeedLimit-Kompilierung verifiziert:
  `OSMSerializable` funktioniert nicht gut, da gebundene SpeedLimits keine Geometry haben.
  Mögliches Problem: Geschwindigkeitsbegrenzungsbindung bei Auffahrten könnte Probleme verursachen.
- [ ] Interpolation
- [ ] Hausdorff-Distanz
- [ ] LcInJunctionTile

#### Einige Gedankenspiele

- Direkt auf Spark umsteigen?
- Was braucht der OSM-Kontext?

### 2020-04-18

Geschwindigkeitsbegrenzungen abgeschlossen.

### 2020-04-20

#### Benutzerdefinierte Geschwindigkeitsbegrenzung

- Guangcong hat die Eingabe in einen Vektor geändert und Tests hinzugefügt.
- Ein kleines Problem: Guangcong versteht das Wirkprinzip von C++-Zeigern nicht wirklich.
- [ ] Vielleicht versuchen, [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337) zu lösen?
- [ ] Die von Dashu geteilten Dateien über Resilio Sync anonym teilen.

#### RoadBorder-Reparatur

Festgestellt, dass ich eine falsche Annahme gemacht habe. Die in `rc` aufgezeichneten `lc`- und `rb`-Informationen könnten folgendes enthalten:

1.  Es gibt nur ein `lc`, daher kann nicht angenommen werden, dass es mindestens zwei `lc` gibt.
2.  `rb` auf einer Seite könnte nicht existieren, daher kann nicht angenommen werden, dass `rb` immer existiert.

### 2020-04-21

#### RoadBorder-Reparatur

- Migration der Testfälle abgeschlossen.
- Dune und dessen ReadMe verbessert, sodass es Testdaten direkt ausgeben kann.
  Mit Weiyu gesprochen, Zukunftsperspektiven besprochen. Ich konzentriere mich auf das Kompilierungssystem.

#### POI-Bindung für Gegenfahrbahn

- Binding der nach `multidigitize` verarbeiteten Daten.

### 2020-04-22

#### POI-Bindung für Gegenfahrbahn

- Binding der nach `multidigitize` verarbeiteten Daten.
- Testdaten erstellt.

### 2020-04-23

- POI-Bindung für Gegenfahrbahn abgeschlossen und Debugging beendet [4].

### 2020-04-27

Heute hauptsächlich folgende Punkte:

#### Synchronisierung von mdm proto und mdm spec abgeschlossen

1.  Mit Linnan Teile des mdm spec korrigiert, die falsch formuliert waren.
2.  Einige offene Punkte hinterlassen, die Linnan und ich nicht alleine entscheiden konnten.
3.  In der Daily am 2020-04-26 beschlossen, die schwierigsten Teile (LaneSplitMerge und Polyline) später zu ändern.
4.  Änderungen am proto abgeschlossen.
5.  Änderungen am nexus abgeschlossen.
6.  Änderungen am mdk abgeschlossen.
7.  Nebenbei ein Testdatenproblem behoben (ständige Datenfehler).

#### Bugfixing

Kurz vor dem 430-Release stieg die Bugzahl stark an.

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analysiert.

- [ ] Skript zum automatischen Kopieren von Testfällen
- [ ] Apple Reminder exportieren

### 2020-04-28

Theorieprüfung (Führerschein) hat einen halben Tag gedauert.

HDMAPMDK-1130 Breitenproblem, drei Probleme:

1.  Spec legt fest, dass bei Spurwechsel keine Fahrstreifenbreite vorhanden ist.
2.  Zu lange Intersection-Linien führen zu Split-Line-Problemen.

HDMAPMDK-1121 erneut repariert.

Sehr schlechter Zustand.

### 2020-04-29

#### Bugfixing

- HDMAPMDK-1143
  Problem, dass RoadObstacle nicht kompiliert wurde.
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Mill verwenden.
- nexus-osm verwenden.

#### Brainstorming

### 2020-05-08

#### Speicherleck-Problem

- Die direkte Ursache für das Speicherleck war, dass nach dem `new` eines Wildzeigers kein `delete` erfolgte.
- Nach `update current position` rief das Map Kit `prepareGuidanceData` auf, um die nächstgelegenen Guidance-Daten zur aktuellen Position zu finden.
- `prepareGuidanceData` rief `NavInfoProviderImpl::getTrafficLights` & `NavInfoProviderImpl::getCarParks` auf.
- Beispielsweise wurden in `NavInfoProviderImpl::getTrafficLights` bei Aufruf Datenzeiger in `NaviEventOnPath` mit `new` erzeugt.
- Es erfolgte jedoch kein `delete`.

Lösung: Der Kern liegt darin, die Existenz von Wildzeigern zu verhindern. Entscheidung, `NaviEventProvider` zu refaktorieren.

- Zuerst zwei Felder `traffic_light_events` & `car_park_events` in `NaviInfoProvider` hinzufügen.
- In `NaviInfoGenerator` diese Felder nach einem Route-Update aktualisieren.
- Bei jedem `get` dann basierend auf der aktuellen Fahrzeugposition filtern.
- Daher muss `PathReader::getAttributes` refaktorisiert werden, da die vorherige Implementierung nur den Offset relativ zum aktuellen Fahrzeug berücksichtigte. Jetzt wird eine Schnittstelle für den Offset relativ zum Path benötigt.

### 2020-05-09

#### PolyLine-Reparatur und Tests

Das Hauptproblem bei PolyLine besteht darin, dass beim Erstellen möglicherweise doppelte Punkte hinzugefügt werden, was zu einer Reihe von Problemen bei geometriebezogenen Segmentberechnungen führt:

1.  Vektorberechnung: Zwei doppelte Punkte ergeben einen Nullvektor.
2.  Längenberechnung: Segmentlänge ist 0, was leicht zu NaN-Problemen führt.

Daher wird beim Konstruieren von PolyLine eine Prüfung der Punkte in der PolyLine durchgeführt. Wenn doppelte Punkte gefunden werden, wird eine Exception geworfen.

Folgende Probleme wurden entdeckt:

- Problem mit `getEnd` in Jts.
- Jts `LinearLocation` kann Normalisierungsprobleme haben.

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // die Ausgabe ist -1
  ```

- Beim Interpolieren könnten zwei zu nahe Punkte genommen werden.

### 2020-05-11

- HDMAPMDK-1122
  Problem mit fehlenden Straßenrandlinien konnte nicht reproduziert werden. Entscheidung, keine weitere Zeit für die Ursachenforschung aufzuwenden.
- Eine halbe Stunde "Metabolic Growth Theory".
- Visitor-Refactoring, um Linien mit gleichem Start- und Endpunkt zu unterstützen.
- Eine Interviewfrage vorbereitet.

### 2020-05-12

- Interview: Beide Kandidaten ungeeignet. Nachgedacht, wie man Kandidaten schnell einschätzen kann. Dauer: 3 Stunden.
- Bugfix: HDMAPMDK-1211 Problem mit falsch gelöschten Borders, bei letzter Reparatur nicht erfolgreich behoben.
  Hatte eine Idee, aber nicht fertig geschrieben.
- War trainieren.

### 2020-05-13

Bugfix: HDMAPMDK-1211 Lösungsidee gefunden.

- Grundursache war eine unangemessene Segmentierung der Produktionslinie.

#### Ursachenanalyse

Es ist zu sehen, dass die Segmentierung erfolgte, bevor der Spurwechsel abgeschlossen war (die Fahrstreifenmittellinie überquerte noch die Fahrstreifenbegrenzung), und diese Segmentierung möglicherweise Rp überspannte.

Da die an den Shape-Points des `lanecenter` anhaftenden `lane border`-Beobachtungsinformationen die seitlichen Fahrstreifenlinien basierend auf der Geometrie treu mittels Scan-Line aufzeichnen, ohne semantische Filterung, wird an der Position, an der die Fahrstreifenlinie die Fahrspur überquert, die überquerte Fahrstreifenlinie gleichzeitig im linken und rechten `lane border ref` des entsprechenden `lanecenter` aufgezeichnet.

Unter der bestehenden Code-Logik schlägt die semantische Filterung der `border refs` der überkreuzenden Fahrstreifenlinien basierend auf dem Spurwechseltyp fehl, wenn sie auf diese Art von Segmentierung trifft, was zu diesem Problem führt.

#### Lösung

Der Kernpunkt liegt darin, **den Trend des überkreuzenden Fahrstreifens zu finden**. Da diese Segmentierung Rp überspannen kann, sollte die Filterung nicht auf Rp-Ebene erfolgen.

1.  Zuerst werden die Fahrstreifenlinien mittels Edge Lifting zu einem Path organisiert (kann für zukünftige Graph-Refaktorierung berücksichtigt werden): `Seq[LaneCenter]`
2.  Den zu korrigierenden `LaneCenter` und den zu korrigierenden `lane border` finden (hier wird angenommen, dass dieser `LaneCenter` definitiv durch Spurwechsel verursacht ist).
3.  Den Spurwechseltrend dieses `LaneCenter` basierend auf dem `LaneCenter`-Path berechnen.
4.  Filterung durchführen.

Wurde Ziliang übergeben.

Ein Interviewkandidat nicht bestanden.

### 2020-05-14

HDMAPMDK-1132 ID-Tracing für Endpunkte von Schildfahrstreifenlinien.

Das Tracing-Problem für Endpunkte von Schildfahrstreifenlinien ist im Vergleich zum Tracing linearer Objekte sehr einfach, es gibt nur ID-Mapping, kein Offset- und Längen-Mapping.

Dennoch sind einige Überlegungen nötig:

1.  Prozedur.
2.  Das ID-Typisierungssystem ist ein hartnäckiges Problem, das angegangen werden muss.

Im Wesentlichen liegt die Wurzel des Problems darin, dass wir bei der ID-Definition durchgängig Long-IDs verwendet haben, während die MDM-Definition Int verwendet, was leicht zu Überlaufproblemen führen kann.

### 2020-05-15

#### Bugfixing

- HDMAPMDK-1215 abgeschlossen.
- HDMAPMDK-1218 erledigt.

### 2020-05-18

OSM Assembler refaktorisiert, verwendete das vorherige OSM serialize. Die Verständlichkeit und Schreibbarkeit des Codes haben sich verbessert.

### 2020-05-19

Einen OSM Assembler-Bug behoben (eigentlich kein richtiger Bug).

Heute Sprint-Planning-Meeting:
In diesem Sprint gibt es nicht viel zu tun, aber viel zu überlegen. Das ist ein gesunder Zustand.

### 2020-05-20

- [ ] Dokumentation zum aktuellen Nexus/MDK-CI-Status und den Anforderungen schreiben.
- [x] HDMAPMDK-1263 Bug im Auge behalten.
  - Es handelt sich tatsächlich um ein Produktionslinien-Segmentierungsproblem.
- [ ] Meeting mit Yang Chuan über CI vereinbaren.
- [ ] HDMAPMDK-1262
      Nicht fertig geworden.
- [x] Problem mit benutzerdefinierter Geschwindigkeitsbegrenzung.

### 2020-05-21

#### TODOs

- [x] Qiaobo grüßen.
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### Arbeiten

- Morgens im Büro von Yiming Online-Debugging des Hotfix von gestern. Ursache war ein Offset-Problem. Gestern zu hastig geschrieben und überhaupt keine Tests hinzugefügt. Solches Verhalten sollte nicht wieder vorkommen. Dachte, ich hätte viel Zeit gespart, **aber habe letztendlich mehr Zeit verschwendet**.
- Grund für fehlende Daten bei 1262: MDK lädt keine Lane-Level-`road mark` (und `road obstacle`).
- Du geholfen, Daten zu kompilieren.

### 2020-05-22

Was habe ich heute gemacht???
Was habe ich eigentlich gemacht???

### 2020-05-25

Heute eine neue Aufgabe erhalten: HDMAPMDK-1249 - Erforschung einer Methode zur Berechnung der Lane Aggregation unter Verwendung von Straßengeometrieinformationen. Dadurch sind die Aufgaben für diese Woche etwas mehr geworden. Derzeit habe ich noch drei Dinge zu erledigen:

1.  1249
2.  Aktueller Stand, Anforderungen und Lösung für die CI-Pipeline im Team.
3.  Nexus-Graph-Refaktorierung.

Jede dieser Aufgaben erfordert sorgfältige Planung und ist nicht einfach. Leider kann ich für keine der Aufgaben die Zeit genau abschätzen. Es sind nur die von Weiyu geschätzten und in den Jira-Story-Points eingetragenen Werte. Eines ist mir klar: **Wenn ich nicht anfange, abzuschätzen und zu reflektieren, werde ich es nie genau schätzen können**. Also ab jetzt genau abschätzen.

Außerdem plane ich, heute mit 1249 anzufangen, da es sich um eine geschäftliche Angelegenheit handelt, die in der Regel dringender ist und Weiyu mehr daran liegt. Was die Refaktorierung betrifft, wenn ich mich nicht darum kümmere, wird es wahrscheinlich niemanden interessieren (weil es hart ist: Es beeinflusst nicht die Funktionalität, aber die Effizienz, und Effizienz ist am schwierigsten zu messen, selbst ich habe nur qualitative Analysen).

### 2020-05-26

Heute viele unerwartete Dinge. Zuerst wurden zwei Bugs im Parking gemeldet. Ursprünglich für heute geplante Auslieferung konnte wegen dieser Bugs nicht stattfinden. Wang Wei hat mit Downstream verhandelt und die Lieferung um zwei Tage auf übermorgen verschoben. Daher besteht meine Hauptarbeit in den nächsten zwei Tagen wieder aus Bugfixing. Das lässt mich über die Planung bei Auslieferungen nachdenken. Dann das Problem HDMAPMDK-1290.

Heute erledigte Dinge:

- Nacharbeit zu HDMAPMDK-1290: Wenn man sich einer Stopplinie extrem nähert, kann der gematchte Lane-Offset länger als die Lane-Länge sein.

  > Habe den ganzen Tag damit verbracht, dies zu untersuchen und zu lösen (aktuell 20:56 Uhr). Sehr ineffizient.

  Der Grund liegt darin, dass MDK bei der Längenberechnung die Länge zwischen je zwei Punkten berechnet und dann eine Koordinatentransformation durchführt. Obwohl dies genauer ist, führt es zu starker Ergebnisunsicherheit.

  Letztendlich eine Art Hack-Lösung verwendet: Wenn der berechnete Offset länger als die Länge ist, wird nur die Länge genommen.

- HDMAPMDK-1297 Falsche Parkplatzbindung.
  Obwohl es fast Feierabend war (21 Uhr), wollte ich dieses Problem heute auf jeden Fall zumindest analysieren!
  Hmm, geschafft. Es war ein einfaches Problem.

### 2020-05-27

Heute sollte ich, wenn nichts dazwischenkommt, die CI-Pipeline-Angelegenheit abschließen.

Dann kam etwas dazwischen - -

Bugs von Yiming erhalten:

1.  Ampelsetzung: Eine Ampel, die im Abbiegebereich hätte gesetzt werden sollen, wurde im vorherigen Partition gesetzt. Bereits behoben (1,5h).
2.  Fehlende Ampelsetzung: Konnte nicht reproduziert werden.
    Update: Nach mühsamem Debugging endlich das Problem gefunden. Beim Kompilieren wurde für die Bindung von `rc` und `offset` nicht dieselbe Geometrielinie verwendet, was zu einem Offset führte, der die Straßenlänge überschritt, daher wurde keine Ampel gefunden (2h).

### 2020-05-28

Morgen praktische Führerscheinprüfung (Klasse 2), heute den ganzen Tag Fahrstunde, erst um 17 Uhr zurück. Fühlt sich gut an, hoffe, morgen zu bestehen.

Begonnen, den aktuellen Stand und die Anforderungsanalyse der CI-Pipeline zu beschreiben - -

### 2020-05-29

Habe nicht bestanden. Ach, das ist hart.

Morgens zur Prüfung, nachmittags ein paar Dinge erledigt:

1.  Bei Yiming eine Anomalie angeschaut, stellte sich als zwei Bugs heraus.
2.  Nach dem Townhall Meeting MDK Python Binding besprochen.
3.  Mit Shanle und Weiyu nach unten gegangen, um Downstream-Probleme zu lösen. Schlussendlich eine kurzfristige und eine langfristige Lösung erarbeitet.

Ich stelle fest, dass bei unerwarteten Problemen die Lösungsmethode in der Regel diesem Muster folgen sollte:
Eine kurzfristige Lösung und eine langfristige Lösung. Denn der Wert, den ein Problem offenbart, ist begrenzt und hat eine zeitliche Begrenzung. Daher zielt die kurzfristige Lösung darauf ab, die dringendsten Probleme schnell und präzise zu lösen. Braucht es dann noch eine langfristige Lösung? Im Allgemeinen ja, denn ein spezifisches Problem zeigt eine Klasse von bisher nicht berücksichtigten blinden Flecken in der Lösungsfindung auf. In diesem Fall sollte man die Ursache analysieren und sie systematisch lösen, damit solche Probleme in Zukunft gut gelöst werden können und die ursprüngliche Lösung vollständiger wird. Es gibt auch Fälle, in denen keine langfristige Lösung nötig ist: wenn wir **nach gründlicher Analyse** zu dem Schluss kommen, dass der Aufwand für eine systematische Lösung den Nutzen übersteigt. (Selbst dann haben wir subjektiv oft den Drang, Probleme systematisch zu lösen. Welcher Ingenieur möchte nicht systematisch Probleme lösen? Aber das birgt eine Falle: Man könnte sich in die Lösung von wichtigen, aber nicht dringenden oder weder wichtigen noch dringenden Dingen verstricken und so wertvolle Zeit verschwenden, die für andere, wertvollere Probleme hätte verwendet werden können.)

4.  Abends weiter an der CI-Pipeline gearbeitet.

### 2020-06-01

Heute morgen gleich zu Yiming gegangen, um ein Problem zu analysieren, den ganzen Vormittag. Ergebnis: Ein bekanntes Problem (fehlende Punkte aufgrund von Interpolation im alten Compiler) verursachte ein anderes Problem: Beim Routenmatching genau in der Nähe des fehlenden Segments, wodurch der Lane-Offset negativ wurde.

Gearbeitet bis nach 16 Uhr, nach einer Phase ineffizienter und schmerzhafter Überstunden (das Gefühl, dass Überstunden im aktuellen Zustand fast immer mit Ineffizienz einhergehen).

### 2020-06-02

Erst nachmittags gekommen. Für Yimings Fahrzeugtest einige Bugs behoben, rechtzeitig für Yimings abendlichen Test.

### 2020-06-03

Heute morgen gleich zu Yiming, um das über Nacht entdeckte Problem zu lösen: Ampeln konnten nicht abgerufen werden.

### 2020-06-04

Heute morgen drei Dinge zu erledigen:

1.  Datenbereinigung und Upload der finalen Daten für den 05.06.
2.  Breitenanomalie überprüfen - Grund: An dieser Position gab es keine Fahrspur.
3.  Problem mit falscher Fahrspur bei Interpolationspunkten überprüfen.
4.  Nachkontrolle.

### 2020-06-05

Ein aufregender Tag. HDMAPMDK-1347 und HDMAPMDK-1352 abgeschlossen, sowie ein großes Refactoring durchgeführt.

Eine wertvolle Lektion gelernt: Kurz vor einer Auslieferung sollte man keine riesigen Änderungen vornehmen, denn ohne ausreichende QA-Tests kann selbst das brillanteste Refactoring Risiken bergen. Gleichzeitig bleibt ohne genügend Zeit für ein Design-Review (ich meine für mich selbst, denn manchmal stellt man beim Implementieren fest, dass das Design vielleicht falsch ist – was allerdings ein anderes Problem ist: zu früh mit der Implementierung zu beginnen).

Montag, Ergänzung:
Bei diesem aufregenden Refactoring hatte ich kaum eine Pause, nicht einmal Zeit zum Nachdenken, nur vertraut und im Flow mit hoher Effizienz Code geschrieben. Eigentlich, wenn man das Prinzip ignoriert, vor Auslieferungen keine großen Refactorings zu machen, genieße ich diesen Zustand sehr. Aber alles braucht ein Ziel und einen Sinn, man kann nicht nur seinem Vergnügen nachgehen, sonst wird dieses Vergnügen zu einem niederen Instinkt.

### 2020-06-08

Samstag nach Beijing gezogen, um dort zu arbeiten.

Die Rückkehr zur Arbeit in Beijing fühlt sich etwas ungewohnt an, alles hat sich verändert. Zuerst habe ich keinen festen Arbeitsplatz mehr (Xiuyun hat einen Praktikanten eingestellt, und für die Arbeitserleichterung sitzt dieser Praktikant nun dort). Das ist das unangenehmste aller Verluste. Es ist, als wäre ich in der Oberstufe in eine neue Klasse gekommen, auf einem neuen Platz, niemanden kennend, nicht mit ihnen sprechen wollend. Die Leute hier wirken vertraut und doch fremd. Ich habe das Gefühl, hier wenige Freunde zu haben, was ich rational für eine Täuschung halte. Aber das Gefühl, nicht mit Menschen kommunizieren zu wollen, eine Ecke zu suchen, ist real, und ich habe tatsächlich eine Ecke gefunden, neben Yuzhang. Warum will ich nicht kommunizieren? Ich verstehe das Problem immer noch nicht, vielleicht weil es keinen offiziellen Grund gibt? Auf die Frage, warum ich nach Beijing gekommen bin und wie lange ich bleibe, antworte ich ausweichend: eine Weile, ein, zwei Monate. Vielleicht zeigt es auch, dass ich im Grunde ein introvertierter Mensch bin, der keine Umstände mag und besonders darauf bedacht ist, in den Augen anderer nicht dumm zu wirken. Je mehr ich schreibe, desto mehr denke ich, dass der zweite Grund überwiegt und unnötig ist. Erstens: Dumm wirken ist besser als wirklich dumm zu sein. Ernsthaft um Rat fragen, auch wenn es unbeholfen ist. Hab keine Angst, sei in der Jugend nicht ängstlich. Sei niemals ängstlich. Alles ist gut.

Zur Arbeit: In dieser Zeit war die Auslieferung abgeschlossen, hauptsächlich das Refactoring von TLM (Typed Lane Model). Diesmal muss ich das Ziel klar definieren und mich kontrollieren, nicht impulsiv zu refaktorisieren, sondern strategisch und mit Kontrolle über den Fortschritt.

Außerdem habe ich meinen Desktop-PC eingerichtet. Der Grund, warum er vorher keine Netzwerkverbindung hatte, war, dass ich das Passwort geändert hatte. Nach einem Stromausfall war die Verbindung komplett verloren. Also musste ich den PC noch einrichten. Diesmal sind die Prioritäten:

1.  Produktivität
2.  Coolness
3.  Aussehen

Heute lange Wang Yins Blog gelesen - - Entgiftung im Gange. Ich war früher immer ein fanatischer Religionsanhänger, der die Essenz der Dinge nicht sehen konnte. Ich dachte immer, etwas sei die ultimative Lösung für alle Probleme, aber solche "ultimativen Lösungen" gibt es selten, meistens ist es nur religiöser Eifer, wie z.B.

-   Vim vs Emacs
-   OOP vs FP
-   Go vs Rust

usw... Als ich früher mit OOP in Berührung kam, dachte ich, OOP sei unschlagbar und könne alle Probleme lösen, aber am Ende schrieb ich nur eine riesige Klasse, die eigentlich unnötig war. Was wirklich nützlich waren, waren die einzelnen Funktionen in dieser Klasse. In den letzten Jahren, mit FP in Berührung gekommen, dachte ich, FP sei die Silberkugel für alle Probleme. Aber nachdem ich eine Weile in Scala programmiert hatte, stellte ich fest, dass meine Produktivität nicht wirklich gestiegen war, sondern ich mich wegen Grammatik und Immutability ineffizienter fühlte.

### 2020-06-09

Habe etwas meinen Zustand gefunden, Arch installiert. Fühlt sich sogar angenehmer an als Mac?

Mit Yuzhang eine Weile Hearthstone Battlegrounds gespielt - -

### 2020-06-10

Heute geplante Aufgaben:

1.  HDMAPMDK-1199 RoadMark als Subklasse, umfassendere Informationen bereitstellen.
2.  HDMAPMDK-892 Erfahrungspfade bereitstellen.

Wenn noch Energie da ist, die Release-Dokumentation bearbeiten.

Ergebnis: 892 erledigt.

### 2020-06-11

HDMAPMDK-892 - Bereitstellung von Erfahrungspfaden - reviewed.

Festgestellt, dass MDK noch keine entsprechende Anpassung vorgenommen hat. Heute Nachmittag daran gearbeitet.

Anpassung abgeschlossen, bin müde.

Weiter an meinem Arch geschraubt, versucht, die Schritte zur PC-Einrichtung für die Automatisierung zu dokumentieren.

### 2020-06-12

Heutige Aufgabe: HDMAPMDK-1199 erledigen, hatte das Problem vergessen.

Endlich um 20 Uhr geschafft.

### 2020-06-13

Ein sehr entspannter Tag. Nach dem Test-Release nur an meinen Automatisierungsskripten gebastelt.

Zuerst dachte ich an Shell, aber ich mag Shell nicht, also mit Scheme angefangen. Wirklich cool.

### 2020-06-15

Wow, es ist schon 15 Uhr und ich habe den halben Tag nur herumgesurft, verschiedene Scheme-Websites besucht. Das darf nicht so weitergehen.

Heute muss HDMAPMDK-1378 erledigt werden, also das, was wir nie machen wollten: In Kreuzungen sogenannte Lane-Mark-Direktionen hinzufügen. Aber Kreuzungen haben keine Fahrstreifenmarkierungen, wie kann es da Lane-Mark-Direktionen geben?

Es ist frustrierend, nach Hin und Her bis spät gearbeitet.

### 2020-06-16

Heute nach dem Kommen nur Reviews gemacht, es gab viel zu ändern. Dann begann ich wieder, etwas zu prokrastinieren, habe es gerade so geschafft. Dann fand Kuange noch ein paar Bugs.

Nachmittags erfuhr ich, dass Xiaoge geht. Ich war lange schockiert.

Abends an Scheme gebastelt, das Kompilieren und Referenzieren eigener Libraries hinbekommen.

### 2020-06-17

Heutige Hauptarbeit: Abschlussarbeiten des letzten Sprints, also Bugfixing.

### 2020-06-18

Bis heute haben wir endlich die Dinge des letzten Sprints abgeschlossen.

Ich fühle mich insgesamt sehr schlecht, weil die Bedeutung der Arbeit nicht klar ist, eigentlich denke ich, sie ist fast bedeutungslos.

Wie definiere ich hier Bedeutung?

Die Bedeutung der aktuellen Arbeit für mich ist, Priorität absteigend:

1.  Die Fähigkeit, Probleme zu identifizieren, wertvolle, sinnvolle Probleme zu erkennen.
2.  Die Fähigkeit aufbauen, Probleme zu modellieren, um in Zukunft mehr Probleme verschiedener Art lösen zu können.
3.  Probleme modellieren, um Lösungen zu ermöglichen, die mit einmaligem Aufwand eine ganze Klasse von Problemen lösen, die das Modell beschreibt.
4.  Durch meine Bemühungen konkrete, sinnvolle Probleme lösen. Dabei ist das einmalige Lösen eines Problems weniger bedeutend, als mit einem Aufwand eine Klasse von mehreren Problemen zu lösen.
5.  Freude bewahren, die Zufriedenheit beim Problemlösen, die intrinsische Interessantheit des Problems selbst.
6.  Kommunikation und Beziehungen zu Menschen.
7.  Gehalt (das ist eine Absicherung, nicht unwichtig, aber der Rest sollte darauf aufbauen).

Das umfasst wahrscheinlich nicht alle meine Arbeitsmotive, aber es spiegelt zumindest einen Teil der Realität wider.

Der Grund für meine heutige Niedergeschlagenheit ist meiner Meinung nach hauptsächlich der Verlust an Interessantheit. Erstens ist die Bedeutung des Problems selbst für mich nicht klar, was die Motivation mindert. Zweitens ist die Modellierung dieser Art von Problem nicht präzise genug, was dazu führt, dass die Lösungsmethode nicht alle Probleme lösen kann (natürlich gibt es selten Modelle, die alle Probleme lösen, da Modelle per Definition Vereinfachungen und Abstraktionen von Problemen sind; hier sprechen wir vom Lösen akzeptabler Probleme), was zu Wiederholungen führt. Konkret: die vielen Bugs, die QA-Mitarbeiter melden. Obwohl einige auf unzureichendes Verständnis der Anforderungen oder Testprobleme zurückzuführen sind, nimmt die Analyse der Probleme selbst den zeitaufwändigsten Teil des Lösungsprozesses ein.

Manchmal führt unzureichendes Problemverständnis zu nicht-fundamentalen Lösungen, was dazu führt, dass man Zeit mit nutzlosen Dingen verbringt, und die Punkte 3, 4 und 5 der oben genannten Bedeutung werden nicht erfüllt, was mich niedergeschlagen macht.

Außerdem muss bedacht werden, dass ich bisher nur Probleme des letzten Sprints gelöst habe und noch gar nicht mit den Dingen dieses Sprints begonnen habe. Das verkürzt die Zeit für diesen Sprint und könnte sich auf nachfolgende Sprints auswirken. Das ist ein sehr unerwünschter Teufelskreis, der, wenn man noch weiter denkt, sogar zwischenmenschliche Beziehungen beeinflussen könnte, was noch unerwünschter ist.

Daher sollte ich ab morgen, bevor ich etwas mache, versuchen, alle Aspekte zu bedenken und dann erst das Problem lösen.

Ein Blick auf die letzten zwei Wochen zeigt, dass die Arbeitsfortschritte fast völlig auf der Stelle traten. An dem Montag, als ich nach Beijing kam, am 8. Juni, sagte ich: `Dann zur Arbeit: In dieser Zeit war die Auslieferung abgeschlossen, hauptsächlich das Refactoring von TLM (Typed Lane Model). Diesmal muss ich das Ziel klar definieren und mich kontrollieren, nicht impuls
---
"title": "Arbeitsprotokoll 2020"
"summary": "Dieses Dokument ist das Arbeitsprotokoll des Autors für das erste Halbjahr 2020. Es dokumentiert detailliert die Arbeitsinhalte von April bis Juli, einschließlich der Entwicklung eines Karten-Datenkompilierungssystems, Fehlerbehebungen, technischer Refaktorierungen (z.B. TLM-Refaktorierung), Teamarbeit (z.B. Diskussionen mit Kollegen über Schnittstellen und Lösungen), Vorstellungsgespräche sowie Gedanken zur persönlichen Karriereentwicklung. Das Dokument behandelt nicht nur konkrete technische Aufgaben (wie benutzerdefinierte Geschwindigkeitsbegrenzungen, Bindung von Fahrstreifenmarkierungen, Behebung von Speicherlecks), sondern auch Reflexionen des Autors über Arbeitseffizienz, Codequalität, Projektmanagement (z.B. CI/CD-Pipelines) und Karriereplanung. Im Protokoll äußert der Autor wiederholt die Suche nach dem Sinn der Arbeit, kritisches Denken über technische Entscheidungen und mentale Veränderungen in einem Hochdruck-Lieferumfeld."
"tags":
  - "Arbeitsprotokoll"
  - "Softwareentwicklung"
  - "Kartendaten"
  - "Technische Reflexion"
  - "Teamarbeit"
  - "Projektmanagement"
  - "Karriereentwicklung"
"date": "2020-01-01"
---

### 2020-04-13

- Leistungsbewertung (Self-Assessment) abgeschlossen
- Überarbeitung der Lane Center Aggregation

### 2020-04-14

- [ ] Geschwindigkeitsbegrenzungskompilierung
- [ ] Benutzerdefinierte Geschwindigkeitsbegrenzungen

### 2020-04-15

- Festlegung des Lösungsansatzes für benutzerdefinierte Geschwindigkeitsbegrenzungen mit @guangcong
  1.  Ein neues `module-dynamicEvent` verwenden, um dieses Problem zu lösen.
  2.  Updates benutzerdefinierter Geschwindigkeitsbegrenzungen als neues Ereignis veröffentlichen, um Horizon-Daten-Updates auszulösen.
  3.  Ausnahmebehandlung und Speicherprobleme müssen berücksichtigt werden.
     Nach der Diskussion mit Guangcong stieß dieser auf einige Probleme.
- Code-Review von Xiaokang
  Java als solide Sprache hat doch einiges zu bieten.
- Geschwindigkeitsbegrenzungskompilierung
  Kaum Fortschritte, lediglich Logik zum Extrahieren von RoadCenterTile hinzugefügt.
- Sectioning-Problem gelöst, EdgeLifting-Optimierungsansatz analysiert, Optimierungsalgorithmus vorgeschlagen:
  Gegeben einen Traversal-Start und eine Konnektivitätsfunktion, wird die Traversierungsmethode angegeben.
- Prinzip von selbstausführenden JARs untersucht.

### 2020-04-16

- Mit Yiming die Schnittstelle für benutzerdefinierte Geschwindigkeitsbegrenzungen abgestimmt: Er stellt sicher, dass ein eingegebenes Location-Paar eine eindeutige kürzeste Route bestimmt.
  Anschließend mit Guangcong den Algorithmus zur Generierung benutzerdefinierter Geschwindigkeitsbegrenzungen durchgearbeitet.
  1.  Gegeben eine Route.
  2.  Bekannt: | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
      Dann kann definitiv ein Paar (start DiRoadOnPath, end DiRoadOnPath) gefunden werden, das den kürzesten Abstand hat.
- Für Xiaokang eine nutzbare Schnappschussversion des Pylon-v0.1.1-Compilers temporär veröffentlicht.
- Mit Hanteng nach unten gegangen, herumgelaufen und gequatscht.
- Mit Zizhe und Yicheng die SUMO-Kartennutzungsschnittstelle abgestimmt.
- SpeedLimit-Kompilierung erfolgreich, aber noch nicht verifiziert.

### 2020-04-17

- SpeedLimit-Kompilierung verifiziert:
  OSMSerializable funktioniert nicht gut, da gebundene SpeedLimits keine Geometry haben.
  Mögliches Problem: Bei Auffahrten kann die Geschwindigkeitsbegrenzungsbindung Probleme verursachen.
- [ ] Interpolation
- [ ] Hausdorff-Distanz
- [ ] LcInJunctionTile

#### Einige verrückte Ideen

- Direkt mit Spark anfangen?
- Was braucht der OSM-Kontext?

### 2020-04-18

Geschwindigkeitsbegrenzungen abgeschlossen.

### 2020-04-20

#### Benutzerdefinierte Geschwindigkeitsbegrenzungen

- Guangcong hat die Eingabe in einen Vektor geändert und Tests hinzugefügt.
- Ein kleines Problem: Guangcong versteht das Wirkprinzip von C++-Zeigern nicht wirklich.
- [ ] Vielleicht versuchen, [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337) zu lösen?
- [ ] Die vom Onkel geteilten Dateien anonym über Resilio Sync teilen.

#### RoadBorder-Reparatur

Festgestellt, dass ich eine falsche Annahme gemacht habe. Die in rc gespeicherten lc- und rb-Informationen könnten folgendes enthalten:

1.  Es gibt nur einen lc, daher kann nicht angenommen werden, dass es mindestens zwei lc gibt.
2.  Die rb auf einer Seite könnte nicht existieren, daher kann nicht angenommen werden, dass rb immer existiert.

### 2020-04-21

#### RoadBorder-Reparatur

- Migration der Testfälle abgeschlossen.
- Dune und dessen ReadMe verbessert, sodass es direkt Testdaten ausgeben kann.
  Mit Weiyu gesprochen, Zukunftsperspektiven besprochen. Ich konzentriere mich auf das Kompilierungssystem.

#### POI-Bindung für Gegenfahrstreifen

- Binding der nach `multidigitize` verarbeiteten Daten.

### 2020-04-22

#### POI-Bindung für Gegenfahrstreifen

- Binding der nach `multidigitize` verarbeiteten Daten.
- Testdaten erstellt.

### 2020-04-23

- POI-Bindung für Gegenfahrstreifen abgeschlossen und Debugging beendet [4].

### 2020-04-27

Heute hauptsächlich folgende Punkte:

#### Synchronisierung von mdm proto und mdm spec abgeschlossen

1.  Mit Linnan zusammen fehlerhafte Teile im mdm spec bezüglich Lane Markings korrigiert.
2.  Mehrere offene Punkte hinterlassen, die Linnan und ich nicht allein entscheiden konnten.
3.  In der Daily am 2020-04-26 beschlossen, die schwierigsten Änderungen (LaneSplitMerge und Polyline) auf später zu verschieben.
4.  Proto-Änderungen abgeschlossen.
5.  Nexus-Änderungen abgeschlossen.
6.  MDK-Änderungen abgeschlossen.
7.  Nebenbei ein Testdatenproblem behoben (ständige Datenfehler).

#### Fehlerbehebungen

Kurz vor dem 430-Release stieg die Anzahl der Bugs stark an.

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analysiert.

- [ ] Skript zum automatischen Kopieren von Testfällen
- [ ] Apple Reminder exportieren

### 2020-04-28

Theoretische Führerscheinprüfung (Kategorie 1) gemacht, hat einen halben Tag gedauert.

HDMAPMDK-1130 Breitenproblem, drei Probleme:

1.  Spec legt fest, dass beim Spurwechsel keine Fahrstreifenbreite vorhanden ist.
2.  Zu lange Intersection-Linien führen zu Split-Line-Problemen.

HDMAPMDK-1121 erneut repariert.

Sehr schlechter Zustand.

### 2020-04-29

#### Fehlerbehebungen

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

- Die direkte Ursache für das Speicherleck war, dass nach dem Erstellen von Wildzeigern mit `new` kein `delete` aufgerufen wurde.
- Nach dem `update current position` rief das Map Kit `prepareGuidanceData` auf, um die nächstgelegenen Guidance-Daten zur aktuellen Position zu finden.
- `prepareGuidanceData` rief `NavInfoProviderImpl::getTrafficLights` & `NavInfoProviderImpl::getCarParks` auf.
- Beispielsweise `NavInfoProviderImpl::getTrafficLights`: Beim Aufruf wurden Datenzeiger in `NaviEventOnPath` mit `new` erzeugt.
- Es gab jedoch kein `delete`.
- Gleiches Problem wurde bei `DestEvent` festgestellt.

Lösung: Kernpunkt ist, das Vorhandensein von Wildzeigern zu verhindern. Entscheidung, `NaviEventProvider` zu refaktorieren.

- Zuerst zwei Felder `traffic_light_events` & `car_park_events` in `NaviInfoProvider` hinzufügen.
- In `NaviInfoGenerator` diese Felder nach einem Route-Update aktualisieren.
- Bei jedem `get`-Aufruf basierend auf der aktuellen Fahrzeugposition filtern.
- Daher muss `PathReader::getAttributes` refaktorisiert werden, da die vorherige Implementierung nur den Offset relativ zum aktuellen Fahrzeug berücksichtigte. Jetzt wird eine Schnittstelle für den Offset relativ zum Path benötigt.

### 2020-05-09

#### PolyLine-Reparatur und Tests

Das Hauptproblem bei PolyLine bestand darin, dass beim Erstellen der PolyLine möglicherweise doppelte Punkte hinzugefügt wurden, was zu einer Reihe von geometriebezogenen Segmentberechnungsproblemen führte:

1.  Vektorberechnung: Zwei doppelte Punkte ergeben einen Nullvektor.
2.  Längenberechnung: Segmentlänge ist 0, was leicht zu NaN-Problemen führt.

Daher wurde beim Konstruieren von PolyLine eine Prüfung der Punkte in der PolyLine hinzugefügt. Wenn doppelte Punkte gefunden werden, wird eine Ausnahme ausgelöst.

Folgende Probleme wurden entdeckt:

- Problem mit `getEnd` in Jts.
- Jts `LinearLocation` hat ein Normalisierungsproblem.

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // die Ausgabe ist -1
  ```

- Beim Interpolieren könnten zwei zu nahe beieinander liegende Punkte ausgewählt werden.

### 2020-05-11

- HDMAPMDK-1122
  Problem mit fehlenden Straßenrandlinien konnte nicht reproduziert werden. Entscheidung, keine weitere Zeit für die Ursachenforschung aufzuwenden.
- Eine halbe Stunde über metabolisches Wachstum nachgedacht.
- Visitor-Refaktorierung, damit er Linien mit gleichem Start- und Endpunkt unterstützt.
- Eine Interviewfrage vorbereitet.

### 2020-05-12

- Vorstellungsgespräche: Beide Kandidaten ungeeignet. Nachgedacht, wie man Kandidaten schnell einschätzen kann. Dauer: 3 Stunden.
- Fehlerbehebung: HDMAPMDK-1211 Problem mit falsch gelöschten Borders, bei der letzten Reparatur nicht erfolgreich behoben.
  Habe eine Idee, aber noch nicht fertiggeschrieben.
- War zum Sport.

### 2020-05-13

Fehlerbehebung: HDMAPMDK-1211 Lösung gefunden.

- Grundursache war eine unangemessene Segmentierung der Produktionslinie.

#### Ursachenanalyse

Es ist zu sehen, dass die Segmentierung erfolgte, bevor der Spurwechsel abgeschlossen war (die Fahrstreifenmittellinie überquerte noch die Fahrstreifenmarkierung), und diese Segmentierung möglicherweise Rp-Grenzen überschritt.

Die an den Shape-Points des Lane Centers haftenden Lane Border-Informationen zeichnen basierend auf der Geometrie treu mithilfe einer Scan-Line-Methode die seitlichen Fahrstreifenmarkierungen auf, ohne sie semantisch zu filtern. Daher wird an Positionen, an denen die Fahrstreifenmarkierung die Fahrspur überquert, die sich schneidende Fahrstreifenmarkierung sowohl im linken als auch im rechten Lane Border Ref des Lane Centers aufgezeichnet, das die Markierung schneidet.

Gemäß der bestehenden Logik wird beim semantischen Filtern der sich schneidenden Lane Border Refs basierend auf dem Spurwechseltyp der zu löschende Border Ref abgeleitet.

Die aktuelle Logik versagt bei dieser Art von Segmentierung, was zu diesem Problem führt.

#### Lösung

Der Kernpunkt liegt darin, **den Spurwechselfortschritt der sich schneidenden Fahrstreifenmarkierung zu finden**. Da diese Segmentierung Rp-Grenzen überschreiten kann, sollte die Filterung nicht auf Rp-Basis erfolgen.

1.  Zuerst die Fahrstreifenmarkierungen mithilfe von Edge Lifting in Paths organisieren (kann für zukünftige Graph-Refaktorierung in Betracht gezogen werden): Seq[LaneCenter]
2.  Den zu korrigierenden Lane Center und den zu korrigierenden Lane Border finden (hier wird angenommen, dass dieser Lane Center definitiv durch Spurwechsel verursacht wird).
3.  Den Spurwechselfortschritt dieses Lane Centers basierend auf dem LaneCenter-Path berechnen.
4.  Filterung durchführen.

An Ziliang übergeben.

Ein Vorstellungsgespräch, Kandidat nicht bestanden.

### 2020-05-14

HDMAPMDK-1132 ID-Tracing für Endpunkte von Schildfahrstreifenmarkierungen.

Das Tracing-Problem für Endpunkte von Schildfahrstreifenmarkierungen ist im Vergleich zum Tracing linearer Objekte sehr einfach, es gibt nur ID-Mapping, kein Offset- und Längen-Mapping.

Dennoch sind einige Punkte zu beachten:

1.  Prozedur
2.  Das ID-Typisierungssystem ist ein hartnäckiges Problem, das angegangen werden muss.

Das grundlegende Problem liegt darin, dass wir bei der ID-Definition durchgängig Long-IDs verwendet haben, während die MDM-Definition Int verwendet, was leicht zu Überlaufproblemen führen kann.

### 2020-05-15

#### Fehlerbehebungen

- HDMAPMDK-1215 abgeschlossen.
- HDMAPMDK-1218 erledigt.

### 2020-05-18

OSM Assembler refaktorisiert, verwendete das vorherige OSM serialize. Die Verständlichkeit und Schreibbarkeit des Codes haben sich verbessert.

### 2020-05-19

Einen OSM Assembler-Bug behoben (eigentlich kein richtiger Bug).

Heute Sprint-Planning-Meeting:
In diesem Sprint gibt es nicht viel zu tun, aber viel zu überlegen. Das ist ein gesunder Zustand.

### 2020-05-20

- [ ] Dokumentation zum aktuellen CI-Status von nexus/mdk und den Anforderungen schreiben.
- [x] HDMAPMDK-1263 Bug verfolgen.
  - Es handelt sich tatsächlich um ein Produktionslinien-Segmentierungsproblem.
- [ ] Meeting mit Yang Chuan über CI vereinbaren.
- [ ] HDMAPMDK-1262
      Nicht fertig geworden.
- [x] Problem mit benutzerdefinierten Geschwindigkeitsbegrenzungen.

### 2020-05-21

#### TODOs

- [x] Qiaobo begrüßen.
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### Arbeiten

- Morgens im Arbeitsbereich von Yiming online den Hotfix von gestern debuggt. Ursache war ein Offset-Problem. Gestern zu hastig geschrieben und überhaupt keine Tests hinzugefügt. Solches Verhalten sollte nicht mehr vorkommen. Dachte, ich hätte viel Zeit gespart, **aber letztendlich mehr Zeit verschwendet**.
- Grund für fehlende Daten bei 1262: MDK lädt keine Lane-Level-Road Marks (und Road Obstacles).
- Für Bruder Du Daten kompiliert.

### 2020-05-22

Was habe ich heute gemacht???
Was habe ich eigentlich gemacht???

### 2020-05-25

Heute eine neue Aufgabe erhalten: HDMAPMDK-1249 - Untersuchung einer Methode zur Berechnung der Lane Aggregation unter Verwendung von Straßengeometrieinformationen. Dadurch sind die Aufgaben für diese Woche etwas mehr geworden. Derzeit habe ich noch drei Dinge zu erledigen:

1.  1249
2.  Aktueller Stand, Anforderungen und Lösungsansatz für die CI-Pipeline im Team.
3.  Nexus-Graph-Refaktorierung.

Jede dieser Aufgaben erfordert sorgfältige Planung und ist nicht einfach. Leider kann ich für keine der Aufgaben die Zeit genau abschätzen. Es sind nur die von Weiyu geschätzten Story Points in den Jira-Aufgaben. Eins ist mir klar: **Wenn ich nicht anfange, abzuschätzen und zu reflektieren, werde ich es nie genau können**. Also ab jetzt genau abschätzen.

Außerdem plane ich, heute mit 1249 anzufangen, da es sich um eine geschäftliche Angelegenheit handelt, die in der Regel dringender ist und Weiyu mehr daran liegt. Was die Refaktorierung betrifft, wenn ich mich nicht darum kümmere, wird es wahrscheinlich niemand tun (weil es hart ist: Es beeinflusst nicht die Funktionalität, aber die Effizienz, und Effizienz ist am schwierigsten zu messen, selbst ich habe nur eine qualitative Analyse).

### 2020-05-26

Heute viele unerwartete Dinge: Zuerst wurden zwei Bugs im Parking gemeldet, ursprünglich für heute geplant, können aufgrund dieser Bugs nicht heute ausgeliefert werden. Wang Wei hat mit Downstream vereinbart, die Lieferung um zwei Tage auf übermorgen zu verschieben. Daher besteht meine Hauptarbeit in den nächsten zwei Tagen wieder aus Bugfixing. Das lässt mich über die Planung bei Lieferungen nachdenken. Dann das Problem HDMAPMDK-1290.

Heute erledigte Dinge:

- Folge von HDMAPMDK-1290: Wenn sehr nahe an der Stop-Line, ist der gematchte Lane-Offset länger als die Lane-Length.

  > Den ganzen Tag damit verbracht, dies zu untersuchen und zu lösen (aktuell 20:56 Uhr). Sehr ineffizient.

  Der Grund liegt darin, dass MDK bei der Längenberechnung die Länge zwischen je zwei Punkten berechnet und dann eine Koordinatentransformation durchführt. Obwohl dies genauer ist, führt es zu starker Unvorhersehbarkeit.

  Letztendlich eine Art Hack-Lösung verwendet: Wenn der berechnete Offset länger als die Länge ist, einfach nur die Länge nehmen.

- HDMAPMDK-1297 Falsche Parkplatzbindung.
  Obwohl es fast Feierabend ist (21 Uhr), muss ich dieses Problem heute zumindest analysieren!
  Habe es geschafft. War ein einfaches Problem.

### 2020-05-27

Heute sollte ich, wenn nichts dazwischenkommt, die CI-Pipeline-Sache abschließen.

Dann kam etwas dazwischen - -

Bugs von Yiming erhalten:

1.  Ampelsignalbindung: Eine Ampel, die an der Vorabbiegespur hätte gebunden werden sollen, wurde an der Partition davor gebunden. Bereits behoben (1,5h).
2.  Fehlende Ampelsignalbindung: Konnte nicht reproduziert werden.
    Update: Nach schwierigem Debugging endlich das Problem gefunden. Beim Kompilieren wurde für die rc- und Offset-Bindung nicht dieselbe Geometrielinie verwendet, was zu einem Offset führte, der die Straßenlänge überschritt, daher wurde die Ampel nicht gefunden (2h).

### 2020-05-28

Morgen praktische Führerscheinprüfung (Kategorie 2), heute den ganzen Tag Fahrstunde, erst um 17 Uhr zurück. Fühlt sich gut an, hoffe, morgen zu bestehen.

Mit der Beschreibung des aktuellen Stands und der Anforderungsanalyse für die CI-Pipeline begonnen - -

### 2020-05-29

Habe nicht bestanden. Ach, ist das schwer.

Morgens zur Prüfung, nachmittags ein paar Dinge erledigt:

1.  Bei Yiming eine Anomalie angeschaut, stellte sich als zwei Bugs heraus.
2.  Nach dem Townhall die MDK-Python-Binding-Sache abgestimmt.
3.  Mit Shanle und Weiyu nach unten gegangen, um ein Downstream-Problem zu lösen. Schlussendlich ein kurzfristiger und ein langfristiger Lösungsansatz.

Ich stelle fest, dass bei unerwarteten Problemen die Lösungsmethode generell diesem Muster folgen sollte:
Ein kurzfristiger Ansatz, ein langfristiger Ansatz. Denn der Wert, den ein Problem offenbart, ist begrenzt und hat eine zeitliche Begrenzung. Daher zielt der kurzfristige Ansatz darauf ab, die dringendsten Probleme schnell und präzise zu lösen. Braucht es dann noch einen langfristigen Ansatz? Im Allgemeinen ja, denn ein spezifisches Problem zeigt eine Klasse von blinden Flecken in bisherigen Lösungsansätzen auf. Dann gilt es, die Ursache zu analysieren und systematisch zu lösen, sodass diese Art von Problemen in Zukunft gut gelöst werden kann und die ursprüngliche Lösung vollständiger wird. Es gibt auch Fälle, die keinen langfristigen Ansatz erfordern, nämlich wenn wir **nach gründlicher Analyse** zu dem Schluss kommen: Der Aufwand für eine systematische Lösung des Problems ist höher als der Nutzen. (Selbst dann haben wir subjektiv oft den Drang, es systematisch zu lösen. Welcher Ingenieur möchte nicht systematisch Probleme lösen? Aber das birgt eine Falle: Man könnte sich in die Lösung von wichtigen, aber nicht dringenden oder weder wichtigen noch dringenden Dingen verstricken und damit wertvolle Zeit verschwenden, die für andere, wertvollere Probleme hätte verwendet werden können.)

4.  Abends weiter an der CI-Pipeline-Sache gearbeitet.

### 2020-06-01

Heute morgen gleich zu Yiming, um ein Problem zu analysieren, den ganzen Vormittag. Ergebnis: Ein bekanntes Problem (fehlende Punkte aufgrund von Interpolation im alten Compiler) verursachte ein anderes Problem: Beim Map-Matching genau in der Nähe des fehlenden Segments, wodurch der Lane-Offset negativ wurde.

Gearbeitet bis nach 16 Uhr, nach einer ineffizienten und qualvollen Nachtschicht (das Gefühl, dass Nachtschichten im aktuellen Zustand fast immer mit Ineffizienz einhergehen).

### 2020-06-02

Erst nachmittags gekommen, wegen Yimings Fahrt einige Bugs behoben, rechtzeitig für Yimings Abendfahrt.

### 2020-06-03

Heute morgen gleich zu Yiming, um das über Nacht entdeckte Problem zu lösen: Ampelsignale konnten nicht abgerufen werden.

### 2020-06-04

Heute morgen drei Dinge zu erledigen:

1.  Datenbereinigung und Upload der finalen 0605-Daten.
2.  Überprüfung des Breitenanomalie-Problems - Grund: An dieser Position gab es keine Fahrspur.
3.  Überprüfung des Problems mit falsch zugewiesenen Interpolationspunkten zu Fahrspuren.
4.  Nachkontrolle.

### 2020-06-05

Ein spannender und aufregender Tag. HDMAPMDK-1347 und HDMAPMDK-1352 abgeschlossen und eine große Refaktorierung durchgeführt.

Eine wertvolle Lektion gelernt: Kurz vor einer Auslieferung keine riesigen Änderungen vornehmen, denn ohne ausreichende QA-Tests kann selbst die brillanteste Refaktorierung Risiken bergen. Gleichzeitig, ohne genug Zeit für ein Design-Review (ich meine für mich selbst, denn manchmal stellt man beim Implementieren fest, dass das Design vielleicht falsch ist – allerdings ist das Erkennen von Designfehlern während der Implementierung ein anderes Problem, nämlich zu früh mit der Implementierung zu beginnen).

Montag, Ergänzung:
Während dieser spannenden Refaktorierung hatte ich kaum eine Pause, nicht einmal Zeit zum Nachdenken, nur Abhängigkeit von Vertrautheit und Flow, um mit hoher Effizienz Code zu schreiben. Eigentlich, wenn man das Prinzip ignoriert, vor Auslieferungen keine großen Refaktorierungen durchzuführen, genieße ich diesen Zustand sehr. Aber alles braucht ein Ziel und einen Sinn, man kann nicht nur seinem eigenen Vergnügen nachgehen, sonst wird dieses Vergnügen zu einem niederen Instinkt.

### 2020-06-08

Samstag nach Beijing gezogen, um dort zu arbeiten.

Das Gefühl, wieder in Beijing zu arbeiten, ist etwas ungewohnt, alles hat sich verändert. Zuerst habe ich keinen festen Arbeitsplatz mehr (Xiuyun hat einen Praktikanten eingestellt, für die Arbeitserleichterung sitzt dieser nun dort). Das ist das unangenehmste unter allen Enttäuschungen. Es ist, als wäre ich in der Oberstufe in eine neue Klasse gekommen, auf einem neuen Platz sitzend, niemanden kennend und nicht mit ihnen sprechen wollend. Die Leute hier wirken vertraut und doch fremd. Ich habe das Gefühl, hier wenige Freunde zu haben, was ich rational für eine Täuschung halte. Aber das Gefühl, nicht mit Menschen kommunizieren zu wollen, eine Ecke zu suchen, um dort zu sein, ist real, und ich habe tatsächlich eine Ecke gefunden, neben Yuzhang. Warum will ich nicht mit Menschen kommunizieren? Das verstehe ich immer noch nicht. Vielleicht weil es keinen offiziellen Grund gibt? Auf die Frage, warum ich nach Beijing gekommen bin und wie lange ich bleibe, antworte ich ausweichend: eine Weile, ein, zwei Monate. Vielleicht zeigt es auch, dass ich im Grunde ein introvertierter Mensch bin, der keine Umstände mag und besonders darauf bedacht ist, in den Augen anderer nicht dumm zu wirken. Je mehr ich schreibe, desto mehr denke ich, dass der zweite Grund überwiegt und unnötig ist. Erstens: Dumm wirken ist besser als wirklich dumm zu sein. Aufrichtig um Rat fragen, auch wenn es unbeholfen ist. Hab keine Angst, sei in jungen Jahren nicht ängstlich. Überhaupt keine Angst haben. Alles ist gut.

Zur Arbeit: In dieser Zeit war ich mit der Auslieferung beschäftigt, hauptsächlich der TLM-Refaktorierung (Typed Lane Model). Diesmal muss ich das Ziel klar definieren, mich selbst kontrollieren, nicht impulsiv refaktorieren, sondern strategisch vorgehen und meinen Fortschritt kontrollieren.

Außerdem habe ich meinen Desktop-PC zum Laufen gebracht. Der Grund, warum er vorher keine Netzwerkverbindung hatte, war, dass ich das Passwort geändert hatte und nach einem Stromausfall die Verbindung komplett verloren ging. Also muss ich den PC noch einrichten. Diesmal sind die Prioritäten:

1.  Produktivität
2.  Coolness
3.  Aussehen

Heute lange Wang Yins Blog gelesen - - immer noch am Entgiften. Früher war ich immer ein fanatischer Religionsanhänger, der die Essenz der Dinge nicht sehen konnte. Ich dachte immer, etwas sei die ultimative Lösung für alle Probleme, aber solche "ultimativen Lösungen" gibt es selten, meistens ist es nur religiöser Eifer, wie z.B.

-   Vim vs Emacs
-   OOP vs FP
-   Go vs Rust

usw. ... Als ich früher mit OOP in Berührung kam, dachte ich, OOP sei unschlagbar und könne alle Probleme lösen, aber am Ende schrieb ich nur eine riesige Klasse, die eigentlich unnötig war. Was wirklich nützlich waren, waren die einzelnen Funktionen unter dieser Klasse. In den letzten Jahren, als ich FP kennenlernte, dachte ich, FP sei die Silberkugel für alle Probleme, aber nachdem ich eine Weile Scala programmiert hatte, stellte ich fest, dass meine Produktivität sich nicht wirklich verbesserte, sondern ich mich wegen Grammatik und Immutability in Details verlor, was meine Effizienz senkte.

### 2020-06-09

Habe etwas meinen Zustand gefunden, Arch installiert. Fühlt sich sogar angenehmer an als Mac?

Mit Yuzhang eine Weile Hearthstone Battlegrounds gespielt - -

### 2020-06-10

Heute geplante Aufgaben:

1.  HDMAPMDK-1199 RoadMark als Subklasse, um reichhaltigere Informationen bereitzustellen.
2.  HDMAPMDK-892 Erfahrungstrajektorien bereitstellen.

Falls noch Kapazität da ist, die Release-Dokumentation bearbeiten.

Habe 892 erledigt.

### 2020-06-11

HDMAPMDK-892 - Bereitstellung von Erfahrungstrajektorien reviewed.

Festgestellt, dass MDK noch keine entsprechende Anpassung hat, heute Nachmittag daran gearbeitet.

Anpassung abgeschlossen, bin sehr müde.

Weiter an meinem Arch herumgebastelt, versucht, die Schritte meiner PC-Einrichtung als Teil der Automatisierung zu dokumentieren.

### 2020-06-12

Heutige Aufgabe: HDMAPMDK-1199 erledigen, hatte das Problem vorher vergessen.

Habe es endlich um 20 Uhr geschafft.

### 2020-06-13

Ein sehr entspannter Tag. Nach dem Test-Release die ganze Zeit an meinen Automatisierungsskripten gebastelt.

Anfangs wollte ich Shell verwenden, aber ich mag Shell nicht wirklich, also mit Scheme angefangen. Wirklich cool.

### 2020-06-15

Wow, es ist schon 15 Uhr und ich habe den halben Tag rumgepimmelt, verschiedene Scheme-Websites durchsucht. Das darf nicht so weitergehen.

Heute muss HDMAPMDK-1378 erledigt werden, also das, was wir immer vermeiden wollten: Im Kreuzungsinneren eine sogenannte Lane Mark Direction hinzuzufügen. Aber in Kreuzungen gibt es keine Fahrstreifenmarkierungen, wie kann es da eine Lane Mark Direction geben?

Es macht mich verrückt, nach vielen Hin und Her bis spät gearbeitet.

### 2020-06-16

Heute nach dem Kommen die ganze Zeit Reviews gemacht, es gab viel zu ändern, dann begann ich wieder etwas zu prokrastinieren, habe es mit Mühe geschafft, dann hat Bruder Kuan noch mehrere Bugs gefunden.

Nachmittags erfuhr ich, dass Bruder Xiao geht. Ich war lange schockiert.

Abends ein bisschen mit Scheme herumgespielt, das Kompilieren und Referenzieren von benutzerdefinierten Libraries hinbekommen.

### 2020-06-17

Heutige Hauptarbeit: Abschlussarbeiten des letzten Sprints, also Bugfixes.

### 2020-06-18

Bis heute haben wir endlich die Dinge des letzten Sprints abgeschlossen.

Ich fühle mich insgesamt sehr schlecht, weil die Bedeutung der getanen Arbeit nicht klar ist, eigentlich denke ich, sie ist fast bedeutungslos.

Wie definiere ich hier Bedeutung?

Die Bedeutung der aktuellen Arbeit für mich ist, Priorität von hoch nach niedrig:

1.  Die Fähigkeit, Probleme zu identifizieren, wertvolle, sinnvolle Probleme zu erkennen.
2.  Die Fähigkeit aufbauen, Probleme zu modellieren, um in Zukunft mehr Probleme verschiedener Art lösen zu können.
3.  Probleme modellieren, um Lösungen zu ermöglichen, die mit einem einmaligen Aufwand eine ganze Klasse von Problemen lösen, wie sie das Modell beschreibt.
4.  Durch meine Bemühungen konkrete, sinnvolle Probleme lösen. Dabei ist das einmalige Lösen eines einzelnen Problems weniger bedeutungsvoll als der Einsatz von Aufwand, um mehrere Probleme dieser Klasse zu lösen.
5.  Freude bewahren, das Erfolgserlebnis beim Problemlösen, die intrinsische Interessantheit des Problems selbst.
6.  Kommunikation und Beziehungen zu Menschen.
7.  Gehalt (das ist eine Absicherung, nicht dass es unwichtig wäre, sondern die anderen Teile sollten darauf aufbauen).

Das umfasst wahrscheinlich nicht alle meine Arbeitsmotive, aber es spiegelt zumindest einen Teil der Realität wider.

Der Grund für meine Niedergeschlagenheit heute liegt meiner Meinung hauptsächlich im Verlust der Interessantheit. Erstens ist die Bedeutung des Problems selbst für mich nicht klar, was die Motivation mindert. Zweitens ist die Modellierung dieser Art von Problemen nicht präzise genug, was dazu führt, dass die Lösungsmethode nicht alle Probleme lösen kann (natürlich gibt es selten Modelle, die alle Probleme lösen, da Modelle per Definition Vereinfachungen und Abstraktionen von Problemen sind; hier sprechen wir vom Lösen akzeptabler Probleme), was zu Wiederholungen führt. Konkret: Die von QA-Mitarbeitern gemeldeten Bugs, obwohl einige auf unzureichendes Verständnis der Anforderungen oder sogar Testprobleme zurückzuführen sind, nimmt die Analyse der Probleme selbst den zeitaufwändigsten Teil des Lösungsprozesses ein.

Manchmal führt unzureichendes Problemverständnis zu nicht-fundamentalen Lösungen, was dazu führt, dass man Zeit mit nutzlosen Dingen verbringt, wodurch die Punkte 3, 4 und 5 der oben genannten Bedeutung nicht erfüllt werden, was mich niedergeschlagen macht.

Ein weiterer zu bedenkender Punkt ist, dass ich bisher nur Probleme des letzten Sprints gelöst habe und noch gar nicht mit den Aufgaben dieses Sprints begonnen habe. Das wird die Zeit dieses Sprints verkürzen und möglicherweise auch nachfolgende Sprints beeinflussen. Das ist ein sehr unerwünschter Teufelskreis, der, wenn man noch weiter denkt, sogar zwischenmenschliche Beziehungen beeinflussen könnte, was meiner Meinung nach noch unerwünschter ist.

Daher sollte ich ab morgen,
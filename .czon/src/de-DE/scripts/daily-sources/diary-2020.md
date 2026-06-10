---
title: 2020 Arbeitstagebuch
date: 2020-01-01
taxonomies:
  tags:
    - Arbeitstagebuch
    - Monatsrückblick
    - Technik
---

### 2020-04-13

- Selbstbewertung der Leistung abgeschlossen
- Überarbeitung der Lane Center Aggregation

### 2020-04-14

- [ ] Geschwindigkeitsbegrenzung kompilieren
- [ ] Benutzerdefinierte Geschwindigkeitsbegrenzung

### 2020-04-15

- Festlegung des benutzerdefinierten Geschwindigkeitsbegrenzungsansatzes @guangcong
  1. Verwendung des neuen module-dynamicEvent, um dieses Problem zu lösen
  2. Update der benutzerdefinierten Geschwindigkeitsbegrenzung als neues Ereignis veröffentlichen, das das Update der horizon data auslöst
  3. Berücksichtigung von Ausnahmeprüfung und Speicherproblemen
     Nach Diskussion mit Guangcong hatte er einige Probleme
- Review von Xiaokang
  Java als solide Sprache hat definitiv etwas zu bieten
- Geschwindigkeitsbegrenzung kompilieren
  Grundsätzlich keine Fortschritte, nur Logik zum Extrahieren von RoadCenterTile hinzugefügt
- Sectioning-Problem gelöst, Optimierungsansatz für edgeLifting analysiert, Optimierungsalgorithmus vorgeschlagen:
  Gegeben traverse Kopf und connectivity Funktion, Traversierungsweise angeben
- Untersuchung des Prinzips eines selbstausführenden Jars

### 2020-04-16

- Schnittstelle für custom speed limit mit Yiming geklärt: Er garantiert, dass das eingegebene location pair eine eindeutige kürzeste Route bestimmen kann.
  Nach der Rückkehr mit Guangcong den Algorithmus zur Generierung des custom speed limit ausgearbeitet
  1. Gegebene Route
  2. Bekannt: | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
     Dann kann definitiv ein Paar ( start DiRoadOnPath, end DiRoadOnPath) gefunden werden, das die kürzeste Entfernung ergibt
- Temporäre Veröffentlichung einer nutzbaren Snapshot-Version des pylon-v0.1.1 Compilers für Xiaokang
- Mit Hanteng im Erdgeschoss herumgelaufen und Unsinn geredet
- Schnittstelle für SUMO-Kartennutzung mit Zizhe und Yicheng geklärt
- Speed Limit Kompilierung erfolgreich, aber noch nicht verifiziert

### 2020-04-17

- Verifikation der SpeedLimit Kompilierung:
  OSMSerializable ist nicht geeignet, da das gebundene SpeedLimit keine Geometrie hat
  Mögliche Probleme: Bei der Einfahrt in eine Rampe könnten Probleme bei der Geschwindigkeitsbegrenzungsbindung auftreten
- [ ] Interpolation
- [ ] Hausdorff-Distanz
- [ ] LcInJunctionTile

#### Einige kreative Ideen

- Direkt Spark verwenden?
- Was benötigt der OSM Context?

### 2020-04-18

Geschwindigkeitsbegrenzung abgeschlossen

### 2020-04-20

#### Benutzerdefinierte Geschwindigkeitsbegrenzung

- Guangcong hat die Eingabe in einen vector geändert und Tests hinzugefügt
- Ein kleines Problem ist, dass Guangcong die Funktionsweise von C++-Zeigern nicht wirklich versteht
- [ ] Vielleicht versuchen, [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337) zu lösen?
- [ ] Die Dateien des Mentors als anonymen Share über Resillo Sync teilen

#### RoadBorder-Reparatur

Festgestellt, dass ich falsche Annahmen getroffen habe. Die in rc aufgezeichneten lc- und rb-Informationen können Folgendes enthalten:

1. Es gibt nur einen lc, daher kann nicht angenommen werden, dass lc mindestens zwei hat.
2. Auf einer Seite kann es vorkommen, dass rb nicht existiert, daher kann nicht angenommen werden, dass rb immer existiert.

### 2020-04-21

#### RoadBorder-Reparatur

- Migration der Testfälle abgeschlossen
- Dune und dessen ReadMe verbessert, sodass es direkt Testdaten ausgeben kann
  Mit Weiyu gesprochen und in die Zukunft geblickt: Ich konzentriere mich auf das Kompilierungssystem

#### POI-Bindung für Gegenfahrbahn

- Binding der Daten nach Multidigitize

### 2020-04-22

#### POI-Bindung für Gegenfahrbahn

- Binding der Daten nach Multidigitize
- Konstruktion von Testdaten

### 2020-04-23

- POI-Bindung für Gegenfahrbahn abgeschlossen und Debugging beendet[4]

### 2020-04-27

Heute hauptsächlich folgende Punkte:

#### Abschluss der Synchronisation von mdm proto und mdm spec

1. Zusammen mit Linnan einige falsche Formulierungen in der mdm spec korrigiert
2. Einige offene Punkte hinterlassen, die Linnan und ich nicht allein entscheiden konnten
3. Im Morgenmeeting am 2020-04-26 entschieden, die kompliziertesten Punkte LaneSplitMerge und Polyline auf später zu verschieben
4. Änderungen am proto abgeschlossen
5. Änderungen an nexus abgeschlossen
6. Änderungen an mdk abgeschlossen
7. Nebenbei auch ein Problem mit Testdaten behoben (ständige Datenfehlermeldungen)

#### Fehlerbehebungen

Kurz vor dem Release am 430.04, Anzahl der Fehler stark gestiegen

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) Analyse abgeschlossen

- [ ] Skript zum automatischen Kopieren von Testfällen
- [ ] Export von Apple Reminder

### 2020-04-28

Habe für die theoretische Prüfung (Führerschein) gelernt, einen halben Tag gebraucht

HDMAPMDK-1130 Breitenproblem, drei Probleme:

1. Spec schreibt vor, dass es beim Spurwechsel keine Fahrbahnbreite gibt
2. Zu lange intersection-Linien, die Split-Linien verursachen

HDMAPMDK-1121 erneut repariert

Sehr schlechter Zustand

### 2020-04-29

#### Fehlerbehebungen

- HDMAPMDK-1143
  Problem: RoadObstacle wurde nicht kompiliert
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Mill verwenden
- nexus-osm verwenden

#### Brainstrom

### 2020-05-08

#### Speicherleck-Problem

- Die direkte Ursache des Speicherlecks ist, dass der Dangling-Zeiger nach dem new nicht mit delete freigegeben wurde.
- Nach dem Update der aktuellen Position ruft map kit prepareGuidanceData auf, um die guidance data zu finden, die der aktuellen Position am nächsten ist.
- prepareGuidanceData ruft NavInfoProviderImpl::getTrafficLights und NavInfoProviderImpl::getCarParks auf.
- Am Beispiel von NavInfoProviderImpl::getTrafficLights: Beim Aufruf werden die Datenzeiger in NaviEventOnPath mit new erstellt.
- Diese werden jedoch nicht mit delete freigegeben.
- Festgestellt, dass auch DestEvent dieses Problem aufweist.

Lösung: Kern ist, Dangling-Zeiger zu vermeiden. Entscheidung, NaviEventProvider zu refaktorisieren.

- Zunächst zwei Felder in NaviInfoProvider hinzufügen: traffic_light_events und car_park_events.
- In NaviInfoGenerator, nachdem die Route aktualisiert wurde, diese beiden Felder aktualisieren.
- Bei jedem get dann basierend auf der aktuellen Fahrzeugposition filtern.
- Daher muss `PathReader::getAttributes` refaktorisiert werden: Grund ist, dass die vorherige Implementierung nur den Offset relativ zum aktuellen Fahrzeug berücksichtigte, jetzt wird ein Offset-Interface relativ zum Path benötigt.

### 2020-05-09

#### PolyLine-Reparatur und Tests

Das Problem mit PolyLine ist hauptsächlich, dass bei der Generierung von PolyLine möglicherweise doppelte Punkte eingefügt werden, was zu einer Reihe von geometrieabhängigen Segmentberechnungsproblemen führt:

1. Vektorberechnung: Zwei doppelte Punkte ergeben einen Nullvektor.
2. Längenberechnung: Die Segmentlänge ist 0, was leicht zu NaN-Problemen führt.

Deshalb wird beim Konstruieren von PolyLine eine Prüfung der Punkte in PolyLine durchgeführt. Wenn doppelte Punkte gefunden werden, wird eine Ausnahme ausgelöst.

Folgende Probleme wurden gefunden:

- Problem bei Jts getEnd
- Problem bei Jts LinearLocation mit normalize

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // das Ergebnis ist -1
  ```

- Beim Interpolieren kann es vorkommen, dass zwei zu nahe Punkte ausgewählt werden.

### 2020-05-11

- HDMAPMDK-1122
  Problem mit fehlender Fahrbahnrandlinie nicht reproduzierbar: Entscheidung, keine weitere Zeit für die Ursachenforschung aufzuwenden.
- Metabolic Growth Theory 30 Minuten
- Visitor-Refaktorisierung, sodass es Linien mit gleichem Start- und Endpunkt unterstützt.
- Vorbereitung einer Interviewfrage.

### 2020-05-12

- Interview: Beide Kandidaten nicht qualifiziert; Überlegung, wie man Kandidaten schnell identifizieren kann, 3 Stunden aufgewendet.
- Fehlerbehebung: HDMAPMDK-1211, Problem mit fälschlicherweise gelöschtem border, bei der letzten Reparatur nicht erfolgreich behoben.
  Idee vorhanden, aber nicht fertig geschrieben.
- Fitnessstudio besucht.

### 2020-05-13

Fehlerbehebung: HDMAPMDK-1211, Lösung gefunden.

- Grundursache: Unvernünftige Aufteilung in der Produktionslinie.

#### Ursachenanalyse

Es ist ersichtlich, dass die Aufteilung bereits erfolgt, bevor der Fahrspurwechsel abgeschlossen ist (die Fahrspurmittelachse überquert die Fahrspurmarkierung), und diese Aufteilung möglicherweise Rp überschreiten kann.

Da die an den Formpunkten der Fahrspurmitte anhaftenden Fahrspurrand-Beobachtungsinformationen die Fahrspurlinien auf beiden Seiten getreu der Geometrie unter Verwendung der Scan-Line-Methode aufzeichnen, ohne eine semantische Filterung vorzunehmen. An der Stelle, an der die Fahrspurlinie die Fahrspur überquert, zeichnet die die Fahrspurlinie kreuzende Fahrspurmitte diese Fahrspurlinie gleichzeitig in den linken und rechten Lane-Border-Refs auf.

Unter der aktuellen Codelogik werden bei der semantischen Filterung der Border-Refs der kreuzenden Fahrspurlinien basierend auf dem Fahrspurwechseltyp die zu löschenden Border-Refs abgeleitet.

Die aktuelle Logik funktioniert bei solchen Aufteilungen nicht, was zu diesem Problem führt.

#### Lösung

Kernpunkt: **Finden der Wechselrichtung der kreuzenden Fahrspurlinie**. Da solche Aufteilungen Rp überschreiten können, sollte die Filterung nicht auf Rp-Ebene erfolgen.

1. Zuerst die Fahrspurlinien mit Edge Lifting als Path organisieren (für zukünftige Graph-Rekonstruktion): Seq[LaneCenter]
2. Die zu korrigierende LaneCenter und die zu korrigierenden Lane-Border finden (Annahme: solche LaneCenter werden definitiv durch Fahrspurwechsel verursacht).
3. Basierend auf dem LaneCenter-Path die Wechselrichtung dieser LaneCenter berechnen.
4. Filtern.

An Ziliang delegiert.

Interview: Ein Kandidat nicht bestanden.

### 2020-05-14

HDMAPMDK-1132 ID-Tracing für Endpunkte von Stangen- und Fahrspurlinien.

Das ID-Tracing für Endpunkte von Stangen- und Fahrspurlinien ist im Vergleich zum Tracing von linearen Objekten sehr einfach: Es gibt nur eine ID-Zuordnung, keine Offset- und Längen-Zuordnungen.

Allerdings müssen dennoch einige Aspekte berücksichtigt werden:

1. Verfahren
2. Das ID-Typing-System ist ein chronisches Problem, das bewältigt werden muss.

Das Problem liegt im Kern darin, dass wir bei der Definition von IDs ausschließlich Long-IDs verwenden, während die MDM-Definition Int verwendet, was leicht zu Überlaufproblemen führen kann.

### 2020-05-15

#### Fehlerbehebungen

- HDMAPMDK-1215 abgeschlossen
- HDMAPMDK-1218 erledigt

### 2020-05-18

Refaktorisierung des OSM Assembler: Verwendung der vorherigen OSM-Serialisierung, Verständlichkeit und Schreibbarkeit des Codes verbessert.

### 2020-05-19

Einen Bug im OSM Assembler behoben (eigentlich kein richtiger Bug).

Heute Sprint-Planning-Meeting:
Dieser Sprint hat nicht viele Aufgaben, aber viel Denkarbeit. Das ist ein gesunder Zustand.

### 2020-05-20

- [ ] Dokument schreiben, das den aktuellen Status und die Anforderungen von nexus/mdk CI beschreibt.
- [x] HDMAPMDK-1263 Bug überprüfen
  - In der Tat ein Problem mit der Aufteilung in der Produktionslinie.
- [ ] Treffen mit Yang Chuanhui bezüglich CI vereinbaren.
- [ ] HDMAPMDK-1262
      Noch nicht erledigt.
- [x] Custom Speed Limit Problem

### 2020-05-21

#### TODOs

- [x] Mit Qiaobo grüßen
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### Arbeiten

- Morgens zu Yimings Arbeitsbereich gegangen, um das gestrige Hotfix online zu debuggen. Ergebnis: Ursache war ein Offset-Fehler. Gestern zu hastig geschrieben und überhaupt keine Tests hinzugefügt. Solches Verhalten sollte nicht wieder vorkommen. Dachte, ich spare viel Zeit, **habe aber am Ende noch mehr Zeit verschwendet**.
- Bei 1262 konnten keine Daten abgerufen werden, weil MDK das Lane-Level Road Mark (und Road Obstacle) nicht geladen hatte.
- Für Du Ge Daten kompiliert.

### 2020-05-22

Was habe ich an diesem Tag gemacht????
Was habe ich gemacht????

### 2020-05-25

Heute eine neue Aufgabe erhalten: HDMAPMDK-1249 – Untersuchung der Methode zur Berechnung von Lane Aggregation unter Verwendung von Straßengeometrieinformationen. Dadurch sind diese Woche mehr Aufgaben hinzugekommen. Stand jetzt habe ich noch drei Dinge zu erledigen:

1. 1249
2. Aktueller Stand, Anforderungen und Lösungen für die CI-Pipeline im Team
3. Nexus-Graph-Rekonstruktion

Jede dieser Aufgaben erfordert sorgfältige Überlegung und ist nicht einfach. Leider kann ich für keine der Aufgaben die Zeit genau abschätzen. Sie wurden alle von Weiyu geschätzt und als Story Points in Jira eingetragen. Eins ist mir klar: **Wenn ich nicht anfange zu schätzen und zu reflektieren, werde ich es nie genau schätzen können.** Also fange ich ab jetzt an, genau zu schätzen.

Außerdem plane ich, heute mit 1249 zu beginnen, da es sich um eine geschäftliche Angelegenheit handelt, die in der Regel dringender ist und Weiyu auch mehr daran interessiert sein wird. Was die Rekonstruktion betrifft, wenn ich mich nicht selbst darum kümmere, wird sich wahrscheinlich niemand darum kümmern (das ist grausam: Sie beeinträchtigt nicht die Funktionalität, aber die Effizienz, und Effizienz ist am schwierigsten zu messen – selbst ich habe nur eine qualitative Analyse).

### 2020-05-26

Heute gab es viele unerwartete Ereignisse. Zuerst wurden zwei Bugs im Parking gemeldet. Ursprünglich sollte heute ausgeliefert werden, aber wegen dieser beiden Bugs konnte heute nicht ausgeliefert werden. Wang Wei hat mit dem nachgelagerten Bereich besprochen, die Lieferung um zwei Tage auf übermorgen zu verschieben. Also sind meine Hauptaufgaben für diese zwei Tage wieder die Fehlerbehebung. Das lässt mich über die Sinnhaftigkeit der Terminplanung bei Auslieferungen nachdenken. Dann gab es noch das Problem HDMAPMDK-1290.

Was heute erledigt wurde:

- Folgearbeiten zu HDMAPMDK-1290: Wenn man sehr nahe an der Stop-Linie ist, kann der gematchte Lane-Offset länger sein als die Lane-Länge.

  > Habe den ganzen Tag damit verbracht, das Problem zu untersuchen und eine Lösung zu finden (aktuell 20:56 Uhr). Sehr ineffizient.

  Der Grund ist, dass MDK bei der Längenberechnung für jedes Punktepaar eine Koordinatentransformation durchführt. Das ist zwar genauer, führt aber zu großer Unsicherheit im Ergebnis.

  Letztendlich einen Hack verwendet: Wenn der berechnete Offset länger als die Länge ist, nimm einfach die Länge.

- HDMAPMDK-1297 Falsche Bindung von Parkplätzen
  Obwohl es fast Zeit für den üblichen Feierabend war (21 Uhr), wollte ich heute zumindest dieses Problem analysieren! Schließlich geschafft. Es stellte sich als einfaches Problem heraus.

### 2020-05-27

Heute sollte ich, wenn nichts Unerwartetes passiert, die CI-Pipeline-Aufgaben erledigen.

Es ist etwas Unerwartetes passiert.

Bug-Meldung von Yiming erhalten:

1. Ampelschaltung falsch gebunden: Eine Ampel, die in den Wartebereich hätte gebunden werden sollen, wurde an die Partition vor dem Wartebereich gebunden. Behoben (1,5 h).
2. Ampel fehlt: Nicht reproduzierbar.
   Update: Nach einem schwierigen Debugging endlich die Ursache gefunden: Bei der Kompilierung wurde für die Bindung von rc und Offset nicht dieselbe Geometrielinie verwendet, was dazu führte, dass der Offset die Straßenlänge überschritt, sodass die Ampel nicht gefunden wurde (2 h).

### 2020-05-28

Morgen praktische Prüfung (Führerschein). Heute den ganzen Tag geübt, erst um 17:00 zurück. Fühlte mich ganz gut. Hoffe, ich bestehe morgen.

Mit der Beschreibung des aktuellen Status und der Bedarfsanalyse der CI-Pipeline begonnen.

### 2020-05-29

Doch nicht bestanden. Ach, ich hab's schwer.

Morgens zur Prüfung. Nachmittags ein paar Dinge erledigt:

1. Zu Yiming gegangen, um eine Anomalie zu untersuchen – es stellten sich zwei Bugs heraus.
2. Nach der Townhall eine Synchronisation zu MDK Python Binding durchgeführt.
3. Mit Shanle und Weiyu runtergegangen, um Probleme der nachgelagerten Stelle zu lösen. Am Ende eine kurzfristige und eine langfristige Lösung zusammengefasst.

Ich stelle fest, dass bei unerwarteten Problemen der Lösungsansatz normalerweise so aussieht:
Eine kurzfristige und eine langfristige Lösung. Denn der durch das Problem aufgedeckte Wert ist begrenzt und zeitkritisch. Die kurzfristige Lösung zielt darauf ab, das dringendste Problem schnell und gezielt zu lösen. Braucht es dann noch eine langfristige Lösung? Normalerweise schon, denn ein Einzelfall offenbart eine bisher nicht bedachte Schwachstelle im Lösungsansatz. Dann sollte man die Ursache analysieren und das Problem systematisch lösen, sodass solche Probleme in Zukunft gut gelöst werden können und der ursprüngliche Lösungsansatz vervollständigt wird. Es gibt auch Fälle, in denen keine langfristige Lösung nötig ist: Wenn wir nach **gründlicher Analyse** des Problems zu dem Schluss kommen, dass der Aufwand für eine systematische Lösung höher ist als der Nutzen. (Selbst dann möchten wir subjektiv meistens trotzdem eine systematische Lösung – welcher Ingenieur möchte das nicht? Das birgt aber die Gefahr, dass man sich mit wichtigen, aber nicht dringenden oder sogar unwichtigen und nicht dringenden Dingen beschäftigt und kostbare Zeit verschwendet, die für wertvollere Probleme genutzt werden könnte.)

4. Abends zurück, um an der CI-Pipeline weiterzuarbeiten.

### 2020-06-01

Heute Morgen direkt zu Yiming gegangen, um ein Problem zu analysieren. Den ganzen Morgen analysiert. Ergebnis: Es handelte sich um eine Folge eines bekannten Problems (Punktverlust durch alten Compiler) – beim Auffinden der Route befand man sich zufällig in der Nähe des fehlenden Segments, sodass der Lane-Offset negativ war.

Das hat bis weit nach 16:00 Uhr gedauert. Nach einer ineffizienten und schmerzhaften Nachtschicht (in meinem jetzigen Zustand ist Nachtschicht fast immer ineffizient).

### 2020-06-02

Kam erst nachmittags. Für Yimings Einstieg (Fahrzeug) einige Bugs behoben, sodass er abends fahren konnte.

### 2020-06-03

Morgens direkt zu Yiming, um die nächtlichen Probleme zu lösen: Ampel nicht abrufbar.

### 2020-06-04

Heute Morgen drei Dinge zu erledigen:

1. Datenbereinigung und Hochladen der endgültigen Daten von 0605
2. Überprüfung des Breitenanomalie-Problems – lag daran, dass an dieser Stelle keine Fahrspur vorhanden war.
3. Überprüfung des Problems, dass Interpolationspunkte der falschen Fahrspur zugewiesen wurden.
4. Nachkontrolle.

### 2020-06-05

Ein spannender und stressiger Tag. HDMAPMDK-1347 und HDMAPMDK-1352 abgeschlossen, dazu eine große Refaktorisierung durchgeführt.

Eine wertvolle Lektion gelernt: Kurz vor der Auslieferung sollte man keine riesigen Änderungen vornehmen. Denn ohne ausreichende QA-Tests kann jede noch so großartige Refaktorisierung Risiken bergen. Und ohne genügend Zeit für ein Design-Review (ich meine mich selbst, denn manchmal stellt man während des Schreibens fest, dass das Design falsch sein könnte – ein weiteres Problem, wenn man zu früh mit der Implementierung beginnt).

Montag Ergänzung:
An diesem intensiven Tag der Refaktorisierung hatte ich kaum eine freie Minute. Ich hatte nicht einmal Zeit zum Nachdenken, sondern habe mich nur auf Vertrautheit und Flow verlassen, um mit hoher Effizienz Code zu schreiben. Wenn man das Prinzip außer Acht lässt, dass man vor einer Auslieferung keine großen Refaktorisierungen durchführen sollte, habe ich diesen Zustand eigentlich sehr genossen. Aber alles muss einen Zweck und eine Bedeutung haben. Man darf sich nicht nur selbst daran erfreuen, sonst wird diese Freude zu einer niederen Befriedigung.

### 2020-06-08

Am Samstag nach Beijing zur Arbeit gezogen.

Das Gefühl, wieder in Beijing zu arbeiten, ist etwas ungewohnt. Alles hat sich geändert: Zuerst habe ich keinen Arbeitsplatz mehr (Xiuyun hat einen Praktikanten eingestellt, der jetzt auf meinem Platz sitzt). Das ist der unangenehmste Punkt von allen. Es ist, wie als ich in der 11. Klasse in die erste Klasse wechselte, mich an einen neuen Platz setzte, niemanden kannte und nicht mit ihnen reden wollte. Die Leute hier wirken vertraut und doch fremd. Ich habe das Gefühl, hier wenige Freunde zu haben, obwohl mein logischer Verstand sagt, dass das eine Illusion ist. Aber der Wunsch, nicht mit Menschen zu kommunizieren und mich in eine Ecke zu verkriechen, ist real. Und ich habe tatsächlich eine Ecke gefunden, neben Yuzhang. Warum möchte ich nicht mit Menschen reden? Ich kann mir keinen Reim darauf machen. Vielleicht weil ich keinen triftigen Grund habe? Wenn man fragt, warum ich nach Beijing komme und wie lange ich bleibe, antworte ich zögernd: "Eine Weile, ein oder zwei Monate." Vielleicht zeigt das auch, dass ich im Kern ein introvertierter Mensch bin, der keine Umstände machen will und besonders darauf bedacht ist, in den Augen anderer nicht dumm zu wirken. Aber je mehr ich schreibe, desto mehr denke ich, dass der zweite Punkt einen größeren Anteil hat und unnötiger ist. Erstens: Dumm zu wirken ist besser, als tatsächlich dumm zu sein. Wenn man ernsthaft um Rat fragt, auch wenn es unbeholfen ist. Hab keine Angst, wenn du jung bist. Hab niemals Angst. All is well.

Und nun zur Arbeit. In dieser Zeit war ich mit der Auslieferung beschäftigt, hauptsächlich mit der Refaktorisierung von TLM (Typed Lane Model). Dieses Mal werde ich mir klare Ziele setzen, mich selbst kontrollieren und nicht impulsiv refaktorisieren, sondern strategisch vorgehen und meinen Fortschritt im Auge behalten.

Außerdem habe ich meinen Desktop-Computer eingerichtet. Ich hatte vorher keine Internetverbindung, weil ich das Passwort geändert hatte und nach einem Stromausfall die Verbindung endgültig verloren war. Also musste ich den Rechner noch einrichten. Die Prioritäten diesmal sind:

1. Produktivität
2. Coolness
3. Aussehen

Heute lange in Wang Yins Blog gelesen – weiter entgiften. Früher war ich ein fanatischer Sektenanhänger, der Dinge nicht im Kern erkannte. Ich dachte immer, irgendetwas sei das ultimative Mittel zur Lösung aller Probleme. Aber in Wahrheit gibt es solche "ultimativen Mittel" selten; meistens ist es nur Fanatismus, z. B.:

- Vim vs. Emacs
- OOP vs. FP
- Go vs. Rust

usw. Als ich früher OOP kennenlernte, dachte ich, es sei unschlagbar und könne alles lösen. Aber am Ende schrieb ich nur eine universelle Klasse, bei der es egal war, ob sie existierte. Was wirklich nützlich war, waren die Funktionen innerhalb dieser Klasse. Später (in den letzten zwei Jahren) lernte ich FP kennen und dachte, es sei die Wunderwaffe für alles. Aber nachdem ich eine Weile mit Scala programmiert hatte, stellte ich fest, dass meine Produktivität nicht wirklich gestiegen war. Im Gegenteil, ich wurde durch die Beschäftigung mit Syntax und Immutability sogar langsamer.

### 2020-06-09

Habe etwas in den Arbeitsmodus gefunden, Arch installiert. Fühlt sich sogar noch angenehmer an als mein Mac?

Mit Yuzhang eine Weile Hearthstone Battlegrounds gespielt.

### 2020-06-10

Heute plane ich folgende Aufgaben:

1. HDMAPMDK-1199 RoadMark als Unterklasse, um mehr Informationen bereitzustellen.
2. HDMAPMDK-892 Bereitstellung von Erfahrungs-Trajektorien.

Wenn noch Energie übrig ist, kümmere ich mich um die Release-Dokumentation.

Ergebnis: 892 erledigt.

### 2020-06-11

Review von HDMAPMDK-892 – Bereitstellung von Erfahrungs-Trajektorien.

Festgestellt, dass MDK noch keine entsprechende Anpassung hat. Heute Nachmittag diese Anpassung durchgeführt.

Anpassung abgeschlossen, bin sehr müde.

Weiter an meinem Arch herumgebastelt; versucht, einige Installationsschritte als Teil der Automatisierung zu protokollieren.

### 2020-06-12

Heutige Aufgabe: HDMAPMDK-1199 erledigen. Habe dieses Problem vorher vergessen.

Endlich um 20:00 Uhr erledigt.

### 2020-06-13

Ein sehr entspannter Tag. Nach der Testeinreichung ständig an meinen Automatisierungsskripten herumgebastelt.

Zuerst hatte ich vor, Shell zu verwenden, aber ich mag Shell nicht, also habe ich mich mit Scheme beschäftigt. Das hat richtig Spaß gemacht.

### 2020-06-15

Wow, es ist 15:00 Uhr und ich habe den halben Tag mit Surfen auf verschiedenen Scheme-Webseiten verbracht. So darf es nicht weitergehen.

Heute muss ich HDMAPMDK-1378 erledigen – die Sache, die wir immer vermeiden wollten: das Hinzufügen von sogenannten Lane Mark Directions im Kreuzungsinneren. Aber in der Kreuzung haben die Straßen keine Lane Marks, wie soll es da Lane Mark Directions geben?

Ach, das war hart. Nach hin und her habe ich es bis spät in die Nacht geschafft.

### 2020-06-16

Heute nach der Ankunft die ganze Zeit mit Review verbracht. Es gab noch viele Änderungen. Dann begann ich wieder ein bisschen zu trödeln. Habe es gerade so geschafft, und dann hat Kuang Ge noch mehrere Bugs gefunden.

Nachmittags erfahren, dass Xiao Ge geht. Ich war lange geschockt.

Abends mit Scheme herumgespielt, das Kompilieren und Einbinden benutzerdefinierter Bibliotheken hinbekommen.

### 2020-06-17

Heutige Hauptarbeit: Abschlussarbeiten der letzten Iteration, also Fehlerbehebungen.

### 2020-06-18

Bis heute haben wir endlich die Aufgaben der letzten Iteration abgeschlossen.

Ich fühle mich insgesamt sehr schlecht. Der Grund: Die Bedeutung der Arbeit ist nicht offensichtlich. Ich denke, sie ist im Grunde bedeutungslos.

Wie definiere ich hier "Bedeutung"?

Die Bedeutung der aktuellen Arbeit für mich, in absteigender Wichtigkeit:

1. Fähigkeit, Probleme zu erkennen: Wertvolle und sinnvolle Probleme finden können.
2. Fähigkeit, Probleme zu modellieren, um später mehr und verschiedene Arten von Problemen lösen zu können.
3. Probleme so modellieren, dass eine einmalige Anstrengung eine Lösung für die durch das Modell beschriebene Klasse von Problemen ermöglicht.
4. Durch meine Bemühungen konkrete, sinnvolle Probleme lösen. Dabei ist die einmalige Lösung eines Problems weniger wertvoll als ein Beitrag zur Lösung mehrerer Probleme dieser Klasse.
5. Freude bewahren, Erfolgserlebnisse durch Problemlösung, Interesse an den Problemen selbst.
6. Zwischenmenschliche Kommunikation und Beziehungen.
7. Gehalt (eine Absicherung; nicht unwichtig, aber der Rest sollte darauf aufbauen).

Das mag nicht meine gesamte Arbeitsmotivation abdecken, aber es spiegelt zumindest einen Teil der Realität wider.

Und warum ich mich heute frustriert fühle? Ich denke, ein Hauptgrund ist der Verlust an Interesse. Erstens ist die Bedeutung der Probleme selbst für mich nicht offensichtlich, was die Motivation etwas mindert. Zweitens ist die Modellierung dieser Probleme ungenau, sodass die Lösungsansätze nicht alle Probleme lösen (es gibt natürlich selten Modelle, die alle Probleme lösen, da Modelle per se Vereinfachungen und Abstraktionen sind; wir sprechen hier über das Lösen von Problemen in einem akzeptablen Rahmen). Das führt zu Wiederholungen, konkret zu den vielen Bugs, die die QA-Kollegen melden. Auch wenn einige davon auf unzureichendem Verständnis der Anforderungen beruhen oder reine Testprobleme sind, nimmt die Analyse der Probleme selbst den zeitaufwändigsten Teil des gesamten Lösungsprozesses ein.

Ein unzureichendes Verständnis des Problems kann zu oberflächlichen Lösungen führen, die Zeitverschwendung bedeuten. Im Grunde werden dann die Punkte 3, 4 und 5 der obigen Bedeutung nicht erfüllt, was mich frustriert.

Hinzu kommt: Bisher habe ich nur Probleme der letzten Iteration gelöst, noch nichts von der aktuellen Iteration begonnen. Das wird die Zeit in dieser Iteration komprimieren und möglicherweise auch nachfolgende Iterationen beeinträchtigen. Das ist ein sehr negativer Teufelskreis, der, wenn man auch noch die zwischenmenschlichen Beziehungen bedenkt, noch vermeidenswerter ist.

Deshalb sollte ich ab morgen, bevor ich eine Aufgabe beginne, versuchen, alle Aspekte zu bedenken, bevor ich sie löse.

Wenn ich auf die letzten Tage zurückblicke, habe ich mich bei der Arbeit kaum von der Stelle bewegt. Gleich am ersten Montag in Beijing, dem 8. Juni, habe ich gesagt: "Dann zur Arbeit: In dieser Zeit war ich mit der Auslieferung beschäftigt, hauptsächlich mit der Refaktorisierung von TLM (Typed Lane Model). Dieses Mal werde ich mir klare Ziele setzen, mich selbst kontrollieren und nicht impulsiv refaktorisieren, sondern strategisch vorgehen und meinen Fortschritt im Auge behalten."

Was ich bisher gut finde, ist, dass ich jeden Tag aufgezeichnet habe, was ich gemacht habe, auch wenn es manchmal sehr knapp war oder am nächsten Tag ergänzt wurde. Ich denke, dass konsequentes Aufzeichnen der Samen für Veränderungen ist.

Außerdem möchte ich einen Satz ergänzen, den ich für sehr, sehr sinnvoll halte:

> Vor einigen Jahren, als ich mein erstes Haus in New York kaufte, sagte ein Immobilienmakler sehr weise: "Dieses Haus muss grundlegend renoviert werden, und zwar komplett. Dieses 65 Jahre alte Haus hat absolutes Wertsteigerungspotenzial. Jetzt müssen Sie eine Liste aller zu reparierenden Dinge erstellen und alles innerhalb von sechs Monaten erledigen. Sie müssen die Probleme unbedingt innerhalb von sechs Monaten lösen."<br> "Sind Sie verrückt? Nach
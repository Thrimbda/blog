---
"title": "MapReduce-Paper-Notizen"
"summary": "Dieser Artikel enthält Notizen zum MapReduce-Paper und erläutert detailliert den Ursprung, die Implementierungsdetails, die Fehlertoleranzmechanismen und die Leistungsfähigkeit von MapReduce. Der Artikel stellt fest, dass MapReduce als abstraktes Modell eingeführt wurde, um die Herausforderungen der parallelen Verarbeitung großer Datenmengen, der Datenverteilung und der Fehlertoleranz zu bewältigen, und dabei Konzepte der funktionalen Programmierung wie Map und Reduce übernimmt. Der Implementierungsteil umfasst die Ausführungslogik, Datenstrukturen und die Fehlerbehandlung, wobei der Master Aufgaben plant, Worker Map- und Reduce-Operationen ausführen und das Problem der \"Nachzügler\" durch Backup-Aufgaben gelöst wird. Leistungstests zeigen die Effizienz bei Grep- und Sortieraufgaben. Die Zusammenfassung besagt, dass MapReduce ein äußerst robustes Framework für verteiltes Rechnen ist."
"tags":
  - "MapReduce"
  - "Verteilte Systeme"
  - "Paper-Notizen"
  - "Fehlertoleranz"
  - "Parallele Berechnung"
  - "Datenverarbeitung"
  - "Google"
  - "Big Data"
"date": "25. November 2019"
---

## Ursprung

Die Autoren haben bei ihrer Arbeit mit riesigen Datenmengen hunderte von Datenverarbeitungsprogrammen geschrieben, die einige gemeinsame Merkmale aufweisen:

1.  Einfache Geschäftslogik
2.  Sehr große Datenmengen, die eine verteilte Berechnung auf Hunderten von Computern erfordern

Dies stellt mehrere Herausforderungen:

1.  Wie wird die Berechnung parallelisiert?
2.  Wie werden die Daten verteilt?
3.  Wie wird Fehlertoleranz erreicht?

Ein großer Teil des Codes in diesen Datenverarbeitungsprogrammen beschäftigt sich mit solchen generischen Problemen und nicht mit der eigentlichen Geschäftslogik.

Daher wurde ein neues Abstraktionsmodell vorgeschlagen, das zwei Konzepte aus Lisp und anderen funktionalen Sprachen übernimmt. Dies ermöglicht es Ingenieuren, sich auf die Geschäftslogik zu konzentrieren, während die oben genannten nicht-funktionalen Anforderungen verborgen bleiben. Dies ist MapReduce.

## Implementierung

### Ausführungslogik

1.  Die Eingabedaten werden in M Teile aufgeteilt und an M Map-Worker verteilt.
2.  Der Master fungiert als Datenpipeline und übernimmt die Planung (Scheduling).
3.  Map-Aufgaben rufen die benutzerdefinierte Map-Methode auf und speichern die Ergebnisse lokal im Speicher.
4.  Periodisch werden die Daten auf die Festplatte geschrieben und in R Teile aufgeteilt, um sie an R Reduce-Worker zu verteilen.
5.  Reduce-Worker lesen die Daten nach Zuweisung durch den Master per RPC, sortieren sie nach dem Lesen (Disk Sort).
6.  Reduce-Worker iterieren über die sortierten Daten und rufen die benutzerdefinierte Reduce-Methode für eine inkrementelle Berechnung auf.
7.  Nach Abschluss der Berechnung kehrt die Kontrolle zur Benutzercode-Logik zurück.

Es ist ersichtlich, dass die Partitionierungsmethode entscheidend ist, um unnötiges Shuffling zu vermeiden.

### Datenstrukturen

-   Speichert den Status (Leerlauf / In Bearbeitung / Abgeschlossen) für jede Map-/Reduce-Aufgabe.
-   Speichert für jede abgeschlossene Map-Aufgabe den Speicherort und die Größe der Zwischendateien und leitet diese Informationen an Reduce-Worker weiter.

### Fehlertoleranz

-   Der Master selbst geht im Grunde nicht kaputt, kann aber durch periodisches Speichern seines Zustands nach einem Fehler wiederhergestellt werden.
-   Der Master pingt Worker periodisch an. Wenn ein Worker nicht antwortet, wird er als ausgefallen betrachtet.
    -   Map-Aufgaben werden unabhängig vom Fertigstellungsgrad zurückgesetzt und neu geplant – da Map-Ergebnisse lokal auf dem Worker gespeichert sind, sind sie bei einem Worker-Ausfall nicht mehr zugänglich.
    -   Für Reduce-Aufgaben werden nur die nicht abgeschlossenen neu geplant – da Reduce-Ergebnisse in einem global zugänglichen Dateisystem gespeichert werden.
    -   Nach der Neuzuweisung einer Map-Aufgabe werden alle Reduce-Worker benachrichtigt und ziehen Daten von der neuen Position.

### Backup-Aufgaben

Die letzten wenigen laufenden Aufgaben können den MapReduce-Prozess erheblich verlangsamen, möglicherweise aufgrund von "Nachzüglern" (Stragglern), die aus verschiedenen Gründen extrem langsam sind. In diesem Fall startet der Master Backup-Aufgaben für die letzten laufenden Aufgaben. Dies erhöht die Ressourcennutzung um einige Prozentpunkte, kann aber die Ausführungszeit massiv reduzieren.

## Verbesserungen

### Partitionierung

Da die Ausgabedateien verteilt sind, können Ergebnisse mit verwandten Schlüsseln mithilfe einer benutzerdefinierten Partitionsfunktion zusammengeführt werden.

### Lokales Debugging

Kann lokal ausgeführt werden.

## Leistung

Getestet in zwei großen Clustern, einer für Sortierung und einer für Mustererkennung (Grep).

### Grep

Suche nach einem Muster in 10^10 Dateien à 100 Byte. 1.700 Maschinen benötigten 150 Sekunden, wobei die Programmverteilung eine Minute in Anspruch nahm. Sehr beeindruckend.

### Sortierung

10^10 Dateien à 100 Byte.

## Zusammenfassung

Äußerst robust und selbstbewusst.
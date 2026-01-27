---
"title": "MapReduce-Paper-Notizen"
"summary": "Dieser Artikel ist eine Notiz zum MapReduce-Paper und analysiert detailliert den Ursprung, die Ausführungslogik, Datenstrukturen, Fehlertoleranzmechanismen und Leistungsoptimierungen von MapReduce. Der Artikel stellt fest, dass MapReduce als abstraktes Modell vorgeschlagen wurde, um die Herausforderungen der parallelen Verarbeitung großer Datenmengen, der Datenverteilung und der Fehlertoleranz zu bewältigen, und dabei Konzepte aus der funktionalen Programmierung wie Map und Reduce übernimmt. Die Implementierung umfasst Schlüsselbereiche wie Task-Aufteilung, Master-Scheduling, Speicherung von Zwischenergebnissen und Backup-Aufgaben. Im Bereich Fehlertoleranz wird Zuverlässigkeit durch Master-Überwachung und Task-Neuplanung gewährleistet. Leistungstests zeigen eine hohe Effizienz bei Grep- und Sortieraufgaben. Die Zusammenfassung betont, dass MapReduce ein einfaches und leistungsstarkes Programmiermodell für verteilte Berechnungen bietet."
"tags":
  - "MapReduce"
  - "Verteilte Systeme"
  - "Paper-Notizen"
  - "Fehlertoleranz"
  - "Leistungsoptimierung"
  - "Datenverarbeitung"
"date": "2019-11-25"
---

## Ursprung

Die Autoren haben in ihrer Arbeit mit riesigen Datenmengen gearbeitet und Hunderte von Datenverarbeitungsprogrammen geschrieben, die einige gemeinsame Merkmale aufweisen:

1.  Die Geschäftslogik ist einfach.
2.  Die Datenmengen sind enorm, daher ist eine verteilte Berechnung auf Hunderten von Computern erforderlich.

Dies stellt mehrere Herausforderungen dar:

1.  Wie wird die Berechnung parallelisiert?
2.  Wie werden die Daten verteilt?
3.  Wie wird Fehlertoleranz erreicht?

Ein großer Teil des Codes in diesen Datenverarbeitungsprogrammen beschäftigt sich mit solchen allgemeinen Problemen und nicht mit der eigentlichen Geschäftslogik.

Daher wurde ein neues Abstraktionsmodell vorgeschlagen, das zwei Konzepte aus Lisp und anderen funktionalen Sprachen übernimmt. Dies ermöglicht es Ingenieuren, sich auf die Geschäftslogik zu konzentrieren, während die oben genannten nicht-funktionalen Anforderungen verborgen bleiben. Dies ist MapReduce.

## Implementierung

### Ausführungslogik

1.  Die Eingabedaten werden in M Teile aufgeteilt und an M Map-Worker verteilt.
2.  Der Master fungiert als Datenpipeline und übernimmt das Scheduling.
3.  Map-Aufgaben rufen die benutzerdefinierte Map-Methode auf und speichern die Ergebnisse lokal im Speicher.
4.  Periodisch werden die Daten auf die Festplatte geschrieben und in R Teile aufgeteilt, um sie an R Reduce-Worker zu verteilen.
5.  Reduce-Worker lesen die Daten nach Zuweisung durch den Master per RPC, sortieren sie nach dem Lesen auf der Festplatte.
6.  Reduce-Worker iterieren über die sortierten Daten und rufen die benutzerdefinierte Reduce-Methode für inkrementelle Berechnungen auf.
7.  Nach Abschluss der Berechnung kehrt die Kontrolle zur Benutzercode-Logik zurück.

Es ist ersichtlich, dass die Partitionierungsmethode entscheidend ist, um unnötiges Shuffling zu vermeiden.

### Datenstrukturen

-   Speichert den Status (idle/in Bearbeitung/abgeschlossen) für jede Map-/Reduce-Aufgabe.
-   Speichert für jede abgeschlossene Map-Aufgabe den Speicherort und die Größe der Zwischendateien und leitet diese an Reduce-Worker weiter.

### Fehlertoleranz

-   Der Master selbst geht im Grunde nicht kaputt, kann aber durch periodisches Speichern seines Zustands nach einem Fehler wiederhergestellt werden.
-   Der Master pingt die Worker periodisch. Wenn ein Worker nicht antwortet, wird er als ausgefallen betrachtet.
    -   Für Map-Aufgaben werden alle, ob abgeschlossen oder nicht, zurückgesetzt und neu geplant – da Map-Ergebnisse lokal auf dem Worker gespeichert sind und bei dessen Ausfall nicht mehr zugänglich wären.
    -   Für Reduce-Aufgaben werden nur die nicht abgeschlossenen neu geplant – da Reduce-Ergebnisse in einem global zugänglichen Dateisystem gespeichert werden.
    -   Nach der Neuzuweisung einer Map-Aufgabe werden alle Reduce-Worker benachrichtigt und ziehen die Daten von der neuen Position.

### Backup-Aufgaben

Die letzten wenigen laufenden Aufgaben können den MapReduce-Prozess erheblich verlangsamen, möglicherweise aufgrund von "Nachzüglern", die aus verschiedenen Gründen extrem langsam sind. In diesem Fall startet der Master Backup-Aufgaben für die letzten laufenden Aufgaben. Dies erhöht die Ressourcennutzung um einige Prozentpunkte, kann aber die Ausführungszeit massiv reduzieren.

## Verbesserungen

### Partitionierung

Da die Ausgabedateien verteilt sind, können Ergebnisse mit verwandten Schlüsseln mithilfe einer benutzerdefinierten Partitionsfunktion zusammengeführt werden.

### Lokales Debugging

Kann lokal ausgeführt werden.

## Leistung

Tests wurden in zwei großen Clustern durchgeführt, einer für Sortierung und einer für Mustererkennung.

### Grep

Suche nach einem Muster in 10^10 Dateien à 100 Byte. 1.700 Maschinen benötigten 150 Sekunden, wobei die Programmverteilung eine Minute in Anspruch nahm. Sehr beeindruckend.

### Sortierung

10^10 Dateien à 100 Byte.

## Zusammenfassung

Äußerst selbstbewusst.
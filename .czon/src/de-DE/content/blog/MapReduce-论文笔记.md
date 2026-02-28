---
title: MapReduce-Papiernotizen
date: 2019-11-25
taxonomies:
  tags:
    - Technologie
    - Verteilte Systeme
    - Papiernotizen
    - MapReduce
---

## Ursprung

Die Autoren haben bei ihrer Arbeit Hunderte von Datenverarbeitungsprogrammen für riesige Datenmengen geschrieben, die einige Merkmale aufweisen:

1.  Einfache Geschäftslogik
2.  Sehr große Datenmengen, die daher auf Hunderten von Computern verteilt berechnet werden müssen

Dies stellt mehrere Herausforderungen:

1.  Wie wird parallel berechnet?
2.  Wie werden Daten verteilt?
3.  Wie wird mit Fehlertoleranz umgegangen?

Ein großer Teil des Codes in Datenverarbeitungsprogrammen beschäftigt sich mit ähnlichen Problemen, anstatt die Geschäftslogik zu implementieren.

Daher wurde ein neues Abstraktionsmodell vorgeschlagen, das zwei Konzepte aus Lisp und anderen funktionalen Sprachen übernimmt. Dies ermöglicht es Ingenieuren, sich auf die Geschäftslogik zu konzentrieren, während die oben genannten nicht-funktionalen Anforderungen verborgen werden. Dies ist MapReduce.

## Implementierung

### Ausführungslogik

1.  Eingabedaten werden in M Teile aufgeteilt und an M Map-Worker verteilt.
2.  Der Master fungiert als Datenpipeline für die Planung.
3.  Map-Aufgaben rufen die benutzerdefinierte Map-Methode auf und speichern die Ergebnisse lokal im Speicher.
4.  Periodisch werden Daten auf die Festplatte geschrieben und in R Teile aufgeteilt, um sie an R Reduce-Worker zu verteilen.
5.  Reduce-Worker lesen nach Zuweisung durch den Master per RPC die Daten, sortieren sie nach dem Lesen auf der Festplatte.
6.  Reduce-Worker iterieren über die sortierten Daten und rufen die benutzerdefinierte Reduce-Methode für inkrementelle Berechnungen auf.
7.  Nach Abschluss der Berechnungen kehrt die Kontrolle zur Benutzerlogik zurück.

Es ist ersichtlich, dass die Partitionierungsmethode entscheidend ist, um unnötiges Shuffling zu vermeiden.

### Datenstrukturen

-   Speichert den Status (Leerlauf/In Bearbeitung/Abgeschlossen) für jede Map-/Reduce-Aufgabe.
-   Speichert für jede abgeschlossene Map-Aufgabe den Speicherort und die Größe der Zwischendateien und leitet diese an Reduce-Worker weiter.

### Fehlertoleranz

-   Der Master selbst geht im Grunde nicht kaputt, kann aber durch periodisches Speichern des Zustands bei einem Ausfall wiederhergestellt werden.
-   Der Master pingt Worker periodisch an. Wenn keine Antwort kommt, wird der Worker als ausgefallen betrachtet.
    -   Map-Aufgaben werden unabhängig vom Fertigstellungsgrad zurückgesetzt und neu geplant – da Map-Ergebnisse lokal auf dem Worker gespeichert sind und bei dessen Ausfall nicht mehr zugänglich wären.
    -   Für Reduce-Aufgaben werden nur unvollendete neu geplant – da Reduce-Ergebnisse in einem global zugänglichen Dateisystem gespeichert werden.
    -   Nach der Neuzuweisung einer Map-Aufgabe werden alle Reduce-Worker benachrichtigt und ziehen Daten von der neuen Position.

### Backup-Aufgaben

Die letzten wenigen laufenden Aufgaben können den MapReduce-Prozess erheblich verlangsamen, möglicherweise aufgrund von "Nachzüglern", die aus verschiedenen Gründen extrem langsam sind. In diesem Fall startet der Master Backup-Aufgaben für die letzten laufenden Aufgaben. Dies erhöht die Ressourcennutzung um einige Prozentpunkte, kann aber die Ausführungszeit massiv reduzieren.

## Verbesserungen

### Partitionierung

Da Ausgabedateien verteilt sind, können Ergebnisse mit verwandten Schlüsseln durch eine benutzerdefinierte Partitionsfunktion zusammengeführt werden.

### Lokales Debugging

Kann lokal ausgeführt werden.

## Leistung

Getestet in zwei großen Clustern: einer für Sortierung, einer für Mustererkennung.

### grep

Suche nach einem Muster in 10^10 Dateien à 100 Byte. 1,7k Maschinen benötigten 150 Sekunden, davon eine Minute für die Programmverteilung. Sehr ehrlich.

### Sortierung

10^10 Dateien à 100 Byte.

## Fazit

Äußerst selbstbewusst.
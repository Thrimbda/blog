---
title: RDD-Papiernotizen
date: 2020-10-29
taxonomies:
  tags:
    - Technologie
    - Verteilte Systeme
    - Papiernotizen
    - RDD
    - Spark

---

Resilient Distributed Datasets (RDDs) sind eine Abstraktion für den Arbeitsspeicher in verteilten Systemen.

Im Wesentlichen handelt es sich um ein restriktives **Shared-Memory**-Modell, das nur grobkörnige Transformation-Operationen bereitstellt.

## Motivation

### Problem

Iterative verteilte Berechnungen benötigen die Fähigkeit, Daten zwischen Iterationen (effizient) wiederzuverwenden.

### Aktueller Stand

- Die existierenden (2012) verteilten Rechenframeworks fehlt eine Abstraktion, die den (Wiederverwendungs-)Vorteil des Clusterspeichers voll ausnutzen kann.
- Der einzige Weg, Daten in bestehenden Frameworks wiederzuverwenden, ist das mehrfache Starten verteilter Berechnungen.

Daher ist, obwohl das Problem der Lösbarkeit gelöst ist, die Datenwiederverwendung nach wie vor der Leistungsengpass für diese Art von Berechnungen: Zu viele Ressourcen werden für zu häufige I/O-Vorgänge verbraucht.

Einige Arbeiten haben versucht, diese Probleme zu lösen, konnten aber nur bestimmte Berechnungsmuster unterstützen und waren nicht allgemein genug.

Die Hauptherausforderung ist der Kompromiss zwischen der Granularität der Berechnung, der Allgemeingültigkeit und der Fehlertoleranz.

## RDD

RDD bietet eine Abstraktion für den Arbeitsspeicher von Rechenclustern, die das oben genannte Problem weitgehend löst, und zwar durch den Verzicht auf den relativ unwichtigsten der drei Punkte: die Granularität der Berechnung.

### Grundlagen

Eigenschaften von RDD:

- Unveränderlich (Immutable)
- Träge Auswertung (Lazy)

Von RDD unterstützte Operationen:

- Transformation - Träge Operationen
  - map
  - filter
  - ...
- Aktionen - Starten von Berechnungen
  - count
  - collect
  - save
  - ...
- Persistieren, d.h. Zwischenspeichern (cache)

Spark implementiert RDD und bietet eine Programmier-Schnittstelle ähnlich wie DryadLINQ.

### Vorteile von RDD

Hauptsächlich im Vergleich zu ähnlichen Abstraktionen (die den Clusterspeicher modellieren) opfert RDD feinkörnige Datenoperationen, um in anderen Aspekten (Allgemeingültigkeit, Fehlertoleranz, Leistung bei Herabstufung, Konsistenz, Straggler-Problem, Benutzerfreundlichkeit) deutlich besser abzuschneiden.

### Einschränkungen von RDD

RDD eignet sich nicht für asynchrone Berechnungen mit vielen feinkörnigen Lese-/Schreibvorgängen, wie z.B. Speichersysteme für Webcrawler. Für ähnliche Anwendungen schlagen die Autoren andere Frameworks vor, die hier nicht weiter erläutert werden.

## Spark-Programmierschnittstelle

Implementiert in Scala, da Scala prägnant und effizient ist.

Der Autor gibt in diesem Abschnitt einige Beispiele, die hier ausgelassen werden.

## Darstellung von RDD

Ein DAG wird verwendet, um RDD darzustellen.

### Abhängigkeiten

- Enge Abhängigkeiten (narrow dependencies) - Jedes Elternelement wird von höchstens einem Kindelement abhängig gemacht.
- Breite Abhängigkeiten (wide dependencies) - Ein Elternelement wird von mindestens einem Kindelement abhängig gemacht.

## Implementierung

- Verwendung von Mesos für das Cluster-Management
- Job-Scheduling wird ausgelassen
- Interpreter-Integration wird ausgelassen
- Speicherverwaltung wird ausgelassen

## Bewertung

- 20x schneller als Hadoop bei iterativen Aufgaben
- 40x schneller als Hadoop bei Benutzeranalyseprogrammen (laut Bericht)
- Kann nach einem Knotenausfall schnell neu berechnet werden
- 5-7 Sekunden Latenz bei der Abfrage von 1 TB Daten

Details werden ausgelassen.

## Diskussion

Sie haben in bemerkenswerter Weise Spark verwendet, um andere verteilte Rechenframeworks nachzuahmen, um die allgemeine Natur von RDD zu demonstrieren.

Details werden ausgelassen.

## Zusammenfassung

- Der größte Vorteil von RDD/Spark ist die Modellierung des gesamten Clusterspeichers, die es verteilten Berechnungen ermöglicht, Zwischenergebnisse im Arbeitsspeicher zu speichern. Dadurch werden schnelle aufeinanderfolgende Berechnungen auf demselben Dataset möglich. All dies basiert auf einer Voraussetzung: Arbeitsspeicher ist um eine Größenordnung schneller als Festplatten (daher die 40x Leistungssteigerung von Spark gegenüber Hadoop).
  Es zeigt sich, dass die theoretische Grenze für Software-Innovationen durch die harten Grenzen der Hardware gesetzt ist.
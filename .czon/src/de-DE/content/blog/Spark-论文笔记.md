---
title: Spark-Paper-Notizen
date: 2022-01-10
taxonomies:
  tags:
    - Technologie
    - Verteilte Systeme
    - Paper-Notizen
    - Spark
    - RDD
---

MapReduce war sehr erfolgreich, jedoch waren die meisten dieser Systeme, die um azyklische Graphen herum aufgebaut waren, nicht allgemein einsetzbar. In diesem Moment kam Spark auf den Plan und schlug mit **einer verteilten Datenstruktur namens RDD** ein verteiltes Rechenframework vor, das Folgendes unterstützen kann:

> solche, die einen Arbeitssatz von Daten über mehrere parallele Operationen hinweg wiederverwenden.

RDD (Resilient Distributed Dataset) ist eine schreibgeschützte Datenstruktur, die nach einem Verlust aus vorherigen Knoten im DAG (Directed Acyclic Graph) rekonstruiert werden kann.

Spark wurde in Scala implementiert. Die Eigenschaften von Scala:
- Eine auf der JVM implementierte Sprache
- Unterstützt funktionale Programmierung
- Objektorientiert

## Programmiermodell

### Einführung in RDDs

RDDs können auf vier Arten erstellt werden:

1.  Aus einem Dateisystem, z.B. HDFS
2.  Aus einer Scala-Sammlung (collection)
3.  Durch Transformation eines bestehenden RDDs (mittels flatMap, map, filter, etc.)
4.  Durch Änderung der Persistenzmethode eines bestehenden RDDs (RDDs sind schreibgeschützt; jede Änderungsoperation erzeugt logisch einen neuen RDD)

Darüber hinaus ist ein RDD eine *lazy* (verzögerte) und *ephemerale* (flüchtige) Datenstruktur. Benutzer können RDDs auf zwei Arten persistieren:

-   Durch `cache`: Ein gecachter RDD bleibt *lazy*, ist aber nicht mehr *ephemeral*. Das bedeutet, er wird nach der ersten Auswertung gespeichert, um wiederverwendet zu werden.
-   Durch `save`: Schreiben in ein verteiltes Dateisystem.

Benutzer müssen einen Kompromiss zwischen Zugriffsgeschwindigkeit und Speicherplatz finden.

### Parallele Operationen

-   `reduce` - Assoziativgesetz
-   `collect`
-   `foreach` - Seiteneffekt

## Beispiele

-   Log-Statistiken
-   Logistische Regression
-   ALS (Alternating Least Squares)

Mit den Eigenschaften *lazy* und *ephemeral* verhält sich Spark zunächst wie MapReduce. Durch das Hinzufügen eines `cache`-Schritts kann die Berechnung jedoch erheblich beschleunigt werden.

## Implementierung

-   (Zum Zeitpunkt der Paper-Erstellung) Auf Mesos aufgebaut.
-   Der Kern der Implementierung liegt in der RDD-Schnittstelle, die die objektorientierten und funktionalen Eigenschaften von Scala voll ausnutzt.
    -   `getPartitions`
    -   `getIterator(partition)`
    -   `getPreferredLocations(partition)` - Für Lokalitätsbetrachtungen.
-   Tasks (Closures) sind in Scala Java-Objekte und können daher serialisiert und versendet werden. Während der Implementierung wurde sogar ein Bug in Scala entdeckt.
-   Es wurde auch eine Interpreter-Integration realisiert.
-   Zum Zeitpunkt der Paper-Erstellung war `shuffle` noch nicht implementiert.

## Experimentelle Ergebnisse

-   Übertraf Hadoop deutlich, 10x schneller.
-   (Verwendete) Datensätze waren klein.

## Verwandte Arbeiten

-   Verteilter Shared Memory (DSM)
-   MapReduce
-   Ähnlich wie DryadLINQ für Scala

## Gedanken / Eindrücke

-   Sehr frühe Arbeit, die Autoren waren begeistert, sie zu teilen. Die 10x Verbesserung gegenüber Hadoop war beeindruckend.
-   Dieser Artikel ist eher allgemein gehalten.
-   Funktional, immutable, daher ermöglicht es *lazy evaluation*.
-   Sowohl Hadoop als auch Spark zu dieser Zeit konnten MapReduce nicht schlagen. (Anmerkung: Dieser letzte Satz scheint einen Widerspruch zu den vorherigen Ergebnissen darzustellen. Vielleicht ist gemeint: "Andere Systeme neben Hadoop und dem damaligen Spark konnten MapReduce nicht schlagen" oder es handelt sich um einen Tippfehler/Denkfehler im Original. Die Übersetzung folgt dem Originaltext.)
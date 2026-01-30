---
"title": "Spark-Paper-Notizen"
"summary": "Dieser Artikel enthält Notizen zu einem wissenschaftlichen Paper über Spark und konzentriert sich auf den Kern des Spark-Frameworks – die Resilient Distributed Datasets (RDDs). RDDs sind schreibgeschützte, wiederherstellbare verteilte Datenstrukturen, die die Wiederverwendung von Daten über mehrere parallele Operationen hinweg unterstützen. Spark ist in Scala implementiert und nutzt dessen funktionale und objektorientierte Eigenschaften, um ein flexibles Programmiermodell bereitzustellen. Dies umfasst die Erstellung von RDDs (aus Dateisystemen, Scala-Sammlungen, Transformationen bestehender RDDs usw.) und Persistenzstrategien (Cache und Save). Der Artikel gibt einen Überblick über das Spark-Programmiermodell, parallele Operationen (wie reduce, collect), Implementierungsdetails (basierend auf Mesos, RDD-Interface-Design) und experimentelle Ergebnisse (10-fache Leistungssteigerung gegenüber Hadoop). Abschließend fasst der Autor die frühen Erfolge und das Potenzial von Spark zusammen und hebt dessen Vorteile bei der Verarbeitung iterativer und interaktiver Workloads hervor."
"tags":
  - "Spark"
  - "RDD"
  - "Verteiltes System"
  - "Paper-Notizen"
  - "Scala"
  - "MapReduce"
  - "Big Data"
  - "Leistungsoptimierung"
"date": "2022-01-10"
---

MapReduce war sehr erfolgreich, jedoch waren die meisten dieser auf azyklischen Graphen basierenden Systeme nicht allgemein genug. In diesem Kontext erschien Spark und **schlug mit einer verteilten Datenstruktur namens RDD** ein verteiltes Rechenframework vor, das Folgendes unterstützen kann:

> solche, die einen Arbeitssatz von Daten über mehrere parallele Operationen hinweg wiederverwenden.

RDD (Resilient Distributed Dataset) ist eine schreibgeschützte Datenstruktur, die nach einem Verlust über vorhergehende Knoten im DAG (Directed Acyclic Graph) wiederhergestellt werden kann.

Spark ist in Scala implementiert. Scalas Eigenschaften:
- Eine auf der JVM laufende Sprache
- Unterstützt funktionale Programmierung
- Objektorientiert

## Programmiermodell

### Einführung in RDDs

RDDs können auf vier Arten erstellt werden:

1.  Aus einem Dateisystem, z.B. HDFS
2.  Aus einer Scala-Sammlung
3.  Durch Transformation eines bestehenden RDDs (mittels flatMap, map, filter, etc.)
4.  Durch Änderung der Persistenzmethode eines bestehenden RDDs (RDDs sind schreibgeschützt; jede Änderungsoperation erzeugt logisch einen neuen RDD)

Darüber hinaus sind RDDs eine *lazy* (träge) und *ephemeral* (kurzlebige) Datenstruktur. Benutzer können RDDs auf zwei Arten persistieren:

-   Mittels `cache`: Ein gecachter RDD bleibt *lazy*, ist aber nicht mehr *ephemeral*. Das bedeutet, er wird nach der ersten Auswertung gespeichert und für die Wiederverwendung bereitgehalten.
-   Mittels `save`: Schreiben in ein verteiltes Dateisystem.

Benutzer müssen einen Kompromiss zwischen Zugriffsgeschwindigkeit und Speicherplatz finden.

### Parallele Operationen

-   `reduce` - Assoziativgesetz
-   `collect`
-   `foreach` - Seiteneffekt

## Beispiele

-   Log-Statistiken
-   Logistische Regression
-   ALS (Alternating Least Squares)

Dank der Eigenschaften *lazy* und *ephemeral* verhält sich Spark zunächst wie MapReduce. Durch das Einfügen eines `cache`-Schritts kann die Berechnung jedoch erheblich beschleunigt werden.

## Implementierung

-   (Zum Zeitpunkt der Paper-Erstellung) Auf Mesos aufgebaut
-   Der Kern der Implementierung liegt im RDD-Interface, das die objektorientierten und funktionalen Eigenschaften von Scala voll ausnutzt.
    -   `getPartitions`
    -   `getIterator(partition)`
    -   `getPreferredLocations(partition)` - Für Lokalitätsbetrachtungen
-   Tasks (Closures) sind in Scala Java-Objekte und können daher serialisiert und versendet werden. Während der Implementierung wurde sogar ein Bug in Scala entdeckt.
-   Es wurde auch eine Interpreter-Integration implementiert.
-   Zum Zeitpunkt der Paper-Erstellung war `shuffle` noch nicht implementiert.

## Experimentelle Ergebnisse

-   Übertraf Hadoop deutlich, 10x schneller
-   Kleinerer Datensatz

## Verwandte Arbeiten

-   Distributed Shared Memory
-   MapReduce
-   Scala ähnelt DryadLINQ

## Gedanken / Fazit

-   Sehr frühe Arbeit, die Autoren teilen sie begeistert. Die 10-fache Leistung gegenüber Hadoop ist beeindruckend.
-   Dieser Artikel ist eher allgemein gehalten.
-   Funktional, immutable, daher kann *lazy evaluation* genutzt werden.
-   Weder Hadoop noch Spark zu dieser Zeit konnten MapReduce schlagen.
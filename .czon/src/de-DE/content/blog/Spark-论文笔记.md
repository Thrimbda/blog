---
"title": "Spark-Paper-Notizen"
"summary": "Dieser Artikel enthält Notizen zum Spark-Paper. Er beschreibt, wie Spark durch die Datenstruktur RDD (Resilient Distributed Dataset) die Einschränkungen von Systemen wie MapReduce in Bezug auf Allgemeingültigkeit überwindet und die Wiederverwendung von Daten über mehrere parallele Operationen hinweg unterstützt. Der Artikel erläutert detailliert die Erstellungsmethoden für RDDs, Persistenzstrategien, das Programmiermodell (z.B. parallele Operationen) sowie Implementierungsdetails von Spark in Scala, einschließlich seiner Lazy-Evaluation- und Ephemeral-Eigenschaften. Experimentelle Ergebnisse zeigen, dass Spark in bestimmten Szenarien 10-mal schneller als Hadoop ist. Abschließend fasst der Artikel die frühen Vorteile, Grenzen und den Vergleich mit verwandten Technologien von Spark zusammen."
"tags":
  - "Spark"
  - "RDD"
  - "Verteiltes System"
  - "Paper-Notizen"
  - "Big Data"
  - "Scala"
  - "MapReduce"
"date": "10.01.2022"
---

MapReduce war sehr erfolgreich, jedoch waren die meisten dieser Systeme, die um azyklische Graphen herum aufgebaut sind, nicht allgemeingültig. In diesem Moment trat Spark auf den Plan und schlug mit **einer verteilten Datenstruktur namens RDD** ein verteiltes Rechenframework vor, das Folgendes unterstützen kann:

> solche, die einen Arbeitssatz von Daten über mehrere parallele Operationen hinweg wiederverwenden.

RDD (Resilient Distributed Dataset) ist eine schreibgeschützte Datenstruktur, die nach einem Verlust aus vorherigen Knoten im DAG (Directed Acyclic Graph) rekonstruiert werden kann.

Spark ist in Scala implementiert. Eigenschaften von Scala:
- Eine auf der JVM implementierte Sprache
- Unterstützt funktionale Programmierung
- Objektorientiert

## Programmiermodell

### Einführung in RDD

RDDs können auf vier Arten erstellt werden:

1. Aus einem Dateisystem, z.B. HDFS
2. Aus einer Scala-Sammlung (Collection)
3. Durch Transformation eines bestehenden RDDs (mittels flatMap, map, filter, etc.)
4. Durch Änderung der Persistenzmethode eines bestehenden RDDs (RDDs sind schreibgeschützt; jede Änderungsoperation erzeugt logisch ein neues RDD)

Darüber hinaus ist ein RDD eine *lazy* und *ephemerale* Datenstruktur. Benutzer können ein RDD auf zwei Arten persistieren:

- Durch `cache`: Ein gecachtes RDD bleibt *lazy*, ist aber nicht mehr *ephemeral*. Das bedeutet, es wird nach der ersten Auswertung gespeichert, um wiederverwendet zu werden.
- Durch `save`: Schreiben in ein verteiltes Dateisystem.

Benutzer müssen einen Kompromiss zwischen Zugriffsgeschwindigkeit und Speicherplatz finden.

### Parallele Operationen

- `reduce` - Assoziativgesetz
- `collect`
- `foreach` - Seiteneffekt

## Beispiele

- Log-Statistiken
- Logistische Regression
- ALS (Alternating Least Squares)

Dank der Eigenschaften *lazy* und *ephemeral* verhält sich Spark zunächst wie MapReduce. Durch das Hinzufügen eines `cache`-Schritts kann die Berechnung jedoch erheblich beschleunigt werden.

## Implementierung

- (Zum Zeitpunkt der Paper-Erstellung) Auf Mesos aufgebaut
- Der Kern der Implementierung liegt in der RDD-Schnittstelle, die die objektorientierten und funktionalen Eigenschaften von Scala voll ausnutzt.
  - `getPartitions`
  - `getIterator(partition)`
  - `getPreferredLocations(partition)` - Für Lokalitätsbetrachtungen
- Tasks (Closures) sind in Scala Java-Objekte und können daher serialisiert und versendet werden. Während der Implementierung wurde sogar ein Bug in Scala entdeckt.
- Es wurde auch eine Interpreter-Integration entwickelt.
- Zum Zeitpunkt der Paper-Erstellung war `shuffle` noch nicht implementiert.

## Experimentelle Ergebnisse

- Übertrifft Hadoop deutlich, 10x schneller
- (Verwendete) Datensätze waren klein

## Verwandte Arbeiten

- Distributed Shared Memory
- MapReduce
- Scala ähnelt DryadLINQ

## Gedanken / Fazit

- Es handelte sich um eine sehr frühe Arbeit; die Autoren waren begeistert, sie vorzustellen. Die 10x bessere Leistung gegenüber Hadoop war beeindruckend.
- Dieser Artikel ist recht allgemein gehalten.
- Funktional, immutable, daher kann *lazy evaluation* genutzt werden.
- Weder Hadoop noch Spark zu dieser Zeit konnten MapReduce schlagen.
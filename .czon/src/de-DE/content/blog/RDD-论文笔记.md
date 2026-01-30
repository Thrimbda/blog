---
"title": "RDD-Paper-Notizen"
"summary": "Dieser Artikel enthält Notizen zum Paper 'Resilient Distributed Datasets (RDDs)'. Er analysiert die Designmotivation, die Kernkonzepte und die Vorteile von RDDs. RDDs sind eine Abstraktion für verteilten Speicher, die durch Unveränderlichkeit (Immutable) und verzögerte Berechnung (Lazy Evaluation) charakterisiert sind. Sie unterstützen Transformationen und Aktionen und nutzen einen DAG, um Abhängigkeiten darzustellen. Durch den Verzicht auf feingranulare Operationen erreichen sie Fehlertoleranz, Allgemeingültigkeit und Leistung, was bei iterativen Berechnungen im Vergleich zu Hadoop zu erheblichen Verbesserungen führt (z.B. 20-40x). Der Artikel gibt außerdem einen Überblick über die Spark-Implementierung und Evaluierungsergebnisse und stellt fest, dass RDDs für grobgranulare Berechnungen geeignet sind, jedoch nicht für feingranulare asynchrone Aufgaben."
"tags":
  - "RDD"
  - "Spark"
  - "Verteiltes System"
  - "Paper-Notizen"
  - "Speicherabstraktion"
  - "Iterative Berechnung"
  - "Fehlertoleranz"
"date": "2020-10-29"
---

Resilient Distributed Datasets (RDDs) sind eine Abstraktion für den Speicher in verteilten Systemen.

Im Wesentlichen handelt es sich um ein restriktives **Shared-Memory**-Modell, das nur grobgranulare Transformationsoperationen bereitstellt.

## Motivation

### Problem

Iterative verteilte Berechnungen erfordern die Fähigkeit, Daten zwischen Iterationen (effizient) wiederzuverwenden.

### Aktueller Stand

- Die existierenden (Stand 2012) verteilten Rechenframeworks fehlte eine Abstraktion, die den Clusterspeicher (für Wiederverwendung) optimal nutzen konnte.
- Der einzige Weg, Daten in bestehenden Frameworks wiederzuverwenden, bestand darin, mehrere verteilte Berechnungen zu starten.

Daher war, obwohl das Problem der Lösbarkeit gelöst war, die Datenwiederverwendung nach wie vor der Leistungsengpass für diese Art von Berechnungen: Zu viele Ressourcen wurden für übermäßig häufige I/O-Vorgänge aufgewendet.

Einige Arbeiten versuchten, diese Probleme zu lösen, konnten jedoch nur bestimmte Berechnungsmuster unterstützen und waren nicht allgemeingültig genug.

Die Hauptherausforderung bestand in der Abwägung zwischen der Granularität der Berechnung, der Allgemeingültigkeit und der Fehlertoleranz.

## RDD

RDDs bieten eine Abstraktion für den Speicher in verteilten Rechenclustern und lösen die oben genannten Probleme weitgehend, indem sie den relativ unwichtigsten der drei Punkte opfern: die Granularität der Berechnung.

### Grundlagen

Eigenschaften von RDDs:

- Unveränderlich (Immutable)
- Verzögert (Lazy)

Von RDDs unterstützte Operationen:

- Transformationen - Verzögerte Operationen (Lazy operations)
  - map
  - filter
  - ...
- Aktionen - Starten von Berechnungen (Launch computations)
  - count
  - collect
  - save
  - ...
- Persistieren, d.h. Cachen (persist i.e. cache)

Spark implementiert RDDs und bietet eine Programmier-Schnittstelle ähnlich zu DryadLINQ.

### Vorteile von RDDs

Hauptsächlich im Vergleich zu ähnlichen Abstraktionen (die Clusterspeicher modellieren) opfern RDDs feingranulare Datenoperationen, um in anderen Aspekten (Allgemeingültigkeit, Fehlertoleranz, Leistung bei Herabstufung, Konsistenz, Straggler-Problem, Benutzerfreundlichkeit) deutlich besser abzuschneiden.

### Einschränkungen von RDDs

RDDs eignen sich nicht für asynchrone Berechnungen mit vielen feingranularen Lese-/Schreibvorgängen, wie z.B. Speichersysteme für Webcrawler. Für ähnliche Anwendungen schlagen die Autoren andere Frameworks vor, die hier nicht weiter erläutert werden.

## Spark-Programmierschnittstelle

Implementiert in Scala, da Scala prägnant und effizient ist.

Der Autor gibt hier einige Beispiele, die hier ausgelassen werden.

## Darstellung von RDDs

Verwendung eines DAG (Directed Acyclic Graph) zur Darstellung eines RDD.

### Abhängigkeiten (Dependencies)

- Enge Abhängigkeiten (narrow dependencies) - Jedes Eltern-RDD wird von höchstens einem Kind-RDD abhängig.
- Weite Abhängigkeiten (wide dependencies) - Ein Eltern-RDD wird von mindestens einem Kind-RDD abhängig.

## Implementierung

- Verwendung von Mesos für das Cluster-Management.
- Job-Scheduling wird ausgelassen.
- Interpreter-Integration wird ausgelassen.
- Speicherverwaltung wird ausgelassen.

## Evaluierung

- Bei iterativen Aufgaben 20x schneller als Hadoop.
- Bei einem Benutzeranalyseprogramm wird über 40x schneller als Hadoop berichtet.
- Nach einem Knotenausfall kann schnell neu berechnet werden.
- Abfrage von 1 TB Daten mit 5-7 Sekunden Latenz.

Details werden ausgelassen.

## Diskussion

Sie haben (fast schon übertrieben) Spark verwendet, um andere verteilte Rechenframeworks nachzuahmen, um die Allgemeingültigkeit von RDDs zu demonstrieren.

Konkretes wird ausgelassen.

## Zusammenfassung

- Der größte Vorteil von RDDs/Spark ist die Modellierung des gesamten Clusterspeichers, wodurch verteilte Berechnungen Zwischenergebnisse im Speicher halten können. Dies ermöglicht schnelle aufeinanderfolgende Berechnungen auf demselben Datensatz. All dies basiert auf einer Voraussetzung: Speicher ist um eine Größenordnung schneller als Festplatten (daher ist die 40x Leistungssteigerung von Spark gegenüber Hadoop möglich).
  Man sieht: Die theoretische Grenze für Software-Innovationen sind die harten Grenzen der Hardware.
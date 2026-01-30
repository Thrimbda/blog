---
"title": "GFS-Papiernotizen"
"summary": "Dieser Artikel fasst das Kerndesign des verteilten Dateisystems GFS zusammen. GFS ist für Clusterumgebungen konzipiert, die aus kostengünstiger Hardware bestehen und in denen Teilausfälle der Normalfall sind. Es speichert und verwaltet hauptsächlich große Dateien und optimiert Dateioperationen, die überwiegend auf Anhängen basieren. Das Design berücksichtigt spezifische Anwendungsszenarien, unterstützt umfangreiche Streaming-Lesevorgänge und wenige zufällige Lesevorgänge und ist für das parallele Schreiben mehrerer Clients in dieselbe Datei optimiert. Der Artikel gibt außerdem einen Überblick über die Designannahmen von GFS, einschließlich der Modellierung von Maschinenausfällen, der Optimierung der Verwaltung großer Dateien und der Merkmale der Lese- und Schreibworkloads."
"tags":
  - "GFS"
  - "Verteiltes System"
  - "Dateisystem"
  - "Papiernotizen"
  - "Technik"
"date": "29-10-2020"
---

GFS ist ein verteiltes Dateisystem mit den folgenden vier Merkmalen:

1.  **Modellierung von Maschinenausfällen** – GFS läuft auf einem Cluster, der aus vielen kostengünstigen Hardwarekomponenten besteht. Daher kommt es in diesem Cluster aus verschiedenen Gründen zu Teilausfällen.
2.  **Die gespeicherten Dateien sind groß** – (Nach den Maßstäben von 2003) sind große Dateien von mehreren GB die Norm. Daher müssen E/A-Operationen und Blockgrößen speziell berücksichtigt werden.
3.  **Dateioperationen basieren hauptsächlich auf Anhängen** – Dies ist das Hauptoptimierungsziel.
4.  **Das Design des Dateisystems berücksichtigt die Anwendungsszenarien** – Die Flexibilität wird erheblich verbessert, das ist ein Vorteil eines geschlossenen Systems.

## Designübersicht

### Annahmen

-   Teilausfälle sind der Normalfall – Überwachung, Prüfung, Fehlertoleranz und Selbstheilung sind erforderlich.
-   Große Dateien sind der Normalfall – Die Optimierung konzentriert sich auf die Verwaltung großer Dateien.
-   Lese-Workloads sind hauptsächlich von zwei Arten:
    -   Umfangreiche Streaming-Lesevorgänge – jeweils etwa 1 MB, kontinuierliches Lesen.
    -   Wenige zufällige Lesevorgänge – jeweils einige KB, jedoch tolerieren Anwendungen echte Zufallszugriffe nicht wirklich.
-   Schreib-Workloads bestehen hauptsächlich aus umfangreichen sequenziellen Schreibvorgängen, ähnlich wie Lesevorgänge, seltene Änderungen werden daher nicht optimiert.
-   Optimiert für das parallele Schreiben mehrerer Clients in dieselbe Datei – erreicht durch solide atomare Operationen.
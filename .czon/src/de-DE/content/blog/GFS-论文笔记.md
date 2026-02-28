---
title: GFS-Papiernotizen
date: 29.10.2020
taxonomies:
  tags:
    - Technologie
    - Verteilte Systeme
    - Papiernotizen
    - GFS
    - Dateisystem
---

GFS ist ein verteiltes Dateisystem mit den folgenden vier Merkmalen:

1.  **Modellierung von Maschinenausfällen** – GFS läuft auf einem Cluster aus vielen kostengünstigen Hardwarekomponenten, daher treten in diesem Cluster aus verschiedenen Gründen teilweise Ausfälle auf.
2.  **Die gespeicherten Dateien sind groß** – (nach Maßstäben von 2003) sind Dateien mit mehreren GB die Norm, daher müssen I/O-Operationen und Blockgrößen speziell berücksichtigt werden.
3.  **Dateioperationen bestehen hauptsächlich aus Anhängevorgängen** – Dies ist das Hauptoptimierungsziel.
4.  **Das Design des Dateisystems berücksichtigt die Anwendungsszenarien** – Die Flexibilität wird erheblich verbessert, das ist ein Vorteil eines geschlossenen Systems.

## Designübersicht

### Annahmen

-   Teilausfälle sind der Normalfall – Überwachung, Prüfung, Fehlertoleranz und Selbstheilung sind erforderlich.
-   Große Dateien sind der Normalfall – Die Optimierung konzentriert sich auf die Verwaltung großer Dateien.
-   Read Workloads bestehen hauptsächlich aus den folgenden beiden Arten:
    -   Viele sequenzielle Lesevorgänge (Streaming Reads) – jeweils etwa 1 MB, kontinuierliches Lesen.
    -   Wenige zufällige Lesevorgänge (Random Reads) – jeweils einige KB, jedoch tolerieren Anwendungen echte Zufallszugriffe nicht wirklich.
-   Write Workloads bestehen hauptsächlich aus vielen sequenziellen Schreibvorgängen, ähnlich wie Leseoperationen, Änderungen sind selten, daher wird hierfür nicht optimiert.
-   Optimierung für parallele Schreibvorgänge mehrerer Clients in dieselbe Datei – erreicht durch geeignete atomare Operationen.
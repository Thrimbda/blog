---
"title": "GFS-Paper-Notizen"
"summary": "Dieser Artikel enthält Notizen zum GFS-Paper (Google File System) und fasst die vier Kernmerkmale von GFS als verteiltes Dateisystem zusammen: Modellierung von Maschinenausfällen, Speicherung großer Dateien, vorwiegend anfügende Dateioperationen und die Berücksichtigung von Anwendungsszenarien im Design. Der Artikel erläutert außerdem ausführlich die Designannahmen von GFS, darunter: Teilausfälle sind normal, große Dateien sind normal, die Lese-Arbeitslast teilt sich in viele sequenzielle Lesezugriffe und wenige zufällige Lesezugriffe, die Schreib-Arbeitslast besteht hauptsächlich aus vielen sequenziellen Schreibvorgängen, und es gibt Optimierungen für das parallele Schreiben mehrerer Clients in dieselbe Datei. Diese Merkmale und Annahmen bilden gemeinsam die Grundlage für die effiziente, zuverlässige und für die Massendatenverarbeitung geeignete Architektur von GFS."
"tags":
  - "GFS"
  - "Verteiltes System"
  - "Dateisystem"
  - "Paper-Notizen"
  - "Technik"
  - "Big Data"
  - "Speicher"
  - "Google"
"date": "29.10.2020"
---

GFS ist ein verteiltes Dateisystem mit den folgenden vier Merkmalen:

1.  **Modellierung von Maschinenausfällen** – GFS läuft auf einem Cluster aus vielen kostengünstigen Hardwarekomponenten, daher kommt es im Cluster aus verschiedenen Gründen zu Teilausfällen.
2.  **Es speichert große Dateien** – (nach Maßstäben von 2003) sind Dateien im Bereich von mehreren GB die Norm, daher müssen E/A-Operationen und Blockgrößen speziell berücksichtigt werden.
3.  **Dateioperationen erfolgen hauptsächlich durch Anfügen** – Dies ist das Hauptoptimierungsziel.
4.  **Das Design des Dateisystems berücksichtigt Anwendungsszenarien** – Die Flexibilität wird erheblich erhöht, was ein Vorteil eines geschlossenen Systems ist.

## Design-Überblick

### Annahmen

*   Teilausfälle sind normal – Überwachung, Prüfung, Fehlertoleranz und Selbstheilung sind erforderlich.
*   Große Dateien sind normal – Die Optimierung konzentriert sich auf die Verwaltung großer Dateien.
*   Read Workloads bestehen hauptsächlich aus zwei Arten:
    *   Viele sequenzielle Lesezugriffe – jeweils etwa 1 MB, kontinuierliches Lesen.
    *   Wenige zufällige Lesezugriffe – jeweils einige KB, allerdings tolerieren Anwendungen echte Zufallszugriffe nicht wirklich.
*   Write Workloads bestehen hauptsächlich aus vielen sequenziellen Schreibvorgängen, ähnlich wie Leseoperationen, Änderungen sind selten, daher wird hierfür nicht optimiert.
*   Optimierung für das parallele Schreiben mehrerer Clients in dieselbe Datei – erreicht durch gut definierte atomare Operationen.
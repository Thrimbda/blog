---
"title": "RBAC-Konzepte und Systemdesign"
"summary": "Dieser Artikel erläutert detailliert das rollenbasierte Zugriffskontrollmodell (RBAC), einschließlich seiner Kernkonzepte wie Subjekt, Rolle, Berechtigung, Sitzung und deren viele-zu-viele-Beziehungen. Der Artikel erklärt RBAC als ein Modell der obligatorischen Zugriffskontrolle (MAC), bei dem Systemadministratoren die Benutzerrollen zentral verwalten, und betont, dass ein Subjekt während einer Sitzung nur die Berechtigungen einer einzigen Rolle ausüben kann. Der Autor untersucht weiter die Anwendungsszenarien von RBAC und stellt fest, dass es für Systeme geeignet ist, in denen Ressourcen systemweit gemeinsam genutzt werden und hierarchische Rollen existieren, wie z.B. in kommerziellen Unternehmen oder Betriebssystemen, die dem Prinzip der geringsten Rechte folgen. Gleichzeitig vergleicht der Artikel das Modell der freien Zugriffskontrolle (DAC) und weist darauf hin, dass DAC in Systemen, in denen Ressourcen im persönlichen Besitz sind (wie soziale Netzwerke), besser geeignet ist. Er erwähnt auch, dass in der Praxis oft eine Mischung beider Modelle verwendet wird."
"tags":
  - "Systemdesign und -analyse"
  - "RBAC"
  - "Zugriffskontrolle"
  - "MAC"
  - "DAC"
  - "Berechtigungsverwaltung"
  - "Rollenmodell"
  - "Sicherheitsmodell"
"date": "2017-05-07"
---

---
title: RBAC-Konzepte und Systemdesign
date: 2017-05-07
taxonomies:
  tags:
    - Systemdesign und -analyse
    - RBAC
---

![RBACmodel](http://0xc1.space/images/2017/05/07/RBACmodel.png)

## Das Konzept von RBAC

RBAC (**R**ole-**B**ased **A**ccess **C**ontrol), das rollenbasierte Zugriffskontrollmodell, ist eine Zugriffskontrolltechnik, die im Vergleich zur obligatorischen Zugriffskontrolle (MAC) und der freien Zugriffskontrolle (DAC) neutraler und flexibler ist.

Zunächst einige Objekte in RBAC:

- S = Subjekt = Ein Benutzer oder automatischer Agent
- R = Rolle = Definiert als eine Arbeitsposition oder ein Titel mit einem bestimmten Autorisierungsniveau
- P = Berechtigung = Eine Art, auf eine Ressource zuzugreifen
- SE = Sitzung = Die Abbildungsbeziehung zwischen S, R oder P
- SA = Subjektzuweisung
- PA = Berechtigungszuweisung
- RH = Rollenhierarchie. Kann dargestellt werden als: ≥ (x ≥ y bedeutet, dass x die Berechtigungen von y erbt)

Darüber hinaus bestehen zwischen den Objekten folgende Beziehungen:

- **Subjekt** und **Rolle** haben eine viele-zu-viele-Beziehung.

  ${\displaystyle SA\subseteq S\times R}$

- **Rolle** und **Berechtigung** haben eine viele-zu-viele-Beziehung.

  ${\displaystyle PA\subseteq P\times R}$

<!--more-->

## Verständnis von RBAC

Nachdem die relevanten RBAC-Konzepte verstanden wurden, hier einige eigene Gedanken dazu.

RBAC ist eine Form von MAC (**M**andatory **A**ccess **C**ontrol), d.h. die Benutzerrollen werden zentral vom Systemadministrator konfiguriert und verwaltet.

Die Beziehung zwischen **S** (Subjekt), **R** (Rolle) und **SE** (Sitzung) ist wie im obigen Diagramm dargestellt: Obwohl ein Subjekt mehrere Rollen besitzen kann, kann es nach dem Einloggen in das System (d.h. während einer Sitzung mit dem System) nur die Befugnisse einer einzigen Rolle ausüben.

Die **P** (Berechtigungen) werden durch die vom System bereitgestellten Dienste bestimmt. Sie sind im Wesentlichen eine Kombination aus den vom System bereitgestellten Ressourcen und den darauf ausgeführten Operationen. Erst diese Kombination von Ressource und Operation verleiht dem Konzept der Berechtigung seine Bedeutung.

### Anwendung

Meine Definition des Anwendungsszenarios für RBAC: **Ein System, in dem Ressourcen systemweit gemeinsam genutzt werden und das über verschiedene, hierarchische Rollen mit getrennten Verantwortlichkeiten verfügt.**

Ressourcen werden systemweit gemeinsam genutzt, und es gibt verschiedene, hierarchische Rollen. Dies bedeutet, dass die Ressourcen des Systems für jede Rolle eine andere Bedeutung haben, und daher trägt jede Rolle eine andere Verantwortung für die Ressourcen. Für ein solches System ist RBAC ein sehr geeignetes Zugriffskontrollmodell, da es effektiv Rechte und Verantwortlichkeiten zuweisen und so die Ressourcen des Systems besser schützen und nutzen kann.

Beispiele: Kommerzielle Unternehmen und Betriebssysteme, die dem Prinzip der geringsten Rechte (Principle of least privilege) folgen.

Für ein System, in dem Ressourcen im persönlichen Besitz sind, sind alle Rollen gleichberechtigt, und jede Rolle hat vollständige Kontrolle über ihre eigenen Ressourcen. In diesem Fall ist das RBAC-Modell unzureichend, und stattdessen sollte das DAC-Modell (**D**iscretionary **A**ccess **C**ontrol) verwendet werden, was in sozialen Netzwerksystemen sehr verbreitet ist.

In realen Szenarien gibt es niemals ausschließlich gemeinsam genutzte oder ausschließlich persönliche Ressourcen. Daher werden diese beiden Modelle oft gemischt eingesetzt. Beispiel: In WeChat haben normale Benutzer vollständige Verwaltungsrechte über ihre eigenen "Ressourcen" (z.B. den Freundeskreis). Normale Benutzer können jedoch andere Benutzer nicht verwalten. Die Umsetzung der "Melden"-Funktion hängt vom Eingreifen anderer Rollen im System mit höheren Berechtigungen ab.
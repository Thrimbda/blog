---
"title": "RBAC-Konzepte und Systemdesign"
"summary": "Dieser Artikel erläutert detailliert die Kernkonzepte des RBAC-Modells (Role-Based Access Control), einschließlich der Objekte Subjekt, Rolle, Berechtigung, Sitzung und deren viele-zu-viele-Beziehungen. Der Artikel erklärt RBAC als ein Modell der obligatorischen Zugriffskontrolle, bei dem Systemadministratoren die Benutzerrollen zentral verwalten, und betont, dass ein Subjekt während einer Sitzung nur die Berechtigungen einer einzigen Rolle ausüben kann. Der Autor untersucht weiter die Anwendungsfälle von RBAC, nämlich Systeme, in denen Ressourcen dem System gemeinsam gehören und die über verschiedene hierarchische Rollen verfügen, wie z.B. kommerzielle Unternehmen und Betriebssysteme, die dem Prinzip der geringsten Rechte folgen. Gleichzeitig vergleicht der Artikel das DAC-Modell (Discretionary Access Control) und weist darauf hin, dass DAC in Systemen, in denen Ressourcen im persönlichen Besitz sind, besser geeignet ist, und empfiehlt, in realen Szenarien beide Modelle gemischt einzusetzen. Abschließend wird WeChat als Beispiel für die praktische Anwendung eines hybriden Modells angeführt."
"tags":
  - "RBAC"
  - "Systemdesign"
  - "Zugriffskontrolle"
  - "Berechtigungsverwaltung"
  - "MAC"
  - "DAC"
  - "Rolle"
  - "Prinzip der geringsten Rechte"
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

RBAC (**R**ole-**B**ased **A**ccess **C**ontrol), das rollenbasierte Zugriffskontrollmodell, ist eine Zugriffskontrolltechnik, die neutraler und flexibler ist als obligatorische Zugriffskontrolle oder frei wählbare Zugriffskontrolle.

Zunächst die verschiedenen Objekte in RBAC:

- S = Subjekt (Subject) = Ein Benutzer oder automatischer Agent
- R = Rolle (Role) = Definiert als eine Arbeitsposition oder ein Titel mit einem bestimmten Autorisierungsniveau
- P = Berechtigung (Permission) = Eine Art, auf eine Ressource zuzugreifen
- SE = Sitzung (Session) = Die Abbildungsbeziehung zwischen S, R oder P
- SA = Subjektzuweisung (Subject Assignment)
- PA = Berechtigungszuweisung (Permission Assignment)
- RH = Rollenhierarchie (Role Hierarchy). Kann dargestellt werden als: ≥ (x ≥ y bedeutet, dass x die Berechtigungen von y erbt)

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

**P** (Berechtigung) wird durch die vom System bereitgestellten Dienste bestimmt. Sie ist im Wesentlichen eine Kombination aus den vom System bereitgestellten Ressourcen und den darauf ausgeführten Operationen. Erst diese Kombination von Ressource und Operation verleiht dem Konzept der Berechtigung seine Bedeutung.

### Anwendung

Meine Definition des Anwendungsbereichs von RBAC: **Ein System, in dem Ressourcen dem System gemeinsam gehören und das über verschiedene, hierarchische Rollen mit getrennten Verantwortlichkeiten verfügt.**

Ressourcen, die dem System gemeinsam gehören, und verschiedene, hierarchische Rollen bedeuten, dass die Ressourcen des Systems für jede Rolle eine andere Bedeutung haben. Daher trägt jede Rolle eine andere Verantwortung für die Ressourcen. Für ein solches System ist RBAC ein sehr geeignetes Zugriffskontrollmodell, das effektiv Rechte und Verantwortlichkeiten zuweisen kann, um die Ressourcen des Systems besser zu schützen und zu nutzen.

Beispiele: Kommerzielle Unternehmen und Betriebssysteme, die dem Prinzip der geringsten Rechte (Principle of least privilege) folgen.

Für ein System, in dem Ressourcen im persönlichen Besitz sind, sind alle Rollen gleichberechtigt, und jede Rolle hat vollständige Kontrolle über ihre eigenen Ressourcen. In diesem Fall ist das RBAC-Modell unzureichend, und stattdessen sollte das DAC-Modell (**D**iscretionary **A**ccess **C**ontrol) verwendet werden, was in sozialen Netzwerksystemen sehr verbreitet ist.

In realen Szenarien gibt es keine rein gemeinsamen oder rein exklusiven Ressourcen, daher werden diese beiden Modelle oft gemischt eingesetzt. Beispiel: In WeChat haben normale Benutzer vollständige Verwaltungsrechte über ihre eigenen "Ressourcen" (z.B. den Freundeskreis). Normale Benutzer können jedoch andere Benutzer nicht verwalten. Die Umsetzung der "Meldefunktion" hängt vom Eingreifen anderer Rollen mit höheren Berechtigungen im System ab.
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

RBAC (**R**ole-**B**ased **A**ccess **C**ontrol), das rollenbasierte Zugriffskontrollmodell, ist eine Zugriffskontrolltechnik, die im Vergleich zur zwingenden Zugriffskontrolle (Mandatory Access Control) und der frei wählbaren Zugriffskontrolle (Discretionary Access Control) neutraler und flexibler ist.

Zunächst die verschiedenen Objekte in RBAC:

- S = Subjekt (Subject) = Ein Benutzer oder automatischer Agent
- R = Rolle (Role) = Wird definiert als eine Arbeitsposition oder ein Titel mit einer bestimmten Autorisierungsstufe
- P = Berechtigung (Permission) = Eine Art, auf eine Ressource zuzugreifen
- SE = Sitzung (Session) = Die Abbildungsbeziehung zwischen S, R oder P
- SA = Subjektzuweisung (Subject Assignment)
- PA = Berechtigungszuweisung (Permission Assignment)
- RH = Rollenhierarchie (Role Hierarchy). Kann dargestellt werden als: ≥ (x ≥ y bedeutet, dass x die Berechtigungen von y erbt)

Darüber hinaus bestehen zwischen den Objekten folgende Beziehungen:

- **Subjekt** und **Rolle** stehen in einer Viele-zu-Viele-Beziehung.

  ${\displaystyle SA\subseteq S\times R}$

- **Rolle** und **Berechtigung** stehen in einer Viele-zu-Viele-Beziehung.

  ${\displaystyle PA\subseteq P\times R}$


<!--more-->

## Verständnis von RBAC

Nachdem die relevanten RBAC-Konzepte verstanden wurden, möchte ich hier mein eigenes Verständnis darlegen.

RBAC ist eine Form von MAC (**M**andatory **A**ccess **C**ontrol), d.h. die einzelnen Benutzerrollen werden zentral vom Systemadministrator konfiguriert und verwaltet.

Die Beziehung zwischen **S** (Subjekt), **R** (Rolle) und **SE** (Sitzung) ist wie im obigen Diagramm dargestellt. Das bedeutet, obwohl ein Subjekt mehrere Rollen besitzen kann, kann es nach dem Einloggen in das System (also während einer Sitzung mit dem System) nur die Befugnisse einer einzigen Rolle ausüben.

Die **P** (Berechtigungen) werden durch die vom System bereitgestellten Dienste bestimmt. Sie sind im Wesentlichen eine Kombination aus den vom System bereitgestellten Ressourcen und den darauf ausgeführten Operationen. Erst diese Kombination von Ressource und Operation verleiht dem Konzept der Berechtigung seine Bedeutung.



### Anwendung

Meine Definition des Anwendungsszenarios für RBAC: **Ein System, in dem Ressourcen systemweit gemeinsam genutzt werden und das über verschiedene, hierarchische Rollen mit getrennten Verantwortlichkeiten verfügt**.

Ressourcen werden systemweit gemeinsam genutzt, und es gibt verschiedene, hierarchische Rollen. Dies zeigt, dass die Ressourcen im System für jede Rolle eine unterschiedliche Bedeutung haben, und daher trägt jede Rolle eine unterschiedliche Verantwortung für die Ressourcen. Für ein solches System ist RBAC ein sehr geeignetes Zugriffskontrollmodell, das effektiv Rechte und Verantwortlichkeiten zuweisen kann, um die Ressourcen im System besser zu schützen und zu nutzen.

Beispiele: Kommerzielle Unternehmen und Betriebssysteme, die dem Prinzip der geringsten Rechte (Principle of least privilege) folgen.



Für ein System, in dem Ressourcen im Besitz von Einzelpersonen sind, sind alle Rollen gleichberechtigt, und jede Rolle hat die vollständige Kontrolle über ihre eigenen Ressourcen. In diesem Fall ist das RBAC-Modell unzureichend, und stattdessen sollte das DAC-Modell (**D**iscretionary **A**ccess **C**ontrol) verwendet werden, was in sozialen Netzwerksystemen sehr verbreitet ist.

In realen Szenarien gibt es selten rein gemeinsame oder rein exklusive Ressourcen, daher werden diese beiden Modelle oft kombiniert verwendet. Beispiel: In WeChat haben normale Benutzer vollständige Verwaltungsrechte über ihre eigenen "Ressourcen" (z.B. den Freundeskreis). Normale Benutzer können jedoch andere Benutzer nicht verwalten. Die Umsetzung der Funktion "Melden" hängt vom Eingreifen anderer Rollen im System mit höheren Berechtigungen ab.
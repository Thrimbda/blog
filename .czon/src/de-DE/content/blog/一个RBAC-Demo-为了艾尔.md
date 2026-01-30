---
"title": "Ein RBAC-Demo: Für Aiur"
"summary": "Dieser Artikel beschreibt detailliert ein vom Autor entwickeltes Demo-Projekt namens \"Für Aiur\", das zum Verständnis des RBAC-Modells dient. Das Projekt simuliert eine vereinfachte Szene aus dem Spiel StarCraft, nutzt das Flask-Framework von Python, um einen RESTful-Dienst aufzubauen, und implementiert darin das RBAC-Modell. Der Artikel erläutert den Designansatz des Demos, einschließlich der Definition von Subjekten, Rollen, Ressourcen und Berechtigungen sowie der Zuweisungsbeziehungen zwischen Subjekt-Rolle und Rolle-Berechtigung. Gleichzeitig wird erklärt, wie die RBAC-Beziehungen ohne Datenbank durch Dateikonfigurationen verwaltet und RBAC mit der RESTful-Architektur kombiniert wird. Abschließend werden die Geschäftslogik und die Kerncode-Implementierung des Demos vorgestellt, die zeigen, wie der Zugriff auf Spielressourcen über Rollen gesteuert wird, um die Spielziele zu erreichen."
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "Python"
  - "Systemdesign"
  - "Zugriffskontrolle"
  - "StarCraft"
"date": "2017-05-11"
---

---
title: Ein RBAC-Demo: Für Aiur
date: 2017-05-11
taxonomies:
  tags:
    - Systemdesign und -analyse
    - RESTful
    - RBAC
---

Basierend auf dem Verständnis von RBAC aus dem vorherigen Artikel und aufgrund von Aufgabenanforderungen werde ich ein einfaches Demo als Praxisbeispiel für RBAC erstellen.

Ich habe nicht vor, das Demo übermäßig komplex zu gestalten. Mein Ziel ist es, das Konzept zu veranschaulichen, daher gilt auch hier: "Klein, aber fein."

Was ist also das Ziel dieses Demos und was kann es tun?

<!--more-->

## Analyse und Design

Um es interessant zu gestalten und das Problem angemessen darzustellen, werde ich in meinem Demo eine stark vereinfachte Szene simulieren, in der jede Einheit auf wundersame Weise über subjektive Handlungsfähigkeit verfügt – die Situation eines Protoss-Spielers in einer StarCraft-Partie.

Ein gutes Demo braucht einen guten Namen, daher heißt dieses Demo: **Für Aiur!** (Aiur ist der Heimatplanet der Protoss, und jeder Zealot sagt beim Beamen auf das Schlachtfeld diesen begeisterten Satz: "Für Aiur!")

In **Für Aiur** musst du dein Team führen, um genügend Zealot-Krieger zu produzieren, den Zerstörer Amon zu vernichten und das gesamte Universum zu retten. Wenn du nicht genug Zealots hast, wirst du scheitern, die Sterne flüstern und alles wird vernichtet.

All dies spiegelt sich in einem RESTful-Dienst wider, der mit dem Python-Flask-Framework geschrieben wurde.

> Eigentlich könnten in einer realen Szene alle Subjekte außer dem Spieler erstellt werden und somit als Ressourcen betrachtet werden. Um RBAC zu demonstrieren, habe ich ihnen jedoch die folgenden Einschränkungen hinzugefügt:
>
> - Die wenigen in diesem Demo bereitgestellten Subjekte sind einzigartig und existieren immer, als wären sie unverwechselbar. Dadurch wird auch die Möglichkeit ausgeschlossen, dass Subjekte rekursiv erstellt werden können (z.B.: Sonden können Nexus bauen, und Nexus können Sonden produzieren).
> - Eigentlich benötigen Warpgates die Energie von Pylonen, um zu funktionieren, aber das wird hier nicht dargestellt. Ich erkläre es damit, dass unsere Warpgates Energie von der protossischen Flagship Spear of Adun im geosynchronen Orbit erhalten, sodass Pylonen nur als Ressource für die Bevölkerungsgrenze betrachtet werden.

Diese Partie enthält die folgenden Objekte:

### Subjekte (Subject)

- Spieler (du) thrimbda
- Sonde (grundlegende Arbeitseinheit, kann Ressourcen sammeln und Gebäude bauen) probe
- Warpgate (produziert Zealots, eine Kampfeinheit) gateway

#### Rollen (Role)

- Archon (Oberbefehlshaber, verwaltet alle Ressourcen) archon
- Kristallsammler (nur Sonden können diese Rolle übernehmen) crystal_collector
- Portal für Zealot-Beaming (Signalboje, die das Beamen von Protoss-Kriegern unterstützt) portal
- Pylon-Bauer (mit Pylonen haben wir genug Bevölkerungsgrenze, um Zealots zu beamen) pylon_transporter

### Ressourcen (Resource)

- Ungesammelte Kristalle (zum Bau von Pylonen und zum Beamen von Zealots, Anfangswert unbekannt)
- Gesammelte Kristalle (zum Bau von Pylonen und zum Beamen von Zealots, Anfangswert 0)
- Kapazität (liefert Energie für das Beamen, also unsere "Bevölkerung", Anfangswert 0)
- Zealots (Kampfeinheiten, deine Krieger zur Rettung des Universums, Anfangswert 0)

### Berechtigungen (Permission)

> Da jede Operation auf eine Ressource eine Berechtigung ist, listen wir hier nicht separat die Operationen auf, sondern geben direkt die Berechtigungen und ihre Beschreibungen an.

- Kristalle sammeln (maximal 1000 Einheiten pro Sammelvorgang)
- Ungesammelte Kristalle beobachten (Gesamtmenge anzeigen)
- Statusbericht (aktuelle Menge deiner Ressourcen anzeigen)
- Amons Stärke auskundschaften (benötigte Anzahl an Zealots berechnen)
- Pylon bauen (jeder Pylon bietet 10 Kapazitätseinheiten und kostet 100 Kristalle)
- Zealot produzieren (jeder Zealot verbraucht 2 Kapazitätseinheiten und kostet 100 Kristalle)
- Amon angreifen (Sieg oder Tod!)

### SA

> Die n:m-Beziehungen zwischen Subjekt-Rolle und Rolle-Berechtigung werden mit Pythons Tupel-Datenstruktur dargestellt, auch in der Implementierung. Daher wird in dieser Anwendung keine Datenbank verwendet.

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA

```python
role_permission = (('archon', 'get_status'),
                   ('archon', 'for_aiur'),
                   ('archon', 'scout'),
                   ('crystal_collector', 'get_crystal'),
                   ('crystal_collector', 'crystal_status'),
                   ('pylon_transporter', 'get_status'),
                   ('pylon_transporter', 'transport_pylon'),
                   ('portal', 'transport_zealot'),
                   ('portal', 'get_status'))
```

## Implementierung

[Repository-URL](https://github.com/Thrimbda/my-life-for-Aiur)

[Online-Bereitstellung](https://my-life-for-aiur.herokuapp.com/) (langsam)

### Übersicht

Zusammenfassend habe ich mit dem Python-Flask-Framework einen RESTful-Dienst erstellt. Die gesamte Anwendung beinhaltet keinen Frontend-Teil, daher gibt es auch keine Sicherheitsprobleme wie das Umgehen des Frontends.

Ein Merkmal dieses Demos ist, dass keine Datenbank verwendet wird. RBAC erzwingt keine Datenbank, und die Verwendung einer Datenbank in RBAC ist intuitiv und natürlich. In **Für Aiur** verwenden wir jedoch keine Datenbank, sondern stellen die `Subjekt-Rolle-Berechtigung`-Beziehungen von RBAC in Dateiform dar. Datenbanken haben sich auf Basis von Dateisystemen entwickelt. Hier verwenden wir Dateien, weil das System einfach genug ist, um die Komplexität weiter zu reduzieren und das Konzept zu veranschaulichen. Die konkrete Dateiform ist in den obigen SA- und PA-Beziehungen beschrieben.

### Über RESTful

Hier kurz zu RESTful (**Re**presentational **S**tate **T**ransfer)

Wie der Name schon sagt: Zustandsübertragung der Darstellungsschicht (einer Ressource).

In einem Web-Dienst sind die bereitgestellten Dienste die Ressourcen des Systems, dargestellt durch URIs. Die Form des Dienstes ist die Operation auf die Ressource (Zustandsübertragung), dargestellt durch HTTP-Verben. Diese Konzepte lassen sich gut den Ressourcen und Operationen in RBAC zuordnen. Daher muss ich lediglich die Berechtigungsverwaltung von RBAC auf die Operationen an Ressourcen in REST anwenden.

### Die verschiedenen Objekte in RBAC

Wie in den beiden Konfigurationsdateien zu sehen ist, können wir S, R, P implizit aus SA und PA ableiten:

```python
# Leite die S- und R-Listen aus dem obigen Tupel subject_role ab
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

SE lässt sich gut mit der Session in einer Webanwendung korrelieren, als temporäres Objekt für ein Subjekt während einer Anmeldung:

```python
# Das Subjekt meldet sich über die API des Spear of Adun-Taktikmanagementsystems an. Hier ist session ein globales Flask-Objekt, dessen Implementierungsdetails nicht weiter erläutert werden.
class SpearOfAdun(Resource):
    
    def post(self):
        args = self.putparser.parse_args()
        if args['subject'] is not None:
            abortInvalideSubject(args['subject'])
        if args['role'] is not None:
            abortInvalideRole(args['role'])
        checkRole(args['subject'], args['role'], subject_role)
        session['subject'] = args['subject']
        session['role'] = args['role']
        return {'message': 'login as %s using %s' % (session['subject'], session['role'])}, 201
```

Da die Modellierung von Subjekt-Rolle letztendlich dazu dient, Berechtigungen zu isolieren und zuzuweisen, damit die Ressourcen im System ordnungsgemäß genutzt und geschützt werden können.

In **Für Aiur** definiere ich Berechtigungen als interne Eigenschaften der Web-API, z.B.:

```python
# API zum Beamen von Zealots
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # Berechtigung
        abortIfSubjectUnauthenticated(session) # Anmeldeüberprüfung
        checkPermission(session['role'], permission, role_permission) # Prüfen, ob das Subjekt in dieser Rolle diese Berechtigung anfordern darf
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

In den beiden oben als Beispiel genannten APIs stellt jede Klasse eine Ressource im System dar, und die bereitgestellten HTTP-Methoden sind die Operationen auf diese Ressource.

**Damit sind alle Objekttypen aus RBAC versammelt.**

### Geschäftslogik

Da **Für Aiur** ein echtes, spielbares Online-Echtzeitstrategie-Spiel-API ist, ist es notwendig, seine Geschäftslogik zu erläutern:

Das Ziel des Spielers ist: **Ressourcen sammeln, eine Basis bauen und dann eine Armee erschaffen, die deinen Feind in Angst und Schrecken versetzt, um den Dunklen Amon zu besiegen.**

Die einzige Bedingung, um Amon zu besiegen, ist, eine ausreichende Anzahl von Zealots zu haben. Diese Anzahl ist eine zufällig generierte Ganzzahl zwischen 20 und 100. Gleichzeitig generiert das System basierend auf dieser Zahl genau genug ungesammelte Kristalle, um Amon zu besiegen.

**Warum genau genug?**

Da das Beamen von Zealots eine ausreichende Menge an Kristallenergie und Kristalle erfordert und die Pylonen, die die Energie liefern, ebenfalls Kristalle zum Bau verbrauchen. Wenn du also zu viele Pylonen baust, wirst du **diese den Schicksalskampf um das gesamte Universum verlieren, weil du nicht genug Kristalle zum Beamen von Zealots hast**.

Die gesamte Logik wird von einem Objekt bereitgestellt, dessen Lebenszyklus die gesamte Schlacht umspannt. Um Probleme zu vermeiden, habe ich eine Thread-Sperre hinzugefügt, um sicherzustellen, dass jede Operation atomar ist.

```python
# Da es der Kern des gesamten Spiels ist, nenne ich es Nexus
import random
from threading import Lock


class Nexus(object):
    _lock = Lock()
    crestalInControl = None
    crestalRemain = None
    populationCap = None
    zealot = None
    status = {}
    _amond = None

    def __init__(self):
        # Objekt initialisieren
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # Kristalle sammeln
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # Zealots beamen
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # Pylon bauen
        with self._lock:
            available = self.crestalInControl / 100
            amount = min(amount, available)
            self.populationCap += amount * 10
            self.crestalInControl -= amount * 100
            return amount

    def forAiur(self):
        # Für Aiur kämpfen!
        with self._lock:
            if self.zealot >= self._amond:
                return True
            else:
                return False

    def getStatus(self, role):
        # Status abrufen
        if role == 'archon':
            return {
                'crestalInControl': self.crestalInControl,
                'crestalRemain': self.crestalRemain,
                'populationCap': self.populationCap,
                'zealot': self.zealot
            }
        elif role == 'pylon_transporter':
            return {
                'crestalInControl': self.crestalInControl,
                'populationCap': self.populationCap
            }
        elif role == 'portal':
            return {
                'crestalInControl': self.crestalInControl,
                'populationCap': self.populationCap,
                'zealot': self.zealot
            }
        else:
            return {}


nexus = Nexus() # Objekt instanziieren
```

## Schlusswort

Eigentlich ist jede Partie in StarCraft II ein typisches DAC-Modell: Der Spieler beherrscht alles, und alle Operationen im Spiel können als Zustandstransformation der beiden Grundressourcen Kristalle und Vespengas (das ich hier vereinfacht habe) betrachtet werden, um die vom Spieler benötigten Ressourcen (Produktionseinheiten, Kampfeinheiten) zu werden und die Ressourcen des Gegners zu verbrauchen, um die Partie zu gewinnen. Dies zeigt, dass der Gedanke von RESTful-Diensten sehr universell ist.

In dem kleinen Spiel **Für Aiur** habe ich mehrere Rollen festgelegt und ein RBAC-Modell konstruiert.

In dieser Praxis habe ich verstanden, wie RBAC in einem System angewendet wird, und außerdem das großartige Flask-Framework weiter gelernt, die RESTful-Idee tiefer verstanden und viel gelernt.
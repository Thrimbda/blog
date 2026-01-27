---
"title": "Ein RBAC-Demo: Für Aiur"
"summary": "Dieser Artikel stellt ein praktisches RBAC-Demo namens \"Für Aiur\" vor. Das Demo nutzt das Flask-Framework von Python, um einen RESTful-Dienst aufzubauen, der die Ressourcenverwaltung und Rollenberechtigungssteuerung im Spiel StarCraft simuliert. Der Artikel analysiert detailliert das Design der Subjekte, Rollen, Ressourcen und Berechtigungen im Demo und zeigt anhand von Codebeispielen, wie die SA- (Subjekt-Rolle) und PA- (Rolle-Berechtigung) Beziehungen im RBAC-Modell implementiert werden. Darüber hinaus wird erläutert, wie RBAC mit einer RESTful-Architektur kombiniert wird, sowie die Geschäftslogik und Implementierungsdetails des Demos. Abschließend fasst der Autor die gewonnenen Erkenntnisse und das Verständnis von RBAC, dem Flask-Framework und RESTful-Konzepten durch diese Praxis zusammen."
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "Systemdesign"
  - "Python"
  - "Berechtigungsverwaltung"
  - "StarCraft"
  - "Demo"
"date": "11.05.2017"
---

---
title: Ein RBAC-Demo: Für Aiur
date: 11.05.2017
taxonomies:
  tags:
    - Systemdesign und -analyse
    - RESTful
    - RBAC
---

Basierend auf dem Verständnis von RBAC aus dem vorherigen Artikel und aufgrund von Aufgabenanforderungen werde ich ein einfaches Demo als praktische Übung für RBAC erstellen.

Ich habe nicht die Absicht, das Demo übermäßig komplex zu gestalten. Mein Ziel ist es, das Konzept zu veranschaulichen, daher gilt auch hier: "Klein, aber fein."

Was ist also das Ziel dieses Demos und was kann es tun?

<!--more-->

## Analyse und Design

Um es interessant zu gestalten und die Problematik angemessen widerzuspiegeln, werde ich in meinem Demo eine stark vereinfachte Szene aus einem StarCraft-Gefecht simulieren, in der jede Einheit auf wundersame Weise über subjektive Handlungsfähigkeit verfügt und ein Protoss-Spieler die Kontrolle hat.

Ein gutes Demo braucht einen guten Namen, daher heißt dieses Demo: **Für Aiur!** (Aiur ist der Heimatplanet der Protoss, und jeder Zealot sagt diesen begeisterten Ausruf, wenn er auf das Schlachtfeld gebeamt wird: "Für Aiur!")

In **Für Aiur** führst du deine Truppen an, um genügend Zealot-Krieger zu produzieren, den Zerstörer Amon zu vernichten und das Universum zu retten. Wenn du nicht genug Zealots hast, wirst du scheitern, die Sterne flüstern und alles wird in Nichts zerfallen.

All dies wird in einem RESTful-Dienst umgesetzt, der mit dem Flask-Framework von Python geschrieben wurde.

> Eigentlich könnten in einem realen Szenario alle Subjekte außer dem Spieler erschaffen werden und somit als Ressourcen betrachtet werden. Um RBAC zu demonstrieren, habe ich ihnen jedoch die folgenden Einschränkungen auferlegt:
>
> - Die wenigen in diesem Demo bereitgestellten Subjekte sind einzigartig und existieren immer, als wären sie unverwechselbar. Dadurch wird auch die Möglichkeit ausgeschlossen, dass irgendein Subjekt rekursiv erschaffen werden könnte (z.B. kann eine Sonde einen Nexus bauen, und der Nexus kann Sonden produzieren).
> - Eigentlich benötigen Warpgates Kristall-Energie, um zu funktionieren, aber das wird hier nicht dargestellt. Ich erkläre es damit, dass unsere Warpgates Energie von der *Spear of Adun*, dem legendären Protoss-Mutterschiff in der synchronen Umlaufbahn, erhalten und daher die Pylone nur als Ressource zur Bereitstellung des Bevölkerungslimits betrachtet werden.

Dieses Gefechtsszenario enthält die folgenden Objekte:

### Subjekt (Subject)

- Spieler (du) - thrimbda
- Sonde (grundlegende Arbeitseinheit, kann Ressourcen sammeln und Gebäude bauen) - probe
- Warpgate (produziert Zealots, eine Kampfeinheit) - gateway

#### Rolle (Role)

- Archon (Oberbefehlshaber, verwaltet alle Ressourcen) - archon
- Kristallsammler (kann nur von Sonden übernommen werden) - crystal_collector
- Portal für Zealot-Beaming (Unterstützt das Beamen von Protoss-Kriegern) - portal
- Pylon-Bauer (Mit Pylonen können wir ein ausreichendes Bevölkerungslimit für das Beamen von Zealots erreichen) - pylon_transporter

### Ressource (Resource)

- Ungesammelte Kristalle (werden zum Bau von Pylonen und zum Beamen von Zealots verwendet, Anfangswert unbekannt)
- Gesammelte Kristalle (werden zum Bau von Pylonen und zum Beamen von Zealots verwendet, Anfangswert 0)
- Bevölkerungslimit (stellt Energie für das Beamen bereit, also die von uns oft erwähnte "Bevölkerung", Anfangswert 0)
- Zealots (Kampfeinheiten, deine Krieger zur Rettung des Universums, Anfangswert 0)

### Berechtigung (Permission)

> Da jede Operation auf eine Ressource eine Berechtigung darstellt, listen wir hier nicht die Operationen separat auf, sondern geben direkt die Berechtigungen und ihre Beschreibungen an.

- Kristalle sammeln (maximal 1000 Einheiten pro Sammelvorgang)
- Ungesammelte Kristalle beobachten (Gesamtmenge anzeigen)
- Statusbericht (Meldet die aktuellen Ressourcenmengen)
- Amons Stärke auskundschaften (Berechnet die benötigte Anzahl an Zealots)
- Pylon bauen (Jeder Pylon bietet 10 Bevölkerungslimit-Einheiten und kostet 100 Kristalle)
- Zealot produzieren (Jeder Zealot verbraucht 2 Bevölkerungslimit-Einheiten und kostet 100 Kristalle)
- Amon angreifen (Sieg oder Tod!)

### SA (Subjekt-Rolle)

> Die vielen-zu-vielen Beziehungen zwischen Subjekt-Rolle und Rolle-Berechtigung werden mit Pythons Tupel-Datenstruktur dargestellt, ebenso in der Implementierung. Daher wird in dieser Anwendung keine Datenbank verwendet.

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (Rolle-Berechtigung)

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

Zusammenfassend habe ich mit dem Flask-Framework von Python einen Dienst im RESTful-Stil geschrieben. Die gesamte Anwendung beinhaltet keinen Frontend-Teil, daher gibt es auch keine Sicherheitsprobleme wie das Umgehen des Frontends.

Ein Merkmal dieses Demos ist, dass keine Datenbank verwendet wird. RBAC schreibt die Verwendung einer Datenbank nicht zwingend vor, und es ist eine intuitive und natürliche Sache, in RBAC eine Datenbank zu verwenden. In **Für Aiur** verwenden wir jedoch keine Datenbank, sondern stellen die `Subjekt-Rolle-Berechtigung`-Beziehungen von RBAC in Dateiform dar. Datenbanken haben sich auf Basis von Dateisystemen entwickelt. Hier werden Dateien verwendet, weil das System einfach genug ist, um die Komplexität weiter zu reduzieren und das Konzept zu veranschaulichen. Die konkrete Dateiform ist in der obigen Beschreibung der SA- und PA-Beziehungen zu sehen.

### Bezüglich RESTful

Hier sei kurz auf RESTful (**Re**presentational **S**tate **T**ransfer) eingegangen.

Wie der Name schon sagt: (Ressourcen-) Darstellungsschicht-Zustandsübertragung.

In einem Web-Dienst sind die bereitgestellten Dienste die Ressourcen des Systems, die in Form von URIs dargestellt werden. Die Form des Dienstes ist die Operation auf die Ressource (Zustandsübertragung), die durch HTTP-Verben dargestellt wird. Mehrere Konzepte darin lassen sich gut den Ressourcen und Operationen in RBAC zuordnen. Daher besteht meine Aufgabe darin, die Berechtigungsverwaltung von RBAC auf die Operationen an Ressourcen in REST anzuwenden.

### Die verschiedenen Objekte in RBAC

Wie in den beiden Konfigurationsdateien zu sehen ist, können wir S, R, P implizit aus SA und PA ableiten:

```python
# Leite die S- und R-Listen aus dem obigen Tupel subject_role ab
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

SE (Sitzung) lässt sich gut mit der Session in einer Webanwendung korrelieren, als temporäres Objekt für ein Subjekt während einer Anmeldung:

```python
# Das Subjekt meldet sich über die API des taktischen Managementsystems der Spear of Adun an. Hier ist session ein globales Objekt von Flask, dessen Implementierungsdetails nicht weiter erläutert werden.
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

In **Für Aiur** definiere ich Berechtigungen als interne Attribute der Web-API, z.B.:

```python
# API zum Beamen von Zealots
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # Berechtigung
        abortIfSubjectUnauthenticated(session) # Anmeldeüberprüfung
        checkPermission(session['role'], permission, role_permission) # Prüft, ob das Subjekt in dieser Rolle diese Berechtigung anfordern darf
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

In den beiden oben als Beispiel genannten APIs stellt jede Klasse eine Ressource im System dar, und die bereitgestellten HTTP-Methoden sind die Operationen auf die Ressource.

**Damit sind alle Objekttypen aus RBAC versammelt.**

### Geschäftslogik

Da **Für Aiur** eine echt spielbare Online-Echtzeitstrategie-Spiel-API ist, ist es notwendig, ihre Geschäftslogik zu erläutern:

Das Ziel des Spielers ist: **Ressourcen sammeln, eine Basis bauen und dann eine Armee erschaffen, die deinen Feind in Angst und Schrecken versetzt, um den Dunklen Lord Amon zu besiegen.**

Die einzige Bedingung, um Amon zu besiegen, ist, eine ausreichende Anzahl von Zealots zu besitzen. Diese Anzahl ist eine zufällig generierte Ganzzahl zwischen 20 und 100. Gleichzeitig generiert das System basierend auf dieser Zahl genau genug ungesammelte Kristalle, um Amon zu besiegen.

**Warum genau genug?**

Da das Beamen von Zealots eine ausreichende Menge an Kristallenergie und Kristalle erfordert und die Pylone, die die Energie bereitstellen, ebenfalls Kristalle zum Bau verbrauchen. Wenn du also zu viele Pylone baust, hast du zwar genug Kristallenergie, aber **du wirst die entscheidende Schlacht um das Schicksal des gesamten Universums verlieren, weil du nicht genug Kristalle zum Beamen von Zealots hast**.

Die gesamte Logik wird von einem Objekt bereitgestellt, dessen Lebenszyklus die gesamte Schlacht umspannt. Um Probleme zu vermeiden, habe ich eine Thread-Sperre hinzugefügt, um sicherzustellen, dass jede Operation atomar ist.

```python
# Da es der Kern des gesamten Spiels ist, nenne ich es den Nexus
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
        # Initialisiert das Objekt
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # Sammelt Kristalle
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # Beamt Zealots
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # Baut Pylone
        with self._lock:
            available = self.crestalInControl / 100
            amount = min(amount, available)
            self.populationCap += amount * 10
            self.crestalInControl -= amount * 100
            return amount

    def forAiur(self):
        # Für Aiur!
        with self._lock:
            if self.zealot >= self._amond:
                return True
            else:
                return False

    def getStatus(self, role):
        # Ruft den Status ab
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


nexus = Nexus() # Instanziiert das Objekt
```

## Schlusswort

Eigentlich ist jedes Gefecht in StarCraft II ein typisches DAC-Modell (Discretionary Access Control): Der Spieler herrscht über alles, und alle Operationen im Spiel können als Zustandstransformation der beiden Grundressourcen Kristalle und Vespengas (das hier vereinfacht weggelassen wurde) betrachtet werden, um die vom Spieler benötigten Ressourcen (Produktionseinheiten, Kampfeinheiten) zu werden und die Ressourcen des Gegners zu verbrauchen, um das Gefecht zu gewinnen. Dies zeigt, dass der Gedanke von RESTful-Diensten sehr universell ist.

In dem kleinen Spiel **Für Aiur** habe ich mehrere Rollen festgelegt und ein RBAC-Modell konstruiert.

Durch diese Praxis habe ich die Anwendung von RBAC in einem System verstanden, außerdem das großartige Flask-Framework weiter gelernt und die RESTful-Gedanken tiefer durchdrungen, was sehr lehrreich war.
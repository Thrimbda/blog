---
"title": "An RBAC Demo: For Aiur"
"summary": "This article introduces an RBAC practice demo named 'For Aiur'. The demo uses Python's Flask framework to build a RESTful service, simulating resource management and role-based permission control in the StarCraft game. The article provides a detailed analysis of the Subject, Role, Resource, and Permission design within the demo, and demonstrates through code examples how to implement the SA (Subject-Role) and PA (Role-Permission) relationships in the RBAC model. Furthermore, it explains how to integrate RBAC with a RESTful architecture, along with the demo's business logic and implementation details. Finally, the author summarizes the insights and learnings gained from this practice regarding RBAC, the Flask framework, and RESTful principles."
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "System Design"
  - "Python"
  - "Permission Management"
  - "StarCraft"
  - "Demo"
"date": "2017-05-11"
---

---
title: An RBAC Demo: For Aiur
date: 2017-05-11
taxonomies:
  tags:
    - System Design & Analysis
    - RESTful
    - RBAC
---

Based on the understanding of RBAC from the previous article, and also due to assignment requirements, I will create a simple demo as a practice for RBAC.

I have no intention of making the demo overly complex. My goal is to illustrate the concepts, so it remains "small but complete."

So, what is the goal of this demo, and what can it do?

<!--more-->

## Analysis and Design

To make it interesting and fully reflect the problem, I will simulate a greatly simplified scenario in my demo, where each unit miraculously possesses subjective initiative, set in a StarCraft battle from the perspective of a Protoss player.

A good demo needs a good name, so this demo is called: **For Aiur!** (Aiur is the Protoss homeworld. Every Zealot says this impassioned line when warping onto the battlefield: "For Aiur!")

In **For Aiur**, you lead your team to produce enough Zealot warriors to destroy the Destroyer Amon and save the universe. If you don't have enough Zealots, you will fail, the stars will whisper, and all things will vanish.

All of this is embodied in a RESTful service built with Python's Flask framework.

> In a real scenario, every entity except the player could be created, thus all could be considered resources. To reflect RBAC, I have added the following constraints:
>
> - The few subjects provided in this demo are unique and always exist, as if they were one-of-a-kind, thus eliminating any possibility of subjects being recursively created (e.g., a Probe can produce a Nexus, and a Nexus can produce Probes).
> - In reality, Gateways require energy from Pylons to function, but this is not reflected here. I explain it as our Gateways receiving energy support from the Spear of Adun, the legendary Protoss mothership in synchronous orbit, thus treating Pylons only as resources providing population cap.

This battle scenario contains the following objects:

### Subject

- Player (You) - thrimbda
- Probe (Basic worker unit, can gather resources and construct buildings) - probe
- Gateway (Produces Zealots, a combat unit) - gateway

#### Role

- Archon (Supreme commander, allocates all resources) - archon
- Crystal Collector (Only Probes can take on this role) - crystal_collector
- Portal for Zealot Warp-in (Beacon supporting the teleportation of Protoss warriors) - portal
- Pylon Builder (With Pylons, we can have enough population cap to warp in Zealots) - pylon_transporter

### Resource

- Uncollected Crystal (Used to build Pylons and warp in Zealots, initial value unknown)
- Collected Crystal (Used to build Pylons and warp in Zealots, initial value 0)
- Population Cap (Provides energy for warping, i.e., the population we talk about, initial value 0)
- Zealot (Combat unit, the warriors you use to save the universe, initial value 0)

### Permission

> Since each operation on a resource is a permission, we do not list operations separately here but directly give the permissions and their descriptions.

- Collect Crystal (Up to 1000 units per collection)
- Observe Uncollected Crystal (Observe total amount)
- Status Report (Report current resource quantities you possess)
- Scout Amon's Strength (Calculate the required number of Zealots)
- Build Pylon (Each Pylon provides 10 population cap units and costs 100 Crystal)
- Produce Zealot (Each Zealot consumes 2 population cap units and 100 Crystal)
- Attack Amon (Victory or death!)

### SA

> The many-to-many relationships for Subject-Role and Role-Permission are represented using Python's tuple data structure, and the same is true in the implementation. Therefore, this application does not use a database.

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

## Implementation

[Repository URL](https://github.com/Thrimbda/my-life-for-Aiur)

[Online Deployment](https://my-life-for-aiur.herokuapp.com/) (Slow)

### Overview

In summary, I used Python's Flask framework to write a RESTful-style service. The entire application does not involve a frontend, so there are no security issues like bypassing the frontend.

A key feature of this demo is that it does not use a database. RBAC does not mandate the use of a database, and using a database in RBAC is an intuitive and natural thing. However, in **For Aiur**, we do not use a database; instead, we use files to represent the RBAC `Subject-Role-Permission` relationships. Databases themselves evolved from file systems. Files are used here because the system is simple enough, and to further reduce system complexity for illustrative purposes. The specific file format is shown in the SA and PA relationship descriptions above.

### Regarding RESTful

Here's a brief mention of RESTful (**Re**presentational **S**tate **T**ransfer).

As the name suggests, it's the (Resource) Representational State Transfer.

In a web service, the services provided are the system's resources, represented as URIs, and the form of the service is operations on the resources (state transfer), represented by HTTP verbs. Several concepts here align well with resources and operations in RBAC. Therefore, what I need to do is apply RBAC's permission management to the operations on resources in REST.

### Objects in RBAC

As seen in the two configuration files, besides SA and PA, we can implicitly derive S, R, P:

```python
# Derive S, R lists from the subject_role tuple above
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

SE (Session) can correspond well to the session in a web application, serving as a temporary object for a subject during a single login:

```python
# The subject uses this to log into the Spear of Adun tactical management system API. Here, session is a global object in Flask; its implementation details are not elaborated.
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

The ultimate purpose of Subject-Role modeling is to isolate and assign permissions, ensuring proper use and protection of system resources.

In **For Aiur**, I treat permissions as internal properties of the web API, for example:

```python
# API for warping in Zealots
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # Permission
        abortIfSubjectUnauthenticated(session) # Login verification
        checkPermission(session['role'], permission, role_permission) # Check if the subject in this role can request this permission
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

In the two API classes used as examples above, each class exists as a resource in the system, and the provided HTTP methods are operations on the resources.

**Thus, all the objects in RBAC are now present.**

### Business Logic

Since **For Aiur** is a real, playable online real-time strategy game API, it's necessary to explain its business logic:

The player's goal is: **Gather resources, build your base, and then create an army that strikes fear into the heart of your enemy to defeat the Dark One, Amon.**

The only condition to defeat Amon is to have a sufficient number of Zealots, which is a random integer between 20 and 100 generated by the system. Simultaneously, the system generates just enough uncollected crystal for you to defeat Amon based on this number.

**Why just enough?**

Since warping in Zealots requires a sufficient amount of Pylon energy and Crystal, and producing Pylons also consumes Crystal. Therefore, if you build too many Pylons, although you might have enough energy, you will **lose this battle that determines the fate of the entire universe because you don't have enough Crystal to warp in Zealots**.

This entire logic is provided by an object whose lifecycle spans the entire battle. To prevent issues, I added a thread lock to ensure each operation is atomic.

```python
# Since it is the core of the entire game, I call it the Nexus.
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
        # Initialize object
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # Collect Crystal
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # Warp in Zealots
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # Build Pylons
        with self._lock:
            available = self.crestalInControl / 100
            amount = min(amount, available)
            self.populationCap += amount * 10
            self.crestalInControl -= amount * 100
            return amount

    def forAiur(self):
        # For Aiur!
        with self._lock:
            if self.zealot >= self._amond:
                return True
            else:
                return False

    def getStatus(self, role):
        # Get status
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


nexus = Nexus() # Instantiate object
```

## Conclusion

In fact, each match in StarCraft II is a typical DAC (Discretionary Access Control) model: the player controls everything, and all operations in the game can be seen as transforming the two basic resources, Crystal and Vespene Gas (simplified out here), into the resources the player needs (production units, combat units) and consuming the enemy's resources to win the match. This shows that the RESTful service concept is very universal.

In the small game **For Aiur**, I solidified several roles to construct an RBAC model.

Through this practice, I gained an understanding of how RBAC is applied in a system, further learned the excellent Flask framework, deepened my understanding of RESTful principles, and gained a lot.
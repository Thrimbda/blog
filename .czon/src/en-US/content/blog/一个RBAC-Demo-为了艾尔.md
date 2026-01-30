---
"title": "An RBAC Demo: For Aiur"
"summary": "This article details a demo project named 'For Aiur' developed by the author to understand the RBAC model. The project simulates a simplified scenario from the StarCraft game, using Python's Flask framework to build a RESTful service and implementing the RBAC model within it. The article explains the design approach of the demo, including the definitions of subjects, roles, resources, and permissions, as well as the assignment relationships between subjects-roles and roles-permissions. It also describes how RBAC relationships are managed through file configuration without using a database, and how RBAC is integrated with a RESTful architecture. Finally, the article introduces the business logic and core code implementation of the demo, showing how roles control operations on game resources to achieve the game's objectives."
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "Python"
  - "System Design"
  - "Access Control"
  - "StarCraft"
"date": "2017-05-11"
---

---
title: An RBAC Demo: For Aiur
date: 2017-05-11
taxonomies:
  tags:
    - System Design and Analysis
    - RESTful
    - RBAC
---

Based on the understanding of RBAC from the previous article, and due to assignment requirements, I will create a simple demo as a practical implementation of RBAC.

I have no intention of making the demo overly complex. My goal is to illustrate the concepts, so it remains "small but complete."

So, what is the goal of this demo, and what can it do?

<!--more-->

## Analysis and Design

To make it interesting and fully illustrate the concepts, my demo will simulate a greatly simplified scenario from a StarCraft battle, where each unit miraculously possesses agency, from the perspective of a Protoss player.

A good demo needs a good name, so this demo is called: **For Aiur!** (Aiur is the Protoss homeworld. Every Zealot says this impassioned line when warping into battle: "For Aiur!")

In **For Aiur**, you must lead your forces to produce enough Zealot warriors to destroy the Destroyer Amon and save the universe. If you don't have enough Zealots, you will fail, the stars will whisper, and all will be annihilated.

All of this is embodied in a RESTful service built with Python's Flask framework.

> In a real scenario, every entity except the player could be created, thus they could all be considered resources. To demonstrate RBAC, I've added the following constraints:
>
> - The few subjects provided in this demo are unique and always exist, as if they were one-of-a-kind, thus removing any possibility of subjects being recursively created (e.g., a Probe can produce a Nexus, and a Nexus can produce Probes).
> - In reality, Gateways require Pylon energy to function, but this is not reflected here. I explain it as our Gateways receiving energy support from the Spear of Adun, the legendary Protoss mothership in synchronous orbit, thus treating Pylons only as resources providing population cap.

This battle scenario contains the following objects:

### Subjects

- Player (You) - thrimbda
- Probe (Basic worker unit, can gather resources and construct buildings) - probe
- Gateway (Produces Zealots, a combat unit) - gateway

#### Roles

- Archon (Supreme commander, allocates all resources) - archon
- Crystal Collector (Only Probes can take this role) - crystal_collector
- Portal for Zealot Warp-in (Beacon supporting the teleportation of Protoss warriors) - portal
- Pylon Builder (With Pylons, we can have enough population cap to warp in Zealots) - pylon_transporter

### Resources

- Unharvested Crystal (Used to build Pylons and warp in Zealots, initial amount unknown)
- Harvested Crystal (Used to build Pylons and warp in Zealots, initial amount 0)
- Population Cap (Provides energy for warping, i.e., the population we talk about, initial amount 0)
- Zealots (Combat units, the warriors you use to save the universe, initial amount 0)

### Permissions

> Since each operation on a resource is a permission, we won't list operations separately here but directly give the permissions and their descriptions.

- Harvest Crystal (Can harvest up to 1000 units at a time)
- Observe Unharvested Crystal (Observe total amount)
- Status Report (Report current resource amounts you possess)
- Scout Amon's Strength (Calculate the required number of Zealots)
- Build Pylon (Each Pylon provides 10 population cap and costs 100 Crystal)
- Produce Zealot (Each Zealot consumes 2 population cap and 100 Crystal)
- Attack Amon (Victory or death!)

### SA (Subject-Role Assignment)

> The many-to-many relationships between subjects-roles and roles-permissions are represented using Python's tuple data structure, and this is also how it's implemented in the application. Therefore, this application does not use a database.

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (Role-Permission Assignment)

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

In summary, I used Python's Flask framework to build a RESTful-style service. The entire application does not involve a frontend, so there are no security issues like bypassing the frontend.

A key feature of this demo is that it does not use a database. RBAC does not mandate the use of a database, and using a database with RBAC is an intuitive and natural choice. However, in **For Aiur**, we don't use a database; instead, we use files to represent the RBAC `subject-role-permission` relationships. Databases themselves evolved from file systems. Using files here is because the system is simple enough, and it further reduces complexity to illustrate the point. The specific file format is shown in the SA and PA relationship descriptions above.

### Regarding RESTful

Let's briefly mention RESTful (**Re**presentational **S**tate **T**ransfer).

As the name suggests, it's about the (Resource) Representational State Transfer.

In a web service, the services provided are the system's resources, represented as URIs. The form of the service is the operation on the resources (state transfer), represented by HTTP verbs. These concepts map well to the resources and operations in RBAC. Therefore, what I need to do is apply RBAC's permission management to the operations on resources in REST.

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

The ultimate purpose of modeling subjects-roles is to isolate and assign permissions, ensuring proper use and protection of system resources.

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

In the two API classes used as examples above, each class exists as a resource in the system, and the provided HTTP methods are the operations on the resource.

**Thus, all the key objects in RBAC are now in place.**

### Business Logic

Since **For Aiur** is a real, playable online real-time strategy game API, it's necessary to explain its business logic:

The player's goal is: **Gather resources, build your base, and then create an army that strikes fear into the heart of your enemy to defeat the Dark One, Amon.**

The only condition to defeat Amon is to have a sufficient number of Zealots. This number is a randomly generated integer between 20 and 100. Simultaneously, the system generates just enough unharvested crystal for you to defeat Amon based on this number.

**Why just enough?**

Since warping in Zealots requires a sufficient amount of Pylon energy and crystal, and producing Pylons also consumes crystal. Therefore, if you build too many Pylons, although you might have enough energy, **you will lose this battle that decides the fate of the universe because you don't have enough crystal to warp in Zealots.**

This entire logic is provided by an object whose lifecycle spans the entire battle. To prevent issues, I added a thread lock to ensure each operation is atomic.

```python
# Since it's the core of the entire game, I call it the Nexus.
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
        # Initialize the object
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # Harvest crystal
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
        # Fight for Aiur!
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


nexus = Nexus() # Instantiate the object
```

## Conclusion

Actually, each match in StarCraft II is a typical DAC (Discretionary Access Control) model: the player controls everything. All operations in the game can be seen as transforming the two basic resources, Minerals and Vespene Gas (which I simplified here), into the resources the player needs (production units, combat units) and consuming the enemy's resources to win the match. This shows that the RESTful service concept is very universal.

In the small game **For Aiur**, I solidified several roles to construct an RBAC model.

Through this practice, I gained an understanding of how RBAC is applied in a system, further learned about the excellent Flask framework, and deepened my understanding of RESTful concepts. It has been a very rewarding experience.
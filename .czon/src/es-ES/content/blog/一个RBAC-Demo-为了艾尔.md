---
"title": "Un Demo de RBAC: Por Aiur"
"summary": "Este artículo presenta un demo práctico de RBAC llamado 'Por Aiur', construido con el framework Flask de Python para simular un servicio RESTful que gestiona recursos y controla permisos de roles en el contexto del juego StarCraft. Se analizan en detalle el diseño de sujetos, roles, recursos y permisos en el demo, y se muestran ejemplos de código sobre cómo implementar las relaciones SA (Sujeto-Rol) y PA (Rol-Permiso) del modelo RBAC. Además, se explica cómo combinar RBAC con la arquitectura RESTful, junto con la lógica de negocio y los detalles de implementación del demo. Finalmente, el autor resume lo aprendido sobre RBAC, el framework Flask y los principios RESTful a través de esta práctica."
"tags":
  - "RBAC"
  - "RESTful"
  - "Flask"
  - "Diseño de Sistemas"
  - "Python"
  - "Gestión de Permisos"
  - "StarCraft"
  - "Demo"
"date": "2017-05-11"
---

---
title: Un Demo de RBAC: Por Aiur
date: 2017-05-11
taxonomies:
  tags:
    - Diseño y Análisis de Sistemas
    - RESTful
    - RBAC
---

Basándome en la comprensión de RBAC del artículo anterior y debido a los requisitos de una tarea, desarrollaré un demo simple como práctica de RBAC.

No pretendo hacer el demo excesivamente grande. Mi objetivo es ilustrar los conceptos, por lo que sigue siendo "pequeño pero completo".

Entonces, ¿cuál es el objetivo de este demo? ¿Qué puede hacer?

<!--more-->

## Análisis y Diseño

Para hacerlo interesante y reflejar adecuadamente los problemas, simularé en mi demo una situación muy simplificada de una partida de StarCraft, donde cada unidad milagrosamente ha adquirido agencia subjetiva, desde la perspectiva de un jugador Protoss.

Un buen demo necesita un buen nombre, por lo que este se llama: **¡Por Aiur!** (Aiur es el planeta natal de los Protoss. Cada Zealot dice una frase apasionada al ser teletransportado al campo de batalla: "¡Lucho por Aiur!")

En **Por Aiur**, debes liderar a tu equipo para producir suficientes guerreros Zealot, derrotar al destructor Amón y salvar el universo. Si no tienes suficientes Zealots, fracasarás, las estrellas susurrarán y toda la existencia se desvanecerá.

Todo esto se implementa en un servicio RESTful escrito con el framework Flask de Python.

> En una escena real, aparte del jugador, cada entidad podría ser creada, por lo que podrían considerarse recursos. Para reflejar RBAC, les he añadido las siguientes restricciones:
>
> - Los pocos sujetos proporcionados por este demo son únicos y existen permanentemente, como si fueran irrepetibles, eliminando así la posibilidad de que cualquier sujeto pueda ser creado recursivamente (por ejemplo, un Sonda puede construir un Nexo, y un Nexo puede producir Sondas).
> - En realidad, el Portal de Teletransporte necesita energía de un Pilar de Cristal para funcionar, pero esto no se refleja aquí. Lo explico asumiendo que nuestro Portal recibe apoyo energético del Spear of Adun, la legendaria nave madre Protoss en órbita sincrónica, considerando así los Pilares de Cristal solo como recursos que proporcionan límite de población.

Esta partida tiene los siguientes objetos:

### Sujetos (Subject)

- Jugador (tú) - thrimbda
- Sonda (unidad de trabajo básica, puede recolectar recursos y construir edificios) - probe
- Portal de Teletransporte (produce Zealots, una unidad de combate) - gateway

#### Roles (Role)

- Archon (comandante supremo, asigna todos los recursos) - archon
- Recolector de Cristales (solo las Sondas pueden asumir este rol) - crystal_collector
- Centro de Teletransporte para Zealots (baliza que soporta el teletransporte de guerreros Protoss) - portal
- Constructor de Pilares (con Pilares, podemos tener suficiente límite de población para teletransportar Zealots) - pylon_transporter

### Recursos (Resource)

- Cristales sin recolectar (usados para construir Pilares y teletransportar Zealots, valor inicial desconocido)
- Cristales recolectados (usados para construir Pilares y teletransportar Zealots, valor inicial 0)
- Capacidad de Población (proporciona energía para teletransportes, es decir, nuestra "población", valor inicial 0)
- Zealots (unidades de combate, tus guerreros para salvar el universo, valor inicial 0)

### Permisos (Permission)

> Dado que cada operación sobre un recurso es un permiso, no listamos las operaciones por separado, sino que damos directamente los permisos y sus descripciones.

- Recolectar Cristales (máximo 1000 unidades por vez)
- Observar Cristales sin recolectar (ver el total)
- Reporte de Estado (informa la cantidad actual de recursos que posees)
- Explorar la fuerza de Amón (calcular la cantidad de Zealots necesarios)
- Construir un Pilar de Cristal (cada Pilar proporciona 10 unidades de capacidad de población y cuesta 100 cristales)
- Producir un Zealot (cada Zealot consume 2 unidades de capacidad de población y 100 cristales)
- Atacar a Amón (¡Victoria o muerte!)

### SA (Sujeto-Rol)

> La relación muchos-a-muchos entre Sujetos-Roles y Roles-Permisos se representa usando la estructura de datos de tupla de Python, y así se implementa. Por lo tanto, esta aplicación no utiliza una base de datos.

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (Rol-Permiso)

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

## Implementación

[URL del Repositorio](https://github.com/Thrimbda/my-life-for-Aiur)

[Despliegue en línea](https://my-life-for-aiur.herokuapp.com/) (lento)

### Resumen

En resumen, utilicé el framework Flask de Python para escribir un servicio con estilo RESTful. La aplicación completa no involucra una parte frontal (frontend), por lo que tampoco existen problemas de seguridad como eludir el frontend.

Una característica de este demo es que no utiliza una base de datos. RBAC no obliga a usar una, y aunque es intuitivo y natural hacerlo en RBAC, en **Por Aiur** no usamos una base de datos. En su lugar, representamos la relación `sujeto-rol-permiso` de RBAC usando archivos. Las bases de datos evolucionaron a partir de sistemas de archivos, y aquí usamos archivos porque el sistema es lo suficientemente simple, reduciendo aún más la complejidad para ilustrar los conceptos. La forma específica del archivo se muestra en las descripciones de las relaciones SA y PA anteriores.

### Sobre RESTful

Mencionemos brevemente RESTful (**Re**presentational **S**tate **T**ransfer).

Como su nombre indica, Transferencia de Estado Representacional (de recursos).

En un servicio web, los servicios proporcionados son los recursos del sistema, representados como URIs. La forma del servicio son las operaciones sobre los recursos (cambio de estado), representadas por verbos HTTP. Estos conceptos se corresponden bien con los recursos y operaciones en RBAC, por lo que mi tarea es aplicar la gestión de permisos de RBAC a las operaciones sobre recursos en REST.

### Los objetos en RBAC

Como se puede ver en estos dos archivos de configuración, además de SA y PA, podemos derivar implícitamente S, R, P:

```python
# Obtener listas de S y R a partir de la tupla subject_role anterior
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

Y SE (Sesión) se corresponde bien con la sesión en una aplicación web, como un objeto temporal para un sujeto durante un inicio de sesión:

```python
# El sujeto usa esta API para iniciar sesión en el sistema de gestión táctica del Spear of Adun. Aquí, session es un objeto global de Flask; no profundizaré en sus detalles de implementación.
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

Dado que el modelado Sujeto-Rol tiene como objetivo final aislar y asignar permisos, permitiendo que los recursos del sistema sean utilizados y protegidos adecuadamente.

En **Por Aiur**, defino los permisos como atributos internos de la API web, por ejemplo:

```python
# API para teletransportar Zealots
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # Permiso
        abortIfSubjectUnauthenticated(session) # Verificación de inicio de sesión
        checkPermission(session['role'], permission, role_permission) # Verificar si el sujeto en este rol puede solicitar este permiso
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

En las dos APIs usadas como ejemplo anteriormente, cada clase existe como un recurso en el sistema, y los métodos HTTP proporcionados son las operaciones sobre ese recurso.

**¡Hasta aquí, todos los objetos de RBAC están presentes!**

### Lógica de Negocio

Dado que **Por Aiur** es una API jugable en línea de un juego de estrategia en tiempo real, es necesario explicar su lógica de negocio:

El objetivo del jugador es: **Recolectar recursos, construir la base, y luego crear un ejército que aterrorice a tus enemigos para derrotar al Oscuro Amón.**

La única condición para derrotar a Amón es tener un número suficiente de Zealots, siendo este número un entero aleatorio generado por el sistema entre 20 y 100. Simultáneamente, el sistema generará exactamente la cantidad de cristales sin recolectar necesarios para que puedas derrotar a Amón.

**¿Por qué exactamente los necesarios?**

Dado que teletransportar Zealots requiere una cantidad suficiente de energía de cristal y cristales minerales, y los Pilares de Cristal que proporcionan energía también consumen cristales para ser producidos. Por lo tanto, si construyes demasiados Pilares, aunque tengas suficiente energía de cristal, **perderás esta batalla que decide el destino del universo por no tener suficientes cristales para teletransportar Zealots**.

Toda esta lógica la proporciona un objeto cuyo ciclo de vida abarca toda la batalla. Para evitar problemas, he añadido un bloqueo de hilo (thread lock) para asegurar que cada operación sea atómica.

```python
# Dado que es el núcleo de todo el juego, lo llamo el Nexo - Nexus
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
        # Inicializar el objeto
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # Recolectar cristales minerales
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # Teletransportar Zealots
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # Construir un Pilar de Cristal
        with self._lock:
            available = self.crestalInControl / 100
            amount = min(amount, available)
            self.populationCap += amount * 10
            self.crestalInControl -= amount * 100
            return amount

    def forAiur(self):
        # ¡Luchar por Aiur!
        with self._lock:
            if self.zealot >= self._amond:
                return True
            else:
                return False

    def getStatus(self, role):
        # Obtener estado
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


nexus = Nexus() # Instanciar el objeto
```

## Conclusión

En realidad, cada partida de StarCraft II es un modelo DAC típico: el jugador lo controla todo, y todas las operaciones en el juego pueden verse como la transformación de estado de dos recursos básicos (Cristales Minerales y Gas Vespeno, que he simplificado aquí) en los recursos que el jugador necesita (unidades de producción, unidades de combate) para consumir los recursos del enemigo y ganar la partida. Esto demuestra que el pensamiento detrás de los servicios RESTful es muy universal.

En el pequeño juego **Por Aiur**, solidifiqué varios roles para construir un modelo RBAC.

A través de esta práctica, comprendí la aplicación de RBAC en un sistema, aprendí más sobre el excelente framework Flask, entendí más profundamente el pensamiento RESTful y obtuve muchos beneficios.
---
title: Un Demo de RBAC: Por Aiur
date: 2017-05-11
taxonomies:
  tags:
    - Diseño y Análisis de Sistemas
    - RESTful
    - RBAC
---

Basándome en la comprensión de RBAC del artículo anterior, y debido a los requisitos de la tarea, escribiré un Demo simple como práctica de RBAC.

No tengo la intención de hacer el Demo enormemente complejo. Mi objetivo es ilustrar el problema, por lo que sigue siendo "pequeño como un gorrión, pero con todos los órganos vitales".

Entonces, ¿cuál es el objetivo de este Demo? ¿Qué puede hacer?

<!--more-->

## Análisis y Diseño

Para hacerlo interesante y reflejar plenamente el problema, simularé en mi Demo una escena muy simplificada de StarCraft, donde cada unidad milagrosamente tiene agencia subjetiva, desde la perspectiva de un jugador protoss.

Un buen Demo necesita un buen nombre, por lo que este Demo se llama: **¡Por Aiur!** (Aiur es el planeta natal de los protoss, y cada zealot dice una frase apasionada al ser teletransportado al campo de batalla: "¡Lucho por Aiur!")

En **Por Aiur**, debes liderar a tu equipo para producir suficientes guerreros zealot, destruir al Destructor Amon y salvar el universo. Si no tienes suficientes zealots, fracasarás, las estrellas susurrarán y toda la existencia se desvanecerá.

Todo esto se refleja en un servicio RESTful escrito con el framework Flask de Python.

> En realidad, en la escena real, cada entidad excepto el jugador puede ser creada, por lo que todas pueden considerarse recursos. Para reflejar RBAC, les he añadido las siguientes restricciones:
>
> - Los pocos sujetos proporcionados por este Demo son únicos y existen permanentemente, como si fueran irrepetibles, eliminando así cualquier posibilidad de que un sujeto pueda ser creado recursivamente (por ejemplo, un Sonda puede producir un Nexo, y un Nexo puede producir un Sonda).
> - En realidad, el Portal necesita el apoyo energético de un Pilar de Cristal para funcionar, pero aquí no se refleja. Lo explico asumiendo que nuestro Portal recibe apoyo energético del Spear of Adun, la legendaria nave nodriza protoss en órbita síncrona, considerando así los Pilares de Cristal solo como recursos que proporcionan límite de población.

Este escenario de batalla tiene los siguientes objetos:

### Sujeto (Subject)

- Jugador (tú) thrimbda
- Sonda (unidad de trabajo básica, puede recolectar recursos de producción y construir edificios) probe
- Portal (produce zealots, una unidad de combate) gateway

#### Rol (Role)

- Archon (comandante supremo, asigna todos los recursos) archon
- Recolector de Cristales (solo el Sonda puede asumir este rol) crystal_collector
- Centro de Teletransporte para Zealots (baliza que soporta el teletransporte de guerreros protoss) portal
- Constructor de Pilares (con Pilares, podemos tener suficiente límite de población para teletransportar zealots) pylon_transporter

### Recurso (Resource)

- Cristales sin recolectar (usados para construir Pilares y teletransportar zealots, valor inicial desconocido)
- Cristales recolectados (usados para construir Pilares y teletransportar zealots, valor inicial 0)
- Capacidad de Población (proporciona energía para el teletransporte, es decir, nuestra "población", valor inicial 0)
- Zealot (unidad de combate, tus guerreros para salvar el universo, valor inicial 0)

### Permiso (Permission)

> Dado que cada operación sobre un recurso es un permiso, aquí no listamos las operaciones por separado, sino que damos directamente los permisos y sus descripciones.

- Recolectar Cristales (máximo 1000 unidades por vez)
- Observar Cristales sin recolectar (observar la cantidad total)
- Reporte de Estado (informar la cantidad actual de recursos que posees)
- Explorar la fuerza de Amon (calcular la cantidad de zealots necesarios)
- Construir Pilar de Cristal (cada Pilar proporciona 10 unidades de capacidad de población y cuesta 100 cristales)
- Producir Zealot (cada Zealot consume 2 unidades de capacidad de población y 100 cristales)
- Atacar a Amon (¡Victoria o muerte!)

### SA (Asignación Sujeto-Rol)

> La relación muchos-a-muchos entre Sujeto-Rol y Rol-Permiso se representa usando la estructura de datos de tupla múltiple de Python, y así es también en la implementación, por lo que esta aplicación no utiliza una base de datos.

```python
subject_role = (('thrimbda', 'archon'),
                ('probe', 'crystal_collector'),
                ('probe', 'pylon_transporter'),
                ('gateway', 'portal'))
```

### PA (Asignación Permiso-Rol)

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

En resumen, utilicé el framework Flask de Python para escribir un servicio con estilo RESTful. La aplicación completa no involucra una parte frontend, por lo que tampoco existen problemas de seguridad como eludir el frontend.

Una característica de este Demo es que no utiliza una base de datos. RBAC no obliga a usar una base de datos, y aunque en RBAC usar una base de datos es intuitivo y natural, en **Por Aiur** no usamos una base de datos. En su lugar, usamos archivos para representar las relaciones `sujeto-rol-permiso` de RBAC. Las bases de datos se desarrollaron sobre sistemas de archivos, y aquí usamos archivos porque el sistema es lo suficientemente simple, para reducir aún más la complejidad del sistema con el fin de ilustrar el problema. La forma específica de los archivos se describe en las relaciones SA y PA anteriores.

### Sobre RESTful

Mencionemos brevemente RESTful (**Re**presentational **S**tate **T**ransfer).

Como su nombre indica, Transferencia de Estado Representacional (de recursos).

En un servicio web, los servicios proporcionados son los recursos del sistema, representados en forma de URI, y la forma del servicio son las operaciones sobre los recursos (cambio de estado), representadas por verbos HTTP. Estos conceptos se corresponden bien con los recursos y operaciones en RBAC, por lo que lo que debo hacer es aplicar la gestión de permisos de RBAC a las operaciones sobre recursos en REST.

### Los objetos en RBAC

Se puede ver que en estos dos archivos de configuración, además de SA y PA, podemos derivar implícitamente S, R, P:

```python
# Obtener listas S y R a partir de la tupla subject_role anterior
subjects = list(set([item[0] for item in subject_role]))
roles = list(set([item[1] for item in subject_role]))
```

Y SE (Sesión) se corresponde bien con la sesión en una aplicación web, como un objeto temporal para un sujeto durante un inicio de sesión:

```python
# API para que un sujeto inicie sesión en el sistema de gestión táctica del Spear of Adun. Aquí session es un objeto global de Flask, cuyos detalles de implementación no se detallarán.
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

Dado que el modelado sujeto-rol tiene como objetivo final aislar y asignar permisos, permitiendo que los recursos del sistema sean utilizados y protegidos adecuadamente.

En **Por Aiur**, trato los permisos como atributos internos de la API web, por ejemplo:

```python
# API para teletransportar zealots
class Zealot(Resource):

    def put(self):
        permission = 'transport_zealot' # Permiso
        abortIfSubjectUnauthenticated(session) # Verificación de inicio de sesión
        checkPermission(session['role'], permission, role_permission) # Verificar si el sujeto en este rol puede solicitar este permiso
        args = self.putparser.parse_args()
        amount = nexus.transport(args['amount'])
        return {'message': 'transport %d zealot warriors, En Taro Tassadar!' % amount}, 200
```

En las dos APIs usadas como ejemplo, cada clase existe como un recurso en el sistema, y los métodos HTTP proporcionados son las operaciones sobre esos recursos.

**Hasta aquí, todos los objetos de RBAC están presentes.**

### Lógica de Negocio

Dado que **Por Aiur** es una API de juego de estrategia en tiempo real jugable en línea, es necesario hablar de su lógica de negocio:

El objetivo del jugador es: **Recolectar recursos, construir la base, y luego crear un ejército que aterrorice a tus enemigos para derrotar al Oscuro Amon.**

La única condición para derrotar a Amon es tener un número suficiente de zealots, y este número es un entero aleatorio generado por el sistema entre 20 y 100. Simultáneamente, el sistema generará la cantidad exacta de cristales sin recolectar necesarios para que puedas derrotar a Amon.

**¿Por qué exactamente suficiente?**

Dado que teletransportar zealots requiere una cantidad suficiente de energía de cristales y cristales minerales, y los Pilares de Cristal que proporcionan energía también consumen cristales para ser producidos. Por lo tanto, si construyes demasiados Pilares, aunque la energía de cristales sea suficiente, **perderás esta batalla que decide el destino del universo por no tener suficientes cristales para teletransportar zealots**.

Toda esta lógica es proporcionada por un objeto cuyo ciclo de vida abarca toda la campaña. Para evitar problemas, he añadido un bloqueo de hilo (thread lock) para asegurar que cada operación sea atómica.

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
        # Inicializar objeto
        self._amond = random.randint(20, 100)
        self.crestalRemain = self._amond * 100 + (self._amond // 5 + 1) * 100
        self.crestalInControl = 0
        self.populationCap = 0
        self.zealot = 0

    def collect(self, amount=1000):
        # Recolectar cristales
        with self._lock:
            amount = min(amount, self.crestalRemain)
            self.crestalRemain -= amount
            self.crestalInControl += amount
            return amount

    def transport(self, amount=5):
        # Teletransportar zealots
        with self._lock:
            capacity = self.populationCap / 2
            available = self.crestalInControl / 100
            amount = min(amount, capacity, available)
            self.zealot += amount
            self.crestalInControl -= amount * 100
            self.populationCap -= amount * 2
            return amount

    def build(self, amount=1):
        # Construir Pilar de Cristal
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


nexus = Nexus() # Instanciar objeto
```

## Conclusión

En realidad, StarCraft II en cada partida es un modelo DAC típico: el jugador lo controla todo, y todas las operaciones en el juego pueden verse como la transformación de estado de los dos recursos básicos, cristales minerales y gas vespeno (simplificado aquí), convirtiéndose en los recursos necesarios para el jugador (unidades de producción, unidades de combate) y consumiendo los recursos del enemigo para ganar la partida. Esto muestra que la idea de los servicios RESTful es muy universal.

En el pequeño juego **Por Aiur**, solidifiqué varios roles, construyendo un modelo RBAC.

En esta práctica, comprendí la aplicación de RBAC en un sistema, y además aprendí más sobre el excelente framework Flask, entendiendo más profundamente el pensamiento RESTful, con muchas ganancias.
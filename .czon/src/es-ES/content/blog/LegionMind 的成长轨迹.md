---
title: La trayectoria de crecimiento de Legion: de registrador de tareas a sistema operativo de ingeniería multiagente
date: 8 de marzo de 2026
---

## Prólogo

Este documento intenta responder una pregunta que he estado analizando yo mismo: ¿Cómo es que convertí a Legion, desde una idea que casi no tenía nada, en el sistema de colaboración de ingeniería multiagente relativamente maduro que es hoy?

Este análisis se basa principalmente en cuatro tipos de materiales:

- El historial de git de `.legion/` en el repositorio Yuan
- El estado actual de `.legion/config.json` y `.legion/ledger.csv`
- Un conjunto representativo de artefactos de tareas, revisiones, RFCs e informes
- El marco de pensamiento que ya expuse explícitamente en la entrada del blog "[Reflexiones sobre los AI Agent](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)"

Si tuviera que dar una conclusión de una sola frase, sería esta:

> Legion no es un sistema completo que diseñé desde el principio, sino que fue forjado poco a poco bajo la presión de tareas reales, por problemas como "gestión de contexto, conocimiento implícito, puertas de diseño, coste de verificación, coste de reporte". Al principio solo era para que el Agent no perdiera la memoria, y luego evolucionó gradualmente hasta convertirse en un sistema de ingeniería que regula cómo trabajan múltiples Agents.

---

## 1. Primero, el presente: ¿En qué se ha convertido Legion?

Si no hablamos del punto de partida y solo miramos el estado actual, Legion claramente ya no es un directorio de notas disperso.

Según el estado actual de `.legion` en el repositorio Yuan:

- Actualmente hay 34 tareas.
- La distribución de estados es aproximadamente: 9 `archived`, 23 `paused`, 2 `active`.
- En `.legion/ledger.csv` ya hay 2498 registros de auditoría.
- Las acciones más comunes son `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- La política actual de creación de tareas es [`agent-with-approval`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json), es decir, las tareas complejas por defecto primero proponen, luego se aprueban y finalmente se ejecutan.

Viendo estas cosas juntas, Legion hoy tiene al menos cinco capacidades estables:

1.  **Persistencia de tareas**: Los objetivos, el contexto y el progreso de las tareas ya no viven solo en la sesión.
2.  **Puertas de diseño**: Las tareas complejas no pueden comenzar directamente; primero deben tener un plan, RFC o propuesta.
3.  **Ciclo cerrado de revisiones**: Los comentarios no son solo charla, son elementos de revisión estructurados con estado.
4.  **Artefactos de cadena de evidencia**: Muchas tareas ya producen de forma estable RFCs, revisiones, informes de pruebas, walkthroughs, cuerpos de PR.
5.  **Auditoría y gobernanza**: El sistema sabe cuándo, quién tomó qué decisión, avanzó qué fase, cerró qué revisión.

Si lo comprimimos en la línea de producción de la que hablé en el blog, ya se parece mucho a:

`Intención -> Plan -> Ejecutar -> Verificar -> Reportar -> Memoria`

Es decir, Legion hoy ya no es un "sistema de notas para ayudar a escribir código", sino la "capa de protocolo para la colaboración multiagente".

---

## 2. Primera fase: Primero, sacar las tareas de la cabeza

El punto de partida de Legion es en realidad muy simple.

Según el historial de git, lo que introdujo por primera vez `.legion` como un flujo de trabajo explícito en el repositorio fue [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md).

Los tres puntos de anclaje más cruciales de este lote fueron:

- [`plan.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
- [`context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md)
- [`tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/tasks.md)

Estos tres archivos luego se convirtieron casi en el esqueleto de Legion.

### 1. `plan.md` resuelve "qué hay que hacer"

En [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md), `plan.md` ya no era una simple tarea pendiente como "agregar quote service a todos los vendors", sino que detallaba:

- Objetivo
- Contexto y motivación
- No objetivos
- Alcance
- Planificación por fases
- Resumen de contratos
- Diseño por vendor

Este paso es clave porque significa que Legion, desde el principio, no era una simple lista de tareas, sino un índice de diseño ligero.

### 2. `context.md` resuelve "qué pasó, por qué se hizo así"

En [`implement-quote-service/context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md) ya se pueden ver varias capacidades centrales que luego tendría Legion:

- Registrar archivos clave
- Registrar decisiones clave
- Registrar resultados de verificación
- Proporcionar una transferencia rápida

En otras palabras, `context.md` asumió desde el principio la función de "sustituir lo que acabo de entender en mi cabeza".

### 3. `tasks.md` resuelve "en qué punto estamos ahora"

Una vez que comienza el trabajo multiagente o de múltiples turnos, lo primero que se pierde a menudo no es el código, sino el estado de progreso.

La importancia de `tasks.md` radica en:

- Dividir las fases
- Marcar la tarea actual
- Agregar nuevas tareas descubiertas
- Permitir que la siguiente ronda de diálogo pueda recuperar rápidamente el contexto

Por lo tanto, la primera fase de Legion esencialmente resolvía un problema muy práctico:

> Primero, no olvidar. Primero que las tareas no se pierdan, que el contexto se pueda recuperar, que el Agent no pierda la memoria después de terminar.

Esto es completamente consistente con el punto de partida que escribí en el blog: cuando el trabajo paralelo comienza a aumentar, lo primero que colapsa es la capacidad de gestión del contexto humano.

---

## 3. Segunda fase: Del registro de tareas a la externalización del conocimiento implícito

Si la primera fase resolvía principalmente "no olvidar lo que se está haciendo", la segunda fase resolvía ese "muro de conocimiento implícito" que mencioné específicamente en el blog.

### 1. Las tareas complejas comienzan a forzar el mecanismo de revisión

Desde mediados/finales de diciembre de 2025, los documentos de plan en Legion comenzaron a incluir muchos bloques `> [REVIEW]`. Las tareas típicas incluyen:

- [`yuantsexchange-ohlcinterestrate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/yuantsexchange-ohlcinterestrate/plan.md)
- [`vendors-ingest-ohlc-interest-rate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendors-ingest-ohlc-interest-rate/plan.md)
- [`task-vex-queryquotes-swr`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-queryquotes-swr/plan.md)
- [`task-vex-quote-upstream-refactor`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-quote-upstream-refactor/plan.md)
- [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)

Estas tareas tienen algo en común:

- Ya no son tareas que se puedan completar simplemente "modificando según el patrón existente".
- Involucran implementaciones antiguas, historial de evolución, mejores prácticas locales y muchas restricciones no obvias.
- Lo que realmente determina la calidad del resultado a menudo no es si el modelo puede escribir el código, sino si sabe qué debe heredar y qué no.

Por ejemplo, en tareas como [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md), lo que aparece repetidamente en las revisiones es precisamente el conocimiento implícito típico dentro del proyecto:

- No hacer referencia a cierta implementación existente, porque esa implementación en sí tiene problemas.
- Al principio, cierta restricción parecía innecesaria, pero luego, tras reevaluar, se descubre que no se puede eliminar.
- Cosas como reglas de codificación, semántica de merge, equidad de programación, estrategias de limitación de tasa, no son "conocimiento del mundo" que el modelo pueda aprender naturalmente del código, sino conocimiento que surge del propio proyecto.

Esto corresponde exactamente a la distinción que escribí en el blog:

- La capa 1 es lo que el usuario dijo esta vez;
- La capa 2 son las decisiones técnicas y mejores prácticas locales del propio proyecto;
- Lo que más fácilmente hace fracasar al Agent es precisamente la capa 2.

El papel de Legion en esta fase fue forzar la escritura de esa capa 2.

### 2. Los comentarios comienzan a pasar de "charla" a "interfaz"

La esencia de este paso no es que aumente la cantidad de comentarios, sino que cambia su naturaleza.

Antes, los comentarios eran más como diálogos temporales; en esta fase, los comentarios comenzaron a asumir estas responsabilidades:

- Cambiar la dirección del diseño
- Complementar semánticas de fallo
- Eliminar sobreingeniería
- Señalar qué implementaciones antiguas no se deben referenciar
- Registrar restricciones de ingeniería que deben conservarse

Una vez que estas cosas se plasman en `plan.md` o `context.md`, dejan de ser recordatorios verbales y se convierten en parte de la verdad de la tarea.

Por lo tanto, Legion en la segunda fase esencialmente ya no era solo un rastreador de tareas, sino que hacía algo más importante:

> Externalizar el conocimiento implícito.

Esta es también la razón por la que luego estuve cada vez más convencido: un cerebro externo no es un lujo, sino una necesidad en proyectos complejos.

---

## 4. Tercera fase: Del cerebro externo a las puertas de diseño

A medida que las tareas se volvían más complejas, simplemente "escribir el conocimiento" ya no era suficiente. El nuevo problema se convirtió en:

> ¿Qué pasa si múltiples Agents comienzan a trabajar juntos, pero la dirección en sí es incorrecta?

En este punto, Legion comenzó su tercera fase: evolucionar de un sistema de registro a un sistema de puertas de diseño.

### 1. Los RFCs y especificaciones entran en el flujo principal

Un punto de inflexión muy típico es [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md).

En esta tarea, Legion claramente ya no era "primero hacer y luego registrar", sino "primero diseñar, primero revisar, primero pasar la puerta, luego hacer".

Esta tarea ya producía artefactos completos de diseño y verificación:

- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/rfc.md)
- [`spec-dev.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-dev.md)
- [`spec-test.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-test.md)
- [`spec-bench.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-bench.md)
- [`spec-obs.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-obs.md)

Esto significa que Legion comenzó a dividir las tareas complejas en varios niveles estables:

1.  **RFC**: Primero alinear la intención
2.  **Especificaciones Dev/Test/Bench/Obs**: Definir claramente cómo verificar de antemano
3.  **Revisión**: Exponer problemas de dirección tanto como sea posible antes de comenzar
4.  **Implementación y verificación**: Anticipar las comprobaciones de bajo coste
5.  **Informes y artefactos de PR**: Servir para la aceptación, no para "terminar y listo"

Esto es básicamente lo que llamé en el blog "alineación de intención + verificación por capas".

### 2. Los problemas de seguridad y recursos comienzan a aparecer como bloqueos previos

En tareas como [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md) y [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md), las revisiones ya no eran solo "sugerencias", sino que aparecían explícitamente elementos `blocking`.

Los problemas típicos incluían:

- Riesgo de SSRF
- Riesgo de DoS
- Tamaño del cuerpo de respuesta no limitado
- Parámetros de concurrencia y cola no seguros por defecto
- Límites de variables de entorno poco claros

Este paso es importante porque Legion comenzó a asumir una nueva responsabilidad:

> No solo registrar "por qué se hizo esto", sino también registrar "por qué no se puede hacer ahora, a menos que primero se cumplan estas condiciones".

Esto es precisamente una puerta de diseño.

En el blog escribí que cuando un sistema multiagente comienza a fallar, es natural que la persona escriba RFCs más largos, haga revisiones más estrictas, y anticipe los errores de alto coste tanto como sea posible. Legion en esta fase institucionalizó esta reacción instintiva.

---

## 5. Fase hito: La serie HTTP Proxy hace que Legion sea realmente ingenieril

Si las fases anteriores aún tenían un toque de experimentación "creciendo mientras se hace", las tareas relacionadas con `http-proxy` son básicamente el primer hito de madurez real de Legion.

Esto también coincide con mi sensación en el blog: la tarea `http-proxy` que abarcaba múltiples proyectos fue un punto en el que comencé a sentir claramente que "podía retirarme en gran medida de la codificación, dejando solo algunos comentarios de revisión".

### 1. No es una tarea puntual, sino un clúster de tareas

Las tareas relacionadas incluyen al menos:

- [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
- [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
- [`vendor-http-services-rollout`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-http-services-rollout/plan.md)
- [`http-proxy-metrics` (en `rfc-metrics.md`)](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/docs/rfc-metrics.md)
- [`http-services-terminalinfos-ready`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-services-terminalinfos-ready/plan.md)
- [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)

Esto muestra que lo que Legion soportaba en ese momento ya no era "terminar una funcionalidad", sino:

- Primero hacer la librería base
- Luego la capa de aplicación
- Luego el despliegue (rollout)
- Luego la observación y métricas
- Luego extender la capacidad al lado del vendor

Es decir, comenzó a soportar la evolución de ingeniería **entre tareas, entre paquetes y entre fases**.

### 2. El ciclo de revisión es más largo, pero también más estable

Especialmente [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) ilustra muy bien la madurez de Legion.

En esta tarea, lo que se debatía repetidamente ya no era "cómo escribir el código", sino:

- ¿`allowedHosts` afecta realmente el comportamiento de la solicitud, o solo las métricas?
- ¿Es `absolute-form` realmente la única ruta soportada?
- ¿Cómo se definen los límites entre `invalid_url`, `blocked`, `error`?
- ¿Cómo se controla el riesgo de alta cardinalidad de `target_host` / `target_path`?

Estos problemas esencialmente no son problemas de capacidad para escribir código, sino problemas de límites de especificación, límites semánticos, límites de verificación.

El valor de Legion aquí no era escribir más código por mí, sino ayudarme a estabilizar esos límites.

### 3. La interfaz de reporte comienza a ser realmente ingenieril

Este también es un paso particularmente clave para Legion.

En este lote de tareas `http-proxy`, Legion ya comenzaba a generar de forma estable:

- RFCs
- revisiones de RFC (review-rfc)
- revisiones de código (review-code)
- revisiones de seguridad (review-security)
- informes de walkthrough (report-walkthrough)
- cuerpos de PR (PR body)
- especificaciones de prueba/benchmark/observación (spec-test / spec-bench / spec-obs)

Es decir, Legion ya no se conformaba con "terminar el trabajo", sino que comenzó a soportar "explicar las cosas claramente, adjuntar la evidencia, señalar los riesgos".

Esto es completamente consistente con lo que dije en el blog: "la interfaz de reporte es un problema de ingeniería subestimado".

Lo que realmente es caro nunca son los tokens, sino el retrabajo, las preguntas repetidas, releer el código y la fuga de atención. Mientras la interfaz de reporte no esté ingenierizada, la persona aún tendrá que gastar mucho coste adivinando qué hizo realmente el Agent.

---

## 6. Fase de madurez: De la línea de producción de ingeniería al sistema de gobernanza

Mirando más adelante, la madurez de Legion no es solo que "hay más documentos", sino que comienza a tener una estructura de gobernanza.

### 1. La creación de tareas ya no es algo que se hace al azar, sino que está restringida por políticas

Actualmente, `taskCreationPolicy` en [`config.json`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json) ya es `agent-with-approval`.

Esto tiene un significado simbólico. Significa que Legion ya reconoce un hecho:

> No todas las tareas complejas deben ser decididas por el Agent mismo sobre cuándo comenzar y cuándo avanzar.

Es decir:

- El Agent puede explorar, organizar, proponer;
- Pero antes de que el trabajo complejo entre en ejecución formal, aún necesita la aprobación humana.

Esto es autonomía controlada.

### 2. Las revisiones ya no son solo texto, sino protocolos con estado

Según la distribución del ledger, `legion_list_reviews` y `legion_respond_review` ya son acciones de alta frecuencia.

Esto muestra que las revisiones en Legion no son una capacidad auxiliar, sino una de las capacidades principales. Más importante aún, no es solo "leer comentarios", sino:

- Encontrar elementos no resueltos
- Responder punto por punto a revisiones específicas
- Marcar `resolved` / `wontfix` / `need-info`
- Confirmar que la revisión se ha cerrado

El significado de este paso es:

> La colaboración entre la persona y el Agent ya no son solo mensajes de sesión, sino acciones de protocolo que se pueden sedimentar, rastrear y auditar.

### 3. Comienza a soportar la "aceptación de riesgos"

Un sistema maduro no significa que "todos los problemas estén resueltos", sino que puede distinguir claramente:

- Qué riesgos deben repararse de inmediato
- Qué riesgos pueden registrarse primero y gestionarse después
- Qué riesgos son aceptables bajo los supuestos del entorno actual

En tareas como [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) y [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md), ya se puede ver:

- Algunos problemas, tras revisión, se marcan como `wontfix`
- Algunos problemas de seguridad se registran explícitamente como riesgos aceptados en la fase actual
- Algunos riesgos residuales no se olvidan, sino que se dejan formalmente registrados

Esto muestra que Legion ya no es solo una herramienta para "ayudarme a corregir bugs", sino que comienza a soportar la realidad de las decisiones de ingeniería.

---

## 7. Muestra de mayor madurez: De `heavy-rfc` a `signal-trader`

Si tuviera que elegir, entre las tareas existentes, la muestra que mejor representa la madurez de Legion, la dividiría en dos fases consecutivas:

- [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
- [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)

### 1. `heavy-rfc`: La forma madura de las puertas de diseño

[`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md) es una tarea de diseño de alto riesgo muy típica.

Desde el principio dejó claro:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Y su cadena de artefactos ya es muy completa:

- [`task-brief.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/task-brief.md)
- [`research.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/research.md)
- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/rfc.md)
- [`review-rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/review-rfc.md)
- [`report-walkthrough.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/report-walkthrough.md)
- [`pr-body.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/pr-body.md)

Esta tarea demuestra una cosa: Legion ya puede, en tareas de alto riesgo, convertir "primero alinear la intención, luego liberar la ejecución" en un flujo estable.

### 2. `signal-trader`: El flujo pesado y el ciclo de implementación se conectan

Si `heavy-rfc` representa la madurez de las puertas de diseño, entonces [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) es más bien su continuación:

- Primero tener las restricciones de diseño pesado
- Luego entrar en implementación
- Luego ejecutar pruebas
- Luego hacer revisiones de código/seguridad
- Luego producir walkthrough y cuerpo de PR

En [`signal-trader/tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/tasks.md) se puede ver que esta cadena ya se ha comprimido en fases estándar:

1.  Definición de tarea y convergencia de límites
2.  Investigación pesada y RFC
3.  Revisión adversarial del RFC
4.  Artefactos de PR solo de RFC (borrador)
5.  Implementación de la librería central (Core Lib)
6.  Pruebas y verificación
7.  Revisión de código y seguridad
8.  Informes y artefactos de PR

Este paso es especialmente importante para mí, porque muestra que Legion en este punto ya no es "tener un sistema de documentos", sino que tiene **una plantilla de flujo de tareas pesadas que se puede reutilizar de forma estable**.

Esto es precisamente el cambio de identidad del que hablé en el blog: de ejecutor, pasar lentamente a revisor, tomador de decisiones e iterador del sistema.

---

## 8. Comparando esta trayectoria con el blog

Si volvemos a mirar "[Reflexiones sobre los AI Agent](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)", encontraremos que muchos juicios ya se han materializado en la historia de Legion.

### 1. "El primer punto dulce de la escala"

Lo que escribí en el blog fue: que múltiples Agents avancen tareas en paralelo da a corto plazo una sensación de cosecha mecanizada.

En la historia de Legion, esto corresponde al rápido crecimiento de tareas a partir de diciembre de 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

En ese momento, el objetivo central era, en efecto: primero hacer que el Agent hiciera más trabajo.

### 2. "El verdadero cuello de botella me convertí yo"

Cuando el trabajo de ejecución se delega gradualmente al Agent, el verdadero cuello de botella de la persona se convierte en:

- Gestión de contexto
- Juicio de diseño
- Aceptación
- Toma de decisiones

El trío de Legion fue precisamente lo que se usó primero para combatir esto:

- Usar `tasks.md` para reducir la pérdida de progreso
- Usar `context.md` para externalizar decisiones y archivos clave
- Usar `plan.md` para fijar objetivos y alcance

### 3. "El muro de conocimiento implícito"

Uno de los juicios más importantes del blog es que lo que el Agent aprende a menudo son solo muestras visibles, y no sabe cuál es el estándar actual.

La forma en que Legion respondió fue:

- Escribir revisiones en el plan
- Escribir restricciones en el contexto
- Escribir controversias de diseño como documentos estructurados

Es decir, externalizar el conocimiento implícito del proyecto.

### 4. "Alineación de intención + verificación por capas"

La línea de producción del blog, en tareas como `http-proxy-*` y `signal-trader`, ya se acerca mucho a su implementación original:

- Intención: Objetivo / No objetivos / Alcance
- Plan: Fases / RFC / Resumen de diseño
- Ejecutar: Implementación
- Verificar: pruebas / revisión de código / revisión de seguridad / benchmarks
- Reportar: walkthrough / cuerpo de PR
- Memoria: contexto / tarea archivada / ledger

### 5. "La interfaz de reporte es un problema de ingeniería subestimado"

En el blog dije que las conclusiones deberían vincularse a artefactos siempre que sea posible, en lugar de quedarse en resúmenes verbales.

Legion ahora avanza claramente en esta dirección:

- Las conclusiones no son una frase, sino que corresponden a informes, revisiones, informes de prueba, cuerpos de PR
- La aceptación no requiere releer todo el código, sino que puede priorizar la lectura de artefactos condensados

Aunque aún no es el Citation Agent ideal que tengo en mente, la dirección ya es muy clara.

### 6. "Los benchmarks se convertirán en una necesidad"

En el blog dije que en el futuro debe ser posible comparar diferentes flujos de trabajo o versiones de modelos, en lugar de depender de la sensación de que "esta versión es más inteligente".

Esta línea ya tiene un embrión en Legion:

- `spec-bench.md`
- Escenarios y umbrales de benchmark
- Salida e informes de benchmarks

Esto muestra que ya no es solo una idea, sino que está entrando en una fase de ingeniería.

---

## 9. Mirando al futuro desde el presente: La dirección de evolución más reciente representada por `legion-mind`

Si la historia de `.legion/` en el repositorio Yuan responde principalmente a "cómo fue forzado a surgir este sistema por necesidades reales", entonces el actual `~/Work/legion-mind` responde a otra pregunta:

> Dado que este sistema ya ha sido forzado a surgir, ¿el siguiente paso puede ser refinarlo desde la experiencia del proyecto hasta convertirlo en un sistema genérico?

Desde estas entradas se puede ver claramente la dirección de evolución más reciente de Legion:

- [`README.md`](https://github.com/Thrimbda/legion-mind/blob/main/README.md)
- [`docs/legionmind-usage.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/legionmind-usage.md)
- [`.legion/playbook.md`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md)
- [`/evolve`](https://github.com/Thrimbda/legion-mind/blob/main/.opencode/commands/evolve.md)
- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)

### 1. De "flujo de trabajo dentro del repositorio" a "plantilla de orquestación genérica"

En Yuan, Legion surgió junto con tareas específicas; en `legion-mind`, ya se ha abstraído explícitamente como:

- Agente principal: `legion`
- Subagentes: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
- Habilidad: `skills/legionmind`

Esto muestra que Legion está pasando de ser un "flujo de trabajo basado en experiencia" a un "sistema de orquestación con roles claros".

### 2. De restricciones documentales a entradas por comandos

El cambio más evidente en `legion-mind` es la conversión de flujos de alta frecuencia en comandos:

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

Esto parece solo una optimización de la experiencia de uso, pero en esencia no lo es. Significa que Legion está solidificando aún más los flujos que antes se mantenían mediante SOPs implícitos, convirtiéndolos en entradas explícitas.

### 3. De memoria de tarea a memoria organizacional

El Legion en Yuan ya podía persistir el contexto de una tarea individual; en `legion-mind`, se da un paso más: comenzar a sedimentar experiencia entre tareas en el [`playbook`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md).

Esto es importante porque:

- `plan/context/tasks` resuelven "cómo continuar esta tarea";
- `playbook` resuelve "cómo evitar errores en tareas similares en el futuro".

El playbook ya comienza a sedimentar reglas como:

- La salida de benchmarks debe permanecer dentro del repositorio
- Los benchmarks deben fijar primero un perfil determinista
- Los resúmenes faltantes deben contarse como error en el denominador, no reducir silenciosamente el denominador

Es decir, el modelo de memoria más reciente de Legion ya no es solo memoria de tarea, sino que comienza a intentar ser memoria organizacional.

### 4. De "usable" a "instalable, verificable, reversible"

`legion-mind` tiene otra dirección particularmente importante: comienza a considerar la capacidad de distribución y replicación.

En el README ya se puede ver:

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- archivos gestionados / índice de respaldo

Esto muestra que el objetivo de Legion ya no es solo "que yo lo use cómodamente en este repositorio", sino:

- Cómo sincronizar activos de forma segura
- Cómo evitar sobrescribir las modificaciones del usuario
- Cómo verificar el estado de la instalación
- Cómo revertir en caso de fallo

Es decir, comienza a pasar de un método de trabajo a un activo productizable.

### 5. De resumen de experiencia a iteración del sistema impulsada por benchmarks

En el blog dije que una de las cosas más importantes en el futuro sería poder comparar diferentes versiones de flujos de trabajo, en lugar de depender de la sensación de que "esta versión es mejor".

`legion-mind` básicamente ya está abordando esto de frente:

- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)
- Comando de línea base de benchmarks (benchmark baseline)
- Directorio de ejecuciones de benchmarks (benchmark-runs)
- Flujo de preflight / smoke / full / score / report

Esto significa que la siguiente fase de
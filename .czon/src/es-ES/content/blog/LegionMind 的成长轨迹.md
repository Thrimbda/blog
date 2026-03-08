---
title: La trayectoria de crecimiento de Legion: de registrador de tareas a sistema operativo de ingeniería multi-Agent
date: 2026-03-08
---

## Prólogo

Este documento intenta responder una pregunta concreta: ¿cómo pasamos de "casi no tener nada al principio" a usar gradualmente Legion como el sistema de colaboración de ingeniería multi-Agent relativamente maduro que es hoy?

El material aquí proviene principalmente de tres partes:

- El historial de git de `.legion/`
- El estado y los registros de auditoría de `.legion/config.json` y `.legion/ledger.csv`
- El marco de pensamiento ya explicitado en la entrada del blog *[Reflexiones sobre los AI Agent](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)*

Si tuviera que resumir esta trayectoria en una sola frase, sería aproximadamente:

> Al principio solo queríamos que el Agent nos ayudara a hacer más cosas; luego descubrimos que lo que realmente necesitábamos construir no era "una mayor capacidad para escribir código", sino todo un sistema de ingeniería que permitiera "que el Agent moleste menos, produzca más, sea verificable y transferible". Legion es lo que, en este proceso, creció paso a paso desde un registrador de tareas hasta convertirse en un sistema operativo de ingeniería multi-Agent.

---

## I. Primero, el presente: qué es Legion ya

No empecemos desde el principio, veamos primero la forma actual.

Desde el estado actual del repositorio, Legion ya no es documentación dispersa, sino un sistema de flujo de trabajo en funcionamiento continuo:

- `.legion/config.json` ya tiene 33 entradas de tareas.
- La distribución de estados es aproximadamente: 9 `archived`, 22 `paused`, 2 `active`.
- `.legion/ledger.csv` tiene acumulados 2339 registros de auditoría.
- Las acciones de alta frecuencia incluyen: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- La política actual de creación de tareas es `agent-with-approval`, lo que significa que el Agent solo puede proponer primero, no puede crear tareas directamente, debe pasar por una aprobación explícita.

Estos hechos combinados demuestran que Legion ya posee varias capacidades estables:

1.  **Persistencia de tareas**: Las tareas, el contexto y el progreso se guardan externamente, no solo viven en la sesión.
2.  **Puerta de diseño**: Las tareas complejas no pueden comenzar directamente; primero debe haber una propuesta, un plan, un RFC, antes de pasar a la ejecución.
3.  **Ciclo cerrado de revisión**: Los comentarios no son registros de chat, sino elementos de revisión estructurados con estado.
4.  **Productos de la cadena de evidencia**: Muchas tareas ya no solo tienen `plan/context/tasks`, sino que también generan `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Auditoría y gobernanza**: El sistema sabe quién tomó qué decisión en qué momento, avanzó qué fase, respondió a qué revisión.

Esto ya es altamente consistente con la línea de producción mencionada en el blog:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Es decir, el Legion de hoy ya no es un "sistema de notas para ayudar a escribir código", sino una "capa de protocolo que restringe cómo trabajan múltiples Agents".

---

## II. Punto de partida del crecimiento: primero, sacar las tareas de la cabeza

El punto de partida de Legion fue muy simple.

Según el historial de git, `.legion` entró por primera vez masivamente en el repositorio el 2025-12-15 con `implement-quote-service`. Este commit introdujo simultáneamente:

- `.legion/config.json`
- `.legion/ledger.csv`
- `.legion/tasks/implement-quote-service/plan.md`
- `.legion/tasks/implement-quote-service/context.md`
- `.legion/tasks/implement-quote-service/tasks.md`

Este punto de partida es clave, porque estableció el trío mínimo de Legion:

### 1. `plan.md`

Responsable de responder "qué hay que hacer".

En `implement-quote-service`, `plan.md` ya no era una simple tarea pendiente, sino que describía de manera relativamente completa:

- Objetivo
- Antecedentes y motivación
- No objetivos
- Alcance
- Planificación por fases
- Resumen del contrato
- Diseño por proveedor

Es decir, desde el principio no era una "Lista de Tareas", sino un documento de diseño ligero.

### 2. `context.md`

Responsable de responder "qué pasó, por qué se hizo así".

En esta etapa, el valor más evidente de `context.md` era:

- Registrar archivos clave
- Registrar decisiones clave
- Registrar resultados de verificación
- Proporcionar una transferencia rápida

Esencialmente, estaba reemplazando "aquello que acabo de entender en mi cabeza".

### 3. `tasks.md`

Responsable de responder "en qué punto estamos ahora".

Este paso es importante porque, una vez que comienza una sesión multi-Agent o de múltiples turnos, lo primero que se distorsiona no es el código, sino el estado de progreso.

El blog menciona que una persona solo puede mantener establemente dos o tres contextos al día; más allá de eso, la programación falla. El primer paso de Legion, en esencia, fue descargar el "estado de la tarea" del cerebro humano.

Así que Legion en su etapa inicial puede entenderse como:

> Primero, que las tareas no se pierdan; primero, que el contexto pueda recuperarse; primero, que el Agent no sufra amnesia después de terminar.

Esto es completamente consistente con la necesidad del blog de "descargar el contexto de la cabeza".

---

## III. Primera evolución: del registro de tareas hacia la externalización del conocimiento implícito

Si la primera etapa resolvía "no olvidar lo que se está haciendo", la segunda etapa resolvía lo que el blog llama ese "muro de conocimiento implícito".

### 1. Las tareas comienzan a complicarse, las revisiones comienzan a aparecer en masa

Desde mediados/finales de diciembre de 2025, los documentos de plan en Legion comenzaron a contener muchos bloques `> [REVIEW]`.

Las tareas típicas incluyen:

- `yuantsexchange-ohlcinterestrate`
- `vendors-ingest-ohlc-interest-rate`
- `task-vex-queryquotes-swr`
- `task-vex-quote-upstream-refactor`
- `vex-series-data-ohlcinterestrate-ohlc-v2`

La característica común de estas tareas es:

- No eran simplemente "copiar según una plantilla".
- Involucraban implementaciones antiguas, historial de evolución, preferencias de estilo, mejores prácticas locales.
- Lo que realmente determinaba el éxito o el fracaso no era la capacidad sintáctica, sino "saber qué heredar y qué no".

Por ejemplo, en la revisión de `vex-series-data-ohlcinterestrate-ohlc-v2`, se puede ver un proceso típico de "explicitación del conocimiento implícito":

- Este lugar no debe referenciar la implementación existente, porque la implementación existente tiene problemas.
- Al principio se pensó que VEX no necesitaba una limitación de tasa compleja, pero luego se reevaluó y se consideró necesario conservar ciertas estrategias de limitación.
- Las reglas de codificación de `series_id`, la semántica de `merge`, la equidad de las colas, etc., no son "conocimiento del mundo" que el modelo pueda inferir naturalmente del código, sino conocimiento local evolucionado dentro del proyecto.

Esto corresponde exactamente a la estratificación del blog:

- La capa 1 son las instrucciones de la tarea actual;
- La capa 2 son las decisiones técnicas del proyecto y las mejores prácticas locales;
- Lo que realmente hace que el Agent fracase con mayor facilidad es la capa 2.

El papel de Legion en esta etapa fue forzar la escritura de la capa 2.

### 2. Los comentarios ya no son solo comentarios, sino una interfaz de colaboración

Otro cambio crucial en esta etapa: los comentarios dejaron de ser "críticas temporales" y gradualmente se convirtieron en entradas estructuradas con ciclo cerrado.

Por ejemplo:

- Algunas revisiones cambiaban directamente la dirección del diseño.
- Otras requerían completar la semántica de fallo.
- Otras pedían eliminar el sobre-diseño.
- Otras pedían no referenciar implementaciones erróneas existentes.

Si este contenido solo existiera en los registros de chat, el siguiente Agent casi seguro lo perdería; una vez que se plasma en `plan.md` o `context.md`, pasa de ser "conocimiento oral" a "parte de la verdad de la tarea".

Así que Legion en la segunda etapa ya no era solo un rastreador de tareas, sino que comenzó a asumir la función de **cerebro externo**.

Este paso es muy importante porque corresponde a un punto de inflexión central en tu blog:

> Un cerebro externo no es un lujo, sino una necesidad en proyectos complejos.

---

## IV. Segunda evolución: del cerebro externo hacia la puerta de diseño

A medida que las tareas se volvían más complejas, simplemente "escribir el conocimiento" ya no era suficiente. El nuevo problema se convirtió en:

> ¿Qué pasa si múltiples Agents comienzan a trabajar juntos, pero la dirección en sí es incorrecta?

Aquí es cuando Legion entró en su tercera etapa: evolucionar de un "sistema de registro" a un "sistema de puerta de diseño".

### 1. Los RFC y las especificaciones comienzan a entrar en el flujo principal

Un punto de inflexión clave fue `http-proxy-service`.

En esta tarea, Legion claramente ya no era "hacer primero y registrar después", sino "diseñar primero, revisar primero, pasar la puerta primero, y luego hacer".

Esta tarea presentó:

- `docs/rfc.md`
- `docs/spec-dev.md`
- `docs/spec-test.md`
- `docs/spec-bench.md`
- `docs/spec-obs.md`
- Conclusiones de revisión
- Elementos de bloqueo de revisión de seguridad
- Walkthrough y cuerpo de PR

Esto significa que Legion comenzó a dividir una tarea compleja en varios niveles estables:

1.  **RFC**: Alineación de intención
2.  **Dev/Test/Bench/Obs Spec**: Escribir claramente "cómo verificar" de antemano
3.  **Revisión**: Exponer problemas de dirección antes de comenzar el trabajo tanto como sea posible
4.  **Implementación y verificación**: Mover las comprobaciones de bajo costo hacia adelante
5.  **Informes y productos de PR**: Servir para la aceptación

Esto es altamente consistente con la "alineación de intención + verificación por capas" mencionada en el blog.

### 2. Los problemas de seguridad y recursos comienzan a aparecer como bloqueos previos

En tareas como `http-proxy-service` y `http-proxy-app-implementation`, las revisiones ya no eran solo sugerencias, sino que aparecían directamente como `blocking`.

Por ejemplo:

- Riesgo de SSRF
- Riesgo de DoS
- Tamaño del cuerpo de respuesta no limitado
- Parámetros de concurrencia y cola no seguros por defecto
- Límites de configuración de variables de entorno poco claros

Esto indica que Legion comenzó a asumir una nueva responsabilidad:

> No solo registrar "por qué se hace esto", sino también registrar "por qué no se puede hacer ahora, a menos que se cumplan estas condiciones primero".

Esto es una puerta de diseño.

El blog dice que cuando un sistema multi-Agent comienza a fallar, la primera reacción humana suele ser escribir RFC más largos, hacer revisiones más estrictas, empujar el riesgo lo más adelante posible. Legion en este período estaba institucionalizando precisamente este instinto.

### 3. Comenzó a parecerse a una pequeña línea de producción

En esta etapa, el papel de Legion ya no era "ayudar a recordar", sino "ayudar a restringir el orden de trabajo".

Correspondiente a la línea de producción del blog:

- `Intent`: Objetivo del usuario, no objetivos, restricciones
- `Plan`: Desglose de tareas, hitos, límites
- `Execute`: Implementación
- `Verify`: build / test / benchmark / review
- `Report`: walkthrough / PR body
- `Memory`: context / decision log / archived task

Este paso es clave porque significa:

> Legion ya no solo alberga el contexto, sino que comienza a albergar el proceso.

---

## V. Hito: la serie HTTP Proxy hizo que Legion se volviera realmente ingenieril

Si las etapas anteriores aún tenían un aire experimental de "crecer mientras se hace", las tareas relacionadas con `http-proxy` son básicamente el primer hito de madurez real de Legion.

Esto coincide con la descripción del blog: mencionas explícitamente que la tarea `http-proxy` que abarcaba múltiples proyectos fue un punto en el que sentiste que "básicamente podía desvincularme de la codificación, dejando solo algunos comentarios de revisión".

Mirando en `.legion`, este juicio tiene evidencia suficiente.

### 1. No es una sola tarea, sino un grupo de tareas

Las tareas relacionadas incluyen al menos:

- `http-proxy-service`
- `http-proxy-app-implementation`
- `vendor-http-services-rollout`
- `http-proxy-metrics`
- `http-services-terminalinfos-ready`
- `vendor-tokenbucket-proxy-ip`

No es una necesidad puntual, sino una cadena de tareas de ingeniería interconectadas:

- Primero hacer la biblioteca base
- Luego la capa de aplicación
- Luego el despliegue
- Luego agregar métricas
- Luego agregar preparación de routing / IP
- Luego vincular con la lógica de limitación de tasa y carga del lado del proveedor

Es decir, Legion ya había comenzado a soportar un tipo real de **evolución entre tareas, entre paquetes, entre fases**.

### 2. El ciclo de revisión se alarga notablemente, pero al mismo tiempo es más estable

Especialmente `http-proxy-app-implementation`, ilustra muy bien la madurez de Legion:

- Por un lado, hay muchas revisiones y muchos puntos de controversia;
- Por otro lado, estas controversias no se quedaron en los registros de chat, sino que se convirtieron en actualizaciones de RFC, conclusiones de revisión y decisiones de contexto.

En esta tarea se pueden ver debates de ingeniería muy típicos:

- ¿`allowedHosts` afecta el comportamiento de la solicitud o solo las métricas?
- ¿Debe `absolute-form` ser el único formato de ruta soportado?
- ¿Cómo se definen los límites entre `invalid_url`, `blocked`, `error`?
- ¿Cómo se controla el riesgo de alta cardinalidad de `target_host` / `target_path`?

Estos no son problemas que la "capacidad de escribir código" pueda resolver directamente, sino problemas de **límites de especificación, límites de verificación, límites semánticos**.

El valor de Legion aquí no es ayudar a escribir código, sino ayudar a estabilizar estos límites.

### 3. Comenzó a generar artefactos realmente útiles para la aceptación

Este paso también corresponde exactamente al "problema de ingeniería subestimado de la interfaz de reporte" del blog.

En la serie de tareas de http-proxy, Legion ya generaba de manera estable:

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- pr-body
- spec-test / spec-bench / spec-obs

Esto indica que Legion ya no se conformaba con "hacer las cosas", sino que comenzó a apoyar "explicar las cosas claramente, adjuntar la evidencia, comunicar los riesgos".

En otras palabras:

> En este momento, Legion comenzó a servir realmente a la "aceptación de bajo costo", no solo a la "ejecución de alta eficiencia".

Este también es un juicio particularmente importante en el blog: lo más costoso no son los tokens, sino el retrabajo y la fuga de atención.

Mientras la interfaz de reporte no sea ingenieril, las personas aún tendrán que gastar mucha energía adivinando qué hizo realmente el Agent. Legion en este período claramente ya estaba abordando activamente este problema.

---

## VI. Período de madurez: de la línea de producción de ingeniería hacia el sistema de gobernanza

Continuando hacia adelante, la madurez de Legion no solo se manifiesta en "más y más documentación", sino en que la **estructura de gobernanza** comienza a fijarse.

### 1. La creación de tareas comienza a estar restringida por políticas de aprobación

Actualmente, `taskCreationPolicy` en `.legion/config.json` ya es `agent-with-approval`.

Este paso es muy simbólico.

Significa que Legion comenzó a reconocer un hecho:

> No todas las tareas complejas deberían ser decididas por el Agent mismo cuándo crearlas, cuándo avanzarlas.

Detrás de esto está precisamente ese problema más profundo planteado en el blog:

- A medida que los modelos se vuelven más potentes, ¿debería el proceso delegar más autoridad?
- Si se delega, ¿dónde están los límites?
- ¿Qué debe pasar primero por la aprobación humana, qué puede avanzar automáticamente?

La respuesta de Legion no es la autonomía total, sino la **autonomía controlada**.

Es decir:

- El Agent puede explorar, organizar, proponer;
- Pero el trabajo complejo, antes de entrar en ejecución formal, aún requiere aprobación humana.

Esto ya se parece mucho al mecanismo de trabajo en una organización real.

### 2. Las revisiones ya no son solo sugerencias, sino un protocolo de colaboración con estado

Según las estadísticas del ledger, `legion_list_reviews` y `legion_respond_review` ya han acumulado muchos registros.

Esto indica que la revisión en Legion no es una capacidad auxiliar, sino una capacidad principal.

Más importante aún, no es "leer un comentario", sino:

- Listar elementos no resueltos
- Responder a una revisión específica
- Marcar como resolved / wontfix / need-info
- Confirmar nuevamente el cierre del ciclo de revisión

Esto es muy diferente de una anotación en markdown común. Convierte el "comentario" de texto en una máquina de estados rastreable.

El significado de este paso es:

> La comunicación entre la persona y el Agent ya no son solo mensajes de sesión, sino acciones de protocolo sedimentables, rastreables y auditables.

### 3. Comenzó a albergar "aceptación de riesgos", no solo "corrección de problemas"

Otra señal de un sistema maduro no es que "todos los riesgos estén resueltos", sino que "el sistema puede distinguir qué riesgos resolver ahora y qué riesgos aceptar ahora".

En tareas como `http-proxy-app-implementation`, `vendor-tokenbucket-proxy-ip`, ya se puede ver:

- Algunos problemas de seguridad después de la revisión se marcaron como `wontfix`
- Algunos riesgos se registraron explícitamente como aceptados por el usuario
- Algunos comportamientos se conservaron como riesgo residual, en lugar de ser olvidados vagamente

Esto indica que Legion ya no es solo una "herramienta para corregir bugs", sino que comienza a albergar la realidad de las decisiones de ingeniería:

- Algunos problemas deben repararse de inmediato
- Algunos problemas primero se registran, luego se gestionan
- Algunos problemas los cubren las suposiciones del entorno actual

Esto es gobernanza.

---

## VII. Ejemplo de mayor madurez actual: `heavy-rfc`

Si tuviera que elegir una tarea existente que mejor represente la madurez actual de Legion, elegiría `heavy-rfc`.

Esta tarea puede verse casi como una muestra completa del paradigma del flujo de trabajo actual de Legion.

### 1. Desde el principio tiene clasificación de riesgo y declaración de fase

No escribe simplemente "implementar live trading", sino que desde el principio declara explícitamente:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Es decir, esta tarea no es "implementar primero y luego completar la documentación", sino que primero reconoce que es una tarea de alto riesgo, por lo que debe pasar primero por el proceso de RFC pesado.

### 2. Ya tiene una cadena completa de productos

`heavy-rfc` ya contiene:

- `task-brief.md`
- `research.md`
- `rfc.md`
- `review-rfc.md`
- `test-report.md`
- `review-code.md`
- `review-security.md`
- `report-walkthrough.md`
- `pr-body.md`

Esta cadena de productos en sí misma demuestra que Legion ya ha dividido una tarea de ingeniería de alto riesgo en múltiples capas revisables, verificables y transferibles.

### 3. Refleja la forma de trabajo del blog: "primero converger la intención, luego liberar la ejecución"

El blog tiene un juicio muy central:

> La autonomía no es solo ser inteligente, sino molestar menos, producir más, ser verificable.

`heavy-rfc` refleja precisamente esto:

- Primero fijar la dirección a través de documentos de diseño y revisión
- Luego reducir el riesgo de implementación a través de pruebas y revisiones
- Finalmente reducir el costo de aceptación a través de reportes / PR body

Esto significa que Legion, hasta ahora, ya puede apoyar una nueva postura de trabajo:

> La persona se encarga principalmente de establecer objetivos, restringir límites, revisiones clave; el Agent se encarga de avanzar en la implementación, verificación y reporte dentro de la vía institucionalizada.

Esta es precisamente la transformación de identidad que menciona el final de tu blog: de ejecutor a revisor, tomador de decisiones, iterador del sistema.

---

## VIII. Viendo la mejora de madurez desde el "grado y alcance" de las tareas

Si miramos todas las tareas juntas, descubriremos que la madurez de Legion no solo aumenta la complejidad del proceso, sino que también se manifiesta en que el tipo de tarea en sí mismo mejora.

### 1. Etapa temprana: tareas de implementación puntual

Representante: `implement-quote-service`

Características:

- Tema único
- Límites relativamente claros
- La documentación sirve principalmente para la comprensión y transferencia
- Legion asume principalmente el seguimiento de tareas

### 2. Etapa media: tareas con controversias de diseño

Representantes: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Características:

- Abarca múltiples módulos
- Involucra mucha carga histórica y mejores prácticas locales
- Comentarios / revisiones densos
- Legion asume principalmente la externalización del conocimiento implícito

### 3. Período de hito: tareas de ingeniería entre proyectos

Representante: Serie `http-proxy-*`

Características:

- Entre paquetes
- Tiene RFC / spec / benchmark / security review
- Tiene despliegue, observación, reversión, reportes
- Legion asume principalmente la línea de producción de ingeniería completa

### 4. Actual: tareas de gobernanza de alto riesgo

Representante: `heavy-rfc`

Características:

- Clasificación de riesgo clara
- Puerta de aprobación clara
- Ciclo cerrado de revisión claro
- Documentación y cadena de evidencia completas
- Legion asume principalmente la gobernanza y el protocolo de entrega

En otras palabras, el "grado y alcance" de las tareas en sí mismos son el espejo de la madurez de Legion.

Al principio solo manejaba "hacer una función"; luego comenzó a manejar "hacer un tipo de ingeniería compleja"; ahora ya está manejando "cómo avanzar trabajos de alto riesgo de manera controlada".

---

## IX. Cómo se corresponde esta trayectoria con la reflexión de esa entrada del blog

Ahora, mirando hacia atrás en *Reflexiones sobre los AI Agent*, descubriremos que muchos de los juicios escritos en el blog ya se han materializado en la historia de Legion.

### 1. "El primer punto dulce de la escala"

Lo que dice el blog es: que múltiples Agents avancen tareas en paralelo, en poco tiempo da una sensación de cosecha mecanizada.

En la historia de Legion, corresponde al rápido crecimiento de tareas a partir de diciembre de 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

Esto indica que el objetivo central inicial era realmente: **primero hacer que el Agent trabaje más**.

### 2. "El cuello de botella soy yo"

El blog dice que, una vez que el trabajo de ejecución se transfiere al Agent, el verdadero cuello de botella humano se convierte en la gestión del contexto, la aceptación y la toma de decisiones.

El trío más antiguo de Legion resuelve precisamente este problema:

- Usar `tasks.md` para reducir la pérdida de contexto
- Usar `context.md` para registrar decisiones y archivos clave
- Usar `plan.md` para evitar que el objetivo de la tarea se desvíe

### 3. "El muro de conocimiento implícito"

El blog dice que lo que el Agent aprende son muestras visibles, pero no sabe cuál es el estándar actual.

La respuesta de Legion fue:

- Escribir las revisiones en el plan
- Escribir las restricciones en el contexto
- Escribir las controversias de diseño como documentos estructurados

Es decir: externalizar el conocimiento implícito.

### 4. "Alineación de intención + verificación por capas"

La línea de producción del blog se implementó casi exactamente en `http-proxy` y `heavy-rfc`:

- Intent: Goal / Non-goals / Scope
- Plan: Phase / RFC / Design Summary
- Execute: Implementación
- Verify: test / review-code / review-security / bench
- Report: walkthrough / pr-body
- Memory: context / archived task / ledger

### 5. "La interfaz de reporte es un problema de ingeniería subestimado"

El blog enfatiza que las conclusiones deberían vincularse a artefactos siempre que sea posible.

La práctica de Legion ya va claramente en esta dirección:

- La conclusión no es una frase, sino que corresponde a report, review, test-report, PR body
- La persona no necesita releer todo el código, sino que puede leer primero el artefacto condensado

Aunque aún no es el Citation Agent que imaginabas, la dirección ya es clara.

### 6. "Los benchmarks se convertirán en una necesidad"

El blog dice que en el futuro será necesario poder comparar diferentes flujos de trabajo o versiones de modelos, no depender de la sensación.

Esto ya tiene una implementación temprana en Legion:

- `spec-bench.md`
- Escenarios y umbrales de benchmark
- Salida y reporte de benchmarks

Es decir, este camino ya no es una idea, sino que comienza a ser ingenieril.

---

## X. El cambio más importante: Legion no solo cambia al Agent, sino también el papel de la persona

Si solo miramos la superficie, parecería que el crecimiento de Legion es:

- Más documentación
- Más revisiones
- Procesos más largos

Pero el cambio realmente crucial no es eso, sino que **se redefine la división del trabajo entre humano y máquina**.

En épocas anteriores, el papel de la persona era aproximadamente:

- Ejecutar personalmente
- Recordar personalmente
- Sostener todo el contexto personalmente

Mientras que a medida que Legion maduraba gradualmente, el papel de la persona se transformó lentamente en:

- Establecer objetivos y restricciones
- Revisar límites de diseño
- Manejar revisiones de nivel de bloqueo
- Aceptar artefactos y riesgos
- Iterar todo el sistema de colaboración

Esta es precisamente la frase con la que concluye el blog:

> Lo que hago ahora no es "usar IA para escribir más código", sino "usar IA para escalarme a mí mismo".

Legion es la implementación de ingeniería de este objetivo.

Convierte "escalarse a uno mismo" de un deseo abstracto en una estructura de colaboración que puede implementarse, auditarse, revisarse y optimizarse continuamente.

---

## XI. Resumen final: cómo creció Legion paso a paso

Comprimiendo nuevamente toda la trayectoria, obtenemos una clara teoría de cinco etapas.

### Primera etapa: Primero, no olvidar

Primero usar `plan/context/tasks` para sacar la tarea, el progreso y la transferencia de la cabeza.

### Segunda etapa: Escribir el conocimiento implícito

A través de `REVIEW`, registros de decisiones y registros de contexto, externalizar el conocimiento local interno del proyecto, reduciendo la probabilidad de que el Agent se equivoque al ajustarse a muestras antiguas.

### Tercera etapa: Primero diseñar, luego ejecutar

A través de RFC, Spec, Review, fijar la puerta de diseño, empujar hacia adelante el retrabajo de alto costo.

### Cuarta etapa: Hacer ingenieril la verificación y el reporte

A través de test, bench, review-code, review-security, walkthrough, PR body, hacer que la verificación y aceptación sean de bajo costo.

### Quinta etapa: Convertir la autonomía en autonomía controlada

A través de propuesta, aprobación, estado de revisión, auditoría del ledger, llevar la colaboración multi-Agent de "puede funcionar" a "gobernable".

Así que la conclusión final no es "Legion hizo que el Agent fuera más fuerte", sino:

> Legion permitió que la capacidad del Agent fuera utilizada de manera estable por primera vez como un sistema de ingeniería.

No es una herramienta de mejora puntual, sino un sistema que creció gradualmente en torno a "molestar menos, producir más, ser verificable, transferible, con menos desgaste".

Esta es también la razón por la cual su trayectoria de crecimiento puede servir casi directamente como nota de ingeniería de esa entrada del blog:

- El blog escribe los principios;
- La historia de Legion muestra cómo estos principios se convierten en instituciones, documentos, procesos y artefactos.

Ambos juntos constituyen la historia completa.

---

## Apéndice: Varias tareas que pueden servir como puntos de observación de hitos

Si quisiera revisar rápidamente la evolución de Legion, priorizaría estas tareas:

1.  `implement-quote-service`
    - Muestra del punto de partida de Legion
    - El trío se formó más temprano

2.  `vex-series-data-ohlcinterestrate-ohlc-v2`
    - La externalización del conocimiento implícito más típica
    - Densidad de revisión/comentario extremadamente alta

3.  `http-proxy-service`
    - La puerta de diseño y la especificación comienzan a tomar forma

4.  `http-proxy-app-implementation`
    - Revisión de adversarios, límites semánticos, aceptación de riesgos, producción de artefactos, todo muy completo

5.  `vendor-tokenbucket-proxy-ip`
    - Cadena completa de revisión de adversarios de múltiples rondas de RFC -> implementación -> verificación -> PR -> corrección de revisión externa

6.  `heavy-rfc`
    - Muestra de mayor madurez actual
    - Clasificación de riesgo, design-only, ciclo cerrado de revisión, productos de entrega, todo muy completo

Si `implement-quote-service` representa "Legion nació", entonces `http-proxy-*` representa "Legion creció", y `heavy-rfc` representa "Legion ya comenzó a trabajar como un sistema maduro".
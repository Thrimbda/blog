---
title: La trayectoria de crecimiento de Legion: del registrador de tareas al sistema operativo de ingeniería multi-Agent
date: 2026-03-08
---

## Prólogo

Este documento intenta responder a una pregunta concreta: ¿cómo pasamos de "empezar con casi nada" a usar gradualmente Legion como el sistema de colaboración de ingeniería multi-Agent relativamente maduro que es hoy?

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

- En `.legion/config.json` ya hay 33 entradas de tareas.
- La distribución de estados es aproximadamente: 9 `archived`, 22 `paused`, 2 `active`.
- En `.legion/ledger.csv` hay acumulados 2339 registros de auditoría.
- Las acciones de alta frecuencia incluyen: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- La política actual de creación de tareas es `agent-with-approval`, lo que significa que el Agent solo puede proponer primero, no puede crear tareas directamente, debe pasar por una aprobación explícita.

Estos hechos combinados demuestran que Legion ya posee varias capacidades estables:

1.  **Persistencia de tareas**: Las tareas, el contexto y el progreso se guardan externamente, no solo viven en la sesión.
2.  **Puerta de diseño**: Las tareas complejas no pueden empezar directamente; primero debe haber una propuesta, un plan, un RFC, antes de pasar a la ejecución.
3.  **Ciclo cerrado de revisión**: Los comentarios no son registros de chat, sino elementos de revisión estructurados con estado.
4.  **Artefactos de cadena de evidencia**: Muchas tareas ya no solo tienen `plan/context/tasks`, sino que también generan `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Auditoría y gobernanza**: El sistema sabe quién tomó qué decisión en qué momento, avanzó qué fase, respondió a qué revisión.

Esto ya es altamente consistente con la línea de producción mencionada en el blog:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Es decir, el Legion de hoy ya no es un "sistema de notas para ayudar a escribir código", sino una "capa de protocolo que restringe cómo trabajan los multi-Agent".

---

## II. Punto de partida del crecimiento: primero, sacar las tareas de la cabeza

El punto de partida de Legion es muy sencillo.

Según el historial de git, la primera entrada masiva de `.legion` en el repositorio fue `implement-quote-service` el 15-12-2025. Este commit introdujo simultáneamente:

- `.legion/config.json`
- `.legion/ledger.csv`
- `.legion/tasks/implement-quote-service/plan.md`
- `.legion/tasks/implement-quote-service/context.md`
- `.legion/tasks/implement-quote-service/tasks.md`

Este punto de partida es clave, porque estableció el trío mínimo de Legion:

### 1. `plan.md`

Responsable de responder "qué hay que hacer".

En `implement-quote-service`, `plan.md` ya no era una simple tarea pendiente, sino que describía de manera relativamente completa:

- Objetivos
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

Esencialmente, sustituía "aquello que acababa de entender en mi cabeza".

### 3. `tasks.md`

Responsable de responder "en qué punto estamos ahora".

Este paso es importante porque, una vez que comienza una sesión multi-Agent o de múltiples turnos, lo primero que se distorsiona no es el código, sino el estado de progreso.

El blog menciona que una persona solo puede mantener establemente dos o tres contextos al día; más allá de eso, la planificación falla. El primer paso de Legion consistía esencialmente en descargar el "estado de la tarea" del cerebro humano.

Así que la Legion de la etapa inicial puede entenderse como:

> Primero, que las tareas no se pierdan; que el contexto pueda recuperarse; que el Agent no sufra amnesia después de terminar.

Esto es completamente consistente con la necesidad del blog de "descargar el contexto de la cabeza".

---

## III. Primera evolución: del registro de tareas hacia la externalización del conocimiento implícito

Si la primera etapa resolvía "no olvidar lo que se está haciendo", la segunda resolvía lo que el blog llamaba ese "muro de conocimiento implícito".

### 1. Las tareas empiezan a complicarse, las revisiones aparecen en masa

Desde mediados/finales de diciembre de 2025, los documentos de plan de Legion comenzaron a contener muchos bloques `> [REVIEW]`.

Las tareas típicas incluyen:

- `yuantsexchange-ohlcinterestrate`
- `vendors-ingest-ohlc-interest-rate`
- `task-vex-queryquotes-swr`
- `task-vex-quote-upstream-refactor`
- `vex-series-data-ohlcinterestrate-ohlc-v2`

Las características comunes de estas tareas son:

- No son simplemente "copiar según una plantilla".
- Implican implementaciones antiguas, historial de evolución, preferencias de estilo, mejores prácticas locales.
- Lo que realmente determina el éxito o el fracaso no es la capacidad sintáctica, sino "saber qué heredar y qué no".

Por ejemplo, en la revisión de `vex-series-data-ohlcinterestrate-ohlc-v2`, se puede ver un proceso típico de "explicitación del conocimiento implícito":

- Aquí no se debe hacer referencia a la implementación existente, porque tiene problemas.
- Al principio se pensó que VEX no necesitaba limitación de tasa compleja, pero luego se reevaluó y se decidió que aún era necesario conservar ciertas estrategias de limitación.
- Las reglas de codificación de `series_id`, la semántica de `merge`, la equidad de colas, etc., no son "conocimiento del mundo" que el modelo pueda inferir naturalmente del código, sino conocimiento local que evolucionó dentro del proyecto.

Esto corresponde exactamente a la estratificación del blog:

- La capa 1 son las instrucciones de la tarea actual;
- La capa 2 son las decisiones técnicas del proyecto y las mejores prácticas locales;
- Lo que más fácilmente hace fracasar al Agent es precisamente la capa 2.

El papel de Legion en esta etapa era precisamente forzar la escritura de la capa 2.

### 2. Los comentarios dejan de ser solo comentarios, se convierten en una interfaz de colaboración

Otro cambio clave en esta etapa: los comentarios dejaron de ser "críticas temporales" y se convirtieron gradualmente en entradas estructuradas con ciclo cerrado.

Por ejemplo:

- Algunas revisiones cambian directamente la dirección del diseño.
- Otras exigen complementar la semántica de fallo.
- Otras piden eliminar el sobre-diseño.
- Otras exigen no hacer referencia a implementaciones erróneas existentes.

Si este contenido solo existiera en el registro del chat, el siguiente Agent casi seguro lo perdería; una vez que se plasma en `plan.md` o `context.md`, pasa de ser "conocimiento oral" a "parte de la verdad de la tarea".

Así que la Legion de la segunda etapa ya no era solo un rastreador de tareas, sino que comenzaba a asumir la función de **cerebro externo**.

Este paso es muy importante porque corresponde a un punto de inflexión central que enfaticé en el blog:

> El cerebro externo no es un lujo, sino una necesidad en proyectos complejos.

---

## IV. Segunda evolución: del cerebro externo hacia la puerta de diseño

A medida que las tareas se volvían más complejas, simplemente "escribir el conocimiento" ya no era suficiente. El nuevo problema se convirtió en:

> ¿Qué pasa si múltiples Agent comienzan a trabajar juntos, pero la dirección en sí es incorrecta?

Entonces Legion entró en su tercera etapa: evolucionar de un "sistema de registro" a un "sistema de puerta de diseño".

### 1. Los RFC y las especificaciones entran en el flujo principal

Un punto de inflexión clave fue `http-proxy-service`.

En esta tarea, Legion ya no era claramente "hacer primero y registrar después", sino "diseñar primero, revisar primero, pasar la puerta primero, luego hacer".

Esta tarea presentaba:

- `docs/rfc.md`
- `docs/spec-dev.md`
- `docs/spec-test.md`
- `docs/spec-bench.md`
- `docs/spec-obs.md`
- Conclusiones de revisión
- Elementos de bloqueo de revisión de seguridad
- Walkthrough y cuerpo de PR

Esto significa que Legion comenzó a dividir una tarea compleja en varios niveles estables:

1.  **RFC**: Alineación de intenciones
2.  **Dev/Test/Bench/Obs Spec**: Aclarar por adelantado "cómo verificar"
3.  **Revisión**: Exponer problemas de dirección antes de comenzar, en la medida de lo posible
4.  **Implementación y verificación**: Anticipar las comprobaciones de bajo costo
5.  **Informes y artefactos de PR**: Servir a la aceptación

Esto es altamente consistente con la "alineación de intenciones + verificación por capas" mencionada en el blog.

### 2. Los problemas de seguridad y recursos comienzan a aparecer como bloqueos previos

En tareas como `http-proxy-service` y `http-proxy-app-implementation`, las revisiones dejaron de ser solo sugerencias y comenzaron a aparecer directamente como `blocking`.

Por ejemplo:

- Riesgo de SSRF
- Riesgo de DoS
- Tamaño del cuerpo de respuesta no limitado
- Parámetros de concurrencia y colas no seguros por defecto
- Límites de configuración de variables de entorno poco claros

Esto indica que Legion comenzó a asumir una nueva responsabilidad:

> No solo registrar "por qué se hace esto", sino también "por qué no se puede hacer ahora, a menos que se cumplan estas condiciones primero".

Esa es la puerta de diseño.

El blog dice que cuando un sistema multi-Agent comienza a fallar, la primera reacción humana suele ser escribir RFC más largos, hacer revisiones más estrictas, empujar el riesgo lo más adelante posible. Legion en este período estaba institucionalizando precisamente esa reacción instintiva.

### 3. Comienza a parecerse a una pequeña línea de producción

En esta etapa, el papel de Legion ya no era "ayudar a recordar", sino "ayudar a restringir el orden de trabajo".

Correspondiente a la línea de producción del blog:

- `Intent`: Objetivos, no objetivos, restricciones del usuario
- `Plan`: Desglose de tareas, hitos, límites
- `Execute`: Implementación
- `Verify`: build / test / benchmark / review
- `Report`: walkthrough / PR body
- `Memory`: context / decision log / archived task

Este paso es clave porque significa:

> Legion ya no solo soporta el contexto, sino que comienza a soportar el proceso.

---

## V. Hito: la serie HTTP Proxy hace que Legion sea verdaderamente ingenieril

Si las etapas anteriores aún tenían un sentido experimental de "crecer mientras se hace", las tareas relacionadas con `http-proxy` son básicamente el primer hito de madurez real de Legion.

Esto coincide con mi descripción en el blog: la tarea `http-proxy` que abarcaba múltiples proyectos fue efectivamente un punto en el que comencé a sentir claramente que "básicamente podía desvincularme de la codificación, dejando solo algunos comentarios de revisión".

Mirando en `.legion`, este juicio tiene evidencia suficiente.

### 1. No es una sola tarea, sino un clúster de tareas

Las tareas relacionadas incluyen al menos:

- `http-proxy-service`
- `http-proxy-app-implementation`
- `vendor-http-services-rollout`
- `http-proxy-metrics`
- `http-services-terminalinfos-ready`
- `vendor-tokenbucket-proxy-ip`

No es una necesidad puntual, sino una serie de tareas de ingeniería interconectadas:

- Primero la biblioteca base
- Luego la capa de aplicación
- Luego el despliegue
- Luego métricas complementarias
- Luego preparación de routing / IP
- Luego lógica de limitación de tasa y carga del lado del proveedor

Es decir, Legion ya había comenzado a soportar un tipo real de **evolución entre tareas, entre paquetes, entre fases**.

### 2. El ciclo de revisión se alarga notablemente, pero al mismo tiempo es más estable

Especialmente `http-proxy-app-implementation`, ilustra muy bien la madurez de Legion:

- Por un lado, hay muchas revisiones y muchos puntos de controversia;
- Por otro lado, estas controversias no se quedaron en el registro del chat, sino que se convirtieron en actualizaciones de RFC, conclusiones de revisión y decisiones de contexto.

En esta tarea se pueden ver debates de ingeniería muy típicos:

- ¿`allowedHosts` afecta el comportamiento de la solicitud o solo las métricas?
- ¿Debe `absolute-form` ser el único formato de ruta soportado?
- ¿Cómo se definen los límites entre `invalid_url`, `blocked`, `error`?
- ¿Cómo controlar el riesgo de alta cardinalidad de `target_host` / `target_path`?

Estos no son problemas que la "capacidad de escribir código" pueda resolver directamente, sino problemas de **límites normativos, límites de verificación, límites semánticos**.

El valor de Legion aquí no es ayudar a escribir código, sino ayudar a estabilizar estos límites.

### 3. Comienza a generar artefactos realmente útiles para la aceptación

Este paso también corresponde exactamente al "problema de ingeniería subestimado de la interfaz de reporte" del blog.

En la serie de tareas http-proxy, Legion ya generaba de forma estable:

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- pr-body
- spec-test / spec-bench / spec-obs

Esto indica que Legion ya no se conformaba con "hacer las cosas", sino que comenzaba a apoyar "explicar las cosas claramente, adjuntar la evidencia, señalar los riesgos".

En otras palabras:

> En este momento, Legion comenzó a servir realmente a la "aceptación de bajo costo", no solo a la "ejecución de alta eficiencia".

Este también es un juicio particularmente importante en el blog: lo más costoso no son los tokens, sino el retrabajo y la fuga de atención.

Mientras la interfaz de reporte no sea ingenieril, la gente aún tendrá que gastar mucha energía adivinando qué hizo realmente el Agent. Legion en este período claramente ya estaba abordando activamente este problema.

---

## VI. Período de madurez: de la línea de producción de ingeniería al sistema de gobernanza

Continuando hacia adelante, la madurez de Legion no solo se manifiesta en "más y más documentación", sino en que la **estructura de gobernanza** comienza a fijarse.

### 1. La creación de tareas comienza a estar restringida por políticas de aprobación

Actualmente, `taskCreationPolicy` en `.legion/config.json` ya es `agent-with-approval`.

Este paso es muy simbólico.

Significa que Legion comienza a reconocer un hecho:

> No todas las tareas complejas deben ser decididas por el Agent mismo sobre cuándo crearlas, cuándo avanzar.

Detrás de esto está precisamente el problema más profundo planteado en el blog:

- Cuando los modelos son cada vez más potentes, ¿debería el proceso delegar más autoridad?
- Si se delega, ¿dónde están los límites?
- ¿Qué debe pasar primero por aprobación humana, qué puede avanzar automáticamente?

La respuesta de Legion no es la autonomía total, sino la **autonomía controlada**.

Es decir:

- El Agent puede explorar, organizar, proponer;
- Pero el trabajo complejo, antes de entrar en ejecución formal, aún requiere aprobación humana.

Esto ya se parece mucho al mecanismo de trabajo en una organización real.

### 2. Las revisiones ya no son solo sugerencias, sino protocolos de colaboración con estado

Según las estadísticas del ledger, `legion_list_reviews` y `legion_respond_review` ya han acumulado muchos registros.

Esto indica que la revisión en Legion no es una capacidad auxiliar, sino una de las capacidades principales.

Más importante aún, no es "leer un comentario", sino:

- Listar elementos no resueltos
- Responder a una revisión específica
- Marcar como resolved / wontfix / need-info
- Confirmar el cierre del ciclo de revisión

Esto es muy diferente de una anotación en markdown común. Convierte el "comentario" de texto en una máquina de estados rastreable.

El significado de este paso es:

> La comunicación entre personas y Agent ya no son solo mensajes de sesión, sino acciones de protocolo sedimentables, rastreables y auditables.

### 3. Comienza a soportar la "aceptación de riesgos", no solo la "corrección de problemas"

Otra señal de un sistema maduro no es que "todos los riesgos estén resueltos", sino que "el sistema puede distinguir qué riesgos resolver ahora y cuáles aceptar ahora".

En tareas como `http-proxy-app-implementation`, `vendor-tokenbucket-proxy-ip`, ya se puede ver:

- Algunos problemas de seguridad, tras revisión, se marcan como `wontfix`
- Algunos riesgos se registran explícitamente como aceptados por el usuario
- Algunos comportamientos se conservan como riesgo residual, no se olvidan vagamente

Esto indica que Legion ya no es solo una "herramienta para corregir bugs", sino que comienza a soportar la realidad de las decisiones de ingeniería:

- Algunos problemas deben repararse de inmediato
- Algunos problemas primero se registran, luego se gestionan
- Algunos problemas los cubren las suposiciones del entorno actual

Eso es gobernanza.

---

## VII. Ejemplo de mayor madurez actual: `heavy-rfc`

Si tuviera que elegir entre las tareas existentes un representante que mejor refleje la madurez actual de Legion, elegiría `heavy-rfc`.

Esta tarea puede verse casi como una muestra completa del paradigma del flujo de trabajo actual de Legion.

### 1. Desde el principio tiene clasificación de riesgo y declaración de fase

No escribe simplemente "implementar live trading", sino que desde el principio declara explícitamente:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Es decir, esta tarea no es "implementar primero y luego complementar con documentación", sino que primero reconoce que es una tarea de alto riesgo, por lo que debe seguir primero el proceso heavy RFC.

### 2. Ya tiene una cadena completa de artefactos

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

Esta cadena de artefactos en sí misma demuestra que Legion ya ha dividido una tarea de ingeniería de alto riesgo en múltiples capas revisables, verificables y transferibles.

### 3. Refleja la forma de trabajo del blog: "primero converger la intención, luego liberar la ejecución"

El blog tiene un juicio muy central:

> La autonomía no es solo ser inteligente, sino molestar menos, producir más, ser verificable.

`heavy-rfc` refleja precisamente esto:

- Primero fijar la dirección a través de documentos de diseño y revisiones
- Luego reducir el riesgo de implementación a través de pruebas y revisiones
- Finalmente, reducir el costo de aceptación a través de reportes / PR body

Esto significa que Legion, hasta ahora, ya puede soportar una nueva postura de trabajo:

> La persona se enfoca principalmente en establecer objetivos, restringir límites, revisiones clave; el Agent se encarga de avanzar en la implementación, verificación y reporte dentro de un carril institucionalizado.

Esta es precisamente la transformación de roles que resumí al final del blog: de ejecutor a revisor, decisor, iterador del sistema.

---

## VIII. Viendo la mejora de madurez desde el "grado y alcance" de las tareas

Si miramos todas las tareas juntas, veremos que la madurez de Legion no solo aumenta la complejidad del proceso, sino que también se manifiesta en que el tipo de tarea en sí mismo mejora.

### 1. Etapa temprana: tareas de implementación puntual

Representante: `implement-quote-service`

Características:

- Tema único
- Límites relativamente claros
- La documentación sirve principalmente para comprensión y transferencia
- Legion asume principalmente el seguimiento de tareas

### 2. Etapa media: tareas con controversias de diseño

Representantes: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Características:

- Abarcan múltiples módulos
- Implican mucha carga histórica y mejores prácticas locales
- Comentarios / revisiones densos
- Legion asume principalmente la externalización del conocimiento implícito

### 3. Período de hito: tareas de ingeniería entre proyectos

Representante: Serie `http-proxy-*`

Características:

- Entre paquetes
- Tienen RFC / spec / benchmark / security review
- Tienen despliegue, observación, reversión, reportes
- Legion asume principalmente la línea de producción de ingeniería completa

### 4. Actual: tareas de gobernanza de alto riesgo

Representante: `heavy-rfc`

Características:

- Clasificación de riesgo clara
- Puertas de aprobación claras
- Ciclo cerrado de revisión claro
- Documentación y cadena de evidencia completas
- Legion asume principalmente gobernanza y protocolo de entrega

En otras palabras, el "grado y alcance" de la tarea en sí es un espejo de la madurez de Legion.

Al principio solo manejaba "hacer una función"; luego comenzó a manejar "hacer un tipo de ingeniería compleja"; ahora ya está manejando "cómo avanzar trabajos de alto riesgo de manera controlada".

---

## IX. Cómo se corresponde esta trayectoria con la reflexión de ese blog

Ahora, mirando hacia atrás en *Reflexiones sobre los AI Agent*, descubrimos que muchos de los juicios escritos en el blog ya se han materializado en la historia de Legion.

### 1. "El primer punto dulce de la escala"

Lo que dice el blog: que múltiples Agent avancen tareas en paralelo, en poco tiempo, da una sensación de cosecha mecanizada.

En la historia de Legion, corresponde al rápido crecimiento de tareas a partir de diciembre de 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

Esto indica que el objetivo central inicial era efectivamente: **primero que el Agent haga más trabajo**.

### 2. "El cuello de botella soy yo"

El blog dice que, una vez que el trabajo de ejecución se transfiere al Agent, el verdadero cuello de botella humano se convierte en la gestión del contexto, la aceptación y la toma de decisiones.

El trío inicial de Legion resuelve precisamente este problema:

- Usar `tasks.md` para reducir la pérdida de contexto
- Usar `context.md` para registrar decisiones y archivos clave
- Usar `plan.md` para que el objetivo de la tarea no se desvíe

### 3. "El muro de conocimiento implícito"

El blog dice que lo que el Agent aprende suelen ser muestras visibles, y no sabe cuál es el estándar actual.

La respuesta de Legion es:

- Escribir las revisiones en el plan
- Escribir las restricciones en el contexto
- Convertir las controversias de diseño en documentos estructurados

Es decir: externalizar el conocimiento implícito.

### 4. "Alineación de intenciones + verificación por capas"

La línea de producción del blog se ha implementado casi tal cual en `http-proxy` y `heavy-rfc`:

- Intent: Goal / Non-goals / Scope
- Plan: Phase / RFC / Design Summary
- Execute: Implementación
- Verify: test / review-code / review-security / bench
- Report: walkthrough / pr-body
- Memory: context / archived task / ledger

### 5. "La interfaz de reporte es un problema de ingeniería subestimado"

El blog enfatiza que las conclusiones deberían vincularse a artefactos siempre que sea posible.

La práctica de Legion ya va claramente en esta dirección:

- Las conclusiones no son una frase, sino que corresponden a reportes, revisiones, test-reports, PR body
- La persona no necesita releer todo el código, puede leer primero los artefactos condensados

Aunque aún no es el Citation Agent que imaginaba, la dirección ya es clara.

### 6. "El benchmark se convertirá en una necesidad"

El blog dice que en el futuro será necesario poder comparar diferentes flujos de trabajo o versiones de modelos, no depender de la sensación.

En Legion ya hay una implementación temprana:

- `spec-bench.md`
- Escenarios y umbrales de benchmark
- Salida y reporte de benchmarks

Es decir, este camino ya no es una idea, sino que comienza a ser ingenieril.

---

## X. El cambio más importante: Legion no solo cambia al Agent, también cambia el rol de la persona

Si solo miramos la superficie, parecería que el crecimiento de Legion es:

- Más documentación
- Más revisiones
- Procesos más largos

Pero el cambio verdaderamente clave no es eso, sino que **la división del trabajo entre persona y máquina se redefine**.

En épocas anteriores, el rol de la persona era aproximadamente:

- Ejecutar personalmente
- Recordar personalmente
- Cubrir personalmente todo el contexto

Mientras que a medida que Legion maduraba gradualmente, el rol de la persona se convertía lentamente en:

- Establecer objetivos y restricciones
- Revisar límites de diseño
- Manejar revisiones de nivel de bloqueo
- Aceptar artefactos y riesgos
- Iterar todo el sistema de colaboración

Esta es precisamente la frase con la que concluye el blog:

> Lo que hago ahora no es "usar AI para escribir más código", sino "usar AI para escalarme a mí mismo".

Legion es la implementación de ingeniería de este objetivo.

Convierte el "escalarse a uno mismo" de un deseo abstracto en una estructura de colaboración que puede implementarse, auditarse, revisarse y optimizarse continuamente.

---

## XI. Mirando desde el presente el siguiente paso: la dirección de evolución más reciente representada por `~/Work/legion-mind`

Si solo miramos el historial de `.legion/` en el repositorio de Yuan, podemos ver cómo Legion fue forzado a surgir poco a poco en un proyecto real; pero si miramos ahora `~/Work/legion-mind`, descubrimos que Legion ya ha comenzado a evolucionar hacia la siguiente etapa.

Este paso es muy importante porque indica que el objetivo de Legion ya no es solo "ser útil en un repositorio", sino que comienza a intentar refinar esta experiencia en un **Autopilot Kit** genérico, **instalable, migrable, benchmarkeable, reutilizable**.

De `~/Work/legion-mind/README.md` y `docs/legionmind-usage.md` se puede ver que la dirección más reciente tiene al menos cinco características.

### 1. Del "flujo de trabajo dentro del repositorio" a la "plantilla de orquestación genérica"

En Yuan, Legion surgió inicialmente siguiendo tareas concretas; en `legion-mind`, ya se ha abstraído explícitamente en un conjunto de plantillas genéricas de orquestación de Agent:

- primary agent: `legion`
- subagents: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
- skill: `skills/legionmind`

Esto indica que la versión más reciente de Legion ya no entiende la "colaboración multi-Agent" como juntar temporalmente algunos agentes para trabajar, sino que comienza a modelarla como:

- El orchestrator se encarga de avanzar el proceso
- Los subagent se encargan de una única responsabilidad
- `.legion/` se encarga de la persistencia del estado y la auditoría

Es decir, Legion está pasando de ser un "workflow basado en experiencia" a un "sistema de orquestación con roles claros".

### 2. De la invocación manual a la entrada por comandos

Uno de los cambios más evidentes en `legion-mind` es la conversión en comandos de los flujos de trabajo comunes:

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

Esto parece solo una optimización de la experiencia de uso, pero en esencia no lo es.

Significa que Legion está llevando los acuerdos sobre "qué fases, en qué orden ejecutar, cuándo solo diseñar, cuándo continuar la implementación, cuándo sedimentar experiencia" un paso más allá, de un SOP implícito a comandos explícitos.

En otras palabras, la Legion temprana restringía principalmente el proceso a nivel de documentación; mientras que la dirección actual es llevar el proceso mismo un paso más adelante, solidificándolo en una interfaz de operación que se puede activar directamente.

### 3. De la memoria de tareas al Playbook entre tareas

La Legion en el repositorio de Yuan ya podía persistir el contexto de una tarea individual; pero en `legion-mind` se da un paso más: comienza a introducir `.legion/playbook.md` y `/evolve`.

Esto es clave porque resuelve un problema de otro nivel:

- `plan/context/tasks` resuelven "cómo continuar esta tarea";
- `playbook` resuelve "cómo evitar tropezar con la misma piedra en este tipo de tareas en el futuro".

Ahora `playbook` ya comienza a registrar patrones como:

- La salida de benchmark debe permanecer dentro del repositorio
- El benchmark debe fijar primero un perfil determinista
- La falta de summary debe contarse como error en el denominador, no reducir silenciosamente el denominador

Esto indica que el modelo de memoria más reciente de Legion ya no es solo memoria de tarea, sino que comienza a intentar ser **memoria organizacional**.

Es decir:

> No solo recordar "hasta dónde se llegó la última vez", sino también recordar "cómo hacer este tipo de tareas de manera más estable en el futuro".

### 4. De "usable" a "instalable, publicable, migrable"

En `legion-mind` hay otra dirección particularmente notable: ya comienza a ofrecer estrategias de instalación, verificación, reversión y cobertura segura.

Por ejemplo, el README ya tiene:

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- managed files / backup index

Esto significa que Legion está evolucionando de "mi propio método de trabajo" a "un activo productizado que otros también pueden instalar y usar".

Este paso tiene un gran significado.

Porque una vez que se entra en la capa de instalación/publicación, el objetivo de diseño de Legion ya no es solo servirme a mí, sino también considerar:

- Cómo sincronizar activos de forma segura
- Cómo evitar sobrescribir las modificaciones propias del usuario
- Cómo verificar el estado de la instalación
- Cómo revertir en caso de fallo

Esto indica que la dirección más reciente de Legion ya no es solo el sistema de colaboración en sí, sino la **capacidad de distribución y replicación del sistema de colaboración**.

### 5. De la síntesis de experiencia a la iteración del sistema impulsada por benchmarks

En el blog escribí que una de las cosas más importantes en el futuro será poder comparar científicamente diferentes versiones de workflows, no decir por sensación "esta versión es más inteligente".

`legion-mind` básicamente ya ha formalizado este proyecto.

El repositorio ya tiene:

- `docs/benchmark.md`
- Comando de línea base de benchmark
- Directorio benchmark-runs
- Proceso explícito de preflight / smoke / full / score / report

Esto significa que la siguiente etapa de Legion ya no es simplemente seguir acumulando procesos, sino comenzar a responder preguntas más duras:

- ¿Qué flujo es realmente más estable?
- ¿Qué puerta de diseño es más rentable?
- ¿Qué orquestación de agentes funciona mejor en pass@k y pass^k?
- ¿Qué eslabones solo agre
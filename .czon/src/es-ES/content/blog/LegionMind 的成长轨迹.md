---
title: La trayectoria de crecimiento de Legion: de registrador de tareas a sistema operativo de ingeniería multiagente
date: 2026-03-08
---

# La trayectoria de crecimiento de Legion: de registrador de tareas a sistema operativo de ingeniería multiagente

## Prólogo

Este documento intenta responder a una pregunta concreta: ¿cómo pasamos de "casi no tener nada al principio" a usar gradualmente Legion como el sistema de colaboración de ingeniería multiagente relativamente maduro que es hoy?

El material aquí proviene principalmente de tres partes:

- El historial de git de `.legion/`
- El estado y los registros de auditoría de `.legion/config.json` y `.legion/ledger.csv`
- El marco de pensamiento ya explicitado en la entrada del blog "[Reflexiones sobre los Agentes de IA](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)"

Si tuviera que resumir esta trayectoria en una sola frase, sería aproximadamente:

> Al principio solo queríamos que el Agente nos ayudara a hacer más cosas; luego descubrimos que lo que realmente necesitábamos construir no era "una mayor capacidad para escribir código", sino todo un sistema de ingeniería que permitiera "al Agente molestar menos, producir más, ser verificable y ser transferible". Legion es lo que, en este proceso, creció paso a paso desde un registrador de tareas hasta convertirse en un sistema operativo de ingeniería multiagente.

---

## 一. Primero, el presente: qué es Legion ya

No empecemos desde el principio, veamos primero la forma actual.
Desde el estado actual del repositorio, Legion ya no es documentación dispersa, sino un sistema de flujo de trabajo en ejecución continua:

- `.legion/config.json` ya tiene 33 entradas de tareas.
- La distribución de estados es aproximadamente: 9 `archived`, 22 `paused`, 2 `active`.
- `.legion/ledger.csv` tiene acumulados 2339 registros de auditoría.
- Las acciones de alta frecuencia incluyen: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
- La política actual de creación de tareas es `agent-with-approval`, lo que significa que el Agente solo puede proponer primero, no puede crear tareas directamente, debe pasar por una aprobación explícita.

Estos hechos combinados indican que Legion ya posee varias capacidades estables:

1.  **Persistencia de tareas**: Las tareas, el contexto y el progreso se guardan externamente, no solo viven en la sesión.
2.  **Puertas de control de diseño**: Las tareas complejas no pueden comenzar directamente; primero debe haber una propuesta, un plan, un RFC, antes de pasar a la ejecución.
3.  **Ciclo cerrado de revisión**: Los comentarios no son registros de chat, sino elementos de revisión estructurados con estado.
4.  **Productos de cadena de evidencia**: Muchas tareas ya no solo tienen `plan/context/tasks`, sino que también generan `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Auditoría y gobernanza**: El sistema sabe quién tomó qué decisión en qué momento, avanzó qué fase, respondió a qué revisión.

Esto ya es altamente consistente con la línea de producción mencionada en el blog:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

Es decir, el Legion de hoy ya no es un "sistema de notas para ayudar a escribir código", sino una "capa de protocolo que restringe cómo trabajan múltiples Agentes".

---

## 二. Punto de partida del crecimiento: primero, sacar las tareas de la cabeza

El punto de partida de Legion fue muy simple.

Según el historial de git, `.legion` entró por primera vez de manera masiva en el repositorio el 2025-12-15 con `implement-quote-service`. Este commit introdujo simultáneamente:

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

Esencialmente, reemplazaba "aquello que acababa de entender en mi cabeza".

### 3. `tasks.md`

Responsable de responder "en qué punto estamos ahora".

Este paso es importante porque, una vez que comienza el trabajo multiagente o de múltiples turnos, lo primero que se distorsiona no es el código, sino el estado de progreso.

El blog menciona que una persona solo puede mantener de manera estable dos o tres contextos al día; más allá de eso, la planificación falla. El primer paso de Legion era esencialmente descargar el "estado de la tarea" del cerebro humano.

Así que la Legion de la etapa inicial puede entenderse como:

> Primero, que las tareas no se pierdan; primero, que el contexto pueda recuperarse; primero, que el Agente no sufra amnesia después de terminar.

Esto es completamente consistente con la necesidad del blog de "descargar el contexto de la cabeza".

---

## 三. Primera evolución: del registro de tareas hacia la externalización del conocimiento implícito

Si la primera etapa resolvía "no olvidar lo que se está haciendo", la segunda etapa resolvía el "muro de conocimiento implícito" mencionado en el blog.

### 1. Las tareas comenzaron a complicarse, las revisiones comenzaron a aparecer en masa

Desde mediados/finales de diciembre de 2025, los documentos de plan en Legion comenzaron a contener muchos bloques `> [REVIEW]`.

Las tareas típicas incluyen:

- `yuantsexchange-ohlcinterestrate`
- `vendors-ingest-ohlc-interest-rate`
- `task-vex-queryquotes-swr`
- `task-vex-quote-upstream-refactor`
- `vex-series-data-ohlcinterestrate-ohlc-v2`

Las características comunes de estas tareas son:

- No eran simplemente "copiar según una plantilla".
- Involucraban implementaciones antiguas, historial de evolución, preferencias de estilo, mejores prácticas locales.
- Lo que realmente determinaba el éxito o el fracaso no era la capacidad sintáctica, sino "saber qué heredar y qué no".

Por ejemplo, en la revisión de `vex-series-data-ohlcinterestrate-ohlc-v2`, se puede ver un proceso típico de "explicitación del conocimiento implícito":

- Este lugar no debe referenciar la implementación actual, porque la implementación actual tiene problemas.
- Al principio se pensó que VEX no necesitaba una limitación de tasa compleja, pero luego se reevaluó y se consideró que aún era necesario conservar ciertas estrategias de limitación.
- Reglas de codificación de `series_id`, semántica de `merge`, equidad de colas, etc., no son "conocimiento del mundo" que el modelo pueda inferir naturalmente del código, sino conocimiento local evolucionado dentro del proyecto.

Esto corresponde exactamente a la estratificación del blog:

- La capa 1 son las instrucciones de la tarea actual;
- La capa 2 son las decisiones técnicas del proyecto y las mejores prácticas locales;
- Lo que realmente hace que el Agente fracase con mayor facilidad es la capa 2.

El papel de Legion en esta etapa era precisamente forzar la escritura de la capa 2.

### 2. Los comentarios dejaron de ser solo comentarios, sino una interfaz de colaboración

Otro cambio clave en esta etapa: los comentarios dejaron de ser "críticas temporales" y gradualmente se convirtieron en entradas estructuradas con ciclo cerrado.

Por ejemplo:

- Algunas revisiones cambiaban directamente la dirección del diseño.
- Otras pedían completar la semántica de fallo.
- Otras pedían eliminar el sobre-diseño.
- Otras pedían no referenciar implementaciones erróneas existentes.

Si este contenido solo existiera en los registros de chat, el siguiente Agente casi seguro lo perdería; una vez que se plasma en `plan.md` o `context.md`, pasa de ser "conocimiento oral" a "parte de la verdad de la tarea".

Así que la Legion de la segunda etapa ya no era solo un rastreador de tareas, sino que comenzó a asumir la función de **cerebro externo**.

Este paso es muy importante porque corresponde a un punto de inflexión central que enfaticé en el blog:

> Un cerebro externo no es un lujo, sino una necesidad en proyectos complejos.

---

## 四. Segunda evolución: del cerebro externo hacia las puertas de control de diseño

A medida que las tareas se volvían más complejas, simplemente "escribir el conocimiento" ya no era suficiente. El nuevo problema se convirtió en:

> ¿Qué pasa si múltiples Agentes comienzan a trabajar juntos, pero la dirección en sí es incorrecta?

En este punto, Legion comenzó a entrar en su tercera etapa: evolucionar de un "sistema de registro" a un "sistema de puertas de control de diseño".

### 1. Los RFC y las especificaciones comenzaron a entrar en el flujo principal

Un punto de inflexión clave fue `http-proxy-service`.

En esta tarea, Legion claramente ya no era "hacer primero y registrar después", sino "diseñar primero, revisar primero, pasar la puerta primero, y luego hacer".

Esta tarea presentaba:

- `docs/rfc.md`
- `docs/spec-dev.md`
- `docs/spec-test.md`
- `docs/spec-bench.md`
- `docs/spec-obs.md`
- Conclusiones de revisión
- Elementos de bloqueo de revisión de seguridad
- Walkthrough y cuerpo de PR

Esto significaba que Legion comenzaba a dividir una tarea compleja en varios niveles estables:

1.  **RFC**: Alineación de intención
2.  **Especificaciones Dev/Test/Bench/Obs**: Aclarar por adelantado "cómo verificar"
3.  **Revisión**: Exponer problemas de dirección tanto como sea posible antes de comenzar
4.  **Implementación y verificación**: Anticipar las comprobaciones de bajo costo
5.  **Informes y productos de PR**: Servir para la aceptación

Esto es altamente consistente con la "alineación de intención + verificación por capas" mencionada en el blog.

### 2. Los problemas de seguridad y recursos comenzaron a aparecer como bloqueos previos

En tareas como `http-proxy-service` y `http-proxy-app-implementation`, las revisiones dejaron de ser solo sugerencias y comenzaron a aparecer directamente como `blocking`.

Por ejemplo:

- Riesgo de SSRF
- Riesgo de DoS
- Tamaño del cuerpo de respuesta no limitado
- Parámetros de concurrencia y cola no seguros por defecto
- Límites de configuración de variables de entorno poco claros

Esto indica que Legion comenzó a asumir una nueva responsabilidad:

> No solo registrar "por qué se hace esto", sino también registrar "por qué no se puede hacer ahora, a menos que se cumplan estas condiciones primero".

Esto es una puerta de control de diseño.

El blog dice que cuando un sistema multiagente comienza a fallar, la primera reacción humana suele ser escribir RFC más largos, hacer revisiones más estrictas, y empujar el riesgo lo más adelante posible. Legion en este período estaba institucionalizando precisamente esta reacción instintiva.

### 3. Comenzó a parecerse a una pequeña línea de producción

En esta etapa, el papel de Legion ya no era "ayudar a recordar", sino "ayudar a restringir el orden de trabajo".

Correspondiente a la línea de producción del blog:

- `Intent`: Objetivos, no objetivos, restricciones del usuario
- `Plan`: Desglose de tareas, hitos, límites
- `Execute`: Implementación
- `Verify`: build / test / benchmark / review
- `Report`: walkthrough / cuerpo de PR
- `Memory`: contexto / registro de decisiones / tarea archivada

Este paso es clave porque significa:

> Legion ya no solo soporta el contexto, sino que comienza a soportar el proceso.

---

## 五. Hito: la serie HTTP Proxy hizo que Legion se volviera realmente ingenieril

Si las etapas anteriores aún tenían una sensación experimental de "crecer mientras se hace", las tareas relacionadas con `http-proxy` fueron básicamente el primer hito de madurez real de Legion.

Esto coincide con mi descripción en el blog: la tarea `http-proxy` que abarcaba múltiples proyectos fue efectivamente un punto en el que comencé a sentir claramente que "básicamente podía desvincularme de la codificación, dejando solo algunos comentarios de revisión".

Mirando en `.legion`, este juicio tiene evidencia suficiente.

### 1. No era una sola tarea, sino un clúster de tareas

Las tareas relacionadas incluyen al menos:

- `http-proxy-service`
- `http-proxy-app-implementation`
- `vendor-http-services-rollout`
- `http-proxy-metrics`
- `http-services-terminalinfos-ready`
- `vendor-tokenbucket-proxy-ip`

No era una necesidad puntual, sino una serie de tareas de ingeniería interconectadas:

- Primero la biblioteca base
- Luego la capa de aplicación
- Luego el despliegue
- Luego métricas adicionales
- Luego preparación de routing / IP
- Luego lógica de limitación de tasa y carga del lado del proveedor

Es decir, Legion ya comenzaba a soportar un tipo de **evolución real entre tareas, entre paquetes y entre fases**.

### 2. El ciclo de revisión se alargó notablemente, pero también se volvió más estable

Especialmente `http-proxy-app-implementation`, ilustra muy bien la madurez de Legion:

- Por un lado, el número de revisiones era alto y los puntos de controversia también;
- Por otro lado, estas controversias no se quedaron en los registros de chat, sino que se convirtieron en actualizaciones de RFC, conclusiones de revisión y decisiones de contexto.

En esta tarea se pueden ver debates de ingeniería muy típicos:

- ¿`allowedHosts` afecta el comportamiento de la solicitud o solo las métricas?
- ¿Debe `absolute-form` ser el único formato de ruta soportado?
- ¿Cómo se definen los límites entre `invalid_url`, `blocked`, `error`?
- ¿Cómo controlar el riesgo de alta cardinalidad de `target_host` / `target_path`?

Estos no son problemas que la "capacidad de escribir código" pueda resolver directamente, sino problemas de **límites de especificación, límites de verificación, límites semánticos**.

El valor de Legion aquí no era ayudar a escribir código, sino ayudar a estabilizar estos límites.

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

Esto indica que Legion ya no se conformaba con "hacer las cosas", sino que comenzaba a apoyar "explicar las cosas claramente, adjuntar la evidencia, señalar los riesgos".

En otras palabras:

> En este punto, Legion comenzó a servir realmente a la "aceptación de bajo costo", no solo a la "ejecución de alta eficiencia".

Este también es un juicio muy importante en el blog: lo más costoso no son los tokens, sino el retrabajo y la fuga de atención.

Mientras la interfaz de reporte no sea ingenieril, la gente aún tendrá que gastar mucha energía adivinando qué hizo realmente el Agente. Legion en este período claramente ya estaba abordando activamente este problema.

---

## 六. Período de madurez: de línea de producción de ingeniería a sistema de gobernanza

Continuando hacia adelante, la madurez de Legion no solo se refleja en "más documentación", sino en que la **estructura de gobernanza** comienza a fijarse.

### 1. La creación de tareas comenzó a estar restringida por políticas de aprobación

Actualmente, `taskCreationPolicy` en `.legion/config.json` ya es `agent-with-approval`.

Este paso es muy simbólico.

Significa que Legion comienza a reconocer un hecho:

> No todas las tareas complejas deben ser decididas por el Agente mismo sobre cuándo crearlas o avanzarlas.

Detrás de esto está el problema más profundo planteado en el blog:

- A medida que los modelos se vuelven más potentes, ¿debería el proceso delegar más autoridad?
- Si se delega, ¿dónde están los límites?
- ¿Qué debe pasar primero por aprobación humana y qué puede avanzar automáticamente?

La respuesta de Legion no es la autonomía total, sino la **autonomía controlada**.

Es decir:

- El Agente puede explorar, organizar, proponer;
- Pero antes de que el trabajo complejo entre en ejecución formal, aún requiere aprobación humana.

Esto ya se parece mucho al mecanismo de trabajo en una organización real.

### 2. Las revisiones dejaron de ser solo sugerencias, sino un protocolo de colaboración con estado

Según las estadísticas del ledger, `legion_list_reviews` y `legion_respond_review` ya han acumulado muchos registros.

Esto indica que la revisión en Legion no es una capacidad secundaria, sino una de las capacidades principales.

Más importante aún, no es "leer un comentario", sino:

- Listar elementos no resueltos
- Responder a una revisión específica
- Marcar como resolved / wontfix / need-info
- Confirmar nuevamente el cierre del ciclo de revisión

Esto es muy diferente de una anotación en markdown común. Convierte el "comentario" de texto en una máquina de estados rastreable.

El significado de este paso es:

> La comunicación entre humanos y Agentes ya no son solo mensajes de sesión, sino acciones de protocolo que pueden sedimentarse, rastrearse y auditarse.

### 3. Comenzó a soportar la "aceptación de riesgos", no solo la "corrección de problemas"

Otra señal de un sistema maduro no es que "todos los riesgos estén resueltos", sino que "el sistema puede distinguir qué riesgos resolver ahora y qué riesgos aceptar ahora".

En tareas como `http-proxy-app-implementation`, `vendor-tokenbucket-proxy-ip`, ya se puede ver:

- Algunos problemas de seguridad fueron marcados como `wontfix` después de la revisión.
- Algunos riesgos fueron explícitamente registrados como aceptados por el usuario.
- Algunos comportamientos se conservaron como riesgo residual, en lugar de ser olvidados vagamente.

Esto indica que Legion ya no es solo una "herramienta para corregir bugs", sino que comienza a soportar la realidad de las decisiones de ingeniería:

- Algunos problemas deben corregirse de inmediato.
- Algunos problemas primero se registran, luego se gestionan.
- Algunos problemas los cubren las suposiciones del entorno actual.

Esto es gobernanza.

---

## 七. Ejemplo de mayor madurez actual: `heavy-rfc`

Si tuviera que elegir una tarea existente que mejor represente la madurez actual de Legion, elegiría `heavy-rfc`.

Esta tarea puede verse casi como una muestra completa del paradigma del flujo de trabajo actual de Legion.

### 1. Desde el principio tenía clasificación de riesgo y declaración de fase

No simplemente escribía "implementar live trading", sino que desde el principio aclaraba:

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

Es decir, esta tarea no era implementar primero y luego completar la documentación, sino reconocer primero que era una tarea de alto riesgo, por lo que debía pasar primero por el proceso de RFC pesado.

### 2. Ya tenía una cadena completa de productos

`heavy-rfc` ya contenía:

- `task-brief.md`
- `research.md`
- `rfc.md`
- `review-rfc.md`
- `test-report.md`
- `review-code.md`
- `review-security.md`
- `report-walkthrough.md`
- `pr-body.md`

Esta cadena de productos en sí misma indica que Legion ya ha dividido una tarea de ingeniería de alto riesgo en múltiples capas revisables, verificables y transferibles.

### 3. Refleja la forma de trabajo del blog: "primero converger la intención, luego liberar la ejecución"

El blog tiene un juicio muy central:

> La autonomía no es solo ser inteligente, sino molestar menos, producir más, ser verificable.

`heavy-rfc` refleja precisamente esto:

- Primero fijar la dirección a través de documentos de diseño y revisiones.
- Luego reducir el riesgo de implementación a través de pruebas y revisiones.
- Finalmente, reducir el costo de aceptación a través de reportes / cuerpo de PR.

Esto significa que Legion, hasta ahora, ya puede soportar una nueva postura de trabajo:

> La persona se enfoca principalmente en establecer objetivos, restringir límites, revisiones clave; el Agente se encarga de avanzar en la implementación, verificación y reporte dentro de vías institucionalizadas.

Esta es precisamente la transformación de roles que resumí al final del blog: de ejecutor a revisor, tomador de decisiones, iterador del sistema.

---

## 八. Viendo la mejora de madurez desde el "grado y alcance" de las tareas

Si miramos todas las tareas juntas, veremos que la madurez de Legion no solo aumenta la complejidad del proceso, sino que se refleja en que el tipo de tarea en sí se está elevando.

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

- Abarca múltiples módulos
- Involucra mucha carga histórica y mejores prácticas locales
- Comentarios / revisiones densos
- Legion asume principalmente la externalización del conocimiento implícito

### 3. Período de hito: tareas de ingeniería entre proyectos

Representante: Serie `http-proxy-*`

Características:

- Entre paquetes
- Tiene RFC / especificaciones / benchmarks / revisiones de seguridad
- Tiene despliegue, observación, reversión, reportes
- Legion asume principalmente la línea de producción de ingeniería completa

### 4. Actual: tareas de gobernanza de alto riesgo

Representante: `heavy-rfc`

Características:

- Clasificación de riesgo clara
- Puertas de control de aprobación claras
- Ciclo cerrado de revisión claro
- Documentación y cadena de evidencia completas
- Legion asume principalmente gobernanza y protocolo de entrega

En otras palabras, el "grado y alcance" de las tareas en sí mismos son un espejo de la madurez de Legion.

Al principio solo manejaba "hacer una función"; luego comenzó a manejar "hacer un tipo de ingeniería compleja"; ahora ya está manejando "cómo avanzar trabajos de alto riesgo de manera controlada".

---

## 九. Cómo se corresponde esta trayectoria con la reflexión en el blog

Ahora, mirando hacia atrás en "[Reflexiones sobre los Agentes de IA](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)", descubrimos que muchos de los juicios escritos en el blog ya se han implementado en la historia de Legion.

### 1. "El primer punto dulce de la escala"

Lo que dice el blog: múltiples Agentes avanzando tareas en paralelo, en poco tiempo, dan una sensación de cosecha mecanizada.

En la historia de Legion, corresponde al rápido crecimiento de tareas a partir de diciembre de 2025:

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

Esto indica que el objetivo central inicial era realmente: **primero que el Agente haga más trabajo**.

### 2. "El cuello de botella soy yo mismo"

El blog dice que, una vez que el trabajo de ejecución se transfiere al Agente, el verdadero cuello de botella humano se convierte en la gestión de contexto, la aceptación y la toma de decisiones.

El trío inicial de Legion resuelve precisamente este problema:

- Usar `tasks.md` para reducir la pérdida de contexto
- Usar `context.md` para registrar decisiones y archivos clave
- Usar `plan.md` para evitar que el objetivo de la tarea se desvíe

### 3. "El muro de conocimiento implícito"

El blog dice que lo que el Agente aprende son muestras visibles, pero no sabe cuál es el estándar actual.

La respuesta de Legion fue:

- Escribir revisiones en el plan
- Escribir restricciones en el contexto
- Convertir controversias de diseño en documentos estructurados

Es decir: externalizar el conocimiento implícito.

### 4. "Alineación de intención + verificación por capas"

La línea de producción del blog se implementó casi exactamente en `http-proxy` y `heavy-rfc`:

- Intent: Objetivo / No objetivos / Alcance
- Plan: Fase / RFC / Resumen de diseño
- Execute: Implementación
- Verify: test / review-code / review-security / bench
- Report: walkthrough / pr-body
- Memory: contexto / tarea archivada / ledger

### 5. "La interfaz de reporte es un problema de ingeniería subestimado"

El blog enfatiza que las conclusiones deben vincularse a artefactos tanto como sea posible.

La práctica de Legion ya va claramente en esta dirección:

- Las conclusiones no son una frase, sino que corresponden a reportes, revisiones, test-reports, cuerpos de PR
- La persona no necesita releer todo el código, sino que puede leer primero los artefactos condensados

Aunque aún no es el Citation Agent que imaginaba, la dirección ya es muy clara.

### 6. "Los benchmarks se volverán una necesidad"

El blog dice que en el futuro será necesario poder comparar diferentes flujos de trabajo o versiones de modelos, no depender de la sensación.

En Legion ya hay una implementación temprana:

- `spec-bench.md`
- Escenarios y umbrales de benchmark
- Salida y reportes de bench

Es decir, este camino ya no es una idea, sino que comienza a ser ingenieril.

---

## 十. El cambio más importante: Legion no solo cambió al Agente, sino también el rol de la persona

Si solo miramos la superficie, parecería que el crecimiento de Legion es:

- Más documentación
- Más revisiones
- Procesos más largos

Pero el cambio verdaderamente clave no es eso, sino que **la división del trabajo entre humano y máquina fue redefinida**.

En épocas anteriores, el rol humano era aproximadamente:

- Ejecutar personalmente
- Recordar personalmente
- Soportar todo el contexto personalmente

Mientras que a medida que Legion maduraba gradualmente, el rol humano se transformó lentamente en:

- Establecer objetivos y restricciones
- Revisar límites de diseño
- Manejar revisiones de nivel de bloqueo
- Aceptar artefactos y riesgos
- Iterar todo el sistema de colaboración

Esta es precisamente la frase final del blog:

> Lo que hago ahora no es "usar IA para escribir más código", sino "usar IA para escalarme a mí mismo".

Legion es la implementación de ingeniería de este objetivo.

Convierte "escalarse a uno mismo" de un deseo abstracto en una estructura de colaboración que puede implementarse, auditarse, revisarse y optimizarse continuamente.

---

## 十一. Mirando el siguiente paso desde el presente: la dirección de evolución más reciente representada por `~/Work/legion-mind`

Si solo miramos el historial de `.legion/` en el repositorio Yuan, podemos ver cómo Legion fue forzado a surgir poco a poco en un proyecto real; pero si miramos el actual `~/Work/legion-mind`, descubrimos que Legion ya ha comenzado a evolucionar hacia la siguiente etapa.

Este paso es muy importante porque indica que el objetivo de Legion ya no es solo "ser útil en un repositorio", sino comenzar a intentar refinar esta experiencia en un **Kit de Piloto Automático** genérico que sea instalable, migrable, comparable con benchmarks y reutilizable.

De `~/Work/legion-mind/README.md` y `docs/legionmind-usage.md` se puede ver que la dirección más reciente tiene al menos cinco características.

### 1. De "flujo de trabajo dentro del repositorio" a "plantilla de orquestación genérica"

En Yuan, Legion surgió inicialmente siguiendo tareas concretas; en `legion-mind`, ya se ha abstraído explícitamente en un conjunto de plantillas genéricas de orquestación de Agentes:

- Agente primario: `legion`
- Subagentes: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
- Habilidad: `skills/legionmind`

Esto indica que la última versión de Legion ya no entiende la "colaboración multiagente" como simplemente reunir algunos agentes temporalmente para trabajar, sino que comienza a modelarla como:

- El orquestador es responsable de avanzar el proceso
- Los subagentes son responsables de una única responsabilidad
- `.legion/` es responsable del estado persistente y la auditoría

Es decir, Legion está pasando de ser un "flujo de trabajo basado en experiencia" a un "sistema de orquestación con roles claros".

### 2. De la invocación manual a entradas de comando

Uno de los cambios más evidentes en `legion-mind` es la conversión de flujos de trabajo comunes en comandos:

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

Esto parece solo una optimización de la experiencia de uso, pero en esencia no lo es.

Significa que Legion está llevando los acuerdos sobre "qué fases, en qué orden ejecutar, cuándo solo diseñar, cuándo continuar la implementación, cuándo sedimentar experiencia" un paso más allá, de SOP implícito a comandos explícitos.

En otras palabras, la Legion temprana restringía principalmente el proceso a nivel de documentación; mientras que la dirección actual es solidificar aún más el proceso mismo, convirtiéndolo en una interfaz de operación que se puede activar directamente.

### 3. De la memoria de tareas a Playbooks entre tareas

La Legion en el repositorio Yuan ya podía persistir el contexto de una sola tarea; pero en `legion-mind` se da un paso más: comienza a introducir `.legion/playbook.md` y `/evolve`.

Esto es clave porque resuelve un problema de otro nivel:

- `plan/context/tasks` resuelven "cómo continuar esta tarea";
- `playbook` resuelve "cómo evitar problemas en este tipo de tareas en el futuro".

Actualmente, `playbook` ya comienza a registrar patrones como:

- La salida de benchmark debe permanecer dentro del repositorio
- El benchmark debe fijar primero un perfil determinista
- La falta de resumen debe contarse como error en el denominador, no reducir silenciosamente el denominador

Esto indica que el modelo de memoria más reciente de Legion ya no es solo memoria de tarea, sino que comienza a intentar ser **memoria organizacional**.

Es decir:

> No solo recordar "hasta dónde se llegó la última vez", sino también recordar "cómo hacer este tipo de tareas de manera más estable en el futuro".

### 4. De "utilizable" a "instalable, publicable, migrable"

Otra dirección particularmente notable en `legion-mind`: ya comienza a ofrecer estrategias de instalación, verificación, reversión y cobertura segura.

Por ejemplo, el README ya tiene:

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- archivos gestionados / índice de respaldo

Esto significa que Legion está evolucionando de "mi propio método de trabajo" a "un activo productizado que otros también pueden instalar y usar".

Este paso tiene un gran significado.

Porque una vez que se entra en la capa de instalación/publicación, el objetivo de diseño de Legion ya no es solo servirme a mí, sino también considerar:

- Cómo sincronizar activos de manera segura
- Cómo evitar sobrescribir las modificaciones propias del usuario
- Cómo verificar el estado de instalación
- Cómo revertir en caso de fallo

Esto indica que la dirección más reciente de Legion ya no es solo el sistema de colaboración en sí, sino la **capacidad de distribución y replicación del sistema de colaboración**.

### 5. De la síntesis de experiencia a la iteración del sistema impulsada por benchmarks

En el blog escribí que una de las cosas más importantes en el futuro sería poder comparar científicamente diferentes versiones de flujos de trabajo, no decir por sensación "esta versión es más inteligente".

`legion-mind` básicamente ya ha formalizado este proyecto.

El repositorio ya tiene:

- `docs/benchmark.md`
- Comando
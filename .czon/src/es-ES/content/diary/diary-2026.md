---
"title": "Registro de trabajo 2026"
"summary": "Este es el registro de trabajo del 22 al 24 de enero de 2026. El autor documenta en detalle su práctica diaria utilizando Agentes de IA (como opencode, legionmind) para el desarrollo de software (por ejemplo, mejoras en legionmind-github-bridge, node-unit) y el diseño de sistemas (sistema multi-agente). El registro incluye tareas específicas completadas, problemas encontrados (como seguridad del clúster, modelado del conocimiento del Agente), ideas generadas (como aumentar la autonomía del Agente, diseñar un sistema de evaluación) y planes para el día siguiente. El argumento central es que el autor se dedica a ampliar sus capacidades personales (scale) a través de Agentes de IA y a explorar flujos de trabajo eficientes y métodos de evaluación de Agentes. La conclusión es la necesidad de encontrar un equilibrio entre la autonomía del Agente, la provisión de conocimiento contextual y la gestión de la energía personal."
"tags":
  - "Registro de trabajo"
  - "Agente de IA"
  - "Desarrollo de software"
  - "Gestión de la eficiencia"
  - "Sistema Multi-Agente"
  - "Automatización"
  - "Productividad personal"
"date": "2026-01-01"
---

# Tabla de Contenidos

1.  [2026](#org7a37329)
    1.  [2026-01 Enero](#orgdf95c10)
        1.  [2026-01-22](#org46a8ace)
            1.  [Hoy he hecho:](#org4842a30)
            2.  [Qué ideas he tenido:](#orgd3c2dea)
            3.  [¿Qué planeo hacer mañana?](#orgfac9005)
        2.  [2026-01-23](#org53cf87b)
            1.  [Hoy he hecho:](#org420a748)
            2.  [Qué ideas he tenido:](#org003bc35)
            3.  [¿Qué planeo hacer mañana?](#org50de801)
        3.  [2026-01-24](#org5af0a91)
            1.  [Hoy he hecho:](#org69bd02c)
            2.  [Qué ideas he tenido:](#org1f09dca)
            3.  [¿Qué planeo hacer mañana?](#org8a10f91)
        4.  [2026-01-25](#org1d94cd3)
            1.  [Hoy he hecho:](#org1ca275c)
            2.  [Qué ideas he tenido:](#org48ae323)
            3.  [¿Qué planeo hacer mañana?](#org7111e30)
        5.  [2026-01-26](#org43faf05)
            1.  [Hoy he hecho:](#org8efa648)
            2.  [Qué ideas he tenido:](#orga5425d1)
            3.  [¿Qué planeo hacer mañana?](#orge845cbe)
        6.  [2026-01-27](#org3411989)

<a id="org7a37329"></a>

# 2026

<a id="orgdf95c10"></a>

## 2026-01 Enero

<a id="org46a8ace"></a>

### 2026-01-22

<a id="org4842a30"></a>

#### Hoy he hecho:

1.  He refactorizado un poco `opencode-feishu-notifier`. Ahora envía notificaciones a los usuarios de una manera establecida.
2.  He continuado haciendo que la IA escriba `legionmind-github-bridge`. He comenzado a usar el modo multi-agente de opencode. Inició 5 agentes para modificar 5 problemas. Trabajó diligentemente durante 2 horas, agotando mis 5 horas de tokens de codex.
3.  Hoy murió un nodo en el clúster sg. Miré los registros y resultó ser por intentos constantes de ataque SSH. Esto no es bueno. Después de una investigación simple, hay varias direcciones posibles:
    - Desactivar la autenticación por contraseña.
    - Cerrar el canal sshd para toda la red.
    - Mover el clúster detrás de un NAT.
4.  He manejado algunos asuntos diversos. Zl vendrá a Suzhou la próxima semana, dediqué algo de tiempo a hacer algunos arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

<a id="orgd3c2dea"></a>

#### Qué ideas he tenido:

En esta etapa, solo puedo gestionar simultáneamente 2-3 cosas. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, mi gestión se vuelve insuficiente y tiendo a fatigarme fácilmente. Y esto es a pesar de que ya intento delegar el trabajo a los Agentes de IA tanto como sea posible. Por lo tanto, creo que debería haber dos direcciones de mejora:

- Para las tareas de codificación, debería maximizar el grado de autonomía del agente. Hay varios objetivos de optimización:
  1.  Que me moleste lo menos posible.
  2.  Que trabaje lo máximo posible.
  3.  Mejorar tanto como sea posible la fiabilidad de su trabajo.
- También necesito algunas mejoras personales:
  1.  Gestionar bien mi energía mental para no fatigarme rápidamente.
  2.  Mejorar la capacidad de trabajar simultáneamente en múltiples contextos diferentes, para no perder u olvidar cosas, y tener una gestión del progreso.

Basándome en las reflexiones anteriores, creo que mañana puedo intentar avanzar en dos direcciones:

1.  Diseñar una plantilla multiagente para legionmind, y experimentar con ella en alguna tarea de codificación de yuan usando opencode.
2.  Continuar registrando el diario de trabajo, explorando un método para gestionar la energía mental y los contextos.

<a id="orgfac9005"></a>

#### ¿Qué planeo hacer mañana?

1.  Como se mencionó anteriormente, hacer un experimento con multiagente.
2.  Continuar con `legionmind-github-bridge`.
3.  Si hay tiempo, trabajar en la seguridad del clúster.

&#x2014;

En general, mi línea principal actual es usar la IA para ampliar mis propias capacidades (scale), y luego intentar ampliar las capacidades de otros.

<a id="org53cf87b"></a>

### 2026-01-23

Hoy tengo un poco de resfriado, algo de dolor de cabeza, productividad baja, pero me alegra haber empezado a hacer resúmenes diarios.

<a id="org420a748"></a>

#### Hoy he hecho:

1.  Con la ayuda de la IA, he diseñado un sistema multi-agente. Este sistema aún no ha sido pulido sistemáticamente.
2.  `legionmind-github-bridge` ha avanzado un paso más.
3.  He modificado el diseño e implementación de la adquisición (preemption) de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora solo se limpian uno por uno.
4.  He realizado el examen de la bolsa de futuros CFFEX para abrir una cuenta. ¡Resulta que requería tener la cámara encendida todo el tiempo, no minimizar ni cambiar de pantalla! Afortunadamente se podía intentar infinitas veces, eso no me pudo detener. Aprobé con un alto 95%.

<a id="org003bc35"></a>

#### Qué ideas he tenido:

Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:

1.  `legionmind` actúa como un SOP para el trabajo de desarrollo. Es una habilidad (skill) de agente. Me gustan las habilidades de agente.
2.  `opencode` actúa como la entidad del agente. Utilizo sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
3.  Lo que ahora me da un poco de dolor de cabeza es cómo combinar las habilidades (skills) y estos subagentes.

Me ha dolido la cabeza todo el día, y solo al anochecer he tenido un poco de claridad mental. Me he dado cuenta de que escribir estas ideas al final del día puede no ser un buen método. Quizás debería solo registrar los hechos y luego resumir las ideas mañana por la mañana al despertar.

<a id="org50de801"></a>

#### ¿Qué planeo hacer mañana?

1.  Usar este sistema multi-agente para hacer algo. Conectemos la cuenta financiera de gate.
2.  Continuar con `legionmind-github-bridge`.
3.  Seguridad del clúster, si hay tiempo.
4.  Reanudar el cronometraje del trabajo (importante).
5.  Mañana vendrán de visita los amigos de sy, por lo que es posible que el tiempo de trabajo sea interrumpido.

<a id="org5af0a91"></a>

### 2026-01-24

Hoy dormí profundamente hasta las 11, me siento muy relajado. Hacía mucho que no dormía tan a pierna suelta.

<a id="org69bd02c"></a>

#### Hoy he hecho:

1.  He desplegado la nueva versión de `node-unit`. Me atreví a desplegarla con cierta confianza porque tengo pruebas integrales (end-to-end) bastante detalladas. Específicamente, inicié una timescaledb (postgresql17) con Docker, luego inicié dos `node-unit` e inserté 21 `@yuants/portal` en la base de datos para probar. Finalmente convergió a un estado de mitad y mitad.

    Esta prueba básicamente puede verificar que cuando aparecen varios deployments sin dueño y se inician dos `node-unit`, se puede observar cómo se turnan para adquirir los deployments. Lo que realmente falta es, por un lado, una carga de trabajo real que ocupe CPU/memoria, y por otro, un escenario donde un `node-unit` se desconecte por alguna razón.

2.  He utilizado la nueva versión multi-agente de `legionmind` en Yuan para resolver el problema de la salida del flujo de cuentas de la cuenta `vendor-gate earn`. Hice que el agente primero usara `legion` para crear documentación, produciendo en total la siguiente cantidad de documentos:

        .legion/tasks/vendor-gate
        ├── context.md
        ├── docs
        │   ├── api-doc.md
        │   ├── pr-body.md
        │   ├── report-walkthrough.md
        │   ├── rfc.md
        │   ├── spec-bench.md
        │   ├── spec-dev.md
        │   ├── spec-obs.md
        │   └── spec-test.md
        ├── plan.md
        └── tasks.md

    Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multi-agente tiene algunos conflictos con la escritura de documentación del `legionmind` original. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían colocarse en algunas habilidades (skills) separadas, y `legionmind` debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas habilidades pequeñas para ayudarlo a completar su trabajo.

    Otro problema insuficiente es que cometió un error en su primer intento de trabajo, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta `earn`. Pedí esto porque actualmente solo la cuenta `earn` de okx también está integrada como una `account`. Pero la IA aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchanges es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.

    Este conocimiento es algo que un nuevo Agente de IA no posee. ¿Cómo deberíamos modelar este conocimiento? ¿Cómo puedo proporcionar a un Agente de IA este contexto del proyecto como su cerebro externo? Este es un problema que merece una profunda reflexión y necesita ser considerado cuidadosamente mañana.

3.  Por la tarde cociné para recibir a los amigos de sy. ¡Me dejó agotado! Bueno, mañana seguiré trabajando.

<a id="org1f09dca"></a>

#### Qué ideas he tenido:

- Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar de manera compacta un cerebro externo para los Agentes de IA. Lo más simple podría comenzar con un conjunto de archivos `AGENT.md`. Lo intenté antes, pero la sobrecarga de mantener estos documentos en sí misma es bastante alta. Distinguir entre basura y experiencia realmente valiosa que merece ser registrada es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo podría tener un bucle adicional donde el agente actualiza su propia memoria. Lo más importante sigue siendo cómo medir los resultados del trabajo del Agente de IA.

- En relación con el punto anterior, leí un artículo que me pareció muy interesante. Ahora permíteme resumirlo con mis propias palabras: En primer lugar, la evaluación del trabajo de un agente en un paso se puede dividir en varias categorías:
  1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas integrales (e2e).
  2.  Evaluación con modelos: usar otro LLM para juzgar según el prompt que definamos.
  3.  Evaluación humana: yo juzgo.

  Luego, para la evaluación sistemática de un Agente, hay dos tipos:
  1.  De capacidad: Responde a "¿qué puede hacer este agente?" Y la tasa de éxito puede ser muy baja, por ejemplo, quiero usar `legion` para ejecutar gradualmente tareas más grandes y difíciles, como explorar una nueva frontera.
  2.  De regresión: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún pueda implementarlas de manera estable.

  Entonces, cuando se introduce una nueva capacidad, debería hacer la transición del tipo de capacidad al tipo de regresión.

  El artículo también menciona dos métricas muy importantes: `pass@K` y `pass^K`.
  - `pass@k`: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Te importa "encontrar al menos una solución utilizable".
  - `pass^k`: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: El usuario espera un agente de producción confiable cada vez.

  FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Mi energía sigue siendo un poco baja. Trabajé un rato por la tarde, cociné por la noche y ya me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

<a id="org8a10f91"></a>

#### ¿Qué planeo hacer mañana?

1.  Reflexionar sobre este modelo de agente de evaluación (eval agent), seguir iterando en este sistema multi-agente.
2.  Seguridad del clúster, debo hacerlo.
3.  `legion-github-bridge`.

<a id="org1d94cd3"></a>

### 2026-01-25

Hoy fui a cortarme el pelo. Cuando regresé, descubrí que el sistema era inestable. Resultó que "Jige" (apodo) había iniciado dos servicios con el mismo `terminal_id`, que se interfirieron mutuamente causando grandes problemas.

<a id="org1ca275c"></a>

#### Hoy he hecho:

1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo `legion` para completar esta tarea. Mi operación fue así:
    - Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.

      Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese tipo de CIDR, así que lo cambié al rango que comienza con 172.21. Aquí hay un problema: es necesario apuntar el balanceador de carga existente en el recurso del clúster a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).

    - Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente: el nuevo IG no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.
    - El siguiente paso fue migrar manualmente los servicios al nuevo IG.
    - Finalmente, eliminar el IG original.

    Después de terminar, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestro servicio con límite de IP por IP colapsara un poco. No tuve más remedio que revertir. Debo primero implementar la funcionalidad de proxy HTTP antes de poder dar el siguiente paso.

2.  El sistema multi-agente se utilizó para practicar con un script de actualización automática del valor neto de `midas`. Deepseek trabajó diligentemente durante mucho tiempo, y me sentí bastante satisfecho. El problema central aquí es que si hay un error en el diseño temprano que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que el agente no trabaja tan rápido.

    Actualmente, estos agentes de codificación son bastante primitivos. A menudo se bloquean o salen debido a problemas de red, etc. Hacer que completen trabajos serios de larga duración (long running) todavía tiene un SLI (Service Level Indicator) un poco deficiente. Esto también podría ser una oportunidad. Pensándolo brevemente, esto requiere algo de conocimiento de ingeniería de software, alta disponibilidad, etc., para que funcione.

<a id="org48ae323"></a>

#### Qué ideas he tenido:

Hoy he tenido pocas ideas, las he escrito integradas en las secciones anteriores.

<a id="org7111e30"></a>

#### ¿Qué planeo hacer mañana?

1.  Diseñar el mecanismo de proxy HTTP para Yuan.
2.  Después de implementarlo, migrar el clúster nuevamente.

<a id="org43faf05"></a>

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción en sí, hay claramente un hilo de racionalidad que actúa como copiloto. Este hilo de racionalidad coloca una barra de control (como las de cadmio en un reactor) dentro del enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la acción de esta barra, comencé a entender qué palabras se pueden decir y cuáles no, qué cosas se pueden hacer y cuáles no, qué decisiones se pueden tomar y cuáles no. Este es un cambio favorable que ha ocurrido en mí.

<a id="org8efa648"></a>

#### Hoy he hecho:

1.  Hoy usé `legion` para el diseño e implementación del proxy HTTP de Yuan. Creo que fue bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente lo intentara por su cuenta. El resultado fue bastante bueno.
2.  También usé `legion` para la actualización automática de `midas`. Sin embargo, la IA lo hizo muy mal, no entendió correctamente mis requisitos ni el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA es insuficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimiento/documentación no es lo suficientemente rigurosa.
3.  ¡Maldita sea, me despertaron las alertas por la noche! Un host murió misteriosamente. Parece que hubo un pico en el uso de la CPU que hizo que el host entrara en un estado del que no podía recuperarse por sí mismo. Los registros (logs) del host son un desastre. Mi evaluación es: las alertas son útiles, los registros son una basura. ¡Lo anoto!

<a id="orga5425d1"></a>

#### Qué ideas he tenido:

1.  Mientras me duchaba, pensé en el punto clave de la colaboración actual entre la IA y yo. Uno es la disponibilidad del servicio del propio agente de IA, que no se caiga o salga mientras está en ejecución. Por cierto, el bucle `ralph` básicamente mejora la disponibilidad mediante reintentos brutales. El otro punto es cómo recibo la salida de la IA. Por ejemplo, incluso un subordinado que reporta a un superior necesita un PPT o directamente un gerente medio profesional para actuar como ese "altavoz costoso". ¿Cómo puede limitarse el reporte de la IA a los humanos a simples Markdown plano y código? ¿Podría el reporte de la IA tener cada elemento vinculado a un artefacto? ¿Podría haber un Agente de Citas (Citation Agent) encargado específicamente de esta parte?

    Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

2.  Reflexionemos cuidadosamente sobre por qué, después de tener un sistema multi-agente, este sistema se dirige firmemente hacia el desastre (como caer en una cuneta). En las conjeturas anteriores se mencionaron aproximadamente tres posibilidades:
    1.  El nivel de inteligencia de la IA en sí misma.
    2.  La revisión humana no es lo suficientemente estricta.
    3.  La base de conocimiento no es lo suficientemente detallada para proporcionar información más correcta que permita a la IA comenzar rápidamente.

    Analicemos cuidadosamente estos puntos. El punto 1 no necesita análisis. Esforzarse en la dirección 2 ciertamente podría depender de un documento RFC cada vez más detallado para dar a los pasos posteriores una dirección suficientemente correcta. Pero esta forma de desarrollo es como si volviéramos al modo de desarrollo **en cascada (waterfall)**, completando el trabajo a través de un flujo lineal:

        Análisis de requisitos -> Diseño del backend -> Desarrollo del backend -> Desarrollo del frontend -> Pruebas de integración

    Los factores que lo forman también tienen dos niveles: el nivel técnico y el nivel de **organización y procesos**, pero el nivel de organización y procesos es el *factor principal*.

    A nivel técnico, existe una dependencia natural entre las tareas. Por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse; el backend debe esperar a que el producto escriba el CRD para poder comenzar.

    Como organización humana, el modelo de desarrollo en cascada tiene problemas: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo. Como forma de colaboración entre la IA y yo, la eficiencia y los conflictos de equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes; un día para mí es como un año para la IA. Ah, la baja eficiencia puede costar algunos tokens más, pero este no es mi principal problema en este momento. En realidad, enfrento el riesgo de calidad derivado de errores en la comprensión de los requisitos o los hechos, y la flexibilidad también es pobre.

    Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA mientras evito que se desvíe del camino.

    Los dos puntos más cruciales son:
    1.  Alineación de intenciones.
    2.  Validación por capas.

    Esto necesita más reflexión profunda. Siento que necesito usarlo más, saborearlo.

3.  Necesito estar alerta ante el lado negativo de este estado en el que busco problemas para mi martillo (cuando tienes un martillo, todo te parece un clavo): dependencia del camino, producción mayor que la comprensión.

<a id="orge845cbe"></a>

#### ¿Qué planeo hacer mañana?

Mañana viene zl. Planeo hacer algo de ejercicio, comer y jugar juegos de mesa.

<a id="org3411989"></a>

### 2026-01-27

Zl ha venido. Fue mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loops" (Ciclos Trágicos). Pasamos tres horas entendiendo las reglas, y finalmente, en el último escenario donde yo interpretaba al antagonista "Dramaturgo", sentí el punto dulce del juego. Terminó con mi victoria total.
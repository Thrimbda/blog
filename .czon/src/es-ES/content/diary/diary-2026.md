---
"title": "Registro de trabajo 2026: Colaboración con Agentes de IA y Práctica de Desarrollo de Sistemas"
"summary": "Este artículo es el registro de trabajo de enero de 2026, donde el autor detalla las actividades diarias, ideas y planes. El núcleo gira en torno a cómo utilizar Agentes de IA (especialmente sistemas multiagente) para mejorar la eficiencia personal y la capacidad de autonomía de los sistemas. El registro cubre múltiples prácticas técnicas, como la refactorización de opencode-feishu-notifier, el desarrollo de legionmind-github-bridge, el diseño de plantillas multiagente, la gestión de migraciones de seguridad en clústeres (como configuración NAT), la implementación del mecanismo de proxy HTTP en Yuan, entre otros. El autor reflexiona sobre problemas clave en la colaboración con IA, incluyendo la alineación de intenciones, la verificación por capas, la construcción de bases de conocimiento y los métodos de evaluación de agentes, y explora la aplicabilidad del modelo de desarrollo en cascada en la colaboración con IA. El registro también incluye eventos personales (como visitas de amigos, gestión de la salud) y reflexiones sobre el manejo de las emociones."
"tags":
  - "Registro de trabajo"
  - "Agente de IA"
  - "Sistema multiagente"
  - "Desarrollo de sistemas"
  - "Seguridad de clústeres"
  - "Mejora de la eficiencia"
  - "Automatización"
  - "Gestión personal"
"date": "2026-01-01"
---

# Tabla de Contenidos

1.  [2026](#org7a37329)
    1.  [2026-01 Enero](#orgdf95c10)
        1.  [2026-01-22](#org46a8ace)
            1.  [¿Qué hice hoy?:](#org4842a30)
            2.  [¿Qué ideas tengo?:](#orgd3c2dea)
            3.  [¿Qué planeo hacer mañana?](#orgfac9005)
        2.  [2026-01-23](#org53cf87b)
            1.  [¿Qué hice hoy?:](#org420a748)
            2.  [¿Qué ideas tengo?:](#org003bc35)
            3.  [¿Qué planeo hacer mañana?](#org50de801)
        3.  [2026-01-24](#org5af0a91)
            1.  [¿Qué hice hoy?:](#org69bd02c)
            2.  [¿Qué ideas tengo?:](#org1f09dca)
            3.  [¿Qué planeo hacer mañana?](#org8a10f91)
        4.  [2026-01-25](#org1d94cd3)
            1.  [¿Qué hice hoy?:](#org1ca275c)
            2.  [¿Qué ideas tengo?:](#org48ae323)
            3.  [¿Qué planeo hacer mañana?](#org7111e30)
        5.  [2026-01-26](#org43faf05)
            1.  [¿Qué hice hoy?:](#org8efa648)
            2.  [¿Qué ideas tengo?:](#orga5425d1)
            3.  [¿Qué planeo hacer mañana?](#orge845cbe)
        6.  [2026-01-27](#org3411989)

<a id="org7a37329"></a>

# 2026

<a id="orgdf95c10"></a>

## 2026-01 Enero

<a id="org46a8ace"></a>

### 2026-01-22

<a id="org4842a30"></a>

#### ¿Qué hice hoy?:

1.  Refactoricé un poco opencode-feishu-notifier, ahora envía notificaciones a los usuarios de una manera establecida.
2.  Continué haciendo que la IA escribiera legionmind-github-bridge, comencé a usar el modo multiagente de opencode, inició 5 agentes para modificar 5 problemas, funcionó durante 2 horas y consumió por completo mis 5 horas de tokens de codex.
3.  Hoy murió un nodo en el clúster sg, revisé los registros y resultó ser por intentos constantes de ataque SSH, lo cual no es bueno. Después de una evaluación simple, hay varias direcciones posibles:
    - Desactivar la autenticación por contraseña
    - Cerrar el canal sshd para toda la red
    - Mover el clúster detrás de un NAT
4.  Manejé algunos asuntos varios. Zl vendrá a Suzhou la próxima semana, pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

<a id="orgd3c2dea"></a>

#### ¿Qué ideas tengo?:

En esta etapa, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, mi gestión se vuelve insuficiente y tiendo a fatigarme fácilmente. Y esto es a pesar de que ya intento delegar la mayor parte del trabajo posible a los Agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:

- Para tareas de codificación, debería maximizar el grado de autonomía del agente, con varios objetivos de optimización:
  1.  Que me moleste lo menos posible.
  2.  Que trabaje lo máximo posible.
  3.  Mejorar tanto como sea posible la fiabilidad de su trabajo.
- También debo mejorar yo mismo en algunos aspectos:
  1.  Gestionar mi energía mental para no fatigarme rápidamente.
  2.  Mejorar mi capacidad para trabajar simultáneamente en múltiples contextos diferentes, evitando descuidos y olvidos, y manteniendo una gestión del progreso.

Basándome en las reflexiones anteriores, creo que mañana puedo intentar avanzar en dos direcciones:

1.  Diseñar una plantilla multiagente para legionmind, y experimentar con alguna tarea de codificación en Yuan usando opencode.
2.  Continuar registrando el diario de trabajo, explorando un método para gestionar la energía mental y los contextos.

<a id="orgfac9005"></a>

#### ¿Qué planeo hacer mañana?

1.  Como se mencionó antes, hacer un experimento con multiagente.
2.  Continuar con legionmind-github-bridge.
3.  Si hay tiempo, trabajar en la seguridad del clúster.

&#x2014;

En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.

<a id="org53cf87b"></a>

### 2026-01-23

Hoy tuve un poco de resfriado, algo de dolor de cabeza, productividad baja, pero me alegra haber empezado a hacer resúmenes diarios.

<a id="org420a748"></a>

#### ¿Qué hice hoy?:

1.  Con la ayuda de la IA, diseñé un sistema multiagente. Este sistema aún no ha sido pulido sistemáticamente.
2.  Legionmind-github-bridge avanzó un paso más.
3.  Modifiqué el diseño e implementación de la adquisición de node-unit. Anteriormente, cuando un node-unit fallaba, todos sus deployments se limpiaban. Ahora solo se limpian uno por uno.
4.  Tomé el examen de la bolsa de futuros para abrir una cuenta en CFFEX. Resultó que requería tener la cámara encendida todo el tiempo, sin minimizar ni cambiar de pantalla. Afortunadamente, se podía intentar ilimitadamente, lo cual no fue un problema para mí. Aprobé con un alto 95%.

<a id="org003bc35"></a>

#### ¿Qué ideas tengo?:

Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:

1.  Legionmind actúa como un SOP para el trabajo de desarrollo, es una habilidad (skill) de agente. Me gustan las habilidades de agente.
2.  Opencode actúa como la entidad del agente. Utilizo sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día decido abandonar opencode, esta sería mi lista de implementaciones pendientes.
3.  Lo que me duele un poco la cabeza ahora es cómo combinar las habilidades (skills) y estos subagentes.

Tuve dolor de cabeza todo el día, y solo al anochecer se me aclaró un poco la mente. Descubrí que escribir estas ideas al final del día podría no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las ideas al despertar por la mañana.

<a id="org50de801"></a>

#### ¿Qué planeo hacer mañana?

1.  Usar este sistema multiagente para hacer algo, conectar la cuenta financiera de gate, por ejemplo.
2.  Continuar con legionmind-github-bridge.
3.  Seguridad del clúster, si hay tiempo.
4.  Reanudar el cronometraje del trabajo. (Importante)
5.  Mañana vendrán amigos de sy de visita, por lo que es posible que el tiempo de trabajo se vea afectado.

<a id="org5af0a91"></a>

### 2026-01-24

Hoy dormí profundamente hasta las 11, me sentí muy relajado, hacía mucho que no dormía tan a gusto.

<a id="org69bd02c"></a>

#### ¿Qué hice hoy?:

1.  Implementé la nueva versión de node-unit. La razón por la que me atreví a implementarla con confianza es que tengo pruebas integrales (end-to-end) bastante detalladas. Específicamente, inicié una timescaledb (postgresql17) con Docker, luego inicié dos node-units, e inserté 21 `@yuants/portal` en la base de datos para probar, finalmente convergiendo a un estado de mitad y mitad.

    Esta prueba básicamente puede verificar que cuando aparecen varios deployments sin dueño y se activan dos node-units, se puede observar cómo se turnan para adquirir los deployments. Lo que realmente falta es, por un lado, una carga de trabajo real que ocupe CPU/memoria, y por otro, un escenario donde un node-unit se desconecte por alguna razón.

2.  Usé la nueva versión multiagente de legionmind en Yuan para resolver el problema de la salida del flujo de cuentas de vendor-gate earn. Hice que el agente primero usara legion para crear documentación, produciendo en total los siguientes documentos:

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

    Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multiagente tiene algunos conflictos con la escritura de documentación original de legionmind. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían colocarse en habilidades (skills) separadas, y legionmind debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas habilidades pequeñas para ayudarlo a completar su trabajo.

    Otro problema es que en su primer intento cometió un error, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara vendor-okx para completar la integración de la cuenta earn. La razón por la que hice esta solicitud es que actualmente solo la cuenta earn de okx también está integrada como una cuenta. Pero la IA aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchanges es publicar todas las cuentas a través de `provideExchangeServices`, en lugar de usar `provideAccountActionsWithCredential` para integrar cuentas.

    Este conocimiento es algo que un nuevo Agente de IA no posee. ¿Cómo deberíamos modelar este conocimiento? ¿Cómo puedo proporcionar a un Agente de IA este contexto del proyecto como su cerebro externo? Esta es una pregunta que merece una reflexión profunda, necesito pensarlo detenidamente mañana.

3.  Por la tarde cociné para recibir a los amigos de sy, ¡me agotó bastante! Bueno, mañana seguiré trabajando.

<a id="org1f09dca"></a>

#### ¿Qué ideas tengo?:

- Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar de manera compacta un cerebro externo para los Agentes de IA. Lo más simple podría comenzar con un conjunto de documentos AGENT.md. Lo intenté antes, pero la sobrecarga de mantener estos documentos en sí misma es bastante alta. Distinguir entre basura y experiencias realmente valiosas para registrar es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo podría tener un circuito adicional donde el agente actualiza la memoria por sí mismo. Lo más importante sigue siendo cómo medir los resultados del trabajo del Agente de IA.

- En relación con lo anterior, leí un artículo que me pareció muy interesante. Déjame resumirlo con mis propias palabras: Primero, la evaluación de un paso de trabajo del agente se puede dividir en varias categorías:
  1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas integrales (e2e).
  2.  Evaluación con modelos: usar otro LLM para juzgar según el prompt que definamos.
  3.  Evaluación humana: yo juzgo.

  Luego, para una evaluación sistemática de un Agente, hay dos tipos:
  1.  De capacidad: Responde a ¿qué puede hacer este agente? Y la tasa de éxito puede ser baja, por ejemplo, quiero usar legion para ejecutar gradualmente tareas más grandes y difíciles, como explorar una nueva frontera.
  2.  De regresión: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún pueda implementarlas de manera estable.

  Entonces, cuando se introduce una nueva capacidad, debería pasar del tipo de capacidad al tipo de regresión.

  El artículo también menciona dos métricas muy importantes: `pass@K` y `pass^K`
  - pass@k: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Te importa "encontrar al menos una solución utilizable".
  - pass^k: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: El usuario espera un agente de producción confiable cada vez.

  FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Mi energía sigue siendo un poco baja. Trabajé un rato por la tarde, cociné por la noche y ya me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

<a id="org8a10f91"></a>

#### ¿Qué planeo hacer mañana?

1.  Pensar en este modelo de agente de evaluación, continuar iterando este sistema multiagente.
2.  Problema de seguridad del clúster, debo abordarlo.
3.  Legion-github-bridge.

<a id="org1d94cd3"></a>

### 2026-01-25

Hoy fui a cortarme el pelo. Al regresar, descubrí que el sistema era inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo terminal_id, que se disputaban entre sí, causando grandes problemas.

<a id="org1ca275c"></a>

#### ¿Qué hice hoy?:

1.  Intenté migrar el clúster detrás de un NAT, por supuesto, usando el nuevo legion para completar esta tarea. Mis operaciones fueron las siguientes:
    - Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.

      Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese tipo de CIDR, así que lo cambié a un rango que comenzara con 172.21. Aquí hay un problema: es necesario especificar manualmente en el recurso del clúster que el balanceador de carga existente apunte a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).

    - Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente: el nuevo IG no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.
    - El siguiente paso fue migrar manualmente los servicios al nuevo IG.
    - Finalmente, eliminar el IG original.

    Después de completarlo, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestros servicios con limitación de IP colapsaran un poco. No tuve más remedio que revertir. Debo implementar la habilidad de proxy HTTP antes de poder continuar con el siguiente paso.

2.  El sistema multiagente se utilizó para practicar un script de actualización automática del valor neto de midas. Deepseek trabajó durante mucho tiempo, y me sentí bastante satisfecho. El problema central aquí es que si hay un error en el diseño inicial que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que el agente no trabaja tan rápido.

    Actualmente, estos agentes de codificación son bastante primitivos. A menudo se bloquean o salen debido a problemas de red, etc. Hacer que realicen trabajos serios de larga duración todavía tiene un nivel de servicio (SLI) un poco bajo. Esto también podría ser una oportunidad. Pensándolo brevemente, esto requiere conocimientos de ingeniería de software, alta disponibilidad, etc., para funcionar.

<a id="org48ae323"></a>

#### ¿Qué ideas tengo?:

Hoy tengo pocas ideas, las he escrito integradas en las secciones anteriores.

<a id="org7111e30"></a>

#### ¿Qué planeo hacer mañana?

1.  Diseñar el mecanismo de proxy HTTP de Yuan.
2.  Después de la implementación, migrar el clúster nuevamente.

<a id="org43faf05"></a>

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción, hay claramente un hilo de racionalidad que actúa como copiloto. Este hilo de racionalidad coloca una barra de control en el enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la acción de esta barra, comencé a comprender qué palabras se pueden decir y cuáles no, qué cosas se pueden hacer y cuáles no, qué decisiones se pueden tomar y cuáles no. Este es un cambio favorable que ha ocurrido en mí.

<a id="org8efa648"></a>

#### ¿Qué hice hoy?:

1.  Hoy usé legion para diseñar e implementar el proxy HTTP de Yuan. Creo que fue bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente lo intentara por su cuenta. Los resultados fueron bastante buenos.
2.  También usé legion para hacer una actualización automática de midas, pero la IA lo hizo muy mal, no entendió correctamente mis requisitos ni el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA es insuficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimiento documental no es lo suficientemente rigurosa.
3.  ¡Maldita sea, me despertaron por la noche con una alerta! El host murió misteriosamente, parece que hubo un pico de uso de CPU que puso al host en un estado del que no podía recuperarse por sí mismo. Los registros del host son un desastre, mi evaluación es: las alertas son útiles, los registros son una basura. ¡Lo anoto!

<a id="orga5425d1"></a>

#### ¿Qué ideas tengo?:

1.  Mientras me duchaba, pensé en los puntos clave de mi colaboración actual con la IA. Uno es la disponibilidad del servicio del propio agente de IA, que no se caiga o salga mientras funciona. Por cierto, el bucle ralph básicamente mejora la disponibilidad mediante reintentos brutales. Otro punto es cómo acepto la salida de la IA. Por ejemplo, un subordinado que reporta a un superior aún necesita un PPT o directamente un gerente medio profesional para actuar como ese "transmisor costoso". ¿Cómo puede limitarse el reporte de la IA a los humanos a simples Markdown plano y código? ¿Podría el reporte de la IA tener cada elemento vinculado a un artefacto? ¿Podría haber un Agente de Citas (Citation Agent) encargado específicamente de esta parte?

    Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

2.  Pensemos detenidamente por qué, después de tener un sistema multiagente, este sistema se dirige firmemente hacia el desastre. En las conjeturas anteriores, básicamente se mencionaron tres posibilidades:
    1.  El nivel de inteligencia de la IA en sí.
    2.  La revisión humana no es lo suficientemente estricta.
    3.  La base de conocimiento no es lo suficientemente detallada para proporcionar información más correcta para que la IA comience rápidamente.

    Analicemos cuidadosamente estos puntos. El punto 1 no requiere pensamiento. Esforzarse en la dirección 2 ciertamente podría depender de un documento RFC cada vez más detallado para dar una dirección suficientemente correcta a los pasos posteriores. Pero este método de desarrollo es como si volviéramos al modelo de desarrollo **en cascada (waterfall)**, completando el trabajo a través de un flujo lineal:

        Análisis de requisitos -> Diseño del backend -> Desarrollo del backend -> Desarrollo del frontend -> Pruebas de integración

    Los factores formadores también tienen dos niveles: el nivel técnico y el nivel de organización y procesos, pero el nivel de organización y procesos es el *factor principal*.

    El nivel técnico es que existen dependencias naturales entre las tareas, por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse, y el backend debe esperar a que el producto escriba el CRD para poder comenzar.

    Como organización humana, el modelo de desarrollo en cascada tiene problemas como: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Como método de colaboración entre la IA y yo, la eficiencia y los conflictos en el equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes, un día mío para la IA es como un año. La baja eficiencia podría costar algunos tokens más, pero este no es mi principal problema en este momento. En realidad, enfrento riesgos de calidad debido a errores en la comprensión de los requisitos o los hechos, y la flexibilidad también es pobre.

    Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA con tranquilidad mientras evito que se desvíe del camino.

    Los dos puntos más cruciales son:
    1.  Alineación de intenciones.
    2.  Verificación por capas.

    Esto requiere más reflexión profunda. Siento que necesito usarlo más, saborearlo.

3.  Necesito estar alerta ante el lado negativo de mi estado de "buscar clavos con un martillo": dependencia del camino, producción mayor que comprensión.

<a id="orge845cbe"></a>

#### ¿Qué planeo hacer mañana?

Mañana viene zl, planeo hacer ejercicio, comer y jugar juegos de mesa.

<a id="org3411989"></a>

### 2026-01-27

Zl vino, mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loop", pasamos tres horas entendiendo las reglas. Finalmente, en el último escenario, donde yo interpretaba al dramaturgo villano, sentí el punto dulce del juego, que terminó con mi victoria total.
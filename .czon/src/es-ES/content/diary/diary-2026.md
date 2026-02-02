---
"title": "Diario de trabajo 2026: Colaboración con Agentes de IA y Práctica de Desarrollo de Sistemas"
"summary": "Este artículo es el diario de trabajo de enero de 2026, donde el autor registra en detalle las actividades diarias, ideas y planes. El núcleo gira en torno a cómo utilizar Agentes de IA (especialmente sistemas multiagente) para mejorar la eficiencia personal y la capacidad de autonomía de los sistemas. El diario cubre múltiples prácticas técnicas, como la refactorización de opencode-feishu-notifier, el desarrollo de legionmind-github-bridge, el diseño de plantillas multiagente, la gestión de migraciones de seguridad en clústeres (como configuración NAT), la implementación del mecanismo de proxy HTTP para Yuan, entre otros. El autor reflexiona sobre problemas clave en la colaboración con IA, incluyendo la alineación de intenciones, la validación por capas, la construcción de bases de conocimiento y los métodos de evaluación de agentes, y explora la aplicabilidad del modelo de desarrollo en cascada en la colaboración con IA. El diario también incluye eventos personales (como visitas de amigos, gestión de la salud) y reflexiones sobre el manejo de las emociones."
"tags":
  - "Diario de trabajo"
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

1.  [2026](#org5ee6b7c)
    1.  [2026-01 Enero](#org45f3c96)
        1.  [2026-01-22](#org3212356)
            1.  [¿Qué hice hoy?](#orgedcd975)
            2.  [¿Qué ideas tengo?](#orgd861555)
            3.  [¿Qué planeo hacer mañana?](#org6508baf)
        2.  [2026-01-23](#orge794f8c)
            1.  [¿Qué hice hoy?](#org983b200)
            2.  [¿Qué ideas tengo?](#org745e411)
            3.  [¿Qué planeo hacer mañana?](#orgd141df3)
        3.  [2026-01-24](#org9073c8a)
            1.  [¿Qué hice hoy?](#org1a919b7)
            2.  [¿Qué ideas tengo?](#orga4c58b1)
            3.  [¿Qué planeo hacer mañana?](#org40d8af6)
        4.  [2026-01-25](#org8472491)
            1.  [¿Qué hice hoy?](#orge1fb7a5)
            2.  [¿Qué ideas tengo?](#orgae54535)
            3.  [¿Qué planeo hacer mañana?](#orgd08b296)
        5.  [2026-01-26](#org59008a3)
            1.  [¿Qué hice hoy?](#org0ff4e76)
            2.  [¿Qué ideas tengo?](#org6827fba)
            3.  [¿Qué planeo hacer mañana?](#org884441d)
        6.  [2026-01-27](#orge656d95)
        7.  [2026-01-31](#orgef7cc98)
            1.  [¿Qué hice hoy?](#org1c7254e)
            2.  [¿Qué ideas tengo?](#orgb6eb713)
            3.  [¿Qué planeo hacer mañana?](#org896307c)
        8.  [2026-02-01](#org71706c0)
        9.  [2026-02-02](#org28106d7)
            1.  [¿Qué planeo hacer mañana?](#orgf8b0675)

<a id="org5ee6b7c"></a>

# 2026

<a id="org45f3c96"></a>

## 2026-01 Enero

<a id="org3212356"></a>

### 2026-01-22

<a id="orgedcd975"></a>

#### ¿Qué hice hoy?

1.  Refactoricé un poco `opencode-feishu-notifier`. Ahora envía notificaciones a los usuarios de una manera establecida.
2.  Continué haciendo que la IA escribiera `legionmind-github-bridge`. Comencé a usar el modo multiagente de opencode. Inició 5 agentes para modificar 5 problemas. Funcionó solo durante 2 horas, consumiendo por completo mis 5 horas de tokens de codex.
3.  Hoy murió un nodo en el clúster de sg. Miré los registros y resultó que estaba siendo atacado constantemente con intentos de SSH. Esto no es bueno. Después de una investigación simple, hay varias direcciones posibles:
    - Desactivar la autenticación por contraseña.
    - Cerrar el canal sshd para toda la red.
    - Mover el clúster detrás de un NAT.
4.  Manejé algunos asuntos diversos. Zl vendrá a Suzhou la próxima semana. Pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

<a id="orgd861555"></a>

#### ¿Qué ideas tengo?

En esta etapa, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, mi gestión se vuelve inadecuada y tiendo a cansarme fácilmente. Y esto es a pesar de que ya intento delegar la mayor parte del trabajo posible a los Agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:

- Para las tareas de codificación, debería maximizar el grado de autonomía del agente. Hay varios objetivos de optimización:
  1.  Que me moleste lo menos posible.
  2.  Que trabaje lo más posible.
  3.  Mejorar tanto como sea posible la fiabilidad de su trabajo.
- También necesito mejorar yo mismo:
  1.  Gestionar mi energía mental para no agotarme rápidamente.
  2.  Mejorar mi capacidad para trabajar simultáneamente en múltiples contextos diferentes, para no olvidar cosas ni perder el hilo, y tener una gestión del progreso.

Basándome en las reflexiones anteriores, creo que mañana podría intentar avanzar en dos direcciones:

1.  Diseñar una plantilla multiagente para legionmind, y experimentar con ella en alguna tarea de codificación de Yuan usando opencode.
2.  Continuar registrando el diario de trabajo, explorando un método para gestionar la energía mental y los contextos.

<a id="org6508baf"></a>

#### ¿Qué planeo hacer mañana?

1.  Como se mencionó antes, hacer un experimento multiagente.
2.  Continuar con `legionmind-github-bridge`.
3.  Si hay tiempo, trabajar en la seguridad del clúster.

&#x2014;

En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.

<a id="orge794f8c"></a>

### 2026-01-23

Hoy tengo un poco de resfriado, un poco de dolor de cabeza, productividad baja, pero me alegra haber empezado a hacer resúmenes diarios.

<a id="org983b200"></a>

#### ¿Qué hice hoy?

1.  Con la ayuda de la IA, diseñé un sistema multiagente. Este sistema aún no ha sido pulido sistemáticamente.
2.  `legionmind-github-bridge` avanzó un paso más.
3.  Modifiqué el diseño e implementación de la adquisición de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
4.  Fui a hacer el examen de la bolsa de futuros para abrir una cuenta en CFFEX. ¡Resulta que tenías que tener la cámara encendida todo el tiempo, no minimizar ni cambiar de pantalla! Afortunadamente, se podía intentar infinitas veces. Eso no me detuvo, aprobé con un alto 95%.

<a id="org745e411"></a>

#### ¿Qué ideas tengo?

Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:

1.  `legionmind` actúa como un SOP para el trabajo de desarrollo. Es una habilidad de agente (agent skill). Me gustan las agent skills.
2.  `opencode` actúa como la entidad del agente. Utilizo sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
3.  Ahora, lo que me duele un poco la cabeza es cómo combinar las skills y estos subagentes.

Me dolió la cabeza todo el día, y solo al anochecer tuve un poco de claridad mental. Me di cuenta de que escribir estas ideas al final del día podría no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las ideas mañana por la mañana al despertar.

<a id="orgd141df3"></a>

#### ¿Qué planeo hacer mañana?

1.  Usar este sistema multiagente para hacer algo. Conectemos la cuenta financiera de gate.
2.  Continuar con `legionmind-github-bridge`.
3.  Seguridad del clúster, si hay tiempo.
4.  Reanudar el cronometraje del trabajo. (Importante).
5.  Mañana vendrán amigos de sy de visita, por lo que es posible que el tiempo de trabajo sea interrumpido.

<a id="org9073c8a"></a>

### 2026-01-24

Hoy dormí profundamente hasta las 11, me siento muy relajado. Hacía mucho tiempo que no dormía tan a pierna suelta.

<a id="org1a919b7"></a>

#### ¿Qué hice hoy?

1.  Implementé la nueva versión de `node-unit`. Me atreví a implementarla con confianza porque tengo pruebas exhaustivas de extremo a extremo. Específicamente, inicié una base de datos timescaledb (postgresql17) con Docker, luego inicié dos `node-unit` e inserté 21 `@yuants/portal` en la base de datos para probar. Finalmente, convergió a un estado donde cada uno tenía la mitad.

    Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se inician dos `node-unit`, se puede observar cómo se turnan para adquirir los deployments. Lo que realmente falta es una carga de trabajo real que ocupe CPU/memoria, y otro escenario donde un `node-unit` se desconecte por alguna razón.

2.  Usé la nueva versión multiagente de `legionmind` en Yuan para resolver el problema de la salida del flujo de cuentas de la cuenta `vendor-gate earn`. Hice que el agente primero usara `legion` para crear documentación, produciendo en total la siguiente cantidad de documentos:

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

    Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multiagente tiene algunos conflictos con la escritura de documentación original de `legionmind`. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las normas sobre cómo escribir cada tipo de documento deberían colocarse en algunas skills separadas, y `legionmind` debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su propio trabajo.

    Otro problema es que en su primer intento cometió un error, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta earn. Pedí esto porque actualmente solo la cuenta earn de okx también está integrada como una cuenta. Pero la IA también aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchanges es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.

    Este conocimiento no lo posee un Agente de IA completamente nuevo. ¿Cómo se debe modelar este conocimiento? ¿Cómo puedo proporcionar a un Agente de IA este contexto del proyecto como su cerebro externo? Este es un problema que merece una reflexión profunda. Mañana necesito pensarlo detenidamente.

3.  Por la tarde cociné para recibir a los amigos de sy. ¡Me agotó! Así que mañana seguiré trabajando.

<a id="orga4c58b1"></a>

#### ¿Qué ideas tengo?

- Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar de manera compacta un cerebro externo para los Agentes de IA. Lo más simple podría comenzar con un conjunto de archivos AGENT.md. Lo intenté antes, pero el overhead de mantener estos documentos en sí mismo es bastante alto. Distinguir entre basura y experiencia realmente valiosa que vale la pena registrar es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo tiene un circuito adicional donde el agente actualiza la memoria por sí mismo. Lo más importante sigue siendo cómo medir los resultados del trabajo del Agente de IA.

- En relación con lo anterior, leí un artículo que me pareció muy interesante. Déjame resumirlo con mis propias palabras: Primero, la evaluación de un paso de trabajo de un agente se puede dividir en varias categorías:
  1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas de extremo a extremo.
  2.  Evaluación con modelos: usar otro LLM para juzgar según el prompt que definamos.
  3.  Evaluación humana: yo juzgo.

  Luego, hay dos tipos de evaluación sistemática para un sistema de Agentes:
  1.  Tipo de capacidad: responde a la pregunta "¿qué puede hacer este agente?" Y la tasa de éxito puede ser muy baja, por ejemplo, quiero usar `legion` para ejecutar gradualmente tareas más grandes y difíciles, como explorar una nueva frontera.
  2.  Tipo de regresión: ¿puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún se puedan implementar de manera estable.

  Entonces, cuando se introduce una nueva capacidad, debería pasar del tipo de capacidad al tipo de regresión.

  El artículo también menciona dos métricas muy importantes: `pass@K` y `pass^K`.
  - `pass@k`: de k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: cuando solo te importa "encontrar al menos una solución utilizable".
  - `pass^k`: los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: cuando el usuario espera un agente de producción confiable cada vez.

  FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Mi energía sigue siendo un poco baja. Trabajé un poco por la tarde, y después de cocinar por la noche me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

<a id="org40d8af6"></a>

#### ¿Qué planeo hacer mañana?

1.  Pensar en este modelo de agente de evaluación, continuar iterando este sistema multiagente.
2.  Seguridad del clúster, hay que hacerlo.
3.  `legion-github-bridge`.

<a id="org8472491"></a>

### 2026-01-25

Hoy fui a cortarme el pelo. Cuando regresé, descubrí que el sistema era inestable. Resultó que "Jige" había iniciado dos servicios con el mismo `terminal_id`, que se estaban interfiriendo entre sí, causando grandes problemas.

<a id="orge1fb7a5"></a>

#### ¿Qué hice hoy?

1.  Intenté migrar el clúster detrás de un NAT, por supuesto, usando el nuevo `legion` para completar esta tarea. Mi operación fue así:
    - Primero modifiqué el clúster de kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.

      Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese tipo de CIDR, así que lo cambié a un rango que comienza con 172.21. Aquí hay un problema: es necesario apuntar el balanceador de carga existente en el recurso del clúster a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).

    - Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente: el nuevo IG no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.
    - El siguiente paso fue migrar manualmente los servicios al nuevo IG.
    - Finalmente, eliminar el IG original.

    Después de hacerlo, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestro servicio con limitación de IPs colapsara un poco. No tuve más remedio que revertir. Debo implementar primero la habilidad de proxy HTTP antes de poder continuar.

2.  El sistema multiagente se utilizó para practicar con un script de actualización automática del valor neto de `midas`. Deepseek trabajó durante mucho tiempo, y me sentí bastante satisfecho. Aquí hay un problema central: si hay un error en el diseño temprano que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que los agentes no trabajan tan rápido.

    Actualmente, estos agentes de codificación son bastante primitivos. A menudo se bloquean o salen debido a problemas de red, etc. Hacer que realicen trabajos serios de larga duración todavía tiene un SLI (Service Level Indicator) un poco deficiente. Esto también podría ser una oportunidad. Pensándolo simplemente, se necesita algo de conocimiento de ingeniería de software y alta disponibilidad para que funcione.

<a id="orgae54535"></a>

#### ¿Qué ideas tengo?

Hoy tengo pocas ideas, las he escrito integradas en las secciones anteriores.

<a id="orgd08b296"></a>

#### ¿Qué planeo hacer mañana?

1.  Diseñar el mecanismo de proxy HTTP para Yuan.
2.  Después de la implementación, migrar el clúster nuevamente.

<a id="org59008a3"></a>

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción, hay claramente un hilo de racionalidad que actúa como copiloto. Este hilo de racionalidad coloca una barra de control en el enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la acción de esta barra de control, comencé a entender qué palabras se pueden decir y cuáles no, qué cosas se pueden hacer y cuáles no, qué decisiones se pueden tomar y cuáles no. Este es un cambio positivo que ha ocurrido en mí.

<a id="org0ff4e76"></a>

#### ¿Qué hice hoy?

1.  Hoy usé `legion` para diseñar e implementar el proxy HTTP de Yuan. Creo que fue bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo elegir un terminal disponible) y luego dejé que el agente lo intentara por su cuenta. El resultado fue bastante bueno.
2.  También usé `legion` para hacer la actualización automática de `midas`, pero la IA lo hizo muy mal, no entendió correctamente mis requisitos ni el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA no es suficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimiento/documentación no es lo suficientemente rigurosa.
3.  ¡Maldita sea! Me despertaron las alertas por la noche, el host murió misteriosamente. Parece que hubo un pico en el uso de la CPU que hizo que el host entrara en un estado del que no podía recuperarse por sí mismo. Los registros del host son un desastre. Mi evaluación: las alertas son útiles, los registros son una mierda. ¡Lo anoto!

<a id="org6827fba"></a>

#### ¿Qué ideas tengo?

1.  Mientras me duchaba, pensé en los puntos clave de mi colaboración actual con la IA. Uno es la disponibilidad del servicio del propio agente de IA, que no se caiga o salga mientras está funcionando. Por cierto, `ralph loop` básicamente mejora la disponibilidad mediante reintentos brutales. Otro punto es cómo recibo la salida de la IA. Por ejemplo, un subordinado que reporta a un superior aún necesita un PPT o, directamente, un gerente medio profesional para actuar como este "transmisor costoso". ¿Cómo puede el reporte de la IA para los humanos limitarse a Markdown plano y código? ¿Podría cada elemento del reporte de la IA enlazar a un artefacto? ¿Podría haber un "Citation Agent" dedicado a esta parte?

    Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

2.  Pensemos detenidamente por qué, después de tener un sistema multiagente, este sistema se dirige firmemente hacia el desastre. En las conjeturas anteriores, básicamente se mencionaron tres posibilidades:
    1.  El nivel de inteligencia de la IA en sí.
    2.  La revisión humana no es lo suficientemente estricta.
    3.  La base de conocimiento no es lo suficientemente detallada para proporcionar información más correcta para que la IA comience rápidamente.

    Analicemos estos puntos. El punto 1 no necesita análisis. Esforzarse en la dirección 2 ciertamente podría depender de un documento RFC cada vez más detallado para dar una dirección suficientemente correcta a los pasos posteriores. Pero este método de desarrollo es como si volviéramos al modelo de desarrollo en **cascada**, completando el trabajo a través de un flujo lineal:

        Análisis de requisitos -> Diseño del backend -> Desarrollo del backend -> Desarrollo del frontend -> Pruebas de integración

    Los factores que lo forman también tienen dos niveles: el nivel técnico y el nivel de **organización y procesos**, pero el nivel de organización y procesos es el *factor principal*.

    A nivel técnico, existe una dependencia natural entre las tareas. Por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse, y el backend debe esperar a que el CRD del producto esté escrito para comenzar.

    Como organización humana, el modelo de desarrollo en cascada tiene problemas: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Pero como método de colaboración entre la IA y yo, la eficiencia y los conflictos de equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes; un día para mí es como un año para la IA. Ah, la baja eficiencia puede gastar algunos tokens más, pero este no es mi principal problema en este momento. En realidad, enfrento riesgos de calidad debido a errores en la comprensión de los requisitos o los hechos, y la flexibilidad también es pobre.

    Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA con tranquilidad mientras evito que se desvíe del camino.

    Los dos puntos más cruciales son:
    1.  Alineación de intenciones.
    2.  Validación por capas.

    Necesito pensar más en esto. Siento que necesito usarlo más, saborearlo.

3.  Necesito estar alerta ante el lado negativo de mi estado actual de "buscar clavos con un martillo": dependencia del camino, producción mayor que comprensión.

<a id="org884441d"></a>

#### ¿Qué planeo hacer mañana?

Mañana viene zl, planeo hacer ejercicio, comer y jugar juegos de mesa.

<a id="orge656d95"></a>

### 2026-01-27

Vino zl, mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loop". Pasamos tres horas entendiendo las reglas, y finalmente, en el último escenario donde yo interpretaba al dramaturgo villano, sentí el punto dulce del juego. Terminó con mi victoria total.

<a id="orgef7cc98"></a>

### 2026-01-31

Los últimos días han sido bastante intensos, por lo que no registré nada. Pero dejar de registrar no es aceptable, así que lo retomo ahora y registro todo junto.

Además de tener muchas cosas, ¿por qué no registré?

1.  Porque tenía miedo de que registrar significara sentarme y dedicar más de 30 minutos a registrar un día, lo que en realidad se debía a cierto miedo y carga asociados con registrar la vida diaria, lo cual es inaceptable.
2.  Normalmente solo estoy dispuesto a comenzar a registrar el día cuando realmente ha terminado, pero pensándolo bien, esto es un poco antinatural, porque ahora suelo meterme en la cama rápidamente a la hora de dormir, no porque realmente haya terminado todo lo que quería hacer (¿realmente hay algún momento así?). Esto lleva a que cuando tengo tiempo no registro, y cuando realmente debería registrar, tengo que meterme en la cama rápidamente, sumado al problema 1.

La combinación de ambos hace que se acumule más y más.

<a id="org1c7254e"></a>

#### ¿Qué hice hoy?

> Corrección: ¿Qué hice en los últimos días?

1.  Bajo la recomendación de sc, comencé a usar neovim. ¿Por qué usarlo? Vi que `nvim-orgmode` parece haberse convertido realmente en un org-mode utilizable, y al mismo tiempo comencé a cansarme de emacs:
    - Fallos de actualización interminables.
    - Depuración y mensajes de error desconcertantes.
    - Flexibilidad que para mí solo añade carga pero es inútil.
    - No entiendo emacs-lisp ni quiero entenderlo.

    Durante años he estado tolerando lo anterior para usar org-mode, pero no había ningún otro lugar donde pudiera usar org-mode correctamente. Ahora, el campo de nvim parece tener una alternativa viable, ¿por qué no probarlo?

    Como he sido usuario de vim durante años, incluso en emacs usé evil-mode (vim-mode), por lo que nunca sentí que usar vim fuera una gran carga. En vscode e idea no puedo sobrevivir sin vim, así que usar nvim directamente no es un problema para mí.

    Dado que el obstáculo ha desaparecido, examinemos el ecosistema de nvim. Lo probé, nvim, al no tener el lastre histórico de vimscript, usa lua directamente como su lenguaje de configuración y de plugins. Por lo tanto, puede avanzar con ligereza, y la comunidad también es muy activa. Veo que ahora el sistema de plugins de neovim también ha sido unificado por un sistema llamado `lazy.vim`. El diseño del sistema de plugins y configuración de nvim parece haber sido una innovación audaz y planificada específicamente para abordar los puntos débiles originales de vim. En vim & emacs probablemente existan innumerables intentos similares de unificar, pero debido a que la comunidad está muy fragmentada, probablemente ninguno haya tenido un éxito real.

    Así que probé directamente lazyVim. ¡Vaya! Ahora siento que tengo directamente un vscode, y este vscode puede ejecutarse en la terminal. ¿Sabes lo increíble que es eso?

    Ahora tengo un poderoso antiguo dios basado en una infraestructura completamente nueva, y configurarlo es extremadamente simple. La flexibilidad y la conveniencia están contenidas de manera adecuada. Mis antiguos puntos débiles básicamente han sido resueltos.

    Casi no invertí tiempo y ya cambié una gran parte de mi flujo de trabajo a esto. Ahora uso tmux para abrir 5 ventanas, y en cada ventana abro nvim en una carpeta. En nvim, a la izquierda está el árbol de directorios, en el medio el código, y a la derecha opencode y la terminal.

2.  Actualicé una versión de `legion`. Reduje significativamente la cantidad de texto de la skill `legionmind` (de 4k líneas). Hasta ahora, siento que necesito preocuparme menos, pero no sé si es porque recientemente he estado usando modelos más inteligentes o porque esta versión de `legionmind` realmente se volvió más inteligente.

3.  Configuré un `openclaw`. Minimax 2.1 sigue siendo un poco tonto, pero como asistente personal creo que `openclaw` es bastante bueno, porque básicamente es un chatgpt con memoria + manos y pies (puede operar mi computadora).

4.  Agregué la funcionalidad de http-proxy a Yuan, agregué métricas, etc.

<a id="orgb6eb713"></a>

#### ¿Qué ideas tengo?

A veces siento que escribir cosas con IA es un poco como depurar un código del que no entiendo completamente el principio, probando constantemente su comportamiento o imprimiendo logs para ayudar en la depuración, cambiando un poco aquí y agregando un poco allá, hasta obtener finalmente un resultado satisfactorio. Investiguemos el origen de esta sensación:

Usar IA para escribir código, en esencia, es que un humano ingresa un prompt que contiene algunas instrucciones específicas, y luego espera que la IA pueda comprender las instrucciones implícitas y la información detrás de este prompt, y luego complete el trabajo correctamente.

Las instrucciones que se espera transmitir a la IA se pueden estratificar: la capa superior son las instrucciones de la tarea actual. Debajo están algunas decisiones técnicas tomadas en este proyecto de software, las mejores prácticas resumidas después de sopesar pros y contras que son aplicables a partes de este proyecto. La siguiente capa es la información de fondo del dominio del problema que el proyecto busca resolver. La siguiente capa es el conocimiento profesional de fondo del propio ingeniero de software que usa la IA, sus preferencias personales, preferencias técnicas, preferencias de estilo, experiencia histórica, acumulación de formas de pensar. La capa más baja es el conocimiento de fondo de este mundo.

En una conversación con la IA, lo que se puede hacer claro y comprensible para la IA son solo las instrucciones de la tarea actual, y luego se espera que la IA posea suficiente conocimiento de fondo sobre el mundo y la información de fondo necesaria para resolver el problema.

Por lo tanto, se puede deducir que si el contexto de una tarea es lo suficientemente pequeño, las instrucciones dadas son extremadamente claras y no hay lastre histórico, la IA debería poder completar la tarea con alta calidad fácilmente. Si hay mucha información de fondo implícita, es fácil que produzca resultados extraños.

Lo que `Legionmind` debe hacer es permitir que la IA misma acumule conocimiento de fondo y mejores prácticas relacionados con el proyecto y el dominio del problema. Esto requiere que la IA tenga una buena capacidad de pensamiento lógico y memoria (capacidad de contexto), o que la IA posea un conocimiento de fondo del mundo abundante. Más allá de estos dos, no se puede salvar.

&#x2014;

Y luego, siento que nvim es un amor a primera vista tardío.

<a id="org896307c"></a>

#### ¿Qué planeo hacer mañana?

Mañana iré a la casa de sc a visitar su nuevo hogar, luego jugaremos juegos de mesa juntos y de paso le mostraré a sy el equipo de snowboard.

<a id="org71706c0"></a>

### 2026-02-01

Fui a Cold Mountain para que sy viera las botas de snowboard. Midieron la longitud del pie (245) y probaron un par bastante cómodo. Lamentablemente, Cold Mountain se quedó sin tallas en los colores bonitos, así que sy tendrá que comprarlas en línea.

Almorzamos en casa de sc, él cocinó. Tiene un dispositivo de cocción lenta a baja temperatura para filetes, y el filete que preparó estaba muy tierno. Sc preparó un acertijo de "room tour" para nosotros. Había dos pistas en total. La primera pista requería ir a 4 lugares para encontrar 4 palabras/oraciones en inglés, y luego usar un código numérico para formar una palabra: "Three". La segunda pista se obtenía de un acertijo ambiental, y finalmente obteníamos los números 31/13 (no recuerdo bien) para sacar un chocolate de un cajón con muchas cajas pequeñas numeradas.

Lamentablemente, no tenía chocolate, así que obtuvimos una linda pegatina.

&#x2014;

La sesión de juegos de mesa por la tarde fue aún más interesante. El plato fuerte fue, por supuesto, "The King's Dilemma". Finalmente, sc, interpretando a la clase media, obtuvo una victoria sin precedentes, la primera vez que la clase media gana el juego desde que lo jugamos. Pgw, interpretando a la burguesía, estaba furioso porque el ratón, interpretando al gobierno, no lo
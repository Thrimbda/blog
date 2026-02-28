---
title: Registro de trabajo 2026
date: 2026-01-01
---

# Tabla de contenidos

1.  [2026](#org91ae5f8)
    1.  [2026-01 Enero](#org14e7d23)
        1.  [2026-01-22](#org987e5de)
            1.  [¿Qué hice hoy?](#orgb693af8)
            2.  [¿Qué pensamientos tuve?](#orgbbe0c52)
            3.  [¿Qué planeo hacer mañana?](#org4c1530c)
        2.  [2026-01-23](#org9670646)
            1.  [¿Qué hice hoy?](#org5b02719)
            2.  [¿Qué pensamientos tuve?](#orgcd67dde)
            3.  [¿Qué planeo hacer mañana?](#org55c5e88)
        3.  [2026-01-24](#org93f4e20)
            1.  [¿Qué hice hoy?](#orgabed47d)
            2.  [¿Qué pensamientos tuve?](#orgdb4d8bb)
            3.  [¿Qué planeo hacer mañana?](#org1e207dc)
        4.  [2026-01-25](#org7ceb7a6)
            1.  [¿Qué hice hoy?](#org1fc8b40)
            2.  [¿Qué pensamientos tuve?](#orgbbaf9e2)
            3.  [¿Qué planeo hacer mañana?](#org3c32f7f)
        5.  [2026-01-26](#org80b755f)
            1.  [¿Qué hice hoy?](#org80224a0)
            2.  [¿Qué pensamientos tuve?](#org5b61931)
            3.  [¿Qué planeo hacer mañana?](#orga6c35c5)
        6.  [2026-01-27](#org98d2dad)
        7.  [2026-01-31](#org756539f)
            1.  [¿Qué hice hoy?](#org57e9aa8)
            2.  [¿Qué pensamientos tuve?](#orgcaa37f7)
            3.  [¿Qué planeo hacer mañana?](#orgf2eb618)
        8.  [2026-02-01](#org0700b38)
        9.  [2026-02-02](#org1f4b65c)
            1.  [¿Qué planeo hacer mañana?](#org149a83d)
        10. [2026-02-05](#org6221927)
            1.  [chatgpt pro](#org68b3fdf)
            2.  [Conclusión de http-proxy](#org2f33c3f)
            3.  [Iteración de Legionmind](#org43f0ced)



<a id="org91ae5f8"></a>

# 2026




<a id="org14e7d23"></a>

## 2026-01 Enero


<a id="org987e5de"></a>

### 2026-01-22


<a id="orgb693af8"></a>

#### ¿Qué hice hoy?

1.  Refactoricé un poco `opencode-feishu-notifier`. Ahora envía notificaciones a los usuarios de una manera predeterminada.
2.  Continué haciendo que la IA escriba `legionmind-github-bridge`. Comencé a usar el modo multi-agent de opencode. Inició 5 agentes modificando 5 problemas. Funcionó solo durante 2 horas, consumiendo mis 5 horas de tokens de codex.
3.  Hoy murió un nodo en el clúster de sg. Miré los registros y resultó ser por intentos constantes de ataque SSH. Esto no es bueno. Después de una investigación simple, hay varias direcciones posibles:
    -   Desactivar la autenticación por contraseña.
    -   Cerrar el canal sshd para toda la red.
    -   Mover el clúster detrás de un NAT.
4.  Manejé algunos asuntos diversos. Zl viene a Suzhou la próxima semana, pasé algún tiempo haciendo arreglos, pero no fue fácil. No planeo invertir más energía en esto.


<a id="orgbbe0c52"></a>

#### ¿Qué pensamientos tuve?

En esta etapa, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y salida. Más allá de eso, me cuesta gestionar y me canso fácilmente. Y esto es a pesar de que ya intento delegar trabajo a los Agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:

-   Para tareas de codificación, debería maximizar la autonomía del agente. Hay varios objetivos de optimización:
    1.  Que me moleste lo menos posible.
    2.  Que trabaje lo más posible.
    3.  Mejorar la confiabilidad de su trabajo tanto como sea posible.
-   También necesito mejorar yo mismo:
    1.  Gestionar mi energía mental para no agotarme rápidamente.
    2.  Mejorar mi capacidad para trabajar en múltiples contextos diferentes simultáneamente, sin perder detalles u olvidar cosas, y con gestión del progreso.

Basándome en lo anterior, creo que mañana podría intentar en dos direcciones:

1.  Diseñar una plantilla multiagent para legionmind, y experimentar con alguna tarea de codificación de yuan usando opencode.
2.  Continuar registrando el diario de trabajo, explorando un método para gestionar la energía mental y el contexto.


<a id="org4c1530c"></a>

#### ¿Qué planeo hacer mañana?

1.  Como se mencionó antes, hacer un experimento con multiagent.
2.  Continuar con `legionmind-github-bridge`.
3.  Si hay tiempo, trabajar en la seguridad del clúster.

&#x2014;

En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.


<a id="org9670646"></a>

### 2026-01-23

Hoy tuve un poco de resfriado, un poco de dolor de cabeza, productividad baja, pero me alegra haber comenzado a hacer resúmenes diarios.


<a id="org5b02719"></a>

#### ¿Qué hice hoy?

1.  Con la ayuda de la IA, diseñé un sistema multi-agent. Este sistema aún no ha sido pulido sistemáticamente.
2.  `legionmind-github-bridge` avanzó un paso más.
3.  Modifiqué el diseño e implementación de la adquisición de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
4.  Fui a tomar el examen de apertura de cuenta de corredor de futuros de CFFEX. ¡Resulta que tenías que tener la cámara encendida todo el tiempo, no minimizar ni cambiar de pantalla! Afortunadamente, se podía intentar infinitamente, lo que no fue un problema para mí. Aprobé con un alto 95%.


<a id="orgcd67dde"></a>

#### ¿Qué pensamientos tuve?

Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:

1.  `legionmind` como un SOP para el trabajo de desarrollo, es una habilidad de agente (agent skill). Me gustan las agent skills.
2.  `opencode` como la entidad del agente. Uso sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
3.  Mi dolor de cabeza actual es cómo combinar las skills y estos subagentes.

Tuve dolor de cabeza todo el día, y solo al anochecer se me aclaró un poco la mente. Descubrí que escribir estas reflexiones al final del día puede no ser una buena idea. Tal vez debería solo registrar los hechos y luego resumir las ideas mañana por la mañana al despertar.


<a id="org55c5e88"></a>

#### ¿Qué planeo hacer mañana?

1.  Usar este sistema multi-agent para hacer algo, tal vez conectar la cuenta de inversión de gate.
2.  Continuar con `legionmind-github-bridge`.
3.  Seguridad del clúster, si hay tiempo.
4.  Reanudar el cronometraje del trabajo. (Importante)
5.  Mañana vendrán amigos de sy de visita, por lo que el tiempo de trabajo probablemente será interrumpido.


<a id="org93f4e20"></a>

### 2026-01-24

Hoy dormí profundamente hasta las 11, me sentí muy relajado. Hacía mucho que no dormía tan a gusto.


<a id="orgabed47d"></a>

#### ¿Qué hice hoy?

1.  Implementé una nueva versión de `node-unit`. Me sentí más seguro al implementarla porque tengo pruebas de extremo a extremo bastante detalladas. Específicamente, docker inició una timescaledb (postgresql17), luego inició dos `node-unit`, e insertó 21 `@yuants/portal` en la base de datos para probar, finalmente convergiendo a un estado de mitad y mitad.
    
    Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se inician dos `node-unit`, se puede observar la adquisición alternada de deployments. Lo que realmente falta es una carga de trabajo real que ocupe CPU/memoria, y el escenario donde un `node-unit` se desconecta por alguna razón.

2.  Usé la nueva versión multi-agent de `legionmind` en Yuan para resolver el problema de la salida del flujo de cuentas de la cuenta `vendor-gate earn`. Hice que el agente primero usara `legion` para crear documentación, produciendo en total los siguientes documentos:
    
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
    
    Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multi-agent tiene algunos conflictos con la escritura de documentación original de `legionmind`. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían estar en skills separadas, y `legionmind` debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su trabajo.
    
    Otro problema fue que cometió un error la primera vez que trabajó, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta earn. Lo pedí así porque actualmente solo la cuenta earn de okx también está integrada como una cuenta. Pero la IA aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchange es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.
    
    Este conocimiento no lo posee un nuevo Agente de IA. ¿Cómo modelar este conocimiento? ¿Cómo proporcionar a un Agente de IA tal contexto del proyecto como su cerebro externo? Es una pregunta que merece una reflexión profunda, necesito pensarlo detenidamente mañana.

3.  Por la tarde cociné para recibir a los amigos de sy, ¡me agotó! Bueno, mañana seguiré trabajando~


<a id="orgdb4d8bb"></a>

#### ¿Qué pensamientos tuve?

-   Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar un cerebro externo compacto para los Agentes de IA. Lo más simple podría comenzar con un conjunto de archivos AGENT.md. Lo intenté antes, pero el overhead de mantener estos documentos en sí es bastante alto. Distinguir basura de experiencias realmente valiosas para registrar es un problema difícil. Por ahora, parece que la memoria, como otros prompts, solo que quizás el agente tiene un bucle para actualizar la memoria. Lo más importante sigue siendo cómo evaluar los resultados del trabajo del Agente de IA.

-   Sobre el punto anterior, leí un artículo que me pareció muy interesante. Déjame resumirlo con mis propias palabras: Primero, la evaluación de un paso de trabajo del agente se puede dividir en varias categorías:
    
    1.  Evaluación de herramientas estáticas: compilador, linter, pruebas unitarias, pruebas de extremo a extremo.
    2.  Evaluación por modelo: usar otro LLM según el prompt que definamos para juzgar.
    3.  Evaluación humana: yo juzgo.
    
    Luego, hay dos tipos de evaluación sistemática para un sistema de Agentes:
    
    1.  Tipo de capacidad: ¿Qué puede hacer este agente? La tasa de aprobación puede ser baja, por ejemplo, quiero usar `legion` para ejecutar gradualmente tareas más grandes y difíciles, como explorar una nueva frontera.
    2.  Tipo de regresión: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún se puedan implementar de manera estable.
    
    Entonces, cuando se introduce una nueva capacidad, debería pasar del tipo de capacidad al tipo de regresión.
    
    El artículo también menciona dos métricas importantes: `pass@K` y `pass^K`.
    
    -   `pass@k`: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Te importa "encontrar al menos una solución utilizable".
    -   `pass^k`: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: El usuario espera un agente de producción confiable cada vez.
    
    FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   La energía sigue siendo un poco baja. Trabajé un poco por la tarde, y después de cocinar por la noche me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?


<a id="org1e207dc"></a>

#### ¿Qué planeo hacer mañana?

1.  Pensar en el modelo de este agente de evaluación, continuar iterando este sistema multi-agent.
2.  Seguridad del clúster, debo hacerlo.
3.  `legion-github-bridge`.


<a id="org7ceb7a6"></a>

### 2026-01-25

Hoy fui a cortarme el pelo. Al regresar, descubrí que el sistema era inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo `terminal_id`, que se arrebataban mutuamente, causando grandes problemas.


<a id="org1fc8b40"></a>

#### ¿Qué hice hoy?

1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo `legion` para hacerlo. Mis operaciones fueron así:
    
    -   Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.
        
        Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese CIDR, así que lo cambié a un rango que comenzara con 172.21. Aquí hay un problema: en el recurso del clúster, el load balancer existente debe apuntar a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).
    
    -   Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente: el nuevo IG no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.
    
    -   El siguiente paso fue migrar manualmente los servicios al nuevo IG.
    
    -   Finalmente, eliminar el IG original.
    
    Después de hacerlo, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestros servicios con limitación de IP colapsaran un poco. No tuve más remedio que revertir. Primero debo implementar la funcionalidad de proxy HTTP antes de poder continuar.

2.  El sistema multi-agent se usó para practicar un script de actualización automática del valor neto de `midas`. Deepseek trabajó durante mucho tiempo, y me sentí bastante satisfecho. El problema central aquí es que si hay un error en el diseño temprano que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que los agentes no trabajan tan rápido.
    
    Actualmente, estos agentes de codificación son bastante primitivos. A menudo se cierran o fallan debido a problemas de red, etc. Hacer que realicen trabajos serios de larga duración todavía tiene un nivel de servicio (SLI) un poco deficiente. Esto también podría ser una oportunidad. Pensándolo bien, se necesitan conocimientos de ingeniería de software, alta disponibilidad, etc., para que funcione.


<a id="orgbbaf9e2"></a>

#### ¿Qué pensamientos tuve?

Hoy tuve pocas ideas, las escribí en línea en las secciones anteriores.


<a id="org3c32f7f"></a>

#### ¿Qué planeo hacer mañana?

1.  Diseñar el mecanismo de proxy HTTP para Yuan.
2.  Después de la implementación, migrar el clúster nuevamente.


<a id="org80b755f"></a>

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción, hay claramente un hilo de razón que actúa como copiloto. Este hilo de razón coloca una barra de control en el enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, provocando una reacción en cadena autoexcitada, lo que podría traer innumerables consecuencias irreparables. Bajo la acción de esta barra, comencé a comprender qué palabras se pueden decir, qué palabras no, qué cosas se pueden hacer, qué cosas no, qué decisiones se pueden tomar, qué decisiones no. Este es un cambio favorable que ha ocurrido en mí.


<a id="org80224a0"></a>

#### ¿Qué hice hoy?

1.  Hoy usé `legion` para el diseño e implementación del proxy HTTP de Yuan. Me pareció bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente lo intentara por su cuenta. El resultado fue bastante bueno.
2.  También usé `legion` para hacer la actualización automática de `midas`. Sin embargo, la IA lo hizo muy mal, no entendió correctamente mis requisitos, no entendió correctamente el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA no es suficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimientos/documentación no es lo suficientemente estricta.
3.  ¡Maldita sea, me despertaron las alertas por la noche! El host murió misteriosamente. Parece que hubo un pico de uso de CPU que hizo que el host entrara en un estado del que no podía recuperarse por sí mismo. Los registros del host son un desastre. Mi evaluación: las alertas son útiles, los registros son una mierda. ¡Lo anoto!


<a id="org5b61931"></a>

#### ¿Qué pensamientos tuve?

1.  Mientras me duchaba, pensé en el punto más crucial de la colaboración actual entre la IA y yo. Uno es la disponibilidad del servicio del propio agente de IA, que no se cierre o falle mientras corre. Por cierto, `ralph loop` básicamente mejora la disponibilidad mediante reintentos brutales. El otro punto es cómo acepto la salida de la IA. Por ejemplo, un subordinado que reporta a un superior aún necesita un PPT o directamente un gerente medio profesional para actuar como este "transductor costoso". ¿Cómo puede el reporte de la IA a los humanos limitarse a Markdown plano y código? ¿Podría el reporte de la IA tener cada elemento vinculado a un artefacto? ¿Podría haber un `Citation Agent` encargado específicamente de esta parte?
    
    Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

2.  Pensemos detenidamente por qué, después de tener un sistema multi-agent, este sistema se dirige firmemente hacia el desastre. En las conjeturas anteriores, básicamente se mencionaron tres posibilidades:
    
    1.  El nivel de inteligencia de la IA en sí.
    2.  La revisión humana no es lo suficientemente estricta.
    3.  La base de conocimientos no es lo suficientemente detallada para proporcionar información más correcta para que la IA arranque rápidamente.
    
    Analicemos estos puntos. El punto 1 no necesita análisis. Esforzarse en la dirección 2 ciertamente puede depender de un documento RFC cada vez más detallado para dar a los pasos posteriores una dirección suficientemente correcta. Pero este método de desarrollo es como si volviéramos al modo de desarrollo en **cascada**, completando el trabajo a través de un flujo lineal:
    
        Análisis de requisitos -> Diseño del backend -> Desarrollo del backend -> Desarrollo del frontend -> Pruebas de integración
    
    Los factores formadores también tienen dos niveles: nivel técnico y nivel de organización y proceso, pero el nivel de organización y proceso es el *factor principal*.
    
    A nivel técnico, existe una dependencia natural entre las tareas. Por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse; el backend debe esperar a que el CRD del producto esté escrito antes de poder comenzar.
    
    Como organización humana, el modelo de desarrollo en cascada tiene problemas: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Como forma de colaboración entre la IA y yo, la eficiencia y los conflictos de equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes; un día para mí es como un año para la IA. Bueno, la baja eficiencia puede desperdiciar algunos tokens, pero este no es mi principal problema en este momento. En realidad, enfrento riesgos de calidad debido a errores en la comprensión de los requisitos o hechos, y la flexibilidad también es pobre.
    
    Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA con tranquilidad mientras evito que se desvíe del camino.
    
    Los dos puntos más cruciales:
    
    1.  Alineación de intenciones.
    2.  Verificación por capas.
    
    Necesito pensar más profundamente en esto. Siento que necesito usarlo más, saborearlo.

3.  Necesito estar alerta ante el lado negativo de mi estado actual de "buscar clavos con un martillo": dependencia del camino, salida mayor que comprensión.


<a id="orga6c35c5"></a>

#### ¿Qué planeo hacer mañana?

Mañana viene zl, planeo hacer ejercicio, comer, jugar juegos de mesa.


<a id="org98d2dad"></a>

### 2026-01-27

Vino zl, mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loop". Pasamos tres horas entendiendo las reglas, y finalmente en el último escenario, donde yo interpretaba al dramaturgo villano, sentí el punto dulce del juego, terminando con mi victoria total.


<a id="org756539f"></a>

### 2026-01-31

Los últimos días han sido bastante intensos, por lo que no registré nada. Pero dejar de registrar no es bueno, así que lo retomo ahora y registro todo junto.

Además de tener muchas cosas, ¿por qué no registré?

1.  Porque tenía miedo de que registrar significara sentarme y dedicar más de 30 minutos específicamente a registrar un día. Esto se debía a que tenía cierto miedo y carga con respecto a registrar la rutina diaria, lo cual es inaceptable.
2.  Normalmente solo estoy dispuesto a comenzar a registrar el día cuando realmente termina. Pero pensándolo bien, esto es un poco antinatural, porque ahora me acuesto básicamente cuando es hora de dormir, rápidamente me meto en la cama, no porque realmente haya terminado todo lo que quería hacer (¿realmente habrá tal momento?). Esto lleva a que cuando tengo tiempo no registro, y cuando realmente debería registrar, debo meterme rápidamente en la cama, sumado al problema 1.

La combinación de ambos hace que se acumule más y más.


<a id="org57e9aa8"></a>

#### ¿Qué hice hoy?

> Corrección: ¿Qué hice en los últimos días?

1.  Bajo la recomendación de sc, comencé a usar neovim. ¿Por qué usarlo? Vi que `nvim-orgmode` parece haberse convertido realmente en un org-mode utilizable, y al mismo tiempo comencé a cansarme de emacs:
    
    -   Actualizaciones fallidas interminables.
    -   Depuración y mensajes de error desconcertantes.
    -   Flexibilidad que para mí solo añade carga pero es inútil.
    -   No entiendo emacs-lisp ni quiero entenderlo.
    
    Durante años, para usar orgmode, he estado soportando lo anterior. Pero no había ningún otro lugar donde pudiera usar bien org-mode. Ahora el campo de nvim parece tener una alternativa viable, ¿por qué no probarlo?
    
    Como he sido usuario de vim durante muchos años, incluso en emacs usé evil-mode (vim-mode), por lo que nunca sentí que usar vim me supusiera una gran carga. En vscode e idea, sin vim no puedo sobrevivir, así que usar nvim directamente no es un problema para mí.
    
    Dado que la barrera ya no existe, echemos un vistazo al ecosistema de nvim. Lo probé. nvim, al no tener el lastre histórico de vimscript, usa directamente lua como su lenguaje de configuración y de plugins. Por lo tanto, puede avanzar con ligereza, y la comunidad también es muy activa. Veo que ahora el sistema de plugins de neovim también ha sido unificado por un sistema llamado `lazy.vim`. El diseño del sistema de plugins y configuración de nvim debe haber sido una innovación audaz y planificada específicamente para los puntos débiles originales de vim. En vim & emacs probablemente existan innumerables intentos similares de unificación, pero debido a que la comunidad está demasiado dispersa, probablemente ninguno haya tenido un éxito real.
    
    Así que probé directamente lazyVim. ¡Vaya! Ahora siento que tengo directamente un vscode, y este vscode puede ejecutarse en la terminal. ¿Sabes lo genial que es eso?
    
    Ahora tengo al poderoso Antiguo Dios basado en una nueva infraestructura, y configurarlo es extremadamente simple. La flexibilidad y la conveniencia están equilibradas de manera adecuada. Mis antiguos puntos débiles básicamente se han resuelto.
    
    Casi no invertí tiempo y ya cambié muchos flujos de trabajo a esto. Ahora uso tmux para abrir 5 ventanas, y en cada ventana abro nvim en una carpeta. En nvim, a la izquierda está el árbol de directorios, en el medio el código, a la derecha opencode y la terminal.

2.  Actualicé una versión de `legion`. Reduje significativamente la cantidad de texto de la skill `legionmind` (de 4k líneas). Actualmente, siento que necesito preocuparme menos, pero no sé si es porque recientemente he estado usando modelos más inteligentes o porque esta versión de `legionmind` realmente se volvió más inteligente.

3.  Configuré un `openclaw`. `minimax 2.1` sigue siendo un poco tonto, pero como asistente personal, creo que `openclaw` es bastante bueno, porque básicamente es un chatgpt con memoria + manos y pies (puede operar mi computadora).

4.  Agregué la funcionalidad de `http-proxy` a Yuan, agregué métricas, etc.


<a id="orgcaa37f7"></a>

#### ¿Qué pensamientos tuve?

A veces siento que escribir cosas con IA es un poco como depurar código cuyo principio no entiendo del todo, probando constantemente su comportamiento o imprimiendo logs para ayudar en la depuración, cambiando un poco aquí, agregando un poco allá, hasta obtener finalmente un resultado satisfactorio. Investiguemos el origen de esta sensación:

Usar IA para escribir código, en esencia, es que un humano ingresa un prompt, que contiene algunas instrucciones específicas, y luego espera que la IA pueda comprender las instrucciones implícitas y la información detrás de estas instrucciones, y luego completar el trabajo correctamente.

Las instrucciones que se espera transmitir a la IA se pueden estratificar: la capa superior son las instrucciones de la tarea actual. Debajo están algunas decisiones técnicas tomadas para este proyecto de software, las mejores prácticas resumidas después de sopesar pros y contras que son aplicables a partes de este proyecto. La siguiente capa es la información de fondo del dominio del problema que el proyecto pretende resolver. La siguiente capa es el conocimiento profesional de ingeniería de software del propio usuario de la IA, sus preferencias personales, preferencias técnicas, preferencias de estilo, experiencia histórica, acumulación de formas de pensar. La capa más baja es el conocimiento de fondo de este mundo.

En una conversación con la IA, lo que se puede hacer claro para la IA son solo las instrucciones de la tarea actual, y luego se espera que la IA posea suficiente conocimiento de fondo sobre el mundo y la información de fondo necesaria para resolver el problema.

Por lo tanto, se puede deducir que si el contexto de una tarea es lo suficientemente pequeño, las instrucciones dadas son extremadamente claras y no hay lastre histórico, la IA debería poder completar la tarea con alta calidad fácilmente. Si hay mucha información de fondo implícita, es fácil que produzca resultados extraños.

Lo que `Legionmind` pretende hacer es permitir que la IA misma acumule conocimiento de fondo y mejores prácticas relacionados con este proyecto y el dominio del problema en sí. Esto requiere que la IA tenga una buena capacidad de pensamiento lógico y memoria (capacidad de contexto), o que la IA posea un conocimiento de fondo del mundo suficientemente abundante. Más allá de estos dos, no se puede salvar.

&#x2014;

Y luego, siento que nvim es realmente un encuentro tardío.


<a id="orgf2eb618"></a>

#### ¿Qué planeo hacer mañana?

Mañana iré a la casa de sc a visitar su nuevo hogar, luego jugaremos juegos de mesa juntos, y de paso le mostraré a sy el equipo de nieve.


<a id="org0700b38"></a>

### 2026-02-01

Fui a Cold Mountain para mostrarle a sy las botas de nieve. Midieron la longitud del pie (245) y probaron un par bastante cómodo. Lamentablemente, Cold Mountain se quedó sin tallas del color bonito, así que sy tendrá que comprarlo en línea.

Almorzamos en casa de sc, comimos lo que él cocinó. Tiene un dispositivo de cocción lenta a baja temperatura para filetes, y el filete que preparó estaba muy tierno. Sc nos preparó un acertijo de recorrido por la habitación. Había dos pistas en total. La primera pista requería ir a 4 lugares para encontrar 4 palabras/oraciones en inglés, y luego usar un código de números para formar una palabra: "Three". La segunda pista se obtenía de un acertijo ambiental, finalmente obteniendo los números 31/13 (no recuerdo bien), y luego podías tomar un chocolate de un cajón con muchas cajitas numeradas.

Lamentablemente, no tenía chocolate, obtuvimos una linda pegatina.

&#x2014;

La sesión de juegos de mesa por la tarde fue aún más interesante. El plato fuerte fue, por supuesto, "The King's Dilemma". Finalmente, sc, interpretando a la clase media, obtuvo una victoria sin precedentes, la primera vez que la clase media gana el juego desde que lo jugamos. Pgw, interpretando a la burguesía, estaba furioso porque el ratón, interpretando al gobierno, no lo ayudó en dos votaciones cruciales de reforma política que eran muy importantes para pgw. Yo interpreté a la clase trabajadora, naturalmente no tenía muchos intereses comunes con la burguesía en la mayoría de los temas, no podía hacer mucho. De hecho, al final del juego, excepto pgw, los puntajes de los otros tres estábamos muy cerca. Solo el capitalista salió herido.

Este juego es realmente muy divertido y se ha convertido en mi juego de mesa favorito. Porque tiene una profundidad de juego considerable, cada uno de los cuatro jugadores tiene un estilo de juego muy diferente, y cada vez que juegas un rol diferente es una experiencia de juego completamente nueva. Por ejemplo, esta vez, la clase trabajadora que interpreté experimentó por primera vez un exceso de desempleo (porque ni el gobierno ni la burguesía querían abrir nuevas empresas), hasta el punto de cumplir las condiciones para iniciar una protesta y disturbios obreros. La clase trabajadora salió a las calles, amenazando con cambiar el cielo y la tierra de este país. El efecto específico era obtener dados de influencia y deducir un total de (número de desempleados - 2
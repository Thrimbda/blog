---
title: Registro de trabajo 2026
date: 2026-01-01
---

# 2026

## 2026-01 Enero

### 2026-01-22

1.  Qué hice hoy:
    1.  Refactoricé un poco `opencode-feishu-notifier`. Ahora envía notificaciones a los usuarios de una manera predeterminada.
    2.  Continué haciendo que la IA escriba `legionmind-github-bridge`. Comencé a usar el modo multi-agent de opencode. Inició 5 agentes para modificar 5 problemas. Uno de ellos estuvo funcionando durante 2 horas, consumiendo todos mis tokens de codex de 5 horas.
    3.  Hoy murió un nodo en el clúster sg. Miré los registros y resultó que estaba siendo atacado constantemente con intentos de SSH. Esto no es bueno. Después de una investigación rápida, hay varias direcciones posibles:
        - Desactivar la autenticación por contraseña.
        - Cerrar el canal sshd para toda la red.
        - Mover el clúster detrás de un NAT.
    4.  Manejé algunos asuntos misceláneos. Zl vendrá a Suzhou la próxima semana. Pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

2.  Algunas reflexiones:

    En esta etapa, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de eso, pierdo el control y me canso fácilmente. Y esto es a pesar de que ya estoy delegando la mayor parte del trabajo posible a los Agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:
    - Para las tareas de codificación, debería maximizar la autonomía del agente. Hay varios objetivos de optimización:
      1.  Que me moleste lo menos posible.
      2.  Que trabaje lo máximo posible.
      3.  Mejorar la confiabilidad de su trabajo tanto como sea posible.
    - También necesito mejorar yo mismo:
      1.  Gestionar mi energía mental para no agotarme rápidamente.
      2.  Mejorar mi capacidad para trabajar en múltiples contextos diferentes simultáneamente, sin perder detalles ni olvidar cosas, y con gestión del progreso.

    Basándome en lo anterior, creo que mañana puedo intentar en dos direcciones:
    1.  Diseñar una plantilla multiagent para legionmind y experimentar con ella en alguna tarea de codificación en yuan usando opencode.
    2.  Continuar registrando el diario de trabajo y explorar un método para gestionar la energía mental y los contextos.

3.  ¿Qué planeo hacer mañana?
    1.  Como se mencionó antes, hacer un experimento con multiagent.
    2.  Continuar con `legionmind-github-bridge`.
    3.  Si hay tiempo, trabajar en la seguridad del clúster.

    —

    En general, mi objetivo principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.

### 2026-01-23

Hoy tengo un poco de resfriado, un poco de dolor de cabeza, productividad baja. Pero me alegra haber comenzado con los resúmenes diarios.

1.  Qué hice hoy:
    1.  Con la ayuda de la IA, diseñé un sistema multi-agent. Este sistema aún no ha sido pulido sistemáticamente.
    2.  `legionmind-github-bridge` avanzó un paso más.
    3.  Modifiqué el diseño e implementación de la adquisición de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
    4.  Tomé el examen de la bolsa de futuros CFFEX para abrir una cuenta. ¡Resulta que tenías que tener la cámara encendida todo el tiempo, sin minimizar ni cambiar de pantalla! Afortunadamente, se podía intentar infinitamente. Eso no me detuvo, aprobé con un alto 95%.

2.  Algunas reflexiones:

    Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Mi flujo de trabajo actual es:
    1.  `legionmind` actúa como un SOP para el trabajo de desarrollo. Es una habilidad de agente (agent skill). Me gustan las agent skills.
    2.  `opencode` es la entidad del agente. Uso sus capacidades como bash / tool calling / langraph / command / subagent. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
    3.  Lo que me duele un poco la cabeza ahora es cómo combinar las skills y estos subagentes.

    Me dolió la cabeza todo el día, y solo al anochecer se me aclaró un poco. Descubrí que escribir estas reflexiones al final del día puede no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las reflexiones al despertar por la mañana.

3.  ¿Qué planeo hacer mañana?
    1.  Usar este sistema multi-agent para hacer algo. Conectar la cuenta de inversión de gate, por ejemplo.
    2.  Continuar con `legionmind-github-bridge`.
    3.  Seguridad del clúster, si hay tiempo.
    4.  Reanudar el cronometraje del trabajo (importante).
    5.  Mañana vendrán los amigos de sy de visita, así que es posible que el tiempo de trabajo sea interrumpido.

### 2026-01-24

Hoy dormí profundamente hasta las 11 a.m. Me siento muy relajado. Hace mucho que no dormía tan a gusto.

1.  Qué hice hoy:
    1.  Implementé la nueva versión de `node-unit`. La razón por la que me atreví a implementarla con confianza es que tengo pruebas de extremo a extremo bastante detalladas. Específicamente, inicié una base de datos timescaledb (postgresql17) con Docker, luego inicié dos `node-unit` e inserté 21 `@yuants/portal` en la base de datos para probar. Finalmente convergió en un estado de mitad y mitad.

        Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se inician dos node-units, se puede observar cómo se turnan para adquirirlos. Lo que realmente falta es una carga de trabajo real que ocupe CPU/memoria, y el escenario donde un node-unit se desconecta por alguna razón.

    2.  Usé la nueva versión multi-agent de legionmind en Yuan para resolver el problema de la salida del flujo de cuentas de la cuenta `vendor-gate earn`. Hice que el agente primero usara legion para crear documentación, produciendo en total los siguientes documentos:

        ```text
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
        ```

        Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multi-agent tiene algunos conflictos con la escritura de documentación del legionmind original. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían estar en skills separadas. Luego, legionmind debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su trabajo.

        Otro problema es que cometió un error la primera vez que trabajó, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta earn. Pedí esto porque actualmente solo la cuenta earn de okx también está integrada como una `account`. Pero la IA también aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchange es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.

        Este conocimiento es algo que un nuevo Agente de IA no posee. ¿Cómo se debe modelar este conocimiento? ¿Cómo puedo proporcionar a un Agente de IA este contexto del proyecto como su cerebro externo? Esta es una pregunta que merece una reflexión profunda. Mañana necesito pensarlo detenidamente.

    3.  Por la tarde cociné para recibir a los amigos de sy. ¡Me agotó! Bueno, mañana seguiré trabajando.

2.  Algunas reflexiones:
    - Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar un cerebro externo compacto para los Agentes de IA. Lo más simple podría comenzar con un conjunto de documentos AGENT.md. Lo intenté antes, pero la sobrecarga de mantener esos documentos en sí misma es bastante alta. Distinguir entre basura y experiencia realmente valiosa es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo tiene un bucle adicional donde el agente actualiza la memoria por sí mismo. Lo más importante sigue siendo cómo medir los resultados del trabajo del Agente de IA.

    - En relación con lo anterior, leí un artículo que me pareció muy interesante. Déjame resumirlo con mis propias palabras:
      Primero, la evaluación de un paso de trabajo del agente se puede dividir en varias categorías:
      1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas de extremo a extremo.
      2.  Evaluación con modelos: usar otro LLM para juzgar según nuestro prompt definido.
      3.  Evaluación humana: yo juzgo.

      Luego, hay dos tipos de evaluación sistemática para un sistema de Agentes:
      1.  Basada en capacidades: ¿Qué puede hacer este agente? La tasa de aprobación puede ser baja, por ejemplo, usar legion para ejecutar tareas cada vez más grandes y difíciles, como explorar una nueva frontera.
      2.  Basada en regresión: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún se puedan implementar de manera estable.

      Entonces, cuando se introduce una nueva capacidad, debería pasar de ser basada en capacidades a basada en regresión.

      El artículo también menciona dos métricas importantes: `pass@K` y `pass^K`.
      - `pass@k`: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Escenarios donde solo te importa "encontrar al menos una solución utilizable".
      - `pass<sup>k</sup>`: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: Agentes de producción donde el usuario espera confiabilidad en cada ocasión.

      FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Mi energía todavía es un poco baja. Trabajé un poco por la tarde, y después de cocinar por la noche me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

3.  ¿Qué planeo hacer mañana?
    1.  Pensar en este modelo de agente de evaluación y seguir iterando en este sistema multi-agent.
    2.  Seguridad del clúster, definitivamente hay que hacerlo.
    3.  `legion-github-bridge`.

### 2026-01-25

Hoy fui a cortarme el pelo. Cuando regresé, descubrí que el sistema era inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo `terminal_id`, que se estaban interfiriendo entre sí, causando grandes problemas.

1.  Qué hice hoy:
    1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo legion para hacerlo. Mis operaciones fueron así:
        - Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.

          Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese tipo de CIDR, así que lo cambié a un rango que comienza con 172.21. Aquí hay un problema: es necesario apuntar el balanceador de carga existente en el recurso del clúster a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).

        - Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente: el nuevo IG no tenía permisos para S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.

        - El siguiente paso fue migrar manualmente los servicios al nuevo IG.

        - Finalmente, eliminar el IG original.

        Después de hacerlo, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestros servicios con límites de IP por IP se volvieran un poco locos. No tuve más remedio que revertir. Primero necesito implementar la capacidad de proxy HTTP antes de poder dar el siguiente paso.

    2.  El multi-agent se usó en la práctica para un script de actualización automática del valor neto de midas. Deepseek trabajó durante mucho tiempo, y me sentí bastante satisfecho. Aquí hay un problema central: si hay un error en el diseño temprano que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que los agentes no trabajan tan rápido.

        Actualmente, estos agentes de codificación son bastante primitivos. A menudo se bloquean o salen debido a problemas de red, etc. Hacer que realicen trabajos serios de larga duración todavía tiene un nivel de servicio (SLI) un poco bajo. Esto también podría ser una oportunidad. Pensándolo rápidamente, esto requiere conocimientos de ingeniería de software, alta disponibilidad, etc., para funcionar.

2.  Algunas reflexiones:

    Hoy tengo pocas reflexiones, las escribí en línea en las secciones anteriores.

3.  ¿Qué planeo hacer mañana?
    1.  Diseñar el mecanismo de proxy HTTP para Yuan.
    2.  Después de la implementación, migrar el clúster nuevamente.

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción en sí, hay claramente un hilo de racionalidad haciendo de copiloto. Este hilo de racionalidad coloca una barra de control en el enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la influencia de esta barra, comienzo a entender qué palabras se pueden decir y cuáles no, qué cosas se pueden hacer y cuáles no, qué decisiones se pueden tomar y cuáles no. Este es un cambio favorable que ha ocurrido en mí.

1.  Qué hice hoy:
    1.  Hoy usé legion para el diseño e implementación del proxy HTTP de yuan. Creo que fue bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo elegir un terminal disponible) y luego dejé que el agente lo hiciera por su cuenta. El resultado fue bastante bueno.
    2.  También usé legion para hacer la actualización automática de midas. Pero la IA lo hizo muy mal, no entendió correctamente mis requisitos ni el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA no es suficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimientos/documentación no es lo suficientemente estricta.
    3.  ¡Maldita sea! Me despertaron las alertas por la noche. Un host murió misteriosamente. Parece que hubo un pico de uso de CPU que puso al host en un estado del que no podía recuperarse por sí solo. Los registros del host son un desastre. Mi evaluación: las alertas son útiles, los registros son una basura. ¡Anotado!

2.  Algunas reflexiones:
    1.  Mientras me duchaba, pensé en el punto más crucial de mi colaboración actual con la IA. Uno es la disponibilidad del servicio del propio agente de IA, que no se caiga o salga mientras está funcionando. Por cierto, el bucle de ralph básicamente mejora la disponibilidad mediante reintentos brutales. El otro punto es cómo recibo la salida de la IA. Por ejemplo, un subordinado que reporta a un superior aún necesita un PPT o, directamente, un gerente medio profesional para actuar como este "altavoz costoso". ¿Cómo puede el reporte de la IA a los humanos limitarse a Markdown plano y código? ¿Podría cada elemento del reporte de la IA enlazar a un artefacto? ¿Podría haber un Agente de Citas dedicado a esta parte?

        Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

    2.  Pensemos detenidamente por qué, después de tener un sistema multi-agent, este sistema se dirige firmemente hacia el desastre. En las conjeturas anteriores se mencionaron aproximadamente tres posibilidades:
        1.  El nivel de inteligencia de la IA en sí.
        2.  La revisión humana no es lo suficientemente estricta.
        3.  La base de conocimientos no es lo suficientemente detallada para proporcionar información más correcta para que la IA comience rápidamente.

        Analicemos estos puntos. El punto 1 ni siquiera necesita consideración. Esforzarse en la dirección 2 ciertamente puede depender de un documento RFC cada vez más detallado para dar una dirección suficientemente correcta a los pasos posteriores. Pero este método de desarrollo es como si volviéramos al modo de desarrollo **en cascada**, completando el trabajo a través de un flujo lineal:

        ```text
        Análisis de requisitos -> Diseño backend -> Desarrollo backend -> Desarrollo frontend -> Pruebas de integración
        ```

        Los factores formativos también tienen dos niveles: técnico y organizativo/de procesos, pero el nivel organizativo/de procesos es el *factor principal*.

        El nivel técnico es que las tareas tienen dependencias naturales, por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse, y el backend debe esperar a que el producto escriba el CRD para comenzar.

        Como organización humana, el modelo de desarrollo en cascada tiene problemas: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Como método de colaboración entre la IA y yo, la eficiencia y los conflictos en el equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes; un día para mí es como un año para la IA. La baja eficiencia puede costar algunos tokens adicionales, pero este no es mi principal problema en este momento. El problema real que enfrento son los riesgos de calidad causados por errores en la comprensión de los requisitos o los hechos, y la poca flexibilidad.

        Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA sin que se desvíe del camino.

        Los dos puntos más cruciales:
        1.  Alineación de intenciones.
        2.  Verificación por capas.

        Esto necesita una reflexión más profunda. Siento que necesito usarlo más, saborearlo.

    3.  Necesito estar alerta ante el lado negativo de mi estado de "buscar clavos con un martillo": dependencia del camino, producción mayor que comprensión.

3.  ¿Qué planeo hacer mañana?

    Mañana viene zl. Planeo hacer ejercicio, comer y jugar juegos de mesa.

### 2026-01-27

Zl vino, mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loop". Pasamos tres horas entendiendo las reglas, y finalmente en el último escenario, donde yo interpretaba al dramaturgo villano, sentí el punto dulce del juego. Terminó con mi victoria total.

### 2026-01-31

Los últimos días han sido bastante intensos, así que no registré nada. Pero dejar de registrar no es aceptable, así que lo retomo ahora y registro todo junto.

Además de tener muchas cosas, ¿por qué no registré?

1.  Porque tenía miedo de que registrar significara sentarme y dedicar más de 30 minutos a registrar un día. Esto se debió a que tenía cierto miedo y carga con el registro diario, lo cual es inaceptable.
2.  Normalmente solo estoy dispuesto a comenzar a registrar el día cuando realmente termina. Pero pensándolo bien, esto es un poco antinatural, porque ahora básicamente me meto en la cama rápidamente cuando es hora de dormir, no porque realmente haya terminado todo lo que quería hacer (¿realmente hay tal momento?). Esto lleva a que cuando tengo tiempo no registro, y cuando realmente debería registrar, tengo que meterme en la cama rápidamente, sumado al problema 1.

La combinación de ambos hace que se acumule.

1.  Qué hice hoy:

    > Corrijo: qué hice en los últimos días.
    1.  Bajo la recomendación de sc, comencé a usar neovim. ¿Por qué usarlo? Vi que `nvim-orgmode` parece haberse convertido realmente en un org-mode utilizable, y al mismo tiempo comencé a sentirme cansado de emacs:
        - Actualizaciones fallidas interminables.
        - Depuración y mensajes de error desconcertantes.
        - Flexibilidad que para mí solo agrega carga y es inútil.
        - No entiendo emacs-lisp y no quiero entenderlo.

        Durante años he estado soportando lo anterior para usar org-mode, pero no había ningún otro lugar donde pudiera usar bien org-mode. Ahora el campo de nvim parece tener una alternativa viable, ¿por qué no probarlo?

        Como he sido usuario de vim durante años, incluso en emacs usé evil-mode (vim-mode), por lo que nunca sentí que usar vim fuera una gran carga. En vscode e idea no puedo sobrevivir sin vim, así que usar nvim directamente no es un problema para mí.

        Dado que el obstáculo desapareció, examiné el ecosistema de nvim. Lo probé. nvim, sin el lastre histórico de vimscript, usa lua directamente como su lenguaje de configuración y de plugins. Por lo tanto, puede avanzar con ligereza, y la comunidad también es muy activa. Veo que ahora el sistema de plugins de neovim también ha sido unificado por un sistema llamado `lazy.vim`. El diseño del sistema de plugins y configuración de nvim parece haber sido una innovación audaz y planificada específicamente para los puntos débiles originales de vim. En vim & emacs probablemente hay innumerables intentos similares de unificación, pero debido a que la comunidad está muy fragmentada, probablemente ninguno tuvo un éxito real.

        Así que probé lazyVim directamente. ¡Vaya! Ahora sentí que tenía directamente un vscode, y este vscode puede ejecutarse en la terminal. ¿Sabes lo genial que es eso?

        Ahora tengo un poderoso Antiguo Dios basado en una nueva infraestructura, y su configuración es extremadamente simple. La flexibilidad y la conveniencia están contenidas de manera adecuada. Mis antiguos puntos débiles básicamente se resolvieron.

        Casi no invertí tiempo y ya cambié muchos flujos de trabajo a esto. Ahora uso tmux para abrir 5 ventanas, luego en cada ventana abro nvim en una carpeta. En nvim, a la izquierda está el árbol de directorios, en el medio el código, a la derecha opencode y la terminal.

    2.  Actualicé una versión de legion. Reduje significativamente la cantidad de texto de la skill legionmind (de 4k líneas). Actualmente, siento que necesito preocuparme menos, pero no sé si es porque recientemente he estado usando modelos más inteligentes o porque esta versión de legionmind realmente se volvió más inteligente.

    3.  Configuré un openclaw. Minimax 2.1 todavía es un poco tonto, pero como asistente personal creo que openclaw es bastante bueno, porque básicamente es un chatgpt con memoria + manos y pies (puede operar mi computadora).

    4.  Agregué la función de http-proxy a Yuan, agregué métricas, etc.

2.  Algunas reflexiones

    A veces siento que usar la IA para escribir cosas es un poco como depurar código cuyo principio no entiendo completamente, probando constantemente su comportamiento o imprimiendo registros para ayudar en la depuración, cambiando un poco aquí, agregando un poco allá, hasta obtener finalmente un resultado satisfactorio. Investiguemos el origen de esta sensación:

    Usar la IA para escribir código, en esencia, es que un humano ingresa un prompt que contiene algunas instrucciones específicas, con la esperanza de que la IA pueda comprender las instrucciones implícitas e información detrás de este prompt, y luego completar el trabajo correctamente.

    Las instrucciones que se espera transmitir a la IA se pueden estratificar: la capa superior son las instrucciones de la tarea actual. Debajo están algunas decisiones técnicas tomadas para este proyecto de software, las mejores prácticas resumidas después de sopesar pros y contras que son aplicables a partes de este proyecto. La siguiente capa es la información de fondo del dominio del problema que el proyecto pretende resolver. La siguiente capa es el conocimiento profesional de fondo del propio ingeniero de software que usa la IA, sus preferencias personales, preferencias técnicas, preferencias de estilo, experiencia histórica, acumulación de formas de pensar. La capa más baja es el conocimiento de fondo del mundo.

    En una conversación con la IA, lo que se puede hacer claro para la IA son solo las instrucciones de la tarea actual, y luego se espera que la IA tenga suficiente conocimiento de fondo sobre el mundo y la información de fondo necesaria para resolver el problema.

    Por lo tanto, se puede inferir que si el contexto de una tarea es lo suficientemente pequeño, las instrucciones dadas son extremadamente claras y no hay lastre histórico, la IA debería poder completar la tarea con alta calidad fácilmente. Si hay mucha información de fondo implícita, es fácil que produzca resultados extraños.

    Lo que Legionmind debe hacer es permitir que la IA acumule por sí misma el conocimiento de fondo y las mejores prácticas relacionados con el proyecto y el dominio del problema. Esto requiere que la IA tenga una buena capacidad de pensamiento lógico y memoria (capacidad de contexto), o que la IA posea un conocimiento de fondo del mundo abundante. Más allá de estos dos, no hay salvación.

    —

    Luego, siento que nvim es realmente un encuentro tardío.

3.  ¿Qué planeo hacer mañana?

    Mañana iré a la casa de sc a visitar su nuevo hogar, luego jugaremos juegos de mesa juntos y de paso le mostraré a sy el equipo de nieve.

### 2026-02-01

Fui a Cold Mountain para mostrarle a sy las botas de nieve. Midieron la longitud de su pie (245) y probaron un par bastante cómodo. Desafortunadamente, Cold Mountain se quedó sin su talla en los colores bonitos, así que sy tendrá que comprarlas en línea.

Almorzamos en casa de sc, comimos lo que él preparó. Tiene un dispositivo de cocción lenta a baja temperatura para filetes, y el filete que preparó estaba muy tierno. Sc nos preparó un acertijo de recorrido por la habitación. Había dos pistas en total. La primera pista requería ir a 4 lugares para encontrar 4 palabras/oraciones en inglés, y usar un cifrado de números de serie para formar una palabra: "Three". La segunda pista se obtenía de un acertijo ambiental, finalmente obteniendo los números 31/13 (no recuerdo bien) para tomar un chocolate de un cajón con muchas cajas pequeñas numeradas.

Desafortunadamente, no tenía chocolate, así que obtuvimos una linda calcomanía.

—

La sesión de juegos de mesa por la tarde fue aún más interesante. El plato fuerte fue, por supuesto, "The King's Dilemma". Finalmente, sc, interpretando a la clase media, obtuvo una victoria sin precedentes. Fue la primera vez en nuestra historia jugando este juego que la clase media gana. Pgw, interpretando a la burguesía, estaba furioso porque el ratón, interpretando al gobierno, no lo ayudó en dos votaciones cruciales de reforma política que eran muy importantes para pgw. Yo interpreté a la clase trabajadora, naturalmente no tenía muchos intereses comunes con la burguesía en la mayoría de los temas, no podía ayudar. De hecho, al final del juego, excepto pgw, los puntajes de los otros tres estábamos muy cerca. Solo el capitalista salió herido.

Este juego es realmente muy divertido y se ha convertido en mi juego de mesa favorito. Porque tiene una profundidad de juego considerable, cada uno de los cuatro jugadores tiene un estilo de juego muy diferente, y cada vez que juegas un rol diferente es una experiencia de juego completamente nueva. Por ejemplo, esta vez, la clase trabajadora que interpreté experimentó por primera vez un exceso de desempleo (porque ni el gobierno ni la burguesía querían abrir nuevas empresas), hasta el punto de cumplir las condiciones para iniciar una protesta y disturbios obreros. La clase trabajadora salió a las calles, amenazando con cambiar el cielo y la tierra del país. El efecto específico era obtener dados de influencia y deducir un total de (número de desempleados - 2 + número de sindicatos) puntos de las otras clases.

Como era de esperar, en el pasado la clase trabajadora necesitaba planear, persuadir y rogar a la burguesía y al gobierno para que abrieran nuevas empresas. Ahora competían por abrir nuevas empresas, revitalizando instantáneamente el juego. Finalmente, obtuve un alto puntaje de 101, quedando en segundo lugar en esta partida.

### 2026-02-02

Hoy después de hacer ejercicio me relajé, no hice nada.

1.  ¿Qué planeo hacer mañana?
    1.  Configurar todas las cosas relacionadas con el proxy HTTP, arreglar bien el clúster.
    2.  Configurar bien `org-mode.nvim`.
    3.  Investigar un poco sobre la estación de transferencia.

### 2026-02-05

¡Vamos a registrar mi día! Hoy cambiaré el formato para registrar.

1.  chatgpt pro

    El viernes tomé una decisión y fui al omnipotente Xianyu a comprar un chatgpt pro. Pedían 1369. Vi que era más barato que 200 USD, así que compré rápidamente. Resultó que no me lo arreglaron hasta el martes. Me dieron un correo de Outlook y una cuenta de chatgpt vinculada a este correo.

    Inicié sesión en el correo de Outlook y, ¡vaya! Había una factura de chatgpt, pagada en pesos filipinos.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Tax: ₱1070.36   |
    |                          | Total: ₱9990.00 |
    | Payment method           | Mastercard-xxxx |

    Curioso, fui a verificar el precio equivalente en CNY. ¡Resultó ser solo alrededor de 1174.54 CNY! ¡Eso significa que se embolsó casi 200 yuanes!

    Luego investigué un poco. ¡Maldita sea! Este dinero se lo ganó. Filipinas es realmente el lugar más barato del mundo para comprar el plan pro de chatgpt. Impresionante.

    Tengo un contacto confiable en Tailandia. Quería replicar su éxito, pero resulta que Tailandia es más cara. Equivale a 1537 CNY. Entonces, ¿podría ir a un lugar similar a Xianyu en, digamos, Polonia (1942 CNY) y vender membresías de chatgpt filipinas? 🤔

2.  Conclusión del http-proxy

    Finalmente resolví el asunto del http-proxy. ¡Dios mío! Fue más complejo de lo que pensaba. Esto también demuestra que la capacidad de legion para trabajar en un mismo tema a través de 8 proyectos dentro de un mono-repo está casi en su límite. Incluso me encontré con problemas donde los subagentes se cerraban abruptamente.

    Pero, por otro lado, sin legionmind, tengo la impresión de que dar instrucciones directamente a la IA no podría resolver problemas de este nivel en absoluto. Esto también indica indirectamente la capacidad única que demuestra legionmind en tales momentos.

    Finalmente, esta tarea fue resuelta por Legion mismo. Ahora básicamente puedo desvincularme de la codificación, e incluso en la mayoría de los casos solo dejar algunos comentarios de revisión en los documentos de diseño. Estoy bastante satisfecho con esta versión de legion.

3.  Iteración de Legionmind

    Hablando de legionmind.

    Esta noche actualicé legion nuevamente. Creo que fijarle un flujo de trabajo es un poco rígido. En esencia, todavía estoy haciendo que la IA trabaje dentro de mi marco. Pero la IA, especialmente las IA inteligentes: como el codex 5.2 extra high que suelo usar después de obtener chatgpt pro, en realidad lo entiende todo. Realmente no sé si mi sistema multi-agent está desperdiciando algo en este aspecto. Creo que a medida que la IA se vuelve más inteligente, dejar que diseñe su propio flujo de trabajo debería ser una forma de trabajo
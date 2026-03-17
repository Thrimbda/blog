---
title: Registro de trabajo 2026
date: 2026-01-01
---

# 2026

## 2026-01 Enero

### 2026-01-22

1.  Qué hice hoy:
    1.  Refactoricé un poco `opencode-feishu-notifier`, ahora envía notificaciones a los usuarios de una manera predeterminada.
    2.  Continué haciendo que la IA escriba `legionmind-github-bridge`. Comencé a usar el modo multi-agent de opencode, inició 5 agentes modificando 5 problemas, uno tras otro funcionó durante 2 horas, consumiendo mis 5 horas de tokens de codex.
    3.  Hoy un nodo del clúster sg murió, revisé los logs y resultó ser por intentos constantes de ataque SSH, lo cual no es bueno. Después de una investigación simple, hay varias direcciones posibles:
        - Desactivar la autenticación por contraseña
        - Cerrar el canal sshd para toda la red
        - Mover el clúster detrás de un NAT
    4.  Manejé algunos asuntos misceláneos. Zl vendrá a Suzhou la próxima semana, pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

2.  Qué pensamientos tengo:

    En esta etapa actual, solo puedo manejar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, pierdo capacidad de gestión y me canso fácilmente. Y esto es a pesar de que ya intento delegar trabajo a los AI Agent tanto como puedo. Por lo tanto, creo que debería haber dos direcciones de mejora:
    - Para tareas de codificación, debería maximizar el grado de autonomía del agente, con varios objetivos de optimización:
      1.  Que me moleste lo menos posible.
      2.  Que trabaje lo más posible.
      3.  Mejorar la confiabilidad de su trabajo tanto como sea posible.
    - Para mí mismo también necesito algunas mejoras:
      1.  Gestionar mi energía mental para no agotarme rápidamente.
      2.  Mejorar mi capacidad para trabajar simultáneamente en múltiples contextos diferentes, sin perder detalles u olvidar cosas, y necesito gestionar el progreso.

    Basándome en las reflexiones anteriores, creo que mañana puedo intentar en dos direcciones:
    1.  Diseñar una plantilla multiagent para legionmind y experimentar con ella en alguna tarea de codificación de Yuan usando opencode.
    2.  Continuar registrando el diario de trabajo y explorar un método para gestionar la energía mental y el contexto.

3.  Qué planeo hacer mañana?
    1.  Como se mencionó antes, hacer un experimento con multiagent.
    2.  Continuar con `legionmind-github-bridge`.
    3.  Si hay tiempo, trabajar en la seguridad del clúster.

    —

    En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.

### 2026-01-23

Hoy tuve un poco de resfriado, un poco de dolor de cabeza, productividad baja, pero me alegra haber comenzado a hacer resúmenes diarios.

1.  Qué hice hoy:
    1.  Con la ayuda de la IA, diseñé un sistema multi-agent. Este sistema aún no ha sido pulido sistemáticamente.
    2.  `legionmind-github-bridge` avanzó un paso más.
    3.  Modifiqué el diseño e implementación de la adquisición de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
    4.  Tomé el examen de la bolsa de futuros CFFEX para abrir una cuenta. ¡Resulta que requería tener la cámara encendida todo el tiempo, no minimizar ni cambiar de pantalla! Afortunadamente se podía intentar infinitamente, eso no me detuvo, aprobé con un alto 95%.

2.  Qué pensamientos tengo:

    Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:
    1.  `legionmind` actúa como un SOP para el trabajo de desarrollo, es una habilidad de agente (agent skill). Me gustan las agent skills.
    2.  `opencode` actúa como la entidad del agente. Uso sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
    3.  Lo que me duele un poco la cabeza ahora es cómo combinar las skills y estos subagentes.

    Me dolió la cabeza todo el día, y solo al anochecer tuve un poco de claridad. Descubrí que escribir estas reflexiones al final del día podría no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las ideas mañana por la mañana al despertar.

3.  Qué planeo hacer mañana?
    1.  Usar este sistema multi-agent para hacer algo, conectar la cuenta de inversión de gate, por ejemplo.
    2.  Continuar con `legionmind-github-bridge`.
    3.  Seguridad del clúster, si hay tiempo.
    4.  Reanudar el cronometraje del trabajo. (Importante).
    5.  Mañana los amigos de sy vendrán de visita, por lo que es posible que el tiempo de trabajo sea interrumpido.

### 2026-01-24

Hoy dormí profundamente hasta las 11, me sentí muy relajado. Hacía mucho que no dormía tan descaradamente.

1.  Qué hice hoy:
    1.  Implementé una nueva versión de `node-unit`. La razón por la que me atreví a implementarla con confianza es que tengo pruebas de extremo a extremo bastante detalladas. Específicamente, inicié un timescaledb (postgresql17) con docker, luego inicié dos `node-unit`, e inserté 21 `@yuants/portal` en la base de datos para probar, finalmente convergiendo a un estado de mitad y mitad.

        Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se inician dos node-units, se puede observar cómo adquieren los deployments por turnos. Lo que realmente falta es, por un lado, una carga de trabajo real que ocupe CPU/memoria, y por otro, un escenario donde un node-unit se desconecte por alguna razón.

    2.  Usé la nueva versión multi-agent de legionmind en Yuan para resolver el problema de la salida del flujo de la cuenta de inversión (earn) de vendor-gate. Hice que el agente primero usara legion para crear documentación, produciendo en total los siguientes documentos:

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

        Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multi-agent tiene algunos conflictos con la escritura de documentación del legionmind original. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían colocarse en skills separadas, y legionmind debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su trabajo.

        Otro problema insuficiente es que cometió un error en su primer trabajo, enviando el flujo de la cuenta a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara vendor-okx para completar la integración de la cuenta de inversión (earn). Pedí esto porque actualmente solo la cuenta earn de okx también está integrada como una `account`. Pero la IA también aprendió algunas prácticas obsoletas de ahí. El estándar actual de integración de exchange es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.

        Este conocimiento es algo que un nuevo AI Agent no posee. ¿Cómo se debe modelar este conocimiento? ¿Cómo puedo proporcionar a un AI Agent este contexto del proyecto como su cerebro externo? Esta es una pregunta que merece una reflexión profunda y necesita ser considerada cuidadosamente mañana.

    3.  Por la tarde cociné para entretener a los amigos de sy, ¡me agotó! Así que mañana seguiré trabajando.

2.  Qué pensamientos tengo:
    - Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar un cerebro externo compacto para el AI Agent. Lo más simple podría comenzar con un conjunto de documentos AGENT.md. Lo intenté antes, pero la sobrecarga de mantener estos documentos en sí es bastante alta. Distinguir entre basura y experiencia realmente valiosa para registrar es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo podría tener un bucle adicional donde el agente actualiza la memoria por sí mismo. Lo más importante sigue siendo cómo medir los resultados del trabajo del AI Agent.

    - Respecto al punto anterior, leí un artículo que me pareció muy interesante. Ahora déjame resumirlo con mis propias palabras: Primero, la evaluación de un paso de trabajo del agente se puede dividir en varias categorías:
      1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas e2e.
      2.  Evaluación con modelo: usar otro LLM para juzgar según el prompt que definamos.
      3.  Evaluación humana: Yo juzgo.

      Luego, hay dos tipos de evaluación sistemática para un sistema de Agent:
      1.  De capacidad: Responde a ¿qué puede hacer este agente? Y la tasa de aprobación puede ser muy baja, por ejemplo, quiero usar legion para ejecutar progresivamente tareas más grandes y difíciles, como explorar una nueva frontera.
      2.  De regresión: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún pueda implementarlas de manera estable.

      Entonces, cuando se introduce una nueva capacidad, debería hacer la transición del tipo de capacidad al tipo de regresión.

      El artículo también menciona dos métricas muy importantes: `pass@K` y `pass^K`
      - pass@k: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Escenarios donde solo te importa "encontrar al menos una solución utilizable".

      - pass<sup>k</sup>: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: Agentes de producción donde el usuario espera confiabilidad en cada ocasión.

      FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Mi energía todavía es un poco baja. Trabajé un poco por la tarde, cociné por la noche y me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

3.  Qué planeo hacer mañana?
    1.  Pensar en este modelo de agente de evaluación (eval agent) y seguir iterando en este sistema multi-agent.
    2.  Seguridad del clúster, definitivamente hay que hacerlo.
    3.  `legion-github-bridge`.

### 2026-01-25

Hoy fui a cortarme el pelo. Al regresar, descubrí que el sistema era inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo `terminal_id`, compitiendo entre sí y causando grandes problemas.

1.  Qué hice hoy:
    1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo legion para hacerlo. Mis operaciones fueron así:
        - Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.

          Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese tipo de CIDR, así que lo cambié a un rango que comienza con 172.21. Aquí hay un problema: es necesario apuntar el balanceador de carga existente en el recurso del clúster a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).

        - Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente en el medio: el nuevo IG no tenía permisos para S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.

        - El siguiente paso fue migrar manualmente los servicios al nuevo IG.

        - Finalmente, eliminar el IG original.

        Después de terminar, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestros servicios con límite de IP colapsaran un poco. No tuve más remedio que revertir. Definitivamente necesito implementar la capacidad de proxy HTTP antes de poder dar el siguiente paso.

    2.  El multi-agent se usó en la práctica para un script de actualización automática del valor neto de midas. Deepseek trabajó durante mucho tiempo, y me sentí bastante satisfecho. El problema central aquí es que si hay un error en el diseño temprano que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que el agente no trabaja tan rápido.

        Actualmente, estos agentes de codificación son bastante primitivos. A menudo se bloquean o salen debido a problemas de red, etc. Hacer que realicen trabajos serios de larga duración (long running) todavía tiene un nivel de servicio (SLI) un poco bajo. Esto también podría ser una oportunidad. Pensándolo brevemente, esto requiere conocimientos de ingeniería de software, alta disponibilidad, etc., para funcionar.

2.  Qué pensamientos tengo:

    Hoy tengo menos pensamientos, los he escrito en línea en las secciones anteriores.

3.  Qué planeo hacer mañana?
    1.  Diseñar el mecanismo de proxy HTTP para Yuan.
    2.  Después de la implementación, migrar el clúster nuevamente.

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción en sí, hay claramente un hilo de racionalidad que actúa como copiloto. Este hilo de racionalidad coloca una barra de control (como las de cadmio en un reactor) dentro del enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la acción de esta barra, comienzo a entender qué palabras se pueden decir y cuáles no, qué cosas se pueden hacer y cuáles no, qué decisiones se pueden tomar y cuáles no. Este es un cambio favorable que ha ocurrido en mí.

1.  Qué hice hoy:
    1.  Hoy usé legion para el diseño e implementación del proxy HTTP de yuan. Creo que fue bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente lo hiciera por su cuenta. El resultado fue bastante bueno.
    2.  También usé legion para hacer la actualización automática de midas, pero la IA lo hizo muy mal, no entendió correctamente mis requisitos, no entendió correctamente el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA no es suficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimiento/documentación no es lo suficientemente estricta.
    3.  ¡Maldita sea, me despertaron por la noche con una alerta! El host murió misteriosamente. Parece que hubo un pico en el uso de la CPU que puso al host en un estado del que no podía recuperarse por sí solo. Los logs del host son un desastre. Mi evaluación es: las alertas son útiles, los logs son una basura. ¡Anotado!

2.  Qué pensamientos tengo:
    1.  Mientras me bañaba, pensé en el punto más crucial de la colaboración actual entre la IA y yo. Uno es la disponibilidad del servicio del propio agente de IA, que no se caiga o salga mientras está funcionando. Por cierto, el bucle de ralph básicamente mejora la disponibilidad mediante reintentos brutales. El otro punto es cómo recibo la salida de la IA. Por ejemplo, incluso un subordinado que reporta a un superior necesita un PPT o, directamente, un gerente medio profesional para actuar como ese "altavoz costoso". ¿Cómo puede limitarse el reporte de la IA a los humanos a simples Markdown plano y código? ¿Podría cada elemento del reporte de la IA enlazar a un artefacto? ¿Podría haber un Citation Agent dedicado a esta parte?

        Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

    2.  Pensemos detenidamente por qué, después de tener un sistema multi-agent, este sistema se dirige firmemente hacia el desastre. En las especulaciones anteriores se mencionaron aproximadamente tres posibilidades:
        1.  El nivel de inteligencia de la IA en sí.
        2.  La revisión humana no es lo suficientemente estricta.
        3.  La base de conocimiento no es lo suficientemente detallada para proporcionar información más correcta para que la IA comience rápidamente.

        Analicemos cuidadosamente estos puntos. El punto 1 ni siquiera necesita consideración. Esforzarse en la dirección 2 ciertamente podría depender de un documento RFC cada vez más detallado para dar una dirección suficientemente correcta a los pasos posteriores. Pero este método de desarrollo es como si volviéramos al modo de desarrollo **en cascada (waterfall)**, completando el trabajo a través de un flujo lineal:

        ```text
        Análisis de requisitos -> Diseño backend -> Desarrollo backend -> Desarrollo frontend -> Pruebas de integración
        ```

        Los factores que lo forman también tienen dos niveles: el nivel técnico y el nivel organizativo y de procesos, pero el nivel organizativo y de procesos es el *factor principal*.

        El nivel técnico es que las tareas tienen dependencias naturales, por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse, y el backend debe esperar a que el producto escriba el CRD antes de poder comenzar.

        Como organización humana, el modelo de desarrollo en cascada tiene problemas: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Pero como método de colaboración entre la IA y yo, la eficiencia y los conflictos en el equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes; un día para mí es como un año para la IA. Ah, la baja eficiencia podría gastar algunos tokens más, pero este no es mi principal problema en este momento. El problema real que enfrento son los riesgos de calidad causados por errores en la comprensión de los requisitos o los hechos, y la poca flexibilidad.

        Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA con tranquilidad mientras evito que se desvíe del camino.

        Los dos puntos más cruciales son:
        1.  Alineación de intenciones.
        2.  Verificación por capas.

        Necesito pensar más a fondo en esto. Siento que necesito usarlo más, saborearlo.

    3.  Necesito estar alerta ante el lado negativo de mi estado actual de "buscar un clavo para mi martillo": dependencia del camino, producción mayor que comprensión.

3.  Qué planeo hacer mañana?

    Mañana viene zl, planeo hacer ejercicio, comer, jugar juegos de mesa.

### 2026-01-27

Zl vino, la cantidad de información fue enorme, necesito digerirla. Jugamos juegos de mesa, "Círculo de Tragedias" (惨剧循环). Pasamos tres horas entendiendo las reglas, y finalmente, en el último escenario donde interpreté al villano Dramaturgo, sentí el punto dulce del juego, terminando con mi victoria total.

### 2026-01-31

Los últimos días han sido bastante intensos, por lo que no registré nada. Pero dejar de registrar no es aceptable, así que lo retomo ahora y registro todo junto.

Además de tener muchas cosas, ¿por qué no registré?

1.  Porque tenía miedo de que registrar significara sentarme y dedicar más de 30 minutos específicamente a registrar un día. Esto se debió a que tenía cierto miedo y carga con el registro diario, lo cual es inaceptable.
2.  Normalmente solo estoy dispuesto a comenzar a registrar el día cuando realmente ha terminado, pero pensándolo bien, esto es un poco antinatural, porque ahora me acuesto básicamente en el momento en que debo hacerlo, rápidamente me meto en la cama, no porque realmente haya terminado todo lo que quería hacer (¿realmente hay algún momento así?). Esto lleva a que cuando tengo tiempo no registro, y cuando realmente debo registrar, tengo que meterme rápidamente en la cama, sumado al problema 1.

La combinación de ambos hizo que se acumulara más y más.

1.  Qué hice hoy:

    > Corrección: ¿Qué hice en los últimos días?
    1.  Bajo la recomendación de sc, comencé a usar neovim. ¿Por qué usarlo? Vi que `nvim-orgmode` parece haberse convertido realmente en un org-mode utilizable, y al mismo tiempo comencé a cansarme de emacs:
        - Actualizaciones fallidas interminables.
        - Depuración y reportes de error desconcertantes.
        - Flexibilidad que para mí solo añade carga y es inútil.
        - No entiendo emacs-lisp y no quiero entenderlo.

        Durante años he estado soportando lo anterior para usar orgmode, pero no había ningún otro lugar donde pudiera usar org-mode adecuadamente. Ahora el campo de nvim parece tener una alternativa viable, ¿por qué no probarlo?

        Como he sido usuario de vim durante muchos años, incluso en emacs usé evil-mode (vim-mode), por lo que nunca sentí que usar vim me supusiera una gran carga. En vscode e idea no puedo sobrevivir sin vim, así que usar nvim directamente no es un problema para mí.

        Dado que el obstáculo ha desaparecido, echemos un vistazo al ecosistema de nvim. Lo examiné: nvim, al no tener el lastre histórico de vimscript, usa directamente lua como su lenguaje de configuración y de plugins. Por lo tanto, puede avanzar con ligereza, y la comunidad es muy activa. Veo que ahora el sistema de plugins de neovim también ha sido unificado por un sistema llamado `lazy.vim`. El diseño del sistema de plugins y configuración de nvim debe haber sido una innovación audaz, organizada y planificada específicamente para abordar los puntos débiles originales de vim. En vim & emacs probablemente existan innumerables intentos similares de unificación, pero debido a que la comunidad está muy fragmentada, probablemente ninguno haya tenido un éxito real.

        Así que probé directamente lazyVim. ¡Vaya! Ahora sentí que tenía directamente un vscode, y este vscode puede ejecutarse en la terminal. ¿Sabes lo genial que es eso?

        Ahora tengo al poderoso Antiguo Dios basado en una nueva infraestructura, y configurarlo es extremadamente simple. La flexibilidad y conveniencia están contenidas de manera adecuada, y mis viejos puntos débiles básicamente se han resuelto.

        Casi no invertí tiempo y ya he cambiado una gran parte de mi flujo de trabajo a esto. Ahora uso tmux para abrir 5 ventanas, y en cada ventana abro nvim en una carpeta. En nvim, a la izquierda está el árbol de directorios, en el medio el código, a la derecha opencode y la terminal.

    2.  Actualicé una versión de legion. Reduje significativamente la cantidad de texto de la skill legionmind (de 4k líneas). Actualmente, siento que necesito preocuparme menos, pero no sé si es porque recientemente he estado usando modelos más inteligentes o porque esta versión de legionmind realmente se ha vuelto más inteligente.

    3.  Configuré un openclaw. Minimax 2.1 todavía es un poco tonto, pero como asistente personal creo que openclaw es bastante bueno, porque básicamente es igual a un chatgpt con memoria + manos y pies (puede operar mi computadora).

    4.  Agregué la funcionalidad de http-proxy a Yuan, agregué métricas, etc.

2.  Qué pensamientos tengo

    A veces siento que usar la IA para escribir cosas es un poco como depurar código cuyo principio no entiendo del todo, probando constantemente su comportamiento o imprimiendo logs para ayudar en la depuración, cambiando un poco aquí, agregando un poco allá, hasta obtener finalmente un resultado satisfactorio. Investiguemos el origen de esta sensación:

    Usar la IA para escribir código, en esencia, es que un humano ingresa un prompt que contiene algunas instrucciones específicas, con la esperanza de que la IA pueda comprender las instrucciones implícitas e información detrás de este prompt, y luego completar el trabajo correctamente.

    Las instrucciones que se espera transmitir a la IA se pueden estratificar: la capa superior son las instrucciones de la tarea actual. Debajo están algunas decisiones técnicas tomadas para este proyecto de software, las mejores prácticas resumidas después de sopesar pros y contras que son aplicables localmente a este proyecto. La siguiente capa es la información de fondo del dominio del problema que el proyecto pretende resolver. La siguiente capa es el conocimiento profesional de fondo de la ingeniería de software del usuario de la IA, sus preferencias personales, preferencias técnicas, preferencias de estilo, experiencia histórica, acumulación de formas de pensar. La capa más baja es el conocimiento de fondo del mundo.

    En una conversación con la IA, lo que puede quedar claro y comprensible para la IA son solo las instrucciones de la tarea actual, con la esperanza de que la IA posea suficiente conocimiento de fondo sobre el mundo y la información de fondo necesaria para resolver el problema.

    Por lo tanto, se puede deducir que si el contexto de una tarea es suficientemente pequeño, las instrucciones dadas son extremadamente claras y no hay lastre histórico, la IA debería poder completar la tarea con alta calidad fácilmente. Si hay mucha información de fondo implícita, es fácil que produzca resultados extraños.

    Lo que Legionmind pretende hacer es permitir que la IA misma acumule conocimiento de fondo y mejores prácticas relacionados con el proyecto y el dominio del problema en sí. Esto requiere que la IA tenga una buena capacidad de pensamiento lógico y memoria (capacidad de contexto), o que la IA posea un conocimiento de fondo del mundo abundante. Más allá de estos dos, no hay salvación.

    —

    Luego, creo que nvim es un amor a primera vista tardío.

3.  Qué planeo hacer mañana

    Mañana iré a la casa de sc a visitar su nuevo hogar, luego jugaremos juegos de mesa juntos, y de paso le mostraré a sy el equipo de nieve.

### 2026-02-01

Fui a Cold Mountain para que sy viera las botas de nieve. Midieron la longitud del pie (245) y probaron un par bastante cómodo. Lamentablemente, Cold Mountain se quedó sin el color bonito en su talla, así que sy tendrá que comprarlo en línea.

Almorzamos en casa de sc, comimos lo que él preparó. Tiene un dispositivo de cocción lenta a baja temperatura para filetes, y el filete que preparó estaba muy tierno. Sc nos preparó un acertijo de recorrido por la habitación (room tour). Había dos pistas en total. La primera pista requería ir a 4 lugares para encontrar 4 palabras/oraciones en inglés, y usar un cifrado de números de serie para formar una palabra: "Three". La segunda pista se obtenía de un acertijo ambiental, finalmente obteniendo los números 31 / 13 (no recuerdo bien) para poder tomar un chocolate de un cajón con muchas cajitas numeradas.

Lamentablemente, no tenía chocolate, obtuvimos una linda calcomanía.

—

La sesión de juegos de mesa por la tarde fue aún más interesante. El plato fuerte fue, por supuesto, "King's Dilemma" (领国者). Finalmente, sc, interpretando a la clase media, obtuvo una victoria sin precedentes, la primera vez que la clase media gana el juego en nuestra experiencia jugándolo. Pgw, interpretando a la clase capitalista, estaba furioso porque el ratón (小耗子), interpretando al gobierno, no lo ayudó en dos votaciones cruciales de reforma política que eran muy importantes para pgw. Yo interpreté a la clase trabajadora, naturalmente no tenía muchos intereses comunes con la clase capitalista en la mayoría de los temas, no podía ayudar. De hecho, al final del juego, excepto pgw, nuestras tres puntuaciones estaban muy cerca. Se logró un mundo donde solo el capitalista salió herido.

Este juego es realmente muy divertido y se ha convertido en mi juego de mesa favorito. Porque tiene una profundidad de juego considerable, cada uno de los cuatro jugadores tiene un estilo de juego muy diferente, y cada vez que juegas un rol diferente es una experiencia de juego completamente nueva. Por ejemplo, esta vez, la clase trabajadora que interpreté experimentó por primera vez un exceso de población desempleada (porque ni el gobierno ni la clase capitalista querían abrir nuevas empresas), hasta el punto de cumplir las condiciones para iniciar una protesta/revuelta de trabajadores. La clase trabajadora salió a las calles, amenazando con cambiar el cielo y la tierra de este país. El efecto específico era obtener dados de influencia y deducir un total de (cantidad de desempleados - 2 + cantidad de sindicatos) puntos de las otras clases.

Como era de esperar, en el pasado la clase trabajadora necesitaba planear, persuadir y suplicar a la clase capitalista y al gobierno para que abrieran nuevas empresas. Ahora competían por abrir nuevas empresas, revitalizando instantáneamente el juego. Finalmente, obtuve un alto puntaje de 101, quedando en segundo lugar en esta partida.

### 2026-02-02

Hoy después de hacer ejercicio me relajé, no hice nada.

1.  Qué planeo hacer mañana?
    1.  Poner en funcionamiento todo lo relacionado con http proxy, arreglar bien el clúster.
    2.  Configurar bien `org-mode.nvim`.
    3.  Investigar un poco sobre la estación de transferencia.

### 2026-02-05

¡Vamos a registrar mi día! Hoy usaré un formato diferente para registrar.

1.  chatgpt pro

    El viernes tomé una decisión impulsiva y fui al omnipotente Xianyu a comprar un chatgpt pro. Pedían 1369. Vi que era más barato que 200 USD, así que compré rápidamente. Resultó que no me lo configuraron hasta el martes. Me dieron un correo de Outlook y una cuenta de chatgpt vinculada a ese correo.

    Inicié sesión en el correo de Outlook y, ¡vaya! Había una factura de chatgpt, pagada en pesos filipinos.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Tax: ₱1070.36   |
    |                          | Total: ₱9990.00 |
    | Payment method           | Mastercard-xxxx |

    Curioso, fui a verificar el precio equivalente en CNY, ¡resultó ser solo alrededor de 1174.54 CNY! ¡Eso significa que se embolsó casi 200 yuanes míos!

    Luego investigué un poco, ¡caray! Ese dinero se lo ganó merecidamente. Filipinas es efectivamente el lugar más barato del mundo donde se puede comprar el plan chatgpt pro. Impresionante.

    Tengo un contacto confiable en Tailandia, pensé en replicar su éxito, pero jaja, Tailandia es más caro. Equivale a 1537 CNY. Entonces, ¿podría yo ir a un lugar similar a Xianyu en, digamos, Polonia (1942 CNY) a vender membresías de chatgpt filipinas? 🤔

2.  Conclusión de http-proxy

    Finalmente resolví el asunto de http-proxy. ¡Dios mío! Fue más complejo de lo que pensaba. Esto también demuestra que la capacidad de legion para trabajar en un mismo tema a través de 8 proyectos dentro de un mono-repo está casi en su límite. Incluso me encontré con algunos problemas donde los subagentes se cerraban abruptamente.

    Pero, por otro lado, sin legionmind, tengo la impresión de que dar instrucciones directamente a la IA no podría resolver problemas de este nivel en absoluto. Esto también indica indirectamente la capacidad única que demuestra legionmind en tales momentos.

    Finalmente, esta tarea fue resuelta por Legion mismo. Ahora básicamente puedo desvincularme de la codificación, e incluso en la mayoría de los casos solo dejar algunos comentarios de revisión en los documentos de diseño. Estoy bastante satisfecho con esta versión de legion.

3.  Iteración de Legionmind

    Hablando de legionmind.

    Esta noche actualicé
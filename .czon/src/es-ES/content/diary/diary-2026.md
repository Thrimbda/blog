---
title: Diario de trabajo 2026
date: 2026-01-01
---

# 2026

## 2026-01 Enero

### 2026-01-22

1.  Qué hice hoy:
    1.  Refactoricé un poco `opencode-feishu-notifier`. Ahora envía notificaciones a los usuarios de una manera más establecida.
    2.  Continué haciendo que la IA escriba `legionmind-github-bridge`. Comencé a usar el modo multi-agent de opencode. Inició 5 agentes modificando 5 problemas. Funcionó solo durante 2 horas, consumiendo todos mis 5 horas de tokens de codex.
    3.  Hoy murió un nodo en el clúster de sg. Miré los registros y resultó ser por intentos constantes de ataque SSH. Esto no es bueno. Después de una investigación simple, hay algunas direcciones posibles:
        - Desactivar la autenticación por contraseña.
        - Cerrar el canal sshd para toda la red pública.
        - Mover el clúster detrás de un NAT.
    4.  Manejé algunos asuntos misceláneos. Zl vendrá a Suzhou la próxima semana, pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

2.  Qué pensamientos tengo:

    En esta etapa actual, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, mi gestión se vuelve insuficiente y tiendo a fatigarme fácilmente. Y esto es a pesar de que ya intento delegar trabajo a los AI Agent en la medida de lo posible. Por lo tanto, creo que debería haber dos direcciones de mejora:
    - Para tareas de codificación, debería maximizar la autonomía del agente, con varios objetivos de optimización:
      1.  Que me moleste lo menos posible.
      2.  Que trabaje lo máximo posible.
      3.  Mejorar tanto como sea posible la confiabilidad de su trabajo.
    - También necesito mejorar yo mismo:
      1.  Gestionar mi energía mental para no fatigarme rápidamente.
      2.  Mejorar mi capacidad para trabajar simultáneamente en múltiples contextos diferentes, evitando olvidos y descuidos, y manteniendo un seguimiento del progreso.

    Basándome en las reflexiones anteriores, creo que mañana puedo intentar en dos direcciones:
    1.  Diseñar una plantilla multiagent para legionmind y experimentar con ella en alguna tarea de codificación de yuan usando opencode.
    2.  Continuar registrando el diario de trabajo, explorando un método para gestionar la energía mental y los contextos.

3.  ¿Qué planeo hacer mañana?
    1.  Como se mencionó antes, hacer un experimento con multiagent.
    2.  Continuar con `legionmind-github-bridge`.
    3.  Si hay tiempo, trabajar en la seguridad del clúster.

    —

    En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.

### 2026-01-23

Hoy tengo un poco de resfriado, un poco de dolor de cabeza, productividad baja, pero me alegra haber comenzado a hacer resúmenes diarios.

1.  Qué hice hoy:
    1.  Con la ayuda de la IA, diseñé un sistema multi-agent. Este sistema aún no ha sido pulido sistemáticamente.
    2.  `legionmind-github-bridge` avanzó un paso más.
    3.  Modifiqué el diseño e implementación de la adquisición de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
    4.  Tomé el examen para abrir una cuenta de futuros en una casa de bolsa (CFFEX). ¡Resulta que debía tener la cámara encendida todo el tiempo, sin minimizar ni cambiar de pantalla! Afortunadamente se podía intentar infinitas veces, eso no me detuvo. Aprobé con un alto 95%.

2.  Qué pensamientos tengo:

    Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:
    1.  `legionmind` actúa como un SOP para el trabajo de desarrollo. Es una habilidad de agente (agent skill). Me gustan las agent skills.
    2.  `opencode` actúa como la entidad del agente. Uso sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
    3.  Lo que me duele un poco la cabeza ahora es cómo combinar las skills y estos subagentes.

    Me dolió la cabeza todo el día, y solo al anochecer tuve un poco de claridad mental. Descubrí que escribir estas reflexiones al final del día podría no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las ideas mañana por la mañana al despertar.

3.  ¿Qué planeo hacer mañana?
    1.  Usar este sistema multi-agent para hacer algo. Conectemos la cuenta de inversión de gate.
    2.  Continuar con `legionmind-github-bridge`.
    3.  Seguridad del clúster, si hay tiempo.
    4.  Reanudar el cronometraje del trabajo (importante).
    5.  Mañana vendrán amigos de sy de visita, por lo que es posible que el tiempo de trabajo sea interrumpido.

### 2026-01-24

Hoy dormí profundamente hasta las 11 a.m., me siento muy relajado. Hace mucho tiempo que no duermo tan despreocupadamente.

1.  Qué hice hoy:
    1.  Implementé la nueva versión de `node-unit`. Me sentí más seguro al implementarla porque tengo pruebas exhaustivas de extremo a extremo. Específicamente, docker inició una timescaledb (postgresql17), luego inició dos `node-unit`, e insertó 21 `@yuants/portal` en la base de datos para probar, finalmente convergiendo a un estado de mitad y mitad.

        Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se inician dos node-units, se puede observar la adquisición alternada de deployments. Lo que realmente falta es una carga de trabajo real que ocupe CPU/memoria, y el escenario donde un node-unit se desconecta por alguna razón.

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

        Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multi-agent tiene algunos conflictos con la escritura de documentación del legionmind original. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían colocarse en skills separadas, y legionmind debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su trabajo.

        Otro problema es que cometió un error en su primer trabajo, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta earn. Pedí esto porque actualmente solo la cuenta earn de okx también está integrada como una `account`. Pero la IA también aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchange es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.

        Este conocimiento es algo que un nuevo AI Agent no posee. ¿Cómo modelar este conocimiento? ¿Cómo proporciono a un AI Agent este contexto del proyecto como su cerebro externo? Es una pregunta que merece una reflexión profunda. Necesito pensarlo detenidamente mañana.

    3.  Por la tarde cociné para recibir a los amigos de sy. ¡Me agotó! Bueno, mañana seguiré trabajando.

2.  Qué pensamientos tengo:
    - Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar un cerebro externo compacto para el AI Agent. Lo más simple podría comenzar con un conjunto de documentos AGENT.md. Lo intenté antes, pero la sobrecarga de mantener esos documentos en sí es bastante alta. Distinguir entre basura y experiencia realmente valiosa es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo tiene un circuito adicional donde el agente actualiza su propia memoria. Lo más importante sigue siendo cómo medir los resultados del trabajo del AI Agent.

    - Respecto al punto anterior, leí un artículo que me pareció muy interesante. Déjame resumirlo con mis propias palabras: Primero, la evaluación de un paso de trabajo de un agente se puede dividir en varias categorías:
      1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas de extremo a extremo.
      2.  Evaluación con modelos: usar otro LLM para juzgar según el prompt que definamos.
      3.  Evaluación humana: yo juzgo.

      Luego, hay dos tipos de evaluación sistemática para un sistema de Agentes:
      1.  **Tipo de capacidad**: Responde a "¿qué puede hacer este agente?" Y la tasa de éxito puede ser baja, por ejemplo, quiero usar legion para ejecutar progresivamente tareas más grandes y difíciles, como explorar una nueva frontera.
      2.  **Tipo de regresión**: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún se puedan implementar de manera estable.

      Entonces, cuando se introduce una nueva capacidad, debería hacer la transición del tipo de capacidad al tipo de regresión.

      El artículo también menciona dos métricas importantes: `pass@K` y `pass^K`
      - `pass@k`: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Escenarios donde solo te importa "encontrar al menos una solución utilizable".
      - `pass<sup>k</sup>`: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: Escenarios donde el usuario espera un agente de producción confiable cada vez.

      FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Mi energía todavía es un poco baja. Trabajé un poco por la tarde, cociné por la noche y ya me siento un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

3.  ¿Qué planeo hacer mañana?
    1.  Pensar en este modelo de agente de evaluación, continuar iterando este sistema multi-agent.
    2.  Seguridad del clúster, definitivamente hay que hacerlo.
    3.  `legion-github-bridge`.

### 2026-01-25

Hoy fui a cortarme el cabello. Cuando regresé, descubrí que el sistema era inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo `terminal<sub>id</sub>`, compitiendo entre sí y causando grandes problemas.

1.  Qué hice hoy:
    1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo legion para completar esta tarea. Mi operación fue así:
        - Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.

          Originalmente planeaba usar un rango que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese CIDR, así que lo cambié al rango 172.21. Aquí hay un problema: necesitaba apuntar el balanceador de carga existente en el recurso del clúster a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).

        - Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente: el nuevo IG no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.

        - El siguiente paso fue migrar manualmente los servicios al nuevo IG.

        - Finalmente, eliminar el IG original.

        Después de terminar, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestro servicio con límite de IPs colapsara un poco. No tuve más remedio que revertir. Debo implementar la habilidad de proxy HTTP antes de poder continuar.

    2.  El multi-agent se usó en la práctica para un script de actualización automática del valor neto de midas. Deepseek trabajó arduamente durante mucho tiempo, y me sentí bastante satisfecho. El problema central aquí es que si hay un error en el diseño inicial que no detecto, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que el agente no trabaja tan rápido.

        Actualmente, estos agentes de codificación son bastante primitivos. A menudo se bloquean o salen debido a problemas de red, etc. Hacer que realicen trabajos serios de larga duración todavía tiene un SLI (Service Level Indicator) un poco deficiente. Esto también podría ser una oportunidad. Pensándolo simplemente, se necesita algo de conocimiento de ingeniería de software y alta disponibilidad para que funcione.

2.  Qué pensamientos tengo:

    Hoy tengo menos ideas, las escribí en línea en las secciones anteriores.

3.  ¿Qué planeo hacer mañana?
    1.  Diseñar el mecanismo de proxy HTTP para Yuan.
    2.  Después de la implementación, migrar el clúster nuevamente.

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones mejoró notablemente. Es como si, fuera de la emoción, hubiera una pizca de razón haciendo de copiloto. Esta pizca de razón coloca una barra de control en el enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la acción de esta barra, comencé a entender qué palabras se pueden decir, cuáles no, qué cosas se pueden hacer, cuáles no, qué decisiones se pueden tomar, cuáles no. Este es un cambio favorable que ocurrió en mí.

1.  Qué hice hoy:
    1.  Hoy usé legion para el diseño e implementación del proxy HTTP de Yuan. Me pareció bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente lo intentara por su cuenta. El resultado fue bastante bueno.
    2.  También usé legion para la actualización automática de midas, pero la IA lo hizo muy mal, no entendió correctamente mis requisitos ni el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA es insuficiente (deepseek puede parecer poco inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimientos/documentación no es lo suficientemente estricta.
    3.  ¡Maldita sea, me despertaron las alertas por la noche! El host murió misteriosamente. Parece que hubo un pico de uso de CPU que puso al host en un estado del que no podía recuperarse por sí solo. Los registros del host son un desastre. Mi evaluación: las alertas son útiles, los registros son una basura. ¡Lo anoto!

2.  Qué pensamientos tengo:
    1.  Mientras me bañaba, pensé en el punto más crucial de mi colaboración actual con la IA. Uno es la disponibilidad del servicio del propio agente de IA, que no se caiga o salga mientras corre. Por cierto, el bucle de ralph básicamente mejora la disponibilidad mediante reintentos brutales. Otro punto es cómo recibo la salida de la IA. Por ejemplo, un subordinado que reporta a un superior aún necesita un PPT o, directamente, un gerente medio profesional para actuar como este "transmisor costoso". ¿Cómo puede limitarse el reporte de la IA a los humanos a simples Markdown y código plano? ¿Podría cada elemento del reporte de la IA enlazar a un artefacto? ¿Podría haber un "Citation Agent" encargado específicamente de esta parte?

        Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

    2.  Pensemos detenidamente por qué, después de tener un sistema multi-agent, este sistema se dirige firmemente hacia el desastre. En las conjeturas anteriores, básicamente se mencionaron tres posibilidades:
        1.  El nivel de inteligencia de la IA en sí.
        2.  La revisión humana no es lo suficientemente estricta.
        3.  La base de conocimientos no es lo suficientemente detallada para proporcionar información más correcta para que la IA comience rápidamente.

        Analicemos estos puntos cuidadosamente. El punto 1 ni siquiera necesita consideración. Esforzarse en la dirección 2 ciertamente podría depender de un documento RFC cada vez más detallado para dar una dirección suficientemente correcta a los pasos posteriores. Pero este método de desarrollo es como si volviéramos al modo de desarrollo **en cascada**, completando el trabajo a través de un flujo lineal:

        ```text
        Análisis de requisitos -> Diseño backend -> Desarrollo backend -> Desarrollo frontend -> Pruebas de integración
        ```

        Los factores que lo forman también tienen dos niveles: técnico y organizacional/de procesos, pero el nivel organizacional/de procesos es el *factor principal*.

        El nivel técnico es que las tareas tienen dependencias naturales, por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse, y el backend debe esperar a que el producto escriba el CRD antes de poder comenzar.

        Como organización humana, el modelo de desarrollo en cascada tiene problemas: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Como método de colaboración entre la IA y yo, la eficiencia y los conflictos en el equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes. Un día para mí es como un año para la IA. Bueno, la baja eficiencia puede desperdiciar algunos tokens, pero ese no es mi principal problema en este momento. En realidad, enfrento riesgos de calidad debido a malentendidos en los requisitos o hechos, y la flexibilidad también es pobre.

        Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA mientras evito que se desvíe del camino.

        Los dos puntos más cruciales:
        1.  Alineación de intenciones.
        2.  Validación por capas.

        Necesito pensar más a fondo en esto. Siento que necesito usarlo más, saborearlo.

    3.  Necesito estar alerta al lado negativo de mi estado actual de "buscar clavos con un martillo": dependencia del camino, producción mayor que la comprensión.

3.  ¿Qué planeo hacer mañana?

    Mañana viene zl, planeo hacer ejercicio, comer, jugar juegos de mesa.

### 2026-01-27

Zl vino, mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loop". Pasamos tres horas entendiendo las reglas, y finalmente, en el último escenario donde yo interpretaba al dramaturgo villano, sentí el punto dulce del juego. Terminé con mi victoria total.

### 2026-01-31

Los últimos días han sido bastante intensos, así que no registré nada. Pero dejar de registrar no es aceptable, así que lo retomo ahora y registro todo junto.

Además de tener muchas cosas, ¿por qué no registré?

1.  Porque tenía miedo de que registrar significara sentarme y dedicar más de 30 minutos específicamente a registrar un día. Esto se debía a que tenía cierto miedo y carga respecto a registrar la rutina diaria, lo cual es inaceptable.
2.  Normalmente solo estoy dispuesto a comenzar a registrar el día cuando realmente termina, pero pensándolo bien, esto es un poco antinatural, porque ahora me acuesto básicamente cuando es hora de dormir, rápidamente me meto en la cama, no porque realmente haya terminado todo lo que quería hacer (¿realmente habrá tal momento?). Esto lleva a que, cuando tengo tiempo, no registro, y cuando realmente debería registrar, debo meterme rápidamente en la cama, sumado al problema 1.

La combinación de ambos hace que se acumule más y más.

1.  Qué hice hoy:

    > Corrección: ¿Qué hice en los últimos días?
    1.  Bajo la recomendación de sc, comencé a usar neovim. ¿Por qué usarlo? Vi que `nvim-orgmode` parece haberse convertido realmente en un org-mode utilizable, y al mismo tiempo comencé a sentirme cansado de emacs:
        - Actualizaciones fallidas interminables.
        - Depuración y reportes de errores desconcertantes.
        - Flexibilidad que para mí solo agrega carga y es inútil.
        - No entiendo emacs-lisp ni quiero entenderlo.

        Durante años, para usar orgmode, he estado soportando lo anterior, pero no había ningún otro lugar donde pudiera usar org-mode correctamente. Ahora, el campo de nvim parece tener una alternativa viable, ¿por qué no probarlo?

        Como he sido usuario de vim durante años, incluso en emacs usé evil-mode (vim-mode), por lo que nunca sentí que usar vim fuera una gran carga. En vscode e idea, sin vim no puedo sobrevivir, así que usar nvim directamente no es un problema para mí.

        Dado que el obstáculo ya no existe, echemos un vistazo al ecosistema de nvim. Lo examiné, nvim, sin el lastre histórico de vimscript, usa directamente lua como su lenguaje de configuración y de plugins. Por lo tanto, puede avanzar con ligereza, y la comunidad también es muy activa. Veo que ahora el sistema de plugins de neovim también ha sido unificado por un sistema llamado `lazy.vim`. El diseño del sistema de plugins y configuración de nvim debe haber sido una innovación audaz y planificada específicamente para los puntos débiles originales de vim. En vim & emacs probablemente hubo innumerables intentos similares de unificación, pero debido a que la comunidad está muy dispersa, probablemente ninguno tuvo un éxito real.

        Así que probé directamente lazyVim. ¡Vaya! Ahora siento que tengo directamente un vscode, y este vscode puede ejecutarse en la terminal. ¿Sabes lo genial que es eso?

        Ahora tengo al poderoso Antiguo Dios basado en una nueva infraestructura, y es extremadamente simple de configurar. La flexibilidad y la conveniencia están contenidas de manera adecuada. Mis antiguos puntos débiles básicamente se han resuelto.

        Casi no me tomó tiempo cambiar muchos de mis flujos de trabajo a esto. Ahora uso tmux para abrir 5 ventanas, luego en cada ventana abro nvim en una carpeta. En nvim, a la izquierda está el árbol de directorios, en el medio el código, a la derecha opencode y la terminal.

    2.  Actualicé una versión de legion. Reduje significativamente la cantidad de texto de la skill legionmind (de 4k líneas a menos). Actualmente, siento que necesito preocuparme menos, pero no sé si es porque recientemente he estado usando modelos más inteligentes o porque esta versión de legionmind realmente se volvió más inteligente.

    3.  Configuré un openclaw. Minimax 2.1 todavía es un poco tonto, pero como asistente personal, creo que openclaw es bastante bueno, porque básicamente es igual a un chatgpt con memoria + manos y pies (puede operar mi computadora).

    4.  Agregué la función de http-proxy a Yuan, agregué métricas, etc.

2.  Qué pensamientos tengo

    A veces siento que usar la IA para escribir cosas es un poco como depurar código cuyo principio no entiendo completamente, probando constantemente su comportamiento o imprimiendo logs para ayudar en la depuración, cambiando un poco aquí, agregando un poco allá, hasta obtener finalmente un resultado satisfactorio. Investiguemos el origen de esta sensación:

    Usar la IA para escribir código, en esencia, es que un humano ingresa un prompt que contiene algunas instrucciones específicas, con la esperanza de que la IA pueda comprender las instrucciones implícitas e información detrás de este prompt, y luego completar el trabajo correctamente.

    Las instrucciones que se espera transmitir a la IA se pueden estratificar: el nivel superior son las instrucciones de la tarea actual. Debajo están algunas decisiones técnicas tomadas para este proyecto de software, las mejores prácticas resumidas después de sopesar pros y contras que son aplicables a partes de este proyecto. El siguiente nivel es la información de fondo del dominio del problema que el proyecto busca resolver. El siguiente nivel es el conocimiento profesional de fondo del propio ingeniero de software que usa la IA, sus preferencias personales, preferencias técnicas, preferencias de estilo, experiencia histórica, acumulación de formas de pensar. El nivel más bajo es el conocimiento de fondo de este mundo.

    En una conversación con la IA, lo que se puede hacer claro y comprensible para la IA son solo las instrucciones de la tarea actual, y luego se espera que la IA tenga suficiente conocimiento de fondo sobre el mundo y la información de fondo necesaria para resolver el problema.

    Por lo tanto, se puede deducir que si el contexto de una tarea es lo suficientemente pequeño, las instrucciones dadas son extremadamente claras y no hay lastre histórico, la IA debería poder completar la tarea con alta calidad fácilmente. Si hay mucha información de fondo implícita, es fácil que produzca algunos trabajos inexplicables.

    Lo que Legionmind debe hacer es permitir que la IA misma acumule conocimiento de fondo y mejores prácticas relacionados con el proyecto y el dominio del problema en sí. Esto requiere que la IA tenga una buena capacidad de pensamiento lógico y memoria (capacidad de contexto), o que la IA misma tenga un conocimiento de fondo del mundo abundante. Más allá de estos dos, no se puede salvar.

    —

    Luego, siento que nvim es un amor a primera vista tardío.

3.  ¿Qué planeo hacer mañana?

    Mañana iré a la casa de sc a visitar su nuevo hogar, luego jugaremos juegos de mesa juntos, y de paso le mostraré a sy el equipo de snowboard.

### 2026-02-01

Fui a Cold Mountain para que sy viera las botas de snowboard. Midieron la longitud del pie (245) y probaron un par bastante cómodo. Desafortunadamente, Cold Mountain se quedó sin tallas en los colores bonitos, así que sy tendrá que comprarlas en línea.

Almorzamos en casa de sc, él cocinó. Tiene un dispositivo de cocción lenta a baja temperatura para filetes, y el filete que preparó estaba muy tierno. Sc nos preparó un acertijo de recorrido por la habitación. Había dos pistas en total. La primera pista requería ir a 4 lugares para encontrar 4 palabras/oraciones en inglés, y luego usar un código numérico para formar una palabra: "Three". La segunda pista se obtenía de un acertijo ambiental, finalmente obteniendo los números 31/13 (no recuerdo bien), lo que permitía tomar un chocolate de un cajón con muchas cajas pequeñas numeradas.

Desafortunadamente, no tenía chocolate, obtuvimos una linda calcomanía.

—

La sesión de juegos de mesa por la tarde fue aún más interesante. El plato fuerte fue, por supuesto, "The King's Dilemma". Finalmente, sc, interpretando a la clase media, obtuvo una victoria sin precedentes. Fue la primera vez que la clase media ganaba el juego desde que lo jugamos. Pgw, interpretando a la burguesía, estaba furioso porque el ratón, interpretando al gobierno, no lo ayudó en dos votaciones cruciales de reforma política que eran muy importantes para pgw. Yo interpreté a la clase trabajadora, naturalmente no tenía muchos intereses comunes con la burguesía en la mayoría de los temas, no podía ayudar. De hecho, al final del juego, excepto pgw, los puntajes de los otros tres estábamos muy cerca. Solo el capitalista salió herido.

Este juego es realmente muy divertido y se ha convertido en mi juego de mesa favorito. Porque tiene una profundidad de juego considerable, cada uno de los cuatro jugadores tiene un estilo de juego muy diferente, y cada vez que juegas un rol diferente es una experiencia de juego completamente nueva. Por ejemplo, esta vez, la clase trabajadora que interpreté experimentó por primera vez un exceso de desempleo (porque ni el gobierno ni la burguesía querían abrir nuevas empresas), hasta el punto de cumplir las condiciones para iniciar una protesta y disturbios obreros. La clase trabajadora salió a las calles, amenazando con cambiar el cielo y la tierra de este país. El efecto específico era obtener dados de influencia y deducir un total de (cantidad de desempleados - 2 + cantidad de sindicatos) puntos de las otras clases.

Como era de esperar, en el pasado, la clase trabajadora necesitaba calcular, persuadir y suplicar a la burguesía y al gobierno para que abrieran nuevas empresas. Ahora competían por abrir nuevas empresas, revitalizando instantáneamente el juego. Finalmente, obtuve un alto puntaje de 101, quedando en segundo lugar en esta partida.

### 2026-02-02

Hoy, después de hacer ejercicio, me relajé y no hice nada.

1.  ¿Qué planeo hacer mañana?
    1.  Configurar todas las cosas relacionadas con el proxy HTTP, arreglar bien el clúster.
    2.  Configurar bien `org-mode.nvim`.
    3.  Investigar un poco sobre la estación de transferencia.

### 2026-02-05

¡Vamos a registrar mi día! Hoy usaré un formato diferente para registrar.

1.  chatgpt pro

    El viernes, decidí comprar un chatgpt pro en el omnipotente Xianyu. Costaba 1369, vi que era más barato que 200 USD, así que lo compré rápidamente. Resultó que no estuvo listo hasta el martes. Me dio un correo de Outlook y una cuenta de chatgpt vinculada a este correo.

    Inicié sesión en el correo de Outlook y, ¡vaya! Había una factura de chatgpt, pagada en pesos filipinos.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Tax: ₱1070.36   |
    |                          | Total: ₱9990.00 |
    | Payment method           | Mastercard-xxxx |

    Curioso, fui a verificar el precio equivalente en CNY, ¡resultó ser solo alrededor de 1174.54 CNY! ¡Eso significa que se embolsó casi 200 yuanes!

    Luego investigué un poco, ¡caray! Este dinero se lo ganó. Filipinas es efectivamente el lugar más barato del mundo donde se puede comprar el plan pro de chatgpt. Impresionante.

    Tengo un contacto confiable en Tailandia, quise replicar su éxito, pero, ja, Tailandia es más caro. Equivale a 1537 CNY. ¿Podría yo, por ejemplo, vender membresías de chatgpt filipinas en un lugar similar a Xianyu en Polonia (1942 CNY)? 🤔

2.  Conclusión del http-proxy

    Finalmente resolví el asunto del http-proxy. ¡Dios mío! Fue más complejo de lo que pensaba. Esto también demuestra que la capacidad de legion para trabajar en un mismo tema a través de 8 proyectos dentro de un mono-repo está casi en su límite. Incluso me encontré con algunos problemas de caída de subagentes.

    Pero, por otro lado, sin legionmind, tengo la impresión de que dar instrucciones directamente a la IA no podría resolver problemas de este nivel en absoluto. Esto también indica indirectamente la capacidad única que demuestra legionmind en tales momentos.

    Finalmente, esta tarea fue resuelta por Legion mismo. Ahora básicamente puedo desvincularme de la codificación, e incluso en la mayoría de los casos, solo dejar algunos comentarios de revisión en los documentos de diseño. Estoy bastante satisfecho con esta versión de legion.

3.  Iteración de Legionmind

    Hablando de legionmind.

    Esta noche actualicé legion nuevamente. Siento que fijarle un flujo de trabajo es un poco rígido, esencialmente todavía hago que la IA trabaje dentro de mi marco. Pero la IA, especialmente las IA inteligentes: como codex 5.2 extra high que suelo usar después de obtener chatgpt pro, en realidad lo entiende todo. Realmente no sé si mi sistema multi-agent está desperdiciando algo en este aspecto. Creo que a medida que la IA se vuelve más inteligente, dejar que diseñe su propio flujo de trabajo deber
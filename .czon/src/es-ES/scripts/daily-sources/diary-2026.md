---
title: Registro de trabajo 2026
date: 2026-01-01
---

# 2026

## 2026-01 Enero

### 2026-01-22

1.  Qué hice hoy:
    1.  Reestructuré opencode-feishu-notifier; ahora envía notificaciones a los usuarios de una manera predefinida.
    2.  Continué haciendo que la IA escriba legionmind-github-bridge. Empecé a usar el modo multi-agente de opencode, que lanzó 5 agentes para modificar 5 problemas. Estuvo funcionando durante 2 horas seguidas y consumió por completo mis 5 horas de tokens de Codex.
    3.  Hoy un nodo del clúster SG murió. Revisando los registros, descubrí que estaba siendo atacado constantemente con intentos de SSH. Esto no es bueno. Tras un análisis rápido, hay varias direcciones posibles:
        - Desactivar la autenticación por contraseña.
        - Cerrar el canal SSH para toda la red.
        - Mover el clúster detrás de un NAT.
    4.  Me ocupé de algunos asuntos varios. ZL viene a Suzhou la próxima semana. Dediqué tiempo a hacer algunos arreglos, pero no salieron bien. No pienso invertir más energía en esto.

2.  ¿Alguna idea?

    En esta etapa, solo puedo gestionar 2 o 3 cosas simultáneamente, incluyendo trabajo de desarrollo, planes diarios, reflexión y producción. Más allá de eso, mi capacidad de gestión se desborda y me canso fácilmente. Esto ocurre incluso habiendo delegado la mayor parte del trabajo a agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:
    - Para las tareas de codificación, debo aumentar lo más posible el grado de autonomía del agente. Hay varios objetivos de optimización:
      1.  Que me moleste lo menos posible.
      2.  Que trabaje lo máximo posible.
      3.  Maximizar la fiabilidad de su trabajo.
    - Para mí mismo, también necesito mejorar:
      1.  Gestionar mi energía mental para no fatigarme rápidamente.
      2.  Mejorar la capacidad de trabajar en múltiples contextos simultáneamente, sin perder cosas ni olvidar, y tener una gestión del progreso.

    Basándome en estas reflexiones, creo que mañana podría intentar dos direcciones:
    1.  Diseñar una plantilla multi-agente para legionmind, experimentando con una tarea de codificación en Yuan mediante opencode.
    2.  Seguir registrando el diario de trabajo, buscando un método para gestionar la energía mental y el contexto.

3.  ¿Qué planeas hacer mañana?
    1.  Como se dijo antes, hacer un experimento con multi-agente.
    2.  Continuar con legionmind-github-bridge.
    3.  Si tengo tiempo, ocuparme de la seguridad del clúster.

    —

    En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.

### 2026-01-23

Hoy estoy un poco resfriado, con dolor de cabeza y baja productividad, pero me alegra haber empezado a hacer resúmenes diarios.

1.  Qué hice hoy:
    1.  Con la ayuda de la IA, diseñé un sistema multi-agente que aún no ha sido pulido sistemáticamente.
    2.  legionmind-github-bridge avanzó un paso más.
    3.  Modifiqué el diseño y la implementación de la prevención (preemption) de node-unit. Antes, cuando un node-unit fallaba, todas sus implementaciones (deployments) se eliminaban; ahora se limpian una por una.
    4.  Fui a hacer el examen de la CFFEX (Bolsa de Futuros de China) para abrir una cuenta de corredor de futuros. Resultó que debía tener la cámara encendida todo el tiempo, sin minimizar ni cambiar de pantalla. Por suerte se puede intentar infinitas veces, eso no me asusta. Aprobé con 95 puntos.

2.  ¿Alguna idea?

    Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente mi flujo de trabajo es:
    1.  legionmind actúa como un SOP (procedimiento operativo estándar) para el trabajo de desarrollo; es una habilidad de agente (agent skill), y me gustan las agent skills.
    2.  opencode es la entidad del agente. Utilizo sus capacidades de bash, tool calling, langraph, command, subagent, etc. Si algún día tengo que abandonar opencode, estas serán mi lista de tareas pendientes.
    3.  Ahora me duele la cabeza pensar en cómo combinar las habilidades y estos subagentes.

    Estuve con dolor de cabeza todo el día, y solo al anochecer sentí algo de claridad. Me di cuenta de que escribir estas ideas al final del día quizá no sea un buen método; tal vez debería solo registrar los hechos, y luego resumir las ideas al despertar al día siguiente.

3.  ¿Qué planeas hacer mañana?
    1.  Usar este sistema multi-agente para hacer algo, tal vez conectar la cuenta de gestión patrimonial de gate.
    2.  Continuar con legionmind-github-bridge.
    3.  Seguridad del clúster, si hay tiempo.
    4.  Reanudar el cronometraje del trabajo (importante).
    5.  Mañana vienen los amigos de SY de visita, por lo que el tiempo de trabajo podría verse afectado.

### 2026-01-24

Hoy dormí hasta las 11, me sentí muy aliviado. Hacía mucho que no dormía tan a gusto.

1.  Qué hice hoy:
    1.  Publiqué una nueva versión de node-unit. La razón por la que me atrevo a ponerla en producción con confianza es que tengo pruebas exhaustivas de extremo a extremo. Específicamente, inicié un TimescaleDB (PostgreSQL 17) en Docker, luego inicié dos node-units e inserté 21 `@yuants/portal` en la base de datos para probar, y al final convergieron en un estado de 50/50.

        Esta prueba básicamente puede verificar que cuando aparecen un montón de implementaciones sin propietario y se inician dos node-units, se puede observar cómo se turnan para tomar las implementaciones. Si falta algo, sería una carga de trabajo real que ocupe CPU/memoria, y un escenario donde un node-unit se desconecte por alguna razón.

    2.  Usando la nueva versión multi-agente de legionmind en Yuan, resolví el problema de la salida del flujo de cuentas de la cuenta de ganancias (earn) del proveedor gate. Le pedí al agente que primero usara legion para crear documentación, generando los siguientes documentos:

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

        Parece un flujo de trabajo decente. Pero mi nuevo sistema multi-agente tiene algunos conflictos con la redacción de documentación del legionmind original. Debería considerar cuidadosamente los límites de cada cosa, por ejemplo, las reglas sobre cómo escribir cada tipo de documento deberían colocarse en habilidades separadas, y legionmind debería ser una descripción del flujo de trabajo. Cada agente debería poder cargar varias habilidades pequeñas que le ayuden a completar su trabajo.

        También hay un problema: la primera vez que trabajó, cometió un error al escribir el flujo de cuentas en `=account-actions-with-credential.ts=`. Esto se debió a que le pedí que se refiriera a vendor-okx para integrar la cuenta de ganancias, porque actualmente solo la cuenta de ganancias de OKX también está integrada como cuenta. Pero la IA también aprendió algunas prácticas obsoletas. El estándar actual de integración de intercambios es publicar todas las cuentas mediante `=provideExchangeServices=`, no usando `=provideAccountActionsWithCredential=` para integrar cuentas.

        Estos conocimientos no los posee un nuevo agente de IA. ¿Cómo modelar este conocimiento? ¿Cómo puedo proporcionar a los agentes de IA ese contexto del proyecto como un "cerebro externo"? Es una cuestión que merece una reflexión profunda, que debo abordar mañana.

    3.  Por la tarde cociné para recibir a los amigos de SY. ¡Me agotó! Mañana seguiré trabajando.

2.  ¿Alguna idea?
    - Como se mencionó, necesito considerar cuidadosamente cómo diseñar de manera compacta un cerebro externo para los agentes de IA. Lo más simple podría ser comenzar con un conjunto de archivos AGENT.md. Ya lo he intentado antes, pero mantener estos documentos también tiene un overhead considerable. Distinguir entre la basura y la experiencia que realmente merece ser registrada es un problema difícil. Por ahora, la memoria es como cualquier otro prompt, solo que quizás el agente tiene un bucle para actualizar su memoria. Lo más importante es cómo medir los resultados del trabajo del agente.

    - Sobre el punto anterior, vi un artículo que me pareció interesante. Permíteme resumirlo con mis palabras: Primero, la evaluación del trabajo de un agente en un paso se puede dividir en varias categorías:
      1.  Evaluación de herramientas estáticas: compilador, linter, pruebas unitarias, pruebas e2e.
      2.  Evaluación del modelo: usar otro LLM para juzgar según nuestro prompt definido.
      3.  Evaluación humana: yo mismo juzgo.

      Luego, la evaluación sistémica de un agente se divide en dos tipos:
      1.  Tipo de capacidad: responde a ¿qué puede hacer este agente? Y podría tener una tasa de aprobación muy baja, por ejemplo, quiero usar legion para ejecutar tareas cada vez más grandes y difíciles, como explorar un nuevo límite.
      2.  Tipo de regresión: ¿todavía conserva las habilidades que antes tenía? Por ejemplo, probar repetidamente algunas tareas para asegurar que aún se pueden lograr de manera estable.

      Así que cuando se introduce una nueva capacidad, se debe pasar de ser del tipo de capacidad a ser del tipo de regresión.

      El artículo también menciona dos métricas importantes: `pass@K` y `pass^K`
      - pass@k: al menos un éxito en k intentos. Cuantos más intentos, mayor probabilidad de al menos un éxito. Aplicación: solo te importa "encontrar al menos una solución utilizable".
      - pass<sup>k</sup>: los k intentos deben ser todos exitosos. Cuantos más intentos, más difícil mantener la consistencia. Aplicación: los usuarios esperan agentes de producción fiables cada vez.

      FYI: [Consulta este artículo](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Mi energía sigue siendo baja. Trabajé un rato por la tarde, cociné por la noche y me sentí cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

3.  ¿Qué planeas hacer mañana?
    1.  Reflexionar sobre el modelo de evaluación del agente y seguir iterando el sistema multi-agente.
    2.  Seguridad del clúster, tengo que hacerlo.
    3.  legion-github-bridge.

### 2026-01-25

Hoy fui a cortarme el pelo. Al volver, el sistema se volvió inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo `terminal_id`, compitiendo entre sí y causando grandes problemas.

1.  Qué hice hoy:
    1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo legion. Mi operación fue:
        - Primero modifiqué el clúster de kops, creé una nueva VPC usando los rangos 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico de salida.

          Originalmente planeaba usar el rango 10.0, pero al intentarlo descubrí que AWS no permite crear ese CIDR, así que lo cambié a 172.21. Hay una trampa: en el recurso del clúster, el balanceador de carga debe apuntar a la VPC correspondiente (originalmente estaba implícito por defecto, ahora que hay un CIDR adicional hay que especificarlo manualmente).

        - Luego creé un nuevo grupo de instancias (instance group) apuntando a la nueva VPC. Hubo un pequeño contratiempo: el nuevo grupo no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster correctamente.

        - El siguiente paso fue migrar manualmente los servicios al nuevo grupo de instancias.

        - Finalmente, eliminé el antiguo grupo de instancias.

        Después de todo, descubrí que el tráfico de salida del clúster tenía solo una IP, lo que causó problemas con los servicios que limitan por IP. No tuve más remedio que revertir. Primero debo desarrollar la habilidad de un proxy HTTP antes de continuar.

    2.  El sistema multi-agente se utilizó para implementar un script que actualiza automáticamente el valor neto de Midas. Deepseek estuvo escribiendo durante mucho tiempo, pero quedé bastante satisfecho. Hay un problema central: si hay un error en el diseño inicial que no detecto, me espera un enorme gasto de tokens y tiempo, porque el agente no trabaja tan rápido.

        Estos agentes de codificación son aún bastante primitivos; a menudo fallan y se cierran debido a problemas de red, etc. Para tareas serias de larga duración, sus SLI (indicadores de nivel de servicio) son deficientes. Esto podría ser una oportunidad: a simple vista, se necesita aplicar conocimientos de ingeniería de software de alta disponibilidad para que funcionen.

2.  ¿Alguna idea?

    Hoy tengo pocas ideas, todas están integradas en las secciones anteriores.

3.  ¿Qué planeas hacer mañana?
    1.  Diseñar el mecanismo de proxy HTTP para Yuan.
    2.  Después de la implementación, volver a migrar el clúster.

### 2026-01-26

Hoy fue un día de contención. Descubrí que después de los 25 años, he mejorado notablemente en el manejo de las emociones: junto a la emoción, siempre hay un hilo de razón que actúa como copiloto. Ese hilo de razón es como una barra de cadmio en el gran reactor de las emociones. Sin esa barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría tener consecuencias irreparables. Con esa barra, empiezo a comprender qué palabras decir y cuáles no, qué acciones emprender y cuáles evitar, qué decisiones tomar y cuáles no. Es un cambio positivo en mí.

1.  Qué hice hoy:
    1.  Hoy usé legion para diseñar e implementar el proxy HTTP de Yuan. La experiencia fue bastante fluida. Revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente hiciera lo suyo. El resultado fue bastante bueno.
    2.  También usé legion para una actualización automática de Midas, pero la IA lo hizo bastante mal; no logró entender correctamente mis necesidades ni el uso de `@yuants/protocol`. Sospecho varias direcciones: la inteligencia de la IA es insuficiente (DeepSeek parece no ser muy inteligente); mi revisión no fue lo suficientemente rigurosa; o la base de conocimientos documental no es lo suficientemente estricta.
    3.  Por la noche, me despertaron las alarmas. El host se cayó misteriosamente. Parece que hubo un pico de uso de CPU que llevó al host a un estado del que no pudo recuperarse por sí mismo. Los registros del host son un desastre. Mi evaluación: las alarmas son útiles, los registros son una basura. ¡Anótalo!

2.  ¿Alguna idea?
    1.  Mientras me duchaba, pensé en los puntos clave de mi colaboración actual con la IA. Uno es la disponibilidad del servicio del agente de IA, que no se caiga mientras está ejecutándose; menciono de paso que el bucle de Ralph básicamente mejora la disponibilidad mediante reintentos constantes y burdos. Otro punto es cómo recibo la salida de la IA. Por ejemplo, un subordinado que reporta a un superior necesita al menos un PowerPoint o un gerente intermedio profesional que actúe como un "costoso transmisor". ¿Cómo puede el informe de la IA limitarse a texto plano en Markdown y código? ¿Podría cada punto del informe de la IA estar vinculado a un artefacto? ¿Podría haber un Agente de Citación dedicado a esa parte?

        Pero por ahora, mi uso de la IA se limita a tareas de codificación.

    2.  Reflexiono profundamente sobre por qué, a pesar de tener un sistema multi-agente, este sistema se encamina firmemente hacia el desastre. En las conjeturas anteriores, mencioné tres posibilidades:
        1.  El nivel de inteligencia de la propia IA.
        2.  La revisión humana no es lo suficientemente rigurosa.
        3.  La base de conocimientos no es lo suficientemente detallada para proporcionar información más correcta que permita a la IA arrancar rápidamente.

        Analicemos estos puntos. El punto 1 no necesita más reflexión. Esforzarse en la dirección 2 puede depender de un documento RFC cada vez más detallado para dar dirección suficiente a los pasos siguientes. Pero esta forma de desarrollo parece un retorno al modelo de **cascada**, completando el trabajo mediante un flujo lineal:

        ```text
        Análisis de requisitos -> Diseño backend -> Desarrollo backend -> Desarrollo frontend -> Pruebas de integración
        ```

        Los factores que lo generan son dos: el nivel técnico y el nivel organizativo/de proceso, pero el nivel organizativo/de proceso es el *factor principal*.

        A nivel técnico, existe una dependencia natural entre tareas, como que el frontend debe esperar a que el backend proporcione las interfaces para empezar, y el backend debe esperar a que el producto termine los CRD.

        Como organización humana, el modelo de cascada tiene problemas: baja eficiencia, difícil exposición de riesgos de calidad, poca flexibilidad, conflictos de equipo, etc. En mi colaboración con la IA, la eficiencia y los conflictos de equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos escalas temporales diferentes; un día para mí es como un año para la IA. Oh, la baja eficiencia podría consumir más tokens, pero no es mi principal preocupación ahora. Mi problema real es el riesgo de calidad debido a la mala interpretación de requisitos o hechos, y la poca flexibilidad.

        Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de colaboración entre humanos, debo convertirme en un nodo superior en el árbol de mando, capaz de delegar tareas a la IA con confianza, sin que se desvíe del camino.

        Los dos puntos clave:
        1.  Alineación de intenciones.
        2.  Verificación por capas.

        Esto requiere más reflexión. Siento que necesito usarlo más y saborearlo.

    3.  Debo estar alerta ante el lado negativo de esta mentalidad de "martillo buscando clavos": dependencia de caminos trillados y producción mayor que comprensión.

3.  ¿Qué planeas hacer mañana?

    Mañana viene ZL. Planeo hacer ejercicio, comer algo y jugar juegos de mesa.

### 2026-01-27

Llegó ZL. Mucha información, necesito digerirla. Jugamos a un juego de mesa, "Ciclo de la Tragedia". Pasamos tres horas entendiendo las reglas, y finalmente en el último escenario, cuando interpreté al villano dramaturgo, sentí el punto dulce del juego. Terminó con mi victoria total.

### 2026-01-31

Los últimos días han sido intensos, por lo que no registré nada. Pero no se puede dejar de registrar, así que retomo y registro todo de una vez.

Además de tener muchas cosas, ¿por qué no registré?

1.  Por miedo a que para registrar deba sentarme y dedicar 30 minutos o más al día. Esto es porque he desarrollado cierto temor y carga hacia el registro diario, lo cual es inaceptable.
2.  Normalmente solo empiezo a registrar cuando el día realmente ha terminado. Pero pensándolo bien, esto es un poco antinatural, porque ahora cuando me voy a dormir, normalmente me meto en la cama rápidamente cuando llega la hora, no porque haya terminado todo lo que quería hacer (¿acaso eso ocurre alguna vez?). Esto provoca que cuando tengo tiempo libre no registro, y cuando debería registrar, debo meterme rápido en la cama, agravado por el punto 1.

La combinación de ambos acumula cada vez más.

1.  Qué hice hoy:

    > Corrijo: qué hice en los últimos días
    1.  Recomendado por SC, empecé a usar Neovim. ¿Por qué? Porque vi que nvim-orgmode parece haberse convertido en un org-mode utilizable, y además me estoy cansando de Emacs:
        - Actualizaciones fallidas interminables.
        - Depuración y errores desconcertantes.
        - Flexibilidad que para mí es una carga inútil.
        - No entiendo Emacs Lisp ni quiero entenderlo.

        Durante años he soportado todo esto por usar org-mode, pero no había otro lugar donde pudiera usarlo bien. Ahora el ecosistema de nvim parece tener una alternativa viable, ¿por qué no probarlo?

        Como soy usuario de Vim desde hace años y en Emacs usaba evil-mode (modo Vim), nunca he sentido que usar Vim sea una gran carga. En VSCode e IDEA no puedo sobrevivir sin Vim, así que usar nvim directamente no es problema para mí.

        Eliminado ese obstáculo, examiné el ecosistema de nvim. Me pareció que nvim, al no tener la carga histórica de Vimscript, usa directamente Lua como lenguaje de configuración y de plugins, lo que le permite ser ligero, y la comunidad es muy activa. Ahora el sistema de plugins de Neovim está dominado por un sistema llamado `lazy.vim`. El diseño de nvim para su sistema de plugins y configuración parece haber sido planeado para innovar audazmente sobre los puntos débiles de Vim. En Vim & Emacs ha habido innumerables intentos similares de dominar, pero debido a la dispersión de la comunidad, ninguno ha tenido éxito real.

        Así que probé LazyVim directamente. ¡Vaya! Sentí que tenía un VSCode, y este VSCode puede ejecutarse en la terminal. ¿Sabes lo genial que es eso?

        Ahora tengo un poderoso "Ancestro Olvidado" basado en una infraestructura completamente nueva, y su configuración es extremadamente simple. La flexibilidad y la conveniencia están perfectamente equilibradas. Mis viejos problemas han sido resueltos casi por completo.

        Casi sin esfuerzo, ya he migrado muchos flujos de trabajo a esto. Ahora uso tmux con 5 ventanas, cada una abriendo nvim en una carpeta diferente. En nvim, a la izquierda está el árbol de directorios, en el medio el código, a la derecha opencode y la terminal.

    2.  Actualicé una versión de legion. Reduje significativamente la cantidad de texto del skill legionmind (reducción de 4k líneas). Por ahora siento que necesita menos atención de mi parte, pero no sé si es porque últimamente he estado usando modelos más inteligentes o porque esta versión de legionmind realmente se ha vuelto más inteligente.

    3.  Configuré un openclaw. Minimax 2.1 sigue siendo un poco tonto, pero como asistente personal, openclaw me parece bastante decente, porque es básicamente un ChatGPT con memoria más manos y pies (puede controlar mi computadora).

    4.  Añadí la funcionalidad de proxy HTTP a Yuan, incluyendo métricas, etc.

2.  ¿Alguna idea?

    A veces siento que usar la IA para escribir es como depurar código que no entiendo del todo: probando su comportamiento o imprimiendo registros para ayudar en la depuración, modificando aquí y allá hasta obtener un resultado satisfactorio. Investiguemos el origen de esta sensación:

    Usar IA para escribir código implica que un humano ingresa un prompt con instrucciones específicas, esperando que la IA entienda las instrucciones implícitas y la información detrás de ellas, y luego complete el trabajo correctamente.

    Podemos estratificar las instrucciones que queremos transmitir a la IA: la capa superior es la instrucción de la tarea actual. Debajo están las decisiones técnicas tomadas en este proyecto de software, las mejores prácticas resumidas para este proyecto local después de sopesar pros y contras. La siguiente capa es la información de contexto del dominio del problema que el proyecto intenta resolver. Luego viene el conocimiento profesional del propio ingeniero de software que usa la IA, sus preferencias personales, técnicas, de estilo, experiencias históricas y acumulación de formas de pensar. La capa inferior es el conocimiento del mundo.

    En una conversación con la IA, lo único que puede quedar claro es la instrucción de la tarea actual, y luego se espera que la IA tenga suficiente conocimiento del mundo y la información de contexto necesaria para resolver el problema.

    Por lo tanto, se puede inferir que si el contexto de una tarea es lo suficientemente pequeño, las instrucciones son extremadamente claras y no hay carga histórica, la IA debería poder completar la tarea de alta calidad fácilmente. Si hay mucha información de contexto implícita, es probable que haga cosas extrañas.

    Lo que legionmind debe hacer es permitir que la IA acumule por sí misma el conocimiento contextual y las mejores prácticas sobre el proyecto y el dominio del problema. Esto requiere que la IA tenga buenas capacidades de pensamiento lógico y memoria (capacidad de contexto), o que posea un abundante conocimiento del mundo. Si supera ambos, no hay nada que hacer.

    —

    Luego, creo que nvim es un "encuentro tardío".

3.  ¿Qué planeas hacer mañana?

    Mañana voy a la casa de SC para visitar su nuevo hogar, luego jugaremos juegos de mesa y de paso le mostraré a SY el equipo de esquí.

### 2026-02-01

Fui a Lengshan (Cold Mountain) para que SY probara botas de esquí. Medimos la longitud del pie (245) y encontramos un par cómodo. Lástima que los colores bonitos de Lengshan estaban agotados en su talla, así que SY tendrá que comprarlos en línea.

Al mediodía, en casa de SC, comimos lo que él cocinó. Tiene un dispositivo para cocinar lentamente el filete, y el resultado fue muy tierno. SC nos preparó un acertijo de "recorrido por la habitación". Había dos pistas: la primera requería encontrar 4 palabras/frases en inglés en 4 lugares, y mediante un código numérico formar una palabra: "Three". La segunda pista se obtenía de un rompecabezas ambiental, y daba el número 31 / 13 (no recuerdo bien), con el que podíamos abrir un cajón con muchas cajitas numeradas para obtener un chocolate.

Lástima que no tenía chocolate; obtuvimos una pegatina bonita.

—

La sesión de juegos de mesa por la tarde fue muy interesante. Lo más destacado fue, por supuesto, "El Líder de la Nación". Finalmente, SC, interpretando a la clase media, logró una victoria sin precedentes; era la primera vez que la clase media ganaba desde que jugamos. PGW, interpretando a la burguesía, estaba furioso porque el ratoncito que interpretaba al gobierno no lo apoyó en dos votaciones cruciales sobre reformas políticas. Yo interpretaba a la clase trabajadora, así que naturalmente no tenía intereses comunes con la burguesía en la mayoría de los temas; no podía ayudar. De hecho, al final del juego, excepto PGW, los tres estábamos muy igualados en puntos. Solo el capitalista resultó perdedor.

Este juego es realmente divertido, se ha convertido en mi favorito. Tiene una profundidad considerable; cada uno de los cuatro jugadores tiene un estilo de juego muy diferente, y cada vez que juegas con un rol diferente es una experiencia completamente distinta. Por ejemplo, esta vez, la clase trabajadora que yo interpretaba experimentó por primera vez un excedente de desempleados (porque el gobierno y la burguesía no querían abrir nuevas empresas), hasta el punto de poder desatar manifestaciones y disturbios obreros. Los trabajadores salieron a la calle, amenazando con cambiar el día por la noche. El efecto concreto era obtener dados de influencia y restar puntos a las otras clases (total de desempleados - 2 + número de sindicatos).

Como era de esperar, antes la clase trabajadora tenía que rogar y suplicar a la burguesía y al gobierno que abrieran nuevas empresas; ahora todos se apresuraban a abrirlas, revitalizando el juego. Finalmente obtuve el segundo lugar con 101 puntos.

### 2026-02-02

Hoy, después de hacer ejercicio, me relajé y no hice nada.

1.  ¿Qué planeas hacer mañana?
    1.  Poner en marcha todo lo relacionado con el proxy HTTP y arreglar el clúster.
    2.  Configurar bien org-mode.nvim.
    3.  Investigar sobre la estación de transferencia (transit hub).

### 2026-02-05

¡Voy a registrar mi día! Hoy cambiaré el formato.

1.  ChatGPT Pro

    El viernes, me armé de valor y compré un ChatGPT Pro en la todopoderosa Xianyu (plataforma de segunda mano). Me costó 1369 yuanes. Me pareció más barato que 200 USD, así que pagué sin dudar. Pero no estuviera listo hasta el martes. Me dio una cuenta de Outlook y una cuenta de ChatGPT vinculada a ese correo.

    Inicié sesión en Outlook y, vaya, había una factura de ChatGPT pagada en pesos filipinos.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | monto           |
    | Suscripción ChatGPT Pro  | ₱8919,64        |
    |                          | Impuesto: ₱1070,36 |
    |                          | Total: ₱9990,00 |
    | Método de pago           | Mastercard-xxxx |

    Curioso, lo convertí a CNY: aproximadamente 1174,54 CNY. Es decir, él se embolsó casi 200 yuanes de ganancia.

    Luego investigué. ¡Caramba! Filipinas es el lugar más barato del mundo para comprar el plan ChatGPT Pro. Impresionante.

    Tengo un contacto confiable en Tailandia; quería replicar su éxito, pero, ja, Tailandia es más caro: 1537 CNY al cambio. ¿Podría ir a, por ejemplo, Polonia (1942 CNY) y vender membresías de ChatGPT de Filipinas en una plataforma similar a Xianyu? 🤔

2.  Fin del proxy HTTP

    Por fin logré que el proxy HTTP funcionara. ¡Dios mío, fue más complicado de lo que pensaba! Esto demuestra que la capacidad de legion para trabajar en un mismo tema a través de 8 proyectos en un monorepositorio está casi al límite. Incluso me encontré con varios casos de subagentes que se cerraban inesperadamente.

    Pero, dicho esto, sin legionmind, recuerdo que dar instrucciones directamente a la IA no habría servido para resolver problemas de este calibre. Esto también demuestra la capacidad única de legionmind en estas situaciones.

    Finalmente, la tarea la completó el propio Legion. Ahora puedo básicamente abstenerme de codificar, e incluso en la mayoría de los casos solo necesito dejar algunos comentarios de revisión sobre los documentos de diseño. Estoy bastante satisfecho con esta versión de legion.

3.  Iteración de legionmind

    Hablando de legionmind.

    Esta noche actualicé legion de nuevo. Siento que forzar un flujo de trabajo fijo sigue siendo un poco rígido; esencialmente sigo haciendo que la IA trabaje dentro de mi marco. Pero la IA, especialmente las inteligentes, como Codex 5.2 Extra High que uso a menudo desde que tengo ChatGPT Pro, ya entiende todo. No sé si mi sistema multi-agente está desperdiciando algo en ese sentido. Creo que a medida que la IA se vuelva más inteligente, dejar que diseñe sus propios procesos será una forma de trabajo más razonable. En este nivel, tanto yo, como Manus, como oh-my-opencode, somos simplemente pioneros allanando el camino antes de que la IA pueda reemplazar completamente a los humanos en los trabajos humanos existentes. Como dijo Nietzsche, el hombre es un camino hacia el superhombre.

    Así que, volviendo al tema, deberíamos probar científicamente el rendimiento de diferentes versiones de legion con un benchmark. Necesito un conjunto de pruebas estándar para medir el rendimiento de diferentes legions frente al mismo conjunto de tareas complejas de codificación. Debería desarrollar rápidamente una herramienta de benchmark (quizás inspirándome en los benchmarks comunes de la industria).

    Además de continuar con el trabajo en Yuan, me esforzaré en este aspecto.

    Por cierto, el puente de legionmind para GitHub no lo he seguido desarrollando estos días. La razón es que vi que opencode ya tiene esa capacidad. En lugar de esforzarme en terminarlo lleno de errores, mejor lo pongo en espera
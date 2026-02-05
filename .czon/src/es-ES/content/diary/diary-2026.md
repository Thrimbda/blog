---
"title": "Diario de trabajo 2026: Exploración de colaboración con IA y eficiencia personal"
"summary": "Este artículo es el diario de trabajo del autor desde enero hasta principios de febrero de 2026, que registra en detalle el desarrollo diario, las reflexiones y la vida personal. El núcleo gira en torno a cómo colaborar con la IA para mejorar la eficiencia personal, incluyendo el diseño de sistemas multiagente (Legionmind), la optimización de flujos de trabajo (como el uso de Neovim) y la resolución de problemas técnicos (como seguridad de clústeres, proxy HTTP). El autor reflexiona sobre los desafíos de la colaboración con IA (como la alineación de intenciones, la construcción de bases de conocimiento) y la gestión de su propia energía, y comparte experiencias con el uso de herramientas (como la compra de ChatGPT Pro) y actividades sociales. El diario refleja una exploración continua de la iteración tecnológica, la mejora de la eficiencia y el equilibrio en la vida."
"tags":
  - "Diario de trabajo"
  - "Colaboración con IA"
  - "Sistema multiagente"
  - "Mejora de la eficiencia"
  - "Cadena de herramientas"
  - "Crecimiento personal"
  - "Reflexión técnica"
  - "Neovim"
"date": "2026-02-05"
---

# Tabla de Contenidos

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
            2.  [Conclusión del http-proxy](#org2f33c3f)
            3.  [Iteración de Legionmind](#org43f0ced)



<a id="org91ae5f8"></a>

# 2026




<a id="org14e7d23"></a>

## 2026-01 Enero


<a id="org987e5de"></a>

### 2026-01-22


<a id="orgb693af8"></a>

#### ¿Qué hice hoy?

1.  Refactoricé un poco `opencode-feishu-notifier`, ahora envía notificaciones a los usuarios de una manera predeterminada.
2.  Continué haciendo que la IA escribiera `legionmind-github-bridge`. Comencé a usar el modo multi-agente de opencode, inició 5 agentes para modificar 5 problemas, trabajó arduamente durante 2 horas y agotó mis 5 horas de tokens de codex.
3.  Hoy murió un nodo en el clúster sg. Miré los registros y resultó que fue por intentos constantes de ataque SSH, lo cual no es bueno. Después de una investigación simple, hay varias direcciones posibles:
    -   Desactivar la autenticación por contraseña.
    -   Cerrar el canal sshd para toda la red.
    -   Mover el clúster detrás de un NAT.
4.  Manejé algunos asuntos misceláneos. Zl viene a Suzhou la próxima semana, pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.


<a id="orgbbe0c52"></a>

#### ¿Qué pensamientos tuve?

En esta etapa, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, mi gestión se vuelve inadecuada y tiendo a fatigarme fácilmente. Y esto es a pesar de que ya intento delegar trabajo a los Agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:

-   Para tareas de codificación, debería maximizar el grado de autonomía del agente, con varios objetivos de optimización:
    1.  Que me moleste lo menos posible.
    2.  Que trabaje lo más posible.
    3.  Mejorar la confiabilidad de su trabajo tanto como sea posible.
-   También necesito mejorar yo mismo:
    1.  Gestionar mi energía mental para no fatigarme rápidamente.
    2.  Mejorar mi capacidad para trabajar simultáneamente en múltiples contextos diferentes, evitando descuidos y olvidos, y gestionando el progreso.

Basándome en las reflexiones anteriores, creo que mañana puedo intentar en dos direcciones:

1.  Diseñar una plantilla multiagente para legionmind y experimentar con alguna tarea de codificación de yuan usando opencode.
2.  Continuar registrando el diario de trabajo y explorar un método para gestionar la energía mental y los contextos.


<a id="org4c1530c"></a>

#### ¿Qué planeo hacer mañana?

1.  Como se mencionó antes, hacer un experimento multiagente.
2.  Continuar con `legionmind-github-bridge`.
3.  Si hay tiempo, trabajar en la seguridad del clúster.

&#x2014;

En general, mi línea principal actual es usar la IA para escalarme a mí mismo, y luego intentar escalar a otros.


<a id="org9670646"></a>

### 2026-01-23

Hoy tuve un poco de resfriado, un poco de dolor de cabeza, productividad baja, pero me alegra haber comenzado a hacer resúmenes diarios.


<a id="org5b02719"></a>

#### ¿Qué hice hoy?

1.  Con la ayuda de la IA, diseñé un sistema multiagente. Este sistema aún no ha sido pulido sistemáticamente.
2.  `legionmind-github-bridge` avanzó un paso más.
3.  Modifiqué el diseño e implementación de la adquisición de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
4.  Tomé el examen de la bolsa de futuros para abrir una cuenta en CFFEX. Resulta que debía tener la cámara encendida todo el tiempo, no minimizar ni cambiar de pantalla. Afortunadamente, se podía intentar infinitamente, lo cual no fue un problema para mí. Aprobé con un alto 95%.


<a id="orgcd67dde"></a>

#### ¿Qué pensamientos tuve?

Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:

1.  `legionmind` actúa como un SOP para el trabajo de desarrollo. Es una habilidad de agente (agent skill). Me gustan las agent skills.
2.  `opencode` actúa como la entidad del agente. Utilizo sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
3.  Lo que me duele un poco la cabeza ahora es cómo combinar las skills y estos subagentes.

Me dolió la cabeza todo el día, y solo al anochecer se me aclaró un poco. Descubrí que escribir estas reflexiones al final del día podría no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las reflexiones mañana por la mañana al despertar.


<a id="org55c5e88"></a>

#### ¿Qué planeo hacer mañana?

1.  Usar este sistema multiagente para hacer algo, por ejemplo, conectar la cuenta de inversión de gate.
2.  Continuar con `legionmind-github-bridge`.
3.  Seguridad del clúster, si hay tiempo.
4.  Reanudar el cronometraje del trabajo. (Importante)
5.  Mañana vendrán amigos de sy de visita, por lo que es posible que el tiempo de trabajo sea interrumpido.


<a id="org93f4e20"></a>

### 2026-01-24

Hoy dormí profundamente hasta las 11 a.m., me sentí muy relajado. Hacía mucho tiempo que no dormía tan descaradamente.


<a id="orgabed47d"></a>

#### ¿Qué hice hoy?

1.  Implementé una nueva versión de `node-unit`. Me atreví a implementarla porque tengo pruebas integrales (end-to-end) bastante detalladas. Específicamente, docker inició una timescaledb (postgresql17), luego inició dos `node-unit`, e insertó 21 `@yuants/portal` en la base de datos para probar, finalmente convergiendo a un estado de mitad y mitad.
    
    Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se inician dos `node-unit`, se puede observar cómo se adquieren los deployments por turnos. Lo que realmente falta es una carga de trabajo real que ocupe CPU/memoria, y otro escenario donde un `node-unit` se desconecte por alguna razón.

2.  Usé la nueva versión multiagente de `legionmind` en Yuan para resolver el problema de la salida del flujo de cuentas de `vendor-gate earn`. Hice que el agente primero usara `legion` para crear documentación, produciendo en total los siguientes documentos:
    
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
    
    Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multiagente tiene algunos conflictos con la escritura de documentación del `legionmind` original. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían colocarse en algunas skills separadas, y `legionmind` debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su trabajo.
    
    Otro problema insuficiente es que cometió un error en su primer trabajo, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta earn. Lo pedí así porque actualmente solo la cuenta earn de okx también está integrada como una cuenta. Pero la IA aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchange es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.
    
    Este conocimiento es algo que un nuevo Agente de IA no posee. ¿Cómo deberíamos modelar este conocimiento? ¿Cómo puedo proporcionar a un Agente de IA este contexto del proyecto como su cerebro externo? Esta es una pregunta que merece una reflexión profunda y necesita ser considerada cuidadosamente mañana.

3.  Por la tarde cociné para entretener a los amigos de sy, ¡me cansé mucho! Así que mañana continuaré trabajando.


<a id="orgdb4d8bb"></a>

#### ¿Qué pensamientos tuve?

-   Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar de manera compacta un cerebro externo para los Agentes de IA. Lo más simple podría comenzar con un conjunto de documentos AGENT.md. Lo intenté antes, pero la sobrecarga de mantener estos documentos en sí misma es bastante alta. Distinguir entre basura y experiencias realmente valiosas para registrar es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo podría tener un circuito adicional para que el agente actualice la memoria. Lo más importante sigue siendo cómo evaluar los resultados del trabajo del Agente de IA.

-   Con respecto al punto anterior, leí un artículo que me pareció muy interesante. Ahora permíteme resumirlo con mis propias palabras: Primero, la evaluación de un paso de trabajo del agente se puede dividir en varias categorías:
    
    1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas integrales (e2e).
    2.  Evaluación con modelos: usar otro LLM para juzgar según el prompt que definamos.
    3.  Evaluación humana: yo juzgo.
    
    Luego, hay dos tipos de evaluación sistemática para un sistema de Agentes:
    
    1.  Tipo de capacidad: ¿Qué puede hacer este agente? Y la tasa de éxito puede ser muy baja, por ejemplo, quiero usar `legion` para ejecutar gradualmente tareas más grandes y difíciles, como explorar una nueva frontera.
    2.  Tipo de regresión: ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún pueda implementarlas de manera estable.
    
    Entonces, cuando se introduce una nueva capacidad, debería hacer la transición del tipo de capacidad al tipo de regresión.
    
    El artículo también menciona dos métricas muy importantes: `pass@K` y `pass^K`.
    
    -   `pass@k`: De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Te importa "encontrar al menos una solución viable".
    
    -   `pass^k`: Los k intentos deben tener éxito todos. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: El usuario espera un agente de producción confiable cada vez.
    
    FYI: [Referencia a este artículo](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   Mi energía todavía es un poco baja. Trabajé un poco por la tarde, cociné por la noche y me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?


<a id="org1e207dc"></a>

#### ¿Qué planeo hacer mañana?

1.  Pensar en el modelo de este agente de evaluación (eval agent) y continuar iterando este sistema multiagente.
2.  Seguridad del clúster, debo hacerlo.
3.  `legion-github-bridge`.


<a id="org7ceb7a6"></a>

### 2026-01-25

Hoy fui a cortarme el pelo. Cuando regresé, descubrí que el sistema era inestable. Resultó que el hermano Ji había iniciado dos servicios con el mismo `terminal_id`, que se estaban interfiriendo entre sí, causando grandes problemas.


<a id="org1fc8b40"></a>

#### ¿Qué hice hoy?

1.  Intenté migrar el clúster detrás de un NAT, por supuesto usando el nuevo `legion` para completar esto. Mi operación fue así:
    
    -   Primero modifiqué el clúster kops, creé una nueva VPC, usando los rangos de red 172.21.0.0/24 y 172.21.1.0/24. Luego creé un NAT para el tráfico saliente.
        
        Originalmente planeaba usar un rango de red que comenzara con 10.0, pero después de intentarlo descubrí que AWS no permite crear ese tipo de CIDR, así que lo cambié a un rango que comienza con 172.21. Aquí hay un problema: es necesario apuntar el balanceador de carga existente en el recurso del clúster a la VPC correspondiente (originalmente estaba implícitamente asignado por defecto, ahora con un CIDR adicional hay que especificarlo manualmente).
    
    -   Luego creé un nuevo grupo de instancias (instance group), apuntando a la nueva VPC. Hubo un pequeño incidente en el medio: el nuevo IG no tenía permisos de S3, no sé por qué. Después de agregarlos manualmente, los nodos se unieron al clúster normalmente.
    
    -   El siguiente paso fue migrar manualmente los servicios al nuevo IG.
    
    -   Finalmente, eliminar el IG original.
    
    Después de completarlo, descubrí que el tráfico saliente del clúster solo tenía una IP, lo que hizo que nuestros servicios con limitación de IP colapsaran un poco. No tuve más remedio que revertir. Debo primero abordar la habilidad del proxy HTTP antes de poder continuar.

2.  El sistema multiagente se utilizó para practicar un script de actualización automática del valor neto de `midas`. Deepseek trabajó arduamente durante mucho tiempo, y me sentí bastante satisfecho. El problema central aquí es que si hay un error en el diseño temprano que no descubro, me espera un enorme desperdicio de tokens y tiempo, porque descubrí que el agente no trabaja tan rápido.
    
    Actualmente, estos agentes de codificación son bastante primitivos. A menudo se cierran o fallan debido a problemas de red, etc. Hacer que completen un trabajo serio de larga duración (long running) todavía tiene un nivel de servicio (SLI) un poco deficiente. Esto también podría ser una oportunidad. Pensándolo simplemente, se necesitan conocimientos de ingeniería de software, alta disponibilidad, etc., para que funcione.


<a id="orgbbaf9e2"></a>

#### ¿Qué pensamientos tuve?

Hoy tuve pocas reflexiones, las escribí en línea en las secciones anteriores.


<a id="org3c32f7f"></a>

#### ¿Qué planeo hacer mañana?

1.  Diseñar el mecanismo de proxy HTTP para Yuan.
2.  Después de la implementación, migrar el clúster nuevamente.


<a id="org80b755f"></a>

### 2026-01-26

Hoy fue un día de moderación. Descubrí que después de los 25 años, mi manejo de las emociones ha mejorado notablemente. Es decir, fuera de la emoción, hay claramente un hilo de racionalidad que actúa como copiloto. Este hilo de racionalidad establece una barra de control en el enorme reactor de emociones. Sin esta barra, las emociones se descontrolarían, desencadenando una reacción en cadena autosostenida que podría traer innumerables consecuencias irreparables. Bajo la influencia de esta barra, comencé a comprender qué palabras se pueden decir y cuáles no, qué cosas se pueden hacer y cuáles no, qué decisiones se pueden tomar y cuáles no. Este es un cambio favorable que ha ocurrido en mí.


<a id="org80224a0"></a>

#### ¿Qué hice hoy?

1.  Hoy usé `legion` para el diseño e implementación del proxy HTTP de yuan. Sentí que fue bastante fluido. En el camino, revisé su diseño, modifiqué un punto (cómo seleccionar un terminal disponible) y luego dejé que el agente lo intentara por su cuenta. Los resultados fueron bastante buenos.
2.  También usé `legion` para hacer la actualización automática de `midas`. Sin embargo, la IA lo hizo muy mal, no entendió correctamente mis requisitos ni el uso de `@yuants/protocol`. Tengo algunas sospechas: la inteligencia de la IA es insuficiente (deepseek puede parecer no muy inteligente); la revisión no fue lo suficientemente estricta; o la base de conocimiento/documentación no es lo suficientemente estricta.
3.  ¡Maldita sea, me despertaron las alertas por la noche! El host murió misteriosamente. Parece que hubo un pico de uso de CPU que hizo que el host entrara en un estado del que no podía recuperarse por sí mismo. Los registros del host son un desastre. Mi evaluación es: las alertas son útiles, los registros son una mierda. ¡Lo anoto!


<a id="org5b61931"></a>

#### ¿Qué pensamientos tuve?

1.  Mientras me duchaba, pensé en el punto clave de mi colaboración actual con la IA. Uno es la disponibilidad del servicio del propio agente de IA, que no se cierre o falle mientras está en ejecución. Por cierto, el bucle `ralph` básicamente mejora la disponibilidad mediante reintentos brutos. El otro punto es cómo acepto la salida de la IA. Por ejemplo, incluso los subordinados que reportan a sus superiores necesitan un PPT o simplemente un gerente medio profesional para actuar como este "transmisor costoso". ¿Cómo puede limitarse el reporte de la IA a los humanos a simples Markdown plano y código? ¿Podría cada elemento del reporte de la IA enlazar a un artefacto? ¿Podría haber un `Citation Agent` encargado específicamente de esta parte?
    
    Sin embargo, mi uso actual de la IA es bastante limitado, centrado solo en tareas de codificación.

2.  Pensemos detenidamente por qué, después de tener un sistema multiagente, este sistema se dirige firmemente hacia el desastre. En las conjeturas anteriores, básicamente se mencionaron tres posibilidades:
    
    1.  El nivel de inteligencia de la IA en sí.
    2.  La revisión humana no es lo suficientemente estricta.
    3.  La base de conocimiento no es lo suficientemente detallada para proporcionar información más correcta para que la IA comience rápidamente.
    
    Analicemos estos puntos cuidadosamente. El punto 1 ni siquiera necesita consideración. Esforzarse en la dirección 2 ciertamente podría depender de un documento RFC cada vez más detallado para dar una dirección suficientemente correcta a los pasos posteriores. Pero este método de desarrollo es como si volviéramos al modelo de desarrollo en **cascada (waterfall)**, completando el trabajo a través de un flujo lineal:
    
        Análisis de requisitos -> Diseño del backend -> Desarrollo del backend -> Desarrollo del frontend -> Pruebas de integración
    
    Los factores formativos también tienen dos niveles: el nivel técnico y el nivel de **organización y procesos**, pero el nivel de organización y procesos es el *factor principal*.
    
    El nivel técnico es que existen dependencias naturales entre las tareas. Por ejemplo, el frontend debe esperar a que el backend proporcione interfaces para comenzar a desarrollarse, y el backend debe esperar a que el producto escriba el CRD antes de poder comenzar.
    
    Como organización humana, el modelo de desarrollo en cascada tiene problemas como: baja eficiencia, riesgos de calidad difíciles de exponer, poca flexibilidad, conflictos en el equipo, etc. Como método de colaboración entre la IA y yo, la eficiencia y los conflictos en el equipo no existen naturalmente en el mundo de la IA. Es como si la IA y yo viviéramos en dos dimensiones temporales diferentes; un día para mí es como un año para la IA. La baja eficiencia podría gastar algunos tokens adicionales, pero este no es mi principal problema en este momento. En realidad, enfrento riesgos de calidad debido a errores en la comprensión de los requisitos o los hechos, y la flexibilidad también es pobre.
    
    Debo encontrar una manera de maximizar el uso de las capacidades de la IA mientras me libero al máximo. Según la experiencia de organización entre humanos, debo convertirme en un nodo de nivel superior en el árbol de mando, capaz de confiar tareas a la IA con tranquilidad mientras evito que se desvíe del camino.
    
    Los dos puntos más cruciales:
    
    1.  Alineación de intenciones.
    2.  Verificación por capas.
    
    Necesito pensar más a fondo en esto. Siento que necesito usarlo más, saborearlo.

3.  Necesito estar alerta ante el lado negativo de mi estado de "buscar un clavo con un martillo": dependencia del camino, producción mayor que comprensión.


<a id="orga6c35c5"></a>

#### ¿Qué planeo hacer mañana?

Mañana viene zl, planeo hacer ejercicio, comer y jugar juegos de mesa.


<a id="org98d2dad"></a>

### 2026-01-27

Vino zl, mucha información, necesito digerirla. Jugamos juegos de mesa, "Tragic Loop". Pasamos tres horas entendiendo las reglas, y finalmente, en el último escenario donde yo interpretaba al antagonista, el Dramaturgo, sentí el punto dulce del juego. Terminó con mi victoria total.


<a id="org756539f"></a>

### 2026-01-31

Los últimos días han sido bastante intensos, por lo que no registré nada. Pero dejar de registrar no es aceptable, así que lo retomo ahora y registro todo junto.

Además de tener muchas cosas, ¿por qué no registré?

1.  Porque tenía miedo de que registrar significara sentarme y dedicar más de 30 minutos específicamente a registrar un día. Esto se debía a que tenía cierto miedo y carga con el registro diario, lo cual es inaceptable.
2.  Normalmente solo estoy dispuesto a comenzar a registrar el día cuando realmente termina. Pero pensándolo bien, esto es un poco antinatural, porque ahora básicamente me meto en la cama rápidamente cuando es hora de dormir, no porque realmente haya terminado todo lo que quería hacer (¿realmente habrá tal momento?). Esto lleva a que, cuando tengo tiempo, no registro, y cuando realmente debería registrar, debo meterme rápidamente en la cama, sumado al problema 1.

La combinación de ambos hace que se acumule más y más.


<a id="org57e9aa8"></a>

#### ¿Qué hice hoy?

> Corrección: ¿Qué hice en los últimos días?

1.  Por recomendación de sc, comencé a usar neovim. ¿Por qué usarlo? Vi que `nvim-orgmode` parece haberse convertido realmente en un org-mode utilizable, y al mismo tiempo comencé a sentirme cansado de emacs:
    
    -   Fallos de actualización interminables.
    -   Depuración y mensajes de error desconcertantes.
    -   Flexibilidad que para mí solo añade carga pero es inútil.
    -   No entiendo emacs-lisp ni quiero entenderlo.
    
    Durante años he estado soportando lo anterior para usar orgmode, pero no había ningún otro lugar donde pudiera usar bien org-mode. Ahora el campo de nvim parece tener una alternativa viable, ¿por qué no probarlo?
    
    Como he sido usuario de vim durante años, incluso en emacs usé evil-mode (vim-mode), por lo que nunca sentí que usar vim me supusiera una gran carga. En vscode e idea, sin vim no puedo sobrevivir, así que usar nvim directamente no es un problema para mí.
    
    Dado que el obstáculo ha desaparecido, echemos un vistazo al ecosistema de nvim. Lo examiné: nvim, al no tener el lastre histórico de vimscript, usa directamente lua como su lenguaje de configuración y de plugins. Por lo tanto, puede avanzar con ligereza, y la comunidad también es muy activa. Veo que ahora el sistema de plugins de neovim también ha sido unificado por un sistema llamado `lazy.vim`. El diseño del sistema de plugins y configuración de nvim debe haber sido una innovación audaz y planificada específicamente para abordar los puntos débiles originales de vim. En vim & emacs probablemente hay innumerables intentos similares de unificación, pero debido a que la comunidad está muy fragmentada, probablemente ninguno haya tenido un éxito real.
    
    Así que probé directamente lazyVim. ¡Vaya! Ahora sentí que tenía directamente un vscode, y este vscode puede ejecutarse en la terminal. ¿Sabes lo increíble que es eso?
    
    Ahora tengo un poderoso Antiguo Dios basado en una nueva infraestructura, y configurarlo es extremadamente simple. La flexibilidad y la conveniencia están contenidas de manera justa, y mis antiguos puntos débiles básicamente se han resuelto.
    
    Casi no invertí tiempo y ya cambié una gran parte de mi flujo de trabajo a esto. Ahora uso tmux para abrir 5 ventanas (windows), y en cada ventana abro nvim en una carpeta. En nvim, a la izquierda está el árbol de directorios, en el medio el código, a la derecha opencode y la terminal.

2.  Actualicé una versión de `legion`. Reduje significativamente la cantidad de texto de la skill `legionmind` (de 4k líneas). Actualmente, siento que necesito preocuparme menos, pero no sé si es porque recientemente he estado usando modelos más inteligentes o porque esta versión de `legionmind` realmente se volvió más inteligente.

3.  Configuré un `openclaw`. Minimax 2.1 todavía es un poco tonto, pero como asistente personal creo que `openclaw` es bastante bueno, porque básicamente equivale a un chatgpt con memoria + manos y pies (puede operar mi computadora).

4.  Agregué la funcionalidad de http-proxy a Yuan, agregué métricas, etc.


<a id="orgcaa37f7"></a>

#### ¿Qué pensamientos tuve?

A veces siento que usar la IA para escribir cosas es un poco como depurar un código del que no entiendo muy bien el principio, probando constantemente su comportamiento o imprimiendo logs para ayudar en la depuración, cambiando un poco aquí, agregando un poco allá, hasta obtener finalmente un resultado satisfactorio. Investiguemos el origen de esta sensación:

Usar la IA para escribir código, en esencia, es que un humano ingresa un prompt que contiene algunas instrucciones específicas, con la esperanza de que la IA pueda comprender las instrucciones implícitas y la información detrás de este prompt, y luego completar el trabajo correctamente.

Las instrucciones que se espera transmitir a la IA se pueden estratificar: el nivel superior son las instrucciones de la tarea actual. Debajo están algunas decisiones técnicas tomadas para este proyecto de software, las mejores prácticas resumidas después de sopesar pros y contras que son aplicables localmente a este proyecto. El siguiente nivel es la información de fondo del dominio del problema que el proyecto pretende resolver. El siguiente nivel es el conocimiento profesional de fondo del propio ingeniero de software que usa la IA, sus preferencias personales, preferencias técnicas, preferencias de estilo, experiencias históricas, la acumulación de su forma de pensar. El nivel más bajo es el conocimiento de fondo de este mundo.

En una conversación con la IA, lo que puede hacerse claro para la IA son solo las instrucciones de la tarea actual, y luego se espera que la IA posea suficiente conocimiento de fondo sobre el mundo y la información de fondo necesaria para resolver el problema.

Por lo tanto, se puede deducir que si el contexto de una tarea es lo suficientemente pequeño, las instrucciones dadas son extremadamente claras y no hay lastre histórico, la IA debería poder completar la tarea con alta calidad fácilmente. Si hay mucha información de fondo implícita, es fácil que produzca algunos trabajos inexplicables.

Lo que `Legionmind` debe hacer es permitir que la IA misma acumule conocimiento de fondo y mejores prácticas relacionados con este proyecto y el dominio del problema en sí. Esto requiere que la IA tenga una buena capacidad de pensamiento lógico y memoria (capacidad de contexto), o que la IA posea un conocimiento de fondo del mundo abundante. Más allá de estos dos, no se puede salvar.

&#x2014;

Luego, siento que nvim es realmente un encuentro tardío.


<a id="orgf2eb618"></a>

#### ¿Qué planeo hacer mañana?

Mañana iré a la casa de sc a visitar su nuevo hogar, luego jugaremos juegos de mesa juntos y de paso le mostraré a sy el equipo de nieve.


<a id="org0700b38"></a>

### 2026-02-01

Fui a Cold Mountain para mostrarle a sy las botas de nieve. Midieron la longitud del pie (245) y probaron un par bastante cómodo. Lamentablemente, Cold Mountain no tenía tallas en los colores bonitos, así que sy tendrá que comprarlas en línea.

Almorzamos en casa de sc, comimos lo que él preparó. Tiene un dispositivo de cocción lenta a baja temperatura para filetes, y el filete que preparó estaba muy tierno. Sc nos preparó un acertijo de recorrido por la habitación (room tour). Había dos pistas en total. La primera pista requería ir a 4 lugares para encontrar 4 palabras/oraciones en inglés, y usar un cifrado de números de serie para formar una palabra: "Three". La segunda pista se obtenía de un acertijo ambiental, finalmente obteniendo los números 31 / 13 (no recuerdo bien)
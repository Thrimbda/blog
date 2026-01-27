---
"title": "Registro de trabajo 2026"
"summary": "Este documento es un registro de trabajo del 22 al 24 de enero de 2026. El autor detalla su práctica diaria utilizando Agentes de IA (como opencode, legionmind) para el desarrollo de software (por ejemplo, mejoras en legionmind-github-bridge, node-unit) y diseño de sistemas (sistema multi-agente). El registro incluye tareas específicas completadas, problemas encontrados (como seguridad del clúster, modelado del conocimiento del Agente), ideas generadas (como aumentar la autonomía del Agente, diseñar un sistema de evaluación) y planes para el día siguiente. La tesis central es que el autor se está esforzando por ampliar sus capacidades personales (scale) a través de Agentes de IA y explorar flujos de trabajo eficientes y métodos de evaluación de Agentes. La conclusión es la necesidad de encontrar un equilibrio entre la autonomía del Agente, la provisión de conocimiento contextual y la gestión de la energía personal."
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

1.  [2026](#orgf3197da)
    1.  [2026-01 Enero](#orge03e1ca)
        1.  [2026-01-22](#org4d65f86)
            1.  [¿Qué hice hoy?](#org1006a17)
            2.  [¿Qué ideas tuve?](#orgdb0ae87)
            3.  [¿Qué planeo hacer mañana?](#org750daf2)
        2.  [2026-01-23](#org287b8dd)
            1.  [¿Qué hice hoy?](#orgf838e08)
            2.  [¿Qué ideas tuve?](#org8998678)
            3.  [¿Qué planeo hacer mañana?](#orgc688fe4)
        3.  [2026-01-24](#org2a15db2)
            1.  [¿Qué hice hoy?](#orgab0f160)
            2.  [¿Qué ideas tuve?](#org68bf2d9)
            3.  [¿Qué planeo hacer mañana?](#orge3ab04d)

<a id="orgf3197da"></a>

# 2026

<a id="orge03e1ca"></a>

## 2026-01 Enero

<a id="org4d65f86"></a>

### 2026-01-22

<a id="org1006a17"></a>

#### ¿Qué hice hoy?

1.  Refactoricé un poco `opencode-feishu-notifier`. Ahora envía notificaciones a los usuarios de una manera establecida.
2.  Continué haciendo que la IA escribiera `legionmind-github-bridge`. Comencé a usar el modo multi-agente de opencode. Inició 5 agentes para modificar 5 problemas. Funcionó solo durante 2 horas, consumiendo todos mis tokens de codex de 5 horas.
3.  Hoy murió un nodo en el clúster sg. Miré los registros y resultó que fue por intentos constantes de ataque SSH. Esto no es bueno. Investigué un poco y hay varias direcciones posibles:
    - Desactivar la autenticación por contraseña.
    - Cerrar el canal sshd para toda la red pública.
    - Mover el clúster detrás de un NAT.
4.  Manejé algunos asuntos misceláneos. Zl viene a Suzhou la próxima semana, pasé algún tiempo haciendo arreglos, pero no fue muy fluido. No planeo invertir más energía mental en esto.

<a id="orgdb0ae87"></a>

#### ¿Qué ideas tuve?

En esta etapa, solo puedo gestionar 2-3 cosas simultáneamente. Esto incluye trabajo de desarrollo, arreglos diarios, pensamiento y producción. Más allá de este rango, pierdo capacidad de gestión y me canso fácilmente. Y esto es a pesar de que ya intento delegar trabajo a los Agentes de IA. Por lo tanto, creo que debería haber dos direcciones de mejora:

- Para tareas de codificación, debería aumentar lo más posible el grado de autonomía del agente. Hay varios objetivos de optimización:
  1.  Que me moleste lo menos posible.
  2.  Que trabaje lo más posible.
  3.  Mejorar la fiabilidad de su trabajo tanto como sea posible.
- También necesito mejorar yo mismo:
  1.  Gestionar mi energía mental para no agotarme rápidamente.
  2.  Mejorar mi capacidad para trabajar simultáneamente en múltiples contextos diferentes, sin perder detalles u olvidar cosas, y con gestión del progreso.

Basándome en las reflexiones anteriores, creo que mañana puedo intentar en dos direcciones:

1.  Diseñar una plantilla multiagente para legionmind y experimentar con ella en alguna tarea de codificación de Yuan usando opencode.
2.  Continuar registrando el diario de trabajo, explorando un método para gestionar la energía mental y los contextos.

<a id="org750daf2"></a>

#### ¿Qué planeo hacer mañana?

1.  Como se mencionó antes, hacer un experimento con multiagente.
2.  Continuar con `legionmind-github-bridge`.
3.  Si hay tiempo, ocuparme de la seguridad del clúster.

&#x2014;

En general, mi línea principal actual es usar la IA para ampliar mis propias capacidades (scale), y luego intentar ampliar las de los demás.

<a id="org287b8dd"></a>

### 2026-01-23

Hoy tuve un poco de resfriado, un poco de dolor de cabeza, productividad baja, pero me alegra haber empezado a hacer resúmenes diarios.

<a id="orgf838e08"></a>

#### ¿Qué hice hoy?

1.  Con la ayuda de la IA, diseñé un sistema multi-agente. Este sistema aún no ha sido pulido sistemáticamente.
2.  `legionmind-github-bridge` avanzó un paso más.
3.  Modifiqué el diseño e implementación de la adquisición (preemption) de `node-unit`. Anteriormente, cuando un `node-unit` fallaba, todos sus deployments se limpiaban. Ahora se limpian uno por uno.
4.  Tomé el examen de la bolsa de futuros (CFFEX) para abrir una cuenta. ¡Resulta que requería tener la cámara encendida todo el tiempo, sin minimizar ni cambiar de pantalla! Afortunadamente se podía intentar infinitas veces, eso no me detuvo. Aprobé con un alto 95%.

<a id="org8998678"></a>

#### ¿Qué ideas tuve?

Mi objetivo es lograr la autonomía del agente con el menor desgaste posible. Actualmente, mi flujo de trabajo es así:

1.  `legionmind` actúa como un SOP para el trabajo de desarrollo. Es una habilidad de agente (agent skill). Me gustan las agent skills.
2.  `opencode` actúa como la entidad del agente. Utilizo sus capacidades como bash / tool calling / langraph / command / subagent, etc. Si algún día abandonara opencode, esta sería mi lista de cosas por implementar.
3.  Lo que me duele un poco la cabeza ahora es cómo combinar las skills y estos subagentes.

Tuve dolor de cabeza todo el día, y solo al anochecer se me aclaró un poco la mente. Me di cuenta de que escribir estas ideas al final del día podría no ser un buen método. Tal vez debería solo registrar los hechos y luego resumir las ideas al despertar por la mañana.

<a id="orgc688fe4"></a>

#### ¿Qué planeo hacer mañana?

1.  Usar este sistema multi-agente para hacer algo. Conectemos la cuenta de inversión de gate.
2.  Continuar con `legionmind-github-bridge`.
3.  Seguridad del clúster, si hay tiempo.
4.  Reanudar el cronometraje del trabajo (importante).
5.  Mañana vendrán de visita los amigos de sy, por lo que es posible que el tiempo de trabajo sea interrumpido.

<a id="org2a15db2"></a>

### 2026-01-24

Hoy dormí profundamente hasta las 11, me sentí muy relajado. Hacía mucho que no dormía tan a gusto.

<a id="orgab0f160"></a>

#### ¿Qué hice hoy?

1.  Implementé la nueva versión de `node-unit`. La razón por la que me atreví a implementarla con confianza es que tengo pruebas integrales (end-to-end) bastante detalladas. Específicamente, inicié una timescaledb (postgresql17) con Docker, luego inicié dos `node-unit` e inserté 21 `@yuants/portal` en la base de datos para probar, que finalmente convergieron en un estado de mitad y mitad.

    Esta prueba básicamente puede verificar que cuando aparecen muchos deployments sin dueño y se activan dos `node-unit`, se puede observar cómo se turnan para adquirir los deployments. Lo que realmente falta es, por un lado, una carga de trabajo real que ocupe CPU/memoria, y por otro, un escenario donde un `node-unit` se desconecte por alguna razón.

2.  Usé la nueva versión multi-agente de `legionmind` en Yuan para resolver el problema de la salida del flujo de cuentas de la cuenta `vendor-gate earn`. Hice que el agente primero usara `legion` para crear documentación, produciendo en total los siguientes documentos:

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

    Parece un flujo de trabajo decente. Sin embargo, mi nuevo sistema multi-agente tiene algunos conflictos con la escritura de documentación del `legionmind` original. Debería considerar cuidadosamente los límites de cada cosa. Por ejemplo, las especificaciones sobre cómo escribir cada tipo de documento deberían colocarse en algunas skills separadas, y `legionmind` debería ser una descripción del flujo de trabajo. Cada tipo de agente debería poder cargar algunas skills pequeñas para ayudarlo a completar su trabajo.

    Otro problema que surgió es que en su primer intento cometió un error, enviando el flujo de cuentas a `account-actions-with-credential.ts`. Esto se debió a que le pedí que consultara `vendor-okx` para completar la integración de la cuenta earn. Pedí esto porque actualmente solo la cuenta earn de okx también está integrada como una `account`. Pero la IA aprendió algunas prácticas obsoletas de allí. El estándar actual de integración de exchange es publicar todas las cuentas a través de `provideExchangeServices`, no usar `provideAccountActionsWithCredential` para integrar cuentas.

    Este conocimiento es algo que un Agente de IA nuevo no posee. ¿Cómo deberíamos modelar este conocimiento? ¿Cómo puedo proporcionar a un Agente de IA este contexto del proyecto como su cerebro externo? Es una pregunta que merece una reflexión profunda y necesito pensarlo detenidamente mañana.

3.  Por la tarde cociné para recibir a los amigos de sy. ¡Me cansé mucho! Bueno, mañana seguiré trabajando.

<a id="org68bf2d9"></a>

#### ¿Qué ideas tuve?

- Como se mencionó anteriormente, necesito considerar cuidadosamente cómo diseñar de manera compacta un cerebro externo para los Agentes de IA. Lo más simple podría comenzar con un conjunto de archivos `AGENT.md`. Lo intenté antes, pero la sobrecarga de mantener estos documentos en sí misma es bastante alta. Distinguir entre basura y experiencia realmente valiosa para registrar es un problema difícil. Por ahora, parece que la memoria, al igual que otros prompts, solo que quizás el agente tiene un bucle propio para actualizar la memoria. Lo más importante sigue siendo cómo medir los resultados del trabajo del Agente de IA.

- Respecto al punto anterior, leí un artículo que me pareció muy interesante. Ahora permíteme resumirlo con mis propias palabras: Primero, la evaluación del trabajo de un agente en un paso se puede dividir en varias categorías:
  1.  Evaluación con herramientas estáticas: compilador, linter, pruebas unitarias, pruebas integrales (e2e).
  2.  Evaluación con modelos: usar otro LLM para juzgar según el prompt que definamos.
  3.  Evaluación humana: yo juzgo.

  Luego, la evaluación sistemática de un Agente se divide en dos tipos:
  1.  **Tipo de capacidad:** Responde a la pregunta "¿qué puede hacer este agente?" Y la tasa de éxito puede ser baja, por ejemplo, quiero usar `legion` para ejecutar gradualmente tareas más grandes y difíciles, como explorar una nueva frontera.
  2.  **Tipo de regresión:** ¿Puede mantener las capacidades que tenía antes? Por ejemplo, probar repetidamente algunas tareas para garantizar que aún pueda implementarlas de manera estable.

  Entonces, cuando se introduce una nueva capacidad, debería pasar del tipo de capacidad al tipo de regresión.

  El artículo también menciona dos métricas muy importantes: `pass@K` y `pass^K`.
  - **pass@k:** De k intentos, al menos uno tiene éxito. Cuantos más intentos, mayor la probabilidad de al menos un éxito. Aplicable: Te importa el escenario de "encontrar al menos una solución utilizable".
  - **pass^k:** Los k intentos deben tener todos éxito. Cuantos más intentos, más difícil es mantener la consistencia. Aplicable: El usuario espera un agente de producción confiable cada vez.

  FYI: [Artículo de referencia](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Mi energía sigue siendo un poco baja. Trabajé un poco por la tarde, cociné por la noche y ya me sentí un poco cansado. ¿Cuándo podré ser como CZ y no necesitar dormir?

<a id="orge3ab04d"></a>

#### ¿Qué planeo hacer mañana?

1.  Pensar en este modelo de agente de evaluación (eval agent), continuar iterando este sistema multi-agente.
2.  El problema de seguridad del clúster, *debo* ocuparme de ello.
3.  `legion-github-bridge`
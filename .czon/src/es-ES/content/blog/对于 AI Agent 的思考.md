---
title: Reflexiones sobre los Agentes de IA
date: 2026-02-26
---

> Este artículo lo escribí junto con ChatGPT. Mi observación es: ChatGPT tiene una gran capacidad lógica, pero su expresión en chino es realmente extraña, no sé con quién aprendió chino.

Cuando la alarma de la madrugada me sacó de la cama, ya sabía cómo terminaría la noche: **la alarma sería útil, pero los registros serían una basura**. El pico de CPU en la pantalla era como una aguja, pinchando la burbuja de que el sistema "parecía estar bien"; mientras yo miraba ese montón de logs imposibles de analizar, anotaba mentalmente otra cosa: la disponibilidad no se construye con oraciones.

Fue también en ese momento cuando me convencí aún más de algo: lo que estoy haciendo ahora no es realmente "usar IA para escribir más código", sino **usar IA para escalarme a mí mismo**. Primero, sacarme de la posición de ejecutor, convertirme en la persona que dirige, acepta y es responsable de iterar este sistema, y luego intentar usar este sistema para escalar a otros.

Este ensayo comienza con este tema. Encendí el multi-agente, gasté tokens, sentí el placer de un creador. Y luego, inmediatamente, me estrellé contra el "muro de conocimiento implícito" del proyecto, y me vi obligado a recoger una por una esas cosas "que no parecen tan atractivas": evaluación, reportes, memoria. En medio, intercalé un resfriado, cocinar, juegos de mesa, cambiar de editor: no son desvíos, son las verdaderas restricciones de mi sistema: **solo tengo un cerebro, solo hay 24 horas en un día, y realmente me canso.**

---

## El primer sabor del punto dulce del escalado

Ese día, realmente puse en marcha el modo multi-agente de opencode: cinco agentes modificando cinco problemas simultáneamente. Esas dos horas de experiencia se parecieron mucho a la primera vez que hice funcionar la primera tarea de 6.824: ejecutar localmente un sistema distribuido MapReduce: los registros se deslizaban rápidamente, las tareas avanzaban al mismo tiempo, mi productividad pasó de "cultivo manual" a "cosecha mecanizada".

En este proceso, el límite semanal de tokens de mi plan Codex Plus también se agotó por primera vez tan rápidamente.

La paralelización es fácilmente adictiva, porque se siente demasiado bien: no necesito estar mirando constantemente, incluso puedo creer brevemente que ya me he librado del cuello de botella. Pero el costo de la paralelización es muy directo: **el costo es lineal y los errores se amplifican**. Si la dirección inicial es incorrecta, el multi-agente no es "probar varios caminos", sino "cinco coches cayendo juntos en la zanja".

Así que mi definición de "autonomía" pronto pasó de ser un eslogan a tres objetivos concretos: los escribí como un SLI:

- **Molestarme lo menos posible** (reducir el costo de las interrupciones)
- **Que trabaje lo más posible** (aumentar la producción efectiva)
- **Mejorar la confiabilidad tanto como sea posible** (no desviarse, no fallar, no arrastrarme al lodo del retrabajo)

Estos tres objetivos aparecieron repetidamente más tarde, convirtiéndose en la estrella polar de todas las decisiones de diseño de LegionMind.

---

## El cuello de botella soy yo mismo

Después de arrojar la mayor parte del trabajo de ejecución a los agentes, la racionalidad y los deseos humanos se convirtieron en el cuello de botella para avanzar en el trabajo.

Mi flujo de trabajo es más o menos así: desarrollo, organización diaria, pensamiento y salida: como máximo puedo ejecutar de manera estable dos o tres contextos simultáneamente. Más allá de este rango, mi programación falla, y el cansancio se acumula lentamente como una fuga de memoria. El sistema multi-agente no eliminó este problema, solo movió la "carga de ejecución", pero **la gestión del contexto, la aceptación, la toma de decisiones** todavía me corresponden a mí, y debido a que la IA realmente ejecuta muy rápido, la carga en otros aspectos se volvió más pesada.

Más tarde, comencé a ver el asunto del "registro de trabajo" con más honestidad, y así nació este [Diario de trabajo 2026](https://0xc1.space/diary/diary-2026/). También mencioné allí que escribirlo no es para recordar detalles en el futuro, sino para **descargar el contexto de mi cabeza**. El acto de registrar es en sí mismo una organización de la cadena de pensamiento, como ordenar las páginas sucias en la memoria y volcarlas al disco.

Incluso descubrí que si el registro se convierte en un ritual de "tener que sentarse a escribir durante treinta minutos", genera miedo; con miedo, se deja de actualizar; después de unos días sin actualizar, se acumula más y más, y al final es más difícil escribir. Por muy hermoso que sea el diseño del sistema, al aterrizar en los hábitos humanos, la realidad lo atraviesa. Sobre esto todavía estoy explorando, pero volvamos al tema principal y hablemos de IA.

---

## El "muro de conocimiento implícito": ¿Qué esperamos cuando damos instrucciones a la IA?

Cuando realmente llevé a los agentes a proyectos complejos, especialmente aquellos con monorepo, que abarcan múltiples paquetes, un accidente típico apareció muy rápido:

Le pedí a un agente que consultara una implementación similar (por ejemplo, vendor-okx) para integrar un nuevo módulo. El resultado fue que no solo aprendió la forma correcta de escribir, sino que también aprendió **prácticas obsoletas**: en mi propio caso, esta práctica obsoleta consistía en escribir el flujo de cuentas en una entrada que ya no se usaba. Para mí, esto era "conocimiento común que el proyecto ya había evolucionado"; para un nuevo agente, esta evolución era invisible.

En ese momento me di cuenta: el "aprendizaje" del agente se parece más a un ajuste a partir de muestras visibles, que a una comprensión de la historia desde la memoria organizacional. **No sabe cuál es el "estándar actual".**

Así, el "cerebro externo" pasó de ser un complemento agradable a una necesidad. Pero el cerebro externo también tiene un costo cruel: mantenerlo consume atención, y la atención es precisamente el recurso que más me falta.

Una vez intenté usar un conjunto de `AGENT.md` como memoria del proyecto, pero rápidamente me encontré con una dificultad: ¿cómo distinguir qué es ruido y qué es experiencia que vale la pena solidificar? Este no es un problema de redacción de documentación, es un **problema de evaluación**: debes saber qué hará que el agente fracase, qué puede mejorar significativamente su tasa de éxito, para que valga la pena escribirlo en la "memoria".

Cuando le damos instrucciones a la IA, ¿qué esperamos exactamente? Organizando esta estructura en un diagrama de bloques de "instrucción/conocimiento por capas", obtenemos lo siguiente:

```
┌────────────────────────────┐
│ ① Instrucción de tarea actual (lo que puedes aclarar) │
├────────────────────────────┤
│ ② Decisiones técnicas del proyecto / mejores prácticas locales │  ← Lo más fácil de "implicar" y también de hacer fracasar
├────────────────────────────┤
│ ③ Contexto del dominio (cuál es el problema)     │
├────────────────────────────┤
│ ④ Conocimiento de ingeniería / preferencias de estilo / experiencia acumulada │
├────────────────────────────┤
│ ⑤ Conocimiento de contexto mundial               │
└────────────────────────────┘
```

En una conversación, lo que realmente se puede transmitir claramente a la IA es solo la capa superior.

La conclusión es: cuanto más pequeño sea el contexto, más claras las instrucciones y menos lastre histórico, más fácil será para la IA completar con alta calidad. Cuanto más contexto implícito, más probable es que aparezca "trabajo inexplicable".

Esta es también la razón por la que nació LegionMind. No se requiere que la persona que da la instrucción "pueda escribir un prompt perfecto", sino convertir el conocimiento implícito de la segunda capa en algo que se pueda cargar y reutilizar.

---

## Alineación de intención + Verificación por capas

La versión actual de LegionMind obliga al Agente, según la instrucción del usuario, a recopilar información relevante del proyecto y escribirla en un documento exhaustivo al estilo RFC, buscando alinear al máximo las necesidades del usuario desde el principio. La razón es simple:

Cuando un sistema multi-agente comienza a fallar, la primera reacción humana suele ser: escribir RFC más largos, hacer revisiones más estrictas, comprimir el riesgo al frente. La colaboración entre humanos e IA retrocede a una forma similar a la cascada: avance lineal, poca flexibilidad, pero lo peor es: **me genera una carga mental bastante grande**.

¿Cómo logran las organizaciones humanas que los tomadores de decisiones de alto nivel no se vean abrumados por la información? ¿Cómo logran los tomadores de decisiones humanos que sus subordinados actúen con libertad? Al respecto, CZ tiene algunas [reflexiones](https://readme.zccz14.com/zh-Hans/how-to-solve-human-control-desire-controllable-trust-in-human-machine-collaboration.html)

Esencialmente se trata de:

1.  **Alineación de intención**: que el agente no se desvíe.
2.  **Verificación por capas**: que los errores se expongan lo antes posible y se puedan revertir fácilmente, en lugar de descubrir al final que la dirección era incorrecta.

Esto no son palabras vacías. Le asigné un diagrama de flujo tipo "línea de producción" para restringir la forma en que interactúo con el agente:

```
          ┌──────────┐
          │  Intención   │  Objetivo/Restricciones/Qué no hacer
          └────┬─────┘
               │
          ┌────▼─────┐
          │   Plan    │  Desglose, hitos, suposiciones
          └────┬─────┘
               │
          ┌────▼─────┐
          │ Ejecutar   │  Escribir código/Modificar config/Generar doc
          └────┬─────┘
               │
     ┌─────────▼─────────┐
     │     Verificar      │  Verificación por capas (lo más barato primero)
     │  - build/lint/test │
     │  - e2e/bench       │
     │  - evaluación modelo│
     │  - revisión humana │
     └─────────┬─────────┘
               │
          ┌────▼─────┐
          │  Reportar │  Conclusión + Evidencia + Riesgo
          └────┬─────┘
               │
          ┌────▼─────┐
          │  Memoria  │  Solidificar diferencias "dignas de recordar"
          └────┬─────┘
               └──(Retroalimenta a Intención/Plan: forma un ciclo cerrado)
```

La clave de este flujo no es "ser más complejo", sino adelantar la verificación y convertir la retroalimentación en un ciclo cerrado. Puede combatir los dos tipos de desgaste más comunes:

-   Avanzar en paralelo con la dirección incorrecta (gran hemorragia de tokens)
-   Dirección correcta pero detalles poco confiables, que llevan a retrabajo repetido (desgaste mental)

---

## Los dos lenguajes de evaluación: pass@k y pass^k

Hay un [artículo](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609) sobre cómo evaluar el desempeño de los Agentes de IA que me resultó muy inspirador.

Al usar IA para completar tareas, generalmente se dividen en dos tipos de trabajo completamente diferentes:

-   **Tipo exploratorio de capacidades**: no importa acertar a la primera, solo saber "si es posible que lo logre". Aquí el foco está en `pass@k`: al menos un éxito en k intentos.
-   **Tipo de regresión de producción**: no se acepta "ocasionalmente funciona", se necesita "confiable cada vez". Aquí el foco está en `pass^k`: los k intentos deben ser todos exitosos.

El mismo sistema, en diferentes etapas, debe hablar con diferentes métricas. En la etapa de exploración de capacidades se puede hablar menos y escuchar más, permitiendo que el Agente de IA despliegue todo su rico y erudito conocimiento del contexto mundial; en la etapa de regresión debemos enfocarnos en la consistencia.

```
        ┌────────────────┐
        │  Evaluación Humana │  Persona revisa diseño/riesgo/condiciones límite (más caro)
        ├────────────────┤
        │  Evaluación Modelo │  rúbrica/alineación/verificación consistencia (medio)
        ├────────────────┤
        │  Estático / Herramienta │  build/lint/unit/e2e (más barato)
        └────────────────┘
```

El principio es simple: lo que se pueda juzgar con herramientas, reducir al máximo el consumo cognitivo.

---

## La "interfaz de reporte" es un problema de ingeniería subestimado

Los capítulos anteriores hablaban de "cómo hacer que el agente haga las cosas". Otro punto importante aparte de eso es "cómo hago que la aceptación me cueste poco". Esta parte todavía la estoy pensando, pero tengo algunas ideas simples que puedo compartir aquí.

La idea central es: el reporte de la IA no puede quedarse en Markdown plano y diff de código. En las organizaciones humanas, los subordinados a menudo necesitan presentaciones (PPT), incluso un intermediario que actúe como "transmisor costoso", comprimiendo información compleja en conclusiones, evidencia y riesgos que permitan la toma de decisiones.

Entonces, ¿cuál debería ser el reporte de la IA?

Una idea muy concreta: **cada conclusión debería enlazar a un artefacto**. Por ejemplo:

-   "Esta función está completada" → enlace al reporte de prueba e2e, diff clave, script de experimento de reproducción.
-   "Esta opción es mejor" → enlace a comparación de benchmark, evidencia de logs, cambios de configuración.
-   "Aquí hay un riesgo" → enlace a la lista de incertidumbres conocidas, plan de reversión.

Incluso podría haber un Agente de Citas especializado: no escribe código, solo hace una cosa: vincular conclusiones y evidencia.

Si la interfaz de reporte mejora, los humanos pueden confiar más y la autonomía se establece realmente. De lo contrario, por muy impresionante que sea la capacidad del agente para escribir código, todavía tendré que gastar mucha energía en "leer lo que escribió, adivinar qué hizo realmente", lo cual entra en conflicto con el "menos desgaste" que quiero.

---

## Iteración de ingeniería

Para febrero, se lanzó Chatgpt codex 5.3, y la experiencia realmente hace que se sienta muy inteligente. Esto también me generó una preocupación: ¿establecer el flujo de trabajo demasiado rígido podría desperdiciar el potencial de la IA?

Lo que LegionMind ha estado intentando es: dado un marco determinado, dado un SOP relativamente maduro en un dominio (capas 3 y 4 anteriores), hacer que los Agentes corran en la vía dada, reduciendo la desviación. Pero cuando el modelo es más inteligente, tal vez la forma más razonable sea: solo doy el objetivo, las restricciones, el mecanismo de evaluación, y dejo que él diseñe el camino más adecuado.

Esto también significa que otra cosa debe suceder: debo comparar el desempeño de diferentes versiones del sistema de manera más científica, no solo decir por sensación "esta versión es más inteligente".

Así, el "benchmark" en mi mente pasó de ser una idea a una necesidad: necesito un conjunto de pruebas de regresión para tareas de codificación complejas, usar el mismo conjunto de tareas para cuantificar:

-   `pass@k` (exploración de capacidades)
-   `pass^k` (confiabilidad de producción)
-   Costo (tokens/tiempo)
-   Tasa de retrabajo (número de intervenciones humanas, rondas de modificación)
-   Cobertura (estabilidad al cruzar proyectos, paquetes)

Solo así podré realmente "iterar el sistema", no "iterar el estado de ánimo".

Sobre esto, haré dos cosas a continuación:

1.  Examinar los benchmarks de codificación LLM disponibles en el mercado para ver si hay algo que se pueda usar directamente.
2.  Diseñar un conjunto de benchmarks (preguntas de entrevista para LLM) según nuestros escenarios reales, para que diferentes versiones de LLM y Legion completen tareas. Incluso se podría hacer una evaluación 360.

---

## 8. Hito

Una noche, finalmente logré completar una tarea de http-proxy que abarcaba múltiples proyectos usando este sistema LegionMind. El proceso no fue elegante, incluso tocó los límites del sistema actual: el subagente ocasionalmente fallaba, el contexto entre paquetes hacía frágil la colaboración multi-agente.

Pero el resultado fue un hito que me importa mucho: básicamente puedo prescindir de la codificación. En la mayoría de los casos, solo necesito dejar algunos comentarios de revisión en los documentos de diseño.

Este cambio me hace sentir muy cómodo: pasar de ejecutor en el teclado a revisor, tomador de decisiones, iterador del sistema. Es decir, lo que dije al principio: escalarme a mí mismo.

Al mismo tiempo, también estoy más dispuesto a admitir un principio de realidad: **no hagas ruedas que sean fácilmente aplastadas por las olas**. Descubrí que cierta plataforma de capacidades en sí misma está evolucionando (por ejemplo, opencode ya está haciendo algunas cosas que un bridge podría hacer), prefiero detenerme primero y concentrar la energía en capacidades de capa de sistema que "subirán junto con la superficie del mar": evaluación, memoria, reportes, confiabilidad.

---

## La domesticación mutua entre yo y los Agentes de IA

Al llegar a este punto, me doy cuenta de que en este mes y algo, los Agentes de IA y yo nos hemos estado domesticando mutuamente:

-   Yo los domestico: con SOP, verificación, interfaz de reporte, llevándolos de "modelo que escribe código" a "sistema entregable".
-   Ellos me domestican: me obligan a admitir los cuellos de botella humanos, la importancia de la evaluación, que la organización y los procesos son el núcleo del problema.

Si tuviera que comprimir esta experiencia en unas pocas frases, ahora probablemente creo:

1.  **La autonomía no es solo ser inteligente, es molestar poco, producir mucho, ser verificable.**
2.  **Lo más costoso no son los tokens, es el retrabajo y la fuga de atención.**
3.  **El conocimiento implícito hace fracasar al agente más fácilmente que el código. El cerebro externo es imprescindible, pero debe ser mantenible.**
4.  **La verificación debe ser por capas, los objetivos por etapas: primero pass@k, luego pass^k.**
5.  **La interfaz de reporte de la IA debe ser de ingeniería: las conclusiones deben llevar evidencia, idealmente con un clic hacia el artefacto.**
6.  **Cuando el modelo se fortalece, el flujo puede tener que ceder control a la IA; pero la premisa para ceder control es tener un benchmark.**

A continuación, probablemente seguiré haciendo dos cosas: una, establecer el sistema de benchmarks, para que "iterar legion/el sistema multi-agente" se convierta en algo medible; dos, completar la cadena de reporte/citas/artefactos, para que pueda entregar las cosas de manera más fácil y estable.

En cuanto al deseo más simple: **"desgastarse lo menos posible"**, ahora creo que no es un deseo, debería ser un requisito no funcional del sistema. Mientras siga escribiendo código, me sigan despertando las alarmas, juegue juegos de mesa y cocine, este requisito siempre será válido.
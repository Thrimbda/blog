---
"title": "Diario de trabajo 2020"
"summary": "Este documento es el diario de trabajo del autor para la primera mitad de 2020, detallando las actividades laborales desde abril hasta julio. Incluye principalmente el desarrollo del sistema de compilación de datos de mapas, corrección de errores, refactorizaciones técnicas (como la refactorización TLM), colaboración en equipo (por ejemplo, discusiones sobre interfaces y soluciones con colegas), entrevistas y reflexiones sobre el desarrollo profesional personal. El documento no solo cubre tareas técnicas específicas (como límites de velocidad personalizados, vinculación de líneas de carril, corrección de fugas de memoria), sino que también contiene reflexiones del autor sobre eficiencia laboral, calidad del código, gestión de proyectos (como tuberías CI/CD) y planificación profesional. En el diario, el autor expresa en múltiples ocasiones la búsqueda del significado del trabajo, el pensamiento crítico sobre decisiones técnicas y los cambios de mentalidad en un entorno de entrega de alta presión."
"tags":
  - "Diario de trabajo"
  - "Desarrollo de software"
  - "Datos de mapas"
  - "Reflexión técnica"
  - "Colaboración en equipo"
  - "Gestión de proyectos"
  - "Desarrollo profesional"
"date": "2020-01-01"
---

### 2020-04-13

- Completé la autoevaluación de desempeño.
- Revisión de la Agregación del Centro del Carril (Lane Center Aggregation).

### 2020-04-14

- [ ] Compilación de límites de velocidad.
- [ ] Límites de velocidad personalizados.

### 2020-04-15

- Determiné la solución para límites de velocidad personalizados con @guangcong.
  1. Usar un nuevo `module-dynamicEvent` para resolver este problema.
  2. La actualización del límite de velocidad personalizado actúa como un nuevo evento que desencadena la actualización de los datos de horizonte.
  3. Es necesario considerar la detección de excepciones y problemas de memoria.
     Después de discutir con Guangcong, él encontró algunos problemas.
- Revisión de Xiaokang.
  Java, como un lenguaje sólido, tiene mucho que ofrecer.
- Compilación de límites de velocidad.
  Progreso casi nulo. Añadí la lógica para extraer `RoadCenterTile`.
- Resolución del problema de Seccionamiento (Sectioning). Analicé el esquema de optimización `edgeLifting` y propuse un algoritmo de optimización:
  Dada una cabeza de recorrido (`traverse head`) y una función de conectividad, se proporciona la forma de recorrido.
- Investigué el principio del JAR auto-ejecutable.

### 2020-04-16

- Aclaré la interfaz de límites de velocidad personalizados (`custom speed limit`) con Yiming: él garantiza que el par de ubicaciones de entrada pueda determinar una única ruta más corta.
  Luego, con Guangcong, analicé el algoritmo para generar límites de velocidad personalizados.
  1. Dada una ruta.
  2. Sabiendo que `| start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1`,
     entonces siempre se puede encontrar un par `(start DiRoadOnPath, end DiRoadOnPath)` que minimice la distancia.
- Proporcioné a Xiaokang una versión instantánea (`snapshot`) utilizable del compilador pylon-v0.1.1.
- Di un paseo y charlé con Hanteng.
- Aclaré con Zizhe y Yicheng la interfaz de uso del mapa SUMO.
- La compilación del límite de velocidad (`SpeedLimit`) fue exitosa, pero aún no se ha verificado.

### 2020-04-17

- Verificación de la compilación de `SpeedLimit`:
  `OSMSerializable` no es muy adecuado porque el `SpeedLimit` después de la vinculación no tiene geometría.
  Posible problema: la vinculación del límite de velocidad podría fallar en las rampas de entrada/salida.
- [ ] Interpolación.
- [ ] Distancia de Hausdorff.
- [ ] `LcInJunctionTile`.

#### Algunas ideas peculiares

- ¿Implementar Spark directamente?
- ¿Qué necesita el Contexto de OSM?

### 2020-04-18

Completé los límites de velocidad.

### 2020-04-20

#### Límites de velocidad personalizados

- Guangcong cambió la entrada a un vector y añadió pruebas.
- Un pequeño problema es que Guangcong no entiende realmente el principio de funcionamiento de los punteros en C++.
- [ ] ¿Quizás intentar resolver [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337)?
- [ ] Convertir el archivo compartido por el tío en un enlace anónimo a través de Resilio Sync.

#### Corrección de `RoadBorder`

Descubrí que había hecho una suposición incorrecta. La información de `lc` y `rb` registrada en `rc` podría presentar:

1. Solo hay un `lc`, por lo que no se puede asumir que `lc` tenga al menos dos.
2. El `rb` en un lado podría no existir, por lo que no se puede asumir que `rb` siempre exista.

### 2020-04-21

#### Corrección de `RoadBorder`

- Completé la migración de los casos de prueba.
- Mejoré Dune y su `ReadMe` para que pueda generar datos de prueba directamente.
  Hablé con Weiyu sobre el futuro. Me centraré en el sistema de compilación.

#### Vinculación de POI en carriles opuestos

- Realicé la vinculación (`binding`) para los datos después de `multidigitize`.

### 2020-04-22

#### Vinculación de POI en carriles opuestos

- Realicé la vinculación (`binding`) para los datos después de `multidigitize`.
- Construí datos de prueba.

### 2020-04-23

- Completé y depuré la vinculación de POI en carriles opuestos [4].

### 2020-04-27

Hoy me centré principalmente en lo siguiente:

#### Completar la sincronización entre `mdm proto` y `mdm spec`

1. Junto con Linnan, corregimos partes de la especificación `mdm` que estaban mal expresadas.
2. Dejamos varios elementos pendientes que Linnan y yo no podíamos decidir por nuestra cuenta.
3. En la reunión matutina del 2020-04-26, se decidió posponer las modificaciones más problemáticas de `LaneSplitMerge` y `Polyline`.
4. Completé las modificaciones en `proto`.
5. Completé las modificaciones en `nexus`.
6. Completé las modificaciones en `mdk`.
7. De paso, también solucioné un problema con los datos de prueba (reportaba errores de datos de forma masiva).

#### Corrección de errores

Cerca del lanzamiento del 30/04, el número de errores aumentó drásticamente.

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analizado.

- [ ] Script para copiar automáticamente casos de prueba.
- [ ] Exportar recordatorios de Apple.

### 2020-04-28

El examen teórico de conducir (科一) me tomó medio día.

HDMAPMDK-1130 Problema de ancho, tres cuestiones:

1. La especificación establece que no hay ancho de carril durante los cambios de carril.
2. Líneas de intersección demasiado largas que causan división de líneas (`split line`).

Re-corrección de HDMAPMDK-1121.

Estado de ánimo muy bajo.

### 2020-04-29

#### Corrección de errores

- HDMAPMDK-1143
  Problema de que `RoadObstacle` no se compilaba.
- HDMAPMDK-1090

### 2020-05-06

#### Validación de Du

- Uso de `mill`.
- Uso de `nexus-osm`.

#### Tormenta de ideas (`Brainstorm`)

### 2020-05-08

#### Problema de fuga de memoria

- La causa directa de la fuga de memoria fue crear punteros salvajes (`wild pointers`) con `new` y no eliminarlos con `delete`.
- Después de `update current position`, `map kit` llamó a `prepareGuidanceData` para encontrar los datos de guía más cercanos a la posición actual.
- `prepareGuidanceData` llamó a `NavInfoProviderImpl::getTrafficLights` y `NavInfoProviderImpl::getCarParks`.
- Tomando `NavInfoProviderImpl::getTrafficLights` como ejemplo, se creaban (`new`) punteros de datos en `NaviEventOnPath` durante la llamada.
- Sin embargo, no se realizaba `delete`.
- También se descubrió que `DestEvent` tenía este problema.

Solución: La clave es no permitir punteros salvajes. Decidí refactorizar `NaviEventProvider`.

- Primero, añadir dos campos `traffic_light_events` y `car_park_events` a `NaviInfoProvider`.
- En `NaviInfoGenerator`, actualizar estos dos campos después de que la ruta se actualice.
- Luego, en cada llamada `get`, filtrar según la posición actual del vehículo.
- Por lo tanto, es necesario refactorizar `PathReader::getAttributes`, porque la implementación anterior solo consideraba el desplazamiento (`offset`) relativo al vehículo actual. Ahora se necesita una interfaz de desplazamiento relativo a la `Path`.

### 2020-05-09

#### Corrección y pruebas de `PolyLine`

El problema principal de `PolyLine` era que podían introducirse puntos duplicados durante su generación, lo que causaba problemas en cálculos geométricos relacionados con segmentos:

1. Cálculo de vectores: dos puntos duplicados producen un vector cero.
2. Cálculo de longitud: la longitud del segmento es 0, lo que fácilmente produce problemas de `NaN`.

Por lo tanto, al construir `PolyLine`, se verifican los puntos. Si se encuentran puntos duplicados, se lanza una excepción.

Se detectaron los siguientes problemas:

- Problemas con `getEnd` en JTS.
- Problemas de `normalize` en `Jts LinearLocation`.

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // la salida es -1
  ```

- Al interpolar, se podrían tomar dos puntos demasiado cercanos.

### 2020-05-11

- HDMAPMDK-1122
  El problema de la falta de líneas de borde de la carretera no se pudo reproducir. Decidí no investigar más la causa.
- Media hora sobre la teoría del crecimiento metabólico.
- Refactorización de `Visitor` para que admita líneas con el mismo punto de inicio y fin.
- Preparé una pregunta para una entrevista.

### 2020-05-12

- Entrevista: dos candidatos no calificaron. Reflexioné sobre cómo identificar rápidamente a los candidatos. Tiempo invertido: 3 horas.
- Corrección de error: HDMAPMDK-1211 Problema de eliminación incorrecta de `border`. No se solucionó correctamente en la corrección anterior.
  Tengo una idea pero no la he terminado de escribir.
- Fui al gimnasio.

### 2020-05-13

Corrección de error: HDMAPMDK-1211 Encontré una solución.

- La causa raíz fue una división inadecuada de la línea de producción.

#### Análisis de la causa

Se puede observar que la división se realizó antes de que finalizara el cambio de carril (la línea central del carril aún cruzaba la línea del carril), y esta división podría cruzar `Rp`.

La información de observación de `lane border` adjunta a los puntos de forma de `lanecenter` registra fielmente las líneas de carril a ambos lados utilizando un método de `scan line` basado en la geometría, sin filtrar según la semántica. Por lo tanto, en la posición donde la línea de carril cruza el carril, la línea central del carril que intersecta con la línea de carril registrará esa línea de carril tanto en las referencias de `border` izquierda como derecha.

Bajo la lógica de código existente, al filtrar las referencias de `border` de las líneas de carril intersectadas según la semántica, se infiere la referencia de `border` a eliminar basándose en el tipo de cambio de carril.

La lógica actual falla al encontrar este tipo de divisiones, lo que lleva al problema.

#### Solución

El punto clave es **encontrar la tendencia de cambio de carril de la línea de carril intersectada**. Dado que este tipo de división puede cruzar `Rp`, el filtrado no debe realizarse por unidad de `Rp`.

1. Primero, organizar las líneas de carril en `paths` utilizando `edge lifting` (puede considerarse para una futura refactorización del grafo): `Seq[LaneCenter]`.
2. Encontrar el `LaneCenter` a corregir y el `lane border` a corregir (asumiendo que este tipo de `LaneCenter` es causado por un cambio de carril).
3. Calcular la tendencia de cambio de carril de ese `LaneCenter` según su `path`.
4. Aplicar el filtrado.

Se lo asigné a Ziliang.

Entrevisté a una persona que no pasó.

### 2020-05-14

HDMAPMDK-1132 Rastreo de ID (`Id tracing`) para los puntos finales de las líneas de carril de señales de poste.

El problema de rastreo para los puntos finales de las líneas de carril de señales de poste es mucho más simple en comparación con el rastreo de objetos lineales, ya que solo implica el mapeo de IDs, sin mapeo de desplazamiento (`offset`) y longitud.

Sin embargo, hay varios aspectos a considerar:

1. Procedimiento.
2. El sistema de tipado de IDs (`Id Typing System`) es un problema persistente que necesita abordarse.

La raíz de este problema es que al definir IDs, usamos `Long Id` en todas partes, mientras que la definición de MDM usa `Int`, lo que podría causar problemas de desbordamiento (`overflow`).

### 2020-05-15

#### Corrección de errores

- HDMAPMDK-1215 completado.
- HDMAPMDK-1218 Hecho.

### 2020-05-18

Refactoricé el `OSM Assembler`, utilizando la serialización OSM anterior. La facilidad de comprensión del código y la facilidad de escritura mejoraron.

### 2020-05-19

Solucioné un error (en realidad no era exactamente un error) en el `OSM Assembler`.

Hoy tuve la reunión de planificación del sprint (`sprint planning`):
Las tareas para este sprint no son muchas, pero hay mucho en qué pensar. Este es un estado saludable.

### 2020-05-20

- [ ] Escribir documentación describiendo el estado actual de CI en `nexus/mdk` y los requisitos.
- [x] Prestar atención al error HDMAPMDK-1263.
  - Efectivamente es un problema de división de la línea de producción.
- [ ] Concertar una reunión con Yangchuan para discutir CI.
- [ ] HDMAPMDK-1262.
      No terminado.
- [x] Problema de Límites de Velocidad Personalizados (`Custom Speed Limit`).

### 2020-05-21

#### TAREAS

- [x] Saludar a Qiaobo.
- [x] HDMAPMDK-1262.
- [x] HDMAPMDK-755.

#### TRABAJOS

- Por la mañana fui al área de trabajo de Yiming para depurar en línea el `hotfix` de ayer. El resultado fue un problema relacionado con el `offset`. Ayer lo escribí demasiado apresuradamente y no añadí ninguna prueba. Este tipo de comportamiento no debería repetirse. Pensé que ahorraba mucho tiempo, **pero en realidad perdí más tiempo**.
- La razón por la que 1262 no obtenía datos era que MDK no cargaba las marcas viales (`road mark`) a nivel de carril (ni los obstáculos viales `road obstacle`).
- Ayudé al hermano Du a compilar datos.

### 2020-05-22

¿Qué hice este día???
¿Qué hice???

### 2020-05-25

Hoy recibí una nueva tarea: HDMAPMDK-1249 - Investigar métodos para calcular la agregación de carriles (`lane aggregation`) utilizando información geométrica de la carretera. Esto aumentó un poco las tareas de esta semana. Hasta ahora, tengo tres cosas por hacer:

1. 1249.
2. Estado actual, requisitos y plan para la tubería CI (`CI Pipeline`) del equipo.
3. Refactorización del grafo de Nexus.

Cada una requiere una cuidadosa planificación y no es fácil. Lamentablemente, no puedo estimar con claridad el tiempo para cada una. Solo Weiyu estimó y escribió los `story points` en las tareas de Jira. Una cosa tengo clara: **si no empiezo a estimar y revisar, nunca estimaré con precisión**. Así que a partir de ahora, debo estimar cuidadosamente.

Además, planeo comenzar con 1249 hoy, ya que es un asunto de negocio y generalmente es más urgente, y Weiyu también le dará más importancia. En cuanto a la refactorización, si no me preocupo por ello, probablemente a nadie más le importará (porque, cruelmente, no afecta la funcionalidad, sino la eficiencia, y la eficiencia es lo más difícil de medir, incluso yo solo tengo análisis cualitativos).

### 2020-05-26

Hoy hubo muchos imprevistos. Primero, `parking` reportó dos errores. Originalmente planeaba entregar hoy, pero debido a estos errores, no pude. Wang Wei negoció con los equipos posteriores (`downstream`) y pospuso la entrega dos días hasta pasado mañana. Así que mi trabajo principal estos dos días se convirtió en solucionar errores. Esto me hizo reflexionar sobre si la planificación durante las entregas es razonable. Luego, el problema HDMAPMDK-1290.

Lo que completé hoy:

- Seguimiento de HDMAPMDK-1290: cuando se está extremadamente cerca de la línea de parada (`stop line`), el `offset` del carril (`lane offset`) coincidente puede ser mayor que la longitud del carril (`lane length`).

  > Pasé casi todo el día investigando y tratando de resolver este problema (actualmente son las 8:56 p.m.). La eficiencia fue muy baja.

  La razón esencial es que MDK calcula la longitud tomando la longitud entre cada dos puntos y aplicando una `coordinate transform`. Aunque esto es más preciso, introduce una fuerte incertidumbre en los resultados.

  Finalmente, usé una solución un tanto `hack`: si el `offset` calculado es mayor que la longitud, simplemente se toma la longitud.

- HDMAPMDK-1297 Vinculación incorrecta de plazas de aparcamiento.
  Aunque se acercaba la hora de salida original (9 p.m.), ¡hoy tenía que al menos analizar este problema!
  Vaya, lo solucioné. Resultó ser un problema simple.

### 2020-05-27

Hoy, si no hay imprevistos, debo terminar el asunto de la tubería CI (`CI Pipeline`).

Pero hubo un imprevisto - -

Recibí errores reportados por Yiming:

1.  Vinculación de semáforos: un semáforo que debería estar vinculado a un área de espera (`待转区`) se vinculó a la `partition` anterior al área. Ya corregido (1.5h).
2.  Omisión de vinculación de semáforos: no pude reproducirlo.
    Actualización: después de una difícil sesión de depuración, finalmente encontré el problema. Durante la compilación, la geometría utilizada para vincular `rc` con `offset` no era la misma línea, lo que causaba que el `offset` excediera la longitud de la carretera, impidiendo encontrar el semáforo (2h).

### 2020-05-28

Mañana tengo el examen práctico de conducir (科二). Hoy practiqué conducción todo el día, regresando a las 5 p.m. Me sentí bastante bien, espero aprobar mañana.

Comencé a describir el estado actual y analizar los requisitos de la tubería CI (`CI Pipeline`) - -

### 2020-05-29

No aprobé. Ay, es muy difícil para mí.

Por la mañana fui al examen. Por la tarde hice algunas cosas:

1.  Fui a ver una situación anómala con Yiming, resultaron ser dos errores.
2.  Después del `townhall`, sincronicé sobre el enlace (`binding`) de Python para MDK.
3.  Fui con Shanle y Weiyu a resolver un problema de los equipos posteriores (`downstream`). Finalmente, resumimos una solución a corto plazo y otra a largo plazo.

Descubrí que al enfrentar problemas imprevistos, el método para resolverlos generalmente debería seguir este patrón:
Una solución a corto plazo y otra a largo plazo. Porque el valor expuesto por un problema es limitado y tiene un plazo. Por lo tanto, la solución a corto plazo se centra en resolver la urgencia de manera rápida y precisa. ¿Se necesita una solución a largo plazo? Generalmente sí, porque un caso particular de un problema refleja un punto ciego en soluciones anteriores no consideradas. En este caso, analizar la causa raíz y resolverla sistemáticamente permite que este tipo de problemas se resuelvan bien en el futuro, haciendo que la solución original sea más completa. También hay casos en los que no se necesita una solución a largo plazo: cuando **después de un análisis exhaustivo** concluimos que el costo de resolver el problema sistemáticamente supera los beneficios. (Incluso así, en la mayoría de los casos, subjetivamente queremos resolverlo sistemáticamente. ¿Qué ingeniero no desea resolver problemas de manera sistemática? Pero esto deja una trampa: puede llevar a resolver cosas importantes pero no urgentes, o ni importantes ni urgentes, desperdiciando un tiempo valioso que podría usarse para otros problemas más valiosos).

4.  Por la noche, continué con el asunto de la tubería CI (`CI Pipeline`).

### 2020-06-01

Esta mañana, apenas llegué, fui con Yiming a analizar un problema. Lo analicé toda la mañana. Resultó ser un problema conocido anteriormente (falta de puntos debido a la interpolación del compilador antiguo) que causó otro problema: al capturar la ruta (`抓路`), justo cerca del segmento faltante, el `lane offset` resultaba negativo.

Terminé trabajando hasta muy tarde, pasadas las 4 a.m., después de una noche de trabajo ineficiente y agotador (siento que en mi estado actual, siempre que trabajo hasta muy tarde, generalmente se asocia con baja eficiencia).

### 2020-06-02

Llegué por la tarde. Para que Yiming pudiera subir al vehículo (`上车`), solucioné algunos errores y logré que estuviera listo para la sesión nocturna de Yiming.

### 2020-06-03

Apenas llegué por la mañana, fui a ayudar a Yiming con un problema descubierto la noche anterior: no se podían obtener los datos de los semáforos.

### 2020-06-04

Esta mañana tenía tres cosas que hacer:

1.  Limpieza de datos y carga final de los datos del 05/06.
2.  Revisar el problema de anomalía en el ancho - se debía a que no había carril en esa ubicación.
3.  Revisar el problema de asignación incorrecta de puntos de interpolación a carriles.
4.  Revisión final.

### 2020-06-05

Un día intenso y emocionante. Completé HDMAPMDK-1347 y HDMAPMDK-1352, y también hice una gran refactorización.

Aprendí una valiosa lección: cerca de una entrega, no te arriesgues haciendo cambios enormes. Porque sin suficientes pruebas de QA, incluso la refactorización más impresionante puede traer riesgos. Además, sin tiempo suficiente para revisar el diseño (me refiero a mí mismo, porque a veces, mientras escribes, te das cuenta de que el diseño podría estar mal; sin embargo, descubrir problemas en el diseño durante la implementación es otro problema: comenzar demasiado pronto).

Complemento del lunes:
Durante este día de intensa refactorización, casi no paré, ni siquiera tuve tiempo para pensar. Solo pude confiar en la familiaridad y el estado de flujo (`flow`), escribiendo código con una eficiencia extremadamente alta. En realidad, si no consideramos el principio de no hacer grandes refactorizaciones antes de una entrega, disfruté mucho ese estado. Pero todo debe tener un objetivo y un significado; no se puede solo buscar la satisfacción personal, de lo contrario, esa satisfacción se convierte en un placer superficial.

### 2020-06-08

El sábado me mudé a trabajar a Beijing.

Volver a trabajar en Beijing se siente un poco desconcertante. Todo ha cambiado. Primero, no tengo un puesto de trabajo asignado (Xiuyun contrató a un pasante, y para facilitar el trabajo, su pasante ocupa mi lugar). Esta es la parte más incómoda de toda esta pérdida. Es como cuando llegué a la clase 1 en segundo año de secundaria y me senté en un nuevo lugar sin conocer a nadie, sin ganas de hablar con ellos. La gente aquí parece familiar pero extraña. Siento que tengo pocos amigos aquí, lo cual, juzgando racionalmente, es una ilusión. Pero la sensación de no querer comunicarme con la gente, de querer encontrar un rincón donde estar, es real. Y de hecho encontré un rincón, al lado de Yuzhang. ¿Por qué no quiero comunicarme? Todavía no logro entender este problema. ¿Quizás porque no tengo una razón clara? Cuando me preguntan por qué vine a Beijing y por cuánto tiempo me quedaré, respondo evasivamente: "un tiempo, uno o dos meses". O tal vez muestra que, en esencia, soy una persona introvertida, que no le gusta causar molestias y se preocupa mucho por parecer tonto ante los ojos de los demás. Sin embargo, cuanto más escribo, más creo que el segundo componente es mayor e innecesario. Primero, parecer tonto es mejor que ser realmente tonto. Pregunta seriamente a los demás, incluso si es torpemente. No temas, no temas cuando eres joven. No temas en ningún momento. Todo está bien (`All is well`).

Ahora, hablemos del trabajo. Durante este tiempo, terminé la entrega, principalmente la refactorización de TLM (`typed lane model`). Esta vez debo definir claramente los objetivos y controlarme, no refactorizar por impulso. Debo tener una estrategia y controlar mi progreso.

Además, configuré mi computadora de escritorio. Resulta que antes no podía conectarme a Internet porque había cambiado la contraseña. Después de un corte de energía, la conexión de red se perdió por completo. Así que también necesito configurar la máquina. Esta vez, los objetivos por prioridad son:

1.  Productividad.
2.  Genialidad (`Cool`).
3.  Estética.

Hoy leí durante mucho tiempo el blog de Wang Yin - - sigo desintoxicándome. Antes siempre era un fanático religioso frenético, incapaz de ver la esencia de las cosas. Siempre pensaba que algo era la solución definitiva a todos los problemas. Pero en realidad, tales "soluciones definitivas" son raras. La mayoría de las veces es solo fervor religioso, como:

-   Vim vs Emacs
-   OOP vs FP
-   Go vs Rust

Etc., etc... Cuando recién me familiaricé con OOP, pensé que OOP era invencible, que podía resolver todo. Pero al final, solo escribí un montón de clases similares (`天下大同类`), donde realmente no importaba si existía la clase o no; lo útil eran las funciones dentro de cada clase. Más tarde (estos últimos dos años), me familiaricé con FP y pensé que FP era la bala de plata para resolver todos los problemas. Pero después de escribir programas en Scala por un tiempo, descubrí que mi productividad no mejoró mucho; al contrario, me obsesionaba con la sintaxis y la inmutabilidad (`Immutable`), lo que reducía mi eficiencia.

### 2020-06-09

Encontré un poco de ritmo. Instalé Arch, y se siente incluso más cómodo de usar que macOS.

Jugué Tavern Brawl (`酒馆战棋`) con Yuzhang por un buen rato - -

### 2020-06-10

Hoy planeo hacer estas cosas:

1.  HDMAPMDK-1199 `RoadMark` como subclase, proporcionando información más rica.
2.  HDMAPMDK-892 Proporcionar trayectorias de experiencia (`经验轨迹`).

Si me sobra energía, trabajaré en la documentación para lanzar versiones.

Resultado: Completé el 892.

### 2020-06-11

Revisé HDMAPMDK-892 - Proporcionar trayectorias de experiencia.

Descubrí que MDK aún no tenía la adaptación correspondiente. Esta tarde me dediqué a hacer esa adaptación.

Terminé la adaptación. Estoy muy cansado.

Sigo configurando mi Arch, tratando de registrar algunos pasos de la instalación como parte de la automatización.

### 2020-06-12

La tarea de hoy es completar HDMAPMDK-1199. Había olvidado este problema anteriormente.

Finalmente lo completé a las 8 p.m.

### 2020-06-13

Un día muy tranquilo. Después de enviar a pruebas (`提测`), estuve jugando con mis scripts de automatización.

Al principio pensé en usar shell, pero realmente no me gusta shell, así que comencé a explorar scheme. ¡Qué divertido!

### 2020-06-15

Guau, son las 3 p.m. y he estado holgazaneando casi todo el día, navegando por varios sitios web relacionados con scheme y cosas por el estilo. ¡No puedo seguir así!

Hoy debo completar HDMAPMDK-1378, que es algo que siempre hemos querido evitar: agregar la llamada dirección de la marca de carril (`lane mark direction`) dentro de las intersecciones. Pero las carreteras dentro de las intersecciones no tienen marcas de carril, ¿cómo puede haber dirección de marca de carril?

Ay, me siento muy incómodo. Después de varios intentos, trabajé hasta muy tarde.

### 2020-06-16

Hoy, después de llegar, estuve revisando (`review`) todo el tiempo. Hay bastantes cosas que modificar. Luego, comencé a sentirme un poco desmotivado, y apenas logré completarlo. Después, Kuange encontró varios errores más.

Por la tarde, me enteré de que Xiaoge se iba. Me quedé atónito por un buen rato.

Por la noche, jugueteé un poco con scheme y logré compilar y referenciar mi biblioteca personalizada (`custom library`).

### 2020-06-17

El trabajo principal de hoy es terminar los cabos sueltos de la iteración anterior, es decir, corregir errores.

### 2020-06-18

Hasta hoy, finalmente terminaremos las cosas de la iteración anterior.

Me siento muy mal en general. La razón es que el significado de lo que estoy haciendo no es claro. De hecho, creo que prácticamente no tiene sentido.

Entonces, ¿cómo defino el significado aquí?

El significado del trabajo actual para mí, en orden de importancia de mayor a menor, es:

1.  La capacidad de identificar problemas, de descubrir problemas valiosos y significativos.
2.  Acumular la capacidad de modelar problemas, para poder resolver más tipos de problemas en el futuro.
3.  Modelar problemas de manera que sea posible resolver una clase de problemas descrita por el modelo con un esfuerzo único.
4.  A través de mi esfuerzo, poder resolver problemas específicos y significativos. Resolver un solo problema de una vez tiene menos significado que invertir un esfuerzo para resolver múltiples problemas de una clase.
5.  Mantener la satisfacción, la sensación de logro al resolver problemas, la naturaleza interesante del problema en sí.
6.  La comunicación y las relaciones con las personas.
7.  El salario (es una garantía; no es que no sea importante, sino que las demás partes deben construirse sobre él).

Puede que no incluya todas mis motivaciones laborales, pero al menos refleja parte de la realidad.

La razón por la que me siento desanimado hoy, creo, es principalmente la pérdida de interés. Primero, el significado del problema en sí no me parece claro, lo que reduce la motivación. Segundo, el modelado de este tipo de problemas no es lo suficientemente preciso, lo que hace que la solución no resuelva todos los problemas (por supuesto, rara vez existe un modelo que resuelva todos los problemas, porque el modelo en sí es una simplificación y abstracción del problema; aquí hablamos de resolver problemas dentro de un rango aceptable), lo que lleva a repeticiones. Específicamente, los errores que reportan los compañeros de QA, aunque algunos se deben a una comprensión insuficiente de los requisitos o son problemas de las pruebas mismas, el tiempo dedicado a analizar el problema constituye la parte más larga de todo el proceso de resolución.

A veces, una comprensión superficial del problema conduce a soluciones no fundamentales, haciendo que la persona invierta tiempo en trabajo inútil. Básicamente, los puntos 3, 4 y 5 del significado anterior no se cumplen, lo que me hace sentir desanimado.

Otro punto a considerar es que, hasta ahora, solo he estado resolviendo problemas que deberían haberse resuelto en la iteración anterior. Aún no he comenzado lo que debería hacer en esta iteración. Esto comprimirá el tiempo de esta iteración y
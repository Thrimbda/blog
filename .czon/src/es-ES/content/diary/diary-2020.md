---
"title": "Registro de trabajo 2020"
"summary": "Este documento es el registro de trabajo del autor para la primera mitad de 2020, detallando tareas diarias de desarrollo, incluyendo compilación de límites de velocidad, límites de velocidad personalizados, corrección de errores, refactorización de código, investigación técnica (como fugas de memoria, reparación de PolyLine), colaboración en equipo (como discusiones de interfaces, revisión de código) y reflexiones sobre crecimiento personal. El registro muestra los desafíos técnicos, procesos de resolución de problemas, consideraciones de gestión de proyectos (como entregas iterativas, riesgos de refactorización) y ajustes de mentalidad profesional que enfrenta un ingeniero de software en proyectos complejos (como un sistema de compilación de mapas de alta definición). Los puntos centrales incluyen: los esquemas técnicos requieren equilibrar beneficios a corto y largo plazo; se deben evitar refactorizaciones a gran escala antes de las entregas; los ingenieros deben centrarse en la esencia de los problemas en lugar de seguir ciegamente las tendencias tecnológicas; mantener registros y reflexiones es crucial para el crecimiento personal."
"tags":
  - "Registro de trabajo"
  - "Desarrollo de software"
  - "Reflexión técnica"
  - "Gestión de proyectos"
  - "Corrección de errores"
  - "Refactorización de código"
  - "Mapas de alta definición"
"date": "2020-01-01"
---

### 2020-04-13

- Completé la autoevaluación de desempeño.
- Revisión de Lane Center Aggregation.

### 2020-04-14

- [ ] Compilación de límites de velocidad.
- [ ] Límites de velocidad personalizados.

### 2020-04-15

- Determiné el esquema para límites de velocidad personalizados @guangcong
  1. Usar un nuevo módulo-dynamicEvent para resolver este problema.
  2. La actualización de límites de velocidad personalizados se activa como un nuevo evento que publica la actualización de datos de horizon.
  3. Es necesario considerar la detección de excepciones y problemas de memoria.
     Después de discutir con Guangcong, él encontró algunos problemas.
- Revisión de Xiaokang
  Java, como un lenguaje sólido, todavía tiene mucho que ofrecer.
- Compilación de límites de velocidad
  Básicamente, no hubo progreso, se añadió la lógica para extraer RoadCenterTile.
- Resolución del problema de Sectioning, análisis del esquema de optimización edgeLifting, propuesta de un algoritmo de optimización:
  Dada la cabeza de traverse y la función de conectividad, se proporciona la forma de recorrido.
- Investigación del principio de los JAR auto-ejecutables.

### 2020-04-16

- Aclaré la interfaz de custom speed limit con Yiming: él garantiza que el par de ubicaciones de entrada pueda determinar una única ruta más corta.
  Al regresar, organicé el algoritmo para generar custom speed limit con Guangcong.
  1. Dada una ruta.
  2. Sabiendo que | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
     Entonces siempre se puede encontrar un par (start DiRoadOnPath, end DiRoadOnPath) que minimice la distancia.
- Proporcioné a Xiaokang una versión snapshot utilizable del compilador pylon-v0.1.1 para su lanzamiento temporal.
- Di un paseo informal con Hanteng por el edificio, hablando de tonterías.
- Aclaré la interfaz de uso del mapa SUMO con Zizhe y Yicheng.
- La compilación de SpeedLimit fue exitosa pero aún no se ha verificado.

### 2020-04-17

- Verificación de la compilación de SpeedLimit:
  OSMSerializable no es muy adecuado porque el SpeedLimit después del binding no tiene geometría.
  Podría haber un problema: problemas al vincular límites de velocidad en la convergencia de rampas.
- [ ] Interpolación.
- [ ] Distancia de Hausdorff.
- [ ] LcInJunctionTile.

#### Algunas ideas extravagantes

- ¿Implementar Spark directamente?
- ¿Qué necesita el Context de OSM?

### 2020-04-18

Completé los límites de velocidad.

### 2020-04-20

#### Límites de velocidad personalizados

- Guangcong cambió la entrada a un vector, añadió pruebas.
- Un pequeño problema es que Guangcong no entiende realmente el principio de funcionamiento de los punteros en C++.
- [ ] ¿Quizás intentar resolver [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337)?
- [ ] ¿Convertir los archivos compartidos por el tío en compartidos anónimos a través de Resilio Sync?

#### Reparación de RoadBorder

Descubrí que hice una suposición incorrecta. La información de lc y rb registrada en rc puede existir de la siguiente manera:

1. Solo hay un lc, por lo tanto, no se puede asumir que lc tenga al menos dos.
2. El rb de un lado puede no existir, por lo tanto, no se puede asumir que rb siempre exista.

### 2020-04-21

#### Reparación de RoadBorder

- Completé la migración de los casos de prueba.
- Mejoré Dune y su ReadMe para que pueda generar datos de prueba directamente.
  Hablé con Weiyu, mirando hacia el futuro, me centraré en el sistema de compilación.

#### Vinculación de POI en carriles opuestos

- Realicé el binding de datos después de multidigitize.

### 2020-04-22

#### Vinculación de POI en carriles opuestos

- Realicé el binding de datos después de multidigitize.
- Construí datos de prueba.

### 2020-04-23

- Completé y depuré la vinculación de POI en carriles opuestos [4].

### 2020-04-27

Hoy principalmente hice lo siguiente:

#### Completé la sincronización de mdm proto y mdm spec

1. Junto con Linnan, corregimos partes de la especificación mdm que estaban mal expresadas.
2. Dejamos varios elementos pendientes que Linnan y yo no podíamos decidir por nuestra cuenta.
3. En la reunión matutina del 2020-04-26, decidimos posponer las modificaciones más problemáticas de LaneSplitMerge y Polyline.
4. Completé las modificaciones de proto.
5. Completé las modificaciones de nexus.
6. Completé las modificaciones de mdk.
7. De paso, también solucioné un problema con los datos de prueba (informes de errores frenéticos).

#### Corrección de errores

Cerca del lanzamiento del 430, la cantidad de errores aumentó drásticamente.

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analizado.

- [ ] Script para copiar automáticamente casos de prueba.
- [ ] Exportar recordatorios de Apple.

### 2020-04-28

Tomé el examen teórico de conducir (科一), me tomó medio día.

HDMAPMDK-1130 Problema de ancho, tres problemas:

1. La especificación establece que no hay ancho de carril durante el cambio de carril.
2. Líneas de intersección demasiado largas que causan split line.

HDMAPMDK-1121 reparado nuevamente.

Estado muy pobre.

### 2020-04-29

#### Corrección de errores

- HDMAPMDK-1143
  Problema de que RoadObstacle no se compilaba.
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Usé mill.
- Usé nexus-osm.

#### Lluvia de ideas

### 2020-05-08

#### Problema de fuga de memoria

- La causa directa del problema de fuga de memoria fue no eliminar los punteros salvajes después de usar `new`.
- Después de actualizar la posición actual, map kit llamó a `prepareGuidanceData`, con el objetivo de encontrar los datos de guía más cercanos a la posición actual.
- `prepareGuidanceData` llamó a `NavInfoProviderImpl::getTrafficLights` y `NavInfoProviderImpl::getCarParks`.
- Tomando `NavInfoProviderImpl::getTrafficLights` como ejemplo, se crean punteros de datos en `NaviEventOnPath` en el momento de la llamada.
- Sin embargo, no se eliminaron.
- También se descubrió que `DestEvent` tenía este problema.

Solución: El punto clave es no permitir la existencia de punteros salvajes. Decidí refactorizar `NaviEventProvider`.

- Primero, añadir dos campos `traffic_light_events` y `car_park_events` en `NaviInfoProvider`.
- En `NaviInfoGenerator`, actualizar estos dos campos después de que se actualice la ruta.
- Luego, en cada llamada a `get`, filtrar según la posición actual del vehículo.
- Por lo tanto, es necesario refactorizar `PathReader::getAttributes`, porque la implementación anterior solo consideraba el offset relativo al vehículo actual, ahora se necesita una interfaz de offset relativo al Path.

### 2020-05-09

#### Reparación y pruebas de PolyLine

El problema principal de PolyLine radica en que, durante su generación, podrían añadirse puntos duplicados, lo que causa una serie de problemas en los cálculos geométricos relacionados con segmentos:

1. Cálculo de vectores, dos puntos duplicados producen un vector cero.
2. Cálculo de longitud, la longitud del segmento es 0, lo que fácilmente causa problemas de NaN.

Por lo tanto, al construir PolyLine, se verifican los puntos dentro de PolyLine. Si se encuentran puntos duplicados, se lanza una excepción.

Se detectaron los siguientes problemas:

- Problemas con `getEnd` en Jts.
- Problemas de normalización en `Jts LinearLocation`.

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // la salida es -1
  ```

- Al interpolar, es posible tomar dos puntos demasiado cercanos.

### 2020-05-11

- HDMAPMDK-1122
  El problema de la falta de líneas de borde de la carretera no se pudo reproducir, decidí no invertir más tiempo en investigar la causa.
- Media hora de teoría del crecimiento metabólico.
- Refactorización de Visitor para que admita líneas con el mismo punto de inicio y fin.
- Preparé una pregunta de entrevista.

### 2020-05-12

- Entrevista: dos candidatos no calificaron, reflexioné sobre cómo identificar rápidamente a los candidatos, tomó 3 horas.
- Corrección de error: HDMAPMDK-1211 Problema de eliminación incorrecta de border, no se solucionó correctamente en la reparación anterior.
  Tuve una idea pero no la terminé de escribir.
- Fui al gimnasio.

### 2020-05-13

Corrección de error: HDMAPMDK-1211 Encontré una solución.

- La causa fundamental fue una división irrazonable de la línea de producción.

#### Análisis de la causa

Se puede observar que la división se realizó antes de que finalizara el cambio de carril (la línea central del carril aún cruzaba la línea del carril), y esta división podría cruzar Rp.

Dado que la información de observación de lane border adjunta a los puntos de forma de lanecenter registra fielmente las líneas de carril a ambos lados utilizando un método de scan line basado en la geometría, sin filtrar según la semántica. Por lo tanto, en la posición donde la línea del carril cruza el carril, la línea central del carril que intersecta con la línea del carril registrará esa línea del carril tanto en las referencias de border izquierda como derecha.

Bajo la lógica de código existente, al filtrar las referencias de border de las líneas de carril intersectadas según la semántica, se infiere la referencia de border a eliminar según el tipo de cambio de carril.

La lógica actual falla al encontrar este tipo de divisiones, lo que causa este problema.

#### Solución

El punto clave es **encontrar la tendencia de cambio de carril de la línea de carril intersectada**. Dado que este tipo de división puede cruzar Rp, el filtrado no debe realizarse por unidad de Rp.

1. Primero, organizar las líneas de carril en paths utilizando edge lifting (puede considerarse para una futura refactorización del grafo): Seq[LaneCenter].
2. Encontrar el LaneCenter a corregir y el lane border a corregir (asumiendo que este tipo de LaneCenter es causado por un cambio de carril).
3. Calcular la tendencia de cambio de carril de este LaneCenter según el path de LaneCenter.
4. Realizar el filtrado.

Se lo asigné a Ziliang.

Un candidato entrevistado no pasó.

### 2020-05-14

HDMAPMDK-1132 Seguimiento de ID de los puntos finales de las líneas de carril de señales de poste.

El problema de seguimiento de los puntos finales de las líneas de carril de señales de poste es bastante simple en comparación con el seguimiento de objetos lineales, solo implica mapeo de ID, sin mapeo de offset y longitud.

Sin embargo, hay varios problemas a considerar:

1. Procedimiento.
2. El sistema de tipado de ID es un problema persistente que necesita ser abordado.

Esencialmente, la raíz de este problema es que, al definir ID, usamos Long ID en todas partes, mientras que la definición de MDM usa Int, lo que podría causar problemas de desbordamiento.

### 2020-05-15

#### Corrección de errores

- HDMAPMDK-1215 completado.
- HDMAPMDK-1218 Hecho.

### 2020-05-18

Refactoricé OSM Assembler, utilizando la serialización OSM anterior, lo que mejoró la facilidad de comprensión del código y la facilidad de escritura.

### 2020-05-19

Solucioné un error en OSM Assembler (en realidad, no era exactamente un error).

Hoy tuve la reunión de planificación del sprint:
No hay muchas cosas por hacer en este sprint, pero hay mucho en qué pensar. Este es un estado saludable.

### 2020-05-20

- [ ] Escribir documentación describiendo el estado actual del CI de nexus/mdk y los requisitos.
- [x] Prestar atención al error HDMAPMDK-1263.
  - Definitivamente es un problema de división de la línea de producción.
- [ ] Concertar una reunión con Yangchuan para discutir el CI.
- [ ] HDMAPMDK-1262.
      No terminado.
- [x] Problema de Custom Speed Limit.

### 2020-05-21

#### TAREAS PENDIENTES

- [x] Saludar a Qiaobo.
- [x] HDMAPMDK-1262.
- [x] HDMAPMDK-755.

#### TRABAJOS

- Por la mañana fui al área de trabajo de Yiming para depurar en línea el hotfix de ayer. El resultado fue un problema de offset. Ayer lo escribí con demasiada prisa y no añadí pruebas en absoluto. Este tipo de comportamiento no debería repetirse. Pensé que ahorraba mucho tiempo, **pero al final perdí más tiempo**.
- La razón por la que no se podían obtener datos en 1262 era que MDK no cargaba road mark a nivel de carril (ni road obstacle).
- Ayudé al hermano Du a compilar datos.

### 2020-05-22

¿Qué hice hoy???
¿Qué hice hoy???

### 2020-05-25

Hoy recibí una nueva tarea: HDMAPMDK-1249 - Investigar métodos para calcular lane aggregation utilizando información geométrica de la carretera. Esto aumentó un poco las tareas de esta semana. Hasta ahora, tengo tres cosas por hacer:

1. 1249.
2. Estado actual, requisitos y plan para la Pipeline de CI del equipo.
3. Refactorización del grafo de Nexus.

Cada una de estas cosas requiere una cuidadosa consideración y no son fáciles. Lamentablemente, no puedo estimar claramente el tiempo para cada una, solo Weiyu lo estima y lo escribe en los story points de las tareas de Jira. Una cosa que tengo clara: **si no empiezo a estimar y revisar, nunca estimaré con precisión**. Así que a partir de ahora, debo estimar cuidadosamente.

Además, planeo comenzar con 1249 hoy, ya que es un asunto de negocio y generalmente es más urgente, y Weiyu también le dará más importancia. En cuanto a la refactorización, si no me preocupo por ello, probablemente a nadie más le importará (porque, cruelmente, no afecta la funcionalidad, pero sí la eficiencia, y la eficiencia es lo más difícil de medir, incluso yo solo tengo análisis cualitativos).

### 2020-05-26

Hoy hubo muchos imprevistos. Primero, parking reportó dos errores. Originalmente planeaba entregar hoy, pero debido a estos errores, no pude hacerlo. Wang Wei negoció con los equipos posteriores y pospuso la entrega dos días hasta pasado mañana, así que mi trabajo principal estos dos días se convirtió en solucionar errores. Esto me hizo reflexionar sobre si la planificación de las entregas es razonable. Luego, el problema HDMAPMDK-1290.

Lo que logré hoy:

- Seguimiento de HDMAPMDK-1290: al estar extremadamente cerca de la stop line, el offset del carril coincidente podría ser mayor que la longitud del carril.

  > Pasé todo el día investigando y tratando de resolver este problema (actualmente son las 8:56 p.m.), la eficiencia fue muy baja.

  La razón esencial es que MDK calcula la longitud tomando la longitud entre cada dos puntos y luego aplicando una transformación de coordenadas. Aunque esto es más preciso, introduce una fuerte incertidumbre en los resultados.

  Finalmente, usé una solución algo improvisada: si el offset calculado es mayor que la longitud, simplemente se toma la longitud.

- HDMAPMDK-1297 Enlace incorrecto de plazas de estacionamiento.
  Aunque ya era casi la hora de salida original (9 p.m.), ¡hoy tenía que al menos analizar este problema!
  Vaya, lo solucioné. Resultó ser un problema simple.

### 2020-05-27

Hoy, si no hay imprevistos, debo terminar el asunto de la Pipeline de CI.

Pero hubo imprevistos - -

Recibí errores reportados por Yiming:

1.  Enlace de semáforos: un semáforo que debería estar enlazado a un área de espera se enlazó a la partición antes del área de espera. Ya reparado (1.5h).
2.  Faltante enlace de semáforos: no se pudo reproducir.
    Actualización: después de una ronda difícil de depuración, finalmente encontré el problema. Durante la compilación, la geometría utilizada para el enlace entre rc y offset no era la misma línea, lo que causaba que el offset excediera la longitud de la carretera, por lo que no se podía encontrar el semáforo (2h).

### 2020-05-28

Mañana tengo el examen práctico de conducir (科二), hoy practiqué conducción todo el día, regresé a las 5 p.m. Me sentí bastante bien, espero aprobar mañana.

Comencé a describir el estado actual y analizar los requisitos de la Pipeline de CI - -

### 2020-05-29

No aprobé. Ay, es muy difícil para mí.

Por la mañana fui al examen, por la tarde hice algunas cosas:

1.  Fui a donde Yiming para ver una situación anómala, resultaron ser dos errores.
2.  Después del townhall de la tarde, sincronicé el asunto del enlace Python de MDK.
3.  Fui con Shanle y Weiyu a resolver un problema de los equipos posteriores. Finalmente, resumimos una solución a corto plazo y una a largo plazo.

Descubrí que al enfrentar problemas imprevistos, el método para resolverlos generalmente debería seguir este patrón:
Una solución a corto plazo y una a largo plazo. Porque el valor expuesto por el problema es limitado y tiene una temporalidad. Por lo tanto, la solución a corto plazo se centra en resolver la urgencia de manera rápida y precisa. ¿Es necesaria una solución a largo plazo? Generalmente sí, porque un caso particular de un problema refleja un punto ciego en las soluciones anteriores que no se consideró. En este caso, analizar la causa del problema y resolverlo sistemáticamente permite que este tipo de problemas se resuelvan bien en el futuro, haciendo que la solución original sea más completa. También hay casos en los que no se necesita una solución a largo plazo, y es cuando **después de un análisis exhaustivo** concluimos que el costo de resolver el problema sistemáticamente es mayor que el beneficio. (Incluso en ese caso, subjetivamente, la mayoría de las veces queremos resolverlo sistemáticamente. Como ingenieros, ¿quién no quiere resolver problemas de manera sistemática? Pero esto también crea una trampa, haciendo que las personas puedan dedicarse a resolver cosas que son importantes pero no urgentes, o ni importantes ni urgentes, desperdiciando así un tiempo valioso que podría usarse para resolver otros problemas más valiosos).

4.  Al regresar por la noche, continué con el asunto de la Pipeline de CI.

### 2020-06-01

Esta mañana, apenas llegué, fui a donde Yiming a analizar un problema. Lo analicé toda la mañana. Resultó ser un problema conocido anteriormente (falta de puntos debido a la interpolación del compilador antiguo) que causó otro problema: al capturar la ruta, justo cerca del segmento faltante, el offset del carril resultó negativo.

Terminé hasta las 4 p.m. Después de una noche de trabajo ineficiente y dolorosa (siento que en mi estado actual, siempre que trabajo hasta tarde, básicamente se correlaciona con la ineficiencia).

### 2020-06-02

Llegué por la tarde. Para que Yiming subiera al vehículo, solucioné algunos errores y logré que Yiming subiera al vehículo por la noche.

### 2020-06-03

Apenas llegué por la mañana, fui a ayudar a Yiming con los problemas descubiertos la noche anterior, específicamente el problema de no poder obtener los semáforos.

### 2020-06-04

Esta mañana tengo tres cosas que hacer:

1.  Limpieza de datos y carga de los datos finales del 0605.
2.  Revisar el problema de anomalía en el ancho - se debía a que no había carril en esa ubicación.
3.  Revisar el problema de puntos de interpolación asignados al carril incorrecto.
4.  Revisión.

### 2020-06-05

Un día intenso y emocionante. Completé HDMAPMDK-1347 y HDMAPMDK-1352, y también hice una gran refactorización.

Aprendí una lección valiosa: no hagas cambios enormes cerca de una entrega. Porque sin suficientes pruebas de QA, cualquier refactorización, por impresionante que sea, puede traer riesgos. Además, sin suficiente tiempo para revisar el diseño (me refiero a mí mismo, porque a veces mientras escribes te das cuenta de que el diseño podría estar mal, pero descubrir problemas de diseño durante la implementación es otro problema: comenzar demasiado pronto).

Complemento del lunes:
En este día de refactorización intensa y emocionante, casi no paré, ni siquiera tuve tiempo para pensar, solo pude confiar en la familiaridad y el estado de flujo, escribiendo código con una eficiencia extremadamente alta. En realidad, si no consideramos el principio de no hacer grandes refactorizaciones antes de una entrega, disfruté mucho este estado. Pero todo debe tener un objetivo y un significado, no solo buscar la satisfacción personal, de lo contrario, esa satisfacción se convierte en un placer superficial.

### 2020-06-08

El sábado me mudé a trabajar a Beijing.

La sensación de volver a trabajar en Beijing es un poco desconcertante, todo ha cambiado. Primero, perdí mi puesto de trabajo (Xiuyun contrató a un pasante, y para facilitar el trabajo, su pasante se sentó allí). Esta es la más incómoda de todas las pérdidas. Es como cuando llegué a la clase uno en segundo año de secundaria y me senté en un nuevo lugar sin conocer a nadie, sin querer hablar con ellos. La gente aquí parece familiar pero extraña. Siento que tengo pocos amigos aquí, lo cual juzgo racionalmente que es una ilusión. Pero la sensación de no querer comunicarme con la gente, de querer encontrar un rincón donde estar, es real, y de hecho encontré un rincón donde estar, al lado de Yuzhang. ¿Por qué no quiero comunicarme? Todavía no puedo entender este problema. ¿Quizás porque no tengo una razón justificada? Cuando me preguntan por qué vine a Beijing y por cuánto tiempo me quedaré, respondo evasivamente: un tiempo, uno o dos meses. O tal vez indica que, en esencia, todavía soy una persona introvertida, que no le gusta causar molestias y que se preocupa mucho por parecer estúpido a los ojos de los demás. Sin embargo, cuanto más escribo, más creo que el segundo componente es mayor e innecesario. Primero, parecer estúpido es mejor que ser realmente estúpido. Pregunta seriamente a los demás, incluso si es torpemente. No temas, no temas cuando eres joven. No temas en ningún momento. Todo está bien.

Ahora, hablemos del trabajo. Durante este tiempo, terminé la entrega, principalmente la refactorización de TLM (typed lane model). Esta vez debo definir claramente los objetivos y controlarme, no refactorizar por impulso, debo tener una estrategia y controlar mi propio progreso.

Además, configuré mi computadora de escritorio. Resulta que antes no podía conectarme a Internet porque cambié la contraseña. Después de un corte de energía, la red perdió completamente la conexión. Así que también necesito configurar la máquina. Esta vez, los objetivos por prioridad son:

1.  Productividad.
2.  Genialidad.
3.  Estética.

Hoy leí el blog de Wang Yin durante mucho tiempo - - sigo desintoxicándome. Antes siempre era un fanático religioso frenético, incapaz de ver la esencia de las cosas. Siempre pensaba que algo era la solución definitiva a todos los problemas, pero en realidad, estas "soluciones definitivas" son raras. La mayoría de las veces es solo fanatismo religioso, como:

-   Vim vs Emacs.
-   OOP vs FP.
-   Go vs Rust.

Etc., etc... Cuando recién me familiaricé con OOP, pensé que OOP era invencible, que podía resolver todos los problemas, pero al final solo escribí un montón de clases similares. En realidad, tener o no tener esas clases era irrelevante; lo realmente útil eran las funciones dentro de cada clase. Más tarde (estos últimos dos años), me familiaricé con FP y pensé que FP era la bala de plata para resolver todos los problemas. Pero después de escribir programas en Scala por un tiempo, descubrí que mi productividad no mejoró significativamente; al contrario, a menudo me enredaba en la sintaxis y la inmutabilidad, lo que reducía mi eficiencia.

### 2020-06-09

Encontré un poco de ritmo. Instalé Arch, ¿y siento que es incluso más cómodo de usar que Mac?

Jugué Tavern Brawl con Yuzhang por un buen rato - -

### 2020-06-10

Hoy planeo hacer estas cosas:

1.  HDMAPMDK-1199 RoadMark como subclase, proporcionando información más rica.
2.  HDMAPMDK-892 Proporcionar trayectorias de experiencia.

Si me sobra energía, trabajaré en la documentación para el lanzamiento de versiones.

Resultado: Completé 892.

### 2020-06-11

Revisé HDMAPMDK-892 - Proporcionar trayectorias de experiencia.

Descubrí que MDK aún no tenía la adaptación correspondiente, así que pasé la tarde trabajando en esta adaptación.

Terminé la adaptación, estoy muy cansado.

Sigo ajustando mi Arch, tratando de registrar algunos pasos de mi instalación como parte de la automatización.

### 2020-06-12

La tarea de hoy es resolver HDMAPMDK-1199, que había olvidado anteriormente.

Finalmente lo logré a las 8 p.m.

### 2020-06-13

Un día muy tranquilo. Después de enviar las pruebas, estuve jugando con mis scripts de automatización.

Al principio pensé en usar shell, pero realmente no me gusta shell, así que comencé a experimentar con scheme. ¡Qué divertido!

### 2020-06-15

Guau, son las 3 p.m. y he estado holgazaneando la mayor parte del día, navegando por varios sitios web relacionados con scheme y cosas por el estilo. ¡No puedo seguir así!

Hoy debo resolver HDMAPMDK-1378, que es algo que siempre hemos querido evitar: agregar la llamada dirección de lane mark dentro de las intersecciones. Pero las carreteras dentro de las intersecciones no tienen lane marks, ¿cómo puede haber dirección de lane mark?

Ay, me siento muy incómodo. Después de varios intentos, trabajé hasta muy tarde.

### 2020-06-16

Hoy, después de llegar, estuve revisando todo el tiempo. Hay bastantes cosas que modificar, y luego comencé a sentirme un poco desmotivado. Finalmente lo logré a duras penas, y luego el hermano Kuan encontró varios errores más.

Por la tarde, me enteré de que el hermano Xiao se iba. Me quedé atónito por un buen rato.

Por la noche, jugué un poco con scheme y logré compilar y referenciar bibliotecas personalizadas.

### 2020-06-17

El trabajo principal de hoy es terminar los asuntos pendientes de la iteración anterior, es decir, corregir errores.

### 2020-06-18

Hasta hoy, finalmente terminaremos las cosas de la iteración anterior.

Mi sensación general es muy mala, porque el significado de lo que estoy haciendo no es claro. De hecho, creo que básicamente no tiene mucho significado.

Entonces, ¿cómo defino el significado aquí?

El significado del trabajo actual para mí, en orden de importancia de mayor a menor, es:

1.  La capacidad de plantear problemas, de descubrir problemas valiosos y significativos.
2.  Acumular la capacidad de modelar problemas, para poder resolver más problemas de diversos tipos en el futuro.
3.  Modelar problemas de manera que sea posible resolver una clase de problemas descritos por el modelo con un esfuerzo único.
4.  A través de mi esfuerzo, poder resolver problemas específicos y significativos. Resolver un problema de una vez tiene menos significado que invertir un esfuerzo para resolver múltiples problemas de esta clase.
5.  Mantener la satisfacción, la sensación de logro al resolver problemas, la naturaleza interesante del problema en sí.
6.  La comunicación y las relaciones con las personas.
7.  El salario (es una garantía, no es que no sea importante, sino que las demás partes deben construirse sobre él).

Puede que no incluya todas mis motivaciones laborales, pero al menos refleja parte de la realidad.

La razón por la que me siento desanimado hoy, creo, se debe principalmente a la pérdida de interés. Primero, el significado del problema en sí no me parece claro, lo que reduce un poco la motivación. Segundo, el modelado de este tipo de problemas no es lo suficientemente preciso, lo que hace que los métodos de solución no resuelvan todos los problemas (por supuesto, rara vez existe un modelo que resuelva todos los problemas, porque el modelo en sí es una simplificación y abstracción del problema; aquí hablamos de resolver problemas dentro de un rango aceptable), lo que lleva a repeticiones. Específicamente, los errores que los compañeros de QA señalan uno tras otro. Aunque algunos se deben a una comprensión insuficiente de los requisitos o son problemas de las pruebas mismas, el tiempo dedicado a analizar los problemas ocupa la parte más larga de todo el proceso de resolución.

A veces, una comprensión superficial del problema conduce a soluciones no esenciales, lo que hace que las personas pierdan tiempo en esfuerzos inútiles. Básicamente, los puntos 3, 4 y 5 del significado anterior no se cumplen, lo que me hace sentir desanimado.

Luego, otro punto a considerar es que, hasta ahora, solo he estado resolviendo problemas que deberían haberse resuelto en la iteración anterior. Aún no he comenzado a hacer lo que debería hacerse en esta iteración. Esto comprimirá el tiempo de esta iteración y quizás afecte las iteraciones posteriores. Este es un ciclo vicioso que no debería ocurrir. Considerando que incluso podría afectar las relaciones entre las personas a más largo plazo, creo que es aún más inapropiado.

Por lo tanto, a partir de mañana, debo intentar considerar todos los aspectos de algo antes de resolverlo.

Mirando hacia atrás lo que he hecho en estos últimos diez días, el progreso del trabajo ha estado completamente estancado. El lunes que llegué a Beijing, el 8 de junio, dije: `Luego, sobre el trabajo, durante este tiempo, después de terminar la entrega, principalmente la refactorización de TLM (typed lane model). Esta vez debo definir claramente los objetivos y controlarme, no refactorizar por impulso, debo tener una estrategia y controlar mi propio progreso.`

En este momento, creo que un aspecto positivo es que he registrado lo que hago cada día, aunque a veces sea breve, o incluso lo complete al día siguiente. Pero creo que el registro continuo es la semilla del cambio.

Además
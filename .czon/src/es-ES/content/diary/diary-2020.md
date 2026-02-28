---
title: Registro de trabajo 2020
date: 2020-01-01
taxonomies:
  tags:
    - Registro de trabajo
    - Resumen mensual
    - Tecnología
---

### 2020-04-13

- Completé la autoevaluación de desempeño
- Revisión de Lane Center Aggregation

### 2020-04-14

- [ ] Compilación de límites de velocidad
- [ ] Límites de velocidad personalizados

### 2020-04-15

- Determiné el esquema de límites de velocidad personalizados con @guangcong
  1. Usar un nuevo módulo `dynamicEvent` para resolver este problema
  2. La actualización de límites de velocidad personalizados se publica como un nuevo evento que desencadena la actualización de datos de horizonte
  3. Es necesario considerar la detección de excepciones y problemas de memoria
     Después de discutir con Guangcong, él encontró algunos problemas
- Revisión de Xiaokang
  Java, como un lenguaje sólido, tiene mucho que ofrecer
- Compilación de límites de velocidad
  Progreso casi nulo, añadí lógica para extraer RoadCenterTile
- Resolución del problema de Sectioning, análisis del esquema de optimización edgeLifting, propuesta de algoritmo de optimización:
  Dada una cabeza de recorrido y una función de conectividad, se proporciona la forma de recorrido
- Investigación del principio de los JAR auto-ejecutables

### 2020-04-16

- Aclaré la interfaz de límites de velocidad personalizados con Yiming: él garantiza que el par de ubicaciones de entrada puede determinar una única ruta más corta
  Al regresar, revisé el algoritmo para generar límites de velocidad personalizados con Guangcong
  1. Dada una ruta
  2. Sabiendo que | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
     Entonces siempre se puede encontrar un par (start DiRoadOnPath, end DiRoadOnPath) que tenga la distancia más corta
- Proporcioné a Xiaokang una versión instantánea utilizable del compilador pylon-v0.1.1
- Di un paseo y charlé con Hanteng
- Aclaré la interfaz de uso del mapa SUMO con Zizhe y Yicheng
- La compilación de SpeedLimit fue exitosa pero aún no se ha verificado

### 2020-04-17

- Verificación de la compilación de SpeedLimit:
  OSMSerializable no es adecuado porque el SpeedLimit después del enlace no tiene geometría
  Posible problema: problemas al enlazar límites de velocidad en la incorporación de rampas
- [ ] Interpolación
- [ ] Distancia de Hausdorff
- [ ] LcInJunctionTile

#### Algunas ideas ingeniosas

- ¿Implementar Spark directamente?
- ¿Qué necesita el contexto de OSM?

### 2020-04-18

Completé los límites de velocidad

### 2020-04-20

#### Límites de velocidad personalizados

- Guangcong cambió la entrada a un vector y añadió pruebas
- Un pequeño problema es que Guangcong no entiende realmente el principio de funcionamiento de los punteros en C++
- [ ] ¿Quizás intentar resolver [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337)?
- [ ] ¿Convertir los archivos compartidos por el tío en compartición anónima a través de Resilio Sync?

#### Reparación de RoadBorder

Descubrí que hice una suposición incorrecta, la información de lc y rb registrada en rc puede existir:

1. Solo hay un lc, por lo que no se puede asumir que lc tenga al menos dos
2. El rb de un lado puede no existir, por lo que no se puede asumir que rb exista siempre

### 2020-04-21

#### Reparación de RoadBorder

- Completé la migración de casos de prueba
- Mejoré Dune y su ReadMe para que pueda generar datos de prueba directamente
  Hablé con Weiyu, mirando hacia el futuro, me enfocaré en el sistema de compilación

#### Enlace de POI en carriles opuestos

- Realicé el enlace de datos después de multidigitize

### 2020-04-22

#### Enlace de POI en carriles opuestos

- Realicé el enlace de datos después de multidigitize
- Construí datos de prueba

### 2020-04-23

- Completé y depuré el enlace de POI en carriles opuestos [4]

### 2020-04-27

Hoy principalmente hice lo siguiente:

#### Completé la sincronización de mdm proto y mdm spec

1. Junto con Linnan, corregí partes de la especificación mdm de Ruoganchu que estaban mal expresadas
2. Dejé varios elementos pendientes que Linnan y yo no pudimos decidir solos
3. En la reunión matutina del 2020-04-26, se decidió posponer las modificaciones más problemáticas de LaneSplitMerge y Polyline
4. Completé la modificación de proto
5. Completé la modificación de nexus
6. Completé la modificación de mdk
7. También solucioné un problema con los datos de prueba (informes de error frenéticos)

#### Corrección de errores

Cerca del lanzamiento del 430, la cantidad de errores aumentó drásticamente

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analizado

- [ ] Script para copiar automáticamente casos de prueba
- [ ] Exportar recordatorios de Apple

### 2020-04-28

Tomé el examen teórico de conducir, me llevó medio día

HDMAPMDK-1130 Problema de ancho, tres problemas

1. La especificación establece que no hay ancho de carril al cambiar de carril
2. Líneas de intersección demasiado largas que causan split line

HDMAPMDK-1121 reparado nuevamente

Estado muy malo

### 2020-04-29

#### Corrección de errores

- HDMAPMDK-1143
  Problema de que RoadObstacle no se compilaba
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Uso de mill
- Uso de nexus-osm

#### Lluvia de ideas

### 2020-05-08

#### Problema de fuga de memoria

- La causa directa del problema de fuga de memoria fue crear punteros salvajes sin eliminarlos
- Después de actualizar la posición actual, map kit llamó a `prepareGuidanceData`, con el objetivo de encontrar los datos de guía más cercanos a la posición actual
- `prepareGuidanceData` llamó a `NavInfoProviderImpl::getTrafficLights` y `NavInfoProviderImpl::getCarParks`
- Tomando `NavInfoProviderImpl::getTrafficLights` como ejemplo, al llamarlo se crean punteros de datos en `NaviEventOnPath`
- Sin embargo, no se eliminaron
- También se descubrió que `DestEvent` tiene este problema

Solución: El núcleo está en no permitir la existencia de punteros salvajes, decidí refactorizar `NaviEventProvider`

- Primero, añadir dos campos `traffic_light_events` y `car_park_events` en `NaviInfoProvider`
- En `NaviInfoGenerator`, actualizar estos dos campos después de que se actualice la ruta
- Luego, al hacer cada `get`, filtrar según la posición actual del vehículo
- Por lo tanto, es necesario refactorizar `PathReader::getAttributes`, porque la implementación anterior solo consideraba el offset relativo al vehículo actual, ahora se necesita una interfaz de Offset relativo a la ruta

### 2020-05-09

#### Reparación y prueba de PolyLine

El problema principal de PolyLine es que al generarla, es posible añadir puntos duplicados, lo que causa una serie de problemas de cálculo relacionados con segmentos geométricos:

1. Cálculo de vectores, dos puntos duplicados producen un vector cero
2. Cálculo de longitud, la longitud del segmento es 0, fácilmente causa problemas de NaN

Por lo tanto, al construir PolyLine, se verifican los puntos en PolyLine, si se encuentran puntos duplicados, se lanza una excepción

Se detectaron los siguientes problemas:

- Problema con `getEnd` en Jts
- Problema de normalización en `Jts LinearLocation`

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // la salida es -1
  ```

- Al interpolar, es posible tomar dos puntos demasiado cercanos

### 2020-05-11

- HDMAPMDK-1122
  No se pudo reproducir el problema de falta de líneas de borde de carretera, decidí no investigar más la causa
- Media hora de teoría del crecimiento metabólico
- Refactorización de Visitor para que admita líneas con el mismo punto de inicio y fin
- Preparé una pregunta de entrevista

### 2020-05-12

- Entrevista: dos candidatos no calificaron, pensé en cómo identificar rápidamente a los candidatos, tomó 3 horas
- Corrección de error: HDMAPMDK-1211 Problema de eliminación incorrecta de border, no se solucionó correctamente en la reparación anterior
  Tuve una idea pero no la terminé de escribir
- Fui al gimnasio

### 2020-05-13

Corrección de error: HDMAPMDK-1211 Encontré una solución

- La causa fundamental es que la segmentación de la línea de producción no es razonable

#### Análisis de la causa

Se puede ver que antes de que termine el cambio de carril (la línea central del carril aún cruza la línea del carril), ya se realizó la segmentación, y esta segmentación puede cruzar Rp.

Dado que la información de observación de lane border adjunta a los puntos de forma de lanecenter registra fielmente las líneas de carril a ambos lados según la geometría, utilizando el método de scan line, sin filtrar según la semántica. Por lo tanto, en la posición donde la línea del carril cruza el carril, la línea central del carril que intersecta con la línea del carril registrará esa línea del carril simultáneamente en las referencias de border izquierda y derecha.

Bajo la lógica de código actual, al filtrar las referencias de border de las líneas de carril intersectadas según la semántica, se infiere la referencia de border a eliminar según el tipo de cambio de carril.

La lógica actual falla al encontrar este tipo de segmentación, causando este problema.

#### Solución

El punto clave es **encontrar la tendencia de cambio de carril de la línea de carril intersectada**. Dado que este tipo de segmentación puede cruzar Rp, el filtrado no debe realizarse por unidad de Rp.

1. Primero, organizar las líneas de carril en rutas utilizando edge lifting (puede considerarse para la futura refactorización del grafo): Seq[LaneCenter]
2. Encontrar el LaneCenter a corregir y el lane border a corregir (aquí se asume que este tipo de LaneCenter es causado por cambio de carril)
3. Calcular la tendencia de cambio de carril de este LaneCenter según la ruta de LaneCenter
4. Realizar el filtrado

Se lo asigné a Ziliang

Un candidato no pasó la entrevista

### 2020-05-14

HDMAPMDK-1132 Rastreo de ID de puntos finales de líneas de carril de señales de poste

El problema de rastreo de puntos finales de líneas de carril de señales de poste es muy simple en comparación con el rastreo de objetos lineales, solo existe el mapeo de ID, no el mapeo de offset y longitud.

Sin embargo, hay varios problemas a considerar:

1. Procedimiento
2. El sistema de tipado de ID es un problema persistente, hay que encontrar una manera de manejarlo

La raíz de este problema es que al definir ID, usamos todos Long ID, mientras que en la definición de MDM se usa Int, lo que puede causar problemas de desbordamiento.

### 2020-05-15

#### Corrección de errores

- HDMAPMDK-1215 completado
- HDMAPMDK-1218 Hecho

### 2020-05-18

Refactoricé OSM Assembler, usando el OSM serialize anterior, la facilidad de comprensión del código y la facilidad de escritura mejoraron

### 2020-05-19

Solucioné un error de OSM Assembler (en realidad no es un error)

Hoy tuve la reunión de planificación del sprint:
No hay mucho que hacer en este sprint, pero hay mucho en qué pensar. Este es un estado saludable.

### 2020-05-20

- [ ] Escribir documentación describiendo el estado actual de CI de nexus/mdk y los requisitos.
- [x] Seguimiento del error HDMAPMDK-1263
  - Realmente es un problema de segmentación de la línea de producción
- [ ] Concertar reunión con Yangchuan para discutir CI
- [ ] HDMAPMDK-1262
       No terminado
- [x] Problema de Custom Speed Limit

### 2020-05-21

#### TAREAS

- [x] Saludar a Qiaobo
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### TRABAJOS

- Por la mañana fui al área de trabajo de Yiming para depurar en línea el hotfix de ayer, el resultado fue por el offset. Ayer lo escribí demasiado apresuradamente y no añadí pruebas en absoluto, este tipo de comportamiento no debería ocurrir de nuevo. Pensé que ahorraba mucho tiempo, **pero al final perdí más tiempo**.
- La razón por la que no se podían obtener datos en 1262 era que MDK no cargaba road mark a nivel de carril (ni road obstacle)
- Ayudé al hermano Du a compilar datos

### 2020-05-22

¿Qué hice hoy???
¿Qué hice hoy???

### 2020-05-25

Hoy recibí una nueva tarea: HDMAPMDK-1249 - Investigar métodos para calcular lane aggregation usando información geométrica de carreteras. Esto aumentó un poco las tareas de esta semana, hasta ahora tengo tres cosas por hacer:

1. 1249
2. Estado actual, requisitos y soluciones de CI Pipeline del grupo
3. Refactorización del grafo de Nexus

Cada una es algo que requiere una cuidadosa consideración y no es fácil, pero lamentablemente no puedo estimar claramente el tiempo para cada una, solo Weiyu estimó y escribió los story points en la tarea de Jira, una cosa que tengo clara: **si no empiezo a estimar y revisar, nunca estimaré con precisión**. Así que a partir de ahora debo estimar cuidadosamente.

Además, planeo empezar con 1249 hoy, porque es un asunto de negocio, generalmente más urgente, y Weiyu también le dará más importancia. En cuanto a la refactorización, si yo no me preocupo, probablemente a nadie le importará (porque es cruel, no afecta la funcionalidad, pero sí la eficiencia, y la eficiencia es lo más difícil de medir, incluso yo solo tengo análisis cualitativos).

### 2020-05-26

Hoy hubo muchos imprevistos, primero parking reportó dos errores, originalmente planeaba entregar hoy, pero debido a estos errores no pude entregar hoy, Wang Wei negoció con los equipos posteriores y pospuso la entrega dos días hasta pasado mañana, así que mi trabajo principal estos dos días se convirtió en resolver errores. No puedo evitar pensar si la planificación de la entrega es razonable. Luego está el problema HDMAPMDK-1290.

Lo que hice hoy:

- Seguimiento de HDMAPMDK-1290: al estar extremadamente cerca de la stop line, el offset del carril coincidente es mayor que la longitud del carril

  > Pasé casi todo el día investigando y tratando de resolver este problema (actualmente son las 8:56 p.m.), la eficiencia fue muy baja.

  La razón fundamental es que MDK calcula la longitud tomando la longitud entre cada dos puntos y luego aplicando una transformación de coordenadas, lo que, aunque es más preciso, hace que el resultado tenga una fuerte incertidumbre.

  Finalmente usé una solución tipo hack: si el offset calculado es mayor que la longitud, solo tomo la longitud.

- HDMAPMDK-1297 Enlace incorrecto de plazas de aparcamiento
  Aunque ya era casi la hora de salida (9 p.m.), ¡hoy tenía que al menos analizar este problema!
  Vaya, lo resolví. Resultó ser un problema simple.

### 2020-05-27

Hoy, si no hay imprevistos, debo terminar lo de CI Pipeline

Resulta que hubo imprevistos - -

Recibí errores reportados por Yiming:

1. Enlace de semáforos: un semáforo que debería estar enlazado a un área de espera se enlazó a la partición antes del área de espera, ya reparado (1.5h)
2. Falta de enlace de semáforos: no se pudo reproducir
   Actualización: después de una ronda difícil de depuración, finalmente encontré el problema, al compilar, la geometría utilizada para el enlace de rc con offset no era la misma línea, causando que el offset excediera la longitud de la carretera, por lo que no se pudo encontrar el semáforo (2h)

### 2020-05-28

Mañana tengo el examen práctico de conducir, hoy practiqué conducción todo el día, regresé a las 5 p.m. Me sentí bastante bien, espero aprobar mañana.

Empecé a describir el estado actual y analizar los requisitos de CI Pipeline - -

### 2020-05-29

No aprobé. Ay, es muy difícil para mí.

Por la mañana fui al examen, por la tarde hice algunas cosas:

1. Fui a ver una situación anormal con Yiming, resultaron ser dos errores.
2. Después del townhall de la tarde, sincronicé lo de MDK python binding.
3. Fui con Shanle y Weiyu a resolver un problema de los equipos posteriores, finalmente resumimos una solución a corto plazo y una a largo plazo.

Descubrí que al enfrentar problemas imprevistos, generalmente el método para resolverlos debería ser este patrón:
Una solución a corto plazo y una a largo plazo. Porque el valor expuesto por el problema es limitado y tiene una temporalidad. Por lo tanto, la solución a corto plazo se enfoca en resolver rápidamente y con precisión la necesidad urgente. ¿Necesitamos una solución a largo plazo? Generalmente sí, porque un caso particular de un problema refleja un punto ciego en las soluciones anteriores no considerado, entonces analizar la causa del problema y resolverlo sistemáticamente hace que este tipo de problemas puedan resolverse bien en el futuro, haciendo que la solución original sea más completa. También hay casos donde no se necesita una solución a largo plazo, y es cuando **después de un análisis exhaustivo** juzgamos que el costo de resolver sistemáticamente el problema es mayor que el beneficio. (Incluso así, en la mayoría de los casos subjetivamente queremos resolverlo sistemáticamente, como ingenieros, ¿quién no quiere resolver problemas sistemáticamente? Pero esto también deja una trampa, haciendo que las personas puedan resolver cosas importantes pero no urgentes, o cosas ni importantes ni urgentes, desperdiciando así el valioso tiempo que podría usarse para resolver otros problemas más valiosos).

4. Al regresar por la noche, continué con lo de CI Pipeline.

### 2020-06-01

Hoy por la mañana fui directamente con Yiming a analizar un problema, lo analicé toda la mañana. Resultó ser un problema conocido anteriormente (falta de puntos causada por interpolación del compilador antiguo) que causó otro problema: al capturar la carretera justo cerca del segmento faltante, el offset del carril es negativo.

Terminé hasta las 4 p.m., después de una noche de trabajo ineficiente y doloroso (siento que en mi estado actual, siempre que trabajo hasta tarde, básicamente se relaciona con la ineficiencia).

### 2020-06-02

Llegué por la tarde, para que Yiming subiera al vehículo, resolví algunos errores, logré que Yiming subiera al vehículo por la noche.

### 2020-06-03

Por la mañana fui directamente a resolver el problema que Yiming encontró por la noche, que era no poder obtener los semáforos.

### 2020-06-04

Esta mañana tengo que hacer tres cosas:

1. Limpieza de datos y carga de los datos finales del 0605
2. Revisar el problema de ancho anormal - se debe a que no hay carril en esa posición
3. Revisar el problema de puntos de interpolación asignados al carril incorrecto
4. Revisión

### 2020-06-05

Un día intenso y emocionante, completé HDMAPMDK-1347 y HDMAPMDK-1352, y también hice una gran refactorización.

Aprendí una lección valiosa: cerca de la entrega, no te arriesgues a hacer cambios enormes, porque sin suficientes pruebas de QA, cualquier refactorización impresionante puede traer riesgos, y sin suficiente tiempo para revisar el diseño (me refiero a mí mismo, porque a veces al escribir te das cuenta de que el diseño puede estar mal, pero descubrir problemas de diseño durante la implementación es otro problema: comenzar demasiado pronto).

Complemento del lunes:
En este día intenso de refactorización, casi no paré, ni siquiera tuve tiempo para pensar, solo pude confiar en la familiaridad y el estado de flujo, escribiendo código con una eficiencia extremadamente alta. En realidad, si no consideramos el principio de no hacer grandes refactorizaciones antes de la entrega, disfruté mucho este estado. Pero todo debe tener un objetivo y un significado, no solo divertirse, de lo contrario, esta diversión se convierte en un placer inferior.

### 2020-06-08

El sábado me mudé a trabajar en Beijing.

La sensación de volver a trabajar en Beijing es realmente un poco desconcertante, todo ha cambiado, primero no tengo un puesto de trabajo (Xiuyun contrató a un pasante, para facilitar el trabajo, su pasante se sentó allí), esta es la más incómoda de todas las pérdidas. Es como cuando llegué a la clase uno en segundo año de secundaria y me senté en un nuevo asiento sin conocer a nadie, sin querer hablar con ellos, la gente aquí parece familiar pero extraña, siento que tengo pocos amigos aquí, lo cual juzgo racionalmente que es una ilusión. Pero la sensación de no querer comunicarme con la gente, de querer encontrar un rincón para estar, es real, y de hecho encontré un rincón para estar, al lado de Yuzhang. ¿Por qué no quiero comunicarme con la gente? Todavía no entiendo este problema, ¿tal vez porque no tengo una razón justificada? Cuando preguntan por qué vine a Beijing y por cuánto tiempo me quedaré, balbuceo diciendo un tiempo, uno o dos meses; o tal vez muestra que en esencia soy una persona introvertida, que no le gusta molestar, que se preocupa mucho por parecer estúpido a los ojos de los demás. Sin embargo, cuanto más escribo, más siento que el segundo componente es mayor e innecesario. Primero, parecer estúpido es mejor que ser realmente estúpido, pedir ayuda a los demás con sinceridad, aunque sea torpemente. No temas, no temas cuando eres joven. No temas en ningún momento. Todo está bien.

Luego, hablemos del trabajo. Durante este tiempo, terminé la entrega, principalmente la refactorización de TLM (typed lane model). Esta vez debo definir claramente los objetivos y controlarme, no refactorizar impulsivamente, debe ser estratégico, controlando mi propio progreso.

Además, arreglé mi computadora de escritorio. Resulta que antes no podía conectarme a Internet porque cambié la contraseña, después de un corte de energía, la red perdió completamente la conexión. Así que todavía tengo que configurar la máquina, esta vez los objetivos por prioridad son:

1. Productividad
2. Genialidad
3. Estética

Hoy leí durante mucho tiempo el blog de Wang Yin - - sigo desintoxicándome, antes siempre era un fanático religioso frenético, no podía ver la esencia de las cosas. Siempre pensaba que algo era la solución definitiva a todos los problemas, pero en realidad esta "solución definitiva" rara vez existe, la mayoría de las veces es solo fanatismo religioso, como:

- Vim vs Emacs
- OOP vs FP
- Go vs Rust

Etc., etc. ... En el pasado, cuando recién me expuse a OOP, pensaba que OOP era invencible, podía resolver todos los problemas, pero al final solo escribí un montón de clases similares, en realidad no importaba si existían estas clases o no, lo realmente útil eran las funciones dentro de cada clase. Más tarde (estos dos años) me expuse a FP, y pensé que FP era la bala de plata para resolver todos los problemas, pero después de escribir programas en Scala por un tiempo, descubrí que mi productividad no mejoró mucho, sino que a menudo me enredaba con la sintaxis, con la inmutabilidad, lo que reducía mi eficiencia.

### 2020-06-09

Encontré un poco de ritmo, instalé Arch, ¿siento que es incluso más cómodo de usar que Mac?

Jugué Tavern Brawl con Yuzhang durante un buen rato - -

### 2020-06-10

Hoy planeo hacer estas cosas:

1. HDMAPMDK-1199 RoadMark se convierte en una subclase, proporciona información más rica
2. HDMAPMDK-892 Proporcionar trayectorias de experiencia

Si me sobra energía, haré la documentación de lanzamiento de versión.

Resultó que completé 892.

### 2020-06-11

Revisé HDMAPMDK-892 - Proporcionar trayectorias de experiencia

Descubrí que MDK aún no tenía la adaptación correspondiente, esta tarde estuve haciendo esta adaptación.

Terminé la adaptación, estoy muy cansado.

Sigo jugando con mi Arch, tratando de registrar algunos pasos de mi instalación como parte de la automatización.

### 2020-06-12

La tarea de hoy es resolver HDMAPMDK-1199, antes me olvidé de este problema.

Finalmente lo resolví a las 8 p.m.

### 2020-06-13

Un día muy relajado, después de la entrega de pruebas, estuve jugando con mis scripts de automatización.

Al principio pensé en usar shell para escribir, pero realmente no me gusta shell, así que empecé a jugar con scheme, ¡qué divertido!

### 2020-06-15

Guau, son las 3 p.m. y he estado holgazaneando casi todo el día, navegando por varios sitios web relacionados con scheme, no puedo seguir así.

Hoy debo resolver HDMAPMDK-1378, que es lo que siempre hemos evitado: agregar la llamada dirección de lane mark dentro de las intersecciones. Pero las carreteras dentro de las intersecciones no tienen lane marks, ¿cómo puede haber dirección de lane mark?

Me siento muy incómodo, después de varios intentos, llegué hasta muy tarde.

### 2020-06-16

Hoy después de llegar, estuve revisando, hay bastantes cosas que modificar, luego empecé a sentirme un poco desmotivado, finalmente lo resolví a duras penas, y luego el hermano Kuan encontró varios errores más.

Por la tarde me enteré de que el hermano Xiao se iba, me sorprendí durante mucho tiempo.

Por la noche jugué un poco con scheme, resolví la compilación y referencia de bibliotecas personalizadas.

### 2020-06-17

El trabajo principal de hoy es terminar el trabajo del último ciclo, es decir, corregir errores.

### 2020-06-18

Hasta hoy, finalmente vamos a terminar las cosas del último ciclo.

Mi sensación general es muy mala, la razón es que el significado de lo que hago no es claro, en realidad creo que básicamente no tiene mucho significado.

Entonces, ¿cómo defino el significado aquí?

El significado del trabajo actual para mí, en orden de importancia de mayor a menor:

1. Capacidad para plantear problemas, poder descubrir problemas valiosos y significativos.
2. Acumular capacidad para modelar problemas, para poder resolver más tipos de problemas en el futuro.
3. Modelar problemas, haciendo posible resolver una clase de problemas descritos por el modelo a través de un esfuerzo único.
4. A través de mi esfuerzo, poder resolver problemas específicos y significativos; resolver un problema único tiene menos significado que invertir un esfuerzo para resolver múltiples problemas de esta clase.
5. Mantener el placer, la sensación de logro al resolver problemas, la diversión del problema en sí.
6. Comunicación y relaciones con las personas.
7. Salario (es una garantía, no es que no sea importante, sino que las demás partes deben construirse sobre él).

Puede que no incluya todas mis motivaciones laborales, pero al menos refleja parte de la realidad.

La razón por la que me siento desanimado hoy, creo que se debe principalmente a la pérdida de diversión. Primero, el significado del problema en sí no es claro para mí, lo que reduce la motivación. Segundo, el modelado de este tipo de problemas no es lo suficientemente preciso, lo que hace que los métodos de resolución no puedan resolver todos los problemas (por supuesto, rara vez existe un modelo que resuelva todos los problemas, porque el modelo en sí es una simplificación y abstracción del problema, aquí discutimos resolver problemas dentro de un rango aceptable) lo que lleva a repeticiones, específicamente, los errores que los compañeros de QA señalan uno tras otro. Aunque algunos se deben a una comprensión insuficiente de los requisitos o son problemas de las pruebas mismas, el tiempo dedicado a analizar el problema ocupa la parte más larga de todo el proceso de resolución.

A veces, una comprensión superficial del problema conduce a soluciones no esenciales, haciendo que las personas dediquen tiempo a trabajos inútiles, básicamente no se satisfacen los puntos 3, 4 y 5 del significado anterior, lo que me hace sentir desanimado.

Luego, otro punto a considerar es que hasta ahora he estado resolviendo problemas que deberían haberse resuelto en el último ciclo. Aún no he comenzado a hacer lo que debería hacerse en este ciclo. Esto comprimirá el tiempo de este ciclo, quizás afectando también los ciclos posteriores. Este es un ciclo vicioso que no debería ocurrir, considerando incluso un impacto más profundo en las relaciones entre personas, creo que es aún más inapropiado.

Por lo tanto, a partir de mañana, antes de hacer algo, debo intentar considerar todos sus aspectos, y luego resolver el problema.

Mirando hacia atrás lo que hice en estos más de diez días, el progreso del trabajo ha estado completamente estancado. El lunes que llegué a Beijing, el 8 de junio, dije: `Luego, hablemos del trabajo. Durante este tiempo, terminé la entrega, principalmente la refactorización de TLM (typed lane model). Esta vez debo definir claramente los objetivos y controlarme, no refactorizar impulsivamente, debe ser estratégico, controlando mi propio progreso.`

Actualmente, creo que un buen punto es que registro lo que hago cada día, aunque a veces es muy breve, incluso complementado al día siguiente, pero creo que el registro continuo es la semilla del cambio.

Además, complemento con una frase que vi antes y que creo que es muy, muy razonable:

> Hace unos años, cuando compré mi primera casa en Nueva York, un agente inmobiliario dijo algo muy sensato: "Esta casa necesita una renovación importante, y es una renovación completa, esta casa de 65 años tiene un potencial de apreciación absoluto. Ahora debes hacer una lista de todo lo que necesita reparación y arreglar todo en seis meses. Debes resolver todos los problemas en seis meses."<br>"¿Estás loco? Después de pagar la entrada, impuestos, honorarios de abogados, ya no tengo dinero. Además, soy una persona muy disciplinada, puedo arreglar todo lentamente en cinco años."<br>Ella dijo: "No, no lo harás, porque después de seis meses, te acostumbrarás a la situación actual. Pensarás que todo está bien. Incluso si hay un cadáver en la sala de estar, lo pasarás por alto."<br>Todavía recuerdo estas palabras. Lo que me sorprende es que todo sucedió como ella dijo. Yo estaba equivocado, las cosas que no arreglé en seis meses, aún no estaban reparadas cinco años después cuando vendí la casa.

Esto es demasiado real, debemos estar alertas y tener cuidado.

### 2020-06-19

Hoy sucedió algo muy importante, almorcé con Liang Xiao. Necesito organizarlo bien.

### 2020-06-22

Comencé muy desmotivado, analizando errores todo el tiempo, finalmente descubrí que era un pequeño problema de Ziliang, salí a las 9 p.m.

### 2020-06-23

¡Increíble! Son las 7:00 p.m. y hoy no he hecho nada.

Quiero decir que hoy holgazaneé todo el día, navegando por varios sitios web, y ahora que quiero trabajar, me siento un poco culpable. Pienso en la razón, tal vez por lo que pasó el viernes, o porque pasado mañana es el festival del Bote del Dragón, así que holgazaneo - - pero en última instancia, esto no está bien, incluso si decido irme, no debo desc
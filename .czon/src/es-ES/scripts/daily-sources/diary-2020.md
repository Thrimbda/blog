---
title: Diario de trabajo 2020
date: 2020-01-01
taxonomías:
  etiquetas:
    - diario de trabajo
    - resumen mensual
    - tecnología
---

### 2020-04-13

- Completé la autoevaluación de rendimiento
- Revisión de Lane Center Aggregation

### 2020-04-14

- [ ] Compilación de límites de velocidad
- [ ] Límites de velocidad personalizados

### 2020-04-15

- Determinación del esquema de límites de velocidad personalizados @guangcong
  1. Usar el nuevo module-dynamicEvent para resolver este problema
  2. La actualización del límite de velocidad personalizado se publica como un nuevo evento que desencadena la actualización de horizon data
  3. Es necesario considerar la detección de anomalías y problemas de memoria
  Después de discutir con Guangcong, él encontró algunos problemas
- Revisión de Xiaokang
  Java, como lenguaje sólido, tiene mucho que ofrecer
- Compilación de límites de velocidad
  Básicamente sin avances, se añadió la lógica para extraer RoadCenterTile
- Resolución del problema de seccionamiento, análisis del plan de optimización de edgeLifting, propuesta de algoritmo de optimización:
  Dada la cabeza de recorrido y la función de conectividad, se proporciona la forma de recorrido
- Investigación del principio de Jars auto-ejecutables

### 2020-04-16

- Aclarar la interfaz de custom speed limit con Yiming: él garantiza que el par de ubicaciones de entrada siempre determina una ruta única más corta
  Al regresar, discutir con Guangcong el algoritmo para generar custom speed limits
  1. Dada una ruta
  2. Sabiendo que | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
     entonces siempre se puede encontrar un par (start DiRoadOnPath, end DiRoadOnPath) que minimice la distancia
- Publicar temporalmente una versión instantánea del compilador pylon-v0.1.1 para Xiaokang
- Pasear y charlar con Hanteng por el edificio
- Aclarar la interfaz de uso del mapa SUMO con Zizhe y Yicheng
- Compilación exitosa de Speed Limit, aún sin verificar

### 2020-04-17

- Verificación de compilación de SpeedLimit:
  OSMSerializable no funciona bien, porque el SpeedLimit vinculado no tiene geometría
  Puede haber problemas: en las rampas de incorporación, el límite de velocidad vinculado puede fallar
- [ ] Interpolación
- [ ] Distancia de Hausdorff
- [ ] LcInJunctionTile

#### Algunas ideas

- ¿Usar Spark directamente?
- ¿Qué contexto necesita OSM?

### 2020-04-18

Completé el límite de velocidad

### 2020-04-20

#### Límites de velocidad personalizados

- Guangcong convirtió la entrada en un vector y añadió pruebas
- Un pequeño problema: Guangcong no entiende realmente el principio de funcionamiento de los punteros en C++
- [ ] ¿Quizás intentar resolver [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337)?
- [ ] Compartir los archivos que compartió el compañero mayor como enlace anónimo a través de Resillo Sync

#### Reparación de RoadBorder

Descubrí que había hecho suposiciones incorrectas. En el RC, la información registrada de LC y RB puede tener:

1. Solo un LC, por lo tanto, no se puede asumir que el LC tiene al menos dos
2. Puede que un lado no tenga RB, por lo tanto, no se puede asumir que RB siempre existe

### 2020-04-21

#### Reparación de RoadBorder

- Completé la migración de casos de prueba
- Mejoré Dune y su ReadMe para que pueda generar datos de prueba directamente
  Hablé con Weiyu, mirando hacia el futuro, me centro en el sistema de compilación

#### Vinculación de POI en carril opuesto

- Vinculación de datos después de la multidigitización

### 2020-04-22

#### Vinculación de POI en carril opuesto

- Vinculación de datos después de la multidigitización
- Construcción de datos de prueba

### 2020-04-23

- Completé la vinculación de POI en carril opuesto y finalicé la depuración [4]

### 2020-04-27

Hoy principalmente hice lo siguiente:

#### Sincronización completa de mdm proto y mdm spec

1. Junto con Linnan, modifiqué algunas partes erróneas en la descripción de mdm spec
2. Dejé varios puntos pendientes que Linnan y yo no podíamos decidir solos
3. En la reunión matutina del 26-04-2020, decidimos posponer la modificación de LaneSplitMerge y Polyline, las más complicadas
4. Completé la modificación de proto
5. Completé la modificación de nexus
6. Completé la modificación de mdk
7. También corregí un problema con los datos de prueba (errores masivos de datos)

#### Corrección de errores

Cerca del lanzamiento del 30 de abril, los errores aumentaron drásticamente

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analizado

- [ ] Script de copia automática de casos de prueba
- [ ] Exportar recordatorios de Apple

### 2020-04-28

Examen de conducir (parte teórica), medio día

HDMAPMDK-1130 Problema de ancho, tres cuestiones

1. El spec estipula que no hay ancho de carril durante el cambio de carril
2. Línea de división demasiado larga en intersecciones

HDMAPMDK-1121 reparado nuevamente

Estado muy malo

### 2020-04-29

#### Corrección de errores

- HDMAPMDK-1143
  Problema de compilación de RoadObstacle
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Uso de mill
- Uso de nexus-osm

#### Lluvia de ideas

### 2020-05-08

#### Problema de fuga de memoria

- La causa directa de la fuga de memoria es que no se eliminó el puntero salvaje después de hacer new
- Después de actualizar la posición actual, map kit llamó a prepareGuidanceData, cuyo objetivo es encontrar los datos de guía más cercanos a la posición actual
- prepareGuidanceData llamó a NavInfoProviderImpl::getTrafficLights y NavInfoProviderImpl::getCarParks
- Tomando NavInfoProviderImpl::getTrafficLights como ejemplo, al ser llamado se hace new del puntero de datos en NaviEventOnPath
- Sin embargo, no se eliminó
- También se descubrió que DestEvent tiene el mismo problema

Solución: el núcleo es no permitir punteros salvajes, se decide refactorizar NaviEventProvider

- Primero, agregar dos campos traffic*light_events* y car*park_events* en NaviInfoProvider
- En NaviInfoGenerator, después de que se actualiza la ruta, actualizar estos dos campos
- Luego, en cada get, filtrar según la posición actual del vehículo
- Por lo tanto, se debe refactorizar `PathReader::getAttributes`, porque la implementación anterior solo consideraba el offset relativo al vehículo actual, ahora se necesita una interfaz de offset relativo a la ruta

### 2020-05-09

#### Reparación y prueba de PolyLine

El problema principal de PolyLine es que durante la generación pueden insertarse puntos duplicados, lo que causa una serie de problemas de cálculo geométrico relacionados con segmentos:

1. Cálculo vectorial: dos puntos duplicados producen un vector cero
2. Cálculo de longitud: la longitud del segmento es 0, lo que fácilmente produce NaN

Por lo tanto, al construir PolyLine, se verifica si hay puntos duplicados; si se encuentran, se lanza una excepción

Se encontraron los siguientes problemas:

- Problema con getEnd en Jts
- Problema de normalización con LinearLocation en Jts

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // la salida es -1
  ```

- Durante la interpolación, es posible tomar dos puntos demasiado cercanos

### 2020-05-11

- HDMAPMDK-1122
  No se pudo reproducir el problema de bordes de carretera faltantes, se decide no invertir más tiempo en investigar la causa
- Media hora de "Crecimiento metabólico"
- Refactorización de Visitor para que admita líneas con mismo inicio y fin
- Preparé una pregunta de entrevista

### 2020-05-12

- Entrevista: ambos candidatos no calificaron, reflexión sobre cómo identificar rápidamente candidatos, tomó 3 horas
- Corrección de errores: HDMAPMDK-1211, problema de borde incorrecto eliminado, no se corrigió en la reparación anterior
  Tengo una idea pero no terminé de escribirla
- Fui al gimnasio

### 2020-05-13

Corrección de errores: HDMAPMDK-1211, encontré una solución

- La causa principal es una segmentación irracional en la línea de producción

#### Análisis de causa

Se puede ver que cuando el cambio de carril no ha terminado (la línea central del carril está cruzando la línea de carril), ya se ha realizado la segmentación, y esta segmentación puede cruzar Rp.

Dado que la información de borde de carril adjunta a los puntos de forma del centro del carril registrará fielmente los bordes de ambos lados según la geometría (usando el método scan line), sin filtrar semánticamente. Por lo tanto, en la posición donde el borde de carril cruza el carril, la línea central del carril que intersecta el borde registrará ese borde en ambas referencias de borde izquierdo y derecho.

Con la lógica de código actual, al filtrar semánticamente los bordes de referencia que cruzan el carril, se infiere el borde a eliminar según el tipo de cambio de carril.

La lógica actual falla al encontrar este tipo de segmentación, causando el problema.

#### Solución

El punto clave es **encontrar la tendencia de cambio del borde de carril que cruza**. Considerando que este tipo de segmentación puede cruzar Rp, el filtrado no debe hacerse por Rp.

1. Organizar los bordes de carril en un path usando edge lifting (puede ser considerado para una futura refactorización en graph): Seq[LaneCenter]
2. Encontrar el LaneCenter a corregir y el borde de carril a corregir (asumiendo que este tipo de LaneCenter siempre es causado por cambio de carril)
3. Calcular la tendencia de cambio de ese LaneCenter según el LaneCenter path
4. Filtrar

Se lo asigné a Ziliang

Una entrevista, no pasó

### 2020-05-14

HDMAPMDK-1132 Trazado de ID de puntos finales de bordes de carril de postes/letreros

El trazado de puntos finales de bordes de carril de postes/letreros es mucho más simple en comparación con el trazado de objetos lineales: solo existe mapeo de ID, sin mapeo de offset y longitud.

Sin embargo, hay varias consideraciones:

1. Procedimiento
2. El sistema de tipado de ID es un problema endémico, hay que encontrar cómo manejarlo

Esencialmente, la raíz del problema es que al definir los IDs usamos Long ID, mientras que en la definición de MDM se usa Int, lo que puede causar problemas de desbordamiento.

### 2020-05-15

#### Corrección de errores

- HDMAPMDK-1215 completado
- HDMAPMDK-1218 completado

### 2020-05-18

Refactorización de OSM Assembler, utilizando la serialización OSM anterior, mejorando la facilidad de comprensión y escritura del código

### 2020-05-19

Solucioné un bug de OSM Assembler (en realidad no es un bug)

Hoy hubo reunión de planificación de sprint:
Este sprint tiene pocas tareas que hacer, pero requiere mucha reflexión. Es un estado saludable

### 2020-05-20

- [ ] Escribir documentación describiendo el estado actual de CI de nexus/mdk y requisitos
- [x] Prestar atención al bug HDMAPMDK-1263
  - Es realmente un problema de segmentación en la línea de producción
- [ ] Concertar reunión con Yang Chuan para discutir CI
- [ ] HDMAPMDK-1262
  No terminado
- [x] Problema de Custom Speed Limit

### 2020-05-21

#### TODOs

- [x] Saludar a Qiao Bo
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### Trabajo

- Por la mañana fui al área de trabajo de Yiming para depurar en línea el hotfix de ayer, resultó ser por el offset. Ayer escribí con demasiada prisa y sin añadir pruebas. Este tipo de comportamiento no debería repetirse. Pensé que ahorraba mucho tiempo, **pero al final perdí más tiempo**.
- 1262: no se podían obtener datos porque MDK no cargaba road marks a nivel de carril (y road obstacles)
- Ayudé a Du Ge a compilar datos

### 2020-05-22

¿Qué hice este día?  
¿Qué hice????

### 2020-05-25

Hoy recibí una nueva tarea: HDMAPMDK-1249 - Investigar el uso de información geométrica de carreteras para calcular la agregación de carriles. Esto hace que las tareas de esta semana aumenten un poco. Hasta ahora tengo tres cosas que hacer:

1. 1249
2. Estado actual, requisitos y plan de la Pipeline CI del equipo
3. Refactorización de Nexus graph

Cada una requiere una reflexión cuidadosa y no son fáciles. Pero lamentablemente no puedo estimar claramente el tiempo para cada una. Weiyu las estimó y las puso en los story points de las tareas de Jira. Una cosa tengo clara: **si no empiezo a estimar y revisar, nunca podré estimar bien**. Así que a partir de ahora empezaré a estimar cuidadosamente.

Además, planeo empezar con 1249 hoy, porque es un asunto de negocio, generalmente más urgente, y Weiyu le dará más importancia. En cuanto a la refactorización, si yo mismo no me involucro, probablemente nadie le prestará atención (porque es cruel: no afecta la funcionalidad, pero afecta la eficiencia, y la eficiencia es lo más difícil de medir; incluso yo mismo solo tengo un análisis cualitativo).

### 2020-05-26

Hoy hubo muchas emergencias. Primero, parking reportó dos bugs. Originalmente planeaba entregar hoy, pero debido a estos dos bugs no pude. Wang Wei negoció con el cliente aguas abajo para posponer dos días, hasta pasado mañana. Así que mi trabajo principal de estos dos días se convirtió en resolver bugs. Me hizo reflexionar si la planificación de la entrega era razonable. Luego, el problema HDMAPMDK-1290.

Lo completado hoy:

- Seguimiento de HDMAPMDK-1290: cuando se está muy cerca de la línea de parada, el offset de carril coincidente puede ser mayor que la longitud del carril

  > Pasé todo el día investigando y tratando de resolver el problema (actualmente son las 20:56), eficiencia muy baja.

  La causa fundamental es que MDK, al calcular la longitud, toma la longitud entre cada dos puntos y aplica una transformación de coordenadas; aunque esto es más preciso, introduce una gran incertidumbre.

  Finalmente usé una solución algo "hack": si el offset calculado es mayor que la longitud, simplemente tomo la longitud.

- HDMAPMDK-1297 Error en la vinculación de plazas de aparcamiento
  Aunque se acercaba la hora de salida (21:00), hoy al menos tenía que analizar este problema.  
  ¡Vaya, lo resolví! Resultó ser un problema simple.

### 2020-05-27

Hoy, si no hay sorpresas, haré el trabajo de la Pipeline CI.

Pero hubo sorpresa - -

Recibí un bug reportado por Yiming:

1. Vinculación de semáforos: un semáforo que debería estar vinculado en la zona de espera se vinculó en la partición frente a la zona de espera. Ya reparado (1.5h)
2. Semáforo no vinculado: no se pudo reproducir
   Actualización: después de una dura depuración, encontré el problema. Durante la compilación, la geometría usada para vincular el RC con el offset no era la misma línea, lo que causaba que el offset superara la longitud de la carretera, por lo que no se encontraba el semáforo (2h)

### 2020-05-28

Mañana examen de conducir (parte práctica), hoy practiqué todo el día, volví a las 5 de la tarde. Me sentí bien, espero aprobar mañana.

Empecé la descripción del estado actual de la CI Pipeline y análisis de requisitos - -

### 2020-05-29

No aprobé. Vaya, qué difícil.

Fui al examen por la mañana, por la tarde hice varias cosas:

1. Fui a ver una situación anómala con Yiming, resultaron ser dos bugs.
2. Después del townhall de la tarde, sincronicé lo de la vinculación de Python con MDK.
3. Fui con Danle y Weiyu al piso de abajo para resolver un problema del cliente aguas abajo. Finalmente, resumimos una solución a corto plazo y una a largo plazo.

Encuentro que cuando surgen problemas repentinos, generalmente el método para resolverlos sigue este patrón:
una solución a corto plazo y una a largo plazo. Porque el valor que expone el problema es limitado y tiene una caducidad temporal. Por lo tanto, la solución a corto plazo se enfoca en resolver rápidamente la emergencia. ¿Hace falta también una solución a largo plazo? Generalmente sí, porque un caso particular refleja un punto ciego en la solución anterior no considerada. Entonces, analizar la causa raíz y solucionarlo de manera sistemática permite resolver mejor este tipo de problemas en el futuro, haciendo más completa la solución original. Hay casos en los que no se necesita una solución a largo plazo: cuando después de **analizar a fondo** el problema, concluimos que el costo de resolverlo sistemáticamente es mayor que el beneficio. (Incluso así, la mayoría de las veces subjetivamente queremos resolverlo sistemáticamente; como ingenieros, ¿quién no quiere hacerlo? Pero esto deja una trampa, haciéndonos invertir tiempo en cosas importantes pero no urgentes, o incluso ni importantes ni urgentes, desperdiciando tiempo valioso que podría usarse en otros problemas más valiosos).

4. Por la noche, continué con lo de la CI Pipeline.

### 2020-06-01

Esta mañana, nada más llegar, fui a analizar un problema con Yiming, toda la mañana. Resultó ser un problema conocido anterior (falta de puntos por interpolación del compilador antiguo) que causaba otro problema: al coger la carretera justo cerca de la zona faltante, el offset del carril era negativo.

Terminé trabajando hasta las 4 de la madrugada, después de una noche de trabajo ineficiente y dolorosa (creo que en mi estado actual, trasnochar siempre es sinónimo de ineficiencia)

### 2020-06-02

Llegué por la tarde. Para que Yiming subiera al coche, resolví algunos bugs, justo a tiempo para la subida nocturna de Yiming.

### 2020-06-03

Nada más llegar por la mañana, fui a resolver los problemas que Yiming encontró durante la noche: no se obtenían los semáforos.

### 2020-06-04

Esta mañana tengo tres cosas que hacer:

1. Limpieza de datos y subir los datos finales del 0605
2. Revisar el problema de ancho anómalo - porque no hay carril en esa posición
3. Revisar el problema de asignación incorrecta de carril por puntos de interpolación
4. Revisión final

### 2020-06-05

Un día intenso. Completé HDMAPMDK-1347 y HDMAPMDK-1352, y también hice una gran refactorización.

Aprendí una lección valiosa: no hacer cambios enormes cerca de la entrega, porque sin suficientes pruebas QA, cualquier refactorización por genial que sea puede traer riesgos. Además, sin tiempo suficiente para revisar el diseño (me refiero a mí mismo, porque a veces mientras escribes te das cuenta de que el diseño puede estar mal; pero detectar problemas de diseño durante la implementación es otro problema: empezar demasiado pronto).

Lunes adicional:
En este día intenso de refactorización, casi no paré, ni siquiera tuve tiempo para pensar, solo confiando en la familiaridad y el flujo, escribiendo código a alta eficiencia. Honestamente, si no fuera por el principio de no hacer grandes cambios antes de la entrega, disfrutaría mucho este estado. Pero todo debe tener un objetivo y un significado; no se puede solo disfrutar, de lo contrario ese disfrute se convierte en un placer de bajo nivel.

### 2020-06-08

El sábado me mudé a Beijing para trabajar.

Volver a trabajar en Beijing se siente un poco extraño. Todo ha cambiado. Primero, perdí mi puesto de trabajo (Xiuyun contrató a un pasante, y por conveniencia, mi puesto fue ocupado por él). Esto es lo más incómodo de todas las pérdidas. Es como cuando en segundo año de secundaria me cambié a la clase 1 y me senté en un lugar nuevo sin conocer a nadie, no quería hablar con ellos. La gente aquí parece familiar y extraña a la vez. Siento que tengo pocos amigos aquí; creo racionalmente que es una percepción errónea. Pero no quiero comunicarme con la gente, quiero encontrar un rincón para esconderme, y eso es verdad. De hecho, encontré un rincón, al lado de Yuzhang. ¿Por qué no quiero comunicarme? Sigo sin entenderlo. Quizás porque no tengo una razón clara: ¿por qué vine a Beijing? ¿cuánto tiempo me quedaré? Respondo con evasivas: un tiempo, uno o dos meses. O quizás, en el fondo, soy introvertido, no quiero molestias, me importa mucho no parecer tonto ante los demás. Sin embargo, mientras más escribo, más pienso que la segunda razón pesa más y es innecesaria. Primero, parecer tonto es mejor que ser realmente tonto. Pregunta en serio, aunque sea torpe. No tengas miedo. No tengas miedo cuando eres joven. No tengas miedo nunca. All is well.

Ahora sobre el trabajo. Este tiempo terminé la entrega, principalmente la refactorización de TLM (typed lane model). Esta vez hay que tener objetivos claros, controlarme, no dejarme llevar por la refactorización impulsiva, ser estratégico y controlar mi progreso.

También configuré mi computadora de escritorio. Resulta que antes no podía conectarme a internet porque cambié la contraseña; después de un corte de luz, la red se perdió por completo. Así que tuve que reinstalar la máquina. Esta vez los objetivos por prioridad son:

1. Productividad
2. Ser cool
3. Estética

Hoy pasé mucho tiempo en el blog de Wang Yin - desintoxicándome. Antes era un fanático religioso, no veía la esencia de las cosas. Siempre pensaba que algo era el medio definitivo para resolver todos los problemas. Pero rara vez hay tales "medios definitivos"; la mayoría de las veces es fanatismo religioso, por ejemplo:

- Vim vs Emacs
- OOP vs FP
- Go vs Rust

etcétera. Cuando recién conocí OOP, pensaba que era invencible, que resolvía todo. Pero al final solo escribí una clase todopoderosa, que en realidad no importaba; lo verdaderamente útil eran las funciones dentro de esa clase. Luego (estos dos últimos años) conocí FP y pensé que era la bala de plata para todo. Pero después de programar un tiempo en Scala, descubrí que mi productividad no mejoraba mucho; al contrario, perdía eficiencia enredándome con la sintaxis e inmutabilidad.

### 2020-06-09

Encontré un poco de ritmo. Instalé Arch, y siento que incluso es más cómodo que Mac.

Jugué un buen rato a Battlegrounds con Yuzhang - -

### 2020-06-10

Hoy planeo hacer estas cosas:

1. HDMAPMDK-1199 RoadMark convertirlo en subclase, proporcionar información más rica
2. HDMAPMDK-892 Proporcionar trayectorias experienciales

Si me queda energía, trabajar en la documentación de versiones.

Resultado: completé el 892

### 2020-06-11

Revisé HDMAPMDK-892 - Proporcionar trayectorias experienciales

Descubrí que MDK aún no tiene la adaptación correspondiente. Esta tarde hice esa adaptación.

Terminé la adaptación, muy cansado.

Seguí trasteando con mi Arch, intentando automatizar algunos pasos de la instalación.

### 2020-06-12

La tarea de hoy era completar HDMAPMDK-1199, que había olvidado.

Finalmente lo completé a las 8 de la tarde.

### 2020-06-13

Un día muy relajado. Después de enviar a pruebas, estuve todo el día jugando con mis scripts de automatización.

Al principio pensé en usar shell, pero no me gusta shell, así que empecé a jugar con Scheme. ¡Qué bien!

### 2020-06-15

Vaya, son las 3 de la tarde y he estado vagueando casi todo el día, navegando sitios relacionados con Scheme. ¡No puede ser!

Hoy tengo que completar HDMAPMDK-1378, que es añadir la llamada dirección de marca de carril dentro de las intersecciones, algo que no queríamos hacer. Pero las carreteras dentro de las intersecciones no tienen marcas de carril, ¿de qué dirección de marca de carril hablamos?

Qué difícil. Después de darle vueltas, trabajé hasta tarde.

### 2020-06-16

Hoy al llegar, estuve revisando todo el día. Hay muchas cosas que modificar. Luego empecé a sentir cierta desgana, pero finalmente lo hice a duras penas. Luego Kuan encontró varios bugs más.

Por la tarde me enteré de que Xiao se iba. Me quedé en shock un buen rato.

Por la noche jugué un poco con Scheme, logré compilar y enlazar bibliotecas personalizadas.

### 2020-06-17

Hoy el trabajo principal fue cerrar la iteración anterior: corrección de errores.

### 2020-06-18

Hasta hoy, por fin terminamos las tareas de la iteración anterior.

Me siento muy mal. La razón es que el sentido de lo que hago no es evidente. Creo que básicamente no tiene significado.

Entonces, ¿cómo defino "significado" aquí?

Para mí, el significado del trabajo actual, en orden de importancia:

1. Capacidad de plantear preguntas, encontrar problemas valiosos y significativos
2. Acumular capacidad de modelar problemas, para poder resolver más tipos de problemas en el futuro
3. Modelar problemas para que mediante un esfuerzo único se pueda resolver una clase de problemas descritos por el modelo
4. A través de mi esfuerzo, resolver problemas concretos y significativos; resolver un problema de una vez tiene menos valor que esforzarse por resolver múltiples problemas de una clase
5. Mantener la alegría, la satisfacción de resolver problemas, el interés del problema en sí
6. Relaciones e interacción con las personas
7. Salario (es una garantía, no es que no sea importante, sino que el resto debe construirse sobre él)

Quizás no incluya todos mis motivos laborales, pero al menos refleja parte de la realidad.

Y hoy me siento frustrado, creo que la razón principal es la pérdida de interés. Primero, el problema en sí no me parece significativo, lo que reduce la motivación. Segundo, el modelado de este tipo de problemas no es lo suficientemente preciso, por lo que los medios para resolver el problema no resuelven todos los casos (claro que rara vez existen modelos que resuelvan todos los problemas, porque el modelo en sí es una simplificación y abstracción; aquí hablamos de resolver problemas dentro de un rango aceptable), lo que provoca repeticiones. Específicamente, los bugs que plantea el equipo de QA, aunque algunos son por falta de comprensión de los requisitos o incluso son problemas de las pruebas en sí, el tiempo invertido en analizar el problema ocupa la parte más larga de todo el proceso de resolución.

A veces, una comprensión insuficiente del problema provoca soluciones poco esenciales, lo que hace que la persona pierda tiempo en trabajo inútil, incumpliendo los puntos 3, 4 y 5 de los significados anteriores, lo que me lleva a la frustración.

También hay que considerar que hasta ahora he estado resolviendo problemas de la iteración anterior. Aún no he empezado con las tareas de esta iteración. Esto comprimirá el tiempo de esta iteración, quizás afectando a las siguientes. Es un círculo vicioso que no debería ocurrir; considerando incluso el impacto en las relaciones humanas, creo que es aún más grave.

Por lo tanto, a partir de mañana, antes de hacer algo, debo considerar todos sus aspectos y luego resolverlo.

Mirando hacia atrás estos días, casi todo el progreso del trabajo ha sido estancamiento. El lunes que llegué a Beijing, el 8 de junio, dije: `luego sobre el trabajo, este tiempo terminé la entrega, principalmente la refactorización de TLM (typed lane model), esta vez hay que tener objetivos claros, controlarme, no dejarme llevar por la refactorización impulsiva, ser estratégico y controlar mi progreso.`

Ahora veo que lo bueno es que cada día registro lo que hago, aunque a veces sea muy breve o incluso lo añada al día siguiente. Creo que el registro continuo es la semilla del cambio.

Además, complemento una frase que leí y que considero muy muy acertada:

> Hace unos años, cuando compré mi primera casa en Nueva York, una agente inmobiliaria dijo algo muy sensato: "Esta casa necesita una gran renovación, una renovación completa. Esta casa de 65 años tiene un gran potencial de revalorización. Ahora tienes que hacer una lista de todo lo que hay que reparar y arreglarlo todo en seis meses. Tienes que resolverlo en seis meses." <br> "¿Estás loca? Después de pagar la entrada, impuestos, honorarios de abogados, no me queda dinero. Y soy una persona muy disciplinada, puedo arreglarlo todo poco a poco en cinco años." <br> Ella dijo: "No, no lo harás, porque después de seis meses te acostumbrarás a la situación actual. Pensarás que todo está bien. Aunque haya un cadáver en la sala de estar, lo pasarás por encima como si nada." <br> Todavía recuerdo esas palabras. Me sorprendió que todo lo que dijo se cumplió. El error fue mío; lo que no limpié en seis meses, seguía sin repararse cuando vendí la casa cinco años después.

Es demasiado real. Hay que estar alerta y tener cuidado.

### 2020-06-19

Hoy ocurrió algo muy importante: almorcé con Liang Xiao. Necesito organizarlo bien.

### 2020-06-22

Empecé muy negativo, todo el día analizando bugs, y al final resultó ser un pequeño problema de Ziliang. Salí a las 9 de la noche.

### 2020-06-23

¡Increíble! Son las 19:00, hoy no he hecho nada en absoluto.

Quiero decir, he estado todo el día vagueando, navegando por varios sitios web, y ahora que pienso en trabajar, me siento culpable. Pensando en las razones, quizás por lo que pasó el viernes, o porque pasado mañana es el festival del Bote del Dragón, así que me he relajado. Pero en el fondo, esto no está bien. Incluso si he decidido irme, no puedo descuidar mis deberes. Cada día debo afrontar el trabajo con seriedad, no solo cumplir horas, sino resolver problemas con el corazón. Si me voy, más aún debería hacerlo.

Ah, ahora siento una gran culpa.

Lo próximo que hay que hacer es la refactorización de TLM, dividir la estructura de datos en capas ultrapequeñas. Es un trabajo muy pesado. No es difícil, pero no estoy de acuerdo con la idea (no creo que dividir en estructuras de datos ultrapequeñas sea un buen diseño; dividir
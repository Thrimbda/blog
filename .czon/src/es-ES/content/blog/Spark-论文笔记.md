---
"title": "Notas sobre el artículo de Spark"
"summary": "Este texto es un resumen del artículo sobre Spark, centrándose en el núcleo del framework: los Conjuntos de Datos Distribuidos Resilientes (RDD). Un RDD es una estructura de datos distribuida, de solo lectura y reconstruible, que permite la reutilización de datos a través de múltiples operaciones paralelas. Spark, implementado en Scala, aprovecha sus características funcionales y orientadas a objetos para ofrecer un modelo de programación flexible. Esto incluye las formas de crear RDDs (desde sistemas de archivos, colecciones de Scala, transformaciones de RDDs existentes, etc.) y las estrategias de persistencia (cache y save). El artículo describe el modelo de programación de Spark, las operaciones paralelas (como reduce y collect), los detalles de implementación (basado en Mesos, diseño de la interfaz RDD) y los resultados experimentales (rendimiento 10 veces superior a Hadoop). Finalmente, el autor resume los logros iniciales y el valor potencial de Spark, destacando sus ventajas para cargas de trabajo iterativas e interactivas."
"tags":
  - "Spark"
  - "RDD"
  - "Sistemas Distribuidos"
  - "Notas de Artículo"
  - "Scala"
  - "MapReduce"
  - "Big Data"
  - "Optimización de Rendimiento"
"date": "2022-01-10"
---

MapReduce tuvo mucho éxito, sin embargo, la mayoría de los sistemas basados en grafos acíclicos no son universales. En este contexto, Spark surgió y, **a través de una estructura de datos distribuida llamada RDD**, propuso un framework de computación distribuida capaz de soportar:

> aquellas (operaciones) que reutilizan un conjunto de datos de trabajo a través de múltiples operaciones paralelas.

RDD (Conjunto de Datos Distribuido Resiliente) es una estructura de datos de solo lectura que puede ser reconstruida en caso de pérdida a través de los nodos predecesores en su DAG.

Spark está implementado en Scala, cuyas características son:
- Lenguaje implementado sobre la JVM
- Soporta programación funcional
- Orientado a objetos

## Modelo de Programación

### Introducción a los RDDs

Un RDD puede crearse de cuatro maneras:

1. Desde un sistema de archivos, por ejemplo, HDFS.
2. Desde una colección de Scala.
3. Transformado a partir de un RDD existente (usando flatMap, map, filter, etc.).
4. Cambiando la estrategia de persistencia de un RDD existente (los RDDs son de solo lectura; cualquier operación de modificación crea lógicamente un nuevo RDD).

Además, un RDD es una estructura de datos *lazy* (perezosa) y efímera. Los usuarios pueden persistir un RDD de dos formas:

- Usando `cache`: un RDD cacheado sigue siendo *lazy*, pero deja de ser efímero, lo que significa que se almacenará después de su primera evaluación para su reutilización.
- Usando `save`: escribiéndolo en un sistema de archivos distribuido.

Los usuarios deben hacer un *trade-off* entre velocidad de acceso y espacio de almacenamiento.

### Operaciones Paralelas

- `reduce` - Asociativa
- `collect`
- `foreach` - Efecto secundario (*side effect*)

## Ejemplos

- Estadísticas de logs
- Regresión logística
- ALS (Mínimos Cuadrados Alternantes)

Con las características de *lazy* y efímero, Spark se comporta de manera similar a MapReduce. Sin embargo, introduciendo un paso de `cache` se puede acelerar significativamente el procesamiento.

## Implementación

- (En la versión del artículo) Construido sobre Mesos.
- El núcleo de la implementación reside en la interfaz RDD, aprovechando plenamente las características orientadas a objetos y funcionales de Scala.
  - `getPartitions`
  - `getIterator(partition)`
  - `getPreferredLocations(partition)` - Para considerar la localidad de los datos.
- Las tareas (*closures*) en Scala son objetos Java, por lo que pueden serializarse y enviarse. Durante la implementación, incluso se descubrió un bug en Scala.
- También se integró un intérprete.
- Hasta la fecha de redacción del artículo, no se había implementado *shuffle*.

## Resultados Experimentales

- Supera ampliamente a Hadoop, siendo 10 veces más rápido.
- Conjuntos de datos pequeños.

## Trabajos Relacionados

- Memoria Compartida Distribuida (DSM)
- MapReduce
- Scala es similar a DryadLINQ

## Reflexiones

- Era un trabajo muy inicial; los autores lo compartieron con entusiasmo. Un rendimiento 10 veces superior a Hadoop es impresionante.
- Este artículo es bastante general.
- Funcional, inmutable, por lo tanto permite evaluación perezosa (*lazy evaluation*).
- Tanto Hadoop como Spark en ese momento no podían superar a MapReduce.
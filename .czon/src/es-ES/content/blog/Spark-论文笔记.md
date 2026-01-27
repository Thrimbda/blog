---
"title": "Notas sobre el artículo de Spark"
"summary": "Este artículo presenta notas sobre el artículo de Spark, describiendo cómo Spark supera las limitaciones de generalidad de sistemas como MapReduce mediante la estructura de datos RDD (Conjunto de Datos Distribuido Elástico), permitiendo la reutilización de datos a través de múltiples operaciones paralelas. El texto detalla los métodos de creación de RDDs, estrategias de persistencia, el modelo de programación (como operaciones paralelas) y los detalles de implementación de Spark en Scala, incluyendo su evaluación perezosa y naturaleza efímera. Los resultados experimentales muestran que Spark es hasta 10 veces más rápido que Hadoop en ciertos escenarios. Finalmente, se resumen las ventajas iniciales, limitaciones y comparaciones con tecnologías relacionadas."
"tags":
  - "Spark"
  - "RDD"
  - "Sistemas distribuidos"
  - "Notas de artículo"
  - "Big Data"
  - "Scala"
  - "MapReduce"
"date": "10-01-2022"
---

MapReduce tuvo mucho éxito, sin embargo, la mayoría de los sistemas construidos alrededor de grafos acíclicos no eran lo suficientemente generales. Fue entonces cuando Spark irrumpió en escena, **proponiendo un marco de computación distribuida que, mediante una estructura de datos distribuida llamada RDD**, podía soportar:

> aquellas (operaciones) que reutilizan un conjunto de datos de trabajo a través de múltiples operaciones paralelas.

RDD (Conjunto de Datos Distribuido Elástico) es una estructura de datos de solo lectura que puede ser reconstruida en caso de pérdida a partir de nodos predecesores en su DAG.

Spark está implementado en Scala, cuyas características son:
-  Un lenguaje implementado sobre la JVM
-  Soporta programación funcional
-  Orientado a objetos

## Modelo de programación

### Introducción a los RDDs

Un RDD puede crearse de cuatro maneras:

1.  Desde un sistema de archivos, por ejemplo, HDFS.
2.  A partir de una colección de Scala.
3.  Transformado a partir de un RDD existente (mediante `flatMap`, `map`, `filter`, etc.).
4.  Cambiando la estrategia de persistencia de un RDD existente (los RDDs son de solo lectura; cualquier operación de modificación crea lógicamente un nuevo RDD).

Además, un RDD es una estructura de datos **perezosa (lazy)** y **efímera (ephemeral)**. Los usuarios pueden persistir un RDD de dos formas:

-   Mediante `cache`: un RDD cacheado sigue siendo perezoso, pero deja de ser efímero, lo que significa que después de su primera evaluación se almacena para su reutilización.
-   Mediante `save`: escribiéndolo en un sistema de archivos distribuido.

Los usuarios deben hacer un *trade-off* entre velocidad de acceso y espacio de almacenamiento.

### Operaciones paralelas

-   `reduce` - Asociativa
-   `collect`
-   `foreach` - Efecto secundario (*side effect*)

## Ejemplos

-   Estadísticas de logs
-   Regresión logística
-   ALS (Mínimos Cuadrados Alternantes)

Con las características de pereza y efimeridad, Spark se comporta de manera similar a MapReduce. Sin embargo, introduciendo un paso de `cache` se puede acelerar significativamente el procesamiento.

## Implementación

-   (En la versión del momento en que se escribió el artículo) Construido sobre Mesos.
-   El núcleo de la implementación reside en la interfaz RDD, aprovechando las características de orientación a objetos y programación funcional de Scala.
    -   `getPartitions`
    -   `getIterator(partition)`
    -   `getPreferredLocations(partition)` - Para consideraciones de localidad.
-   Las tareas (*tasks*) (cierres o *closures*) en Scala son objetos Java, por lo que pueden serializarse y enviarse. Durante la implementación incluso se descubrió un bug en Scala.
-   También se integró un intérprete.
-   Hasta la fecha de redacción del artículo, no se había implementado la operación de barajado (*shuffle*).

## Resultados experimentales

-   Superó ampliamente a Hadoop, siendo hasta 10 veces más rápido.
-   Conjuntos de datos pequeños.

## Trabajos relacionados

-   Memoria Compartida Distribuida (DSM)
-   MapReduce
-   Scala es similar a DryadLINQ

## Reflexiones

-   Era un trabajo muy temprano; los autores lo compartían con entusiasmo. Los resultados de ser 10 veces más rápido que Hadoop eran impactantes.
-   Este artículo es bastante general.
-   Funcional, inmutable, por lo tanto permite evaluación perezosa.
-   Tanto Hadoop como Spark en ese momento no podían superar a MapReduce (en términos de adopción/dominio del paradigma).
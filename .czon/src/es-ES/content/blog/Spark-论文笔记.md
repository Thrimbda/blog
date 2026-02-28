---
title: Notas sobre el artículo de Spark
date: 2022-01-10
taxonomies:
  tags:
    - Tecnología
    - Sistemas Distribuidos
    - Notas de Artículos
    - Spark
    - RDD
---

MapReduce tuvo mucho éxito, sin embargo, la mayoría de los sistemas construidos alrededor de grafos acíclicos no eran generales. En ese momento, Spark surgió y **propuso un marco de computación distribuida que podía soportar**, a través de una estructura de datos distribuida llamada RDD:

> aquellos que reutilizan un conjunto de datos de trabajo a través de múltiples operaciones paralelas.

RDD (Resilient Distributed Dataset) es una estructura de datos de solo lectura que puede reconstruirse a partir de nodos anteriores en un DAG en caso de pérdida.

Spark se implementa en Scala, cuyas características son:
- Lenguaje implementado en la JVM
- Soporta programación funcional
- Orientado a objetos

## Modelo de programación

### Introducción a RDD

Un RDD se puede crear de cuatro maneras:

1. Desde un sistema de archivos, como HDFS
2. Desde una colección de Scala
3. Transformado a partir de un RDD existente (mediante flatMap, map, filter, etc.)
4. Cambiando la forma de persistencia de un RDD existente (los RDD son de solo lectura; cualquier operación de modificación crea lógicamente un nuevo RDD)

Además, RDD es una estructura de datos lazy y efímera. Los usuarios pueden persistir un RDD de dos maneras:

- Mediante cache: un RDD cacheado sigue siendo lazy, pero no efímero, lo que significa que después de la primera evaluación se almacena para su reutilización.
- Mediante save: se escribe en un sistema de archivos distribuido.

Los usuarios deben hacer un equilibrio entre velocidad de acceso y espacio de almacenamiento.

### Operaciones paralelas

- reduce - asociativa
- collect
- foreach - efecto secundario

## Ejemplos

- Estadísticas de logs
- Regresión logística
- ALS (Alternating Least Squares)

Con las características de lazy y efímero, Spark se comporta como MapReduce. Sin embargo, al agregar un paso de cache, se puede acelerar significativamente el cálculo.

## Implementación

- (En la versión del momento en que se escribió el artículo) Construido sobre Mesos.
- El núcleo de la implementación es la interfaz RDD, que aprovecha las características orientadas a objetos y funcionales de Scala:
  - getPartitions
  - getIterator(partition)
  - getPreferredLocations(partition) - para consideraciones de localidad.
- Las tareas (clausuras) en Scala son objetos Java, por lo que se pueden serializar y enviar. Durante la implementación, incluso se descubrió un error en Scala.
- También se integró un intérprete.
- Hasta el momento de escribir el artículo, aún no se había implementado shuffle.

## Resultados experimentales

- Supera ampliamente a Hadoop, 10 veces más rápido.
- Conjunto de datos pequeño.

## Trabajos relacionados

- Memoria Compartida Distribuida (Distributed Shared Memory)
- MapReduce
- Scala es similar a DryadLINQ

## Reflexiones

- Era un trabajo muy temprano; los autores lo compartieron con entusiasmo. Un rendimiento 10 veces superior al de Hadoop fue impactante.
- Este artículo es bastante general.
- Funcional, inmutable, por lo tanto permite evaluación lazy.
- Tanto Hadoop como Spark en ese momento no podían superar a MapReduce.
---
"title": "Notas sobre el artículo de RDD"
"summary": "Este documento es una nota sobre el artículo de Resilient Distributed Datasets (RDDs), que detalla la motivación, características básicas, ventajas y limitaciones de los RDD como una abstracción de memoria para sistemas distribuidos. Al sacrificar la granularidad fina de los cálculos, los RDD logran un cómputo iterativo eficiente, tolerancia a fallos y generalidad, resolviendo los cuellos de botella de rendimiento en la reutilización de datos de los marcos de cómputo distribuido tradicionales. El artículo también presenta la implementación de RDD en Spark, incluyendo su interfaz de programación, dependencias y evaluación de rendimiento, mostrando una mejora significativa en tareas iterativas y programas de análisis de usuarios en comparación con Hadoop. Finalmente, el artículo concluye que el valor central de los RDD radica en modelar la memoria del clúster, haciendo posible el cómputo rápido y continuo, y señala que las limitaciones del hardware son el límite teórico para la innovación en software."
"tags":
  - "RDD"
  - "Spark"
  - "Sistemas Distribuidos"
  - "Notas de Artículo"
  - "Abstracción de Memoria"
  - "Cómputo Iterativo"
  - "Tolerancia a Fallos"
  - "Optimización de Rendimiento"
"date": "2020-10-29"
---

Resilient Distributed Datasets (RDDs) son una abstracción de memoria para sistemas distribuidos.

Esencialmente, es un modelo de **memoria compartida** con restricciones estrictas, que solo proporciona operaciones de transformación de grano grueso.

## Motivación

### Problema

Los cálculos distribuidos de naturaleza iterativa requieren la capacidad de reutilizar datos entre iteraciones de manera (eficiente).

### Estado Actual

- Los marcos de cómputo distribuido existentes (en 2012) carecían de una abstracción que aprovechara (reutilizara) eficazmente la memoria del clúster.
- La única forma de reutilizar datos en los marcos existentes era lanzar múltiples cálculos distribuidos.

Por lo tanto, aunque el problema de la computabilidad estaba resuelto, la reutilización de datos seguía siendo un cuello de botella de rendimiento para este tipo de cálculos: se perdían muchos recursos en operaciones de E/S demasiado frecuentes.

Algunos trabajos intentaron resolver estos problemas, pero solo podían admitir patrones de cálculo específicos, sin ser lo suficientemente generales.

El principal desafío era el equilibrio entre la granularidad del cálculo, la generalidad y la tolerancia a fallos.

## RDD

Los RDD proporcionan un conjunto de abstracciones de memoria para clústeres de cómputo distribuido, resolviendo en gran medida los problemas anteriores. Su enfoque consiste en sacrificar el aspecto relativamente menos importante de los tres: la granularidad del cálculo.

### Conceptos Básicos

Propiedades de los RDD:

- Inmutables
- Perezosos (Lazy)

Operaciones soportadas por los RDD:

- Transformación - Operaciones Perezosas (Lazy)
  - map
  - filter
  - ...
- Acciones - Lanzan los cálculos
  - count
  - collect
  - save
  - ...
- Persistencia, es decir, almacenamiento en caché (cache)

Spark implementa los RDD y proporciona una interfaz de programación similar a DryadLINQ.

### Ventajas de los RDD

Principalmente en comparación con abstracciones similares (que modelan la memoria del clúster), los RDD sacrifican las operaciones de datos de grano fino para lograr un rendimiento superior en otros aspectos (generalidad, tolerancia a fallos, rendimiento en degradación, consistencia, problema de los rezagados, facilidad de uso).

### Limitaciones de los RDD

Los RDD no son adecuados para cálculos asíncronos con muchas operaciones de lectura/escritura de grano fino, como los sistemas de almacenamiento para rastreadores web. Para aplicaciones similares, los autores sugieren otros marcos, que no se detallarán aquí.

## Interfaz de Programación de Spark

Implementado en Scala debido a su concisión y eficiencia.

El autor proporciona varios ejemplos en esta sección, que se omiten aquí.

## Representación de los RDD

Se utiliza un DAG (Grafo Acíclico Dirigido) para representar un RDD.

### Dependencias

- Dependencias estrechas (narrow dependencies) - Cada padre es dependido por un hijo como máximo.
- Dependencias amplias (wide dependencies) - Un padre es dependido por al menos un hijo.

## Implementación

- Se utiliza Mesos para la gestión del clúster.
- Programación de trabajos (Job schedule) - omitido.
- Integración del intérprete (Interpreter integration) - omitido.
- Gestión de memoria (Memory management) - omitido.

## Evaluación

- En tareas iterativas: 20 veces más rápido que Hadoop.
- En programas de análisis de usuarios: se reporta 40 veces más rápido que Hadoop.
- Tras un fallo de nodo, se puede recalcular rápidamente.
- Consulta de 1 TB de datos con una latencia de 5-7 segundos.

Los detalles se omiten.

## Discusión

Los autores utilizaron Spark de manera exhaustiva para imitar otros marcos de cómputo distribuido, demostrando así la naturaleza general de los RDD.

Los detalles específicos se omiten.

## Resumen

- La mayor ventaja de RDD/Spark es modelar la memoria de todo el clúster, permitiendo que el cómputo distribuido almacene resultados intermedios en memoria. Esto hace posible el cómputo rápido y continuo sobre el mismo conjunto de datos. Todo esto se basa en una premisa: la memoria es un orden de magnitud más rápida que el disco duro (de ahí la mejora de rendimiento de 40x de Spark sobre Hadoop).
  Esto demuestra que el límite teórico para la innovación en software son las restricciones duras del hardware.
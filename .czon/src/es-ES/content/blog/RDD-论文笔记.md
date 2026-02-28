---
title: Notas sobre el artículo de RDD
date: 2020-10-29
taxonomies:
  tags:
    - Tecnología
    - Sistemas Distribuidos
    - Notas de Artículo
    - RDD
    - Spark
---

Resilient Distributed Datasets (RDDs) son una abstracción de memoria para sistemas distribuidos.

En esencia, es un modelo de **memoria compartida** con restricciones estrictas, que solo proporciona operaciones de transformación de grano grueso.

## Motivación

### Problema

Los cálculos distribuidos de naturaleza iterativa requieren la capacidad de reutilizar datos entre iteraciones de manera (eficiente).

### Estado Actual

- Los marcos de trabajo de computación distribuida existentes (en 2012) carecían de una abstracción que pudiera aprovechar (reutilizar) plenamente la memoria del clúster.
- La única forma de reutilizar datos en los marcos existentes era lanzar múltiples cálculos distribuidos.

Por lo tanto, aunque el problema de la computabilidad está resuelto, la reutilización de datos sigue siendo un cuello de botella de rendimiento para este tipo de cálculos: se pierden muchos recursos en operaciones de E/S excesivamente frecuentes.

Algunos trabajos han intentado resolver estos problemas, pero solo pueden admitir patrones de cálculo específicos, no son lo suficientemente generales.

El principal desafío es el equilibrio entre la granularidad del cálculo, la generalidad y la tolerancia a fallos.

## RDD

RDD proporciona un conjunto de abstracciones de memoria para clústeres de computación distribuida, resolviendo en gran medida los problemas anteriores. Su enfoque consiste en sacrificar el aspecto relativamente menos importante de los tres: la granularidad del cálculo.

### Conceptos Básicos

Propiedades de RDD:

- Inmutables
- Evaluación perezosa (Lazy)

Operaciones admitidas por RDD:

- Transformación - Operaciones perezosas (Lazy)
  - map
  - filter
  - ...
- Acciones - Inician cálculos
  - count
  - collect
  - save
  - ...
- Persistencia, es decir, almacenamiento en caché (cache)

Spark implementa RDD y proporciona una interfaz de programación similar a DryadLINQ.

### Ventajas de RDD

Principalmente en comparación con abstracciones similares (que modelan la memoria del clúster), RDD sacrifica las operaciones de datos de grano fino para lograr un rendimiento superior en otros aspectos (generalidad, tolerancia a fallos, rendimiento en degradación, consistencia, problema de los rezagados, facilidad de uso).

### Limitaciones de RDD

RDD no es adecuado para cálculos asíncronos con muchas operaciones de lectura/escritura de grano fino, como el sistema de almacenamiento de un rastreador web. Para aplicaciones similares, los autores sugieren otros marcos de trabajo, que no se detallarán aquí.

## Interfaz de Programación de Spark

Implementado en Scala debido a su concisión y eficiencia.

El autor proporciona varios ejemplos en esta sección, que se omiten aquí.

## Representación de RDD

Se utiliza un DAG (Grafo Acíclico Dirigido) para representar un RDD.

### Dependencias

- Dependencias estrechas (narrow dependencies) - Cada padre es dependido por como máximo un hijo.
- Dependencias amplias (wide dependencies) - Un padre es dependido por al menos un hijo.

## Implementación

- Se utiliza Mesos para la gestión del clúster.
- Programación de trabajos (Job schedule) - omitido.
- Integración del intérprete (Interpreter integration) - omitido.
- Gestión de memoria (Memory management) - omitido.

## Evaluación

- 20 veces más rápido que Hadoop en tareas iterativas.
- Informa de 40 veces más rápido que Hadoop en programas de análisis de usuarios.
- Puede recalcular rápidamente después de un fallo de nodo.
- Consulta de 1 TB de datos con una latencia de 5-7 segundos.

Se omiten los detalles.

## Discusión

Utilizaron Spark de manera intensiva para imitar otros marcos de computación distribuida para demostrar la naturaleza general de RDD.

Se omiten los detalles específicos.

## Resumen

- La mayor ventaja de RDD/Spark es modelar la memoria de todo el clúster, permitiendo que los cálculos distribuidos almacenen resultados intermedios en memoria. Esto hace posible cálculos rápidos y consecutivos sobre el mismo conjunto de datos. Todo esto se basa en una premisa: la memoria es un orden de magnitud más rápida que el disco duro (de ahí la mejora de rendimiento de 40x de Spark sobre Hadoop).
  Esto muestra que el límite teórico de la innovación en software está determinado por las limitaciones físicas del hardware.
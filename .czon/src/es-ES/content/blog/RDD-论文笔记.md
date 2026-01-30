---
"title": "Notas sobre el artículo de RDD"
"summary": "Estas son notas sobre el artículo de Resilient Distributed Datasets (RDDs), que analiza la motivación de diseño, los conceptos centrales y las ventajas de los RDD. Los RDD, como una abstracción de memoria distribuida, admiten operaciones de transformación y acción a través de sus características de inmutabilidad y cálculo perezoso, y utilizan un DAG para representar las dependencias. Sacrifican la granularidad fina de las operaciones a cambio de tolerancia a fallos, generalidad y rendimiento, mostrando una mejora significativa (por ejemplo, 20-40 veces) sobre Hadoop en cálculos iterativos. El artículo también resume la implementación y los resultados de evaluación de Spark, señalando que los RDD son adecuados para cálculos de grano grueso, pero no para tareas asíncronas de grano fino."
"tags":
  - "RDD"
  - "Spark"
  - "Sistemas distribuidos"
  - "Notas de artículo"
  - "Abstracción de memoria"
  - "Cálculo iterativo"
  - "Tolerancia a fallos"
"date": "29 de octubre de 2020"
---

Resilient Distributed Datasets (RDDs) son esencialmente una abstracción de memoria para sistemas distribuidos.

En esencia, es un modelo de **memoria compartida** estrictamente restringido que solo proporciona operaciones de transformación de grano grueso.

## Motivación

### Problema

Los cálculos distribuidos de naturaleza **iterativa** requieren la capacidad de reutilizar datos entre iteraciones de manera (eficiente).

### Estado actual

- Los marcos de cálculo distribuido existentes (en 2012) carecían de una abstracción que aprovechara (reutilizara) eficazmente la memoria del clúster.
- La única forma de reutilizar datos en los marcos existentes era lanzar múltiples cálculos distribuidos.

Por lo tanto, aunque el problema de la computabilidad estaba resuelto, la reutilización de datos seguía siendo un cuello de botella de rendimiento para este tipo de cálculos: se perdían muchos recursos en operaciones de E/S excesivamente frecuentes.

Algunos trabajos intentaron abordar estos problemas, pero solo podían admitir patrones de cálculo específicos, careciendo de generalidad.

El principal desafío era el equilibrio entre la granularidad del cálculo, la generalidad y la tolerancia a fallos.

## RDD

Los RDD proporcionan una abstracción de memoria para clústeres de cálculo distribuido, resolviendo en gran medida los problemas anteriores. Su enfoque fue sacrificar el aspecto relativamente menos importante de los tres: la granularidad del cálculo.

### Conceptos básicos

Propiedades de los RDD:

- Inmutables
- Perezosos (Lazy)

Operaciones admitidas por los RDD:

- **Transformación** - Operaciones perezosas (Lazy)
  - map
  - filter
  - ...
- **Acciones** - Inician los cálculos
  - count
  - collect
  - save
  - ...
- **Persistir** (es decir, cachear)

Spark implementa los RDD, proporcionando una interfaz de programación similar a DryadLINQ.

### Ventajas de los RDD

Principalmente en comparación con abstracciones similares (que modelan la memoria del clúster), los RDD sacrifican las operaciones de datos de grano fino para lograr un rendimiento superior en otros aspectos (generalidad, tolerancia a fallos, rendimiento en degradación, consistencia, problema de los rezagados, facilidad de uso).

### Limitaciones de los RDD

Los RDD no son adecuados para cálculos asíncronos con muchas lecturas y escrituras de grano fino, como un sistema de almacenamiento para un rastreador web. Para aplicaciones similares, los autores sugieren otros marcos, que no se detallan aquí.

## Interfaz de programación de Spark

Implementado en Scala debido a su concisión y eficiencia.

El autor proporciona varios ejemplos en esta sección, que se omiten aquí.

## Representación de los RDD

Se utiliza un DAG para representar un RDD.

### Dependencias

- **Dependencias estrechas (narrow)** - Cada padre es dependido por como máximo un hijo.
- **Dependencias amplias (wide)** - Un padre es dependido por al menos un hijo.

## Implementación

- Se utiliza Mesos para la gestión del clúster.
- Programación de trabajos (Job schedule) - omitido.
- Integración del intérprete - omitido.
- Gestión de memoria - omitido.

## Evaluación

- 20 veces más rápido que Hadoop en tareas iterativas.
- Informes de 40 veces más rápido que Hadoop en programas de análisis de usuarios.
- Puede recomputarse rápidamente tras un fallo de nodo.
- Consulta de 1 TB de datos con una latencia de 5-7 segundos.

Los detalles se omiten.

## Discusión

Imitaron descaradamente otros marcos de cálculo distribuido usando Spark para demostrar la naturaleza general de los RDD.

Los detalles se omiten.

## Resumen

- La mayor ventaja de RDD/Spark es modelar la memoria de todo el clúster, permitiendo que los cálculos distribuidos almacenen resultados intermedios en memoria. Esto hace posible realizar cálculos rápidos y consecutivos sobre el mismo conjunto de datos, todo basado en la premisa de que la memoria es un orden de magnitud más rápida que el disco (de ahí la mejora de rendimiento de 40x de Spark sobre Hadoop).
  Esto muestra que el límite teórico de la innovación en software está definido por las restricciones duras del hardware.
---
title: Notas sobre el artículo de MapReduce
date: 2019-11-25
taxonomies:
  tags:
    - Tecnología
    - Sistemas Distribuidos
    - Notas de Artículo
    - MapReduce
---

## Origen

Los autores, en su trabajo con enormes volúmenes de datos, escribieron cientos de programas de procesamiento de datos que presentaban algunas características:

1.  La lógica de negocio era simple.
2.  El volumen de datos era enorme, por lo que requerían computación distribuida en cientos de máquinas.

Esto planteaba varios desafíos:

1.  Cómo paralelizar la computación.
2.  Cómo distribuir los datos.
3.  Cómo manejar la tolerancia a fallos.

Gran parte del código de estos programas de procesamiento de datos se dedicaba a resolver problemas similares en lugar de implementar la lógica de negocio.

Por lo tanto, se propuso una nueva abstracción, tomando prestados dos conceptos de Lisp y otros lenguajes funcionales. Esto permitiría a los ingenieros centrarse en la lógica de negocio, ocultando los requisitos no funcionales mencionados anteriormente. Así nació MapReduce.

## Implementación

### Lógica de Ejecución

1.  Los datos de entrada se dividen en M fragmentos asignados a M trabajadores Map.
2.  El Master actúa como un conducto de datos para la planificación.
3.  Las tareas Map invocan la función Map del usuario y almacenan los resultados en la memoria local.
4.  Periódicamente, vuelcan los datos al disco, dividiéndolos en R partes para preparar la asignación a R trabajadores Reduce.
5.  Los trabajadores Reduce, una vez asignados por el Master, leen los datos mediante RPC, los ordenan en disco tras la lectura.
6.  Los trabajadores Reduce iteran sobre los datos ordenados invocando la función Reduce del usuario, realizando un cálculo incremental.
7.  Una vez completado el cálculo, el control vuelve a la lógica del código del usuario.

Se puede observar que el método de partición es crucial, idealmente para evitar un *shuffling* innecesario.

### Estructuras de Datos

-   Almacena el estado (inactivo/en progreso/completado) para cada tarea map/reduce.
-   Para cada tarea map completada, almacena la ubicación y el tamaño de los archivos intermedios, y los notifica a los trabajadores reduce.

### Tolerancia a Fallos

-   El Master básicamente no falla, aunque también se puede implementar un almacenamiento periódico del estado para recuperarse en caso de fallo.
-   El Master hace ping periódicamente a los trabajadores. Si no responde, el trabajador se considera fallido.
    -   Para las tareas map, se reinician y reprograman todas, independientemente de si estaban completadas o no. Esto se debe a que los resultados de map se almacenan localmente en el trabajador, por lo que si el trabajador falla, los resultados son inaccesibles.
    -   Para las tareas reduce, solo se reprograman las no completadas. Esto se debe a que los resultados de reduce se colocan en un sistema de archivos de acceso global.
    -   Una vez que una tarea map se reprograma, todos los trabajadores reduce reciben una notificación y, por lo tanto, extraen los datos de la nueva ubicación.

### Tareas de Respaldo

Las últimas tareas en ejecución pueden ralentizar significativamente el ritmo de MapReduce, posiblemente debido a "rezagados" que, por diversas razones, se ejecutan extremadamente lento. En este caso, el Master inicia tareas de respaldo para las últimas tareas en ejecución. Esto aumenta el uso de recursos en unos pocos puntos porcentuales, pero puede reducir masivamente el tiempo de ejecución.

## Mejoras

### Partición

Dado que los archivos de salida están distribuidos, se pueden agrupar los resultados de claves relacionadas mediante una función de partición proporcionada por el usuario.

### Depuración Local

Se puede ejecutar localmente.

## Rendimiento

Se realizaron pruebas en dos grandes clústeres, uno para ordenación y otro para coincidencia de patrones.

### Grep

Búsqueda de un patrón en 10^10 archivos de 100 bytes. 1.7k máquinas tardaron 150 segundos, de los cuales un minuto se utilizó para distribuir el programa. Muy sincero.

### Ordenación

10^10 archivos de 100 bytes.

## Conclusión

Con una confianza absoluta.
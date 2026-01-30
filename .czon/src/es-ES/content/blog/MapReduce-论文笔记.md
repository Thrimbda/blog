---
"title": "Notas sobre el artículo de MapReduce"
"summary": "Este texto es un resumen del artículo sobre MapReduce, que detalla el origen, los detalles de implementación, los mecanismos de tolerancia a fallos y el rendimiento de MapReduce. El artículo señala que MapReduce es un modelo abstracto propuesto para abordar los desafíos del procesamiento paralelo de datos a gran escala, la distribución de datos y la tolerancia a fallos, inspirándose en los conceptos de Map y Reduce de la programación funcional. La parte de implementación incluye la lógica de ejecución, las estructuras de datos y el manejo de fallos, donde el Master programa las tareas, los Workers ejecutan las operaciones Map y Reduce, y se resuelve el problema de los 'stragglers' mediante tareas de respaldo. Las pruebas de rendimiento muestran su eficacia en tareas de grep y ordenación. En resumen, se concluye que MapReduce es un marco de computación distribuida muy sólido."
"tags":
  - "MapReduce"
  - "Sistemas distribuidos"
  - "Notas de artículo"
  - "Tolerancia a fallos"
  - "Computación paralela"
  - "Procesamiento de datos"
  - "Google"
  - "Big Data"
"date": "25-11-2019"
---

## Origen

Los autores, en su trabajo con cantidades masivas de datos, escribieron cientos de programas de procesamiento de datos que tenían algunas características:

1.  La lógica de negocio era simple.
2.  El volumen de datos era enorme, por lo que requería computación distribuida en cientos de máquinas.

Esto planteó varios desafíos:

1.  Cómo realizar la computación en paralelo.
2.  Cómo distribuir los datos.
3.  Cómo manejar la tolerancia a fallos.

Una gran parte del código de estos programas de procesamiento de datos se dedicaba a problemas similares en lugar de a la lógica de negocio.

Por lo tanto, se propuso una nueva abstracción, tomando prestados dos conceptos de Lisp y otros lenguajes funcionales, que permitiría a los ingenieros centrarse en la lógica de negocio mientras se ocultaban los requisitos no funcionales mencionados. Esto es MapReduce.

## Implementación

### Lógica de ejecución

1.  Los datos de entrada se dividen en M fragmentos asignados a M trabajadores Map.
2.  El Master actúa como un canal de datos para la programación.
3.  Las tareas Map invocan la función Map del usuario y almacenan los resultados en la memoria local.
4.  Periódicamente, se vuelcan a disco y se dividen en R partes para preparar la asignación a R trabajadores Reduce.
5.  Los trabajadores Reduce, una vez asignados por el Master, leen los datos mediante RPC, los ordenan en disco después de leerlos.
6.  Los trabajadores Reduce iteran sobre los datos ordenados invocando la función Reduce del usuario, realizando cálculos incrementales.
7.  Una vez completados los cálculos, el proceso finaliza y se vuelve a la lógica del código del usuario.

Se puede ver que el método de partición es crucial, idealmente para evitar operaciones de shuffling innecesarias.

### Estructuras de datos

-   Se almacena el estado (inactivo/en progreso/completado) para cada tarea map/reduce.
-   Para cada tarea map completada, se almacena la ubicación y el tamaño de los archivos intermedios, y se notifica a los trabajadores reduce.

### Tolerancia a fallos

-   Básicamente, el Master no falla, aunque también se puede implementar un almacenamiento periódico del estado para recuperarse en caso de fallo.
-   El Master hace ping periódicamente a los workers; si no responde, se considera que el worker ha fallado.
    -   Para las tareas map, se reinician y reprograman todas, independientemente de si estaban completadas o no. Esto se debe a que los resultados de map se almacenan localmente en el worker, por lo que si el worker falla, los resultados son inaccesibles.
    -   Para las tareas reduce, solo se reprograman las no completadas. Esto se debe a que los resultados de reduce se colocan en un sistema de archivos de acceso global.
    -   Después de reprogramar una tarea map, todos los trabajadores reduce reciben una notificación y, por lo tanto, extraerán los datos de la nueva ubicación.

### Tareas de respaldo (Backup Tasks)

Las últimas tareas en ejecución pueden ralentizar significativamente el ritmo de MapReduce, posiblemente debido a "stragglers" (trabajadores lentos) que, por diversas razones, ejecutan extremadamente despacio. En este caso, el Master inicia tareas de respaldo para las últimas tareas en ejecución. Esto aumenta el uso de recursos en unos pocos puntos porcentuales, pero puede reducir masivamente el tiempo de ejecución.

## Mejoras

### Partición (Partition)

Dado que los archivos de salida están distribuidos, es posible agrupar los resultados de claves relacionadas mediante una función de partición proporcionada por el usuario.

### Depuración local

Se puede ejecutar localmente.

## Rendimiento

Se realizaron pruebas en dos grandes clústeres, uno para ordenación y otro para coincidencia de patrones.

### Grep

Búsqueda de un patrón en 10^10 archivos de 100 bytes. 1.7k máquinas tardaron 150 segundos, de los cuales un minuto se utilizó para distribuir el programa. Muy eficiente.

### Ordenación (Sort)

10^10 archivos de 100 bytes.

## Conclusión

Un marco de trabajo muy sólido y confiable.
---
"title": "Notas sobre el artículo de GFS"
"summary": "Este documento contiene notas sobre el artículo de GFS (Google File System), resumiendo las cuatro características centrales de GFS como sistema de archivos distribuido: modelar las fallas de las máquinas, almacenar archivos grandes, operaciones de archivo basadas principalmente en anexar (append) y un diseño que considera el escenario de aplicación. El artículo también detalla los supuestos de diseño de GFS, incluyendo que las fallas parciales son la norma, que los archivos grandes son la norma, que la carga de trabajo de lectura se divide en grandes lecturas secuenciales (streaming) y pequeñas lecturas aleatorias, que la carga de trabajo de escritura consiste principalmente en grandes escrituras secuenciales, y la optimización para múltiples clientes que escriben en paralelo en el mismo archivo. Estas características y supuestos forman conjuntamente la base de la arquitectura de GFS, que es eficiente, confiable y se adapta al procesamiento de datos a gran escala."
"tags":
  - "GFS"
  - "Sistemas Distribuidos"
  - "Sistema de Archivos"
  - "Notas de Artículo"
  - "Tecnología"
  - "Big Data"
  - "Almacenamiento"
  - "Google"
"date": "2020-10-29"
---

GFS es un sistema de archivos distribuido con las siguientes cuatro características:

1.  **Modela las fallas de las máquinas** - GFS se ejecuta en un clúster compuesto por una gran cantidad de hardware económico, por lo que es común que ocurran fallas parciales en el clúster debido a diversas razones.
2.  **Almacena archivos grandes** - (según los estándares de 2003) archivos grandes de varios GB son la norma, por lo que las operaciones de E/S y el tamaño de los bloques deben considerarse específicamente.
3.  **Las operaciones de archivo se basan principalmente en anexar (append)** - Este es su principal objetivo de optimización.
4.  **El diseño del sistema de archivos considera el escenario de uso de la aplicación** - La flexibilidad mejora enormemente, lo cual es una ventaja de un sistema cerrado.

## Resumen del Diseño

### Supuestos

-   Las fallas parciales son la norma - Es necesario monitorear, verificar, tolerar errores y tener capacidad de autocuración.
-   Los archivos grandes son la norma - La optimización se centra principalmente en la gestión de archivos grandes.
-   Las cargas de trabajo de lectura (Read workloads) son principalmente de dos tipos:
    -   Grandes lecturas secuenciales (streaming) - Aproximadamente 1 MB por lectura, leyendo continuamente.
    -   Pequeñas lecturas aleatorias - Unos pocos KB por lectura, aunque las aplicaciones tampoco toleran realmente las lecturas aleatorias.
-   Las cargas de trabajo de escritura (Write workloads) consisten principalmente en grandes escrituras secuenciales, similares a las operaciones de lectura, con pocas modificaciones, por lo que no se optimizan.
-   Se optimiza para que varios clientes escriban en paralelo en el mismo archivo - Logrado mediante operaciones atómicas bien implementadas.
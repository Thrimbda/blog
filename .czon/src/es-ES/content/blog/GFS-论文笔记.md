---
"title": "Notas sobre el artículo de GFS"
"summary": "Este artículo resume el diseño central del sistema de archivos distribuido GFS. GFS está diseñado para entornos de clúster compuestos por hardware económico, donde los fallos parciales son normales. Principalmente almacena y gestiona archivos grandes, optimizando las operaciones de archivo centradas en anexar. Su diseño considera escenarios de aplicación específicos, admitiendo grandes cantidades de lecturas en flujo y pequeñas cantidades de lecturas aleatorias, y está optimizado para múltiples clientes que escriben en paralelo en el mismo archivo. El artículo también describe los supuestos de diseño de GFS, incluyendo el modelado de fallos de máquinas, la optimización para la gestión de archivos grandes y las características de la carga de trabajo de lectura/escritura."
"tags":
  - "GFS"
  - "Sistemas distribuidos"
  - "Sistema de archivos"
  - "Notas de artículo"
  - "Tecnología"
"date": "29 de octubre de 2020"
---

GFS es un sistema de archivos distribuido con las siguientes cuatro características:

1.  **Modela los fallos de las máquinas** - GFS se ejecuta en un clúster compuesto por una gran cantidad de hardware económico, por lo que el clúster experimentará fallos parciales por diversas razones.
2.  **Los archivos almacenados son grandes** - (según los estándares de 2003) archivos grandes de varios GB son la norma, por lo que las operaciones de E/S y el tamaño de los bloques deben considerarse específicamente.
3.  **Las operaciones de archivo se centran principalmente en anexar** - Este es su principal objetivo de optimización.
4.  **El diseño del sistema de archivos considera el escenario de uso de la aplicación** - La flexibilidad mejora enormemente, esta es una ventaja de un sistema cerrado.

## Resumen del diseño

### Supuestos

-   Los fallos parciales son la norma: es necesario monitorear, verificar, tolerar errores y tener capacidad de autocuración.
-   Los archivos grandes son la norma: se optimiza principalmente para la gestión de archivos grandes.
-   Las cargas de trabajo de lectura son principalmente de dos tipos:
    -   Grandes cantidades de lecturas en flujo: aproximadamente 1 MB por vez, lectura continua.
    -   Pequeñas cantidades de lecturas aleatorias: unos pocos KB por vez, aunque las aplicaciones tampoco toleran realmente las lecturas aleatorias.
-   Las cargas de trabajo de escritura son principalmente grandes cantidades de escrituras secuenciales, similares a las operaciones de lectura, con pocas modificaciones, por lo que no se optimizan.
-   Optimizado para que varios clientes escriban en paralelo en el mismo archivo: se logra mediante buenas operaciones atómicas.
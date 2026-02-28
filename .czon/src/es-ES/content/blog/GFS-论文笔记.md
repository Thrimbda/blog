---
title: Notas sobre el artículo de GFS
date: 2020-10-29
taxonomies:
  tags:
    - Tecnología
    - Sistemas distribuidos
    - Notas de artículos
    - GFS
    - Sistema de archivos
---

GFS es un sistema de archivos distribuido con las siguientes cuatro características:

1. **Modela las fallas de las máquinas** - GFS se ejecuta en un clúster compuesto por una gran cantidad de hardware económico, por lo que el clúster experimentará fallas parciales por diversas razones.
2. **Los archivos almacenados son grandes** - (según los estándares de 2003) archivos de varios GB son comunes, por lo que las operaciones de E/S y el tamaño de los bloques deben considerarse específicamente.
3. **Las operaciones de archivo se basan principalmente en anexar** - Este es su principal objetivo de optimización.
4. **El diseño del sistema de archivos considera los escenarios de uso de las aplicaciones** - La flexibilidad mejora significativamente, esta es una ventaja de un sistema cerrado.

## Resumen del diseño

### Suposiciones

- Las fallas parciales son normales: se requiere monitoreo, verificación, tolerancia a errores y capacidad de autoreparación.
- Los archivos grandes son normales: se optimiza principalmente la gestión de archivos grandes.
- Las cargas de trabajo de lectura son principalmente de dos tipos:
  - Muchas lecturas de transmisión: aproximadamente 1 MB cada vez, lectura continua.
  - Pocas lecturas aleatorias: unos pocos KB cada vez, aunque las aplicaciones realmente no toleran las lecturas aleatorias.
- Las cargas de trabajo de escritura son principalmente muchas escrituras secuenciales, similares a las operaciones de lectura, rara vez se modifican, por lo que no se optimizan.
- Se optimiza para que varios clientes escriban en el mismo archivo en paralelo: se logra mediante buenas operaciones atómicas.
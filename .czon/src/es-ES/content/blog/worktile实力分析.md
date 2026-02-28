---
title: Análisis de capacidades de gestión de requisitos de Worktile
date: 6 de abril de 2017
taxonomies:
  tags:
    - Análisis de Requisitos
    - Análisis y Diseño de Sistemas
---

# Gestión de Requisitos

Primero, citaré un ejemplo típico de fracaso en gestión de proyectos mencionado en *El Mítico Hombre-Mes*.

<!--more-->

> **La lección de gestión de la Torre de Babel**
>
> Según el *Génesis*, la Torre de Babel fue la segunda gran hazaña de ingeniería de la humanidad después del Arca de Noé, pero también fue el primer fracaso total de un proyecto de ingeniería.
>
> Esta historia es profunda e instructiva en muchos aspectos y niveles. Considerémosla simplemente como un proyecto de ingeniería puro y veamos qué lecciones de gestión se pueden extraer. ¿Qué tan buenas eran las condiciones previas del proyecto? ¿Contaban con:
>
> 1. ¿Un objetivo claro?
>
>    Sí, aunque ingenuo y casi imposible. Además, el proyecto fracasó mucho antes de enfrentarse a esa limitación fundamental.
>
> 2. ¿Mano de obra?
>
>    Muy abundante.
>
> 3. ¿Materiales?
>
>    Había arcilla y asfalto de betún en abundancia en Mesopotamia.
>
> 4. ¿Tiempo suficiente?
>
>    Sí, no hay indicios de limitaciones de tiempo.
>
> 5. ¿Tecnología suficiente?
>
>    Sí, la estructura piramidal o cónica es intrínsecamente estable y distribuye bien las cargas de compresión. La tecnología de mampostería estaba bien estudiada. De nuevo, el proyecto fracasó mucho antes de alcanzar sus límites técnicos.
>
> Entonces, si tenían todas estas condiciones, ¿por qué fracasó el proyecto? ¿Qué les faltaba? Dos aspectos: **comunicación** y, como resultado de ella, **organización**. No podían comunicarse entre sí y, por lo tanto, no podían cooperar. Cuando la cooperación se hizo imposible, el trabajo se estancó. Entre líneas de los textos históricos, inferimos que la falta de comunicación condujo a discusiones, frustración y desconfianza grupal. Pronto, las tribus comenzaron a dividirse: optaron por el aislamiento en lugar de seguir discutiendo.

El autor analiza y descubre que las razones del fracaso de este proyecto son las siguientes:

- Imposibilidad de comunicarse
- Falta de organización
- Alcance del sistema demasiado grande

Por lo tanto, una buena gestión de requisitos tiene dos aspectos: **orientada a los requisitos** y **orientada a la gestión de los requisitos**.

Tras mi experiencia personal de uso, he elegido analizar la herramienta de gestión de proyectos Worktile.

## Análisis

Entonces, ¿cómo aborda Worktile los problemas mencionados anteriormente?

### Primero, respondamos qué es Worktile

La descripción de su sitio web oficial:

> Worktile: Colaboración en tareas tipo Kanban. Al arrastrar y soltar fácilmente las tarjetas de tareas, los miembros del equipo pueden sincronizar en tiempo real los cambios en el tablero, colaborando de manera ágil. Una herramienta de colaboración ligera para equipos que permite a tu equipo comenzar a colaborar en 5 minutos, multiplicando la eficiencia. Es simple, intuitiva, fácil de usar, gratuita, ofrece miembros, proyectos y espacio de almacenamiento ilimitados. ¡Haz volar a tu equipo!

Después de organizar la información, descubrí que tiene las siguientes **características**:

- **Gestión de tareas tipo Kanban orientada a proyectos**

  Permite dividir claramente las tareas y controlar oportunamente el estado del proyecto. Cada tarea incluye elementos de verificación, persona asignada, fecha límite, archivos adjuntos, comentarios, etc.

- **Funcionalidad de sincronización de archivos**

  Algo similar a GitHub, pero no tan potente. Personalmente, la considero un poco poco práctica.

- **Calendario compartido del equipo**

  Permite comprender macroscópicamente la planificación y agenda del trabajo del equipo.

- **Notificaciones de mensajes**

  Se reciben notificaciones al asignar una nueva tarea, al ser mencionado en un archivo o al recibir nuevos comentarios.

- **Vistas de análisis y estadísticas**

  Cuantifica las tareas de forma visual, mostrando de manera intuitiva el progreso del proyecto, la distribución de tareas entre miembros, las tendencias de actividad del proyecto, etc., mediante gráficos.

Después de conocer sus características, el siguiente paso es centrarse en cómo usar Worktile para la gestión de requisitos.

### Uso de Worktile para la gestión de requisitos

Analicemos cómo se refleja en Worktile el flujo de gestión de requisitos:

> - **Propuesta de requisitos**
>
>   Registrar detalladamente la solicitud de cambio. Puede verse como un memorándum o bandeja de entrada. El solicitante debe poder registrar fácilmente la información detallada del requisito.
>
> - **Revisión**
>
>   Confirmar si se implementará el cambio solicitado. Este proceso implica evaluar el cambio, confirmar si es necesario y el impacto que tendrá en las partes existentes.

En Worktile, diferentes flujos de cambio se muestran mediante listas de tareas.

**Bandeja de entrada:** En esta lista de tareas, cualquiera puede enviar una solicitud de cambio. Cuando se identifica una necesidad que debe abordarse, se puede agregar aquí.
**Por hacer:** Los requisitos confirmados para implementar se pueden colocar en esta lista y asignar a los responsables correspondientes.
**En progreso:** En esta lista se pueden visualizar claramente los requisitos en curso, comprendiendo así el avance del producto.
**Completado:** Los requisitos ya finalizados pueden colocarse en una lista específica, facilitando el seguimiento posterior del producto.

> - **Implementación**
>
>   Ejecutar la implementación concreta según los detalles del requisito, pudiendo involucrar a personal de producto, desarrollo y diseño.
>
> - **Verificación**
>
>   Asegurar la calidad del resultado del requisito, confirmando que la implementación es correcta.
>
> - **Medición**
>
>   Realizar análisis métrico del proceso de los requisitos. Este proceso es muy importante y significativo para la gestión de requisitos. Analizando estos requisitos, se puede conocer el progreso actual del proyecto y los problemas existentes.

Usar etiquetas para definir los atributos de las tareas y la prioridad de las tareas para definir la prioridad de procesamiento de los requisitos.

Si se confirma que no se realizará un cambio, simplemente se archiva ese requisito, facilitando consultas futuras.

En la vista de análisis y estadísticas de un proyecto de Worktile, se pueden realizar estadísticas por etiquetas. El valor para la gestión de requisitos radica en que, mediante el análisis estadístico de los atributos de los requisitos, podemos comprender el progreso del producto actual, cuántos puntos críticos del usuario se han resuelto, y podemos usar las estadísticas de listas para medir el estado de finalización de los requisitos.

### Resolución de problemas

Después de analizar Worktile, ahora podemos responder a la pregunta inicial: **¿Cómo resuelve Worktile los problemas mencionados anteriormente?**

Podemos usar Worktile para implementar de manera flexible el flujo de gestión de requisitos. Sus características de visualización intuitiva de tareas, plataforma de discusión y múltiples vistas del proyecto nos permiten definir fácilmente el sistema y, combinado con una buena gestión, evitar problemas como definiciones ambiguas de los límites del sistema.

Usando Worktile, podemos registrar fácilmente los cambios en los requisitos. Combinado con las funciones de discusión y notificaciones, puede servir para una colaboración y comunicación simples, permitiendo que cada miembro participe.

Además, podemos aprovechar su funcionalidad de análisis estadístico para medir y analizar cómodamente los requisitos del proyecto, analizando el estado actual de los cambios en todo el proyecto.

De esta manera, Worktile aborda los problemas de gestión de requisitos, organización del personal y comunicación.

Finalmente, la gestión de requisitos, como un eslabón dentro de la gestión general de proyectos, no debe separarse de los otros elementos de la gestión de proyectos.

Y la gestión de requisitos es solo un aspecto donde Worktile puede ser útil. Además de esto, a través de las funciones mencionadas, Worktile permite gestionar todo el ciclo de vida del proyecto, proporcionando integridad conceptual.
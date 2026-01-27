---
"title": "Análisis de las capacidades de gestión de requisitos de Worktile"
"summary": "Este artículo parte del caso de fracaso de la Torre de Babel mencionado en 'El mito del mes-hombre' para analizar que las causas del fracaso del proyecto radican en la falta de comunicación y organización. El autor señala que una buena gestión de requisitos debe orientarse tanto a los requisitos en sí mismos como a su proceso de gestión.\
  Posteriormente, el artículo presenta en detalle las características de Worktile, una herramienta de gestión de proyectos, incluyendo la gestión de tareas tipo Kanban, la sincronización de archivos, el calendario compartido, las notificaciones de mensajes y las vistas de análisis estadístico. Al mostrar el flujo de trabajo para gestionar requisitos con Worktile, como la propuesta, revisión, implementación, confirmación y medición de requisitos, el artículo argumenta cómo Worktile resuelve los problemas de comunicación, organización y un alcance del sistema demasiado amplio. Finalmente, enfatiza que la gestión de requisitos debe integrarse en toda la gestión del proyecto, y que Worktile proporciona un soporte conceptual completo."
"tags":
  - "Gestión de requisitos"
  - "Gestión de proyectos"
  - "Worktile"
  - "Colaboración en equipo"
  - "Análisis de sistemas"
  - "Gestión de tareas"
  - "Kanban"
  - "Comunicación"
"date": "2017-04-06"
---

---
title: Análisis de las capacidades de gestión de requisitos de Worktile
date: 2017-04-06
taxonomies:
  tags:
    - Análisis de requisitos
    - Análisis y diseño de sistemas
---

# Gestión de requisitos

Primero, transcribo un ejemplo típico de fracaso en la gestión de proyectos, extraído de *El mito del mes-hombre*.

<!--more-->

> **La lección de gestión de la Torre de Babel**
>
> Según el *Génesis*, la Torre de Babel fue la segunda gran hazaña de ingeniería de la humanidad después del Arca de Noé, pero también fue el primer fracaso total de un proyecto de ingeniería.
>
> Esta historia es muy profunda e instructiva en muchos aspectos y niveles diferentes. Considerémosla simplemente como un proyecto de ingeniería puro y veamos qué lecciones de gestión se pueden aprender. ¿Qué tan buenas eran las condiciones previas del proyecto? ¿Contaban con:
>
> 1. ¿Un objetivo claro?
>
>    Sí, aunque era ingenuo y casi imposible. Además, el proyecto fracasó mucho antes de encontrar esta limitación fundamental.
>
> 2. ¿Recursos humanos?
>
>    Muy abundantes.
>
> 3. ¿Materiales?
>
>    Había abundante arcilla y asfalto en Mesopotamia.
>
> 4. ¿Tiempo suficiente?
>
>    Sí, no hay indicios de ninguna limitación de tiempo.
>
> 5. ¿Tecnología suficiente?
>
>    Sí, la estructura piramidal o cónica es intrínsecamente estable y distribuye bien las cargas de presión. La tecnología de construcción en mampostería estaba bien estudiada. De nuevo, el proyecto fracasó mucho antes de alcanzar sus límites tecnológicos.
>
> Entonces, dado que tenían todas estas condiciones, ¿por qué fracasó el proyecto? ¿Qué les faltaba? Dos cosas: **comunicación** y, como resultado de ella, **organización**. No podían comunicarse entre sí y, por lo tanto, no podían cooperar. Cuando la cooperación se hizo imposible, el trabajo se detuvo. Entre líneas de los textos históricos, inferimos que la falta de comunicación condujo a discusiones, frustración y desconfianza grupal. Pronto, las tribus comenzaron a dividirse: optaron por el aislamiento en lugar de seguir discutiendo.

El autor, tras analizarlo, descubre que las razones del fracaso de este proyecto son las siguientes:

- Imposibilidad de comunicarse
- Falta de organización
- Alcance del sistema demasiado amplio

Por lo tanto, una buena gestión de requisitos tiene dos aspectos: **orientada a los requisitos** y **orientada a la gestión de los requisitos**.

Tras mi experiencia personal de uso, he elegido analizar la herramienta de gestión de proyectos Worktile.

## Análisis

Entonces, ¿cómo resuelve Worktile los problemas mencionados anteriormente?

### Primero, respondamos qué es Worktile

La descripción de su sitio web oficial:

> Worktile es una colaboración en tareas tipo Kanban. Al arrastrar y soltar fácilmente las tarjetas de tareas, los miembros del equipo pueden sincronizar en tiempo real los cambios en el tablero, colaborando de manera ágil. Es una herramienta de colaboración ligera para equipos, que permite a tu equipo comenzar a colaborar rápidamente en 5 minutos, multiplicando la eficiencia. Es simple, intuitiva, fácil de usar, gratuita, ofrece miembros, proyectos y espacio de almacenamiento ilimitados, y hace que tu equipo vuele.

Después de organizar la información, descubro que tiene las siguientes **características**:

- **Gestión de tareas tipo Kanban orientada a proyectos**

  Permite dividir claramente las tareas y controlar oportunamente el estado del proyecto. Cada tarea incluye elementos de verificación, persona asignada, fecha límite, archivos adjuntos, comentarios, etc.

- **Función de sincronización de archivos**

  Algo similar a GitHub, pero no tan potente. Personalmente, la considero un poco prescindible.

- **Calendario compartido del equipo**

  Permite comprender a nivel macro la planificación y agenda del trabajo del equipo.

- **Notificaciones de mensajes**

  Se reciben notificaciones al asignar una nueva tarea, al recordar prestar atención a un archivo o cuando hay nuevos comentarios.

- **Vistas de análisis y estadísticas**

  Cuantifica las tareas de forma visual, mostrando de manera intuitiva, mediante gráficos, el progreso del proyecto, la distribución de tareas entre los miembros, las tendencias de actividad del proyecto, etc.

Después de conocer sus características, el siguiente paso es centrarse en cómo usar Worktile para la gestión de requisitos.

### Uso de Worktile para la gestión de requisitos

En relación con el flujo de gestión de requisitos, analicemos cómo se refleja en Worktile:

> - **Propuesta de requisitos**
>
>   Registrar detalladamente los requisitos de cambio. Puede verse como un memorándum o bandeja de entrada. El solicitante debe poder registrar fácilmente la información detallada del requisito.
>
> - **Revisión**
>
>   Confirmar si se debe implementar el cambio solicitado. En este proceso, es necesario evaluar el cambio, confirmar si es necesario modificar el requisito y el impacto que tendrá en las partes existentes.

En Worktile, se utilizan listas de tareas para mostrar los diferentes flujos de cambio.

**Bandeja de entrada:** En esta lista de tareas, cualquiera puede enviar una solicitud de cambio de requisito. Cuando se identifica una necesidad que debe abordarse, se puede agregar aquí.
**Por hacer:** Los requisitos confirmados para implementar se pueden colocar en esta lista y asignar a los responsables correspondientes.
**En progreso:** En esta lista, se pueden identificar claramente los requisitos en curso, comprendiendo así el avance del producto.
**Completado:** Los requisitos ya finalizados se pueden colocar en una lista específica, facilitando el seguimiento posterior del producto.

> - **Implementación**
>
>   Ejecución concreta según los detalles del requisito, pudiendo involucrar a personal de producto, desarrollo y diseño.
>
> - **Confirmación**
>
>   Aseguramiento de la calidad del resultado del requisito, confirmando que la implementación es correcta.
>
> - **Medición**
>
>   Análisis métrico del proceso de los requisitos. Este proceso es muy importante y significativo para la gestión de requisitos. Al analizar estos requisitos, se puede conocer el progreso actual del proyecto y los problemas existentes.

Se utilizan etiquetas para definir los atributos de las tareas y la prioridad de las tareas para definir la prioridad de procesamiento de los requisitos.

Si se confirma que no se realizará el cambio de requisito, simplemente se archiva, lo que facilita consultas futuras.

En las vistas de análisis estadístico del proyecto de Worktile, se pueden realizar estadísticas por etiquetas. El valor para la gestión de requisitos radica en que, mediante el análisis estadístico de los atributos de los requisitos, podemos comprender el progreso del producto actual, cuántos puntos críticos del usuario se han resuelto, y podemos utilizar las estadísticas de listas para evaluar el estado de finalización de los requisitos:

### Resolución de problemas

Después de analizar Worktile, ahora podemos responder a la pregunta inicial: **¿Cómo resuelve Worktile los problemas mencionados anteriormente?**

Podemos utilizar Worktile para implementar de manera flexible el flujo de gestión de requisitos. Sus características de visualización intuitiva de tareas, plataforma de discusión y múltiples vistas del proyecto nos permiten definir el sistema fácilmente. Combinado con una buena gestión, puede ayudar a evitar problemas como una definición ambigua de los límites del sistema.

Usando Worktile, podemos registrar fácilmente los cambios en los requisitos. Combinado con las funciones de discusión y notificación, puede cumplir un papel simple de coordinación y comunicación, permitiendo que cada miembro participe.

Al mismo tiempo, podemos utilizar su función de análisis estadístico para medir y analizar fácilmente los requisitos del proyecto, analizando el estado actual de los cambios en todo el proyecto.

De esta manera, Worktile resuelve los problemas de gestión de requisitos, organización del personal y comunicación.

Finalmente, la gestión de requisitos, como un eslabón dentro de la gestión general del proyecto, no debe separarse de otros elementos de la gestión del proyecto.

Y la gestión de requisitos es solo un aspecto en el que Worktile puede ser útil. Además de esto, a través de las funciones mencionadas, Worktile permite gestionar todo el ciclo de vida del proyecto, proporcionando integridad conceptual.
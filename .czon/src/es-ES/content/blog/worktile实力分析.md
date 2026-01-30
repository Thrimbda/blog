---
"title": "Análisis de las capacidades de gestión de requisitos de Worktile"
"summary": "Este artículo parte del caso de fracaso de la Torre de Babel en 'El Mítico Hombre-Mes', señalando que las causas del fracaso en la gestión de requisitos son la incapacidad de comunicarse, la falta de organización y el alcance excesivo del sistema. Luego, el autor presenta las características de la herramienta de gestión de proyectos Worktile, incluyendo la gestión de tareas tipo kanban, la sincronización de archivos, el calendario compartido del equipo, las notificaciones de mensajes y las vistas de análisis estadístico. A continuación, detalla el proceso de cómo usar Worktile para la gestión de requisitos, como proponer, revisar, implementar, confirmar y medir requisitos, y muestra cómo Worktile resuelve los problemas en la gestión de requisitos mediante listas de tareas, etiquetas, prioridades y análisis estadístico. Finalmente, el artículo concluye que Worktile puede resolver problemas de gestión de requisitos, organización del personal y comunicación, y enfatiza que la gestión de requisitos debe combinarse con otros elementos de la gestión de proyectos."
"tags":
  - "Gestión de requisitos"
  - "Worktile"
  - "Gestión de proyectos"
  - "Análisis de sistemas"
  - "Colaboración en tareas"
  - "Kanban"
  - "Colaboración en equipo"
  - "Análisis de requisitos"
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

Primero, cito un ejemplo típico de fracaso en la gestión de proyectos extraído de *El Mítico Hombre-Mes*.

<!--more-->

> **Lección de gestión de la Torre de Babel**
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
>    Sí, no hay indicios de limitaciones de tiempo.
>
> 5. ¿Tecnología suficiente?
>
>    Sí, la estructura piramidal o cónica es intrínsecamente estable y distribuye bien las cargas de presión. La tecnología de construcción en mampostería había sido estudiada en profundidad. De nuevo, el proyecto fracasó mucho antes de alcanzar sus límites tecnológicos.
>
> Entonces, dado que tenían todas estas condiciones, ¿por qué fracasó el proyecto? ¿Qué les faltaba? Dos aspectos: **comunicación** y, como resultado de ella, **organización**. No podían comunicarse entre sí y, por lo tanto, no podían cooperar. Cuando la cooperación se hizo imposible, el trabajo se detuvo. Entre líneas de los textos históricos, inferimos que la falta de comunicación llevó a discusiones, frustración y desconfianza grupal. Pronto, las tribus comenzaron a dividirse: optaron por el aislamiento en lugar de seguir discutiendo.

El autor, tras analizarlo, descubrió que las razones del fracaso de este proyecto son las siguientes:

- Incapacidad para comunicarse
- Falta de organización
- Alcance del sistema demasiado amplio

Por lo tanto, una buena gestión de requisitos tiene dos aspectos: **orientada a los requisitos** y **orientada a la gestión de los requisitos**.

Tras mi experiencia personal de uso, he elegido analizar la herramienta de gestión de proyectos Worktile.

## Análisis

Entonces, ¿cómo resuelve Worktile los problemas mencionados anteriormente?

### Primero, respondamos qué es Worktile

La descripción de su sitio web oficial:

> Worktile es una colaboración en tareas tipo kanban. Al arrastrar y soltar fácilmente las tarjetas de tareas, los miembros del equipo pueden sincronizar en tiempo real los cambios en el tablero, colaborando de manera ágil. Es una herramienta ligera de colaboración en equipo que permite a tu equipo comenzar a colaborar en solo 5 minutos, multiplicando la eficiencia. Es simple, intuitivo, fácil de usar, gratuito, ofrece miembros, proyectos y espacio de almacenamiento ilimitados, y hace que tu equipo vuele.

Después de organizar la información, descubrí que tiene las siguientes **características**:

- **Gestión de tareas tipo kanban orientada a proyectos**

  Permite dividir claramente las tareas y controlar oportunamente el estado del proyecto. Cada tarea incluye elementos de verificación, persona asignada, fecha límite, archivos adjuntos, comentarios, etc.

- **Funcionalidad de sincronización de archivos**

  Algo similar a GitHub, pero no tan potente. Personalmente, lo considero un poco prescindible.

- **Calendario compartido del equipo**

  Permite comprender a nivel macro la planificación y programación del trabajo del equipo.

- **Notificaciones de mensajes**

  Se reciben notificaciones al asignar una nueva tarea, al solicitar atención sobre un archivo o cuando hay nuevos comentarios.

- **Vistas de análisis y estadísticas**

  Cuantifican las tareas de forma visual, mostrando mediante gráficos el progreso del proyecto, la distribución de tareas entre miembros, las tendencias de actividad del proyecto, etc.

Después de conocer sus características, pasemos a ver cómo usar Worktile para la gestión de requisitos.

### Uso de Worktile para la gestión de requisitos

Analicemos cómo se refleja en Worktile el flujo de trabajo de la gestión de requisitos:

> - **Proponer requisitos**
>
>   Registrar detalladamente los requisitos de cambio. Puede verse como un memorándum o bandeja de entrada. El solicitante debe poder registrar fácilmente la información detallada del requisito.
>
> - **Revisar**
>
>   Confirmar si se debe implementar el cambio. En este proceso, es necesario evaluar el cambio, confirmar si es necesario y el impacto que tendrá en las partes existentes.

En Worktile, se utilizan listas de tareas para mostrar las diferentes etapas del flujo de cambios.

**Bandeja de entrada:** En esta lista de tareas, cualquier persona puede enviar solicitudes de cambio de requisitos. Cuando se identifica una necesidad que debe abordarse, se puede agregar aquí.
**Por hacer:** Los requisitos confirmados para implementar se pueden colocar en esta lista y asignar a los responsables correspondientes.
**En progreso:** En esta lista, se pueden identificar claramente los requisitos en curso, comprendiendo así el avance del producto.
**Completado:** Los requisitos ya finalizados se pueden colocar en una lista específica para facilitar el seguimiento posterior del producto.

> - **Implementar**
>
>   Ejecutar la implementación concreta según los detalles del requisito, lo que puede involucrar la participación de personal de producto, desarrollo y diseño.
>
> - **Confirmar**
>
>   Asegurar la calidad del resultado del requisito, confirmando que la implementación es correcta.
>
> - **Medir**
>
>   Realizar un análisis métrico del proceso de los requisitos. Este proceso es muy importante y significativo para la gestión de requisitos. Al analizar estos requisitos, se puede conocer el progreso actual del proyecto y los problemas existentes.

Se utilizan **etiquetas** para definir los atributos de las tareas y la **prioridad de las tareas** para definir la prioridad de procesamiento de los requisitos.

Si se decide no proceder con un cambio de requisito, simplemente se archiva, lo que facilita consultas futuras.

En las vistas de análisis y estadísticas de los proyectos de Worktile, se pueden realizar **estadísticas por etiquetas**. El valor para la gestión de requisitos radica en que, mediante el análisis estadístico de los atributos de los requisitos, podemos comprender el progreso del producto actual, cuántos puntos críticos de los usuarios se han resuelto, y podemos utilizar las estadísticas de listas para evaluar el estado de finalización de los requisitos:

### Resolución de problemas

Tras analizar Worktile, ahora podemos responder a la pregunta inicial: **¿Cómo resuelve Worktile los problemas mencionados anteriormente?**

Podemos usar Worktile para implementar de manera flexible el flujo de gestión de requisitos. Sus características de visualización intuitiva de tareas, plataforma de discusión y múltiples vistas del proyecto nos permiten definir fácilmente el sistema y, combinadas con una buena gestión, ayudan a evitar problemas como definiciones ambiguas de los límites del sistema.

Usando Worktile, podemos registrar fácilmente los cambios en los requisitos. Combinado con las funciones de discusión y notificaciones, puede servir para una colaboración y comunicación simples, permitiendo que cada miembro participe.

Además, podemos aprovechar su funcionalidad de análisis estadístico para medir y analizar fácilmente los requisitos del proyecto, evaluando el estado actual de los cambios en todo el proyecto.

De esta manera, Worktile resuelve los problemas de gestión de requisitos, organización del personal y comunicación.

Finalmente, la gestión de requisitos, como un eslabón dentro de la gestión general de proyectos, no debe separarse de otros elementos de la gestión de proyectos.

Y la gestión de requisitos es solo un aspecto en el que Worktile puede ser útil. Además de esto, a través de las funciones mencionadas, Worktile permite gestionar todo el ciclo de vida del proyecto, proporcionando integridad conceptual.
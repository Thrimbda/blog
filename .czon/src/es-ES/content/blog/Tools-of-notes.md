---
"title": "Herramientas para notas"
"summary": "El autor reflexiona sobre su proceso de desarrollo del hábito de registrar y reflexionar sobre su día a día. Inicialmente probó varias herramientas como Excel, JSON y aplicaciones de seguimiento automático del tiempo, pero no logró mantener la constancia. Tras el cuestionamiento de un amigo, comenzó a considerar seriamente el uso de Emacs y Org Mode. Como usuario de Vim, optó por Spacemacs para combinar los atajos de teclado de Vim con las funcionalidades de Emacs, y empezó a registrar notas diarias con Org Mode. Sin embargo, el problema de compatibilidad entre la entrada de texto en chino y los atajos de Vim aún no está resuelto, por lo que este artículo está escrito en inglés. El autor también menciona los desafíos de reemplazar Markdown por Org en su blog Hexo. El núcleo del artículo radica en compartir cómo la elección de herramientas afecta la perseverancia en los hábitos, y la experiencia diferente que supone cambiar de idioma para expresarse."
"tags":
  - "Herramientas"
  - "Notas"
  - "Spacemacs"
  - "Org Mode"
  - "Vim"
  - "Gestión del tiempo"
  - "Formación de hábitos"
"date": "2021-02-22"
---

¡Hola a todos! Ha pasado muchísimo tiempo desde la última vez que nos vimos, ¿cómo habéis estado?

Yo he estado muy ocupado con mi nuevo trabajo en Bytedance, y ¿por qué estoy escribiendo esta pequeña entrada del blog en inglés? Lo explicaré.

<!--more-->

## Registrar, reflexionar y las herramientas

Siempre he tenido un fuerte impulso por registrar mi día, para ver qué estaba haciendo y hacer estadísticas al respecto.
Después de un tiempo, descubrí dos cosas: registrar mi día y reflexionar en base a eso es muy, muy útil; lo que reflexioné durante junio finalmente me ayudó a tomar la decisión de cambiar de trabajo. Sin embargo, en cuanto al seguimiento detallado del tiempo, he fracasado constantemente desde entonces.

Quizás tenía que ver con mi herramienta. Probé Excel, esquemas JSON autodefinidos, la aplicación Time Rescue para el seguimiento automático del tiempo (resultó que nunca reflexionaba realmente sobre eso debido al ruido, literalmente registraba todo en mi ordenador, y personas como yo realmente no necesitamos eso...), varias aplicaciones en mi teléfono... Y casi me rendí.

Pero logré convertir en un hábito el tomar notas sobre mi día, y un día estaba intentando convencer a un buen amigo sobre lo importante que puede ser tomar notas. Él me cuestionó sobre las herramientas, y esa fue la primera vez que consideré seriamente `emacs` y `org-mode`.

Él dijo: "¡Hombre, estamos hablando de software! ¿Podría alguna herramienta sobrevivir unos 5 años?"

Yo dije: "Oh, en ese caso, quizás deberías considerar `org-mode`."

Sé que estaba siendo quisquilloso en broma sobre mi recomendación, pero se me ocurrió: "¿Y si lo pruebo?"

## Spacemacs y Org Mode

Soy usuario de Vim desde hace dos años, me encanta Vim y estuve muy entusiasmado con él durante mucho tiempo (siempre me topaba con algo y pensaba que era la solución definitiva, ya fuera para Vim, para Scala, etc.). Ahora sé que es solo una herramienta que ha logrado sobrevivir durante los últimos 30 años. Mucho de su diseño se debe a razones históricas y no porque deba ser así (por si te interesa, quizás te interese [por qué](https://www.youtube.com/watch?v=0M6erlK57go&ab_channel=MikeZamansky), es un video muy bueno que explica desde una perspectiva histórica por qué emacs y vim están diseñados así).
¿Y qué haría un usuario de Vim cuando considera algo del mundo de emacs? Naturalmente, algo como Spacemacs: emacs con atajos de teclado de Vim. Sí, pueden estar en armonía.

Entonces podéis imaginar cómo empecé a usar Spacemacs (aquí está mi [configuración](https://github.com/Thrimbda/.thript)) y org mode. Todavía estoy aprendiendo, acostumbrándome a la herramienta, y he empezado a registrar mis notas diarias usando org mode. Sin embargo, hay una cosa que no he podido resolver: es antinatural escribir en chino con los atajos de teclado de Vim; no he encontrado una buena solución para eso. Por eso estoy escribiendo esto en inglés. Además, se siente diferente cuando hablas otro idioma, como si fueras una persona diferente; probablemente nunca me veríais murmurando cosas sobre mí mismo de una manera tan explícita.

Aun así, es un placer hablar con todos vosotros :)

Tampoco he encontrado una buena solución para reemplazar markdown por org en mi blog de Hexo...
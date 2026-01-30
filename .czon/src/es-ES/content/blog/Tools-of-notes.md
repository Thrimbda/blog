---
"title": "Herramientas para notas"
"summary": "El autor reflexiona sobre su proceso de probar diversas herramientas para registrar el tiempo y tomar notas, incluyendo Excel, esquemas JSON personalizados, aplicaciones de seguimiento automático del tiempo, etc., pero sin lograr formar un hábito. Por sugerencia de un amigo, comenzó a considerar seriamente el uso de Org Mode de Emacs y, como usuario de Vim, optó por Spacemacs para mantener los atajos de teclado de Vim. El autor comparte su experiencia usando Org Mode para registrar notas diarias, mencionando también la incomodidad al escribir en chino, lo que lo llevó a cambiar al inglés. El artículo explora el contexto histórico y la filosofía de diseño de las herramientas, y plantea el problema no resuelto de usar Org Mode en lugar de Markdown para su blog."
"tags":
  - "Herramientas"
  - "Notas"
  - "Org Mode"
  - "Spacemacs"
  - "Registro de tiempo"
  - "Emacs"
  - "Vim"
  - "Productividad"
"date": "2021-02-22"
---

¡Hola a todos! Ha pasado muuuuucho tiempo desde la última vez que nos vimos, ¿cómo han estado?

He estado muy ocupado con mi nuevo trabajo en Bytedance, y ¿por qué estoy escribiendo esta pequeña entrada del blog en inglés? Lo explicaré.

<!--more-->

## Registrar, reflexionar y las herramientas

Siempre tuve un fuerte impulso de registrar mi día, ver qué estaba haciendo y hacer estadísticas al respecto.
Después de un tiempo, descubrí dos cosas: registrar mi día y reflexionar en base a eso es muy, muy útil; lo que reflexioné durante junio finalmente me ayudó a tomar la decisión de cambiar de trabajo. Sin embargo, en cuanto al seguimiento detallado del tiempo, seguí fracasando una y otra vez.

Quizás tenía que ver con mi herramienta. Probé Excel, esquemas JSON autodefinidos, la aplicación Time Rescue para el seguimiento automático del tiempo (resultó que nunca reflexioné realmente sobre eso debido al ruido, literalmente registra todo en tu computadora, y personas como yo realmente no necesitamos eso...), varias aplicaciones en mi teléfono... Y casi me rendí.

Pero logré hacer un hábito el registrar notas sobre mi día, y un día estaba persuadiendo a un buen amigo sobre lo importante que puede ser tomar notas. Él me cuestionó sobre las herramientas, y esa fue la primera vez que consideré seriamente `emacs` y `org-mode`.

Él dijo: "¡Hombre, estamos hablando de software! ¿Podría alguna herramienta sobrevivir unos 5 años?"

Yo dije: "Oh, en ese caso, quizás deberías considerar `org-mode`."

Sé que estaba siendo quisquilloso en broma sobre mi recomendación, pero se me ocurrió: "¿Y si lo pruebo?"

## Spacemacs y Org Mode

Soy usuario de Vim desde hace dos años, amo Vim y estuve muy entusiasmado con él durante mucho tiempo (siempre me topaba con algo y pensaba que era la solución definitiva, para Vim, para Scala, etc.). Ahora sé que es solo una herramienta que ha logrado sobrevivir durante los últimos 30 años. Mucho de su diseño se debe a razones históricas y no porque deba ser así (para que te lleves algo, quizás te interese [por qué](https://www.youtube.com/watch?v=0M6erlK57go&ab_channel=MikeZamansky), es un video muy bueno que explica desde una perspectiva histórica por qué emacs y vim están diseñados así).
¿Y qué haría un usuario de Vim cuando considera algo del mundo de emacs? Naturalmente, algo como Spacemacs: emacs con atajos de teclado de Vim. Sí, pueden estar en armonía.

Entonces puedes adivinar cómo comencé a usar Spacemacs (aquí está mi [configuración](https://github.com/Thrimbda/.thript)) y org mode. Todavía estoy aprendiendo, acostumbrándome a la herramienta, y comencé a registrar mis notas diarias usando org mode, aunque hay algo que no he podido resolver: es antinatural escribir en chino con los atajos de teclado de Vim y no he encontrado una buena solución para eso. Por eso estoy escribiendo esto en inglés. Además, se siente diferente cuando hablas otro idioma, como si fueras otra persona; probablemente nunca me verías hablando de mí mismo de una manera tan explícita.

Aún así, es bueno hablar con todos ustedes :)

Tampoco he encontrado una buena solución para reemplazar markdown con org en mi blog de hexo...
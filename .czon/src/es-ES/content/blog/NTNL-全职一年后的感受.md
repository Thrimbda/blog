---
"title": "Reflexiones tras un año a tiempo completo en NTNL"
"summary": "Este artículo es una revisión y reflexión del autor tras un año trabajando a tiempo completo en la empresa emergente de trading cuantitativo NTNL. El texto detalla el recorrido del equipo, desde los primeros intentos con modelos, el doloroso fracaso del fondo NTNL-001, hasta el reajuste de rumbo y el establecimiento de una nueva línea principal (desarrollo de la plataforma Yuan, operación del fondo NTNL-LTS, desarrollo propio de modelos). El autor resume errores clave, como fallos en la elección de dirección, inmadurez en la operación de fondos y falta de precisión al identificar la contradicción principal, y comparte la situación actual y los desafíos del equipo en áreas como desarrollo de herramientas, investigación de modelos y situación financiera. Finalmente, el artículo mira hacia el futuro, enfatizando principios como adherirse a la realidad, aprender de la experiencia y centrarse en la contradicción principal, y expresa una actitud de búsqueda de una vida intensa en el camino del emprendimiento."
"tags":
  - "Diario de trabajo"
  - "Trading cuantitativo"
  - "Reflexión sobre emprendimiento"
  - "NTNL"
  - "Yuan"
  - "Operación de fondos"
  - "Lecciones del fracaso"
  - "Gestión de equipos"
"date": "2023-07-31"
---

*Rompiendo el hechizo de "un primer impulso vigoroso, un segundo débil y un tercero agotado"*

En vísperas de lanzar la fase de producto de Yuan, los miembros del equipo están ansiosos por embarcarse en un viaje completamente nuevo. Sin embargo, siento que es necesario revisar el trabajo de los últimos dos años en NTNL, recordar nuestro recorrido emocional, nuestra intención original, nuestros esfuerzos y los desvíos que hemos tomado.

Max Weber, fundador de la sociología moderna, tiene en *La ética protestante y el espíritu del capitalismo* una crítica clave sobre el capitalismo: la racionalidad instrumental (métodos, medios) finalmente vence a la racionalidad de valor (fines, valores), el hombre logra su ideal inicial, pero se convierte en un cadáver ambulante sin propósito.

Escribo este artículo, por un lado, para hacer un resumen, resumir nuestros fracasos pasados para evitar tropezar dos veces en el mismo lugar; por otro lado, para que nuestra intención original no se apague. También para darme ánimos a mí mismo.

**No Trade No Life — Cambiar el mundo mediante el trading. ¡Aschente!**

## Origen

En abril de 2021, NTNL lanzó su primer modelo para criptomonedas. Yo, como inversor, invertí todos mis 1580 U que tenía en la cadena. Diez minutos después del despliegue, esos 1580 U se convirtieron en 1740 U; tres meses después, finalizó el ciclo de vida de ese modelo y finalmente recibí 2400 U.

Este fue mi verdadero momento de iluminación personal sobre el trading cuantitativo: el trading cuantitativo realmente puede lograr "ingresos pasivos".

Lamentablemente, el ciclo de vida de ese modelo terminó demasiado pronto, no ganamos mucho dinero con él.

Afortunadamente, el ciclo de vida de ese modelo terminó demasiado pronto, lo que nos permitió comenzar la empresa NTNL como consecuencia.

## Prehistoria

Después de esa primera prueba exitosa, el equipo de NTNL comenzó a atraer a más compañeros, colegas y amigos interesados en ganar dinero mediante trading cuantitativo. Comenzamos a participar en parte del trabajo de desarrollo de manera parcial (a tiempo parcial).

Sin embargo, durante casi un año, nuestro progreso fue lento; el código que escribimos ahora parece completamente inútil. Después de que JQ se unió, a través de muchas innovaciones en equipo y sistemas, comenzamos a encontrar cierto ritmo, pero inmediatamente después sufrimos el golpe del confinamiento por la pandemia en Shanghái, y todo el trabajo volvió a estancarse.

Hasta el 14 de mayo de 2022, CZ me llamó por teléfono, considerando que el copy trading basado en fuentes de señales externas era muy prometedor. Así que, dicho y hecho, esa misma noche comenzamos el desarrollo del copiador Yamcha, que se lanzó dos días después, marcando una nueva etapa para el equipo de NTNL.

---

Con el lanzamiento del copiador Yamcha, muchas cosas comenzaron a acelerarse:

* CZ renunció a ByteDance el 6 de junio y comenzó a trabajar a tiempo completo en NTNL.
* Yo renuncié a ByteDance el 16 de julio y comencé a trabajar a tiempo completo en NTNL.

Los primeros resultados fueron visibles: el copy trading de señales hizo que nuestro valor neto (NAV) alcanzara 2.16 en solo una semana. No podíamos evitar mirar el mercado todos los días, nuestro estado de ánimo fluctuaba enormemente junto con el NAV. Pero en general, con el rápido aumento del NAV, las expectativas de cada uno sobre el futuro eran muy buenas.

Pero pronto, sufrimos nuestro primer gran fracaso: una pérdida de casi un millón en el fondo NTNL-001.

¿Qué causó este fracaso? La información relevante aún es relativamente fácil de encontrar un año después:
- La primera semana del fondo, perdimos una oportunidad de que el NAV alcanzara un pico de 2. Fue la primera vez que vi a CZ emocional desde que estábamos a tiempo completo.
- Crisis de margen insuficiente el 30-06-2022 - Ese día acababa de mudarme de Minhang a Yangpu, con las maletas por toda la casa, y nos enfrentamos a una situación en la que el volumen de órdenes era tan grande que el margen era insuficiente y no podíamos ingresar más.
- Retroceso del 50% en un día del fondo el 07-07-2022 - Una tarde increíblemente dolorosa. Vi cómo el NAV caía de 220,000 USD a 90,000 USD, sintiendo que no podía hacer nada.
- Ajuste de expectativas el 14-07-2022 - Una semana después, experimentamos otra gran pérdida. En ese momento, el NAV de NTNL-001 ya había retrocedido un 66% desde su pico. A partir de entonces, nos dimos cuenta de que este modo de operación no era sostenible. Poco después, el fondo NTNL-001 se declaró un fracaso.

La experiencia más reciente ocupa más espacio mental. En ese momento, acabábamos de experimentar esa gran derrota, estábamos en medio de grandes fluctuaciones emocionales, incapaces de examinar con verdadera calma los errores que habíamos cometido, imposibilitados de aprender de ellos de manera efectiva.

Por lo tanto, hoy, un año después, debemos mirar atrás: ¿qué errores cometimos exactamente y qué podemos aprender de ellos?

**La ignorancia causó un error fundamental en la dirección**. Después de observar el rendimiento de las fuentes de señales durante unos meses, asumimos que los resultados de la observación tenían significado estadístico y luego comenzamos el copy trading. El método específico de copy trading incluso cayó en el error dogmático del tipo [Culto a la carga](https://es.wikipedia.org/wiki/Culto_a_la_carga). Bajo la enorme tentación de ya estar ganando dinero y obteniendo beneficios, nadie podía mantener la cordura, detenerse y examinar cuidadosamente los riesgos a los que nos enfrentábamos. Incluso después de experimentar en la segunda semana de operaciones fluctuaciones del NAV del fondo de alrededor del 50% en un tiempo extremadamente corto, no realizamos ningún cambio en el modo de operación, sino que nos volvimos más agresivos. Finalmente, cuando ese cimiento que nunca fue sólido —la suposición de que el rendimiento de una fuente de señales de caja negra operada por un humano emocionalmente inestable tenía significado estadístico— comenzó a tambalearse, nuestra suposición básica para operar este fondo se vino abajo y todos los inversores perdieron dinero.

**Inmadurez en la operación del fondo**. Después de que el fondo comenzó a operar, con la intención original de que todos en NTNL ganaran dinero juntos, invitamos ampliamente a los miembros de NTNL a participar en el fondo NTNL-001. Aunque no hicimos ninguna promesa de garantía de capital o ganancias, el fracaso final de hecho dañó a nuestros inversores, lo que a su vez perjudicó nuestra propia credibilidad comercial. Más importante aún, ejerció presión sobre nuestras operaciones de fondos posteriores, tendiendo a una excesiva conservadurización.

**Identificación imprecisa de la contradicción principal**. Comprensión imprecisa del equipo en sí. No entendimos claramente nuestras propias fortalezas y debilidades. Bajo la premisa de que cada uno de nosotros tiene formación en ingeniería de software/ciencias de la computación, y de que nuestro trabajo principal es ser programadores profesionales y no profesionales financieros, creímos ciegamente que esta señal operada manualmente podía traernos un éxito rápido, y luego nos sumergimos en ella, dedicando una gran cantidad de trabajo que hoy parece completamente inútil. En resumen, gastamos una enorme cantidad de mano de obra y esfuerzo en problemas secundarios, sin captar la contradicción principal.

## Establecimiento de la nueva línea principal

Después del fracaso devastador del fondo NTNL-001, reflexionamos profundamente sobre el dolor y decidimos cambiar de dirección:

1.  Crear Yuan, como una plataforma integral para el desarrollo, investigación, depuración y despliegue de trading cuantitativo.
2.  Con la incorporación de varias fuentes de señales, resumimos las lecciones aprendidas anteriormente y lanzamos el fondo NTNL-LTS compuesto por múltiples fuentes de señales.
3.  El desarrollo propio de modelos se incluyó en la agenda.

¿Por qué se determinaron estas tres rutas?

"Para hacer bien un trabajo, primero hay que afilar las herramientas". Creemos que el cuello de botella de la productividad es la falta de buenas herramientas. En NTNL-001, sufrimos demasiado debido a la insuficiencia de herramientas, invirtiendo demasiada energía en apagar incendios. Por lo tanto, consideramos que el perfeccionamiento de las herramientas es muy necesario.

Al mismo tiempo, dado que CZ y yo ya estábamos a tiempo completo, enfrentábamos el problema de no tener ingresos estables, por lo que teníamos que encontrar una manera de mantener los ingresos. Pero en ese momento no teníamos modelos rentables en nuestras manos, por lo que las fuentes de señales externas obtenidas a través de la ruta comercial se convirtieron en nuestra esperanza de ganancias.

Sin embargo, las fuentes de señales externas son, después de todo, cajas negras. Por un lado, esto significa que no podemos confiar plenamente en las estadísticas de su rendimiento (tiempo de trading insuficiente, cambio de estrategia a mitad de camino, etc.); por otro lado, no podemos aplicar ampliamente las fuentes de señales externas en más mercados y productos, lo que limita el espacio de imaginación de las ganancias. Por lo tanto, nunca podríamos abandonar la posibilidad de desarrollar nuestros propios modelos, y las fuentes de señales externas son solo un sustituto durante el período de transición hasta que se desarrollen suficientes y diversos modelos propios.

Desde que se establecieron las rutas, desde agosto de 2022 hasta ahora (julio de 2023), hemos estado trabajando diligentemente en estas tres líneas principales, y los registros correspondientes también han aumentado: informes quincenales, anuales y trimestrales están documentados.

Lo que sucedió específicamente durante este período no es el enfoque principal de este artículo. Lo que quiero discutir es, desde la perspectiva de hoy, al revisar lo sucedido durante este tiempo, ¿cuáles son los nuevos desafíos? ¿Qué experiencias podemos resumir? ¿Y hemos absorbido y aprendido completamente las lecciones del fracaso de NTNL-001? Del mismo modo, quiero resumir enumerando algunos puntos clave que considero de este período.

**En la ruta, todavía tomamos desvíos**. Se manifestó como una excesiva inversión de energía en las fuentes de señales externas. Desde agosto hasta abril, casi no nos dimos cuenta de la necesidad de invertir energía en el desarrollo de modelos, concentrando excesivamente el poder de desarrollo en el análisis de fuentes de señales externas. En ese momento, en realidad era una opción razonable. Describir esta elección como "tomar un desvío" es una evaluación cualitativa retrospectiva desde un ángulo posterior. La razón es que en ese momento no sabíamos que la estabilidad de las fuentes de señales externas y la calidad de las señales mismas fueran tan deficientes. Mirando hacia atrás, casi todas las fuentes de señales externas que obtuvimos eran estrategias de martingala oscilante: parecían muy potentes, pero un solo fallo podía hacer que todo el esfuerzo anterior se perdiera. Estos y otros problemas finalmente nos llevaron a abandonar la ruta de operar fuentes de señales externas como principal fuente de ingresos.

**El fondo NTNL-LTS alcanzó un tamaño de 3 millones de RMB**. A pesar de haber tomado un desvío en la ruta de operación de señales, debemos reconocer el significado positivo de este período para nosotros, que fue que el NAV de NTNL-LTS, basado en la operación a gran escala de fuentes de señales externas, llegó a alcanzar 1.04, permitiéndonos absorber más capital que durante el período de NTNL-001. Aunque ahora (julio de 2023), debido al estancamiento en el desarrollo de modelos, el NAV del fondo también se ha estancado, eso es otro problema.

**Yuan ha madurado**. El desarrollo de Yuan en sí es el logro más importante del último año. Ha jugado un papel crucial en la investigación de fuentes de señales externas, el desarrollo de modelos, la investigación, el copy trading de cuentas y el despliegue. Desde una perspectiva estratégica, esta es nuestra forma de aprovechar nuestras fortalezas y evitar nuestras debilidades. Nuestra formación académica y profesional previa se ha centrado en ingeniería de software/ciencias de la computación/internet. Somos buenos en utilizar el pensamiento de internet y la tecnología para penetrar y potenciar completamente otras industrias. Además, aunque la frecuente conexión de señales y el cambio de contraseñas también interrumpieron frecuentemente el trabajo de desarrollo diario, la pesada demanda de trabajo de análisis de fuentes de señales, a su vez, promovió el perfeccionamiento de las propias herramientas de análisis de Yuan, permitiéndonos identificar riesgos y problemas como el averaging down más allá de las bonitas curvas de NAV en poco tiempo, lo que a su vez proporcionó una ayuda considerable cuando investigamos nuestros propios modelos.

**La mano de obra a tiempo parcial para Yuan se ha reducido gradualmente a cero**. Probablemente sea la manifestación concreta de "un primer impulso vigoroso, un segundo débil y un tercero agotado". Dado que el trabajo a tiempo parcial en sí no tiene incentivos decentes, desarrollar para la ingeniería no tiene una guía de contribución lo suficientemente buena, y es muy difícil alentar a todos a obtener grandes participaciones por desarrollar modelos. Finalmente, hoy en julio de 2023, nuestra mano de obra real es de solo unas 3 personas. Antes de que haya nuevos incentivos o orientación para el personal a tiempo parcial, probablemente se mantendrá en el estado actual. Detrás de esto hay realmente problemas de gestión e incentivos. En el futuro, si Yuan avanza hacia el código abierto y la comercialización, todavía enfrentaremos problemas similares.

**Nuestra situación financiera ha empeorado**. Dado que CZ todavía tiene algunos ahorros en efectivo, puede mantener su vida sin recibir salario, mientras que yo recibo un salario mensual. Este dinero, por supuesto, no cae del cielo. CZ y JQ compraron conjuntamente bonos emitidos a nombre de NTNL. Hasta la fecha (julio de 2023), ya se han emitido 300,000 RMB en bonos. Esta es la carga más pesada sobre nuestros hombros en este momento. Bajo la presión de la supervivencia, nuestro tiempo es muy, muy limitado.

**Tenemos varios modelos utilizables**. Actualmente, los modelos de desarrollo propio han reemplazado completamente a las fuentes de señales externas, superando con creces la suma de los cientos de fuentes de señales de entonces en amplitud y diversidad de mercados y productos. Más importante aún, la diversificación de las estrategias y tipos de los modelos en sí hará que nuestra gestión de riesgos sea más fácil y natural. Los modelos en sí pueden cambiar nuestra estructura de ingresos, aliviando la enorme presión financiera que llevamos.

---
El factor humano es el más importante. Todas las lecciones y logros anteriores los hemos promovido y logrado nosotros mismos como individuos subjetivos. Mirando atrás a cuando comenzamos a trabajar en NTNL hace dos años, nuestra comprensión de lo que íbamos a hacer era muy, muy superficial. Por ejemplo, yo mismo no tenía idea de desde qué perspectiva ver esto.

![](upload://inRWoJb02gFqO3cYa8ykFwepsGp.png)

Esta es una discusión con CZ hace dos años sobre la empresa NTNL. Cuando estábamos imaginando lo que sucedería en el futuro, cuando hablábamos sobre la viabilidad de este asunto a nivel de principios, nunca supimos qué experiencias tan intensas pasaríamos en la práctica. Hoy, dos años después, tenemos una comprensión completamente diferente de lo que discutimos entonces. En resumen, a través de la práctica personal, hemos tomado muchas, muchas decisiones. Con nuestras decisiones, llegan las correspondientes retroalimentaciones, sufriendo dolor o sintiendo alegría, y la dosis de dolor y alegría es mucho, mucho mayor que antes de emprender.

"Lo aprendido en el papel siempre es superficial; para comprenderlo verdaderamente, hay que practicarlo." La práctica es el único criterio para probar la verdad. Los emprendedores pueden tener ideales elevados, pero deben ser materialistas: todos los ideales deben estar arraigados en el suelo de la realidad. Debemos atrevernos a tomar decisiones con audacia y precaución en todo momento, y luego crecer en la retroalimentación.

## Cómo será el futuro

Ahora nuestro enfoque de trabajo tiene dos puntos:

1.  Continuar ajustando e investigando modelos
    1.  El objetivo mínimo es que los modelos puedan mantener la vida personal de CZ y la mía.
    2.  El objetivo máximo es recaudar fondos del exterior como un producto de fondo de inversión privado.
2.  La comercialización de Yuan como producto. Debemos establecer una ruta para la comercialización del producto y buscar financiación de capital de riesgo.
    1.  El objetivo mínimo es abrir parte de las capacidades de Yuan como código abierto, para ayudar al menos a algunas personas.
    2.  El objetivo máximo es obtener financiación con éxito y completar la comercialización, afectando a más personas.

Hemos pasado por momentos más difíciles que los actuales. Podemos pensar que el futuro sigue siendo difícil, incluso más que antes, pero no hay razón para creer que el futuro carece de esperanza.

Pero también debemos seguir ciertos principios:

1.  Adherirse a buscar la verdad en los hechos, partir de la realidad para considerar cualquier cosa, no evadir ningún problema.
2.  Persistir en aprender de las experiencias pasadas.
3.  Persistir en el idealismo. Esta es nuestra bendición y nuestra maldición, por lo que siempre debemos recordar buscar la verdad en los hechos.
4.  Persistir en trabajar de manera científica y feliz. Incluso si nos explotamos a nosotros mismos más severamente que cualquier capitalista, debemos hacerlo de manera sostenible.
5.  Persistir en identificar la contradicción principal, comprender la situación actual, comprender nuestras expectativas, y planificar un camino con nuestro mejor conocimiento.

## Epílogo

Todavía quiero terminar con este poema de Keats:

> ¿Por qué me reí esta noche? Ninguna voz lo dirá
> Ningún Dios, ningún Demonio de severa respuesta,
> Se digna a responder desde el Cielo o desde el Infierno.
> Entonces me vuelvo de inmediato a mi corazón humano:
> ¡Corazón! Tú y yo estamos aquí tristes y solos;
> Digo, ¿por qué me reí? ¡Oh dolor mortal!
> ¡Oh Oscuridad! ¡Oscuridad! Siempre debo gemir,
> Para cuestionar en vano al Cielo, al Infierno y al Corazón.
> ¿Por qué me reí? Sé el plazo de este Ser,
> Mi fantasía se extiende hasta sus máximas dichas;
> Sin embargo, en esta misma medianoche cesaría,
> Y vería los vistosos estandartes del mundo hechos jirones;
> El Verso, la Fama y la Belleza son intensos en verdad,
> Pero la Muerte es más intensa – la Muerte es la alta recompensa de la Vida.

Una vez escribí sobre mi proceso mental al ver el momento de doloroso renacimiento de un senior en un momento de redes sociales. Esa fue mi comprensión inicial de este poema.

Hasta hoy, hoy que nosotros mismos hemos estado emprendiendo a tiempo completo durante más de un año. Al releer este poema una y otra vez, también siento un sabor agridulce diferente. ¿Hacia dónde iremos? Ninguna existencia superior a nosotros mismos puede responder a esta pregunta. Dedicarme al trading me ha hecho comprender una cosa: en el mundo real, ninguna decisión puede tomarse con información completamente suficiente. Esto significa que todas nuestras decisiones tienen un componente de apuesta, y ganar o perder tiene un costo diferente según nuestra identidad, sin importar la equidad, y el mundo es un juego podrido.

Como humanos, debemos relacionarnos con el mundo en el que vivimos, expresar nuestra creatividad a través del trabajo para habitar en él, cambiar la naturaleza y a nosotros mismos. El trabajo debería ser fundamental para definir nuestra humanidad. Como emprendedores de esta era, en este "juego podrido", no tenemos medios de producción, nosotros mismos somos los medios de producción, nosotros mismos somos la herramienta, no es posible crear de manera puramente poética. Por lo tanto, debemos estar preparados, explotarnos a nosotros mismos más severamente y de manera más sostenible que cualquier capitalista, acelerar el paso con más ingesta e intercambio de información, más inspiración y más arduo trabajo. Y esperar hacer una pequeña contribución a este mundo, crear un mundo donde las personas puedan trabajar poéticamente.

Así que, mirando hacia atrás en esta línea `Entonces me vuelvo de inmediato a mi corazón humano`, solo queda inclinarse y preguntar a nuestro propio corazón, ver si este corazón sigue siendo luminoso, si es puramente razón celestial. Luego ver si este corazón puede resistir la prueba en asuntos concretos, soportar un dolor multiplicado, capturar una alegría multiplicada, lograr la unidad de conocimiento y acción.

Todos los caminos conducen a Roma. Hoy sigo creyendo: en la vida limitada del hombre, qué se debe perseguir, tal vez se deba perseguir esto: **Intenso**. Mientras quede un aliento, hay que explorar y avanzar, ser como el árbol en la montaña del que hablaba Nietzsche, aunque atormentado por vientos invisibles, aún debe extender sus raíces con fuerza hacia la tierra, hacia abajo, hacia la oscuridad, y luego erguirse solo en la cima de la montaña, recibiendo el rayo. Usar una vida intensa para recibir esa muerte intensa.
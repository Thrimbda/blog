# cone-scroll

`cone-scroll` es un tema para blogs diseñado para Zola. Originalmente inspirado por [anemone](https://github.com/Speyll/anemone) y [granda](https://granda.org), hoy ha evolucionado hasta convertirse en algo completamente diferente, por lo que ahora se distribuye como un proyecto independiente.

No pretende que el blog parezca una página de producto, ni tampoco fingir ser una terminal. Una metáfora más cercana sería quizás una página índice cuidadosamente maquetada: fondo color papel cálido, una columna de texto un poco más estrecha, un índice silencioso pero funcional y un título ASCII que no hace mucho ruido.

Si te gustan las tarjetas, los héroes, los resplandores degradados y las páginas de inicio que muestran todas las funciones de un vistazo, probablemente no sea para ti. Está más orientado a "sentarse a leer un rato".

![Captura de pantalla de Cone Scroll en modo claro y oscuro](./screenshot.svg)

Si te preocupa más la página de artículos, mira esta otra. Modo claro a la izquierda, oscuro a la derecha, el TOC, los metadatos y la columna de texto aparecen juntos en pantalla.

![Captura de pantalla de un artículo en Cone Scroll](./screenshot-post.svg)

## Qué ofrece

- Esquema de color cálido papel/tinta, con temas claro y oscuro
- Ancho de lectura reducido, ideal para artículos largos que se leen desplazándose
- Página de inicio tipo índice, página de archivo y página de etiquetas, sin seguir el enfoque de tarjetas
- Cambio de tema, RSS, etiquetas y barra lateral de TOC basados en texto
- Incluye `blog-page.html`, páginas normales, páginas de etiquetas, shortcodes y un poco de JavaScript nativo

## Instalación

La forma más sencilla es copiar todo este directorio en la carpeta `themes/` de tu sitio:

```bash
mkdir -p themes
cp -R path/to/cone-scroll themes/cone-scroll
```

Luego, actívalo en el `config.toml` de tu sitio:

```toml
theme = "cone-scroll"

title = "Tu blog"
description = "Escribe lo que quieras escribir"
default_language = "zh"
generate_feeds = true

taxonomies = [{ name = "tags", feed = true }]

[extra]
author = "Tu nombre"
display_author = true
favicon = "favicon.ico"
default_theme = "light"
twitter_card = true

header_nav = [
  { url = "/blog", name_zh = "|Blog|" },
  { url = "/diary", name_zh = "|Diario|" },
  { url = "/about", name_zh = "|Acerca de|" },
]
```

Si tienes varios idiomas activados, los elementos de navegación deben seguir la convención del modelo existente como `name_<lang>`, por ejemplo `name_zh`, `name_en`.

## Convenciones de página

Si deseas que tanto los artículos del blog como las entradas del diario utilicen la plantilla de artículo del tema, puedes escribirlo así en la sección correspondiente:

```toml
+++
title = "Archivo del blog"
sort_by = "date"
page_template = "blog-page.html"
+++
```

Los artículos largos mostrarán el TOC por defecto cuando tengan niveles de encabezado. Si quieres desactivarlo manualmente, puedes escribirlo en el front matter de la página:

```toml
[extra]
toc = false
```

## Valores predeterminados con carácter

Este no es un tema que busque "ser útil para cubrir todas las formas de blog posibles"; tiene preferencias muy claras:

- El texto predeterminado de la capa exterior está orientado al contexto chino, ideal para sitios en chino que empiezan desde cero
- La página de inicio, el archivo y la página de etiquetas enfatizan la "sensación de índice", no son un muro de tarjetas con resúmenes
- `blog-page.html` incluye un fragmento de código para montar giscus; si no lo usas, bórralo o reemplázalo con tu propia configuración
- El tema en sí no proporciona un favicon; coloca tu propio `favicon.ico` en el directorio raíz `static/` y apunta a él en `config.extra.favicon`

## Estructura del directorio

El tema en sí es simple:

```text
cone-scroll/
├── theme.toml
├── README.md
├── screenshot.svg
├── templates/
└── static/
```

Sin cadena de construcción, sin pasos de empaquetado adicionales. La mayoría de las cosas están en las plantillas, el CSS y un pequeño `script.js`.

## Licencia

MIT.
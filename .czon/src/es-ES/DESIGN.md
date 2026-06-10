---
name: "c1 blog"
description: "Un archivo personal duradero en estilo terminal-papel para ensayos, entradas de diario y fragmentos de charlas importadas."
colors:
  paper-bg: "#f6f1e8"
  paper-elevated: "#fbf8f2"
  ink: "#171411"
  muted: "#6c655c"
  muted-strong: "#555047"
  link-blue: "#1f4d8f"
  visited-violet: "#6a537d"
  rule: "#d4ccbf"
  code-bg: "#ebe5db"
  dark-bg: "#171311"
  dark-elevated: "#221b17"
  dark-ink: "#efe2d2"
  dark-rule: "#4a4038"
typography:
  display:
    fontFamily: "Dashes, monospace"
    fontSize: "1.52em"
    fontWeight: 700
    lineHeight: 1.72
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Dashes, monospace"
    fontSize: "1.24em"
    fontWeight: 700
    lineHeight: 1.72
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Dashes, monospace"
    fontSize: "1.1em"
    fontWeight: 700
    lineHeight: 1.72
  body:
    fontFamily: "Dashes, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "Dashes, monospace"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  xs: "0.35rem"
  sm: "0.65rem"
  md: "1.1rem"
  lg: "2.25rem"
components:
  link:
    textColor: "{colors.link-blue}"
  button-ghost:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.muted-strong}"
    rounded: "{rounded.none}"
    padding: "0.08rem 0.2rem"
  article:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.ink}"
    width: "70ch"
---

# Sistema de diseño: c1 blog

## 1. Visión general

**Estrella del norte creativa: «Archivo en papel de terminal»**

El sistema visual combina colores cálidos de papel con el ritmo monospace propio de una terminal. Es deliberadamente silencioso: el contenido, la cronología y la navegación llana constituyen la interfaz. El diseño debe sentirse mantenido y personal, no pulido como un producto de publicación genérico.

El sitio actual rechaza las superficies decorativas. Las reglas, los corchetes, las marcas ASCII, los enlaces de texto y las columnas de lectura estrechas llevan la identidad. El trabajo futuro debe conservar ese lenguaje y mejorar la continuidad de lectura, el ajuste adaptable y la claridad de estado, sin introducir diseños cargados de tarjetas ni composiciones propias de páginas de marketing.

**Características clave:**
- Primero el texto, poca ornamentación, alta continuidad.
- Papel cálido en modo claro y papel marrón-negro en modo oscuro.
- Familia de respaldo serif monospace mediante la fuente personalizada `Dashes`.
- Reglas finas y controles entre corchetes en lugar de widgets rellenos.
- Comportamiento estático por defecto, con JavaScript como mejora progresiva.

## 2. Colores

La paleta es un sistema de papel de archivo cálido con un único acento azul para enlaces y un violeta para visitados.

### Primarios
- **Azul enlace** (`#1f4d8f`): El único acento interactivo fuerte en modo claro. Úsalo para enlaces en línea y elementos importantes de navegación.
- **Violeta visitado** (`#6a537d`): Conserva la semántica de visitado similar a la del navegador sin volverse decorativo.

### Neutros
- **Fondo de papel** (`#f6f1e8`): Fondo de página predeterminado y superficie dominante.
- **Papel elevado** (`#fbf8f2`): Superficie de menú desplegable y UI elevada pequeña.
- **Tinta** (`#171411`): Texto del cuerpo y encabezados principales.
- **Tinta atenuada** (`#6c655c`): Metadatos secundarios, marcas de lista y elementos de baja importancia.
- **Tinta atenuada fuerte** (`#555047`): Navegación, controles y metadatos que deben seguir siendo legibles.
- **Regla** (`#d4ccbf`): Divisores, bordes, contornos de enfoque y líneas de encabezado de lista de entradas.
- **Papel oscuro** (`#171311`): Fondo de página en modo oscuro.
- **Papel oscuro elevado** (`#221b17`): Superficie elevada en modo oscuro.
- **Tinta oscura** (`#efe2d2`): Texto del cuerpo en modo oscuro.
- **Regla oscura** (`#4a4038`): Divisores y bordes en modo oscuro.

### Reglas con nombre

**La regla del único acento.** El azul es solo para enlaces y elementos interactivos principales. No añadas colores de acento decorativos en páginas de lectura larga.

**La regla de que el papel sigue siendo papel.** Mantén la identidad de papel cálido, pero verifica el contraste cada vez que el texto atenuado o los controles se sitúen sobre fondos teñidos.

## 3. Tipografía

**Fuente de visualización:** `Dashes` con fuentes de respaldo locales Georgia, Times New Roman, DejaVu Serif, Liberation Serif, Nimbus Roman.
**Fuente del cuerpo:** `Dashes`, `monospace`.
**Fuente de etiqueta/mono:** La misma familia que la del cuerpo.

**Carácter:** La tipografía es deliberadamente mecánica y literaria a la vez. Debe leerse como una consola de texto duradera impresa en papel, no como una interfaz SaaS moderna.

### Jerarquía
- **Display** (700, `1.52em`, altura de línea heredada del cuerpo): Títulos de página y encabezados principales de artículos.
- **Titular** (700, `1.24em`): Encabezados de sección dentro de páginas y entradas largas.
- **Título** (700, `1.1em`): Encabezados de nivel inferior y títulos de sección compactos.
- **Cuerpo** (400, `15px`, `1.72`): Lectura en formato largo. Mantén el ancho del artículo alrededor de `69ch` a `70ch`.
- **Etiqueta** (600, `0.8rem`, espaciado entre letras `0.08em`): Controles escasos como resúmenes de esquema. No multipliques estilos de etiqueta entre secciones.

### Reglas con nombre

**La regla de la columna de lectura.** El contenido del cuerpo debe permanecer dentro de aproximadamente `65ch` a `75ch`; los índices largos de registro pueden ser más anchos solo cuando la estructura de fechas/listas se beneficie de ello.

## 4. Elevación

El sistema es plano por defecto. La profundidad se expresa con reglas finas, superficies tonales, espaciado y orden de origen. Las sombras son raras y deben ser estructurales, no decorativas; el menú desplegable de cambio de idioma es la excepción actual porque flota sobre el flujo del encabezado.

### Vocabulario de sombras
- **Elevación de menú desplegable** (`box-shadow: 0 0.45rem 1rem rgba(23, 20, 17, 0.08)`): Úsalo solo para pequeños controles flotantes que deban desvincularse visualmente de la página.

### Reglas con nombre

**La regla del archivo plano.** Los artículos, entradas de registro y listas no reciben sombras de tarjeta. Usa encabezados, fechas, reglas y espacios en blanco para la estructura.

## 5. Componentes

### Botones
- **Forma:** Controles de texto cuadrados sin radio (`0`).
- **Primario:** No existe un patrón de botón primario relleno. Usa enlaces de texto o botones fantasma entre corchetes.
- **Flotar / Enfocar:** Subrayado al pasar el ratón o al enfocar; contorno de enfoque de `1px` de color regla con un pequeño desplazamiento.
- **Fantasma:** El selector de tema usa pseudoelementos de corchetes y texto atenuado sobre el fondo de página.

### Etiquetas
- **Estilo:** Las etiquetas son enlaces de texto representados como `/etiqueta/`, no como píldoras.
- **Estado:** No existe un estilo de etiqueta seleccionada hoy; mantén los futuros filtros basados en texto a menos que se requiera un estado más fuerte.

### Tarjetas / Contenedores
- **Estilo de esquina:** Sin radio en tarjetas.
- **Fondo:** Los artículos se sitúan directamente sobre el fondo del cuerpo.
- **Estrategia de sombra:** Sin sombras para contenedores de contenido.
- **Borde:** Reglas finas separan el encabezado, el pie de página, el riel de esquema, los bloques de código, las tablas y las líneas de encabezado de lista.
- **Relleno interno:** El contenido depende del relleno de página y del ritmo de línea en lugar de relleno en caja.

### Entradas / Campos
- **Estilo:** Los controles de formulario nativos heredan la familia monospace y usan bordes de regla de `1px`.
- **Enfoque:** Prefiere contornos visibles de color regla.
- **Error / Deshabilitado:** No establecido actualmente; los formularios futuros deben mantener los estados basados en texto y de alto contraste.

### Navegación
- **Estilo:** La navegación del encabezado y pie de página son enlaces de texto en línea bajo un logotipo ASCII. Los controles usan texto entre corchetes. La navegación se ajusta en lugar de colapsar en un menú hamburguesa en pantallas pequeñas.
- **Tratamiento móvil:** El relleno del cuerpo se comprime, las listas de entradas pasan de filas con línea de encabezado a filas de dos columnas/fecha bajo título, y los menús desplegables se convierten en paneles dentro del flujo.

### Esquema de página

El riel de esquema es un componente característico para entradas largas. En escritorio se convierte en un riel izquierdo fijo con un divisor fino; en pantallas más pequeñas permanece en el flujo del documento. El estado colapsado debe persistir por ruta y nunca debe ocultar el artículo en sí.

### Grupos de imágenes Embla

Las imágenes consecutivas se agrupan progresivamente en un carrusel Embla. El carrusel debe mantener las imágenes inspeccionables, limitadas por la altura del viewport, y no debe alterar las entradas de una sola imagen.

## 6. Qué hacer y qué no hacer

### Sí hacer:
- **Sí** conserva el vocabulario de tokens `--bg`, `--fg`, `--muted`, `--link` y `--border` al añadir nueva UI.
- **Sí** mantén el ancho de los artículos de formato largo cerca de `70ch` y las páginas de lista/archivo alrededor del contenedor existente de `84ch`.
- **Sí** usa reglas finas de `1px`, controles entre corchetes y enlaces de texto antes de añadir paneles.
- **Sí** proporciona un fallback sin JavaScript para superficies de carga diferida o navegación infinita.
- **Sí** prueba la lectura en móvil, portátil y escritorio ancho para desbordamiento, objetivos táctiles y longitud de línea.

### No hacer:
- **No** introduzcas cuadrículas de archivo cargadas de tarjetas, gradientes brillantes, paneles de vidrio ni secciones de héroe.
- **No** añadas franjas de acento `border-left` o `border-right` de más de `1px`.
- **No** uses tarjetas grandes con bordes redondeados, etiquetas tipo píldora ni botones CTA rellenos para la navegación de archivo habitual.
- **No** ocultes las entradas de registro diario solo con renderizado JavaScript.
- **No** permitas que las imágenes importadas, las URL largas, los bloques de código ni los encabezados de diario creen desplazamiento horizontal en móvil.
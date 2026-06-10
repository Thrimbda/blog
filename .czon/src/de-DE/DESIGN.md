---
name: "c1 Blog"
description: "Ein beständiges Terminal-Papier-Persönlichkeitsarchiv für Aufsätze, Tagebucheinträge und importierte Gesprächsfragmente."
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

# Designsystem: c1 Blog

## 1. Übersicht

**Kreativer Leitstern: „Terminal-Papier-Archiv“**

Das visuelle System kombiniert warme Papierfarben mit einem terminalähnlichen Monospace-Rhythmus. Es ist bewusst ruhig gehalten: Der Inhalt, die Chronologie und die schlichte Navigation sind die Benutzeroberfläche. Das Design soll gepflegt und persönlich wirken, nicht in ein glattes Standard-Publikationsprodukt poliert.

Die aktuelle Website verzichtet auf dekorative Oberflächen. Linien, Klammern, ASCII-Zeichen, Textlinks und schmale Lesespalten tragen die Identität. Zukünftige Arbeiten sollten diese Sprache beibehalten und die Lesekontinuität, die responsive Anpassung und die Zustandsklarheit verbessern, ohne kartenlastige Layouts oder Marketing-Seiten-Kompositionen einzuführen.

**Hauptmerkmale:**
- Textorientiert, wenig Verzierung, hohe Kontinuität.
- Warmes Papier im hellen Modus und braun-schwarzes Papier im dunklen Modus.
- Monospace-Serifen-Fallback durch die benutzerdefinierte `Dashes`-Schriftart.
- Dünne Linien und Klammer-Steuerelemente statt gefüllter Widgets.
- Statik-first-Verhalten mit JavaScript als progressive Verbesserung.

## 2. Farben

Die Palette ist ein warmes Archivpapier-System mit einem zurückhaltenden blauen Link-Akzent und einem violetten Besuchs-Zustand.

### Primär
- **Link-Blau** (`#1f4d8f`): Der einzige starke interaktive Akzent im hellen Modus. Für Inline-Links und wichtige Navigations-Hinweise verwenden.
- **Besucht-Violett** (`#6a537d`): Erhält die browserähnliche Besuchs-Semantik, ohne dekorativ zu wirken.

### Neutral
- **Papierhintergrund** (`#f6f1e8`): Standard-Seitenhintergrund und dominierende Oberfläche.
- **Erhöhtes Papier** (`#fbf8f2`): Dropdown und kleine erhöhte UI-Oberfläche.
- **Tinte** (`#171411`): Fließtext und primäre Überschriften.
- **Gedämpfte Tinte** (`#6c655c`): Sekundäre Metadaten, Listenmarkierungen und wenig betonte Hinweise.
- **Stark gedämpfte Tinte** (`#555047`): Navigation, Steuerelemente und Metadaten, die lesbar bleiben müssen.
- **Linie** (`#d4ccbf`): Trennlinien, Rahmen, Fokus-Umrandungen und Listen-Führungslinien.
- **Dunkles Papier** (`#171311`): Seitenhintergrund im dunklen Modus.
- **Dunkles Erhöhtes Papier** (`#221b17`): Erhöhte Oberfläche im dunklen Modus.
- **Dunkle Tinte** (`#efe2d2`): Fließtext im dunklen Modus.
- **Dunkle Linie** (`#4a4038`): Trennlinien und Rahmen im dunklen Modus.

### Benannte Regeln

**Die Eine-Akzent-Regel.** Blau ist nur für Links und zentrale interaktive Hinweise reserviert. Fügen Sie keine dekorativen Akzentfarben auf langen Leseseiten hinzu.

**Die Papier-bleibt-Papier-Regel.** Bewahren Sie die warme Papieridentität, aber überprüfen Sie den Kontrast, wenn gedämpfter Text oder Steuerelemente auf getönten Hintergründen liegen.

## 3. Typografie

**Anzeigeschriftart:** `Dashes` mit lokalen Fallbacks: Georgia, Times New Roman, DejaVu Serif, Liberation Serif, Nimbus Roman.
**Körperschriftart:** `Dashes`, `monospace`.
**Label/Mono-Schriftart:** Gleiche Familie wie die Körperschrift.

**Charakter:** Die Schriftart ist bewusst gleichzeitig mechanisch und literarisch. Sie soll wie ein langlebiges Textterminal auf Papier wirken, nicht wie eine moderne SaaS-Oberfläche.

### Hierarchie
- **Anzeige** (700, `1.52em`, Zeilenhöhe von Körper geerbt): Seitentitel und wichtige Artikelüberschriften.
- **Schlagzeile** (700, `1.24em`): Abschnittsüberschriften innerhalb von Seiten und langen Beiträgen.
- **Titel** (700, `1.1em`): Untergeordnete Überschriften und kompakte Abschnittstitel.
- **Körper** (400, `15px`, `1.72`): Langform-Lektüre. Artikelbreite bei etwa `69ch` bis `70ch` halten.
- **Label** (600, `0.8rem`, `0.08em` Buchstabenabstand): Wenige Steuerelemente wie Gliederungszusammenfassungen. Label-Stile nicht über Abschnitte hinweg vervielfachen.

### Benannte Regeln

**Die Lesespalten-Regel.** Der Fließtext sollte ungefähr zwischen `65ch` und `75ch` bleiben; lange Log-Indizes können nur dann breiter sein, wenn die Datums-/Listenstruktur davon profitiert.

## 4. Erhebung

Das System ist standardmäßig flach. Tiefe wird durch dünne Linien, tonale Oberflächen, Abstände und Quellenreihenfolge ausgedrückt. Schatten sind selten und sollten strukturell, nicht dekorativ sein; der Sprachwechsel-Dropdown ist die aktuelle Ausnahme, da er über dem Header-Flow schwebt.

### Schatten-Vokabular
- **Dropdown-Anhebung** (`box-shadow: 0 0.45rem 1rem rgba(23, 20, 17, 0.08)`): Nur für kleine schwebende Steuerelemente verwenden, die sich visuell von der Seite lösen müssen.

### Benannte Regeln

**Die Flach-Archiv-Regel.** Artikel, Logeinträge und Listen erhalten keine Kartenschatten. Verwenden Sie Überschriften, Daten, Linien und Leerraum zur Strukturierung.

## 5. Komponenten

### Schaltflächen
- **Form:** Eckige Textsteuerelemente ohne Radius (`0`).
- **Primär:** Es gibt kein gefülltes primäres Schaltflächenmuster. Verwenden Sie Textlinks oder eingeklammerte Geister-Schaltflächen.
- **Hover / Fokus:** Unterstreichung bei Hover/Fokus; `1px` linienfarbene Fokus-Umrandung mit kleinem Versatz.
- **Geister-Schaltfläche:** Der Themenumschalter verwendet Klammer-Pseudo-Elemente und gedämpften Text auf dem Seitenhintergrund.

### Chips
- **Stil:** Tags sind Textlinks, die als `/tag/` gerendert werden, nicht als Pillen.
- **Zustand:** Es gibt keinen ausgewählten Chip-Stil; zukünftige Filter sollten textbasiert bleiben, es sei denn, ein stärkerer Zustand ist erforderlich.

### Karten / Container
- **Eckenstil:** Kein Kartenradius.
- **Hintergrund:** Artikel sitzen direkt auf dem Seitenhintergrund.
- **Schattenstrategie:** Keine Schatten für Inhaltscontainer.
- **Rahmen:** Dünne Linien trennen Header, Footer, Gliederungsleiste, Codeblöcke, Tabellen und Listenführungslinien.
- **Innenabstand:** Der Inhalt verlässt sich auf Seitenabstand und Zeilenrhythmus statt auf boxförmigen Abstand.

### Eingaben / Felder
- **Stil:** Native Formularsteuerelemente erben die Monospace-Familie und verwenden `1px` Linienrahmen.
- **Fokus:** Sichtbare linienfarbene Umrandungen bevorzugen.
- **Fehler / Deaktiviert:** Derzeit nicht etabliert; zukünftige Formulare sollten Zustände textorientiert und kontrastreich halten.

### Navigation
- **Stil:** Die Header- und Footer-Navigation besteht aus Inline-Textlinks unter einem ASCII-Logo. Steuerelemente verwenden eingeklammerten Text. Die Navigation umbricht anstatt auf kleinen Bildschirmen in einen Hamburger zu kollabieren.
- **Mobile Behandlung:** Der Body-Padding wird komprimiert, Beitragslisten wechseln von Führungslinien-Zeilen zu zweispaltigen/Datum-unter-Titel-Zeilen, und Dropdowns werden zu In-Stream-Panels.

### Seiten-Gliederung

Die Gliederungsleiste ist eine charakteristische Komponente für lange Beiträge. Auf dem Desktop wird sie zu einer klebrigen linken Leiste mit einem dünnen Trennstrich; auf kleineren Bildschirmen bleibt sie im Dokumentenfluss. Der eingeklappte Zustand sollte pro Pfad bestehen bleiben und darf den Artikel selbst niemals verbergen.

### Embla-Bildgruppen

Aufeinanderfolgende Bilder werden progressiv in ein Embla-Karussell gruppiert. Das Karussell soll Bilder inspizierbar halten, durch die Viewport-Höhe begrenzen und einzelne Bildbeiträge nicht verändern.

## 6. Do's und Don'ts

### Do:
- **Tun** Sie die `--bg`, `--fg`, `--muted`, `--link` und `--border` Token-Vokabular beim Hinzufügen neuer UI bewahren.
- **Tun** Sie die Langform-Artikelbreite nahe `70ch` halten und Listen-/Archivseiten um die bestehende `84ch`-Hülle.
- **Tun** Sie dünne `1px`-Linien, eingeklammerte Steuerelemente und Textlinks verwenden, bevor Sie Panels hinzufügen.
- **Tun** Sie einen Nicht-JS-Fallback für lazy-geladene oder unendlich blätternde Oberflächen bereitstellen.
- **Tun** Sie mobile, Laptop- und breite Desktop-Leseansichten auf Überlauf, Touch-Ziele und Zeilenlänge testen.

### Don't:
- **Nicht** kartenlastige Archiv-Grids, glänzende Farbverläufe, Glasscheiben oder Hero-Bereiche einführen.
- **Nicht** `border-left` oder `border-right` Akzentstreifen breiter als `1px` hinzufügen.
- **Nicht** große abgerundete Karten, Pill-Tags oder gefüllte CTA-Schaltflächen für gewöhnliche Archivnavigation verwenden.
- **Nicht** tägliche Logeinträge hinter JavaScript-exklusiver Darstellung verstecken.
- **Nicht** importierte Bilder, lange URLs, Codeblöcke oder Tagebuchüberschriften horizontales Scrollen auf mobilen Geräten verursachen lassen.
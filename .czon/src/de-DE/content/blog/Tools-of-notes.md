---
"title": "Werkzeuge für Notizen"
"summary": "Der Autor dieses Artikels blickt auf seinen Prozess zurück, verschiedene Werkzeuge für Zeitprotokollierung und Notizen auszuprobieren, darunter Excel, selbstdefinierte JSON-Schemata, automatische Zeitverfolgungs-Apps usw., konnte jedoch keine dauerhafte Gewohnheit etablieren. Auf Anraten eines Freundes begann der Autor ernsthaft, den Org Mode von Emacs in Betracht zu ziehen, und wählte als Vim-Benutzer Spacemacs für die Kompatibilität mit Vim-Tastenkürzeln. Der Autor teilt seine Erfahrungen mit der Nutzung von Org Mode für tägliche Notizen und erwähnt die Unannehmlichkeiten bei der Eingabe von Chinesisch, weshalb er stattdessen auf Englisch schreibt. Der Artikel behandelt auch den historischen Hintergrund und die Designphilosophie der Werkzeuge und thematisiert das ungelöste Problem, Org Mode anstelle von Markdown im Blog einzusetzen."
"tags":
  - "Werkzeuge"
  - "Notizen"
  - "Org Mode"
  - "Spacemacs"
  - "Zeitprotokollierung"
  - "Emacs"
  - "Vim"
  - "Produktivität"
"date": "2021-02-22"
---

Hallo zusammen! Es ist eine seeeeehr lange Zeit her, seit wir uns das letzte Mal gesehen haben, wie geht es euch?

Ich war sehr beschäftigt mit meiner neuen Arbeit bei Bytedance, und warum schreibe ich diesen kleinen Blogbeitrag auf Englisch? Ich werde es erklären.

<!--more-->

## Aufzeichnen, Reflektieren und die Werkzeuge

Ich hatte immer diesen starken Impuls, meinen Tag aufzuzeichnen, um zu sehen, was ich getan habe, und daraus Statistiken zu erstellen.
Nach einer Weile stellte ich zwei Dinge fest: Meinen Tag aufzuzeichnen und darauf basierend zu reflektieren, ist sehr, sehr nützlich. Meine Reflexionen im Juni halfen mir letztendlich, die Entscheidung zu treffen, meine Arbeit zu wechseln. Doch bei der feingranularen Zeitverfolgung bin ich immer wieder gescheitert.

Vielleicht lag es an meinen Werkzeugen. Ich probierte Excel aus, selbstdefinierte JSON-Schemata, die Time Rescue App für automatische Zeitverfolgung (stellte sich heraus, dass ich aufgrund des Rauschens nie wirklich darüber reflektierte – sie zeichnet wirklich alles auf deinem Computer auf, und Leute wie ich brauchen das nicht wirklich...), mehrere Apps auf meinem Handy... Und ich gab fast auf.

Aber ich schaffte es, mir anzugewöhnen, täglich Notizen zu machen, und eines Tages versuchte ich, einen guten Freund davon zu überzeugen, wie wichtig Notizen sein können. Er stellte Fragen zu den Werkzeugen, und das war das erste Mal, dass ich `emacs` und `org-mode` ernsthaft in Betracht zog.

Er sagte: "Mann, wir reden über Software! Kann irgendein Werkzeug etwa 5 Jahre überleben?"

Ich sagte: "Oh, in diesem Fall solltest du vielleicht `org-mode` in Betracht ziehen."

Ich weiß, er war scherzhaft pingelig mit meiner Empfehlung, aber mir kam der Gedanke: "Warum probiere ich es nicht einfach aus?"

## Spacemacs und Org Mode

Ich bin seit zwei Jahren Vim-Benutzer, ich liebe Vim und war lange Zeit sehr begeistert davon (ich stieß immer auf etwas und dachte, es sei die ultimative Lösung – für Vim, für Scala, usw.). Jetzt weiß ich, dass es nur ein Werkzeug ist, das es in den letzten 30 Jahren geschafft hat zu überleben. Vieles in seinem Design hat historische Gründe und ist nicht so, weil es so sein sollte (als Erkenntnis: Vielleicht interessiert dich [warum](https://www.youtube.com/watch?v=0M6erlK57go&ab_channel=MikeZamansky), es ist ein sehr gutes Video, das aus historischer Perspektive erklärt, warum Emacs und Vim so gestaltet sind).
Und was macht ein Vim-Benutzer, wenn er etwas aus der Emacs-Welt in Betracht zieht? Natürlich etwas wie Spacemacs: Emacs mit Vim-Tastenkürzeln, ja, sie können in Harmonie existieren.

Dann könnt ihr euch vorstellen, wie ich anfing, Spacemacs (hier ist meine [Konfiguration](https://github.com/Thrimbda/.thript)) und Org Mode zu nutzen. Ich lerne immer noch, gewöhne mich an das Werkzeug und begann, meine täglichen Notizen mit Org Mode aufzuzeichnen. Doch ein Problem konnte ich nicht lösen: Es fühlt sich unnatürlich an, Chinesisch mit Vim-Tastenkürzeln zu schreiben, und ich habe noch keine gute Lösung dafür gefunden. Deshalb schreibe ich dies auf Englisch. Außerdem fühlt es sich anders an, wenn man eine andere Sprache spricht, wie eine andere Person. Ihr werdet mich wahrscheinlich nie so explizit über mich selbst murmeln hören.

Trotzdem ist es schön, mit euch allen zu sprechen :)

Außerdem habe ich noch keine gute Lösung gefunden, um Markdown in meinem Hexo-Blog durch Org zu ersetzen...
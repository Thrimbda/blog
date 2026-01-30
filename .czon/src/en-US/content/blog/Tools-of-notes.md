---
"title": "Tools of notes"
"summary": "本文作者回顾了自己尝试多种时间记录和笔记工具的过程，包括 Excel、自定义 JSON
  模式、自动时间追踪应用等，但均未成功形成习惯。在朋友的建议下，作者开始认真考虑使用 Emacs 的 Org Mode，并作为 Vim 用户选择了
  Spacemacs 以兼容 Vim 键绑定。作者分享了使用 Org Mode
  记录每日笔记的体验，同时提到输入中文时的不便，因此改用英文写作。文章还探讨了工具的历史背景和设计哲学，并表达了在博客中使用 Org Mode 替代
  Markdown 的未解难题。"
"tags":
  - "Tools"
  - "笔记"
  - "Org Mode"
  - "Spacemacs"
  - "时间记录"
  - "Emacs"
  - "Vim"
  - "效率"
"date": "2021-02-22"
---

Hi everyone! It's been a looooong time since we met the last time, how have you been?

I've been very busy with my new work at Bytedance, and why am I write this lil blog post in English? I'll explain.

<!--more-->

## record and reflect and the tools

I always had this strong impulse of record my day, to see what I was doing, make a statistic about it.
After a while I found two things: record my day and have a reflect base on that is very very useful, what I reflected during June eventually helped me to make that decision to change my work. Yet for fine-grained time tracking, I kept failing every since.

Maybe it was something about my tool, I tried excel, self-defined JSON schema, Time Rescue App for auto-time tracking (turns out I never really reflect on that because of the noise, It literally record every thing on you computer, and people like me don't really need that..), Several Apps on my phone... And I almost gave up about it.

But I managed to make it a habit to record notes for my day, and one day I was persuading one of my good friend about how important it could be to make notes, he questioned me about the tools, that the first time I considered `emacs` and `org-mode` seriously.

He said: "man, we are talking about software! Could any tool survive for like 5 years?"

I said: "oh on that occasion, maybe you'd consider `org-mode`."

I know he was jokingly being picky about my recommendation, but it occurred to me: "what about give it a try?"

## Spacemacs and Org Mode

I am a vimer for two years, I love Vim and got fever on Vim for a long while (I always ran into something and thought it was the silver bullet, for vim, for Scala, etc.) Now I know it's just a tool managed to survive over the last 30 years. a lot of it's design is for historical reasons and not because of it should be like that (for take away, maybe you are interest of [why](https://www.youtube.com/watch?v=0M6erlK57go&ab_channel=MikeZamansky), it's a very nice video telling you why emacs and vim are designed like this from a historical perspective).
And what would a vimer do when he was considering something from the emacs world? Naturally something like Spacemacs: emacs with vim key bindings, yes, they could be in harmony.

Then you could guess how I started using Spacemacs(here are my [config](https://github.com/Thrimbda/.thript)), and org mode. I am still learning, getting used to the tool, and started record my daily notes using org mode, yet one thing I could not resolve: it unnatural to type Chinese with Vim key binding I have not find a good solution for that. That's why I'm writing this using English, Also it feels differently when you're speaking another language, feels like a different person, you probably could never see me muttering things about myself in such a explicit flavor.

Still, it's nice to talk to you all :)

Also I have not find a good solution to replace markdown with org in my hexo blog...
---
"title": "Tools of notes"
"summary": "本文作者回顾了自己记录日常和反思的习惯养成过程，最初尝试了多种工具如 Excel、JSON
  和自动时间追踪应用，但都未能坚持。在朋友的质疑下，开始认真考虑使用 Emacs 和 Org Mode。作为 Vim 用户，作者选择了 Spacemacs
  以结合 Vim 键绑定和 Emacs 功能，并开始用 Org Mode 记录每日笔记。然而，中文输入与 Vim
  键绑定的兼容性问题仍未解决，因此本文用英文撰写。作者还提到在 Hexo 博客中用 Org 替代 Markdown
  的挑战。文章核心在于分享工具选择对习惯坚持的影响，以及语言切换带来的不同表达体验。"
"tags":
  - "Tools"
  - "笔记"
  - "Spacemacs"
  - "Org Mode"
  - "Vim"
  - "时间管理"
  - "习惯养成"
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
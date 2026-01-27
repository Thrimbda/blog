---
"title": "Reflections After One Year Full-Time at NTNL"
"summary": "This article is the author's review and reflection on one year of full-time work at the quantitative trading startup NTNL. It details the team's journey from early model experiments and the painful failure of the NTNL-001 fund, to adjusting direction and establishing new main focuses (developing the Yuan platform, operating the NTNL-LTS fund, and developing proprietary models). The author summarizes key mistakes, such as misdirection in strategy, immature fund operations, and failure to grasp the principal contradiction, and shares the team's current status and challenges in tool development, model research, and financial situation. Finally, the article looks to the future, emphasizing principles like adhering to facts, learning from experience, and focusing on the principal contradiction, and expresses an attitude of pursuing an intense life on the entrepreneurial path."
"tags":
  - "Work Log"
  - "Quantitative Trading"
  - "Entrepreneurial Reflection"
  - "NTNL"
  - "Yuan"
  - "Fund Operations"
  - "Failure Lessons"
  - "Team Management"
"date": "2023-07-31"
---

*Breaking the "Curse of Momentum, Decline, and Exhaustion"*

As we are about to embark on the productization of Yuan, team members are eager to start a brand new journey. However, I feel it's necessary to look back on the past two years of work at NTNL, to recall our journey, our original aspirations, our efforts, and the detours we've taken.

Max Weber, the founding father of modern sociology, offers a key critique of capitalism in *The Protestant Ethic and the Spirit of Capitalism*: instrumental rationality (methods, means) ultimately triumphs over value rationality (purpose, values). People achieve their initial ideals but become aimless zombies.

I'm writing this article firstly to summarize, to document our past failures to avoid stumbling over the same stone twice; secondly, to keep our original aspirations alive. And also to boost my own morale.

**No Trade No Life—Change the World by trading. Aschente!**

## The Beginning

In April 2021, NTNL launched its first model for cryptocurrencies. As an investor, I put all my on-chain 1580 USDT into it. Ten minutes after deployment, that 1580 USDT became 1740 USDT; three months later, the model's lifecycle ended, and I ultimately received 2400 USDT.

This was my true enlightenment moment regarding quantitative trading: it can genuinely achieve "passive income."

Unfortunately, that model's lifecycle ended too early; we didn't make much money from it.

Fortunately, that model's lifecycle ended too early; it gave us the opportunity to start NTNL's venture.

## Prehistory

After the initial success of the first model, the NTNL team began attracting more classmates, colleagues, and friends interested in making money through quantitative trading. We started participating in some development work on a part-time basis.

However, for nearly a year, our progress was slow. The code we wrote back then is now completely useless. After JQ joined and introduced many team and institutional innovations, we began to find our footing. But then we were hit by the Shanghai pandemic lockdown, and all work came to a standstill.

Until May 14, 2022, when CZ called me, believing that copy trading based on external signal sources held great potential. So we got to work immediately. We started developing the copy trader Yamcha that very night and launched it two days later, marking a new phase for the NTNL team.

---

With the launch of the Yamcha copy trader, many things began to accelerate:

* CZ left ByteDance on June 6 and started working full-time at NTNL.
* I left ByteDance on July 16 and started working full-time at NTNL.

Initial results were promising. Copy trading signal sources brought our net value to 2.16 within a week. We couldn't help but check the charts daily, our moods fluctuating wildly with the net value. But overall, with the rapid rise in net value, everyone's expectations for the future were high.

But soon, we encountered our first major failure: the NTNL-001 fund suffered losses of up to a million.

What caused this failure? The relevant information is still relatively easy to find a year later:
- In the first week of the fund, we missed an opportunity for the net value to peak at 2. That was the first time I saw CZ become emotional after we went full-time.
- 2022-06-30: Insufficient Margin Crisis - I had just moved from Minhang to Yangpu that day, with luggage scattered everywhere at home, when we encountered a situation where excessive order volume led to insufficient margin, preventing further orders.
- 2022-07-07: Fund Single-Day Drawdown of 50% - An excruciating afternoon. I watched helplessly as the net value dropped from 220,000 USD to 90,000 USD, feeling powerless to do anything.
- 2022-07-14: Expectation Adjustment - Another week passed, and we experienced another huge loss. By then, the NTNL-001 net value had drawn down 66% from its peak. From that point on, we realized this mode of operation was unsustainable. Not long after, the NTNL-001 fund was declared a failure.

Recent experiences occupy more mental space. Back then, fresh from this massive defeat, we were still in the throes of significant emotional turmoil, unable to calmly examine our mistakes and learn effectively from them.

Therefore, looking back a year later, what mistakes did we make, and what can we learn from them?

**Ignorance led to a fundamental directional error.** After observing a signal source's performance for a few months, we assumed the observations had statistical significance and proceeded with copy trading. The specific copy trading method even devolved into a [cargo cult](https://en.wikipedia.org/wiki/Cargo_cult)-like dogmatism. Under the immense temptation of already making profits, no one could remain rational enough to pause and carefully examine the risks we were facing. Even after experiencing a 50% fluctuation in fund net value within an extremely short period during the second week of operation, we made no changes to our operational methods; instead, we became more aggressive. Ultimately, when the already shaky foundation—the assumption that the performance of a black-box signal operated by an emotionally unstable human had statistical significance—began to crumble, all investors lost money.

**Immaturity in fund operations.** After the fund started, driven by the original intention of wanting everyone at NTNL to make money together, we extensively invited NTNL members to participate in the NTNL-001 fund. Although we made no promises regarding capital preservation or profits, the eventual failure did, in fact, harm our investors, which in turn damaged our own business credibility. More importantly, it created pressure for our subsequent fund operations, pushing us towards excessive conservatism.

**Failure to accurately grasp the principal contradiction.** Inaccurate understanding of the team itself. We didn't clearly identify our own strengths and weaknesses. Given that each of us came from software engineering/computer science backgrounds and our primary professions were as programmers, not professional finance practitioners, we blindly believed that this human-operated signal could bring us rapid success. We became engrossed in it, dedicating a massive amount of effort to what now appears to be utterly useless work. In short, we expended enormous human resources and effort on secondary issues, failing to grasp the principal contradiction.

## Establishment of the New Main Focus

After the devastating failure of the NTNL-001 fund, we reflected deeply on our pain and decided to change direction:

1.  Build Yuan, as a one-stop platform for quantitative development, research, debugging, and deployment.
2.  With the addition of several signal sources and summarizing past lessons, we launched the NTNL-LTS fund composed of multiple signal sources.
3.  Proprietary model development was put on the agenda.

Why were these three routes determined?

"A craftsman must first sharpen his tools if he is to do his work well." We believed the bottleneck in productivity was the lack of good tools. We suffered too many losses and invested too much firefighting energy on NTNL-001 due to insufficient tools. Therefore, we deemed it necessary to improve our tools.

Simultaneously, since both CZ and I were now full-time, facing the problem of no stable income, we had to find ways to sustain revenue. However, at that time, we had no profitable models in hand. Therefore, external signal sources obtained through business channels became our hope for profitability.

But external signal sources are, after all, black boxes. On one hand, this means we cannot confidently assess their performance (insufficient trading duration, strategy changes mid-way, etc.). On the other hand, we cannot widely apply external signal sources to more markets and instruments, limiting the imagination for profitability. Therefore, we could never abandon the possibility of proprietary model development. External signal sources were merely a transitional substitute until enough diverse proprietary models were developed.

Since the routes were established, from August 2022 to now (July 2023), we have been diligently working on these three main focuses. Corresponding records have also increased: bi-weekly reports, annual reports, and quarterly reports are all documented.

The specific events during this period are not the focus of this article. I want to discuss, from today's perspective, what new challenges emerged when reviewing this period? What experiences can we summarize? And have we fully absorbed and learned the lessons from the NTNL-001 failure? Similarly, I want to summarize by listing some key points I consider crucial from this period.

**We still took detours in our chosen routes.** This manifested as excessive energy investment in external signal sources. From August to April, we hardly realized the need to shift energy to model development. Development efforts were overly concentrated on analyzing external signal sources. At the time, this was actually a reasonable choice. Describing this choice as "taking a detour" is a qualitative assessment in hindsight. The reason is, we didn't know back then that the stability of external signal sources and the quality of the signals themselves were so poor. Looking back, almost all the external signals we obtained were variations of martingale/oscillation strategies—looking impressive but capable of wiping out all previous gains with a single failure. Such issues ultimately led us to abandon the route of relying primarily on operating external signal sources for income.

**The NTNL-LTS fund reached a scale of 3 million RMB.** Despite taking a detour in the signal operation route, we must acknowledge the positive significance of this period: the NTNL-LTS fund, based on large-scale external signal source operation, once reached a net value of 1.04. This allowed us to attract more capital than during the NTNL-001 period. Although currently (2023-07), due to stalled model development, the fund's net value has also stagnated, that is another issue.

**Yuan has matured.** The development of Yuan itself is our most important achievement over the past year. It has played a pivotal role in external signal source research, model development, research, account copy trading, and deployment. From a strategic perspective, this is us playing to our strengths. Our previous academic and career paths were concentrated in software engineering/computer science/internet fields. We excel at leveraging internet thinking and technology to deeply penetrate and empower other industries. Additionally, although frequent signal source integrations and password changes frequently interrupted daily development work, the heavy demands of signal source analysis conversely promoted the improvement of Yuan's own analytical tools. This enabled us to quickly identify risks and issues like holding losing positions beyond attractive net value curves, which further provided significant help when researching our own models.

**Part-time human resources for Yuan have gradually dwindled to zero.** This is probably a concrete manifestation of "momentum, decline, and exhaustion." Since part-time work itself lacked decent incentives, contributing to engineering development lacked clear contribution guidance, and encouraging people to develop models for large profit shares was very difficult. Ultimately, as of July 2023, our actual manpower is down to about 3 people. Until there are new incentives or guidance for part-time personnel, it will likely remain in this state. Behind this lies issues of management and incentives. In the future, if Yuan goes open-source and commercial, we will still face similar problems.

**Our financial situation has worsened.** Since CZ still has some cash savings, he can manage without drawing a salary. However, I draw a monthly salary. This money, of course, doesn't fall from the sky. CZ and JQ jointly purchased bonds issued in NTNL's name. To date (2023-07), 300,000 RMB worth of bonds have been issued. This is currently the heaviest burden on our shoulders. Under the pressure of survival, our time is very, very tight.

**We have several usable models.** Currently, proprietary models have completely replaced external signal sources, far exceeding the combined breadth and depth of the previous hundreds of signal sources across markets and instruments. More importantly, the diversity in the strategies and types of the models themselves will make our risk management easier and more natural. The models themselves may change our income structure and alleviate the immense financial pressure we face.

---
The human factor is the most important. All the above lessons and achievements were brought about and realized by us as subjective individuals. Looking back two years to when we first started working on NTNL-related tasks, our understanding of what we were doing was very, very shallow. For example, I myself had no idea from what perspective to even view this endeavor.

![](upload://inRWoJb02gFqO3cYa8ykFwepsGp.png)

This is a discussion with CZ about the NTNL venture from two years ago. When we were envisioning the future and discussing the feasibility of this endeavor at a theoretical level, we had no idea of the intense experiences we would undergo in practice. Two years later, we have completely different understandings of the things we discussed back then. In summary, through hands-on practice, we made many, many choices. With our choices came corresponding feedback, leading to suffering or joy—and the doses of both pain and happiness are far greater than before starting this venture.

"Knowledge gained from books is ultimately shallow; to truly understand something, one must practice it personally." Practice is the sole criterion for testing truth. Entrepreneurs can have lofty ideals, but they must be materialistic—all ideals must be rooted in the soil of reality. We must always make choices boldly yet cautiously, and then grow through the feedback.

## What Will the Future Be Like?

Currently, our work focuses on two main points:

1.  Continuously optimizing and researching models
    1.  Minimum program: The models can support the personal lives of CZ and myself.
    2.  Maximum program: Raise funds from the outside world as a private fund product.
2.  Commercialization of Yuan as a product. We need to formulate a product commercialization roadmap and seek venture capital financing.
    1.  Minimum program: Open-source part of Yuan's capabilities, at least helping some people.
    2.  Maximum program: Successfully secure financing, complete commercialization, and impact more people.

We have been through tougher times than now. It's safe to assume the future will still be difficult, perhaps even more so than before. But there's no reason to believe the future is hopeless.

However, we must also adhere to certain principles:

1.  Adhere to seeking truth from facts, considering everything based on reality, and not avoiding any problems.
2.  Persist in learning from past experiences.
3.  Uphold idealism—this is both our blessing and curse—so we must always remember to seek truth from facts.
4.  Persist in working scientifically and happily. Even if we have to exploit ourselves more harshly than any capitalist, we must do so in a sustainable way.
5.  Persist in grasping the principal contradiction, understanding the current situation and our expectations, and planning a path based on our best understanding.

## Postscript

I still want to conclude with this poem by Keats:

> Why did I laugh to-night? No voice will tell
> No God, no Demon of severe response,
> Deigns to reply from Heaven or from Hell
> Then to my human heart I turn at once:
> Heart! Thou and I are here sad and alone;
> I say, why did I laugh? O mortal pain!
> O Darkness! Darkness! ever must I moan,
> To question Heaven and Hell and Heart in vain.
> Why did I laugh? I know this Being’s lease,
> My fancy to its utmost blisses spreads;
> Yet would I on this very midnight cease,
> And all the world’s gaudy ensigns see in shreds;
> Verse, Fame, and Beauty are intense indeed,
> But Death intenser – Death is Life’s high meed.

I once wrote about my thought process upon seeing a senior colleague's painful yet transformative moment shared on social media—that was my initial understanding of this poem.

Until today, now that we ourselves have been full-time entrepreneurs for over a year. Rereading this poem repeatedly, I feel a different kind of poignant taste. Where are we headed? No higher being can answer that. Engaging in trading has taught me one thing: in the real world, no decision can be made with completely sufficient information. This means all our decisions carry an element of gamble, and wins and losses come with different costs depending on our position, regardless of fairness. The world is a lousy game.

As humans, we must engage with the world we live in, exerting creativity through work to find our place within it, changing both nature and ourselves. Work should be fundamental to defining our humanity. As entrepreneurs in this era, in this "lousy game," we have no means of production; we ourselves are the means of production, we are the tools themselves. We cannot create purely poetically. So, we must be prepared to exploit ourselves more harshly and more sustainably than any capitalist, accelerating our pace through more information intake and exchange, more bursts of inspiration, and more arduous efforts. And we hope to make a small contribution to this world through this, to create a world where people can work poetically.

So, looking back at this line, `Then to my human heart I turn at once`—we can only turn inward and ask our own hearts, see if this heart is still bright, if it is purely of heavenly principle. Then see if this heart of ours can withstand tempering in concrete matters, bear multiplied pain, seize multiplied joy, and achieve the unity of knowledge and action.

Different paths lead to the same destination. I still believe today: in the limited span of human life, what one should pursue is perhaps this **Intense**. As long as breath remains, we must forge ahead, be like the tree on the mountain Nietzsche spoke of—though tormented by unseen fierce winds, we must still stretch our roots powerfully into the earth, downward, into the darkness, and then stand alone atop the mountain peak, welcoming the lightning. Use an intense life to meet that intense death.
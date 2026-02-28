---
title: 2020 Work Log
date: 2020-01-01
taxonomies:
  tags:
    - Work Log
    - Monthly Summary
    - Technology
---

### 2020-04-13

- Completed self-performance evaluation
- Revisions for Lane Center Aggregation

### 2020-04-14

- [ ] Speed limit compilation
- [ ] Custom speed limit

### 2020-04-15

- Determined custom speed limit solution with @guangcong
  1. Use a new module-dynamicEvent to solve this problem
  2. Custom speed limit updates trigger horizon data updates as a new event
  3. Need to consider exception handling and memory issues
     After discussing with Guangcong, he encountered some problems
- Xiaokang's review
  Java, as a solid language, still has a lot to offer
- Speed limit compilation
  Basically no progress, added logic for extracting RoadCenterTile
- Solved Sectioning issue, analyzed edgeLifting optimization plan, proposed optimization algorithm:
  Given traverse head and connectivity function, provide traversal method
- Researched the principle of self-executing Jars

### 2020-04-16

- Clarified custom speed limit interface with Yiming: He guarantees the input location pair can uniquely determine a shortest route
  Returned and discussed the algorithm for generating custom speed limits with Guangcong
  1. Given a route
  2. Known | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1
     Then a pair (start DiRoadOnPath, end DiRoadOnPath) that yields the shortest distance can definitely be found
- Provided Xiaokang with a temporary usable snapshot version pylon-v0.1.1 compiler
- Went downstairs for a random walk and chatted with Hanteng
- Clarified SUMO map usage interface with Zizhe and Yicheng
- Speed Limit compilation succeeded but not yet verified

### 2020-04-17

- SpeedLimit compilation verification:
  OSMSerializable is not quite suitable because SpeedLimit after binding has no geometry
  Potential issue: Speed limit binding might have problems when ramps merge
- [ ] Interpolation
- [ ] Hausdorff distance
- [ ] LcInJunctionTile

#### Some Random Thoughts

- Go directly with Spark?
- What does OSM's Context need?

### 2020-04-18

Completed speed limit work.

### 2020-04-20

#### Custom Speed Limit

- Guangcong changed the input to a vector and added tests
- A minor issue is that Guangcong doesn't truly understand how C++ pointers work
- [ ] Maybe try to solve [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337)?
- [ ] Make the file shared by Uncle available for anonymous sharing via Resilio Sync

#### RoadBorder Fix

Found that I made a wrong assumption. The lc and rb information recorded in rc might have:

1. Only one lc, so cannot assume lc has at least two
2. rb on one side might not exist, so cannot assume rb always exists

### 2020-04-21

#### RoadBorder Fix

- Completed migration of test cases
- Improved Dune and its ReadMe so it can directly output test data
  Chatted with Weiyu, looking to the future, I will focus on the compilation system

#### Opposite Lane POI Binding

- Binding for data after multidigitize

### 2020-04-22

#### Opposite Lane POI Binding

- Binding for data after multidigitize
- Construct test data

### 2020-04-23

- Completed opposite lane POI binding and finished debugging [4]

### 2020-04-27

Main tasks today:

#### Completed synchronization of mdm proto and mdm spec

1. Modified incorrect parts in the mdm spec with Linnan
2. Left several pending items that Linnan and I couldn't decide alone
3. Decided in the 2020-04-26 morning meeting to postpone the most troublesome modifications for LaneSplitMerge and Polyline
4. Completed proto modifications
5. Completed nexus modifications
6. Completed mdk modifications
7. Also incidentally fixed a test data issue (tons of data errors reported)

#### Bug Fixes

Approaching the 430 release, bug count surged.

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analysis completed

- [ ] Script for automatic test case copying
- [ ] Export apple reminder

### 2020-04-28

Spent half a day taking the driving theory test (Subject 1)

HDMAPMDK-1130 width issue, three problems

1. Spec states no lane width during lane change
2. Split line caused by intersection line being too long

HDMAPMDK-1121 re-fix

State is terrible.

### 2020-04-29

#### Bugfix

- HDMAPMDK-1143
  RoadObstacle not being compiled
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Use mill
- Use nexus-osm

#### Brainstorm

### 2020-05-08

#### Memory Leak Issue

- Direct cause of memory leak is not deleting after new-ing a wild pointer
- After updating current position, map kit calls prepareGuidanceData to find the guidance data closest to the current position
- prepareGuidanceData calls NavInfoProviderImpl::getTrafficLights & NavInfoProviderImpl::getCarParks
- Taking NavInfoProviderImpl::getTrafficLights as an example, it new-s data pointers in NaviEventOnPath when called
- However, they are not deleted
- Also found DestEvent has this issue

Solution: The core is to disallow wild pointers. Decided to refactor NaviEventProvider.

- First, add two fields traffic*light_events* & car*park_events* to NaviInfoProvider
- In NaviInfoGenerator, update these two fields after route is updated
- Then filter based on current vehicle position during each get call
- Therefore, need to refactor `PathReader::getAttributes` because the previous implementation only considered offset relative to the current vehicle; now need an interface for offset relative to the Path

### 2020-05-09

#### PolyLine Fix and Testing

The main issue with PolyLine is that duplicate points might be added during PolyLine generation, leading to a series of geometry-related segment calculation problems:

1. Vector calculation, two duplicate points result in a zero vector
2. Length calculation, segment length is 0, easily causing NaN issues

Therefore, when constructing PolyLine, check the points in PolyLine. If duplicate points are found, throw an exception.

Found the following issues:

- Problems with getEnd in Jts
- Jts LinearLocation has a normalize issue

  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // the output is -1
  ```

- Interpolate might pick two points that are too close

### 2020-05-11

- HDMAPMDK-1122
  Could not reproduce missing road edge line issue, decided not to spend more time investigating
- Half-hour on metabolic growth theory
- Refactored Visitor to support lines with same start and end points
- Prepared an interview question

### 2020-05-12

- Interview: Both candidates unqualified. Thought about how to quickly screen candidates. Took 3 hours.
- Bugfix: HDMAPMDK-1211 Deleting wrong border issue, not fixed successfully in the last fix.
  Had an idea but didn't finish writing.
- Went to the gym.

### 2020-05-13

Bugfix: HDMAPMDK-1211 Thought of a solution.

- Root cause is unreasonable production line segmentation.

#### Root Cause Analysis

It can be seen that segmentation occurs before the lane change is complete (lane centerline is still crossing the lane line), and this segmentation might cross Rps.

The lane border observation information attached to lanecenter shape points faithfully records lane lines on both sides based on geometry using scan line method, without semantic filtering. Therefore, at positions where lane lines cross lanes, the lane centerline intersecting the lane line will record that lane line on both left and right lane border refs.

Under the current code logic, when filtering intersecting lane line border refs based on semantics, the border refs to be deleted are inferred based on the lane change type.

The current logic fails when encountering this type of segmentation, leading to this problem.

#### Solution

The core is to **find the lane change trend of the intersecting lane line**. Considering this segmentation might cross rps, filtering should not be done per rp.

1. First, organize lane lines into paths using edge lifting (can consider future graph refactoring): Seq[LaneCenter]
2. Find the lane Center to be fixed and the lane border to be fixed (assume such lane Centers are caused by lane changes)
3. Calculate the lane change trend of this LaneCenter based on the laneCenter path
4. Perform filtering

Assigned to Ziliang.

Interviewed one person, didn't pass.

### 2020-05-14

HDMAPMDK-1132 Id tracing for pole sign lane line endpoints.

The tracing problem for pole sign lane line endpoints is much simpler compared to linear object tracing, involving only Id mapping, not offset and length mapping.

However, there are still many issues to consider:

1. Procedure
2. Id Typing System is a persistent issue that needs to be addressed.

Essentially, the root of this problem is that we used Long Ids for all definitions, while MDM definitions use Int, which could cause overflow issues.

### 2020-05-15

#### Bug Fixes

- HDMAPMDK-1215 completed
- HDMAPMDK-1218 Done

### 2020-05-18

Refactored OSM Assembler, used previous OSM serialize, improved code understandability and ease of writing.

### 2020-05-19

Fixed a bug in OSM Assembler (not really a bug).

Had sprint planning meeting today:
Not many tasks this sprint, but a lot to think about. This is a healthy state.

### 2020-05-20

- [ ] Write documentation describing current nexus/mdk CI status and requirements.
- [x] Follow up on HDMAPMDK-1263 bug
  - Indeed a production line segmentation issue
- [ ] Schedule meeting with Yang Chuan to discuss CI
- [ ] HDMAPMDK-1262
      Didn't finish
- [x] Custom Speed Limit issue

### 2020-05-21

#### TODOs

- [x] Greet Qiaobo
- [x] HDMAPMDK-1262
- [x] HDMAPMDK-755

#### Works

- Went to Yiming's workstation in the morning for online debugging of yesterday's hotfix. The cause was an offset issue. Wrote it too hastily yesterday and didn't add any tests. This kind of behavior should not happen again. Thought I saved a lot of time, **but ended up wasting more time**.
- The reason for not getting data in 1262 is that MDK didn't load lane-level road marks (and road obstacles)
- Helped Brother Du compile data.

### 2020-05-22

What did I do today???
What did I do???

### 2020-05-25

Received a new task today: HDMAPMDK-1249 - Research method for calculating lane aggregation using road geometry information. This increased the tasks for this week. Currently, I have three things to do:

1. 1249
2. Current status, requirements, and plan for team CI Pipeline
3. Nexus graph refactoring

Each task requires careful thought and is not easy. Unfortunately, I cannot accurately estimate the time for each task. They are just estimated by Weiyu and written as story points in the jira tasks. One thing I'm clear about: **If I don't start estimating and reviewing, I'll never estimate accurately**. So from now on, I need to estimate carefully.

Also, I plan to start 1249 today because it's a business-related matter, generally more urgent, and Weiyu cares more about it. As for refactoring, if I don't care about it myself, probably no one else will (because it's harsh; it doesn't affect functionality but affects efficiency, and efficiency is the hardest to measure. Even I only have qualitative analysis).

### 2020-05-26

Many unexpected things happened today. First, parking reported two bugs. Originally planned for delivery today, but due to these bugs, delivery couldn't happen today. Wang Wei negotiated with downstream to postpone delivery by two days to the day after tomorrow. So my main work for these two days became fixing bugs again. This made me think about whether the scheduling during delivery is reasonable. Then there was the HDMAPMDK-1290 issue.

Tasks completed today:

- Follow-up on HDMAPMDK-1290: When extremely close to the stop line, the matched lane offset can be longer than the lane length.

  > Spent almost the whole day investigating and trying to solve this problem (currently 8:56 PM). Efficiency was very low.

  The root cause is that MDK calculates length by calculating the length between every two points and then performing a coordinate transform. Although this is more accurate, it makes the result highly uncertain.

  Finally used a hacky solution: if the calculated offset is longer than the length, just take the length.

- HDMAPMDK-1297 Incorrect parking space binding.
  Although it's almost the original off-work time (9 PM), I must at least analyze this problem today!
  Sigh, got it done. Turned out to be a simple problem.

### 2020-05-27

Today, barring any surprises, I should finish the CI Pipeline task.

But there was a surprise - -

Received bug feedback from Yiming:

1. Traffic light binding: Traffic light that should be bound to the waiting area was bound to the partition before the waiting area. Fixed (1.5h)
2. Missing traffic light binding: Could not reproduce.
   Update: After a difficult round of debugging, finally found the problem. During compilation, the geometry used for rc and offset binding were not the same line, causing the offset to exceed the road length, so the traffic light couldn't be found (2h)

### 2020-05-28

Driving test (Subject 2) tomorrow, practiced driving all day today, returned at 5 PM. Feeling good, hope to pass tomorrow.

Started describing the current status and requirement analysis for CI Pipeline - -

### 2020-05-29

Didn't pass. Sigh, it's so hard for me.

Went for the test in the morning, did a few things in the afternoon.

1. Went to Yiming's place to check an abnormal situation, turned out to be two bugs.
2. After the afternoon townhall, synchronized about the MDK python binding.
3. Went downstairs with Shan Le and Weiyu to solve a downstream issue. Finally summarized a short-term solution and a long-term solution.

I found that when encountering unexpected problems, the general problem-solving method should be this pattern:
A short-term solution and a long-term solution. Because the value exposed by the problem is certain and has timeliness. Therefore, the short-term solution focuses on quickly and accurately solving the urgent need. Is a long-term solution still needed? Generally yes, because a specific case of a problem reflects a blind spot in previous solutions that wasn't considered. Analyzing the cause of the problem and systematically solving it allows this type of problem to be well solved in the future, making the original solution more complete. There are also cases where a long-term solution is not needed, that is, after **thorough analysis** we conclude that the cost of systematically solving this problem is higher than the benefit. (Even so, in most cases, we subjectively still want to solve it systematically. As an engineer, who doesn't want to solve problems systematically? But this also leaves a trap, making people possibly solve important but not urgent matters, or matters that are neither important nor urgent, thus wasting precious time that could be used to solve other more valuable problems.)

4. Continued working on CI Pipeline after returning in the evening.

### 2020-06-01

Went to Yiming's place first thing in the morning to analyze a problem, spent the whole morning. The result was a known previous issue (point loss caused by interpolation in the old compiler) leading to another problem: during road capture, exactly near the missing segment, causing lane offset to be negative.

Worked until 4 PM. After a period of inefficient and painful overtime (feeling that in the current state, as long as I work overtime, it basically correlates with inefficiency).

### 2020-06-02

Came in the afternoon. For Yiming's on-vehicle work, solved some bugs, caught up with Yiming's evening on-vehicle work.

### 2020-06-03

Went to help Yiming solve the problem found last night first thing in the morning, which was not getting traffic lights.

### 2020-06-04

Three things to do this morning:

1. Data cleaning and uploading final 0605 data
2. Check width anomaly issue - because there is no lane at that position
3. Check interpolation point assigning wrong lane issue
4. Review

### 2020-06-05

A tense and exciting day. Completed HDMAPMDK-1347 and HDMAPMDK-1352, and also did a major refactoring.

Learned a valuable lesson: Don't make huge changes close to delivery. Because without sufficient QA testing, no matter how awesome the refactoring is, it might bring risks. Also, without enough time for design review (I mean by myself, because sometimes while writing, I might find the design is wrong. However, discovering design issues during implementation is another problem - starting too early).

Monday addition:
During this tense and exciting refactoring day, I was almost non-stop, even had no time to think, could only rely on familiarity and flow state, writing code with extremely high efficiency. Actually, if not considering the principle of not doing major refactoring before delivery, I really enjoyed this state. But everything needs a goal and meaning, can't just enjoy myself, otherwise this enjoyment becomes a low-level pleasure.

### 2020-06-08

Moved to work in Beijing on Saturday.

The feeling of returning to work in Beijing is really a bit disorienting. Everything has changed. First, I don't have a workstation (Xiuyun recruited an intern, for work convenience, her intern is sitting there). This is the most uncomfortable part of all the disappointments. It's like when I came to Class 1 in my second year of high school, sitting in a new seat knowing no one, not wanting to talk to them. The people here seem familiar yet strange. I seem to feel I have few friends here. I judge this is an illusion by reason. But the feeling of not wanting to communicate with people, wanting to find a corner to stay in is real, and I did find a corner to stay in, next to Yuzhang. Why don't I want to communicate? I still can't figure it out. Maybe because there's no good reason? When asked why I came to Beijing and how long I'll stay, I hesitantly said for a while, a month or two; or maybe it shows that essentially I'm still an introverted person, unwilling to trouble others, especially caring about whether I appear stupid in others' eyes. However, the more I write, the more I feel the second component is greater and more unnecessary. First, appearing stupid is better than actually being stupid. Seriously asking for help from others, even if clumsy, is fine. Don't be afraid, don't be afraid when young. Don't be afraid anytime. All is well.

Now about work. Finished the delivery recently, mainly the TLM (typed lane model) refactoring. This time, need to clarify goals and control myself, not refactor impulsively. Need to be strategic and control my progress.

Also, I got my desktop computer working. The reason it couldn't connect to the internet before was because I changed the password. After a power outage, the network completely lost connection. So need to set up the machine. This time the goals by priority are:

1. Productivity
2. Coolness
3. Good looks

Spent a long time reading Wang Yin's blog today - - continuously detoxing. I used to be a fanatical religious person, unable to see the essence of things. I always thought something was the ultimate solution to all problems. But actually, such "ultimate solutions" are rare. Most of the time, it's just religious fanaticism, like:

- Vim vs Emacs
- OOP vs FP
- Go vs Rust

And so on... When I first encountered OOP, I thought OOP was invincible, could solve everything, but in the end, I just wrote a bunch of similar classes. Actually, whether there is this class or not doesn't matter; what's really useful are the functions under this class. Later (these two years) I encountered FP and thought FP was the silver bullet for all problems. But after writing programs in Scala for a while, I found my productivity didn't improve well. Instead, I became less efficient because I got stuck on syntax and Immutable.

### 2020-06-09

Found some state, installed Arch, feels even more comfortable than Mac?

Played Hearthstone Battlegrounds with Yuzhang for a while - -

### 2020-06-10

Planned to do these things today:

1. HDMAPMDK-1199 RoadMark becomes a subclass, providing richer information
2. HDMAPMDK-892 Provide empirical trajectory

If there's energy left, work on the release documentation.

Result: Finished 892.

### 2020-06-11

Reviewed HDMAPMDK-892 - Provide empirical trajectory.

Found MDK hasn't done corresponding adaptation. Spent this afternoon doing this adaptation.

Finished adaptation, so tired.

Continued tinkering with my Arch, trying to record some steps of my machine setup as part of automation.

### 2020-06-12

Today's task is to finish HDMAPMDK-1199. Forgot about this problem before.

Finally finished at 8 PM.

### 2020-06-13

A very leisurely day. After submitting for testing, kept tinkering with my automation scripts.

Initially planned to use shell, but I really don't like shell, so started tinkering with scheme. So cool.

### 2020-06-15

Wow, it's 3 PM and I've been slacking off for most of the day, browsing various scheme-related websites and such. Can't go on like this.

Need to finish HDMAPMDK-1378 today, which is the lane mark direction inside intersections we've been reluctant to deal with. But there are no lane marks in intersections, so what lane mark direction?

Sigh, I feel so bad. After back and forth, worked until very late.

### 2020-06-16

After coming in today, kept reviewing. There's quite a lot to change. Then I started feeling a bit slack. Barely finished. Then Brother Kuan tested and found several more bugs.

In the afternoon, learned that Brother Xiao is leaving. I was shocked for a long time.

In the evening, tinkered with scheme, got custom library compilation and referencing working.

### 2020-06-17

Main work today is wrapping up the previous iteration, i.e., bug fixes.

### 2020-06-18

As of today, we finally need to finish the previous iteration's tasks.

My overall feeling is very bad. The reason is that the meaning of the work is not clear. Actually, I think it can be considered basically meaningless.

So, how do I define meaning here?

The meaning of current work for me, from high to low priority:

1. Ability to identify problems, to discover valuable, meaningful problems.
2. Accumulate ability to model problems, to solve more various types of problems in the future.
3. Model problems so that solutions that solve a class of problems described by the model through a one-time effort become possible.
4. Through my efforts, able to solve specific, meaningful problems. Among these, solving one problem at a time is less meaningful than putting in effort to solve multiple problems of this class.
5. Maintain pleasure, sense of achievement from solving problems, and the interestingness of the problems themselves.
6. Communication and relationships with people.
7. Salary (This is a guarantee. Not that it's unimportant, but other parts should be built upon it.)

Might not include all my work motivations, but this at least reflects part of the reality.

The reason I feel frustrated today, I think one main reason is loss of interestingness. First, the meaning of the problem itself is not clear to me, which reduces motivation. Second, the modeling of this type of problem is not precise enough, causing the solution method to not solve all problems (of course, models that solve all problems rarely exist because models themselves are simplifications and abstractions of problems. Here we discuss solving problems within an acceptable range) leading to repetition. Specifically, the bugs raised one after another by QA colleagues. Although some are due to insufficient understanding of requirements or are the testers' own problems, the time spent analyzing the problems themselves occupies the most time-consuming part of the entire problem-solving process.

Sometimes, insufficient understanding of the problem leads to non-essential solutions, causing people to spend time on useless work. Basically, points 3, 4, and 5 of the above meaning are not satisfied, making me frustrated.

Another point to consider is that so far, I've been solving problems from the previous iteration that should have been solved. Haven't started the tasks for this iteration at all. This will compress the time for this iteration and might even affect subsequent iterations. This is a vicious cycle that shouldn't happen. Considering even deeper impacts on interpersonal relationships, I think it's even more inappropriate.

Therefore, starting tomorrow, I should try to consider all aspects of a task before solving it.

Looking back at what I've done in the past ten days, work progress has almost completely stagnated. On that Monday when I first came to Beijing, June 8th, I said, `Then about work, after finishing the delivery recently, mainly the TLM (typed lane model) refactoring. This time, need to clarify goals and control myself, not refactor impulsively. Need to be strategic and control my progress.`

Currently, I think a good point is that I record what I do every day, although sometimes very brief, even supplemented the next day. But I think continuous recording is the seed for change.

Also, adding a sentence I saw before that I think is very, very reasonable:

> A few years ago, when I bought my first house in New York, a real estate agent said something very insightful, "This house needs major repairs, a complete overhaul. This 65-year-old house has absolute appreciation potential. Now you need to make a list of everything that needs fixing and get it all done within six months. You must solve all problems within six months."
> "Are you crazy? After paying the deposit, taxes, lawyer fees, I have no money left. And I'm a very disciplined person; I can fix everything slowly over five years."
> She said, "No, you won't. Because after six months, you'll get used to the current condition. You'll think everything is fine. Even if there's a corpse in the living room, you'll step over it nonchalantly."
> I still remember these words. What surprised me was that everything she said came true. I was wrong. The things I didn't fix within six months were still not fixed five years later when I sold the house.

This is so true. Must be vigilant and careful.

### 2020-06-19

Something important happened today. I had lunch with Liang Xiao. I need to organize my thoughts properly.

### 2020-06-22

Started very negatively, kept analyzing bugs. Finally found it was a small issue by Ziliang. Left work at 9 PM.

### 2020-06-23

Unbelievable! It's 7:00 PM, and I've done nothing today.

I mean I slacked off all day, browsing various websites online. Now thinking about work, feeling a bit guilty. Think about the reason, maybe because of what happened on Friday, or maybe because the Dragon Boat Festival holiday is the day after tomorrow, so slacking off - - But ultimately, this is not good. Even if I decide to leave, I can't neglect my duties. I should treat work seriously every day, not just putting in hours, but solving problems with heart. If leaving, even more so.

Ah, now my heart is filled with guilt.

The recent task is TLM refactoring, splitting data structures into ultra-small layer data structures, a very tedious task. The difficulty isn't high, but due to disagreement with the concept (I don't think splitting into ultra-small data structures is good design. One advantage of splitting into small data structures is flexibility and ease of modification).

### 2020-06-24

Last day before the holiday, started slacking off with peace of mind, did a bit of the refactoring work that should be done.

### 2020-06-28

Holiday is over!

Now need to adjust my attitude and face work with the right mindset; what is the right mindset? I'll try to define it below.

It rained heavily on Wednesday night. After the rain stopped, I called Senior Sophie. The topic was that I want to quit.

She initially said not to rush, need to view my work career with a very long time span, like a person might work until 70 before retiring (I strongly suspect I'll work even longer). Therefore, make all decisions with a long-term perspective. Look at a fifteen-year span. What will I become in fifteen years? What do I hope to become? Then make various decisions based on this expectation. For myself, I hope my 40-year-old self becomes an engineer like Liang Xiao: rational, calm; an architect; knowledgeable; still closely following and having a good grasp of the latest trends; able to see the essence of trends, decompose those unchanging things, thus focusing on problems truly worth solving, those valuable, difficult problems - like software complexity.

To achieve this, need to keep learning, maintain a humble attitude, **test truth with practice**. Actually, all learning is testing truth with practice. First, we encounter a problem, then look for solutions. What are the solutions? Those so-called "truths" are necessary tools for solving problems, and practice is the sole criterion for testing truth. But testing everything with practice is too costly. We must accept certain risks, learn from others' cases of testing truth with practice. The risks here are:

1. Might learn false truths.
2. Dogmatism due to insufficient understanding of the problem.

The second point is more dangerous than the first because the first is easy to verify, while the second is a deviation in thinking. This is not a black-and-white world, so incomplete correctness (i.e., not fully reflecting truth) in thinking is dangerous because it's partially correct, making people think it's universally applicable, thus using it to solve wrong problems. Hence, many so-called "silver bullets" emerge, like FP, OOP, TDD. The pursuit of "silver bullets" won't stop, nor should it, but we should acknowledge risks and rewards coexist.

Back to the topic with Sophie. Under冷静分析和决策的前提下, use a long-term perspective to see what the current self needs; thus, priorities emerge. Considering this together makes it easier. Then she gave some practical advice: try to detach yourself from work. Don't invest too much in it.

### 2020-06-29

Slacked off in the morning as usual (how is it usual??? This can't go on!)

Finally started doing serious work at 2 PM. Actually, it's because I don't quite agree with the recent tasks, the so-called TLM refactoring. In recent years, I've increasingly found I need a first-class environment, otherwise there's no growth.

So, first complete the current tasks according to the specification, then address my own issues from other aspects.

### 2020-06-30

Had a mental breakdown yesterday afternoon. Anxiety surged, started feeling very uncomfortable. From around 4-5 PM until 7 PM when I decided to leave, I almost accomplished nothing. During this time, I felt work lost meaning and started my complaining mode. Like I told Qiaobo on Sunday, the company has problems, the team has problems. The company's problem is that the slogan of "walking on two legs" is loud but makes people see no hope. The team's problem is that the Mentor's management style is too dictatorial. I feel like just a tool. Whenever writing code, I can only write according to his way, his design, with little autonomy. Therefore, I feel like the meaning of work is lost. Plus, already decided to leave, and the current task (TLM refactoring) is very虚无, I feel increasingly stressed.

But no matter what, need to maintain a good attitude, do the tasks at hand well, and set boundaries.

### 2020-07-01

Discussed TLM refactoring with Mentor. Still quite troublesome, but at least there's a direction. Can develop according to this direction.

Walked 20,000 steps with Qiaobo in Zhongguancun in the evening.

### 2020-07-02

Had an interview from 1 PM to 2 PM today. The guy was pretty good, I think can add a code interview.

Slacked off until 4 PM.

Jingzi helped review my resume. There's a lot to change, but can't openly修改简历 during work hours, so I need to leave work a bit earlier and修改简历 at home. But this way, the time I can leave for TLM isn't much. So actually, I shouldn't slack off. Sigh, especially today's slacking off was basically doing nothing, just playing with my phone! Can't go on like this.

Still have one bug and follow-up TLM work.

### 2020-07-06

Today's work is to continue TLM refactoring. Honestly, the workload for this task is much larger than I imagined.

I estimate I can finish the parser today.

I plan to do a round of summarization and abstraction of some traits after finishing Sectioning.

### 2020-07-07

### 2020-07-09

Had lunch with Linnan, had an interview in the afternoon.

### 2020-07-10

Had lunch with Liu Ge today.

> I believe most engineers (including myself) have a certain degree of self-ability denial tendency. Often, we need to face situations where our abilities are insufficient but still must overcome obstacles. In such cases, relying on others'成果和"最佳实践" is safer. But we quickly think these "best practices" are well-considered or肯定适用于我们的问题. Cloud vendors benefit when you enable more services. Microservice advocates make money when you buy their books. Both have incentives to sell you technology you don't need.

### 2020-07-13

Some day last week.

### 2020-07-22

Haven't written a daily log for a long time. I decide to break this现状.

As days pass, my pressure becomes越来越大,同时面试和工作的事情压得我几乎喘不过气来.
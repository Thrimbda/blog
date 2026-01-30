---
"title": "2020 Work Log"
"summary": "This document is the author's work log for the first half of 2020, detailing daily development tasks. It includes speed limit compilation, custom speed limits, bug fixes, code refactoring, technical research (e.g., memory leaks, PolyLine fixes), team collaboration (e.g., interface discussions, code reviews), and personal growth reflections. The log showcases the technical challenges faced by a software engineer in complex projects (like the high-definition map compilation system), the problem-solving process, project management considerations (e.g., iterative delivery, refactoring risks), and career mindset adjustments. Core arguments include: technical solutions require balancing short-term and long-term gains; large-scale refactoring should be avoided before delivery; engineers should focus on the essence of problems rather than blindly following technical trends; maintaining records and reflection is crucial for personal growth."
"tags":
  - "Work Log"
  - "Software Development"
  - "Technical Reflection"
  - "Project Management"
  - "Bug Fix"
  - "Code Refactoring"
  - "HD Map"
"date": "2020-01-01"
---

### 2020-04-13

- Completed self-performance review.
- Revisions for Lane Center Aggregation.

### 2020-04-14

- [ ] Speed limit compilation.
- [ ] Custom speed limit.

### 2020-04-15

- Determined the custom speed limit solution with @guangcong.
  1. Use a new `module-dynamicEvent` to solve this problem.
  2. Custom speed limit updates act as a new event to trigger horizon data updates.
  3. Need to consider exception handling and memory issues.
     After discussing with Guangcong, he encountered some problems.
- Xiaokang's review.
  Java, as a solid language, still has a lot to offer.
- Speed limit compilation.
  Basically no progress, added logic for extracting RoadCenterTile.
- Solved the Sectioning problem, analyzed the edgeLifting optimization plan, and proposed an optimization algorithm:
  Given a traverse head and a connectivity function, provide the traversal method.
- Researched the principle of self-executing JARs.

### 2020-04-16

- Clarified the custom speed limit interface with Yiming: He guarantees that the input location pair can uniquely determine a shortest route.
  Returned and outlined the algorithm for generating custom speed limits with Guangcong.
  1. Given a route.
  2. Known: | start DiRoadOnPath::count - end DiRoadOnPath::count | ≤ 1.
     Then a pair (start DiRoadOnPath, end DiRoadOnPath) that yields the shortest distance can definitely be found.
- Provided Xiaokang with a temporary, usable snapshot version pylon-v0.1.1 of the compiler.
- Went downstairs for a casual walk and chat with Hanteng.
- Clarified the SUMO map usage interface with Zizhe and Yicheng.
- Speed Limit compilation succeeded but not yet verified.

### 2020-04-17

- SpeedLimit compilation verification:
  OSMSerializable is not quite suitable because SpeedLimit bound to it has no geometry.
  Potential issue: Speed limit binding might have problems when ramps merge.
- [ ] Interpolation.
- [ ] Hausdorff distance.
- [ ] LcInJunctionTile.

#### Some Random Thoughts

- Go straight to Spark?
- What does OSM's Context need?

### 2020-04-18

Completed speed limit tasks.

### 2020-04-20

#### Custom Speed Limit

- Guangcong changed the input to a vector and added tests.
- A minor issue is that Guangcong doesn't fully understand how C++ pointers work.
- [ ] Maybe try to solve [https://github.com/scalameta/scalafmt/issues/337](https://github.com/scalameta/scalafmt/issues/337)?
- [ ] Make the file shared by Dashu anonymously shareable via Resilio Sync.

#### RoadBorder Fix

Discovered I made an incorrect assumption. The lc and rb information recorded in rc might have:
1. Only one lc exists, so cannot assume lc has at least two.
2. rb on one side might not exist, so cannot assume rb always exists.

### 2020-04-21

#### RoadBorder Fix

- Completed migration of test cases.
- Improved Dune and its ReadMe so it can directly output test data.
  Chatted with Weiyu about the future; I will focus on the compilation system.

#### Opposite Lane POI Binding

- Binding for data after multidigitize.

### 2020-04-22

#### Opposite Lane POI Binding

- Binding for data after multidigitize.
- Constructed test data.

### 2020-04-23

- Completed opposite lane POI binding and finished debugging [4].

### 2020-04-27

Main tasks for today:

#### Completed synchronizing mdm proto and mdm spec

1. Modified incorrectly described parts in the Ruoganchu mdm spec with Linnan.
2. Left several pending items that Linnan and I couldn't decide alone.
3. Decided in the 2020-04-26 morning meeting to postpone the most troublesome modifications for LaneSplitMerge and Polyline.
4. Completed proto modifications.
5. Completed nexus modifications.
6. Completed mdk modifications.
7. Also fixed a test data issue (lots of data errors reported).

#### Bug Fixes

Bug count surged as the 4/30 release approached.

[HDMAPMDK-1111](https://jira.momenta.works/browse/HDMAPMDK-1111) analysis completed.

- [ ] Script for automatically copying test cases.
- [ ] Export Apple Reminders.

### 2020-04-28

Spent half a day taking the driving theory test (Subject 1).

HDMAPMDK-1130 width issue, three problems:
1. Spec states no lane width during lane change.
2. Split line caused by intersection lines being too long.

HDMAPMDK-1121 re-fix.

Feeling in poor condition.

### 2020-04-29

#### Bugfix

- HDMAPMDK-1143
  Issue where RoadObstacle was not compiled.
- HDMAPMDK-1090

### 2020-05-06

#### Du Valid

- Using mill.
- Using nexus-osm.

#### Brainstorming

### 2020-05-08

#### Memory Leak Issue

- The direct cause of the memory leak was not deleting wild pointers after `new`.
- After updating the current position, map kit calls `prepareGuidanceData` to find the guidance data closest to the current position.
- `prepareGuidanceData` calls `NavInfoProviderImpl::getTrafficLights` & `NavInfoProviderImpl::getCarParks`.
- Taking `NavInfoProviderImpl::getTrafficLights` as an example, it `new`s data pointers in `NaviEventOnPath` when called.
- However, there is no `delete`.
- Also found `DestEvent` has this issue.

Solution: The core is to disallow wild pointers. Decided to refactor `NaviEventProvider`.
- First, add two fields `traffic_light_events` & `car_park_events` to `NaviInfoProvider`.
- In `NaviInfoGenerator`, update these two fields after the route is updated.
- Then, filter based on the current vehicle position during each `get` call.
- Therefore, need to refactor `PathReader::getAttributes` because the previous implementation only considered the offset relative to the current vehicle; now an interface for offset relative to the Path is needed.

### 2020-05-09

#### PolyLine Fix and Testing

The main issue with PolyLine is that duplicate points might be added during PolyLine generation, leading to a series of geometry-related segment calculation problems:
1. Vector calculation: two duplicate points result in a zero vector.
2. Length calculation: segment length is 0, easily causing NaN issues.

Thus, when constructing PolyLine, check the points in PolyLine. If duplicate points are found, throw an exception.

Discovered the following issues:
- Problems with `getEnd` in Jts.
- Jts `LinearLocation` has a `normalize` issue.
  ```scala
  val loc1 = new LinearLocation(0, 1, 1.0)
  val loc2 = new LinearLocation(0, 2, 0.0)

  loc1 compareTo loc2
  // the output is -1
  ```
- When interpolating, points that are too close might be selected.

### 2020-05-11

- HDMAPMDK-1122
  Could not reproduce the missing road edge line issue; decided not to spend more time investigating.
- Spent half an hour on metabolic growth theory.
- Refactored Visitor to support lines with the same start and end points.
- Prepared an interview question.

### 2020-05-12

- Interview: Two candidates were unqualified. Thought about how to quickly screen candidates. Took 3 hours.
- Bugfix: HDMAPMDK-1211 Deleting incorrect border issue, not fixed successfully in the last fix.
  Had an idea but didn't finish writing.
- Went to the gym.

### 2020-05-13

Bugfix: HDMAPMDK-1211 Thought of a solution.

- Root cause: Unreasonable production line segmentation.

#### Root Cause Analysis

It can be seen that segmentation occurs before the lane change is complete (the lane centerline is still crossing the lane line), and this segmentation might cross Rps.

Since the lane border observation information attached to the lane center shape points faithfully records the lane lines on both sides using a scan line method based on geometry, without semantic filtering. Therefore, at the position where the lane line crosses the lane, the lane centerline intersecting with the lane line will record that lane line on both left and right lane border refs.

Under the existing code logic, when filtering intersecting lane line border refs based on semantics, the border refs to be deleted are inferred based on the lane change type.

The current logic fails when encountering this type of segmentation, leading to this problem.

#### Solution

The core is to **find the lane change trend of the intersecting lane line**. Considering this segmentation might cross Rps, filtering should not be done per Rp.

1. First, organize lane lines into paths using edge lifting (can consider future graph refactoring): `Seq[LaneCenter]`.
2. Find the lane Center to be corrected and the lane border to be corrected (assuming such lane Centers are caused by lane changes).
3. Calculate the lane change trend of this LaneCenter based on the laneCenter path.
4. Perform filtering.

Assigned to Ziliang.

Interviewed one person, didn't pass.

### 2020-05-14

HDMAPMDK-1132 Id tracing for pole sign lane line endpoints.

The tracing problem for pole sign lane line endpoints is much simpler compared to linear object tracing, involving only Id mapping, not offset and length mapping.

However, there are still many issues to consider:
1. Procedure.
2. The Id Typing System is a persistent issue that needs to be addressed.

The root cause of this problem is that we used Long Ids for all definitions, while MDM definitions use Int, which could cause overflow issues.

### 2020-05-15

#### Bug Fixes

- HDMAPMDK-1215 completed.
- HDMAPMDK-1218 Done.

### 2020-05-18

Refactored the OSM Assembler, using the previous OSM serialize. Both code comprehensibility and ease of writing improved.

### 2020-05-19

Fixed a bug in the OSM Assembler (not really a bug).

Had the sprint planning meeting today:
Not many tasks for this sprint, but a lot of thinking is required. This is a healthy state.

### 2020-05-20

- [ ] Write documentation describing the current nexus/mdk CI status and requirements.
- [x] Follow up on HDMAPMDK-1263 bug.
  - It is indeed a production line segmentation issue.
- [ ] Schedule a meeting with Yang Chuan to discuss CI.
- [ ] HDMAPMDK-1262.
      Not finished.
- [x] Custom Speed Limit issue.

### 2020-05-21

#### TODOs

- [x] Greet Qiaobo.
- [x] HDMAPMDK-1262.
- [x] HDMAPMDK-755.

#### Works

- Went to Yiming's workstation in the morning for online debugging of yesterday's hotfix. The cause was an offset issue. Wrote it too hastily yesterday and didn't add any tests. This behavior should not happen again. Thought I saved a lot of time, **but ended up wasting more time**.
- The reason for not getting data in 1262 was that MDK didn't load lane-level road marks (and road obstacles).
- Helped Brother Du compile data.

### 2020-05-22

What did I do today???
What did I do???

### 2020-05-25

Received a new task today: HDMAPMDK-1249 - Research methods for calculating lane aggregation using road geometry information. This increased the tasks for this week. Currently, I have three things to do:
1. 1249.
2. Current status, requirements, and plan for the team's CI Pipeline.
3. Nexus graph refactoring.

Each requires careful thought and is not easy. Unfortunately, I can't accurately estimate the time for each. They are just estimated by Weiyu and written as story points in the Jira tasks. One thing I'm clear about: **If I don't start estimating and reviewing, I'll never estimate accurately.** So from now on, I need to estimate carefully.

Also, I plan to start 1249 today because it's a business matter, generally more urgent, and Weiyu cares more about it. As for refactoring, if I don't take it seriously, probably no one else will (because, cruelly, it doesn't affect functionality but efficiency, and efficiency is the hardest to measure; even I only have qualitative analysis).

### 2020-05-26

Many unexpected things happened today. First, two bugs were reported for parking. Originally planned for delivery today, but due to these bugs, delivery couldn't happen. Wang Wei negotiated with downstream to postpone delivery by two days to the day after tomorrow. So my main work for these two days became bug fixing again. This made me think about whether the scheduling during delivery is reasonable. Then there was the HDMAPMDK-1290 issue.

Tasks completed today:
- Follow-up on HDMAPMDK-1290: When extremely close to the stop line, the matched lane offset could be longer than the lane length.
  > Spent almost the entire day investigating and trying to solve this problem (currently 8:56 PM). Efficiency was very low.
  The root cause is that MDK calculates length by taking a coordinate transform for every two points, which, while more accurate, leads to strong uncertainty in the result.
  Finally used a hacky solution: if the calculated offset is longer than the length, just take the length.
- HDMAPMDK-1297 Incorrect parking space binding.
  Even though it was almost the original off-work time (9 PM), I must at least analyze this problem today!
  Sigh, got it done. Turned out to be a simple issue.

### 2020-05-27

Today, barring any surprises, I should finish the CI Pipeline work.

But there was a surprise -_-

Received bug feedback from Yiming:
1. Traffic light binding: Traffic lights that should be bound to the waiting area were bound to the partition before the waiting area. Fixed (1.5h).
2. Missing traffic light binding: Could not reproduce.
   Update: After a difficult round of debugging, finally found the issue. During compilation, the geometry used for rc and offset binding were not the same line, causing the offset to exceed the road length, so the traffic light couldn't be found (2h).

### 2020-05-28

Driving test (Subject 2) tomorrow, practiced driving all day today, returned at 5 PM. Feeling good, hope to pass tomorrow.

Started describing the current status and analyzing requirements for the CI Pipeline -_-

### 2020-05-29

Didn't pass. Sigh, it's so hard for me.

Went for the test in the morning. Did a few things in the afternoon:
1. Went to Yiming's place to check an abnormal situation, which turned out to be two bugs.
2. After the afternoon townhall, synchronized about the MDK Python binding.
3. Went downstairs with Shan Le and Weiyu to solve a downstream issue. Finally summarized a short-term solution and a long-term solution.

I found that when encountering unexpected problems, the general problem-solving method should be this pattern:
A short-term solution and a long-term solution. Because the value exposed by a problem is certain and time-sensitive. Therefore, the short-term solution focuses on quickly and accurately solving the immediate problem. Is a long-term solution still needed? Generally yes, because a specific case of a problem reflects a blind spot in the previous solution that wasn't considered. Analyzing the root cause and systematically solving it makes the solution more complete, allowing similar problems to be well-solved in the future. There are cases where a long-term solution isn't needed: after thorough analysis, we conclude that the cost of systematically solving the problem outweighs the benefits. (Even so, subjectively, most of us still want to solve it systematically. As engineers, who doesn't want to solve problems systematically? But this also creates a trap, leading people to solve important but not urgent, or neither important nor urgent problems, wasting precious time that could be used for more valuable issues.)
4. Returned in the evening and continued working on the CI Pipeline.

### 2020-06-01

Went to Yiming's place first thing in the morning to analyze a problem, spent the whole morning. The result was a known issue (point loss due to interpolation in the old compiler) causing another problem: when capturing the road near the missing segment, the lane offset became negative.

Worked until 4 AM after some inefficient and painful overtime (feeling that in my current state, overtime almost always correlates with low efficiency).

### 2020-06-02

Came in the afternoon. For Yiming's vehicle deployment, solved some bugs, caught up with Yiming's evening deployment.

### 2020-06-03

Went to help Yiming solve the problem discovered last night first thing in the morning: the issue of not getting traffic lights.

### 2020-06-04

Three things to do this morning:
1. Data cleaning and uploading the final 0605 data.
2. Check width anomaly issue - because there is no lane at that position.
3. Check the issue of interpolation points assigning the wrong lane.
4. Review.

### 2020-06-05

A tense and exciting day. Completed HDMAPMDK-1347 and HDMAPMDK-1352, and also did a major refactoring.

Learned a valuable lesson: Don't make huge changes close to delivery. Without sufficient QA testing, even the most awesome refactoring can bring risks. Also, without enough time for design review (I mean for myself, because sometimes while writing, you might find the design is wrong. However, discovering design issues during implementation is another problem—starting too early).

Monday addition:
During this tense and exciting day of refactoring, I was almost non-stop, even without time to think, relying on familiarity and flow to write code with high efficiency. Actually, if we disregard the principle of not doing major refactoring before delivery, I really enjoyed this state. But everything needs a goal and meaning; can't just enjoy oneself, otherwise this enjoyment becomes a low-level pleasure.

### 2020-06-08

Moved to work in Beijing on Saturday.

The feeling of returning to work in Beijing is a bit disorienting. Everything has changed. First, I lost my workstation (Xiuyun recruited an intern, and for convenience, her intern is sitting there). This is the most uncomfortable part of all the losses. It's like when I moved to Class 1 in my second year of high school, sitting in a new seat, knowing no one, not wanting to talk to them. The people here seem familiar yet strange. I feel like I have few friends here, which I rationally judge is an illusion. But the feeling of not wanting to communicate, wanting to find a corner to stay in is real, and I did find a corner to stay in, next to Yuzhang. Why don't I want to communicate? I still can't figure it out. Maybe because there's no good reason? When asked why I came to Beijing and how long I'll stay, I hesitantly said for a while, a month or two; or maybe it shows that I'm essentially an introverted person, unwilling to trouble others, especially concerned about looking stupid in others' eyes. However, the more I write, the more I feel the second reason is more prominent and unnecessary. First, looking stupid is better than actually being stupid. Seriously seek advice from others, even if clumsily. Don't be afraid, don't be afraid when you're young. Don't be afraid at any time. All is well.

Now about work. After finishing the delivery recently, mainly the TLM (typed lane model) refactoring, this time I need to set clear goals, control myself, not impulsively refactor, but be strategic and control my progress.

Also, I got my desktop computer working. The reason it couldn't connect to the internet before was that I changed the password, and after a power outage, the network connection was completely lost. So I need to set up the machine. This time, the priorities are:
1. Productivity.
2. Coolness.
3. Aesthetics.

Spent a long time reading Wang Yin's blog today - continuously detoxing. I used to be a fanatical religious follower, unable to see the essence of things. I always thought something was the ultimate solution to all problems, but in reality, such "ultimate solutions" are rare. Most of the time, it's just religious fanaticism, like:
- Vim vs Emacs.
- OOP vs FP.
- Go vs Rust.
And so on... When I first encountered OOP, I thought OOP was invincible, solving all problems, but in the end, I just wrote a bunch of similar classes; actually, having these classes or not didn't matter; what was useful were the functions under these classes. Later (in recent years), I encountered FP and thought FP was the silver bullet for all problems. But after writing programs in Scala for a while, I found my productivity didn't improve much; instead, I got bogged down in syntax and immutability, reducing my efficiency.

### 2020-06-09

Found some rhythm. Installed Arch, feeling even more comfortable than using Mac?

Played Hearthstone Battlegrounds with Yuzhang for a while -_-

### 2020-06-10

Planned to do these things today:
1. HDMAPMDK-1199 RoadMark becomes a subclass, providing richer information.
2. HDMAPMDK-892 Provide empirical trajectories.

If there's energy left, work on the release documentation.

Result: Finished 892.

### 2020-06-11

Reviewed HDMAPMDK-892 - Provide empirical trajectories.

Found that MDK hasn't done the corresponding adaptation. Spent the afternoon doing this adaptation.

Finished the adaptation. So tired.

Continued tinkering with my Arch, trying to record some steps of my setup as part of automation.

### 2020-06-12

Today's task is to finish HDMAPMDK-1199. Forgot about this issue before.

Finally finished at 8 PM.

### 2020-06-13

A very leisurely day. After submitting for testing, kept tinkering with my automation scripts.

Initially planned to use shell, but I really don't like shell, so started tinkering with Scheme. So fun.

### 2020-06-15

Wow, it's 3 PM and I've been slacking off for most of the day, browsing various Scheme-related websites and such. Can't go on like this.

Today, need to finish HDMAPMDK-1378, which is about adding so-called lane mark direction inside intersections, something we've been reluctant to do. But there are no lane marks inside intersections, so what lane mark direction?

Sigh, I'm so frustrated. After some back and forth, worked until very late.

### 2020-06-16

Spent the morning reviewing after arriving. Quite a few things needed changes. Then I started feeling a bit of slacking off again. Barely managed to finish. Then Brother Kuan tested and found several more bugs.

In the afternoon, learned that Brother Xiao is leaving. I was shocked for a long time.

In the evening, tinkered with Scheme, got custom library compilation and referencing working.

### 2020-06-17

Today's main work is wrapping up the previous iteration, i.e., bug fixes.

### 2020-06-18

As of today, we're finally finishing the previous iteration's tasks.

I feel very bad overall because the meaning of the work isn't clear; in fact, I think it's almost meaningless.

So, how do I define meaning here?

The meaning of my current work, in order of importance from high to low:
1. The ability to identify problems, to discover valuable, meaningful problems.
2. Accumulate the ability to model problems, to solve more various types of problems in the future.
3. Model problems so that solutions that solve a class of problems described by the model through a one-time effort become possible.
4. Through my efforts, solve specific, meaningful problems. Among these, solving one problem at a time is less meaningful than putting in effort to solve multiple problems of that class.
5. Maintain pleasure, the sense of achievement from solving problems, the趣味性 of the problems themselves.
6. Communication and relationships with people.
7. Salary (This is a guarantee; it's not unimportant, but other parts should be built upon it).

This might not cover all my work motivations, but it at least reflects part of the reality.

The reason I feel frustrated today, I think, is mainly the loss of趣味性. First, the meaning of the problem itself isn't clear to me, which reduces motivation. Second, the modeling of this type of problem isn't precise enough, causing the solution to not solve all problems (of course, models that solve all problems rarely exist because models themselves are simplifications and abstractions of problems; here we're discussing solving problems within an acceptable range), leading to repetition. Specifically, the bugs raised one after another by QA, although some are due to insufficient understanding of requirements or the testers' own issues, the time spent analyzing the problems themselves occupies the most time-consuming part of the entire problem-solving process.

Sometimes, insufficient understanding of a problem leads to non-essential solutions, causing people to spend time on futile efforts, basically failing to satisfy points 3, 4, and 5 above, making me frustrated.

Another point to consider is that so far, I've been solving problems from the previous iteration and haven't started the tasks for this iteration at all. This compresses the time for this iteration and might even affect subsequent iterations. This is a vicious cycle that shouldn't happen. Considering it might even affect interpersonal relationships more deeply, I think it's even more inappropriate.

Therefore, starting tomorrow, I should try to consider all aspects of a task before solving it.

Looking back at what I've done in the past ten days, work progress has almost completely stagnated. On that Monday when I first arrived in Beijing, June 8th, I said, `Then about work, after finishing the delivery recently, mainly the TLM (typed lane model) refactoring, this time I need to set clear goals, control myself, not impulsively refactor, but be strategic and control my progress.`

Currently, I think a good point is that I record what I do every day, although sometimes briefly or supplemented the next day. I believe continuous recording is the seed for change.

Also, adding a sentence I saw earlier that I think is very, very reasonable:

> A few years ago, when I bought my first house in New York, a real estate agent said something very insightful, "This house needs major repairs, a complete overhaul. This 65-year-old house has absolute appreciation potential. Now you need to make a list of everything that needs fixing and get it all done within six months. You must solve all problems within six months."
> "Are you crazy? After paying the deposit, taxes, and lawyer fees, I have no money left. And I'm a very disciplined person; I can fix everything slowly over five years."
> She said, "No, you won't. Because after six months, you'll get used to the current condition. You'll think everything is fine. Even if there's a corpse in the living room, you'll step over it nonchalantly."
> I still remember these words. What surprised me was that she was right. I was wrong. The things I didn't fix within six months were still not fixed five years later when I sold the house.

This is so true. Must be vigilant and careful.

### 2020-06-19

Something important happened today. I had lunch with Liang Xiao. I need to organize my thoughts properly.

### 2020-06-22

Started very消极,一直在分析bug,最后发现是子良的一个小问题,晚上9点下班了

### 2020-06-23

Unbelievable! It's 7:00 PM, and I've done nothing today.

I mean, I slacked off all day, browsing various websites online. Now thinking about work, feeling a bit guilty. The reason might be what happened on Friday, or maybe because the Dragon Boat Festival holiday is the day after tomorrow, so消极怠工- - But ultimately, this is not good. Even if I decide to leave, I shouldn't neglect my duties. I should take work seriously every day, not just putting in hours, but solving problems with heart. If I'm leaving, I should do so even more.

Ah, now my heart is filled with guilt.

The recent task is the TLM refactoring, splitting the data structure into ultra-small layer data structures. It's a tedious task. The difficulty isn't high, but due to ideological disagreement (I don't think splitting into ultra-small data structures is good design; one advantage of splitting into small data structures is flexibility and ease of modification).

### 2020-06-24

The last day before the holiday, started slacking off with peace of mind, did a bit of the refactoring work that should be done.

### 2020-06-28

Holiday's over!

Now need to adjust my mindset, face work with the right attitude; what is the right attitude? I'll try to define it below.

It rained heavily on Wednesday night. After the rain stopped, I called Senior Sophie. The topic was that I wanted to leave.

She initially said not to rush, need to view my career over a very long time span, like a person might work until 70 to retire (I strongly suspect I'll work even longer). Therefore, make all decisions with a long-term perspective. Look at where I'll be in 15 years, what I hope to become, then make various decisions based on that expectation. For myself, I hope the 40-year-old me becomes an engineer like Liang Xiao: rational, calm; an architect; knowledgeable; still closely following and confident about the latest trends; able to see the essence of trends, deconstruct those unchanging things, thus focusing on problems truly worth solving, those valuable, difficult problems—like software complexity.

To achieve this, need to keep learning, maintain a humble attitude, **test truth with practice**. Actually, all learning is testing truth with practice. First, we encounter a problem, then look for solutions. What are the solutions? Those so-called "truths" are necessary tools for solving problems, and practice is the sole criterion for testing truth. But testing everything with practice is too costly. We must accept certain risks, learn from others' cases of testing truth with practice. The risks here are:
1. Might learn false truths.
2. Dogmatism due to insufficient understanding of the problem.

The second point is more dangerous than the first because the first is easy to verify, while the second is a deviation in thinking. This isn't a black-and-white world, so incomplete correctness (i.e., not fully reflecting truth) is dangerous because it's partially correct, making people think it's universally applicable, thus using it to solve wrong problems. Hence, many so-called "silver bullets" emerge, like FP, OOP, TDD. The pursuit of "silver bullets" won't stop, nor should it, but we should acknowledge that risks and rewards coexist.

Back to the topic with Sophie. Under冷静分析和决策的前提下,用长远的眼光去看待当下的自己需要什么; thus establishing priorities, making comprehensive consideration easier. Then she gave some practical advice: try to detach yourself from work. Don't invest too much in it.

### 2020-06-29

Slacked off in the morning as usual (how is this usual??? This can't go on!).

Finally started working on serious matters at 2 PM. Actually, it's because I don't really agree with the recent tasks, the so-called TLM refactoring. In recent years, I've increasingly realized I need a first-class environment; otherwise, there's no growth.

So, first complete the current tasks according to the specification, then address my own issues from other aspects.

### 2020-06-30

My mindset collapsed yesterday afternoon. Anxiety surged, making me very uncomfortable. From around 4-5 PM to 7 PM when I decided to leave, I almost accomplished nothing. During this time, I felt work lost its meaning and started venting. Like I told Qiaobo on Sunday, the company has problems, the team has problems. The company's problem is the loud口号 of两条腿走路 but making people看不到希望; the team's problem is the Mentor's management style being too dictatorial. I feel like just a tool; whenever writing code, I can only write according to his way, his design, with little autonomy. Thus, I feel the meaning of work seems lost. Plus, having decided to leave, and the current task (TLM refactoring) being very虚无, I feel increasingly stressed.

But no matter what, need to maintain a good mindset, do the tasks at hand well, and set boundaries.

### 2020-07-01

Discussed the TLM refactoring with Mentor. Still quite troublesome, but at least there's a direction now. Can proceed in this direction.

Walked 20,000 steps with Qiaobo in Zhongguancun in the evening.

### 2020-07-02

Had an interview from 1 PM to 2 PM. The guy was pretty good; I think we can add a coding round.

Slacked off until 4 PM.

Jingzi helped review my resume. Many things can be improved, but can't修改简历 openly during work hours, so I need to leave a bit earlier and修改简历 at home. But this way, the time I can allocate to TLM isn't much. So actually, I shouldn't slack off. Sigh, especially today's slacking was basically doing nothing, just playing on my phone! Can't go on like this.

Still have one bug and follow-up TLM work.

### 2020-07-06

Today's work is to continue the TLM refactoring. Honestly, the workload for this task is much larger than I imagined.

I estimate I can finish the parser today.

I plan to do a round of summarization and abstraction of some traits after finishing Sectioning.

### 2020-07-07

### 2020-07-09

Had lunch with Linnan, had an interview in the afternoon.

### 2020-07-10

Had lunch with Liu Ge today.

> I believe most engineers (including myself) have some degree of self-doubt about their abilities. Often, we need to face situations where our abilities are insufficient, yet still overcome the obstacles before us. In such cases, relying on others'成果 and "best practices" is safer. But soon, we think these "best practices" are well-considered or肯定适用于我们的问题. Cloud vendors benefit when you enable more services. Microservice advocates make money when you buy their books. Both have incentives to sell you technology you don't need.

### 2020-07-13

Someday last week.

### 2020-07-22

Haven't written a daily log for a long time. I decide to break this现状.

As days pass, my pressure grows越来越大,同时面试和工作的事情丫的我几乎喘不过气来.
# I Don't Write 99% of My Code

The message I've typed most this year isn't a prompt or a spec. It's this:

> The limit has been reset. You can continue the work where it was left off.

I send it to an AI agent whenever my usage limit comes back. Sometimes it's "resetted," sometimes "reseted." The agent doesn't care. It picks up where it stopped, and by the time I check again there's usually a pull request waiting.

I'm saying this upfront because my website says "I build things, break things, and ship a lot," and that sentence is true in a way that hides most of how it's true. AI tools write and debug almost all of my code. If I had to put a number on it, I'd say I personally write or debug less than 1% of what ships. Most of the commits on my GitHub were never typed by me.

I'd rather say that myself than have someone find it out.

## What DHH gets to say

In September, DHH (the person who created Ruby on Rails) opened Rails World with a talk about how his company has gone "pencils down" on handwritten code. Writing code by hand there is now treated like a bug. If someone has to do it, the question is why the agent couldn't. He said he has retired as a programmer, around March, and that he's looking back on 25 years of what he called "chiselling" code by hand with joy, not regret.

One line in that talk was about Rust, which he says he can't read at all: "I consider that a feature." He evaluates the Rust his agents write as a black box, the way any business owner has always evaluated work they commissioned.

I agree with most of what he said, and I'm living a version of it. But there's a difference between us that the talk doesn't really deal with. He earned his black box. He spent 25 years writing code, so when he looks at a system from the outside, he knows which questions to ask it. I skipped those 25 years. I started building seriously at the exact moment the tools made it optional.

Varun Mayya said something in a recent video that I keep coming back to. For years he believed learning to code was one of the few paths in India where social mobility was open: no degree needed, no recommendation, your portfolio is public. "After AI, I fully changed my mind on it. I have U-turned on it."

Anthropic published labour data this year that's relevant here. Computer programmers are the most exposed occupation in their measure. They also found that hiring of 22- to 25-year-olds into the most exposed jobs has dropped by about 14% compared to 2022. The finding is barely statistically significant, and they list other explanations. Still, I'm 20, so that's the age range I'm walking into.

## What I actually do

If I'm not writing the code, the fair question is what I'm doing.

I decide what gets built, and I keep pushing on the product documents until they're specific enough for an agent to work from without guessing.

I decide what "done" means, and I'm strict about it. Some of my actual instructions, copied from my sessions:

> Do not declare Task 1.7 complete until: CI passes on the exact HEAD SHA

> If the product does not objectively reach 9.7, report the honest score.

> Check everything is pushed into the main branch of the GitHub repo. If not, just create a PR and don't merge it. I will review it manually, and then I will merge it accordingly.

I review and merge. I read the audits. I say no when something is being presented as working and isn't.

The clearest example is from our Smart India Hackathon project. There was a number we had built for the pitch: the probability that a mine would miss its production target. Before we tested it, we wrote down what result it would need to pass for us to show it. It failed. We tried a different method, wrote down the rule again in advance, and it failed again. So we took it out of the pitch. The calibration figure we did keep, we describe as "close to calibrated," never "calibrated," because the interval didn't support the stronger word.

The pitch went well. We're 71st out of roughly 600 teams, and we're waiting on the national committee to decide whether we go through.

## Where it breaks

On that same project, there were parts I struggled to understand, because the technical concepts went deeper than I could follow on my own.

That's the real cost, and I don't want to soften it. If I can't fully understand something, I can't always tell when the agent is wrong about it. My verification rules help: tests, CI on the exact commit, rules decided before results come in. But rules only catch what they were written to catch. DHH can look at a black box and smell that something's off. I'm not sure I can, yet.

So I don't call myself a developer in the way that word used to mean. The closest honest description I have is this: I'm a product builder who works through AI. I decide what gets built, what counts as finished, and what the product is allowed to claim. I don't write the code, and there are times I can't debug it either.

What I don't know is whether the judgment DHH got from writing code for 25 years can be built some other way: from reviewing, from specifying, from being wrong in public and fixing it. I'm finding out on myself, in real time, with real projects.

I don’t know when my black-box moment will come, or if it will. Until then, I’ll keep learning, questioning, and building.

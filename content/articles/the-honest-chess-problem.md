# The Honest Chess Problem

In Class 10, I played chess for six to eight hours a day. My Chess.com rating today is 1,436. My elder brother is around 1,961.

That gap is bigger than it sounds. By the Elo formula, a 525-point difference means he'd be expected to score about 9.5 points out of ten against me. We play the same game, but we don't see the same board.

ChessMate started with him. He wanted something that would take his game to the next level, and that turned into a tool we decided to build: import your games, run them through Stockfish, ask an AI coach why your moves were bad, and track whether you're improving. The first version of the repo is from September 2025. The current one started in May 2026 and has 226 commits.

Building it taught me that chess has an honesty problem, and it isn't the one I expected.

## The engine doesn't lie

Stockfish has never lied to anyone. It looks at a position and tells you it's −2.3 and what the best move was. It's as honest as anything I've used.

It's also close to useless at my level, for a specific reason. The engine's best move is the best move for something that will find every follow-up after it. If the right move only works because of a sequence 14 moves deep that I'd never find, then for me it isn't really the best move. It's the best move for Stockfish. The engine is telling the truth about the position and nothing about the player.

We ran into a smaller version of this inside our own numbers. Our first accuracy score was calculated from raw centipawn loss. That sounds reasonable until you realise that dropping 200 centipawns when you're already completely winning barely matters, while dropping 200 in an equal position can lose you the game. The number was honest and was answering the wrong question. We changed it to measure how much each move changed your chance of winning, which is closer to what actually happened on the board.

The problem statement on my website says: "Chess engines tell you the best move, not why yours was worse." I still think that's right. The engine's honesty isn't the issue. It just can't explain.

## The coach can explain

The AI coach has the opposite problem. A language model can explain a chess position in confident, clear paragraphs. It can also make up a plan that has nothing to do with the position, and it'll sound just as confident.

So ChessMate is really two systems with opposite defects. One can't lie and can't explain. The other can explain and can lie. The product is mostly the wiring between them.

We audited the coach with ten real scenarios. The most interesting result was the first one. Our top suggested question was "Walk me through the critical moment of this game." It scored 4 out of 10. (We had to score simulated answers, because the audit couldn't reach the live model, but everything upstream of the model was real.) The model wasn't the problem; the information it was given simply didn't contain the game's turning points. The question was literally unanswerable from what we'd handed it.

The blunder question, "Find my biggest mistake and how I should have played instead," scored 9. Same model and same prompt style. The difference was that everything a coach would need was in front of it: the move, how much it cost, the engine's preferred move, the tactical pattern.

That changed how I think about honesty in AI products. You can't really ask a model to be honest. What you can control is what it has in front of it. On a different project, a satellite-imagery assistant, we took this as far as I know how. The model writes placeholders, the actual numbers are filled in from real measurements, and a validator rejects any number the model typed itself. The model can't make up a measurement, not because we told it not to, but because there's nowhere for it to put one.

## Our product lied too

I'd like to say only the AI coach had this problem. It didn't.

The first version of our Insights screen showed "342 games" for a library that had 12. A header that said 3 games sat next to a card that said 5 days. Our landing page showed a demo board with two dark-squared white bishops, which is an illegal position that any serious chess player would spot immediately. My brother would have.

The same audit found that if you asked the coach the same question twice, the prompt it built was byte-for-byte identical: 2,374 characters both times. So you'd get the same lesson again, and the only thing you'd learn is that asking twice doesn't help. Follow-up questions had no memory of the previous answer. The conversation the user thought they were having didn't exist.

And in July, the coach in production was returning errors because an API key wasn't configured on the live server. My site still said "live."

None of this was malicious. It was what happens when you build fast and the parts don't check each other. We fixed the numbers so every screen comes from the same source. But I don't want to pretend the product was the honest one and the AI was the problem.

## The other honest part

Here's the part I've been avoiding. By the time ChessMate was ready, my brother had moved on to other things, and so had I. Neither of us used it consistently to get better. I'm not using it now.

So I don't know if it works. I don't know whether a 1,436 who uses it seriously would become a 1,500, or whether my brother would have closed the gap to 2,000. We never used it long enough to find out.

The tool was built to tell you the truth about your games, and the most honest thing I can say about it is that I can't tell you if it makes anyone better. Stockfish could analyse every game we played. It couldn't tell us whether we'd keep playing.

I still think the problem is real. Engines will keep being right and unhelpful, and language models will keep being helpful and occasionally wrong. Whoever wires them together properly will build something club players actually want. I just know now that the hardest part isn't the engine or the coach. It's having someone who still cares about getting better by the time it's ready.

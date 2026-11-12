# Project Cassandra: Final presentation

## Brief
- **Purpose:** final review. Recap the problem, show the key metrics, then show what is new: the auto-retrainer and the explanations.
- **Story:** C22 hit a data size and diversity ceiling on TradeLocker, built its own platform, and aims to grow from 500 to 2,000 users per campaign. Our positioning is to make it easy to retrain and update the Judge as new data arrives, and promote it for the next campaign. We aren't claiming to match C22's rule today; the claim is that the Judge improves over time.
- **Audience:** Catch22 sponsors and faculty. **Density:** speaker-led (one idea per slide, at most 3 bullets).
- **Based on:** `decks/mid-term-presentation` (ported slides keep their assets and deck-local components).

## Sources for the new content
- Auto-retrainer: `project-cassandra/src/cassandra/pipelines/`, `doc/client/RETRAINING_CONTRACT.md`, `EVALUATOR_RULES.md`.
- Explanations: `project-cassandra/reverse-trade-judge` (`scripts/build_judge_v5_gross.py`, `scripts/explain_templates.py`, spec `docs/superpowers/specs/2026-10-10-judge-v5-2-0-explanation-design.md`). Deterministic (TreeSHAP + templates), not an LLM.
- Trader pile: `reverse-trade-judge/results/trader_concentration_summary.json`. Top 10% of traders (389 of 3,884) place **54.7% of trades** (by trade count, not volume). The names after Sally and Alex and Jon (Mei, Raj, Ben, Lena, Omar, Kai, Zoe) are illustrative. Rename in `components/trader-pile/trader-pile.html`.

## Outline
| # | Slide | Source | State |
|---|-------|--------|-------|
| 01-03 | Cover, team, agenda | mid-term 01-02, new agenda | cover text and agenda owners need updating |
| 04 | Divider: Recap | new | done |
| 05 | The whole journey | mid-term 14 | done |
| 06 | A few traders drive the data | new `trader-pile` | done |
| 07-08 | C22 data ceiling, own platform (500 to 2,000) | new | done |
| 09 | Our positioning | new | done |
| 10-13 | Goals and impact | mid-term 16-19 | ported, not yet reframed around "improves over time"; slide 11 staircase is still illustrative |
| 14 | Mid-term feedback | new | placeholder for the feedback quote |
| 15 | What C22 gets beyond the Judge (added value: room to grow, less risk, less manual work) | new | done; speaker notes need an owner |
| 16 | Demo divider (content TBD) | new | divider only |
| 17-18 | System architecture | mid-term 28 | ported; slide 18 has an unconnected Auto-retrainer box above the Judge; kicker "Project Cassandra and Judge · During campaign" |
| 19 | Part 1, campaign end to hand-off (title "Project Cassandra Architecture"): slide 18's architecture scoped to campaign end to hand-off; no Redis, workers, Judge or Dashboard | new `arch-after-end` | done |
| 20-24 | Step builds of slide 19 (one per step: campaign ended, after the reply, Postgres, Storage, Trainer hand-off); lit parts at 100%, the rest at 60% | `arch-after-end` with `is-step-N` | trial |
| 25-36 | Part 2 (right to left) and its 11 step builds (slides 26-36), lit parts at 100%, the rest at 60% | `arch-promotion` with `is-step-N` | trial |
| (25) | Part 2, after a challenger is trained: right-to-left flow (Services, Pipeline, Data, Input/Output, C22); Trainer, Evaluator, Training tracker, Judge | new `arch-promotion` | done; title "Project Cassandra Architecture" |
| 37-48 | Same as 25, mirrored to read left to right, with its 11 step builds (slides 38-48) | `arch-promotion-ltr` with `is-step-N` | trial |
| (37) | Same as 25, mirrored | new `arch-promotion-ltr` | done |
| 27 | Retraining pipeline inside the API box; arrows to Trainer and Judge cut across the data lane | new `retrain-api-diagram` | done |
| 28-35 | Auto-retrainer: divider (28), flow (29), 3 detail slides, 3 key design decisions | new | 29 done; 30-35 placeholders |
| 32-40 | Model training: divider (27), hurdle model (28), data (29), 18 features kept (30), cross-validation layout (31), feature-set ablation (32), what each notebook tried (33), train vs validation by campaigns (34) and by trees (35) | mid-term 58, 60, 64-69 | ported; slide 30 compacted in `deck.css` (`is-features-kept`) for the 26px floor. The old "Where the Signal Lives" slide was removed (the decomposition is still in the appendix) |
| 41-45 | Explanations: divider (36), how it works (37), fade vs no-fade example (38), merits: readable by anyone (39), post-campaign themes (40) | new | done; examples from the trader-concentration doc (locked block). Speaker-note owners TBC |
| 46-51 | Project management | mid-term 71-76 | ported |
| 52-54 | Handover | new | placeholders |
| 55 | Q&A | mid-term 80 | ported |
| 56-77 | Appendix | mid-term 81-102 | ported unchanged |

## Open items
- Find every placeholder: `grep -rn "@placeholder" decks/final-presentation/slides`
- Slide numbers inside ported speaker notes and the Q&A note ("#28", "#71") still use mid-term numbers.
- Mid-term open items carry over: campaign counts (54 vs 45 vs 38) and the PM numbers on slides 41-44.
- Slides 10-13 copy and the agenda owners are not rewritten.
- Mid-term slides 77-79 (constraints, edge-setting, what's next) were left out; handover replaces "what's next".

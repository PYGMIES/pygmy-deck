# Project Cassandra: Final presentation

## Brief
- **Purpose:** final review. Recap the problem, show the key metrics, then show what is new: the auto-retrainer and the explanations.
- **Story:** C22 hit a data size and diversity ceiling on TradeLocker, built its own platform, and aims to grow from 500 to 2,000 users per campaign. Our positioning is to make it easy to retrain and update the Judge as new data arrives, and promote it for the next campaign. We aren't claiming to match C22's rule today; the claim is that the Judge improves over time.
- **Audience:** Catch22 sponsors and faculty. **Density:** speaker-led (one idea per slide, at most 3 bullets).
- **Based on:** `decks/mid-term-presentation` (ported slides keep their assets and deck-local components).

## Sources for the new content
- Auto-retrainer: `project-cassandra/src/cassandra/pipelines/`, `doc/client/RETRAINING_CONTRACT.md`, `EVALUATOR_RULES.md`.
- Explanations: `project-cassandra/reverse-trade-judge` (`scripts/build_judge_v5_gross.py`, `scripts/explain_templates.py`, spec `docs/superpowers/specs/2026-10-10-judge-v5-2-0-explanation-design.md`). Deterministic (TreeSHAP + templates), not an LLM. Not yet wired into the retrainer or serving backend.
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
| 15 | Where we added value | new | done; speaker notes need an owner |
| 16-17 | System architecture | mid-term 28 | ported; no Trainer lane yet |
| 18-25 | Auto-retrainer: flow, 3 detail slides, 3 key design decisions | new | 19 done; 20-25 placeholders |
| 26-30 | Explanations: how it works, example, 2 key design decisions | new | placeholders |
| 31-34 | Model training recap | mid-term 58, 60, 70 | ported |
| 35-40 | Project management | mid-term 71-76 | ported |
| 41-43 | Handover | new | placeholders |
| 44 | Q&A | mid-term 80 | ported |
| 45-66 | Appendix | mid-term 81-102 | ported unchanged |

## Open items
- Find every placeholder: `grep -rn "@placeholder" decks/final-presentation/slides`
- Slide numbers inside ported speaker notes and the Q&A note ("#28", "#71") still use mid-term numbers.
- Mid-term open items carry over: campaign counts (54 vs 45 vs 38) and the PM numbers on slides 36-39.
- Slides 10-13 copy and the agenda owners are not rewritten.
- Mid-term slides 77-79 (constraints, edge-setting, what's next) were left out; handover replaces "what's next".

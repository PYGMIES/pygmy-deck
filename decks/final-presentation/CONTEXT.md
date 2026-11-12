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
| 01-03 | Cover (subtitle "Final Presentation"), team, agenda | mid-term 01-02, new agenda | agenda owners need updating |
| 04 | Divider: Recap ("The problem, and what changed since midterms") | new | done |
| 05 | The whole journey | mid-term 14 | done |
| 06 | C22 hit a data ceiling (kicker: The constraint) + sponsor quote strip (Clement, C22 chat, 10 Nov 2026; punctuation tidied, words verbatim) (`chevron-callout is-quote`) | new | done |
| 07 | A few traders drive the data (kicker: The constraint): proof of the diversity limit | new `trader-pile` | done |
| 08 | More modelling won't fix this: 6/30 notebook variants above $0 + Profit = Direction × Size, two sizing rules moved profit < $130/campaign (NB18, `results/trade_size_readout.csv`); callout "More data, not a bigger model" (`big-stat` + `is-formula`, `chevron-callout`) | new | done |
| 09 | C22 built its own platform (500 to 2,000) + "More traders means more data, so the Judge can keep improving" | new | done |
| 10 | Our positioning: make retraining easy (keep at the "why" level; mechanics live in the Auto-Retrainer section) | new | done |
| 11 | Divider: Goals & Impact | mid-term 16 | done |
| 12 | What we committed to: benchmarks (fade, random, C22's rule) + midterm promises (magnitude, paper trading, auto-retrainer, explanations) with status pills (`label-card is-status`; green = done, amber `is-warn` = data limitations). Replaces mid-term 17 + 19 | new | benchmark statuses follow slide 13; re-check once final numbers land |
| 13 | Where the Judge landed: cumulative P&L (`equity-chart`) | mid-term 18 | chart data and title still mid-term numbers; swap in final numbers |
| 14 | Mid-term feedback (the *what*; Explanations covers the *how*). Feedback is said out loud, not quoted on the slide | new | done; speaker notes need an owner |
| 15 | What C22 gets beyond the Judge: paper trading, scale, daily backups, easy imports (4 cards, `card-grid is-four`) | new | done; speaker notes need an owner |
| 16 | Demo divider (content TBD) | new | divider only |
| 17-18 | System architecture | mid-term 28 | ported; no Trainer lane yet |
| 19-26 | Auto-retrainer: flow, 3 detail slides, 3 key design decisions | new | 20 done; 21-26 placeholders |
| 27-35 | Model training: divider (27), hurdle model (28), data (29), 18 features kept (30), cross-validation layout (31), feature-set ablation (32), what each notebook tried (33), train vs validation by campaigns (34) and by trees (35) | mid-term 58, 60, 64-69 | ported; slide 30 compacted in `deck.css` (`is-features-kept`) for the 26px floor. The old "Where the Signal Lives" slide was removed (the decomposition is still in the appendix) |
| 36-40 | Explanations: divider (36), how it works (37), fade vs no-fade example (38), merits: readable by anyone (39), post-campaign themes (40) | new | done; examples from the trader-concentration doc (locked block). Speaker-note owners TBC |
| 41-46 | Project management | mid-term 71-76 | ported |
| 47-49 | Handover | new | placeholders |
| 50 | Q&A | mid-term 80 | ported |
| 51-72 | Appendix | mid-term 81-102 | ported unchanged |

## Open items
- Find every placeholder: `grep -rn "@placeholder" decks/final-presentation/slides`
- Slide numbers inside ported speaker notes and the Q&A note ("#28", "#71") still use mid-term numbers.
- Mid-term open items carry over: campaign counts (54 vs 45 vs 38) and the PM numbers on slides 41-44.
- Slide 13 still uses the mid-term chart data and title; slide 12 benchmark statuses depend on it.
- Appendix needs a backup slide for "How do you know it's the data and not the model?" Slide 61 (learning curve) shows a flat curve, which argues *against* "more data helps": prepare the answer before using it.
- Mid-term slides 77-79 (constraints, edge-setting, what's next) were left out; handover replaces "what's next".

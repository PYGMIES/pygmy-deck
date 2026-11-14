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
| 07 | Limited data diversity (kicker: The constraint): 10 trader-decile bars (top 10% = 54.7% of trades) funnel into 60 campaign tiles, half marked "same few traders again" (60 ≈ 30 of variety) (`diversity-funnel`; replaces the `trader-pile` dots, which is now unused) | new | done; "60 ≈ 30" is rhetorical, campaign count to confirm (see open items) |
| 08 | More modelling won't fix this: 6/30 notebook variants above $0 + Profit = Direction × Size, two sizing rules moved profit < $130/campaign (NB18, `results/trade_size_readout.csv`); callout "More data, not a bigger model" (`big-stat` + `is-formula`, `chevron-callout`) | new | done |
| 09 | C22 built its own platform (500 to 2,000) + "More traders means more data, so the Judge can keep improving" | new | done |
| 10 | Our positioning: make retraining easy (keep at the "why" level; mechanics live in the Auto-Retrainer section) | new | done |
| 11 | Divider: Goals & Impact | mid-term 16 | done |
| 12 | Where the Judge landed: cumulative P&L (`equity-chart`) | mid-term 18 | chart data and title still mid-term numbers; swap in final numbers |
| 13 | What we committed to: benchmarks (fade, random, C22's rule) + midterm promises (magnitude, paper trading, auto-retrainer, explanations) with status pills (`label-card is-status`; green = done, amber `is-warn` = data limitations). Replaces mid-term 17 + 19 | new | benchmark statuses follow slide 12; re-check once final numbers land |
| 14 | Mid-term feedback (the *what*; Explanations covers the *how*). Quote strip under the title (`chevron-callout is-quote`), then three cards. The quote is Prof Kyong's question from the mid-term Q&A (Linear "Mid-term QNA minutes", item 2; the minutes paraphrase it, so it isn't word for word) | new | done; speaker notes need an owner |
| 15 | What C22 gets beyond the Judge: paper trading, scale, daily backups, easy imports (4 cards, `card-grid is-four`) | new | done; speaker notes need an owner |
| 16 | Demo divider (content TBD) | new | divider only |
| 17-18 | System architecture | mid-term 28 | ported; slide 18 has an unconnected Auto-retrainer box above the Judge; kicker "Project Cassandra and Judge · During campaign" |
| 19-24 | Part 1, campaign end to hand-off (title "Project Cassandra Architecture", `arch-after-end`): the full view (19) and five step builds (20-24); lit parts at 100%, the rest at 60% | new | done; trial |
| 25-36 | Part 2, after a challenger is trained, right to left (`arch-promotion`): the full view (25) and eleven step builds (26-36) | new | done; trial |
| 37-48 | Part 2 mirrored to read left to right (`arch-promotion-ltr`): the full view (37) and eleven step builds (38-48) | new | done; trial |
| 49-57 | Auto-retrainer: divider (49), How a New Model Gets Made (50, `flow-owners`), Trigger and Split in four builds (51-54, `split-flow`), Train (55, `train-stages`), Grade (56, `grade-gates`), Three Decisions That Shaped It (57, `decisions-trio`). Owner colours are grey / black / orange tokens | new | done |
| 58-62 | Model promotion and evaluation: poll and grade flow (58), promote flow with rollback strip (59) (`flow-stage`, same visual language as mid-term 43-46), evaluator's four checks in decision order, split two per slide (60: checks 1-2, 61: checks 3-4), each ending in its outcome (29; raw HTML + `.ev-gate` CSS in `deck.css`, accurate to `evaluator/rules.py`), how step 4 decides (30: decision tree Earns more? → Ranks clearly worse? → Wins most campaigns?, equivalent to `decide()` in `rules.py`; `flow-stage` pieces, footnote defines "clearly" = bootstrap) | new; source `poll_training_runs.py`, `grade_challengers.py`, `promote_model.py`, `EVALUATOR_RULES.md` | done; speaker-note owner TBC. Overlaps the placeholders on 22-23 |
| 63-71 | Model training: divider (63), hurdle model (64), data (65), 18 features kept (66), cross-validation layout (67), feature-set ablation (68), what each notebook tried (69), train vs validation by campaigns (70) and by trees (71) | mid-term 58, 60, 64-69 | ported; slide 34 compacted in `deck.css` (`is-features-kept`) for the text-size floor (now 30px). The old "Where the Signal Lives" slide was removed (the decomposition is still in the appendix) |
| 72-76 | Explanations: divider (72), how it works (73), fade vs no-fade example (74), merits: readable by anyone (75), post-campaign themes (76) | new | done; examples from the trader-concentration doc (locked block). Speaker-note owners TBC |
| 77-80 | Project management: divider (77), how we ran Scrum: Plan › Build › Review › Retro (78, `icon-steps`), feedback changes the backlog (79, `statement` + chat screenshot), Sprint 2 → Sprint 3 retro changes (80, `change-table`) | new (replaces mid-term 71-76) | done (79 screenshot: `assets/chat-retraining-flow.png`, `image-frame is-shot` in `deck.css`); speaker notes drafted for Arin |
| 54-57 | Handover: divider (54), what C22 receives (55, `spec-list`), what is left: documented API + FastAPI docs screenshot + animated `plug-in` diagram, C22's platform not ready (57) | new | "How We Hand Over" was removed; speaker notes need an owner |
| 58-63 | Conclusion: divider "10 Conclusion" (58), "Help Inform C22's Next Steps" with the sponsor quote (59, `quote`), "A Fresh Perspective": big "30" beside the notebook scatter chart (60), "Creating a System That Outlives Us": a three-click animated build (61-63, `import-flow` is-step-1..3; Clement imports a file, retraining starts, graded then promoted) | new | speaker notes need an owner |
| 88 | Q&A | mid-term 80 | ported |
| 89-110 | Appendix | mid-term 81-102 | ported unchanged |

## Open items
- Find every placeholder: `grep -rn "@placeholder" decks/final-presentation/slides`
- Slide numbers inside ported speaker notes and the Q&A note ("#28", "#71") still use mid-term numbers.
- Mid-term open items carry over: campaign counts (54 vs 45 vs 38).
- Slide 12 still uses the mid-term chart data and title; slide 13 benchmark statuses depend on it.
- Appendix needs a backup slide for "How do you know it's the data and not the model?" Slide 61 (learning curve) shows a flat curve, which argues *against* "more data helps": prepare the answer before using it.
- Mid-term slides 77-79 (constraints, edge-setting, what's next) were left out; handover replaces "what's next".
- Final "Thank you" slide (`85-qna`) plays the deck-local `cash-rain` component once on open: banknotes fall from the top plus a "KA-CHING!" badge (tokens `--money`, `--money-edge` in both themes; reduced motion shows the badge only).

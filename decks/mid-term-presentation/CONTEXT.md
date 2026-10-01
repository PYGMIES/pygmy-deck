# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Slides 01–03, 05–07 (pain points 1–2), 09 (staircase is illustrative), 10–12, 14–16, 19, 20 (draft), 25–29 and the appendix carry real content; everything else has `@placeholder` boxes / `TODO:` text for each owner.

## Outline (owners)
| # | File | Slide | Owner | State |
|---|------|-------|-------|-------|
| 01 | `01-cover` | Project Cassandra for <Catch22> · course code, supervisor, team (`title-cover`) | — | done |
| 02 | `02-team` | Meet Our Team: leads (PO Isaiah, SM Yan Ting) + devs (Arin, Jamesz, Jerrick, Joyce) | — | done |
| 03 | `03-agenda` | Agenda (content items only, no owners/minutes) | — | done |
| 04 | `04-section-problem` | ◆ 01 The Problem | Joyce | — |
| 05 | `05-sponsor` | Our Sponsor: Catch22 (domain · business needs · our focus) | Joyce | done |
| 06 | `06-c22-today` | What Catch22 is doing today (flow) | Joyce | done |
| 07 | `07-problem-space` | Core conflict + pain points | Joyce | pain point 3 = P&L sketch (schematic, not data) |
| 08 | `08-section-goals` | ◆ 02 Goals & Impact | Joyce | — |
| 09 | `09-success-metrics` | 3 key goals + target staircase (illustrative) | Joyce | measured results TODO |
| 10 | `10-strategy-comparison` | The Real Comparison: cumulative P&L, all strategies on one scale (`equity-chart`) | Joyce | done |
| 11 | `11-business-value` | Research partnership value | Joyce | done |
| 12 | `12-milestones` | Project Milestones: midterm vs final | Joyce | done |
| 13 | `13-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 14 | `14-market-regimes` | How We Picked the Demo Data: 2×2 + how we measure | Joyce, JS | done |
| 15 | `15-demo-data` | The Data Behind Our Choice (trades per slot, beta vs Gold) | Joyce, JS | done |
| 16 | `16-chosen-timeslots` | Chosen Timeslots: 3:30–4:00 typical·calm, 5:30–6:00 busy·volatile | Joyce, JS | done |
| 17 | `17-live-trades` | Live trade page @10×, 2 screens | Jerrick | screenshots TODO |
| 18 | `18-section-architecture` | ◆ 04 System Architecture | Jerrick, James Z | — |
| 19 | `19-architecture` | Architecture diagram | James Z | done |
| 20 | `20-hurdle-model` | What is the hurdle model? Definition + why it fits + 3 arms → gross EV → decision score (`hurdle-flow`) | Jerrick | draft |
| 21 | `21-limitations` | Limitations: scaling, decoupling | James Z | TODO |
| 22 | `22-section-design-decisions` | ◆ 05 Key Design Decisions | Jerrick | — |
| 23 | `23-design-decisions` | Key design decisions | Jerrick | TODO |
| 24 | `24-section-journey` | ◆ 06 How We Got Here | BA | — |
| 25 | `25-training-approach` | Approach to training: data, features, hurdle, evaluate | BA | draft |
| 26 | `26-validation` | Validation frameworks (moved from old 13): blocked CV, point-in-time, CIs | Joyce | done |
| 27 | `27-leak` | Deep dive: the SL/TP leak (AUC 0.667 → 0.620) | TBC | draft |
| 28 | `28-behaviour-vs-luck` | Deep dive: behaviour vs outcome history, SHAP share (59%) | Yanting | draft |
| 29 | `29-magnitude` | Deep dive: 35× magnitude over direction + what we dropped | TBC | draft |
| 30 | `30-section-pm` | ◆ 07 Project Management | Yanting | — |
| 31 | `31-scrum` | Why Scrum over Waterfall | Yanting | TODO |
| 32 | `32-timeline` | Project timeline (now = Midterm) | Yanting | done |
| 33 | `33-retros` | What retros changed | Yanting | TODO |
| 34 | `34-constraints` | Not random sample · 38 campaigns | TBD | done |
| 35 | `35-edge-setting` | Setting the Edge: minimum worthwhile edge per faded trade → $/month → campaigns to confirm; 18 test campaigns rule out >$6 | TBD | draft |
| 36 | `36-whats-next` | Trade magnitude · real pipeline · auto-scaling | TBD | done |
| 37 | `37-qna` | Questions | — | done |
| 38 | `38-section-appendix` | ◆ A Appendix (after Q&A, for backup) | — | — |
| 39–47 | `39-app-correlation` … `47-app-decomposition` | Correlation matrix, learning curve + calibration, SHAP by feature, AUC by arm, cost sweep, models vs luck, market data, tried and dropped, hurdle decomposition | — | draft |
| 48 | `48-app-cv-layout` | Blocked CV layout (nb12_cv_layout.png) | — | draft |
| 49 | `49-app-feature-arms` | The 26 features and which arm keeps which (NB12) | — | draft |
| 50 | `50-app-topk` | Top-k ranking quality by arm vs random (NB12) | — | draft |
| 51 | `51-app-hyperparams` | Judge v5 final hyperparameters (`target_ablation.py` BASE) | — | draft |

Chart PNGs in `assets/` are exported from notebook outputs in `reverse-trade-judge/` (leak_worth, shap_*, auc_by_campaign_arm, hurdle_decomposition, correlation_matrix, learning_curve_calibration, cost_curve, model_vs_random, market_data_shap).

## Open items
- Confirm who presents Constraints & What's Next (agenda says TBD).
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 16 charts use rolling windows (p95 130 / p50 57); slide 16 uses fixed 30-min slots (p95 121.4 / p50 59.5).
- Replace the slide 09 target staircase with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 33 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`
- Slides 27 and 29 need an owner. Slides 25–29 numbers come from `reverse-trade-judge/summarised.md` and `Progress_summary/`.
- Slide 34 says 38 campaigns; the repo summary says 45 (33–77, 68,377 trades); Isaiah thinks it is 33–68 train (36) + 69–86 test (18) = 54. Confirm which is current, then align slides 34–35.
- Slide 26 says "never split a trader across train/test sets"; the repo splits by campaign in time order and reports seen vs unseen trader AUC, so traders do appear in both. Joyce to confirm wording.

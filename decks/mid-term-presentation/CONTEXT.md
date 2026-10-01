# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Slides 01–03, 05–07 (pain points 1–2), 09 (staircase is illustrative), 10–12, 14–16, 19, 20 (draft), 25–32, 33–34 (drafts), 35–42 and the appendix carry real content; everything else has `@placeholder` boxes / `TODO:` text for each owner.

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
| 27 | `27-feature-engineering` | Feature engineering funnel: 28 columns → 26 features → 26 kept of 48 tested → 18 in the Judge (`funnel`) | Yanting | done (check numbers w/ Isaiah) |
| 28 | `28-fe-audit` | Step 1: 28 columns in. Audit; 37.7% closed at SL/TP, leak removed (AUC 0.667→0.620) | Yanting | done |
| 29 | `29-fe-signal` | Step 2: 26 features built (6 ticket / 14 same-campaign / 6 history), strongest four | Yanting | done |
| 30 | `30-fe-stress-test` | Step 3: 48 tested, 0 of 22 new features kept, market data null twice | Yanting | done |
| 31 | `31-fe-final-18` | Step 4: 26 → 18, drop 8 outcome features (6 ticket / 8 behaviour / 4 counters) | Yanting | done |
| 32 | `32-behaviour-vs-luck` | Behaviour vs luck: SHAP share of attention, full 26 vs final 18 (`shap-bars`) | Yanting | done |
| 33 | `33-leak` | Deep dive: the SL/TP leak (AUC 0.667 → 0.620), standalone chart version | TBC | draft |
| 34 | `34-magnitude` | Deep dive: 35× magnitude over direction + what we dropped | TBC | draft |
| 35 | `35-section-pm` | ◆ 07 Project Management | Arin | — |
| 36 | `36-scrum` | Why Scrum over Waterfall: lane diagram (`method-compare`) + 3 reasons | Arin | done |
| 37 | `37-sprint-cycle` | How We Run a Sprint: plan → build → sync → review → retro loop, leads/squads/tools (`sprint-cycle`) | Arin | done |
| 38 | `38-timeline` | Project timeline (now = Midterm) | Arin | done |
| 39 | `39-retros` | What Our Retros Changed: Sprint 7 retro noticed → changed, Sprint 8 39/40 issues (`retro-changes`) | Arin | done |
| 40 | `40-constraints` | Constraints · Data & Model: 9 held-out campaigns, not a random sample, leakage removed (AUC ~0.61), cold start | Arin | done (sourced from Linear) |
| 41 | `41-constraints-system` | Constraints · Sponsor & System: paper trading only, no live feed, true cost unknown ($7.00 assumed) | Arin | done (sourced from Linear) |
| 42 | `42-edge-setting` | Setting the Edge: minimum worthwhile edge per faded trade → $/month → campaigns to confirm; 18 test campaigns rule out >$6 | TBD | draft |
| 43 | `43-whats-next` | Trade magnitude · real pipeline · auto-scaling | Arin | done |
| 44 | `44-qna` | Questions | — | done |
| 45 | `45-section-appendix` | ◆ A Appendix (after Q&A, for backup) | — | — |
| 46–54 | `46-app-correlation` … `54-app-cv-layout` | Correlation matrix, learning curve + calibration, SHAP by feature, AUC by arm, cost sweep, market data, tried and dropped, hurdle decomposition, blocked CV layout | — | draft |
| 55 | `55-app-feature-arms` | The 26 features and which arm keeps which (NB12) | — | draft |
| 56 | `56-app-topk` | Top-k ranking quality by arm vs random (NB12) | — | draft |
| 57 | `57-app-hyperparams` | Judge v5 final hyperparameters (`target_ablation.py` BASE) | — | draft |

Chart PNGs in `assets/` are exported from notebook outputs in `reverse-trade-judge/` (leak_worth, shap_*, auc_by_campaign_arm, hurdle_decomposition, correlation_matrix, learning_curve_calibration, cost_curve, model_vs_random, market_data_shap).

## Open items
- Slides 33 and 28 both tell the SL/TP leak (kept both on purpose); trim one if the talk runs long.
- Slides 33–34 need an owner. Slides 25–26 and 33–34 numbers come from `reverse-trade-judge/summarised.md` and `Progress_summary/`.
- Linear (PYG-103) shows 45 campaigns / 68,377 trades; the old constraints slide said 38 and now shows the 9 held-out campaigns. Isaiah thinks it is 33–68 train (36) + 69–86 test (18) = 54. Confirm which is current, then align slides 40 and 42.
- Slides 36–37 numbers come from PYG-92, 144, 185 and the SOW; re-check them if the model or the 18-feature freeze changes.
- PM slides 36–39 are sourced from Linear (SOW, Sprint 7 retro board + minutes, cycle stats). Only the Sprint 7 retro is filled in; Calf/Juvenile retro docs are empty templates. Add later retros to slide 39 when written up.
- Constraints & What's Next (slides 40–43) are presented by Arin; slide 42 owner TBD.
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 15 charts use rolling windows (p95 130 / p50 57); slide 16 uses fixed 30-min slots (p95 121.4 / p50 59.5).
- Replace the slide 09 target staircase with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 38 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`
- Slide 26 says "never split a trader across train/test sets"; the repo splits by campaign in time order and reports seen vs unseen trader AUC, so traders do appear in both. Joyce to confirm wording.

# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Slides 01–03, 05–07 (pain points 1–2), 09 (staircase is illustrative), 10–12, 14–16, 19, 20 (draft), 24–40 (sync + async + race-condition builds, Redis, cache, SSE, Docker), 38–46, 47–48 (drafts), 49–56 and the appendix carry real content; everything else has `@placeholder` boxes / `TODO:` text for each owner.

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
| 10 | `10-strategy-comparison` | We beat 2 of the 3 benchmarks: cumulative P&L, all strategies on one scale (`equity-chart`) | Joyce | done |
| 11 | `11-business-value` | Research partnership value | Joyce | done |
| 12 | `12-milestones` | Project Milestones: midterm vs final | Joyce | done |
| 13 | `13-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 14 | `14-market-regimes` | How We Picked the Demo Data: 2×2 + how we measure | Joyce, JS | done |
| 15 | `15-demo-data` | The Data Behind Our Choice (trades per slot, beta vs Gold) | Joyce, JS | done |
| 16 | `16-chosen-timeslots` | Chosen Timeslots: 3:30–4:00 typical·calm, 5:30–6:00 busy·volatile | Joyce, JS | done |
| 18 | `18-section-architecture` | ◆ 04 System Architecture | Jerrick, James Z | — |
| 19 | `19-architecture` | Architecture diagram | James Z | done |
| 22 | `22-section-design-decisions` | ◆ 05 Key Design Decisions | Jerrick | — |
| 23 | `23-design-decisions` | Key design decisions | Jerrick | TODO |
| 24 | `24-sync-1-request` | Processing trades asynchronously, "If it was synchronous…" step 1: Request → FastAPI (build, one element per slide) | Jerrick | done (rebuilt from Jerrick's images) |
| 25 | `25-sync-2-open` | Sync step 2: FastAPI → Process open trade, with Judge, Oanda price service, database | Jerrick | done |
| 26 | `26-sync-3-close` | Sync step 3: Process close trade + database | Jerrick | done |
| 27 | `27-sync-4-response` | Sync step 4: Response only after the whole process is completed | Jerrick | done |
| 28 | `28-async-1-request` | Processing trades asynchronously, step 1: Request → FastAPI (build, one element per slide) | Jerrick | done (rebuilt from Jerrick's images) |
| 29 | `29-async-2-queues` | Step 2: FastAPI → open / close trade queues | Jerrick | done |
| 30 | `30-async-3-response` | Step 3: immediate response after enqueuing | Jerrick | done (caption copied verbatim: "Immediate provide a response…") |
| 31 | `31-async-4-workers` | Step 4: workers, Judge (inference), Oanda price service, database | Jerrick | done |
| 32 | `32-race-1-queues` | Race conditions · Problem: close trade 11 can be ahead of its open trade (open 12,11,10 / close 12,11) | Jerrick | done |
| 33 | `33-race-2-check-db` | Close worker takes 11, checks the DB for the open trade | Jerrick | done |
| 34 | `34-race-3-no-match` | No corresponding open trade: 11 fails (red cross) | Jerrick | done |
| 35 | `35-race-4-solution` | Solution (tag flips green) | Jerrick | done |
| 36 | `36-race-5-requeue` | Move it to the back of the close queue to try again later | Jerrick | done |
| 37 | `37-why-redis` | Why Redis?: one Redis (streams, hashes, pub/sub) + Redis vs Kafka vs RabbitMQ table (`redis-roles`, `compare-table`) | Jerrick | done |
| 38 | `38-cache-check` | Check the Cache Before Predicting: Redis hash vs Postgres trade count → Judge, else rebuild (`cache-check`) | Jerrick | done |
| 39 | `39-sse` | Live dashboard using Server-Sent Events: Workers → Redis → FastAPI → Dashboard; WebSocket vs SSE (`sse-flow`) | Jerrick | done |
| 40 | `40-docker-local` | Dockerised, Deployed On-Site: containers on Catch22's machine + 3 reasons (`local-stack`) | Jerrick | done |
| 41 | `41-section-journey` | ◆ 06 How We Got Here | BA | — |
| 42 | `42-hurdle-model` | What is the hurdle model? Definition + why it fits + 3 arms → gross EV → decision score (`hurdle-flow`) | Jerrick | draft |
| 43 | `43-training-approach` | Approach to training: data, features, hurdle, evaluate | BA | draft |
| 45 | `45-app-cv-layout` | Blocked CV layout: six expanding folds + locked test block (moved from appendix, was 68) | TBC | draft |
| 46 | `46-feature-engineering` | Feature engineering funnel: 28 columns → 26 features → 26 kept of 48 tested → 18 in the Judge (`funnel`) | Yanting | done (check numbers w/ Isaiah) |
| 47 | `47-app-arms` | Moved from appendix (was 63) | TBC | draft |
| 48 | `48-notebook-scatter` | $/campaign by notebook (07→15), one dot per variant, hover for what each notebook changed (`scatter-chart`) | BA | draft |
| 50 | `50-behaviour-vs-luck` | Behaviour vs luck: SHAP share of attention, full 26 vs final 18 (`shap-bars`) | Yanting | done |
| 51 | `51-leak` | Deep dive: the SL/TP leak (AUC 0.667 → 0.620), standalone chart version | TBC | draft |
| 52 | `52-magnitude` | Deep dive: 35× magnitude over direction + what we dropped | TBC | draft |
| 53 | `53-section-pm` | ◆ 07 Project Management | Arin | — |
| 54 | `54-scrum` | Why Scrum over Waterfall: lane diagram (`method-compare`) + 3 reasons | Arin | done |
| 55 | `55-sprint-cycle` | How We Run a Sprint: plan → build → sync → review → retro loop, leads/squads/tools (`sprint-cycle`) | Arin | done |
| 56 | `56-timeline` | Project timeline (now = Midterm) | Arin | done |
| 57 | `57-retros` | What Our Retros Changed: Sprint 7 retro noticed → changed, Sprint 8 39/40 issues (`retro-changes`) | Arin | done |
| 58 | `58-constraints` | Constraints · Data & Model: 18 held-out campaigns, not a random sample, C22 rules (1 open trade, first come first served), ~6 months of data (correlated, not independent) | Arin | done (sourced from Linear) |
| 59 | `59-constraints-system` | Constraints · Sponsor & System: paper trading only, no live feed, true cost unknown ($7.00 assumed) | Arin | done (sourced from Linear) |
| 60 | `60-edge-setting` | How Big a Test Do We Need?: minimum worthwhile edge per faded trade → $/month → campaigns to confirm; 18 test campaigns detect edges of ~$10+ | TBD | draft |
| 61 | `61-whats-next` | Trade magnitude · real pipeline · auto-scaling | Arin | done |
| 62 | `62-qna` | Questions | — | done |
| 63 | `63-section-appendix` | ◆ A Appendix (after Q&A, for backup) | — | — |
| 64–72 | `64-app-correlation` … `72-app-cv-layout` | Correlation matrix, learning curve + calibration, SHAP by feature, AUC by arm, cost sweep, market data, tried and dropped, hurdle decomposition, blocked CV layout | — | draft |
| 73 | `73-app-feature-arms` | The 26 features and which arm keeps which (NB12) | — | draft |
| 74 | `74-app-topk` | Top-k ranking quality by arm vs random (NB12) | — | draft |
| 75 | `75-app-hyperparams` | Judge v5 final hyperparameters (`target_ablation.py` BASE) | — | draft |

Chart PNGs in `assets/` are exported from notebook outputs in `reverse-trade-judge/` (leak_worth, shap_*, auc_by_campaign_arm, hurdle_decomposition, correlation_matrix, learning_curve_calibration, cost_curve, model_vs_random, market_data_shap).

## Open items
- Slides 47 and 42 both tell the SL/TP leak (kept both on purpose); trim one if the talk runs long.
- Slides 47–48 need an owner. Slides 39–40 and 47–48 numbers come from `reverse-trade-judge/summarised.md` and `Progress_summary/`.
- Linear (PYG-103) shows 45 campaigns / 68,377 trades; the old constraints slide said 38 and now shows the 9 held-out campaigns. Isaiah thinks it is 33–68 train (36) + 69–86 test (18) = 54. Confirm which is current, then align slides 54 and 56.
- Slides 50–51 numbers come from PYG-92, 144, 185 and the SOW; re-check them if the model or the 18-feature freeze changes.
- PM slides 50–53 are sourced from Linear (SOW, Sprint 7 retro board + minutes, cycle stats). Only the Sprint 7 retro is filled in; Calf/Juvenile retro docs are empty templates. Add later retros to slide 53 when written up.
- Constraints & What's Next (slides 54–57) are presented by Arin; slide 56 owner TBD.
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 15 charts use rolling windows (p95 130 / p50 57); slide 16 uses fixed 30-min slots (p95 121.4 / p50 59.5).
- Replace the slide 09 target staircase with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 52 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- `33-leak` was deleted from `slides/`; its row is now slide 47 and the numbering has a gap there after the inserts.
- Slide 30 caption reads "Immediate provide a response after enqueuing" (copied from Jerrick's image); fix the grammar if he agrees.
- Slides 24–36 are a step-by-step build (24–27 "if it was synchronous", 28–31 async, 32–36 race condition): each slide repeats the previous diagram and only the new piece has `reveal`. Keep them in order when editing.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`
- Slide 40 says "never split a trader across train/test sets"; the repo splits by campaign in time order and reports seen vs unseen trader AUC, so traders do appear in both. Joyce to confirm wording.

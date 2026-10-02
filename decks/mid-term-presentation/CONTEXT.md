# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Most content slides are done; the section-05 `design-decisions` slide still has TODOs or placeholders, and 47, 48, 50, 54, 55, 56, 57, 64 are drafts.

## Outline (owners)
| # | File | Slide | Owner | State |
|---|------|-------|-------|-------|
| 1 | `01-cover` | Project Cassandra for <Catch22> · course code, supervisor, team (`title-cover`) | — | done |
| 2 | `02-team` | Meet Our Team: leads (PO Isaiah, SM Yan Ting) + devs (Arin, Jamesz, Jerrick, Joyce) | — | done |
| 3 | `03-agenda` | Agenda (content items only, no owners/minutes) | — | done |
| 4 | `04-section-problem` | ◆ 01 The Problem | Joyce | — |
| 5 | `05-sponsor` | Our Sponsor: Catch22 (domain · business needs · our focus) | Joyce | done |
| 6 | `06-c22-story-join` | Story 1: Sally joins a challenge (`c22-flow` is-step-2 + `c22-story`) | Joyce | done |
| 7 | `07-c22-story-trade` | Story 2: Sally trades inside C22's rule book (generic, no specific rules) | Joyce | done |
| 8 | `08-c22-story-signal` | Story 3: her trade is a signal that someone in the real market (Alex) is doing the same | Joyce | done |
| 9 | `09-c22-story-judge` | Story 4: C22 can reverse Alex's trade; the Judge decides (our focus) | Joyce | done |
| 10 | `10-problem-space` | Core conflict + pain points | Joyce | pain point 3 = P&L sketch (schematic, not data) |
| 11 | `11-section-goals` | ◆ 02 Goals & Impact | Joyce | — |
| 12 | `12-success-metrics` | 3 key goals + target staircase (illustrative) | Joyce | measured results TODO |
| 13 | `13-strategy-comparison` | We beat 2 of the 3 benchmarks: cumulative P&L, all strategies on one scale (`equity-chart`) | Joyce | done |
| 14 | `14-business-value` | Research partnership value | Joyce | done |
| 15 | `15-milestones` | Project Milestones: midterm vs final | Joyce | done |
| 16 | `16-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 17 | `17-market-regimes` | How We Picked the Demo Data: 2×2 + how we measure | Joyce, JS | done |
| 18 | `18-demo-data` | The Data Behind Our Choice (trades per slot, beta vs Gold) | Joyce, JS | done |
| 19 | `19-chosen-timeslots` | Chosen Timeslots: 3:30–4:00 typical·calm, 5:30–6:00 busy·volatile | Joyce, JS | done |
| 20 | `20-section-architecture` | ◆ 04 System Architecture | Jamesz | — |
| 21 | `21-nfrs` | Non-Functional Requirements: 6 requirements in 2 groups (data integrity & safety: reliability, auditability, idempotency | execution & performance: latency, throughput, sequencing) (`req-card`) | Jamesz | done |
| 22 | `22-architecture` | Architecture diagram | James Z | done |
| 23 | `23-workflow-campaign-start` | Workflow 1: Campaign Start (6-step flow, 2 arrowed notes, transaction callout) | James Z | done |
| 24 | `24-workflow-open-trade` | Workflow 2: Open Trade (6-step flow, steps 3–6 framed as async, 2 arrowed notes + Key notes card) | James Z | done |
| 25 | `25-workflow-close-trade` | Workflow 3: Close Trade (6-step flow, steps 3–6 framed as async, Key notes card) | James Z | done |
| 26 | `26-workflow-campaign-end` | Workflow 4: Campaign End & Evaluation (5-step flow, Key notes card) | James Z | done |
| 27 | `27-sync-1-request` | Processing trades asynchronously, "If it was synchronous…" step 1: Request → FastAPI (build, one element per slide) | Jerrick | done (rebuilt from Jerrick's images) |
| 28 | `28-sync-2-open` | Sync step 2: FastAPI → Process open trade, with Judge, Oanda price service, database | Jerrick | done |
| 29 | `29-sync-3-close` | Sync step 3: Process close trade + database | Jerrick | done |
| 30 | `30-sync-4-response` | Sync step 4: Response only after the whole process is completed | Jerrick | done |
| 31 | `31-section-design-decisions` | ◆ 05 Key Design Decisions | Jerrick | — |
| 32 | `32-design-decisions` | Key design decisions | Jerrick | TODO |
| 33 | `33-async-1-request` | Processing trades asynchronously, step 1: Request → FastAPI (build, one element per slide) | Jerrick | done (rebuilt from Jerrick's images) |
| 34 | `34-async-2-queues` | Step 2: FastAPI → open / close trade queues | Jerrick | done |
| 35 | `35-async-3-response` | Step 3: immediate response after enqueuing | Jerrick | done (caption copied verbatim: "Immediate provide a response…") |
| 36 | `36-async-4-workers` | Step 4: workers, Judge (inference), Oanda price service, database | Jerrick | done |
| 37 | `37-race-1-queues` | Race conditions · Problem: close trade 11 can be ahead of its open trade (open 12,11,10 / close 12,11) | Jerrick | done |
| 38 | `38-race-2-check-db` | Close worker takes 11, checks the DB for the open trade | Jerrick | done |
| 39 | `39-race-3-no-match` | No corresponding open trade: 11 fails (red cross) | Jerrick | done |
| 40 | `40-race-4-solution` | Solution (tag flips green) | Jerrick | done |
| 41 | `41-race-5-requeue` | Move it to the back of the close queue to try again later | Jerrick | done |
| 42 | `42-why-redis` | Why Redis?: one Redis (streams, hashes, pub/sub) + Redis vs Kafka vs RabbitMQ table (`redis-roles`, `compare-table`) | Jerrick | done |
| 43 | `43-cache-check` | Check the Cache Before Predicting: Redis hash vs Postgres trade count → Judge, else rebuild (`cache-check`) | Jerrick | done |
| 44 | `44-sse` | Live dashboard using Server-Sent Events: Workers → Redis → FastAPI → Dashboard; WebSocket vs SSE (`sse-flow`) | Jerrick | done |
| 45 | `45-docker-local` | Dockerised, Deployed On-Site: containers on Catch22's machine + 3 reasons (`local-stack`) | Jerrick | done |
| 46 | `46-section-journey` | ◆ 06 How We Got Here | BA | — |
| 47 | `47-hurdle-model` | What is the hurdle model? Definition + why it fits + 3 arms → gross EV → decision score (`hurdle-flow`) | Jerrick | draft |
| 48 | `48-training-approach` | Approach to training: data, features, hurdle, evaluate | BA | draft |
| 49 | `49-data` | How the Data was used: 54 campaigns from C22 + train/test split table (`panel-card`), feature count by version v1–v5 21→26→45→26→18, v5 = final frozen set (`funnel` is-in-card) | Yanting | done |
| 50 | `50-before-features` | Raw Fields We Ruled Out: no variance (6) · IDs & identity (7) · near-duplicates (3, rₛ > 0.8 in the note; commission↔amount, openPrice↔campaignId; kept amount, inline) · outcome leakage (2), no foot lines (`feature-group` ×4, compact via `.is-before-features` in deck.css) | Yanting | draft |
| 51 | `51-features-dropped` | The 13 Features We Dropped: leakage (6, `feature-group`) · fair but didn’t pay (7, `panel-card` with inline-SVG without→with chart: same-day habits −$1,591→−$9,162, market data +$1,205→−$3,515; p_sl overlapped 90% with stop-loss habit) | Yanting | done |
| 52 | `52-outcome-features` | Why We Left Out Outcomes: 8 outcome features (`feature-group`) + Using SHAP: share of model attention, full 26 vs final 18 (`shap-bars`, merged from old 54 Behaviour vs Luck; compact via `.is-outcome-shap` in deck.css) | Yanting | done |
| 53 | `53-features-kept` | The 18 Features We Kept: trade itself (6) · earlier today (8) · earlier days (4) (`feature-group`) | Yanting | done |
| 54 | `54-app-cv-layout` | Blocked CV layout: six expanding folds + locked test block (moved from appendix) | TBC | draft |
| 55 | `55-app-arms` | Moved from appendix | TBC | draft |
| 56 | `56-notebook-scatter` | $/campaign by notebook (07→15), one dot per variant, hover for what each notebook changed (`scatter-chart`) | BA | draft |
| 57 | `57-magnitude` | Deep dive: 35× magnitude over direction + what we dropped | TBC | draft |
| 58 | `58-section-pm` | ◆ 07 Project Management | Arin | — |
| 59 | `59-scrum` | Why Scrum over Waterfall: lane diagram (`method-compare`) + 3 reasons | Arin | done |
| 60 | `60-sprint-cycle` | How We Run a Sprint: plan → build → sync → review → retro loop, leads/squads/tools (`sprint-cycle`) | Arin | done |
| 61 | `61-timeline` | Project timeline (now = Midterm) | Arin | done |
| 62 | `62-retros` | What Our Retros Changed: Sprint 7 retro noticed → changed, 205 story points completed (`retro-changes`) | Arin | done |
| 63 | `63-constraints` | Constraints · Data & Model: 18 held-out campaigns, not a random sample, C22 rules (1 open trade, first come first served), ~6 months of data (correlated, not independent) | Arin | done (sourced from Linear) |
| 64 | `64-edge-setting` | How Big a Test Do We Need?: minimum worthwhile edge per faded trade → $/month → campaigns to confirm; 18 test campaigns detect edges of ~$10+ | TBD | draft |
| 65 | `65-whats-next` | Auto-retrainer · real pipeline · trade magnitude · auto-scaling · non-functional reqs · observability (6 cards, 3 + 3) | Arin | done |
| 66 | `66-qna` | Questions | — | done |
| 67 | `67-section-appendix` | ◆ A Appendix (after Q&A, for backup) | — | — |
| 68–77 | `68-app-correlation` … `77-app-hyperparams` | Correlation matrix, learning curve + calibration, SHAP by feature, cost sweep, market data, tried and dropped, hurdle decomposition, feature arms, top-k, hyperparameters | — | draft |

Chart PNGs in `assets/` are exported from notebook outputs in `reverse-trade-judge/` (leak_worth, shap_*, auc_by_campaign_arm, hurdle_decomposition, correlation_matrix, learning_curve_calibration, cost_curve, model_vs_random, market_data_shap).

## Open items
- Slide 57 (`magnitude`) and slide 56 (`notebook-scatter`) need an owner. Numbers on slides 48, 56 and 57 come from `reverse-trade-judge/summarised.md` and `Progress_summary/`.
- Linear (PYG-103) shows 45 campaigns / 68,377 trades; the old constraints slide said 38 and now shows 18 held-out campaigns. Isaiah thinks it is 33–68 train (36) + 69–86 test (18) = 54. Confirm which is current, then align slides 63 and 64.
- Slides 59–60 numbers come from PYG-92, 144, 185 and the SOW; re-check them if the model or the 18-feature freeze changes.
- PM slides 59–62 are sourced from Linear (SOW, Sprint 7 retro board + minutes, cycle stats). Only the Sprint 7 retro is filled in; Calf/Juvenile retro docs are empty templates. Add later retros to slide 62 when written up.
- Constraints & What's Next (slides 63–65) are presented by Arin; slide 64 owner TBD.
- Slide 65 lists "Non-functional reqs" as a next step while slide 21 already presents the NFRs; decide whether the card stays.
- Slide 47 (`hurdle-model`) sits in the "How We Got Here" section.
- Slides 27–30 (sync, "if it was synchronous") follow the workflow slides 23–26 and lead into the async build at 33–36.
- Slides 54 (`app-cv-layout`, after the feature slides) and 55 (`app-arms`) were moved from the appendix into the main flow.
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 18 charts use rolling windows (p95 130 / p50 57); slide 19 uses fixed 30-min slots (p95 121.4 / p50 59.5).
- Replace the slide 12 target staircase with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 61 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Slide 35 caption reads "Immediate provide a response after enqueuing" (copied from Jerrick's image); fix the grammar if he agrees.
- Slides 24–38 are a step-by-step build (sync, async, race condition): each slide repeats the previous diagram and only the new piece has `reveal`. Keep them in order when editing.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`

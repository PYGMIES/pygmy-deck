# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Most content slides are done; 44, 46, 52, 53, 55, 63 are drafts.

## Outline (owners)
| # | File | Slide | Owner | State |
|---|------|-------|-------|-------|
| 1 | `01-cover` | Project Cassandra for <Catch22> · course code, supervisor, team (`title-cover`) | — | done |
| 2 | `02-team` | Meet Our Team: leads (PO Isaiah, SM Yan Ting) + devs (Arin, Jamesz, Jerrick, Joyce) | — | done |
| 3 | `03-agenda` | Agenda (content items only, no owners/minutes) | — | done |
| 4 | `04-section-problem` | ◆ 01 The Problem | Joyce | — |
| 5 | `05-sponsor` | Our Sponsor: Catch22 (domain · business needs · our focus) | Joyce | done |
| 6 | `06-c22-today` | What Catch22 is doing today (flow) | Joyce | done |
| 7 | `07-problem-space` | Core conflict + pain points | Joyce | pain point 3 = P&L sketch (schematic, not data) |
| 8 | `08-section-goals` | ◆ 02 Goals & Impact | Joyce | — |
| 9 | `09-success-metrics` | 3 key goals + target staircase (illustrative) | Joyce | measured results TODO |
| 10 | `10-strategy-comparison` | We beat 2 of the 3 benchmarks: cumulative P&L, all strategies on one scale (`equity-chart`) | Joyce | done |
| 11 | `11-business-value` | Research partnership value | Joyce | done |
| 12 | `12-milestones` | Project Milestones: midterm vs final | Joyce | done |
| 13 | `13-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 14 | `14-market-regimes` | How We Picked the Demo Data: 2×2 + how we measure | Joyce, JS | done |
| 15 | `15-demo-data` | The Data Behind Our Choice (trades per slot, beta vs Gold) | Joyce, JS | done |
| 16 | `16-chosen-timeslots` | Chosen Timeslots: 3:30–4:00 typical·calm, 5:30–6:00 busy·volatile | Joyce, JS | done |
| 17 | `17-demo-campaigns` | Demo Campaigns: lookup table of the four demo campaign IDs → timeslot (78 Typical Calm, 79 Typical Volatile, 80 Busiest Calm, 81 Busiest Volatile) (`compare-table is-lookup`) | TBD | done |
| 18 | `18-section-architecture` | ◆ 04 System Architecture | Jamesz | — |
| 19 | `19-nfrs` | Non-Functional Requirements: 6 requirements in 2 groups (data integrity & safety: reliability, auditability, idempotency | execution & performance: latency, throughput, sequencing) (`req-card`). Three of these cards are mirrored in section 05 (`nfr-*`): keep them in sync, see CLAUDE.md | Jamesz | done |
| 20 | `20-architecture` | Architecture diagram | James Z | done |
| 21 | `21-workflow-campaign-start` | Workflow 1: Campaign Start (6-step flow, 2 arrowed notes, transaction callout) | James Z | done |
| 22 | `22-workflow-open-trade` | Workflow 2: Open Trade (6-step flow, steps 3–6 framed as async, 2 arrowed notes + Key notes card) | James Z | done |
| 23 | `23-workflow-close-trade` | Workflow 3: Close Trade (6-step flow, steps 3–6 framed as async, Key notes card) | James Z | done |
| 24 | `24-workflow-campaign-end` | Workflow 4: Campaign End & Evaluation (5-step flow, Key notes card) | James Z | done |
| 25 | `25-section-design-decisions` | ◆ 05 Key Design Decisions | Jerrick | — |
| 26 | `26-nfr-1-concurrency` | NFR overview (`nfr-overview`): Concurrency & throughput active, others 50% | Jerrick | done |
| 27 | `27-async-1-sync` | Decision 01 · Process Trades Asynchronously, "If it was synchronous…": Request → FastAPI → process open (Judge, OANDA, DB) / close (DB) | Jerrick | done |
| 28 | `28-async-2-sync-response` | + Response only after the whole process is completed | Jerrick | done |
| 29 | `29-async-3-queues` | "Asynchronous": FastAPI → open/close queues, immediate response | Jerrick | done |
| 30 | `30-async-4-workers` | + workers processing open (Judge, OANDA, DB) and close (DB) | Jerrick | done |
| 31 | `31-nfr-2-sequencing` | NFR overview: Sequencing active | Jerrick | done |
| 32 | `32-race-1-queues` | Decision 02 · Race Conditions · Problem: close 11 is ahead of its open | Jerrick | done |
| 33 | `33-race-2-check-db` | Token 11 moves into the close worker, which checks the DB | Jerrick | done |
| 34 | `34-race-3-no-match` | No corresponding open trade (red cross) | Jerrick | done |
| 35 | `35-race-4-solution` | Tag flips to Solution; the cross on trade 11 is gone | Jerrick | done |
| 36 | `36-race-5-requeue` | Token 11 moves to the back of the close queue | Jerrick | done |
| 37 | `37-nfr-3-latency` | NFR overview: Processing latency active | Jerrick | done |
| 38 | `38-why-redis` | Decision 03 · Why Redis?: separate broker (2 systems on the trade's path) vs one in-memory Redis; motivation cards: fewer distributed systems, less network latency (`redis-why`) | Jerrick | done |
| 39 | `39-nfr-4-deployment` | NFR overview: Deployment active | Jerrick | done |
| 40 | `40-docker-local` | Decision 04 · Dockerised, Deployed On-Site: 3 reasons (dark cards, left) + containers on Catch22's machine (right) (`local-stack`) | Jerrick | done |
| 43 | `43-section-journey` | ◆ 06 How We Got Here | BA | — |
| 44 | `44-hurdle-model` | What is the hurdle model? Definition + why it fits + 3 arms → gross EV → decision score (`hurdle-flow`) | Jerrick | draft |
| 45 | `45-training-approach` | Approach to training: data, features, hurdle, evaluate | BA | draft |
| 46 | `46-data` | How the Data was used: 54 campaigns from C22 + train/test split table (`panel-card`), feature count by version v1–v5 21→26→45→26→18, v5 = final frozen set (`funnel` is-in-card) | Yanting | done |
| 47 | `47-before-features` | Raw Fields We Ruled Out: no variance (6) · IDs & identity (7) · near-duplicates (3, rₛ > 0.8 in the note; commission↔amount, openPrice↔campaignId; kept amount, inline) · outcome leakage (2), no foot lines (`feature-group` ×4, compact via `.is-before-features` in deck.css) | Yanting | draft |
| 48 | `48-features-dropped` | The 13 Features We Dropped: leakage (6, `feature-group`) · fair but didn’t pay (7, `panel-card` with inline-SVG without→with chart: same-day habits −$1,591→−$9,162, market data +$1,205→−$3,515; p_sl overlapped 90% with stop-loss habit) | Yanting | done |
| 49 | `49-outcome-features` | Why We Left Out Outcomes: 8 outcome features (`feature-group`) + Using SHAP: share of model attention, full 26 vs final 18 (`shap-bars`, merged from old 54 Behaviour vs Luck; compact via `.is-outcome-shap` in deck.css) | Yanting | done |
| 50 | `50-features-kept` | The 18 Features We Kept: trade itself (6) · earlier today (8) · earlier days (4) (`feature-group`) | Yanting | done |
| 51 | `51-app-cv-layout` | Blocked CV layout: six expanding folds + locked test block (moved from appendix) | TBC | draft |
| 52 | `52-app-arms` | Moved from appendix | TBC | draft |
| 53 | `53-notebook-scatter` | $/campaign by notebook (07→15), one dot per variant, hover for what each notebook changed (`scatter-chart`) | BA | draft |
| 54 | `54-magnitude` | Deep dive: 35× magnitude over direction + what we dropped | TBC | draft |
| 55 | `55-section-pm` | ◆ 07 Project Management | Arin | — |
| 56 | `56-scrum` | Why Scrum over Waterfall: lane diagram (`method-compare`) + 3 reasons | Arin | done |
| 57 | `57-sprint-cycle` | How We Run a Sprint: plan → build → sync → review → retro loop, leads/squads/tools (`sprint-cycle`) | Arin | done |
| 58 | `58-timeline` | Project timeline (now = Midterm) | Arin | done |
| 59 | `59-retros` | What Our Retros Changed: Sprint 7 retro noticed → changed, 205 story points completed (`retro-changes`) | Arin | done |
| 60 | `60-constraints` | Constraints · Data & Model: 18 held-out campaigns, not a random sample, C22 rules (1 open trade, first come first served), ~6 months of data (correlated, not independent) | Arin | done (sourced from Linear) |
| 61 | `61-edge-setting` | How Big a Test Do We Need?: minimum worthwhile edge per faded trade → $/month → campaigns to confirm; 18 test campaigns detect edges of ~$10+ | TBD | draft |
| 62 | `62-whats-next` | Auto-retrainer · real pipeline · trade magnitude · auto-scaling · non-functional reqs · observability (6 cards, 3 + 3) | Arin | done |
| 63 | `63-qna` | Questions | — | done |
| 64 | `64-section-appendix` | ◆ A Appendix (after Q&A, for backup) | — | — |
| 65–74 | `65-app-correlation` … `74-app-hyperparams` | Correlation matrix, learning curve + calibration, SHAP by feature, cost sweep, market data, tried and dropped, hurdle decomposition, feature arms, top-k, hyperparameters | — | draft |

Chart PNGs in `assets/` are exported from notebook outputs in `reverse-trade-judge/` (leak_worth, shap_*, auc_by_campaign_arm, hurdle_decomposition, correlation_matrix, learning_curve_calibration, cost_curve, model_vs_random, market_data_shap).

## Open items
- Slide 54 (`magnitude`) and slide 53 (`notebook-scatter`) need an owner. Numbers on slides 45, 53 and 54 come from `reverse-trade-judge/summarised.md` and `Progress_summary/`.
- Linear (PYG-103) shows 45 campaigns / 68,377 trades; the old constraints slide said 38 and now shows 18 held-out campaigns. Isaiah thinks it is 33–68 train (36) + 69–86 test (18) = 54. Confirm which is current, then align slides 61 and 63.
- Slides 57–58 numbers come from PYG-92, 144, 185 and the SOW; re-check them if the model or the 18-feature freeze changes.
- PM slides 57–60 are sourced from Linear (SOW, Sprint 7 retro board + minutes, cycle stats). Only the Sprint 7 retro is filled in; Calf/Juvenile retro docs are empty templates. Add later retros to slide 60 when written up.
- Constraints & What's Next (slides 61–64) are presented by Arin; slide 63 owner TBD.
- Slide 62 lists "Non-functional reqs" as a next step while slide 19 already presents the NFRs; decide whether the card stays.
- Slide 44 (`hurdle-model`) sits in the "How We Got Here" section.
- Slides 51 (`app-cv-layout`, after the feature slides) and 52 (`app-arms`) were moved from the appendix into the main flow.
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 15 charts use rolling windows (p95 130 / p50 57); slide 16 uses fixed 30-min slots (p95 121.4 / p50 59.5). Slide 17 lists four demo campaigns (78–81, one per quadrant) while slides 14 and 16 tag only two quadrants as demo slots.
- Replace the slide 09 target staircase with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 59 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Section 05 (25–40) is framed by the NFRs: the `nfr-overview` slide (26, 31, 37, 39) opens each group with that NFR at full opacity, and every content slide carries the same card top-right (`dd-heading`). Adjacent slides use match-and-move (`data-morph`, core/CONTEXT.md): the NFR card glides between the grid and the corner, trade tokens glide between queue and worker, and identical diagram pieces stay put. Builds (27–30, 32–36) repeat the previous diagram; only new pieces have `reveal`. Keep them in order when editing.
- Slide numbers 41–42 are unused (gap left so 43+ keep their names).
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`

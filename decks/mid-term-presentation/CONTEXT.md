# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Most content slides are done; 57, 60, 61, 63, 64, 65, 66, 67, 74 are drafts.

## Outline (owners)
| # | File | Slide | Owner | State |
|---|------|-------|-------|-------|
| 1 | `01-cover` | Project Cassandra for <Catch22> · course code, supervisor, team (`title-cover`) | — | done |
| 2 | `02-team` | Meet Our Team: leads (PO Isaiah, SM Yan Ting) + devs (Arin, Jamesz, Jerrick, Joyce) | — | done |
| 3 | `03-agenda` | Agenda (content items only, no owners/minutes) | — | done |
| 4 | `04-section-problem` | ◆ 01 The Problem | Joyce | — |
| 5 | `05-sponsor` | Our Sponsor: Catch22 (domain · business needs · our focus) | Joyce | done |
| 6–14 | `06-uj-meet-sally` … `14-uj-whole-journey` | Canva "c22 user journey" pages as full-bleed images (`full-image`, `assets/uj-*.jpg`): Meet Sally · C22 posts a challenge · Sally joins · Sally trades by C22's rules · Meet Alex · C22 can take the other side · Not every trade should be reversed · The Judge decides · The Whole Journey. Text lives in the image: edit in Canva and re-export. | Joyce | done |
| 15 | `15-problem-space` | Core conflict + pain points | Joyce | pain point 3 = P&L sketch (schematic, not data) |
| 16 | `16-section-goals` | ◆ 02 Goals & Impact | Joyce | — |
| 17 | `17-success-metrics` | 3 key goals + target staircase (illustrative) | Joyce | measured results TODO |
| 18 | `18-strategy-comparison` | We beat 2 of the 3 benchmarks: cumulative P&L, all strategies on one scale (`equity-chart`) | Joyce | done |
| 19 | `19-business-value` | Research partnership value | Joyce | done |
| 20 | `20-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 21 | `21-section-architecture` | ◆ 04 System Architecture | Jamesz | — |
| 22 | `22-nfrs` | Non-Functional Requirements: 6 requirements in 2 groups (data integrity & safety: reliability, auditability, idempotency | execution & performance: latency, throughput, sequencing) (`req-card`). Three of these cards are mirrored in section 05 (`nfr-*`): keep them in sync, see CLAUDE.md | Jamesz | done |
| 23 | `23-architecture-input-output` | Architecture, pillar 1 Input/Output in focus; pillars 2–4 faded, no side notes, only the traders → FastAPI and Dashboard → C22 arrows (`arch-diagram` `is-nodes-only is-numbered is-focus-1`) | James Z | done |
| 24 | `24-architecture-data-messaging` | Architecture, pillar 2 Data & Messaging in focus (pillars 1, 3, 4 and the outer arrows faded) | James Z | done |
| 25 | `25-architecture-pipeline` | Architecture, pillar 3 Pipeline in focus | James Z | done |
| 26 | `26-architecture-services` | Architecture, pillar 4 Services in focus | James Z | done |
| 27 | `27-architecture` | Architecture diagram: all connections | James Z | done |
| 28 | `28-open-flow-1-received` | Open trade flow 1/6: trade data → FastAPI (`arch-flow`) | James Z | done |
| 29 | `29-open-flow-2-stored` | Open trade flow 2/6: FastAPI → Postgres + open queue | James Z | done |
| 30 | `30-open-flow-3-dequeue` | Open trade flow 3/6: worker dequeues the open trade | James Z | done |
| 31 | `31-open-flow-4-judge` | Open trade flow 4/6: worker ↔ Judge, worker ↔ campaign cache | James Z | done |
| 32 | `32-open-flow-5-price` | Open trade flow 5/6: worker ↔ market price service | James Z | done |
| 33 | `33-open-flow-6-store` | Open trade flow 6/6: worker ↔ Postgres, flow ends | James Z | done |
| 34 | `34-close-flow-1-received` | Close trade flow 1/6: close data → FastAPI → Postgres + close queue | James Z | done |
| 35 | `35-close-flow-2-dequeue` | Close trade flow 2/6: worker dequeues the close trade | James Z | done |
| 36 | `36-close-flow-3-decision` | Close trade flow 3/6: worker reads the Judge decision from Postgres | James Z | done |
| 37 | `37-close-flow-4-price` | Close trade flow 4/6: worker ↔ market price service | James Z | done |
| 38 | `38-close-flow-5-fading` | Close trade flow 5/6: worker ↔ Postgres + campaign cache | James Z | done |
| 39 | `39-close-flow-6-publish` | Close trade flow 6/6: worker → pub/sub → dashboard → C22, flow ends | James Z | done |
| 40 | `40-section-design-decisions` | ◆ 05 Key Design Decisions | Jerrick | — |
| 41 | `41-nfr-1-concurrency` | NFR overview (`nfr-overview`): Concurrency & throughput active, others 50% | Jerrick | done |
| 42 | `42-async-1-sync` | Decision 01 · Process Trades Asynchronously, "If it was synchronous…": Request → FastAPI → process open (Judge, OANDA, DB) / close (DB) | Jerrick | done |
| 43 | `43-async-2-sync-response` | + Response only after the whole process is completed | Jerrick | done |
| 44 | `44-async-3-queues` | "Asynchronous": FastAPI → open/close queues, immediate response | Jerrick | done |
| 45 | `45-async-4-workers` | + workers processing open (Judge, OANDA, DB) and close (DB) | Jerrick | done |
| 46 | `46-nfr-2-sequencing` | NFR overview: Sequencing active | Jerrick | done |
| 47 | `47-race-1-queues` | Decision 02 · Race Conditions · Problem: close 11 is ahead of its open | Jerrick | done |
| 48 | `48-race-2-check-db` | Token 11 moves into the close worker, which checks the DB | Jerrick | done |
| 49 | `49-race-3-no-match` | No corresponding open trade (red cross) | Jerrick | done |
| 50 | `50-race-4-solution` | Tag flips to Solution; the cross on trade 11 is gone | Jerrick | done |
| 51 | `51-race-5-requeue` | Token 11 moves to the back of the close queue | Jerrick | done |
| 52 | `52-nfr-3-latency` | NFR overview: Processing latency active | Jerrick | done |
| 53 | `53-why-redis` | Decision 03 · Why Redis?: separate broker (2 systems on the trade's path) vs one in-memory Redis; motivation cards: fewer distributed systems, less network latency (`redis-why`) | Jerrick | done |
| 54 | `54-nfr-4-deployment` | NFR overview: Deployment active | Jerrick | done |
| 55 | `55-docker-local` | Decision 04 · Dockerised, Deployed On-Site: 3 reasons (dark cards, left) + containers on Catch22's machine (right) (`local-stack`) | Jerrick | done |
| 56 | `56-section-journey` | ◆ 06 How We Got Here | BA | — |
| 57 | `57-hurdle-model` | What is the hurdle model? Definition + why it fits + 3 arms → gross EV → decision score (`hurdle-flow`) | Jerrick | draft |
| 58 | `58-training-approach` | Approach to training: data, features, hurdle, evaluate | BA | draft |
| 59 | `59-data` | How the Data was used: 54 campaigns from C22 + train/test split table (`panel-card`), feature count by version v1–v5 21→26→45→26→18, v5 = final frozen set (`funnel` is-in-card) | Yanting | done |
| 60 | `60-before-features` | Raw Fields We Ruled Out: no variance (6) · IDs & identity (7) · near-duplicates (3, rₛ > 0.8 in the note; commission↔amount, openPrice↔campaignId; kept amount, inline) · outcome leakage (2), no foot lines (`feature-group` ×4, compact via `.is-before-features` in deck.css) | Yanting | draft |
| 61 | `61-features-dropped` | The 13 Features We Dropped: leakage (6, `feature-group`) · fair but didn’t pay (7, `panel-card` with inline-SVG without→with chart: same-day habits −$1,591→−$9,162, market data +$1,205→−$3,515; p_sl overlapped 90% with stop-loss habit) | Yanting | done |
| 62 | `62-outcome-features` | Why We Left Out Outcomes: 8 outcome features (`feature-group`) + Using SHAP: share of model attention, full 26 vs final 18 (`shap-bars`, merged from old 54 Behaviour vs Luck; compact via `.is-outcome-shap` in deck.css) | Yanting | done |
| 63 | `63-features-kept` | The 18 Features We Kept: trade itself (6) · earlier today (8) · earlier days (4) (`feature-group`) | Yanting | done |
| 64 | `64-app-cv-layout` | Blocked CV layout: six expanding folds + locked test block (moved from appendix) | TBC | draft |
| 65 | `65-app-arms` | Moved from appendix | TBC | draft |
| 66 | `66-notebook-scatter` | $/campaign by notebook (07→15), one dot per variant, hover for what each notebook changed (`scatter-chart`) | BA | draft |
| 67 | `67-magnitude` | Deep dive: 35× magnitude over direction + what we dropped | TBC | draft |
| 68 | `68-section-pm` | ◆ 07 Project Management | Arin | — |
| 69 | `69-scrum` | Why Scrum over Waterfall: lane diagram (`method-compare`) + 3 reasons | Arin | done |
| 70 | `70-timeline` | Project timeline (now = Midterm) | Arin | done |
| 71 | `71-milestones` | Project Milestones: midterm vs final (moved from 15) | Joyce | done |
| 72 | `72-sprint-cycle` | How We Run a Sprint: plan → build → sync → review → retro loop, leads/squads/tools (`sprint-cycle`) | Arin | done |
| 73 | `73-retros` | What Our Retros Changed: Sprint 7 retro noticed → changed, 205 story points completed (`retro-changes`) | Arin | done |
| 74 | `74-constraints` | Constraints · Data & Model: 18 held-out campaigns, not a random sample, C22 rules (1 open trade, first come first served), ~6 months of data (correlated, not independent) | Arin | done (sourced from Linear) |
| 75 | `75-edge-setting` | How Big a Test Do We Need?: minimum worthwhile edge per faded trade → $/month → campaigns to confirm; 18 test campaigns detect edges of ~$10+ | TBD | draft |
| 76 | `76-whats-next` | Auto-retrainer · real pipeline · trade magnitude · auto-scaling · non-functional reqs · observability (6 cards, 3 + 3) | Arin | done |
| 77 | `77-qna` | Questions | — | done |
| 78 | `78-section-appendix` | ◆ A Appendix (after Q&A, for backup) | — | — |
| 79 | `79-workflow-campaign-start` | Workflow 1: Campaign Start (6-step flow, 2 arrowed notes, transaction callout) | James Z | done |
| 80 | `80-workflow-open-trade` | Workflow 2: Open Trade (6-step flow, steps 3–6 framed as async, 2 arrowed notes + Key notes card) | James Z | done |
| 81 | `81-workflow-close-trade` | Workflow 3: Close Trade (6-step flow, steps 3–6 framed as async, Key notes card) | James Z | done |
| 82 | `82-workflow-campaign-end` | Workflow 4: Campaign End & Evaluation (5-step flow, Key notes card) | James Z | done |
| 83–92 | `83-app-correlation` … `92-app-hyperparams` | Correlation matrix, learning curve + calibration, SHAP by feature, cost sweep, market data, tried and dropped, hurdle decomposition, feature arms, top-k, hyperparameters | — | draft |
| 93–95 | `93-market-regimes`, `94-demo-data`, `95-chosen-timeslots` | Demo-data selection slides (moved from 17–19 to the end of the appendix): 2×2 + how we measure, trades per slot / beta vs Gold, chosen timeslots | Joyce, JS | done |

Chart PNGs in `assets/` are exported from notebook outputs in `reverse-trade-judge/` (leak_worth, shap_*, auc_by_campaign_arm, hurdle_decomposition, correlation_matrix, learning_curve_calibration, cost_curve, model_vs_random, market_data_shap).

## Open items
- Slide 67 (`magnitude`) and slide 66 (`notebook-scatter`) need an owner. Numbers on slides 58, 66 and 67 come from `reverse-trade-judge/summarised.md` and `Progress_summary/`.
- Linear (PYG-103) shows 45 campaigns / 68,377 trades; the old constraints slide said 38 and now shows 18 held-out campaigns. Isaiah thinks it is 33–68 train (36) + 69–86 test (18) = 54. Confirm which is current, then align slides 73 and 75.
- Slides 70–71 numbers come from PYG-92, 144, 185 and the SOW; re-check them if the model or the 18-feature freeze changes.
- PM slides 70–73 are sourced from Linear (SOW, Sprint 7 retro board + minutes, cycle stats). Only the Sprint 7 retro is filled in; Calf/Juvenile retro docs are empty templates. Add later retros to slide 67 when written up.
- Constraints & What's Next (slides 74–77) are presented by Arin; slide 76 owner TBD.
- Slide 75 lists "Non-functional reqs" as a next step while slide 22 already presents the NFRs; decide whether the card stays.
- Slide 57 (`hurdle-model`) sits in the "How We Got Here" section.
- Slides 64 (`app-cv-layout`, after the feature slides) and 65 (`app-arms`) were moved from the appendix into the main flow.
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 94 charts use rolling windows (p95 130 / p50 57); slide 95 uses fixed 30-min slots (p95 121.4 / p50 59.5).
- Replace the slide 17 target staircase with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 70 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Section 05 (27–42) is framed by the NFRs: the `nfr-overview` slide (28, 33, 39, 41) opens each group with that NFR at full opacity, and every content slide carries the same card top-right (`dd-heading`). Adjacent slides use match-and-move (`data-morph`, core/CONTEXT.md): the NFR card glides between the grid and the corner, trade tokens glide between queue and worker, and identical diagram pieces stay put. Builds (29–32, 34–38) repeat the previous diagram; only new pieces have `reveal`. Keep them in order when editing.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`

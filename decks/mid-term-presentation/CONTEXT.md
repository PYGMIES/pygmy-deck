# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Slides 01–03, 05–07 (pain points 1–2), 09 (ladder is illustrative), 10–12, 14–16, 19 and 31 carry real content; everything else has `@placeholder` boxes / `TODO:` text for each owner.

## Outline (owners)
| # | File | Slide | Owner | State |
|---|------|-------|-------|-------|
| 01 | `01-cover` | Project Cassandra for <Catch22> · course code, supervisor, team (`title-cover`) | — | done |
| 02 | `02-team` | Meet Our Team: leads (PO Isaiah, SM Yan Ting) + devs (Arin, Jamesz, Jerrick, Joyce) | — | done |
| 03 | `03-agenda` | Agenda, owners, minutes (sums to 30) | — | done |
| 04 | `04-section-problem` | ◆ 01 The Problem | Joyce | — |
| 05 | `05-sponsor` | Our Sponsor: Catch22 (domain · business needs · our focus) | Joyce | done |
| 06 | `06-c22-today` | What Catch22 is doing today (flow) | Joyce | done |
| 07 | `07-problem-space` | Core conflict + pain points | Joyce | pain point 3 TODO |
| 08 | `08-section-goals` | ◆ 02 Goals & Impact | Joyce | — |
| 09 | `09-success-metrics` | 3 key goals + target ladder (illustrative) | Joyce | measured results TODO |
| 10 | `10-business-value` | Research partnership value | Joyce | done |
| 11 | `11-milestones` | Project Milestones: midterm vs final | Joyce | done |
| 12 | `12-validation` | Methodological guardrails | Joyce | done |
| 13 | `13-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 14 | `14-market-regimes` | How We Picked the Demo Data: 2×2 + how we measure | Joyce, JS | done |
| 15 | `15-demo-data` | The Data Behind Our Choice (trades per slot, beta vs Gold) | Joyce, JS | done |
| 16 | `16-chosen-timeslots` | Chosen Timeslots: 3:30–4:00 typical·calm, 5:30–6:00 busy·volatile | Joyce, JS | done |
| 17 | `17-live-trades` | Live trade page @10×, 2 screens | Jerrick | screenshots TODO |
| 18 | `18-section-architecture` | ◆ 04 System Architecture | Jerrick, James Z | — |
| 19 | `19-architecture` | Architecture diagram | James Z | done |
| 20 | `20-design-decisions` | Key design decisions | Jerrick | TODO |
| 21 | `21-hurdle-model` | What is the hurdle model? + workflow | Jerrick | TODO |
| 22 | `22-limitations` | Limitations: scaling, decoupling | James Z | TODO |
| 23 | `23-section-journey` | ◆ 05 How We Got Here | BA | — |
| 24 | `24-training-approach` | Approach to training | BA | TODO |
| 25 | `25-feature-engineering` | Feature engineering deep dive | Yanting | TODO |
| 26 | `26-behaviour-vs-luck` | Behaviour vs luck (SHAP) | Yanting | TODO |
| 27 | `27-model-selection` | Models tried + selection metrics | Joyce, Isaiah | TODO |
| 28 | `28-market-data` | Did market data help? | Joyce, Isaiah | TODO |
| 29 | `29-section-pm` | ◆ 06 Project Management | Yanting | — |
| 30 | `30-scrum` | Why Scrum over Waterfall | Yanting | TODO |
| 31 | `31-timeline` | Project timeline (now = Midterm) | Yanting | done |
| 32 | `32-retros` | What retros changed | Yanting | TODO |
| 33 | `33-constraints` | Not random sample · 38 campaigns | TBD | done |
| 34 | `34-whats-next` | Trade magnitude · real pipeline · auto-scaling | TBD | done |
| 35 | `35-qna` | Questions | — | done |

## Open items
- Confirm who presents Constraints & What's Next (agenda says TBD).
- Confirm the demo replays both slots (Typical·Calm 3:30–4:00 and Busy·Volatile 5:30–6:00). Slide 15 charts use rolling windows (p95 130 / p50 57); slide 16 uses fixed 30-min slots (p95 121.4 / p50 59.5).
- Replace the slide 09 target ladder with measured results + CIs when available.
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 27 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`

# mid-term-presentation — context

## Brief
- **Event:** Project Cassandra midterm review · 5 Oct 2026 · **30 min talk + 30 min Q&A**
- **Audience:** Catch22 sponsors (Clement & Lee Yang) + faculty
- **Density:** speaker-led
- **Key focus:** impact and requirements met. Intro + problem recap gets the most time.
- **Status:** skeleton. Slides 04, 05 (pain point 1), 07 (goals), 08, 14 and 26 carry real content; everything else has `@placeholder` boxes / `TODO:` text for each owner.

## Outline (owners)
| # | File | Slide | Owner | State |
|---|------|-------|-------|-------|
| 01 | `01-cover` | Project Cassandra · Midterm | — | done |
| 02 | `02-agenda` | Agenda, owners, minutes (sums to 30) | — | done |
| 03 | `03-section-problem` | ◆ 01 The Problem | Joyce | — |
| 04 | `04-c22-today` | What Catch22 is doing today (flow) | Joyce | done |
| 05 | `05-problem-space` | Core conflict + pain points | Joyce | pain points 2–3 TODO |
| 06 | `06-section-goals` | ◆ 02 Goals & Impact | Joyce | — |
| 07 | `07-success-metrics` | 3 key goals + where we stand | Joyce | results TODO |
| 08 | `08-validation` | Frozen baselines + guardrails | Joyce | done |
| 09 | `09-business-value` | Research partnership value | Joyce | card bodies TODO |
| 10 | `10-section-demo` | ◆ 03 Live Demo | Jerrick | — |
| 11 | `11-market-regimes` | Timeslots: typical/busy × calm/volatile | Joyce, JS | chart TODO |
| 12 | `12-live-trades` | Live trade page @10×, 2 screens | Jerrick | screenshots TODO |
| 13 | `13-section-architecture` | ◆ 04 System Architecture | Jerrick, James Z | — |
| 14 | `14-architecture` | Architecture diagram | James Z | done |
| 15 | `15-design-decisions` | Key design decisions | Jerrick | TODO |
| 16 | `16-hurdle-model` | What is the hurdle model? + workflow | Jerrick | TODO |
| 17 | `17-limitations` | Limitations: scaling, decoupling | James Z | TODO |
| 18 | `18-section-journey` | ◆ 05 How We Got Here | BA | — |
| 19 | `19-training-approach` | Approach to training | BA | TODO |
| 20 | `20-feature-engineering` | Feature engineering deep dive | Yanting | TODO |
| 21 | `21-behaviour-vs-luck` | Behaviour vs luck (SHAP) | Yanting | TODO |
| 22 | `22-model-selection` | Models tried + selection metrics | Joyce, Isaiah | TODO |
| 23 | `23-market-data` | Did market data help? | Joyce, Isaiah | TODO |
| 24 | `24-section-pm` | ◆ 06 Project Management | Yanting | — |
| 25 | `25-scrum` | Why Scrum over Waterfall | Yanting | TODO |
| 26 | `26-timeline` | Project timeline (now = Midterm) | Yanting | done |
| 27 | `27-retros` | What retros changed | Yanting | TODO |
| 28 | `28-constraints` | Not random sample · 38 campaigns | TBD | done |
| 29 | `29-whats-next` | Trade magnitude · real pipeline · auto-scaling | TBD | done |
| 30 | `30-qna` | Questions | — | done |

## Open items
- Confirm who presents Constraints & What's Next (agenda says TBD).
- Confirm Phase 0 / Phase 1 gates passed → mark them on slide 26 (`project-timeline` gates).
- "BA" owner of section 05: confirm name.
- Cover subtitle "A learned Judge for Catch22's fade-or-pass decision" is a draft.
- Find all TODOs: `grep -rn "@placeholder\|TODO" decks/mid-term-presentation/slides`

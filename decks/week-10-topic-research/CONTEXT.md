# Deck — context

## Brief
- **Purpose:** IS212 Week 10 Topic Research & Sharing: Linear → Claude → GitHub agentic ticket workflow. Must answer: What is it? Can you show it? Why does it matter? Where does it break?
- **Audience:** IS212 section classmates + instructor
- **Density:** speaker-led (7 min + 2 min Q&A)
- **Date / presenter:** Week 10 · G9T6 (Arin, Joyce, Isaiah, Jamesz, Jerrick)

## Outline
| # | File | Idea | Components |
|---|------|------|------------|
| 01 | `01-cover.html` | Title (Custom Agents in Linear) + team | cover |
| 02 | `02-problem.html` | Problem: laptop stays on, permission prompts, no extra subscriptions | slide-title, split, bullet-list (`has-icons`), screen-frame |
| 03 | `03-section-what.html` | Section: What is it? | section-divider |
| 04 | `04-problem.html` | Problem as a user story + 4 acceptance criteria (laptop stays off, isolated, no waiting, ticket status updates itself) | slide-title, deck `.story-card`, bullet-list (`has-icons`) |
| 05 | `05-docker-sandbox.html` | Docker sandbox: isolated but still tied to the laptop | slide-title, split, bullet-list (`has-icons`), screen-frame |
| 06 | `06-linear.html` | Meet Linear: minimalist vs Jira, big-name users, developer friendly (screenshot: linear.jpg) | slide-title, split, bullet-list (`has-icons`), screen-frame |
| 07 | `07-linear-agent.html` | Own agent via Linear OAuth gateway on Claude subscription (screenshot: pygmy_agent.jpg) | slide-title, split, bullet-list (`has-icons`), screen-frame |
| 08 | `08-workflow.html` | Linear → Claude → GitHub → Linear flow | slide-title, deck `.tool-flow` |
| 09 | `09-section-demo.html` | Section: Demo | section-divider |
| 10 | `10-demo.html` | Demo: screenshot of the Pygmy agent session on a Linear ticket | slide-title, screen-frame |
| 11 | `11-section-why.html` | Section: Why does it matter? | section-divider |
| 12 | `12-why.html` | Right tool for the job: comparison table (Our build vs Cursor vs Claude Code cloud) on cost, setup complexity, data privacy, control | slide-title, compare-table (`.cmp-table` in deck.css) |
| 13 | `13-section-break.html` | Section: Where does it break? | section-divider |
| 14 | `14-ticket-quality.html` | Output quality depends on the ticket | slide-title, split, bullet-list, deck `.break-icon` |
| 15 | `15-review-bottleneck.html` | Reviewing becomes the bottleneck | slide-title, card-grid of `.point-card` (big icon over text) |
| 16 | `16-limited-environment.html` | Limited environment (Railway only; Docker-in-Docker on fly.io/ECS, Playwright) | slide-title, card-grid of `.point-card` (big icon over text) |
| 17 | `17-options.html` | Options: build it, Cursor, Claude Code cloud sessions + Linear MCP | slide-title, card-grid of `.point-card` |
| 18 | `18-conclusion.html` | Conclusion: user story revisited (delivered) + run agents while out/asleep, result ready, teammates assign tasks | slide-title, deck `.story-card`, card-grid of `.point-card` |

## Notes / open items
- Converted from the team's Canva slides. Logos and the board screenshot are cropped from those slides (low-res).
- Slide 10 (demo) shows a screenshot of the Pygmy agent session (demo.jpg); swap for a live run or video if wanted.
- No Q&A / thank-you slide yet.
- Styled to mimic the SMU SCIS school template (Arial, navy #11175e, gold cover header, yellow title bars, green section labels); all overrides live at the top of `deck.css`. Cover kicker/subtitle copy was reworded to match (G9T6 on its own line).
- Slides 02, 05–07: bullet points use `class="has-icons"` (deck.css): each `<li>` holds a `.li-icon` navy tile with an inline stroke SVG (48×48 viewBox) plus a `<span>` of text.
- Slides 14–17: each limitation is a tall navy `.point-card` (140px stroke icon over text) in a `card-grid`, styled in deck.css; the old single side icon (`.break-icon`) is no longer used.

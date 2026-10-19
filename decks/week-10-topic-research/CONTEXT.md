# Deck — context

## Brief
- **Purpose:** IS212 Week 10 Topic Research & Sharing: Linear → Claude → GitHub agentic ticket workflow. Must answer: What is it? Can you show it? Why does it matter? Where does it break?
- **Audience:** IS212 section classmates + instructor
- **Density:** speaker-led (7 min + 2 min Q&A)
- **Date / presenter:** Week 10 · G9T6 (Arin, Joyce, Isaiah, Jamesz, Jerrick)

## Outline
| # | File | Idea | Components |
|---|------|------|------------|
| 01 | `01-cover.html` | Title + team | cover |
| 02 | `02-section-what.html` | Section: What is it? | section-divider |
| 03 | `03-problem.html` | Problem: laptop must stay open, no isolation | slide-title, bullet-list (`has-icons`) |
| 04 | `04-docker-sandbox.html` | Docker sandbox: isolated but still tied to the laptop | slide-title, split, bullet-list (`has-icons`), screen-frame |
| 05 | `05-linear-agent.html` | Own agent via Linear OAuth gateway on Claude subscription | slide-title, split, bullet-list (`has-icons`), screen-frame |
| 06 | `06-linear-board.html` | Linear board screenshot | slide-title, split, screen-frame |
| 07 | `07-workflow.html` | Linear → Claude → GitHub → Linear flow | slide-title, deck `.tool-flow` |
| 08 | `08-section-demo.html` | Section: Demo | section-divider |
| 09 | `09-demo.html` | Demo | slide-title, placeholder |
| 10 | `10-section-why.html` | Section: Why does it matter? | section-divider |
| 11 | `11-why.html` | Why it matters | slide-title, placeholder |
| 12 | `12-section-break.html` | Section: Where does it break? | section-divider |
| 13 | `13-ticket-quality.html` | Output quality depends on the ticket | slide-title, split, bullet-list, deck `.break-icon` |
| 14 | `14-no-memory.html` | No persistent memory | slide-title, card-grid of `.point-card` (big icon over text) |
| 15 | `15-review-bottleneck.html` | Reviewing becomes the bottleneck | slide-title, card-grid of `.point-card` (big icon over text) |
| 16 | `16-limited-environment.html` | Limited environment | slide-title, card-grid of `.point-card` (big icon over text) |

## Notes / open items
- Converted from the team's Canva slides. Logos and the board screenshot are cropped from those slides (low-res).
- Slides 06 and 08 are placeholders: the Canva versions held filler text only.
- No Q&A / thank-you slide yet.
- Styled to mimic the SMU SCIS school template (Arial, navy #11175e, gold cover header, yellow title bars, green section labels); all overrides live at the top of `deck.css`. Cover kicker/subtitle copy was reworded to match (G9T6 on its own line).
- Slides 03–05: bullet points use `class="has-icons"` (deck.css): each `<li>` holds a `.li-icon` navy tile with an inline stroke SVG (48×48 viewBox) plus a `<span>` of text.
- Slides 13–16: each limitation is a tall navy `.point-card` (140px stroke icon over text) in a `card-grid`, styled in deck.css; the old single side icon (`.break-icon`) is no longer used.

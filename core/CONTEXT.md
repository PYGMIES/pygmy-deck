# core/ — context

## Runtime features
| Input | Action |
|-------|--------|
| → ↓ Space PageDown / click right ⅔ / swipe left | next slide |
| ← ↑ PageUp / click left ⅓ / swipe right | previous slide |
| Home / End | first / last |
| `#N` in URL | deep-link to slide N (kept in sync) |
| F | fullscreen |
| E or top-left corner button | toggle inline edit mode |
| Ctrl/Cmd+S (in edit mode) | download the edited HTML |
| Esc (in edit mode) | leave edit mode |
| N or bottom-left corner button | toggle speaker-notes panel (shows the slide's `<!-- notes: … -->`) |
| O | toggle grid overview of every slide |
| click a thumbnail / Enter (in overview) | jump to that slide, close overview |
| Esc or O (in overview) | close overview |

Note: inline edits save a copy of the **built** file only; they do not flow back into `slides/`. Port wanted edits back into the source before rebuilding.

## Speaker notes
`N` toggles `.deck-notes`, a panel fixed to the bottom of the window (outside `.deck-stage`). `runtime.js` collects each slide's `<!-- notes: … -->` comment nodes at load. While open, `body.notes-open` sets `.deck-viewport { bottom: var(--notes-h) }` and `fit()` scales to the viewport box, so the stage shrinks above the panel rather than being covered. Hidden in print, in overview, and stripped from edit-mode saves.

## Overview mode
`O` toggles a `.deck-overview` grid, built lazily on first use by cloning each `.slide` into a scaled (`transform: scale(300/1920)`) `.ov-frame` thumbnail. Clones are static — `.reveal` opacity/transform is forced to its revealed state, no transitions run. The grid is a sibling of `.deck-viewport` in `document.body`, not inside `.deck-stage`, so it isn't affected by the stage's scale-to-fit transform.

## Reveal animation
Any element with class `reveal` fades up when its slide becomes active. `runtime.js` sets `--i` per slide in document order; delay = `i × 90ms + 120ms`. Components already mark their parts with `reveal`.

## DOM contract (produced by build.py)
```html
<html data-theme="light|dark">
  <div class="deck-viewport"><main class="deck-stage">
    <section class="slide" data-slide="01" data-name="cover">…</section>
    <div class="deck-progress"></div><div class="deck-counter"></div>
  </main></div>
```

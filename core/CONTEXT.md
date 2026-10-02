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
| N or bottom-left corner button | toggle speaker-notes panel (shows the slide's `<!-- notes: … -->`; click in it to edit, Esc to leave the box) |
| O | toggle grid overview of every slide |
| → / ← between adjacent slides | match-and-move for elements sharing a `data-morph` key (see below) |
| click a thumbnail / Enter (in overview) | jump to that slide, close overview |
| Esc or O (in overview) | close overview |

Note: inline edits save a copy of the **built** file only; they do not flow back into `slides/`. Port wanted edits back into the source before rebuilding.

## Speaker notes
`N` toggles `.deck-notes`, a panel fixed to the bottom of the window (outside `.deck-stage`). `runtime.js` collects each slide's `<!-- notes: … -->` comment nodes at load. While open, `body.notes-open` sets `.deck-viewport { bottom: var(--notes-h) }` and `fit()` scales to the viewport box, so the stage shrinks above the panel rather than being covered. The panel is a `<textarea>`: edits autosave to `localStorage` (keyed by file path) and are written back into the slide's comment node, so Ctrl/Cmd+S in edit mode downloads them. Like edit mode, this does **not** flow back into `slides/` — copy wanted notes into the source `<!-- notes: -->` before rebuilding. Hidden in print and overview; the panel itself is stripped from saves.

## Overview mode
`O` toggles a `.deck-overview` grid, built lazily on first use by cloning each `.slide` into a scaled (`transform: scale(300/1920)`) `.ov-frame` thumbnail. Clones are static — `.reveal` opacity/transform is forced to its revealed state, no transitions run. The grid is a sibling of `.deck-viewport` in `document.body`, not inside `.deck-stage`, so it isn't affected by the stage's scale-to-fit transform.

## Match and move
Keynote-style "magic move" between **adjacent** slides (one step forward or back), opt-in per element:
- `data-morph="key"`: an element with the same non-empty key on both slides glides from its old box to its new one over 1 s (FLIP: translate + scale + opacity, eased). Use it for the "same item" across slides (e.g. a card that moves from a grid into a corner, a token that moves between cells).
- `data-morph-scope` on a container: its direct children with identical markup on both slides (ignoring `reveal` and the runtime's `--i`) pair up on their own and stay put, so repeated build pieces don't flicker.
- Everything else crossfades: the old slide's unpaired content fades out (0.35 s) while the new slide's appears (non-`reveal` pieces fade in at 0.4 s; `reveal` pieces get +400 ms delay via `.slide.morph-to .reveal`).
- Mechanics: during the move the old slide stays underneath (`.morph-from`) and the new one sits on top with a transparent background (`.morph-to`); moving elements are lifted (`z-index: 10`). Everything is restored when it ends or the next navigation starts.
- Skipped (normal 0.5 s crossfade) when no pairs exist, for jumps of more than one slide, with `prefers-reduced-motion`, and in edit or overview mode. Slides without `data-morph` behave exactly as before.

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

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
| drag a thumbnail (in overview, `--serve` only) | reorder slides: renames `slides/NN-name.html`, rebuilds, reloads with the overview open |
| ⌘Z / Ctrl+Z, ⌘⇧Z / Ctrl+Y (`--serve` only, anywhere except edit mode / notes box) | undo / redo the last slide reorder |

Note: inline edits save a copy of the **built** file only; they do not flow back into `slides/`. Port wanted edits back into the source before rebuilding.

## Speaker notes
`N` toggles `.deck-notes`, a panel fixed to the bottom of the window (outside `.deck-stage`). `runtime.js` collects each slide's `<!-- notes: … -->` comment nodes at load. While open, `body.notes-open` sets `.deck-viewport { bottom: var(--notes-h) }` and `fit()` scales to the viewport box, so the stage shrinks above the panel rather than being covered. The panel is a `<textarea>`: edits autosave to `localStorage` (keyed by file path) and are written back into the slide's comment node, so Ctrl/Cmd+S in edit mode downloads them. Like edit mode, this does **not** flow back into `slides/` — copy wanted notes into the source `<!-- notes: -->` before rebuilding. Hidden in print and overview; the panel itself is stripped from saves.

## Overview mode
`O` toggles a `.deck-overview` grid, built lazily on first use by cloning each `.slide` into a scaled (`transform: scale(300/1920)`) `.ov-frame` thumbnail. Clones are static — `.reveal` opacity/transform is forced to its revealed state, no transitions run. The grid is a sibling of `.deck-viewport` in `document.body`, not inside `.deck-stage`, so it isn't affected by the stage's scale-to-fit transform.

## Serve mode (live reload + drag-to-reorder)
`python3 build.py <deck> --serve` (or `make finals` / `make midterm` / `make serve DECK=<deck>`) hosts the deck on `127.0.0.1:8000` and opens it. Ports something else already answers on (IPv4 or IPv6, e.g. Docker on `*:8000`) are skipped, so it may land on 8001+; `--port=N` changes the start. If `build.py` itself changes, the server restarts in place on the same port (the open page keeps working; reorder undo history resets). A non-JSON reply from the server shows "The deck server is out of date…" in the page instead of a parse error. The server injects `<script id="pygmy-serve">window.PYGMY_SERVE = { version }</script>` into the page it serves; the committed `<deck>.html` never contains it, so opening the file directly behaves exactly as before (no drag, no polling).
- **Live reload**: the page polls `/__version` every second and reloads (keeping `#N` and an open overview) after a rebuild. It waits while edit mode is on or the notes box has focus.
- **Reorder**: in the overview, thumbnails are draggable. While dragging, the grid previews the result live: the dragged slide's slot (dashed accent placeholder) moves under the pointer, neighbours glide aside (FLIP, 240 ms, skipped under `prefers-reduced-motion`) and numbers update. Dropping outside the grid or Esc slides everything back. A drop POSTs `{version, order: [data-slide…]}` to `/__reorder`. The server renumbers the files 01…NN in that order (two-phase rename via `.reorder-*` temp names, rollback on error), rebuilds, and the page reloads at the moved current slide with the overview reopened. A stale `version` is refused (409) and the page reloads.
- **Undo / redo**: the server keeps each drop's `[(old, new)]` renames on an in-memory stack (lost when the server stops). ⌘Z / Ctrl+Z POSTs `{action: "undo", current}` to `/__history`, which renames back and rebuilds; ⌘⇧Z / Ctrl+Y redoes; a new drop clears redo. The page reloads on the same slide file it was showing, with a toast (or the overview pill) saying what happened. If a file in the entry was renamed or a target name taken by hand, it refuses and clears the history. Edit mode and the notes box keep the browser's own text undo.
- Renumbering does **not** touch a deck's `CONTEXT.md` slide table or any "see slide N" text; the server prints a reminder.
- Edit-mode save (Ctrl/Cmd+S) strips the serve hook from the downloaded copy.

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

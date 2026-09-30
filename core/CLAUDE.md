# core/ — Claude instructions

The engine every deck shares. Changes here affect **all** decks — rebuild and check every deck after editing.

- `stage.css` — viewport wrapper, 1920×1080 `.deck-stage`, `.slide` visibility switching, `.reveal` stagger, progress/counter chrome, edit-mode styles, reduced-motion and print rules.
- `runtime.js` — scale-to-fit, navigation, reveal indices, hash deep-linking, edit mode.

Rules:
- Keep the stage fixed at 1920×1080; scaling is `transform: translate(-50%,-50%) scale(var(--stage-scale))`. Don't add breakpoints.
- Slide hiding must stay `visibility/opacity/pointer-events`. Never `display: none`.
- No colours here except neutral fallbacks — theme colours come from `themes/`.
- No dependencies. Plain ES2019+, wrapped in an IIFE.
- Anything a deck author might tweak belongs in `themes/tokens.css`, not here.

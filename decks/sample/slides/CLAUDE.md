# slides/ — Claude instructions

- File name: `NN-kebab-name.html` (two digits; gaps are fine, duplicates fail the build). To insert between 03 and 04, renumber rather than using letters.
- Content is a slide *body* — build.py wraps it in `<section class="slide">`. To set a slide theme or style, write your own `<section class="slide" data-theme="dark">…</section>` wrapper.
- Compose with component tags (`components/CONTEXT.md` has the catalogue). Raw HTML is fine for one-offs but must use theme tokens.
- One slide = one idea. If it overflows 1920×1080, split it.
- Speaker notes: plain HTML comments `<!-- notes: … -->` (kept in output, not shown).
- Update the outline table in the deck's `CONTEXT.md` when slides change.

# themes/ — Claude instructions

- `tokens.css` — theme-independent tokens: fonts, type scale, spacing, radii, easing. All sizes are px at the 1920×1080 design size.
- `light.css` — colour tokens for `:root` and `[data-theme="light"]` (default).
- `dark.css` — colour tokens for `[data-theme="dark"]`.
- `base.css` — element defaults (slide flex column, heading font, utilities `.inset`, `.push-end`).

Rules:
- Every colour token must exist in **both** light and dark with the same name.
- Components and slides consume tokens only; never add raw hex values outside this folder.
- A deck-specific tweak goes in `decks/<deck>/deck.css`, not here.
- Changing a type-scale token affects every deck — rebuild all decks and check for overflow.

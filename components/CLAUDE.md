# components/ — Claude instructions

Shared, reusable slide components. Each lives in `components/<name>/` with:
- `<name>.html` — template with `{{param}}` (required) and `{{param|default}}` (optional) slots. Include `{{children}}` to make it a **block** component.
- `<name>.css` — styles scoped under `.c-<name>`. Only included in a build if a slide uses the component.

## Using components in a slide
```html
<!-- @slide-title text="Our Success Metrics" -->          self-closing
<!-- @card-stack -->                                     block: open …
  <!-- @label-card title="Coin<br>Flip" body="A fully randomised baseline" -->
<!-- @/card-stack -->                                    … and close
```
- Values are raw HTML (use `<br>` for line breaks, `&quot;` for a double quote).
- Unknown params, missing required params, unknown components and unclosed blocks fail the build with file:line.

## Adding a component
1. `components/<kebab-name>/<kebab-name>.html` + `.css`; root class `c-<kebab-name> {{class|}}`.
2. Put `reveal` on the elements that should animate in (not on layout containers).
3. Colours/fonts/sizes from theme tokens only; px at 1920×1080 design size.
4. Hide empty optional parts with CSS (`:empty` rules in `themes/base.css` cover p/h2/h3/span/figcaption).
5. Use it in `decks/sample` so it is exercised, build, screenshot in **both** themes.
6. Add it to the catalogue in `CONTEXT.md`.

Deck-specific variants go in `decks/<deck>/components/` (same name overrides the shared one).

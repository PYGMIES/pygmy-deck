# decks/ — Claude instructions

One folder per deck (kebab-case). Folders starting with `_` are not built.
- Create a deck with `python3 build.py new <deck>` — never copy another deck by hand.
- `_template/` is the scaffold; keep it minimal and generic. Changing it only affects new decks.
- Each deck's own `CLAUDE.md` / `CONTEXT.md` describe that deck; read them before editing it.

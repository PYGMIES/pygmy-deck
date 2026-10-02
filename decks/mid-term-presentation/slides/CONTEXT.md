# slides/ — context

78 slides, outline + owners in `../CONTEXT.md`. Each slide starts with `<!-- notes: owner. talking points -->`.
Unfinished content is marked with `<!-- @placeholder label="…" owner="…" -->` (renders as an amber "To do" box) or `TODO:` text. Replace them in place and rebuild.
Section dividers (04, 11, 16, 20, 31, 46, 55, 69) carry the presenter chip; keep them in sync with the agenda (03).

Slides 27–41 are three step-by-step builds (sync 27–30, async processing 33–36, race conditions 37–41); 42–45 are the Redis, cache-check, SSE and Docker design-decision slides. Each slide holds the full diagram so far; only the newly added piece has `class="reveal"`. Edit the same coordinates on every later step.

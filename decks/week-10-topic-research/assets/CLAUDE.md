# assets/ — Claude instructions

- Images, logos, SVG charts, fonts for this deck. Reference as `assets/<file>` in slides (src/href/`url()`); build.py inlines them as base64.
- kebab-case names, no spaces. Prefer SVG for charts/logos, WebP/JPG for photos; keep each file small (< 1 MB) since everything is embedded.
- Build warns about missing assets — fix those before sharing.

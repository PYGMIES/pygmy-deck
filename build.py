#!/usr/bin/env python3
"""Compile a deck folder into one self-contained HTML file.

Usage:
    python3 build.py                 build every deck in decks/ (except _template)
    python3 build.py <deck>          build decks/<deck> -> decks/<deck>/<deck>.html
    python3 build.py <deck> --watch  rebuild on any change
    python3 build.py <deck> --serve  host on localhost: live reload + drag-to-reorder
                                     in overview (O); --port=N picks the port (8000)
    python3 build.py new <deck>      scaffold decks/<deck> from decks/_template

Slides are decks/<deck>/slides/NN-name.html, ordered by NN. Components are
included with HTML-comment tags:

    <!-- @label-card title="Coin<br>Flip" body="A fully randomised baseline" -->
    <!-- @card-stack --> ...children... <!-- @/card-stack -->

A component whose template contains {{children}} is a block and must be
closed. {{param}} is required, {{param|default}} is optional. Component
lookup: decks/<deck>/components/<name>/ first, then components/<name>/.

Python standard library only.
"""

from __future__ import annotations

import base64
import html
import json
import mimetypes
import os
import re
import shutil
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CORE = ROOT / "core"
THEMES = ROOT / "themes"
COMPONENTS = ROOT / "components"
DECKS = ROOT / "decks"
TEMPLATE_DECK = "_template"

DEFAULT_FONTS_URL = (
    "https://fonts.googleapis.com/css2?"
    "family=League+Spartan:wght@500;600;700;800;900"
    "&family=Montserrat:wght@400;500;600;700&display=swap"
)
THEME_NAMES = ("light", "dark")

SLIDE_FILE = re.compile(r"^(\d+)-([a-z0-9-]+)\.html$")
TAG = re.compile(r"<!--\s*@(/?)([a-z][a-z0-9-]*)((?:\s+[a-z][a-z0-9_-]*=\"[^\"]*\")*)\s*-->")
ATTR = re.compile(r"([a-z][a-z0-9_-]*)=\"([^\"]*)\"")
SLOT = re.compile(r"\{\{\s*([a-z][a-z0-9_-]*)\s*(?:\|([^}]*))?\}\}")
ASSET_REF = re.compile(r"""(?P<pre>(?:src|href|poster)=["']|url\(\s*["']?)(?P<path>assets/[^"')\s]+)""")


class BuildError(Exception):
    pass


# === COMPONENTS ===========================================================

class Component:
    def __init__(self, name: str, folder: Path):
        self.name = name
        self.folder = folder
        html_file = folder / f"{name}.html"
        if not html_file.exists():
            raise BuildError(f"component '{name}' has no {html_file.relative_to(ROOT)}")
        self.template = html_file.read_text(encoding="utf-8").strip()
        css_file = folder / f"{name}.css"
        self.css = css_file.read_text(encoding="utf-8").strip() if css_file.exists() else ""
        self.is_block = any(m.group(1) == "children" for m in SLOT.finditer(self.template))

    def render(self, params: dict[str, str], children: str, where: str) -> str:
        known = {m.group(1) for m in SLOT.finditer(self.template)} - {"children"}
        unknown = set(params) - known
        if unknown:
            raise BuildError(f"{where}: @{self.name} got unknown param(s) {sorted(unknown)}; accepts {sorted(known)}")

        def fill(m: re.Match) -> str:
            key, default = m.group(1), m.group(2)
            if key == "children":
                return children
            if key in params:
                return params[key]
            if default is not None:
                return default
            raise BuildError(f"{where}: @{self.name} is missing required param '{key}'")

        return SLOT.sub(fill, self.template)


class Registry:
    """Resolves component names: deck-local first, then shared."""

    def __init__(self, deck_dir: Path):
        self.search = [deck_dir / "components", COMPONENTS]
        self.cache: dict[str, Component] = {}
        self.used: list[str] = []

    def get(self, name: str, where: str) -> Component:
        if name not in self.cache:
            for base in self.search:
                folder = base / name
                if folder.is_dir():
                    self.cache[name] = Component(name, folder)
                    break
            else:
                raise BuildError(f"{where}: unknown component '@{name}' (looked in deck components/ and components/)")
        if name not in self.used:
            self.used.append(name)
        return self.cache[name]


# === INCLUDE-TAG EXPANSION ================================================

def expand(source: str, registry: Registry, where: str) -> str:
    """Parse include tags into a tree and render it, supporting nesting."""
    # Each stack frame: (component | None, params, collected output parts, line)
    stack: list[tuple[Component | None, dict, list[str], int]] = [(None, {}, [], 0)]
    pos = 0
    for m in TAG.finditer(source):
        stack[-1][2].append(source[pos:m.start()])
        pos = m.end()
        closing, name, raw_attrs = m.group(1), m.group(2), m.group(3)
        line = source.count("\n", 0, m.start()) + 1
        loc = f"{where}:{line}"
        if closing:
            comp, params, parts, open_line = stack[-1]
            if comp is None or comp.name != name:
                expected = f"@/{comp.name} (opened line {open_line})" if comp else "no open block"
                raise BuildError(f"{loc}: found @/{name} but expected {expected}")
            stack.pop()
            stack[-1][2].append(comp.render(params, "".join(parts), loc))
            continue
        comp = registry.get(name, loc)
        params = {k: v for k, v in ATTR.findall(raw_attrs)}
        if comp.is_block:
            stack.append((comp, params, [], line))
        else:
            stack[-1][2].append(comp.render(params, "", loc))
    stack[-1][2].append(source[pos:])
    if len(stack) > 1:
        comp, _, _, open_line = stack[-1]
        raise BuildError(f"{where}:{open_line}: block @{comp.name} is never closed with <!-- @/{comp.name} -->")
    return "".join(stack[0][2])


# === SLIDES ===============================================================

def collect_slides(deck_dir: Path) -> list[tuple[str, str, Path]]:
    slides_dir = deck_dir / "slides"
    found: dict[str, tuple[str, str, Path]] = {}
    for f in sorted(slides_dir.glob("*.html")):
        m = SLIDE_FILE.match(f.name)
        if not m:
            raise BuildError(f"{f.relative_to(ROOT)}: slide files must be named NN-kebab-name.html")
        num, name = m.group(1).zfill(2), m.group(2)
        if num in found:
            raise BuildError(f"duplicate slide number {num}: {found[num][2].name} and {f.name}")
        found[num] = (num, name, f)
    if not found:
        raise BuildError(f"{slides_dir.relative_to(ROOT)} has no slides")
    return [found[k] for k in sorted(found, key=int)]


def render_slide(num: str, name: str, path: Path, registry: Registry) -> str:
    body = expand(path.read_text(encoding="utf-8"), registry, str(path.relative_to(ROOT)))
    # `<!-- no-anim -->` anywhere in a slide: no reveal, morph or build animation on it (data-no-anim on the section)
    noanim = " data-no-anim" if "<!-- no-anim -->" in path.read_text(encoding="utf-8") else ""
    if re.search(r"<section\b[^>]*\bclass=\"[^\"]*\bslide\b", body):
        # Slide supplies its own <section class="slide" ...>; just tag it.
        return re.sub(r"<section\b", f'<section data-slide="{num}" data-name="{name}"{noanim}', body, count=1).strip()
    return f'<section class="slide" data-slide="{num}" data-name="{name}"{noanim}>\n{body.strip()}\n</section>'


# === ASSETS ===============================================================

def inline_assets(doc: str, deck_dir: Path) -> tuple[str, list[str]]:
    missing: list[str] = []
    cache: dict[str, str] = {}

    def repl(m: re.Match) -> str:
        rel = html.unescape(m.group("path"))
        if rel not in cache:
            file = deck_dir / rel
            if not file.is_file():
                missing.append(rel)
                cache[rel] = m.group("path")
            else:
                mime = mimetypes.guess_type(file.name)[0] or "application/octet-stream"
                data = base64.b64encode(file.read_bytes()).decode("ascii")
                cache[rel] = f"data:{mime};base64,{data}"
        return m.group("pre") + cache[rel]

    return ASSET_REF.sub(repl, doc), missing


# === ASSEMBLY =============================================================

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8").strip()


def load_config(deck_dir: Path) -> dict:
    cfg_file = deck_dir / "deck.json"
    cfg = json.loads(cfg_file.read_text(encoding="utf-8")) if cfg_file.exists() else {}
    cfg.setdefault("title", deck_dir.name.replace("-", " ").title())
    cfg.setdefault("theme", "light")
    cfg.setdefault("lang", "en")
    cfg.setdefault("fonts_url", DEFAULT_FONTS_URL)
    if cfg["theme"] not in THEME_NAMES:
        raise BuildError(f"deck.json theme must be one of {THEME_NAMES}, got '{cfg['theme']}'")
    return cfg


def build(deck: str) -> Path:
    deck_dir = DECKS / deck
    if not deck_dir.is_dir():
        raise BuildError(f"no deck folder decks/{deck}")
    cfg = load_config(deck_dir)
    registry = Registry(deck_dir)

    slides = [render_slide(n, name, p, registry) for n, name, p in collect_slides(deck_dir)]

    css_parts = [
        ("CORE STAGE", read(CORE / "stage.css")),
        ("THEME TOKENS", read(THEMES / "tokens.css")),
        *[(f"THEME {t.upper()}", read(THEMES / f"{t}.css")) for t in THEME_NAMES],
        ("THEME BASE", read(THEMES / "base.css")),
    ]
    for name in registry.used:
        comp = registry.cache[name]
        if comp.css:
            css_parts.append((f"COMPONENT {name}", comp.css))
    deck_css = deck_dir / "deck.css"
    if deck_css.exists():
        css_parts.append(("DECK OVERRIDES", read(deck_css)))
    css = "\n\n".join(f"/* ===== {label} ===== */\n{body}" for label, body in css_parts)

    title = html.escape(cfg["title"])
    doc = f"""<!DOCTYPE html>
<!-- Built by build.py from decks/{deck}/ — edit the source slides, not this file. -->
<html lang="{cfg['lang']}" data-theme="{cfg['theme']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{html.escape(cfg['fonts_url'])}">
<style>
{css}
</style>
</head>
<body>
<div class="deck-viewport">
<main class="deck-stage" aria-label="{title}">

{chr(10).join(chr(10) + s + chr(10) for s in slides)}
<div class="deck-progress" aria-hidden="true"></div>
<div class="deck-counter" aria-hidden="true"></div>
</main>
</div>
<script>
{read(CORE / "runtime.js")}
</script>
</body>
</html>
"""
    doc, missing = inline_assets(doc, deck_dir)
    out = deck_output(deck)
    out.write_text(doc, encoding="utf-8")

    print(f"✓ {deck}: {len(slides)} slides → {out.relative_to(ROOT)} ({out.stat().st_size / 1024:.0f} KB)")
    print(f"  components: {', '.join(registry.used) or 'none'}")
    for rel in missing:
        print(f"  ! missing asset: decks/{deck}/{rel}")
    return out


# === COMMANDS =============================================================

def deck_output(deck: str) -> Path:
    """The built deck lives in its own folder, committed next to its source."""
    return DECKS / deck / f"{deck}.html"


def all_decks() -> list[str]:
    return sorted(p.name for p in DECKS.iterdir() if p.is_dir() and not p.name.startswith(("_", ".")))


def new_deck(name: str) -> None:
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", name):
        raise BuildError("deck names are kebab-case: lowercase letters, digits, hyphens")
    target = DECKS / name
    if target.exists():
        raise BuildError(f"decks/{name} already exists")
    shutil.copytree(DECKS / TEMPLATE_DECK, target)
    cfg_file = target / "deck.json"
    cfg = json.loads(cfg_file.read_text(encoding="utf-8"))
    cfg["title"] = name.replace("-", " ").title()
    cfg_file.write_text(json.dumps(cfg, indent=2) + "\n", encoding="utf-8")
    print(f"✓ created decks/{name} — fill in its CONTEXT.md, then: python3 build.py {name}")


def snapshot(deck: str) -> dict[Path, float]:
    watched = [CORE, THEMES, COMPONENTS, DECKS / deck]
    out = deck_output(deck)  # our own output must not retrigger a build
    return {f: f.stat().st_mtime for d in watched for f in d.rglob("*") if f.is_file() and f != out}


def watch(deck: str) -> None:
    print(f"watching decks/{deck} (Ctrl+C to stop)")
    before = snapshot(deck)
    while True:
        time.sleep(0.5)
        now = snapshot(deck)
        if now != before:
            before = now
            try:
                build(deck)
            except BuildError as e:
                print(f"✗ {e}")


# === SERVE ================================================================
# `--serve` hosts one deck on localhost, rebuilds on save (the page reloads
# itself) and accepts a new slide order from overview mode (O, then drag).
# Reordering renames slides/NN-name.html so the files carry the new order.

def reorder_slides(deck_dir: Path, order: list[str]) -> list[tuple[str, str]]:
    """Renumber slide files to follow `order` (a permutation of the current
    data-slide numbers). Returns [(old_name, new_name)] for files that moved."""
    slides = collect_slides(deck_dir)
    by_num = {num: path for num, _, path in slides}
    if sorted(order) != sorted(by_num):
        raise BuildError("reorder: the order doesn't match the slides on disk (reload and try again)")
    width = max(2, len(str(len(order))))
    plan = []
    for i, num in enumerate(order, start=1):
        src = by_num[num]
        name = SLIDE_FILE.match(src.name).group(2)
        dst = src.with_name(f"{str(i).zfill(width)}-{name}.html")
        if dst.name != src.name:
            plan.append((src.name, dst.name))
    return apply_renames(deck_dir / "slides", plan)


def apply_renames(slides_dir: Path, renames: list[tuple[str, str]]) -> list[tuple[str, str]]:
    """Rename files in slides_dir as a set: [(old_name, new_name)]. Checks every
    source exists and no target would overwrite a file outside the set."""
    plan = [(slides_dir / a, slides_dir / b) for a, b in renames]
    sources = {src for src, _ in plan}
    for src, dst in plan:
        if not src.is_file():
            raise BuildError(f"slides/{src.name} is missing (renamed or deleted since?)")
        if dst.exists() and dst not in sources:
            raise BuildError(f"slides/{dst.name} already exists")
    # Two phases through temporary names so 03→04 and 04→03 never collide.
    temps, placed = [], []
    try:
        for src, dst in plan:
            tmp = src.with_name(f".reorder-{dst.name}")
            src.rename(tmp)
            temps.append((src, tmp))
        for (_, tmp), (_, dst) in zip(temps, plan):
            tmp.rename(dst)
            placed.append((tmp, dst))
    except OSError as e:
        # best-effort rollback, in reverse: final names → temp names → originals
        for tmp, dst in reversed(placed):
            dst.rename(tmp)
        for src, tmp in reversed(temps):
            tmp.rename(src)
        raise BuildError(f"rename failed, files restored: {e}") from e
    return renames


class DeckServer:
    def __init__(self, deck: str):
        import threading

        self.deck = deck
        self.deck_dir = DECKS / deck
        self.lock = threading.Lock()
        self.version = 0
        self.error: str | None = None
        self.before = snapshot(deck)
        # Reorder history for ⌘Z / ⌘⇧Z: each entry is the [(old, new)] renames of one drop.
        # Lives only as long as the server does.
        self.undo_stack: list[list[tuple[str, str]]] = []
        self.redo_stack: list[list[tuple[str, str]]] = []

    def rebuild(self) -> None:
        try:
            build(self.deck)
            self.error = None
        except BuildError as e:
            self.error = str(e)
            print(f"✗ {e}")
        self.before = snapshot(self.deck)
        self.version += 1

    def watch_loop(self, port: int) -> None:
        me = Path(__file__)
        born = me.stat().st_mtime
        while True:
            time.sleep(0.5)
            with self.lock:
                if me.stat().st_mtime != born:
                    # build.py itself changed: restart on the same port so the open page keeps
                    # working and never talks to a server older than its runtime.
                    print("↻ build.py changed, restarting the server (reorder undo history resets)", flush=True)
                    os.environ["PYGMY_SERVE_RESTART_PORT"] = str(port)
                    os.execv(sys.executable, [sys.executable, str(me), *sys.argv[1:]])
                if snapshot(self.deck) != self.before:
                    self.rebuild()

    def page(self) -> bytes:
        if self.error:
            body = f"<pre style='font:16px monospace;padding:2em'>build failed:\n\n{html.escape(self.error)}</pre>"
            doc = f"<!DOCTYPE html><title>build failed</title>{body}"
        else:
            doc = deck_output(self.deck).read_text(encoding="utf-8")
        hook = f'<script id="pygmy-serve">window.PYGMY_SERVE = {{ version: {self.version} }};</script>'
        return doc.replace("<head>", "<head>\n" + hook, 1).encode("utf-8")

    def reorder(self, payload: dict) -> dict:
        with self.lock:
            if payload.get("version") != self.version:
                raise BuildError("the deck changed since this page loaded (reload and try again)")
            order = payload.get("order")
            if not isinstance(order, list) or not all(isinstance(n, str) for n in order):
                raise BuildError("reorder: expected a list of slide numbers")
            moved = reorder_slides(self.deck_dir, order)
            for old, new in moved:
                print(f"  ↳ {old} → {new}")
            if moved:
                self.undo_stack.append(moved)
                self.redo_stack.clear()
                print(f"  reordered {len(moved)} slide file(s); update decks/{self.deck}/CONTEXT.md if it lists slide numbers")
                self.rebuild()
            return {"ok": True, "moved": len(moved), "version": self.version}

    def step_history(self, payload: dict) -> dict:
        """Undo or redo one reorder. `current` (a data-slide number) is the slide the page
        is showing; the reply says where that same file sits afterwards."""
        action = payload.get("action")
        if action not in ("undo", "redo"):
            raise BuildError("history: action must be undo or redo")
        with self.lock:
            stack, other = (
                (self.undo_stack, self.redo_stack) if action == "undo" else (self.redo_stack, self.undo_stack)
            )
            if not stack:
                return {"ok": True, "moved": 0, "message": f"Nothing to {action}"}
            entry = stack[-1]
            renames = [(new, old) for old, new in entry] if action == "undo" else entry
            files = {num: path.name for num, _, path in collect_slides(self.deck_dir)}
            shown = files.get(str(payload.get("current", "")))
            try:
                apply_renames(self.deck_dir / "slides", renames)
            except BuildError as e:
                self.undo_stack.clear()
                self.redo_stack.clear()
                print(f"✗ {action} refused, history cleared: {e}")
                raise BuildError(f"Can't {action}: slide files were renamed by hand. Undo history cleared.") from e
            stack.pop()
            other.append(entry)
            for a, b in renames:
                print(f"  {action} ↳ {a} → {b}")
            self.rebuild()
            shown = dict(renames).get(shown, shown)
            names = [path.name for _, _, path in collect_slides(self.deck_dir)]
            return {
                "ok": True,
                "moved": len(renames),
                "index": names.index(shown) if shown in names else None,
                "can_undo": bool(self.undo_stack),
                "can_redo": bool(self.redo_stack),
            }


def serve(deck: str, port: int) -> None:
    import threading
    import webbrowser
    from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

    state = DeckServer(deck)

    class Handler(BaseHTTPRequestHandler):
        def send(self, code: int, body: bytes, ctype: str) -> None:
            self.send_response(code)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)

        def send_json(self, code: int, data: dict) -> None:
            self.send(code, json.dumps(data).encode("utf-8"), "application/json")

        def do_GET(self) -> None:
            path = self.path.split("?", 1)[0]
            if path in ("/", "/index.html", f"/{deck}.html"):
                self.send(200, state.page(), "text/html; charset=utf-8")
            elif path == "/__version":
                self.send_json(200, {"version": state.version})
            else:
                self.send(404, b"not found", "text/plain")

        def do_POST(self) -> None:
            routes = {"/__reorder": state.reorder, "/__history": state.step_history}
            if self.path not in routes:
                return self.send(404, b"not found", "text/plain")
            # JSON-only + same-origin: a page on another site can't trigger renames.
            origin = self.headers.get("Origin")
            if self.headers.get("Content-Type", "").split(";")[0] != "application/json" or (
                origin and origin != f"http://{self.headers.get('Host')}"
            ):
                return self.send_json(403, {"ok": False, "error": "forbidden"})
            try:
                length = int(self.headers.get("Content-Length") or 0)
                payload = json.loads(self.rfile.read(length) or b"{}")
                self.send_json(200, routes[self.path](payload))
            except (BuildError, ValueError) as e:
                self.send_json(409, {"ok": False, "error": str(e)})

        def log_message(self, *_args) -> None:  # keep the terminal for build output
            pass

    def taken(p: int) -> bool:
        """Something already answers on this port (IPv4 or IPv6, e.g. Docker on *:8000)."""
        import socket

        for host in ("127.0.0.1", "::1"):
            try:
                with socket.create_connection((host, p), timeout=0.2):
                    return True
            except OSError:
                pass
        return False

    restart_port = os.environ.pop("PYGMY_SERVE_RESTART_PORT", None)
    candidates = [int(restart_port)] if restart_port else range(port, port + 20)
    httpd = None
    for p in candidates:
        if not restart_port and taken(p):
            continue
        for attempt in range(20):  # on restart, the old socket may take a moment to free up
            try:
                httpd = ThreadingHTTPServer(("127.0.0.1", p), Handler)
                break
            except OSError:
                if not restart_port:
                    break
                time.sleep(0.1)
        if httpd:
            break
    if httpd is None:
        raise BuildError(f"no free port in {port}-{port + 19}")
    url = f"http://127.0.0.1:{httpd.server_port}/"
    threading.Thread(target=state.watch_loop, args=(httpd.server_port,), daemon=True).start()
    print(f"serving decks/{deck} at {url} (Ctrl+C to stop)", flush=True)
    print("  rebuilds on save · press O in the deck, then drag thumbnails to reorder slides", flush=True)
    if not restart_port:
        webbrowser.open(url)
    try:
        httpd.serve_forever()
    finally:
        httpd.server_close()


def main(argv: list[str]) -> int:
    args = [a for a in argv if not a.startswith("--")]
    flags = {a.split("=", 1)[0] for a in argv if a.startswith("--")}
    port = next((int(a.split("=", 1)[1]) for a in argv if a.startswith("--port=")), 8000)
    try:
        if args[:1] == ["new"]:
            if len(args) != 2:
                raise BuildError("usage: python3 build.py new <deck-name>")
            new_deck(args[1])
            return 0
        decks = args or all_decks()
        if not decks:
            raise BuildError("no decks found in decks/")
        for d in decks:
            build(d)
        if "--serve" in flags:
            if len(decks) != 1:
                raise BuildError("--serve takes exactly one deck")
            serve(decks[0], port)
        elif "--watch" in flags:
            if len(decks) != 1:
                raise BuildError("--watch takes exactly one deck")
            watch(decks[0])
    except BuildError as e:
        print(f"✗ {e}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

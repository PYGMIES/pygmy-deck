/* =====================================================================
   === CORE RUNTIME ===
   Scale-to-fit, navigation (keys / click / swipe / hash), progress,
   reveal staggering and inline edit mode. No dependencies.
   ===================================================================== */
(function () {
  "use strict";

  const STAGE_W = 1920;
  const STAGE_H = 1080;

  const stage = document.querySelector(".deck-stage");
  const slides = Array.from(stage.querySelectorAll(".slide"));
  const progress = stage.querySelector(".deck-progress");
  const counter = stage.querySelector(".deck-counter");
  let current = 0;

  const viewport = document.querySelector(".deck-viewport");

  /* === SCALE === uniform fit to the viewport box (shrinks when the notes panel is open), never re-layout */
  function fit() {
    const scale = Math.min(viewport.clientWidth / STAGE_W, viewport.clientHeight / STAGE_H);
    stage.style.setProperty("--stage-scale", scale);
  }
  window.addEventListener("resize", fit);
  fit();

  /* === REVEAL ORDER === stagger index per slide */
  slides.forEach((slide) => {
    slide.querySelectorAll(".reveal").forEach((el, i) => el.style.setProperty("--i", i));
  });

  /* === MATCH AND MOVE === Keynote-style "magic move" between adjacent slides.
     Opt-in per element: the same non-empty data-morph key on both slides glides from its old box
     to its new one (FLIP: translate + scale + opacity) over MORPH_MS. Inside a [data-morph-scope],
     direct children with identical markup pair up on their own and stay put, so repeated build
     pieces don't flicker. Everything else crossfades. Slides with no pairs switch as before.
     Skipped for jumps (more than one slide), reduced motion, edit and overview modes. */
  const MORPH_MS = 1000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let booted = false;
  let finishMorph = null;

  /* markup identity, ignoring the reveal class and the --i index the runtime adds */
  const signature = (el) =>
    el.outerHTML
      .replace(/\s*--i:\s*\d+;?/g, "")
      .replace(/\sstyle="\s*"/g, "")
      .replace(/\breveal\b/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s"/g, '"');

  /* a build step that is still hidden (is-step-N root, data-s above N) never pairs: it appears as a new piece */
  const stepHidden = (el) => {
    const root = el.closest('[class*="is-step-"]');
    const m = root && /is-step-(\d+)/.exec(root.className);
    return !!(m && el.dataset.s && Number(el.dataset.s) > Number(m[1]));
  };

  function morphPairs(from, to) {
    const pairs = [];
    const used = new Set();
    const pair = (a, b) => {
      pairs.push([a, b]);
      used.add(a);
      used.add(b);
    };
    const keyed = new Map();
    from.querySelectorAll("[data-morph]").forEach((el) => {
      if (el.dataset.morph && !keyed.has(el.dataset.morph)) keyed.set(el.dataset.morph, el);
    });
    to.querySelectorAll("[data-morph]").forEach((el) => {
      const a = el.dataset.morph && keyed.get(el.dataset.morph);
      if (a && !used.has(a)) pair(a, el);
    });
    const fromScopes = from.querySelectorAll("[data-morph-scope]");
    to.querySelectorAll("[data-morph-scope]").forEach((scope, i) => {
      if (!fromScopes[i]) return;
      const bySig = new Map();
      Array.from(fromScopes[i].children).forEach((el) => {
        if (used.has(el) || el.dataset.morph || stepHidden(el)) return;
        const sig = signature(el);
        if (!bySig.has(sig)) bySig.set(sig, []);
        bySig.get(sig).push(el);
      });
      Array.from(scope.children).forEach((el) => {
        if (used.has(el) || el.dataset.morph || stepHidden(el)) return;
        const match = (bySig.get(signature(el)) || []).shift();
        if (match) pair(match, el);
      });
    });
    return { pairs, used };
  }

  /* the slide's leaves that are neither paired nor hold a pair: these crossfade */
  function fadeUnits(root, used) {
    const units = [];
    const holdsPair = (el) => Array.from(used).some((u) => u !== el && el.contains(u));
    (function walk(el) {
      Array.from(el.children).forEach((child) => {
        if (used.has(child)) return;
        if (holdsPair(child)) walk(child);
        else units.push(child);
      });
    })(root);
    return units;
  }

  /* screen box without the translate of .reveal (or any other transform) on the way up */
  function boxOf(el, scale) {
    const r = el.getBoundingClientRect();
    let tx = 0;
    let ty = 0;
    for (let n = el; n && !n.classList.contains("slide"); n = n.parentElement) {
      const t = getComputedStyle(n).transform;
      if (t && t !== "none") {
        const m = new DOMMatrixReadOnly(t);
        tx += m.m41;
        ty += m.m42;
      }
    }
    return { x: r.left - tx * scale, y: r.top - ty * scale, w: r.width, h: r.height };
  }

  function morph(from, to) {
    const body = document.body.classList;
    if (!booted || reduceMotion.matches || body.contains("editing") || body.contains("overview")) return;
    const { pairs, used } = morphPairs(from, to);
    if (!pairs.length) return;

    const scale = parseFloat(stage.style.getPropertyValue("--stage-scale")) || 1;
    const plan = pairs.map(([a, b]) => ({
      a,
      b,
      first: boxOf(a, scale),
      last: boxOf(b, scale),
      op0: parseFloat(getComputedStyle(a).opacity),
      op1: b.classList.contains("reveal") ? 1 : parseFloat(getComputedStyle(b).opacity),
    }));
    const fadeOut = fadeUnits(from, used);
    const fadeIn = fadeUnits(to, used).filter((el) => !el.classList.contains("reveal"));

    /* only the new pieces animate: number them from 0 so they do not wait behind the held ones */
    const reindexed = [];
    let k = 0;
    to.querySelectorAll(".reveal").forEach((el) => {
      if (used.has(el)) return;
      reindexed.push([el, el.style.getPropertyValue("--i")]);
      el.style.setProperty("--i", k++);
    });
    from.classList.add("morph-from");
    to.classList.add("morph-to");
    const anims = [];
    const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
    plan.forEach(({ a, b, first, last, op0, op1 }) => {
      a.style.visibility = "hidden";
      b.style.transition = "none";
      b.style.opacity = String(op1);
      b.style.transform = "none";
      const dx = (first.x - last.x) / scale;
      const dy = (first.y - last.y) / scale;
      const sx = last.w ? first.w / last.w : 1;
      const sy = last.h ? first.h / last.h : 1;
      const still = Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01;
      if (still && Math.abs(op0 - op1) < 0.01) return;
      /* travel above everything else on the slide */
      if (getComputedStyle(b).position === "static") b.style.position = "relative";
      b.style.zIndex = "10";
      anims.push(b.animate(
        [
          { transformOrigin: "0 0", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: op0 },
          { transformOrigin: "0 0", transform: "none", opacity: op1 },
        ],
        { duration: MORPH_MS, easing: ease }
      ));
    });
    fadeOut.forEach((el) => {
      anims.push(el.animate([{ opacity: getComputedStyle(el).opacity }, { opacity: 0 }], { duration: MORPH_MS * 0.35, fill: "forwards" }));
    });
    fadeIn.forEach((el) => {
      const op = getComputedStyle(el).opacity;
      anims.push(el.animate([{ opacity: 0 }, { opacity: op }], { duration: MORPH_MS / 2, delay: MORPH_MS * 0.4, fill: "backwards" }));
    });

    const timer = setTimeout(() => finishMorph && finishMorph(), MORPH_MS + 60);
    finishMorph = () => {
      finishMorph = null;
      clearTimeout(timer);
      from.style.transition = "none";
      from.classList.remove("morph-from");
      to.classList.remove("morph-to");
      anims.forEach((anim) => anim.cancel());
      reindexed.forEach(([el, i]) => el.style.setProperty("--i", i));
      plan.forEach(({ a, b }) => {
        a.style.visibility = "";
        b.style.transition = "";
        b.style.opacity = "";
        b.style.transform = "";
        b.style.position = "";
        b.style.zIndex = "";
      });
      void from.offsetWidth;
      from.style.transition = "";
    };
  }

  /* === NAVIGATION === */
  function go(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (finishMorph) finishMorph();
    if (Math.abs(next - current) === 1) morph(slides[current], slides[next]);
    slides[current].classList.remove("active");
    current = next;
    slides[current].classList.add("active");
    if (progress) {
      const denom = Math.max(1, slides.length - 1);
      progress.style.setProperty("--progress", current / denom);
    }
    if (counter) counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    history.replaceState(null, "", `#${current + 1}`);
    syncOverview();
    syncNotes();
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  }

  /* Keys typed into form fields or overlays (e.g. the --annotate build) aren't navigation */
  const isForeign = (el) =>
    el instanceof Element && !!el.closest("input, textarea, select, [contenteditable]:not(.slide *), agentation-toolbar");

  document.addEventListener("keydown", (e) => {
    if (isForeign(e.target)) return;
    if (document.body.classList.contains("editing")) {
      if (e.key === "Escape") toggleEdit(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
      return;
    }
    /* undo / redo slide reorders (serve mode). Edit mode returned above, so text undo stays native. */
    if (SERVE && (e.metaKey || e.ctrlKey) && !e.altKey) {
      const k = e.key.toLowerCase();
      const redo = (k === "z" && e.shiftKey) || (k === "y" && e.ctrlKey && !e.metaKey);
      if (k === "z" || redo) {
        e.preventDefault();
        stepHistory(redo ? "redo" : "undo");
        return;
      }
    }
    if (document.body.classList.contains("overview")) {
      if (e.key === "Escape" && clearSelection()) return; /* first Esc clears a selection */
      if (e.key === "Escape" || e.key === "o" || e.key === "O") toggleOverview(false);
      return;
    }
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        e.preventDefault();
        go(current + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        go(current - 1);
        break;
      case "Home":
        go(0);
        break;
      case "End":
        go(slides.length - 1);
        break;
      case "e":
      case "E":
        toggleEdit(true);
        break;
      case "f":
      case "F":
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
        break;
      case "o":
      case "O":
        toggleOverview(true);
        break;
      case "n":
      case "N":
        toggleNotes();
        break;
    }
  });

  /* Click: right 2/3 advances, left 1/3 goes back */
  stage.addEventListener("click", (e) => {
    if (document.body.classList.contains("editing")) return;
    if (e.target.closest("a, button, [data-hover-chart]")) return;
    const rect = stage.getBoundingClientRect();
    go(e.clientX - rect.left < rect.width / 3 ? current - 1 : current + 1);
  });

  /* Swipe */
  let touchX = null;
  stage.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
    touchX = null;
  });


  /* === CHART HOVER === any [data-hover-chart] holds JSON {w, t, b, p:[{x, t, r:[{k, l, v, y}], b?}]}
     in SVG viewBox units. Pointer snaps to the nearest x and shows a guide line, dots and a tooltip. */
  document.querySelectorAll("[data-hover-chart]").forEach((host) => {
    const cfg = JSON.parse(host.dataset.hoverChart);
    const svg = host.querySelector("svg");
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag, cls, attrs) => {
      const n = document.createElementNS(NS, tag);
      n.setAttribute("class", cls);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
      svg.appendChild(n);
      return n;
    };
    const guide = mk("line", "ec-hline", { y1: cfg.t, y2: cfg.b, visibility: "hidden" });
    const dots = cfg.p[0].r.map((row) => mk("circle", "ec-hdot ec-" + row.k, { r: 9, visibility: "hidden" }));
    const tip = document.createElement("div");
    tip.className = "ec-tip";
    tip.hidden = true;
    host.appendChild(tip);

    const hide = () => {
      tip.hidden = true;
      guide.setAttribute("visibility", "hidden");
      dots.forEach((d) => d.setAttribute("visibility", "hidden"));
    };
    const show = (ev) => {
      const rect = svg.getBoundingClientRect();
      const ux = ((ev.clientX - rect.left) / rect.width) * cfg.w;
      let best = 0;
      cfg.p.forEach((pt, i) => { if (Math.abs(pt.x - ux) < Math.abs(cfg.p[best].x - ux)) best = i; });
      const pt = cfg.p[best];
      guide.setAttribute("x1", pt.x);
      guide.setAttribute("x2", pt.x);
      guide.setAttribute("visibility", "visible");
      pt.r.forEach((row, i) => {
        dots[i].setAttribute("cx", pt.x);
        dots[i].setAttribute("cy", row.y);
        dots[i].setAttribute("visibility", "visible");
      });
      tip.innerHTML = `<b>${pt.t}</b>` +
        pt.r.map((row) => `<div class="ec-tip__row"><span><i class="ec-${row.k}"></i>${row.l}</span><span>${row.v}</span></div>`).join("") +
        (pt.b ? `<div class="ec-tip__row is-muted"><span>Random 5–95%</span><span>${pt.b}</span></div>` : "");
      tip.hidden = false;
      /* layout px (unscaled): offsetWidth ignores the stage transform */
      const px = (pt.x / cfg.w) * svg.clientWidth;
      const left = px + 24 + tip.offsetWidth > svg.clientWidth ? px - tip.offsetWidth - 24 : px + 24;
      tip.style.left = Math.max(0, left) + "px";
    };
    host.addEventListener("pointermove", show);
    host.addEventListener("pointerdown", show);
    host.addEventListener("pointerleave", hide);
  });

  /* === SCATTER HOVER === any [data-hover-scatter] holds JSON {w, h, p:[{x, y, t, d, v, u, ci?}]} in SVG
     viewBox units. Pointer picks the nearest point within a radius: ring around the dot + tooltip. */
  document.querySelectorAll("[data-hover-scatter]").forEach((host) => {
    const cfg = JSON.parse(host.dataset.hoverScatter);
    const svg = host.querySelector("svg");
    const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ring.setAttribute("class", "sc-ring");
    ring.setAttribute("r", 17);
    ring.setAttribute("visibility", "hidden");
    svg.appendChild(ring);
    const tip = document.createElement("div");
    tip.className = "sc-tip";
    tip.hidden = true;
    host.appendChild(tip);

    const hide = () => {
      tip.hidden = true;
      ring.setAttribute("visibility", "hidden");
    };
    const show = (ev) => {
      const rect = svg.getBoundingClientRect();
      const ux = ((ev.clientX - rect.left) / rect.width) * cfg.w;
      const uy = ((ev.clientY - rect.top) / rect.height) * cfg.h;
      let best = null;
      let bestD = 40 * 40;
      cfg.p.forEach((pt) => {
        const d = (pt.x - ux) ** 2 + (pt.y - uy) ** 2;
        if (d < bestD) { bestD = d; best = pt; }
      });
      if (!best) return hide();
      ring.setAttribute("cx", best.x);
      ring.setAttribute("cy", best.y);
      ring.setAttribute("visibility", "visible");
      tip.innerHTML = `<b>${best.t}</b><div class="sc-tip__desc">${best.d}</div>` +
        `<div class="sc-tip__row"><span>Variant</span><span>${best.v}</span></div>` +
        `<div class="sc-tip__row"><span>$ per campaign</span><span>${best.u}</span></div>` +
        (best.ci ? `<div class="sc-tip__row is-muted"><span>95% CI</span><span>${best.ci}</span></div>` : "");
      tip.hidden = false;
      /* layout px (unscaled): offsetWidth ignores the stage transform */
      const kx = svg.clientWidth / cfg.w;
      const ky = svg.clientHeight / cfg.h;
      const px = best.x * kx;
      const py = best.y * ky;
      const left = px + 28 + tip.offsetWidth > svg.clientWidth ? px - tip.offsetWidth - 28 : px + 28;
      const top = Math.min(Math.max(0, py - tip.offsetHeight / 2), svg.clientHeight - tip.offsetHeight);
      tip.style.left = Math.max(0, left) + "px";
      tip.style.top = top + "px";
    };
    host.addEventListener("pointermove", show);
    host.addEventListener("pointerdown", show);
    host.addEventListener("pointerleave", hide);
  });

  window.addEventListener("hashchange", () => go(fromHash()));

  /* === EDIT MODE === E toggles, Ctrl/Cmd+S downloads the edited file */
  const EDITABLE = "h1, h2, h3, h4, p, li, td, th, blockquote, figcaption, span.editable";
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "edit-toggle";
  toggleBtn.textContent = "EDIT";
  toggleBtn.title = "Toggle edit mode (E)";
  toggleBtn.addEventListener("click", () => toggleEdit(!document.body.classList.contains("editing")));
  document.body.appendChild(toggleBtn);

  function toggleEdit(on) {
    document.body.classList.toggle("editing", on);
    stage.querySelectorAll(EDITABLE).forEach((el) => {
      if (on) el.setAttribute("contenteditable", "true");
      else el.removeAttribute("contenteditable");
    });
    toggleBtn.textContent = on ? "DONE" : "EDIT";
  }

  function save() {
    toggleEdit(false);
    slides.forEach((s) => s.classList.remove("active"));
    const notesOpen = document.body.classList.contains("notes-open");
    toggleNotes(false);
    const chrome = [toggleBtn, notesBtn, notesPanel, toast].filter(Boolean);
    chrome.forEach((el) => el.remove());
    const serveHook = document.getElementById("pygmy-serve");
    const hookParent = serveHook && serveHook.parentNode;
    const hookNext = serveHook && serveHook.nextSibling;
    if (serveHook) serveHook.remove(); /* a saved copy must not think it's served */
    const html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    if (serveHook) hookParent.insertBefore(serveHook, hookNext);
    chrome.forEach((el) => document.body.appendChild(el));
    toggleNotes(notesOpen);
    go(current);
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (location.pathname.split("/").pop() || "deck.html").replace(/\.html?$/, "") + ".html";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* === SERVE MODE === `build.py <deck> --serve` injects window.PYGMY_SERVE (never present in
     the committed file). Adds live reload on rebuild and drag-to-reorder in the overview. */
  const SERVE = window.PYGMY_SERVE || null;
  const REOPEN_KEY = "pygmy-deck-reopen-overview";
  const FLASH_KEY = "pygmy-deck-flash";
  const MOD = /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl+";
  const REDO_KEYS = MOD === "⌘" ? "⌘⇧Z" : "Ctrl+Y";
  let reordering = false;

  function reloadAt(index, reopenOverview, flash) {
    try {
      if (reopenOverview) sessionStorage.setItem(REOPEN_KEY, "1");
      if (flash) sessionStorage.setItem(FLASH_KEY, flash);
    } catch (_) { /* storage blocked: reload still works, overview just stays closed */ }
    history.replaceState(null, "", `#${index + 1}`);
    location.reload();
  }

  /* Short message: in the overview's status pill when it's open, else a toast. */
  let toast = null;
  let messageTimer = null;
  function showMessage(text, isError = false) {
    clearTimeout(messageTimer);
    if (document.body.classList.contains("overview") && ovStatus) {
      setStatus(text, isError);
      messageTimer = setTimeout(() => setStatus(ovHint()), 3000);
      return;
    }
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "deck-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.toggle("is-error", isError);
    toast.classList.add("is-shown");
    messageTimer = setTimeout(() => toast.classList.remove("is-shown"), 3000);
  }

  /* POST JSON to the serve-mode server; a non-JSON reply means it predates this page's runtime */
  async function postJSON(path, data) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let out;
    try {
      out = await res.json();
    } catch (_) {
      throw new Error("The deck server is out of date. Stop it (Ctrl+C) and run make finals again.");
    }
    if (!res.ok || !out.ok) throw new Error(out.error || res.statusText);
    return out;
  }

  /* ⌘Z / Ctrl+Z undoes the last reorder, ⌘⇧Z / Ctrl+Y redoes it. History is kept by the server. */
  async function stepHistory(action) {
    if (reordering) return;
    reordering = true;
    try {
      const out = await postJSON("/__history", { action, current: slides[current].dataset.slide });
      if (!out.moved) {
        reordering = false;
        showMessage(out.message);
        return;
      }
      const flash = action === "undo"
        ? `Reorder undone${out.can_redo ? ` · ${REDO_KEYS} to redo` : ""}`
        : `Reorder redone${out.can_undo ? ` · ${MOD}Z to undo` : ""}`;
      reloadAt(out.index == null ? current : out.index, document.body.classList.contains("overview"), flash);
    } catch (err) {
      reordering = false;
      showMessage(err.message, true);
    }
  }

  if (SERVE) {
    let polling = false;
    setInterval(async () => {
      /* never reload under an in-progress inline edit or note */
      if (polling || reordering || document.body.classList.contains("editing")) return;
      if (document.activeElement && document.activeElement.classList.contains("deck-notes__text")) return;
      polling = true;
      try {
        const res = await fetch("/__version", { cache: "no-store" });
        const { version } = await res.json();
        if (version !== SERVE.version) reloadAt(current, document.body.classList.contains("overview"));
      } catch (_) { /* server stopped: keep presenting the loaded page */ }
      polling = false;
    }, 1000);
  }

  /* === OVERVIEW === O toggles a grid of every slide; click/Enter a thumbnail to jump */
  let overview = null;
  let ovCells = [];
  let ovStatus = null;
  const OV_HINT = `Drag to reorder · Shift+click to select several · ${MOD}Z to undo`;

  /* Multi-select (serve mode): Shift+click selects a range from the anchor (or the current
     slide), ⌘/Ctrl+click toggles one slide, Esc clears. Dragging a selected slide moves them all. */
  const selected = new Set();
  let anchor = null;

  const ovHint = () =>
    selected.size
      ? `${selected.size} slide${selected.size > 1 ? "s" : ""} selected · drag to move · Esc to clear`
      : OV_HINT;

  function paintSelection() {
    ovCells.forEach((c) => c.classList.toggle("is-selected", selected.has(c)));
    if (ovStatus && !reordering) setStatus(ovHint());
  }

  function select(cell, mode) {
    const cells = Array.from(overview.querySelectorAll(".ov-cell"));
    if (mode === "toggle") {
      if (selected.has(cell)) selected.delete(cell);
      else selected.add(cell);
      anchor = cell;
    } else {
      const from = anchor || ovCells[current];
      const [a, b] = [cells.indexOf(from), cells.indexOf(cell)].sort((x, y) => x - y);
      selected.clear();
      cells.slice(a, b + 1).forEach((c) => selected.add(c));
      anchor = from;
    }
    paintSelection();
  }

  function clearSelection() {
    const had = selected.size > 0;
    selected.clear();
    anchor = null;
    if (overview) paintSelection();
    return had;
  }

  function buildOverview() {
    overview = document.createElement("div");
    overview.className = "deck-overview";
    ovCells = slides.map((slide, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "ov-cell";
      cell.dataset.slide = slide.dataset.slide || "";
      const name = slide.dataset.name || "";
      cell.setAttribute("aria-label", `Go to slide ${i + 1}${name ? ": " + name : ""}`);

      const frame = document.createElement("div");
      frame.className = "ov-frame";
      frame.appendChild(slide.cloneNode(true));
      cell.appendChild(frame);

      const num = document.createElement("span");
      num.className = "ov-num";
      num.textContent = String(i + 1).padStart(2, "0");
      cell.appendChild(num);

      cell.addEventListener("click", (e) => {
        if (SERVE && (e.shiftKey || e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          select(cell, e.shiftKey ? "range" : "toggle");
          return;
        }
        go(i);
        toggleOverview(false);
      });
      return cell;
    });
    ovCells.forEach((cell) => overview.appendChild(cell));
    document.body.appendChild(overview);
    if (SERVE) enableReorder();
  }

  /* Drag a thumbnail between two others; the drop renames slides/NN-name.html on the server,
     which rebuilds, and the page reloads with the overview open. */
  function enableReorder() {
    overview.classList.add("can-reorder");
    ovStatus = document.createElement("div");
    ovStatus.className = "ov-status";
    ovStatus.setAttribute("role", "status");
    overview.appendChild(ovStatus);
    setStatus(ovHint());
    ovCells.forEach((cell) => (cell.draggable = true));

    /* Live preview: the dragged cell moves into its would-be slot as you drag (shown as a dashed
       placeholder), neighbours glide aside (FLIP) and numbers update, so the grid shows the final
       order before the drop. Dropping outside the grid or Esc slides everything back. */
    const SHIFT_MS = 240;
    let dragCell = null;
    let startOrder = null;
    let dropped = false;
    let settleUntil = 0;

    const cellsNow = () => Array.from(overview.querySelectorAll(".ov-cell"));
    const pad = (n) => String(n).padStart(2, "0");
    /* while a group is folded into one slot, that slot shows the range it will fill
       (e.g. 06–09) and the slides after it count past the whole group */
    const renumber = () => {
      let n = 1;
      cellsNow().forEach((c) => {
        const span = c === dragCell && group.length > 1 ? group.length : 1;
        c.querySelector(".ov-num").textContent = span > 1 ? `${pad(n)}–${pad(n + span - 1)}` : pad(n);
        n += span;
      });
    };

    /* move cells in the DOM, then animate each from its old box to its new one;
       cells that (re)appear fade in */
    function shift(mutate) {
      const cells = cellsNow();
      const first = new Map(cells.map((c) => [c, c.getBoundingClientRect()]));
      mutate();
      renumber();
      if (reduceMotion.matches) return;
      settleUntil = performance.now() + SHIFT_MS;
      const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
      cellsNow().forEach((c) => {
        const a = first.get(c);
        if (!a) {
          c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: SHIFT_MS, easing: ease });
          return;
        }
        const b = c.getBoundingClientRect();
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
          duration: SHIFT_MS,
          easing: ease,
        });
      });
    }

    /* Several slides: a stacked drag image with a count badge (off-screen, removed after the
       browser snapshots it). */
    function groupGhost(cell, count) {
      const ghost = document.createElement("div");
      ghost.className = "ov-drag-ghost";
      const card = cell.cloneNode(true);
      card.classList.remove("is-selected", "is-current");
      const badge = document.createElement("span");
      badge.className = "ov-ghost-count";
      badge.textContent = `${count} slides`;
      ghost.append(card, badge);
      document.body.appendChild(ghost);
      setTimeout(() => ghost.remove(), 0);
      return ghost;
    }

    let group = [];

    overview.addEventListener("dragstart", (e) => {
      const cell = e.target instanceof Element && e.target.closest(".ov-cell");
      if (!cell || reordering) return e.preventDefault();
      dragCell = cell;
      startOrder = cellsNow();
      dropped = false;
      /* a selected slide drags the whole selection (in deck order); any other drags alone */
      group = selected.has(cell) && selected.size > 1 ? startOrder.filter((c) => selected.has(c)) : [cell];
      if (!selected.has(cell)) clearSelection();
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", group.map((c) => c.dataset.slide).join(","));
      if (group.length > 1) {
        const r = cell.getBoundingClientRect();
        e.dataTransfer.setDragImage(groupGhost(cell, group.length), e.clientX - r.left, e.clientY - r.top);
      }
      /* after the browser has snapshotted the drag image: the dragged slide becomes the one
         landing slot; for a group, the other selected slides fold away into it */
      requestAnimationFrame(() => {
        if (!dragCell) return;
        overview.classList.add("is-sorting");
        dragCell.classList.add("is-dragging");
        if (group.length > 1) {
          dragCell.dataset.count = `${group.length} slides`;
          shift(() => group.forEach((c) => c !== dragCell && c.remove()));
        }
      });
    });

    overview.addEventListener("dragover", (e) => {
      if (!dragCell) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (performance.now() < settleUntil) return; /* let the last shift land before the next */
      const target = e.target instanceof Element && e.target.closest(".ov-cell");
      if (!target || group.includes(target)) return;
      /* entering a later cell puts the block after it, an earlier cell before it, so the block
         always lands under the pointer and doesn't flip back and forth */
      const cells = cellsNow();
      const after = cells.indexOf(target) > cells.indexOf(dragCell);
      shift(() => overview.insertBefore(dragCell, after ? target.nextSibling : target));
    });

    overview.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!dragCell) return;
      dropped = true;
      /* unfold the group at the slot, in deck order */
      const at = group.indexOf(dragCell);
      group.slice(0, at).forEach((c) => overview.insertBefore(c, dragCell));
      group.slice(at + 1).reverse().forEach((c) => overview.insertBefore(c, dragCell.nextSibling));
      const order = orderOf();
      if (order.join() === startOrder.map((c) => c.dataset.slide).join()) return;
      saveOrder(order, order.indexOf(slides[current].dataset.slide), group.length);
    });

    overview.addEventListener("dragend", () => {
      if (!dragCell) return;
      if (!dropped) {
        const original = startOrder;
        shift(() => original.forEach((c) => overview.insertBefore(c, ovStatus)));
      }
      overview.classList.remove("is-sorting");
      dragCell.classList.remove("is-dragging");
      delete dragCell.dataset.count;
      dragCell = null;
      startOrder = null;
      group = [];
      renumber();
    });
  }

  const orderOf = () => Array.from(overview.querySelectorAll(".ov-cell"), (c) => c.dataset.slide);

  function setStatus(text, isError = false) {
    if (!ovStatus) return;
    ovStatus.textContent = text;
    ovStatus.classList.toggle("is-error", isError);
  }

  async function saveOrder(order, newIndex, count = 1) {
    reordering = true;
    overview.classList.add("is-saving");
    setStatus("Saving new order…");
    try {
      await postJSON("/__reorder", { version: SERVE.version, order });
      const what = count > 1 ? `${count} slides moved` : "Slide moved";
      reloadAt(Math.max(0, newIndex), true, `${what} · ${MOD}Z to undo`);
    } catch (err) {
      setStatus(`Couldn't save: ${err.message}. Reloading…`, true);
      setTimeout(() => reloadAt(current, true), 2500);
    }
  }

  function syncOverview() {
    if (!overview) return;
    ovCells.forEach((cell, i) => cell.classList.toggle("is-current", i === current));
  }

  function toggleOverview(on) {
    if (on && !overview) buildOverview();
    if (!on) clearSelection();
    document.body.classList.toggle("overview", on);
    if (on) {
      syncOverview();
      ovCells[current]?.focus();
      ovCells[current]?.scrollIntoView({ block: "center" });
    }
  }

  /* === SPEAKER NOTES === N or bottom-left corner button. Reads each slide's
     <!-- notes: … --> comments into an editable panel below the stage. Edits
     autosave to localStorage and are written back into the slide's comment
     node, so Ctrl/Cmd+S in edit mode downloads them too. */
  const NOTES_KEY = "pygmy-deck-notes:" + location.pathname;
  const noteNodes = slides.map((slide) => {
    const walker = document.createTreeWalker(slide, NodeFilter.SHOW_COMMENT);
    const found = [];
    while (walker.nextNode()) if (/^\s*notes:/.test(walker.currentNode.nodeValue)) found.push(walker.currentNode);
    return found;
  });
  const noteText = (node) => node.nodeValue.replace(/^\s*notes:\s*/, "").trim();
  const slideNotes = noteNodes.map((nodes) => nodes.map(noteText).join("\n\n"));

  /* keep the comment node in sync with the text (one node per slide) */
  function writeNote(i, text) {
    slideNotes[i] = text;
    const safe = ` notes: ${text.replace(/--/g, "\u2013")} `;
    if (noteNodes[i].length) {
      noteNodes[i][0].nodeValue = safe;
      noteNodes[i].slice(1).forEach((n) => n.remove());
      noteNodes[i] = [noteNodes[i][0]];
    } else if (text.trim()) {
      const c = document.createComment(safe);
      slides[i].appendChild(c);
      noteNodes[i] = [c];
    }
  }

  const readSaved = () => {
    try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || {}; } catch (_) { return {}; }
  };
  const saved = readSaved();
  Object.keys(saved).forEach((k) => {
    const i = parseInt(k, 10);
    if (i >= 0 && i < slides.length && typeof saved[k] === "string") writeNote(i, saved[k]);
  });
  function persist(i, text) {
    try {
      const all = readSaved();
      all[i] = text;
      localStorage.setItem(NOTES_KEY, JSON.stringify(all));
    } catch (_) { /* storage blocked: edits still live in the page until reload */ }
  }

  const notesBtn = document.createElement("button");
  notesBtn.className = "notes-toggle";
  notesBtn.textContent = "NOTES";
  notesBtn.title = "Toggle speaker notes (N)";
  notesBtn.addEventListener("click", () => toggleNotes());
  document.body.appendChild(notesBtn);

  const notesPanel = document.createElement("aside");
  notesPanel.className = "deck-notes";
  notesPanel.setAttribute("aria-label", "Speaker notes");
  const notesHead = document.createElement("span");
  notesHead.className = "deck-notes__head";
  const notesArea = document.createElement("textarea");
  notesArea.className = "deck-notes__text";
  notesArea.placeholder = "No notes for this slide. Type here to add some.";
  notesArea.spellcheck = true;
  notesArea.addEventListener("input", () => {
    writeNote(current, notesArea.value);
    persist(current, notesArea.value);
  });
  notesArea.addEventListener("keydown", (e) => {
    if (e.key === "Escape") notesArea.blur();
  });
  notesPanel.append(notesHead, notesArea);
  document.body.appendChild(notesPanel);

  function syncNotes() {
    if (!document.body.classList.contains("notes-open")) return;
    notesHead.textContent = `Notes · ${String(current + 1).padStart(2, "0")} · editable, saved in this browser`;
    notesArea.value = slideNotes[current];
    notesArea.scrollTop = 0;
  }

  function toggleNotes(on = !document.body.classList.contains("notes-open")) {
    document.body.classList.toggle("notes-open", on);
    notesBtn.textContent = on ? "HIDE NOTES" : "NOTES";
    syncNotes();
    fit();
  }

  /* === START === */
  current = 0;
  slides[0].classList.add("active");
  go(fromHash());
  booted = true;
  try {
    if (SERVE && sessionStorage.getItem(REOPEN_KEY)) {
      sessionStorage.removeItem(REOPEN_KEY);
      toggleOverview(true);
    }
    const flash = SERVE && sessionStorage.getItem(FLASH_KEY);
    if (flash) {
      sessionStorage.removeItem(FLASH_KEY);
      showMessage(flash);
    }
  } catch (_) { /* storage blocked: start on the slide, overview closed */ }
})();

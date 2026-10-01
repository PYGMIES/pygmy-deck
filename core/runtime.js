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

  /* === SCALE === uniform fit, never re-layout */
  function fit() {
    const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
    stage.style.setProperty("--stage-scale", scale);
  }
  window.addEventListener("resize", fit);
  fit();

  /* === REVEAL ORDER === stagger index per slide */
  slides.forEach((slide) => {
    slide.querySelectorAll(".reveal").forEach((el, i) => el.style.setProperty("--i", i));
  });

  /* === NAVIGATION === */
  function go(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
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
    if (document.body.classList.contains("overview")) {
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
    toggleBtn.remove();
    const html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    document.body.appendChild(toggleBtn);
    go(current);
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (location.pathname.split("/").pop() || "deck.html").replace(/\.html?$/, "") + ".html";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* === OVERVIEW === O toggles a grid of every slide; click/Enter a thumbnail to jump */
  let overview = null;
  let ovCells = [];

  function buildOverview() {
    overview = document.createElement("div");
    overview.className = "deck-overview";
    ovCells = slides.map((slide, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "ov-cell";
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

      cell.addEventListener("click", () => {
        go(i);
        toggleOverview(false);
      });
      return cell;
    });
    ovCells.forEach((cell) => overview.appendChild(cell));
    document.body.appendChild(overview);
  }

  function syncOverview() {
    if (!overview) return;
    ovCells.forEach((cell, i) => cell.classList.toggle("is-current", i === current));
  }

  function toggleOverview(on) {
    if (on && !overview) buildOverview();
    document.body.classList.toggle("overview", on);
    if (on) {
      syncOverview();
      ovCells[current]?.focus();
      ovCells[current]?.scrollIntoView({ block: "center" });
    }
  }

  /* === START === */
  current = 0;
  slides[0].classList.add("active");
  go(fromHash());
})();

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
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  }

  document.addEventListener("keydown", (e) => {
    if (document.body.classList.contains("editing")) {
      if (e.key === "Escape") toggleEdit(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
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
    }
  });

  /* Click: right 2/3 advances, left 1/3 goes back */
  stage.addEventListener("click", (e) => {
    if (document.body.classList.contains("editing")) return;
    if (e.target.closest("a, button")) return;
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

  /* === START === */
  current = 0;
  slides[0].classList.add("active");
  go(fromHash());
})();

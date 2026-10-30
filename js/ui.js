/* =========================================================
   Shared UI polish — runs on every page.
   Preloader, scroll progress, heading sheen, eased anchors,
   ornament parallax, dress-code swatches.
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ----------
     The display fonts are the whole look, so hold the curtain until they
     are ready — but never for long, and never if something goes wrong. */
  const loader = $("#loader");
  if (loader) {
    const lift = () => {
      if (loader.dataset.done) return;
      loader.dataset.done = "1";
      loader.classList.add("gone");
      document.documentElement.classList.add("fonts-ready");
      setTimeout(() => loader.remove(), 900);
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, 2200))]).then(lift).catch(lift);
    // belt and braces: never leave the curtain down
    setTimeout(lift, 4000);
  }

  /* ---------- Scroll progress ---------- */
  const bar = $("#progress");
  if (bar) {
    let queued = false;
    const draw = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      queued = false;
    };
    addEventListener("scroll", () => {
      if (!queued) { queued = true; requestAnimationFrame(draw); }
    }, { passive: true });
    addEventListener("resize", draw, { passive: true });
    draw();
  }

  /* ---------- Gold sheen across a heading as it arrives ---------- */
  if (!reduced) {
    const heads = $$(".sec-head h2, .cer-title, .footer-names");
    if (heads.length) {
      const sheen = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("sheen");
          sheen.unobserve(e.target);
        });
      }, { threshold: 0.6 });
      heads.forEach((h) => sheen.observe(h));
    }
  }

  /* ---------- Eased anchor scrolling ----------
     Native smooth scroll lands hard; this settles into the section. */
  if (!reduced) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const start = scrollY;
      const end = target.getBoundingClientRect().top + start;
      const dist = end - start;
      const dur = Math.min(1100, Math.max(450, Math.abs(dist) * 0.5));
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      let t0 = null;
      const step = (ts) => {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        scrollTo(0, start + dist * ease(p));
        if (p < 1) requestAnimationFrame(step);
        else history.replaceState(null, "", `#${id}`);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Ornament parallax ----------
     The big mandalas drift against the scroll; cheap, transform-only. */
  if (!reduced) {
    const floaters = $$(".deep-art, .hero-mandala, .bm-lotus");
    if (floaters.length) {
      let queued = false;
      const shift = () => {
        floaters.forEach((el) => {
          const host = el.closest("section, footer, .blessing-medallion") || el;
          const r = host.getBoundingClientRect();
          if (r.bottom < -200 || r.top > innerHeight + 200) return;
          const mid = r.top + r.height / 2 - innerHeight / 2;
          el.style.setProperty("--drift", `${(mid / innerHeight) * -34}px`);
        });
        queued = false;
      };
      addEventListener("scroll", () => {
        if (!queued) { queued = true; requestAnimationFrame(shift); }
      }, { passive: true });
      shift();
    }
  }

  /* ---------- Dress-code swatches ----------
     <li data-colors="#a,#b"> renders the palette next to the words, so the
     code reads at a glance instead of being decoded. */
  $$("[data-colors]").forEach((el) => {
    const colors = el.dataset.colors.split(",").map((c) => c.trim()).filter(Boolean);
    if (!colors.length) return;
    const wrap = document.createElement("span");
    wrap.className = "swatches";
    wrap.setAttribute("aria-hidden", "true");
    colors.slice(0, 5).forEach((c) => {
      const dot = document.createElement("i");
      dot.style.background = c;
      wrap.appendChild(dot);
    });
    el.appendChild(wrap);
  });
})();

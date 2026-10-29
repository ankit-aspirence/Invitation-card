/* =========================================================
   Ceremony detail pages — reveal, guest name, link plumbing
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Guest name, carried across pages via ?to= ---------- */
  const params = new URLSearchParams(location.search);
  const to = (params.get("to") || "").trim().slice(0, 40);
  if (to) {
    $$(".guest-name").forEach((el) => (el.textContent = to));
    // keep the personalisation alive on every internal hop
    $$('a[href]').forEach((a) => {
      const url = new URL(a.getAttribute("href"), location.href);
      if (url.origin !== location.origin) return;
      if (url.searchParams.has("to")) return;
      url.searchParams.set("to", to);
      a.setAttribute("href", url.pathname + url.search + url.hash);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  $$(".reveal").forEach((el, i) => {
    const sibs = $$(":scope > .reveal", el.parentElement);
    el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 8) * 0.09}s`;
    io.observe(el);
  });

  /* ---------- Falling petals ---------- */
  const cv = $("#petals");
  if (cv && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = cv.getContext("2d");
    const colors = ["#f4e3b2", "#c9a24a", "#e8a0a8", "#c4566a", "#fff3d6"];
    let W, H;
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize();
    addEventListener("resize", resize);
    const count = innerWidth < 600 ? 12 : 22;
    const make = (top) => ({
      x: Math.random() * W, y: top ? -20 : Math.random() * H,
      r: 4 + Math.random() * 6, vy: 0.4 + Math.random() * 0.9, vx: -0.3 + Math.random() * 0.6,
      a: Math.random() * Math.PI * 2, va: -0.02 + Math.random() * 0.04, sway: Math.random() * 100,
      c: colors[(Math.random() * colors.length) | 0], o: 0.3 + Math.random() * 0.35,
    });
    const petals = Array.from({ length: count }, () => make(false));
    (function loop(t) {
      ctx.clearRect(0, 0, W, H);
      petals.forEach((p, i) => {
        p.y += p.vy; p.x += p.vx + Math.sin(t / 1000 + p.sway) * 0.4; p.a += p.va;
        if (p.y > H + 20) petals[i] = make(true);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = p.o; ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
      requestAnimationFrame(loop);
    })(0);
  }
})();

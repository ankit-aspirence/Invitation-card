/* =========================================================
   Signature of Love — Interactions
   ========================================================= */
(() => {
  "use strict";

  const CONFIG = {
    couple: "Darshan & Dharal",
    weddingISO: "2026-12-24T18:00:00+05:30",
    durationHours: 4,
    venue: "The Grand Mandap, The Oberoi Udaivilas, Udaipur",
    whatsapp: "919999999999", // TODO: replace with the family's WhatsApp number
    email: "celebrate@myshaadhilink.in",
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Guest name from ?to= ---------- */
  const params = new URLSearchParams(location.search);
  const guest = (params.get("to") || "Guest").trim().slice(0, 40);
  $$(".guest-name").forEach((el) => (el.textContent = guest));

  // carry ?to= onto the per-event pages so the greeting survives navigation
  if (params.get("to")) {
    const q = `?to=${encodeURIComponent(guest)}`;
    $$('.event a[href$=".html"]').forEach((a) => {
      const href = a.getAttribute("href");
      if (!href.includes("?")) a.setAttribute("href", href + q);
    });
  }

  /* ---------- Envelope open ---------- */
  const intro = $("#intro");
  const envelope = $("#envelope");
  const audio = $("#bgm");
  const musicBtn = $("#musicBtn");
  let opened = false;

  function openInvite() {
    if (opened) return;
    opened = true;
    envelope.classList.add("open");
    playMusic();
    setTimeout(() => {
      intro.classList.add("gone");
      document.body.classList.remove("locked");
      document.body.classList.add("opened");
      revealHero();
      startPetals();
    }, 1900);
  }
  envelope.addEventListener("click", openInvite);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInvite(); }
  });

  /* ---------- Music ---------- */
  function setMusicUI(on) {
    musicBtn.classList.toggle("playing", on);
    $(".music-label", musicBtn).textContent = on ? "Sound On" : "Sound Off";
  }
  function playMusic() {
    audio.volume = 0.6;
    audio.play().then(() => setMusicUI(true)).catch(() => setMusicUI(false));
  }
  musicBtn.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else { audio.pause(); setMusicUI(false); }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) { audio.pause(); audio.dataset.resume = "1"; }
    else if (!document.hidden && audio.dataset.resume) { delete audio.dataset.resume; playMusic(); }
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  $$(".reveal").forEach((el) => {
    const sibs = $$(":scope > .reveal", el.parentElement);
    el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 8) * 0.1}s`;
    if (!el.closest(".hero")) io.observe(el);
  });
  function revealHero() { $$(".hero .reveal").forEach((el) => el.classList.add("in")); }

  /* ---------- Section dots ---------- */
  const dotsNav = $("#dots");
  const sections = $$("main > section, main > footer");
  sections.forEach((s) => {
    const a = document.createElement("a");
    a.href = `#${s.id}`;
    a.dataset.label = s.dataset.label || s.id;
    a.setAttribute("aria-label", a.dataset.label);
    dotsNav.appendChild(a);
  });
  const dotIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        $$("a", dotsNav).forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach((s) => dotIO.observe(s));

  /* ---------- Countdown ---------- */
  const target = new Date(CONFIG.weddingISO).getTime();
  const units = { d: $('[data-u="d"]'), h: $('[data-u="h"]'), m: $('[data-u="m"]'), s: $('[data-u="s"]') };
  const pad = (n) => String(n).padStart(2, "0");
  let timerId = null;
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(units).forEach((u) => (u.textContent = "00"));
      $("#timerDone").hidden = false;
      if (timerId) clearInterval(timerId);
      return;
    }
    units.d.textContent = pad(Math.floor(diff / 864e5));
    units.h.textContent = pad(Math.floor((diff / 36e5) % 24));
    units.m.textContent = pad(Math.floor((diff / 6e4) % 60));
    units.s.textContent = pad(Math.floor((diff / 1e3) % 60));
  }
  tick();
  timerId = setInterval(tick, 1000);

  /* ---------- Calendar ---------- */
  const start = new Date(target);
  const end = new Date(target + CONFIG.durationHours * 36e5);
  const calFmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const title = `Wedding of ${CONFIG.couple}`;
  const details = "With the divine blessings of our beloved elders, we invite you to share our joy.";
  $("#gcalBtn").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}&dates=${calFmt(start)}/${calFmt(end)}` +
    `&details=${encodeURIComponent(details)}&location=${encodeURIComponent(CONFIG.venue)}`;

  $("#icsBtn").addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SignatureOfLove//EN", "BEGIN:VEVENT",
      `UID:${Date.now()}@signature-of-love`, `DTSTAMP:${calFmt(new Date())}`,
      `DTSTART:${calFmt(start)}`, `DTEND:${calFmt(end)}`,
      `SUMMARY:${title}`, `DESCRIPTION:${details}`, `LOCATION:${CONFIG.venue.replace(/,/g, "\\,")}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "darshan-dharal-wedding.ics" });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* ---------- Couple photo slots ----------
     The arches are ornamental until a real <img> is dropped in; the flag is
     only needed by the :has() fallback for older browsers. */
  $$(".arch").forEach((el) => el.classList.toggle("has-photo", !!$("img", el)));

  /* ---------- Watch ----------
     Stays an ornamental poster until the frame is given either a YouTube id
     (data-id) or a local file (data-src). */
  const vf = $("#videoFrame");
  const ytId = vf.dataset.id?.trim();
  const fileSrc = vf.dataset.src?.trim();

  if (!ytId && !fileSrc) {
    vf.classList.add("no-video");
  } else {
    vf.addEventListener("click", () => {
      if ($("iframe", vf) || $("video", vf)) return;
      if (!audio.paused) { audio.pause(); setMusicUI(false); }
      vf.innerHTML = fileSrc
        ? `<video src="${encodeURI(fileSrc)}" controls autoplay playsinline
             title="A Special Glimpse"></video>`
        : `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(ytId)}?autoplay=1&rel=0"
             title="A Special Glimpse" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  /* ---------- RSVP ---------- */
  const form = $("#rsvpForm");
  const msg = $("#formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const via = (e.submitter && e.submitter.dataset.via) || "whatsapp";
    const data = Object.fromEntries(new FormData(form));
    const nameField = $("#rName").parentElement;
    if (!data.name.trim()) {
      nameField.classList.add("error");
      msg.textContent = "Please tell us your name 🙏";
      $("#rName").focus();
      return;
    }
    nameField.classList.remove("error");
    const text =
      `🌸 Wedding RSVP — ${CONFIG.couple} 🌸\n\n` +
      `Name: ${data.name.trim()}\n` +
      (data.phone ? `Phone: ${data.phone}\n` : "") +
      `Response: ${data.attend}\n` +
      `Guests: ${data.guests}\n` +
      (data.message ? `Blessings: ${data.message.trim()}\n` : "");
    if (via === "email") {
      location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Wedding RSVP: " + CONFIG.couple)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
    msg.textContent = data.attend.startsWith("Joyfully")
      ? `Thank you, ${data.name.trim()}! We can't wait to celebrate with you 💛`
      : `Thank you, ${data.name.trim()}. You'll be missed — your blessings mean the world 💛`;
  });

  /* ---------- Share ---------- */
  const shareBtn = $("#shareBtn");
  shareBtn.addEventListener("click", async () => {
    const shareData = { title: `${CONFIG.couple} · Wedding Invitation`, text: "You're invited to our wedding! 💍", url: location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(location.href);
        shareBtn.textContent = "Link Copied ✓";
        setTimeout(() => (shareBtn.textContent = "Share Invitation"), 2200);
      }
    } catch (_) { /* user cancelled */ }
  });

  /* ---------- Falling petals ---------- */
  function startPetals() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("#petals");
    const ctx = cv.getContext("2d");
    const colors = ["#f4e3b2", "#c9a24a", "#e8a0a8", "#c4566a", "#fff3d6"];
    let W, H;
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize();
    addEventListener("resize", resize);
    const count = innerWidth < 600 ? 16 : 30;
    const make = (top) => ({
      x: Math.random() * W, y: top ? -20 : Math.random() * H,
      r: 4 + Math.random() * 6, vy: 0.4 + Math.random() * 0.9, vx: -0.3 + Math.random() * 0.6,
      a: Math.random() * Math.PI * 2, va: -0.02 + Math.random() * 0.04, sway: Math.random() * 100,
      c: colors[(Math.random() * colors.length) | 0], o: 0.4 + Math.random() * 0.4,
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

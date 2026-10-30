/* =========================================================
   Shared SVG sprite — every ornament and icon on the site.
   Injected at the top of <body> so <use href="#id"> resolves
   on every page from one source of truth.
   ========================================================= */
(() => {
  "use strict";

  const SPRITE = `
<svg class="sprite" aria-hidden="true" focusable="false"><defs>

  <symbol id="i-filigree" viewBox="0 0 120 120">
    <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
      <path d="M2 2c30 4 52 22 60 58"/>
      <path d="M2 2c22 2 38 16 44 42" opacity=".7"/>
      <path d="M2 24c26 6 40 24 42 54" opacity=".5"/>
      <path d="M24 2c6 26 24 40 54 42" opacity=".5"/>
      <path d="M8 46c14-2 22 6 22 20M46 8c-2 14 6 22 20 22" opacity=".6"/>
      <circle cx="62" cy="62" r="2.5" fill="currentColor" stroke="none"/>
      <circle cx="30" cy="30" r="1.6" fill="currentColor" stroke="none" opacity=".8"/>
    </g>
  </symbol>

  <symbol id="i-mandala" viewBox="0 0 200 200">
    <g fill="none" stroke="currentColor" stroke-width="1">
      <circle cx="100" cy="100" r="94" opacity=".55"/>
      <circle cx="100" cy="100" r="86" opacity=".9"/>
      <circle cx="100" cy="100" r="62" opacity=".4" stroke-dasharray="2 6"/>
      <g opacity=".85">
        <path d="M100 14c8 18 8 30 0 44-8-14-8-26 0-44Z"/>
        <path d="M100 186c8-18 8-30 0-44-8 14-8 26 0 44Z"/>
        <path d="M14 100c18 8 30 8 44 0-14-8-26-8-44 0Z"/>
        <path d="M186 100c-18 8-30 8-44 0 14-8 26-8 44 0Z"/>
      </g>
      <g opacity=".6">
        <path d="M39 39c16 6 24 14 30 30-16-6-24-14-30-30Z"/>
        <path d="M161 39c-16 6-24 14-30 30 16-6 24-14 30-30Z"/>
        <path d="M39 161c16-6 24-14 30-30-16 6-24 14-30 30Z"/>
        <path d="M161 161c-16-6-24-14-30-30 16 6 24 14 30 30Z"/>
      </g>
    </g>
  </symbol>

  <!-- lotus mandala: the blessing medallion, 16 petals in two rings -->
  <symbol id="i-lotus" viewBox="0 0 200 200">
    <g fill="none" stroke="currentColor" stroke-linecap="round">
      <g stroke-width="1" opacity=".9">
        <circle cx="100" cy="100" r="96" opacity=".4"/>
        <circle cx="100" cy="100" r="90"/>
        <circle cx="100" cy="100" r="40" opacity=".5"/>
        <circle cx="100" cy="100" r="34" opacity=".3" stroke-dasharray="1.5 5"/>
      </g>
      <g stroke-width="1.1" opacity=".85">
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(45 100 100)"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(90 100 100)"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(135 100 100)"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(180 100 100)"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(225 100 100)"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(270 100 100)"/>
        <path d="M100 44c11 14 11 28 0 42-11-14-11-28 0-42Z" transform="rotate(315 100 100)"/>
      </g>
      <g stroke-width=".9" opacity=".55">
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(22.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(67.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(112.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(157.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(202.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(247.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(292.5 100 100)"/>
        <path d="M100 12c9 18 9 34 0 48-9-14-9-30 0-48Z" transform="rotate(337.5 100 100)"/>
      </g>
    </g>
  </symbol>

  <!-- diya / oil lamp, for the blessing rail -->
  <symbol id="i-diya" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 30c0 5 7 8 16 8s16-3 16-8Z"/>
      <path d="M8 30c4-2 10-3 16-3s12 1 16 3" opacity=".6"/>
      <path d="M24 26c-3-4-2-8 0-11 2 3 3 7 0 11Z"/>
      <path d="M24 15c-1-3 0-5 0-5s1 2 0 5Z" opacity=".7"/>
    </g>
  </symbol>

  <symbol id="i-paisley" viewBox="0 0 100 120">
    <g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
      <path d="M50 8c26 10 38 34 30 58-7 22-30 34-48 26C14 84 8 64 16 48 22 34 36 28 48 34c10 5 14 17 9 26-4 7-13 10-19 6"/>
      <path d="M44 62c4-6 12-6 15 1" opacity=".7"/>
      <circle cx="50" cy="96" r="2" fill="currentColor" stroke="none" opacity=".8"/>
    </g>
  </symbol>

  <symbol id="i-flourish" viewBox="0 0 240 24">
    <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
      <path d="M4 12h70" opacity=".5"/>
      <path d="M236 12h-70" opacity=".5"/>
      <path d="M88 12c8-8 18-8 24 0-6 8-16 8-24 0Z"/>
      <path d="M152 12c-8-8-18-8-24 0 6 8 16 8 24 0Z"/>
      <circle cx="120" cy="12" r="3.5"/>
      <circle cx="120" cy="12" r="1.2" fill="currentColor" stroke="none"/>
    </g>
  </symbol>

  <!-- ceremony icons -->
  <symbol id="i-haldi" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 38c0-10 6-18 15-20-1 11-7 18-15 20Z"/>
      <path d="M24 38c0-10-6-18-15-20 1 11 7 18 15 20Z"/>
      <path d="M24 38V22"/>
      <path d="M24 22c-4-4-4-9 0-13 4 4 4 9 0 13Z"/>
    </g>
  </symbol>
  <symbol id="i-mehendi" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 42V26c0-2-3-2-3 0v4M19 26V14c0-2 3-2 3 0v10M25 26V12c0-2 3-2 3 0v12M31 28V18c0-2 3-2 3 0v16c0 5-4 8-9 8h-9"/>
      <circle cx="24" cy="32" r="2.5" opacity=".8"/>
      <path d="M24 24v3M20 32h-1M29 32h-1" opacity=".6"/>
    </g>
  </symbol>
  <symbol id="i-wedding" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 42V20c0-7 7-12 16-12s16 5 16 12v22"/>
      <path d="M8 20h32"/>
      <path d="M24 42V28c0-4 4-6 4-6" opacity=".6"/>
      <path d="M24 42V28c0-4-4-6-4-6" opacity=".6"/>
      <path d="M24 8V3"/>
      <circle cx="24" cy="34" r="3"/>
    </g>
  </symbol>
  <symbol id="i-reception" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 8h10l-2 13a3 3 0 0 1-6 0L13 8Z"/>
      <path d="M18 24v14M14 40h8"/>
      <path d="M25 8h10l-2 13a3 3 0 0 1-6 0L25 8Z"/>
      <path d="M30 24v14M26 40h8"/>
    </g>
  </symbol>

  <!-- utility -->
  <symbol id="i-photo" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <rect x="7" y="12" width="34" height="26" rx="3"/>
      <path d="M17 12l3-4h8l3 4"/>
      <circle cx="24" cy="25" r="7"/>
      <circle cx="24" cy="25" r="2.5" opacity=".5"/>
    </g>
  </symbol>
  <symbol id="i-play" viewBox="0 0 48 48"><path d="M19 14l16 10-16 10V14Z" fill="currentColor"/></symbol>
  <symbol id="i-pin" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 42s13-12 13-23A13 13 0 0 0 11 19c0 11 13 23 13 23Z"/>
      <circle cx="24" cy="19" r="5"/>
    </g>
  </symbol>
  <symbol id="i-clock" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="17"/><path d="M24 13v11l7 5"/>
    </g>
  </symbol>
  <symbol id="i-calendar" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="11" width="32" height="29" rx="3"/>
      <path d="M8 20h32M17 7v8M31 7v8"/>
      <circle cx="18" cy="28" r="1.6" fill="currentColor" stroke="none"/>
      <circle cx="24" cy="28" r="1.6" fill="currentColor" stroke="none"/>
      <circle cx="30" cy="28" r="1.6" fill="currentColor" stroke="none"/>
    </g>
  </symbol>
  <symbol id="i-dress" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 7l5 5 5-5"/>
      <path d="M19 7l-3 8 8 5 8-5-3-8"/>
      <path d="M24 20l-9 15c-1 2 0 5 3 5h12c3 0 4-3 3-5l-9-15Z"/>
    </g>
  </symbol>
  <symbol id="i-arrow" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 24h28M27 13l11 11-11 11"/>
    </g>
  </symbol>

  <!-- travel -->
  <symbol id="i-plane" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 27l36-12-5 13-9 3-6 8-3-7-13-5Z"/>
      <path d="M19 31l9-9" opacity=".65"/>
    </g>
  </symbol>
  <symbol id="i-hotel" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 41V11a2 2 0 0 1 2-2h17a2 2 0 0 1 2 2v30"/>
      <path d="M30 20h7a2 2 0 0 1 2 2v19M5 41h38"/>
      <path d="M15 16h3M22 16h3M15 23h3M22 23h3M15 30h3M22 30h3" opacity=".75"/>
      <path d="M34 27h2M34 33h2" opacity=".6"/>
    </g>
  </symbol>
  <symbol id="i-car" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 32v-6l4-10a3 3 0 0 1 3-2h20a3 3 0 0 1 3 2l4 10v6"/>
      <path d="M7 26h34"/>
      <path d="M7 32h7v4H7zM34 32h7v4h-7z"/>
      <circle cx="15" cy="26" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="33" cy="26" r="1.4" fill="currentColor" stroke="none"/>
    </g>
  </symbol>
  <symbol id="i-ring" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="30" r="11"/>
      <path d="M18 14h12l-6 5-6-5Z"/>
      <path d="M18 14l6 5 6-5" opacity=".6"/>
    </g>
  </symbol>

</defs></svg>`;

  const mount = () => {
    if (document.querySelector("svg.sprite")) return;
    document.body.insertAdjacentHTML("afterbegin", SPRITE);
  };

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount, { once: true });
})();

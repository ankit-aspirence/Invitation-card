# Invitation-card

Designed with a luxurious blend of romantic visuals, timeless typography, graceful animations, and rich wedding traditions, this website brings every special moment to life. Explore the couple's love story, wedding ceremonies, cherished memories, event details, and RSVP — all in one beautifully crafted digital experience.

**Template:** Signature of Love · **Demo couple:** Darshan &amp; Dharal · 24 December 2026, The Oberoi Udaivilas, Udaipur

---

## Running it

Static site — no build step, no dependencies. Serve the folder over HTTP:

```bash
python -m http.server 8080        # then open http://127.0.0.1:8080
```

Opening `index.html` straight off the disk mostly works, but a few things
(the Google Maps embeds, the film) behave better over HTTP.

## Pages

| File | What it is |
|---|---|
| `index.html` | The invitation — envelope intro, blessing, couple, ceremonies, countdown, film, venue, live stream, RSVP |
| `haldi.html` | Ceremony I — Haldi |
| `mehendi.html` | Ceremony II — Mehendi &amp; Sangeet |
| `wedding.html` | The main event |
| `grand-reception.html` | Ceremony IV — Reception |

Each ceremony page shares `css/style.css` and adds `css/ceremony.css`.

## Layout

```
index.html, haldi.html, mehendi.html, wedding.html, grand-reception.html
css/
  style.css       design tokens, shared components, the invitation itself
  ceremony.css    the four ceremony pages
js/
  sprite.js       every icon and ornament, injected into <body> on load
  main.js         invitation: envelope, music, countdown, RSVP, petals
  ceremony.js     ceremony pages: reveal, ?to= plumbing, petals
assets/
  audio/          background music
  video/          the invitation film
  images/         film poster + a note on where photos go
```

There are **no photographs of people** in this build. Every frame, arch and
medallion is drawn with inline SVG and CSS, so the site looks finished with no
image assets at all. `assets/images/README.txt` explains where to drop the
couple's own pictures when they arrive.

## Personalising a guest's link

Append `?to=` and the site greets them by name. It carries across every page.

```
https://your-domain/?to=Priya%20%26%20Family
```

## Things to change before this is a real invitation

| Where | What |
|---|---|
| `js/main.js` → `CONFIG.whatsapp` | Placeholder number `919999999999`. RSVPs go here. |
| `js/main.js` → `CONFIG.email` | RSVP fallback address |
| `js/main.js` → `CONFIG.weddingISO` | Drives the countdown and the calendar files |
| `assets/video/invitation-film.mp4` | Carries a **different wedding's** dates (Nov 2028, Pune). Replace it. |
| `assets/audio/kudmayi.mp3` | Commercial track — needs a licence or a replacement |
| All five pages | Names, parents, dates, venues, dress codes, `#hashtag` |

### Swapping the film

The frame reads two attributes on `#videoFrame` in `index.html`:

```html
<div class="video-frame portrait" id="videoFrame"
     data-src="assets/video/invitation-film.mp4"  <!-- a local file -->
     data-id="">                                   <!-- or a YouTube id -->
```

Set one, leave the other empty. Empty both and it falls back to an ornamental
poster. A vertical film wants the `portrait` class; drop it for 16:9.

The poster still lives at `assets/images/film-poster.jpg` — replace it when you
replace the film.

## Deploying

Nothing to build; point any static host at the repo root.

- **GitHub Pages** — Settings → Pages → deploy from `main`, folder `/ (root)`.
  `.nojekyll` is committed so files are served as-is.
- **Vercel** — import the repo; framework preset **Other**, no build command,
  output directory `.`. `vercel.json` only sets long cache headers on `assets/`.

The host must honour HTTP range requests or the film will not seek — every
mainstream host does. Python's `http.server` does not, which is why scrubbing
fails locally.

## Browser support

Modern evergreen browsers. `:has()` drives the photo-slot swap, with a
class-based fallback behind `@supports` for older engines. Honours
`prefers-reduced-motion`.

# Brown Pixels — Website

A Vue 3 + Vite build of the Brown Pixels site.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Before you go live — replace these placeholders

All of these live in **`src/config.js`**:

| What | Where | Current value |
|---|---|---|
| WhatsApp number | `src/config.js` → `whatsappNumber` | placeholder `910000000000` |
| Instagram handle | `src/config.js` → `instagramUrl` | placeholder |
| LinkedIn page | `src/config.js` → `linkedinUrl` | placeholder |
| GitHub org | `src/config.js` → `githubUrl` | placeholder |
| Contact form endpoint | `src/config.js` → `formEndpoint` | placeholder — see below |

## Email setup (contact form → brownpixels.co@gmail.com)

The site is a static frontend, so the contact form uses **Formspree** (a free
form-to-email service) rather than a custom mail server — this is the
simplest reliable way to get form submissions into an inbox without hosting
a backend.

1. Go to [formspree.io](https://formspree.io) and sign up **using
   `brownpixels.co@gmail.com`** as the account email — that's the address
   every submission gets delivered to.
2. Create a new form. Formspree gives you an endpoint like
   `https://formspree.io/f/abcdwxyz`.
3. Paste that into `src/config.js`:
   ```js
   formEndpoint: 'https://formspree.io/f/abcdwxyz'
   ```
4. Submit the form once from the live site — Formspree sends a one-time
   confirmation link to verify the form. After that, every submission
   emails straight to brownpixels.co@gmail.com automatically.

Free tier covers 50 submissions/month, which is generally enough for a
studio contact form; upgrade if volume grows.

**Alternative:** if you'd rather run your own mail server (e.g. Nodemailer
+ Gmail app password on a small backend), that's possible too, but needs a
server to host it — happy to build that instead if you'd prefer it over
Formspree.

## Fonts used

The site does **not** attempt to recreate your logo's wordmark as live
type — it uses free Google Fonts chosen to sit well with it:

- **Space Grotesk** (weights 500/600/700) — all headings and display type.
  A geometric, evenly-spaced grotesk that reads close to the energy of the
  logo's bold uppercase wordmark.
- **Inter** (400/500/600) — body copy, nav, buttons.
- **IBM Plex Mono** (400/500) — small technical labels (eyebrows, tags,
  the capability marquee).

All three load via Google Fonts inside `src/assets/main.css` — no local
font files needed.

## Brand colors in use

Pulled directly from the logo system sheet you provided:

- Bronze `#C7926A` — primary accent
- Charcoal `#0B0B0C` — background
- Dark Gray `#1A1A1F` — secondary surface tone
- Cream `#F7F5EF` — primary text

## Logo assets

Copied into `public/assets/`:
- `logo-icon.png` — used in the nav, the hero panel, and the favicon
- `logo-horizontal.png` — used in the footer

The full logo system sheet you sent is kept at
`public/assets/logo-sheet-reference.png` for reference; it isn't rendered
anywhere on the site.

## Structure

```
src/
  components/     one file per section (Nav, Hero, WhatWeBuild, FeaturedWork, OurClients, ...)
  data/           content as plain arrays — edit these to change copy without touching components
  config.js       contact details + form endpoint
  assets/main.css design tokens + global styles
```

To add a **real project** to "Featured Work," edit `src/data/projects.js`.
To add a **real client**, edit `src/data/clients.js` — move it from
`placeholderClients` into `realClients` with a real `url`.

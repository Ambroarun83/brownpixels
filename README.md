# Brown Pixels — Vue 3 + Vite

An interaction-led website for **Brown Pixels** — digital products, software, AI and digital growth.
Vue 3 + Vite, no CSS framework, no animation library, no backend.

**Palette:** taken straight off the brand mark — deep navy `#0a162c`, electric blue `#0069fe` and
ember `#f3610d`. A cinematic navy hero opens into a bright cool-paper site with navy type; electric
blue is the primary accent and ember is the spark. Two navy bands (AI & automation, footer)
punctuate the page.

## Run it

```bash
cd brown-pixels-vue
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # preview the production build
```

> `node_modules/` isn't part of the saved workspace, so run `npm install` first on a fresh machine.

## What's in the box

```
src/
├── main.js                     hydrated Vue app + global v-reveal directive
├── siteApp.js                  shared client/server app factory
├── App.vue                     page composition + service routes and legal hash views
├── servicePages.js             service page content and SEO metadata
├── config.js                   contact details (phone, WhatsApp, email, socials)
├── composables/useReveal.js    scroll-reveal directive + onEnterView helper
├── composables/interactions.js global pointer layer: aura, cursor ring, magnet, tilt
├── composables/splitText.js    splits headings into per-word spans for the reveal
├── styles/
│   ├── fonts.css               @font-face (self-hosted woff2)
│   └── globals.css             tokens, reset, type, button system, .theme-dark + .screen scopes
└── components/
    ├── MarkMosaic.vue          the brand mark sliced into an animatable tile grid
    ├── RobotHead.vue           ⭐ hero mascot: sleek SVG head that looks ahead and tracks the pointer
    ├── HeroSection.vue         full-bleed dark hero (aurora, floor grid, cards, watermark band)
    ├── SiteNav.vue             pill nav → solid glass on scroll, dual logo, WhatsApp shortcut
    ├── CapabilityTicker.vue    seamless marquee (pauses on hover)
    ├── ServicesExplorer.vue    interactive capability explorer + live abstract previews
    ├── ProgressionChain.vue    Idea → Design → Software → System → Growth
    ├── AiLab.vue               ⭐ AI & automation: build-by-area explorer + interactive pipeline
    ├── AiTechSection.vue       typing "stack" terminal + decorative orbit
    ├── DigitalPresence.vue     Google Business + marketing support
    ├── ApproachTimeline.vue    scroll-driven step timeline with live node
    ├── WorkShowcase.vue        real projects, parallax + hover reveal
    ├── AudienceGrid.vue        cursor-tracked spotlight cells
    ├── AboutStatement.vue      word-by-word manifesto reveal
    ├── FaqSection.vue          visible FAQs for visitors and search engines
    ├── ContactSection.vue      validated enquiry form (WhatsApp-first)
    ├── ServicePage.vue         server-rendered service page template
    ├── SiteFooter.vue
    ├── LegalView.vue           privacy + terms documents
    └── AppIcon.vue             24×24 inline SVG icon set
public/
├── robots.txt                  search and AI crawler access rules
├── llms.txt                    AI-readable site and content guide
├── ai/                         summary, FAQ and service discovery JSON
├── .well-known/ai.txt          AI discovery endpoint index
├── feed.xml                    RSS feed
└── sitemap.xml                canonical homepage and service page sitemap
├── fonts/                      Inter Tight, Inter, Instrument Serif italic, JetBrains Mono
└── img/                        logo lockup, mark, favicons, og-image, project screenshots
```

`npm run build` builds the client bundle, then server-renders the homepage and each service page into
static HTML. The content and route-specific metadata are readable to crawlers before JavaScript runs;
the Vue app mounts normally for browser interactions after the page loads. The build writes
`dist/website-development/index.html`, `dist/business-software/index.html`,
`dist/ai-solutions/index.html` and `dist/digital-marketing/index.html`, so direct visits and refreshes
work on static hosts that serve directory index files. No SPA rewrite is required for these routes.
The build stamps structured-data
`dateModified`, sitemap `lastmod` and the RSS feed's build date.

## Contact details — `src/config.js`

Already filled in with the details you supplied:

```js
export const CONFIG = {
  whatsapp: '917502263833',                // digits only, country code first
  phone:    '917502263833',
  email:    'brownpixels.co@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/brownpixels.in/',
    linkedin:  '',
    github:    '',
    whatsapp:  'https://wa.me/917502263833'
  }
}
```

They drive the nav WhatsApp button, the floating WhatsApp shortcut, the direct-contact rows in the
contact section, the footer, the form handoff and the JSON-LD in `index.html`.

Any channel left empty is rendered as a muted, non-clickable placeholder — the site never invents a
number or a profile URL on your behalf. Add your Instagram / LinkedIn / GitHub URLs and the footer
icons light up automatically.

## ⚠️ Before going live

**Domain + metadata — `index.html`**

`canonical` and `og:url` point at `https://brownpixels.in/`. Confirm that this remains the preferred
domain before publishing. Confirm the title and description, then review `#privacy` / `#terms` with
an advisor.

## How the enquiry form works

No backend: it validates, composes a structured message, then opens **WhatsApp** pre-filled (or your
mail app if the visitor picks Email). The confirmation panel shows the full message, a copy button
and a manual link in case the browser blocks the tab.

To post to a real endpoint instead, keep the component and swap the body of `submit()` in
`ContactSection.vue` for a `fetch()` — validation, loading, success and error states already exist.

## Content integrity

Same rules as the brief, and the reason some stock-agency staples are missing:

- **No invented numbers, client logos, testimonials or results.** The hero cards show real counts
  (5 capability areas, 3 live projects); the Work section links the three real projects.
- The "avatar" dots are brand tints, not people. The footer band lists our own services, not
  partner logos.
- Technology copy states flexibility rather than claiming expertise in every stack.
- Google Business / marketing carry the explicit no-guarantee note.
- `privacy.html` / `terms.html` are honest templates routed in-app as `#privacy` / `#terms` — have
  them reviewed before publishing.

## Design + motion

| | |
|---|---|
| Paper | `#f6f8fc` cool paper, `#eef2f9` banded sections |
| Ink | navy `#0a162c` on paper, `#eaf1ff` in dark bands |
| Accent (graphic) | electric blue `#0069fe` → `#4d9bff` |
| Accent (text) | deeper blue `#0047c4` — 11–13px labels need the extra weight to clear AA |
| Spark | ember `#f3610d` → amber `#ffa23a` — used sparingly, exactly as in the mark |
| Display | Inter Tight · body Inter · accent **Instrument Serif italic** · labels JetBrains Mono |

Two token families keep this honest: `--blue`/`--blue-lit` are for graphics, gradients and large
type; `--copper` (aliased to a deeper blue) is what text uses. Swapping one never breaks the other.

Two scopes do the heavy lifting: `.theme-dark` flips a whole section (hero, AI band, footer, the nav
while it's transparent over the hero) to the dark palette, and `.screen` keeps device mockups dark on
purpose. Because both only redefine tokens, every component works in either.

Interactive, all hand-rolled.

*Hero mascot* (`RobotHead.vue`) — a sleek rounded head with a wide dark visor that **rests looking
straight ahead and follows your pointer**. Inline SVG plus CSS custom properties, driven by one rAF
loop that writes three numbers per frame (`--lx`, `--ly`, `--near`):

- the whole head turns in 3D toward the pointer; the eyes lead it slightly so the gaze lands first
- the ember antenna counter-rotates, the halo brightens as you get close, the status pixels blip
- it blinks on its own every 3.5–6s, and widens its eyes (`is-alert`) when you click
- with no pointer — touch, or reduced motion — it rests facing forward with a slow autonomous drift
- the loop pauses off-screen (IntersectionObserver) and on hidden tabs. There is **no canvas**.

*Whole page* — one pointer listener drives three effects:

- `.aura` — a small trailing blue light that follows the cursor across every section
- `.cursor` — a lagging pixel-square ring (fine pointers only) that grows over links and hides the
  native cursor
- magnet — `.btn` and anything with `data-magnet` lean toward the pointer; `data-tilt` cards tip in
  3D with a cursor-tracked glow

Plus: aurora + perspective floor grid; cursor parallax; scroll progress bar; scroll-reveal;
**word-by-word heading reveals** (`splitText.js` splits `h2.display` into spans, preserving `<em>`
and `<br>`); auto-advancing capability explorer with live previews; the AI area explorer and
interactive trigger → AI step → action pipeline; typing terminal; scroll-driven approach timeline;
image parallax and mask reveals; seamless ticker.

Everything respects `prefers-reduced-motion` (the robot faces forward and nothing drifts), the hero
stops animating entirely once it scrolls off-screen, and DPR is capped at 2.

## Mobile performance

A phone pays disproportionately for blur, big animated gradients and continuous decorative motion, so
under 860px the site drops the expensive parts and keeps the look:

- `backdrop-filter` is switched off (the tinted solid backgrounds underneath are already there)
- under 1120px the hero drops the IDEA→GROWTH chain and the cursor hint, keeping just the robot —
  a phone shouldn't have to scroll two screens to reach the work
- the hero aurora keeps its gradients but loses its blur + drift; the floor grid, chart bars, pulses
  and orbit rings stop animating
- image parallax doesn't run; the Work screenshots are served from a 560/900/1200/1440 `srcset`, so a
  phone never downloads the desktop originals
- the approach timeline only measures while it's on screen, and its step list is cached instead of
  being re-queried every frame

Measured on a 390px viewport with 4× CPU throttling: **60 fps on the hero and 60 fps while
scrolling, with zero frames over 33 ms** (before this pass: 34 fps and 38 fps with 19 long frames).
Mobile page weight is ~370 KB including three project screenshots; the logo lockups are palette PNGs
(~25 KB at 2×).

`content-visibility: auto` was tried and removed: it saved a few more milliseconds but silently
broke the scroll-reveal observer and skewed page height, which is a much worse trade than 60 fps.

## Intro curtain — `BrandLoader.vue`

The page opens with a brand reveal instead of dumping the visitor straight into the hero:

1. the real brand mark — large, with a blue core glow behind it — is sliced into a 10×10 grid of
   tiles (`MarkMosaic.vue`) that fly in from off-stage and flash as they land, while a scan line
   sweeps it,
2. the wordmark wipes in behind a `clip-path` mask,
3. the tagline rises, and a progress rule + `000%` counter fill while the webfonts load,
4. the whole curtain lifts upward (`transform: translateY(-101%)`) and hands off to the hero, whose
   entrance animation is gated on the same signal — so it reads as one continuous motion.

Practical details:

- **Once per session.** `sessionStorage['bp-intro-seen']` skips it on reloads and in-site navigation.
  Clear that key (or call it from a different tab) to see it again.
- **Never waits on a font.** It resolves on `document.fonts.ready` but has a hard ceiling
  (`HOLD + 800ms`); typical reveal ≈ 1.8s, fully unmounted ≈ 2.9s.
- **Reduced motion** gets a 0.52s static hold and no animation.
- Scroll is locked via `html.is-booting` while it's up, and released on completion.
- Timings live in two constants at the top of the component: `HOLD` (curtain duration) and `WIPE`
  (the lift). To remove it entirely, drop `<BrandLoader @done="onBoot" />` from `App.vue` — the hero
  falls back to revealing itself on mount.

## Section order

The page reads in the same order as the nav pill:

```
hero → work → capability ticker → what we build → more than a website
     → AI & automation (04) → AI & modern technology (05) → digital presence & Google (06)
     → how we build (07) → who we work with (08) → about (09) → start a project (10)
```

Each section carries its number in the corner, and those numbers were re-cut when Work moved up to
second place so they still count down the page in order.

## Performance note — why the hero has no canvas

The previous hero ran a full `<canvas>` particle field (840 nodes at desktop). It measured fine on a
throttled phone but read as *the machine is hanging* on a desktop while the mouse moved. Profiling
the hero layer by layer found three real costs, all now gone:

| Was | Cost | Now |
|---|---|---|
| `.hero__aurora` — viewport-sized layer with `filter: blur(8px)` animating `scale()` | re-rasterised every frame; **15 fps** | static gradient wash + two small promoted blobs that only translate |
| `.aura` — full-viewport gradient repositioned through `--px`/`--py` on `<html>` | repainted the whole viewport **and** invalidated style for every element inheriting the variable | a 460px layer moved with `transform`, written straight onto the element |
| `getBoundingClientRect()` inside the rAF loop and the pointer handler | forced synchronous layout on every frame / every mouse event | rects measured once per target, refreshed on scroll and resize |

Also: the floor grid slides as a composited child instead of animating `background-position`, the
custom cursor dropped `mix-blend-mode: difference`, and every hero animation pauses once the hero
scrolls away.

## Colour note — WhatsApp

WhatsApp surfaces use `--wa: #0f7a3d` (deep enough for white text at AA) for solid buttons — the
floating shortcut and the nav icon — and `--wa-lit: #25d366` for icons sitting on dark grounds
(footer). Change both in `globals.css` if you want a brighter green.

## Responsive pass

- `.sec-head` was a two-column grid at *every* width — on a phone the heading and the lede were
  crammed side by side. It now collapses to one column under 900px.
- Long CTA labels ("Ask what AI could do for your business") punched out of the screen below ~375px;
  buttons now wrap their label under 560px instead of `nowrap`-ing off-canvas.
- The small end of the heading clamp was clipping long words at 320px (e.g. "businesses"); lowered to
  `1.6rem` with `overflow-wrap: break-word` on `.display`.
- The AI pipeline chips were 10px text in a 30px target — now 11px / ~35px tall, comfortable to tap.
- Inline text links (Work "Open live site", footer nav and contact rows) got vertical padding so
  their hit area is thumb-sized.
- Re-verified at 15 widths from 320px to 1440px: no clipped text, no child overflowing its parent,
  no element the page can pan to horizontally, no text under 11px, no tap target under 24px.

## Back to top

Every **Home** entry (nav pill, mobile sheet, footer, and the back link on the legal pages) uses
`src/composables/scrollToTop.js` rather than the browser's fragment scroll — Chrome's native smooth
scroll crawls over 7–8k px and can stall. Ours is a fixed-duration eased scroll (~800 ms max) that
cancels the moment the visitor scrolls, and it temporarily switches off `scroll-behavior: smooth` so
the CSS doesn't fight it.

## Deploy

`npm run build` → upload `dist/` to Vercel, Netlify, GitHub Pages, S3 or any static host (SPA
history isn't required — routing is hash-based).

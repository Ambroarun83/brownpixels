<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import RobotHead from './RobotHead.vue'

const props = defineProps({
  /* the intro curtain holds the entrance until it lifts */
  booted: { type: Boolean, default: false }
})

const hero = ref(null)
const ready = ref(false)
const offscreen = ref(false)

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

const dots = [
  { a: '#0069fe', b: '#7db6ff' },
  { a: '#3d8bff', b: '#a9d0ff' },
  { a: '#f3610d', b: '#ffa23a' },
  { a: '#0f7a3d', b: '#25d366' }
]

const capabilities = [
  { name: 'Websites', icon: 'web' },
  { name: 'Web apps', icon: 'app' },
  { name: 'Business systems', icon: 'layers' },
  { name: 'AI & automation', icon: 'cpu' },
  { name: 'Digital growth', icon: 'growth' }
]

const chain = ['Idea', 'Design', 'Technology', 'Software', 'Growth']

/* gentle parallax on the copy — the rest of the pointing work is
   handled globally by composables/interactions.js */
let raf = 0
function onMove(e) {
  if (raf || reduce || !fine) return
  raf = requestAnimationFrame(() => {
    const el = hero.value
    if (el) {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
    }
    raf = 0
  })
}

let bootTimer = 0
let io = null

onMounted(() => {
  /* nothing in the hero animates while it is off-screen */
  io = new IntersectionObserver(
    ([e]) => (offscreen.value = !e.isIntersecting),
    { rootMargin: '120px' }
  )
  if (hero.value) io.observe(hero.value)
  if (props.booted) requestAnimationFrame(() => (ready.value = true))
  // safety net: never leave the hero hidden if the curtain stalls
  bootTimer = window.setTimeout(() => (ready.value = true), 4200)
  if (fine && !reduce) window.addEventListener('mousemove', onMove, { passive: true })
})

watch(
  () => props.booted,
  (v) => {
    if (v) requestAnimationFrame(() => (ready.value = true))
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  clearTimeout(bootTimer)
  if (io) io.disconnect()
})
</script>

<template>
  <section id="top" ref="hero" class="hero theme-dark"
    :class="{ 'is-ready': ready, 'is-off': offscreen }">
    <div class="hero__media" aria-hidden="true">
      <div class="hero__aurora"><span class="hero__blob hero__blob--a"></span><span class="hero__blob hero__blob--b"></span></div>
      <div class="hero__scrim"></div>
      <div class="hero__floor"><i></i></div>
      <div class="hero__rules"><span></span><span></span><span></span></div>
    </div>

    <div class="hero__inner shell">
      <div class="hero__lead">
        <p class="hero__note">
          <AppIcon name="globe" :size="22" class="hero__note-icon" />
          <span>Websites · Web apps · Business systems · AI &amp; automation<br />Built for how you work.</span>
        </p>

        <h1 class="display hero__title">
          We turn ideas<br />
          into <em>software.</em>
        </h1>

        <p class="hero__sub">
          We design and build websites, web applications, business systems, AI-powered solutions and
          digital experiences around the way your business works.
        </p>

        <div class="hero__cta">
          <a class="btn btn--flame hero__go" href="#contact">
            Start a project
            <span class="btn__dot"><AppIcon name="arrow" /></span>
          </a>
          <a class="btn btn--ghost" href="#ai">See what AI can do</a>

          <div class="hero__proof">
            <div class="hero__dots" aria-hidden="true">
              <i v-for="(d, i) in dots" :key="i" :style="{ '--a': d.a, '--b': d.b }"></i>
            </div>
            <span class="hero__proof-text">
              <strong>Businesses · Startups</strong>
              Professionals · Growing companies
            </span>
          </div>
        </div>

        <ul class="hero__cards">
          <li class="hcard" data-tilt>
            <span class="hcard__mark" aria-hidden="true">*</span>
            <span class="hcard__value">05</span>
            <span class="hcard__label">Capability areas</span>
            <span class="hcard__note">Websites → business systems → AI → digital growth</span>
            <span class="hcard__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          </li>
          <li class="hcard hcard--lit" data-tilt>
            <span class="hcard__mark" aria-hidden="true">*</span>
            <span class="hcard__value">03</span>
            <span class="hcard__label">Live projects</span>
            <span class="hcard__note">Shipped, running and linked from this page</span>
            <span class="hcard__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          </li>
          <li class="hcard hcard--ai" data-tilt>
            <span class="hcard__mark" aria-hidden="true">
              <AppIcon name="cpu" :size="14" />
            </span>
            <span class="hcard__value">AI</span>
            <span class="hcard__label">Assistants &amp; automation</span>
            <span class="hcard__note">LLM integrations, bots, document workflows, smart search</span>
            <span class="hcard__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          </li>
        </ul>
      </div>

      <aside class="hero__side">
        <RobotHead class="hero__bot" />
        <p class="hero__bot-hint mono" aria-hidden="true">Move your cursor — it follows you</p>
        <ol class="chain">
          <li v-for="(step, i) in chain" :key="step">
            <span class="chain__dot"></span>
            <span class="chain__label">{{ step }}</span>
            <!-- <span class="chain__num">0{{ i + 1 }}</span> -->
          </li>
        </ol>
      </aside>
    </div>

    <div class="hero__foot shell">
      <span class="hero__watermark" aria-hidden="true">PIXELS</span>
      <div class="hero__caps">
        <span class="hero__caps-label">What we build</span>
        <ul>
          <li v-for="c in capabilities" :key="c.name">
            <AppIcon :name="c.icon" :size="18" />
            <span>{{ c.name }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-line"></span>
      <span class="mono">Scroll</span>
    </div> -->
  </section>
</template>

<style scoped>
.hero {
  --mx: 0;
  --my: 0;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
  padding: calc(112px + 2vh) var(--gutter) 26px;
  background: radial-gradient(122% 92% at 12% 6%, #14294d 0%, #0a162c 46%, #050b18 100%);
}

/* ---------------------------------------------------------- media */
.hero__media { position: absolute; inset: 0; z-index: -1; }

/* Perf note: this used to carry `filter: blur(8px)` and animate
   `scale()`. Scaling a viewport-sized blurred layer forces the
   browser to re-rasterise it every single frame — measured at
   ~15fps on desktop. Radial gradients are already soft, so the
   blur bought nothing; translate-only stays on the compositor. */
/* Static base wash — painted once, never re-rasterised. */
.hero__aurora {
  position: absolute;
  inset: -8% -6%;
  background:
    radial-gradient(44% 40% at 18% 14%, rgba(0, 105, 254, 0.34), transparent 66%),
    radial-gradient(40% 38% at 78% 26%, rgba(61, 139, 255, 0.26), transparent 68%),
    radial-gradient(58% 50% at 68% 98%, rgba(38, 92, 190, 0.3), transparent 72%);
  contain: layout paint style;
}

/* Perf note: the ambient light used to be one viewport-sized blurred
   layer that animated `scale()`. Scaling a full-size blurred layer
   forces the browser to re-rasterise it every frame — measured at
   ~15fps on desktop. The drift now lives on two small promoted
   layers that only ever translate, so they stay on the compositor. */
.hero__blob {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}
.hero__blob--a {
  left: 8%;
  top: 6%;
  width: 46vw;
  height: 46vw;
  max-width: 660px;
  max-height: 660px;
  background: radial-gradient(closest-side circle, rgba(0, 105, 254, 0.3), transparent 70%);
  animation: driftA 24s var(--ease-in-out) infinite alternate;
}
.hero__blob--b {
  right: 4%;
  bottom: -6%;
  width: 38vw;
  height: 38vw;
  max-width: 540px;
  max-height: 540px;
  background: radial-gradient(closest-side circle, rgba(255, 122, 47, 0.17), transparent 70%);
  animation: driftB 31s var(--ease-in-out) infinite alternate;
}
@keyframes driftA {
  from { transform: translate3d(-3%, -2%, 0); }
  to { transform: translate3d(6%, 5%, 0); }
}
@keyframes driftB {
  from { transform: translate3d(2%, 3%, 0); }
  to { transform: translate3d(-5%, -4%, 0); }
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(96deg, rgba(5, 11, 24, 0.9) 0%, rgba(7, 16, 34, 0.52) 30%,
      rgba(9, 19, 40, 0.12) 50%, rgba(10, 22, 44, 0) 66%),
    linear-gradient(0deg, rgba(4, 9, 20, 0.8) 0%, rgba(5, 11, 24, 0.14) 30%, rgba(0, 0, 0, 0) 48%),
    linear-gradient(180deg, rgba(5, 11, 24, 0.6) 0%, rgba(0, 0, 0, 0) 24%);
}

.hero__floor {
  position: absolute;
  left: -30%;
  right: -30%;
  bottom: -12%;
  height: 56%;
  overflow: hidden;
  transform: perspective(520px) rotateX(72deg);
  transform-origin: bottom center;
  opacity: 0.62;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.35) 40%, #000 92%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.35) 40%, #000 92%);
}
/* the grid slides as its own composited layer — animating
   background-position repainted the whole floor every frame */
.hero__floor i {
  position: absolute;
  top: -88px;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(90deg, rgba(125, 182, 255, 0.16) 1px, transparent 1px),
    linear-gradient(0deg, rgba(125, 182, 255, 0.13) 1px, transparent 1px);
  background-size: 86px 86px;
  will-change: transform;
  animation: floor 7s linear infinite;
}
@keyframes floor { to { transform: translate3d(0, 86px, 0); } }

.hero__rules {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 30%;
  pointer-events: none;
}
.hero__rules span { width: 1px; background: linear-gradient(180deg, transparent, rgba(234, 241, 255, 0.08), transparent); }
.hero__rules span:nth-child(2) { margin-left: 14px; }

/* --------------------------------------------------------- layout */
.hero__inner {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: center;
  gap: 44px;
  padding-bottom: 30px;
}
.hero__lead {
  max-width: 700px;
  transform: translate3d(calc(var(--mx) * -14px), calc(var(--my) * -10px), 0);
  transition: transform 0.9s var(--ease-out);
}

/* ----------------------------------------------------------- copy */
.hero__note {
  display: flex;
  align-items: center;
  gap: 11px;
  padding-top: 13px;
  border-top: 1px solid var(--hair-soft);
  width: fit-content;
  max-width: 380px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-faint);
}
.hero__note-icon { flex: none; color: var(--blue-lit); opacity: 0.9; }

.hero__title {
  margin-top: 26px;
  font-size: clamp(2.75rem, 6.6vw, 6.2rem);
  text-shadow: 0 8px 46px rgba(0, 0, 0, 0.5);
}

.hero__sub {
  margin-top: 22px;
  max-width: 440px;
  font-size: 15.5px;
  line-height: 1.62;
  color: var(--ink-soft);
}

/* ------------------------------------------------------------ cta */
.hero__cta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px 22px;
  margin-top: 30px;
}
.hero__go {
  font-size: 15.5px;
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out);
}

.hero__proof { display: flex; align-items: center; gap: 11px; }
.hero__dots { display: flex; }
.hero__dots i {
  width: 28px;
  height: 28px;
  margin-left: -9px;
  border-radius: 999px;
  border: 2px solid rgba(5, 11, 24, 0.9);
  background: linear-gradient(140deg, var(--a), var(--b));
}
.hero__dots i:first-child { margin-left: 0; }
.hero__proof-text { display: grid; font-size: 11px; line-height: 1.45; color: var(--ink-faint); }
.hero__proof-text strong { font-size: 12.5px; font-weight: 550; color: var(--ink); }

/* ---------------------------------------------------------- cards */
.hero__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  margin-top: 34px;
  max-width: 700px;
}
.hcard {
  position: relative;
  display: grid;
  align-content: start;
  gap: 4px;
  min-width: 0;
  padding: 18px 20px 20px;
  border: 1px solid var(--hair);
  border-radius: 18px;
  background: var(--glass);
  backdrop-filter: blur(18px) saturate(1.15);
  -webkit-backdrop-filter: blur(18px) saturate(1.15);
  box-shadow: inset 0 1px 0 rgba(234, 241, 255, 0.09);
  transform: perspective(700px) rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg));
  transition: transform 0.5s var(--ease-out), border-color 0.4s var(--ease-out);
}
.hcard::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: var(--sg, 0);
  background: radial-gradient(220px circle at var(--sx, 50%) var(--sy, 50%), rgba(61, 139, 255, 0.16), transparent 62%);
  transition: opacity 0.5s var(--ease-out);
  pointer-events: none;
}
.hcard:hover { border-color: rgba(61, 139, 255, 0.45); }
.hcard--lit { background: linear-gradient(150deg, rgba(0, 105, 254, 0.3), rgba(9, 18, 38, 0.6)); }
.hcard--ai {
  background: linear-gradient(150deg, rgba(255, 122, 47, 0.22), rgba(9, 18, 38, 0.6));
  border-color: rgba(255, 162, 58, 0.36);
}
.hcard__mark { position: absolute; top: 14px; right: 16px; font-size: 15px; color: var(--ink-faint); }
.hcard--ai .hcard__mark { color: var(--ember-lit); top: 15px; }
.hcard__value {
  font-family: var(--font-display);
  font-size: 2.35rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.04em;
}
.hcard__label { font-size: 12px; color: var(--ink-faint); }
.hcard__note { margin-top: 8px; font-size: 11.5px; line-height: 1.45; color: var(--ink-faint); }
.hcard__bars { display: flex; align-items: flex-end; gap: 4px; height: 22px; margin-top: 14px; }
.hcard__bars i { width: 6px; border-radius: 2px; background: linear-gradient(180deg, var(--blue-lit), rgba(61, 139, 255, 0.25)); }
.hcard--ai .hcard__bars i { background: linear-gradient(180deg, var(--ember-lit), rgba(255, 122, 47, 0.25)); }
.hcard__bars i:nth-child(1) { height: 36%; }
.hcard__bars i:nth-child(2) { height: 62%; }
.hcard__bars i:nth-child(3) { height: 44%; }
.hcard__bars i:nth-child(4) { height: 80%; }
.hcard__bars i:nth-child(5) { height: 100%; }

/* ------------------------------------------------- robot + chain */
.hero__side {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 6px;
}
.hero__bot {
  width: min(280px, 62vw);
}
.hero__bot-hint {
  margin-top: 2px;
  font-size: 11.5px;
  letter-spacing: 0.14em;
  color: var(--ink-faint);
  opacity: 0;
  transition: opacity 0.8s var(--ease-out) 1.1s;
}
.hero.is-ready .hero__bot-hint { opacity: 1; }

.chain {
  margin-top: 22px;
  display: grid;
  width: min(300px, 80%);
  color: var(--ink-faint);
}
.chain li {
  position: relative;
  display: grid;
  grid-template-columns: 14px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 9px 0 9px 16px;
  margin-left: 6px;
  border-left: 1px solid var(--hair-soft);
}
.chain li:last-child { border-left-color: transparent; }
.chain__dot {
  position: absolute;
  left: -6px;
  top: 50%;
  width: 11px;
  height: 11px;
  margin-top: -5.5px;
  border-radius: 3px;
  background: rgba(125, 182, 255, 0.6);
  transform: rotate(45deg);
}
.chain__label { font-family: var(--font-display); font-size: 15px; letter-spacing: -0.02em; color: var(--ink-soft); }
.chain__num { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; }

/* ------------------------------------------------------ footer band */
.hero__foot {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-top: 16px;
}
.hero__watermark {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 9vw, 7.5rem);
  font-weight: 700;
  line-height: 0.78;
  letter-spacing: -0.05em;
  color: rgba(234, 241, 255, 0.06);
  user-select: none;
}
.hero__caps { text-align: right; }
.hero__caps-label {
  display: block;
  margin-bottom: 12px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.hero__caps ul { display: flex; align-items: center; gap: clamp(14px, 2vw, 26px); }
.hero__caps li { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 450; color: var(--ink-soft); }
.hero__caps li svg { color: var(--blue-lit); }

/* --------------------------------------------------- scroll cue */
.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink-faint);
  opacity: 0;
  transition: opacity 0.8s var(--ease-out) 0.6s;
}
.hero.is-ready .hero__scroll { opacity: 0.75; }
.hero__scroll-line {
  width: 1px;
  height: 30px;
  background: linear-gradient(180deg, var(--blue), transparent);
  animation: drop 2.4s var(--ease-in-out) infinite;
  transform-origin: top;
}
@keyframes drop {
  0% { transform: scaleY(0); }
  55% { transform: scaleY(1); }
  56% { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* --------------------------------------------- pause when off-screen */
/* The hero carries the heaviest motion on the page. Once it scrolls
   away there is no reason to keep compositing it. */
.hero.is-off .hero__floor i,
.hero.is-off .hero__blob,
.hero.is-off .hero__scroll-line,
.hero.is-off .bot__head,
.hero.is-off .bot__ring,
.hero.is-off .bot__status rect {
  animation-play-state: paused;
}

/* --------------------------------------------------------- entrance */
/* held until the intro curtain lifts (BrandLoader), so the hero reveal
   reads as one continuous motion */
.hero__note, .hero__title, .hero__sub, .hero__cta, .hero__cards, .hero__foot, .hero__side { opacity: 0; }
.hero.is-ready .hero__note,
.hero.is-ready .hero__title,
.hero.is-ready .hero__sub,
.hero.is-ready .hero__cta,
.hero.is-ready .hero__cards,
.hero.is-ready .hero__foot,
.hero.is-ready .hero__side {
  animation: rise 1s var(--ease-out) both;
}
.hero.is-ready .hero__title { animation-delay: 0.06s; }
.hero.is-ready .hero__sub { animation-delay: 0.14s; }
.hero.is-ready .hero__cta { animation-delay: 0.2s; }
.hero.is-ready .hero__cards { animation-delay: 0.28s; }
.hero.is-ready .hero__side { animation-delay: 0.18s; }
.hero.is-ready .hero__foot { animation-delay: 0.36s; }
@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}

/* ------------------------------------------------------- responsive */
@media (min-width: 1120px) {
  .hero__inner { grid-template-columns: minmax(0, 1fr) minmax(0, 0.58fr); align-items: center; }
  .hero__side { justify-self: end; justify-items: stretch; }
  .hero__bot { width: min(330px, 26vw); }
  .chain { width: 100%; }
}
/* Below the split, the chain and the cursor hint are dead weight —
   the chain is section 03's content and there is no pointer to follow
   on a touch screen. Keeping only the robot stops the hero from
   running two screens deep on a phone. */
@media (max-width: 1119px) {
  .hero__side { gap: 0; }
  .hero__bot { width: min(240px, 46vw); }
  .hero__bot-hint,
  .chain { display: none; }
}
@media (max-width: 860px) {
  .hero { padding-top: 104px; }
  .hero__rules { display: none; }
  .hero__floor { height: 42%; opacity: 0.45; }
  .hero__foot { flex-direction: column; align-items: flex-start; }
  .hero__caps { text-align: left; }
  .hero__caps ul { flex-wrap: wrap; }
  .hero__watermark { font-size: 3.6rem; }
  .hero__scroll { display: none; }
}
@media (max-width: 560px) {
  .hero__watermark { display: none; }
  .hero__bot { width: min(190px, 52vw); }
  /* the note line is the first thing to go on a phone */
  .hcard__note { display: none; }
  .hcard { padding: 15px 16px 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__lead { transform: none; }
  .hero__floor i { animation: none; }
  .hero__note, .hero__title, .hero__sub, .hero__cta, .hero__cards, .hero__foot, .hero__side { opacity: 1; }
  .hero__blob { animation: none; }
  .hcard { transform: none; }
}
</style>

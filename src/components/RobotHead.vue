<script setup>
/* ============================================================
   RobotHead — the hero's mascot.

   A sleek head with a wide visor that looks straight ahead and
   follows the pointer: the head turns in 3D, the eyes track
   and lead slightly, the antenna counter-rotates, and the
   status pixels brighten when you get close.

   Everything is inline SVG + CSS custom properties driven by
   one rAF loop that writes four numbers per frame — no canvas,
   no filters, no per-frame layout. That is the whole point:
   the previous canvas hero dropped frames on desktop.

   No pointer (touch, reduced motion): the head rests facing
   forward with a slow autonomous drift.
   ============================================================ */
import { onMounted, onBeforeUnmount, ref } from 'vue'

const root = ref(null)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* where the head is looking, -1..1 on both axes */
const look = { x: 0, y: 0 }
const cur = { x: 0, y: 0 }
const idle = { x: 0, y: 0 }

let raf = 0
let io = null
let visible = true
let pointer = false
let blinkAt = 0
let el = null

/* the head's rect is cached and refreshed on scroll/resize — never
   measured inside the pointer handler, where it would force a
   synchronous layout on every mouse event */
let rect = null
let rectRaf = 0

function measure() {
  rect = el ? el.getBoundingClientRect() : null
}
function remeasure() {
  if (rectRaf) return
  rectRaf = requestAnimationFrame(() => {
    rectRaf = 0
    measure()
  })
}

function onMove(e) {
  if (!el) return
  if (!rect) measure()
  const r = rect
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  /* normalise by half the viewport so the head notices you early */
  const nx = (e.clientX - cx) / (window.innerWidth * 0.5)
  const ny = (e.clientY - cy) / (window.innerHeight * 0.5)
  look.x = Math.max(-1, Math.min(1, nx))
  look.y = Math.max(-1, Math.min(1, ny))
  pointer = true
}

function onDown() {
  if (!el) return
  el.classList.remove('is-alert')
  void el.offsetWidth
  el.classList.add('is-alert')
  window.setTimeout(() => el && el.classList.remove('is-alert'), 700)
}

function frame(now) {
  raf = requestAnimationFrame(frame)

  /* autonomous drift when nobody is pointing at anything */
  if (!pointer) {
    idle.x = Math.sin(now * 0.00042) * 0.42
    idle.y = Math.sin(now * 0.00031 + 1.7) * 0.3
  }

  const tx = pointer ? look.x : idle.x
  const ty = pointer ? look.y : idle.y

  /* critically-damped follow: quick to start, no overshoot */
  cur.x += (tx - cur.x) * 0.085
  cur.y += (ty - cur.y) * 0.085

  /* blink every 3.5-6s when the head is settled */
  if (now > blinkAt) {
    blinkAt = now + 3400 + Math.random() * 2600
    if (el) {
      el.classList.add('is-blink')
      window.setTimeout(() => el && el.classList.remove('is-blink'), 150)
    }
  }

  const near = Math.min(1, Math.hypot(cur.x, cur.y))
  el.style.setProperty('--lx', cur.x.toFixed(4))
  el.style.setProperty('--ly', cur.y.toFixed(4))
  el.style.setProperty('--near', near.toFixed(3))
}

function start() {
  if (raf || reduce || !el) return
  raf = requestAnimationFrame(frame)
}
function stop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

onMounted(() => {
  el = root.value
  if (!el || reduce) return

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  window.addEventListener('scroll', remeasure, { passive: true })
  window.addEventListener('resize', remeasure, { passive: true })
  measure()

  io = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting
      el.classList.toggle('is-off', !visible)
      visible && !document.hidden ? start() : stop()
    },
    { rootMargin: '80px' }
  )
  io.observe(el)
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : visible && start()
  })
  start()
})

onBeforeUnmount(() => {
  stop()
  if (io) io.disconnect()
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('scroll', remeasure)
  window.removeEventListener('resize', remeasure)
})
</script>

<template>
  <div ref="root" class="bot" :class="{ 'is-still': reduce }">
    <span class="bot__glow" aria-hidden="true"></span>
    <span class="bot__ring bot__ring--a" aria-hidden="true"></span>
    <span class="bot__ring bot__ring--b" aria-hidden="true"></span>

    <div class="bot__head">
      <svg viewBox="0 0 320 380" role="img" aria-label="Brown Pixels mascot">
        <defs>
          <linearGradient id="bp-shell" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stop-color="#22406f" />
            <stop offset="46%" stop-color="#132b52" />
            <stop offset="100%" stop-color="#081226" />
          </linearGradient>
          <linearGradient id="bp-visor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b1c3a" />
            <stop offset="55%" stop-color="#050d20" />
            <stop offset="100%" stop-color="#02060f" />
          </linearGradient>
          <radialGradient id="bp-eye" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stop-color="#dcecff" />
            <stop offset="38%" stop-color="#7db6ff" />
            <stop offset="100%" stop-color="#1f6ae8" />
          </radialGradient>
          <radialGradient id="bp-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#7db6ff" stop-opacity="0.55" />
            <stop offset="100%" stop-color="#7db6ff" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="bp-ember" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#ffd9a8" />
            <stop offset="55%" stop-color="#ffa23a" />
            <stop offset="100%" stop-color="#f3610d" />
          </radialGradient>
        </defs>

        <!-- antenna -->
        <g class="bot__antenna">
          <path d="M160 74 L160 30" stroke="#2a4a80" stroke-width="4" stroke-linecap="round" />
          <circle cx="160" cy="30" r="14" fill="url(#bp-halo)" />
          <circle cx="160" cy="30" r="7.5" fill="url(#bp-ember)" />
        </g>

        <!-- neck + shoulders -->
        <rect x="134" y="286" width="52" height="26" rx="13" fill="#0b1a33" />
        <path d="M56 380 Q56 312 160 312 Q264 312 264 380 Z" fill="#0a172e" />
        <path d="M56 380 Q56 312 160 312 Q264 312 264 380" fill="none" stroke="rgba(125,182,255,0.16)"
          stroke-width="1.5" />

        <!-- head shell -->
        <rect x="40" y="66" width="240" height="228" rx="62" fill="url(#bp-shell)" />
        <rect x="40.75" y="66.75" width="238.5" height="226.5" rx="61.25" fill="none"
          stroke="rgba(125,182,255,0.28)" stroke-width="1.5" />
        <!-- top sheen -->
        <path d="M74 92 Q160 66 246 92" fill="none" stroke="rgba(234,241,255,0.16)" stroke-width="3"
          stroke-linecap="round" />

        <!-- side vents -->
        <rect x="30" y="150" width="12" height="54" rx="6" fill="#0a172e" />
        <rect x="278" y="150" width="12" height="54" rx="6" fill="#0a172e" />
        <rect x="33" y="158" width="6" height="22" rx="3" fill="#0069fe" opacity="0.85" />
        <rect x="281" y="158" width="6" height="22" rx="3" fill="#ffa23a" opacity="0.85" />

        <!-- visor -->
        <rect x="68" y="112" width="184" height="112" rx="40" fill="url(#bp-visor)" />
        <rect x="68.75" y="112.75" width="182.5" height="110.5" rx="39.25" fill="none"
          stroke="rgba(125,182,255,0.22)" stroke-width="1.5" />
        <path d="M96 128 Q160 112 224 128" fill="none" stroke="rgba(125,182,255,0.18)" stroke-width="2"
          stroke-linecap="round" />

        <!-- eyes -->
        <g class="bot__eyes">
          <circle class="bot__halo" cx="122" cy="168" r="30" fill="url(#bp-halo)" />
          <circle class="bot__halo" cx="198" cy="168" r="30" fill="url(#bp-halo)" />
          <rect class="bot__eye" x="100" y="146" width="44" height="44" rx="16" fill="url(#bp-eye)" />
          <rect class="bot__eye" x="176" y="146" width="44" height="44" rx="16" fill="url(#bp-eye)" />
          <circle class="bot__glint" cx="112" cy="158" r="5" fill="#ffffff" opacity="0.9" />
          <circle class="bot__glint" cx="188" cy="158" r="5" fill="#ffffff" opacity="0.9" />
        </g>

        <!-- status pixels -->
        <g class="bot__status">
          <rect x="140" y="248" width="10" height="10" rx="3" fill="#3d8bff" />
          <rect x="155" y="248" width="10" height="10" rx="3" fill="#3d8bff" />
          <rect x="170" y="248" width="10" height="10" rx="3" fill="#ffa23a" />
        </g>
      </svg>
    </div>

    <span class="bot__shadow" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.bot {
  --lx: 0;
  --ly: 0;
  --near: 0;
  position: relative;
  width: 100%;
  max-width: 340px;
  margin-inline: auto;
  aspect-ratio: 320 / 380;
  perspective: 900px;
  /* keep every repaint this component causes inside its own box */
  contain: layout paint style;
}

/* ---------- ambient light ---------- */
.bot__glow {
  position: absolute;
  inset: 4% 6% 14%;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 45%,
    rgba(61, 139, 255, 0.3) 0%,
    rgba(61, 139, 255, 0.09) 45%, transparent 72%);
  /* opacity, not a per-frame gradient — keeps this off the paint path */
  opacity: calc(0.55 + var(--near) * 0.45);
  will-change: opacity;
  pointer-events: none;
}

.bot__ring {
  position: absolute;
  inset: 8% 0 20%;
  margin: auto;
  width: 84%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(125, 182, 255, 0.16);
  pointer-events: none;
  will-change: transform;
}
.bot__ring--a {
  transform: rotateX(74deg);
  animation: spin 26s linear infinite;
}
.bot__ring--b {
  inset: 14% 0 26%;
  width: 70%;
  border-color: rgba(255, 162, 58, 0.14);
  transform: rotateX(74deg) rotateY(28deg);
  animation: spin 34s linear infinite reverse;
}
@keyframes spin {
  to { transform: rotateX(74deg) rotateZ(360deg); }
}

/* ---------- head ---------- */
.bot__head {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform:
    translate3d(calc(var(--lx) * 14px), calc(var(--ly) * 9px), 0)
    rotateY(calc(var(--lx) * 13deg))
    rotateX(calc(var(--ly) * -9deg));
  animation: breathe 6.5s var(--ease-in-out) infinite;
  will-change: transform;
}
@keyframes breathe {
  0%, 100% { translate: 0 -2px; }
  50% { translate: 0 4px; }
}

.bot__head svg { width: 100%; height: 100%; overflow: visible; }

/* ---------- eyes ---------- */
.bot__eyes {
  transform: translate(calc(var(--lx) * 19px), calc(var(--ly) * 13px));
}
.bot__eye {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.18s var(--ease-out);
}
.bot__halo { opacity: 0.78; }
.bot__glint { transform: translate(calc(var(--lx) * 3px), calc(var(--ly) * 2px)); }

/* ---------- antenna counter-rotates ---------- */
.bot__antenna {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: rotate(calc(var(--lx) * -11deg));
}

/* ---------- status pixels ---------- */
.bot__status rect {
  transform-box: fill-box;
  transform-origin: center;
  animation: blip 2.6s var(--ease-in-out) infinite;
}
.bot__status rect:nth-child(2) { animation-delay: 0.4s; }
.bot__status rect:nth-child(3) { animation: none; opacity: 0.9; }
@keyframes blip {
  0%, 100% { opacity: 0.4; transform: scaleY(0.78); }
  45% { opacity: 1; transform: scaleY(1); }
}

/* ---------- states ---------- */
.bot.is-blink .bot__eye { transform: scaleY(0.08); }
.bot.is-blink .bot__glint { opacity: 0; }

.bot.is-alert .bot__eye { transform: scale(1.22); }
.bot.is-alert .bot__halo { opacity: 1; }

.bot__shadow {
  position: absolute;
  left: 50%;
  bottom: 2%;
  width: 62%;
  height: 5%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.55), transparent 70%);
  pointer-events: none;
}

/* ---------- reduced motion / no JS ---------- */
.bot.is-still .bot__head,
.bot.is-still .bot__eyes,
.bot.is-still .bot__antenna { transform: none; animation: none; }
.bot.is-still .bot__ring { animation: none; }

/* off-screen: stop compositing the ambient loops */
.bot.is-off .bot__head,
.bot.is-off .bot__ring,
.bot.is-off .bot__status rect { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .bot__head, .bot__ring, .bot__status rect { animation: none; }
  .bot__eyes, .bot__antenna, .bot__glint { transform: none; }
}
</style>

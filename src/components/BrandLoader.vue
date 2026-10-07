<script setup>
/* ============================================================
   BrandLoader — the intro curtain.

   Beat sheet:
     0.00  curtain up; a soft blue core glows behind the mark
     0.05  the mark's tiles fly in from outside the frame and
           land on a diagonal, each flashing as it settles
     0.70  a scan line sweeps the finished mark
     0.85  BROWN wipes in from the left, PIXELS from the right
     1.15  the rule draws out from the centre
     1.85  the whole curtain lifts and the hero takes over

   Runs once per session (sessionStorage) and is reduced to a
   short static hold under prefers-reduced-motion.
   ============================================================ */
import { onMounted, onBeforeUnmount, ref } from 'vue'
import MarkMosaic from './MarkMosaic.vue'
import { mediaQuery } from '../composables/mediaQuery.js'

const emit = defineEmits(['done'])

const HOLD = 2500   // ms of visible brand animation
const WIPE = 620    // ms of curtain lift
const KEY = 'bp-intro-seen'

const reduce = mediaQuery('(prefers-reduced-motion: reduce)').matches
const skipped = ref(false)
const out = ref(false)
const pct = ref(0)

let t1 = 0
let t2 = 0
let raf = 0
let start = 0

function release() {
  document.documentElement.classList.remove('is-booting')
  document.body.style.overflow = ''
  skipped.value = true
  emit('done')
}

function tick(now) {
  if (!start) start = now
  const p = Math.min(1, (now - start) / HOLD)
  /* ease-out so the bar feels like it settles, not snaps */
  pct.value = Math.round((1 - Math.pow(1 - p, 3)) * 100)
  if (p < 1) raf = requestAnimationFrame(tick)
}

onMounted(() => {
  // let seen = false
  // try { seen = sessionStorage.getItem(KEY) === '1' } catch (e) { /* private mode */ }

  // if (seen) {
  //   release()
  //   return
  // }

  document.documentElement.classList.add('is-booting')
  document.body.style.overflow = 'hidden'

  if (reduce) {
    pct.value = 100
    t1 = window.setTimeout(() => { out.value = true }, 520)
    t2 = window.setTimeout(release, 520 + 420)
    return
  }

  raf = requestAnimationFrame(tick)

  /* fonts can be slow; never let the curtain hang on them */
  let fontsReady = Promise.resolve()
  if (document.fonts && document.fonts.ready) {
    fontsReady = Promise.race([
      document.fonts.ready,
      new Promise((r) => window.setTimeout(r, HOLD + 300))
    ])
  }

  fontsReady.then(() => {
    if (skipped.value) return
    const left = Math.max(0, HOLD - (performance.now() - start))
    t1 = window.setTimeout(() => { out.value = true }, left)
    t2 = window.setTimeout(() => {
      release()
      try { sessionStorage.setItem(KEY, '1') } catch (e) { /* ignore */ }
    }, left + WIPE)
  })
})

onBeforeUnmount(() => {
  clearTimeout(t1)
  clearTimeout(t2)
  if (raf) cancelAnimationFrame(raf)
  document.documentElement.classList.remove('is-booting')
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="!skipped" class="boot" :class="{ 'is-out': out }" role="status" aria-live="polite"
    aria-label="Loading Brown Pixels">
    <div class="boot__grid" aria-hidden="true"></div>
    <div class="boot__core" aria-hidden="true"></div>

    <div class="boot__inner">
      <div class="boot__mark">
        <MarkMosaic :n="10" :play="true" :step="30" :delay="120" :scatter="true" />
      </div>

      <div class="boot__word" aria-hidden="true">
        <img src="/img/logo-word-dark.png" alt="" width="480" height="248" />
      </div>

      <div class="boot__rule" aria-hidden="true"></div>

      <p class="boot__tag mono">Digital products · Software · AI</p>
      <p class="boot__pct mono">{{ String(pct).padStart(3, '0') }}</p>
    </div>
  </div>
</template>

<style scoped>
.boot {
  position: fixed;
  inset: 0;
  z-index: 9995;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(120% 90% at 50% 12%, #10203f 0%, #070f22 48%, #04080f 100%);
  transform: translateY(0);
  transition: transform 0.62s var(--ease-in-out), opacity 0.5s var(--ease-in-out) 0.14s;
}
.boot.is-out {
  transform: translateY(-101%);
  opacity: 0.6;
}

.boot__grid {
  position: absolute;
  inset: -10%;
  background-image:
    linear-gradient(90deg, rgba(234, 241, 255, 0.05) 1px, transparent 1px),
    linear-gradient(0deg, rgba(234, 241, 255, 0.05) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(70% 60% at 50% 45%, #000 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 45%, #000 0%, transparent 78%);
  animation: gridin 1.2s var(--ease-out) both;
}
@keyframes gridin {
  from { opacity: 0; transform: scale(1.06); }
  to { opacity: 1; transform: scale(1); }
}

/* the glow behind the mark — makes the artwork read on the dark ground */
.boot__core {
  position: absolute;
  width: min(70vw, 560px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%,
    rgba(61, 139, 255, 0.34) 0%, rgba(61, 139, 255, 0.1) 42%, transparent 70%);
  animation: core 1.5s var(--ease-out) both;
}
@keyframes core {
  0% { opacity: 0; transform: scale(0.5); }
  60% { opacity: 1; }
  100% { opacity: 1; transform: scale(1); }
}

.boot__inner {
  position: relative;
  display: grid;
  justify-items: center;
  width: min(420px, 80vw);
}

.boot__mark {
  width: clamp(150px, 30vw, 224px);
  filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.55));
}

.boot__word {
  width: clamp(196px, 46vw, 288px);
  margin-top: 26px;
}
.boot__word img {
  width: 100%;
  height: auto;
  clip-path: inset(0 100% 0 0);
  animation: word 0.85s var(--ease-out) 0.85s both;
}
@keyframes word {
  from { clip-path: inset(0 100% 0 0); opacity: 0.35; }
  to { clip-path: inset(0 0 0 0); opacity: 1; }
}

.boot__rule {
  width: min(280px, 64vw);
  height: 1px;
  margin-top: 24px;
  background: linear-gradient(90deg, transparent, #0069fe 30%, #7db6ff 55%, #ffa23a 78%, transparent);
  transform: scaleX(0);
  animation: rule 0.7s var(--ease-out) 1.15s both;
}
@keyframes rule {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.boot__tag {
  margin-top: 14px;
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: rgba(234, 241, 255, 0.5);
  opacity: 0;
  animation: fadein 0.7s var(--ease-out) 1.35s both;
}
.boot__pct {
  position: absolute;
  right: 0;
  bottom: -6px;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  color: rgba(125, 182, 255, 0.65);
}
.boot__pct::after {
  content: '%';
  margin-left: 1px;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .boot { transition-duration: 0.4s; }
  .boot__word img { animation: none; clip-path: none; }
  .boot__rule { animation: none; transform: scaleX(1); }
  .boot__tag { animation: none; opacity: 1; }
  .boot__grid, .boot__core { animation: none; opacity: 1; }
}
</style>

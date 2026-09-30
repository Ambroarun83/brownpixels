<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const steps = [
  {
    num: '01',
    title: 'Understand',
    copy: 'Understand the business, users, requirements, challenges and goals.'
  },
  {
    num: '02',
    title: 'Shape',
    copy: 'Structure the product, features, user experience and technical direction.'
  },
  {
    num: '03',
    title: 'Build',
    copy: 'Design, development, integrations, testing and deployment.'
  },
  {
    num: '04',
    title: 'Evolve',
    copy: 'Improve, maintain, automate and add new capabilities as the business grows.'
  }
]

const wrap = ref(null)
const fill = ref(0)
const live = ref(0)
let raf = 0
let stepEls = []
let io = null
let onScreen = true

function cache() {
  stepEls = wrap.value ? Array.from(wrap.value.querySelectorAll('.step')) : []
}

function measure() {
  const el = wrap.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const total = rect.height
  const passed = vh * 0.55 - rect.top
  fill.value = Math.max(0, Math.min(1, passed / total))

  let closest = 0
  let best = Infinity
  for (let i = 0; i < stepEls.length; i++) {
    const r = stepEls[i].getBoundingClientRect()
    const d = Math.abs(r.top + r.height / 2 - vh * 0.5)
    if (d < best) {
      best = d
      closest = i
    }
  }
  live.value = closest
}

function onScroll() {
  if (raf || !onScreen) return
  raf = requestAnimationFrame(() => {
    measure()
    raf = 0
  })
}

function onResize() {
  cache()
  if (!raf) raf = requestAnimationFrame(() => { measure(); raf = 0 })
}

onMounted(() => {
  cache()
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  /* the timeline only measures while it is actually on screen */
  io = new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting
      if (onScreen) measure()
    },
    { rootMargin: '120px 0px' }
  )
  io.observe(wrap.value)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (io) io.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="approach" ref="wrap" class="section section--rule approach">
    <div class="shell approach__grid">
      <div class="approach__aside">
        <div class="sticky">
          <p class="sec-head__num mono"><b>07</b><span>How we build</span></p>
          <h2 class="display approach__title">From idea to something that works.</h2>
          <p class="lede" style="margin-top: 18px">
            A clear, practical path — so you always know what is happening, what is being built and
            what comes next.
          </p>
          <div class="approach__meter" aria-hidden="true">
            <span class="approach__meter-fill" :style="{ height: (fill * 100).toFixed(1) + '%' }"></span>
          </div>
        </div>
      </div>

      <ol class="steps">
        <li
          v-for="(s, i) in steps"
          :key="s.num"
          class="step"
          :class="{ 'is-live': live === i }"
          v-reveal="{ delay: i * 80 }"
        >
          <span class="step__dot" aria-hidden="true"></span>
          <span class="step__num">{{ s.num }}</span>
          <div class="step__body">
            <h3 class="step__title">{{ s.title }}</h3>
            <p class="step__copy">{{ s.copy }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.approach__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(30px, 5vw, 80px);
}
.sticky { position: sticky; top: 108px; }
.approach__title { font-size: clamp(1.95rem, 1rem + 3.6vw, 3.5rem); }

.approach__meter {
  position: relative;
  width: 2px;
  height: 120px;
  margin-top: 34px;
  border-radius: 2px;
  background: var(--hair);
  overflow: hidden;
}
.approach__meter-fill {
  position: absolute;
  inset: 0 0 auto;
  background: linear-gradient(180deg, var(--blue-lit), var(--blue));
  transition: height 0.2s linear;
}

/* -------------------------------------------------------- steps */
.steps { position: relative; display: grid; gap: 8px; }
.steps::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 22px;
  bottom: 22px;
  width: 1px;
  background: var(--hair-soft);
}

.step {
  position: relative;
  display: grid;
  grid-template-columns: 32px 58px 1fr;
  align-items: start;
  gap: 12px;
  padding: 26px 0;
}
.step__dot {
  position: relative;
  z-index: 1;
  width: 31px;
  height: 31px;
  border: 1px solid var(--hair);
  border-radius: 9px;
  background: var(--ground-deep);
  transform: rotate(45deg);
  transition: border-color 0.5s var(--ease-out), box-shadow 0.6s var(--ease-out);
}
.step__dot::after {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 2px;
  background: var(--hair);
  transition: background-color 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
}
.step.is-live .step__dot { border-color: rgba(125, 182, 255, 0.65); }
.step.is-live .step__dot::after {
  background: linear-gradient(135deg, var(--blue-deep), var(--blue));
  box-shadow: 0 0 20px rgba(125, 182, 255, 0.65);
}

.step__num {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--ink-faint);
  padding-top: 8px;
  transition: color 0.4s;
}
.step.is-live .step__num { color: var(--copper); }

.step__title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  transition: color 0.4s;
}
.step__copy { margin-top: 8px; font-size: 15px; line-height: 1.6; color: var(--ink-soft); max-width: 46ch; }

@media (max-width: 940px) {
  .approach__grid { grid-template-columns: 1fr; }
  .sticky { position: static; }
  .approach__meter { height: 60px; }
  .step { grid-template-columns: 32px 1fr; }
  .step__num { display: none; }
}
</style>

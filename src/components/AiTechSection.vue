<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { onEnterView } from '../composables/useReveal.js'

const chips = [
  'Modern web technologies',
  'AI & machine-learning integrations',
  'LLM / API integrations',
  'Automation',
  'Cloud-ready applications',
  'Real-time systems',
  'APIs & third-party services',
  'Modern databases & infrastructure'
]

const lines = [
  '$ brownpixels --plan-stack',
  '',
  '  scanning requirements ............ done',
  '  mapping product shape ............ done',
  '',
  '  frontend        interface layer',
  '  backend         logic & services',
  '  databases       structured storage',
  '  apis            third-party services',
  '  realtime        live data & events',
  '  ai + llm        model integrations',
  '  cloud           deploy & scale',
  '',
  '  → stack follows the product. not the other way round.'
]

const full = lines.join('\n')
const typed = ref('')
const term = ref(null)
let stop = null
let timer = 0

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (reduce) {
    typed.value = full
    return
  }
  stop = onEnterView(
    term.value,
    () => {
      let i = 0
      timer = setInterval(() => {
        i += 2 + Math.round(Math.random() * 3)
        typed.value = full.slice(0, i)
        if (i >= full.length) clearInterval(timer)
      }, 16)
    },
    { threshold: 0.35 }
  )
})
onBeforeUnmount(() => {
  clearInterval(timer)
  if (stop) stop()
})
</script>

<template>
  <section class="section section--rule tech-sec">
    <div class="shell tech">
      <div class="tech__copy" v-reveal>
        <p class="sec-head__num mono"><b>05</b><span>AI &amp; modern technology</span></p>
        <h2 class="display tech__title">Built for what comes next.</h2>
        <p class="lede" style="margin-top: 20px">
          Technology moves quickly. Brown Pixels is not tied to a single stack. We choose suitable
          modern technologies based on the product, requirements, scalability and business goals.
        </p>

        <ul class="chips">
          <li v-for="c in chips" :key="c">{{ c }}</li>
        </ul>

        <p class="note">
          <AppIcon name="info" :size="16" />
          <span>
            We communicate technology flexibility rather than claiming expertise in every technology.
          </span>
        </p>
      </div>

      <div class="tech__term" ref="term" v-reveal="{ delay: 120 }">
        <div class="term screen">
          <div class="term__bar">
            <span class="term__dots"><i></i><i></i><i></i></span>
            <span class="term__title mono">stack-plan — brownpixels</span>
          </div>
          <pre class="term__body">{{ typed }}<span class="term__caret"></span></pre>
          <div class="term__glow" aria-hidden="true"></div>
        </div>

        <div class="orbit" aria-hidden="true">
          <span class="orbit__ring"></span>
          <span class="orbit__ring orbit__ring--2"></span>
          <span class="orbit__core"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
}

.tech__title { margin-top: 4px; font-size: clamp(1.95rem, 1rem + 3.6vw, 3.5rem); }

.chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
.chips li {
  font-size: 13px;
  padding: 9px 15px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--tint);
  transition: border-color 0.35s var(--ease-out), color 0.35s var(--ease-out),
    background-color 0.35s var(--ease-out), transform 0.35s var(--ease-out);
}
.chips li:hover {
  border-color: rgba(0, 105, 254, 0.45);
  background: rgba(0, 105, 254, 0.1);
  color: var(--ink);
  transform: translateY(-2px);
}

.note {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 28px;
  padding: 16px 18px;
  border-left: 2px solid var(--ember);
  border-radius: 0 12px 12px 0;
  background: linear-gradient(90deg, rgba(0, 105, 254, 0.08), transparent);
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.note svg { flex: none; margin-top: 3px; color: var(--copper); }

/* ------------------------------------------------------- terminal */
.tech__term { position: relative; }
.term {
  position: relative;
  border: 1px solid var(--hair);
  border-radius: 18px;
  background: #050b18;
  box-shadow: 0 50px 90px -60px rgba(5, 11, 24, 0.16), inset 0 1px 0 var(--hi);
  overflow: hidden;
}
.term__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--hair-soft);
  background: var(--tint);
}
.term__dots { display: flex; gap: 6px; }
.term__dots i { width: 9px; height: 9px; border-radius: 999px; background: var(--hair); }
.term__dots i:first-child { background: var(--ember); }
.term__title { color: var(--ink-faint); font-size: 11px; }
.term__body {
  margin: 0;
  padding: 20px 22px 26px;
  min-height: 300px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.85;
  color: var(--ink-soft);
  white-space: pre-wrap;
  text-shadow: 0 0 22px rgba(125, 182, 255, 0.28);
}
.term__caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 2px;
  background: var(--ember-lit);
  vertical-align: -3px;
  animation: blink 1.05s steps(2) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.term__glow {
  position: absolute;
  inset: auto -20% -60% -20%;
  height: 60%;
  background: radial-gradient(50% 60% at 50% 100%, rgba(0, 105, 254, 0.18), transparent 70%);
  pointer-events: none;
}

/* decorative orbit */
.orbit {
  position: absolute;
  right: -40px;
  bottom: -70px;
  width: 180px;
  height: 180px;
  pointer-events: none;
}
.orbit__ring {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(125, 182, 255, 0.18);
  border-radius: 999px;
  animation: spin 26s linear infinite;
}
.orbit__ring--2 { inset: 26px; border-color: rgba(125, 182, 255, 0.12); animation-duration: 18s; animation-direction: reverse; }
.orbit__core {
  position: absolute;
  inset: 74px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(125, 182, 255, 0.9), rgba(0, 105, 254, 0.2));
  box-shadow: 0 0 40px rgba(125, 182, 255, 0.5);
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 940px) {
  .tech { grid-template-columns: 1fr; }
  .orbit { display: none; }
  .term__body { min-height: 240px; font-size: 11.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .orbit__ring { animation: none; }
  .term__caret { animation: none; }
}
</style>

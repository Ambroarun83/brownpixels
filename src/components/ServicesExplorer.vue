<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const services = [
  {
    num: '01',
    id: 'websites',
    title: 'Websites',
    icon: 'web',
    blurb:
      'Modern websites designed to establish trust, explain your business, showcase products or services and generate enquiries.',
    tags: ['Business websites', 'Corporate sites', 'Product catalogues', 'Landing pages', 'Portfolios', 'Restaurant & cafe', 'Professional profiles'],
    preview: 'website'
  },
  {
    num: '02',
    id: 'apps',
    title: 'Web applications',
    icon: 'app',
    blurb:
      'Custom applications designed around specific users, workflows, data and business requirements.',
    tags: ['Customer portals', 'Employee portals', 'Booking systems', 'Order systems', 'Custom platforms', 'Real-time apps', 'API-driven apps'],
    preview: 'app'
  },
  {
    num: '03',
    id: 'systems',
    title: 'Business systems',
    icon: 'layers',
    blurb:
      'Software that helps businesses manage information, operations and everyday workflows.',
    tags: ['CRM', 'ERP', 'Loan & finance', 'Inventory', 'Management dashboards', 'Internal tools'],
    preview: 'system'
  },
  {
    num: '04',
    id: 'ai',
    title: 'AI & automation',
    icon: 'cpu',
    blurb:
      'Modern AI technologies integrated into products and business workflows where they provide practical value.',
    tags: ['AI applications', 'AI assistants', 'Integrations', 'Intelligent automation', 'Content & workflow tools', 'API-based AI'],
    preview: 'ai'
  },
  {
    num: '05',
    id: 'growth',
    title: 'Digital growth',
    icon: 'growth',
    blurb: 'Support for the digital presence and visibility side of your business.',
    tags: ['Marketing support', 'Social content', 'Google Business Profile', 'Local presence', 'Online visibility'],
    note:
      'Digital marketing services may be delivered directly or through trusted partner support depending on the requirement.',
    preview: 'growth'
  }
]

const active = ref(0)
const paused = ref(false)
let timer = 0

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function select(i) {
  active.value = i
  paused.value = true
  stopTimer()
}

function stopTimer() {
  clearInterval(timer)
  timer = 0
}

onMounted(() => {
  if (reduce) return
  timer = setInterval(() => {
    if (paused.value) return
    active.value = (active.value + 1) % services.length
  }, 6000)
})
onBeforeUnmount(stopTimer)

function onKey(e) {
  const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
  const dir = map[e.key]
  if (!dir) return
  e.preventDefault()
  select((active.value + dir + services.length) % services.length)
}
</script>

<template>
  <section id="services" class="section explorer">
    <div class="shell">
      <div class="sec-head" v-reveal>
        <div>
          <p class="sec-head__num mono"><b>02</b><span>What we build</span></p>
          <h2 class="display">Software that fits the business.</h2>
        </div>
        <p class="lede">
          Every business works differently. We build digital solutions around your processes,
          customers, goals and requirements instead of forcing your business into a generic system.
        </p>
      </div>

      <div class="explorer__grid" v-reveal="{ delay: 90 }">
        <!-- selector -->
        <div class="explorer__list" role="tablist" aria-label="Capabilities" @keydown="onKey">
          <button
            v-for="(s, i) in services"
            :key="s.id"
            class="row"
            :class="{ 'is-active': i === active }"
            role="tab"
            :aria-selected="i === active"
            :tabindex="i === active ? 0 : -1"
            @click="select(i)"
            @mouseenter="select(i)"
            @focus="select(i)"
          >
            <span class="row__num mono">{{ s.num }}</span>
            <span class="row__title">{{ s.title }}</span>
            <span class="row__bar" aria-hidden="true"></span>
            <AppIcon :name="s.icon" :size="18" class="row__icon" />
          </button>
        </div>

        <!-- live preview -->
        <div class="explorer__panel">
          <Transition name="swap" mode="out-in">
            <article :key="services[active].id" class="panel">
              <header class="panel__head">
                <span class="mono panel__num">{{ services[active].num }} / 05</span>
                <h3 class="panel__title">{{ services[active].title }}</h3>
                <p class="panel__blurb">{{ services[active].blurb }}</p>
              </header>

              <!-- abstract previews: shapes only, no client data -->
              <div class="stage screen" :class="'stage--' + services[active].preview" aria-hidden="true">
                <!-- websites -->
                <template v-if="services[active].preview === 'website'">
                  <div class="frame">
                    <div class="frame__bar"><i></i><i></i><i></i><span class="frame__url"></span></div>
                    <div class="frame__body">
                      <div class="w-hero"></div>
                      <div class="w-cards"><span></span><span></span><span></span></div>
                      <div class="w-lines"><i></i><i></i><i></i></div>
                    </div>
                  </div>
                </template>

                <!-- web app -->
                <template v-else-if="services[active].preview === 'app'">
                  <div class="frame">
                    <div class="frame__bar"><i></i><i></i><i></i><span class="frame__url"></span></div>
                    <div class="frame__body frame__body--split">
                      <div class="a-side"><i></i><i></i><i></i><i></i><i></i></div>
                      <div class="a-main">
                        <div class="a-rows"><span></span><span></span><span></span></div>
                        <div class="a-form"><i></i><i></i><em></em></div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- business system -->
                <template v-else-if="services[active].preview === 'system'">
                  <div class="frame">
                    <div class="frame__bar"><i></i><i></i><i></i><span class="frame__url"></span></div>
                    <div class="frame__body">
                      <div class="s-head"><i></i><i></i><i></i><i></i></div>
                      <div class="s-rows">
                        <span v-for="n in 5" :key="n"><i></i><i></i><em></em></span>
                      </div>
                      <div class="s-chart"><b v-for="n in 7" :key="n" :style="{ '--h': [40, 62, 48, 78, 58, 92, 70][n - 1] + '%' }"></b></div>
                    </div>
                  </div>
                </template>

                <!-- ai -->
                <template v-else-if="services[active].preview === 'ai'">
                  <svg class="net" viewBox="0 0 320 190">
                    <g class="net__links">
                      <path d="M60 95 L160 50 L260 95 L160 140 Z" />
                      <path d="M60 95 L160 140" />
                      <path d="M160 50 L160 140" />
                      <path d="M260 95 L160 140" />
                      <path d="M60 95 L160 50" />
                    </g>
                    <g class="net__nodes">
                      <circle cx="60" cy="95" r="7" />
                      <circle cx="160" cy="50" r="9" />
                      <circle cx="260" cy="95" r="7" />
                      <circle cx="160" cy="140" r="7" />
                    </g>
                    <circle class="net__pulse" cx="160" cy="95" r="3" />
                  </svg>
                  <div class="ai-chips"><span>LLM</span><span>API</span><span>Automation</span></div>
                </template>

                <!-- growth -->
                <template v-else>
                  <div class="g-wrap">
                    <div class="g-bars"><b v-for="n in 9" :key="n" :style="{ '--h': [22, 38, 30, 52, 44, 68, 58, 84, 96][n - 1] + '%' }"></b></div>
                    <svg class="g-line" viewBox="0 0 320 120" preserveAspectRatio="none">
                      <path d="M4 104 L44 84 L84 92 L124 62 L164 70 L204 42 L244 50 L284 20 L316 10" />
                    </svg>
                    <div class="g-pills"><span>Reach</span><span>Enquiries</span><span>Visibility</span></div>
                  </div>
                </template>
              </div>

              <ul class="panel__tags">
                <li v-for="t in services[active].tags" :key="t">{{ t }}</li>
              </ul>
              <p v-if="services[active].note" class="panel__note">
                <AppIcon name="info" :size="15" />{{ services[active].note }}
              </p>
            </article>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.explorer { position: relative; }

.explorer__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(18px, 2.6vw, 40px);
  align-items: start;
}

/* ------------------------------------------------- selector list */
.explorer__list { display: grid; gap: 6px; }
.row {
  position: relative;
  display: grid;
  grid-template-columns: 42px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 20px 18px 20px 16px;
  border: 1px solid transparent;
  border-radius: 14px;
  text-align: left;
  color: var(--ink-soft);
  transition: background-color 0.4s var(--ease-out), color 0.4s var(--ease-out),
    border-color 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}
.row:hover { background: var(--tint); color: var(--ink); }
.row__num { color: var(--ink-faint); transition: color 0.4s; }
.row__title {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  font-weight: 500;
  letter-spacing: -0.025em;
}
.row__icon { color: var(--ink-faint); transition: color 0.4s, transform 0.5s var(--ease-out); }
.row__bar {
  position: absolute;
  left: 0;
  top: 50%;
  width: 2px;
  height: 0;
  background: linear-gradient(180deg, var(--blue-deep), var(--blue));
  border-radius: 2px;
  transform: translateY(-50%);
  transition: height 0.5s var(--ease-out);
}
.row.is-active {
  background: linear-gradient(96deg, rgba(0, 105, 254, 0.14), rgba(0, 105, 254, 0.03));
  border-color: rgba(0, 105, 254, 0.28);
  color: var(--ink);
  transform: translateX(4px);
}
.row.is-active .row__bar { height: 62%; }
.row.is-active .row__num { color: var(--copper); }
.row.is-active .row__icon { color: var(--copper); transform: scale(1.08); }

/* -------------------------------------------------------- panel */
.panel {
  position: relative;
  padding: clamp(20px, 2.4vw, 30px);
  border: 1px solid var(--hair);
  border-radius: 22px;
  background: linear-gradient(165deg, var(--surface), var(--surface));
  box-shadow: inset 0 1px 0 var(--hi), var(--shadow-card);
  overflow: hidden;
}
.panel::after {
  content: '';
  position: absolute;
  inset: -40% -10% auto;
  height: 60%;
  background: radial-gradient(50% 60% at 50% 0%, rgba(0, 105, 254, 0.16), transparent 70%);
  pointer-events: none;
}
.panel__num { color: var(--copper); }
.panel__title {
  margin-top: 10px;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.2vw, 1.95rem);
  font-weight: 500;
  letter-spacing: -0.03em;
}
.panel__blurb { margin-top: 12px; font-size: 15px; line-height: 1.6; color: var(--ink-soft); max-width: 54ch; }

.swap-enter-active, .swap-leave-active { transition: opacity 0.4s var(--ease-out), transform 0.5s var(--ease-out); }
.swap-enter-from { opacity: 0; transform: translateY(14px); }
.swap-leave-to { opacity: 0; transform: translateY(-10px); }

/* -------------------------------------------------------- stage */
.stage {
  position: relative;
  margin-top: 22px;
  padding: 16px;
  border: 1px solid var(--hair-soft);
  border-radius: 16px;
  background: var(--ground-deep);
  min-height: 232px;
  display: grid;
  place-items: center;
}

.frame { width: 100%; max-width: 420px; }
.frame__bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 11px;
  border: 1px solid var(--hair-soft);
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
  background: var(--tint);
}
.frame__bar i { width: 7px; height: 7px; border-radius: 999px; background: var(--hair); }
.frame__bar i:first-child { background: var(--ember); }
.frame__url { flex: 1; height: 8px; margin-left: 8px; border-radius: 4px; background: var(--hair-soft); }
.frame__body {
  padding: 14px;
  border: 1px solid var(--hair-soft);
  border-radius: 0 0 10px 10px;
  background: linear-gradient(180deg, var(--tint), transparent);
  display: grid;
  gap: 12px;
}
.frame__body--split { grid-template-columns: 74px 1fr; gap: 12px; }

.w-hero { height: 62px; border-radius: 8px; background: linear-gradient(120deg, rgba(0, 105, 254, 0.5), rgba(125, 182, 255, 0.18)); }
.w-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.w-cards span { height: 34px; border-radius: 6px; background: var(--hair-soft); }
.w-lines { display: grid; gap: 7px; }
.w-lines i { height: 6px; border-radius: 3px; background: var(--hair-soft); }
.w-lines i:nth-child(1) { width: 82%; }
.w-lines i:nth-child(2) { width: 64%; }
.w-lines i:nth-child(3) { width: 44%; }

.a-side { display: grid; gap: 8px; align-content: start; }
.a-side i { height: 7px; border-radius: 3px; background: var(--hair-soft); }
.a-side i:first-child { background: linear-gradient(90deg, var(--blue), rgba(125, 182, 255, 0.3)); }
.a-main { display: grid; gap: 10px; }
.a-rows { display: grid; gap: 7px; }
.a-rows span { height: 12px; border-radius: 4px; background: var(--hair-soft); }
.a-rows span:nth-child(2) { width: 78%; }
.a-rows span:nth-child(3) { width: 56%; }
.a-form {
  padding: 10px;
  border: 1px dashed rgba(125, 182, 255, 0.35);
  border-radius: 8px;
  display: grid;
  gap: 6px;
}
.a-form i { height: 8px; border-radius: 3px; background: var(--hair-soft); }
.a-form em {
  width: 46px;
  height: 16px;
  border-radius: 999px;
  background: linear-gradient(96deg, var(--blue-deep), var(--blue));
  justify-self: start;
  margin-top: 2px;
}

.s-head { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.s-head i { height: 6px; border-radius: 3px; background: rgba(125, 182, 255, 0.4); }
.s-rows { display: grid; gap: 6px; }
.s-rows span {
  display: grid;
  grid-template-columns: 1fr 1fr 38px;
  gap: 8px;
  align-items: center;
}
.s-rows i { height: 9px; border-radius: 3px; background: var(--hair-soft); }
.s-rows em { height: 9px; border-radius: 999px; background: rgba(125, 182, 255, 0.35); }
.s-chart { display: flex; align-items: flex-end; gap: 6px; height: 56px; }
.s-chart b {
  flex: 1;
  height: var(--h);
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, rgba(125, 182, 255, 0.85), rgba(0, 105, 254, 0.15));
  animation: grow 3.4s var(--ease-in-out) infinite alternate;
}
.s-chart b:nth-child(2n) { animation-delay: 0.4s; }
.s-chart b:nth-child(3n) { animation-delay: 0.8s; }
@keyframes grow { from { transform: scaleY(0.7); } to { transform: scaleY(1); } }

.net { width: 100%; max-width: 340px; }
.net__links path {
  fill: none;
  stroke: rgba(125, 182, 255, 0.3);
  stroke-width: 1;
  stroke-dasharray: 4 6;
  animation: dash 6s linear infinite;
}
@keyframes dash { to { stroke-dashoffset: -100; } }
.net__nodes circle { fill: rgba(125, 182, 255, 0.9); }
.net__pulse { fill: #eaf1ff; }
.net__pulse { animation: pulse 3s var(--ease-in-out) infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.2; r: 3; } 50% { opacity: 1; r: 6; } }
.ai-chips { display: flex; gap: 8px; margin-top: 12px; justify-content: center; }
.ai-chips span {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 6px 11px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  color: var(--ink-faint);
}

.g-wrap { width: 100%; max-width: 420px; display: grid; gap: 14px; }
.g-bars { display: flex; align-items: flex-end; gap: 7px; height: 96px; }
.g-bars b {
  flex: 1;
  height: var(--h);
  border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, rgba(125, 182, 255, 0.9), rgba(0, 105, 254, 0.12));
  transform-origin: bottom;
  animation: bob 3s var(--ease-in-out) infinite alternate;
}
.g-bars b:nth-child(2n) { animation-delay: 0.3s; }
.g-bars b:nth-child(3n) { animation-delay: 0.6s; }
@keyframes bob { from { transform: scaleY(0.78); } to { transform: scaleY(1); } }
.g-line { width: 100%; height: 46px; }
.g-line path { fill: none; stroke: var(--ember-lit); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 400; animation: draw 4s var(--ease-in-out) infinite; }
@keyframes draw { 0% { stroke-dashoffset: 400; } 60%, 100% { stroke-dashoffset: 0; } }
.g-pills { display: flex; gap: 8px; justify-content: center; }
.g-pills span {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.panel__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.panel__tags li {
  font-size: 12.5px;
  padding: 7px 13px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--tint);
  transition: border-color 0.3s, color 0.3s;
}
.panel__tags li:hover { border-color: rgba(0, 105, 254, 0.5); color: var(--ink); }
.panel__note {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--hair-soft);
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-faint);
}
.panel__note svg { flex: none; margin-top: 2px; color: var(--copper); }

/* --------------------------------------------------- responsive */
@media (max-width: 940px) {
  .explorer__grid { grid-template-columns: 1fr; }
  .row { padding: 16px 14px; }
  .row.is-active { transform: none; }
  .row__icon { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .net__links path, .net__pulse, .s-chart b, .g-bars b, .g-line path { animation: none; }
}
</style>

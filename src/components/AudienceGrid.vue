<script setup>
const groups = [
  { tag: 'A', title: 'Businesses', copy: 'Websites, systems, automation and digital presence.' },
  { tag: 'B', title: 'Startups', copy: 'MVPs, applications, platforms, AI products and SaaS concepts.' },
  { tag: 'C', title: 'Professionals', copy: 'Websites, portfolios, personal digital products and online presence.' },
  { tag: 'D', title: 'Growing companies', copy: 'CRM, ERP, dashboards, integrations and custom software.' }
]

function track(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--cx', (e.clientX - r.left) + 'px')
  el.style.setProperty('--cy', (e.clientY - r.top) + 'px')
}
</script>

<template>
  <section class="section section--tight section--rule">
    <div class="shell">
      <div class="sec-head" v-reveal>
        <div>
          <p class="sec-head__num mono"><b>08</b><span>Who we work with</span></p>
          <h2 class="display">Technology for businesses at every stage.</h2>
        </div>
      </div>

      <div class="grid">
        <article
          v-for="(g, i) in groups"
          :key="g.title"
          class="cell"
          v-reveal="{ delay: i * 70 }"
          @mousemove="track"
        >
          <span class="cell__glow" aria-hidden="true"></span>
          <span class="cell__tag mono">{{ g.tag }}</span>
          <h3 class="cell__title">{{ g.title }}</h3>
          <p class="cell__copy">{{ g.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--hair-soft);
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(165deg, var(--surface), var(--surface));
}

.cell {
  position: relative;
  padding: clamp(22px, 2.4vw, 32px);
  border-right: 1px solid var(--hair-soft);
  min-height: 210px;
  display: grid;
  align-content: start;
  gap: 12px;
  overflow: hidden;
  isolation: isolate;
  transition: background-color 0.5s var(--ease-out);
}
.cell:last-child { border-right: 0; }

.cell__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(260px circle at var(--cx, 50%) var(--cy, 50%), rgba(0, 105, 254, 0.14), transparent 68%);
  opacity: 0;
  transition: opacity 0.5s var(--ease-out);
}
.cell:hover .cell__glow { opacity: 1; }

.cell__tag { color: var(--ink-faint); transition: color 0.4s; }
.cell:hover .cell__tag { color: var(--copper); }
.cell__title {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  font-weight: 500;
  letter-spacing: -0.03em;
}
.cell__copy { font-size: 14px; line-height: 1.6; color: var(--ink-faint); }

@media (max-width: 940px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .cell:nth-child(2n) { border-right: 0; }
  .cell:nth-child(-n + 2) { border-bottom: 1px solid var(--hair-soft); }
  .cell { min-height: 170px; }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
  .cell { border-right: 0; border-bottom: 1px solid var(--hair-soft); min-height: 0; }
  .cell:last-child { border-bottom: 0; }
}
</style>

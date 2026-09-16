<script setup>
import { projects } from '../data/projects.js'
</script>

<template>
  <section id="work" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Featured work</span>
        <h2>Things we've built.</h2>
      </div>

      <div class="list">
        <article v-for="p in projects" :key="p.index" class="case">
          <div class="case-info">
            <div>
              <span class="tag mono">{{ p.category }}</span>
              <h3>{{ p.title }}</h3>
              <p class="desc">{{ p.description }}</p>
              <p class="type mono">{{ p.type }}</p>
            </div>
            <a v-if="p.link" :href="p.link" class="case-link" target="_blank" rel="noopener">
              View case study <span class="arrow">→</span>
            </a>
            <span v-else class="case-link disabled">Case study coming soon</span>
          </div>

          <div class="case-visual">
            <div class="mockup">
              <div class="mockup-bar"><i></i><i></i><i></i></div>
              <div class="mockup-body">
                <div class="mockup-side">
                  <div class="s1"></div><div></div><div></div><div></div><div></div>
                </div>
                <div class="mockup-main">
                  <div class="stat"><div class="n">{{ 120 + p.index * 34 }}</div><div class="l">Records</div></div>
                  <div class="stat"><div class="n">{{ 80 + p.index * 3 }}%</div><div class="l">Uptime</div></div>
                  <div class="stat"><div class="n">{{ p.index }}</div><div class="l">Modules</div></div>
                  <div class="chart">
                    <div v-for="n in 8" :key="n" :style="{ height: (25 + ((n * 13 + p.index * 7) % 65)) + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-head {
  margin-bottom: 48px;
}

.section-head .eyebrow {
  margin-bottom: 18px;
}

.section-head h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.01em;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.case {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.case:hover {
  border-color: var(--accent-soft);
  transform: translateY(-3px);
}

.case-info {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid var(--glass-border-soft);
}

.tag {
  display: block;
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.case-info h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 12px;
}

.desc {
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 14px;
}

.type {
  color: var(--text-dim);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.case-link {
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}

.case-link.disabled {
  color: var(--text-dim);
  font-weight: 400;
}

.arrow {
  transition: transform 0.2s ease;
}

.case-link:hover .arrow {
  transform: translateX(6px);
}

.case-visual {
  padding: 20px;
  background: rgba(232, 211, 192, 0.32);
}

.mockup {
  background: rgba(255, 250, 243, 0.45);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border-soft);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.mockup-bar {
  display: flex;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--glass-border-soft);
}

.mockup-bar i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line-strong);
  display: block;
}

.mockup-body {
  padding: 18px;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 14px;
}

.mockup-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mockup-side div {
  height: 7px;
  border-radius: 2px;
  background: var(--line-strong);
}

.mockup-side .s1 {
  background: var(--accent);
  width: 70%;
}

.mockup-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat {
  background: rgba(255, 250, 243, 0.52);
  border: 1px solid var(--glass-border-soft);
  border-radius: 8px;
  padding: 10px;
}

.stat .n {
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--accent);
  margin-bottom: 4px;
}

.stat .l {
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chart {
  grid-column: span 3;
  background: rgba(255, 250, 243, 0.52);
  border: 1px solid var(--glass-border-soft);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 60px;
}

.chart div {
  flex: 1;
  background: var(--accent);
  opacity: 0.55;
  border-radius: 1px;
}

@media (min-width: 860px) {
  .case {
    grid-template-columns: 1fr 1.25fr;
  }
  .case-info {
    border-bottom: none;
    border-right: 1px solid var(--line);
  }
}
</style>

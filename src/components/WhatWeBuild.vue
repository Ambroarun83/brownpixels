<script setup>
import { services } from '../data/services.js'
</script>

<template>
  <section id="services" class="section">
    <div class="container">
      <div class="section-head">
        <h2>Not just websites.</h2>
        <p>From your first digital presence to the systems running your business, we build technology around real requirements.</p>
      </div>

      <div class="grid">
        <article v-for="s in services" :key="s.id" class="card">
          <span class="idx mono">{{ s.id }}</span>
          <h3>{{ s.title }}</h3>
          <p class="summary">{{ s.summary }}</p>
          <p class="detail">{{ s.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-head {
  max-width: 640px;
  margin-bottom: 56px;
}

.section-head h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.01em;
  margin-bottom: 16px;
}

.section-head p {
  color: var(--text-dim);
  font-size: 15.5px;
  line-height: 1.65;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.card {
  padding: 34px 28px;
  position: relative;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  background: var(--glass-bg-strong);
  border-color: var(--accent-soft);
  transform: translateY(-4px);
}

.idx {
  display: block;
  color: var(--accent);
  font-size: 13px;
  margin-bottom: 20px;
}

.card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 12px;
}

.summary {
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.6;
}

.detail {
  margin-top: 12px;
  color: var(--text-dim);
  font-size: 13px;
  line-height: 1.6;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  border-top: 1px solid var(--glass-border-soft);
  padding-top: 0;
}

.card:hover .detail {
  max-height: 100px;
  opacity: 1;
  padding-top: 12px;
  margin-top: 12px;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 980px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

<script setup>
import { realClients, placeholderClients } from '../data/clients.js'
</script>

<template>
  <section id="clients" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Our clients</span>
        <h2>Teams we've worked with.</h2>
      </div>

      <div class="grid">
        <a
          v-for="c in realClients"
          :key="c.name"
          :href="c.url"
          target="_blank"
          rel="noopener"
          class="tile live"
        >
          <span class="name">{{ c.name }}</span>
          <span class="note mono">{{ c.note }} ↗</span>
        </a>

        <div v-for="c in placeholderClients" :key="c.name" class="tile placeholder">
          <span class="name">{{ c.name }}</span>
          <span class="note mono">Placeholder</span>
        </div>
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

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.tile {
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.tile.live:hover {
  background: var(--glass-bg-strong);
  border-color: var(--accent-soft);
  transform: translateY(-3px);
}

.name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
}

.note {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}

.tile.placeholder {
  opacity: 0.45;
}

.tile.placeholder .note {
  color: var(--text-dim);
}

@media (min-width: 720px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 980px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>

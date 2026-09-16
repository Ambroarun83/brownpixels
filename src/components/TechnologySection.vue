<script setup>
import { technologyGroups } from '../data/technology.js'
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Built with the right technology.</h2>
        <p>Technology should support how we work, not define it. This is the stack we reach for most.</p>
      </div>

      <div class="groups">
        <div v-for="group in technologyGroups" :key="group.label" class="group glass">
          <span class="label mono">{{ group.label }}</span>
          <div class="chips">
            <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-head {
  max-width: 560px;
  margin-bottom: 48px;
}

.section-head h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.01em;
  margin-bottom: 14px;
}

.section-head p {
  color: var(--text-dim);
  font-size: 15px;
  line-height: 1.6;
}

.groups {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.group {
  padding: 26px 24px;
}

.label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--text-dim);
}

@media (min-width: 800px) {
  .groups {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
}
</style>

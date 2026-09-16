<script setup>
import { ref, onMounted } from 'vue'
import { approachSteps } from '../data/approach.js'

const visible = ref(new Set())
const refs = ref([])

onMounted(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value.add(entry.target.dataset.id)
          visible.value = new Set(visible.value)
        }
      })
    },
    { threshold: 0.35 }
  )
  refs.value.forEach((el) => el && obs.observe(el))
})
</script>

<template>
  <section id="approach" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Our approach</span>
        <h2>How a project moves.</h2>
      </div>

      <div class="timeline">
        <div
          v-for="(step, i) in approachSteps"
          :key="step.id"
          :ref="(el) => (refs[i] = el)"
          :data-id="step.id"
          class="step"
          :class="{ in: visible.has(step.id) }"
        >
          <span class="id mono">{{ step.id }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
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

.timeline {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.step {
  padding: 30px 26px;
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease;
}

.step.in:hover {
  border-color: var(--accent-soft);
}

.step.in {
  opacity: 1;
  transform: translateY(0);
}

.id {
  display: block;
  color: var(--accent);
  font-size: 13px;
  margin-bottom: 10px;
}

.step h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 8px;
}

.step p {
  color: var(--text-dim);
  font-size: 14.5px;
  line-height: 1.6;
  max-width: 420px;
}

@media (min-width: 900px) {
  .timeline {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

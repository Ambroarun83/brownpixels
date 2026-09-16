<script setup>
const categories = ['Businesses', 'Startups', 'Professionals', 'Organizations', 'Growing Teams']
</script>

<template>
  <section class="section">
    <div class="container split">
      <div>
        <h2>For businesses that have something to build.</h2>
        <p class="support">
          Whether you need a stronger digital presence, a custom internal system or a product built from scratch,
          we start with what your business actually needs.
        </p>
      </div>
      <ul class="tags">
        <li v-for="c in categories" :key="c">{{ c }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(26px, 4vw, 38px);
  line-height: 1.2;
  letter-spacing: -0.01em;
  max-width: 480px;
}

.support {
  margin-top: 18px;
  color: var(--text-dim);
  font-size: 15px;
  line-height: 1.65;
  max-width: 440px;
}

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-content: flex-start;
}

.tags li {
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 13.5px;
  color: var(--text);
}

@media (min-width: 900px) {
  .split {
    grid-template-columns: 1.1fr 1fr;
    gap: 60px;
  }
}
</style>

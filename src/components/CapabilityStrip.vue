<script setup>
const items = ['Websites', 'Web Apps', 'Business Systems', 'APIs', 'Automation', 'AI']
</script>

<template>
  <div class="container">
    <div class="strip glass" role="presentation">
      <div class="track">
        <span v-for="(item, i) in [...items, ...items]" :key="i" class="item mono">
          {{ item }}
          <i aria-hidden="true">✦</i>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.strip {
  overflow: hidden;
  padding: 16px 28px;
  margin: 24px 0 0;
}

.track {
  display: flex;
  gap: 48px;
  width: max-content;
  animation: scroll 22s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}

.item {
  font-size: 12.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 24px;
  white-space: nowrap;
}

.item i {
  color: var(--accent);
  font-style: normal;
  font-size: 10px;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>

<script setup>
const items = [
  'Websites & web experiences',
  'Custom web applications',
  'Business software',
  'CRM & ERP',
  'Dashboards & portals',
  'Workflow automation',
  'APIs & third-party integrations',
  'Real-time applications',
  'AI-powered applications',
  'SaaS & product development',
  'Digital marketing support',
  'Google Business Profile'
]
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">
      <div v-for="(item, i) in items" :key="'a' + i" class="ticker__item">
        {{ item }}<span class="ticker__dot"></span>
      </div>
      <div v-for="(item, i) in items" :key="'b' + i" class="ticker__item">
        {{ item }}<span class="ticker__dot"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  position: relative;
  overflow: hidden;
  padding-block: 15px;
  border-block: 1px solid var(--hair-soft);
  background: linear-gradient(90deg, rgba(0, 105, 254, 0.04), rgba(125, 182, 255, 0.02));
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}
.ticker__track {
  display: flex;
  width: max-content;
  animation: slide 46s linear infinite;
}
.ticker:hover .ticker__track { animation-play-state: paused; }
.ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding-inline: 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  white-space: nowrap;
}
.ticker__dot {
  width: 5px;
  height: 5px;
  background: var(--blue);
  transform: rotate(45deg);
  flex: none;
}
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>

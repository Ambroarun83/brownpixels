<script setup>
const stages = ['Idea', 'Design', 'Software', 'System', 'Growth']
const chips = [
  'Digital presence',
  'Business applications',
  'Internal systems',
  'Automation',
  'AI',
  'Integrations',
  'Digital growth'
]
</script>

<template>
  <section class="section section--tight section--band chain-sec">
    <div class="shell">
      <div class="sec-head" v-reveal>
        <div>
          <p class="sec-head__num mono"><b>03</b><span>More than a website</span></p>
          <h2 class="display">Your business is more than a website.</h2>
        </div>
        <p class="lede">
          A website may be the starting point. The real opportunity is building the digital tools,
          systems and experiences around it.
        </p>
      </div>

      <div class="chain" v-reveal="{ delay: 80 }">
  <div class="chain__line" aria-hidden="true"><span class="chain__spark"></span></div>
  <ol class="chain__nodes">
    <li v-for="(s, i) in stages" :key="s" :style="{ '--i': i }">
      <span class="chain__node" aria-hidden="true"></span>
      <div class="chain__content">
        <span class="chain__label">{{ s }}</span>
        <!-- <span class="chain__idx mono">0{{ i + 1 }}</span> -->
      </div>
    </li>
  </ol>
</div>
      <ul class="chain__chips" v-reveal="{ delay: 140 }">
        <li v-for="c in chips" :key="c">{{ c }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.chain { position: relative; margin-top: 8px; }

.chain__line {
  position: absolute;
  left: 0;
  right: 0;
  top: 15px;
  height: 1px;
  background: var(--hair);
  overflow: hidden;
}
.chain__spark {
  position: absolute;
  top: -1px;
  left: 0;
  width: 90px;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, transparent, var(--blue-deep), var(--blue), transparent);
  animation: travel 5s var(--ease-in-out) infinite;
}
@keyframes travel {
  0% { transform: translateX(-100px); opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { transform: translateX(calc(100vw - 40px)); opacity: 0; }
}

.chain__nodes {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chain__nodes li { min-width: 0; display: grid; justify-items: start; gap: 10px; }
.chain__node {
  width: 31px;
  height: 31px;
  border: 1px solid var(--hair);
  border-radius: 9px;
  background: var(--surface-2);
  position: relative;
  transform: rotate(45deg);
  transition: border-color 0.4s var(--ease-out), background-color 0.4s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}
.chain__node::after {
  content: '';
  position: absolute;
  inset: 9px;
  border-radius: 2px;
  background: var(--hair);
  transition: background-color 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}
.chain__nodes li:hover .chain__node,
.chain__nodes li:nth-child(1) .chain__node {
  border-color: rgba(125, 182, 255, 0.6);
}
.chain__nodes li:nth-child(1) .chain__node::after {
  background: linear-gradient(135deg, var(--blue-deep), var(--blue));
  box-shadow: 0 0 18px rgba(125, 182, 255, 0.6);
}
.chain__nodes li:hover .chain__node::after {
  background: var(--blue-lit);
  box-shadow: 0 0 16px rgba(125, 182, 255, 0.5);
}

.chain__label {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.8vw, 1.6rem);
  font-weight: 500;
  letter-spacing: -0.03em;
}
.chain__idx { color: var(--ink-faint); }

.chain__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 42px;
  padding-top: 26px;
  border-top: 1px solid var(--hair-soft);
}
.chain__chips li {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 9px 15px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  transition: border-color 0.35s var(--ease-out), color 0.35s var(--ease-out),
    background-color 0.35s var(--ease-out), transform 0.35s var(--ease-out);
}
.chain__chips li:hover {
  border-color: rgba(125, 182, 255, 0.45);
  background: rgba(0, 105, 254, 0.07);
  color: var(--ink);
  transform: translateY(-2px);
}

@media (max-width: 860px) {
  .chain__line { display: none; }
  .chain__nodes { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 16px; }
}
@media (max-width: 460px) {
  .chain__nodes { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .chain__nodes li {
    grid-template-columns: 31px minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 14px;
  }
  .chain__nodes li > * { grid-row: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .chain__spark { display: none; }
}
</style>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const statement =
  'Brown Pixels is a digital products and software company focused on turning ideas, business processes and real-world problems into useful technology.'

const second =
  'We combine design, engineering, modern technology and practical business thinking to build digital products that are clear, reliable and designed to evolve.'

const words = computed(() => statement.split(' ').map((w, i) => ({ w, i })))

const why = [
  'Solutions built around the business',
  'Flexible technology choices',
  'Custom development',
  'Modern technology and AI readiness',
  'Clear communication',
  'Practical problem solving',
  'Scalable foundations',
  'Long-term product thinking'
]

const facts = [
  { k: 'Focus', v: 'Digital products, software and AI-enabled systems' },
  { k: 'Engagement', v: 'Project builds, ongoing product work and long-term support' },
  { k: 'Technology', v: 'Chosen per product — no single locked-in stack' },
  { k: 'Working style', v: 'Direct communication, clear scope, practical problem solving' }
]
</script>

<template>
  <section id="about" class="section section--rule about">
    <div class="shell">
      <div class="about__top">
        <div v-reveal>
          <p class="sec-head__num mono"><b>09</b><span>About</span></p>
          <h2 class="display about__title">Small studio.<br /><em>Serious software.</em></h2>
        </div>

        <div class="manifesto" v-reveal="{ delay: 80 }">
          <p class="manifesto__lead">
            <span v-for="item in words" :key="item.i" class="word" :style="{ '--i': item.i }">{{ item.w }} </span>
          </p>
          <p class="manifesto__sub">{{ second }}</p>
        </div>
      </div>

      <div class="facts" v-reveal="{ delay: 120 }">
        <div v-for="f in facts" :key="f.k" class="fact">
          <dt class="mono">{{ f.k }}</dt>
          <dd>{{ f.v }}</dd>
        </div>
      </div>

      <div class="why" v-reveal>
        <h3 class="why__title">
          <AppIcon name="spark" :size="20" />
          Why Brown Pixels
        </h3>
        <ul class="why__list">
          <li v-for="w in why" :key="w">
            <AppIcon name="check" :size="15" />
            <span>{{ w }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__top {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(26px, 4vw, 64px);
  align-items: start;
}
.about__title { font-size: clamp(2rem, 1rem + 4vw, 3.8rem); }
.about__title em { color: var(--copper); }

/* word-by-word reveal */
.manifesto__lead {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1.5vw, 1.65rem);
  font-weight: 400;
  line-height: 1.42;
  letter-spacing: -0.025em;
  color: var(--ink);
}
.word {
  opacity: 0.18;
  transform: translateY(6px);
  display: inline-block;
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  transition-delay: calc(var(--i) * 26ms);
}
.reveal.is-in .word, .manifesto.is-in .word { opacity: 1; transform: none; }
.manifesto__sub { margin-top: 20px; font-size: 15.5px; line-height: 1.66; color: var(--ink-soft); max-width: 62ch; }

.facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin-top: clamp(40px, 5vw, 68px);
  background: var(--hair-soft);
  border: 1px solid var(--hair-soft);
  border-radius: 16px;
  overflow: hidden;
}
.fact { padding: 20px 22px; background: var(--ground-deep); }
.fact dt { color: var(--copper); margin-bottom: 8px; }
.fact dd { font-size: 14px; line-height: 1.55; color: var(--ink-soft); }

.why { margin-top: clamp(40px, 5vw, 68px); }
.why__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--copper);
}
.why__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px 40px;
  margin-top: 20px;
}
.why__list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--hair-soft);
  font-size: 15px;
  color: var(--ink-soft);
  transition: color 0.35s var(--ease-out), transform 0.4s var(--ease-out);
}
.why__list li:hover { color: var(--ink); transform: translateX(4px); }
.why__list svg { flex: none; margin-top: 4px; color: var(--copper); }

@media (max-width: 940px) {
  .about__top { grid-template-columns: 1fr; }
  .facts { grid-template-columns: repeat(2, 1fr); }
  .why__list { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .facts { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .word { opacity: 1; transform: none; }
}
</style>

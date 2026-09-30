<script setup>
import AppIcon from './AppIcon.vue'

const google = [
  'Profile setup',
  'Optimization',
  'Business information updates',
  'Photos & posts',
  'Review-related support',
  'Local visibility support'
]

const marketing = [
  'Social media content & support',
  'Content planning',
  'Brand visuals',
  'Campaign support via service / partner network'
]
</script>

<template>
  <section class="section section--rule">
    <div class="shell">
      <div class="sec-head" v-reveal>
        <div>
          <p class="sec-head__num mono"><b>06</b><span>Digital presence &amp; Google</span></p>
          <h2 class="display">Build it. Make it visible.</h2>
        </div>
        <p class="lede">
          A strong digital presence is more than a website. We can also help businesses establish and
          improve their online presence through Google Business Profile and selected digital marketing
          services.
        </p>
      </div>

      <div class="grid">
        <!-- abstract profile mock: no ratings, no review counts -->
        <article class="card" v-reveal>
          <header class="card__head">
            <span class="card__tag mono">Google Business</span>
            <h3 class="card__title">Google Business Profile</h3>
          </header>

          <div class="mock screen" aria-hidden="true">
            <div class="mock__bar"><span class="mock__avatar"></span><span class="mock__lines"><i></i><i></i></span></div>
            <div class="mock__map">
              <span class="mock__pin"></span>
              <span class="mock__pulse"></span>
            </div>
            <ul class="mock__list">
              <li v-for="n in 3" :key="n"><i></i><em></em></li>
            </ul>
          </div>

          <ul class="card__list">
            <li v-for="g in google" :key="g"><AppIcon name="check" :size="15" />{{ g }}</li>
          </ul>
        </article>

        <article class="card card--lit" v-reveal="{ delay: 100 }">
          <header class="card__head">
            <span class="card__tag mono">Marketing support</span>
            <h3 class="card__title">Selected digital marketing</h3>
          </header>

          <div class="postgrid" aria-hidden="true">
            <span v-for="n in 6" :key="n" :style="{ '--d': (n - 1) * 0.5 + 's' }"></span>
          </div>

          <ul class="card__list">
            <li v-for="m in marketing" :key="m"><AppIcon name="check" :size="15" />{{ m }}</li>
          </ul>
        </article>
      </div>

      <p class="guarantee" v-reveal>
        <AppIcon name="info" :size="16" />
        <span>
          We do not guarantee Google rankings, leads, sales, search positions or review counts. We do
          the work properly and report honestly.
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 26px);
}

.card {
  position: relative;
  padding: clamp(22px, 2.4vw, 32px);
  border: 1px solid var(--hair);
  border-radius: 22px;
  background: linear-gradient(165deg, var(--surface), var(--surface));
  box-shadow: inset 0 1px 0 var(--hi);
  overflow: hidden;
}
.card--lit { background: linear-gradient(165deg, rgba(0, 105, 254, 0.12), var(--surface)); }
.card__tag { color: var(--copper); }
.card__title {
  margin-top: 12px;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.7vw, 1.55rem);
  font-weight: 500;
  letter-spacing: -0.03em;
}
.card__list { display: grid; gap: 11px; margin-top: 24px; }
.card__list li {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.card__list svg { flex: none; margin-top: 3px; color: var(--copper); }

/* abstract profile mock */
.mock {
  margin-top: 22px;
  padding: 14px;
  border: 1px solid var(--hair-soft);
  border-radius: 14px;
  background: #050b18;
  display: grid;
  gap: 12px;
}
.mock__bar { display: flex; align-items: center; gap: 10px; }
.mock__avatar {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--blue), rgba(125, 182, 255, 0.35));
  flex: none;
}
.mock__lines { display: grid; gap: 6px; flex: 1; }
.mock__lines i { height: 7px; border-radius: 3px; background: var(--hair-soft); }
.mock__lines i:last-child { width: 58%; }
.mock__map {
  position: relative;
  height: 92px;
  border-radius: 10px;
  background:
    linear-gradient(90deg, var(--tint) 1px, transparent 1px) 0 0 / 22px 22px,
    linear-gradient(0deg, var(--tint) 1px, transparent 1px) 0 0 / 22px 22px,
    linear-gradient(140deg, rgba(0, 105, 254, 0.12), var(--surface));
  overflow: hidden;
}
.mock__pin {
  position: absolute;
  left: 46%;
  top: 44%;
  width: 12px;
  height: 12px;
  border-radius: 999px 999px 999px 2px;
  background: var(--blue-lit);
  transform: rotate(-45deg);
  box-shadow: 0 6px 16px rgba(5, 11, 24, 0.16);
}
.mock__pulse {
  position: absolute;
  left: 46%;
  top: 44%;
  width: 40px;
  height: 40px;
  margin: -14px 0 0 -14px;
  border: 1px solid rgba(125, 182, 255, 0.6);
  border-radius: 999px;
  animation: ring 2.8s var(--ease-out) infinite;
}
@keyframes ring {
  0% { transform: scale(0.3); opacity: 0.9; }
  100% { transform: scale(1.5); opacity: 0; }
}
.mock__list { display: grid; gap: 8px; }
.mock__list li { display: flex; align-items: center; gap: 9px; }
.mock__list i {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  border: 1px solid rgba(125, 182, 255, 0.5);
  flex: none;
}
.mock__list em { height: 7px; flex: 1; border-radius: 3px; background: var(--hair-soft); }

/* post grid */
.postgrid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.postgrid span {
  aspect-ratio: 4 / 5;
  border-radius: 10px;
  background: linear-gradient(160deg, rgba(125, 182, 255, 0.22), var(--tint));
  border: 1px solid var(--hair-soft);
  animation: fadey 4s var(--ease-in-out) infinite alternate;
  animation-delay: var(--d);
}
@keyframes fadey { from { opacity: 0.45; transform: translateY(3px); } to { opacity: 1; transform: none; } }

.guarantee {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 26px;
  padding: 16px 20px;
  border: 1px dashed rgba(0, 105, 254, 0.35);
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-faint);
}
.guarantee svg { flex: none; margin-top: 3px; color: var(--copper); }

@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .mock__pulse, .postgrid span { animation: none; }
}
</style>

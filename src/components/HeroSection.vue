<script setup>
import { ref } from 'vue'

const panel = ref(null)
const shape = ref(null)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onMove(e) {
  if (reduceMotion || !panel.value || !shape.value) return
  const r = panel.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  shape.value.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`
}

function onLeave() {
  if (!shape.value) return
  shape.value.style.transform = 'rotateY(0) rotateX(0)'
}
</script>

<template>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Digital Products &amp; Software</p>
        <h1 class="headline">
          <span class="line"><span>We turn ideas</span></span>
          <span class="line"><span>into software.</span></span>
        </h1>
        <p class="sub">
          Websites, custom applications and business systems built around the way your business actually works.
        </p>
        <div class="cta-row">
          <a href="#contact" class="btn btn-primary">Start a Project</a>
          <a href="#work" class="btn btn-secondary">Explore Our Work</a>
        </div>
        <p class="tech-line mono">Web / Apps / Systems / Automation</p>
      </div>

      <div ref="panel" class="hero-panel glass" @mousemove="onMove" @mouseleave="onLeave">
        <img ref="shape" src="/assets/logo-icon.png" alt="Brown Pixels geometric mark" class="hero-shape" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 72px 0 64px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

.hero-copy {
  max-width: 620px;
}

.eyebrow {
  margin-bottom: 26px;
}

.headline {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(38px, 9vw, 74px);
  line-height: 1.04;
  letter-spacing: -0.01em;
  overflow: hidden;
}

.line {
  display: block;
  overflow: hidden;
}

.line span {
  display: block;
  transform: translateY(110%);
  opacity: 0;
  animation: rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.line:nth-child(2) span {
  animation-delay: 0.08s;
  color: var(--accent);
}

@keyframes rise {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.sub {
  margin-top: 26px;
  font-size: 16.5px;
  line-height: 1.65;
  color: var(--text-dim);
  max-width: 460px;
  opacity: 0;
  animation: fadeIn 0.6s ease 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.cta-row {
  margin-top: 38px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  opacity: 0;
  animation: fadeIn 0.6s ease 0.62s forwards;
}

.tech-line {
  margin-top: 46px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
  opacity: 0;
  animation: fadeIn 0.6s ease 0.74s forwards;
}

.hero-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  perspective: 700px;
  min-height: 260px;
  position: relative;
}

.hero-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  background: radial-gradient(circle at 50% 30%, var(--accent-soft), transparent 65%);
  opacity: 0.6;
  pointer-events: none;
}

.hero-shape {
  width: 55%;
  max-width: 220px;
  transition: transform 0.15s ease-out;
  will-change: transform;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
  position: relative;
  z-index: 1;
}

@media (min-width: 900px) {
  .hero {
    padding: 100px 0 90px;
  }
  .hero-grid {
    grid-template-columns: 1.35fr 1fr;
    gap: 60px;
  }
  .hero-panel {
    min-height: 420px;
  }
}
</style>

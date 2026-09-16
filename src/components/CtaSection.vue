<script setup>
import { siteConfig } from '../config.js'

const waLink = `https://wa.me/${siteConfig.whatsappNumber}`
</script>

<template>
  <section class="cta">
    <div class="container">
    <div class="cta-inner glass">
      <h2>Have something worth building?</h2>
      <p>Tell us what you're trying to build, improve or simplify.</p>
      <div class="cta-row">
        <a href="#contact" class="btn btn-primary">Start a Project</a>
        <a :href="waLink" target="_blank" rel="noopener" class="btn btn-secondary">WhatsApp Us</a>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 40px 0 88px;
  text-align: center;
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 32px;
  position: relative;
  overflow: hidden;
}

.cta-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--accent-soft), transparent 60%);
  opacity: 0.5;
  pointer-events: none;
}

.cta-inner > * {
  position: relative;
  z-index: 1;
}

h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(30px, 5.2vw, 56px);
  letter-spacing: -0.01em;
  max-width: 640px;
}

p {
  margin-top: 18px;
  color: var(--text-dim);
  font-size: 16px;
}

.cta-row {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
</style>

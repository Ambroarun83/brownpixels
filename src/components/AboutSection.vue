<script setup></script>

<template>
  <section id="about" class="section">
    <div class="container about-wrap">
      <h2>Small studio.<br />Serious software.</h2>
      <div class="copy">
        <p>
          Brown Pixels is a digital product and software studio focused on building thoughtful digital
          experiences, practical business systems and custom software.
        </p>
        <p>
          From the first idea to deployment and beyond, we combine design, engineering and business
          understanding to build technology that is useful — not just impressive.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-wrap {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(30px, 4.6vw, 46px);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.copy p {
  color: var(--text-dim);
  font-size: 15.5px;
  line-height: 1.7;
  max-width: 480px;
}

.copy p + p {
  margin-top: 16px;
}

@media (min-width: 900px) {
  .about-wrap {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
}
</style>

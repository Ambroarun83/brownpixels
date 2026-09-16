<script setup></script>

<template>
  <section class="section">
    <div class="container split">
      <div class="copy">
        <h2>Technology should fit the business.<br />Not the other way around.</h2>
      </div>
      <div class="support">
        <p>
          Every business has its own processes, people and problems. We don't force those into a template.
          We understand how the work happens, then build the technology around it.
        </p>
        <svg class="diagram" viewBox="0 0 260 160" fill="none" aria-hidden="true">
          <rect x="8" y="8" width="90" height="50" stroke="var(--line-strong)" />
          <rect x="8" y="70" width="90" height="82" stroke="var(--line-strong)" />
          <rect x="150" y="8" width="102" height="144" stroke="var(--accent)" />
          <line x1="98" y1="33" x2="150" y2="33" stroke="var(--line-strong)" />
          <line x1="98" y1="111" x2="150" y2="111" stroke="var(--line-strong)" />
          <circle cx="150" cy="33" r="3" fill="var(--accent)" />
          <circle cx="150" cy="111" r="3" fill="var(--text-dim)" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.copy h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 4.4vw, 44px);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.support p {
  color: var(--text-dim);
  font-size: 15.5px;
  line-height: 1.7;
  max-width: 440px;
}

.diagram {
  margin-top: 32px;
  width: 100%;
  max-width: 260px;
}

@media (min-width: 900px) {
  .split {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
}
</style>

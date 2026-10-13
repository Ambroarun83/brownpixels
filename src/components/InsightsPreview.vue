<script setup>
import { INSIGHT_ARTICLES } from '../insights.js'
</script>

<template>
  <section class="section section--band insights-preview" aria-labelledby="insights-preview-title">
    <div class="shell">
      <div class="sec-head">
        <div>
          <p class="sec-head__num mono"><b>Insights</b><span>Useful ideas, clearly explained</span></p>
          <h2 id="insights-preview-title" class="display">Make the next decision with confidence.</h2>
        </div>
        <p class="lede">
          Practical guides to website planning, local visibility and business software — written for
          the questions that come before a project.
        </p>
      </div>
      <div class="insights-preview__grid">
        <article v-for="article in INSIGHT_ARTICLES" :key="article.slug" class="insights-preview__card">
          <p class="mono">{{ article.category }}</p>
          <h3><a :href="article.path">{{ article.title }}</a></h3>
          <p>{{ article.excerpt }}</p>
          <a class="link" :href="article.path">Read the guide <span aria-hidden="true">→</span></a>
        </article>
      </div>
      <a class="link insights-preview__all" href="/insights/">Browse all Insights <span aria-hidden="true">→</span></a>
    </div>
  </section>
</template>

<style scoped>
.insights-preview__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 34px; }
.insights-preview__card { display: flex; flex-direction: column; align-items: flex-start; padding: clamp(20px, 2.5vw, 28px); border: 1px solid var(--hair); border-radius: 18px; background: var(--surface); }
.insights-preview__card > p:first-child { color: var(--copper); }
.insights-preview__card h3 { margin-top: 14px; font: 500 clamp(1.2rem, 1.6vw, 1.55rem)/1.15 var(--font-display); letter-spacing: -0.025em; }
.insights-preview__card h3 a:hover { color: var(--blue-deep); }
.insights-preview__card > p:nth-of-type(2) { margin-top: 12px; color: var(--ink-soft); font-size: 14px; line-height: 1.65; }
.insights-preview__card .link { margin-top: auto; padding-top: 20px; }
.insights-preview__all { display: inline-flex; gap: 8px; margin-top: 26px; }
@media (max-width: 850px) { .insights-preview__grid { grid-template-columns: 1fr; } }
</style>

<script setup>
import { INSIGHT_ARTICLES } from '../insights.js'

const featured = INSIGHT_ARTICLES[0]
const articles = INSIGHT_ARTICLES.slice(1)
</script>

<template>
  <div class="insights">
    <header class="insights__hero theme-dark">
      <div class="shell">
        <p class="eyebrow">Brown Pixels / Insights</p>
        <h1 class="display">Practical ideas for your next business decision.</h1>
        <p class="lede">
          Clear guides for growing businesses planning better websites, useful software and
          thoughtful automation. Written for decisions you can act on, not promises of rankings.
        </p>
        <a class="btn btn--flame" href="/#contact">Discuss a project</a>
      </div>
    </header>

    <section class="section">
      <div class="shell">
        <p class="eyebrow">Featured guide / {{ featured.category }}</p>
        <a class="insights__featured" :href="featured.path">
          <div>
            <h2 class="display">{{ featured.title }}</h2>
            <p class="lede">{{ featured.excerpt }}</p>
            <span class="link">Read the guide <span aria-hidden="true">→</span></span>
          </div>
          <span class="insights__feature-mark" aria-hidden="true">01</span>
        </a>
      </div>
    </section>

    <section class="section section--band">
      <div class="shell">
        <div class="sec-head">
          <div>
            <p class="sec-head__num mono"><b>{{ INSIGHT_ARTICLES.length }}</b><span>Practical guides</span></p>
            <h2 class="display">Explore the Insights library.</h2>
          </div>
          <p class="lede">
            Start with the question you are working through. Each guide explains the trade-offs and
            points to useful next steps.
          </p>
        </div>

        <div v-if="articles.length" class="insights__grid">
          <article v-for="article in articles" :key="article.slug" class="insights__card">
            <p class="mono">{{ article.category }}</p>
            <h3><a :href="article.path">{{ article.title }}</a></h3>
            <p>{{ article.excerpt }}</p>
            <a class="link" :href="article.path">Read the guide <span aria-hidden="true">→</span></a>
          </article>
        </div>
        <p v-else class="insights__empty">New practical guides will appear here.</p>
      </div>
    </section>

    <nav class="section shell insights__services" aria-label="Related Brown Pixels services">
      <h2 class="display">Looking for a service?</h2>
      <ul>
        <li><a class="link" href="/website-development/">Website design &amp; development</a></li>
        <li><a class="link" href="/business-software/">Business software</a></li>
        <li><a class="link" href="/ai-solutions/">AI solutions</a></li>
        <li><a class="link" href="/digital-marketing/">Digital marketing support</a></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.insights__hero {
  padding-block: clamp(150px, 22vh, 220px) clamp(76px, 10vh, 120px);
  background:
    radial-gradient(65% 75% at 82% 28%, rgba(0, 105, 254, 0.24), transparent 72%),
    linear-gradient(145deg, #0a162c, #050b18);
}
.insights__hero .shell { max-width: 1050px; }
.insights__hero h1 { max-width: 18ch; margin-top: 24px; font-size: clamp(2.7rem, 1.35rem + 5.3vw, 5.2rem); line-height: 0.99; }
.insights__hero .lede { max-width: 66ch; margin-top: 24px; margin-bottom: 28px; }
.insights__featured {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  margin-top: 20px;
  padding: clamp(24px, 5vw, 58px);
  border: 1px solid var(--hair);
  border-radius: 22px;
  background: linear-gradient(135deg, var(--surface), var(--ground));
  box-shadow: var(--shadow-card);
}
.insights__featured h2 { max-width: 22ch; font-size: clamp(1.9rem, 1.2rem + 2.8vw, 3.2rem); line-height: 1.05; }
.insights__featured .lede { max-width: 62ch; margin-top: 18px; }
.insights__featured .link { display: inline-flex; gap: 9px; margin-top: 22px; }
.insights__feature-mark { color: var(--blue); font: 500 clamp(3rem, 8vw, 7rem)/1 var(--font-display); opacity: 0.7; }
.insights__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 36px; }
.insights__card { display: flex; flex-direction: column; align-items: flex-start; padding: clamp(22px, 3vw, 32px); border: 1px solid var(--hair); border-radius: 18px; background: var(--surface); }
.insights__card > p:first-child { color: var(--copper); }
.insights__card h3 { margin-top: 16px; font: 500 clamp(1.35rem, 2vw, 1.8rem)/1.15 var(--font-display); letter-spacing: -0.025em; }
.insights__card h3 a:hover { color: var(--blue-deep); }
.insights__card > p:nth-of-type(2) { margin-top: 14px; color: var(--ink-soft); line-height: 1.7; }
.insights__card .link { margin-top: auto; padding-top: 22px; }
.insights__empty { margin-top: 28px; color: var(--ink-soft); }
.insights__services h2 { font-size: clamp(1.8rem, 1.2rem + 2vw, 2.6rem); }
.insights__services ul { display: flex; flex-wrap: wrap; gap: 14px 26px; margin-top: 22px; }

@media (max-width: 650px) {
  .insights__hero { padding-top: 138px; }
  .insights__grid { grid-template-columns: 1fr; }
  .insights__feature-mark { display: none; }
}
</style>

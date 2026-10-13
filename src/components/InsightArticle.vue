<script setup>
import { computed } from 'vue'
import { INSIGHT_ARTICLES_BY_SLUG } from '../insights.js'

const props = defineProps({
  slug: { type: String, required: true }
})

const article = computed(() => INSIGHT_ARTICLES_BY_SLUG[props.slug])
const relatedArticles = computed(() =>
  article.value.relatedArticles.map((slug) => INSIGHT_ARTICLES_BY_SLUG[slug]).filter(Boolean)
)
</script>

<template>
  <article v-if="article" class="insight-article">
    <header class="insight-article__hero theme-dark">
      <div class="shell">
        <nav class="insight-article__crumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/insights/">Insights</a></li>
            <li aria-current="page">{{ article.title }}</li>
          </ol>
        </nav>
        <p class="eyebrow">{{ article.category }} / Brown Pixels Insights</p>
        <h1 class="display">{{ article.title }}</h1>
        <p class="lede">{{ article.excerpt }}</p>
        <p class="insight-article__author">Written by {{ article.author }}</p>
      </div>
    </header>

    <div class="shell insight-article__layout">
      <div class="insight-article__body">
        <section v-for="section in article.sections" :key="section.heading">
          <h2>{{ section.heading }}</h2>
          <template v-for="(block, index) in section.blocks" :key="section.heading + '-' + index">
            <p v-if="block.type === 'p'">{{ block.text }}</p>
            <ul v-else-if="block.type === 'ul'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
            <ol v-else-if="block.type === 'ol'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ol>
            <div v-else-if="block.type === 'table'" class="insight-article__table-wrap">
              <table>
                <thead>
                  <tr><th v-for="column in block.columns" :key="column" scope="col">{{ column }}</th></tr>
                </thead>
                <tbody>
                  <tr v-for="row in block.rows" :key="row[0]">
                    <td v-for="cell in row" :key="cell">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a v-else-if="block.type === 'link'" class="link insight-article__inline-link" :href="block.href">
              {{ block.label }} <span aria-hidden="true">→</span>
            </a>
          </template>
        </section>

        <aside class="insight-article__cta">
          <p class="eyebrow">A useful next step</p>
          <h2>Talk through your requirements.</h2>
          <p>Share the problem, the people involved and what you have already tried. We can discuss a suitable scope.</p>
          <a class="btn btn--flame" href="/#contact">Discuss a project</a>
        </aside>
      </div>

      <aside class="insight-article__sidebar">
        <p class="mono">RELATED SERVICES</p>
        <ul>
          <li v-for="service in article.services" :key="service">
            <a v-if="service === 'website-development'" href="/website-development/">Website design &amp; development</a>
            <a v-else-if="service === 'business-software'" href="/business-software/">Business software</a>
            <a v-else-if="service === 'ai-solutions'" href="/ai-solutions/">AI solutions</a>
            <a v-else-if="service === 'digital-marketing'" href="/digital-marketing/">Digital marketing support</a>
          </li>
        </ul>
        <p class="mono insight-article__sidebar-label">RELATED READING</p>
        <ul>
          <li v-for="related in relatedArticles" :key="related.slug">
            <a :href="related.path">{{ related.title }}</a>
          </li>
        </ul>
        <a class="link" href="/insights/">All Insights</a>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.insight-article__hero {
  padding-block: clamp(140px, 19vh, 190px) clamp(56px, 8vh, 92px);
  background:
    radial-gradient(65% 75% at 82% 28%, rgba(0, 105, 254, 0.24), transparent 72%),
    linear-gradient(145deg, #0a162c, #050b18);
}
.insight-article__hero .shell { max-width: 1020px; }
.insight-article__crumbs { margin-bottom: 34px; color: rgba(234, 241, 255, 0.68); font-size: 13px; }
.insight-article__crumbs ol { display: flex; flex-wrap: wrap; gap: 8px; }
.insight-article__crumbs li + li::before { content: '/'; margin-right: 8px; color: var(--blue-lit); }
.insight-article__crumbs a:hover { color: #fff; }
.insight-article__hero h1 { max-width: 21ch; margin-top: 20px; font-size: clamp(2.45rem, 1.25rem + 4.7vw, 4.8rem); line-height: 1; }
.insight-article__hero .lede { max-width: 70ch; margin-top: 22px; }
.insight-article__author { margin-top: 22px; color: rgba(234, 241, 255, 0.68); font-size: 14px; }
.insight-article__layout { display: grid; grid-template-columns: minmax(0, 1fr) 230px; gap: clamp(34px, 7vw, 100px); align-items: start; padding-block: clamp(48px, 7vw, 88px); }
.insight-article__body { min-width: 0; max-width: 780px; }
.insight-article__body section + section { margin-top: clamp(34px, 5vw, 58px); }
.insight-article__body h2 { font: 500 clamp(1.55rem, 1.1rem + 1.8vw, 2.25rem)/1.13 var(--font-display); letter-spacing: -0.03em; }
.insight-article__body p, .insight-article__body li { color: var(--ink-soft); font-size: 16px; line-height: 1.8; }
.insight-article__body section > p { margin-top: 16px; }
.insight-article__body ul, .insight-article__body ol { display: grid; gap: 11px; margin: 18px 0 0; padding-left: 24px; }
.insight-article__body li { padding-left: 4px; }
.insight-article__inline-link { display: inline-flex; gap: 8px; margin-top: 18px; }
.insight-article__table-wrap { max-width: 100%; margin-top: 20px; overflow-x: auto; border: 1px solid var(--hair); border-radius: 14px; }
.insight-article__table-wrap table { width: 100%; min-width: 620px; border-collapse: collapse; background: var(--surface); text-align: left; }
.insight-article__table-wrap th, .insight-article__table-wrap td { padding: 14px 16px; border-bottom: 1px solid var(--hair-soft); color: var(--ink-soft); font-size: 14px; line-height: 1.6; vertical-align: top; }
.insight-article__table-wrap th { color: var(--ink); font-weight: 600; background: var(--ground); }
.insight-article__cta { margin-top: 58px; padding: clamp(22px, 4vw, 36px); border: 1px solid var(--hair); border-radius: 18px; background: linear-gradient(135deg, var(--surface), var(--ground)); }
.insight-article__cta h2 { margin-top: 12px; }
.insight-article__cta p:not(.eyebrow) { margin-top: 12px; }
.insight-article__cta .btn { margin-top: 20px; }
.insight-article__sidebar { position: sticky; top: 110px; padding: 20px; border: 1px solid var(--hair); border-radius: 16px; background: var(--surface); }
.insight-article__sidebar > p { color: var(--ink-faint); font-size: 10px; letter-spacing: 0.13em; }
.insight-article__sidebar ul { display: grid; gap: 12px; margin-top: 16px; }
.insight-article__sidebar li { color: var(--ink-soft); font-size: 14px; line-height: 1.5; }
.insight-article__sidebar a:hover { color: var(--blue-deep); }
.insight-article__sidebar .insight-article__sidebar-label { margin-top: 26px; }
.insight-article__sidebar > .link { display: inline-flex; margin-top: 24px; }

@media (max-width: 850px) {
  .insight-article__layout { grid-template-columns: 1fr; }
  .insight-article__sidebar { position: static; }
}
@media (max-width: 600px) {
  .insight-article__hero { padding-top: 128px; }
  .insight-article__crumbs { margin-bottom: 24px; }
}
</style>

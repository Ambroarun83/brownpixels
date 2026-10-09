<script setup>
import { computed } from 'vue'
import { CONFIG, digits, validEmail } from '../config.js'
import { SERVICE_LINK_LABELS, SERVICE_PAGES } from '../servicePages.js'

const props = defineProps({
  page: { type: String, required: true }
})

const content = computed(() => SERVICE_PAGES[props.page])
const whatsapp = computed(() => 'https://wa.me/' + digits(CONFIG.whatsapp))
const email = computed(() => 'mailto:' + CONFIG.email)
const emailAvailable = validEmail(CONFIG.email)
</script>

<template>
  <article class="service-page">
    <header class="service-page__hero theme-dark">
      <div class="shell service-page__hero-inner">
        <p class="eyebrow">Brown Pixels / Services</p>
        <h1 class="display service-page__title">{{ content.heading }}</h1>
        <p class="lede service-page__intro">{{ content.intro }}</p>
        <div class="service-page__actions">
          <a class="btn btn--flame" href="/#contact">Discuss a project</a>
          <a v-if="emailAvailable" class="btn btn--ghost" :href="email">Email Brown Pixels</a>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="shell service-page__grid">
        <div>
          <p class="eyebrow">Who it is for</p>
          <h2 class="display service-page__subheading">A fit for the way you work.</h2>
        </div>
        <p class="lede">{{ content.audience }}</p>
      </div>
    </section>

    <section v-if="content.caseStudy" class="section section--band">
      <div class="shell service-page__grid">
        <div>
          <p class="eyebrow">Selected work / Karur</p>
          <h2 class="display service-page__subheading">{{ content.caseStudy.title }}</h2>
        </div>
        <div>
          <p class="lede">{{ content.caseStudy.description }}</p>
          <a
            class="link service-page__case-link"
            :href="content.caseStudy.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the live project
          </a>
        </div>
      </div>
    </section>

    <section v-if="content.serviceArea" class="section section--band">
      <div class="shell service-page__grid">
        <div>
          <p class="eyebrow">Where we work</p>
          <h2 class="display service-page__subheading">Coimbatore, Karur, Trichy and beyond.</h2>
        </div>
        <p class="lede">{{ content.serviceArea }}</p>
      </div>
    </section>

    <section class="section section--band">
      <div class="shell service-page__grid">
        <div>
          <p class="eyebrow">What we can build</p>
          <h2 class="display service-page__subheading">Capabilities shaped to the brief.</h2>
        </div>
        <ul class="service-page__list">
          <li v-for="capability in content.capabilities" :key="capability">{{ capability }}</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="shell service-page__grid">
        <div>
          <p class="eyebrow">Project approach</p>
          <h2 class="display service-page__subheading">Start with the requirements.</h2>
        </div>
        <p class="lede">{{ content.approach }}</p>
      </div>
    </section>

    <section class="section section--band">
      <div class="shell service-page__contact">
        <div>
          <p class="eyebrow">Start a conversation</p>
          <h2 class="display service-page__subheading">Tell us what you need.</h2>
          <p class="lede">{{ content.contact }}</p>
        </div>
        <div class="service-page__contact-actions">
          <a class="btn btn--flame" :href="whatsapp" target="_blank" rel="noopener noreferrer">
            Message on WhatsApp
          </a>
          <a v-if="emailAvailable" class="link" :href="email">Send an email</a>
          <a class="link" href="/#contact">Use the project enquiry form</a>
        </div>
      </div>
    </section>

    <nav class="section section--tight service-page__related shell" aria-label="Related services">
      <h2 class="mono">Explore related services</h2>
      <ul>
        <li v-for="related in content.related" :key="related">
          <a class="link" :href="SERVICE_PAGES[related].path">{{ SERVICE_LINK_LABELS[related] }}</a>
        </li>
        <li><a class="link" href="/">Brown Pixels home</a></li>
      </ul>
    </nav>
  </article>
</template>

<style scoped>
.service-page__hero {
  padding-block: clamp(150px, 22vh, 230px) clamp(76px, 10vh, 130px);
  background:
    radial-gradient(65% 75% at 82% 28%, rgba(0, 105, 254, 0.24), transparent 72%),
    linear-gradient(145deg, #0a162c, #050b18);
}
.service-page__hero-inner { max-width: 1050px; }
.service-page__title {
  max-width: 18ch;
  margin-top: 24px;
  font-size: clamp(2.7rem, 1.35rem + 5.3vw, 5.7rem);
  line-height: 0.99;
}
.service-page__intro { max-width: 68ch; margin-top: 26px; }
.service-page__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.service-page__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(28px, 7vw, 100px);
  align-items: start;
}
.service-page__subheading {
  max-width: 16ch;
  margin-top: 16px;
  font-size: clamp(1.9rem, 1.2rem + 2.4vw, 3.2rem);
  line-height: 1.04;
}
.service-page__list { display: grid; gap: 0; }
.service-page__list li {
  padding: 17px 0;
  border-bottom: 1px solid var(--hair);
  color: var(--ink-soft);
  line-height: 1.7;
}
.service-page__list li:first-child { padding-top: 0; }
.service-page__contact {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(220px, 0.85fr);
  gap: clamp(28px, 7vw, 100px);
  align-items: center;
}
.service-page__contact .lede { margin-top: 20px; }
.service-page__contact-actions { display: grid; justify-items: start; gap: 18px; }
.service-page__case-link { margin-top: 20px; }
.service-page__related h2 { color: var(--ink-faint); }
.service-page__related ul { display: flex; flex-wrap: wrap; gap: 14px 28px; margin-top: 20px; }

@media (max-width: 720px) {
  .service-page__grid, .service-page__contact { grid-template-columns: 1fr; }
  .service-page__hero { padding-top: 138px; }
}
</style>

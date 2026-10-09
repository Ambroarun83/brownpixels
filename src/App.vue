<script setup>
import { inject, onMounted, onBeforeUnmount, nextTick, ref, watch } from 'vue'
import BrandLoader from './components/BrandLoader.vue'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import CapabilityTicker from './components/CapabilityTicker.vue'
import ServicesExplorer from './components/ServicesExplorer.vue'
import ProgressionChain from './components/ProgressionChain.vue'
import AiLab from './components/AiLab.vue'
import AiTechSection from './components/AiTechSection.vue'
import DigitalPresence from './components/DigitalPresence.vue'
import ApproachTimeline from './components/ApproachTimeline.vue'
import WorkShowcase from './components/WorkShowcase.vue'
import AudienceGrid from './components/AudienceGrid.vue'
import AboutStatement from './components/AboutStatement.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import AppIcon from './components/AppIcon.vue'
import { CONFIG, digits } from './config.js'
import LegalView from './components/LegalView.vue'
import { startInteractions } from './composables/interactions.js'
import { splitHeadings } from './composables/splitText.js'
import ServicePage from './components/ServicePage.vue'
import { SERVICE_PAGES } from './servicePages.js'

const initialPath = inject('sitePath', '/')
const TITLES = {
  home: 'Brown Pixels | Website & Software Development.',
  privacy: 'Privacy Policy — Brown Pixels',
  terms: 'Terms & Conditions — Brown Pixels',
  'not-found': 'Page not found | Brown Pixels'
}

function routeForPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/'
  if (normalized === '/') return 'home'
  return Object.keys(SERVICE_PAGES).find((key) => SERVICE_PAGES[key].path.replace(/\/$/, '') === normalized) || 'not-found'
}

function parse() {
  const path = typeof location === 'undefined' ? initialPath : location.pathname
  const page = routeForPath(path)
  const hash = typeof location === 'undefined' ? '' : location.hash.slice(1)
  return page === 'home' && (hash === 'privacy' || hash === 'terms') ? hash : page
}

const route = ref(routeForPath(initialPath))
const HOME_DESCRIPTION =
  'Brown Pixels builds professional websites, custom web applications, business software and AI-powered solutions for businesses.'

function syncHead(page) {
  document.title = SERVICE_PAGES[page]?.title || TITLES[page] || TITLES.home
  const robots = document.querySelector('meta[name="robots"]')
  if (robots) robots.content = page === 'privacy' || page === 'terms' || page === 'not-found' ? 'noindex, follow' : 'index, follow'

  const description = document.querySelector('meta[name="description"]')
  const canonical = document.querySelector('link[rel="canonical"]')
  if (description) description.content = SERVICE_PAGES[page]?.description || HOME_DESCRIPTION
  if (canonical) canonical.href = 'https://brownpixels.in' + (SERVICE_PAGES[page]?.path || '/')
}

/* the intro curtain holds the hero's entrance until it lifts */
const booted = ref(false)
function onBoot() {
  booted.value = true
}

/* floating WhatsApp shortcut — appears once the hero is behind you and
   steps aside while the contact section (which has the same links) is up */
const showFab = ref(false)
const nearContact = ref(false)
const waURL = 'https://wa.me/' + digits(CONFIG.whatsapp)

async function sync() {
  const next = parse()
  const prev = route.value
  route.value = next
  syncHead(next)
  if (next === prev) return

  if (next !== 'home') {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }
  await nextTick()
  const id = location.hash.slice(1)
  const el = id ? document.getElementById(id) : null
  if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
  else window.scrollTo({ top: 0, behavior: 'auto' })
}

/* scroll progress bar */
const progress = ref(0)
let raf = 0
function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
    showFab.value = window.scrollY > 700
    raf = 0
  })
}

let contactIO = null
let stopInteractions = null

/* Headings split into words once the first paint has settled, then the
   reveal observer adds `.is-in` and they animate in word by word. */
function decorate() {
  splitHeadings()
  stopInteractions = startInteractions()
}

onMounted(() => {
  route.value = parse()
  syncHead(route.value)
  window.addEventListener('hashchange', sync)
  window.addEventListener('popstate', sync)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  requestAnimationFrame(decorate)

  const contact = document.getElementById('contact')
  if (contact && 'IntersectionObserver' in window) {
    contactIO = new IntersectionObserver(
      (entries) => (nearContact.value = entries[0].isIntersecting),
      { rootMargin: '-10% 0px -25% 0px' }
    )
    contactIO.observe(contact)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', sync)
  window.removeEventListener('popstate', sync)
  window.removeEventListener('scroll', onScroll)
  if (contactIO) contactIO.disconnect()
  if (stopInteractions) stopInteractions()
})

watch(route, (v) => {
  syncHead(v)
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <BrandLoader @done="onBoot" />

  <span class="aura" aria-hidden="true"></span>
  <span class="cursor" aria-hidden="true">
    <i class="cursor__dot"></i>
    <i class="cursor__ring"></i>
  </span>

  <span class="progress" :style="{ transform: 'scaleX(' + progress + ')' }" aria-hidden="true"></span>

  <SiteNav />

  <main id="main">
    <template v-if="route === 'home'">
      <HeroSection :booted="booted" />
      <WorkShowcase />
      <CapabilityTicker />
      <ServicesExplorer />
      <ProgressionChain />
      <AiLab />
      <AiTechSection />
      <DigitalPresence />
      <ApproachTimeline />
      <AudienceGrid />
      <AboutStatement />
      <FaqSection />
      <ContactSection />
    </template>
    <ServicePage v-else-if="SERVICE_PAGES[route]" :page="route" />
    <LegalView v-else-if="route === 'privacy' || route === 'terms'" :doc="route" />
    <section v-else class="section shell not-found">
      <p class="eyebrow">404 / Not found</p>
      <h1 class="display">This page could not be found.</h1>
      <a class="link" href="/">Return to Brown Pixels home</a>
    </section>
  </main>

  <SiteFooter />

  <a
    v-if="route === 'home'"
    class="fab"
    :class="{ 'is-on': showFab && !nearContact }"
    :href="waURL"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Message Brown Pixels on WhatsApp"
  >
    <AppIcon name="whatsapp" :size="21" />
    <span class="fab__text">WhatsApp</span>
  </a>
</template>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 80;
  transform-origin: left;
  background: linear-gradient(90deg, var(--blue-deep), var(--blue) 62%, var(--ember));
  will-change: transform;
}

.fab {
  position: fixed;
  right: clamp(14px, 2vw, 26px);
  bottom: clamp(14px, 2vw, 26px);
  z-index: 70;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px 12px 15px;
  border-radius: 999px;
  background: var(--wa);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 16px 34px -16px rgba(15, 122, 61, 0.8);
  opacity: 0;
  transform: translateY(14px) scale(0.94);
  pointer-events: none;
  transition: opacity 0.4s var(--ease-out), transform 0.45s var(--ease-out),
    background-color 0.3s var(--ease-out);
}
.fab.is-on { opacity: 1; transform: none; pointer-events: auto; }
.fab:hover { background: #0b6633; }
.fab svg { color: #fff; }
@media (max-width: 560px) {
  .fab__text { display: none; }
  .fab { padding: 14px; }
}
</style>

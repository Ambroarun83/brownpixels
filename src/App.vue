<script setup>
import { onMounted, onBeforeUnmount, nextTick, ref, watch } from 'vue'
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

/* Minimal hash view switch — the site itself is one page; #privacy and
   #terms swap in a document view. Anchors like #services still behave
   as ordinary in-page links. */
const TITLES = {
  home: 'Brown Pixels — We turn ideas into software.',
  privacy: 'Privacy Policy — Brown Pixels',
  terms: 'Terms & Conditions — Brown Pixels'
}

function parse() {
  const h = typeof location === 'undefined' ? '' : location.hash.slice(1)
  return h === 'privacy' || h === 'terms' ? h : 'home'
}

const route = ref('home')

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
  document.title = TITLES[next]
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
  document.title = TITLES[route.value]
  window.addEventListener('hashchange', sync)
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
  window.removeEventListener('scroll', onScroll)
  if (contactIO) contactIO.disconnect()
  if (stopInteractions) stopInteractions()
})

watch(route, (v) => {
  document.title = TITLES[v]
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
    <LegalView v-else :doc="route" />
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

<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { CONFIG, digits } from '../config.js'
import { goTop } from '../composables/scrollToTop.js'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'AI', href: '#ai' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

const sitePath = inject('sitePath', '/')
const isHome = (typeof window === 'undefined' ? sitePath : window.location.pathname) === '/'
const sectionHref = (hash) => isHome ? hash : '/' + hash

const solid = ref(false)
const open = ref(false)
const active = ref('')

let io = null

function onScroll() {
  solid.value = window.scrollY > 40
  /* the hero isn't observed by the section watcher — light up Home while it's on screen */
  if (window.scrollY < 260) active.value = '#top'
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean)
  if ('IntersectionObserver' in window && sections.length) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) active.value = '#' + e.target.id
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (io) io.disconnect()
})

function onNav(link, e) {
  if (link.href === '#top' && isHome) goTop(e)
  close()
}

function close() {
  open.value = false
  document.body.style.overflow = ''
}
function toggle() {
  open.value = !open.value
  document.body.style.overflow = open.value ? 'hidden' : ''
}
</script>

<template>
  <header class="nav" :class="{ 'is-solid': solid, 'theme-dark': !solid }">
    <div class="nav__inner">
      <a class="nav__brand" :href="sectionHref('#top')" @click="close" aria-label="Brown Pixels — home">
        <img class="nav__logo nav__logo--dark" src="/img/logo-lockup-dark.png"
             srcset="/img/logo-lockup-dark.png 1x, /img/logo-lockup-dark@2x.png 2x" alt="Brown Pixels" width="148" height="50" />
        <img class="nav__logo nav__logo--light" src="/img/logo-lockup-light.png"
             srcset="/img/logo-lockup-light.png 1x, /img/logo-lockup-light@2x.png 2x" alt="Brown Pixels" width="148" height="50" />
      </a>

      <nav class="nav__pill" aria-label="Primary">
        <ul>
          <li v-for="link in links" :key="link.href">
            <a
            :href="sectionHref(link.href)"
            :class="{ 'is-active': active === link.href }"
            @click="onNav(link, $event)"
          >
              {{ link.label }}
              <i v-if="link.href === '#ai'" class="nav__ai-dot" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>

      <div class="nav__actions">
        <a
          v-if="CONFIG.whatsapp"
          class="nav__wa"
          :href="CONFIG.social.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Brown Pixels on WhatsApp"
        >
          <AppIcon name="whatsapp" :size="18" />
        </a>
        <a class="btn btn--light btn--sm nav__cta" :href="sectionHref('#contact')" @click="close">Start a project</a>
        <button
          class="nav__burger"
          type="button"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          :aria-expanded="open"
          @click="toggle"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <Transition name="sheet">
      <div v-if="open" class="nav__sheet">
        <ul>
          <li v-for="link in links" :key="link.href">
            <a :href="sectionHref(link.href)" @click="onNav(link, $event)">{{ link.label }}</a>
          </li>
        </ul>
        <div class="nav__sheet-foot">
          <a class="btn btn--flame btn--block" :href="sectionHref('#contact')" @click="close">
            Start a project
            <span class="btn__dot"><AppIcon name="arrow" /></span>
          </a>
          <a v-if="CONFIG.email" class="nav__sheet-mail mono" :href="'mailto:' + CONFIG.email">{{ CONFIG.email }}</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  transition: background-color 0.4s var(--ease-out), border-color 0.4s var(--ease-out),
    box-shadow 0.4s var(--ease-out);
  border-bottom: 1px solid transparent;
}
.nav.is-solid {
  background: rgba(246, 248, 252, 0.86);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom-color: var(--hair-soft);
  box-shadow: 0 10px 30px -22px rgba(5, 11, 24, 0.5);
}

.nav__inner {
  max-width: var(--shell);
  margin-inline: auto;
  padding: clamp(14px, 1.6vw, 20px) var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nav__brand { display: inline-flex; flex: none; }
.nav__logo { width: clamp(112px, 10vw, 146px); height: auto; transition: opacity 0.3s var(--ease-out); }
.nav__brand:hover .nav__logo { opacity: 0.78; }
/* cream lockup while the bar is transparent over the dark hero */
.nav__logo--light { display: none; }
.nav.is-solid .nav__logo--dark { display: none; }
.nav.is-solid .nav__logo--light { display: block; }

.nav__pill {
  display: none;
  padding: 5px;
  border: 1px solid var(--hair);
  border-radius: 13px;
  background: var(--glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.nav__pill ul { display: flex; align-items: center; gap: 3px; margin: 0; padding: 0; }
.nav__pill a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 13px;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 450;
  color: var(--ink-soft);
  transition: background-color 0.3s var(--ease-out), color 0.3s var(--ease-out);
}
.nav__pill a:hover { background: var(--tint-warm); color: var(--ink); }
.nav__pill a.is-active {
  background: linear-gradient(96deg, var(--blue-deep), var(--blue));
  color: #ffffff;
  font-weight: 650;
}
.nav__ai-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--blue-lit);
  box-shadow: 0 0 0 0 rgba(125, 182, 255, 0.6);
  animation: blip 2.6s infinite;
}
.nav__pill a.is-active .nav__ai-dot { background: #ffffff; box-shadow: none; }
@keyframes blip {
  0% { box-shadow: 0 0 0 0 rgba(125, 182, 255, 0.55); }
  70% { box-shadow: 0 0 0 8px rgba(125, 182, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(125, 182, 255, 0); }
}

.nav__actions { display: flex; align-items: center; gap: 9px; }
.nav__cta { font-weight: 550; }

.nav__wa {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--wa);
  color: #fff;
  box-shadow: 0 8px 20px -12px rgba(15, 122, 61, 0.9);
  transition: background-color 0.35s var(--ease-out), transform 0.35s var(--ease-out),
    box-shadow 0.35s var(--ease-out);
}
.nav__wa:hover {
  background: #0b6633;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -12px rgba(15, 122, 61, 0.95);
}

.nav__burger {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--hair);
  border-radius: 12px;
  background: var(--tint);
  color: var(--ink);
  transition: border-color 0.3s, background-color 0.3s;
}
.nav__burger:hover { border-color: rgba(0, 105, 254, 0.5); }

.nav__sheet {
  margin: 0 var(--gutter);
  padding: 18px;
  border: 1px solid var(--hair);
  border-radius: 20px;
  background: var(--glass-strong);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow: var(--shadow-card);
}
.nav__sheet ul { display: grid; gap: 2px; margin-bottom: 14px; }
.nav__sheet a {
  display: block;
  padding: 13px 12px;
  border-radius: 11px;
  font-family: var(--font-display);
  font-size: 19px;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.nav__sheet a:hover { background: var(--tint-warm); }
.nav__sheet-foot { display: grid; gap: 12px; }
.nav__sheet-mail { color: var(--ink-faint); text-align: center; font-size: 11px; letter-spacing: 0.08em; text-transform: none; }

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.3s var(--ease-out), transform 0.35s var(--ease-out); }
.sheet-enter-from, .sheet-leave-to { opacity: 0; transform: translateY(-10px); }

@media (min-width: 980px) {
  .nav__pill { display: block; }
  .nav__burger { display: none; }
}
@media (max-width: 560px) {
  .nav__cta { display: none; }
}
</style>

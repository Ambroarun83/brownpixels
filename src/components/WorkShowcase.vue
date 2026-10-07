<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { mediaQuery } from '../composables/mediaQuery.js'

const projects = [
  {
    num: '01',
    name: 'Leafy Packaging',
    type: 'Packaging supplier · Tamil Nadu',
    intro:
      'A paper bag and packaging business needed a place to present its range, explain custom printing and turn interest into conversations — without a complex e-commerce build.',
    img: '/img/work/leafy.jpg',
    alt: 'Leafy Packaging website — product catalogue and 3D custom-print preview',
    url: 'https://leafy-demo.vercel.app/',
    spec: [
      { k: 'Requirement', v: 'Present the product range, make custom printing tangible, and route enquiries to the team’s existing WhatsApp workflow.' },
      { k: 'What we built', v: 'A catalogue-led website with an interactive 3D bag preview — brand name and concept colour applied live — plus category browsing and a WhatsApp-first enquiry flow in English and Tamil.' },
      { k: 'Technology', v: 'Front-end web application · interactive 3D preview · WhatsApp deep links · mobile-first responsive build' },
      { k: 'Status', v: 'Live' }
    ]
  },
  {
    num: '02',
    name: 'Thirupati Rice Mill',
    type: 'Rice mill & agro processor · Karur',
    intro:
      'A three-generation family mill needed a credible digital presence that could carry six rice varieties, explain how the grain is processed, and handle bulk and retail enquiries.',
    img: '/img/work/thirupati.jpg',
    alt: 'Thirupati Rice Mill website — rice variety catalogue and milling process',
    url: 'https://thirupati-rice-mill-extended.vercel.app/index.html',
    spec: [
      { k: 'Requirement', v: 'Establish trust online, present each variety with its grade and pack sizes, explain the milling process, and make bulk enquiry straightforward.' },
      { k: 'What we built', v: 'A multi-page website: brand story, variety-wise product catalogue, step-by-step process walkthrough, facility gallery and a contact/enquiry flow.' },
      { k: 'Technology', v: 'Static multi-page build · image-led editorial layout · SEO-structured content · mobile-first' },
      { k: 'Status', v: 'Live' }
    ]
  },
  {
    num: '03',
    name: 'UpLiftIdea',
    type: 'Digital marketing agency',
    intro:
      'A growing agency needed a site that could present a wide service list, show creative work in motion and capture enquiries — with content the team could keep updating themselves.',
    img: '/img/work/upliftidea.jpg',
    alt: 'UpLiftIdea website — digital marketing services and creative work gallery',
    url: 'https://upliftidea.in/',
    spec: [
      { k: 'Requirement', v: 'Present the service lines, showcase reels and creative campaigns, publish client feedback, and collect enquiries.' },
      { k: 'What we built', v: 'A service-led marketing site with a creative work gallery, testimonial section and enquiry flow, backed by an admin area for managing reels and client content.' },
      { k: 'Technology', v: 'Dynamic web application · server-rendered pages · media and content management · responsive UI' },
      { k: 'Status', v: 'Live' }
    ]
  }
]

const root = ref(null)
let raf = 0

/* responsive screenshots — phones get the 560w file, not the 1440w one */
function srcsetOf(src) {
  return (
    src.replace('.jpg', '-560.jpg') + ' 560w, ' +
    src.replace('.jpg', '-900.jpg') + ' 900w, ' +
    src.replace('.jpg', '-1200.jpg') + ' 1200w, ' + src + ' 1440w'
  )
}
const reduce = mediaQuery('(prefers-reduced-motion: reduce)').matches

const small = mediaQuery('(max-width: 940px)')
const fine = mediaQuery('(hover: hover) and (pointer: fine)')

function parallax() {
  const el = root.value
  if (!el || small.matches) return
  const vh = window.innerHeight
  el.querySelectorAll('.shot img').forEach((img) => {
    const r = img.parentElement.getBoundingClientRect()
    if (r.bottom < -200 || r.top > vh + 200) return
    const offset = (r.top + r.height / 2 - vh / 2) * -0.055
    img.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0) scale(1.1)'
  })
}

function onScroll() {
  if (raf || reduce) return
  raf = requestAnimationFrame(() => {
    parallax()
    raf = 0
  })
}

onMounted(() => {
  parallax()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="work" ref="root" class="section section--band work">
    <div class="shell">
      <div class="sec-head" v-reveal>
        <div>
          <p class="sec-head__num mono"><b>01</b><span>Work</span></p>
          <h2 class="display">Built around real problems.</h2>
        </div>
        <p class="lede">
          A selection of live projects. We publish outcomes only where they are genuine and
          measurable — no invented numbers, client names or results.
        </p>
      </div>

      <div class="items">
        <article v-for="(p, i) in projects" :key="p.name" class="item" :class="{ 'is-flip': i % 2 === 1 }" v-reveal>
          <a class="shot" :href="p.url" target="_blank" rel="noopener noreferrer">
            <span class="shot__badge mono">{{ p.num }} / Live</span>
            <img
              :src="p.img"
              :srcset="srcsetOf(p.img)"
              sizes="(max-width: 940px) min(92vw, 560px), 46vw"
              :alt="p.alt"
              width="1440"
              height="900"
              :loading="i === 0 ? 'eager' : 'lazy'"
              decoding="async"
            />
            <span class="shot__veil"></span>
            <span class="shot__cta">
              Visit site
              <AppIcon name="corner" :size="16" />
            </span>
          </a>

          <div class="item__body">
            <span class="item__type mono">{{ p.type }}</span>
            <h3 class="item__name">{{ p.name }}</h3>
            <p class="item__intro">{{ p.intro }}</p>

            <dl class="spec">
              <div v-for="s in p.spec" :key="s.k">
                <dt>{{ s.k }}</dt>
                <dd>{{ s.v }}</dd>
              </div>
            </dl>

            <a class="link" :href="p.url" target="_blank" rel="noopener noreferrer">
              Open live site
              <AppIcon name="arrow" :size="16" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.items { display: grid; gap: clamp(48px, 7vw, 104px); }

.item {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: clamp(24px, 3.4vw, 56px);
  align-items: center;
}
.item.is-flip .shot { order: 2; }

.shot {
  position: relative;
  display: block;
  border: 1px solid var(--hair);
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--ground-2);
  box-shadow: 0 50px 90px -60px rgba(5, 11, 24, 0.16);
  isolation: isolate;
}
.shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: saturate(0.94) contrast(1.01) brightness(0.96);
  transition: filter 0.5s var(--ease-out), transform 0.6s var(--ease-out);
}
/* a light scrim only at the bottom, so the "Visit site" pill always reads —
   the screenshot itself is never hidden */
.shot__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 22, 44, 0) 58%, rgba(10, 22, 44, 0.34) 100%);
  transition: opacity 0.5s var(--ease-out);
}
.shot:hover img { filter: saturate(1.04) contrast(1.03) brightness(1); transform: scale(1.02); }
.shot:hover .shot__veil { opacity: 0.7; }
.shot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(125, 182, 255, 0);
  transition: box-shadow 0.5s var(--ease-out);
  pointer-events: none;
}
.shot:hover::after { box-shadow: inset 0 0 0 1px rgba(125, 182, 255, 0.5); }

.shot__badge {
  position: absolute;
  z-index: 2;
  left: 14px;
  top: 14px;
  padding: 7px 12px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  background: var(--surface-2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--ink);
  font-size: 11px;
}
.shot__cta {
  position: absolute;
  z-index: 2;
  right: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: linear-gradient(96deg, var(--blue-deep), var(--blue));
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
  box-shadow: 0 10px 24px -12px rgba(5, 11, 24, 0.6);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}
.shot__cta svg { transition: transform 0.4s var(--ease-out); }
.shot:hover .shot__cta { transform: translateY(-2px); box-shadow: 0 16px 30px -14px rgba(5, 11, 24, 0.7); }
.shot:hover .shot__cta svg { transform: translate(2px, -2px); }

.item__type { color: var(--copper); }
.item__name {
  margin-top: 14px;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.035em;
}
.item__intro { margin-top: 14px; font-size: 15px; line-height: 1.62; color: var(--ink-soft); max-width: 52ch; }

.spec { margin-top: 24px; }
.spec div {
  display: grid;
  grid-template-columns: 116px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--hair-soft);
}
.spec dt {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding-top: 3px;
}
.spec dd { font-size: 14.5px; line-height: 1.6; color: var(--ink-soft); }

.link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  padding-bottom: 5px;
  border-bottom: 1px solid var(--hair);
  transition: border-color 0.35s var(--ease-out), color 0.35s var(--ease-out);
}
.link:hover { border-color: var(--copper); color: var(--copper); }
.link svg { transition: transform 0.4s var(--ease-out); }
.link:hover svg { transform: translateX(4px); }

@media (max-width: 940px) {
  .item { grid-template-columns: 1fr; }
  .item.is-flip .shot { order: 0; }
  .shot__badge { backdrop-filter: none; -webkit-backdrop-filter: none; background: var(--surface-2); }
  /* skip the parallax transform on phones — it forces a repaint of a large image */
  .shot img { transform: none !important; }
}
@media (max-width: 560px) {
  .spec div { grid-template-columns: 1fr; gap: 4px; }
}
/* thumb-friendly hit area for the inline link */
@media (hover: none), (max-width: 860px) {
  .link { padding-top: 9px; padding-bottom: 10px; }
}
</style>

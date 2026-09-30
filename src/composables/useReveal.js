/* Scroll-reveal as a global directive: v-reveal or v-reveal="{ delay: 120 }"
   Robustness note: sections on phones may carry `content-visibility: auto`,
   which means their contents are not laid out while off-screen — an
   IntersectionObserver alone can miss those elements entirely. So the
   directive keeps a pending list and (a) re-observes when a skipped
   container becomes visible and (b) runs a cheap rAF-throttled scroll
   sweep until nothing is pending. Belt, braces, and a safety pin. */

let observer = null
const pending = new Set()
let sweeping = false
let raf = 0

function show(el) {
  el.classList.add('is-in')
  pending.delete(el)
  if (observer) observer.unobserve(el)
  if (!pending.size) stopSweep()
}

function ensureObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(entry.target)
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
  )
  return observer
}

/* (a) a container that was skipped has just become visible — re-check it */
if (typeof document !== 'undefined' && 'oncontentvisibilityautostatechange' in document) {
  document.addEventListener(
    'contentvisibilityautostatechange',
    (e) => {
      if (!pending.size || !observer) return
      pending.forEach((el) => {
        if (e.target.contains(el)) {
          observer.unobserve(el)
          observer.observe(el) // re-observing emits a fresh intersection record
        }
      })
    },
    true
  )
}

/* (b) last line of defence: anything actually on screen gets revealed */
function sweep() {
  raf = 0
  if (!pending.size) return
  const vh = window.innerHeight || 800
  pending.forEach((el) => {
    let r = el.getBoundingClientRect()
    if (!r.height) {
      /* inside a subtree that isn't laid out right now (e.g. a skipped
         content-visibility container) — fall back to that container's box */
      const box = el.closest('section, footer, main > div')
      if (box) r = box.getBoundingClientRect()
    }
    if (r.top < vh * 0.92 && r.bottom > 0) show(el)
  })
  if (pending.size) raf = requestAnimationFrame(sweep)
  else sweeping = false
}

function startSweep() {
  if (sweeping) return
  sweeping = true
  window.addEventListener('scroll', onScroll, { passive: true })
  raf = requestAnimationFrame(sweep)
}

function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(sweep)
}

function stopSweep() {
  sweeping = false
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

export const reveal = {
  mounted(el, binding) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('is-in')
      return
    }
    const delay = binding.value && binding.value.delay
    if (delay) el.style.transitionDelay = delay + 'ms'
    el.classList.add('reveal')
    pending.add(el)
    ensureObserver().observe(el)
    startSweep()
  },
  unmounted(el) {
    pending.delete(el)
    if (observer) observer.unobserve(el)
    if (!pending.size) stopSweep()
  }
}

/* True once the element has been in view — handy for one-shot animations. */
export function onEnterView(el, cb, options = {}) {
  if (!el) return () => {}
  if (!('IntersectionObserver' in window)) {
    cb()
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        cb()
        io.disconnect()
      })
    },
    { threshold: options.threshold || 0.25, rootMargin: options.rootMargin || '0px' }
  )
  io.observe(el)
  return () => io.disconnect()
}

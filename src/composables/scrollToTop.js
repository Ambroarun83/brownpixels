/* A predictable "back to top".
   The browser's native smooth scroll crawls over long distances (7-8k px
   can take seconds and gets lost when the page is still settling), so we
   animate it ourselves: fixed duration, eased, cancelled the moment the
   visitor takes over.
   The page sets `scroll-behavior: smooth` in CSS, which would turn every
   frame of our animation into its own smooth scroll — so the behaviour is
   switched off for the duration and restored afterwards. */

let raf = 0

function restore() {
  document.documentElement.style.scrollBehavior = ''
  document.body.style.scrollBehavior = ''
}

function cancel() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
  window.removeEventListener('wheel', cancel)
  window.removeEventListener('touchstart', cancel)
  restore()
}

export function scrollToTop() {
  cancel()
  const start = window.scrollY
  if (start < 40) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || start < 1200) {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    restore()
    return
  }

  document.documentElement.style.scrollBehavior = 'auto'
  document.body.style.scrollBehavior = 'auto'

  const dur = Math.min(820, 340 + start * 0.055)
  const t0 = performance.now()
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur)
    window.scrollTo(0, Math.round(start * Math.pow(1 - p, 3)))
    if (p < 1) {
      raf = requestAnimationFrame(step)
    } else {
      raf = 0
      cancel()
    }
  }
  window.addEventListener('wheel', cancel, { passive: true, once: true })
  window.addEventListener('touchstart', cancel, { passive: true, once: true })
  raf = requestAnimationFrame(step)
}

/* click handler for any <a href="#top"> */
export function goTop(e) {
  if (e && e.metaKey) return
  if (e) e.preventDefault()
  if (window.location.hash !== '#top') history.replaceState(null, '', '#top')
  scrollToTop()
}

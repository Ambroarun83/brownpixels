/* ============================================================
   splitText.js — wrap every word of a section heading in a span
   so the heading can animate in word by word.

   Walks text nodes only, so inline markup (<em>, <br>) survives.
   Adds `.split` to the heading; the words reveal when `.is-in`
   lands on it — set by the observer below.

   The hero <h1> is deliberately left alone: it has its own
   choreographed entrance and would otherwise animate twice.
   ============================================================ */

const WORD = /\S+/g

function walk(node) {
  const kids = Array.from(node.childNodes)
  for (const kid of kids) {
    if (kid.nodeType === 3) {
      const text = kid.nodeValue
      if (!text || !text.trim()) continue
      const frag = document.createDocumentFragment()
      let last = 0
      let m
      WORD.lastIndex = 0
      while ((m = WORD.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)))
        const span = document.createElement('span')
        span.className = 'w'
        span.textContent = m[0]
        frag.appendChild(span)
        last = m.index + m[0].length
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)))
      node.replaceChild(frag, kid)
    } else if (kid.nodeType === 1 && kid.tagName !== 'BR') {
      walk(kid)
    }
  }
}

let io = null
let failsafe = 0

function ensureObserver() {
  if (io || !('IntersectionObserver' in window)) return
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' }
  )
}

export function splitHeading(el) {
  if (!el || el.dataset.split === 'done') return
  walk(el)
  const words = el.querySelectorAll('.w')
  if (!words.length) return
  words.forEach((w, i) => w.style.setProperty('--i', String(Math.min(i, 22))))
  el.classList.add('split')
  el.dataset.split = 'done'
}

export function splitHeadings(root = document) {
  const heads = root.querySelectorAll('h2.display, h2.hero__ghost-title')
  heads.forEach(splitHeading)

  const splits = root.querySelectorAll('.split')
  if (!splits.length) return

  ensureObserver()
  if (io) splits.forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el) })

  /* if anything goes wrong with the observer, never leave a heading blank */
  clearTimeout(failsafe)
  failsafe = window.setTimeout(() => {
    document.querySelectorAll('.split').forEach((el) => el.classList.add('is-in'))
  }, 4000)
}

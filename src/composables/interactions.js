/* ============================================================
   Global interaction layer.

   One pointer listener, one rAF loop, three effects:
     1. .aura        — a soft blue light that follows the cursor
     2. .cursor      — a lagging pixel-square cursor ring (fine pointers)
     3. [data-magnet] / .btn — elements lean toward the pointer
     4. [data-tilt]  — cards tip in 3D toward the pointer

   Everything is skipped for coarse pointers and for
   prefers-reduced-motion, and the loop idles when the pointer
   has not moved.
   ============================================================ */

const MAGNET = '.btn, [data-magnet]'
const HOT = 'a, button, [data-magnet], input, select, textarea, [role="button"]'

export function startInteractions() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduce) return () => {}

  const aura = document.querySelector('.aura')
  const cursor = document.querySelector('.cursor')
  if (cursor) document.body.classList.add('has-cursor')

  // Create a custom cursor dot element to show the exact pointer position
  const cursorDot = document.createElement('div')
  cursorDot.className = 'cursor-dot'
  cursorDot.style.cssText = 'position: fixed; width: 8px; height: 8px; background: rgba(59, 130, 246, 0.8); border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%); box-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4);'  
  document.body.appendChild(cursorDot)

  let px = window.innerWidth / 2
  let py = window.innerHeight / 2
  let cx = px
  let cy = py
  let ax = px
  let ay = py
  let magnet = null
  let tilt = null
  let magRect = null
  let tiltRect = null
  let dirty = true
  let moved = false
  let raf = 0
  let alive = true

  /* Rects are measured once per target and refreshed on scroll/resize.
     Measuring inside the frame loop forces a synchronous layout every
     frame, which is what makes a big desktop page feel like it hangs. */
  function measure() {
    magRect = magnet && magnet.isConnected ? magnet.getBoundingClientRect() : null
    tiltRect = tilt && tilt.isConnected ? tilt.getBoundingClientRect() : null
    dirty = true
  }

  function onMove(e) {
    px = e.clientX
    py = e.clientY
    // Update cursor dot position immediately for precise tracking
    cursorDot.style.left = px + 'px'
    cursorDot.style.top = py + 'px'
    dirty = true
    moved = true
  }

  function onOver(e) {
    const t = e.target
    if (!(t instanceof Element)) return
    const m = t.closest(MAGNET)
    const ti = t.closest('[data-tilt]')
    if (m !== magnet || ti !== tilt) {
      if (magnet && magnet !== m) magnet.style.transform = ''
      if (tilt && tilt !== ti) resetTilt(tilt)
      magnet = m
      tilt = ti
      measure()
    }
    if (cursor) cursor.classList.toggle('is-hot', !!t.closest(HOT))
  }

  function resetTilt(el) {
    el.style.setProperty('--tx', '0deg')
    el.style.setProperty('--ty', '0deg')
    el.style.setProperty('--sg', '0')
  }

  function onDown() { cursor && cursor.classList.add('is-down') }
  function onUp() { cursor && cursor.classList.remove('is-down') }
  function onLeave() {
    if (cursor) cursor.classList.remove('is-on')
    if (aura) aura.classList.remove('is-on')
    // Hide cursor dot when leaving the page
    cursorDot.style.opacity = '0'
    if (magnet) magnet.style.transform = ''
    if (tilt) resetTilt(tilt)
    magnet = null
    tilt = null
    magRect = null
    tiltRect = null
  }
  function onEnter() {
    if (cursor) cursor.classList.add('is-on')
    if (aura) aura.classList.add('is-on')
    // Show cursor dot when entering the page
    cursorDot.style.opacity = '1'
  }

  function applyMagnet(el, r) {
    if (!r.width) return
    const dx = px - (r.left + r.width / 2)
    const dy = py - (r.top + r.height / 2)
    const reach = Math.max(r.width, r.height) * 0.7 + 90
    const d = Math.hypot(dx, dy)
    if (d > reach) {
      el.style.transform = ''
      return
    }
    const pull = (1 - d / reach) * 0.22
    el.style.transform =
      'translate3d(' + (dx * pull).toFixed(2) + 'px,' + (dy * pull * 1.35).toFixed(2) + 'px,0)'
  }

  function applyTilt(el, r) {
    if (!r.width) return
    const nx = (px - r.left) / r.width - 0.5
    const ny = (py - r.top) / r.height - 0.5
    el.style.setProperty('--tx', (ny * -7).toFixed(2) + 'deg')
    el.style.setProperty('--ty', (nx * 7).toFixed(2) + 'deg')
    el.style.setProperty('--sx', ((px - r.left) / r.width * 100).toFixed(1) + '%')
    el.style.setProperty('--sy', ((py - r.top) / r.height * 100).toFixed(1) + '%')
    el.style.setProperty('--sg', '1')
  }

  function frame() {
    raf = 0
    if (!alive) return

    /* cursor ring lags behind the true pointer */
    cx += (px - cx) * 0.22
    cy += (py - cy) * 0.22
    if (cursor) cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)'

    /* the aura trails the pointer a little — written straight onto the
       element so no inherited custom property invalidates the tree */
    if (aura) {
      ax += (px - ax) * 0.13
      ay += (py - ay) * 0.13
      aura.style.transform = 'translate3d(' + ax.toFixed(1) + 'px,' + ay.toFixed(1) + 'px,0)'
    }

    if (magnet && magRect) applyMagnet(magnet, magRect)
    if (tilt && tiltRect) applyTilt(tilt, tiltRect)

    const settled =
      Math.abs(px - cx) < 0.35 && Math.abs(py - cy) < 0.35 &&
      Math.abs(px - ax) < 0.35 && Math.abs(py - ay) < 0.35
    /* idle when the pointer has stopped — scroll and pointermove wake it */
    if (!settled || moved) raf = requestAnimationFrame(frame)
    else dirty = false
    moved = false
  }

  function kick() {
    if (!raf && alive) raf = requestAnimationFrame(frame)
  }

  /* scroll moves the targets under a still pointer — re-measure lazily */
  let measRaf = 0
  function onScrollOrResize() {
    if (!magnet && !tilt) return
    if (measRaf) return
    measRaf = requestAnimationFrame(() => {
      measRaf = 0
      measure()
      kick()
    })
  }

  function wrappedMove(e) {
    onMove(e)
    kick()
  }

  window.addEventListener('pointermove', wrappedMove, { passive: true })
  window.addEventListener('pointerover', onOver, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  window.addEventListener('pointerup', onUp, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  /* keep the ring moving while the page scrolls under a still pointer */
  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
  onEnter()

  return function stop() {
    alive = false
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', wrappedMove)
    window.removeEventListener('pointerover', onOver)
    window.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointerup', onUp)
    document.removeEventListener('mouseleave', onLeave)
    document.removeEventListener('mouseenter', onEnter)
    window.removeEventListener('scroll', onScrollOrResize)
    window.removeEventListener('resize', onScrollOrResize)
    document.body.classList.remove('has-cursor')
    // Remove the cursor dot element on cleanup
    if (cursorDot && cursorDot.parentNode) cursorDot.parentNode.removeChild(cursorDot)
    if (magnet) magnet.style.transform = ''
    if (tilt) resetTilt(tilt)
  }
}

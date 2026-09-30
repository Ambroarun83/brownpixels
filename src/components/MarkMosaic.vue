<script setup>
/* ============================================================
   MarkMosaic — the brand mark sliced into a grid of tiles.
   Each tile shows its own piece of the real artwork, so the
   mark can be assembled tile by tile (loader) or re-scattered
   on hover anywhere it is used.

   scatter: tiles start flung outward from the centre and fly
   into place, each one flashing as it lands.
   ============================================================ */
import { computed } from 'vue'

const props = defineProps({
  n: { type: Number, default: 12 },
  src: { type: String, default: '/img/logo-mark.png' },
  play: { type: Boolean, default: false },
  step: { type: Number, default: 42 },   // ms of stagger per diagonal
  delay: { type: Number, default: 0 },
  scatter: { type: Boolean, default: false }
})

const cells = computed(() => {
  const mid = (props.n - 1) / 2
  const out = []
  for (let y = 0; y < props.n; y++) {
    for (let x = 0; x < props.n; x++) {
      /* deterministic pseudo-random so the flight is stable between renders */
      const seed = Math.sin((x * 12.9898 + y * 78.233) * 43758.5453)
      const frac = seed - Math.floor(seed)
      const ang = frac * Math.PI * 2
      const push = 34 + frac * 46
      const s = {
        backgroundImage: 'url(' + props.src + ')',
        backgroundPosition:
          (props.n > 1 ? (x / (props.n - 1)) * 100 : 0).toFixed(2) + '% ' +
          (props.n > 1 ? (y / (props.n - 1)) * 100 : 0).toFixed(2) + '%',
        transitionDelay: props.delay + (x + y) * props.step + 'ms',
        animationDelay: props.delay + (x + y) * props.step + 'ms'
      }
      if (props.scatter) {
        const dx = (x - mid) / (props.n / 2)
        const dy = (y - mid) / (props.n / 2)
        s['--dx'] = (dx * push + Math.cos(ang) * 10).toFixed(1) + '%'
        s['--dy'] = (dy * push + Math.sin(ang) * 10).toFixed(1) + '%'
        s['--rot'] = ((frac - 0.5) * 70).toFixed(1) + 'deg'
      }
      out.push({ k: x + '-' + y, style: s })
    }
  }
  return out
})
</script>

<template>
  <div
    class="mosaic"
    :class="{ 'is-in': play, 'is-scatter': scatter }"
    :style="{ '--n': n, '--span': (2 * n - 2) * step + delay + 300 + 'ms' }"
    aria-hidden="true"
  >
    <i v-for="c in cells" :key="c.k" :style="c.style"></i>
    <span class="mosaic__scan"></span>
  </div>
</template>

<style scoped>
.mosaic {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(var(--n), 1fr);
  grid-template-rows: repeat(var(--n), 1fr);
}

.mosaic i {
  background-repeat: no-repeat;
  background-size: calc(var(--n) * 100%) calc(var(--n) * 100%);
  opacity: 0;
}

.mosaic:not(.is-scatter) i { transform: scale(0.24); }
.mosaic.is-scatter i {
  transform: translate3d(var(--dx, 0), var(--dy, 0), 0) scale(0.14) rotate(var(--rot, 0deg));
}

.mosaic i {
  transition: opacity 0.34s var(--ease-out), transform 0.9s var(--ease-out);
}
.mosaic.is-in i {
  opacity: 1;
  transform: none;
  animation: land 0.75s var(--ease-out) both;
}

@keyframes land {
  0% { filter: brightness(2.6) saturate(1.5); }
  50% { filter: brightness(1.5) saturate(1.2); }
  100% { filter: none; }
}

/* a single scan line sweeps the grid while the tiles land */
.mosaic__scan {
  position: absolute;
  left: -4%;
  right: -4%;
  top: 0;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, rgba(125, 182, 255, 0.95), transparent);
  opacity: 0;
  pointer-events: none;
}
.mosaic.is-in .mosaic__scan {
  animation: scan var(--span) var(--ease-in-out) both;
}
@keyframes scan {
  0% { top: 0; opacity: 0; }
  14% { opacity: 1; }
  84% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .mosaic i { opacity: 1; transform: none; transition: none; animation: none; }
  .mosaic__scan { display: none; }
}
</style>

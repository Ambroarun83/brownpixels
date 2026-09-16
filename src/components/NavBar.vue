<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="nav-wrap">
    <div class="container">
      <div class="nav glass" :class="{ scrolled: scrolled }">
        <a href="#" class="brand" aria-label="Brown Pixels home">
          <img src="/assets/logo-icon.png" alt="" class="brand-icon" width="30" height="30" />
          <span class="brand-text">BROWN<span class="dot">·</span>PIXELS</span>
        </a>

        <nav class="links" aria-label="Primary">
          <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
        </nav>

        <a href="#contact" class="btn btn-primary cta-desktop">Start a Project</a>

        <button class="menu-toggle" :aria-expanded="menuOpen" aria-label="Toggle menu" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>

      <transition name="drop">
        <nav v-if="menuOpen" class="mobile-menu glass" aria-label="Mobile">
          <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
          <a href="#contact" class="btn btn-primary" @click="closeMenu">Start a Project</a>
        </nav>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 16px;
  z-index: 50;
  padding-bottom: 4px;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 20px;
  transition: box-shadow 0.3s ease, background 0.3s ease, border-radius 0.3s ease;
}

.nav.scrolled {
  background: var(--glass-bg-strong);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  flex-shrink: 0;
}

.brand-icon {
  border-radius: 3px;
}

.brand-text {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.03em;
}

.brand-text .dot {
  color: var(--accent);
}

.links {
  display: none;
  gap: 32px;
}

.links a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 13.5px;
  transition: color 0.15s ease;
}

.links a:hover {
  color: var(--text);
}

.cta-desktop {
  display: none;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 6px;
}

.menu-toggle span {
  width: 20px;
  height: 1.5px;
  background: var(--text);
  display: block;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px 20px;
  margin-top: 10px;
}

.mobile-menu a {
  color: var(--text-dim);
  text-decoration: none;
  padding: 12px 0;
  font-size: 15px;
  border-bottom: 1px solid var(--glass-border-soft);
}

.mobile-menu .btn {
  margin-top: 16px;
  justify-content: center;
  border: none;
}

.drop-enter-active, .drop-leave-active {
  transition: opacity 0.2s ease;
}
.drop-enter-from, .drop-leave-to {
  opacity: 0;
}

@media (min-width: 900px) {
  .links {
    display: flex;
  }
  .cta-desktop {
    display: inline-flex;
  }
  .menu-toggle {
    display: none;
  }
}
</style>

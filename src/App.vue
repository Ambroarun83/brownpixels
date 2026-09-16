<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import CapabilityStrip from './components/CapabilityStrip.vue'
import WhatWeBuild from './components/WhatWeBuild.vue'
import FeaturedWork from './components/FeaturedWork.vue'
import OurClients from './components/OurClients.vue'
import TheDifference from './components/TheDifference.vue'
import OurApproach from './components/OurApproach.vue'
import TechnologySection from './components/TechnologySection.vue'
import WhoWeWorkWith from './components/WhoWeWorkWith.vue'
import AboutSection from './components/AboutSection.vue'
import CtaSection from './components/CtaSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="bg-field" aria-hidden="true">
    <span class="orb-1"></span>
    <span class="orb-2"></span>
    <span class="orb-3"></span>
  </div>
  <NavBar />
  <main id="main">
    <HeroSection />
    <CapabilityStrip />
    <WhatWeBuild />
    <FeaturedWork />
    <OurClients />
    <TheDifference />
    <OurApproach />
    <TechnologySection />
    <WhoWeWorkWith />
    <AboutSection />
    <CtaSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--accent);
  color: var(--accent-text);
  padding: 12px 20px;
  z-index: 100;
}

.skip-link:focus {
  left: 12px;
  top: 12px;
}
</style>

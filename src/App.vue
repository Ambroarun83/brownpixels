<script setup>
import { ref, onMounted } from 'vue'

const submitted = ref(false)
const submitting = ref(false)
const formError = ref('')
const form = ref({ name: '', email: '', company: '', budget: '', message: '', website: '' })

const services = [
  { n: '01', title: 'Websites', text: 'High-conviction marketing sites that make the right first impression and turn visitors into conversations.' },
  { n: '02', title: 'Web applications', text: 'Custom tools shaped around your workflows, users, permissions, data and real business logic.' },
  { n: '03', title: 'Business systems', text: 'CRMs, dashboards, ERPs and internal platforms that replace scattered manual work with one system.' },
  { n: '04', title: 'Automation & APIs', text: 'Connect systems, remove repetitive steps and make everyday operations run with less friction.' },
]

const work = [
  { title: 'Leafy', tag: 'Website / Demo', text: 'A polished product-style web experience built as a live demonstration for the Leafy concept.', url: 'https://leafy-demo.vercel.app', accent: 'leafy' },
  { title: 'Upliftidea', tag: 'Digital Studio', text: 'A focused studio presence designed to communicate services, trust and conversion without clutter.', url: 'https://upliftidea.digital', accent: 'uplift' },
  { title: 'North & Form', tag: 'Concept / Demo', text: 'A premium brand system and commerce-style experience concept for a modern product company.', accent: 'north' },
  { title: 'Arc Ledger', tag: 'Concept / Demo', text: 'A finance operations dashboard concept showing how dense information can still feel controlled.', accent: 'arc' },
]

const nav = [
  ['Work', '#work'], ['Services', '#services'], ['Approach', '#approach'], ['About', '#about'], ['Contact', '#contact']
]

async function submitForm() {
  submitting.value = true
  formError.value = ''
  submitted.value = false
  try {
    const res = await fetch('/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.success) throw new Error(data.message || 'Unable to send your message.')
    submitted.value = true
    form.value = { name: '', email: '', company: '', budget: '', message: '', website: '' }
  } catch (err) {
    formError.value = err.message || 'Something went wrong. Please email brownpixels.co@gmail.com directly.'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view')
    })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Brown Pixels home">
        <span class="brand-bp">BP</span>
        <span class="brand-name">BROWN <em>PIXELS</em></span>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a v-for="item in nav" :key="item[0]" :href="item[1]">{{ item[0] }}</a>
      </nav>
      <a class="header-cta" href="#contact">Start a project <span>↗</span></a>
    </header>

    <main id="top">
      <section class="hero section-grid">
        <div class="hero-main panel-line">
          <div class="eyebrow mono">Digital products & software</div>
          <h1><span>Ideas in.</span><span class="accent-text">Software out.</span></h1>
          <p class="hero-copy mono">We design and build websites, web applications and business systems that fit the way your business actually works.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#contact">Start a project <span>↗</span></a>
            <a class="button button-secondary" href="#work">See selected work <span>↓</span></a>
          </div>
          <div class="hero-footer-note mono">WEB / APPS / SYSTEMS / AUTOMATION</div>
        </div>
        <div class="hero-art panel-line" aria-label="Brown Pixels icon">
          <div class="hero-art-label mono">EST. SOFTWARE STUDIO</div>
          <div class="logo-mark-wrap">
            <img src="/assets/brown-pixels-icon.png" alt="Brown Pixels 3D pixel icon" class="logo-mark" />
          </div>
          <div class="hero-art-bottom mono"><span>BP—01</span><span>SCROLL TO BUILD</span></div>
        </div>
      </section>

      <div class="marquee-wrap panel-line" aria-label="Capabilities">
        <div class="marquee">
          <span v-for="i in 2" :key="i"><template v-for="(x, idx) in ['Websites','Web apps','Business systems','APIs','Automation','AI-ready builds']" :key="idx"><b>{{ x }}</b><i>✦</i></template></span>
        </div>
      </div>

      <section id="services" class="services section-grid">
        <div v-for="service in services" :key="service.n" class="service-card panel-line">
          <span class="service-number">{{ service.n }}</span>
          <div class="service-content">
            <h2>{{ service.title }}</h2>
            <p>{{ service.text }}</p>
            <span class="service-arrow">↗</span>
          </div>
        </div>
      </section>

      <section id="work" class="work section-padding">
        <div class="section-heading reveal">
          <div>
            <span class="eyebrow-small mono">Our clients & selected work</span>
            <h2>Our clients.<br/><span class="accent-text">Built with intent.</span></h2>
          </div>
          <p class="section-index mono">04 / 04</p>
        </div>

        <div class="work-grid">
          <article v-for="(project, index) in work" :key="project.title" class="work-card reveal" :class="project.accent">
            <div class="work-card-top mono"><span>{{ String(index + 1).padStart(2, '0') }}</span><span>{{ project.tag }}</span></div>
            <div class="project-visual">
              <div class="visual-window">
                <div class="window-bar"><i></i><i></i><i></i><span>{{ project.title.toUpperCase() }}</span></div>
                <div class="visual-grid">
                  <div class="visual-hero"></div>
                  <div class="visual-copy"><span></span><span></span><span></span></div>
                  <div class="visual-stats"><b></b><b></b><b></b></div>
                </div>
              </div>
            </div>
            <div class="work-card-body">
              <h3>{{ project.title }}</h3>
              <p>{{ project.text }}</p>
              <a v-if="project.url" :href="project.url" target="_blank" rel="noreferrer" class="text-link">Open live demo <span>↗</span></a>
              <span v-else class="concept-pill mono">Concept direction</span>
            </div>
          </article>
        </div>
        <p class="work-note mono">Concept cards are illustrative. Named client work is shown with live links where available.</p>
      </section>

      <section id="approach" class="approach section-grid">
        <div class="approach-intro panel-line">
          <span class="eyebrow-small mono">Approach</span>
          <h2>No mystery.<br/><span class="accent-text">Just good work.</span></h2>
          <p>Clear thinking before pixels. A build process that stays close to the business problem, the people using the product and the result you need.</p>
        </div>
        <div class="steps">
          <div class="step panel-line reveal"><span class="step-no">01</span><div><h3>Discover</h3><p>We map the goals, audience, workflows and constraints before deciding what to build.</p></div></div>
          <div class="step panel-line reveal"><span class="step-no">02</span><div><h3>Design</h3><p>We create a visual direction that makes the brand feel distinct, clear and credible.</p></div></div>
          <div class="step panel-line reveal"><span class="step-no">03</span><div><h3>Build</h3><p>Vue-powered interfaces, practical APIs, responsive systems and production-ready foundations.</p></div></div>
          <div class="step panel-line reveal"><span class="step-no">04</span><div><h3>Launch</h3><p>Deployment, handover and the small details that make the final product feel finished.</p></div></div>
        </div>
      </section>

      <section id="about" class="about section-padding">
        <div class="about-grid">
          <div class="about-title reveal"><span class="eyebrow-small mono">About Brown Pixels</span><h2>Small studio.<br/><span class="accent-text">Serious output.</span></h2></div>
          <div class="about-copy reveal">
            <p class="lead">Brown Pixels is built for businesses that have outgrown generic websites and disconnected tools.</p>
            <p>From focused marketing sites to internal platforms, the goal stays the same: make the digital side of the business clearer, faster and easier to use.</p>
            <div class="about-meta mono"><span>DESIGN + DEVELOPMENT</span><span>WEB-FIRST</span><span>BUSINESS-MINDED</span></div>
          </div>
        </div>
      </section>

      <section id="contact" class="contact section-grid">
        <div class="contact-intro panel-line">
          <span class="eyebrow-small mono">Start a project</span>
          <h2>Tell us what<br/><span class="accent-text">you’re building.</span></h2>
          <p>Have a website in mind, a workflow to improve or a product that needs a proper digital home? Send the details. We’ll take it from there.</p>
          <a href="mailto:brownpixels.co@gmail.com" class="email-link">brownpixels.co@gmail.com <span>↗</span></a>
        </div>
        <form class="contact-form panel-line" @submit.prevent="submitForm">
          <div class="field-row">
            <label><span>Name *</span><input v-model.trim="form.name" required maxlength="80" type="text" placeholder="Your name" /></label>
            <label><span>Email *</span><input v-model.trim="form.email" required maxlength="120" type="email" placeholder="you@company.com" /></label>
          </div>
          <div class="field-row">
            <label><span>Company</span><input v-model.trim="form.company" maxlength="100" type="text" placeholder="Company / brand" /></label>
            <label><span>Approx. budget</span><select v-model="form.budget"><option value="">Select a range</option><option>₹15k–₹25k</option><option>₹25k–₹50k</option><option>₹50k–₹1L</option><option>₹1L+</option><option>Not sure yet</option></select></label>
          </div>
          <label><span>What are we building? *</span><textarea v-model.trim="form.message" required maxlength="2500" rows="6" placeholder="Tell us about the project, current problem and what success looks like."></textarea></label>
          <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true" />
          <div class="form-bottom">
            <button class="button button-primary" type="submit" :disabled="submitting">{{ submitting ? 'Sending…' : 'Send enquiry' }} <span>↗</span></button>
            <p class="form-status success" v-if="submitted">Message sent. We’ll get back to you soon.</p>
            <p class="form-status error" v-else-if="formError">{{ formError }}</p>
          </div>
        </form>
      </section>
    </main>

    <footer class="site-footer">
      <div><strong>BROWN PIXELS</strong><span>Digital products & software</span></div>
      <div class="footer-center mono"><span>© {{ new Date().getFullYear() }} Brown Pixels. All rights reserved.</span><span>Made for businesses that want to move forward.</span></div>
      <a href="#top" class="back-top">Back to top ↑</a>
    </footer>
  </div>
</template>

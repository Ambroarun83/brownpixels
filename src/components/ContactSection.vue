<script setup>
import { reactive, ref } from 'vue'
import { siteConfig } from '../config.js'

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  buildWhat: '',
  budget: '',
  message: ''
})

const status = ref('idle') // idle | sending | success | error
const errorMessage = ref('')

function validate() {
  if (!form.name.trim()) return 'Enter your name.'
  if (!form.email.trim() || !form.email.includes('@')) return 'Enter a valid email address.'
  if (!form.buildWhat.trim()) return 'Tell us what you want to build.'
  if (!form.message.trim()) return 'Add a short message.'
  return null
}

async function handleSubmit() {
  const validationError = validate()
  if (validationError) {
    status.value = 'error'
    errorMessage.value = validationError
    return
  }

  status.value = 'sending'
  errorMessage.value = ''

  try {
    const res = await fetch(siteConfig.formEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        buildWhat: form.buildWhat,
        budget: form.budget,
        message: form.message,
        _subject: `New project inquiry — ${form.name}`
      })
    })

    if (res.ok) {
      status.value = 'success'
      Object.keys(form).forEach((k) => (form[k] = ''))
    } else {
      status.value = 'error'
      errorMessage.value = "That didn't go through. Try again, or email us directly."
    }
  } catch (e) {
    status.value = 'error'
    errorMessage.value = "That didn't go through. Try again, or email us directly."
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container contact-grid">
      <div class="contact-copy glass panel">
        <h2>Let's build something useful.</h2>

        <form class="form" @submit.prevent="handleSubmit" novalidate>
          <div class="row">
            <label class="field">
              <span>Name</span>
              <input v-model="form.name" type="text" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span>Business / Company</span>
              <input v-model="form.company" type="text" name="company" autocomplete="organization" />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span>Email</span>
              <input v-model="form.email" type="email" name="email" autocomplete="email" required />
            </label>
            <label class="field">
              <span>Phone / WhatsApp</span>
              <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" />
            </label>
          </div>

          <label class="field">
            <span>What do you want to build?</span>
            <input v-model="form.buildWhat" type="text" name="buildWhat" placeholder="A CRM for our sales team" required />
          </label>

          <label class="field">
            <span>Budget range (optional)</span>
            <select v-model="form.budget" name="budget">
              <option value="">Select a range</option>
              <option value="Under ₹1,00,000">Under ₹1,00,000</option>
              <option value="₹1,00,000 – ₹3,00,000">₹1,00,000 – ₹3,00,000</option>
              <option value="₹3,00,000 – ₹10,00,000">₹3,00,000 – ₹10,00,000</option>
              <option value="₹10,00,000+">₹10,00,000+</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>

          <label class="field">
            <span>Message</span>
            <textarea v-model="form.message" name="message" rows="4" required></textarea>
          </label>

          <p v-if="status === 'error'" class="status error" role="alert">{{ errorMessage }}</p>
          <p v-if="status === 'success'" class="status success" role="status">
            Message sent. We'll get back to you shortly.
          </p>

          <button type="submit" class="btn btn-primary" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : 'Start the Conversation' }}
          </button>
        </form>
      </div>

      <div class="contact-details glass panel">
        <div class="detail">
          <span class="label mono">Email</span>
          <a :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>
        </div>
        <div class="detail">
          <span class="label mono">WhatsApp</span>
          <a :href="`https://wa.me/${siteConfig.whatsappNumber}`" target="_blank" rel="noopener">Message us</a>
        </div>
        <div class="detail">
          <span class="label mono">Instagram</span>
          <a :href="siteConfig.instagramUrl" target="_blank" rel="noopener">@brownpixels.co</a>
        </div>
        <div class="detail">
          <span class="label mono">Location</span>
          <span>{{ siteConfig.location }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.panel {
  padding: 36px 30px;
}

h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 4.4vw, 44px);
  letter-spacing: -0.01em;
  margin-bottom: 36px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 560px;
}

.row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--text-dim);
}

input,
select,
textarea {
  background: var(--glass-bg);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--text);
  padding: 12px 16px;
  font-size: 14.5px;
  font-family: inherit;
}

input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

textarea {
  resize: vertical;
}

.status {
  font-size: 13.5px;
  padding: 10px 0;
}

.status.error {
  color: #E0745C;
}

.status.success {
  color: var(--accent);
}

button[disabled] {
  opacity: 0.6;
  cursor: default;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 50px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}

.detail .label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.detail a {
  text-decoration: none;
  font-size: 15px;
}

.detail a:hover {
  color: var(--accent);
}

@media (min-width: 700px) {
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 980px) {
  .contact-grid {
    grid-template-columns: 1.3fr 1fr;
    gap: 70px;
  }
}
</style>

<script setup>
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { CONFIG, PLACEHOLDER_EMAIL, digits, isConfigured, validEmail, formatPhone } from '../config.js'

const services = [
  'Website',
  'Web Application',
  'Business Software',
  'CRM / ERP',
  'AI Solution',
  'Automation',
  'API / Integration',
  'Google Business',
  'Digital Marketing',
  'Other / Custom Project'
]

const form = ref({
  name: '',
  business: '',
  phone: '',
  email: '',
  location: '',
  service: '',
  need: '',
  description: '',
  method: 'WhatsApp'
})

const errors = ref({})
const busy = ref(false)
const status = ref(null) // { type, title, body, message }

const waOK = computed(() => isConfigured(CONFIG.whatsapp))
const emOK = computed(() => validEmail(CONFIG.email))

const RULES = [
  { key: 'name', test: (v) => v.trim().length >= 2, msg: 'Please enter your name' },
  { key: 'phone', test: (v) => digits(v).length >= 8, msg: 'Please enter a valid phone number' },
  { key: 'email', test: (v) => validEmail(v), msg: 'Please enter a valid email address' },
  { key: 'service', test: (v) => v.trim().length > 0, msg: 'Please choose a category' },
  { key: 'description', test: (v) => v.trim().length >= 10, msg: 'Please add a short description' }
]

function checkField(key) {
  const rule = RULES.find((r) => r.key === key)
  if (!rule) return
  const bad = !rule.test(form.value[key] || '')
  if (bad) errors.value[key] = rule.msg
  else delete errors.value[key]
}

function validate() {
  RULES.forEach((r) => checkField(r.key))
  return Object.keys(errors.value).length === 0
}

function buildMessage() {
  const d = form.value
  return (
    'New project enquiry — Brown Pixels\n' +
    '────────────────────────────\n' +
    'Name: ' + d.name.trim() + '\n' +
    (d.business.trim() ? 'Business: ' + d.business.trim() + '\n' : '') +
    'Phone: ' + d.phone.trim() + '\n' +
    'Email: ' + d.email.trim() + '\n' +
    (d.location.trim() ? 'Location: ' + d.location.trim() + '\n' : '') +
    'Service: ' + d.service + '\n' +
    (d.need.trim() ? 'Need: ' + d.need.trim() + '\n' : '') +
    'Preferred contact: ' + d.method + '\n\n' +
    'Project description:\n' + d.description.trim()
  )
}

function submit() {
  if (busy.value) return
  status.value = null

  if (!validate()) {
    status.value = {
      type: 'err',
      title: 'Check the form',
      body: 'A few fields still need attention before this can be sent.'
    }
    return
  }

  const message = buildMessage()
  const d = form.value
  const subject = 'Project enquiry — ' + (d.business.trim() || d.name.trim()) + ' — ' + d.service
  const waURL = 'https://wa.me/' + digits(CONFIG.whatsapp) + '?text=' + encodeURIComponent(message)
  const mailURL =
    'mailto:' + (emOK.value ? CONFIG.email : PLACEHOLDER_EMAIL) +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(message)

  busy.value = true

  window.setTimeout(() => {
    busy.value = false
    const viaEmail = d.method === 'Email' && emOK.value
    const channel = viaEmail ? 'email' : waOK.value ? 'whatsapp' : emOK.value ? 'email' : null
    const url = viaEmail ? mailURL : waURL
    const label = viaEmail ? 'your email app' : 'WhatsApp'

    if (!channel) {
      status.value = {
        type: 'warn',
        title: 'Contact details not configured',
        body:
          'Set your WhatsApp number and email in src/config.js to receive enquiries. Your message is ready below — copy it and send it manually in the meantime.',
        message
      }
      return
    }

    /* A real anchor keeps the user-gesture chain intact (popup blockers
       are far less likely to interfere than window.open). */
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()

    status.value = {
      type: 'ok',
      title: 'Opening ' + label,
      body:
        'Your enquiry has been prepared and opened in ' + label +
        ' — review it and hit send. If nothing opened, use the link below or copy the message.',
      message,
      url
    }
  }, 380)
}

async function copyMessage() {
  if (!status.value) return
  const text = status.value.message
  try {
    await navigator.clipboard.writeText(text)
    status.value.copied = true
  } catch (e) {
    const pre = document.querySelector('.status__pre')
    if (pre) {
      const range = document.createRange()
      range.selectNodeContents(pre)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      status.value.copied = 'selected'
    }
  }
  window.setTimeout(() => {
    if (status.value) status.value.copied = false
  }, 2600)
}
</script>

<template>
  <section id="contact" class="section section--band contact">
    <div class="shell contact__grid">
      <div class="contact__aside" v-reveal>
        <p class="sec-head__num mono"><b>10</b><span>Start a project</span></p>
        <h2 class="display contact__title">Have something <em>worth building?</em></h2>
        <p class="lede" style="margin-top: 20px">
          Tell us what you’re working on. Whether you need a website, business system, web
          application, AI-powered solution or a stronger digital presence, let’s discuss what makes
          sense for your business.
        </p>

        <div class="direct">
          <a
            v-if="waOK"
            class="direct__row direct__row--wa"
            :href="'https://wa.me/' + digits(CONFIG.whatsapp)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppIcon name="whatsapp" :size="18" />
            <span>
              <span class="mono direct__label">WhatsApp</span>
              <strong>{{ formatPhone(CONFIG.whatsapp) }}</strong>
            </span>
          </a>
          <div v-else class="direct__row is-off">
            <AppIcon name="whatsapp" :size="18" />
            <span>
              <span class="mono direct__label">WhatsApp</span>
              <strong class="todo">Add your number</strong>
            </span>
          </div>

          <a v-if="emOK" class="direct__row" :href="'mailto:' + CONFIG.email">
            <AppIcon name="mail" :size="18" />
            <span>
              <span class="mono direct__label">Email</span>
              <strong>{{ CONFIG.email }}</strong>
            </span>
          </a>
          <div v-else class="direct__row is-off">
            <AppIcon name="mail" :size="18" />
            <span>
              <span class="mono direct__label">Email</span>
              <strong class="todo">Add your email</strong>
            </span>
          </div>

          <a
            v-if="isConfigured(CONFIG.phone)"
            class="direct__row"
            :href="'tel:+' + digits(CONFIG.phone)"
          >
            <AppIcon name="phone" :size="18" />
            <span>
              <span class="mono direct__label">Phone</span>
              <strong>{{ formatPhone(CONFIG.phone) }}</strong>
            </span>
          </a>
        </div>

        <p class="note">
          <AppIcon name="info" :size="16" />
          <span>
            This build ships with no backend: the form prepares a structured enquiry and hands it to
            WhatsApp or your email app — nothing is stored on a server.
          </span>
        </p>
      </div>

      <form class="form" novalidate @submit.prevent="submit" v-reveal="{ delay: 100 }">
        <div class="form__grid">
          <div class="field" :class="{ 'has-error': errors.name }">
            <label for="c-name">Name <span class="req">*</span></label>
            <input id="c-name" v-model="form.name" type="text" autocomplete="name" placeholder="Your name" @blur="checkField('name')" />
            <span class="err">{{ errors.name }}</span>
          </div>

          <div class="field">
            <label for="c-business">Business name</label>
            <input id="c-business" v-model="form.business" type="text" autocomplete="organization" placeholder="Business or brand" />
          </div>

          <div class="field" :class="{ 'has-error': errors.phone }">
            <label for="c-phone">Phone <span class="req">*</span></label>
            <input id="c-phone" v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+91 00000 00000" @blur="checkField('phone')" />
            <span class="err">{{ errors.phone }}</span>
          </div>

          <div class="field" :class="{ 'has-error': errors.email }">
            <label for="c-email">Email <span class="req">*</span></label>
            <input id="c-email" v-model="form.email" type="email" autocomplete="email" placeholder="you@business.com" @blur="checkField('email')" />
            <span class="err">{{ errors.email }}</span>
          </div>

          <div class="field">
            <label for="c-location">Business location</label>
            <input id="c-location" v-model="form.location" type="text" autocomplete="address-level2" placeholder="City / town" />
          </div>

          <div class="field" :class="{ 'has-error': errors.service }">
            <label for="c-service">Service / category <span class="req">*</span></label>
            <select id="c-service" v-model="form.service" @blur="checkField('service')">
              <option value="">Select a category</option>
              <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
            </select>
            <span class="err">{{ errors.service }}</span>
          </div>

          <div class="field field--full">
            <label for="c-need">What do you need?</label>
            <input id="c-need" v-model="form.need" type="text" placeholder="In one line — e.g. a booking system for two branches" />
          </div>

          <div class="field field--full" :class="{ 'has-error': errors.description }">
            <label for="c-desc">Project description <span class="req">*</span></label>
            <textarea
              id="c-desc"
              v-model="form.description"
              placeholder="Tell us about the business, what you are trying to solve, and any timelines or constraints."
              @blur="checkField('description')"
            ></textarea>
            <span class="err">{{ errors.description }}</span>
          </div>

          <div class="field field--full">
            <span class="field__label">Preferred contact method</span>
            <div class="radios">
              <label v-for="m in ['WhatsApp', 'Phone', 'Email']" :key="m" class="radio">
                <input v-model="form.method" type="radio" name="method" :value="m" />
                <i></i>{{ m }}
              </label>
            </div>
          </div>
        </div>

        <div class="form__foot">
          <button class="btn btn--flame" type="submit" :class="{ 'is-loading': busy }" :disabled="busy">
            <span v-if="!busy">Send enquiry</span>
            <span v-else>Preparing</span>
            <span class="btn__dot"><AppIcon name="arrow" /></span>
          </button>
          <p class="form__note">We’ll use these details only to respond to your enquiry.</p>
        </div>

        <Transition name="pop">
          <div v-if="status" class="status" :class="'status--' + status.type" role="status" aria-live="polite">
            <p class="status__title mono">{{ status.title }}</p>
            <p class="status__body">
              {{ status.body }}
              <a v-if="status.url" :href="status.url" target="_blank" rel="noopener">Open it manually</a>
            </p>
            <pre v-if="status.message" class="status__pre">{{ status.message }}</pre>
            <button v-if="status.message" type="button" class="copy" @click="copyMessage">
              {{ status.copied === true ? 'Copied ✓' : status.copied === 'selected' ? 'Selected — press ⌘/Ctrl + C' : 'Copy message' }}
            </button>
          </div>
        </Transition>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(30px, 4vw, 68px);
  align-items: start;
}
.contact__title { margin-top: 4px; font-size: clamp(2rem, 1rem + 4vw, 3.6rem); }
.contact__title em { color: var(--copper); }

.direct { display: grid; gap: 10px; margin-top: 34px; }
.direct__row {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 15px 17px;
  border: 1px solid var(--hair);
  border-radius: 14px;
  background: var(--tint);
  transition: border-color 0.4s var(--ease-out), background-color 0.4s var(--ease-out),
    transform 0.4s var(--ease-out);
}
.direct__row:hover {
  border-color: rgba(0, 105, 254, 0.45);
  background: rgba(0, 105, 254, 0.07);
  transform: translateY(-2px);
}
.direct__row.is-off { opacity: 0.55; }
.direct__row--wa svg { color: var(--wa); }
.direct__row--wa:hover { border-color: rgba(15, 122, 61, 0.55); background: rgba(15, 122, 61, 0.08); }
.direct__row svg { color: var(--copper); flex: none; }
.direct__label { display: block; color: var(--ink-soft); margin-bottom: 3px; }
.direct__row strong { font-weight: 500; font-size: 15px; }
.direct__row .todo { font-style: italic; font-weight: 400; color: var(--ink-faint); }

.note {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  margin-top: 26px;
  padding: 15px 17px;
  border-left: 2px solid var(--copper);
  border-radius: 0 12px 12px 0;
  background: linear-gradient(90deg, rgba(61, 139, 255, 0.08), transparent);
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-faint);
}
.note svg { flex: none; margin-top: 3px; color: var(--copper); }
.note code { font-family: var(--font-mono); font-size: 12px; color: var(--copper); }

/* ---------------------------------------------------------- form */
.form {
  padding: clamp(22px, 2.6vw, 34px);
  border: 1px solid var(--hair);
  border-radius: 24px;
  background: linear-gradient(165deg, var(--surface), var(--surface-2));
  box-shadow: inset 0 1px 0 var(--hi), 0 50px 90px -60px rgba(5, 11, 24, 0.16);
}
.form__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.field { display: grid; gap: 7px; }
.field--full { grid-column: 1 / -1; }
.field label, .field__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.req { color: var(--copper); }
.field input, .field select, .field textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--hair);
  border-radius: 12px;
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 14.5px;
  transition: border-color 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out),
    background-color 0.3s var(--ease-out);
}
.field textarea { resize: vertical; min-height: 112px; line-height: 1.6; }
.field input::placeholder, .field textarea::placeholder { color: var(--ink-ghost); }
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none;
  border-color: rgba(0, 105, 254, 0.6);
  background: rgba(0, 105, 254, 0.06);
  box-shadow: 0 0 0 3px rgba(0, 105, 254, 0.14);
}
.field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%23a35c22' stroke-width='1.4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 38px;
  cursor: pointer;
}
.field select option { background: var(--surface); color: var(--ink); }
.has-error input, .has-error select, .has-error textarea { border-color: var(--copper); }
.err {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c62a12;
  min-height: 0;
}

.radios { display: flex; flex-wrap: wrap; gap: 9px; }
.radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 16px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  transition: border-color 0.3s, color 0.3s, background-color 0.3s;
}
.radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.radio i {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 1px solid var(--hair);
  transition: background-color 0.3s, border-color 0.3s;
}
.radio:hover { border-color: var(--hair); color: var(--ink-soft); }
.radio:has(input:checked) {
  border-color: rgba(0, 105, 254, 0.5);
  background: rgba(0, 105, 254, 0.1);
  color: var(--ink);
}
.radio:has(input:checked) i { background: var(--blue); border-color: var(--blue); }

.form__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid var(--hair-soft);
}
.form__note { flex: 1 1 200px; font-size: 12.5px; line-height: 1.55; color: var(--ink-faint); }
.btn.is-loading { opacity: 0.7; pointer-events: none; }

.status {
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid var(--hair);
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.6;
}
.status--ok { border-color: rgba(125, 182, 255, 0.45); background: rgba(0, 105, 254, 0.09); }
.status--err { border-color: rgba(0, 105, 254, 0.6); background: rgba(0, 105, 254, 0.1); }
.status--warn { border-color: var(--hair); background: var(--tint); }
.status__title { color: var(--copper); margin-bottom: 6px; }
.status--err .status__title { color: #c62a12; }
.status__body { color: var(--ink-soft); }
.status__body a { color: var(--copper); text-decoration: underline; text-underline-offset: 3px; }
.status__pre {
  margin-top: 12px;
  padding: 13px 15px;
  max-height: 210px;
  overflow: auto;
  border: 1px solid var(--hair-soft);
  border-radius: 10px;
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--ink-faint);
  white-space: pre-wrap;
}
.copy {
  margin-top: 11px;
  padding: 8px 14px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  transition: border-color 0.3s, color 0.3s;
}
.copy:hover { border-color: rgba(0, 105, 254, 0.5); color: var(--ink); }

.pop-enter-active, .pop-leave-active { transition: opacity 0.35s var(--ease-out), transform 0.4s var(--ease-out); }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 940px) {
  .contact__grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .form__grid { grid-template-columns: 1fr; }
}
</style>

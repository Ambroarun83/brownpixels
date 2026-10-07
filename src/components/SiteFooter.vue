<script setup>
import AppIcon from './AppIcon.vue'
import { CONFIG, digits, formatPhone, validEmail } from '../config.js'
import { goTop } from '../composables/scrollToTop.js'

const year = new Date().getFullYear()

const socials = [
  { key: 'instagram', icon: 'instagram', label: 'Instagram' },
  { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
  { key: 'github', icon: 'github', label: 'GitHub' },
  { key: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp' }
]

const emailOK = validEmail(CONFIG.email)
const phoneOK = digits(CONFIG.phone).length >= 8
const waOK = digits(CONFIG.whatsapp).length >= 8
</script>

<template>
  <footer class="footer theme-dark">
    <div class="shell">
      <div class="footer__top">
        <div class="footer__brand">
          <img
            src="/img/logo-lockup-dark.png"
            srcset="/img/logo-lockup-dark.png 1x, /img/logo-lockup-dark@2x.png 2x"
            alt="Brown Pixels"
            width="180"
            height="61"
          />
          <span class="mono footer__tag">Digital Products &amp; Software</span>
          <p class="footer__line">
            Websites <span>·</span> Web Apps <span>·</span> Business Systems <span>·</span> AI
            <span>·</span> Digital Growth
          </p>

          <ul class="footer__direct">
            <li v-if="emailOK">
              <a :href="'mailto:' + CONFIG.email">
                <AppIcon name="mail" :size="16" />
                <span>{{ CONFIG.email }}</span>
              </a>
            </li>
            <li v-if="phoneOK">
              <a :href="'tel:+' + digits(CONFIG.phone)">
                <AppIcon name="phone" :size="16" />
                <span>{{ formatPhone(CONFIG.phone) }}</span>
              </a>
            </li>
            <li v-if="waOK" class="is-wa">
              <a :href="'https://wa.me/' + digits(CONFIG.whatsapp)" target="_blank" rel="noopener noreferrer">
                <AppIcon name="whatsapp" :size="16" />
                <span>WhatsApp {{ formatPhone(CONFIG.whatsapp) }}</span>
              </a>
            </li>
          </ul>

          <div class="footer__socials">
            <template v-for="s in socials" :key="s.key">
              <a
                v-if="CONFIG.social[s.key]"
                :href="CONFIG.social[s.key]"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
              >
                <AppIcon :name="s.icon" :size="17" />
              </a>
              <span
                v-else
                class="is-unset"
                :title="s.label + ' link not added yet — set it in src/config.js'"
                :aria-label="s.label + ' link not added yet'"
              >
                <AppIcon :name="s.icon" :size="17" />
              </span>
            </template>
          </div>
        </div>

        <nav class="footer__col" aria-label="Navigate">
          <h4 class="mono">Navigate</h4>
          <ul>
            <li><a href="#top" @click="goTop($event)">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#ai">AI &amp; automation</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#approach">Approach</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#faq">FAQs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <nav class="footer__col" aria-label="Capabilities">
          <h4 class="mono">Capabilities</h4>
          <ul>
            <li><a href="#services">Websites</a></li>
            <li><a href="#services">Web applications</a></li>
            <li><a href="#services">Business systems</a></li>
            <li><a href="#ai">AI &amp; automation</a></li>
            <li><a href="#services">Digital growth</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer__bottom">
        <p class="mono">© {{ year }} Brown Pixels. All rights reserved.</p>
        <nav class="footer__legal" aria-label="Legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms &amp; Conditions</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: clamp(56px, 7vw, 88px);
  padding-bottom: 30px;
  border-top: 1px solid var(--hair-soft);
  background:
    radial-gradient(80% 120% at 12% 0%, rgba(0, 105, 254, 0.12), transparent 62%),
    linear-gradient(180deg, #0a162c 0%, #050b18 100%);
}
.footer__top {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 4vw, 60px);
  padding-bottom: clamp(36px, 5vw, 60px);
}
.footer__brand img { width: clamp(150px, 14vw, 190px); height: auto; }
.footer__tag { display: block; margin-top: 20px; color: var(--ember-lit); }
.footer__line { margin-top: 10px; font-size: 14px; color: var(--ink-faint); max-width: 36ch; }
.footer__line span { color: var(--copper); }

.footer__direct { display: grid; gap: 4px; margin-top: 20px; }
.footer__direct a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  font-size: 14px;
  color: var(--ink-soft);
  transition: color 0.3s var(--ease-out), transform 0.35s var(--ease-out);
}
.footer__direct a:hover { color: var(--blue-lit); transform: translateX(3px); }
.footer__direct svg { color: var(--ember-lit); flex: none; }
.footer__direct .is-wa svg { color: var(--wa-lit); }
.footer__direct .is-wa a:hover { color: var(--wa-lit); }

.footer__socials { display: flex; gap: 9px; margin-top: 24px; }
.footer__socials a, .footer__socials .is-unset {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid var(--hair);
  border-radius: 11px;
  color: var(--ink-faint);
  transition: border-color 0.35s var(--ease-out), color 0.35s var(--ease-out),
    background-color 0.35s var(--ease-out), transform 0.35s var(--ease-out);
}
.footer__socials .is-unset { opacity: 0.4; cursor: not-allowed; border-style: dashed; }
.footer__socials a:hover {
  border-color: rgba(125, 182, 255, 0.5);
  background: rgba(0, 105, 254, 0.12);
  color: var(--ember-lit);
  transform: translateY(-2px);
}

.footer__col h4 { color: var(--ink-faint); font-weight: 400; margin-bottom: 18px; }
.footer__col ul { display: grid; gap: 4px; }
.footer__col a {
  padding: 6px 0;
  font-size: 14.5px;
  color: var(--ink-soft);
  transition: color 0.3s var(--ease-out), transform 0.35s var(--ease-out);
  display: inline-block;
}
.footer__col a:hover { color: var(--blue-lit); transform: translateX(4px); }

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 24px;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid var(--hair-soft);
}
.footer__bottom p { color: var(--ink-faint); }
.footer__legal { display: flex; gap: 22px; }
.footer__legal a { color: var(--ink-faint); transition: color 0.3s; }
.footer__legal a:hover { color: var(--ink-soft); }

@media (max-width: 860px) {
  .footer__top { grid-template-columns: 1fr 1fr; }
  .footer__brand { grid-column: 1 / -1; }
}
@media (max-width: 520px) {
  .footer__top { grid-template-columns: 1fr; }
}
</style>

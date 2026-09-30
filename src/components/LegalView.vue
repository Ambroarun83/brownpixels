<script setup>
import { goTop } from '../composables/scrollToTop.js'
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({ doc: { type: String, default: 'privacy' } })

const copy = computed(() => {
  if (props.doc === 'terms') {
    return {
      kicker: 'Legal',
      title: 'Terms & Conditions',
      blocks: [
        {
          h: 'Using this website',
          p: [
            'This website is provided for information about Brown Pixels and the services we offer. You may browse, print and share pages for non-commercial reference. The content, layout and branding may not be copied or reused as your own.'
          ]
        },
        {
          h: 'Enquiries and quotes',
          p: [
            'Submitting an enquiry does not create a contract. Any scope, timeline, deliverables and commercial terms are agreed in writing before work begins.'
          ]
        },
        {
          h: 'Project work',
          list: [
            'Each project is governed by its own written agreement or quotation, which takes precedence over anything on this page.',
            'Where a service is delivered with partner support, we will tell you which parts are handled by a partner before the work starts.',
            'Third-party accounts, licences, hosting and API costs are billed at cost unless stated otherwise.'
          ]
        },
        {
          h: 'Intellectual property',
          p: [
            'On full payment, ownership of the custom work we produce for you transfers as set out in your project agreement. Pre-existing tools, libraries and frameworks we reuse remain licensed under their own terms.'
          ]
        },
        {
          h: 'Results and guarantees',
          p: [
            'We do not guarantee search rankings, lead volumes, sales figures, review counts or specific commercial outcomes. Digital marketing and visibility work depends on factors outside our control, including your market and competitors.'
          ]
        },
        {
          h: 'Liability',
          p: [
            'We take care in everything we build and we will put right defects in our own work as described in your project agreement. To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website or our services.'
          ]
        },
        {
          h: 'Changes',
          p: ['We may update these terms from time to time. The current version will always be published on this page.']
        }
      ]
    }
  }
  return {
    kicker: 'Legal',
    title: 'Privacy Policy',
    blocks: [
      {
        h: 'Who we are',
        p: [
          'Brown Pixels (“we”, “us”) is a digital products and software company. This policy explains what information we collect when you contact us or use our website, and what we do with it.'
        ]
      },
      {
        h: 'Information we collect',
        list: [
          'Details you submit through the project enquiry form: name, business name, phone number, email address, business location, the service you are interested in and your project description.',
          'Basic technical information such as browser type, device type and pages visited, collected in aggregate to understand how the site is used.'
        ]
      },
      {
        h: 'How we use it',
        list: [
          'To respond to your enquiry and discuss a potential project.',
          'To deliver, support and maintain work we carry out for you.',
          'To improve the website and its content.'
        ]
      },
      {
        h: 'Sharing',
        p: [
          'We do not sell your information. We share it only with service providers needed to run our business (for example hosting, email or messaging providers), or where required by law. Where a project is delivered with partner support, we will tell you before your details are shared with that partner.'
        ]
      },
      {
        h: 'Retention',
        p: [
          'Enquiry details are kept for as long as needed to respond to you and to maintain a record of the work discussed. You can ask us to delete your details at any time.'
        ]
      },
      {
        h: 'Your rights',
        p: [
          'You may request access to the information we hold about you, ask us to correct it, or ask us to delete it. Use the contact details on our website to make a request.'
        ]
      },
      {
        h: 'Cookies',
        p: [
          'This site uses only what it needs to function. If analytics or marketing tools are added later, this policy will be updated and consent will be requested where required.'
        ]
      },
      {
        h: 'Changes',
        p: ['We may update this policy as the business changes. The latest version will always be published on this page.']
      }
    ]
  }
})
</script>

<template>
  <main id="main" class="legal">
    <div class="shell legal__inner">
      <p class="eyebrow">{{ copy.kicker }}</p>
      <h1 class="display legal__title">{{ copy.title }}</h1>
      <p class="mono legal__stamp stamp">
        <AppIcon name="info" :size="14" /> Template — review with your advisor before publishing
      </p>

      <div v-for="b in copy.blocks" :key="b.h" class="block">
        <h2>{{ b.h }}</h2>
        <p v-for="(p, i) in b.p || []" :key="'p' + i">{{ p }}</p>
        <ul v-if="b.list">
          <li v-for="(l, i) in b.list" :key="'l' + i">{{ l }}</li>
        </ul>
      </div>

      <a class="link" href="#top" @click="goTop($event)">
        <AppIcon name="arrow" :size="16" /> Back to home
      </a>
    </div>
  </main>
</template>

<style scoped>
.legal { padding-top: clamp(130px, 17vh, 190px); padding-bottom: clamp(60px, 8vh, 110px); }
.legal__inner { max-width: 860px; }
.legal__title { margin-top: 18px; font-size: clamp(2.1rem, 1rem + 4vw, 3.4rem); }
.stamp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 8px 14px;
  border: 1px solid rgba(125, 182, 255, 0.4);
  border-radius: 999px;
  color: var(--blue-lit);
}
.block { margin-top: 40px; }
.block h2 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  margin-bottom: 12px;
}
.block p { font-size: 15px; line-height: 1.7; color: var(--ink-soft); max-width: 74ch; }
.block p + p { margin-top: 12px; }
.block ul { display: grid; gap: 10px; margin-top: 12px; }
.block li {
  position: relative;
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 74ch;
}
.block li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 5px;
  height: 5px;
  background: var(--blue);
  transform: rotate(45deg);
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 48px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--hair);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: border-color 0.3s, color 0.3s;
}
.link:hover { border-color: var(--blue-lit); color: var(--blue-lit); }
</style>

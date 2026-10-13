<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

/* Examples of AI and automation work to assess by business area. */
const areas = [
  {
    id: 'sales',
    label: 'Sales & enquiries',
    icon: 'growth',
    builds: [
      {
        title: 'AI enquiry assistant',
        copy: 'An assistant could answer questions from approved product information and hand off to a person where the workflow requires it.',
        needs: 'Your catalogue, price list and FAQs'
      },
      {
        title: 'Lead qualification & routing',
        copy: 'A scoped workflow could classify enquiries, prepare a summary and route them using agreed rules and available data.',
        needs: 'Where enquiries arrive today'
      },
      {
        title: 'Draft quotes in your format',
        copy: 'Turns an enquiry into a draft quote using your rates, templates and margins for a human to approve.',
        needs: 'A sample quote or rate card'
      },
      {
        title: 'Follow-up that knows when to stop',
        copy: 'Scheduled reminders can follow agreed stop rules when reply events are available from the connected channel.',
        needs: 'Your follow-up sequence and channel access'
      }
    ]
  },
  {
    id: 'support',
    label: 'Customer support',
    icon: 'puzzle',
    builds: [
      {
        title: 'Support assistant on your knowledge',
        copy: 'An assistant can use approved manuals, policies or ticket material as references, with response quality checked against real questions.',
        needs: 'Existing FAQs, docs or ticket history'
      },
      {
        title: 'Triage and suggested replies',
        copy: 'Sorts incoming messages by urgency and intent, and drafts a reply your team edits and sends.',
        needs: 'Your support inbox or helpdesk'
      },
      {
        title: '"Where is my order?" answered automatically',
        copy: 'A connected workflow could retrieve order or booking status and prepare a response, subject to data access and review requirements.',
        needs: 'Access to order/booking data'
      },
      {
        title: 'Replies in your customer’s language',
        copy: 'Language support can be evaluated with sample conversations and reviewed for terminology, accuracy and handoff needs.',
        needs: 'Sample conversations and preferred languages'
      }
    ]
  },
  {
    id: 'ops',
    label: 'Operations',
    icon: 'flow',
    builds: [
      {
        title: 'Documents into data',
        copy: 'A workflow could extract fields from invoices, orders or forms for review before they are entered into a connected system.',
        needs: '20–30 sample documents'
      },
      {
        title: 'Approvals with AI summaries',
        copy: 'Long requests summarised before approval, with unusual amounts or missing fields flagged.',
        needs: 'Your approval rules'
      },
      {
        title: 'Daily operations digest',
        copy: 'One clear message each morning: what moved, what stalled, what needs a decision.',
        needs: 'The data you already track'
      },
      {
        title: 'Scheduling and routing help',
        copy: 'Assisted planning for jobs, visits and deliveries against the constraints you work with.',
        needs: 'Current scheduling method'
      }
    ]
  },
  {
    id: 'finance',
    label: 'Finance & admin',
    icon: 'layers',
    builds: [
      {
        title: 'Invoice and receipt capture',
        copy: 'Photograph or forward a bill — it is read, categorised and matched against records.',
        needs: 'Sample bills and your chart of accounts'
      },
      {
        title: 'Collections follow-ups',
        copy: 'Polite, scheduled payment reminders drafted per customer, escalating only by your rules.',
        needs: 'Aging report or outstanding list'
      },
      {
        title: 'Exception alerts',
        copy: 'Duplicate entries, odd amounts and missing approvals surfaced before month-end.',
        needs: 'Access to your ledger or export'
      },
      {
        title: 'Plain-language management summaries',
        copy: 'Your dashboard explained in words: what changed, why, and what to look at.',
        needs: 'Existing reports'
      }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: 'spark',
    builds: [
      {
        title: 'On-brand content drafts',
        copy: 'Posts, captions, product descriptions and ad variants drafted in your voice — reviewed by a person before publishing.',
        needs: 'Brand guidelines and past content'
      },
      {
        title: 'Campaign visuals & variants',
        copy: 'Generated image concepts and size variants for ads, reels and print.',
        needs: 'Brand assets'
      },
      {
        title: 'Review and feedback summaries',
        copy: 'Customer reviews and survey answers clustered into themes you can act on.',
        needs: 'Review or survey source'
      },
      {
        title: 'Page and SEO copy suggestions',
        copy: 'Practical suggestions for titles, descriptions and on-page structure.',
        needs: 'Your site'
      }
    ]
  },
  {
    id: 'field',
    label: 'Field & inventory',
    icon: 'shield',
    builds: [
      {
        title: 'Stock forecasting & reorder alerts',
        copy: 'Historical inventory data can be assessed for useful reorder alerts or planning estimates before any rollout.',
        needs: 'Sales or issue history'
      },
      {
        title: 'Photo-based checks',
        copy: 'Count, grade or inspect from a phone photo — useful for quality checks and site reporting.',
        needs: 'Example photos and the checks you make'
      },
      {
        title: 'Voice notes into job reports',
        copy: 'Field staff speak; the system writes a structured report with photos and time stamps.',
        needs: 'Your report format'
      },
      {
        title: 'WhatsApp workflow for field teams',
        copy: 'Field updates or job queries could be handled through a suitable messaging integration, subject to account setup, platform access and permissions.',
        needs: 'WhatsApp Business account details and platform access'
      }
    ]
  }
]

const active = ref(0)

/* ------------------------------ interactive automation pipeline ------------------------------ */
const triggers = [
  { label: 'New WhatsApp enquiry', icon: 'whatsapp' },
  { label: 'Invoice PDF received', icon: 'mail' },
  { label: 'Website form submitted', icon: 'web' },
  { label: 'Every morning at 8am', icon: 'bolt' },
  { label: 'Stock below reorder level', icon: 'layers' }
]
const steps = [
  { label: 'Read & understand', copy: 'Extract the details that matter', icon: 'cpu' },
  { label: 'Classify & decide', copy: 'Route, prioritise, flag exceptions', icon: 'flow' },
  { label: 'Draft a response', copy: 'In your tone, ready to approve', icon: 'spark' },
  { label: 'Summarise & report', copy: 'A short digest for the owner', icon: 'growth' }
]
const actions = [
  { label: 'Create CRM record', icon: 'layers' },
  { label: 'Update ERP / sheet', icon: 'app' },
  { label: 'Reply on WhatsApp', icon: 'whatsapp' },
  { label: 'Notify the owner', icon: 'phone' },
  { label: 'Open a task', icon: 'check' }
]

const flow = ref({ t: 0, s: 0, a: 0 })

const how = [
  { n: '01', t: 'Find the work', c: 'We map where time actually goes and pick the jobs worth automating.' },
  { n: '02', t: 'Pilot small', c: 'One narrow flow, real data, measured against how you do it today.' },
  { n: '03', t: 'Wire it in', c: 'Integrations depend on confirmed access, platform limits and agreed scope.' },
  { n: '04', t: 'Hand it over', c: 'A clear handover with limits on what the AI may decide.' },
  { n: '05', t: 'Scale what worked', c: 'Extend to the next flow once the first one earns its place.' }
]
</script>

<template>
  <section id="ai" class="section ai theme-dark">
    <div class="ai__media" aria-hidden="true">
      <div class="ai__aurora"></div>
      <div class="ai__grid"></div>
    </div>

    <div class="shell">
      <div class="sec-head" v-reveal>
        <div>
          <p class="sec-head__num mono"><b>04</b><span>AI &amp; automation</span></p>
          <h2 class="display">Put AI where<br />it actually <em>pays.</em></h2>
        </div>
        <div>
          <p class="lede">
            Not every problem needs AI. We assess where it may help with repeated questions, document
            handling, updates or finding information, then scope a practical approach around your
            existing workflow.
          </p>
          <p class="ai__promise">
            <AppIcon name="shield" :size="16" />
            <span>
              These are examples to explore, not off-the-shelf promises. Feasibility, data handling,
              accuracy, human review, platform access and third-party costs are checked before scope
              is agreed. If a simpler rule or integration is a better fit, we’ll say so.
            </span>
          </p>
        </div>
      </div>

      <!-- ---------- what you can build, by area ---------- -->
      <div class="lab" v-reveal="{ delay: 80 }">
        <div class="lab__tabs" role="tablist" aria-label="Business areas">
          <button
            v-for="(a, i) in areas"
            :key="a.id"
            class="tab"
            :class="{ 'is-active': i === active }"
            role="tab"
            :aria-selected="i === active"
            @click="active = i"
          >
            <AppIcon :name="a.icon" :size="17" />
            <span>{{ a.label }}</span>
          </button>
        </div>

        <div class="lab__panel">
          <Transition name="fade" mode="out-in">
            <div :key="areas[active].id" class="lab__inner">
              <p class="lab__kicker mono">
                <AppIcon name="cpu" :size="14" />
                Ideas to assess for {{ areas[active].label.toLowerCase() }}
              </p>
              <ul class="builds">
                <li v-for="b in areas[active].builds" :key="b.title">
                  <h3>{{ b.title }}</h3>
                  <p>{{ b.copy }}</p>
                  <span class="builds__needs mono">
                    <AppIcon name="check" :size="13" />
                    You’ll need: {{ b.needs }}
                  </span>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>

      <!-- ---------- interactive automation pipeline ---------- -->
      <div class="pipe" v-reveal>
        <p class="pipe__title mono">
          <AppIcon name="flow" :size="15" />
          Try a flow — pick a trigger, an AI step and an action
        </p>

        <div class="pipe__row">
          <div class="node">
            <span class="node__tag mono">Trigger</span>
            <div class="node__main">
              <AppIcon :name="triggers[flow.t].icon" :size="20" />
              <strong>{{ triggers[flow.t].label }}</strong>
            </div>
            <div class="node__chips">
              <button
                v-for="(t, i) in triggers"
                :key="t.label"
                class="chip"
                :class="{ 'is-on': flow.t === i }"
                @click="flow.t = i"
              >{{ t.label }}</button>
            </div>
          </div>

          <div class="pipe__link" aria-hidden="true"><span class="packet"></span></div>

          <div class="node node--ai">
            <span class="node__tag mono">AI step</span>
            <div class="node__main">
              <AppIcon :name="steps[flow.s].icon" :size="20" />
              <strong>{{ steps[flow.s].label }}</strong>
              <em>{{ steps[flow.s].copy }}</em>
            </div>
            <div class="node__chips">
              <button
                v-for="(s, i) in steps"
                :key="s.label"
                class="chip"
                :class="{ 'is-on': flow.s === i }"
                @click="flow.s = i"
              >{{ s.label }}</button>
            </div>
          </div>

          <div class="pipe__link" aria-hidden="true"><span class="packet packet--2"></span></div>

          <div class="node">
            <span class="node__tag mono">Action</span>
            <div class="node__main">
              <AppIcon :name="actions[flow.a].icon" :size="20" />
              <strong>{{ actions[flow.a].label }}</strong>
            </div>
            <div class="node__chips">
              <button
                v-for="(a, i) in actions"
                :key="a.label"
                class="chip"
                :class="{ 'is-on': flow.a === i }"
                @click="flow.a = i"
              >{{ a.label }}</button>
            </div>
          </div>
        </div>

        <p class="pipe__note">
          <AppIcon name="info" :size="15" />
          <span>
            This is an illustrative flow, not a live integration. Connected actions depend on
            platform access and agreed scope; customer messages or account changes can require human
            approval.
          </span>
        </p>
      </div>

      <!-- ---------- how an AI project runs ---------- -->
      <div class="how" v-reveal>
        <h3 class="how__title">How an AI project actually runs</h3>
        <ol class="how__list">
          <li v-for="h in how" :key="h.n">
            <span class="how__n mono">{{ h.n }}</span>
            <strong>{{ h.t }}</strong>
            <p>{{ h.c }}</p>
          </li>
        </ol>
        <div class="how__cta">
          <a class="btn btn--flame" href="#contact">
            Ask what AI could do for your business
            <span class="btn__dot"><AppIcon name="arrow" /></span>
          </a>
          <a class="btn btn--ghost" href="#services">See everything we build</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ai {
  position: relative;
  overflow: hidden;
  border-block: 1px solid var(--hair-soft);
  background: radial-gradient(120% 100% at 18% 0%, #12203f 0%, #0a162c 55%, #050b18 100%);
}
.ai__media { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.ai__aurora {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(40% 38% at 18% 12%, rgba(0, 105, 254, 0.28), transparent 66%),
    radial-gradient(38% 36% at 82% 26%, rgba(125, 182, 255, 0.2), transparent 68%),
    radial-gradient(50% 44% at 60% 104%, rgba(61, 139, 255, 0.22), transparent 72%);
  filter: blur(14px);
  animation: float 20s var(--ease-in-out) infinite alternate;
}
@keyframes float {
  from { transform: translate3d(-2%, 0, 0) scale(1); }
  to { transform: translate3d(3%, -2%, 0) scale(1.08); }
}
.ai__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, rgba(234, 241, 255, 0.05) 1px, transparent 1px),
    linear-gradient(0deg, rgba(234, 241, 255, 0.05) 1px, transparent 1px);
  background-size: 76px 76px;
  mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent 78%);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent 78%);
}
.ai .shell { position: relative; z-index: 1; }

.ai h2 em { color: var(--blue-lit); }
.ai__promise {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  margin-top: 20px;
  padding: 14px 16px;
  border: 1px dashed rgba(125, 182, 255, 0.3);
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.ai__promise svg { flex: none; margin-top: 3px; color: var(--blue-lit); }

/* ------------------------------------------------------ explorer */
.lab {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.38fr);
  gap: clamp(16px, 2.4vw, 34px);
  align-items: start;
}
.lab__tabs { display: grid; gap: 7px; }
.tab {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 14px 16px;
  border: 1px solid var(--hair-soft);
  border-radius: 13px;
  text-align: left;
  font-size: 14.5px;
  color: var(--ink-soft);
  background: var(--tint);
  transition: border-color 0.4s var(--ease-out), background-color 0.4s var(--ease-out),
    color 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}
.tab svg { flex: none; color: var(--ink-faint); transition: color 0.4s; }
.tab:hover { border-color: rgba(125, 182, 255, 0.3); color: var(--ink); transform: translateX(3px); }
.tab.is-active {
  background: linear-gradient(96deg, rgba(0, 105, 254, 0.22), rgba(0, 105, 254, 0.05));
  border-color: rgba(125, 182, 255, 0.45);
  color: var(--ink);
  font-weight: 500;
}
.tab.is-active svg { color: var(--blue-lit); }

.lab__panel {
  padding: clamp(20px, 2.4vw, 30px);
  border: 1px solid var(--hair);
  border-radius: 22px;
  background: var(--glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: inset 0 1px 0 rgba(234, 241, 255, 0.07);
  min-height: 100%;
}
.lab__kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--blue-lit);
  margin-bottom: 20px;
}
.builds { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 26px; }
.builds li {
  padding-top: 16px;
  border-top: 1px solid var(--hair-soft);
}
.builds h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}
.builds p { font-size: 13.5px; line-height: 1.62; color: var(--ink-soft); }
.builds__needs {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  font-size: 11.5px;
  letter-spacing: 0.1em;
  color: var(--ink-faint);
}
.builds__needs svg { color: var(--blue-lit); flex: none; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.35s var(--ease-out), transform 0.45s var(--ease-out); }
.fade-enter-from { opacity: 0; transform: translateY(12px); }
.fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ------------------------------------------------------ pipeline */
.pipe { margin-top: clamp(34px, 4vw, 56px); }
.pipe__title {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--ink-faint);
  margin-bottom: 20px;
}
.pipe__title svg { color: var(--blue-lit); }

.pipe__row {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: 10px;
}
.node {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 18px;
  border: 1px solid var(--hair);
  border-radius: 16px;
  background: var(--tint);
}
.node--ai {
  border-color: rgba(125, 182, 255, 0.32);
  background: linear-gradient(165deg, rgba(0, 105, 254, 0.14), rgba(0, 105, 254, 0.03));
}
.node__tag { color: var(--ink-faint); }
.node__main { display: grid; gap: 4px; justify-items: center; text-align: center; padding: 6px 0 2px; }
.node__main svg { color: var(--blue-lit); }
.node__main strong { font-family: var(--font-display); font-size: 1rem; font-weight: 500; letter-spacing: -0.02em; }
.node__main em { font-style: normal; font-size: 12.5px; color: var(--ink-faint); line-height: 1.5; }
.node__chips { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
.chip {
  padding: 8px 13px;
  border: 1px solid var(--hair);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
  transition: border-color 0.3s, color 0.3s, background-color 0.3s;
}
.chip:hover { border-color: rgba(125, 182, 255, 0.45); color: var(--ink-soft); }
.chip.is-on {
  /* darker than the brand blue: white-on-#3d8bff only reaches 4.29:1
     at this 11px size, and WCAG AA wants 4.5. */
  background: linear-gradient(96deg, #0a3170, #1f66d4);
  border-color: transparent;
  color: #ffffff;
}

.pipe__link {
  position: relative;
  width: 44px;
  display: grid;
  place-items: center;
}
.pipe__link::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: linear-gradient(90deg, var(--hair), rgba(125, 182, 255, 0.5), var(--hair));
}
.packet {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--blue-lit);
  box-shadow: 0 0 12px rgba(125, 182, 255, 0.9);
  animation: travel 2.6s var(--ease-in-out) infinite;
}
.packet--2 { animation-delay: 0.5s; }
@keyframes travel {
  0% { transform: translateX(-18px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(18px); opacity: 0; }
}

.pipe__note {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  margin-top: 18px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-faint);
}
.pipe__note svg { flex: none; margin-top: 3px; color: var(--blue-lit); }

/* ------------------------------------------------------ how */
.how { margin-top: clamp(48px, 6vw, 84px); }
.how__title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}
.how__list { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1px; background: var(--hair-soft); border-radius: 16px; overflow: hidden; }
.how__list li { padding: 20px 18px; background: rgba(5, 11, 24, 0.72); display: grid; gap: 8px; align-content: start; }
.how__n { color: var(--blue); }
.how__list strong { font-family: var(--font-display); font-size: 1rem; font-weight: 500; letter-spacing: -0.02em; }
.how__list p { font-size: 12.5px; line-height: 1.6; color: var(--ink-faint); }
.how__cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }

/* ------------------------------------------------------ responsive */
@media (max-width: 1100px) {
  .lab { grid-template-columns: 1fr; }
  .lab__tabs { grid-template-columns: repeat(2, 1fr); }
  .how__list { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
  .builds { grid-template-columns: 1fr; }
  .pipe__row { grid-template-columns: 1fr; }
  .pipe__link { width: 100%; height: 34px; }
  .pipe__link::before { left: 50%; right: auto; top: 0; bottom: 0; width: 1px; height: auto; background: linear-gradient(180deg, var(--hair), rgba(125, 182, 255, 0.5), var(--hair)); }
  .packet { animation: travelv 2.6s var(--ease-in-out) infinite; }
  @keyframes travelv {
    0% { transform: translateY(-12px); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateY(12px); opacity: 0; }
  }
}
@media (max-width: 620px) {
  .lab__tabs { grid-template-columns: 1fr; }
  .how__list { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .ai__aurora, .packet { animation: none; }
}
</style>

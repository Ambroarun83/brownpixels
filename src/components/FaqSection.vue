<script setup>
const faqs = [
  {
    question: 'What does Brown Pixels build?',
    answer:
      'Brown Pixels designs and builds business websites, web applications, custom business systems, AI-enabled products and workflow automation. Digital presence and marketing support are also available.'
  },
  {
    question: 'Can you build software around our existing process?',
    answer:
      'Yes. Projects are shaped around the people, workflows, data and requirements involved, rather than forcing a business into a generic system.'
  },
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Brown Pixels works with businesses, startups, professionals and growing companies. The right scope and technology depend on the project.'
  },
  {
    question: 'Do you provide AI and automation services?',
    answer:
      'Yes. Services include AI assistants, integrations, API-based AI applications and automation for business workflows where these tools provide practical value.'
  },
  {
    question: 'How can I discuss a project?',
    answer:
      'Use the project enquiry form on this page or contact Brown Pixels by email or WhatsApp. Share your goals and a short description of what you need.'
  }
]
</script>

<template>
  <section id="faq" class="section section--rule faq">
    <div class="shell">
      <div class="faq__head">
        <p class="sec-head__num mono"><b>FAQ</b><span>Common questions</span></p>
        <h2 class="display">A few useful answers.</h2>
        <p class="lede">
          Clear answers about Brown Pixels’ software, web development and AI services.
        </p>
      </div>

      <dl class="faq__list">
        <div v-for="item in faqs" :key="item.question" class="faq__item">
          <dt>{{ item.question }}</dt>
          <dd>{{ item.answer }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.faq__head { max-width: 680px; }
.faq__head .lede { margin-top: 16px; }
.faq__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin-top: clamp(34px, 5vw, 64px);
  overflow: hidden;
  border: 1px solid var(--hair-soft);
  border-radius: 16px;
  background: var(--hair-soft);
}
.faq__item { padding: clamp(20px, 3vw, 30px); background: var(--ground); }
.faq__item dt { font-size: 17px; font-weight: 600; line-height: 1.4; }
.faq__item dd { margin-top: 10px; color: var(--ink-soft); font-size: 15px; line-height: 1.65; }

@media (max-width: 700px) {
  .faq__list { grid-template-columns: 1fr; }
}
</style>

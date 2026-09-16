<script setup>
import { siteConfig } from '../config.js'

const year = new Date().getFullYear()

</script>

<template>
  <footer class="footer">
    <div class="container">
    <div class="footer-top glass">
      <a href="#" class="footer-logo" aria-label="Brown Pixels home">BROWN<span>·</span>PIXELS</a>

      <div class="socials">
        <a :href="siteConfig.instagramUrl" target="_blank" rel="noopener">Instagram</a>
        <a :href="siteConfig.linkedinUrl" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="siteConfig.githubUrl" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    </div>

    <div class="container footer-bottom">
      <span class="mono">© {{ year }} Brown Pixels. All rights reserved.</span>
      <span class="tagline">Built for how you work.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 56px 0 28px;
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 28px;
}

.footer-logo {
  color: var(--text);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
}

.footer-logo span {
  color: var(--accent);
}

.socials a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 13.5px;
}

.socials a:hover {
  color: var(--text);
}

.socials {
  display: flex;
  gap: 20px;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 24px;
  font-size: 12px;
  color: var(--text-dim);
}

@media (min-width: 800px) {
  .footer-top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

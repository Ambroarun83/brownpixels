import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { reveal } from './composables/useReveal.js'

export function createSiteApp({ ssr = false } = {}) {
  const app = ssr ? createSSRApp(App) : createApp(App)
  return app.directive('reveal', reveal)
}

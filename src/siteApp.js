import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { reveal } from './composables/useReveal.js'

export function createSiteApp({ ssr = false, pathname = '/' } = {}) {
  const app = ssr ? createSSRApp(App) : createApp(App)
  const sitePath = ssr ? pathname : window.location.pathname
  app.provide('sitePath', sitePath)
  return app.directive('reveal', reveal)
}

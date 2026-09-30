import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './composables/useReveal.js'
import './styles/fonts.css'
import './styles/globals.css'

createApp(App).directive('reveal', reveal).mount('#app')

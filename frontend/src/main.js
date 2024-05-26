import { createApp } from 'vue'
import { createPinia } from 'pinia'
import createI18n from './i18n'
import App from './App.vue'
import router from './router'
import './style.css'


const app = createApp(App)

app.use(createPinia())
app.use(createI18n)
app.use(router)

app.mount('#app')

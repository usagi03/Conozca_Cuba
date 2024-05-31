import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
import { createI18n } from "vue-i18n";
import es from "@/languages/es.json";
import en from "@/languages/en.json";

const app = createApp(App)


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es,
        en
    }
})


app.use(i18n)
app.use(router)

app.mount('#app')

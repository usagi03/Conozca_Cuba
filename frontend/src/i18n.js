import { createI18n } from "vue-i18n";
import es from "@/languages/es.json";
import en from "@/languages/en.json";

const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es: es,
        en: en
    }
})
export default i18n;
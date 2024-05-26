import { createI18n } from "vue-i18n";
import es from "@/languages/es.json";
import en from "@/languages/en.json";

export default createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        es: es,
        en: en
    }
})
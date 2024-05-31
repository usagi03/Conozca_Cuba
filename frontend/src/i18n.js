import { createI18n } from "vue-i18n";
import es from "@/languages/es.json";
import en from "@/languages/en.json";
import { useFormsStore } from "./stores/forms";

 const store = useFormsStore()

const i18n = createI18n({
    locale: store.lang,
    fallbackLocale: 'en',
    messages: {
        es,
        en
    }
})
export default i18n;
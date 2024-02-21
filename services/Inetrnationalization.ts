import { createI18n } from "vue-i18n";

export function init_i18n(){
    const i18n = createI18n({
        locale: "en",
        fallbackLocale: "en",
    })
}
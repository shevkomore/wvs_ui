
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { bindStores } from './store'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

const app = createApp(App)

app.use(router)
bindStores(app)
app.use(vuetify)
.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#5C3780',
          secondary: '#d0c1d9',
          tertiary: '#f3b7bd',
          error: '#ffb4ab',
          'neutral-color': '#7b757c',
          'neutral-variant': '#7c757f',
        }
      }
    }
  }
})

createApp(App).use(router).use(vuetify).mount('#app')
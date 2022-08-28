import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ja from 'vuetify/lib/locale/ja'
import en from 'vuetify/lib/locale/en'
Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#003a56',
        secondary: '#75969F',
        accent: '#A2CBD6',
        error: '#FF5252',
        info: '#002C43',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { ja, en },
    current: localStorage.getItem('lang') || 'ja',
  },
  icons: {
    iconfont: 'md',
  },
})

import Vue from 'vue'
import VueHead from 'vue-head'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import config from '@config'
import vuetify from '@/plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/assets/styles/app.scss'
import i18n from '@/lang/i18n'

Vue.config.productionTip = false
Vue.prototype.appConfig = config
Vue.use(VueHead, {
  separator: '',
})

const Instance = new Vue({
  router,
  store,
  vuetify,
  helperMixin,
  validationMixin,
  authorityMixin,
  render: (h) => h(App),
  i18n,
}).$mount('#app')

export const { $store } = Instance

import Vue from 'vue'
import Vuex from 'vuex'
import { AuthStore } from './auth'
import { ToastStore } from './toast'
import { UserStore } from './user'
import { VersionStore } from './version'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthStore,
    toast: ToastStore,
    user: UserStore,
    version: VersionStore,
  },
})

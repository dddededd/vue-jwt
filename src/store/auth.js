import authService from '@/services/auth.service'
import router from '@/router'
import { encode, decode } from 'js-base64'

export const AuthStore = {
  state: {
    loggedIn: false,
    user: {},
  },
  getters: {
    getAuth(state) {
      return state.loggedIn
    },
    getAuthUser(state) {
      return state.user
    },
  },
  actions: {
    async checkLogin({ commit }) {
      if (
        localStorage.getItem('auth_access_token') ||
        localStorage.getItem('auth_refresh_token')
      ) {
        // get user from localstorage
        try {
          const adminUserBase64 = localStorage.getItem('auth_admin_user')
          const adminUser = JSON.parse(decode(adminUserBase64))
          commit('changeAuth', adminUser)
          return
        } catch {
          // ignore
        }
      }

      if (router.currentRoute.name !== 'Login') router.push({ name: 'Login' })
    },

    async login(context, data) {
      const response = await authService.signIn(data)

      // Login success
      if (response?.payload?.access_token) {
        const adminUser = response.payload.admin_user
        // update state logged in
        context.commit('changeAuth', adminUser)

        // save token to localstorage
        localStorage.setItem(
          'auth_access_token',
          response?.payload?.access_token
        )
        localStorage.setItem(
          'auth_refresh_token',
          response?.payload?.refresh_token
        )
        // save user to localstorage with encode base64
        const adminUserBase64 = encode(JSON.stringify(adminUser))
        localStorage.setItem('auth_admin_user', adminUserBase64)

        // go to home page
        router.push('/')
      }
    },

    async logout(context) {
      authService.clearLocalStorage()
      context.commit('changeAuth', {})

      // go to login page
      router.push('/login')
    },
  },
  mutations: {
    changeAuth(state, adminUser) {
      state.loggedIn = !!adminUser.id
      state.user = adminUser
    },
  },
}

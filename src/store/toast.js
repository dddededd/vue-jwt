export const ToastStore = {
  state: {
    snackText: '',
    snackColor: 'error',
    snackTimeout: 5000,
  },
  getters: {
    getSnackText(state) {
      return state.snackText
    },
    getSnackColor(state) {
      return state.snackColor
    },
    getSnackTimeout(state) {
      return state.snackTimeout
    },
  },
  actions: {
    showSnack({ commit }, payload) {
      commit('setSnackOption', payload)
    },
  },
  mutations: {
    setSnackOption(state, payload) {
      state.snackText = payload.text
      if (payload.color) {
        state.snackColor = payload.color
      }
      if (payload.timeout) {
        state.snackTimeout = payload.timeout
      }
    },
  },
}

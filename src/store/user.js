import router from '@/router'
import AdminUserService from '@/services/adminUser.service'
import { buildAdminUserRequest } from '@/services/build.service'

export const UserStore = {
  state: {
    adminUser: {},
    confirmedAminUser: {},
    completedAdminUser: {},
  },
  getters: {
    getAdminUser(state) {
      return state.adminUser
    },
    getConfirmedAminUser(state) {
      return state.confirmedAminUser
    },
    getUserCompleteData(state) {
      return state.completedAdminUser
    },
  },
  actions: {
    // set adminUser
    setAdminUser({ commit }, adminUser) {
      commit('setAdminUser', adminUser)
    },
    setConfirmedAminUser({ commit }, adminUser) {
      commit('setConfirmedAminUser', adminUser)
    },
    clearUserWhenLeaveFlow({ commit }, routerName) {
      const currentRouterName = router.currentRoute.name
      const addPages = ['UserAdd', 'UserAddConfirm', 'UserAddComplete']
      const editPages = ['UserEdit', 'UserEditConfirm', 'UserEditComplete']
      // check current flow is add or edit
      const pageChecks = currentRouterName.includes('Add')
        ? addPages
        : editPages
      // if to router outsides flow current, clear data
      if (!pageChecks.includes(routerName)) {
        commit('resetUser')
      }
    },
    async addUpdateAdminUser({ commit, state }, adminUserId = null) {
      let result = {}
      const adminUserRequest = buildAdminUserRequest(
        state.confirmedAminUser,
        state.confirmedAminUser.isEdit
      )
      if (
        state.confirmedAminUser.isEdit &&
        state.confirmedAminUser.admin_user_id === adminUserId
      ) {
        result = await AdminUserService.update(adminUserId, adminUserRequest)
      } else {
        result = await AdminUserService.add(adminUserRequest)
      }
      commit('setCompletedAdminUser', result)
    },
  },
  mutations: {
    setAdminUser(state, adminUser) {
      state.adminUser = adminUser
    },
    setConfirmedAminUser(state, confirmedAminUser) {
      state.confirmedAminUser = confirmedAminUser
    },
    setCompletedAdminUser(state, completedAdminUser) {
      state.completedAdminUser = completedAdminUser
    },
    resetUser(state) {
      state.adminUser = {}
      state.confirmedAminUser = {}
      state.completedAdminUser = {}
    },
  },
}

import httpClient from './httpClient.service'
import CONST from './constant'

export default {
  async signIn(data) {
    return await httpClient.post(CONST.API.SIGN_IN, data).then((response) => {
      return response
    })
  },

  async clearLocalStorage() {
    localStorage.removeItem('auth_access_token')
    localStorage.removeItem('auth_refresh_token')
    localStorage.removeItem('auth_admin_user')
  },
}

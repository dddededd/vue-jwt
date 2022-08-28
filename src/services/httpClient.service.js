import Axios from 'axios'
import CONST from '@/services/constant'
import { $store } from '@/main'
import appConfig from '@config'

const handlerError = (error) => {
  // push notification
  const errorMessage =
    error.response?.data?.error_msg || CONST.DEFAULT_ERROR_MESSAGE
  $store.dispatch('showSnack', {
    text: errorMessage,
  })
  return Promise.reject(error)
}

const httpClient = Axios.create({
  baseURL: appConfig?.api?.url,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
httpClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth_access_token')
    config.headers['AUTHORIZATION-CLIENT'] = appConfig.api.client
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
httpClient.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    const pathExcludeRefreshToken = [
      CONST.API.SIGN_IN,
      CONST.API.AUTH_JWT_REFRESH_TOKEN,
    ]
    const originalConfig = error.config

    switch (error.response?.status) {
      case 401:
        // Access Token was expired
        if (
          !pathExcludeRefreshToken.includes(error.config?.url) &&
          !originalConfig.retried
        ) {
          originalConfig.retried = true

          try {
            // refresh access token
            const refresh_response = await httpClient.post(
              CONST.API.AUTH_JWT_REFRESH_TOKEN,
              {
                refresh_token: localStorage.getItem('auth_refresh_token'),
              }
            )

            // save token to localstorage
            localStorage.setItem(
              'auth_access_token',
              refresh_response?.payload?.access_token
            )
            localStorage.setItem(
              'auth_refresh_token',
              refresh_response?.payload?.refresh_token
            )

            // retry request
            return httpClient(originalConfig)
          } catch (_error) {
            // refresh token error logout
            $store.dispatch('logout')
            return handlerError(_error)
          }
        }
        break
    }

    return handlerError(error)
  }
)

export default httpClient

import axios from "axios"
import { storage } from "../utils/storage"

const api = axios.create({
  baseURL: "https://api.pdinfinita.app/api/v1/",
  timeout: 15000
})

/*
--------------------------------------------------
REQUEST INTERCEPTOR
Adiciona automaticamente o access token
--------------------------------------------------
*/
api.interceptors.request.use((config) => {

  const token = storage.getAccess()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config

})


/*
--------------------------------------------------
REFRESH CONTROL
Evita múltiplos refresh simultâneos
--------------------------------------------------
*/
let isRefreshing = false
let queue = []

function processQueue(error, token = null) {

  queue.forEach((prom) => {

    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }

  })

  queue = []

}


/*
--------------------------------------------------
ENDPOINTS QUE NÃO DEVEM TENTAR REFRESH
--------------------------------------------------
*/
const AUTH_ROUTES = [
  "auth/login/",
  "auth/register/",
  "auth/recovery/",
  "auth/reset-password/",
  "auth/otp-verify/",
  "auth/refresh/"
]


/*
--------------------------------------------------
RESPONSE INTERCEPTOR
Trata refresh de token
--------------------------------------------------
*/
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config

    if (!error.response) {
      return Promise.reject(error)
    }

    /*
    ---------------------------------------
    Ignorar rotas de autenticação
    ---------------------------------------
    */
    if (AUTH_ROUTES.some(route => originalRequest.url.includes(route))) {
      return Promise.reject(error)
    }

    /*
    ---------------------------------------
    Se não for 401 ou já tentou retry
    ---------------------------------------
    */
    if (error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    const refreshToken = storage.getRefresh()

    if (!refreshToken) {

      storage.clear()

      return Promise.reject(error)

    }

    /*
    ---------------------------------------
    Se refresh já está acontecendo
    ---------------------------------------
    */
    if (isRefreshing) {

      return new Promise((resolve, reject) => {

        queue.push({

          resolve: (token) => {

            originalRequest.headers.Authorization = `Bearer ${token}`

            resolve(api(originalRequest))

          },

          reject

        })

      })

    }

    isRefreshing = true

    try {

      /*
      ---------------------------------------
      Chamada de refresh
      ---------------------------------------
      */
      const res = await api.post("auth/refresh/", {
        refresh: refreshToken
      })

      const newAccess = res.data.access

      storage.setAuth({
        access: newAccess,
        refresh: refreshToken,
        user: storage.getUser()
      })

      api.defaults.headers.common.Authorization = `Bearer ${newAccess}`

      processQueue(null, newAccess)

      originalRequest.headers.Authorization = `Bearer ${newAccess}`

      return api(originalRequest)

    }

    catch (err) {

      processQueue(err, null)

      storage.clear()

      return Promise.reject(err)

    }

    finally {

      isRefreshing = false

    }

  }

)

export default api
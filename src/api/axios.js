import axios from "axios"
import { storage } from "../utils/storage"
import { authApi } from "./authApi"

const api = axios.create({
  baseURL: "https://api.pdinfinita.app/api/v1/",
  timeout: 15000
})

api.interceptors.request.use((config) => {

  const token = storage.getAccess()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config

})

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

api.interceptors.response.use(

  response => response,

  async error => {

    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    const refreshToken = storage.getRefresh()

    if (!refreshToken) {
      storage.clear()
      window.location.href = "/login"
      return Promise.reject(error)
    }

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

      const res = await authApi.refresh(refreshToken)

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
      window.location.href = "/login"

      return Promise.reject(err)

    }

    finally {

      isRefreshing = false

    }

  }

)

export default api
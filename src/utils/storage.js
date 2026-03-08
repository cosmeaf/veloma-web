const ACCESS = "access_token"
const REFRESH = "refresh_token"
const USER = "auth_user"

export const storage = {

  setAuth({ access, refresh, user }) {

    if (access) localStorage.setItem(ACCESS, access)
    if (refresh) localStorage.setItem(REFRESH, refresh)
    if (user) localStorage.setItem(USER, JSON.stringify(user))

  },

  getAccess() {
    return localStorage.getItem(ACCESS)
  },

  getRefresh() {
    return localStorage.getItem(REFRESH)
  },

  getUser() {

    const raw = localStorage.getItem(USER)

    try {
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }

  },

  clear() {

    localStorage.removeItem(ACCESS)
    localStorage.removeItem(REFRESH)
    localStorage.removeItem(USER)

  }

}
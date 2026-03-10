import api from "./axios"

export const consentApi = {

  status: () => api.get("user-consents/status/"),

  versions: () => api.get("consent-versions/"),

  accept: (version) =>
    api.post("user-consents/", {
      version
    })

}
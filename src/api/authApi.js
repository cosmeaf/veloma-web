import api from "./axios"

export const authApi={
  login:(data)=>api.post("auth/login/",data),
  register:(data)=>api.post("auth/register/",data),
  logout:()=>api.post("auth/logout/"),
  recovery:(data)=>api.post("auth/recovery/",data),
  verifyOtp:(data)=>api.post("auth/otp-verify/",data),
  resetPassword:(data)=>api.post("auth/reset-password/",data),
  refresh:(refresh)=>api.post("auth/refresh/",{refresh})
}
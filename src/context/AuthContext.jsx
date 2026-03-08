import React,{createContext,useContext,useEffect,useMemo,useState} from "react"
import {storage} from "../utils/storage"
import {authApi} from "../api/authApi"

export const AuthContext=createContext(null)

function normalizeError(err){
  const data=err?.response?.data
  if(!data) return "Erro inesperado."
  if(typeof data==="string") return data
  if(data.detail) return data.detail
  const firstKey=Object.keys(data)[0]
  if(firstKey&&Array.isArray(data[firstKey])) return data[firstKey][0]
  if(firstKey&&typeof data[firstKey]==="string") return data[firstKey]
  return "Erro ao processar."
}

export function AuthProvider({children}){
  const [user,setUser]=useState(null)
  const [booting,setBooting]=useState(true)

  useEffect(()=>{
    const u=storage.getUser()
    if(u) setUser(u)
    setBooting(false)
  },[])

  const isAuthenticated=!!user

  const login=async({email,password})=>{
    const res=await authApi.login({email,password})
    storage.setAuth(res.data)
    setUser(res.data.user)
    return res.data.user
  }

  const register=async({first_name,last_name,email,password,password2})=>{
    const res=await authApi.register({first_name,last_name,email,password,password2})
    storage.setAuth(res.data)
    setUser(res.data.user)
    return res.data.user
  }

  const recovery=async({email})=>{
    const res=await authApi.recovery({email})
    return res.data
  }

  const verifyOtp=async({email,code})=>{
    const res=await authApi.verifyOtp({email,code})
    return res.data
  }

  const resetPassword=async({token,password,password2})=>{
    const res=await authApi.resetPassword({token,password,password2})
    return res.data
  }

  const logout=async()=>{
    try{await authApi.logout()}catch(e){}
    storage.clear()
    setUser(null)
  }

  const value=useMemo(()=>({
    user,
    booting,
    isAuthenticated,
    login,
    register,
    recovery,
    verifyOtp,
    resetPassword,
    logout,
    getRole(){return user?.role||null},
    normalizeError
  }),[user,booting,isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx=useContext(AuthContext)
  if(!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
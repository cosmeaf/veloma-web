import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function getDefaultRoute(role){

  if(role === "admin") return "/admin"

  if(role === "staff") return "/staff"

  return "/dashboard"

}

export default function RoleGuard({ allow, children }) {

  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const allowed = Array.isArray(allow) ? allow : [allow]

  if (!allowed.includes(user.role)) {
    return <Navigate to={getDefaultRoute(user.role)} replace />
  }

  return children
}
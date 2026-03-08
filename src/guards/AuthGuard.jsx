import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function AuthGuard({ children }) {

  const { booting, isAuthenticated } = useAuth()

  if (booting) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
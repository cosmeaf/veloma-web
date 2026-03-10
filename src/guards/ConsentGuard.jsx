import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { consentApi } from "../api/consentApi"

export default function ConsentGuard({ children }) {

  const [loading,setLoading] = useState(true)
  const [accepted,setAccepted] = useState(false)

  useEffect(() => {

    consentApi.status()
      .then(res => {
        setAccepted(res.data.accepted_all)
      })
      .catch(() => {
        setAccepted(false)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  if (loading) return null

  if (!accepted) {
    return <Navigate to="/consents" replace />
  }

  return children
}
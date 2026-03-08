import React from "react"
import { createContext, useContext, useMemo, useState } from "react"

const LoadingContext = createContext(null)

export function LoadingProvider({ children }) {

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const value = useMemo(() => ({
    isLoading,
    message,
    start(msg = "") {
      setMessage(msg)
      setIsLoading(true)
    },
    stop() {
      setIsLoading(false)
      setMessage("")
    }
  }), [isLoading, message])

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )

}

export function useLoading() {

  const ctx = useContext(LoadingContext)

  if (!ctx) {
    throw new Error("useLoading must be used within LoadingProvider")
  }

  return ctx

}
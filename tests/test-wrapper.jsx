import React from "react"
import { MemoryRouter } from "react-router-dom"

import { AuthProvider } from "../src/context/AuthContext"
import { LoadingProvider } from "../src/context/LoadingContext"

export function TestWrapper({ children }) {

  return (
    <MemoryRouter>

      <AuthProvider>

        <LoadingProvider>

          {children}

        </LoadingProvider>

      </AuthProvider>

    </MemoryRouter>
  )
}
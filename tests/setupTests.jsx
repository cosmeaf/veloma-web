import "@testing-library/jest-dom"

import React from "react"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

import { MemoryRouter } from "react-router-dom"

import { AuthProvider } from "../src/context/AuthContext"
import { LoadingProvider } from "../src/context/LoadingContext"

afterEach(() => {
  cleanup()
})

export function AllProviders({ children }) {

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
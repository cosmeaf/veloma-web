import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Login from "../src/pages/auth/Login"
import { AuthProvider } from "../src/context/AuthContext"
import { LoadingProvider } from "../src/context/LoadingContext"

test("Login page renderiza", () => {

  render(
    <MemoryRouter>
      <AuthProvider>
        <LoadingProvider>
          <Login />
        </LoadingProvider>
      </AuthProvider>
    </MemoryRouter>
  )

  expect(screen.getByRole("button", { name: /entrar no portal/i })).toBeInTheDocument()

})
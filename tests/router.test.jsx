import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Router from "../src/routes/Router"
import { AuthProvider } from "../src/context/AuthContext"
import { LoadingProvider } from "../src/context/LoadingContext"

test("Router renderiza rota login", () => {

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </AuthProvider>
    </MemoryRouter>
  )

})
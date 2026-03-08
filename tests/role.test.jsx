import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Router from "../src/routes/Router"
import { AuthContext } from "../src/context/AuthContext"

test("admin acessa rota admin", () => {

  const mockAuth = {
    user: { role: "admin" },
    isAuthenticated: true,
    booting: false
  }

  render(

    <AuthContext.Provider value={mockAuth}>

      <MemoryRouter initialEntries={["/admin"]}>

        <Router />

      </MemoryRouter>

    </AuthContext.Provider>

  )

})
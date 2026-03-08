import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Router from "../src/routes/Router"
import { AuthContext } from "../src/context/AuthContext"

test("admin pode acessar rota admin", () => {

  render(

    <AuthContext.Provider value={{
      user: { role: "admin", email: "admin@test.com" },
      isAuthenticated: true,
      booting: false
    }}>

      <MemoryRouter initialEntries={["/admin"]}>

        <Router />

      </MemoryRouter>

    </AuthContext.Provider>

  )

})
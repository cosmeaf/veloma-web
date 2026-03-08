import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Router from "../src/routes/Router"
import { AuthContext } from "../src/context/AuthContext"

test("staff não pode acessar admin", () => {

  render(

    <AuthContext.Provider value={{
      user: { role: "staff" },
      isAuthenticated: true,
      booting: false
    }}>

      <MemoryRouter initialEntries={["/admin"]}>

        <Router />

      </MemoryRouter>

    </AuthContext.Provider>

  )

})
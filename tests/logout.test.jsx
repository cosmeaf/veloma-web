import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Navbar from "../src/components/layout/Navbar"
import { AuthContext } from "../src/context/AuthContext"

test("logout limpa usuário", () => {

  const logout = vi.fn()

  const { getByText } = render(

    <AuthContext.Provider value={{
      user: { email: "test@test.com", role: "admin" },
      logout
    }}>

      <MemoryRouter>

        <Navbar />

      </MemoryRouter>

    </AuthContext.Provider>

  )

  fireEvent.click(getByText("Sair"))

  expect(logout).toHaveBeenCalled()

})
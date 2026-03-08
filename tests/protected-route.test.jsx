import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Router from "../src/routes/Router"
import { AuthContext } from "../src/context/AuthContext"
import { LoadingProvider } from "../src/context/LoadingContext"

test("usuário não autenticado é redirecionado", () => {

  render(

    <AuthContext.Provider value={{
      user: null,
      booting: false,
      isAuthenticated: false,
      logout: () => {},
      login: () => {},
      register: () => {},
      recovery: () => {},
      verifyOtp: () => {},
      resetPassword: () => {},
      getRole: () => null
    }}>

      <LoadingProvider>

        <MemoryRouter initialEntries={["/admin"]}>
          <Router />
        </MemoryRouter>

      </LoadingProvider>

    </AuthContext.Provider>

  )

})
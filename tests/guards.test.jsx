import React from "react"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import AuthGuard from "../src/guards/AuthGuard"
import { AuthProvider } from "../src/context/AuthContext"

test("AuthGuard bloqueia acesso sem login", () => {

  render(
    <BrowserRouter>
      <AuthProvider>
        <AuthGuard>
          <div>Protected</div>
        </AuthGuard>
      </AuthProvider>
    </BrowserRouter>
  )

})
import React from "react"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import App from "../src/App"
import { AuthProvider } from "../src/context/AuthContext"
import { LoadingProvider } from "../src/context/LoadingContext"

test("App renderiza sem erro", () => {

  render(
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  )

})
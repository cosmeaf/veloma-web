import { screen } from "@testing-library/react"
import { renderWithProviders } from "../test-utils"
import Register from "../../src/pages/auth/Register"

test("renderiza página de registro", () => {

  renderWithProviders(<Register />)

  expect(screen.getByRole("heading", { name: /criar conta/i })).toBeInTheDocument()

  expect(screen.getByLabelText(/^nome$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/sobrenome/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email corporativo/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^palavra-passe$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/confirmar palavra-passe/i)).toBeInTheDocument()

  expect(screen.getByRole("button", { name: /criar conta/i })).toBeInTheDocument()

})
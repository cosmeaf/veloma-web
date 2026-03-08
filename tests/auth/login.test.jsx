import { renderWithProviders } from "../test-utils"
import Login from "../../src/pages/auth/Login"
import { screen } from "@testing-library/react"

test("renderiza página de login", () => {
  renderWithProviders(<Login />)

  expect(screen.getByLabelText(/email corporativo/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/palavra-passe/i)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /entrar no portal/i })).toBeInTheDocument()
})
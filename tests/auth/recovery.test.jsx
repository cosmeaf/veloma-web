import { renderWithProviders } from "../test-utils"
import Recovery from "../../src/pages/auth/Recovery"

import { screen } from "@testing-library/react"

test("renderiza recovery", () => {

  renderWithProviders(<Recovery />)

  expect(screen.getByText(/recuper/i)).toBeInTheDocument()

})
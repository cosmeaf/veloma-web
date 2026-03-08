import Router from "../../src/routes/Router"
import { renderWithProviders } from "../test-utils"

test("fluxo de auth não quebra", () => {

  renderWithProviders(<Router />)

})
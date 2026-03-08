import Navbar from "../../src/components/layout/Navbar"
import { renderWithProviders } from "../test-utils"

test("navbar renderiza", () => {

  renderWithProviders(<Navbar />)

})
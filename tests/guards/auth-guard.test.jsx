import { renderWithProviders } from "../test-utils"
import AuthGuard from "../../src/guards/AuthGuard"

test("authguard renderiza", () => {

  renderWithProviders(

    <AuthGuard>
      <div>protected</div>
    </AuthGuard>

  )

})
import { renderWithProviders } from "../test-utils"
import RoleGuard from "../../src/guards/RoleGuard"

test("roleguard renderiza", () => {

  renderWithProviders(

    <RoleGuard roles={["admin"]}>
      <div>admin</div>
    </RoleGuard>

  )

})
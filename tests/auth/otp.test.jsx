import { renderWithProviders } from "../test-utils"
import VerifyOtp from "../../src/pages/auth/VerifyOtp"

test("renderiza otp page", () => {

  renderWithProviders(<VerifyOtp />)

})
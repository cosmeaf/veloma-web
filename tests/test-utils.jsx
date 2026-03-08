import { render } from "@testing-library/react"
import { AllProviders } from "./setupTests"

export function renderWithProviders(ui, options) {
  return render(ui, { wrapper: AllProviders, ...options })
}
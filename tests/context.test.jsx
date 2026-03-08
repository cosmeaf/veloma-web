import React from "react"
import { renderHook } from "@testing-library/react"

import { AuthProvider } from "../src/context/AuthContext"
import { useAuth } from "../src/hooks/useAuth"

test("AuthContext fornece user", () => {

  const wrapper = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  const { result } = renderHook(() => useAuth(), { wrapper })

  expect(result.current).toBeDefined()
  expect(result.current.user).toBeDefined()

})
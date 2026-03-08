export const authApi = {

  login: vi.fn(() =>
    Promise.resolve({
      data: {
        access: "token",
        refresh: "refresh",
        user: {
          email: "test@test.com",
          role: "admin"
        }
      }
    })
  ),

  register: vi.fn(() =>
    Promise.resolve({
      data: {
        access: "token",
        refresh: "refresh",
        user: {
          email: "test@test.com",
          role: "user"
        }
      }
    })
  ),

  recovery: vi.fn(() =>
    Promise.resolve({
      data: {
        detail: "Código enviado"
      }
    })
  ),

  verifyOtp: vi.fn(() =>
    Promise.resolve({
      data: {
        reset_token: "abc123"
      }
    })
  ),

  resetPassword: vi.fn(() =>
    Promise.resolve({
      data: {
        message: "Senha redefinida"
      }
    })
  )

}
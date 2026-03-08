import { storage } from "../src/utils/storage"

test("storage salva e recupera user", () => {

  const data = {
    access: "abc",
    refresh: "xyz",
    user: { email: "test@test.com", role: "admin" }
  }

  storage.setAuth(data)

  const stored = storage.getUser()

  expect(stored.email).toBe("test@test.com")

})
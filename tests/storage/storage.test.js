import { storage } from "../../src/utils/storage"

test("storage salva auth", () => {

  const data = {
    access: "token",
    refresh: "refresh",
    user: { email: "test@test.com" }
  }

  storage.setAuth(data)

  const user = storage.getUser()

  expect(user.email).toBe("test@test.com")

})
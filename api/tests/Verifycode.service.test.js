import test from "node:test";
import assert from "node:assert";
import { registerNewUser } from "../services/auth.service.js"

test("rechaza un código inválido", async () => {
  const request = {
    body: {
      user: "juan",
      email: "juan@test.com",
      password: "123456",
      code: 1234
    }
  };

  await assert.rejects(
    () => registerNewUser(request),
    {
      message: "El código de verificación no es válido"
    }
  );
});

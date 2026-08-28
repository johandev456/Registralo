import test from "node:test";
import assert from "node:assert/strict";
import { registerNewUser } from "../services/auth.service.js";
import { prisma } from "../prisma/client.js";

test("inserta un usuario en la base de datos", async () => {
  const email = `juan-${Date.now()}@test.com`;
  const request = {
    body: {
      user: `juan-${Date.now()}`,
      email,
      password: "123456",
      code: 9999
    }
  };

  try {
    const {user,email,password,code}=request.body;
    const createdUser = await registerNewUser(user,email,password,code);

    assert.equal(createdUser.email, email);
    assert.equal(createdUser.username, request.body.user);
    assert.notEqual(createdUser.password, request.body.password);

    const savedUser = await prisma.user.findUnique({ where: { email } });
    assert.ok(savedUser);
    assert.equal(savedUser.id, createdUser.id);
  } finally {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  }
});

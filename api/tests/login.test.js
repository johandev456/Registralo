import { loginUser } from "../services/auth.service.js";
import assert from "node:assert/strict";
import test from "node:test";
test("Verifica inicio de sesion", async () => {
  
  const request = {
    body: {
      user: `juanito`,
      password: "123456",
    }
  };

  try {
    const loginData = await loginUser(request.body.user,request.body.password);
  
    assert.equal(loginData.userData.username, request.body.user);
   

  } catch (error){

  }
});
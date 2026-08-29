import test from "node:test";
import assert from "node:assert/strict";
import { addAutoService} from "../services/auto.service.js";
import { prisma } from "../prisma/client.js";

test("inserta una automatizacion en la base de datos", async () => {
  
  const request = {
    body: {
      name:"prueba1",
      description:"descripcion de prueba",
      state:"Inactivo",
      start:"2004-02-13",
      comments:"nitido"
    }
  };

  try {
    
    const createdUser = await addAutoService(request.body);

    const savedAuto = await prisma.automation.findFirst({ where: { name:request.body.name } });
    assert.ok(savedAuto);
    assert.equal(savedAuto.name,request.body.name);
    assert.equal(savedAuto.description,request.body.description);
    assert.deepEqual(savedAuto.start,new Date(request.body.start));
    assert.equal(savedAuto.comments,request.body.comments);
    
  } finally {
    await prisma.automation.deleteMany({ where: { name:request.body.name } });
    await prisma.$disconnect();
  }
});

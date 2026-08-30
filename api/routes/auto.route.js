import { Router } from "express";
import { addAuto,deleteAuto,getAllAutos,getAuto, modifyAuto } from "../controllers/auto.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();
router.get("/",verifyToken,getAllAutos)
router.get("/:id",verifyToken,getAuto)
router.post("/",verifyToken,addAuto)
router.patch("/:id",verifyToken,modifyAuto)
router.delete("/:id",verifyToken,deleteAuto)


export default router;
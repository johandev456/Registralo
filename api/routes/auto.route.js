import { Router } from "express";
import { addAuto,getAllAutos,getAuto } from "../controllers/auto.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();
router.get("/",verifyToken,getAllAutos)
router.get("/:id",verifyToken,getAuto)
router.post("/",verifyToken,addAuto)


export default router;
import { Router } from "express";
import { addAuto } from "../controllers/auto.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();
router.post("/",verifyToken,addAuto)

export default router;
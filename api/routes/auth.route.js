import { Router } from "express";
import { login, register,logout, verifyActiveSession } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/verify",verifyToken,verifyActiveSession)
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

export default router
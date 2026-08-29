import { Router } from "express";
import { } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllUsers } from "../controllers/user.controller.js";
import { getUser } from "../controllers/user.controller.js";

const router = Router();
router.get("/",verifyToken,getAllUsers)
router.get("/:id",verifyToken,getUser)



export default router;
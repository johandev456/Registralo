import { Router } from "express";
import { } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {  } from "../controllers/assignees.controller.js";
import { unassignUsers } from "../controllers/assignees.controller.js";
import { assignUsers } from "../controllers/assignees.controller.js";

const router = Router();
router.post("/",verifyToken,assignUsers)
router.delete("/",verifyToken,unassignUsers)




export default router;
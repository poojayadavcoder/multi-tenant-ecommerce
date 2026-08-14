import express from "express";
import { approve_user, user_applications} from "../controller/admin.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.use(verifyToken, isAdmin);

router.get("/user-applications",user_applications);
router.put("/approve-user/:userId",approve_user);

export default router;
import express from "express";
import { approve_vendor, vendor_applications } from "../controller/admin.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.use(verifyToken, isAdmin);

router.get("/vendor-applications",vendor_applications);
router.put("/approve-vendor/:userId",approve_vendor);

export default router;
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { applyForDeliveryPartner } from "../controller/delivery.js";

const router = express.Router();

router.post("/apply-delivery",verifyToken ,applyForDeliveryPartner)

export default router;


import express from "express";

import { verifyToken } from "../middleware/auth.js";
import { createPaymentOrder, verifyPayment } from "../controller/payment.js";

const router = express.Router();

router.post("/create-order", verifyToken, createPaymentOrder);
router.post("/verify", verifyToken, verifyPayment);

export default router;
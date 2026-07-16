import express from "express";
import { isVendor, verifyToken } from "../middleware/auth.js";
import { checkout, getCustomerOrders, getVendorOrders } from "../controller/order.js";

const router = express.Router();

router.use(verifyToken);

router.post("/checkout", checkout);
router.get("/customer/orders",getCustomerOrders)
router.get("/vendor/orders", isVendor, getVendorOrders);

export default router;
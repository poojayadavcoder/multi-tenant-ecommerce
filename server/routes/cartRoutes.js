import express from "express";
import { addCartItems, getCartItems, removeCartItem, updateCartItemQuantity } from "../controller/cart.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getCartItems )
router.post("/",addCartItems)
router.put("/update-quantity/:productId",updateCartItemQuantity)
router.delete("/:productId",removeCartItem)

export default router

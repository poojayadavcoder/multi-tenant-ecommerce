import express from "express";
import { isVendor, verifyToken } from "../middleware/auth.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/product.js";
import { upload } from "../utilities/upload.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", verifyToken, isVendor, upload.array("images", 5), createProduct);

router.put("/:id", verifyToken, isVendor, upload.array("images", 5), updateProduct);

router.delete("/:id", verifyToken, isVendor, deleteProduct);

export default router;
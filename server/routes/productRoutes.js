import express from "express";
import { isVendor, verifyToken } from "../middleware/auth.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, getVendorProducts, updateProduct } from "../controller/product.js";
import { upload } from "../utilities/upload.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/vendor-product", verifyToken, isVendor, getVendorProducts);

router.get("/:id", getProductById)

router.post("/", verifyToken, isVendor, upload.array("images", 5), createProduct);

router.put("/:id", verifyToken, isVendor, upload.array("images", 5), updateProduct);

router.delete("/:id", verifyToken, isVendor, deleteProduct);


export default router;
import express from "express";
import { apply_vendor, login, refreshAccessToken, registration } from "../controller/auth.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", registration);
router.post("/refresh", refreshAccessToken);
router.post("/apply-vendor", verifyToken, apply_vendor);

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

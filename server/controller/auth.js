import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
   
  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const { accessToken, refreshToken } = generateTokens(user);

    res.status(200).json({
      message: "Login successful",
      accessToken:accessToken,
      refreshToken:refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const registration = async (req, res) => {
  try {

    const { name, email, password, phone_number } = req.body;

    if (!name || !email || !password || !phone_number) {
      return res.status(400).json({
        message: "Name, email, password and phone number are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone_number
    });

    const { accessToken, refreshToken } = generateTokens(newUser);

    return res.status(201).json({
      message: "User successfully created",
      accessToken:accessToken,
      refreshToken:refreshToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing. Please log in again." });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token." });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const newAccessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken, 
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const apply_vendor=async(req,res)=>{
  try{
    const userId=req.user.id;
    const {shopName,shopDescription}=req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.shopDetails = {
      shopName,
      shopDescription
    };
    user.status = "pending";

    await user.save();

    return res.status(200).json({ message: "Vendor application submitted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { login, registration, refreshAccessToken, apply_vendor };


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "vendor","delivery","admin"],
      default: "customer",
    },
    shopDetails: {
      shopName: { type: String, trim: true },
      shopDescription: { type: String },
    },
    vendorStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
    vehicleType:{
      type: String,
      enum: ["bike", "car", "van", "truck"],
      default: null,
    },
    licenseNumber: { type: String, default: null },
    vehicleNumber: { type: String, default: null},
    isAvailable: { type: Boolean, default: true },

  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;

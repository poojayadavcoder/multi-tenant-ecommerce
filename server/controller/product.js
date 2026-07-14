import Product from "../models/Product.js";
import { uploadToCloudinary } from "../utilities/upload.js";
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;
    
    const vendorId = req.user.id;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }
    // Loop through the uploaded files and upload each to Cloudinary
    const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
    const imageUrls = await Promise.all(uploadPromises);

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      images: imageUrls,
      vendorId,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    // .populate("vendorId", "name email") automatically grabs the vendor's name and email from the Users collection!
    const products = await Product.find().populate("vendorId", "name email");
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, stock, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price, category, stock, images },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

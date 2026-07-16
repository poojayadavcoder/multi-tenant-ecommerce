import Product from "../models/Product.js";
import { uploadToCloudinary } from "../utilities/upload.js";
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;
    
    const vendorId = req.user.id;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }
    
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
    const products = await Product.find()
      .select("title price description images stock category")
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const products = await Product.find({ vendorId }).sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching vendor products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const product = await Product.findById(id)
      .populate("vendorId", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
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

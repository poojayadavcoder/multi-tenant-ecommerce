import mongoose from "mongoose";

const ProductSchema= new mongoose.Schema({
  title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    category: { 
      type: String, 
      required: true 
    },
    stock: { 
      type: Number, 
      required: true, 
      min: 0,
      default: 0 
    },
    images: [
      { 
        type: String 
      }
    ],
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},
{ timestamps: true }

)

const Product= mongoose.model("Product",ProductSchema)

export default Product


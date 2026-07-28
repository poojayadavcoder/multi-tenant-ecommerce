import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    },
    shippingAddress: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready_for_Pickup', 'Out_for_Delivery', 'Delivered', 'Cancelled'],
      default: "Pending"
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },
    paymentDetails: {
      paymentId:{
       type: String
    },
      orderId:{
       type: String
    },
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
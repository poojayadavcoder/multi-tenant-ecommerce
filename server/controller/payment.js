import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartData = await Cart.findOne({ userId }).populate("items.productId");
    
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let calculatedTotal = 0;
    for (const item of cartData.items) {
      if (item.productId) {
        const price = item.productId.price || 0;
        calculatedTotal += price * item.quantity;
      }
    }
    
    const shippingFee = (calculatedTotal >= 1000 || calculatedTotal === 0) ? 0 : 50;
    const totalAmount = calculatedTotal + shippingFee;
    console.log("totalAmount",totalAmount)
    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
    };
      
    const order = await razorpay.orders.create(options);
    console.log(order)
    
    res.status(200).json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Could not initiate payment" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay payment verification details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    
    let orderItems = [];
    let calculatedTotal = 0;

    if (cart && cart.items && cart.items.length > 0) {
      for (const item of cart.items) {
        if (item.productId) {
          const price = item.productId.price || 0;
          orderItems.push({
            productId: item.productId._id,
            quantity: item.quantity,
            price: price
          });
          calculatedTotal += price * item.quantity;
        }
      }
    } else if (req.body.cartItems && req.body.cartItems.length > 0) {
      orderItems = req.body.cartItems;
      calculatedTotal = req.body.totalAmount || 0;
    } else {
      return res.status(400).json({ success: false, message: "No items found in cart to place order" });
    }

    const newOrder = await Order.create({
      userId: req.user.id,
      items: orderItems,
      shippingAddress: shippingAddress || "N/A",
      totalAmount: calculatedTotal,
      paymentStatus: "Paid",
      status: "Pending",
      paymentDetails: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paidAt: new Date(),
      },
    });

    for (const item of orderItems) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    if (cart) {
      cart.items = [];
      await cart.save();
    } else {
      await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    }

    res.status(201).json({
      success: true,
      message: "Payment verified successfully!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error verifying payment" });
  }
};
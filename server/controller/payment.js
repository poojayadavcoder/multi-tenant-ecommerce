import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const createPaymentOrder = async(req,res)=>{
  try{
   const { amount } = req.body

   const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

   const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } 
  catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Could not initiate payment" });
  }

}

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress, cartItems, totalAmount} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    const newOrder = await Order.create({
      user: req.user.id,
      items: cartItems,
      shippingAddress,
      totalAmount,
      paymentStatus: "Paid",
      paymentDetails: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paidAt: new Date(),
      },
    });

    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

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
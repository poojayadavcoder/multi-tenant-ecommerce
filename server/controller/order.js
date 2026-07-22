  import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
export const checkout = async (req, res) => {
  try {  
    const userId = req.user.id; 
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "shippingAddress is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
       return res.status(400).json({ message: "Your cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (let i = 0; i < cart.items.length; i++) {
      const cartItem = cart.items[i];
      const productDetails = cartItem.productId;

      totalAmount += productDetails.price * cartItem.quantity;

      orderItems.push({
        productId: productDetails._id,
        quantity: cartItem.quantity,
        price: productDetails.price
      });
      await Product.findByIdAndUpdate(
        productDetails._id,
        { $inc: { stock: -cartItem.quantity } }
      );
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "Pending"
    });

    await order.save();

    cart.items = [];
    await cart.save();

    return res.status(201).json(order);

  } catch (error) {
    console.error("Checkout system error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCustomerOrders = async(req,res)=>{
  try {
   const userId = req.user.id

   const orders = await Order.find({userId}).populate("items.productId").sort({ createdAt: -1 });

   return res.status(200).json(orders);
  }
  catch(error){
    return res.status(500).json(error)
  }
}

export const getVendorOrders = async (req,res)=>{
  try {
   const vendorId = req.user.id; 
    
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Access denied. Vendors only." });
    }

   const allOrders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });
    console.log(allOrders)

   const vendorOrders = []
   allOrders.forEach((order) => {
      const myItems = order.items.filter((item) => {
        return item.productId && item.productId.vendorId?.toString() === vendorId;
      });

      if (myItems.length > 0) {
        vendorOrders.push({
          _id: order._id,
          customer: order.userId,
          shippingAddress: order.shippingAddress,
          status: order.status,
          createdAt: order.createdAt,
          items: myItems,
          vendorSubtotal: myItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      }
    });

    return res.status(200).json(vendorOrders);
 }
  catch(error){
    return res.status(500).json(error)
  }
}
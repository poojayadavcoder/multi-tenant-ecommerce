import Cart from "../models/Cart.js";

export const addCartItems = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    
    const itemQuantity = Number(quantity) || 1;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: itemQuantity }]
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += itemQuantity;
    } else {
      cart.items.push({ productId, quantity: itemQuantity });
    }

    const updatedCart = await cart.save();
    return res.status(200).json(updatedCart);

  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartItems= async (req, res) => {
    try{
    const userId = req.user.id;
    const cart= await Cart.findOne({ userId}).populate("items.productId");
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;
        const deletedCartItem = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } } },
            { new: true }
        ).populate("items.productId");

        if (!deletedCartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const userId= req.user.id
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId, "items.productId": productId }, 
            { $set: { "items.$.quantity": Number(quantity) } }, 
            { new: true }
        ).populate("items.productId");

        if (!updatedCart) {
            return res.status(404).json({ message: "Item not found in your cart" });
        }

        return res.status(200).json(updatedCart);
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
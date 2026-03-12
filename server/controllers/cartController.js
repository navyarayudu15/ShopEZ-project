import Cart from "../models/cart.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      size,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get Cart by User
export const getUserCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId })
      .populate("productId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cart Item
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

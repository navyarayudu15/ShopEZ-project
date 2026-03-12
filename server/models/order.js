import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        size: String,
        price: Number,
      },
    ],

    shippingAddress: {
      name: String,
      email: String,
      mobile: String,
      address: String,
      pincode: String,
    },

    paymentMethod: String,

    totalAmount: Number,

    orderStatus: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

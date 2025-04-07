const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      },
    ],
    paymentInfo: {
      orderId: { type: String, required: true },
      paymentId: { type: String, required: true },
      signature: { type: String, required: true },
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Paid", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

// ✅ FIX: Prevent overwriting the model
const Order = models.Order || model("Order", orderSchema);

module.exports = Order;

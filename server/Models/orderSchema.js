const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    product: { type: String },
    price: { type: Number },
    category: { type: String },
    quantity: { type: Number },
    table: { type: String },
    isFullfilled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Order", OrdersSchema);
module.exports = Orders;

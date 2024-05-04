const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    productDetails: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
      },
    ],
    tableName: { type: String, required: true },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;

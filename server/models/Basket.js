const { Schema, model } = require("mongoose");

const basketSchema = new Schema(
  {
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        image: String,
        name: String,
        price: { type: Number },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Basket", basketSchema);

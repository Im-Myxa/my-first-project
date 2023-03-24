const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    order: {
      type: Number,
      required: true,
    },
    status: { type: Boolean, default: false },
    list: [{ name: String }, { quantity: Number }, { cost: Number }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);

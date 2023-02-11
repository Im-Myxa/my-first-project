const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
  },
  list: [{ name: String }, { quantity: Number }, { cost: Number }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Order", orderSchema);

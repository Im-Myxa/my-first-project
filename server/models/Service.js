const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    master: {
      type: Schema.Types.ObjectId,
      ref: "Master",
    },
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);

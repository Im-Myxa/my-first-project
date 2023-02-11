const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
    ref: "User",
  },
});

module.exports = model("Service", serviceSchema);

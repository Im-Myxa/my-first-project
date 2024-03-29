const { Schema, model } = require("mongoose");

const masterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Master", masterSchema);

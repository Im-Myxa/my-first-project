const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: [{ type: String, ref: "Role" }],
    age: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

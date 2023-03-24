const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    surname: {
      type: String,
      default: "",
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
    mobile: { type: String, default: "" },
    role: [{ type: String, ref: "Role" }],
    age: { type: Date, default: "" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

const { Schema, model } = require("mongoose");

const recordSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    record: {
      type: Number,
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    status: { type: Boolean, default: null },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Record", recordSchema);

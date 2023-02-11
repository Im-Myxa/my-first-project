const { Schema, model } = require("mongoose");

const recordSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Record", recordSchema);

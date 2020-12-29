const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    NIP: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('employee', employeeSchema);

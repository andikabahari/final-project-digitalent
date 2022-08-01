const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("tasks", schema);

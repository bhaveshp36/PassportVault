const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    parentOrganizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pwdHash: {
      type: String,
      required: true,
    },
    accessLevel: {
      type: String,
      enum: ["owner", "admin", "user"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

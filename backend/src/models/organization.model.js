const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  legalEntityType: {
    type: String,
    required: true,
    enum: ["Individual", "Company", "NGO"],
  },
  billingInfo: {
    billingAddress: {
      type: String,
      required: true,
    },
    contactPersonName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;

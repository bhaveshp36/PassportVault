const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  organization_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  legal_entity_type: {
    type: String,
    required: true,
  },
  billing_info: {
    billing_address: {
      type: String,
      required: true,
    },
    contact_person_name: {
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

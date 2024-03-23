const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    parentPassport_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passport",
      required: true,
    },
    passportNo: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    visaType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    noOfEntry: {
      type: String,
      required: true,
    },
    visaNo: {
      type: String,
      required: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    annotation: {
      type: String,
      required: true,
    },
    visaApplication_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisaApplication",
    },
    documents: { type: Object, default: {} },
    otherInfo: {
      type: Object, // for any other info that is not in the schema
    },
  },
  { timestamps: true }
);

const Visa = mongoose.model("Visa", visaSchema);

module.exports = Visa;

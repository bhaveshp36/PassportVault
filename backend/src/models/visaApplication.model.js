const mongoose = require("mongoose");

const visaApplicationSchema = new mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
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
    dateOfDeparture: {
      type: Date,
      required: true,
    },
    dateOfArrival: {
      type: Date,
      required: true,
    },
    applicationNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    securityQuestions: {
      question1: {
        type: String,
        required: true,
      },
      question2: {
        type: String,
        required: true,
      },
      question3: {
        type: String,
        required: true,
      },
    },
    documents: {
      sponsorshipLetter: {
        type: String,
        required: true,
      },
      invitationLetter: {
        type: String,
        required: true,
      },
      membershipCertificate: {
        type: String,
        required: true,
      },
      applicationForm: {
        type: String,
        required: true,
      },
      bankStatements: {
        type: String,
        required: true,
      },
    },
    otherInfo: {
      type: Object, // for any other info that is not in the schema
    },
  },
  { timestamps: true }
);

const VisaApplication = mongoose.model(
  "VisaApplication",
  visaApplicationSchema
);

module.exports = VisaApplication;

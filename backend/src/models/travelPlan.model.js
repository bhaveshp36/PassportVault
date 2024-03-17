const mongoose = require("mongoose");

const travelPlanSchema = new mongoose.Schema(
  {
    travelPlanName: {
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    visaApplications_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisaApplication",
      },
    ],
    documents: { type: Object, default: {} },
    otherInfo: {
      type: Object, // for any other info that is not in the schema
    },
  },
  { timestamps: true }
);

const TravelPlan = mongoose.model("TravelPlan", travelPlanSchema);

module.exports = TravelPlan;

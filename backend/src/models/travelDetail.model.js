const mongoose = require("mongoose");

const travelDetailSchema = new mongoose.Schema(
  {
    parentVisa_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visa",
      required: true,
    },
    flightNo: {
      type: String,
    },
    departureAirport: {
      type: String,
    },
    arrivalAirport: {
      type: String,
    },
    transits: {
      type: [String],
      default: [],
    },
    documents: { type: Object, default: {} },
    otherInfo: {
      type: Object, // for any other info that is not in the schema
    },
  },
  { timestamps: true }
);

const TravelDetail = mongoose.model("TravelDetail", travelDetailSchema);

module.exports = TravelDetail;

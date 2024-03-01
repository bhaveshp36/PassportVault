const mongoose = require('mongoose');

const travelDetailSchema = new mongoose.Schema({
  parentVisa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visa',
    required: true
  },
  flightNo: {
    type: String,
    required: true
  },
  departureAirport: {
    type: String,
    required: true
  },
  arrivalAirport: {
    type: String,
    required: true
  },
  transits: {
    type: [String],
    default: []
  },
  documents: {
    flightTicket: {
      type: String,
      required: true
    }
  }
});

const TravelDetail = mongoose.model('TravelDetail', travelDetailSchema);

module.exports = TravelDetail;

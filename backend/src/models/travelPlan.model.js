const mongoose = require('mongoose');

const travelPlanSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  dateOfDeparture: {
    type: Date,
    required: true
  },
  dateOfArrival: {
    type: Date,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  visaApplications_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VisaApplication'
  }]
});

const TravelPlan = mongoose.model('TravelPlan', travelPlanSchema);

module.exports = TravelPlan;

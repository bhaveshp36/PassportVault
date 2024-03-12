const TravelPlan = require("../models/travelPlan.model.js");

exports.createTravelPlan = async (req, res) => {
  const travelPlan = new TravelPlan(req.body);
  try {
    await travelPlan.save();
    res.status(201).send(travelPlan);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getTravelPlans = async (req, res) => {
  try {
    const travelPlans = await TravelPlan.find({});
    res.send(travelPlans);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getTravelPlan = async (req, res) => {
  try {
    const travelPlan = await TravelPlan.findById(req.params.id);
    if (!travelPlan) {
      return res.status(404).send();
    }
    res.send(travelPlan);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.updateTravelPlan = async (req, res) => {
  try {
    const travelPlan = await TravelPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!travelPlan) {
      return res.status(404).send();
    }
    res.send(travelPlan);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.deleteTravelPlan = async (req, res) => {
  try {
    const travelPlan = await TravelPlan.findByIdAndDelete(req.params.id);
    if (!travelPlan) {
      return res.status(404).send();
    }
    res.send(travelPlan);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

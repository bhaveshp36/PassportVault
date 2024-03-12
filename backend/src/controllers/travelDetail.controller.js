const TravelDetail = require("../models/travelDetail.model");

exports.createTravelDetail = async (req, res) => {
  try {
    const travelDetail = new TravelDetail(req.body);
    await travelDetail.save();
    res.status(201).send(travelDetail);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTravelDetail = async (req, res) => {
  try {
    const travelDetail = await TravelDetail.findById(req.params.id);
    if (!travelDetail) {
      return res.status(404).send();
    }
    res.send(travelDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTravelDetail = async (req, res) => {
  try {
    const travelDetail = await TravelDetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!travelDetail) {
      return res.status(404).send();
    }
    res.send(travelDetail);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTravelDetail = async (req, res) => {
  try {
    const travelDetail = await TravelDetail.findByIdAndDelete(req.params.id);
    if (!travelDetail) {
      return res.status(404).send();
    }
    res.send(travelDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const VisaApplication = require("../models/visaApplication.model.js");

exports.createVisaApplication = async (req, res) => {
  const visaApplication = new VisaApplication(req.body);
  try {
    await visaApplication.save();
    res.status(201).send(visaApplication);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getVisaApplications = async (req, res) => {
  try {
    const visaApplications = await VisaApplication.find({});
    res.send(visaApplications);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getVisaApplication = async (req, res) => {
  try {
    const visaApplication = await VisaApplication.findById(req.params.id);
    if (!visaApplication) {
      return res.status(404).send();
    }
    res.send(visaApplication);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateVisaApplication = async (req, res) => {
  try {
    const visaApplication = await VisaApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!visaApplication) {
      return res.status(404).send();
    }
    res.send(visaApplication);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteVisaApplication = async (req, res) => {
  try {
    const visaApplication = await VisaApplication.findByIdAndDelete(
      req.params.id
    );
    if (!visaApplication) {
      return res.status(404).send();
    }
    res.send(visaApplication);
  } catch (error) {
    res.status(500).send(error);
  }
};

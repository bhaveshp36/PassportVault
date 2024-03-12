const Organization = require("../models/organization.model.js");

exports.createOrganization = async (req, res) => {
  const organization = new Organization(req.body);
  try {
    await organization.save();
    res.status(201).send(organization);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({});
    res.send(organizations);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).send();
    }
    res.send(organization);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!organization) {
      return res.status(404).send();
    }
    res.send(organization);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res.status(404).send();
    }
    res.send(organization);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

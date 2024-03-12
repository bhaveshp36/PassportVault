const Passport = require("../models/passport.model.js");

exports.createPassport = async (req, res) => {
  const passport = new Passport(req.body);
  try {
    await passport.save();
    res.status(201).send(passport);
  } catch (error) {
    res.status(400).send(error);
console.log(error);
  }
};

exports.getPassports = async (req, res) => {
  try {
    const passports = await Passport.find({});
    res.send(passports);
  } catch (error) {
    res.status(500).send(error);
console.log(error);
  }
};

exports.getPassport = async (req, res) => {
  try {
    const passport = await Passport.findById(req.params.id);
    if (!passport) {
      return res.status(404).send();
    }
    res.send(passport);
  } catch (error) {
    res.status(500).send(error);
console.log(error);
  }
};

exports.updatePassport = async (req, res) => {
  try {
    const passport = await Passport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!passport) {
      return res.status(404).send();
    }
    res.send(passport);
  } catch (error) {
    res.status(400).send(error);
console.log(error);
  }
};

exports.deletePassport = async (req, res) => {
  try {
    const passport = await Passport.findByIdAndDelete(req.params.id);
    if (!passport) {
      return res.status(404).send();
    }
    res.send(passport);
  } catch (error) {
    res.status(500).send(error);
console.log(error);
  }
};

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
    const passportsData = await Passport.find({});

    let passports = passportsData.map((passport) => passport.toObject());

    passports.forEach((passport) => {
      if (passport.dateOfIssue instanceof Date) {
        passport.dateOfIssue = passport.dateOfIssue.toISOString().split("T")[0];
      }
      if (passport.dateOfExpiry instanceof Date) {
        passport.dateOfExpiry = passport.dateOfExpiry
          .toISOString()
          .split("T")[0];
      }
      if (passport.previousPassportDateOfIssue instanceof Date) {
        passport.previousPassportDateOfIssue =
          passport.previousPassportDateOfIssue.toISOString().split("T")[0];
      }
    });
    res.send(passports);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getPassport = async (req, res) => {
  try {
    const passportData = await Passport.findById(req.params.id);
    let passport = passportData.toObject();

    if (!passport) {
      return res.status(404).send();
    }
    if (passport.dateOfIssue instanceof Date) {
      passport.dateOfIssue = passport.dateOfIssue.toISOString().split("T")[0];
    }
    if (passport.dateOfExpiry instanceof Date) {
      passport.dateOfExpiry = passport.dateOfExpiry.toISOString().split("T")[0];
    }
    if (passport.previousPassportDateOfIssue instanceof Date) {
      passport.previousPassportDateOfIssue =
        passport.previousPassportDateOfIssue.toISOString().split("T")[0];
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

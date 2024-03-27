const express = require("express");
const Passport = require("../models/passport.model");

const router = express.Router();

router.get("/:parentMemberId", async (req, res) => {
  try {
    const parentMemberId = req.params.parentMemberId;
    if (!parentMemberId) {
      return res.status(400).json({ message: "Invalid parent member ID" });
    }

    const passportsData = await Passport.find({
      parentMember_id: parentMemberId,
    })
      .sort({ dateOfExpiry: -1 })
      .exec();

    if (!passportsData) {
      return res.status(404).json({ message: "No passports found" });
    }

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

    res.json(passports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

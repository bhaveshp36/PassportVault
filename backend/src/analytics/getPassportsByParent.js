const express = require("express");
const Passport = require("../models/passport.model");

const router = express.Router();

router.get("/:parentMemberId", async (req, res) => {
  try {
    const parentMemberId = req.params.parentMemberId;
    if (!parentMemberId) {
      return res.status(400).json({ message: "Invalid parent member ID" });
    }

    const passports = await Passport.find({
      parentMember_id: parentMemberId,
    })
      .sort({ dateOfExpiry: -1 })
      .exec();

    if (!passports) {
      return res.status(404).json({ message: "No passports found" });
    }

    res.json(passports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

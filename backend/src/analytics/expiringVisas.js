const express = require("express");
const Visa = require("../models/visa.model");
const Passport = require("../models/passport.model");
const Member = require("../models/member.model");

const router = express.Router();

async function getMemberNameFromVisa(visaId) {
  try {
    const visa = await Visa.findById(visaId).populate("parentPassport_id");
    const passport = await Passport.findById(
      visa.parentPassport_id._id
    ).populate("parentMember_id");
    const member = await Member.findById(passport.parentMember_id._id);
    return `${member.givenName} ${member.surname}`;
  } catch (error) {
    console.error(error);
  }
}

router.get("/", async (req, res) => {
  try {
    const currentDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const expiringVisas = await Visa.find({
      validUntil: { $gte: currentDate, $lte: oneYearFromNow },
    }).sort({ validUntil: 1 });

    const visasWithMemberName = await Promise.all(
      expiringVisas.map(async (visa) => {
        const memberName = await getMemberNameFromVisa(visa._id);
        return { ...visa._doc, memberName };
      })
    );

    res.json(visasWithMemberName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

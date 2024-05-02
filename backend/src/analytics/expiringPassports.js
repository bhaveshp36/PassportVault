const express = require("express");
const router = express.Router();
const Member = require("../models/member.model"); // Import Member model
const Passport = require("../models/passport.model"); // Import Passport model

// Endpoint to fetch data from both collections and send required fields to the response
router.get("/", async (req, res) => {
  try {
    // Calculate the date one year from now
    const currentDate = new Date("2024-01-01");
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 5);

    // Fetch data from Passport collection
    const passports = await Passport.find(
      { dateOfExpiry: { $gt: currentDate } },
      "parentMember_id passportNo dateOfExpiry"
    )
      .sort({ dateOfExpiry: 1 })
      .lean();
    console.log(passports);
    // Fetch only the members who have a passport that is expiring within the next year
    const memberIds = passports.map((passport) => passport.parentMember_id);
    const members = await Member.find(
      { _id: { $in: memberIds } },
      "surname givenName"
    ).lean();

    // Merge data from both collections based on the parentMember_id field in Passport collection
    const data = members.map((member) => {
      const passport = passports.find(
        (passport) =>
          passport.parentMember_id.toString() === member._id.toString()
      );
      return {
        _id: member._id,
        givenName: member.givenName,
        surname: member.surname,
        passportNo: passport.passportNo,
        expiry: new Date(passport.dateOfExpiry).toISOString().split("T")[0], // Format date to YYYY-MM-DD
      };
    });

    // Send the merged data to the response
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

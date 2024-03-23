const express = require("express");
const router = express.Router();
const Member = require("../models/member.model"); // Import Member model
const Passport = require("../models/passport.model"); // Import Passport model

// Endpoint to fetch data from both collections and send required fields to the response
router.get("/", async (req, res) => {
  try {
    // Calculate the date one year from now
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    // Fetch data from both collections
    const members = await Member.find({}, "surname givenName").lean();
    const passports = await Passport.find(
      { dateOfExpiry: { $lte: oneYearFromNow } },
      "parentMember_id passportNo dateOfExpiry"
    )
      .sort({ dateOfExpiry: 1 })
      .lean();

    // Merge data from both collections based on the parentMember_id field in Passport collection
    const data = members
      .map((member) => {
        const passport = passports.find(
          (passport) =>
            passport.parentMember_id.toString() === member._id.toString()
        );
        if (passport) {
          return {
            _id: member._id,
            givenName: member.givenName,
            surname: member.surname,
            passportNo: passport.passportNo,
            expiry: new Date(passport.dateOfExpiry).toISOString().split("T")[0], // Format date to YYYY-MM-DD
          };
        } else {
          return null; // Handle cases where member has no associated passport
        }
      })
      .filter(Boolean); // Remove null values

    // Send the merged data to the response
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

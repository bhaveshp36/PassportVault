const express = require("express");
const router = express.Router();
const VisaApplication = require("../models/visaApplication.model");
const Member = require("../models/member.model");

router.get("/", async (req, res) => {
  try {
    const applications = await VisaApplication.find().sort({ createdAt: -1 });
    const applicationsWithMemberName = await Promise.all(
      applications.map(async (application) => {
        const member = await Member.findById(application.member_id);
        return {
          ...application._doc,
          member_id: member ? member.givenName : " ",
        };
      })
    );
    res.json(applicationsWithMemberName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

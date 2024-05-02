const express = require("express");
const TravelPlan = require("../models/travelPlan.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const travelPlans = await TravelPlan.find().sort({ date: -1 });
    res.json(travelPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

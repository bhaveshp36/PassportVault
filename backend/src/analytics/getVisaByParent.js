const express = require("express");
const Visa = require("../models/visa.model");

const router = express.Router();

router.get("/:parentPassportId", async (req, res) => {
  try {
    const parentPassportId = req.params.parentPassportId;
    if (
      !parentPassportId ||
      parentPassportId === "" ||
      parentPassportId === "null" ||
      parentPassportId === "undefined"
    ) {
      return null;
    }

    const visas = await Visa.find({
      parentPassport_id: parentPassportId,
    })
      .sort({ validUntil: -1 })
      .exec();
    if (!visas) {
      return null;
    }

    res.json(visas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

const express = require("express");
const passportController = require("../controllers/passport.controller.js");

const router = express.Router();

// Route to create a new passport
router.post("/", passportController.createPassport);

// Route to get all passports
router.get("/", passportController.getPassports);

// Route to get a specific passport by ID
router.get("/:id", passportController.getPassport);

// Route to update a specific passport by ID
router.put("/:id", passportController.updatePassport);

// Route to delete a specific passport by ID
router.delete("/:id", passportController.deletePassport);

module.exports = router;

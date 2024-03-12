const express = require("express");
const passportController = require("../controllers/passport.controller.js");
const router = express.Router();

// Route to create a new passport
router.post("/passports", passportController.createPassport);

// Route to get all passports
router.get("/passports", passportController.getPassports);

// Route to get a specific passport by ID
router.get("/passports/:id", passportController.getPassport);

// Route to update a specific passport by ID
router.put("/passports/:id", passportController.updatePassport);

// Route to delete a specific passport by ID
router.delete("/passports/:id", passportController.deletePassport);

module.exports = router;

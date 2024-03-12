const express = require("express");
const visaApplicationController = require("../controllers/visaApplication.controller");

const router = express.Router();

// Create a new visa application
router.post("/", visaApplicationController.createVisaApplication);

// Get all visa applications
router.get("/", visaApplicationController.getVisaApplications);

// Get a single visa application by ID
router.get("/:id", visaApplicationController.getVisaApplication);

// Update a visa application by ID
router.put("/:id", visaApplicationController.updateVisaApplication);

// Delete a visa application by ID
router.delete("/:id", visaApplicationController.deleteVisaApplication);

module.exports = router;

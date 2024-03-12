const express = require("express");
const VisaController = require("../controllers/visa.controller");

const router = express.Router();

// Get all visas
router.get("/", VisaController.getAllVisas);

// Create a new visa
router.post("/", VisaController.createVisa);

// Get a single visa by ID
router.get("/:id", VisaController.getVisaById);

// Update a visa by ID
router.put("/:id", VisaController.updateVisaById);

// Delete a visa by ID
router.delete("/:id", VisaController.deleteVisaById);

module.exports = router;

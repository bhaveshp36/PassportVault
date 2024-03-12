const express = require("express");
const organizationController = require("../controllers/organization.controller");

const router = express.Router();

// Route for creating a new organization
router.post("/", organizationController.createOrganization);

// Route for retrieving all organizations
router.get("/", organizationController.getOrganizations);

// Route for retrieving a specific organization by ID
router.get("/:id", organizationController.getOrganization);

// Route for updating an organization by ID
router.put("/:id", organizationController.updateOrganization);

// Route for deleting an organization by ID
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;

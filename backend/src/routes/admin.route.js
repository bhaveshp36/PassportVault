const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Add your authentication route
router.post("/", adminController.login);

module.exports = router;

const express = require("express");
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/authentication.js");
const permit = require("../middleware/authorization.js");

const router = express.Router();

// Create a new user
router.post("/", UserController.createUser);

// Get all users
router.get("/", auth, permit("owner"), UserController.getUsers);

// Get a single user by ID
router.get("/:id", UserController.getUser);

// Update a user by ID
router.patch("/:id", UserController.updateUser);

// Delete a user by ID
router.delete("/:id", UserController.deleteUser);

module.exports = router;

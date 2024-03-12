const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

// Create a new user
router.post("/", UserController.createUser);

// Get all users
router.get("/", UserController.getUsers);

// Get a single user by ID
router.get("/:id", UserController.getUser);

// Update a user by ID
router.put("/:id", UserController.updateUser);

// Delete a user by ID
router.delete("/:id", UserController.deleteUser);

module.exports = router;

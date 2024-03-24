const express = require("express");
const memberController = require("../controllers/member.controller");
const auth = require("../middleware/authentication.js");
const permit = require("../middleware/authorization.js");

const router = express.Router();

// Create a new member;
router.post("/", memberController.createMember);

// Retrieve all members;
router.get("/", memberController.getMembers);

// Retrieve a single member with id;
router.get(
  "/:id",
  auth,
  permit(["owner", "admin"]),
  memberController.getMember
);

// Update a member with id;
router.put("/:id", memberController.updateMember);

// Delete a member with id;
router.delete("/:id", memberController.deleteMember);

module.exports = router;

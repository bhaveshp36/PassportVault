const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

// Create a new member;
router.post('/', memberController.createMember);

// Retrieve all members;
router.get('/', memberController.getMembers);

// Retrieve a single member with id;
router.get('/:id', memberController.getMember);

// Update a member with id;
router.put('/:id', memberController.updateMember);

// Delete a member with id;
router.delete('/:id', memberController.deleteMember);

module.exports = router;
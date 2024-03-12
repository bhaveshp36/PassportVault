const express = require('express');
const travelDetailController = require('../controllers/travelDetail.controller');

const router = express.Router();

// Create a new travel detail
router.post('/', travelDetailController.createTravelDetail);

// Get a travel detail by ID
router.get('/:id', travelDetailController.getTravelDetail);

// Update a travel detail by ID
router.put('/:id', travelDetailController.updateTravelDetail);

// Delete a travel detail by ID
router.delete('/:id', travelDetailController.deleteTravelDetail);

module.exports = router;
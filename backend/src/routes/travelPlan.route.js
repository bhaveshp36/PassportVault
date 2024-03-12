const express = require('express');
const travelPlanController = require('../controllers/travelPlan.controller');

const router = express.Router();

// Create a new travel plan
router.post('/', travelPlanController.createTravelPlan);

// Get all travel plans
router.get('/', travelPlanController.getTravelPlans);

// Get a single travel plan by ID
router.get('/:id', travelPlanController.getTravelPlan);

// Update a travel plan by ID
router.put('/:id', travelPlanController.updateTravelPlan);

// Delete a travel plan by ID
router.delete('/:id', travelPlanController.deleteTravelPlan);

module.exports = router;
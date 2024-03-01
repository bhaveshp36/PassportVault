const express = require('express');
const passportController = require('../controllers/passport.controller.js');
const router = express.Router();

router.post('/passports', passportController.createPassport);
router.get('/passports', passportController.getPassports);
router.get('/passports/:id', passportController.getPassport);
router.put('/passports/:id', passportController.updatePassport);
router.delete('/passports/:id', passportController.deletePassport);

module.exports = router;
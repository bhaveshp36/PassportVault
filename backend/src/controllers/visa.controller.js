const Visa = require('../models/visa.model');

// Get all visas
const getAllVisas = async (req, res) => {
    try {
        const visas = await Visa.find();
        res.json(visas);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new visa
const createVisa = async (req, res) => {
    try {
        const visa = new Visa(req.body);
        await visa.save();
        res.status(201).json(visa);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
};

// Get a single visa by ID
const getVisaById = async (req, res) => {
    try {
        const visa = await Visa.findById(req.params.id);
        if (!visa) {
            res.status(404).json({ error: 'Visa not found' });
        } else {
            res.json(visa);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a visa by ID
const updateVisaById = async (req, res) => {
    try {
        const visa = await Visa.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!visa) {
            res.status(404).json({ error: 'Visa not found' });
        } else {
            res.json(visa);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a visa by ID
const deleteVisaById = async (req, res) => {
    try {
        const visa = await Visa.findByIdAndDelete(req.params.id);
        if (!visa) {
            res.status(404).json({ error: 'Visa not found' });
        } else {
            res.json({ message: 'Visa deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllVisas,
    createVisa,
    getVisaById,
    updateVisaById,
    deleteVisaById,
};
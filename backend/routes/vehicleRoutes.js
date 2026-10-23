const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');

// Appliquer le middleware à toutes les routes véhicules : 
// il faut un token valide pour passer.
router.use(authMiddleware);

// Routes
router.get('/', vehicleController.getAllVehicles);
router.post('/', vehicleController.createVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// On utilise ici les mêmes noms que dans ton fichier logController.js
router.post('/:vehicleId', logController.addTrackingLog);
router.get('/:vehicleId', logController.getVehicleLogs);

module.exports = router;
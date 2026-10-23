const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = (req, res) => {
  Vehicle.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createVehicle = (req, res) => {
  const { plate, model } = req.body;
  if (!plate || !model) return res.status(400).json({ error: 'Plaque et modèle requis.' });

  Vehicle.create(plate, model, (err, vehicleId) => {
    if (err) {
      if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Plaque déjà enregistrée.' });
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Véhicule ajouté', vehicleId });
  });
};

exports.deleteVehicle = (req, res) => {
  Vehicle.deleteById(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Véhicule non trouvé.' });
    res.json({ message: 'Véhicule supprimé.' });
  });
};
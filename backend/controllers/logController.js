const db = require('../config/db');

// Ajouter un entretien
const addTrackingLog = (req, res) => {
  const vehicleId = req.params.vehicleId;
  const { mileage, notes } = req.body; // Le frontend envoie "notes"

  // On utilise la bonne table (vehicle_logs) et on map "notes" vers "description"
  const sql = 'INSERT INTO vehicle_logs (vehicle_id, mileage, type, description) VALUES (?, ?, ?, ?)';
  
  // On force le type à 'Entretien' car ta base l'exige (NOT NULL)
  db.run(sql, [vehicleId, mileage, 'Entretien', notes], function(err) {
    if (err) {
      console.error("Erreur SQL :", err.message);
      return res.status(500).json({ message: 'Erreur lors de l\'ajout' });
    }
    res.status(201).json({ message: 'Entretien ajouté', id: this.lastID });
  });
};

// Récupérer l'historique d'un véhicule
const getVehicleLogs = (req, res) => {
  const vehicleId = req.params.vehicleId;
  // On interroge la bonne table
  const sql = 'SELECT * FROM vehicle_logs WHERE vehicle_id = ? ORDER BY date DESC';
  
  db.all(sql, [vehicleId], (err, rows) => {
    if (err) {
      console.error("Erreur SQL :", err.message);
      return res.status(500).json({ message: 'Erreur de lecture' });
    }
    res.json(rows);
  });
};

module.exports = { addTrackingLog, getVehicleLogs };
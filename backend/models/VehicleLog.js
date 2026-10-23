const db = require('../config/db');

exports.create = (vehicleId, mileage, type, description, callback) => {
  const sql = `INSERT INTO vehicle_logs (vehicle_id, mileage, type, description) VALUES (?, ?, ?, ?)`;
  db.run(sql, [vehicleId, mileage, type, description], function(err) {
    callback(err, this ? this.lastID : null);
  });
};

exports.findByVehicleId = (vehicleId, callback) => {
  const sql = `SELECT * FROM vehicle_logs WHERE vehicle_id = ? ORDER BY date DESC`;
  db.all(sql, [vehicleId], callback);
};
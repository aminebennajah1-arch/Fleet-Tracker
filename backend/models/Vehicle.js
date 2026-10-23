const db = require('../config/db');

exports.getAll = (callback) => {
  db.all(`SELECT * FROM vehicles`, [], callback);
};

exports.create = (plate, model, callback) => {
  const sql = `INSERT INTO vehicles (plate, model) VALUES (?, ?)`;
  db.run(sql, [plate, model], function(err) {
    callback(err, this ? this.lastID : null);
  });
};

exports.deleteById = (id, callback) => {
  db.run(`DELETE FROM vehicles WHERE id = ?`, id, function(err) {
    callback(err, this ? this.changes : 0);
  });
};
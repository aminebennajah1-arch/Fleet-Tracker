const db = require('../config/db');

exports.create = (email, hashedPassword, callback) => {
  const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
  db.run(sql, [email, hashedPassword], function(err) {
    callback(err, this ? this.lastID : null);
  });
};

exports.findByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], callback);
};
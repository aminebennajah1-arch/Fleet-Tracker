const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers le fichier de la base de données
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
  } else {
    console.log('Connecté à la base de données SQLite 📦');

    // Initialisation des tables de la base de données
    db.serialize(() => {
      // 1. Table Utilisateurs (Users)
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin'
      )`);

      // 2. Table Véhicules (Vehicles)
      db.run(`CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plate TEXT UNIQUE NOT NULL,
        model TEXT NOT NULL,
        status TEXT DEFAULT 'active'
      )`);

      // Dans backend/config/db.js, remplace la création de la table tracking_logs par :
      db.run(`CREATE TABLE IF NOT EXISTS vehicle_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER NOT NULL,
        mileage INTEGER NOT NULL,
        type TEXT NOT NULL,          -- ex: 'Relevé km', 'Entretien', 'Plein', 'Panne'
        description TEXT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
      )`);

      console.log('Tables de la base de données initialisées avec succès ✅');
    });
  }
});

module.exports = db;
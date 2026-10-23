import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import api from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Erreur de chargement", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const generatePDF = async () => {
    // 1. Création du document
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Rapport de Flotte et Réparations", 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')}`, 14, 32);

    // 2. PREMIER TABLEAU : La flotte
    const vehicleColumn = ["ID", "Plaque", "Modèle", "Statut"];
    const vehicleRows = vehicles.map(v => [v.id, v.plate, v.model, v.status]);

    autoTable(doc, {
      head: [vehicleColumn],
      body: vehicleRows,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [79, 70, 229] }
    });

    // 3. SECOND TABLEAU : Les réparations
    doc.setFontSize(14);
    doc.setTextColor(40);
    // On se place juste en dessous du premier tableau
    const finalY = doc.lastAutoTable.finalY || 60; 
    doc.text("Historique détaillé des entretiens", 14, finalY + 15);

    const logColumn = ["Plaque", "Date", "Kilométrage", "Description"];
    const logRows = [];

    // On boucle sur chaque véhicule pour aller chercher ses réparations
    for (const vehicle of vehicles) {
      try {
        const response = await api.get(`/tracking/${vehicle.id}`);
        const logs = response.data;
        
        // On ajoute chaque réparation dans les lignes du tableau
        logs.forEach(log => {
          logRows.push([
            vehicle.plate,
            new Date(log.date || Date.now()).toLocaleDateString('fr-FR'),
            `${log.mileage} km`,
            log.description || 'Entretien'
          ]);
        });
      } catch (error) {
        console.error(`Erreur chargement logs pour ${vehicle.id}`);
      }
    }

    autoTable(doc, {
      head: [logColumn],
      body: logRows,
      startY: finalY + 20,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139, 92, 246] }
    });

    // 4. Téléchargement
    doc.save("rapport_complet.pdf");
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Tableau de bord</h1>
      <p className="subtitle">Aperçu en temps réel de votre flotte et de vos alertes.</p>

      {/* Grille des statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Véhicules totaux</h3>
          <div className="stat-value">{vehicles.length}</div>
        </div>
        <div className="stat-card">
          <h3>En circulation</h3>
          <div className="stat-value" style={{ background: 'linear-gradient(135deg, #4ade80, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {vehicles.filter(v => v.status === 'actif').length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Alertes maintenance</h3>
          <div className="stat-value" style={{ background: 'linear-gradient(135deg, #f87171, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            0
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        {/* Section de gauche : La liste des véhicules */}
        <div className="card dashboard-list">
          <h2 style={{fontSize: '1.4rem', marginBottom: '1rem', color: 'white'}}>🚗 Flotte récente</h2>
          
          {loading ? (
            <p style={{color: 'var(--text-muted)'}}>Chargement de la base de données...</p>
          ) : vehicles.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🏜️</span>
              <p>Votre garage est désespérément vide.</p>
              <Link to="/vehicles" className="btn" style={{marginTop: '1.5rem', display: 'inline-block', width: 'auto'}}>
                Ajouter mon premier véhicule
              </Link>
            </div>
          ) : (
            <ul className="vehicle-list">
              {vehicles.slice(0, 5).map(v => (
                <li key={v.id}>
                  <span className="plate">{v.plate}</span>
                  <span className="model">{v.model}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Section de droite : Actions rapides */}
        <div className="card quick-actions">
          <h2 style={{fontSize: '1.4rem', marginBottom: '1rem', color: 'white'}}>⚡ Actions</h2>
          <Link to="/vehicles" className="btn-secondary">Gérer les véhicules</Link>
          <button className="btn-secondary" onClick={generatePDF}>
            Générer un rapport PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
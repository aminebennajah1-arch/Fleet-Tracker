import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const VehicleHistory = () => {
  const params = useParams();
  const id = params.id || params.vehicleId;
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour le formulaire d'entretien
  const [mileage, setMileage] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchLogs = async () => {
    try {
      const response = await api.get(`/tracking/${id}`);
      setLogs(response.data);
    } catch (error) {
      console.error("Erreur de chargement", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [id]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données d'entretien au backend
      await api.post(`/tracking/${id}`, { 
        mileage: mileage, 
        notes: notes 
      });
      setMessage({ type: 'success', text: 'Entretien ajouté avec succès !' });
      setMileage('');
      setNotes('');
      fetchLogs();
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout.' });
    }
  };

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1 className="page-title">Carnet d'entretien</h1>
          <p className="subtitle">Historique des interventions du véhicule #{id}</p>
        </div>
        <Link to="/vehicles" className="btn-secondary" style={{ width: 'auto', marginBottom: '2.5rem' }}>
          Retour à la flotte
        </Link>
      </div>

      <div className="dashboard-sections">
        
        {/* COLONNE GAUCHE : Formulaire d'entretien */}
        <div className="card">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'white' }}>🔧 Nouvel entretien</h2>
          
          {message.text && (
            <div className={message.type === 'error' ? 'error' : 'success'}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAddLog}>
            <label>Kilométrage actuel :</label>
            <input 
              type="number" 
              value={mileage} 
              onChange={(e) => setMileage(e.target.value)} 
              placeholder="ex: 45000"
              required 
            />

            <label>Notes / Description :</label>
            <input 
              type="text" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="ex: Changement des filtres..."
              required 
            />

            <button type="submit" className="btn">Enregistrer l'entretien</button>
          </form>
        </div>

        {/* COLONNE DROITE : Historique */}
        <div className="card">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'white' }}>📖 Historique</h2>
          
          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Chargement du carnet...</p>
          ) : logs.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>Aucun entretien enregistré pour le moment.</p>
            </div>
          ) : (
            <ul className="vehicle-list">
              {logs.map((log) => (
                <li key={log.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontWeight: '500' }}>
                    <span>🔧 {log.notes || 'Intervention'}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {new Date(log.timestamp || Date.now()).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Kilométrage : {log.mileage} km
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default VehicleHistory;
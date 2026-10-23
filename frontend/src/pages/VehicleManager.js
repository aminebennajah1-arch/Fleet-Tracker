import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import VehicleCard from '../components/VehicleCard';
import { getVehicles, addVehicle, deleteVehicle } from '../services/vehicleService';

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      setError('Erreur lors de la récupération des véhicules.');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await addVehicle(plate, model);
      setMessage('Véhicule ajouté avec succès !');
      setPlate('');
      setModel('');
      fetchVehicles();
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'ajout.');
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);
      fetchVehicles();
    } catch (err) {
      setError('Erreur lors de la suppression.');
    }
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ marginLeft: '220px', padding: '40px', flex: 1 }}>
        <h1 style={{ color: '#0f172a', marginTop: 0 }}>Gestion de la Flotte</h1>

        {/* Formulaire d'ajout sécurisé */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '30px', maxWidth: '480px' }}>
          <h3 style={{ marginTop: 0 }}>Ajouter un véhicule</h3>
          {error && <p style={{ color: '#ef4444', fontSize: '0.875em' }}>{error}</p>}
          {message && <p style={{ color: '#16a34a', fontSize: '0.875em' }}>{message}</p>}
          
          <form onSubmit={handleAddVehicle}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Immatriculation (Plaque) :</label>
              <input 
                type="text" 
                value={plate} 
                onChange={(e) => setPlate(e.target.value)} 
                placeholder="ex: AA-123-BB"
                required 
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Modèle du véhicule :</label>
              <input 
                type="text" 
                value={model} 
                onChange={(e) => setModel(e.target.value)} 
                placeholder="ex: Peugeot 208"
                required 
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Enregistrer
            </button>
          </form>
        </div>

        {/* Liste des véhicules */}
        <h3>Véhicules enregistrés ({vehicles.length})</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} onDelete={handleDeleteVehicle} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default VehicleManager;
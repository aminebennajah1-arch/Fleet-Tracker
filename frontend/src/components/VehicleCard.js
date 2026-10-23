import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle, onDelete }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', width: '250px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0, color: '#0f172a' }}>{vehicle.model}</h4>
        <span style={{ fontSize: '0.75em', padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#166534' }}>
          {vehicle.status}
        </span>
      </div>
      <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.9em' }}>
        Plaque : <strong>{vehicle.plate}</strong>
      </p>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <Link 
          to={`/history/${vehicle.id}`}
          style={{ background: '#0284c7', color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8em', textAlign: 'center', flex: 1 }}
        >
          📋 Carnet
        </Link>
        {onDelete && (
          <button 
            onClick={() => onDelete(vehicle.id)} 
            style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8em' }}
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
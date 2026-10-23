import React from 'react';

const MapView = ({ trackingLogs }) => {
  if (!trackingLogs || trackingLogs.length === 0) {
    return <p style={{ color: '#64748b' }}>Aucune donnée de géolocalisation enregistrée pour ce véhicule.</p>;
  }

  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
      <h3 style={{ marginTop: 0 }}>Dernières positions enregistrées</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
            <th style={{ padding: '8px' }}>Date / Heure</th>
            <th style={{ padding: '8px' }}>Latitude</th>
            <th style={{ padding: '8px' }}>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {trackingLogs.map((log) => (
            <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px' }}>{new Date(log.timestamp).toLocaleString()}</td>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>{log.latitude}</td>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>{log.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MapView;
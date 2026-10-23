import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logoutContext, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutContext();
    navigate('/login');
  };

  return (
    <aside style={{ width: '220px', height: '100vh', background: '#1e293b', color: '#fff', padding: '20px', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Fleet Tracker</h3>
      <p style={{ fontSize: '0.85em', color: '#94a3b8' }}>{user?.email}</p>
      <hr style={{ borderColor: '#334155', margin: '15px 0' }} />
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '15px' }}>
            <Link to="/" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 'bold' }}>📊 Tableau de bord</Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link to="/vehicles" style={{ color: '#94a3b8', textDecoration: 'none' }}>🚗 Flotte de véhicules</Link>
          </li>
        </ul>
      </nav>
      <button 
        onClick={handleLogout} 
        style={{ width: '100%', padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Déconnexion
      </button>
    </aside>
  );
};

export default Sidebar;
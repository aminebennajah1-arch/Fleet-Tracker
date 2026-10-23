import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isRegistering) {
      try {
        await register(email, password);
        setMessage('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        setIsRegistering(false);
      } catch (err) {
        setError(err.response?.data?.error || "Erreur lors de l'inscription.");
      }
    } else {
      try {
        const data = await login(email, password);
        loginContext(data.user);
        navigate('/');
      } catch (err) {
        setError('Identifiants incorrects.');
      }
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>{isRegistering ? 'Créer un compte' : 'Connexion'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email :</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Mot de passe :</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {isRegistering ? "S'inscrire" : 'Se connecter'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em' }}>
        {isRegistering ? 'Déjà un compte ? ' : "Pas encore de compte ? "}
        <button 
          type="button" 
          onClick={() => { setIsRegistering(!isRegistering); setError(''); setMessage(''); }}
          style={{ background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Se connecter' : 'Créer un compte'}
        </button>
      </p>
    </div>
  );
};

export default Login;
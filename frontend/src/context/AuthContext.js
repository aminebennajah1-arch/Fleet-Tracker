import React, { createContext, useState, useEffect } from 'react';

// Création du contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'application, on vérifie si l'utilisateur est déjà dans le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fonction pour mettre à jour l'état lors de la connexion
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Fonction pour se déconnecter
  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
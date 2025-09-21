import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email=="projet.junior.ensi@gmail.com" && password=="18EJEntreprise@") {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // Use the useContext hook to access the AuthContext
  const context = useContext(AuthContext);

  // If the context is not found, throw an error
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Return the authentication context
  return (context);
};
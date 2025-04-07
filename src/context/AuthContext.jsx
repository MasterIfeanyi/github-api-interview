import React, { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const value = {
    username,
    setUsername
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
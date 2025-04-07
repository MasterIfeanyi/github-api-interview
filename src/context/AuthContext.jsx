import React, { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  

  const value = {
    username,
    setUsername,
    userData,
    setUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
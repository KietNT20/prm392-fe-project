import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const updateToken = (token) => {
    setUserToken(token);
  };

  const clearToken = () => {
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, updateToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

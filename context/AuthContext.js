import storageMethod from '@/utils/storageMethod';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isLoading: true,
  userToken: null,
});

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await storageMethod.get('token');
      setUserToken(token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
}

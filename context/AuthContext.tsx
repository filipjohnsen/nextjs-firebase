import { UseAuthContextProvider } from '@types';
import { createContext } from 'react';
import { useAuthContextProvider } from '../hooks/useAuthContextProvider';

export const AuthContext = createContext<UseAuthContextProvider>({
  isLoading: false,
  login: async () => {},
  loginWithProvider: async () => {},
  logout: async () => {},
  signup: async () => {},
  user: null,
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const { isLoading, ...rest } = useAuthContextProvider();
  return (
    <AuthContext.Provider value={{ isLoading, ...rest }}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

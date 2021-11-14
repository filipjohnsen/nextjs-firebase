import { UseAuthContextProvider } from '@types';
import { createContext } from 'react';
import { useAuthContextProvider } from '../hooks/useAuthContextProvider';

export const AuthContext = createContext<UseAuthContextProvider>({
  isLoading: false,
  login: async () => {},
  loginWithProvider: async () => {},
  logout: async () => {},
  signup: async () => {},
  deleteAccount: async () => {},
  user: null,
});

export const AuthContextProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={useAuthContextProvider()}>{children}</AuthContext.Provider>;
};

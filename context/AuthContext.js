import { onAuthStateChanged } from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase-client';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider value={useAuthContextProvider()}>{children}</AuthContext.Provider>;
};

const useAuthContextProvider = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    setIsLoading(false);
  }, []);

  //implement login method
  const login = async (email, password) => {};

  //implement sign out method
  const logout = async () => {};

  //implement sign up method
  const signup = async (email, password) => {};

  return { user, isLoading };
};

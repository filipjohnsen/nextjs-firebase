import {
  AuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@firebase/auth';
import { auth } from '@lib/firebase-client';
import { SignUp } from '@types';
import { createUser } from '@utils/create-user';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';

export const useAuthContextProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(() => user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loginWithProvider = useCallback(async (provider: AuthProvider) => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      user.metadata.creationTime === user.metadata.lastSignInTime ? await createUser(user) : null;
      setUser(() => user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const logout = useCallback(async () => await signOut(auth), []);

  const signup = useCallback(
    async ({ email, password, config }: SignUp) => {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await createUser(user);
        config ? router.push(config.redirectTo) : null;
        setUser(() => user);
      } catch (error) {
        console.error(error);
      }
    },
    [router.push]
  );

  return { user, isLoading, login, loginWithProvider, logout, signup };
};

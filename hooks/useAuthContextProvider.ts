import {
  AuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  deleteUser,
} from '@firebase/auth';
import { auth } from '@lib/firebase-client';
import { FirebaseUser, SignUp } from '@types';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutateDoc } from './useMutateDoc';

export const useAuthContextProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, , { deleteDoc, addDoc }] = useMutateDoc<FirebaseUser>();
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
      user.metadata.creationTime === user.metadata.lastSignInTime
        ? await addDoc(`users/${user.uid}`, {
            email: user.email!,
            displayName: user.displayName ?? user.email!,
            verified: user.emailVerified,
            photoURL: user.photoURL!,
          })
        : null;
      setUser(() => user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    router.push('/');
  }, [router.push]);

  const signup = useCallback(
    async ({ email, password, config }: SignUp) => {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        await addDoc(`users/${user.uid}`, {
          email: user.email!,
          displayName: user.displayName ?? user.email!,
          verified: user.emailVerified,
          photoURL: user.photoURL!,
        });
        config ? router.push(config.redirectTo) : null;
        setUser(() => user);
      } catch (error) {
        console.error(error);
      }
    },
    [router.push]
  );

  const deleteAccount = useCallback(async () => {
    try {
      await Promise.all([
        await deleteDoc(`users/${user!.uid}`),
        await deleteUser(user!),
        await logout(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  return { user, isLoading, login, loginWithProvider, logout, signup, deleteAccount };
};

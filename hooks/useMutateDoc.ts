import { db } from '@lib/firebase-client';
import { UseMutateDoc } from '@types';
import {
  deleteDoc as deleteDocument,
  doc as document,
  getDoc as getDocument,
  setDoc as setDocument,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';

export const useMutateDoc = <T extends object>(): UseMutateDoc<T> => {
  const [doc, setDoc] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDoc = useCallback(async (path: string | (string | false)) => {
    if (typeof path !== 'boolean') {
      setIsLoading(() => true);
      const ref = document(db, path);
      try {
        const doc = await getDocument(ref);
        doc.exists() ? setDoc(() => (doc.data() as T) ?? null) : setDoc(() => null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(() => false);
      }
    }
  }, []);

  const deleteDoc = useCallback(async (path: string) => {
    const ref = document(db, path);
    try {
      setIsLoading(() => true);
      await deleteDocument(ref);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  const addDoc = useCallback(async (path: string, data: T) => {
    const ref = document(db, path);
    try {
      setIsLoading(() => true);
      await setDocument(ref, data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  return [doc, isLoading, { getDoc, deleteDoc, addDoc }];
};

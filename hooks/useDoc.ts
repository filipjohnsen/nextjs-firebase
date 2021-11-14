import { UseDoc } from '@types';
import { useEffect } from 'react';
import { useMutateDoc } from './useMutateDoc';

export const useDoc = <T extends object>(path: string | (string | false)): UseDoc<T> => {
  const [doc, isLoading, { getDoc }] = useMutateDoc<T>();

  useEffect(() => {
    getDoc(path);
  }, [path]);

  return [doc, isLoading];
};

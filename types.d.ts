import { useAuthContextProvider } from '@hooks/useAuthContextProvider';

export type UseAuthContextProvider = ReturnType<typeof useAuthContextProvider>;

export type SignUp = {
  email: string;
  password: string;
  config?: SignUpConfig;
};

export type SignUpConfig = {
  redirectTo: string;
};

export type FirebaseUser = {
  email: string;
  displayName: string;
  verified: boolean;
  photoURL: string;
};

export type UseDoc<T> = [T | null, boolean];

export type UseMutateDoc<T extends object> = [
  T | null,
  boolean,
  {
    getDoc: (path: string | (string | false)) => Promise<void>;
    deleteDoc: (path: string) => Promise<void>;
    addDoc: (path: string, data: T) => Promise<void>;
  }
];

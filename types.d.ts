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

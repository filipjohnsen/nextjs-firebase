import { useAuth } from '@hooks/useAuth';
import { googleProvider } from '@lib/firebase-client';
import type { NextPage } from 'next';

const Index: NextPage = () => {
  const { user, loginWithProvider, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user ? `Welcome ${user.email}` : 'You are not logged in'}</h1>
      <button
        onClick={
          !user ? async () => await loginWithProvider(googleProvider) : async () => await logout()
        }
      >
        {user ? 'Log out' : 'Log in'}
      </button>
    </div>
  );
};

export default Index;

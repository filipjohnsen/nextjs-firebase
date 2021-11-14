import { useAuth } from '@hooks/useAuth';
import { googleProvider } from '@lib/firebase-client';
import type { NextPage } from 'next';

const Index: NextPage = () => {
  const { user, loginWithProvider, logout } = useAuth();

  return (
    <div>
      <h1>{user ? `Welcome ${user.email}` : 'You are not signed in'}</h1>
      <button
        onClick={!user ? async () => loginWithProvider(googleProvider) : async () => logout()}
      >
        {user ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default Index;

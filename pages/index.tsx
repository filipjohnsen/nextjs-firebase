import { useAuth } from '@hooks/useAuth';
import { googleProvider } from '@lib/firebase-client';
import type { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => {
  const { user, loginWithProvider, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {user ? (
          <div>
            Welcome{' '}
            <Link href={`/user/${user.uid}`}>
              <a>{user.email}</a>
            </Link>
          </div>
        ) : (
          'You are not logged in'
        )}
      </h1>
      <button
        onClick={
          !user ? async () => await loginWithProvider(googleProvider) : async () => await logout()
        }
      >
        {user ? 'Log out' : 'Log in'}
      </button>
      {!user && (
        <div>
          <p>
            Not signed up? Sign up{' '}
            <Link passHref href="/signup">
              <a>here</a>
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;

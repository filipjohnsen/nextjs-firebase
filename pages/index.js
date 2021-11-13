import { useAuthContext } from '../context/AuthContext';

export default function Home() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>{user ? `Welcome ${user.email}` : 'You are not signed in'}</h1>
    </div>
  );
}

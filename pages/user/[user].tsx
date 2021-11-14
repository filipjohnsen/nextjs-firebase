import { useAuth } from '@hooks/useAuth';
import { useDoc } from '@hooks/useDoc';
import { FirebaseUser } from '@types';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

export interface UserPageProps {}

const UserPage: NextPage = (props: UserPageProps) => {
  const router = useRouter();
  const [doc, isLoading] = useDoc<FirebaseUser>(router.isReady && `users/${router.query.user}`);
  const { deleteAccount } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {doc?.displayName}
      <button onClick={async () => await deleteAccount()}>Delete account</button>
    </div>
  );
};

export default UserPage;

import { User } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '@lib/firebase-client';

export const createUser = async (user: User) => {
  const ref = collection(db, 'users');

  try {
    await addDoc(ref, {
      email: user.email,
      displayName: user.displayName ?? user.email,
      photoURL: user.photoURL ?? '',
    });
  } catch (error) {
    console.error(error);
  }
};

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// initialize firebase, this if statement checks if firebase is already initialized
if (!getApps().length) {
  initializeApp({
    apiKey: 'AIzaSyChDqslkhhkdJwaAJsEEUAG6qcawbEYQOQ',
    authDomain: 'digital-maturity-calculator.firebaseapp.com',
    projectId: 'digital-maturity-calculator',
    storageBucket: 'digital-maturity-calculator.appspot.com',
    messagingSenderId: '71887088181',
    appId: '1:71887088181:web:e926cc0064102467af9f7c',
  });
}

const app = getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);

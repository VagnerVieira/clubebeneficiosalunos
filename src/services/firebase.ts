import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

export const firebaseConfig = {
  projectId: "gen-lang-client-0236681120",
  appId: "1:148622615066:web:6ad8887b2cfe3c1ce0e7a3",
  apiKey: "AIzaSyBcBMU0pmZIl8LUm1kdg7wIrHq5OFlHUOA",
  authDomain: "gen-lang-client-0236681120.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-clubedebenefcios-55acdfe0-06df-40be-9912-a01e30485aa1",
  storageBucket: "gen-lang-client-0236681120.firebasestorage.app",
  messagingSenderId: "148622615066",
  measurementId: "",
  oAuthClientId: "148622615066-kr1g0vo3qer955vl6c5otq5jsbejalcf.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

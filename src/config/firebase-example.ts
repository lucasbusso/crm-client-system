import { FirebaseOptions, initializeApp } from "firebase/app";
import * as auth from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  appId: process.env.REACT_APP_APP_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

export const appFirebase = initializeApp(firebaseConfig);
export const authFirebase = auth.initializeAuth(appFirebase);

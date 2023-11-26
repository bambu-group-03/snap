// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import axios from 'axios';
import { initializeApp } from 'firebase/app';
import type { UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { signIn, useAuth } from '@/core/auth';
import { MMKVPersistence } from '@/core/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyApY18BS1qvXcpV0sMF6klszr5AwFSxKt4',
  authDomain: 'bambu-snap.firebaseapp.com',
  projectId: 'bambu-snap',
  storageBucket: 'bambu-snap.appspot.com',
  messagingSenderId: '673926404216',
  appId: '1:673926404216:web:8b98dbbf12d9caafdc758d',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(MMKVPersistence),
});

auth.onIdTokenChanged(async (user) => {
  if (user) {
    // User is signed in, check token expiration
    const token = await user.getIdTokenResult();
    const expirationTime = new Date(token.expirationTime).getTime();
    const currentTime = new Date().getTime();

    if (currentTime >= expirationTime) {
      // Token has expired, log out the user
      logout();
    }
  } else {
    // User is signed out
    // Handle the case where the user is not logged in if necessary
  }
});
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  let userCred: UserCredential | null = null;

  try {
    userCred = await signInWithEmailAndPassword(auth, email, password);
    await axios.post(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/loging_successful`,
      { email: email, message: null }
    );
  } catch (err) {
    await axios.post(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/loging_error`,
      { email: email, message: null }
    );
    console.error(err);
  }

  return userCred;
};

// Post to identity-socializer para el userCred
const registerIntoDb = async (name = 'ANONIM', email: string, id: string) => {
  let res = null;

  // 'http://10.0.2.2:8000/api/auth/register'
  const url =
    'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/register'; // Reemplaza con tu URL

  const datos = {
    id: id,
    email: email,
    name: name,
  };

  try {
    res = await axios.post(url, datos);

    // Log signup_successful
    await axios.post(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/signup_successful`,
      { email: email, message: null }
    );
  } catch (err) {
    // Log signup_error
    await axios.post(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/signup_error`,
      { email: email, message: null }
    );
    console.error(err);
  }
  return res;
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
  //  name?: string
) => {
  let userCred: UserCredential | null = null;

  try {
    userCred = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }

  return userCred;
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.error('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  useAuth.getState().signOut();
};

const handleAuth = async (userCred: UserCredential | null) => {
  if (userCred !== null) {
    const access_token = await userCred.user.getIdToken();
    const refresh_token = userCred.user.refreshToken;
    signIn(
      {
        access: access_token,
        refresh: refresh_token,
      },
      userCred.user.uid
    );
  }
};

export {
  auth,
  db,
  handleAuth,
  logInWithEmailAndPassword,
  logout,
  registerIntoDb,
  registerWithEmailAndPassword,
  sendPasswordReset,
};

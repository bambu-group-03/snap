// https://blog.logrocket.com/user-authentication-firebase-react-apps/

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

// Poner datos de nosotros aca
// const firebaseConfig = {
//   apiKey: 'AIzaSyDIXJ5YT7hoNbBFqK3TBcV41-TzIO-7n7w',
//   authDomain: 'fir-auth-6edd8.firebaseapp.com',
//   projectId: 'fir-auth-6edd8',
//   storageBucket: 'fir-auth-6edd8.appspot.com',
//   messagingSenderId: '904760319835',
//   appId: '1:904760319835:web:44fd0d957f114b4e51447e',
//   measurementId: 'G-Q4TYKH9GG7',
// };

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

// Send password reset email
const resetPasswordEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }

  return;
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  let userCred: UserCredential | null = null;

  try {
    userCred = await signInWithEmailAndPassword(auth, email, password);
    await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/loging_successful`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, message: null }),
      }
    );
  } catch (err) {
    await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/loging_error`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, message: null }),
      }
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
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    // Log signup_successful
    await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/signup_successful`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, message: null }),
      }
    );
  } catch (err) {
    // Log signup_error
    await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/logger/signup_error`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, message: null }),
      }
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
  resetPasswordEmail,
};

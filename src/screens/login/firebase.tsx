// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import { initializeApp } from 'firebase/app';
import type { UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

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
  apiKey: 'AIzaSyDBwxqTxARST5GZhjX3hEvoYBK1tSojke4',
  authDomain: 'bambu-snap.firebaseapp.com',
  projectId: 'bambu-snap',
  storageBucket: 'bambu-snap.appspot.com',
  messagingSenderId: '673926404216',
  appId: '1:673926404216:web:8b98dbbf12d9caafdc758d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  let userCred: UserCredential | null = null;

  try {
    userCred = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }

  return userCred;
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
};

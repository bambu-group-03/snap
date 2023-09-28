import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect } from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { auth, handleAuth } from '@/screens/login/firebase';
import { FocusAwareStatusBar } from '@/ui';

import {
  logInWithEmailAndPassword,
  registerIntoDb,
  registerWithEmailAndPassword,
} from './firebase';
import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

WebBrowser.maybeCompleteAuthSession();

export const Login = () => {
  const signIn = useAuth.use.signIn();
  const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      '673926404216-g8qapqik3gqhi82l4spomgj1ec3rca9q.apps.googleusercontent.com',
  });

  useSoftKeyboardEffect();

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCred = await signInWithCredential(auth, credential);
        if (userCred !== null) {
          const token = await userCred.user.getIdToken();
          const access_token = token;
          const refresh_token = userCred.user.refreshToken;
          signIn({ access: access_token, refresh: refresh_token });
        }
      }
    };

    handleGoogleResponse();
  }, [response, signIn]);

  const onLogInSubmit: LoginFormProps['onLogInSubmit'] = (data) => {
    logInWithEmailAndPassword(data.email, data.password).then(handleAuth);
  };

  const onSignUpSubmit: LoginFormProps['onSignUpSubmit'] = (data) => {
    registerWithEmailAndPassword(data.email, data.password).then((userCred) => {
      if (userCred !== null) {
        registerIntoDb(data.name, data.email, userCred.user.uid).then((res) => {
          if (res !== null && res.status === 200) {
            handleAuth(userCred);
          } else {
            console.error(
              res?.status !== 200
                ? 'Error in DB: Response status != 200'
                : 'Error in SignUp: Call a Dev!'
            );
          }
        });
      }
    });
  };

  const onLogInGoogleSubmit: LoginFormProps['onLogInGoogleSubmit'] = () => {
    promptAsync();
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm
        onLogInSubmit={onLogInSubmit}
        onSignUpSubmit={onSignUpSubmit}
        onLogInGoogleSubmit={onLogInGoogleSubmit}
      />
    </>
  );
};

export default Login;

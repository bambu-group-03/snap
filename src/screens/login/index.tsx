import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { auth } from '@/screens/login/firebase';
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
  useSoftKeyboardEffect();
  const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      '673926404216-utjf1e9lfk05mhhellig5sieg0fon99j.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const onLogInSubmit: LoginFormProps['onLogInSubmit'] = (data) => {
    logInWithEmailAndPassword(data.email, data.password).then((userCred) => {
      if (userCred !== null) {
        userCred.user.getIdToken().then((token) => {
          let access_token = token;
          let refresh_token = userCred.user.refreshToken;
          signIn({ access: access_token, refresh: refresh_token });
        });
      }
    });
  };

  const onSigUpSubmit: LoginFormProps['onSignUpSubmit'] = (data) => {
    registerWithEmailAndPassword(data.email, data.password).then((userCred) => {
      if (userCred !== null) {
        registerIntoDb(data.name, data.email, userCred.user.uid).then((res) => {
          if (res !== null && res.status === 200) {
            userCred.user.getIdToken().then((token) => {
              let access_token = token;
              let refresh_token = userCred.user.refreshToken;
              signIn({ access: access_token, refresh: refresh_token });
            });
          } else {
            if (res?.status !== 200) {
              console.error('Error in DB: Response status != 200');
            } else {
              console.error('Error in SignUp: Call a Dev!');
            }
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
        onSignUpSubmit={onSigUpSubmit}
        onLogInGoogleSubmit={onLogInGoogleSubmit}
      />
    </>
  );
};

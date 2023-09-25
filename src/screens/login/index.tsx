import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

import {
  logInWithEmailAndPassword,
  registerIntoDb,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from './firebase';
import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

export const Login = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

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

            // TODO: borrar_en_firebase_usuario();
          }
        });
      }
    });
  };

  const onLogInGoogleSubmit: LoginFormProps['onLogInGoogleSubmit'] = () => {
    signInWithGoogle().then((userCred) => {
      if (userCred !== null) {
        userCred.user.getIdToken().then((token) => {
          let access_token = token;
          let refresh_token = userCred.user.refreshToken;

          signIn({ access: access_token, refresh: refresh_token });
        });
      }
    });
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

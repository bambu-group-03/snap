import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

import { logInWithEmailAndPassword } from './firebase';
import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

export const Login = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    // console.log(data.email);
    // console.log(data.password); // Aca paso los datos al servidor

    logInWithEmailAndPassword(data.email, data.password).then((userCred) => {
      let access_token = 'default-access-token';
      let refresh_token = 'default-refresh-token';

      if (userCred !== null) {
        userCred.user.getIdToken().then((token) => {
          access_token = token;
        });

        refresh_token = userCred.user.refreshToken;
      }

      console.log(access_token);
      console.log(refresh_token);

      signIn({ access: access_token, refresh: refresh_token });
    });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

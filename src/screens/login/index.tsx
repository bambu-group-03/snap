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

    logInWithEmailAndPassword(data.email, data.password);

    // ask for token to the server
    let access_token = 'access-token';
    let refresh = 'refresh-token';

    signIn({ access: access_token, refresh: refresh });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

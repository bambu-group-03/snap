import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Image, TouchableOpacity } from '@/ui';
import { Button, ControlledInput, Text, View } from '@/ui';
import { useNavigation } from '@react-navigation/native';
import { ResetFormProps } from './recover-password-screen';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onLogInSubmit?: SubmitHandler<FormType>;
  onSignUpSubmit?: SubmitHandler<FormType>;
  onLogInGoogleSubmit?: () => void;
};

export const LoginForm = ({
  onLogInSubmit = () => {},
  onSignUpSubmit = () => {},
  onLogInGoogleSubmit = () => {},
}: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  let navigate = useNavigation();

  return (
    <View className="flex-1 justify-center p-4 ">
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 100, height: 100, alignSelf: 'center' }}
        source={require('../../../assets/icon.png')}
      />

      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        Welcome
      </Text>

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={() =>
          navigate.navigate('RecoverPasswordScreen', {
            email: '',
          })
        }
      >
        <Text
          testID="forgot-password"
          className="text-right py-2 text-blue-600"
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <Button
        testID="login-button"
        label="Login with Google"
        onPress={onLogInGoogleSubmit}
        variant="primary"
      />

      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onLogInSubmit)}
        variant="outline"
      />
      <Button
        testID="sign-up-button"
        label="Sign Up"
        onPress={handleSubmit(onSignUpSubmit)}
        variant="secondary"
      />
    </View>
  );
};

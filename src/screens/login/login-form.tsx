import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Image } from '@/ui';
import { Button, ControlledInput, Text, View } from '@/ui';

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
};

export const LoginForm = ({
  onLogInSubmit = () => {},
  onSignUpSubmit = () => {},
}: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Image
        style={{ width: 200, height: 200, alignSelf: 'center' }}
        source={require('../../../assets/icon.png')}
      />

      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        Sign In
      </Text>

      <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="Name"
      />

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

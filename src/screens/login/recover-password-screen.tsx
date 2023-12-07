import { zodResolver } from '@hookform/resolvers/zod';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

import { sendPasswordReset } from './firebase';
import type { LoginStackParamList } from './login-navigator';

const onResetSubmit: ResetFormProps['onResetSubmit'] = (data) => {
  try {
    sendPasswordReset(data.email).then(() => {});
  } catch (err) {
    console.error(err);
  }
};

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

export type FormType = z.infer<typeof schema>;

export type ResetFormProps = {
  onResetSubmit?: SubmitHandler<FormType>;
};

export const RecoverPasswordScreen = () => {
  const route =
    useRoute<RouteProp<LoginStackParamList, 'RecoverPasswordScreen'>>();
  const { email } = route.params;

  const [emailRecover, setEmailRecover] = useState(email);

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  let navigate = useNavigation();

  return (
    <View className="flex-1 justify-center p-4 ">
      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        Reset Password
      </Text>

      <ControlledInput
        testID="email-input"
        placeholder={emailRecover}
        control={control}
        name="email"
        label="Email"
      />
      <Button
        testID="login-button"
        label="Reset Password"
        onPress={handleSubmit(onResetSubmit)}
        variant="primary"
      />

      <Button
        testID="go-back-button"
        label="Volver atras"
        onPress={() => {
          navigate.navigate('Login');
        }}
        variant="primary"
      />
    </View>
  );
};

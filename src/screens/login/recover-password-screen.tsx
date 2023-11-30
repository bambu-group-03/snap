import { View, Text, ControlledInput, Button } from '@/ui';
import { LoginStackParamList } from './login-navigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

export const RecoverPasswordScreen = ({
  onResetSubmit = () => {},
}: ResetFormProps) => {
  const route =
    useRoute<RouteProp<LoginStackParamList, 'RecoverPasswordScreen'>>();
  const { email } = route.params;

  const [emailRecover, setEmailRecover] = useState(email);

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  let navigate = useNavigation();

  return (
    <View>
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
        label="Login with Google"
        onPress={() => handleSubmit(onResetSubmit)}
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

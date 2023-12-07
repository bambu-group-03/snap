import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import * as z from 'zod';

import { client } from '@/api';
import { getUserState, signInComplete } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Button, ControlledInput, ScrollView, View } from '@/ui';

const schema = z.object({
  dni: z
    .string()
    .regex(/^\d{8}$/, 'Invalid DNI number format. Must be 8 digits'),
  img_1_url: z
    .string()
    .max(200, 'Profile Photo ID cannot exceed 100 characters'),
  img_2_url: z
    .string()
    .max(200, 'Profile Photo ID cannot exceed 100 characters'),
});

export type FormType = z.infer<typeof schema>;

export type VerifyFormProps = {
  onVerifySubmit?: SubmitHandler<FormType>;
};

const whenVerifyComplete: VerifyFormProps['onVerifySubmit'] = async (data) => {
  const getCurrentUser = getUserState();
  console.log('current user data:', getCurrentUser);
  if (getCurrentUser) {
    const updatedUser: UserType = {
      ...getCurrentUser,
      ...data,
    };

    try {
      const response = await client.identity.post(
        '/api/certified_request/register',
        {
          user_id: updatedUser.id,
          dni: updatedUser.dni,
          img1_url: updatedUser.img_1_url,
          img2_url: updatedUser.img_2_url,
        }
      );
    } catch (e) {
      console.log(e);
    }

    signInComplete(updatedUser);

    showMessage({
      message: 'Request Verification sent successfully',
      type: 'success',
      duration: 3000,
      autoHide: true,
    });
  } else {
    console.error('Error: Current user data is undefined');
  }
};

const VerifyScreen = () => {
  return <FormVerify onVerifySubmit={whenVerifyComplete} />;
};

export const FormVerify = ({ onVerifySubmit = () => {} }: VerifyFormProps) => {
  const { handleSubmit, control, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const user = getUserState();

  return (
    <View className="flex-1 p-4">
      <ScrollView className="flex-1 p-4">
        <ControlledInput
          testID="phone-number-input"
          control={control}
          name="dni"
          label="DNI"
          keyboardType="numeric"
        />

        <ControlledInput
          testID="photo-id-input"
          control={control}
          name="img_1_url"
          label="Image 1"
        />

        <ControlledInput
          testID="photo-id-input"
          control={control}
          name="img_2_url"
          label="Image 2"
        />
      </ScrollView>

      <Button
        testID="sign-up-button"
        label="Send Verification Request"
        onPress={handleSubmit(onVerifySubmit)}
        variant="secondary"
      />
    </View>
  );
};

export default VerifyScreen;

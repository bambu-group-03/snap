import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { getUserState, signInComplete } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Button, ControlledInput, ScrollView, Text, View } from '@/ui';

import { locationOptions } from './list-of-countries';

const schema = z.object({
  first_name: z
    .string()
    .min(3, 'First Name must be at least 3 characters')
    .max(50, 'First Name cannot exceed 50 characters'),
  last_name: z
    .string()
    .min(3, 'Last Name must be at least 3 characters')
    .max(50, 'Last Name cannot exceed 50 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 4 characters')
    .max(20, 'Username cannot exceed 20 characters'),
  phone_number: z.string().regex(/^\d{10}$/, 'Invalid phone number format'), // Assuming 10-digit phone number
  ubication: z.string().max(100, 'Ubication cannot exceed 100 characters'),
  bio_msg: z.string().max(500, 'Bio Message cannot exceed 500 characters'),
  profile_photo_id: z
    .string()
    .max(200, 'Profile Photo ID cannot exceed 100 characters'),
});

export type FormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSignUpSubmit?: SubmitHandler<FormType>;
};

const whenSignInComplete: SignUpFormProps['onSignUpSubmit'] = (data) => {
  const getCurrentUser = getUserState();
  console.log('current user data:', getCurrentUser);
  if (getCurrentUser) {
    const updatedUser: UserType = {
      ...getCurrentUser,
      ...data,
    };
    signInComplete(updatedUser);
  } else {
    console.error('Error: Current user data is undefined');
  }
};
export const SignInComplete = () => {
  return <FormForSignInComplete onSignUpSubmit={whenSignInComplete} />;
};

export const FormForSignInComplete = ({
  onSignUpSubmit = () => {},
}: SignUpFormProps) => {
  const { handleSubmit, control, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [ubication, setSelectedUbication] = useState<string>('Argentina');

  useEffect(() => {
    setValue('ubication', ubication); // Update the value for the 'ubication' field in the controller
  }, [ubication, setValue]);

  const user = getUserState();

  return (
    <View className="flex-1 p-4">
      <ScrollView className="flex-1 p-4">
        <ControlledInput
          testID="first-name-input"
          control={control}
          name="first_name"
          label="First Name"
          defaultValue={user?.first_name ? user.first_name : ''}
        />

        <ControlledInput
          testID="last-name-input"
          control={control}
          name="last_name"
          label="Last Name"
          defaultValue={user?.last_name ? user.last_name : ''}
        />

        <ControlledInput
          testID="username-input"
          control={control}
          name="username"
          label="Username"
          defaultValue={user?.username ? user.username : ''}
        />

        <ControlledInput
          testID="phone-number-input"
          control={control}
          name="phone_number"
          label="Phone Number"
          keyboardType="numeric"
          defaultValue={user?.phone_number ? user.phone_number : ''}
        />

        <View>
          <Text>Ubication</Text>
          <Picker
            testID="ubication-input"
            selectedValue={ubication}
            onValueChange={(itemValue) => setSelectedUbication(itemValue)}
          >
            {locationOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>

        <ControlledInput
          testID="bio-input"
          control={control}
          name="bio_msg"
          label="Bio Message"
          defaultValue={user?.bio_msg ? user.bio_msg : ''}
        />

        <ControlledInput
          testID="photo-id-input"
          control={control}
          name="profile_photo_id"
          label="Profile Photo ID"
          defaultValue={user?.profile_photo_id ? user.profile_photo_id : ''}
        />
      </ScrollView>

      <Button
        testID="sign-up-button"
        label="Complete Sign Up"
        onPress={handleSubmit(onSignUpSubmit)}
        variant="secondary"
      />
    </View>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Picker } from '@react-native-picker/picker';
import { locationOptions } from './list-of-countries';

import { getUserState, signInComplete } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Button, ControlledInput, ScrollView, View, Text } from '@/ui';

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
    // Handle the case where user data is undefined, such as showing an error message or redirecting the user.
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

  return (
    <View className="flex-1 p-4">
      <ScrollView className="flex-1 p-4">
        <ControlledInput
          testID="first-name-input"
          control={control}
          name="first_name"
          label="First Name"
        />

        <ControlledInput
          testID="last-name-input"
          control={control}
          name="last_name"
          label="Last Name"
        />

        <ControlledInput
          testID="username-input"
          control={control}
          name="username"
          label="Username"
        />

        <ControlledInput
          testID="phone-number-input"
          control={control}
          name="phone_number"
          label="Phone Number"
          keyboardType="numeric"
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
        />

        <ControlledInput
          testID="photo-id-input"
          control={control}
          name="profile_photo_id"
          label="Profile Photo ID"
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

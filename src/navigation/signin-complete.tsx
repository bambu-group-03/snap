import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { LogBox } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import MultiSelect from 'react-native-multiple-select';
import * as z from 'zod';

import { getUserState, signInComplete } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { predefinedInterests } from '@/screens/profile/components/interests';
import { Button, ControlledInput, ScrollView, Text, View } from '@/ui';

import { locationOptions } from './list-of-countries';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

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

  showMessage({
    message: 'User Profile Edited Successfully',
    type: 'success',
    duration: 3000,
    autoHide: true,
  });
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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const multiSelect = useRef<MultiSelect | null>(null);

  const user = getUserState();

  // Initialize the initialState using useMemo
  const initialState = useMemo(
    () => ({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      username: user?.username || '',
      phone_number: user?.phone_number || '',
      ubication: 'Argentina', // You can set the initial value here
      bio_msg: user?.bio_msg || '',
      profile_photo_id: user?.profile_photo_id || '',
      selectedInterests: user?.interests || [],
    }),
    [user]
  );

  const onSelectedItemsChange = (selectedItemsByOptions: string[]) => {
    setSelectedInterests(selectedItemsByOptions);
  };

  // Set initial values for form fields
  useEffect(() => {
    if (multiSelect.current) {
      const selected =
        multiSelect.current.getSelectedItemsExt(selectedInterests);
      if (Array.isArray(selected)) {
        setSelectedInterests(
          selected.map((item: { name: string }) => item.name)
        );
      }
    }
    for (const key in initialState) {
      if (initialState.hasOwnProperty(key)) {
        const fieldName = key as keyof FormType; // Type assertion here
        setValue(fieldName, initialState[fieldName]);
      }
    }
  }, [initialState, setValue, selectedInterests]);

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
        <View>
          <Text>Interests</Text>
          <MultiSelect
            hideTags
            items={predefinedInterests}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedInterests}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#007bff" // Twitter-like blue color
            selectedItemIconColor="#007bff" // Twitter-like blue color
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#007bff" // Twitter-like blue color
            submitButtonText="Submit"
          />
        </View>
        <View className="flex flex-row flex-wrap pb-4">
          <Text className="py-2 pr-2">Selected Interests:</Text>
          {selectedInterests.map((item, index) => (
            <View
              className="m-1 rounded-full border border-gray-300 px-3 py-1"
              key={index}
            >
              <Text>{item}</Text>
            </View>
          ))}
        </View>
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

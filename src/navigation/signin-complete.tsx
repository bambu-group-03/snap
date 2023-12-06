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
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchUserState = () => {
      const user = getUserState(); // Assuming getUserState is async
      console.log(user);
      setCurrentUser(user);
    };

    // Set a timer to delay fetching the user data by 0.5 seconds
    const timer = setTimeout(() => {
      fetchUserState();
    }, 500); // 500 milliseconds (0.5 seconds)

    // Clear the timer if the component unmounts before the timer expires
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Initialize the initialState only when user is not undefined
      const initialState = {
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        username: currentUser.username || '',
        phone_number: currentUser.phone_number || '',
        ubication: currentUser.ubication || 'Argentina', // Set to user's ubication or default
        bio_msg: currentUser.bio_msg || '',
        profile_photo_id: currentUser.profile_photo_id || '',
        selectedInterests: currentUser.interests || [],
      };

      // Set initial values for form fields
      for (const key in initialState) {
        if (initialState.hasOwnProperty(key)) {
          const fieldName = key as keyof FormType;
          setValue(fieldName, initialState[fieldName]);
        }
      }

      // Set initial values for selectedInterests
      if (multiSelect.current && initialState.selectedInterests) {
        const selected = multiSelect.current.getSelectedItemsExt(
          initialState.selectedInterests
        );
        if (Array.isArray(selected)) {
          setSelectedInterests(
            selected.map((item: { name: string }) => item.name)
          );
        }
      }
    }
  }, [currentUser, setValue]);
  const onSelectedItemsChange = (selectedItemsByOptions: string[]) => {
    setSelectedInterests(selectedItemsByOptions);
  };

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

import { useNavigation } from '@react-navigation/native';
import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Button, View } from '@/ui';

type EditProfileButtonProps = {
  user: UserType | undefined;
  currentUser: UserType | undefined;
};

export const EditProfileButton = ({
  user,
  currentUser,
}: EditProfileButtonProps) => {
  const navigation = useNavigation();

  if (user?.id === currentUser?.id) {
    return (
      <View className="flex justify-center">
        <Button
          label="Edit"
          className="mt-4 rounded-full bg-blue-400 px-4 py-2 text-center font-bold text-white shadow hover:bg-blue-500"
          onPress={() => {
            navigation.navigate('EditProfileScreen', { user: currentUser });
          }}
        />
      </View>
    );
  }

  return null;
};

export default EditProfileButton;

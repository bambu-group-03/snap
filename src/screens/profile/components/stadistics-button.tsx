import { useNavigation } from '@react-navigation/native';
import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Button, View } from '@/ui';

type EditProfileButtonProps = {
  user: UserType | undefined;
  currentUser: UserType | undefined;
};

export const StadisticsButton = ({
  user,
  currentUser,
}: EditProfileButtonProps) => {
  const { navigate } = useNavigation();

  if (user?.id === currentUser?.id) {
    return (
      <View className="flex justify-center px-2">
        <Button
          label="Stats"
          className="mt-4 rounded-full bg-blue-500 px-4 py-2 text-center font-bold text-white shadow"
          onPress={() => {
            navigate('Stadistics');
          }}
        />
      </View>
    );
  }

  return null;
};

export default StadisticsButton;

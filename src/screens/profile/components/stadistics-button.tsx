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
      <View className="mb-2 flex flex-row justify-center">
        <Button
          label="Stadistics"
          className="mt-4 rounded-full bg-violet-400 px-4 py-2 text-center font-bold text-white shadow"
          onPress={() => {
            navigate('StadisticsScreen');
          }}
        />
      </View>
    );
  }

  return null;
};

export default StadisticsButton;

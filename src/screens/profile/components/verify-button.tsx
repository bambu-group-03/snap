import { useNavigation } from '@react-navigation/native';
import React from 'react';

import type { UserType } from '@/core/auth/utils';
import { Button, View } from '@/ui';

type VerifyProfileButtonProps = {
  user: UserType | undefined;
  currentUser: UserType | undefined;
};

export const VerifyButton = ({
  user,
  currentUser,
}: VerifyProfileButtonProps) => {
  const { navigate } = useNavigation();

  if (user?.id === currentUser?.id) {
    return (
      <View className="mb-2 flex justify-center">
        <Button
          label="Verify"
          className="mt-4 rounded-full bg-green-400 px-4 py-2 text-center font-bold text-white shadow"
          onPress={() => {
            navigate('Verify');
          }}
        />
      </View>
    );
  }

  return null;
};

export default VerifyButton;

import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { AddSnap, Feed, Snap } from '@/screens';
import { Pressable, Text } from '@/ui';
import { UserType } from '@/core/auth/utils';
import type { Snap as SnapType } from '@/api';
import { GoToLogout } from './auth-navigator';

export type FeedStackParamList = {
  Feed: undefined;
  Snap: { snap: SnapType };
  AddSnap: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

const GoToAddSnap = () => {
  const { navigate } = useNavigation();
  return (
    <Pressable onPress={() => navigate('AddSnap')} className="p-2">
      <Text className="text-primary-300">Snap</Text>
    </Pressable>
  );
};

export const FeedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <>
              <GoToAddSnap />
              <GoToLogout />
            </>
          ),
        }}
      >
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Snap" component={Snap} />
      </Stack.Group>

      <Stack.Screen name="AddSnap" component={AddSnap} />
    </Stack.Navigator>
  );
};

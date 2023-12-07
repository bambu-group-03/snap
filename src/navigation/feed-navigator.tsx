import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Snap as SnapType } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { AddSnap, Snap } from '@/screens';
import Feed from '@/screens/feed/list';
import ProfileScreen from '@/screens/profile/profile-screen';
import { Pressable, View } from '@/ui';

import { GoToLogout } from './auth-navigator';

export type FeedStackParamList = {
  Feed: undefined;
  Snap: { snap: SnapType };
  AddSnap: undefined;
  Auth: undefined;
  Profile: { user: UserType };
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

const GoToAddSnap = () => {
  const { navigate } = useNavigation();
  return (
    <Pressable onPress={() => navigate('AddSnap')} className="p-2">
      <View className="ml-auto pr-5">
        <FontAwesomeIcon icon={faPencil} />
      </View>
    </Pressable>
  );
};

export const FeedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
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
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

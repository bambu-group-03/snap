import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Snap as SnapType } from '@/api';
import { Snap } from '@/screens';

import NotionficationScreen from './notification-screen';

export type NotificationStackParamList = {
  Notifications: {};
  Snap: { snap: SnapType };
};

const Stack = createNativeStackNavigator<NotificationStackParamList>();

export const NotificationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotionficationScreen} />
      <Stack.Screen name="Snap" component={Snap} />
    </Stack.Navigator>
  );
};

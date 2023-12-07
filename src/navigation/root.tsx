import type { NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef } from 'react';

import { useAuth } from '@/core';
import { Snap as SnapScreen } from '@/screens';
import ChatScreen from '@/screens/chat/chat-screen';
import ProfileScreen from '@/screens/profile/profile-screen';

import { AuthNavigator } from './auth-navigator';
import {
  onNotificationArrived,
  onNotificationClicked,
} from './notification-handlers';
import { SignInComplete } from './signin-complete';
import { TabNavigator } from './tab-navigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator();
type RootProps = {
  navigationRef: NavigationContainerRef<RootStackParamList>;
};

export const Root = ({ navigationRef }: RootProps) => {
  const status = useAuth.use.status();
  const notificationReceivedListener = useRef<Notifications.Subscription>();
  const notificationResponseListener = useRef<Notifications.Subscription>();

  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      hideSplash();
    }

    notificationReceivedListener.current =
      Notifications.addNotificationReceivedListener(onNotificationArrived);
    notificationResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        onNotificationClicked(response, navigationRef)
      );

    return () => {
      notificationReceivedListener.current?.remove();
      notificationResponseListener.current?.remove();
    };
  }, [hideSplash, status, navigationRef]);

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Snap',
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      <Stack.Group>
        {status === 'signOut' ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : status === 'signInComplete' ? (
          <Stack.Screen name="App" component={TabNavigator} />
        ) : (
          <Stack.Screen name="signInComplete" component={SignInComplete} />
        )}
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="LikeNotification" component={SnapScreen} />
        <Stack.Screen
          name="NewFollowerNotification"
          component={ProfileScreen}
        />
        <Stack.Screen name="NewMentionNotification" component={SnapScreen} />
        <Stack.Screen name="NewMessageNotification" component={ChatScreen} />
        <Stack.Screen name="NewTrendingNotification" component={SnapScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

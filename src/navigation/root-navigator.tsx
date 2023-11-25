import type { NavigationContainerRef } from '@react-navigation/native';
import { useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef } from 'react';

import { useAuth } from '@/core';

import { AuthNavigator } from './auth-navigator';
import { NavigationContainer } from './navigation-container';
import { SignInComplete } from './signin-complete';
import { TabNavigator } from './tab-navigator';
import type { RootStackParamList } from './types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
      Notifications.addNotificationReceivedListener((notif) => {
        console.log('Notification received:', notif);
        // Handle the notification received
      });

    notificationResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response received:', response);
        // Handle notification response, possibly navigate
        const data = response.notification.request.content.data;
        console.log(`Notification data: ${JSON.stringify(data)}`);
        if (data.screen && navigationRef.isReady()) {
          navigationRef.navigate(data.screen, data.params);
        }
      });

    return () => {
      notificationReceivedListener.current?.remove();
      notificationResponseListener.current?.remove();
    };
  }, [hideSplash, status, navigationRef]);
  console.log('App status:', status);

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Snap',
        headerShown: true,
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
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Root navigationRef={navigationRef} />
    </NavigationContainer>
  );
};

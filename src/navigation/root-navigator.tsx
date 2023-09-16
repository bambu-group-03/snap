import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Image } from 'react-native';

import { useAuth } from '@/core';
import { FeedNavigator } from '@/navigation/feed-navigator';

import { AuthNavigator } from './auth-navigator';
import { NavigationContainer } from './navigation-container';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/icon.png')}
    />
  );
}

export const Root = () => {
  const status = useAuth.use.status();
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      hideSplash();
    }
  }, [hideSplash, status]);

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
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            //options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
        ) : (
          <Stack.Screen
            name="App"
            component={FeedNavigator}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

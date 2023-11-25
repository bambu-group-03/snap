import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Platform } from 'react-native';

import { Button, Text, View } from '@/ui';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    }),
  });
}

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.error(
        'Failed to get push token for push notification because permissions have not been granted'
      );
      return;
    }
    const projectId = Constants.expoConfig?.extra?.eas.projectId;
    console.log(`EAS PROJECT_ID: ${projectId}`);
    token = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log(`EXPO PUSH TOKEN: ${token.data}`);
  } else {
    console.error('Must use physical device for Push Notifications');
  }

  return token ? token.data : undefined;
}

export const NotificationTest = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<
    Notifications.Notification | boolean
  >(false);
  const notificationReceivedListener = useRef<Notifications.Subscription>();
  const notificationResponseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationReceivedListener.current =
      Notifications.addNotificationReceivedListener((notif) => {
        setNotification(notif);
      });

    notificationResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      // Check if the current value is defined before passing it
      if (notificationReceivedListener.current) {
        Notifications.removeNotificationSubscription(
          notificationReceivedListener.current
        );
      }
      if (notificationResponseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationResponseListener.current
        );
      }
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-around">
      <Text>Your expo push token: {expoPushToken}</Text>
      <View className="items-center justify-around">
        {notification && typeof notification !== 'boolean' && (
          <>
            <Text>Title: {notification.request.content.title}</Text>
            <Text>Body: {notification.request.content.body}</Text>
            <Text>
              Data: {JSON.stringify(notification.request.content.data)}
            </Text>
          </>
        )}
      </View>
      <Button
        variant="primary"
        label="Press to Send Notification"
        onPress={async () => {
          if (expoPushToken) {
            await sendPushNotification(expoPushToken);
          } else {
            console.error('Expo push token is undefined.');
          }
        }}
      />
    </View>
  );
};

import type * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import React from 'react';

import { registerForPushNotificationsAsync } from '@/core/auth/utils';
import { Button, Text, View } from '@/ui';

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

export const NotificationTest = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification] = useState<Notifications.Notification | boolean>(false);
  // const notificationReceivedListener = useRef<Notifications.Subscription>();
  // const notificationResponseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // notificationReceivedListener.current =
    //   Notifications.addNotificationReceivedListener((notif) => {
    //     setNotification(notif);
    //   });

    // notificationResponseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //   });
    return () => {
      // Check if the current value is defined before passing it
      // if (notificationReceivedListener.current) {
      //   Notifications.removeNotificationSubscription(
      //     notificationReceivedListener.current
      //   );
      // }
      // if (notificationResponseListener.current) {
      //   Notifications.removeNotificationSubscription(
      //     notificationResponseListener.current
      //   );
      // }
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

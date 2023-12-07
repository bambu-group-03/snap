import type { NavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

import type { Snap } from '@/api';
import type { UserType } from '@/core/auth/utils';
import type { Chat } from '@/screens/chat/chat-list-screen';

// RUNNING IN BACKGROUND
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export type NotificationReceivedStackParamList = {
  LikeNotification: { snap: Snap };
  NewFollowerNotification: { user: UserType };
  NewMentionNotification: { snap: Snap };
  NewMessageNotification: {
    chat: Chat | undefined;
    user: UserType;
  };
  NewTrendingNotification: { snap: Snap };
};

export const onNotificationArrived = (notif: Notifications.Notification) => {
  console.log('Notification received:', notif);
};

export const onNotificationClicked = (
  response: Notifications.NotificationResponse,
  navigationRef: NavigationContainerRef<any>
) => {
  console.log('Notification response received:', response);
  const { screen, params } = response.notification.request.content.data;
  console.log('screen', screen);
  console.log('data', response.notification.request.content.data);
  if (screen && navigationRef.isReady()) {
    console.log("Nav to screen '" + screen + "' with params:", params);
    navigationRef.navigate(screen, params);
  }
};

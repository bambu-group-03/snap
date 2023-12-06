import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { getItem, removeItem, setItem } from '@/core/storage';
const TOKEN = 'token';
const USER = 'user';

export type TokenType = {
  access: string;
  refresh: string;
};

export type UserType = {
  bio_msg: null | string;
  blocked: boolean;
  created_at: string;
  email: string;
  first_name: null | string;
  id: string;
  last_name: null | string;
  phone_number: null | string;
  profile_photo_id: null | string;
  username: null | string;
  ubication: null | string;
  is_followed?: boolean;
  is_followed_back?: boolean;
  dni?: string;
  img_1_url?: string;
  img_2_url?: string;
  certified?: boolean;
  interests?: string[];
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getUser = () => getItem<UserType>(USER);
export const removeUser = () => removeItem(USER);
export const setUser = (value: UserType) => setItem<UserType>(USER, value);

export async function registerForPushNotificationsAsync(): Promise<
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
  } else {
    console.error('Must use physical device for Push Notifications');
  }

  return token ? token.data : undefined;
}

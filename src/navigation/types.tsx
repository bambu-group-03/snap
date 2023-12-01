import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { ChatStackParamList } from '@/screens/chat/chat-navigator';
import type { NotificationStackParamList } from '@/screens/notifications/notification-navigator';
import type { SearchStackParamList } from '@/screens/search/search-navigator';
import type { UserStackParamList } from '@/screens/users/user-navigate';

import type { ProfileStackParamList } from '../screens/profile/profile-navigator';
import type { AuthStackParamList } from './auth-navigator';
import type { FeedStackParamList } from './feed-navigator';
import type { NotificationReceivedStackParamList } from './notification-handlers';
import { LoginStackParamList } from '@/screens/login/login-navigator';

// TODO: change, this must be dynamic
export type RootStackParamList = AuthStackParamList &
  FeedStackParamList &
  ChatStackParamList &
  ProfileStackParamList &
  UserStackParamList &
  NotificationStackParamList &
  NotificationReceivedStackParamList &
  LoginStackParamList &
  SearchStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;

import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { ChatStackParamList } from '@/screens/chat/chat-navigator';

import type { AuthStackParamList } from './auth-navigator';
import type { FeedStackParamList } from './feed-navigator';
import type { SearchStackParamList } from '@/screens/search/search-navigator';
import type { ProfileStackParamList } from '../screens/profile/profile-navigator';

// TODO: change, this must be dynamic
export type RootStackParamList = AuthStackParamList &
  FeedStackParamList &
  ChatStackParamList &
  ProfileStackParamList &
  SearchStackParamList; //  & FooStackParamList & BarStackParamList
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;

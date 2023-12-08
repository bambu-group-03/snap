import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Snap as SnapType } from '@/api';
import type { UserType } from '@/core/auth/utils';
import { SignInComplete } from '@/navigation/signin-complete';
import { Snap } from '@/screens';

import type { Chat } from '../chat/chat-list-screen';
import ChatScreen from '../chat/chat-screen';
import FavoriteSnapScreen from '../profile/fav-snaps-screen';
import InteractionsScreen from '../profile/interaction-view';
import ProfileScreen from '../profile/profile-screen';
import SearchView from './search-view';
import SnapList from './snap-list';
import Users from './users';

export type SearchStackParamList = {
  Search: any;
  Profile: { user: UserType };
  Users: { users: UserType[] | undefined };
  Followers: { users: UserType[] | undefined };
  Following: { users: UserType[] | undefined };
  SnapList: { snaps: SnapType[] };
  Snap: { snap: SnapType };
  FavSnaps: { snaps: SnapType[] };
  EditProfile: { user: UserType | undefined };
  Chat: {
    chat: Chat | undefined;
    user: UserType;
  };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchView} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Followers" component={InteractionsScreen} />
      <Stack.Screen name="Following" component={InteractionsScreen} />
      <Stack.Screen name="SnapList" component={SnapList} />
      <Stack.Screen name="Snap" component={Snap} />
      <Stack.Screen name="FavSnaps" component={FavoriteSnapScreen} />
      <Stack.Screen name="EditProfile" component={SignInComplete} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import SearchView from './search-view';
import { UserType } from '@/core/auth/utils';
import ProfileScreen from '../profile/profile-screen';
import InteractionsScreen from '../profile/interaction-view';
import Users from './users';

export type SearchStackParamList = {
  SearchView: any;
  UserProfile: { user: UserType };
  Users: { users: UserType[] | undefined };
  Followers: { users: UserType[] | undefined };
  Following: { users: UserType[] | undefined };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchView" component={SearchView} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen name="Followers" component={InteractionsScreen} />
      <Stack.Screen name="Following" component={InteractionsScreen} />
    </Stack.Navigator>
  );
};

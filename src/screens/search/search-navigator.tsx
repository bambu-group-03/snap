import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import SearchView from './search-view';
import { UserType } from '@/core/auth/utils';
import ProfileScreen from '../profile/profile-screen';

export type SearchStackParamList = {
  SearchView: any;
  UserProfile: { user: UserType };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchView" component={SearchView} />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

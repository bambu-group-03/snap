import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Search from './search-view';

export type SearchStackParamList = {
  Search: any;
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

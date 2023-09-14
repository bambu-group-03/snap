import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { useAuth } from '@/core';
import { AddPost, Feed, Post } from '@/screens';
import { Pressable, Text } from '@/ui';

export type FeedStackParamList = {
  Feed: undefined;
  Post: { id: number };
  AddPost: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

const GoToLogout = () => {
  const signOut = useAuth.use.signOut();
  return (
    <Pressable onPress={() => signOut()} className="p-2">
      <Text className="text-red-600">Logout</Text>
    </Pressable>
  );
};

const GoToAddPost = () => {
  const { navigate } = useNavigation();
  return (
    <Pressable onPress={() => navigate('AddPost')} className="p-2">
      <Text className="text-primary-300">Create</Text>
    </Pressable>
  );
};

export const FeedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <>
              <GoToAddPost />
              <GoToLogout />
            </>
          ),
        }}
      >
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Group>

      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
};

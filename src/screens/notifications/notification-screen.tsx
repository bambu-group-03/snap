import React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/ui';

import MentionScreen from './mentions-view';
import NotificationView from './notification-view';

const NotionficationScreen = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <Text className="text-center text-2xl font-bold">Notifications</Text>
      <View className="mt-1  py-3 text-center">
        <NotificationView />
      </View>
      <View className="mt-1 border-t border-slate-200 py-3 text-center">
        <Text className="text-center text-2xl font-bold">Mentions</Text>
        <MentionScreen />
      </View>
    </>
  );
};

export default NotionficationScreen;

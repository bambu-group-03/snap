import React from 'react';

import { FocusAwareStatusBar, View } from '@/ui';

import NotificationView from './notification-view';

const NotionficationScreen = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <View>
        <NotificationView />
      </View>
      {/* <View>
        <Text>Mentions</Text>
        <MentionScreen />
      </View> */}
    </>
  );
};

export default NotionficationScreen;

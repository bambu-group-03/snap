import React, { useState } from 'react';

import { FocusAwareStatusBar, View } from '@/ui';

import Tab from '../profile/components/tab'; // Import the Tab component
import MentionScreen from './mentions-view';
import NotificationView from './notification-view';

const NotionficationScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Notifications'); // Initial tab

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <View>
      <FocusAwareStatusBar />
      <View>
        <View className="flex flex-row items-center justify-between px-4 py-2">
          <Tab
            title="Notifications"
            selected={selectedTab === 'Notifications'}
            onPress={() => handleTabChange('Notifications')}
          />
          <Tab
            title="Mentions"
            selected={selectedTab === 'Mentions'}
            onPress={() => handleTabChange('Mentions')}
          />
        </View>
      </View>

      {selectedTab === 'Notifications' ? (
        <NotificationView />
      ) : (
        <MentionScreen />
      )}
    </View>
  );
};

export default NotionficationScreen;

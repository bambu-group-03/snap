import React from 'react';

import { FocusAwareStatusBar } from '@/ui';

import ChatScreen from './chat-screen';
import ChatListScreen from './chat-list-screen';

export const Chat = () => {
  return (
    <>
      <FocusAwareStatusBar />
      {/* <ChatScreen /> */}
      <ChatListScreen />
    </>
  );
};

export default Chat;

import React from 'react';

import { FocusAwareStatusBar } from '@/ui';
import ChatListScreen from './chat-list-screen';

export const Chat = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ChatListScreen />
    </>
  );
};

export default Chat;

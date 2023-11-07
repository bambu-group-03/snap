import React from 'react';

import { FocusAwareStatusBar } from '@/ui';

import ChatScreen from './chat-screen';
export const Chat = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ChatScreen />
    </>
  );
};

export default Chat;

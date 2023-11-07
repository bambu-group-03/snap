import React from 'react';

import { FocusAwareStatusBar } from '@/ui';

import ChatScreen from './channel-screen';
export const Chat = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ChatScreen />
    </>
  );
};

export default Chat;

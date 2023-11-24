import React from 'react';

import { getUserState } from '@/core';
import type { UserType } from '@/core/auth/utils';
import { Image, Text, View } from '@/ui';

import type { Message } from './chat-screen';

type ChatBodyProps = {
  chatUser: UserType;
  messages: Message[];
};

const ChatBody: React.FC<ChatBodyProps> = ({ chatUser, messages }) => {
  const current_user = getUserState();
  const isCurrentUser = (message: Message) =>
    message.from_id === current_user?.id;
  return (
    <View>
      <View
        id="messages"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      >
        {messages.map((message, index) => (
          <View key={index} className="chat-message ">
            <View
              className={`items- flex${
                isCurrentUser(message) ? 'end' : 'start'
              }`}
            >
              <View
                className={`order-${
                  isCurrentUser(message) ? '1' : '2'
                } items- mx-2 flex max-w-xs flex-col${
                  isCurrentUser(message) ? 'end' : 'start'
                } space-y-2 text-xs`}
              >
                <Text
                  className={`inline-block rounded-lg ${
                    isCurrentUser(message)
                      ? 'rounded-br-none bg-blue-600 text-white'
                      : 'rounded-bl-none bg-gray-300 text-gray-600'
                  } px-4 py-2`}
                >
                  {message.content}
                </Text>
              </View>
              <Image
                source={
                  isCurrentUser(message)
                    ? current_user?.profile_photo_id
                    : chatUser.profile_photo_id
                }
                className="order-2 h-6 w-6 rounded-full"
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChatBody;

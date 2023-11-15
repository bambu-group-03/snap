import React from 'react';

import { Image, Text, View } from '@/ui';

import type { ChatBase, Message } from './chat-list-screen';

type ChatBodyProps = {
  chatUser: ChatBase;
  messages: Message[];
};

const MY_PROFILE_PHOTO =
  'https://avatars.githubusercontent.com/u/40549839?s=400&u=f9968082a38e11cabaeec2033e3ffb3e18395eb6&v=4';

const ChatBody: React.FC<ChatBodyProps> = ({ chatUser, messages }) => {
  return (
    <View>
      <View
        id="messages"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      >
        {messages.map((message, index) => (
          <View key={index} className="chat-message">
            <View
              className={`flex items-end ${
                message.from === chatUser.id ? 'justify-end' : ''
              }`}
            >
              <View
                className={`order-${
                  message.from === chatUser.id ? '1' : '2'
                } items- mx-2 flex max-w-xs flex-col${
                  message.from === chatUser.id ? 'end' : 'start'
                } space-y-2 text-xs`}
              >
                <Text
                  className={`inline-block rounded-lg ${
                    message.from === chatUser.id
                      ? 'rounded-br-none bg-blue-600 text-white'
                      : 'rounded-bl-none bg-gray-300 text-gray-600'
                  } px-4 py-2`}
                >
                  {message.messageContent}
                </Text>
              </View>
              <Image
                source={
                  message.from === chatUser.id
                    ? MY_PROFILE_PHOTO
                    : chatUser.imageSource
                }
                className="order-2 h-6 w-6 rounded-full"
              />
            </View>
          </View>
        ))}
      </View>
      {/* Additional UI elements can be added here if necessary */}
    </View>
  );
};

export default ChatBody;

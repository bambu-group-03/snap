// Displays the chat

import { ScrollView } from 'react-native-gesture-handler';

import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';

const ChatScreen = () => {
  // For each message, it should display the message and the user who sent it
  return (
    <View className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <ScrollView>
        <ChatHeader />
        <ChatBody />
      </ScrollView>
      <ChatInput />
    </View>
  );
};

export default ChatScreen;

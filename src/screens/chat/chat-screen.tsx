import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { View } from '@/ui';

import ChatBody from './chat-body';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import type { ChatBase, Message } from './chat-list-screen';
import type { ChatStackParamList } from './chat-navigator';

// Mock messages data - replace with real data retrieval logic
const mockMessages: Message[] = [
  {
    from: 1,
    to: 2,
    messageContent:
      'Did you survive the exam? Or should I send a search party?',
    imageSource: 'https://example.com/user1.jpg',
  },
  {
    from: 2,
    to: 1,
    messageContent:
      'Barely! Felt like I was trying to decode alien language. 🤯',
    imageSource: 'https://example.com/user2.jpg',
  },
  {
    from: 1,
    to: 2,
    messageContent: 'Right? I think my pencil started crying at one point.',
    imageSource: 'https://example.com/user1.jpg',
  },
  {
    from: 2,
    to: 1,
    messageContent:
      "I could've sworn the questions were changing every time I blinked.",
    imageSource: 'https://example.com/user2.jpg',
  },
  {
    from: 1,
    to: 2,
    messageContent:
      "I'm just looking forward to the day when I can use 'I survived Exam 2023' as a fun fact about myself.",
    imageSource: 'https://example.com/user1.jpg',
  },
  {
    from: 2,
    to: 1,
    messageContent:
      "That's if we ever get out of the exam hall. I'm still looking for the exit.",
    imageSource: 'https://example.com/user2.jpg',
  },
  {
    from: 1,
    to: 2,
    messageContent: 'Plot twist: The real exam is finding your way out.',
    imageSource: 'https://example.com/user1.jpg',
  },
  {
    from: 2,
    to: 1,
    messageContent:
      'In that case, see you at graduation... maybe. If we ever escape! 😅',
    imageSource: 'https://example.com/user2.jpg',
  },
  {
    from: 1,
    to: 2,
    messageContent: "Hang tight, I'm coming with snacks and a compass!",
    imageSource: 'https://example.com/user1.jpg',
  },
  {
    from: 2,
    to: 1,
    messageContent: 'Best. Rescue. Ever. 🌟',
    imageSource: 'https://example.com/user2.jpg',
  },
];

const ChatScreen = () => {
  const route = useRoute<RouteProp<ChatStackParamList, 'ChatScreen'>>();
  const currentUser: ChatBase = route.params.chat;

  // Assuming 'currentUser' is the ID or username of the logged-in user
  //const [currentUser, setCurrentUser] = useState<string>('currentUser');
  const [messages] = useState<Message[]>(mockMessages);

  // If you have a way to dynamically load messages, you can do it here
  useEffect(() => {
    // Fetch or update messages
    // setMessages(fetchedMessages);
  }, []);

  return (
    <View className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <ScrollView>
        <ChatHeader chatUser={currentUser} />
        <ChatBody messages={messages} chatUser={currentUser} />
      </ScrollView>
      <ChatInput />
    </View>
  );
};

export default ChatScreen;

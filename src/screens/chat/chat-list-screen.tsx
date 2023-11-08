import { useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import ChatListHeader from './chat-list-header';
import ChatListBody from './chat-list-body';

import ChatScreen from './chat-screen';

export type ChatBase = {
  id: number;
  name: string;
  email: string;
  last_message: string;
  imageSource: string;
  unread_messages: boolean;
};

const ChatListScreen = () => {
  const chats: ChatBase[] = [
    {
      id: 1,
      name: 'Dani Vela',
      email: 'dani@windster.com',
      last_message: 'Sos el rey del front',
      imageSource: 'https://avatars.githubusercontent.com/u/56934023?v=4',
      unread_messages: true,
    },
    {
      id: 2,
      name: 'Edu Cusihuaman',
      email: 'edu@gmail.com',
      last_message: 'Amigo sacamos 10 en el TP',
      imageSource: 'https://avatars.githubusercontent.com/u/43934057?v=4',
      unread_messages: false,
    },
    {
      id: 3,
      name: 'Mafer',
      email: 'mafer@gmail.com',
      last_message: 'No me dejes en visto Luis',
      imageSource: 'https://avatars.githubusercontent.com/u/62344533?v=4',
      unread_messages: false,
    },
  ];

  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      {/* <View style={styles.card}> */}

      {/* Header */}
      <ChatListHeader />

      {/* List of chats */}
      <ChatListBody chats={chats} onPress={() => navigate('Snap', { id: 1 })} />

      {/* <ChatScreen /> */}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Change to your desired background color
  },
  card: {
    backgroundColor: 'white', // Change to your desired background color
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Change to your desired border color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 16,
  },
};

export default ChatListScreen;

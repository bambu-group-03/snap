import { Image, Text, TouchableOpacity, View } from 'react-native';

import type { ChatBase } from './chat-list-screen';

const ChatListHeader = ({
  chats,
  onPress,
}: {
  chats: ChatBase[];
  onPress: () => void;
}) => {
  return (
    <View style={styles.list}>
      {chats.map((chat: ChatBase) => (
        <View key={chat.id} style={styles.listItem}>
          <TouchableOpacity className="group block shrink-0" onPress={onPress}>
            <View style={styles.itemContent}>
              <Image style={styles.avatar} source={{ uri: chat.imageSource }} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{chat.name}</Text>
                <Text style={styles.last_message}>{chat.last_message}</Text>
              </View>

              <Text style={styles.unread_messages}>
                {chat.unread_messages ? '•' : ''}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ChatListHeader;

const styles = {
  list: {},
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Change to your desired border color
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Change to your desired text color
  },
  last_message: {
    fontSize: 14,
    color: '#666', // Change to your desired text color
  },
  unread_messages: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

import { Text, View } from 'react-native';

const ChatListHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Chats</Text>
    </View>
  );
};

export default ChatListHeader;

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Change to your desired text color
  },
};

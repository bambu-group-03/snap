import React from 'react';
import { View, Text, Image } from 'react-native';

const ChatListScreen = () => {
  const customers = [
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

  return (
    <View style={styles.container}>
      {/* <View style={styles.card}> */}

      {/* Chats */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>

      {/* List of chats */}
      <View style={styles.list}>
        {customers.map((customer) => (
          <View key={customer.id} style={styles.listItem}>
            <View style={styles.itemContent}>
              <Image
                style={styles.avatar}
                source={{ uri: customer.imageSource }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{customer.name}</Text>
                <Text style={styles.last_message}>{customer.last_message}</Text>
              </View>
              <Text style={styles.unread_messages}>
                {customer.unread_messages ? '1' : '0'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
    // </View>
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
    color: '#333', // Change to your desired text color
  },
  footerText: {
    marginTop: 16,
    fontSize: 14,
    color: '#666', // Change to your desired text color
  },
};

export default ChatListScreen;

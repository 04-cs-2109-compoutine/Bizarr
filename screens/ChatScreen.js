import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { db } from '../firebase';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';

function ChatScreen(props) {
  const [messages, setMessages] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    db.collection('messages')
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.content}
            subTitle={item.description}
            image={item.photoURL}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {setMessages()}}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default ChatScreen;
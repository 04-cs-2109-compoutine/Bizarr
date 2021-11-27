import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

import Screen from "../components/Screen";
import colors from "../components/colors";
import ListItemSeparator from "../components/ListItemSeparator";
const initialMessages = [
  {
    id: 1,
    title: "Bubble Tea",
    description: "There is no such thing as too much Bubble Tea 🧋",
    image: require("../assets/image/logotransparent.png"),
  },
  {
    id: 2,
    title: "Potatoes",
    description: "I love potatoes",
    image: require("../assets/image/logotransparent.png"),
  },
];
function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  //delete the message
  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() => console.log("Message,selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "Potatoes",
              description: "I love potatoes",
              image: require("../assets/image/logotransparent.png"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.light,
  },
});

export default MessagesScreen;

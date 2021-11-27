import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

import Screen from "../components/Screen";
import colors from "../components/colors";
import ListItemSeparator from "../components/ListItemSeparator";
import SingleMessageScreen from "../screens/SingleMessageScreen";
import MessageNavigator from "../components/MessageNavigator";

const initialMessages = [
  {
    id: 1,
    title: "Grace",
    description: "There is no such thing as too much Bubble Tea 🧋",
    image: require("../assets/image/logotransparent.png"),
  },
  {
    id: 2,
    title: "Mason",
    description: "I love potatoes",
    image: require("../assets/image/logotransparent.png"),
  },
];
function MessagesScreen({ navigation }) {
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
            subTitle={item.description}
            image={item.image}
            onPress={() => navigation.navigate("SingleMessage")}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        //when refreshing
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
    backgroundColor: colors.main,
  },
});

export default MessagesScreen;

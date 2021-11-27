import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
const messages = [
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
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() => console.log("Message,selected", item)}
            renderRightActions={ListItemDeleteAction}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;

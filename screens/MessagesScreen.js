import React from "react";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";

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
    <FlatList
      data={messages}
      keyExtractor={(message) => message.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          description={item.description}
          image={item.image}
        />
      )}
    />
  );
}

export default MessagesScreen;

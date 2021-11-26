import { auth, db } from "../firebase";
import React, { useState, useCallback, useLayoutEffect } from "react";
import colors from "../components/colors";
import { GiftedChat } from "react-native-gifted-chat";

export function SingleMessageScreen() {
  const [messages, setMessages] = useState([]);

  //connecting to database
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chat")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().use,
          }))
        )
      );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
}

export default SingleMessageScreen;
// export default class SingleMessageScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [
//         {
//           _id: 1,
//           text: "Help! I ate too many milk teas",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Grace Lin",
//             avatar: "https://placeimg.com/140/140/any",
//           },
//         },
//         {
//           _id: 2,
//           text: "😲, do you need me to bring you to the doctor?!?!",
//           createdAt: new Date(),
//           user: {
//             _id: 3,
//             name: "Andrea Lin",
//           },
//         },
//         {
//           _id: 3,
//           text: "no, it's okay, I got more milk tea",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Grace Lin",
//             avatar: "https://placeimg.com/140/140/any",
//           },
//         },
//       ],
//     };
//   }
//   handleSend = (message) => {
//     console.log(message);
//     this.setState((prevState) => ({
//       messages: [...prevState.messages, message],
//     }));
//   };
//   render() {
//     return (
//       <GiftedChat
//         alwaysShowSend={true}
//         messages={
//           this.state && this.state.messages ? this.state.messages : null
//         }
//         user={{
//           _id: 2,
//           name: "Grace Lin",
//           avatar: "https://placeimg.com/140/140/any",
//         }}
//         onSend={(message) => this.handleSend(message)}
//       />
//     );
//   }
// }

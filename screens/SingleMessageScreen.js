import React, { useState, useCallback, useEffect } from "react";
import colors from "../components/colors";
import { GiftedChat } from "react-native-gifted-chat";

export function SingleMessageScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello. Where is the bubble tea?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Grace Lin",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
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

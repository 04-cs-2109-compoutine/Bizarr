import { auth, db } from "../firebase";

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    saveMessage(messageText, sentAt, currentGroupId) {
      if (messageText.trim()) {
        const message = {
          messageText,
          sentAt,
          sentBy: this.user.uid,
        };
        return new Promise((resolve, reject) => {
          db.collection("message")
            .doc(currentGroupId)
            .collection("messages")
            .add(message)
            .then(function (docRef) {
              resolve(message);
            })
            .catch(function (error) {
              reject(error);
            });
        });
      }
    },
    fetchMessagesByGroupId(groupId) {
      const vm = this;
      vm.messages = [];
      db.collection("messages")
        .doc(groupId.trim())
        .collection("messages")
        .orderBy("sentAt")
        .onSnapshot((querySnapshot) => {
          const allMessages = [];
          querySnapshot.forEach((doc) => {
            if (doc) allMessages.push(doc.data());
          });
          vm.messages = allMessages;
        });
    },
  },
};
//-----------------------------ORIGINAL CODE --------------------------------
// import { auth, db } from "../firebase";
// import React, { useState, useCallback, useLayoutEffect } from "react";
// import { StyleSheet } from "react-native";
// import colors from "../components/Config/colors";
// import { GiftedChat } from "react-native-gifted-chat";
// import { Avatar } from "react-native-elements";

// export function SingleMessageScreen() {
//   const [messages, setMessages] = useState([]);

//   const chatsRef = db.collection("chats");

//   //adding avatar

//   //   //connecting to database
//   useLayoutEffect(() => {
//     const unsubscribe = chatsRef
//       .orderBy("createdAt", "desc")
//       .onSnapshot((snapshot) =>
//         setMessages(
//           snapshot.docs.map((doc) => ({
//             _id: doc.data()._id,
//             createdAt: doc.data().createdAt.toDate(),
//             text: doc.data().text,
//             user: doc.data().user,
//           }))
//         )
//       );
//     return unsubscribe;
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//     const { _id, createdAt, text, user } = messages[0];
//     chatsRef.add({
//       _id,
//       createdAt,
//       text,
//       user,
//     });
//   }, []);

//   return (
//     <GiftedChat
//       messages={messages}
//       alwaysShowSend={true}
//       showAvatarForEveryMessage={true}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         _id: auth?.currentUser?.email,
//         name: auth?.currentUser?.displayName,
//         avatar: auth?.currentUser?.photoURL,
//       }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   mainMessages: {
//     backgroundColor: colors.main,
//   },
// });

// export default SingleMessageScreen;

// //------------------------ ATTEMPT FOR PRIVATE CHAT ----------------------------
// import React, { useState, useCallback, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { StyleSheet } from "react-native";
// import { db } from "../firebase";

// import colors from "../components/Config/colors";

// export function SingleMessageScreen() {
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");

//   const chatsRef = db.collection("chats");

//   useEffect(() => {
//     readUser();

//     const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
//       const messagesFirestore = querySnapshot
//         .docChanges()
//         .filter(({ type }) => "added")
//         .map(({ doc }) => {
//           const message = doc.data();
//           return {
//             ...message,
//             createdAt: message.createdAt.toDate(),
//           };
//         })
//         .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
//       appendMessages(messagesFirestore);
//     });
//     return () => unsubscribe();
//   }, []);

//   const appendMessages = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   //checks if there is any user detail in the async storage
//   async function readUser() {
//     const user = await AsyncStorage.getItem("user");
//     if (user) {
//       setUser(Json.parse(user));
//     }
//   }

//   //stores the username in async storage
//   async function handlePress() {
//     // const _id = Math.random().toString(36).substring(7);
//     const _id = user._id;
//     const user = { _id, name };
//     await AsyncStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//   }

//   //handles the onSend method of Gifted Chat and waits for Promise to write messages
//   async function handleSend(mesages) {
//     const writes = messages.map((m) => chatsRef.add(m));
//     await Promise.all(writes);
//   }

//   return (
//     <GiftedChat
//       messages={messages}
//       user={user}
//       alwaysShowSend={true}
//       showAvatarForEveryMessage={true}
//       onSend={handleSend}
//     />
//   );
// }

// export default SingleMessageScreen;

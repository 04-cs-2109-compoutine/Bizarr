// import { auth, db } from "../firebase";
// import React, { useState } from "react";

// export function SingleMessageScreen() {
//   const [messages, setMessages] = useState([]);

//   const saveMessage = (messageText, sentAt, currentGroupId) => {
//     if (messageText.trim()) {
//       const message = {
//         messageText,
//         sentAt,
//         sentBy: this.user.uid,
//       };
//       return new Promise((resolve, reject) => {
//         db.collection("message")
//           .doc(currentGroupId)
//           .collection("messages")
//           .add(message)
//           .then(function (docRef) {
//             resolve(message);
//           })
//           .catch(function (error) {
//             reject(error);
//           });
//       });
//     }
//   };
//   const fetchMessagesByGroupId = (groupId) => {
//     const vm = this;
//     vm.messages = [];
//     db.collection("messages")
//       .doc(groupId.trim())
//       .collection("messages")
//       .orderBy("sentAt")
//       .onSnapshot((querySnapshot) => {
//         const allMessages = [];
//         querySnapshot.forEach((doc) => {
//           if (doc) allMessages.push(doc.data());
//         });
//         vm.messages = allMessages;
//       });
//   };
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
//-----------------------------ORIGINAL CODE --------------------------------
import { auth, db } from "../firebase";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import colors from "../components/Config/colors";
import { GiftedChat } from "react-native-gifted-chat";
import { Avatar } from "react-native-elements";

export function SingleMessageScreen() {
  const [messages, setMessages] = useState([]);

  const chatsRef = db.collection("chats");
  let group = null;
  if (route.params && route.params.group) {
    group = route.params.group;
  }

  //adding avatar

  //   //connecting to database
  useLayoutEffect(() => {
    const unsubscribe = chatsRef
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
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
    chatsRef.add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      alwaysShowSend={true}
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

const styles = StyleSheet.create({
  mainMessages: {
    backgroundColor: colors.main,
  },
});

export default SingleMessageScreen;

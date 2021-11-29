//this is using Angular, need to modify the methods later

//chats/:id/messages/:id
// function get(chatId){
//   return this.afs.collection<any>('chats')
//   .doc(chatId)
//   .snapshotChanges()
//   .pipe(
//     map(doc => {
//       return {
//         id: doc.payload.id,...doc.payload.data()
//       }
//     })
//   )
// }

// async function create(){
//   const {uid} = await this.auth.getUser();
//   const data = {
//     uid,
//     createdAt: Date.now(),
//     count: 0,
//     messages: []
//   };

//   const docRef = await this.afs.collection('chats').add(data);
//   return this.router.navigate(['chats', docRef.id])
// }

// async function sendMessage(chatId, content){
//   const { uid } = await this.auth.getUser;

//   const data = {
//     uid,
//     content,
//     createdAt: DataTransfer.now()
//   }

//   if(uid){
//     const ref =  this.afs.collection('chats').doc(chatId);
//     return ref.update({
//       messages: firestore.FieldValue.arrayUnion(data)
//     })
//   }
// }

import firebase from "firebase";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import db from "../firebase"

const messages = firebase.database().ref("messages");

export const send = messages =>{
  messages.forEach(item => {
    const message = {
      text: item.text,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: item.user
    };
    db.push(message)
  })
}

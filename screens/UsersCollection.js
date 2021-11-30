// import firebase from "../firebase"
//https://www.youtube.com/watch?v=qWy9ylc3f9U
//https://www.youtube.com/watch?v=aFtYsghw-1k
// https://www.youtube.com/watch?v=G04w_k3TPTs

import {auth, db } from './firebase';
import { doc, setDoc } from "firebase/firestore"; 
import firebase from "firebase";
import React, { useState } from 'react';

User.prototype.signUp = function (){ 
  return firebase.firestore().doc(`/users/${uid}`).set(userData, {merge: true})
}

// const fetchUser = async() => {
// const [user, setUser] = useState({})
//   try{
//     await firestore()
//     .collection('users')
//     .where(users.uid)
//   }catch(e){

//     console.log(e)
//   }
// }
// await setDoc(doc(db, "users", "jack"), {
//   firstName:"jack",
//   lastName: "",
//   email: "jack@gmail.com"
// })
// try{
// const users = doc(db, 'users', this.state.user);
// }catch(e){
//   console.log('couldnt grab user');
// }

// const userData = {
//   firstName: "jack",
//   lastName: "cat"
// }

// const res = await db.collection("users").doc("jack").set(userData);
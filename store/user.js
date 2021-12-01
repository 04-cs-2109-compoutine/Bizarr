// import { db } from '../firebase';
// import firebase from "firebase";
// // import { doc, setDoc } from "firebase/firestore"; 
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // console.log(db)

// // async function readAllUsers(){
// //   try{
// //     const collectionRef = db.collection("users");
// //     const getPromise = collectionRef.get();
// //     const snapshot = await getPromise;
// //     console.log(`Found ${snapshot.size}x user`);
// //     const docs = snapshot.docs;
// //     docs.forEach(user => {
// //       console.log(user.id, user.data())
// //     })
// //   }catch(err){
// //     console.error(err)
// //   }
// // }


// // readAllUsers();

// const SET_USER = 'SET_USER'

// export const setUser = (user) => {
//   return{
//     type: SET_USER,
//     user
//   }
// }


// export const logIn = (email, password) =>{
//   return async (dispatch) => {
//     try{
//       await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(async (response) =>{
//         const uid = response.user.uid;
//         const usersId = firebase.firestore().collection('users');
//         usersId.doc(uid)
//         .get()
//         .then((firestoreDocument) => {
//           if (!firestoreDocument.exists){
//             console.log('does not exist')
//             return;
//           }
//           const userData = firestoreDocument.data();
//           dispatch(setUser(userData))
//         })
//       })
//     }catch(e){
//       console.log(e)
//     }
//   }
// }

// export const signUp = (email, password) => {
//   return async (dispatch) => {
//     console.log('hit the thunk');
//     try{
//       await firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(async (response) => {
//         const uid = response.user.uid;
//         await AsyncStorage.setItem('USER_ID', uid);
//         const userData = {
//           id: uid,
//           email,
//           fullName: first + ' ' + last
//         }
//         const userId = firebase.firestore().collection('users');
//         userId
//         .doc(uid)
//         .set(userData)
//         .catch((error) => {
//           console.log(error)
//         })
//       })
//       dispatch(setUser(data))
//     }catch(e){
//       console.log(e)
//     }
//   }
// }

// const initialState = {id: '', fullName: '', email: ''}

// export default (state = initialState, action) =>{
//   switch (action.type){
//     case SET_USER:
//       return {...state, ...action.user};
//       default:
//         return state
//   }
 
// }

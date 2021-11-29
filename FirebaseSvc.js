import firebase from "firebase";
class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAbids5u5V37mkGJ-cPeoxS2bUjUBnduSg",
        authDomain: "bizarr-11606.firebaseapp.com",
        databaseURL: "https://bizarr-11606-default-rtdb.firebaseio.com",
        projectId: "bizarr-11606",
        storageBucket: "bizarr-11606.appspot.com",
        messagingSenderId: "623928421389",
        appId: "1:623928421389:web:5d9b295d4cf5e47ee87944",
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;

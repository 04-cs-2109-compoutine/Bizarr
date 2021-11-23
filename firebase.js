import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAbids5u5V37mkGJ-cPeoxS2bUjUBnduSg",
  authDomain: "bizarr-11606.firebaseapp.com",
  projectId: "bizarr-11606",
  storageBucket: "bizarr-11606.appspot.com",
  messagingSenderId: "623928421389",
  appId: "1:623928421389:web:5d9b295d4cf5e47ee87944"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
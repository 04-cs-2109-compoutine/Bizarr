import * as firebase from "firebase";
// import { getStorage } from "firebase/storage";
// import 'firebase/storage'; 
// import firebase from 'firebase/app'
// var cl = new cloudinary.Cloudinary({cloud_name: "bizarr", secure: true});

// const FIRESTORE_API_KEY = process.env.FIRESTORE_API_KEY;
// const FIRESTORE_AUTH_DOMAIN = process.env.FIRESTORE_AUTH_DOMAIN;
// const FIRESTORE_DATABASE_URL = process.env.FIRESTORE_DATABASE_URL;
// const FIRESTORE_PROJECT_ID = process.env.FIRESTORE_PROJECT_ID;
// const FIRESTORE_STORAGE_BUCKET = process.env.FIRESTORE_STORAGE_BUCKET;
// const FIRESTORE_MESSAGING_SENDER_ID = process.env.FIRESTORE_MESSAGING_SENDER_ID;
// const FIRESTORE_APP_ID = process.env.FIRESTORE_APP_ID;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/bizarr/upload'

const firebaseConfig = {
  apiKey: "AIzaSyAbids5u5V37mkGJ-cPeoxS2bUjUBnduSg",
  authDomain: "bizarr-11606.firebaseapp.com",
  projectId: "bizarr-11606",
  storageBucket: "bizarr-11606.appspot.com",
  messagingSenderId: "623928421389",
  appId: "1:623928421389:web:5d9b295d4cf5e47ee87944",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
// const storage = firebase.storage().ref();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };

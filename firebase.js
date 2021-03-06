import * as firebase from "firebase";

if (process.env.NODE_ENV !== "production") require("./secrets");

const FIRESTORE_API_KEY = process.env.FIRESTORE_API_KEY;
const FIRESTORE_AUTH_DOMAIN = process.env.FIRESTORE_AUTH_DOMAIN;
const FIRESTORE_DATABASE_URL = process.env.FIRESTORE_DATABASE_URL;
const FIRESTORE_PROJECT_ID = process.env.FIRESTORE_PROJECT_ID;
const FIRESTORE_STORAGE_BUCKET = process.env.FIRESTORE_STORAGE_BUCKET;
const FIRESTORE_MESSAGING_SENDER_ID = process.env.FIRESTORE_MESSAGING_SENDER_ID;
const FIRESTORE_APP_ID = process.env.FIRESTORE_APP_ID;

const firebaseConfig = {
  apiKey: FIRESTORE_API_KEY,
  authDomain: FIRESTORE_AUTH_DOMAIN,
  databaseURL: FIRESTORE_DATABASE_URL,
  projectId: FIRESTORE_PROJECT_ID,
  storageBucket: FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: FIRESTORE_MESSAGING_SENDER_ID,
  appId: FIRESTORE_APP_ID,
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };

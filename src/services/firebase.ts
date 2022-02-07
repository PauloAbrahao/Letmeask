//import { initializeApp } from "firebase/app";
import firebase from "firebase/app";

import {} from "firebase/auth";
import {} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrPWcWOew8sX9SKAAy5KoHD5G863wUKhU",
  authDomain: "letmeask-bdaf2.firebaseapp.com",
  databaseURL: "https://letmeask-bdaf2-default-rtdb.firebaseio.com",
  projectId: "letmeask-bdaf2",
  storageBucket: "letmeask-bdaf2.appspot.com",
  messagingSenderId: "445268099413",
  appId: "1:445268099413:web:836f1cca9a90be2b51efdc",
};

firebase.initializeApp(firebaseConfig);

//const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };

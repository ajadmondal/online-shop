// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import * as firebase from "firebase/app";
 import firebase from "firebase/app";
// import firebase from "firebase";
// import "firebase/auth";
import "firebase/firestore";
// import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA8pPAnJ_l5aTKISE2D8tFNz46UIy3H50E",
  authDomain: "ecomerceshop-bbd5b.firebaseapp.com",
  projectId: "ecomerceshop-bbd5b",
  storageBucket: "ecomerceshop-bbd5b.appspot.com",
  messagingSenderId: "288180237882",
  appId: "1:288180237882:web:df9eba737e66bdbbe2a703",
  measurementId: "G-E22JH904HC",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
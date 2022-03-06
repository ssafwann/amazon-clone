import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeVwhcbsJVEEuX_h5BxbKzRk5sqgyIFrU",
  authDomain: "clone-66761.firebaseapp.com",
  projectId: "clone-66761",
  storageBucket: "clone-66761.appspot.com",
  messagingSenderId: "555014344599",
  appId: "1:555014344599:web:1b1c8fc9c81bb00b02bed2",
  measurementId: "G-Z4W7CK4T72",
};

// initialize the app with the firebase config above ^
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize the database
const db = firebaseApp.firestore();

// initialize the variable authenticaiton
const auth = firebase.auth();

export { db, auth }; // allows us to use it outside the file

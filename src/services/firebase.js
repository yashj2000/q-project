import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// 1) Rename this file to "firebase.js".

// 2) Fill firebaseConfig with the settings of your Firebase project.

const firebaseConfig = {
  apiKey: "AIzaSyC1-ICeOiQXZYPRTPxXLSeiX6zEBM-AVDY",
  authDomain: "instaclone-f3666.firebaseapp.com",
  projectId: "instaclone-f3666",
  storageBucket: "instaclone-f3666.appspot.com",
  messagingSenderId: "847335536370",
  appId: "1:847335536370:web:902080106cbcd17c0f026b",
  // measurementId: "G-JPK0PL53C5"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;

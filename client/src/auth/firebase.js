import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPn-fVFactYdtAFduJNv7PddKKB3B-Afo",
  authDomain: "plant-b9f91.firebaseapp.com",
  projectId: "plant-b9f91",
  storageBucket: "plant-b9f91.appspot.com",
  messagingSenderId: "849260088257",
  appId: "1:849260088257:web:de3fd52689e6360f80fd40",
  measurementId: "G-CN50LXK8BE"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
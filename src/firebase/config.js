import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBrOPC30TH59W6oqzpSL4sTha1kGHaGToo",
  authDomain: "vvjfirebase.firebaseapp.com",
  projectId: "vvjfirebase",
  storageBucket: "vvjfirebase.firebasestorage.app",
  messagingSenderId: "98645625067",
  appId: "1:98645625067:web:d7ccfee6518ec2e191d6ae"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHIdnWYJhWKqHjOsfmJ00vK3_3Gi_a8m8",
  authDomain: "simple-blog-d1153.firebaseapp.com",
  projectId: "simple-blog-d1153",
  storageBucket: "simple-blog-d1153.appspot.com",
  messagingSenderId: "1084079844358",
  appId: "1:1084079844358:web:92314659b2a9f3d0406787",
  measurementId: "G-FK8RTF7CL9",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

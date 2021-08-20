import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDkptkbVvoI2w-3axEEu3nOXhfqh1EOIqk",
    authDomain: "react-app-for-projects.firebaseapp.com",
    projectId: "react-app-for-projects",
    storageBucket: "react-app-for-projects.appspot.com",
    messagingSenderId: "314944654159",
    appId: "1:314944654159:web:9c87fd2e279c0e75d7133a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}

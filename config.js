// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8FUAO66DrJePvpJMF8OWT8Jd7HmJJzDQ",
  authDomain: "u18-98308.firebaseapp.com",
  projectId: "u18-98308",
  storageBucket: "u18-98308.appspot.com",
  messagingSenderId: "308888134318",
  appId: "1:308888134318:web:17a98ec88b7a9da790c33f"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export default db;
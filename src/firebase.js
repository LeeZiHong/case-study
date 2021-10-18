// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD02cTmPXIH-Dd44j1jVTHtsu8hovxB7Gs",
  authDomain: "cs-emp.firebaseapp.com",
  projectId: "cs-emp",
  storageBucket: "cs-emp.appspot.com",
  messagingSenderId: "614435516031",
  appId: "1:614435516031:web:646c64aa25c30bb68c594a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
export default auth;

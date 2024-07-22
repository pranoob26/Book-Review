// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC34N-4p6In-_l3bfU6A6XAeuQPDKxK-Cs",
//   authDomain: "bookreview-bf7ae.firebaseapp.com",
//   projectId: "bookreview-bf7ae",
//   storageBucket: "bookreview-bf7ae.appspot.com",
//   messagingSenderId: "591514438504",
//   appId: "1:591514438504:web:56f46e4a424e288eab64dd"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0){
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }
// const auth = firebase.auth()

// export { auth };

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC34N-4p6In-_l3bfU6A6XAeuQPDKxK-Cs",
  authDomain: "bookreview-bf7ae.firebaseapp.com",
  projectId: "bookreview-bf7ae",
  storageBucket: "bookreview-bf7ae.appspot.com",
  messagingSenderId: "591514438504",
  appId: "1:591514438504:web:56f46e4a424e288eab64dd"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
const storage = firebase.storage();

export { firebase, firestore, storage };

import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

// enter configuration details here
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  

  // export firestore database
  export default firebaseApp.firestore()
  

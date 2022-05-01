// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzfl2UjuPudhMlNXq1TvByXkrYZsbtiMg",
    authDomain: "faceand-4d298.firebaseapp.com",
    projectId: "faceand-4d298",
    storageBucket: "faceand-4d298.appspot.com",
    messagingSenderId: "325386397677",
    appId: "1:325386397677:web:7930123d1f7596e8b3e9e4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { firebase, db, auth, storage }
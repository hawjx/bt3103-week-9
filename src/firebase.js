import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDy85DnhTaGlO-qJ4PxCuVXemS9io885W8",
    authDomain: "bt3103-week-6-e2a4e.firebaseapp.com",
    projectId: "bt3103-week-6-e2a4e",
    storageBucket: "bt3103-week-6-e2a4e.appspot.com",
    messagingSenderId: "685847347358",
    appId: "1:685847347358:web:b97c6ebe56cae2c5e27b8f",
    measurementId: "G-6HHC5GE4WN"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
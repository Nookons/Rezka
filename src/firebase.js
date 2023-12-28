// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWovHJnpFEvAlr6tqISRzUy9kLmcDsBmA",
    authDomain: "my-personal-netflix.firebaseapp.com",
    databaseURL: "https://my-personal-netflix-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-personal-netflix",
    storageBucket: "my-personal-netflix.appspot.com",
    messagingSenderId: "8775902258",
    appId: "1:8775902258:web:6f0581b18ac084fb00482b",
    measurementId: "G-6KEME0WYTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
const analytics = getAnalytics(app);
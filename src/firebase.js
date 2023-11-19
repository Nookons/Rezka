// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCP4Bq69ciXELlU2wST2LapNdVHDiLyn5c",
    authDomain: "myrezka-nookon.firebaseapp.com",
    projectId: "myrezka-nookon",
    storageBucket: "myrezka-nookon.appspot.com",
    messagingSenderId: "774646126957",
    appId: "1:774646126957:web:4ca88039649775aad76264",
    measurementId: "G-Y82MECZ5ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
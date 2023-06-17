// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-9e9kqiKaGnmPUY5kx_Nw67s0jbl7co0",
  authDomain: "ecommerce-623c7.firebaseapp.com",
  projectId: "ecommerce-623c7",
  storageBucket: "ecommerce-623c7.appspot.com",
  messagingSenderId: "1080351797354",
  appId: "1:1080351797354:web:d21c1fb127c9d9b1699a13",
  measurementId: "G-C115YDVZBV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Create a root reference
export const storage = getStorage();

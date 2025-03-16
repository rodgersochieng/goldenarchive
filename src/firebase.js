// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApbU73Bn1pkyyWj14uEFNAi-iX9BZahyU",
  authDomain: "golden-archive.firebaseapp.com",
  projectId: "golden-archive",
  storageBucket: "golden-archive.firebasestorage.app",
  messagingSenderId: "618965477782",
  appId: "1:618965477782:web:3f61cae9b65fbdb50b15b7",
  measurementId: "G-MWX7STLCVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore instance
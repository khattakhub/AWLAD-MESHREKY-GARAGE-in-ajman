
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcFSbAH5sQdB6hR3o6qTsuSL03aBGgCks",
  authDomain: "awlad-meshreky.firebaseapp.com",
  projectId: "awlad-meshreky",
  storageBucket: "awlad-meshreky.firebasestorage.app",
  messagingSenderId: "887309560874",
  appId: "1:887309560874:web:c2fa1a5b774c7d389d2753",
  measurementId: "G-FF0F0K07N9"
};

// Initialize Firebase using the modular V9 SDK
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Export for potential use in other parts of the app
export { app, analytics, db, auth };

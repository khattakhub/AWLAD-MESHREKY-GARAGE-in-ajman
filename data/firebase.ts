

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoGTLXKcOd-aOvCEwziTopdCffAy3BE2E",
  authDomain: "awlad-meshreky-garage.firebaseapp.com",
  databaseURL: "https://awlad-meshreky-garage-default-rtdb.firebaseio.com",
  projectId: "awlad-meshreky-garage",
  storageBucket: "awlad-meshreky-garage.firebasestorage.app",
  messagingSenderId: "302151018561",
  appId: "1:302151018561:web:c2c17dbd848bc6dc917ec0",
  measurementId: "G-DS4DDJR9BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Enable offline persistence to handle intermittent network issues
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      console.warn("Firestore offline persistence failed: Multiple tabs open.");
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence.
      console.warn("Firestore offline persistence is not supported in this browser.");
    }
  });


// Export for potential use in other parts of the app
export { app, analytics, db, auth };
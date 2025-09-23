// Import the functions you need from the SDKs you need
// FIX: Switched to namespace imports for `firebase/app` and `firebase/analytics` to resolve module export errors.
// This is likely due to a project configuration or dependency issue causing problems with named exports from these specific modules.
import * as firebaseApp from "firebase/app";
import * as firebaseAnalytics from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);
const analytics = firebaseAnalytics.getAnalytics(app);
const db = getFirestore(app);

// Export for potential use in other parts of the app
export { app, analytics, db };

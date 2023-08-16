import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
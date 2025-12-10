// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";
import {getFirestore} from "@firebase/firestore"
import { getStorage,ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "ai-travel-planner-938bd.firebaseapp.com",
  projectId: "ai-travel-planner-938bd",
  storageBucket: "ai-travel-planner-938bd.appspot.com",
  messagingSenderId: "625376539747",
  appId: "1:625376539747:web:97e9dd18763cb93b3ef456",
  measurementId: "G-DY5HVKNPBE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth(app)
export const db= getFirestore(app)
export const storage=getStorage(app)
export const storageRef=ref(storage)